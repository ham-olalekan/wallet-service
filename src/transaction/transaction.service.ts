import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionStatus } from 'src/enums/transaction.status';
import { Peer2PeerTransferDto } from 'src/models/P2PDto';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallets/wallets.service';
import { Connection } from 'typeorm';
import { WalletTransaction } from './transaction.entity';
import { WalletTransactionRepository } from './transaction.repository';
import { v4 as uuidv4 } from 'uuid';
import { TransactionType } from 'src/enums/transaction.type';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { query } from 'express';

@Injectable()
export class TransactionService {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly connection: Connection,
    private readonly transactionRepo: WalletTransactionRepository,
  ) {}

  public async performAccountLookup(email: string): Promise<string> {
    let userAccount = await this.userService.findUserByEmail(email);
    if (!userAccount) {
      throw new NotFoundException(`Account lookup failed: ${email}`);
    }
    return `${userAccount.firstName} ${userAccount.lastName}`;
  }

  public async performPeerToPeerTransfer(
    transferObj: Peer2PeerTransferDto,
  ): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let sourceAccount = await this.userService.findUserByEmail(
        transferObj.sourceEmail,
      );
      if (!sourceAccount) {
        throw new NotFoundException(
          `Account with email: ${transferObj.sourceEmail} was not found`,
        );
      }

      let destinationAccount = await this.userService.findUserByEmail(
        transferObj.destinationEmail,
      );
      if (!destinationAccount) {
        throw new NotFoundException(
          `Account with email:${transferObj.sourceEmail} was not found`,
        );
      }

      if (destinationAccount.id == sourceAccount.id){
        throw new UnauthorizedException("Users are not allowed to perform transfer to self")
      }
      let sourceWallet = await this.walletService.getuserWallet(
        sourceAccount.id,
      );
      let sourceCurrentBal = sourceWallet.balance;
      if (sourceCurrentBal < transferObj.amount) {
        throw new BadRequestException('Insufficient funds');
      }

      let destinationWallet = await this.walletService.getuserWallet(
        destinationAccount.id,
      );

      //deplete source balance
      sourceWallet.balance = sourceCurrentBal - transferObj.amount;

      let balanceToUpdate = destinationWallet.balance;
      //add to destination balance
      destinationWallet.balance = balanceToUpdate + transferObj.amount;

      await this.walletService.updateWallet(sourceWallet);
      await this.walletService.updateWallet(destinationWallet);

      let debitTrxn: any = {
        userId: sourceWallet.userId,
        sourceUserId: sourceWallet.userId,
        destinationUserId: destinationAccount.id,
        destinationUserName: `${destinationAccount.firstName} ${destinationAccount.lastName}`,
        amount: transferObj.amount,
        status: TransactionStatus.SUCCESS,
        type: TransactionType.DEBIT,
        createdAt: new Date(),
        updatedAt: new Date(),
        reference: uuidv4(),
      };

      let creditTrxn: any = {
        userId: destinationWallet.userId,
        sourceUserId: sourceWallet.userId,
        destinationUserId: destinationAccount.id,
        destinationUserName: `${destinationAccount.firstName} ${destinationAccount.lastName}`,
        amount: transferObj.amount,
        status: TransactionStatus.SUCCESS,
        type: TransactionType.CREDIT,
        createdAt: new Date(),
        updatedAt: new Date(),
        reference: debitTrxn.reference
      };

      await this.save(debitTrxn);
      await this.save(creditTrxn);
      await queryRunner.commitTransaction();
      return debitTrxn;
    } catch (err) {
      console.log(
        `TransactionService.performPeerToPeerTransfer failed with due to error`,
        err.message,
      );
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async save(transaction: any): Promise<void> {
    await this.transactionRepo
      .createQueryBuilder()
      .insert()
      .into(WalletTransaction)
      .values(transaction)
      .execute();
  }

  public async getAllUserTransactions(userId: string, page:number, size: number):Promise<Pagination<WalletTransaction>>{
    let opt: IPaginationOptions = {
      page: page,
      limit: size,
    };

    const queryBuilder = this.transactionRepo.createQueryBuilder("t");
    queryBuilder.where({userId: userId});
    queryBuilder.orderBy('t.createdAt', 'DESC');

    return await paginate<WalletTransaction>(queryBuilder, opt)
  }

  public async getAllTransactions(page:number, size: number):Promise<Pagination<WalletTransaction>>{
    let opt: IPaginationOptions = {
      page: page,
      limit: size,
    };

    const queryBuilder = this.transactionRepo.createQueryBuilder("t");
    queryBuilder.orderBy('t.createdAt', 'DESC');
    queryBuilder.distinctOn(["t.reference"]);

    return await paginate<WalletTransaction>(queryBuilder, opt)
  }
}

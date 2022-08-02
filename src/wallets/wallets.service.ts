import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { Wallet } from './wallets.entity';
import { WalletStatus } from 'src/enums/wallets.statuses';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  public async createUserWallet(userId: string): Promise<string> {
    try {
      let existingUserWallet = await this.walletRepository.findByUserId(userId);
      if (existingUserWallet) {
        throw new BadRequestException('This user already has a wallet.');
      }

      const walletId = await this.walletRepository
        .createQueryBuilder()
        .insert()
        .into(Wallet)
        .values({
          userId,
          balance: 100_000.00,
          status: WalletStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning('id')
        .execute();
      return walletId.identifiers[0].id;
    } catch (err) {
      console.log('user wallet creation failed with error: ', err.message);
      throw new InternalServerErrorException('Could not create merchant');
    }
  }

  public async getuserWallet(userId: string): Promise<Wallet> {
    return await this.walletRepository.findByUserId(userId);
  }

  public async updateWallet(wallet: Wallet): Promise<Wallet> {
    wallet.updatedAt = new Date();
    return await this.walletRepository.save(wallet);
  }
}

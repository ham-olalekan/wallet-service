import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { WalletRepository } from 'src/wallets/wallet.repository';
import { WalletsModule } from 'src/wallets/wallets.module';
import { TransactionController } from './transaction.controller';
import { WalletTransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletTransactionRepository]),
    UserModule,
    WalletsModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class WalletTransactionsModule {}

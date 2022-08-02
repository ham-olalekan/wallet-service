import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './wallet.controller';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallets.service';

@Module({
    imports: [TypeOrmModule.forFeature([WalletRepository])],
    providers: [WalletService],
    controllers: [WalletController],
    exports: [WalletService]
})
export class WalletsModule {}

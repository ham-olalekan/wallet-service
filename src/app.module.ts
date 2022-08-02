import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Wallet } from './wallets/wallets.entity';
import { ConfigModule } from '@nestjs/config';
import { WalletTransactionsModule } from './transaction/transaction.module';
import { WalletTransaction } from './transaction/transaction.entity';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    WalletTransactionsModule,
    TypeOrmModule.forRoot(
    {
    type: 'postgres',
    host:  process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username:  process.env.DB_USER || 'zuvy',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'zuvy_wallet-service_db',
    entities: [User, Wallet, WalletTransaction],
    synchronize: true,
    migrationsRun: true
  })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

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
    host:  process.env.POSTGRES_HOST || 'kandula.db.elephantsql.com',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username:  process.env.DB_USER || 'fynfgutw',
    password: process.env.DB_PASSWORD || 'L6FtWBgz7BAtVf45RE7aN9cZ6C-WbjHA',
    database: process.env.DB_DATABASE || 'fynfgutw',
    entities: [User, Wallet, WalletTransaction],
    synchronize: true,
    migrationsRun: true
  })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

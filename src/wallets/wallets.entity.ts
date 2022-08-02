import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Index
  } from 'typeorm'
  import { WalletStatus } from 'src/enums/wallets.statuses'
  
  @Entity()
  export class Wallet extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Index()
    @Column('varchar', {nullable:false})
    userId:string

    @Column('decimal', {scale: 2, default:0} )
    balance: number

    @Column('enum', {enum: WalletStatus, default: WalletStatus.ACTIVE})
    status: WalletStatus
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

  }

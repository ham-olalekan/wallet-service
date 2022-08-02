import { TransactionStatus } from "src/enums/transaction.status";
import { TransactionType } from "src/enums/transaction.type";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class WalletTransaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Index()
    @Column("varchar", {nullable: false})
    userId:string

    @Index()
    @Column("varchar", {nullable: false})
    sourceUserId:string

    @Index()
    @Column("varchar", {nullable: false})
    destinationUserId: string

    @Column("varchar", {nullable: false})
    destinationUserName: string

    @Column('decimal', {scale: 2,nullable: false})
    amount: number

    @Index()
    @Column('varchar', {nullable:false})
    reference: string

    @Column('enum', {nullable:false, enum: TransactionStatus })
    status: TransactionStatus

    @Column('enum', {nullable:false, enum: TransactionType})
    type: TransactionType

    @CreateDateColumn()
    @Column('timestamptz', {nullable:false})
    createdAt: Date;
  
    @UpdateDateColumn()
    @Column('timestamptz', {nullable:false})
    updatedAt: Date;
}
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {length:100, nullable:false})
    firstName: string

     @Column('varchar', {length:100, nullable:false})
    lastName: string

    @Column('varchar', {length:100, nullable:false})
    email: string

    @Column('varchar', {nullable:false})
    password: string

    @CreateDateColumn()
    @Column('timestamptz', {nullable:false})
    createdAt: Date;

    @UpdateDateColumn()
    @Column('timestamptz', {nullable:false})
    updatedAt: Date;

    async validatePassword(password:string): Promise<boolean>{
        return await bcrypt.compare(password, this.password);
    }
}
import { EntityRepository, Repository } from "typeorm";
import { WalletTransaction } from "./transaction.entity";


@EntityRepository(WalletTransaction)
export class WalletTransactionRepository extends Repository<WalletTransaction>{

}
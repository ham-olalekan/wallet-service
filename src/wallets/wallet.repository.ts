import { EntityRepository, getRepository, Repository } from "typeorm";
import { Wallet } from "./wallets.entity";

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {

    private getRepo(): Repository<Wallet> {
        return getRepository(Wallet);
    }

    public async findByUserId(userId:string): Promise<Wallet>{
        return this.getRepo().findOne({
            where: {userId: userId}
        });
    }

}
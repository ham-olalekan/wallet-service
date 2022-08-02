import { EntityManager, EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async findByEmail(email:string): Promise<User>{
        return await this.getRepo().findOne({
            where: {email: email}
        });
    }

    public getManager ():EntityManager {
        return this.manager
      }

    private getRepo(): Repository<User> {
        return getRepository(User);
    }
}
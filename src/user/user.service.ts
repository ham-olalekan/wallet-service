import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "src/models/CreateUserDto";
import { UserAccountCreationDto } from "src/models/UserAccountCreationDto";
import { WalletService } from "src/wallets/wallets.service";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly walletService: WalletService,
    ){}

    public async createUserAccount(createUserDto: CreateUserDto): Promise<UserAccountCreationDto>{
        let email = createUserDto.email.trim().toLowerCase();
        let existingUserAccount = await this.userRepository.findByEmail(email);
        if(existingUserAccount){
            throw new BadRequestException("User with this email already exisits");
        }

        const userAccount = await this.userRepository.createQueryBuilder()
        .insert()
        .into(User)
        .values({
            email: email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: bcrypt.hashSync(createUserDto.password, 10)
        })
        .returning("id")
        .execute();

        const userId = userAccount.identifiers[0].id;
        const walletId = await this.walletService.createUserWallet(userId);

        let response: UserAccountCreationDto ={
            id: userId,
            walletId: walletId,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: email
        } 
        return response;
    }

    public async findUserByEmail(email: string): Promise<User>{
        let user = await this.userRepository.findByEmail(email.trim().toLowerCase());
        return user;
    }
}
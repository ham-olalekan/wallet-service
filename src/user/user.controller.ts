import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateUserDto } from "../models/CreateUserDto";
import { UserAccountCreationDto } from "src/models/UserAccountCreationDto";
import { UserService } from "./user.service";


@Controller("/users")
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Post("")
    @HttpCode(201)
    public async createUserAccount(@Body() createUserDto: CreateUserDto): Promise<UserAccountCreationDto>{
        return this.userService.createUserAccount(createUserDto);
    }
}
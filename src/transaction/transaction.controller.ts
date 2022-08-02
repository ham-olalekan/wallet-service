import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { WalletService } from "src/wallets/wallets.service";
import { TransactionService } from "./transaction.service";
import { Peer2PeerTransferDto } from "../models/P2PDto"
import { Pagination } from "nestjs-typeorm-paginate";
import { WalletTransaction } from "./transaction.entity";

@Controller("/transaction")
export class TransactionController{

    constructor(
        private readonly userService: UserService,
        private readonly walletService: WalletService,
        private readonly transactionService: TransactionService
    ){}

    @Get("/:email/lookup")
    @HttpCode(200)
    public async performAccountLookup(@Param("email") email: string): Promise<any>{
        try{
            let name =  await this.transactionService.performAccountLookup(email);
            return {
                "accountName":name
            }
        }catch( err ){
            throw err;
        }
    }

    @Post("/transfer")
    public async performPeerToPeerTransfer(@Body() body: Peer2PeerTransferDto){
        try{
            return await this.transactionService.performPeerToPeerTransfer(body);
        }catch( err ){
            throw err;
        }
    }

    @Get("/user/:userId")
    @HttpCode(200)
    public async fetchAllUserTransactions(
    @Param("userId") userId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<WalletTransaction>>{
        return await this.transactionService.getAllUserTransactions(userId, page, limit);
    }
}
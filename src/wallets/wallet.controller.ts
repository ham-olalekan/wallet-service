import { Controller } from "@nestjs/common";
import { WalletService } from "./wallets.service";

@Controller('wallets')
export class WalletController{

    constructor(
        private readonly walletService: WalletService
    ){

    }

}
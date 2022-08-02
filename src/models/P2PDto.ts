import { IsEmail, IsNumber, Min } from "class-validator";

export class Peer2PeerTransferDto{
    @IsEmail()
    public readonly sourceEmail;
    @IsEmail()
    public readonly destinationEmail;
    @IsNumber()
    @Min(0.1)
    public readonly amount;
}
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsEmail()
    public readonly email:string;

    @IsString()
    @MaxLength(50)
    @MinLength(2)
    public readonly firstName:string;

    @IsString()
    @MaxLength(50)
    @MinLength(2)
    public readonly lastName:string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    public readonly password: string;
}
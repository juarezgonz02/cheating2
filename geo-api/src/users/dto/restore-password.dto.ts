import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RestorePasswordDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

const generateCodeVerification = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    return code.toString();
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sybmarketplace@gmail.com',
        pass: 'ipphardrbiaxnhtp'
    }
});


const sendEmail = (email: string, code: string) => {
    const mailOptions = {
        from: 'sybmarketplace@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Tu código de verificación es: ${code}`
    };

    return transporter.sendMail(mailOptions);
}

const codeVerification = [];

@Injectable()
export class AuthService {

    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async SignIn(signIn: SignInDto): Promise<{ access_token: string }>{
        const user = await this.usersService.findOneUserByEmail(signIn.email);
        if(user?.password !== signIn.password){
            throw new UnauthorizedException()
        }
        
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async SignUp(user: CreateUserDto): Promise<String>{
        const newUser = await this.usersService.createUser(user);
        if(newUser){
            return JSON.stringify({ message: 'User created successfully'});
        }{
            throw new UnauthorizedException
        }
    }

    async ForgotPassword(email: string): Promise<String>{
        const user = await this.usersService.findOneUserByEmail(email);
        if(!user){
            throw new UnauthorizedException();
        }
        const code = generateCodeVerification();
        codeVerification.push({ email, code });
        sendEmail(email, code);
        return 'Code sent successfully';
    }

    async Logout(): Promise<String>{
        return 'Logout successfully';
    }

    async restorePassword(email: string, code: string, password: string): Promise<String>{
        const user = await this.usersService.findOneUserByEmail(email);
        if(!user){
            throw new UnauthorizedException();
        }
        const codeIndex = codeVerification.findIndex(c => c.email === email && c.code === code);
        if(codeIndex === -1){
            throw new UnauthorizedException();
        }
        const newPassword = user.password = password;
        await this.usersService.updatePassword(user.id, newPassword);
        codeVerification.splice(codeIndex, 1);
        return 'Password restored successfully';
    }

}

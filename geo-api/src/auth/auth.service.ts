import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

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
        
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async SignUp(user: CreateUserDto): Promise<String>{
        const newUser = await this.usersService.createUser(user);
        if(newUser){
            return 'User created successfully';
        }{
            throw new UnauthorizedException
        }
    }
}

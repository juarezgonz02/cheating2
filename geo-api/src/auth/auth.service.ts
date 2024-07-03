import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor (private usersService: UsersService){}

    async SignIn(signIn: SignInDto): Promise<String>{
        const user = await this.usersService.findOneUserByEmail(signIn.email);
        if(user?.password !== signIn.password){
            throw new UnauthorizedException()
        }
        return "User signed in successfully";
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

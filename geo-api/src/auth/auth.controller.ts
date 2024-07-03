import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in-dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() body: SignInDto) {
        return this.authService.SignIn(body);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() body: CreateUserDto) {
        return this.authService.SignUp(body);
    }
}

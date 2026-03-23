import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.usersService.createUser(body);
    }

    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body.mail, body.pass);
    }
}

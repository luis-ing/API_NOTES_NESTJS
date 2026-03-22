import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Post('register')
    register(@Body() body) {
        return this.usersService.createUser(body);
    }

    @Post('login')
    login(@Body() body) {
        return this.authService.login(body.mail, body.pass);
    }
}

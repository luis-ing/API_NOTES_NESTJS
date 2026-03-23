import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(mail: string, pass: string) {
        try {
            const user = await this.usersService.findByEmail(mail);

            if (!user) throw new UnauthorizedException();

            const valid = await bcrypt.compare(pass, user.pass || '');

            if (!valid) throw new UnauthorizedException();

            const payload = {
                sub: user.id,
                mail: user.mail,
            };

            return {
                accessToken: this.jwtService.sign(payload),
                refreshToken: this.jwtService.sign(payload, {
                    expiresIn: '7d',
                }),
            };
        } catch (error) {
            console.error('Error logging in: ', error);
            throw error;
        }
    }
}

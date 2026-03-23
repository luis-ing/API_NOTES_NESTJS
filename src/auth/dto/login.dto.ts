import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    mail: string = '';

    @ApiProperty()
    @IsString()
    pass: string = '';
}

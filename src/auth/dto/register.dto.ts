import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    name: string = '';

    @ApiProperty()
    @IsEmail()
    mail: string = '';

    @ApiProperty()
    @IsString()
    @MinLength(6)
    pass: string = '';
}

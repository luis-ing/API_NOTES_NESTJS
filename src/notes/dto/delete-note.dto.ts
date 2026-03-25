import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteNoteDto {
    @ApiProperty()
    @IsString()
    id: number = 0;
}

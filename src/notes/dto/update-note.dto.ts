import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends CreateNoteDto {
    @ApiProperty()
    @IsString()
    id: number = 0;
}

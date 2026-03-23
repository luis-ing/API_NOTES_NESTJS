import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from 'src/common/guards';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() body: CreateNoteDto, @Req() req) {
        console.log('Creating note for user: ', req);
        return this.notesService.create(body, req.user.userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.notesService.findAll();
    }
}

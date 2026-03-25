import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from 'src/common/guards';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';

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
    findAll(@Req() req) {
        return this.notesService.findAll(req.user.userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch()
    update(@Body() body: UpdateNoteDto, @Req() req) {
        console.log('Updating note for user: ', req);
        return this.notesService.update(body, req.user.userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Body() body: DeleteNoteDto) {
        return this.notesService.delete(body.id);
    }
}

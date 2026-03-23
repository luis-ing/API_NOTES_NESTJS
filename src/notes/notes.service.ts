import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) {}

    create(data, userId: number) {
        return this.prisma.notes.create({
            data: {
                title: data.title,
                content: data.content,
                dateCreated: new Date(),
                userCreated: userId,
                userUpdated: userId,
            },
        });
    }

    findAll() {
        return this.prisma.notes.findMany();
    }

    update(id, data, userId) {
        return this.prisma.notes.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                dateUpdated: new Date(),
                userUpdated: userId,
            },
        });
    }

    delete(id: number) {
        return this.prisma.notes.delete({
            where: { id },
        });
    }
}

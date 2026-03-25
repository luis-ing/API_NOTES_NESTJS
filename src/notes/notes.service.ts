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

    findAll(idUser: number) {
        return this.prisma.notes.findMany({
            where: {
                userCreated: idUser,
                isActive: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                dateCreated: true,
                dateUpdated: true,
            },
        });
    }

    update(data, userId) {
        return this.prisma.notes.update({
            where: { id: data.id },
            data: {
                title: data.title,
                content: data.content,
                dateUpdated: new Date(),
                userUpdated: userId,
            },
        });
    }

    async delete(id: number) {
        const note = await this.prisma.notes.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
        if (note) {
            return { success: true };
        } else {
            return { success: false };
        }
    }
}

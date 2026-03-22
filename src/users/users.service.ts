import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: user) {
        const hash = await bcrypt.hash(data.pass!, 10);

        return this.prisma.user.create({
            data: {
                name: data.name,
                mail: data.mail,
                pass: hash!,
                dateCreated: new Date(),
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                mail: true,
                dateCreated: true,
            },
        });
    }

    async findByEmail(mail: string) {
        return this.prisma.user.findFirst({
            where: { mail },
        });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                mail: true,
            },
        });
    }
}

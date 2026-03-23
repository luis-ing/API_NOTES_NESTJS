import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            adapter: new PrismaMariaDb({
                host: process.env.DATABASE_HOST!,
                database: process.env.DATABASE_NAME!,
                user: process.env.DATABASE_USER!,
                password: process.env.DATABASE_PASSWORD!,
            }),
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}

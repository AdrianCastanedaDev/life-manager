import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './application/users.service';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { USER_REPOSITORY } from './domain';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: USER_REPOSITORY,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [UsersService],
})
export class UsersModule { }

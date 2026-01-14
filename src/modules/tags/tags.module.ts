import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './application/tags.service';
import { PrismaTagRepository } from './infrastructure/prisma-tag.repository';
import { TAG_REPOSITORY } from './domain';

@Module({
    controllers: [TagsController],
    providers: [
        TagsService,
        {
            provide: TAG_REPOSITORY,
            useClass: PrismaTagRepository,
        },
    ],
    exports: [TagsService],
})
export class TagsModule { }

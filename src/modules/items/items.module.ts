import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { CreateItemService, ListItemsService, UpdateItemService } from './application';
import { PrismaItemRepository } from './infrastructure/prisma-item.repository';
import { ITEM_REPOSITORY } from './domain';

@Module({
    controllers: [ItemsController],
    providers: [
        CreateItemService,
        ListItemsService,
        UpdateItemService,
        {
            provide: ITEM_REPOSITORY,
            useClass: PrismaItemRepository,
        },
    ],
    exports: [CreateItemService, ListItemsService, UpdateItemService],
})
export class ItemsModule { }

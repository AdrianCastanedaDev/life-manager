import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateItemService, ListItemsService, UpdateItemService } from './application';
import { CreateItemDto, UpdateItemDto } from './dto';
import { CurrentUser } from '../../common/decorators';
import { ItemStatus } from './domain/item.entity';

@ApiTags('Items')
@ApiBearerAuth()
@Controller('items')
export class ItemsController {
    constructor(
        private readonly createItemService: CreateItemService,
        private readonly listItemsService: ListItemsService,
        private readonly updateItemService: UpdateItemService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new wishlist item' })
    async create(
        @CurrentUser('id') userId: string,
        @Body() createItemDto: CreateItemDto,
    ) {
        return this.createItemService.execute({
            ...createItemDto,
            userId,
            status: createItemDto.status || ItemStatus.WANTED,
        });
    }

    @Get()
    @ApiOperation({ summary: 'List all items for current user' })
    async findAll(@CurrentUser('id') userId: string) {
        return this.listItemsService.execute(userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a wishlist item' })
    async update(
        @Param('id') id: string,
        @Body() updateItemDto: UpdateItemDto,
    ) {
        return this.updateItemService.execute(id, updateItemDto);
    }
}

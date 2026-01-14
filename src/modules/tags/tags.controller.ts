import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TagsService } from './application/tags.service';
import { CreateTagDto } from './dto';
import { CurrentUser } from '../../common/decorators';

@ApiTags('Tags')
@ApiBearerAuth()
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new tag' })
    async create(
        @CurrentUser('id') userId: string,
        @Body() createTagDto: CreateTagDto,
    ) {
        return this.tagsService.create({
            ...createTagDto,
            userId,
        });
    }

    @Get()
    @ApiOperation({ summary: 'List all tags for current user' })
    async findAll(@CurrentUser('id') userId: string) {
        return this.tagsService.findByUserId(userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a tag' })
    async delete(@Param('id') id: string) {
        return this.tagsService.delete(id);
    }
}

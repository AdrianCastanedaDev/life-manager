import { Injectable, Inject } from '@nestjs/common';
import { IItemRepository, ITEM_REPOSITORY, UpdateItemInput, Item } from '../domain';
import { EntityNotFoundException } from '../../../common/exceptions';

@Injectable()
export class UpdateItemService {
    constructor(
        @Inject(ITEM_REPOSITORY)
        private readonly itemRepository: IItemRepository,
    ) { }

    async execute(id: string, data: UpdateItemInput): Promise<Item> {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new EntityNotFoundException('Item', id);
        }
        return this.itemRepository.update(id, data);
    }
}

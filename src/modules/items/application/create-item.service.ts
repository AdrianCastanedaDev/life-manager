import { Injectable, Inject } from '@nestjs/common';
import { IItemRepository, ITEM_REPOSITORY, CreateItemInput, Item } from '../domain';

@Injectable()
export class CreateItemService {
    constructor(
        @Inject(ITEM_REPOSITORY)
        private readonly itemRepository: IItemRepository,
    ) { }

    async execute(data: CreateItemInput): Promise<Item> {
        return this.itemRepository.create(data);
    }
}

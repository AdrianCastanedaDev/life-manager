import { Injectable, Inject } from '@nestjs/common';
import { IItemRepository, ITEM_REPOSITORY, Item } from '../domain';

@Injectable()
export class ListItemsService {
    constructor(
        @Inject(ITEM_REPOSITORY)
        private readonly itemRepository: IItemRepository,
    ) { }

    async execute(userId: string): Promise<Item[]> {
        return this.itemRepository.findByUserId(userId);
    }
}

import { Item, CreateItemInput, UpdateItemInput } from './item.entity';

export interface IItemRepository {
    findById(id: string): Promise<Item | null>;
    findByUserId(userId: string): Promise<Item[]>;
    create(data: CreateItemInput): Promise<Item>;
    update(id: string, data: UpdateItemInput): Promise<Item>;
    delete(id: string): Promise<void>;
}

export const ITEM_REPOSITORY = 'ITEM_REPOSITORY';

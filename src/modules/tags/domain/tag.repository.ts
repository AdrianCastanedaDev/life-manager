import { Tag, CreateTagInput } from './tag.entity';

export interface ITagRepository {
    findById(id: string): Promise<Tag | null>;
    findByUserId(userId: string): Promise<Tag[]>;
    create(data: CreateTagInput): Promise<Tag>;
    delete(id: string): Promise<void>;
}

export const TAG_REPOSITORY = 'TAG_REPOSITORY';

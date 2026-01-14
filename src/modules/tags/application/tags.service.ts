import { Injectable, Inject } from '@nestjs/common';
import { ITagRepository, TAG_REPOSITORY, Tag, CreateTagInput } from '../domain';

@Injectable()
export class TagsService {
    constructor(
        @Inject(TAG_REPOSITORY)
        private readonly tagRepository: ITagRepository,
    ) { }

    async findByUserId(userId: string): Promise<Tag[]> {
        return this.tagRepository.findByUserId(userId);
    }

    async create(data: CreateTagInput): Promise<Tag> {
        return this.tagRepository.create(data);
    }

    async delete(id: string): Promise<void> {
        return this.tagRepository.delete(id);
    }
}

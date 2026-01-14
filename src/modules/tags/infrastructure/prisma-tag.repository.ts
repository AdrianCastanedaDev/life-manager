import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ITagRepository, Tag, CreateTagInput } from '../domain';

@Injectable()
export class PrismaTagRepository implements ITagRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<Tag | null> {
        return this.prisma.tag.findUnique({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Tag[]> {
        return this.prisma.tag.findMany({
            where: { userId },
            orderBy: { name: 'asc' },
        });
    }

    async create(data: CreateTagInput): Promise<Tag> {
        return this.prisma.tag.create({ data });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.tag.delete({ where: { id } });
    }
}

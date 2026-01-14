import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { IItemRepository, Item, CreateItemInput, UpdateItemInput } from '../domain';

@Injectable()
export class PrismaItemRepository implements IItemRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<Item | null> {
        return this.prisma.item.findUnique({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Item[]> {
        return this.prisma.item.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(data: CreateItemInput): Promise<Item> {
        return this.prisma.item.create({ data });
    }

    async update(id: string, data: UpdateItemInput): Promise<Item> {
        return this.prisma.item.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.item.delete({ where: { id } });
    }
}

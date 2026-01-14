import { Injectable } from '@nestjs/common';
import {
  Item as PrismaItem,
  ItemCategory as PrismaItemCategory,
  ItemPriority as PrismaItemPriority,
  ItemStatus as PrismaItemStatus,
} from '@prisma/client';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import {
  IItemRepository,
  Item,
  CreateItemInput,
  UpdateItemInput,
  ItemCategory,
  ItemPriority,
  ItemStatus,
} from '../domain';

@Injectable()
export class PrismaItemRepository implements IItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    return item ? this.toDomain(item) : null;
  }

  async findByUserId(userId: string): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((item) => this.toDomain(item));
  }

  async create(data: CreateItemInput): Promise<Item> {
    const item = await this.prisma.item.create({
      data: {
        userId: data.userId,
        name: data.name,
        description: data.description,
        category: this.toPrismaCategory(data.category),
        priority: this.toPrismaPriority(data.priority),
        status: this.toPrismaStatus(data.status),
        estimatedPrice: data.estimatedPrice,
        actualPrice: data.actualPrice,
        imageUrl: data.imageUrl,
        purchaseUrl: data.purchaseUrl,
        notes: data.notes,
      },
    });
    return this.toDomain(item);
  }

  async update(id: string, data: UpdateItemInput): Promise<Item> {
    const updateData: any = { ...data };

    if (data.category) {
      updateData.category = this.toPrismaCategory(data.category);
    }
    if (data.priority) {
      updateData.priority = this.toPrismaPriority(data.priority);
    }
    if (data.status) {
      updateData.status = this.toPrismaStatus(data.status);
    }

    const item = await this.prisma.item.update({
      where: { id },
      data: updateData,
    });
    return this.toDomain(item);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.item.delete({ where: { id } });
  }

  private toDomain(item: PrismaItem): Item {
    return {
      id: item.id,
      userId: item.userId,
      name: item.name,
      description: item.description ?? undefined,
      category: this.toDomainCategory(item.category),
      priority: this.toDomainPriority(item.priority),
      status: this.toDomainStatus(item.status),
      estimatedPrice: item.estimatedPrice,
      actualPrice: item.actualPrice ?? undefined,
      imageUrl: item.imageUrl ?? undefined,
      purchaseUrl: item.purchaseUrl ?? undefined,
      notes: item.notes ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  private toDomainCategory(category: PrismaItemCategory): ItemCategory {
    switch (category) {
      case PrismaItemCategory.PERFUME:
        return ItemCategory.PERFUME;
      case PrismaItemCategory.SHOES:
        return ItemCategory.SHOES;
      case PrismaItemCategory.CLOTHING:
        return ItemCategory.CLOTHING;
      case PrismaItemCategory.ELECTRONICS:
        return ItemCategory.ELECTRONICS;
      case PrismaItemCategory.ACCESSORIES:
        return ItemCategory.ACCESSORIES;
      case PrismaItemCategory.OTHER:
        return ItemCategory.OTHER;
    }
  }

  private toPrismaCategory(category: ItemCategory): PrismaItemCategory {
    switch (category) {
      case ItemCategory.PERFUME:
        return PrismaItemCategory.PERFUME;
      case ItemCategory.SHOES:
        return PrismaItemCategory.SHOES;
      case ItemCategory.CLOTHING:
        return PrismaItemCategory.CLOTHING;
      case ItemCategory.ELECTRONICS:
        return PrismaItemCategory.ELECTRONICS;
      case ItemCategory.ACCESSORIES:
        return PrismaItemCategory.ACCESSORIES;
      case ItemCategory.OTHER:
        return PrismaItemCategory.OTHER;
    }
  }

  private toDomainPriority(priority: PrismaItemPriority): ItemPriority {
    switch (priority) {
      case PrismaItemPriority.LOW:
        return ItemPriority.LOW;
      case PrismaItemPriority.MEDIUM:
        return ItemPriority.MEDIUM;
      case PrismaItemPriority.HIGH:
        return ItemPriority.HIGH;
    }
  }

  private toPrismaPriority(priority: ItemPriority): PrismaItemPriority {
    switch (priority) {
      case ItemPriority.LOW:
        return PrismaItemPriority.LOW;
      case ItemPriority.MEDIUM:
        return PrismaItemPriority.MEDIUM;
      case ItemPriority.HIGH:
        return PrismaItemPriority.HIGH;
    }
  }

  private toDomainStatus(status: PrismaItemStatus): ItemStatus {
    switch (status) {
      case PrismaItemStatus.WANTED:
        return ItemStatus.WANTED;
      case PrismaItemStatus.SAVED:
        return ItemStatus.SAVED;
      case PrismaItemStatus.PURCHASED:
        return ItemStatus.PURCHASED;
    }
  }

  private toPrismaStatus(status: ItemStatus): PrismaItemStatus {
    switch (status) {
      case ItemStatus.WANTED:
        return PrismaItemStatus.WANTED;
      case ItemStatus.SAVED:
        return PrismaItemStatus.SAVED;
      case ItemStatus.PURCHASED:
        return PrismaItemStatus.PURCHASED;
    }
  }
}

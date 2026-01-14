export enum ItemCategory {
    PERFUME = 'PERFUME',
    SHOES = 'SHOES',
    CLOTHING = 'CLOTHING',
    ELECTRONICS = 'ELECTRONICS',
    ACCESSORIES = 'ACCESSORIES',
    OTHER = 'OTHER',
}

export enum ItemPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export enum ItemStatus {
    WANTED = 'WANTED',
    SAVED = 'SAVED',
    PURCHASED = 'PURCHASED',
}

export interface Item {
    id: string;
    userId: string;
    name: string;
    description?: string;
    category: ItemCategory;
    priority: ItemPriority;
    status: ItemStatus;
    estimatedPrice: number;
    actualPrice?: number;
    imageUrl?: string;
    purchaseUrl?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateItemInput = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateItemInput = Partial<Omit<CreateItemInput, 'userId'>>;

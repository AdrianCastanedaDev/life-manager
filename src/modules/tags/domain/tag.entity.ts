export interface Tag {
    id: string;
    userId: string;
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateTagInput = Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>;

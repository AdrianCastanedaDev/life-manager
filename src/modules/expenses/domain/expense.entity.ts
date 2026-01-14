export enum ExpenseCategory {
    FOOD = 'FOOD',
    TRANSPORT = 'TRANSPORT',
    ENTERTAINMENT = 'ENTERTAINMENT',
    SHOPPING = 'SHOPPING',
    BILLS = 'BILLS',
    HEALTH = 'HEALTH',
    OTHER = 'OTHER',
}

export enum ExpensePeriod {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
}

export interface Expense {
    id: string;
    userId: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    period: ExpensePeriod;
    date: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateExpenseInput = Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateExpenseInput = Partial<Omit<CreateExpenseInput, 'userId'>>;

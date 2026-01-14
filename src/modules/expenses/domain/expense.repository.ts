import { Expense, CreateExpenseInput, UpdateExpenseInput } from './expense.entity';

export interface IExpenseRepository {
    findById(id: string): Promise<Expense | null>;
    findByUserId(userId: string): Promise<Expense[]>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Expense[]>;
    create(data: CreateExpenseInput): Promise<Expense>;
    update(id: string, data: UpdateExpenseInput): Promise<Expense>;
    delete(id: string): Promise<void>;
}

export const EXPENSE_REPOSITORY = 'EXPENSE_REPOSITORY';

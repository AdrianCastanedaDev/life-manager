import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { IExpenseRepository, Expense, CreateExpenseInput, UpdateExpenseInput } from '../domain';

@Injectable()
export class PrismaExpenseRepository implements IExpenseRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<Expense | null> {
        return this.prisma.expense.findUnique({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Expense[]> {
        return this.prisma.expense.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
    }

    async findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Expense[]> {
        return this.prisma.expense.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { date: 'desc' },
        });
    }

    async create(data: CreateExpenseInput): Promise<Expense> {
        return this.prisma.expense.create({ data });
    }

    async update(id: string, data: UpdateExpenseInput): Promise<Expense> {
        return this.prisma.expense.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.expense.delete({ where: { id } });
    }
}

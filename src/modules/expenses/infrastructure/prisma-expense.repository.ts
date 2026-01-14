import { Injectable } from '@nestjs/common';
import {
  Expense as PrismaExpense,
  ExpenseCategory as PrismaExpenseCategory,
  ExpensePeriod as PrismaExpensePeriod,
} from '@prisma/client';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import {
  IExpenseRepository,
  Expense,
  CreateExpenseInput,
  UpdateExpenseInput,
  ExpenseCategory,
  ExpensePeriod,
} from '../domain';

@Injectable()
export class PrismaExpenseRepository implements IExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Expense | null> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    return expense ? this.toDomain(expense) : null;
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    return expenses.map((e) => this.toDomain(e));
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'desc' },
    });
    return expenses.map((e) => this.toDomain(e));
  }

  async create(data: CreateExpenseInput): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        userId: data.userId,
        description: data.description,
        amount: data.amount,
        category: this.toPrismaCategory(data.category),
        period: this.toPrismaPeriod(data.period),
        date: data.date,
        notes: data.notes,
      },
    });
    return this.toDomain(expense);
  }

  async update(id: string, data: UpdateExpenseInput): Promise<Expense> {
    const updateData: any = { ...data };
    if (data.category) {
      updateData.category = this.toPrismaCategory(data.category);
    }
    if (data.period) {
      updateData.period = this.toPrismaPeriod(data.period);
    }

    const expense = await this.prisma.expense.update({
      where: { id },
      data: updateData,
    });
    return this.toDomain(expense);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.expense.delete({ where: { id } });
  }

  private toDomain(expense: PrismaExpense): Expense {
    return {
      id: expense.id,
      userId: expense.userId,
      description: expense.description,
      amount: expense.amount,
      category: this.toDomainCategory(expense.category),
      period: this.toDomainPeriod(expense.period),
      date: expense.date,
      notes: expense.notes ?? undefined,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    };
  }

  private toDomainCategory(category: PrismaExpenseCategory): ExpenseCategory {
    switch (category) {
      case PrismaExpenseCategory.FOOD:
        return ExpenseCategory.FOOD;
      case PrismaExpenseCategory.TRANSPORT:
        return ExpenseCategory.TRANSPORT;
      case PrismaExpenseCategory.ENTERTAINMENT:
        return ExpenseCategory.ENTERTAINMENT;
      case PrismaExpenseCategory.SHOPPING:
        return ExpenseCategory.SHOPPING;
      case PrismaExpenseCategory.BILLS:
        return ExpenseCategory.BILLS;
      case PrismaExpenseCategory.HEALTH:
        return ExpenseCategory.HEALTH;
      case PrismaExpenseCategory.OTHER:
        return ExpenseCategory.OTHER;
    }
  }

  private toPrismaCategory(category: ExpenseCategory): PrismaExpenseCategory {
    switch (category) {
      case ExpenseCategory.FOOD:
        return PrismaExpenseCategory.FOOD;
      case ExpenseCategory.TRANSPORT:
        return PrismaExpenseCategory.TRANSPORT;
      case ExpenseCategory.ENTERTAINMENT:
        return PrismaExpenseCategory.ENTERTAINMENT;
      case ExpenseCategory.SHOPPING:
        return PrismaExpenseCategory.SHOPPING;
      case ExpenseCategory.BILLS:
        return PrismaExpenseCategory.BILLS;
      case ExpenseCategory.HEALTH:
        return PrismaExpenseCategory.HEALTH;
      case ExpenseCategory.OTHER:
        return PrismaExpenseCategory.OTHER;
    }
  }

  private toDomainPeriod(period: PrismaExpensePeriod): ExpensePeriod {
    switch (period) {
      case PrismaExpensePeriod.DAILY:
        return ExpensePeriod.DAILY;
      case PrismaExpensePeriod.WEEKLY:
        return ExpensePeriod.WEEKLY;
      case PrismaExpensePeriod.MONTHLY:
        return ExpensePeriod.MONTHLY;
    }
  }

  private toPrismaPeriod(period: ExpensePeriod): PrismaExpensePeriod {
    switch (period) {
      case ExpensePeriod.DAILY:
        return PrismaExpensePeriod.DAILY;
      case ExpensePeriod.WEEKLY:
        return PrismaExpensePeriod.WEEKLY;
      case ExpensePeriod.MONTHLY:
        return PrismaExpensePeriod.MONTHLY;
    }
  }
}

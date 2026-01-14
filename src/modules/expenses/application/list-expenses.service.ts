import { Injectable, Inject } from '@nestjs/common';
import { IExpenseRepository, EXPENSE_REPOSITORY, Expense } from '../domain';

@Injectable()
export class ListExpensesService {
    constructor(
        @Inject(EXPENSE_REPOSITORY)
        private readonly expenseRepository: IExpenseRepository,
    ) { }

    async execute(userId: string): Promise<Expense[]> {
        return this.expenseRepository.findByUserId(userId);
    }

    async executeByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Expense[]> {
        return this.expenseRepository.findByDateRange(userId, startDate, endDate);
    }
}

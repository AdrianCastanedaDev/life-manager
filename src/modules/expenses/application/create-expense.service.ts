import { Injectable, Inject } from '@nestjs/common';
import { IExpenseRepository, EXPENSE_REPOSITORY, Expense, CreateExpenseInput } from '../domain';

@Injectable()
export class CreateExpenseService {
    constructor(
        @Inject(EXPENSE_REPOSITORY)
        private readonly expenseRepository: IExpenseRepository,
    ) { }

    async execute(data: CreateExpenseInput): Promise<Expense> {
        return this.expenseRepository.create(data);
    }
}

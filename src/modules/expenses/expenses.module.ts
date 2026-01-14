import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { CreateExpenseService, ListExpensesService } from './application';
import { PrismaExpenseRepository } from './infrastructure/prisma-expense.repository';
import { EXPENSE_REPOSITORY } from './domain';

@Module({
    controllers: [ExpensesController],
    providers: [
        CreateExpenseService,
        ListExpensesService,
        {
            provide: EXPENSE_REPOSITORY,
            useClass: PrismaExpenseRepository,
        },
    ],
    exports: [CreateExpenseService, ListExpensesService],
})
export class ExpensesModule { }

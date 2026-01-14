import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateExpenseService, ListExpensesService } from './application';
import { CreateExpenseDto } from './dto';
import { CurrentUser } from '../../common/decorators';
import { ExpensePeriod } from './domain/expense.entity';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly createExpenseService: CreateExpenseService,
        private readonly listExpensesService: ListExpensesService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new expense' })
    async create(
        @CurrentUser('id') userId: string,
        @Body() createExpenseDto: CreateExpenseDto,
    ) {
        return this.createExpenseService.execute({
            ...createExpenseDto,
            userId,
            date: new Date(createExpenseDto.date),
        });
    }

    @Get()
    @ApiOperation({ summary: 'List all expenses for current user' })
    async findAll(@CurrentUser('id') userId: string) {
        return this.listExpensesService.execute(userId);
    }
}

import { IsString, IsEnum, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseCategory, ExpensePeriod } from '../domain/expense.entity';

export class CreateExpenseDto {
    @ApiProperty({ example: 'Lunch at restaurant' })
    @IsString()
    description: string;

    @ApiProperty({ example: 25.50 })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ enum: ExpenseCategory, example: ExpenseCategory.FOOD })
    @IsEnum(ExpenseCategory)
    category: ExpenseCategory;

    @ApiProperty({ enum: ExpensePeriod, example: ExpensePeriod.DAILY })
    @IsEnum(ExpensePeriod)
    period: ExpensePeriod;

    @ApiProperty({ example: '2024-01-15' })
    @IsDateString()
    date: string;

    @ApiPropertyOptional({ example: 'With colleagues' })
    @IsString()
    @IsOptional()
    notes?: string;
}

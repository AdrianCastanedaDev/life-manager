import { IsString, IsEnum, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemCategory, ItemPriority, ItemStatus } from '../domain/item.entity';

export class CreateItemDto {
    @ApiProperty({ example: 'Nike Air Max 90' })
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'Classic sneakers in white/red colorway' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ enum: ItemCategory, example: ItemCategory.SHOES })
    @IsEnum(ItemCategory)
    category: ItemCategory;

    @ApiProperty({ enum: ItemPriority, example: ItemPriority.MEDIUM })
    @IsEnum(ItemPriority)
    priority: ItemPriority;

    @ApiProperty({ enum: ItemStatus, example: ItemStatus.WANTED, default: ItemStatus.WANTED })
    @IsEnum(ItemStatus)
    @IsOptional()
    status?: ItemStatus = ItemStatus.WANTED;

    @ApiProperty({ example: 150.00, description: 'Estimated price to pay' })
    @IsNumber()
    @Min(0)
    estimatedPrice: number;

    @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
    @IsUrl()
    @IsOptional()
    imageUrl?: string;

    @ApiPropertyOptional({ example: 'https://nike.com/product/123' })
    @IsUrl()
    @IsOptional()
    purchaseUrl?: string;

    @ApiPropertyOptional({ example: 'Wait for sale season' })
    @IsString()
    @IsOptional()
    notes?: string;
}

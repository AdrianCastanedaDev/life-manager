import { IsString, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
    @ApiProperty({ example: 'Urgent' })
    @IsString()
    name: string;

    @ApiProperty({ example: '#FF5733' })
    @IsHexColor()
    color: string;
}

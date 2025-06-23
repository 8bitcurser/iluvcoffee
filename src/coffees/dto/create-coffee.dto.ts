import { IsInstance, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
    @ApiProperty({ description: 'The name of the coffee', example: 'Latte' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The brand of the coffee', example: 'Starbucks' })
    @IsString()
    readonly brand: string;

    @ApiProperty({ description: 'The flavors of the coffee', type: [String], example: ['chocolate', 'vanilla'] })
    @IsString({ each: true })
    readonly flavors: string[];
}

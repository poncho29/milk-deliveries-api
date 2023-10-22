import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    default: 0,
    description: 'Amount of milk delivered',
  })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    default: '6ae6d144-f2f0-4f22-967e-37cac37fb3bb',
    description: 'Customer ID',
  })
  @IsString()
  @IsUUID()
  customerId: string;
}

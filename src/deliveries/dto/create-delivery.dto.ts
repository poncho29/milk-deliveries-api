import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsUUID()
  customerId: string;
}

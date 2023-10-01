import { IsNumber, IsPositive } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  @IsPositive()
  quantity: number;
}

import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @MinLength(6)
  fullName: string;

  @IsString()
  dni: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  rol: string;
}

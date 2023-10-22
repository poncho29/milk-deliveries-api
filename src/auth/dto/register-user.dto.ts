import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    default: 'Sebastian Meneses',
    description: 'User fullname',
  })
  @IsString()
  @MinLength(6)
  fullName: string;

  @ApiProperty({
    example: '1101699258',
    description: 'User DNI',
  })
  @IsString()
  dni: string;

  @ApiProperty({
    example: 'sebagsmen29@gmail.com',
    description: 'User email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Qwerty123',
    description: 'User password',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: '3154278963',
    description: 'User phone',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Calle 3 #12-25',
    description: 'User address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '6.470518',
    description: 'Latitude of the place',
  })
  @IsString()
  latitude: string;

  @ApiProperty({
    example: '-73.2623187',
    description: 'Longitud of the place',
  })
  @IsString()
  longitude: string;

  @ApiProperty({
    example: '{id: 979, name: "Socorro", departement_id: 28}',
    description: 'User city as object',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: '{id: 28, name: "Santande"}',
    description: 'User deparment as object',
  })
  @IsString()
  department: string;

  @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  roles: string[];
}

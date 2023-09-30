import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  roles: string[];
}

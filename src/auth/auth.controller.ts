import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto, RegisterAuthDto } from './dto';

import { User } from './entities/user.entity';

import { GetUser, RawHeaders } from './decorators';

import { UserRoleGuard } from './guards/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  getPrivateRoute(@GetUser() user: User, @RawHeaders() rawHeaders: string[]) {
    return {
      ok: true,
      user,
      rawHeaders,
    };
  }

  @Get('private2')
  @SetMetadata('roles', ['admin', 'super'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  getPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}

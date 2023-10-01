import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto, RegisterAuthDto } from './dto';

import { User } from './entities/user.entity';

import { GetUser, RawHeaders, RoleProtected } from './decorators';

import { UserRoleGuard } from './guards/user-role.guard';

import { ValidRoles } from './interfaces';

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
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}

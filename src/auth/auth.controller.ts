import { Controller, Post, Body, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto, RegisterAuthDto } from './dto';

import { User } from './entities/user.entity';

import { Auth, GetUser } from './decorators';

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
  @Auth(ValidRoles.user)
  getPrivateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}

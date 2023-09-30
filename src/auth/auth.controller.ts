import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto, RegisterAuthDto } from './dto';

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
  getPrivateRoute() {
    return { ok: true };
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';

import { UsersService } from 'src/users/users.service';

import { LoginAuthDto } from './dto/login-auth.dto.';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(newUser: RegisterAuthDto) {
    const user = await this.usersService.findOne(newUser.email);

    if (user) {
      throw new BadRequestException('This email is already in use');
    }

    const hashPassword = await bcryptjs.hash(newUser.password, 10);

    await this.usersService.create({
      ...newUser,
      password: hashPassword,
    });

    return {
      msg: 'User created successfully',
    };
  }

  async login(user: LoginAuthDto) {
    const existUser = await this.usersService.findOne(user.email);

    if (!existUser) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(
      user.password,
      existUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }
}

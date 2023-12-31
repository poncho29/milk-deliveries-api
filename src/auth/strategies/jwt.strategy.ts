import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configservice: ConfigService,
  ) {
    super({
      secretOrKey: configservice.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(paylod: JwtPayload): Promise<User> {
    const { id } = paylod;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException('Token no valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with admin');

    return user;
  }
}

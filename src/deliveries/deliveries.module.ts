import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';

import { Delivery } from './entities/delivery.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService, AuthService],
  imports: [TypeOrmModule.forFeature([Delivery]), AuthModule],
  exports: [TypeOrmModule, DeliveriesService],
})
export class DeliveriesModule {}

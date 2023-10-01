import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';

import { Delivery } from './entities/delivery.entity';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  imports: [TypeOrmModule.forFeature([Delivery])],
  exports: [TypeOrmModule, DeliveriesService],
})
export class DeliveriesModule {}

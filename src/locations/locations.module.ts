import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';

import { City, State } from './entities';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports: [TypeOrmModule.forFeature([State, City])],
  exports: [TypeOrmModule],
})
export class LocationsModule {}

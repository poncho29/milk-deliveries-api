import { Controller, Get, Query } from '@nestjs/common';

import { LocationsService } from './locations.service';

import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('states')
  findAllStates(@Query() paginationDto: PaginationDto) {
    return this.locationsService.findAllStates(paginationDto);
  }

  @Get('cities')
  findAllCities(@Query() paginationDto: PaginationDto) {
    return this.locationsService.findAllCities(paginationDto);
  }
}

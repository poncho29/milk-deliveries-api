import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { City, State } from './entities';

import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAllCities(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.stateRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findAllStates(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.cityRepository.find({
      take: limit,
      skip: offset,
    });
  }
}

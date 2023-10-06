import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { City, State } from './entities';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  CitiesAPI,
  IDepartment,
  DepartmentsAPI,
  ICity,
} from './interfaces/locations.interface';

@Injectable()
export class LocationsService {
  private baseUrl = 'https://api-colombia.com/api/v1';

  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,

    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAllCities(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.cityRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findAllStates(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.stateRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async seed() {
    await this.deleteAllLocation();

    try {
      const response = await fetch(`${this.baseUrl}/Department`);

      if (response.ok) {
        const dataDeps: DepartmentsAPI[] = await response.json();
        const departments: IDepartment[] = [];
        const cities: ICity[] = [];

        for (const dep of dataDeps) {
          departments.push({
            id: dep.id,
            name: dep.name,
          });

          const response = await fetch(
            `${this.baseUrl}/Department/${dep.id}/cities`,
          );

          if (response.ok) {
            const dataCities: CitiesAPI[] = await response.json();

            for (const city of dataCities) {
              cities.push({
                id: city.id,
                name: city.name,
                state: {
                  id: city.departmentId,
                  name: dep.name,
                },
              });
            }
          } else {
            throw new InternalServerErrorException('Error to get cities');
          }
        }

        await this.stateRepository.insert(departments);
        await this.cityRepository.insert(cities);

        return 'Seed location executed';
      }

      throw new InternalServerErrorException('Error to get departments');
    } catch (error) {
      throw new InternalServerErrorException('Internal error');
    }
  }

  async deleteAllLocation() {
    const queryState = this.stateRepository.createQueryBuilder('state');
    const queryCities = this.cityRepository.createQueryBuilder('city');

    try {
      await queryState.delete().where({}).execute();
      await queryCities.delete().where({}).execute();

      return 'Locations successfully deleted';
    } catch (error) {
      throw new InternalServerErrorException('Error, check server logs');
    }
  }
}

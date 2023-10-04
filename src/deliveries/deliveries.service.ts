import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../auth/entities/user.entity';
import { Delivery } from './entities/delivery.entity';

import { AuthService } from '../auth/auth.service';

import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class DeliveriesService {
  private readonly logger = new Logger(DeliveriesService.name);

  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,

    private readonly authService: AuthService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto, user: User) {
    try {
      const { customerId, ...rest } = createDeliveryDto;

      const customer = await this.authService.findOne(customerId);

      const delivery = this.deliveryRepository.create({
        ...rest,
        customer,
        employee: user,
      });

      await this.deliveryRepository.save(delivery);

      return delivery;
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.deliveryRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const delivery = await this.deliveryRepository.findOneBy({ id });

    if (!delivery) throw new NotFoundException('Delivery not found');

    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto, user: User) {
    const { customerId, ...rest } = updateDeliveryDto;

    const customer = await this.authService.findOne(customerId);

    const delivery = await this.deliveryRepository.preload({
      id,
      ...rest,
      customer,
      employee: user,
    });

    if (!delivery) throw new NotFoundException('Delivery not found');

    try {
      await this.deliveryRepository.save(delivery);
      return delivery;
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async remove(id: string) {
    const delivery = await this.findOne(id);

    await this.deliveryRepository.remove(delivery);

    return { message: 'Delivery deleted' };
  }

  private handleDbException(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}

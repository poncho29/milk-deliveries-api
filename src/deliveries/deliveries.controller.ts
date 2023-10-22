import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeliveriesService } from './deliveries.service';

import { Auth, GetUser } from '../auth/decorators';

import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { User } from '../auth/entities/user.entity';
import { Delivery } from './entities/delivery.entity';

import { ValidRoles } from '../auth/interfaces';
@ApiBearerAuth()
@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  @ApiResponse({
    status: 201,
    description: 'Delivery was created',
    type: Delivery,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related' })
  create(@Body() createDeliveryDto: CreateDeliveryDto, @GetUser() user: User) {
    return this.deliveriesService.create(createDeliveryDto, user);
  }

  @Get()
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.deliveriesService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.deliveriesService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
    @GetUser() user: User,
  ) {
    return this.deliveriesService.update(id, updateDeliveryDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(id);
  }
}

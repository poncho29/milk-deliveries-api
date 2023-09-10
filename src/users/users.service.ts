import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);

      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    return await this.usersRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(key: string) {
    // Find by uuid, fullName or email
    let user: User;

    if (isUUID(key)) {
      user = await this.usersRepository.findOneBy({ id: key });
    } else {
      const queryBuilder = this.usersRepository.createQueryBuilder();
      user = await queryBuilder
        .where(`UPPER(fullName)=:fullName or email=:email`, {
          fullName: key.toUpperCase(),
          email: key,
        })
        .getOne();
    }

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    try {
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      this.handleDbException(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);
    return { message: 'User deleted' };
  }

  private handleDbException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}

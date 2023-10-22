import {
  Controller,
  Post,
  Body,
  Get,
  ParseUUIDPipe,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { PaginationDto } from '../common/dto/pagination.dto';
import {
  LoginUserDto,
  RegisterUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto';

import { Auth } from './decorators';

import { User } from './entities/user.entity';

import { ValidRoles } from './interfaces';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User was created',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.update(id, updateUserDto);
  }

  @Patch('update-password/:id')
  @Auth(ValidRoles.superadmin, ValidRoles.admin, ValidRoles.employee)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(id, updatePasswordDto);
  }
}

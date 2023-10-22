import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Delivery } from '../../deliveries/entities/delivery.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: '548ce7da-f7d2-4f0e-b3de-e303a29ce86e',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Sebastian Meneses',
    description: 'User fullname',
  })
  @Column('text', { unique: true })
  fullName: string;

  @ApiProperty({
    example: '1101699258',
    description: 'User DNI',
  })
  @Column('text', { unique: true })
  dni: string;

  @ApiProperty({
    example: 'sebagsmen29@gmail.com',
    description: 'User email',
  })
  @Column('text', { unique: true })
  email: string;

  @ApiProperty({
    example: 'Qwerty123',
    description: 'User password',
  })
  @Column('text', { select: false })
  password: string;

  @ApiProperty({
    example: '3154278963',
    description: 'User phone',
  })
  @Column('text')
  phone: string;

  @ApiProperty({
    example: 'Calle 3 #12-25',
    description: 'User address',
  })
  @Column('text')
  address: string;

  @ApiProperty({
    example: '6.470518',
    description: 'Latitude of the place',
  })
  @Column('text')
  latitude: string;

  @ApiProperty({
    example: '-73.2623187',
    description: 'Longitud of the place',
  })
  @Column('text')
  longitude: string;

  @ApiProperty({
    example: '{id: 979, name: "Socorro", departement_id: 28}',
    description: 'User city as object',
  })
  @Column('text')
  city: string;

  @ApiProperty({
    example: '{id: 28, name: "Santande"}',
    description: 'User deparment as object',
  })
  @Column('text')
  department: string;

  @ApiProperty({
    example: '[user]',
    description: 'User roles',
    type: [String],
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ApiProperty({
    example: false,
    description: 'User status',
  })
  @ApiProperty({
    example: false,
    description: 'User status',
    enum: ['Admin', 'Moderator', 'User'],
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT token for the authenticated user.',
  })
  token: string;

  @OneToMany(() => Delivery, (delivery) => delivery.customer, {
    cascade: true,
  })
  deliveriesCustomer: Delivery[];

  @OneToMany(() => Delivery, (delivery) => delivery.employee, {
    cascade: true,
  })
  deliveriesEmployee: Delivery[];

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBefeoreUpdate() {
    this.checkFieldBeforeInsert();
  }
}

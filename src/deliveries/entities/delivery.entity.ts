import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Delivery {
  @ApiProperty({
    example: '548ce7da-f7d2-4f0e-b3de-e303a29ce86e',
    description: 'Delivery ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 20,
    description: 'Quantity milk',
  })
  @Column('float', { default: 0 })
  quantity: number;

  @ManyToOne(() => User, (customer) => customer.deliveriesCustomer, {
    onDelete: 'CASCADE',
    eager: true,
  })
  customer: User;

  @ManyToOne(() => User, (employee) => employee.deliveriesEmployee, {
    onDelete: 'CASCADE',
    eager: true,
  })
  employee: User;

  @ApiProperty({
    example: '2023-10-21 21:45:07.195346',
    description: 'Create Date',
  })
  @CreateDateColumn()
  createDate: Date;

  @ApiProperty({
    example: '2023-10-21 21:45:07.195346',
    description: 'Update Date',
  })
  @UpdateDateColumn()
  updateDate: Date;
}

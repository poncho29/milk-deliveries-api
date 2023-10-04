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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  quantity: number;

  @ManyToOne(() => User, (customer) => customer.deliveries, {
    onDelete: 'CASCADE',
    // eager: true,
  })
  customer: User;

  @ManyToOne(() => User, (employee) => employee.deliveries, {
    onDelete: 'CASCADE',
    // eager: true,
  })
  employee: User;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}

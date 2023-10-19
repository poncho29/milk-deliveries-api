import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Delivery } from '../../deliveries/entities/delivery.entity';
import { City } from '../../locations/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  fullName: string;

  @Column('text', { unique: true })
  dni: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  phone: string;

  @Column('text')
  address: string;

  @Column('text')
  latitude: string;

  @Column('text')
  longitude: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => City)
  @JoinColumn()
  city: City;

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

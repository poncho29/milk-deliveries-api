import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  fulName: string;

  @Column('text', { nullable: false })
  dni: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: false })
  phone: string;

  @Column('text', { nullable: false })
  address: string;

  @Column('text', { nullable: false })
  latitude: string;

  @Column('text', { nullable: false })
  longitude: string;

  @Column({ default: 'user' })
  rol: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

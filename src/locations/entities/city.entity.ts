import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { State } from './state.entity';

@Entity()
export class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.city, {
    onDelete: 'CASCADE',
  })
  state: State;
}

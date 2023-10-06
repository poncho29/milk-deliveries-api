import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { City } from './city.entity';

@Entity()
export class State {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.state, {
    cascade: true,
  })
  city: City;
}

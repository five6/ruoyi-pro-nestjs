import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'game_props' })
export class Props extends Base {
  @Column()
  name: string;

  @Column()
  description: string;
}

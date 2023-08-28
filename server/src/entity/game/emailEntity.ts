import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'game_email' })
export class Email extends Base {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'text' })
  to: string;

  @Column({ type: 'json' })
  props: { propsId: number; count: number }[];
}

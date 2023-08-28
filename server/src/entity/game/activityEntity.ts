import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'game_activity' })
export class Activity extends Base {
  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: null })
  begin: Date;

  @Column({ type: 'timestamp', default: null })
  end: Date;

  @Column()
  type: number;
}

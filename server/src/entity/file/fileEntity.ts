import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'file_files' })
export class File extends Base {
  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  size: number;
}

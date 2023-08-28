import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'file_config' })
export class FileConfig extends Base {
  @Column({ name: 'config_id' })
  configId: number;

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

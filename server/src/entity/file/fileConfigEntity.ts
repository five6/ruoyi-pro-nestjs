import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'file_config' })
export class FileConfig extends Base {
  @Column()
  name: string;

  @Column()
  storage: number;

  @Column()
  remark: string;

  @Column()
  master: Boolean;

  @Column({ comment: '存储配置' })
  config: string;

}

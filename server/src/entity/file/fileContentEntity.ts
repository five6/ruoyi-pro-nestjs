import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'file_content' })
export class FileContent extends Base {
  @Column()
  configId: number;

  @Column()
  path: string;

  @Column()
  content: string;
}

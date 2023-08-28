import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_sensitive_word' })
export class SensitiveWord extends Base {
  @Column()
  name: string;

  @Column()
  description: string;
}

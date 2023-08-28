import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_post' })
export class Post extends Base {
  @Column({ name: 'code', comment: '岗位编码' })
  code: string;

  @Column({ name: 'name', comment: '岗位名称' })
  name: string;

  @Column({ name: 'sort', comment: '显示顺序', default: 1 })
  sort: number;
}

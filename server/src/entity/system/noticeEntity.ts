import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_notice' })
export class Notice extends Base {
  @Column({ comment: '公告标题' })
  title: string;

  @Column({ type: 'text', comment: '公告内容' })
  content: string;

  @Column({ default: '1', comment: '公告类型（1通知 2公告）', type: 'tinyint' })
  type: number;
}

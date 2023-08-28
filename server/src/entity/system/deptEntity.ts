import { Entity, Column, ObjectId, ObjectIdColumn, ManyToOne } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_dept' })
export class Dept extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ comment: '显示顺序' })
  sort: number;

  @Column({ comment: '负责人', nullable: true })
  leaderUserId: string;

  @Column({ comment: '手机号码', nullable: true })
  mobile: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;
}

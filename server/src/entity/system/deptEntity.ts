import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
import { BaseIntEntity } from '../common/baseIntegerEntity';

@Entity({ name: 'sys_dept' })
export class Dept extends BaseIntEntity {
  @Column({ unique: true })
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ comment: '显示顺序' })
  sort: number;

  @Column({ name: 'leader_user_id', comment: '负责人', nullable: true })
  leaderUserId: string;

  @Column({ name: 'mobile', comment: '创建者', nullable: true })
  mobile: string;

  @Column({ name: 'email', comment: '邮箱', nullable: true })
  email: string;
}

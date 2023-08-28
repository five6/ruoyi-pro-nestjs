import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_notify_template' })
export class NotifyTemplate extends Base {
  @Column({ name: 'name', comment: '模板名称' })
  name: string;

  @Column({ name: 'code', comment: '模版编码' })
  code: string;

  @Column({ name: 'nickName', comment: '发送人名称' })
  nickName: string;

  @Column({ name: 'content', comment: '模版内容' })
  content: string;

  @Column({
    name: 'type',
    comment: '类型',
  })
  type: number;

  @Column({ name: 'params', comment: '参数数组', nullable: true })
  params: string;

  @Column({ comment: '模版参数', nullable: true })
  remark: string;
}

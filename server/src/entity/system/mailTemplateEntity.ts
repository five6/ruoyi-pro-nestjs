import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_mail_template' })
export class MailTemplate extends Base {
  @Column({ comment: '模板名称' })
  name: string;

  @Column({ comment: '模板编码' })
  code: string;

  @ObjectIdColumn({ comment: '发送的邮箱账号编号' })
  accountId: ObjectId;

  @Column({
    nullable: true,
    comment: '发送人名称',
  })
  nickName: string;

  @Column({ comment: '模板标题' })
  title: string;

  @Column({ comment: '模板内容' })
  content: string;

  @Column({ comment: '参数数组' })
  params: string;

  @Column({ nullable: true, comment: '备注' })
  remark: string | null;
}

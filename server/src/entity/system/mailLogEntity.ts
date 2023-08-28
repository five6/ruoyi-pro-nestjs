import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_mail_log' })
export class MailLog extends Base {
  @ObjectIdColumn({
    nullable: true,
    comment: '用户编号',
  })
  userId: string;

  @Column({
    nullable: true,
    comment: '用户类型',
  })
  userType: number;

  @Column({ comment: '接收邮箱地址' })
  toMail: string;

  @ObjectIdColumn({ comment: '邮箱账号编号' })
  accountId: ObjectId;

  @Column({ comment: '发送邮箱地址' })
  fromMail: string;

  @ObjectIdColumn({ comment: '模板编号' })
  templateId: ObjectId;

  @Column({ comment: '模板编码' })
  templateCode: string;

  @Column({
    nullable: true,
    comment: '模版发送人名称',
  })
  templateNickName: string;

  @Column({ comment: '邮件标题' })
  templateTitle: string;

  @Column({ comment: '邮件内容' })
  templateContent: string;

  @Column({ comment: '邮件参数' })
  templateParams: string;

  @Column({
    comment: '发送状态',
    default: 0,
  })
  sendStatus: number;

  @Column({
    nullable: true,
    comment: '发送时间',
  })
  sendTime: Date;

  @Column({
    nullable: true,
    comment: '发送返回的消息 ID',
  })
  sendMessageId: string;

  @Column({
    nullable: true,
    comment: '发送异常',
  })
  sendException: string;
}

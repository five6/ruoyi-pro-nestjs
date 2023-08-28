import { Entity, Column } from 'typeorm';
import { BaseNoTenantIdEntity } from '../common/baseNoTenantIdEntity';

@Entity({ name: 'sys_mail_log' })
export class MailLog extends BaseNoTenantIdEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
    nullable: true,
    comment: '用户编号',
  })
  userId: number;

  @Column({
    type: 'tinyint',
    name: 'user_type',
    nullable: true,
    comment: '用户类型',
  })
  userType: number;

  @Column({ length: 255, comment: '接收邮箱地址' })
  to_mail: string;

  @Column({ type: 'bigint', name: 'account_id', comment: '邮箱账号编号' })
  accountId: number;

  @Column({ name: 'from_mail', length: 255, comment: '发送邮箱地址' })
  fromMail: string;

  @Column({ type: 'bigint', name: 'template_id', comment: '模板编号' })
  templateId: number;

  @Column({ name: 'template_code', length: 63, comment: '模板编码' })
  templateCode: string;

  @Column({
    name: 'template_nickname',
    length: 255,
    nullable: true,
    comment: '模版发送人名称',
  })
  templateNickName: string;

  @Column({ name: 'template_title', length: 255, comment: '邮件标题' })
  templateTitle: string;

  @Column({ name: 'template_content', type: 'text', comment: '邮件内容' })
  templateContent: string;

  @Column({ name: 'template_params', length: 255, comment: '邮件参数' })
  templateParams: string;

  @Column({
    type: 'tinyint',
    name: 'send_status',
    comment: '发送状态',
    default: 0,
  })
  sendStatus: number;

  @Column({
    type: 'datetime',
    name: 'send_time',
    nullable: true,
    comment: '发送时间',
  })
  sendTime: Date;

  @Column({
    name: 'send_message_id',
    length: 255,
    nullable: true,
    comment: '发送返回的消息 ID',
  })
  sendMessageId: string;

  @Column({
    name: 'send_exception',
    length: 4096,
    nullable: true,
    comment: '发送异常',
  })
  sendException: string;
}

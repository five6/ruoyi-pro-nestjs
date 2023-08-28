import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_sms_template' })
export class SmsTemplate extends Base {
  @Column({ name: 'type', type: 'tinyint', comment: '短信签名' })
  type: number;

  @Column({ name: 'code', comment: '模板编码' })
  code: string;

  @Column({ name: 'name', comment: '模板名称' })
  name: string;

  @Column({ name: 'content', comment: '模板内容' })
  content: string;

  @Column({ name: 'params', comment: '参数数组' })
  params: string;

  @Column({ name: 'remark', comment: '备注', nullable: true })
  remark: string;

  @Column({ name: 'api_template_id', comment: '短信 API 的模板编号' })
  apiTemplateId: string;

  @Column({
    name: 'channel_id',
    type: 'bigint',
    comment: '今日发送的第几条',
    default: 0,
  })
  channelId: number;

  @Column({
    name: 'channel_code',
    comment: '短信渠道编码',
    nullable: true,
  })
  channelCode: string;
}

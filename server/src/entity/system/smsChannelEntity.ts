import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_sms_channel' })
export class SmsChannel extends Base {
  @Column({ name: 'name', comment: '短信签名' })
  signature: string;

  @Column({ name: 'code', comment: '渠道编码' })
  code: string;

  @Column({ name: 'remark', nullable: true })
  remark: string;

  @Column({ name: 'apiKey', comment: '短信 API 的账号' })
  apiKey: string;

  @Column({ name: 'apiSecret', comment: '短信 API 的秘钥' })
  apiSecret: string;

  @Column({ name: 'callbackUrl', comment: '短信 API 的秘钥' })
  callbackUrl: string;
}

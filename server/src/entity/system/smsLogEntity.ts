import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_sms_log' })
export class SmsLog extends Base {
  @Column({ name: 'channel_id', comment: '短信渠道编号' })
  channelId: number;

  @Column({ name: 'channel_code', comment: '短信渠道编码' })
  channelCode: string;

  @Column({ name: 'template_id', comment: '模板编号' })
  templateId: number;

  @Column({ name: 'template_code', comment: '模板编码' })
  templateCode: string;

  @Column({ name: 'template_type', type: 'tinyint', comment: '短信类型' })
  templateType: number;

  @Column({ name: 'template_content', comment: '短信内容' })
  templateContent: number;

  @Column({ name: 'template_params', comment: '短信参数' })
  templateParams: string;

  @Column({ name: 'api_template_id', comment: '短信 API 的模板编号' })
  apiTemplateId: string;

  @Column({ name: 'mobile', comment: '手机号' })
  mobile: string;

  @Column({ name: 'user_id', type: 'bigint', comment: '用户编号' })
  userId: number;

  @Column({ name: 'user_type', type: 'tinyint', comment: '用户类型' })
  userType: number;

  @Column({
    name: 'send_status',
    type: 'tinyint',
    comment: '发送状态',
    default: 0,
  })
  sendStatus: number;

  @Column({
    name: 'send_time',
    type: 'datetime',
    comment: '发送时间',
    nullable: true,
  })
  sendTime: Date;

  @Column({ name: 'send_code', comment: '发送结果的编码', nullable: true })
  sendCode: number;

  @Column({ name: 'send_msg', comment: '发送结果的提示', nullable: true })
  sendMsg: string;

  @Column({
    name: 'api_send_code',
    comment: '短信 API 发送结果的编码',
    nullable: true,
  })
  apiSendCode: string;

  @Column({
    name: 'api_send_msg',
    comment: '短信 API 发送失败的提示',
    nullable: true,
  })
  apiSendMsg: string;

  @Column({
    name: 'api_request_id',
    comment: '短信 API 发送返回的唯一请求 ID',
    nullable: true,
  })
  apiRequestId: string;

  @Column({
    name: 'api_serial_no',
    comment: '短信 API 发送返回的序号',
    nullable: true,
  })
  apiSerialNo: string;

  @Column({
    name: 'receive_status',
    type: 'tinyint',
    comment: '接收状态',
    default: 0,
  })
  receiveStatus: string;

  @Column({
    name: 'receive_time',
    type: 'datetime',
    comment: '接收时间',
    nullable: true,
  })
  receiveTime: Date;

  @Column({
    name: 'api_receive_code',
    comment: 'API 接收结果的编码',
    nullable: true,
  })
  apiReceiveCode: string;

  @Column({
    name: 'api_receive_msg',
    comment: 'API 接收结果的说明',
    nullable: true,
  })
  apiReceiveMsg: string;
}

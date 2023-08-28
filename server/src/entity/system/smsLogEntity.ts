import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_sms_log' })
export class SmsLog extends Base {
  @Column({ name: 'channelId', comment: '短信渠道编号' })
  channelId: number;

  @Column({ name: 'channelCode', comment: '短信渠道编码' })
  channelCode: string;

  @Column({ name: 'templateId', comment: '模板编号' })
  templateId: number;

  @Column({ name: 'templateCode', comment: '模板编码' })
  templateCode: string;

  @Column({ name: 'templateType', comment: '短信类型' })
  templateType: number;

  @Column({ name: 'templateContent', comment: '短信内容' })
  templateContent: number;

  @Column({ name: 'templateParams', comment: '短信参数' })
  templateParams: string;

  @Column({ name: 'apiTemplateId', comment: '短信 API 的模板编号' })
  apiTemplateId: string;

  @Column({ name: 'mobile', comment: '手机号' })
  mobile: string;

  @Column({ name: 'userId', comment: '用户编号' })
  userId: number;

  @Column({ name: 'userType', comment: '用户类型' })
  userType: number;

  @Column({
    name: 'sendStatus',
    comment: '发送状态',
    default: 0,
  })
  sendStatus: number;

  @Column({
    name: 'sendTime',
    comment: '发送时间',
    nullable: true,
  })
  sendTime: Date;

  @Column({ name: 'sendCode', comment: '发送结果的编码', nullable: true })
  sendCode: number;

  @Column({ name: 'sendMsg', comment: '发送结果的提示', nullable: true })
  sendMsg: string;

  @Column({
    name: 'apiSendCode',
    comment: '短信 API 发送结果的编码',
    nullable: true,
  })
  apiSendCode: string;

  @Column({
    name: 'apiSendMsg',
    comment: '短信 API 发送失败的提示',
    nullable: true,
  })
  apiSendMsg: string;

  @Column({
    name: 'apiRequestId',
    comment: '短信 API 发送返回的唯一请求 ID',
    nullable: true,
  })
  apiRequestId: string;

  @Column({
    name: 'apiSerialNo',
    comment: '短信 API 发送返回的序号',
    nullable: true,
  })
  apiSerialNo: string;

  @Column({
    name: 'receiveStatus',
    comment: '接收状态',
    default: 0,
  })
  receiveStatus: string;

  @Column({
    name: 'receiveTime',
    comment: '接收时间',
    nullable: true,
  })
  receiveTime: Date;

  @Column({
    name: 'apiReceiveCode',
    comment: 'API 接收结果的编码',
    nullable: true,
  })
  apiReceiveCode: string;

  @Column({
    name: 'apiReceiveMsg',
    comment: 'API 接收结果的说明',
    nullable: true,
  })
  apiReceiveMsg: string;
}

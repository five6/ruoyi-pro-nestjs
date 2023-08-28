import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_sms_code' })
export class SmsCode extends Base {
  @Column({ name: 'name', comment: '手机号' })
  mobile: string;

  @Column({ name: 'code', comment: '验证码' })
  code: string;

  @Column({ name: 'create_ip', comment: '创建 IP'})
  createIp: string;

  @Column({ name: 'scene', type: 'tinyint', comment: '发送场景' })
  scene: number;

  @Column({
    name: 'today_index',
    type: 'tinyint',
    comment: '今日发送的第几条',
    default: 0,
  })
  todayIndex: number;

  @Column({
    name: 'api_secret',
    type: 'tinyint',
    comment: '是否使用',
    nullable: true,
  })
  used: number;

  @Column({
    name: 'used_time',
    type: 'datetime',
    comment: '使用时间',
    nullable: true,
  })
  usedTime: Date;

  @Column({ name: 'used_ip', comment: '使用 IP', nullable: true })
  usedIp: string;
}

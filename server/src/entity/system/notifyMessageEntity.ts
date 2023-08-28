import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_notify_message' })
export class NotifyMessage extends Base {
  @Column({ name: 'user_id', comment: '用户id', type: 'bigint' })
  userId: number;

  @Column({ name: 'user_type', comment: '用户类型', type: 'tinyint' })
  userType: string;

  @Column({ name: 'template_id', comment: '模版编号', type: 'bigint' })
  templateId: number;

  @Column({ name: 'template_code', comment: '模版编号' })
  templateCode: string;

  @Column({ name: 'template_nickname', comment: '模版发送人名称' })
  templateNickname: string;

  @Column({ name: 'template_content', comment: '模版内容' })
  templateContent: string;

  @Column({ name: 'template_params', comment: '模版参数' })
  templateParams: string;

  @Column({ name: 'read_status', type: 'tinyint', comment: '是否已读' })
  readStatus: number;

  @Column({ name: 'read_time', type: 'datetime', comment: '已读时间' })
  readTime: number;
}

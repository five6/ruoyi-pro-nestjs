import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { Base } from '../common/baseEntity';
import { UserTypeEnum } from '../../Enum/Global';
@Entity({ name: 'sys_notify_message' })
export class NotifyMessage extends Base {
  @ObjectIdColumn({ name: 'userId', comment: '用户id' })
  userId: string;

  @Column({ name: 'userType', comment: '用户类型' })
  userType: UserTypeEnum;

  @Column({ name: 'templateId', comment: '模版编号' })
  templateId: number;

  @Column({ name: 'templateCode', comment: '模版编号' })
  templateCode: string;

  @Column({ name: 'templateNickname', comment: '模版发送人名称' })
  templateNickname: string;

  @Column({ name: 'templateContent', comment: '模版内容' })
  templateContent: string;

  @Column({ name: 'templateParams', comment: '模版参数' })
  templateParams: string;

  @Column({ name: 'readStatus', comment: '是否已读', default: false })
  readStatus: boolean;

  @Column({ name: 'readTime', comment: '已读时间' })
  readTime: Date;
}

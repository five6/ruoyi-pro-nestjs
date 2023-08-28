import { Entity, Column } from 'typeorm';
import { BaseNoTenantIdEntity } from '../common/baseNoTenantIdEntity';

@Entity({ name: 'sys_mail_template' })
export class MailTemplate extends BaseNoTenantIdEntity {
  @Column({ comment: '模板名称' })
  name: string;

  @Column({ comment: '模板编码' })
  code: string;

  @Column({ name: 'account_id', type: 'bigint', comment: '发送的邮箱账号编号' })
  accountId: number;

  @Column({
    name: 'nickname',
    length: 255,
    nullable: true,
    comment: '发送人名称',
  })
  nickName: string;

  @Column({ length: 255, comment: '模板标题' })
  title: string;

  @Column({ type: 'text', comment: '模板内容' })
  content: string;

  @Column({ length: 255, comment: '参数数组' })
  params: string;

  @Column({ length: 255, nullable: true, comment: '备注' })
  remark: string | null;
}

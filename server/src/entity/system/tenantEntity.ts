import { Entity, Column } from 'typeorm';
import { BaseIntNoTenantIdEntity } from '../common/baseIntegerNoTenantIdEntity';

@Entity({ name: 'sys_tenant' })
export class Tenant extends BaseIntNoTenantIdEntity {
  @Column({ name: 'name', comment: '租户名' })
  name: string;

  @Column({
    name: 'contact_user_id',
    type: 'bigint',
    comment: '联系人的用户编号',
    nullable: true,
  })
  contactUserId: number;

  @Column({ name: 'contact_name', comment: '联系人', nullable: true })
  contactName: string;

  @Column({ name: 'contact_mobile', comment: '手机号码', nullable: true })
  contactMobile: string;

  @Column({ name: 'domain', comment: '绑定域名', nullable: true })
  domain: string;

  @Column({ name: 'package_id', comment: '租户套餐编号', nullable: true })
  packageId: string;

  @Column({ name: 'expire_time', comment: '过期时间', nullable: true })
  expireTime: Date;

  @Column({ name: 'account_count', comment: '账号数量', nullable: true })
  accountCount: number;
}

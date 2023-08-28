import { Entity, Column } from 'typeorm';
import { BaseIntNoTenantIdEntity } from '../common/baseIntegerNoTenantIdEntity';

@Entity({ name: 'sys_tenant_package' })
export class TenantPackage extends BaseIntNoTenantIdEntity {
  @Column({ name: 'name', comment: '套餐名' })
  name: string;

  @Column({ name: 'menu_ids', length: 2048, comment: '过期时间' })
  menuIds: string;

  @Column({ name: 'remark', comment: '备注', default: '' })
  remark: string;
}

import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
import { BaseIntEntity } from '../common/baseIntegerEntity';
@Entity({ name: 'sys_role_menu' })
export class RoleMenu extends BaseIntEntity {
  @Column({ name: 'menu_id', comment: '菜单Id', default: 1 })
  menuId: number;

  @Column({ name: 'role_id', comment: '角色Id', default: 1 })
  roleId: number;

  permissions: number[];
}

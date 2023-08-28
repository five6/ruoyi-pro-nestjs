import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { Base } from '../common/baseEntity';
import { RoleTypeEnum } from '../../Enum/Global';

@Entity({ name: 'sys_role' })
export class Role extends Base {
  @Column({ name: 'name', comment: '角色名称', unique: true })
  name: string;

  @Column({ name: 'code', comment: '角色权限字符串' })
  code: string;

  @Column({ name: 'sort', comment: '显示顺序', default: 0 })
  sort: number;

  @Column({
    name: 'dataScope',
    comment:
      '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限） 目前默认1',
    default: 1,
  })
  dataScope: number;

  @Column({
    name: 'dataScopeDeptIds',
    comment: '数据范围(指定部门数组)',
    default: '',
  })
  dataScopeDeptIds: string;

  @Column({
    comment: '角色类型: 1.内置角色，2.自定义角色',
    default: RoleTypeEnum.CUSTOM,
  })
  type: number;

  @Column({ name: 'menuIds', comment: '菜单id', nullable: true })
  menuIds: string[];

  @Column({ comment: '备注', nullable: true })
  remark: string;
}

import { Entity, Column } from 'typeorm';
import { MenuEnum } from '../../Enum/Global';
import { BaseIntEntity } from '../common/baseIntegerEntity';
@Entity({ name: 'sys_menu' })
export class Menu extends BaseIntEntity {
  @Column({ name: 'name', comment: '路由名称' })
  name: string;

  @Column({ name: 'permission', comment: '权限标识' })
  permission: string;

  @Column({
    name: 'type',
    comment: '菜单类型: 1.目录，2.菜单,3:按钮',
    default: MenuEnum.Directory,
  })
  type: MenuEnum;

  @Column({ name: 'sort', comment: '排序', nullable: true, default: 0 })
  sort: number;

  @Column({ name: 'parent_id', comment: '父级ID', default: 0 })
  parentId: number;

  @Column({ name: 'path', comment: '路由地址', nullable: true })
  path: string;

  @Column({ name: 'icon', comment: '菜单图标', nullable: true })
  icon: string;

  @Column({ name: 'component', comment: '组件名称', nullable: true })
  component: string;

  @Column({ name: 'component_name', comment: '组件名称', nullable: true })
  componentName: string;

  @Column({ name: 'visible', comment: '是否可见', default: true })
  visible: boolean;

  @Column({ name: 'keep_alive', comment: '是否缓存组件状态', default: true })
  keepAlive: boolean;

  @Column({ name: 'always_show', comment: '是否总是显示', default: true })
  alwaysShow: boolean;

  children: Menu[];
}

import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { MenuEnum } from '../../Enum/Global';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_menu' })
export class Menu extends Base {
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

  @Column({ name: 'sort', comment: '排序', nullable: true, default: null })
  sort: number;

  @Column({ comment: '父级ID' })
  parentId: string;

  @Column({ name: 'path', comment: '路由地址', nullable: true })
  path: string;

  @Column({ name: 'icon', comment: '菜单图标', nullable: true })
  icon: string;

  @Column({ name: 'component', comment: '组件名称', nullable: true })
  component: string;

  @Column({ name: 'componentName', comment: '组件名称', nullable: true })
  componentName: string;

  @Column({ name: 'visible', comment: '是否可见', default: true })
  visible: boolean;

  @Column({ name: 'keepAlive', comment: '是否缓存组件状态', default: true })
  keepAlive: boolean;

  @Column({ name: 'alwaysShow', comment: '是否总是显示', default: true })
  alwaysShow: boolean;

  children: Menu[];
}

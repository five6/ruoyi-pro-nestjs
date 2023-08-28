import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_user_role' })
export class UserRole extends Base {
  @Column({ name: 'user_id', comment: '用户Id', default: 1 })
  userId: number;

  @Column({ name: 'role_id', comment: '角色Id', default: 1 })
  roleId: number;
}

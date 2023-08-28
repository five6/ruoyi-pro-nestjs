import { Entity, Column } from 'typeorm';
import * as crypto from 'crypto';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_user' })
export class Admin extends Base {
  @Column({ unique: true, name: 'user_name' })
  userName: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column()
  password: string;

  @Column({ name: 'id_card', default: null, nullable: true })
  idCard: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  sex: number;

  @Column({ unique: true })
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'role_id', nullable: true })
  roleId: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ name: 'validate_token' })
  validateToken: string;

  @Column()
  salt: string;

  @Column({ name: 'dept_id', nullable: true })
  deptId: number;

  @Column({ nullable: true })
  remark: string;

  @Column({ name: 'is_super', default: false })
  isSuper: boolean;

  dept: any;

  authenticate(password: string): boolean {
    return this.encryptPassword(password) === this.password;
  }

  makeSalt(): string {
    return Date.now().toString();
  }

  encryptPassword(password: string): string {
    if (!password) {
      return '';
    }
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }

}

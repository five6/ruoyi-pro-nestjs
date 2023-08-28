import { Entity, Column, ObjectId, ManyToOne } from 'typeorm';
import * as crypto from 'crypto';
import { Base } from '../common/baseEntity';

@Entity({ name: 'sys_user' })
export class Admin extends Base {
  @Column({ unique: true })
  userName: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  idCard: string;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  sex: number;

  @Column({ unique: true })
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  roleIds: string[];

  @Column({ nullable: true })
  avatar: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  deptId: string;

  @Column({ nullable: true })
  remark: string;

  @Column({ default: false })
  isSuper: boolean;

  dept: any;
}

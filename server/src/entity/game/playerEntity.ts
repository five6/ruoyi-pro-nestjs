import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';

@Entity({ name: 'game_user' })
export class Player extends Base {
  @Column({ name: 'open_id', unique: true })
  openId: string;

  @Column({ name: 'user_name', nullable: true })
  userName: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column()
  gender: number;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @Column({ name: 'union_id' })
  unionId: string;

  @Column()
  avatar: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  type: number;
}

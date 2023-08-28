import { Entity, Column } from 'typeorm';
import { Base } from '../common/baseEntity';
@Entity({ name: 'sys_mail_account' })
export class mailAccount extends Base {
  @Column({ name: 'mail', comment: '邮箱' })
  mail: string;

  @Column({ name: 'username', comment: '用户名' })
  userName: string;

  @Column({ name: 'password', comment: '密码' })
  password: string;

  @Column({ name: 'host', comment: 'SMTP 服务器域名' })
  host: string;

  @Column({ name: 'port', comment: 'SMTP 服务器端口' })
  port: number;

  @Column({ comment: '是否开启 SSL' })
  sslEnable: boolean;
}

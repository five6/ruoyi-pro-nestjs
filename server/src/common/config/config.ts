export class Config {
  // 邮件发送地址
  static MAIL_CONF = {
    user: '936***511@qq.com',
    pass: 'xxx',
  };

  static jimpSize = [
    { width: 100, height: 100 },
    { width: 200, height: 200 },
    { width: 400, height: 400 },
  ];

  static ADMIN_API_PREFIX = 'zzz/api/admin';
  static APP_API_PREFIX = 'zzz/api/app';
  static DEVICE_API_PREFIX = 'zzz/api/device';

  static JWT_EXPIRE_TIME = 86400; // 1d
}

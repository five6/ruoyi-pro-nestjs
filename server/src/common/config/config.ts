export class Config {
  // 邮件发送地址
  static MAIL_CONF = {
    user: '936333511@qq.com',
    pass: 'xdcuxzvtylkkbfhb',
  };

  static jimpSize = [
    { width: 100, height: 100 },
    { width: 200, height: 200 },
    { width: 400, height: 400 },
  ];

  static ADMIN_API_PREFIX = 'glx/api/v1';

  static USER_AUTH_JWT_PREFIX = 'glx:auth:jwt';
  static USER_INFO_DETAIL_PREFIX = 'glx:user:info:detail';

  static JWT_EXPIRE_TIME = 86400; // 1d
}

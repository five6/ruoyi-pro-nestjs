import { UnauthorizedException } from '@nestjs/common';

export const errors = {
  USER_VALIDATE_ERROR: {
    code: 10000,
    message: '用户名不存在或密码错误',
  },
  USER_LOCKED: {
    code: 100001,
    message: '用户已被锁定，禁止登录',
  },
  USER_ADD_FAIL: {
    code: 100002,
    message: '添加失败',
  },
  ILLEGAL_TOKEN: {
    code: 100003,
    message: '无效的令牌',
  },
  OTHER_CLIENT_LOGGED: {
    code: 100004,
    message: '用户已在其环境登录',
  },
  TOKEN_EXPIRED: {
    code: 100005,
    message: '令牌已过期',
  },
  UN_AUTHORIZED: {
    code: 100006,
    message: '请求失败，请登录后重试',
  },
  CREATE_ERROR_OF_NAME_EXISTS: {
    code: 100007,
    message: '创建失败, 名字重复，请检查后重试',
  },
  UNKNOWN_ERROR: {
    code: 100008,
    message: '未知错误，请联系管理员',
  },
  INVALID_WECHAT_CODE: {
    code: 100009,
    message: '请输入微信授权码',
  },
  WECHAT_INVALID_CODE_ERROR: {
    code: 100010,
    message: '根据微信授权码获取用户失败',
  },
  USER_NOT_EXISTS: {
    code: 100011,
    message: '用户不存在',
  },
  MENU_EXISTS_CHILDREN: {
    code: 100012,
    message: '菜单存在子菜单',
  },
  MENU_NOT_EXISTS: {
    code: 100013,
    message: '菜单不存在',
  },
  ROLE_NOT_EXISTS: {
    code: 100014,
    message: '角色不存在',
  },
  SYSTEM_ROLE_CANT_DELETE: {
    code: 100015,
    message: '内置角色不能删除',
  },
};

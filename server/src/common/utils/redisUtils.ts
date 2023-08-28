// JWT
const USER_AUTH_JWT_PREFIX = 'zzz:auth:jwt';
// USER DETAIL
const USER_DETAIL_PREFIX = 'zzz:user:detail';

// 暴露工具
export const redisUtils = {
  getAuthJwtPrefixLenth(key: string) {
    return `${USER_AUTH_JWT_PREFIX}:${key}:*`;
  },
  // 单客户端在线
  getSingleAuthJwtPrefix(key: string) {
    return `${USER_AUTH_JWT_PREFIX}:${key}`;
  },
  // 多客户端在线
  getAuthJwtPrefix(key: string, nextIndex = 1) {
    return `${USER_AUTH_JWT_PREFIX}:${key}:${nextIndex}`;
  },
  getUserDetailPrefix(key: string) {
    return `${USER_DETAIL_PREFIX}:${key}`;
  },
};

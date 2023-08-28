import * as jwt from 'jsonwebtoken';
// 从jwt中获取值
export function getParamFromToken(
  authorizationHeader: string,
  jwtSecret: string,
  param = 'userId',
): string {
  const token = authorizationHeader.split(' ')[1]; // 从 "Bearer <token>" 中提取出令牌
  const decodedToken: any = jwt.verify(token, jwtSecret); // 解码令牌
  // 假设令牌中包含了用户ID字段
  return decodedToken[param];
}

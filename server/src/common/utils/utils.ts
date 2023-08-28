import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Config } from '../config/config';

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

// 根据密码和盐设置生成密码
export async function generatePassword(password, salt): Promise<string> {
  return await bcrypt.hashSync(password, salt);
}
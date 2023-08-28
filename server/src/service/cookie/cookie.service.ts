import { Injectable } from '@nestjs/common';

@Injectable()
export class CookieService {
  //设置
  set(res, key: string, value: any, expires?: number) {
    expires = expires ? expires : 24 * 3600 * 1000;
    res.cookie(key, JSON.stringify(value), {
      maxAge: expires, //过期时间
      httpOnly: true, //只有nodejs可以操作cookie
      signed: true, // 对cookies加密
    });
  }
  //获取
  get(req, key) {
    try {
      const data = req.signedCookies[key];
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

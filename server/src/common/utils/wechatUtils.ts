import * as crypto from 'crypto';

export class WechatUtils {
  private readonly app_id: string;
  private readonly session_key: string;
  constructor(app_id: string, session_key: string) {
    this.app_id = app_id;
    this.session_key = session_key;
  }

  decryptData(encryptedData: any, iv: any) {
    // base64 decode
    const sessionKey = Buffer.from(this.session_key, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');
    let decoded = {} as any;
    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
    if (decoded.watermark.appid !== this.app_id) {
      throw new Error('Illegal Buffer');
    }
    return decoded;
  }
}

// const wechatUtils = new WechatUtils(
//   'xxxx',
//   'xxxx',
// );

// wechatUtils.decryptData(
//   'xxxxx',
// );

import { Injectable } from '@nestjs/common';

//引入验证码库
import * as svgCaptcha from 'svg-captcha';
import * as _ from 'lodash';
import * as nodemailer from 'nodemailer';
import { Config } from '../../common/config/config';
import { AzLogger } from '../logger/logger.service';
import * as crypto from 'crypto';
//格式化日期
import { format } from 'silly-datetime';
import { extname } from 'path';
//创建目录
import Jimp from 'jimp';
import { nanoid } from 'nanoid/async';
import { log } from 'console';

@Injectable()
export class ToolsService {
  logger = new AzLogger();
  transporter = null;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'qq',
      port: 465, // SMTP 端口
      ssl: false, // 使用 SSL
      auth: {
        user: Config.MAIL_CONF.user,
        pass: Config.MAIL_CONF.pass,
      },
    });
  }

  getCaptcha(size?: number, width?: number, height?: number) {
    return svgCaptcha.create({
      noise: 0,
      size: size || 4,
      fontSize: 46,
      width: width || 110,
      height: height || 38,
      ignoreChars: '0Oo1ilL', // 忽略一些容易混淆的字符
      // background: '#000000',
      // background: '#f0f0f0', // 设置背景颜色
      color: false, // 使用随机颜色
    });
  }

  createUserPassword(password: string, salt: string) {
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha1', salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  }

  getMd5(str: string) {
    return crypto.createHash('md5').update(str).digest('hex');
  }

  async sendEmail(mail: string, title: any, body: any) {
    const info = {
      from: Config.MAIL_CONF.user, // sender address
      to: mail, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(info, (err, info) => {
        if (err) {
          reject(err);
        }
        resolve(info);
      });
    });
  }

  async sendRegistConfirimMailUser(
    mail: string,
    username: string,
    password: string,
    url: string,
  ) {
    const tplTitle = _.template('用户注册结果');
    const tplBody = `<p>注册成功!<br /> 用户名是${username}、密码是${password},请点击下面链接完成验证，链接有效期24小时<br /> ${url}</p>`;
    const dataTitle = { platform: tplTitle };
    const result = await this.sendEmail(
      mail,
      tplTitle(dataTitle),
      tplBody,
    ).catch((err) => {
      this.logger.error('邮件发送失败', err);
    });
    if (result) {
      this.logger.log('Email send success! (' + mail + ')');
    }
  }

  getRandomNum() {
    let random_str = '';
    for (let i = 0; i < 4; i++) {
      random_str += Math.floor(Math.random() * 10);
    }
    return random_str;
  }

  async success(res, redirectUrl) {
    await res.render('admin/public/success', {
      redirectUrl: redirectUrl,
    });
  }

  async error(res, message) {
    throw new Error(message);
  }

  getTime() {
    const d = new Date();
    return d.getTime();
  }

  getDay() {
    const day = format(new Date(), 'YYYYMMDD');
    return day;
  }

  jimpImg(target) {
    Jimp.read(target, (err, lenna) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < Config.jimpSize.length; i++)
          lenna
            .resize(Config.jimpSize[i].width, Config.jimpSize[i].height) // resize
            .quality(100) // set JPEG quality
            .write(
              `${target}_${Config.jimpSize[i].width}x${
                Config.jimpSize[i].height
              }${extname(target)}`,
            );
      }
    });
  }

  /**
   * 设置转换list to tree
   * @param data
   */
  convertMenuToResult(data: any[]) {
    data.forEach((d) => {
      d.id = d.id + '';
      if (d.parentId == '0') d.parentId = 0;
    });
    function getTrees(pid = '') {
      if (!pid) {
        // 如果没有父id（第一次递归的时候）将所有父级查询出来
        return data
          .filter((item) => !item.parentId)
          .map((item) => {
            // 通过父节点ID查询所有子节点
            item.children = getTrees(item.id);
            if (!item.children?.length) {
              item.children = null;
            }
            return item;
          });
      } else {
        return data
          .filter((item) => item.parentId == pid)
          .map((item) => {
            // 通过父节点ID查询所有子节点
            item.children = getTrees(item.id);
            if (!item.children?.length) {
              item.children = null;
            }
            return item;
          });
      }
    }

    return getTrees();
  }

  convertTextToArray(str: string, char?: string): string[] {
    char = char || '\n';
    return str.split(char).filter((item) => !!item);
  }
}

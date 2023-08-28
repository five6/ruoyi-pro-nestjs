import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../../user/user.service';
import { RedisService } from '../../redis/redis.service';
import { Config } from '../../../common/config/config';
import { ToolsService } from '../../tools/tools.service';
import { WechatLoginDto } from '../../../dto/wechat-login.dto';
import { UserInterface } from 'src/interface/user.interface';
import { ConfigService } from '@nestjs/config';
import { Player } from '../../../entity/game/playerEntity';

@Injectable()
export class AuthService {
  constructor(
    private redis: RedisService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly toolService: ToolsService,
    private configService: ConfigService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.adminService.findOne({ userName });
    if (!user) {
      return null;
    }
    const pass = user.encryptPassword(password);
    if (pass == user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, validateToken, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any) {
    const payload = {
      userName: user.userName,
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: +this.configService.get<number>('JWT_EXPIRE_TIME'),
      }),
    };
  }

  async loginWithWechat(body: WechatLoginDto) {
    const userInfo: UserInterface = await this.userService.getWxUserOpenId(
      body.code,
      body.encryptedData,
      body.iv,
    );
    const openid = userInfo.openid;
    // 查找用户是否存在
    let user: Player = await this.userService.findUserByOpenId(openid);
    if (!user) {
      // 保存用户
      user = await this.userService.add(userInfo);
    }
    if (!user.id) {
      throw new BadRequestException('获取微信用户失败。');
    }

    if (user.status == 0) {
      throw new BadRequestException('玩家已被禁用');
    }
    const obj = await this.signIn({
      id: user.id,
      userName: this.toolService.getMd5(openid),
    });
    const key = `${user.id}_${user.openId}`;
    const seconds = this.configService.get<number>('JWT_EXPIRE_TIME'); // 1天
    await this.redis.set(
      `${Config.USER_AUTH_JWT_PREFIX}:${key}`,
      obj.access_token,
      seconds,
    );
    return {
      token: `Bearer ${obj.access_token}`,
    };
  }
}

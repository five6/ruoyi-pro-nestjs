import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RedisService } from '../../redis/redis.service';
import { ToolsService } from '../../tools/tools.service';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private redis: RedisService,
    private readonly adminService: UserService,
    private readonly jwtService: JwtService,
    private readonly toolService: ToolsService,
    private configService: ConfigService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.adminService.findOne({ userName });
    if (!user) {
      return null;
    }
    const isCorrect = await bcrypt.compareSync(password, user.password);
    if (isCorrect) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any) {
    const payload = {
      userName: user.userName,
      userId: user.id,
      permissions: user.permissions,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: +this.configService.get<number>('JWT_EXPIRE_TIME'),
      }),
    };
  }

  /**
   * get login User Info
   * @param id
   */
  async getLoginUser(id) {
    return await this.adminService.adminRepository.findOneBy({
      _id: new ObjectId(id),
    });
  }
}

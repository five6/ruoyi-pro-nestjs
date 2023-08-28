import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../common/constants/decorator.contants';
import { errors } from '../common/constants/error.constants';
import { RedisService } from '../service/redis/redis.service';
import { redisUtils } from '../common/utils/redisUtils';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private redis: RedisService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // token对比
    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || void 0;
    if (authorization) {
      const token = authorization.split(' ')[1];
      const payload: any = this.jwtService.decode(token);
      try {
        let redis_token = null;
        if (this.configService.get('SINGLE_CLIENT_ONLINE') === 'true') {
          redis_token = await this.redis.get(
            redisUtils.getSingleAuthJwtPrefix(payload.userId),
          );
        } else {
          const lenKey = redisUtils.getAuthJwtPrefixLenth(payload.userId);
          const keys = await this.redis.redis.keys(lenKey);
          // 此方式为支持同账号多地登录并记录记录到redis,方便管理后台后面剔除用户
          await Promise.all(
            keys.map(async (key) => {
              const value = await this.redis.get(key);
              if (value == token) {
                redis_token = value;
              }
            }),
          );
        }

        if (!redis_token) {
          throw new UnauthorizedException(errors.ILLEGAL_TOKEN);
        }
        if (payload.exp < Date.now() / 1000) {
          throw new UnauthorizedException(errors.TOKEN_EXPIRED);
        }
      } catch (err) {
        throw err || new UnauthorizedException('登录信息校验失败，请重新登录');
      }
    }
    return super.canActivate(context) as boolean;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException(errors.UN_AUTHORIZED);
    }
    return user;
  }
}

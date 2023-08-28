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
import { Config } from '../common/config/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private redis: RedisService,
    private jwtService: JwtService,
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
      try {
        const payload: any = this.jwtService.decode(token);
        const key = `${payload.userId}_${payload.userName}`;
        const redis_token = await this.redis.get(
          `${Config.USER_AUTH_JWT_PREFIX}:${key}`,
        );
        if (!redis_token) {
          throw new UnauthorizedException(errors.ILLEGAL_TOKEN);
        } else if (redis_token !== token) {
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

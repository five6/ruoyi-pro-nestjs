import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getParamFromToken } from '../common/utils/utils';

@Injectable()
export class AddParamMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) return next();
    // 在这里可以修改 req 对象，添加统一的字段
    const userName = getParamFromToken(
      req.headers.authorization,
      this.configService.get('JWT_SECRET'),
      'userName',
    );
    const body = req.body || {};
    if (body.id) {
      body.updater = userName;
    } else {
      body.creator = userName;
    }
    next();
  }
}

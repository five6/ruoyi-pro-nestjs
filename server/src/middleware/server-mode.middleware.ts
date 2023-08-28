import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServerModeMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    if (this.configService.get<string>('MOCK') == 'mock') {
      throw new ForbiddenException('演示环境不能执行此操作！');
    }
    next();
  }
}

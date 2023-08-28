import {Controller, Get} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { RedisService } from '../../../../service/redis/redis.service';
import { NotifyMessageService } from '../../../../service/system/notice/notifyMessage.service';
@ApiTags('公告')
@Controller(`${Config.ADMIN_API_PREFIX}/system/notify-message`)
export class NotifyMessageController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private roleService: RoleService,
    private redis: RedisService,
    private service: NotifyMessageService,
  ) {}

  @Get('/get-unread-list')
  getUnReadMessageList() {
    return [];
  }
  @Get('/get-unread-count')
  getUnReadMessageCount() {
    return [];
  }
}

import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';
import { UserService } from '../../../../service/system/user/user.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { RedisService } from '../../../../service/redis/redis.service';
import { NotifyMessageService } from '../../../../service/system/notice/notifyMessage.service';
import { UserTypeEnum } from '../../../../Enum/Global';
@ApiTags('公告')
@Controller(`${Config.ADMIN_API_PREFIX}/system/notify-message`)
export class NotifyMessageController {
  constructor(
    private toolsService: ToolsService,
    private adminService: UserService,
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

  @ApiOperation({ summary: '获得当前用户的未读站内信数量' })
  @Get('/get-unread-count')
  async getUnReadMessageCount(@Req() req) {
    return await this.service.repostory.countBy({
      userType: UserTypeEnum.Admin,
      userId: req.user.userId,
      readStatus: false,
    });
  }
}

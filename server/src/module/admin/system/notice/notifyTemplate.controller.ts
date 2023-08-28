import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { RedisService } from '../../../../service/redis/redis.service';
import { NotifyTemplateService } from '../../../../service/system/notice/notifyTemplate.service';
import { NotifyTemplatePageDto } from 'src/dto/system/notifyDto';
@ApiTags('公告')
@Controller(`${Config.ADMIN_API_PREFIX}/system/notify-template`)
export class NotifyTemplateController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private roleService: RoleService,
    private redis: RedisService,
    private service: NotifyTemplateService,
  ) {}

  @Get('/page')
  async getPage(@Query() dto: NotifyTemplatePageDto) {
    const result = await this.service.getPage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }
}

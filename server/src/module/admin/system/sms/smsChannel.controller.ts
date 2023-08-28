import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { SkipAuth } from '../../../../common/decorators/skipAuth.decorator';
import { RedisService } from '../../../../service/redis/redis.service';
import { DictService } from '../../../../service/system/dict/dict.service';

@ApiTags('后台短信渠道接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/sms-channel`)
export class smsChannelController {
  constructor(
    private redis: RedisService,
    private readonly deptService: DeptService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
    private readonly adminService: AdminService,
    private readonly dictService: DictService,
  ) {}

  @Get('/page')
  page() {
    return {
      list: [],
    };
  }
}

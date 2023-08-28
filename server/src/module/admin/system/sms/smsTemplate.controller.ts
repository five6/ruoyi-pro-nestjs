import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { RedisService } from '../../../../service/redis/redis.service';
import { DictService } from '../../../../service/system/dict/dict.service';

@ApiTags('后台短信模板接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/sms-template`)
export class smsTemplateController {
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

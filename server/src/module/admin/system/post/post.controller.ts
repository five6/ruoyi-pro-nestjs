import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { UserService } from '../../../../service/system/user/user.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { SkipAuth } from '../../../../common/decorators/skipAuth.decorator';
import { RedisService } from '../../../../service/redis/redis.service';
import { DictService } from '../../../../service/system/dict/dict.service';

@ApiTags('后台岗位接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/post`)
export class PostController {
  constructor(
    private redis: RedisService,
    private readonly deptService: DeptService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
    private readonly adminService: UserService,
    private readonly dictService: DictService,
  ) {}

  @Get('/list-all-simple')
  page() {
    return {
      list: [],
    };
  }
}

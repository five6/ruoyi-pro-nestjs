import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { UserService } from '../../../../service/system/user/user.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { SkipAuth } from '../../../../common/decorators/skipAuth.decorator';
import { RedisService } from '../../../../service/redis/redis.service';
import { DictService } from '../../../../service/system/dict/dict.service';
import { DictTypePageDto } from '../../../../dto/system/dictTypePageDto';

@ApiTags('后台部门接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/dict-type`)
export class DictTypeController {
  constructor(
    private redis: RedisService,
    private readonly deptService: DeptService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
    private readonly adminService: UserService,
    private readonly dictService: DictService,
  ) {}

  @SkipAuth()
  @Get('/list-all-simple')
  getDctData() {
    return this.dictService.listAllTypeSimple();
  }

  @Get('/page')
  async typePage(@Query() dto: DictTypePageDto) {
    const result = await this.dictService.typePage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }
}

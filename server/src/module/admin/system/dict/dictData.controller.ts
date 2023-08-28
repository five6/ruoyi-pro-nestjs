import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeptService } from '../../../../service/system/dept/dept.service';
import { Config } from '../../../../common/config/config';
import { MenuService } from '../../../../service/system/menu/menu.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { SkipAuth } from '../../../../common/decorators/skipAuth.decorator';
import { RedisService } from '../../../../service/redis/redis.service';
import { DictService } from '../../../../service/system/dict/dict.service';
import { DictDataPageDto } from '../../../../dto/system/dictDataPageDto';

@ApiTags('后台部门接口')
@Controller(`${Config.ADMIN_API_PREFIX}/system/dict-data`)
export class DictDataController {
  constructor(
    private redis: RedisService,
    private readonly deptService: DeptService,
    private readonly roleService: RoleService,
    private readonly menuService: MenuService,
    private readonly adminService: AdminService,
    private readonly dictService: DictService,
  ) {}

  @SkipAuth()
  @Get('/list-all-simple')
  getDctData() {
    return this.dictService.listAllDataSimple();
  }

  @Get('/page')
  async dataPage(@Query() dto: DictDataPageDto) {
    const result = await this.dictService.dataPage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }
}

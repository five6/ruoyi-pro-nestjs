import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';
import { AdminService } from '../../../../service/system/admin/admin.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { RedisService } from '../../../../service/redis/redis.service';
import { WechatLoginDto } from '../../../../dto/wechat-login.dto';
import { UserService } from '../../../../service/user/user.service';
import { Pagination } from '../../../../common/result-beans/Pagination';
import { AddPlayerDto } from '../../../../dto/wxUser.dto';
import { IdStatusDto } from '../../../../dto/commonDto';

@ApiTags('微信用户')
@Controller(`${Config.ADMIN_API_PREFIX}/system/player`)
export class PlayerController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private roleService: RoleService,
    private redis: RedisService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: '获取玩家列表' })
  @ApiBody({ type: WechatLoginDto, required: true })
  @Get()
  async find(
    @Query('status') status,
    @Query('nickName') nickName,
    @Query('pageSize') pageSize?: number,
    @Query('pageNo') pageNo?: number,
  ) {
    const fields = '';
    const result = await this.userService.find(
      {
        nickName,
        status,
      },
      fields,
      new Pagination({ pageNo, pageSize }),
    );
    return {
      items: result[0],
      total: result[1],
    };
  }

  @Post()
  async addPlayer(@Body() body: AddPlayerDto) {
    return this.userService.addPlayer(body);
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  async setStatus(@Body() dto: IdStatusDto) {
    const result = await this.userService.userModel
      .createQueryBuilder()
      .update()
      .set({
        status: dto.status,
      })
      .where('id = :id', { id: dto.id })
      .execute();
    if (result.affected > 0) {
      return {
        code: 0,
        success: true,
        message: 'success',
        data: result,
      };
    } else {
      return {
        code: -1,
        success: false,
        message: 'fail',
        data: result,
      };
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: AddPlayerDto,
    @Request() request,
  ) {
    const cond = { id: id, ...body } as any;
    cond.updater = request.user.userId;
    return this.userService.update(id, cond);
  }
}

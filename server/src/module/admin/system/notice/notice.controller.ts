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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ToolsService } from '../../../../service/tools/tools.service';
import { UserService } from '../../../../service/system/user/user.service';
import { AzLogger } from '../../../../service/logger/logger.service';
import { AuthService } from '../../../../service/system/auth/auth.service';
import { RoleService } from '../../../../service/system/role/role.service';
import { Config } from '../../../../common/config/config';
import { RedisService } from '../../../../service/redis/redis.service';
import { Pagination } from '../../../../common/result-beans/Pagination';
import { NoticeDto, NoticePageDto } from '../../../../dto/system/noticeDto';
import { NoticeService } from '../../../../service/system/notice/notice.service';
import { ChangeStatusDto } from '../../../../dto/status.dto';
import { PageDto } from '../../../../dto/commonDto';
@ApiTags('公告')
@Controller(`${Config.ADMIN_API_PREFIX}/system/notice`)
export class NoticeController {
  constructor(
    private toolsService: ToolsService,
    private adminService: UserService,
    private loggerService: AzLogger,
    private authService: AuthService,
    private roleService: RoleService,
    private redis: RedisService,
    private service: NoticeService,
  ) {}

  @ApiOperation({
    summary: '分页查通知列表',
    description: '分页查通知列表',
  })
  @Get('/page')
  async getPage(@Query() dto: NoticePageDto) {
    const result = await this.service.getPage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }

  @Post('create')
  async create(@Body() body: NoticeDto, @Request() request) {
    return await this.service.save(body, request.user.userName);
  }

  @Get('get')
  async detail(@Query('id') id: string) {
    return this.service.findOne(id);
  }

  @Put('update')
  async update(
    @Param('id') id: string,
    @Body() body: NoticeDto,
    @Request() request,
  ) {
    return this.service.save(body, request.user.userName);
  }

  @Delete('delete')
  async delete(@Query('id') id, @Request() req) {
    return await this.service.delete({ id, userName: req.user.userName });
  }
}

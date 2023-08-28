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

import { Config } from '../../../../common/config/config';
import { Pagination } from '../../../../common/result-beans/Pagination';
import { EmailService } from '../../../../service/system/email/email.service';
import { EmailDto } from '../../../../dto/emailDto';
import { IdStatusDto, PageDto } from '../../../../dto/commonDto';
import { MailLogService } from 'src/service/system/mail/mailLog.service';
import { MailLogPageDto } from 'src/dto/system/mailDto';

@ApiTags('邮件日志')
@Controller(`${Config.ADMIN_API_PREFIX}/system/mail-log`)
export class MailLogController {
  constructor(private service: MailLogService) {}

  @Get('/page')
  async getPage(@Query() dto: MailLogPageDto) {
    const result = await this.service.getPage(dto);
    return {
      total: result[1],
      list: result[0],
    };
  }

  @ApiOperation({
    summary: '修改菜单状态',
    description: '修改菜单状态',
  })
  @Post('/setStatus')
  async setStatus(@Body() dto: IdStatusDto) {
    const result = await this.service.repository
      .createQueryBuilder()
      .update()
      .set({
        status: dto.status,
      })
      .where('id = :id', { id: dto.id })
      .execute();
    if (result.affected > 0) {
      return {
        message: 'success',
        code: 0,
        success: true,
        data: result,
      };
    } else {
      return {
        message: '设置失败',
        code: -1,
        success: false,
        data: null,
      };
    }
  }
}

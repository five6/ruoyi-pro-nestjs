import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Config } from '../../../common/config/config';
import { ScheduleService } from '../../../service/schedule/schedule.service';

@ApiTags('定时任务')
@Controller(`${Config.ADMIN_API_PREFIX}/schedule`)
export class ScheduleController {
  constructor(private service: ScheduleService) {}

  @ApiOperation({ summary: '获取定时任务' })
  @Get()
  async find() {
    const result = await this.service.find();
    return {
      items: result[0],
      total: result[1],
    };
  }

  @Put('updateStatus/:name')
  async updateStatus(@Param('name') name: string, @Body() body: any) {
    return this.service.updateStatus(name, body.status);
  }
}

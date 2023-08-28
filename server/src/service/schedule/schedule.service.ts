import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { errors } from 'src/common/constants/error.constants';
import { AzLogger } from '../logger/logger.service';
import { ToolsService } from '../tools/tools.service';
import * as _ from 'lodash';
import { Pagination } from '../../common/result-beans/Pagination';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private logger: AzLogger,
    private readonly toolService: ToolsService,
  ) {}

  async find() {
    try {
      const tasks = [];
      const jobs = this.schedulerRegistry.getCronJobs();
      jobs.forEach((value: any, key) => {
        tasks.push({
          name: key,
          lastDate: value.lastDate(),
          nextDate: value.nextDate(),
          cronTime: value.cronTime,
          running: value.running,
        });
      });
      return [tasks, tasks.length];
    } catch (error) {
      return [];
    }
  }

  async updateStatus(name: string, status: string) {
    try {
      const job = this.schedulerRegistry.getCronJob(name);
      if (status == '1') {
        job.start();
      } else if (status == '0') {
        job.stop();
      }
      return '设置成功';
    } catch (error) {
      return null;
    }
  }
}

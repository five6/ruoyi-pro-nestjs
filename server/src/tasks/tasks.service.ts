import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *', { name: '测试任务一' })
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  // @Interval('interval job', 10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout('timeout job', 5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}

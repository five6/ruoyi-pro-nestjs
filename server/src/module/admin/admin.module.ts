import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { AdminController } from './system/user/user.controller';
import { RoleController } from './system/role/role.controller';
import { MenuController } from './system/menu/menu.controller';
import { DeptController } from './system/dept/dept.controller';
import { DictDataController } from './system/dict/dictData.controller';
import { NoticeController } from './system/notice/notice.controller';
import { MailAccountController } from './system/mail/mailAccount.controller';
import { MailTemplateController } from './system/mail/mailTemplate.controller';
import { MailLogController } from './system/mail/mailLog.controller';

import { FilesController } from './file/file.controller';
import { ScheduleController } from './schedule/schedule.controller';
import { PermissionController } from './system/permission/permission.controller';
import { NotifyMessageController } from './system/notice/notifyMessage.controller';
import { NotifyTemplateController } from './system/notice/notifyTemplate.controller';
import { DictTypeController } from './system/dict/dictType.controller';
import { smsChannelController } from './system/sms/smsChannel.controller';
import { smsLogController } from './system/sms/smsLog.controller';
import { smsTemplateController } from './system/sms/smsTemplate.controller';
import { AuthController } from './system/auth/auth.controller';
import { PostController } from './system/post/post.controller';
import { FileConfigController } from './file/fileConfig.controller';
import { FileContentController } from './file/fileContent.controller';
@Module({
  imports: [SharedModule],
  controllers: [
    AdminController,
    RoleController,
    MenuController,
    DeptController,
    DictDataController,
    NoticeController,
    MailAccountController,
    MailTemplateController,
    MailLogController,
    FilesController,
    FileConfigController,
    FileContentController,
    ScheduleController,
    PermissionController,
    NotifyMessageController,
    NotifyTemplateController,
    DictDataController,
    DictTypeController,
    smsChannelController,
    smsLogController,
    smsTemplateController,
    AuthController,
    PostController,
  ],
  providers: [],
  exports: [SharedModule],
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { loadEntity } from '../../common/utils/loadModules';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { HttpModule } from '@nestjs/axios';
import { MinioModule } from 'nestjs-minio-client';
import { RedisService } from '../../service/redis/redis.service';
import { CookieService } from '../../service/cookie/cookie.service';
import { AzLogger } from '../../service/logger/logger.service';
import { ToolsService } from '../../service/tools/tools.service';
import { UserService } from '../../service/system/user/user.service';
import { RoleService } from '../../service/system/role/role.service';
import { AuthService } from '../../service/system/auth/auth.service';
import { MenuService } from '../../service/system/menu/menu.service';
import { DeptService } from '../../service/system/dept/dept.service';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { NoticeService } from '../../service/system/notice/notice.service';
import { FileService } from '../../service/file/file.service';
import { PermissionsGuard } from '../../guards/permissions.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from '../../tasks/tasks.module';
import { ScheduleService } from '../../service/schedule/schedule.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PermissionService } from '../../service/system/permission/permission.service';
import { NotifyMessageService } from '../../service/system/notice/notifyMessage.service';
import { NotifyTemplateService } from '../../service/system/notice/notifyTemplate.service';
import { DictService } from '../../service/system/dict/dict.service';
import { MailAccountService } from '../../service/system/mail/mailAccount.service';
import { MailLogService } from '../../service/system/mail/mailLog.service';
import { MailTemplateService } from '../../service/system/mail/mailTemplate.service';
import { FileConfigService } from '../../service/file/fileConfig.service';
import { FileContentService } from '../../service/file/fileContent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(loadEntity()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        debug: true,
        type: 'mongodb',
        autoLoadEntities: true,
        entities: loadEntity(),
        host: 'localhost',
        port: 27017,
        database: configService.get<string>('DB_DATA_BASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        // 应用全局作用域
      }),
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get('MINIO_ENDPOINT'),
        port: +configService.get<number>('MINIO_PORT'),
        useSSL: false,
        accessKey: configService.get('MINIO_ACCESS_KEY'),
        secretKey: configService.get('MINIO_SECRET_KEY'),
      }),
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          url: configService.get('REDIS_URL'),
          password: configService.get('REDIS_PASS'),
        },
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        // signOptions: { expiresIn: configService.get('JWT_EXPIRE_TIME') },
      }),
    }),
  ],
  providers: [
    Repository,
    UserService,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //挂载全局接口
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard, //挂载全局接口
    },
    AzLogger,
    RedisService,
    CookieService,
    ToolsService,
    RoleService,
    MenuService,
    DeptService,
    NoticeService,
    FileService,
    FileConfigService,
    FileContentService,
    ScheduleService,
    PermissionService,
    NotifyMessageService,
    NotifyTemplateService,
    DictService,
    MailAccountService,
    MailLogService,
    MailTemplateService,
    JwtService,
  ],
  exports: [
    Repository,
    UserService,
    AuthService,
    JwtStrategy,
    AzLogger,
    RedisService,
    CookieService,
    ToolsService,
    RoleService,
    MenuService,
    DeptService,
    NoticeService,
    FileService,
    FileConfigService,
    FileContentService,
    ScheduleService,
    PermissionService,
    NotifyMessageService,
    NotifyTemplateService,
    DictService,
    MailAccountService,
    MailLogService,
    MailTemplateService,
    JwtService,
  ],
})
export class SharedModule {}

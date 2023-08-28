import { Module } from '@nestjs/common';
import { loadEntity } from '../../common/utils/loadModules';

import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { HttpModule } from '@nestjs/axios';
import { MinioModule } from 'nestjs-minio-client';
import { RedisService } from '../../service/redis/redis.service';
import { CookieService } from '../../service/cookie/cookie.service';
import { AzLogger } from '../../service/logger/logger.service';
import { UserService } from '../../service/user/user.service';
import { ToolsService } from '../../service/tools/tools.service';
import { AdminService } from '../../service/system/admin/admin.service';
import { RoleService } from '../../service/system/role/role.service';
import { AuthService } from '../../service/system/auth/auth.service';
import { MenuService } from '../../service/system/menu/menu.service';
import { DeptService } from '../../service/system/dept/dept.service';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { AppService } from '../../app.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { NoticeService } from '../../service/system/notice/notice.service';
import { EmailService } from '../../service/system/email/email.service';
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
import { TenantService } from '../../service/system/tenant/tenant.service';
import { TenantPackageService } from '../../service/system/tenant/tenantPackage.service';
import { MailAccountService } from 'src/service/system/mail/mailAccount.service';
import { MailLogService } from 'src/service/system/mail/mailLog.service';
import { MailTemplateService } from 'src/service/system/mail/mailTemplate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(loadEntity()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        debug: false,
        type: 'mysql',
        toRetry: (err) => {
          console.log(err);
          return true;
        },
        //重试连接数据库的次数
        retryAttempts: 10,
        //两次重试连接的间隔(ms)
        retryDelay: 3000,
        //自动加载实体
        autoLoadEntities: true,
        entities: loadEntity(),
        // entities: ['dist/**/*.entity{.ts,.js}'],
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATA_BASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
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
    AdminService,
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
    UserService,
    ToolsService,
    RoleService,
    AppService,
    MenuService,
    DeptService,
    EmailService,
    NoticeService,
    FileService,
    ScheduleService,
    PermissionService,
    NotifyMessageService,
    NotifyTemplateService,
    DictService,
    TenantService,
    TenantPackageService,
    MailAccountService,
    MailLogService,
    MailTemplateService,
  ],
  exports: [
    Repository,
    AdminService,
    AuthService,
    JwtStrategy,
    AzLogger,
    RedisService,
    CookieService,
    UserService,
    ToolsService,
    RoleService,
    AppService,
    MenuService,
    DeptService,
    EmailService,
    NoticeService,
    FileService,
    ScheduleService,
    PermissionService,
    NotifyMessageService,
    NotifyTemplateService,
    DictService,
    TenantService,
    TenantPackageService,
    MailAccountService,
    MailLogService,
    MailTemplateService,
  ],
})
export class SharedModule {}

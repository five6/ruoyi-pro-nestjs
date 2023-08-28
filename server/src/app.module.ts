import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './module/admin/admin.module';
import { SharedModule } from './module/shared/shared.module';
import { ServerModeMiddleware } from './middleware/server-mode.middleware';
import { Config } from './common/config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { AddParamMiddleware } from './middleware/addParam.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    AdminModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddParamMiddleware)
      .exclude(
        {
          path: `${Config.ADMIN_API_PREFIX}/user/add`,
          method: RequestMethod.POST,
        },
        {
          path: `${Config.ADMIN_API_PREFIX}/user/login`,
          method: RequestMethod.POST,
        },
      )
      .forRoutes(
        { path: '*', method: RequestMethod.PUT },
        { path: '*', method: RequestMethod.POST },
      );
    consumer
      .apply(ServerModeMiddleware)
      .exclude(
        {
          path: `${Config.ADMIN_API_PREFIX}/user/add`,
          method: RequestMethod.POST,
        },
        {
          path: `${Config.ADMIN_API_PREFIX}/user/login`,
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}

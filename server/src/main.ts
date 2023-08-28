import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as path from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AzLogger } from './service/logger/logger.service';
import helmet from 'helmet';
import * as session from 'express-session';
import * as xmlparser from 'express-xml-bodyparser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { ApiTransformInterceptor } from './interceptors/api-transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new AzLogger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    cors: true,
  });

  const configService = await app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT');
  const NODE_ENV = configService.get<string>('NODE_ENV');
  const SESSION_SECRET = configService.get<string>('SESSION_SECRET');
  // TODO: socket.io 与 websocket不共用。使用socket.io需要注释掉useWebSocketAdapter。使用哪个跟端确认
  // app.useWebSocketAdapter(new WsAdapter(app));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
    }),
  );

  // 配置session的中间件
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false, // 当true,每次请求都重新设置session cookie
      saveUninitialized: false, // 当true 无论有没有session cookie，每次请求都设置个session cookie
      cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
      rolling: true,
    }),
  );
  app.use(xmlparser());

  const options = new DocumentBuilder()
    .setTitle('NEST后台服务接口')
    .setDescription('NEST后台服务接口列表')
    .setVersion('1.0')
    .addTag('NEST')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  await app.listen(SERVER_PORT);

  logger.debug(
    `Application is running on port:${SERVER_PORT},启动环境:${NODE_ENV}`,
  );
}
bootstrap();

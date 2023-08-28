import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Response, Request } from 'express';
import { map } from 'rxjs/operators';
import { KEEP_RESPONSE_METADATA } from '../common/constants/decorator.contants';
import { Result } from '../common/result-beans/Result';

/**
 * 统一处理返回接口结果，如果不需要则添加@Keep装饰器
 */
export class ApiTransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const keep = this.reflector.get<boolean>(
          KEEP_RESPONSE_METADATA,
          context.getHandler(),
        );
        if (keep) {
          return data;
        } else {
          const response = context.switchToHttp().getResponse<Response>();
          response.header('Content-Type', 'application/json; charset=utf-8');
          response.status(HttpStatus.OK);
          return new Result({
            code: 0,
            data,
            success: true,
            message: 'success',
          });
        }
      }),
    );
  }
}

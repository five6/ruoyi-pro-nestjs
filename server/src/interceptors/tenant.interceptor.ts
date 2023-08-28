// tenant.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { tap } from 'rxjs/operators';
import { EntityManager } from 'typeorm';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private readonly entityManager: EntityManager) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const tenantId = request.headers['x-tenant-id'] as unknown as string; // 从请求头获取租户标识

    return next.handle().pipe(
      tap((data) => {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            item.tenant_id = tenantId; // 将 tenantId 设置到每个项目的 tenant_id 属性上
          });
        } else if (data && data.hasOwnProperty('tenant_id')) {
          data.tenant_id = tenantId; // 设置 tenantId 到单个对象的 tenant_id 属性上
        }

        // 应用租户过滤条件到查询
        const queryBuilder = this.entityManager.createQueryBuilder();
        const whereCondition =
          queryBuilder.escape('tenant_id') +
          ' = ' +
          queryBuilder.escape(tenantId);
        queryBuilder.andWhere(whereCondition);
      }),
    );
  }
}

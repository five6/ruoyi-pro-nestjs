import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from '../middleware/logger.middleware';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    logger.error(exceptionResponse.message || exception.message);
    response.status(HttpStatus.OK).json({
      message:
        typeof exceptionResponse.message === 'object'
          ? exceptionResponse.message[0]
          : exception.message || '',
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: -1,
    });
  }
}

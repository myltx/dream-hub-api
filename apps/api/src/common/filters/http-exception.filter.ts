import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { formatTime } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = '服务器异常';
    let errorName = 'InternalServerError';

    if (isHttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
        errorName = exception.name;
      } else if (typeof res === 'object' && res !== null) {
        const msg = (res as any).message;
        message = Array.isArray(msg) ? msg.join('; ') : msg || message;
        errorName = (res as any).error || exception.name;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorName = exception.name;
    }

    response.status(status).json({
      code: status,
      success: false,
      message,
      error: errorName,
      timestamp: formatTime(new Date().toISOString()),
      path: request.url,
    });
  }
}

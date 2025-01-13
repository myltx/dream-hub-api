import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 针对普通 Error 类型的处理
    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: exception.message || 'Internal server error' };

    response.status(status).json({
      code: status,
      success: false,
      message:
        typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse['message'] || 'An error occurred',
      error: exception.name || 'Error',
      timestamp: new Date().toISOString(),
    });
  }
}

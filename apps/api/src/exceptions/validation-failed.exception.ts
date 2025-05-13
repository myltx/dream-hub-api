// src/exceptions/validation-failed.exception.ts
import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class ValidationFailedException extends BusinessException {
  constructor(message = '请求参数校验失败') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

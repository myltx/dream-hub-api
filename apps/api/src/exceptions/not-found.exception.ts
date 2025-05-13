// src/exceptions/not-found.exception.ts
import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class NotFoundException extends BusinessException {
  constructor(resource = '资源') {
    super(`${resource}不存在`, HttpStatus.NOT_FOUND);
  }
}

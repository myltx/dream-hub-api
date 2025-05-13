// src/exceptions/permission-denied.exception.ts
import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class PermissionDeniedException extends BusinessException {
  constructor(message = '没有权限执行该操作') {
    super(message, HttpStatus.FORBIDDEN);
  }
}

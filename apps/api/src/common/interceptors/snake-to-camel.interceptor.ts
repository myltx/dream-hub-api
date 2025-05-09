import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { camelCase } from 'change-case-object';
import { formatTime } from '../utils/index';

@Injectable()
export class SnakeToCamelInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertToCamelCase(data)));
  }

  private convertToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertToCamelCase(item));
    }

    if (obj && typeof obj === 'object' && obj.constructor === Object) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          const newKey = camelCase(key);
          const newValue = this.convertToCamelCase(value);
          return [newKey, this.formatDates(newKey, newValue)];
        }),
      );
    }

    return obj;
  }

  private formatDates(key: string, value: any): any {
    if (
      typeof value === 'string' &&
      (key.toLowerCase().includes('date') || key.toLowerCase().includes('at'))
    ) {
      return formatTime(value);
    }
    return value;
  }
}

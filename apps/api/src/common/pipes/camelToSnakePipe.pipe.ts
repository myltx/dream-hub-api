import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { snakeCase } from 'change-case-object';
import { formatTime } from '../utils';

@Injectable()
export class CamelToSnakePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' || metadata.type === 'query') {
      return this.convertToSnakeCase(value);
    }
    return value;
  }

  private convertToSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertToSnakeCase(item));
    } else if (obj && typeof obj === 'object') {
      const pagingParams = ['page', 'limit'];
      for (const key in obj) {
        if (pagingParams.includes(key)) {
          let keyVal = obj[key];
          switch (key) {
            case 'page':
              keyVal = keyVal || 1;
              break;

            default:
              keyVal = keyVal || 10;
              break;
              break;
          }
          obj[key] = parseInt(keyVal);
        }
      }

      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          snakeCase(key),
          this.formatDates(snakeCase(key), this.convertToSnakeCase(value)),
        ]),
      );
    }
    return obj;
  }

  private formatDates(key: string, value: any): any {
    if (key.includes('date') || key.includes('At')) {
      return formatTime(value);
    }
    return value;
  }
}

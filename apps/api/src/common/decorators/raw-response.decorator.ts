// src/common/decorators/raw-response.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RAW_RESPONSE_KEY = 'RAW_RESPONSE';
export const RawResponse = () => SetMetadata(RAW_RESPONSE_KEY, true);

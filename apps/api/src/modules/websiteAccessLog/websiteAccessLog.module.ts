import { Module } from '@nestjs/common';
import { WebsiteAccessLogRepository } from './websiteAccessLog.controller';
import { WebsiteAccessLogService } from './websiteAccessLog.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [WebsiteAccessLogRepository],
  providers: [WebsiteAccessLogService, SupabaseClientProvider],
})
export class WebsiteAccessLogModule {}

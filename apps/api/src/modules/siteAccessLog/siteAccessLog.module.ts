import { Module } from '@nestjs/common';
import { SiteAccessLogController } from './siteAccessLog.controller';
import { SiteAccessLogService } from './siteAccessLog.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [SiteAccessLogController],
  providers: [SiteAccessLogService, SupabaseClientProvider],
})
export class LogModule {}

import { Module } from '@nestjs/common';
import { LogController } from './siteAccessLog.controller';
import { SiteAccessLogService } from './siteAccessLog.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [LogController],
  providers: [SiteAccessLogService, SupabaseClientProvider],
})
export class LogModule {}

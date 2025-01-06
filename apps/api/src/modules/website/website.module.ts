import { Module } from '@nestjs/common';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [WebsiteController],
  providers: [WebsiteService, SupabaseClientProvider],
})
export class WebsiteModule {}

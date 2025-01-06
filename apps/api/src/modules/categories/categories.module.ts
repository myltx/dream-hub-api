import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, SupabaseClientProvider],
})
export class CategoriesModule {}

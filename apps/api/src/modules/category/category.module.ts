import { Module } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, SupabaseClientProvider],
})
export class CategoriesModule {}

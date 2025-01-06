import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SupabaseClientProvider } from '../supabase/supabase-client.provider';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, SupabaseClientProvider],
})
export class CategoriesModule {}

import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, SupabaseClientProvider],
})
export class FavoritesModule {}

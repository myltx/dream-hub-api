import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SupabaseService } from '../../database/supabase/supabase.service';

@Module({
  controllers: [FileController],
  providers: [FileService, SupabaseService],
})
export class FileModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseClientProvider } from '../supabase/supabase-client.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, SupabaseClientProvider],
})
export class UserModule {}

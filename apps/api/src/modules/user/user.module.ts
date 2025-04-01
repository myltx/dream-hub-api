import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseClientProvider } from '../../database/supabase/supabase-client.provider';
import { LogtoModule } from '../logto/logto.module';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, LogtoModule],
  controllers: [UserController],
  providers: [UserService, SupabaseClientProvider],
})
export class UserModule {}

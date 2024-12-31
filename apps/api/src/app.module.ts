import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SupabaseClientProvider} from './supabase/supabase-client.provider'
import {UserModule} from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
    }),
    SupabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,SupabaseClientProvider],
  exports: [SupabaseClientProvider],
})
export class AppModule {}

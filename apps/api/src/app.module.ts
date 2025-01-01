import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseModule } from './supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseClientProvider } from './supabase/supabase-client.provider';
import { UserModule } from './user/user.module';
// token
import { AuthGuard } from './auth/auth.guard';
import { TokenService } from './auth/token.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
    }),
    SupabaseModule,
    UserModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SupabaseClientProvider,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [SupabaseClientProvider],
})
export class AppModule {}

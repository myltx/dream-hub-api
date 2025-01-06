import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SupabaseModule } from './supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseClientProvider } from './supabase/supabase-client.provider';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';

// token
import { AuthGuard } from './auth/auth.guard';
import { TokenService } from './auth/token.service';
// 驼峰转换拦截器
import { CamelToSnakeInterceptor } from './common/interceptors/camel-to-snake.interceptor';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: CamelToSnakeInterceptor,
    },
  ],
  exports: [SupabaseClientProvider],
})
export class AppModule {}

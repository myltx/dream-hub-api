import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SupabaseModule } from './database/supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseClientProvider } from './database/supabase/supabase-client.provider';
// 业务模块
import { UserModule } from './modules/user/user.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagModule } from './modules/tag/tag.module';
// token
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { TokenService } from './modules/auth/token.service';
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
    TagModule,
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

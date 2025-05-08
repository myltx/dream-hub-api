import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SupabaseModule } from './database/supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseClientProvider } from './database/supabase/supabase-client.provider';
// 业务模块
import { UserModule } from './modules/user/user.module';
import { CategoriesModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { WebsiteModule } from './modules/website/website.module';
import { LogModule } from './modules/siteAccessLog/siteAccessLog.module';
import { WebsiteAccessLogModule } from './modules/websiteAccessLog/websiteAccessLog.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { FileModule } from './modules/file/file.module';
import { AuthGuard } from './modules/guards/auth.guard';

// token
// 驼峰转换拦截器
import { CamelToSnakeInterceptor } from './common/interceptors/camel-to-snake.interceptor';
// swagger
import { SwaggerController } from './modules/swagger/swagger.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
    }),
    SupabaseModule,
    UserModule,
    CategoriesModule,
    TagModule,
    WebsiteModule,
    WebsiteAccessLogModule,
    FavoritesModule,
    FileModule,
    LogModule,
  ],
  controllers: [AppController, SwaggerController],
  providers: [
    AppService,
    AuthGuard,
    SupabaseClientProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: CamelToSnakeInterceptor,
    },
  ],
  exports: [SupabaseClientProvider],
})
export class AppModule {}

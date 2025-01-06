import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { configureCors } from './config/cors.config';
import { configureSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 8081;

  // 应用配置
  configureCors(app); // 跨域
  app.useGlobalInterceptors(new ResponseInterceptor()); // 全局拦截器
  app.useGlobalFilters(new AllExceptionsFilter()); // 全局异常过滤器
  configureSwagger(app); // Swagger

  // 启动应用
  await app.listen(PORT);
  console.log(
    `Application is running on: ${await app.getUrl()}, or http://localhost:${PORT}`,
  );
}
bootstrap();

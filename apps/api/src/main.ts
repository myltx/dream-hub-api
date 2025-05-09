import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { configureCors } from './config/cors.config';
import { configureSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/guards/auth.guard';
// import { TransformQueryPipe } from './common/pipes/transform-query.pipe';
// import { TransformBodyPipe } from './common/pipes/transform-body.pipe';
import { CamelToSnakePipe } from './common/pipes/camelToSnakePipe.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 8081;

  // 应用配置
  configureCors(app); // 跨域
  const reflector = app.get(Reflector); // ✅ 从容器中获取 Reflector 实例
  app.useGlobalInterceptors(new ResponseInterceptor(reflector)); // 全局拦截器
  app.useGlobalFilters(new AllExceptionsFilter()); // 全局异常过滤器
  // 全局应用 AuthGuard
  app.useGlobalGuards(new AuthGuard(new Reflector()));
  // app.useGlobalPipes(new TransformQueryPipe());
  // app.useGlobalPipes(new TransformBodyPipe());
  app.useGlobalPipes(new CamelToSnakePipe());
  configureSwagger(app); // Swagger
  // 启用全局校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // 自动剔除 DTO 中未定义的属性
      // forbidNonWhitelisted: true, // 禁止传递未定义的属性
      transform: true, // 自动将请求中的数据类型转换为 DTO 中定义的类型
    }),
  );
  // 启动应用
  await app.listen(PORT);
  console.log(
    `🚀 Application is running on: ${await app.getUrl()}, or http://localhost:${PORT}`,
  );
}
bootstrap();

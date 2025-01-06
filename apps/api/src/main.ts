import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 启用跨域
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 注册全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());

  // swagger 配置
  const options = new DocumentBuilder()
    .setTitle('Dream Hub') // 标题
    .setDescription('Dream Hub接口文档') // 描述
    .setVersion('1.0') // 版本
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //配置swgger地址
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Dream Hub API Docs', // 自定义页面标题
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css', // 使用 Swagger UI 的 CDN 静态资源
    customJs: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js',
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
    explorer: true, // 启用 API 文档选择器
    useGlobalPrefix: true, // 支持全局前缀
  });

  await app.listen(process.env.PORT ?? 8081);
  console.log(
    `Application is running on: ${await app.getUrl()} , or http://localhost:${process.env.PORT}`,
  );
}
bootstrap();

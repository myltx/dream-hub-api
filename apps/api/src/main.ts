import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`请访问：http://localhost:${process.env.PORT ?? 8081}`)
  // 启用跨域
  // console.log(`允许的前端域名：${process.env.REQUEST_ORIGIN}`)
  //  [process.env.REQUEST_ORIGIN ?? 'http://localhost:3000']
  const allowedOrigins = process.env.REQUEST_ORIGIN?.split(',') || ['https://example.com']
  app.enableCors({
    origin: allowedOrigins, // 允许的前端域名
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',              // 允许的 HTTP 方法
    credentials: true,                                      // 是否允许携带凭证（如 Cookies）
  });
  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();

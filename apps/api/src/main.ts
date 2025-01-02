import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`请访问：http://localhost:${process.env.PORT ?? 8081}`);
  // 启用跨域
  app.enableCors({
    origin: '*', // 允许所有域名访问
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 3600
  });
  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();

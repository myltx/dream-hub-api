import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`请访问：http://localhost:${process.env.PORT ?? 8081}`);
  // 启用跨域
  //  [process.env.REQUEST_ORIGIN ?? 'http://localhost:3000']
  const allowedOrigins = process.env.REQUEST_ORIGIN?.split(',') || [
    'https://nav.myltx.top',
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();

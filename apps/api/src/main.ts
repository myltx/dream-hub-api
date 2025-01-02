import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`请访问：http://localhost:${process.env.PORT ?? 8081}`);
  // 启用跨域
  app.enableCors();
  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();

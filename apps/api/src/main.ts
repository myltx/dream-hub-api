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
    // origin: (origin, callback) => {
    //   // 检查是否在允许列表中
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // }, // 允许的前端域名
    origin: true,
    // allowedHeaders: ['Authorization', 'content-type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    // credentials: true,                                      // 是否允许携带凭证（如 Cookies）
  });
  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();

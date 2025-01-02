import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`请访问：http://localhost:${process.env.PORT ?? 8081}`);
  // 启用跨域
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // 手动设置跨域头部
  // app.use((req: any, res: any, next: Function) => {
  //   res.header('Access-Control-Allow-Origin', 'https://nav.myltx.top');
  //   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   next();
  // });
  await app.listen(process.env.PORT ?? 8081);
}
bootstrap();

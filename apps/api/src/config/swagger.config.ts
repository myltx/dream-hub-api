import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export let SwaggerDocument: any; // <-- 导出文档变量

export const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Dream Hub')
    .setDescription('Dream Hub接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerDocument = SwaggerModule.createDocument(app, config); // <-- 缓存文档
  SwaggerModule.setup('api-docs', app, SwaggerDocument, {
    customSiteTitle: 'Dream Hub API Docs',
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css',
    customJs: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js',
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
    explorer: true,
    useGlobalPrefix: true,
  });

  return SwaggerDocument;
};

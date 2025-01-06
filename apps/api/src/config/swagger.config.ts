import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const configureSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Dream Hub')
    .setDescription('Dream Hub接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Dream Hub API Docs',
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css',
    customJs: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js',
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
    explorer: true,
    useGlobalPrefix: true,
  });
};

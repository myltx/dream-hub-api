import { INestApplication } from '@nestjs/common';

export const configureCors = (app: INestApplication) => {
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
};

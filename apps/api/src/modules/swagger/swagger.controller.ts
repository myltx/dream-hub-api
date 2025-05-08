import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { SwaggerDocument } from '../../config/swagger.config';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class SwaggerController {
  @IsPublic()
  // 隐藏这个接口
  @ApiExcludeEndpoint()
  @Get('/openapi-json')
  getSwaggerJson(@Res() res: Response) {
    console.log('getSwaggerJson');
    res.setHeader('Content-Type', 'application/json');
    res.send(SwaggerDocument);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { WebsiteAccessLogService } from './websiteAccessLog.service';
import {} from './websiteAccessLog.service';
import { CreateWebsiteAccessLogDto } from './dto/create-websiteAccessLog.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('日志管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@Controller('websiteAccessLog')
export class WebsiteAccessLogRepository {
  constructor(private readonly logService: WebsiteAccessLogService) {}

  @ApiOperation({ summary: '新增站点访问日志' })
  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async create(
    @Body() createWebsiteAccessLogDto: CreateWebsiteAccessLogDto,
    @Request() req,
  ) {
    console.log(createWebsiteAccessLogDto, 'createWebsiteAccessLogDto');
    return this.logService.create({
      ...createWebsiteAccessLogDto,
      user_id: req.user?.sub,
    });
  }

  @ApiOperation({ summary: '获取站点访问日志列表' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.logService.findAll();
  }
  @ApiOperation({ summary: '根据查询条件获取站点访问日志列表' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('query')
  async findByQuery(@Query() query: Record<string, any>) {
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        if (!query[key]) {
          delete query[key];
        }
      }
    }
    return this.logService.findByQuery(query);
  }
}

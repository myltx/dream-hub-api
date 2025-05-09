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
import { SiteAccessLogService } from './siteAccessLog.service';
import { CreateLogDto } from './dto/create-siteAccessLog.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { QueryVisitStatsDto } from './dto/query-visitStats.dot';
@ApiTags('日志管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@Controller('siteAccessLog')
export class SiteAccessLogController {
  constructor(private readonly logService: SiteAccessLogService) {}

  @ApiOperation({ summary: '新增日志' })
  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async create(@Body() CreateLogDto: CreateLogDto, @Request() req) {
    // 从请求头获取 IP 地址
    // TODO: 暂时未获取到 ip 地址，需要优化
    return this.logService.create({
      ...CreateLogDto,
      user_id: req.user?.sub,
    });
  }
  // 获取访问次数

  @ApiOperation({ summary: '获取访问数量' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('count')
  async getInterViewCount() {
    const data = await this.logService.findAll();

    return data.length;
  }

  @ApiOperation({ summary: '获取日志列表' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.logService.findAll();
  }
  @ApiOperation({ summary: '根据查询条件获取日志列表' })
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
  // 每日访问统计
  @ApiOperation({ summary: '每日访问统计' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('daily')
  async daily() {
    return this.logService.increaseTodayVisitCount();
  }
  @ApiOperation({
    summary: '查询最近 7 天访问趋势 ',
  })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('getRecent7DaysVisitStats')
  async getRecent7DaysVisitStats() {
    return this.logService.getRecent7DaysVisitStats();
  }
  @ApiOperation({
    summary: '查询指定日期范围内的访问统计',
  })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('visitStats')
  async getVisitStatsInRange(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
  ) {
    return this.logService.getVisitStatsByDateRange(startDate, endDate);
  }
  @ApiOperation({
    summary: '查询指定日期范围内的访问统计',
  })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('visitStats/monthly')
  async getMonthlyVisitStatsWithFill(@Query() query: QueryVisitStatsDto) {
    const { start, end } = query;
    return this.logService.getMonthlyVisitStatsWithFill(start, end);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WebsiteService } from './website.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@ApiTags('站点管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @ApiOperation({
    summary: '创建站点',
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websiteService.create(createWebsiteDto);
  }

  @ApiOperation({
    summary: '更新站点',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createWebsiteDto: CreateWebsiteDto,
  ) {
    return this.websiteService.update(id, createWebsiteDto);
  }
  @ApiOperation({
    summary: '删除站点',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.websiteService.remove(id);
  }
  @ApiOperation({ summary: '获取标签列表, (需要鉴权)' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.websiteService.findAll();
  }

  @ApiOperation({ summary: '获取标签详情, (需要鉴权)' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('public')
  async findAllPublic() {
    return this.websiteService.findAll();
  }
}

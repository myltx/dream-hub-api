import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { QueryTagDto } from './dto/query-tag.dto';

@ApiTags('标签管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '创建标签' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @ApiOperation({ summary: '更新标签' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    console.log(id, updateTagDto);
    return this.tagService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: '删除标签' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    // 检查标签是否绑定站点
    const isBound = await this.tagService.isTagBoundToWebsite(id);
    if (isBound) {
      throw new Error(`标签已绑定站点，无法删除`);
    }
    return this.tagService.remove(id);
  }

  @ApiOperation({ summary: '获取标签列表, (需要鉴权)' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.tagService.findAll();
  }

  @ApiOperation({ summary: '获取标签详情, (需要鉴权)' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('public')
  async findAllPublic() {
    return this.tagService.findAll();
  }
  @ApiOperation({ summary: '根据查询条件获取标签列表' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('query')
  async findByQuery(@Query() query: QueryTagDto) {
    // for (const key in query) {
    //   if (Object.prototype.hasOwnProperty.call(query, key)) {
    //     if (!query[key]) {
    //       delete query[key];
    //     }
    //   }
    // }
    return this.tagService.findByQuery(query);
  }
}

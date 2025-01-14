import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { QueryCategoryDto } from './dto/query-category.dto';

@ApiTags('分类管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '创建分类' })
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoriesService.create({
      ...createCategoryDto,
      user_id: req.user.sub,
    });
  }

  @ApiOperation({ summary: '编辑分类' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }
  @ApiOperation({ summary: '删除分类' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 检查标签是否绑定站点
    const isBound = await this.categoriesService.isCategoryBoundToWebsite(id);
    if (isBound) {
      throw new Error(`分类已绑定站点，无法删除`);
    }
    return this.categoriesService.remove(id);
  }

  @ApiOperation({ summary: '获取全部分类列表（需要鉴权）' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Request() req) {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: '获取全部分类列表（无需鉴权）' })
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('public')
  async findAllPublic() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: '根据查询条件获取分类列表' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get('query')
  async findByQuery(@Query() query: QueryCategoryDto) {
    // for (const key in query) {
    //   if (Object.prototype.hasOwnProperty.call(query, key)) {
    //     if (!query[key]) {
    //       delete query[key];
    //     }
    //   }
    // }
    return this.categoriesService.findByQuery(query);
  }
}

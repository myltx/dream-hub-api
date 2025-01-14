import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('日志管理')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: '用户令牌',
  example: 'Bearer token',
})
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: '新增收藏' })
  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async create(@Body() createFavoritesDto: CreateFavoritesDto, @Request() req) {
    return this.favoritesService.create({
      ...createFavoritesDto,
      user_id: req.user?.sub,
    });
  }

  @ApiOperation({ summary: '删除收藏' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }

  @ApiOperation({ summary: '获取收藏列表' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.favoritesService.findAll();
  }
  @ApiOperation({ summary: '根据查询条件获取收藏列表' })
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
    return this.favoritesService.findByQuery(query);
  }
}

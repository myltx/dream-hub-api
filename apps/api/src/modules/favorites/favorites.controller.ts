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
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
@ApiTags('收藏管理')
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
  async create(@Body() createFavoritesDto: any, @CurrentUser() user: any) {
    return this.favoritesService.create(
      {
        ...createFavoritesDto,
      },
      user?.sub,
    );
  }

  @ApiOperation({ summary: '根据contentId删除收藏' })
  @Post('removeByContent')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Body()
    body: {
      content_id: string;
      content_type: string;
    },
    @CurrentUser() user: any,
  ) {
    const { content_id, content_type } = body;
    return this.favoritesService.removeByContent({
      content_id,
      user_id: user.sub,
      content_type,
    });
  }

  @ApiOperation({ summary: '根据ID删除收藏' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async removeId(@Param('id') id: string, @CurrentUser() user: any) {
    return this.favoritesService.removeById({
      id,
      user_id: user.sub,
    });
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
  async findByQuery(@Body() body: Record<string, any>) {
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        if (!body[key]) {
          delete body[key];
        }
      }
    }
    return this.favoritesService.findByQuery(body);
  }
}

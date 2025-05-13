import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { BusinessException } from '../../exceptions/index';

@Injectable()
export class FavoritesService {
  dbName = 'user_favorites';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}
  async create(createFavoritesDto: CreateFavoritesDto, userId: string) {
    const { content_id, content_type } = createFavoritesDto;
    const { data: existingFavorite, error: checkError } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('user_id', userId)
      .eq('content_id', content_id)
      .eq('content_type', content_type)
      .maybeSingle(); // 更安全

    if (checkError) {
      throw new BusinessException(`检查收藏失败: ${checkError.message}`);
    }

    if (existingFavorite) {
      throw new BusinessException('已收藏，无需重复收藏');
    }

    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([
        {
          ...createFavoritesDto,
          user_id: userId,
        },
      ])
      .select(); // 返回插入后的数据

    if (error) {
      throw new BusinessException(`创建收藏失败: ${error.message}`);
    }

    return data;
  }

  async removeByContent({
    content_id,
    content_type,
    user_id,
  }: {
    user_id: string;
    content_id: string;
    content_type: string;
  }) {
    // 检查是否存在
    console.log('取消收藏', {
      user_id,
      content_id,
      content_type,
    });
    const { data: existingFavorite, error: checkError } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('user_id', user_id)
      .eq('content_id', content_id)
      .eq('content_type', content_type)
      .maybeSingle(); // 更安全

    if (checkError) {
      throw new BusinessException(`检查收藏失败: ${checkError.message}`);
    }
    if (!existingFavorite) {
      throw new BusinessException('未收藏，无法取消');
    }
    if (existingFavorite.user_id !== user_id) {
      throw new BusinessException('没有权限取消收藏');
    }
    const { error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('user_id', user_id)
      .eq('content_id', content_id)
      .eq('content_type', content_type);

    if (error) {
      throw new BusinessException(`取消收藏失败: ${error.message}`);
    }

    return true;
  }

  async removeById({ id, user_id }: { user_id: string; id: string }) {
    // 检查是否存在
    const { data: existingFavorite, error: checkError } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('user_id', user_id)
      .eq('id', id)
      .maybeSingle(); // 更安全
    console.log(existingFavorite, 'existingFavorite');
    if (checkError) {
      throw new BusinessException(`检查收藏失败: ${checkError.message}`);
    }
    if (!existingFavorite) {
      throw new BusinessException('未收藏，无法取消');
    }
    if (existingFavorite.user_id !== user_id) {
      throw new BusinessException('没有权限取消收藏');
    }
    const { error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('user_id', user_id)
      .eq('id', id);

    if (error) {
      throw new BusinessException(`取消收藏失败: ${error.message}`);
    }

    return true;
  }

  async findAll() {
    const { data, error } = await this.supabase.from(this.dbName).select('*');

    if (error) {
      throw new Error(`Error fetching tags: ${error.message}`);
    }

    return data;
  }

  async findByQuery(query: Record<string, any>) {
    let queryBuilder = this.supabase.from(this.dbName).select('*');

    // 动态构建查询条件
    for (const [key, value] of Object.entries(query)) {
      queryBuilder = queryBuilder.eq(key, value);
    }
    const { data, error } = await queryBuilder;
    if (error) {
      throw new Error(`查询失败: ${error.message}`);
    }
    return data;
  }
}

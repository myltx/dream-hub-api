import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateFavoritesDto } from './dto/create-favorites.dto';

@Injectable()
export class FavoritesService {
  dbName = 'user_favorites';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}
  async create(createFavoritesDto: CreateFavoritesDto) {
    const { user_id, content_id, content_type } = createFavoritesDto;

    // 检查是否已收藏
    const { data: existingFavorite, error: checkError } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('user_id', user_id)
      .eq('content_id', content_id)
      .eq('content_type', content_type)
      .single(); // 只取一条记录

    if (checkError && checkError.code !== 'PGRST116') {
      // 忽略没有匹配记录的错误，处理其他错误
      throw new Error(`Error checking favorite: ${checkError.message}`);
    }

    if (existingFavorite) {
      // 如果已存在，直接返回提示或数据
      throw new Error(`Error creating favorite: Already favorited`);
    }

    // 插入新的收藏记录
    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([createFavoritesDto]);

    if (error) {
      throw new Error(`Error creating favorite: ${error.message}`);
    }

    return data;
  }

  async remove(id: string) {
    // 检查是否存在需要删除的收藏记录
    const { data: existingFavorite, error: checkError } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('id', id)
      .single(); // 只检查一条记录

    if (checkError && checkError.code !== 'PGRST116') {
      // 忽略记录未找到的错误，抛出其他错误
      throw new Error(`Error checking favorite: ${checkError.message}`);
    }

    if (!existingFavorite) {
      // 如果记录不存在，返回提示
      throw new Error(`Error deleting favorite: Favorite not found`);
    }

    // 删除收藏记录
    const { error: deleteError } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);

    if (deleteError) {
      throw new Error(`Error deleting favorite: ${deleteError.message}`);
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

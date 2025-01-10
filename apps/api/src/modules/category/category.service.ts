import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';

@Injectable()
export class CategoriesService {
  dbName = 'categories';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([createCategoryDto]);

    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .select('*')
      .order('sort_order', { ascending: false }); // 由大到小排序

    if (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
    return data;
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .update(updateCategoryDto)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }

    return data;
  }
  async remove(id: number) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }

    return data;
  }

  async findByQuery(query: QueryCategoryDto) {
    const { page, limit, ...filters } = query;

    const offset = (page - 1) * limit;

    // 构建动态查询
    const queryBuilder = this.supabase
      .from('categories')
      .select('*', { count: 'exact' });

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        queryBuilder.ilike(key, `%${value}%`); // 假设需要模糊查询
      }
    }

    const { data, error, count } = await queryBuilder.range(
      offset,
      offset + limit - 1,
    );

    if (error) {
      throw new Error(`查询出错: ${error.message}`);
    }
    // 计算总页数
    const totalPages = Math.ceil((count || 0) / limit);

    return {
      list: data,
      total: count,
      totalPages,
      page,
      limit,
    };
  }
}

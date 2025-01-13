import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { QueryTagDto } from './dto/query-tag.dto';

@Injectable()
export class TagService {
  dbName = 'tags';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}
  async create(createCategoryDto: CreateTagDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([createCategoryDto]);

    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.from(this.dbName).select('*');

    if (error) {
      throw new Error(`Error fetching tags: ${error.message}`);
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
      throw new Error(`Error fetching tag: ${error.message}`);
    }
    return data;
  }
  async update(id: string, updateCategoryDto: UpdateTagDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .update(updateCategoryDto)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating taf: ${error.message}`);
    }

    return data;
  }
  async remove(id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting tag: ${error.message}`);
    }

    return data;
  }

  async findByQuery(query: QueryTagDto) {
    const { page, limit, ...filters } = query;

    const offset = (page - 1) * limit;

    // 构建动态查询
    const queryBuilder = this.supabase
      .from(this.dbName)
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

import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { data, error } = await this.supabase
      .from('categories')
      .insert([createCategoryDto]);

    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.from('categories').select('*');

    if (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }

    return data;
  }
  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
    return data;
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    console.log(updateCategoryDto, 'updateCategoryDto');
    console.log(id, 'id');
    const { data, error } = await this.supabase
      .from('categories')
      .update(updateCategoryDto)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }

    return data;
  }
  async remove(id: number) {
    const { data, error } = await this.supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }

    return data;
  }
}

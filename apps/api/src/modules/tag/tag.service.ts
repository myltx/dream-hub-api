import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}
  async create(createCategoryDto: CreateTagDto) {
    const { data, error } = await this.supabase
      .from('tags')
      .insert([createCategoryDto]);

    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.from('tags').select('*');

    if (error) {
      throw new Error(`Error fetching tags: ${error.message}`);
    }

    return data;
  }
  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('tags')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching tag: ${error.message}`);
    }
    return data;
  }
  async update(id: number, updateCategoryDto: UpdateTagDto) {
    const { data, error } = await this.supabase
      .from('tags')
      .update(updateCategoryDto)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating taf: ${error.message}`);
    }

    return data;
  }
  async remove(id: number) {
    const { data, error } = await this.supabase
      .from('tags')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting tag: ${error.message}`);
    }

    return data;
  }
}

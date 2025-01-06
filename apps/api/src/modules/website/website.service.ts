import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

@Injectable()
export class WebsiteService {
  dbName = 'websites';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}
  async create(createWebsiteDto: CreateWebsiteDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([createWebsiteDto]);

    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }

    return data;
  }
  async update(id: string, updateWebsiteDto: UpdateWebsiteDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .update(updateWebsiteDto)
      .eq('id', id);

    if (error) {
      throw new Error(`Error updating taf: ${error.message}`);
    }

    return data;
  }
  async findAll() {
    const { data, error } = await this.supabase.from(this.dbName).select('*');

    if (error) {
      throw new Error(`Error getting tafs: ${error.message}`);
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
      throw new Error(`Error getting taf: ${error.message}`);
    }

    return data;
  }
  async remove(id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting taf: ${error.message}`);
    }

    return data;
  }
}

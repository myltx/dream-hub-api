import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  dbName = 'users';
  constructor(
    @Inject('SupabaseClient') private readonly supabase: SupabaseClient,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .insert([createUserDto]);

    if (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }

    return data;
  }

  async findAll() {
    const { data, error } = await this.supabase.from(this.dbName).select('*');

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    return data;
  }

  async findOne(user_id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('user_id', user_id)
      .single();
    if (!data) {
      return null;
    }

    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }

    return data;
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .update(updateUserDto)
      .eq('user_id', user_id);

    if (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }

    return data;
  }
}

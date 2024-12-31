import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Controller('user')
export class AppController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async getData() {
    try {
      const data = await this.supabaseService.getData('users');
      return {
        code: 200,
        message: 'success',
        data,
      };
    } catch (err) {
      return {
        code: 500,
        message: 'error',
        data: err,
      };
    }
  }

  @Post()
  async createData(@Body() body: Record<string, any>) {
    return this.supabaseService.insertData('users', body); // 替换为你的表名
  }
  async getList(@Body() body: Record<string, any>) {
    // return this.supabaseService.getData('users', body); // 替换为你的表名
  }
}

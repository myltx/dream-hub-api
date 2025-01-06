import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseService } from './database/supabase/supabase.service';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @IsPublic()
  @Get()
  async getData() {
    return '欢迎使用';
  }

  @Post()
  async createData(@Body() body: Record<string, any>) {
    return this.supabaseService.insertData('users', body); // 替换为你的表名
  }
  async getList(@Body() body: Record<string, any>) {
    // return this.supabaseService.getData('users', body); // 替换为你的表名
  }
}

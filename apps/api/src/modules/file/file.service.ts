import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../database/supabase/supabase.service';
import { extname } from 'path';
import { QueryFileDto } from './dto/query-file.dto';

@Injectable()
export class FileService {
  private supabase: SupabaseClient;
  dbName = 'files';
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getClient();
  }

  // 上传文件
  async uploadFile(
    bucket: string,
    path: string,
    file: Express.Multer.File,
    userId: string,
  ) {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = extname(file.originalname); // 获取文件扩展名
    const fileName = `${uniqueSuffix}${fileExt}`;

    // 拼接完整路径
    const fullPath = `${path}/${fileName}`;

    // 设置 MIME 类型
    const mimeType = file.mimetype;

    // 上传到 Supabase
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fullPath, file.buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    // 获取公开 URL
    const { data: urlData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    const publicUrl = urlData.publicUrl;

    // 将文件信息插入数据库
    const { data: dbData, error: dbError } = await this.supabase
      .from('files')
      .insert([
        {
          user_id: userId,
          bucket,
          file_name: fileName,
          path: data.path,
          public_url: publicUrl,
          file_type: mimeType,
        },
      ])
      .select('id')
      .single();

    if (dbError) {
      throw new Error(`Failed to save file to database: ${dbError.message}`);
    }

    return {
      id: dbData.id, // 返回文件在数据库中的 ID
      path: data.path,
      url: publicUrl,
    };
  }

  // 删除文件
  async deleteFile(id: string, bucket: string, path: string) {
    const { error } = await this.supabase.storage.from(bucket).remove([path]);
    // 删除 数据库中的记录
    const { error: dbError } = await this.supabase
      .from(this.dbName)
      .delete()
      .eq('id', id);
    if (dbError) {
      throw new Error(
        `Failed to delete file from database: ${dbError.message}`,
      );
    }
    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
    return { message: 'File deleted successfully' };
  }

  // 根据id 获取文件
  async getFileById(id: string) {
    const { data, error } = await this.supabase
      .from(this.dbName)
      .select('*')
      .eq('id', id)
      .single();
    if (!data) {
      throw new Error(`File not found with id: ${id}`);
    }
    if (error) {
      throw new Error(`Failed to get file: ${error.message}`);
    }
    return data;
  }

  // 获取所有的文件
  async findByQuery(query: QueryFileDto) {
    const { page, limit, user_id, ...filters } = query;
    const offset = (page - 1) * limit;
    // 构建动态查询
    const queryBuilder = this.supabase
      .from(this.dbName)
      .select('*')
      .range(offset, offset + limit - 1);

    // 添加过滤条件
    const exclude = [''];
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (!exclude.includes(key)) {
          queryBuilder.ilike(key, `%${value}%`); // 假设需要模糊查询
        } else {
          queryBuilder.eq(key, value);
        }
      }
    }

    const { data, count, error } = await queryBuilder;

    if (error) {
      throw new Error(`Failed to get files: ${error.message}`);
    }
    // 计算总页数
    const totalPages = Math.ceil((count || 0) / limit);
    return { list: data, total: count, totalPages, page, limit };
  }
}

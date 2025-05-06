import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseService } from './database/supabase/supabase.service';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';
import { RawResponse } from './common/decorators/raw-response.decorator';
@Controller()
export class AppController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @IsPublic()
  @RawResponse()
  @Get()
  getData() {
    const version = 'v1.0.0'; // 可替换为动态值
    return `
      <!DOCTYPE html>
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>欢迎使用 Dream Hub API</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              font-family: 'Inter', sans-serif;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: linear-gradient(135deg, #6366f1, #3b82f6);
              color: #fff;
              text-align: center;
              padding: 2rem;
            }
  
            .container {
              background: rgba(255, 255, 255, 0.05);
              padding: 3rem;
              border-radius: 1.25rem;
              box-shadow: 0 8px 24px rgba(0,0,0,0.2);
              backdrop-filter: blur(10px);
            }
  
            h1 {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
            }
  
            p {
              font-size: 1.2rem;
              margin-bottom: 2rem;
              opacity: 0.9;
            }
  
            .link {
              display: inline-block;
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
              font-weight: 600;
              color: #3b82f6;
              background-color: #fff;
              border-radius: 9999px;
              text-decoration: none;
              transition: background-color 0.3s ease;
            }
  
            .link:hover {
              background-color: #f0f0f0;
            }
  
            .version {
              margin-top: 1.5rem;
              font-size: 0.9rem;
              opacity: 0.7;
            }
  
            .icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">🚀</div>
            <h1>欢迎使用 Dream Hub API</h1>
            <p>你的开发助手，已准备就绪。</p>
            <a class="link" href="/api-docs">查看 API 文档</a>
            <div class="version">版本号：${version}</div>
          </div>
        </body>
      </html>
    `;
  }

  @Post()
  async createData(@Body() body: Record<string, any>) {
    return this.supabaseService.insertData('users', body); // 替换为你的表名
  }
  async getList(@Body() body: Record<string, any>) {
    // return this.supabaseService.getData('users', body); // 替换为你的表名
  }
}

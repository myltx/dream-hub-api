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
          <title>Dream Hub API</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
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
              padding: 2rem;
              text-align: center;
            }
            .container {
              background: rgba(255,255,255,0.06);
              padding: 2.5rem;
              border-radius: 1.5rem;
              backdrop-filter: blur(12px);
              box-shadow: 0 8px 32px rgba(0,0,0,0.2);
              max-width: 500px;
              width: 90%;
            }
            .logo {
              width: 80px;
              margin-bottom: 1rem;
            }
            h1 {
              font-size: 2rem;
              margin-bottom: 0.5rem;
            }
            p {
              opacity: 0.9;
              margin-bottom: 1.5rem;
            }
            .btn {
              display: inline-block;
              margin-top: 1rem;
              padding: 0.75rem 1.5rem;
              background: #fff;
              color: #3b82f6;
              font-weight: bold;
              border-radius: 999px;
              text-decoration: none;
              transition: background 0.3s;
            }
            .btn:hover {
              background: #e5e7eb;
            }
            .version {
              font-size: 0.85rem;
              color: #ddd;
              margin-top: 1.5rem;
            }
            .qr {
              margin-top: 2rem;
              width: 120px;
              height: 120px;
            }
            .team {
              margin-top: 1.2rem;
              font-size: 0.9rem;
              color: #cbd5e1;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://xcwhdikndfrizmrtxyiy.supabase.co/storage/v1/object/public/doc-img/api-img/logo.png" alt="Logo" class="logo" />
            <h1>欢迎使用 Dream Hub API</h1>
            <p>你的开发助手已准备就绪。</p>
            <a href="/api-docs" class="btn">进入 API 文档</a>
            <div class="version">当前版本：v${version}</div>
            <img src="https://xcwhdikndfrizmrtxyiy.supabase.co/storage/v1/object/public/doc-img/api-img/wechat.png" class="qr" alt="二维码" />
            <div class="team">
              由 <a href="https://github.com/myltx/dream-hub" target="_blank" style="color: #fff; font-weight: bold;">DreamHub 团队</a> 提供支持
            </div>
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

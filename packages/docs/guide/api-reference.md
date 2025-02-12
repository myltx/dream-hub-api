# 🚀 后端文档说明

本说明文档将帮助你了解如何配置、运行和使用 **Dream Hub** 后端服务。后端使用 [**NestJS**](https://nestjs.com/) 开发，并与 **Supabase** 和 **Logto** 进行集成。
接口采用 **REST API**，支持跨域请求。

## 📌 1. 后端架构

Dream Hub 后端采用 **NestJS** 框架，结构清晰，分层明确，包含以下模块：

- **Auth Module**：处理用户认证，集成 **Logto** 实现 JWT 身份验证。
- **Website Module**：管理网站数据，包括添加、编辑、删除、查询网站。
- **Category Module**：管理网站分类，支持多级分类结构。
- **Tag Module**：管理网站标签，支持站点与标签的关联。
- **Favorite Module**：处理用户的收藏功能，支持网站、文章等内容的收藏。
- **AI Module**：集成 AI 服务，提供网站推荐、内容分类等功能。
- **Logging Module**：记录访问日志，支持用户行为追踪。

后端服务通过 **REST API** 提供数据访问和操作。

## 🛠️ 2. 安装和配置

### 2.1 安装依赖

克隆项目后，首先进入后端目录并安装所需的依赖：

```sh

cd /apps/api
pnpm install

```

### 2.2 配置环境变量

在 `.env` 文件中配置以下环境变量：

```sh
# supabase 配置
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_JWT_SECRET=

# redis 配置
REDIS_URL=

# server 配置
PORT=8081

# logto 配置
LOGTO_ENDPOINT=h
LOGTO_APP_ID=
# LOGTO_ENDPOINT=
# LOGTO_APP_ID=
BACKEND_ENDPOINT=
```

**注意**：确保你已经正确配置了 **Supabase** 和 **Logto** 的环境变量。

## 🔥 3. 启动后端

启动后端服务，运行以下命令：

```sh
pnpm dev:server
```

后端服务默认运行在 http://localhost:8081，你可以在浏览器中访问该地址进行调试。

## 🎯 4. API 使用

后端提供了多个 API 端点用于数据操作。具体使用参考 [Swagger](#-4-swagger-api-文档) 文档。

## 📌 4. Swagger API 文档

Dream Hub 后端提供了基于 Swagger 自动生成的接口文档，帮助开发人员快速了解和调用所有的 API。

### 4.1 访问 Swagger 文档

你可以通过访问以下链接来查看后端 API 的 Swagger 文档

```sh
http://localhost:8081/api-docs
```

**说明**：确保后端服务正在运行，并且访问的是正确的端口（默认为 8081）。

### 4.2 Swagger 文档功能

Swagger 提供了以下功能：

- 接口查看：列出了所有的 API 端点，支持按模块进行筛选。
- 参数说明：每个 API 的请求和响应参数都有详细的说明，包括参数类型、是否必填、默认值等。
- 接口测试：你可以直接在 Swagger UI 中调用 API，测试接口的响应。

**说明**：你可以通过访问该文档并进行测试，来确保 API 正常工作，并根据接口文档进行开发。

## 🔒 5. 安全性

后端所有的 API 都使用 JWT 进行身份验证。在请求中，必须在 Authorization 头中提供有效的 JWT Token。

请求示例：

```sh
GET http://localhost:8081/websites
Authorization: Bearer <your_jwt_token>
```

确保在生产环境中使用 HTTPS，并通过环境变量配置生产环境的 JWT 密钥和认证参数。

## 🛠️ 6. 数据库设计

后端数据库采用 Supabase，包含以下核心表格：

1. **用户表 (users)**：存储用户的基本信息。

2. **网站表 (websites)**：存储所有网站的数据，包括 URL、标题、分类等。

3. **标签表 (tags)**：存储标签数据。

4. **网站标签关联表 (website_tags)**：用于关联网站和标签。

5. **收藏表 (user_favorites)**：存储用户的收藏信息，支持收藏不同类型的内容（如网站、文章等）。

💡 **提示**：你可以根据需求自定义数据库模型，并通过 Supabase 控制台进行管理。

## ⚙️ 7. 常见问题与解决方案

### Q1: 如何解决 CORS 问题？

A1: 在开发过程中，确保前端和后端都在正确的地址运行。如果遇到 CORS 问题，可以在后端中通过配置 CORS 中间件来解决。

### Q2: 如何修改数据库表结构？

A2: 你可以通过 Supabase 控制台修改数据库表结构，也可以编写迁移脚本来进行结构更新。

---

📌 **了解更多**：

- [简介](/guide/)
- [快速开始](/guide/getting-started)
- [前端文档](/guide/front-end-reference)
- [项目 GitHub 仓库](https://github.com/myltx/dream-hub)

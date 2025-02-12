# 🚀 前端开发文档

本文档将帮助你了解如何开发和扩展 **Dream Hub** 的前端部分，前端采用 **Nuxt3** 框架，并与 **Supabase** 和 **Logto** 进行集成。

## 📌 1. 项目架构

Dream Hub 的前端主要由以下模块组成：

- **Pages**：页面组件，负责渲染不同的页面视图。
- **Layouts**：布局组件，控制页面的通用布局。
- **Components**：可复用的 UI 组件，例如按钮、表单、模态框、抽屉等。
- **Store**：状态管理，使用 Pinia 来管理全局状态。
- **Services**：与后端交互的 API 请求封装。

前端与后端通过 **REST API** 进行数据交互，并且使用 **Supabase** 作为数据库，**Logto** 处理用户的认证和登录。

## 🛠️ 2. 安装与配置

### 2.1 安装依赖

克隆项目并进入前端目录，安装所需的依赖：

```sh
cd /apps/client
pnpm install
```

## 2.2 配置环境变量

在 client/.env 文件中配置以下变量：

```sh
# Supabase 后端 API 地址
# logto 配置
NUXT_LOGTO_ENDPOINT=
NUXT_LOGTO_APP_ID=
# NUXT_LOGTO_ENDPOINT=
# NUXT_LOGTO_APP_ID=
BACKEND_ENDPOINT=

LOGTO_SIGN_IN_REDIRECT_URI =
LOGTO_SIGN_OUT_REDIRECT_URI =

# supabase 配置
SUPABASE_URL=
SUPABASE_KEY=


# API_BASE=
API_BASE=

# project config
PROJECT_NAME= Dream-hub

# AI
AI_API_KEY=
AI_BASE_URL=
```

**注意**：确保你已经正确配置了 **Supabase** 和 **Logto** 的环境变量。

## 🔥 3. 启动前端

确保后端服务已经启动后，运行以下命令启动前端项目：

```sh
pnpm dev
```

默认情况下，前端服务将运行在 http://localhost:3000。

## 🎯 4. 目录结构

```sh
client/
├── assets/        # 存放静态资源，如图片、字体等
├── components/    # 组件库，存放可复用的组件
├── layouts/       # 布局组件
├── pages/         # 页面组件
├── plugins/       # 插件，配置 Nuxt 插件
├── store/         # 状态管理，使用 Pinia 管理全局状态
├── services/      # 与后端 API 交互的服务
├── .env           # 环境变量配置
└── nuxt.config.ts # Nuxt 配置文件
```

## 🌍 5. 路由与页面结构

前端项目基于 **Nuxt3** 的页面路由系统，路由由 pages 目录中的 Vue 组件自动生成。

### 5.1 主页

主页文件位于 pages/index.vue，用户访问 http://localhost:3000/ 时，Nuxt3 会自动加载该组件。

### 5.2 用户认证页面

用户认证包括登录、注册和注销，页面分别位于：
• 登录页：pages/auth/login.vue
• 注册页：pages/auth/register.vue

<!-- • 用户个人中心：pages/profile.vue -->

## 🛠️ 6. 状态管理

我们使用 **Pinia** 来管理前端的状态。在 store/ 目录下，你会看到几个管理不同数据的状态模块：

## ⚡ 7. UI 组件与自定义组件

### 7.1 Nuxt UI 组件

**Dream Hub** 使用 **NuxtUI** 作为组件库，你可以在 components/ 目录中找到常用的组件，如按钮、表单、模态框等。以下是一个示例：

## 🔒 8. 用户认证与权限控制

在 **Dream Hub** 中，用户认证通过 [**Logto**](https://logto.io/) 完成。我们使用了 useLogto() 方法来处理用户的登录和退出。

## ⚙️ 9. 常见问题与解决方案

### Q1: 如何解决 CORS 问题？

A1: 确保前端和后端都在正确的地址运行。如果遇到 CORS 问题，可以通过修改后端的 CORS 配置来允许来自前端的请求。

### Q2: 如何配置 Logto？

A2: 在 .env 文件中配置 NUXT_LOGTO_ENDPOINT 和 NUXT_LOGTO_APP_ID，并确保在 nuxt.config.ts 中正确集成了 @logto/nuxt 模块。

---

📌 **了解更多**：

- [简介](/guide/)
- [快速开始](/guide/getting-started)
- [后端文档](/guide/api-reference)
- [项目 GitHub 仓库](https://github.com/myltx/dream-hub)

# 🚀 快速开始

本指南将帮助你快速搭建 **Dream Hub**，包括环境准备、安装依赖、本地运行以及部署。

## 📌 1. 环境准备

在开始之前，请确保你已安装以下工具：

- [Node.js](https://nodejs.org/)（建议使用版本 20.0以上）
- [pnpm](https://pnpm.io/)（用于管理 monorepo 依赖）
- [Mise](https://mise.jdx.dev/) or [Nvm](https://github.com/nvm-sh/nvm)（推荐用于管理 Node.js 版本）
  <!-- - [Nestjs](https://nestjs.com/)（后端框架） -->
  <!-- - [Docker](https://www.docker.com/)（可选，用于本地运行 Supabase） -->

## 🛠️ 2. 安装依赖

```sh
# 克隆仓库
git clone https://github.com/myltx/dream-hub.git
cd dream-hub

# 使用 pnpm 安装依赖
pnpm install
```

::: info 💡 说明
Dream Hub 采用 pnpm workspace 进行项目管理，client 目录用于前端，api 目录用于后端。
:::

## 🛠️ 3. 配置环境变量

### 3.1 前端（Nuxt3）：在 `client/.env` 文件中配置以下变量：

<!--@include: ./front-end-reference.md{31,59}-->

### 3.2 后端（NestJS）：在 `api/.env` 文件中配置以下变量：

<!--@include: ./api-reference.md{40,60}-->

<!-- # AI -->

## 🔥 4. 本地运行

### 4.1 启动后端（NestJS）

```sh
pnpm dev:server
```

### 4.2 启动前端（Nuxt3）

```sh
pnpm dev:client
```

::: warning 📌 注意
确保前端的 .env 配置正确，指向你的 Supabase 后端 API 地址,以及 logto 配置。
:::

## 🎯 6. 目录结构

```markdown
dream-hub/
├── apps/
│ ├── api/ # 后端 (NestJS)
│ ├── client/ # 前端 (Nuxt3)
├── packages/
│ ├── supabase/ # Supabase 相关工具
│ ├── docs/ # VitePress 文档
└── pnpm-workspace.yaml
```

## 🎉 7. 你已成功启动 Dream Hub！

现在你可以开始使用 Dream Hub 进行网站管理，并体验 AI 推荐、智能分类 等功能了！🚀

接下来，你可以根据需要进一步自定义和扩展 Dream Hub 的功能。

## 🚀 8. Vecel 部署指南

### 8.1 Vercel 一键部署

- `Fork` 本项目，在 `Vercel` 官网点击 `New Project`

- 点击 `Import Git Repository` 并选择你 fork 的此项目并点击 `import`

- `PROJECT NAME`自己填，`FRAMEWORK PRESET` 选 `Other` 然后直接点 `Deploy` 接着等部署完成即可

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/myltx/nav-monorepo)

### 8.2 Vecel 本地部署

```powershell
// 全局安装 vercel
npm i -g vercel

// 登录
vercel login

// 项目推送
vercel

// 挂载生产
vercel --prod
```

> 具体教程可参考文章：[如何使用 Vercel 托管静态网站](https://baiwumm.com/p/5zzij7bt)

---

📌 **了解更多**：

- [简介](/guide/)
- [前端文档](/guide/front-end-reference)
- [后端文档](/guide/api-reference)
- [项目 GitHub 仓库](https://github.com/myltx/dream-hub)

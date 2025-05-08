<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Dream Hub API</h1>

<p align="center">
  基于 <a href="http://nestjs.com/" target="_blank">NestJS</a> 的高效、可扩展的服务端应用框架。
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
</p>

## 项目简介

Dream Hub API 是一个基于 NestJS 框架开发的服务端应用，旨在为 Dream Hub 平台提供高效、可扩展的 API 支持。项目采用 TypeScript 编写，结构清晰，易于维护和扩展。

## 功能特性

- 高性能、模块化的服务端架构
- 支持 RESTful API
- 易于扩展和维护
- 单元测试与端到端测试支持
- 适配多种部署环境

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动项目

```bash
# 开发环境
pnpm run start

# 热更新模式
pnpm run start:dev

# 生产环境
pnpm run start:prod
```

### 运行测试

```bash
# 单元测试
pnpm run test

# 端到端测试
pnpm run test:e2e

# 测试覆盖率
pnpm run test:cov
```

## 目录结构

```
apps/api/
├── src/ # 源码目录
├── test/ # 测试用例
├── README.md # 项目说明
└── ...
```

## 部署

详细部署方式请参考 [NestJS 官方部署文档](https://docs.nestjs.com/deployment)。

## 贡献指南

欢迎任何形式的贡献！请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细的贡献流程。

## 许可证

本项目基于 [MIT 许可证](https://github.com/nestjs/nest/blob/master/LICENSE)。

<!-- ## 联系方式

- 作者：你的名字（可选）
- 邮箱：你的邮箱（可选）
- 项目主页：[https://your-project-homepage.com](https://your-project-homepage.com)（可选） -->

---

> 本项目基于 [NestJS](https://nestjs.com/) 构建，感谢其强大的生态支持。

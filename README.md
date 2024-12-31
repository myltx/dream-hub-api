## 目录说明
```shell
my-project/
├── apps/                   # 应用目录
│   ├── client/             # 前端展示，基于 Nuxt3
│   │   ├── nuxt.config.ts
│   │   ├── package.json
│   │   ├── public/         # 静态文件
│   │   ├── components/     # 组件
│   │   ├── pages/          # 页面目录
│   │   └── ...             # 其他 Nuxt3 项目相关目录
│   ├── api/                # 后端服务，基于 NestJS
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth/       # 登录相关的模块
│   │   │   ├── database/   # 数据库交互逻辑
│   │   │   └── ...         # 其他后端模块
│   │   ├── package.json
│   │   ├── nest-cli.json
│   │   └── tsconfig.json
├── packages/               # 共享代码和工具库
│   ├── shared/             # 共享代码库
│   │   ├── utils/          # 工具函数
│   │   ├── types/          # 全局类型声明
│   │   ├── package.json
│   │   └── tsconfig.json
├── supabase/               # Supabase 配置文件和 SQL 脚本
│   ├── schema.sql          # 数据库 schema 文件
│   ├── seeds.sql           # 初始数据脚本
│   └── ...                 # 其他 Supabase 相关文件
├── .pnpm-workspace.yaml    # pnpm workspace 配置
├── package.json            # 根 package.json 文件
└── README.md               # 项目说明文档

```
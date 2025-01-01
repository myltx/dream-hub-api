# 导航网站
 - 用于记录自己平时使用或发现的好用的网站

# 技术栈
 - [nuxt3](https://nuxt.com/)
 - [logto](https://logto.io/)
 - [supabase](https://supabase.com/)
 - [unocss](https://unocss.dev/)

# 🚀 How To Start?
<!-- The mentioned operations below are based on the root directory of the current project, please be attentive to ensure there are no errors! -->
1. 添加 .env 配置文件
	```shell
	# logto 配置
	NUXT_LOGTO_ENDPOINT=
	NUXT_LOGTO_APP_ID=
	# supabase 配置
	SUPABASE_URL=
	SUPABASE_KEY=
	SUPABASE_JWT_SECRET=
	JTI=

	LOGTO_SIGN_IN_REDIRECT_URI= 
	LOGTO_SIGN_OUT_REDIRECT_URI=
	
	```
2. 安装依赖
   ```shell
   npm install
   ```
3. 启动项目
   ```shell
   pnpm dev
   ```
# 注意事项
1. node 版本需要 20 以上

## TODO

- [X] logto 模块添加调试
- [x] logto 登录后用户数据添加到 supabase
<!-- - [ ] supabase api 封装 -->
- [x] 暗黑主题配置
- [ ] 展示布局开发
- [ ] 后台功能设计
- [ ] 接口设计
  - [ ] 用户管理
    - [ ] 新增
    - [ ] 查询详情
    - [ ] 查询列表
    - [ ] 编辑
    - [ ] 删除
  - [ ] 网站管理
  - [ ] 分类管理
  - [ ] 标签管理
## 目录说明
```shell
├── apps/                   # 应用目录
│   ├── client/             # 前端展示，基于 Nuxt3
│   │   ├── nuxt.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
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
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   └── ...             # 其他配置文件
├── packages/               # 共享代码和工具库
│   ├── shared/             # 共享代码库
│   │   ├── utils/          # 工具函数
│   │   │   └── index.ts    # 示例工具文件
│   │   ├── types/          # 全局类型声明
│   │   │   └── index.d.ts  # 类型声明文件
│   │   ├── package.json
│   │   └── tsconfig.json   # TypeScript 配置文件
│   ├── supabase/           # Supabase 配置模块
│   │   ├── src/            # 数据库操作逻辑
│   │   │   ├── schema.ts   # 数据库表结构定义
│   │   │   ├── queries.ts  # 查询封装
│   │   │   └── ...         # 其他操作逻辑
│   │   ├── migrations/     # 数据库迁移文件
│   │   ├── seeds/          # 初始数据脚本
│   │   ├── package.json
│   │   └── tsconfig.json
├── .pnpm-workspace.yaml    # pnpm workspace 配置
├── tsconfig.base.json      # 根目录下的通用 TypeScript 配置
├── package.json            # 根 package.json 文件
└── README.md               # 项目说明文档

```
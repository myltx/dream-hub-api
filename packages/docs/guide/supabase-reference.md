# Supabase 使用指南

## 1. Supabase 简介

[**Supabase**](https://supabase.io/) 是一个开源的实时数据库和存储服务，基于 Postgres 和 Realtime PostgreSQL。它提供了一组 API，可以让你轻松地构建实时应用程序。

## 2. Supabase 安装

你可以通过 npm 或 yarn 安装 Supabase：

```bash
npm install @supabase/supabase-js
```

或者

```bash
yarn add @supabase/supabase-js
```

## 3. Supabase 初始化

在使用 Supabase 之前，你需要先初始化它。你可以通过以下代码来初始化 Supabase：

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);
```

## 4. Supabase API

Supabase 提供了一组 API，可以让你轻松地操作数据库和存储服务。以下是一些常用的 API：

### 4.1 数据库操作

#### 4.1.1 创建表

你可以使用 `createTable` 方法来创建表：

```javascript
const { data, error } = await supabase.from('your-table-name').insert([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
]);
```

#### 4.1.2 查询数据

你可以使用 `select` 方法来查询数据：

```javascript
const { data, error } = await supabase.from('your-table-name').select('*');
```

#### 4.1.3 更新数据

你可以使用 `update` 方法来更新数据：

```javascript
const { data, error } = await supabase
  .from('your-table-name')
  .update({ age: 31 })
  .eq('name', 'John');
```

#### 4.1.4 删除数据

你可以使用 `delete` 方法来删除数据：

```javascript
const { data, error } = await supabase
  .from('your-table-name')
  .delete()
  .eq('name', 'Jane');
```

### 4.2 存储操作

#### 4.2.1 上传文件

你可以使用 `storage` 方法来上传文件：

```javascript
const { data, error } = await supabase.storage.from('your-bucket-name');
```

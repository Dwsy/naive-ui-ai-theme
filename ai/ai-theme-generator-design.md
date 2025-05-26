# Naive UI 主题编辑器 AI 生成功能设计方案

## 1. 功能概述

为 Naive UI 的主题编辑器添加 AI 生成主题样式的功能，具体包括：

- 使用 AI（可配置替换供应商，默认使用 OpenRouter.AI）生成主题样式
- 支持控制生成全部组件还是选定组件
- 支持查看生成记录并一键使用
- 保留原有主题编辑器的所有功能

## 2. UI 设计

### 2.1 入口位置

在现有主题编辑器面板中添加一个新的折叠面板（NCollapseItem），标题为"AI 生成主题"，放置在现有组件列表的前面，作为第一个选项。

### 2.2 AI 生成面板布局

AI 生成面板内部布局分为以下几个部分：

1. **供应商配置区域**
   - 标题：AI 供应商配置
   - 内容：下拉选择框（默认选中 OpenRouter.AI）
   - API Key 输入框（带有保存按钮）
   - 模型选择下拉框（根据供应商提供可用模型）

2. **主题生成控制区域**
   - 文本提示词输入框（用于描述想要的主题风格）
   - 预设风格选择（提供几种常见风格如"暗黑"、"明亮"、"柔和"、"鲜艳"等）
   - 组件选择区域（复选框列表，默认全选）
   - 生成按钮

3. **生成记录区域**
   - 标题：生成历史
   - 内容：生成记录列表，每条记录包含：
     - 生成时间
     - 使用的提示词
     - 预览按钮
     - 应用按钮

## 3. 数据结构设计

### 3.1 AI 配置数据结构

```typescript
interface AIProviderConfig {
  provider: string; // 'openrouter' | 'other_provider'
  apiKey: string;
  model: string;
}
```

### 3.2 主题生成请求数据结构

```typescript
interface ThemeGenerationRequest {
  prompt: string;
  style?: string;
  components: string[]; // 选中的组件名称列表
}
```

### 3.3 生成记录数据结构

```typescript
interface ThemeGenerationRecord {
  id: string;
  timestamp: number;
  prompt: string;
  style?: string;
  components: string[];
  themeOverrides: GlobalThemeOverrides;
}
```

## 4. 功能流程设计

### 4.1 AI 供应商配置流程

1. 用户选择 AI 供应商（默认 OpenRouter.AI）
2. 用户输入对应供应商的 API Key
3. 系统保存配置到浏览器本地存储
4. 根据选择的供应商加载可用模型列表

### 4.2 主题生成流程

1. 用户输入文本提示词描述想要的主题风格
2. 用户可选择预设风格（可选）
3. 用户选择需要生成主题的组件（默认全选）
4. 用户点击"生成"按钮
5. 系统调用 AI API 生成主题样式
6. 系统将生成的主题样式应用到预览区域
7. 系统将生成记录保存到浏览器本地存储

### 4.3 生成记录使用流程

1. 用户查看生成记录列表
2. 用户可以点击"预览"按钮查看某条记录的主题效果
3. 用户可以点击"应用"按钮将某条记录的主题应用到当前编辑器

## 5. API 集成设计

### 5.1 OpenRouter.AI API 集成


### 5.2 其他供应商API集成接口


## 6. 本地存储设计

### 6.1 AI配置存储

### 6.2 生成记录存储

## 7. 组件集成设计



主要修改 `ThemeEditor.tsx`，添加AI生成相关的功能和UI。


## 8. UI 渲染设计


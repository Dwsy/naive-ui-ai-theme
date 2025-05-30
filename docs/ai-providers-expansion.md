# AI 供应商扩展文档

## 📋 概述

本次更新为 Naive UI 主题编辑器添加了多个 AI 供应商支持，从原来只支持 OpenRouter 扩展到支持 7 个主要的 AI 供应商。

## 🚀 新增功能

### 支持的 AI 供应商

1. **OpenRouter** - 聚合多个AI模型的平台（原有）
2. **OpenAI** - GPT系列模型官方API
3. **Anthropic** - Claude系列模型
4. **DeepSeek** - DeepSeek官方API
5. **豆包/字节跳动** - 字节跳动豆包大模型
6. **阿里巴巴千问** - 阿里云千问大模型
7. **自定义OpenAPI** - 兼容OpenAI格式的自定义API

### 新增配置选项

- **baseUrl**: 自定义API端点（用于自定义OpenAPI）
- **organization**: OpenAI组织ID（可选）

## 🔧 技术实现

### 核心文件修改

#### 1. `ai-config.ts`
- 扩展了 `AI_PROVIDERS` 配置
- 新增 `PROVIDER_MODELS` 对象，包含各供应商的模型列表
- 新增 `PROVIDER_ENDPOINTS` 和 `PROVIDER_AUTH_HEADERS` 配置
- 更新 `AIProviderConfig` 接口，添加 `baseUrl` 和 `organization` 字段
- 新增工具函数：
  - `getProviderModels()` - 获取供应商的可用模型
  - `getProviderEndpoint()` - 获取供应商的API端点
  - `getProviderAuthHeaders()` - 获取供应商的认证头

#### 2. `ai-theme-generator.ts`
- 更新 `callAIAPI()` 函数，支持多供应商路由
- 新增各供应商的API调用函数：
  - `callOpenAIAPI()` - OpenAI API调用
  - `callAnthropicAPI()` - Anthropic API调用
  - `callDeepSeekAPI()` - DeepSeek API调用
  - `callDoubaoAPI()` - 豆包 API调用
  - `callQwenAPI()` - 千问 API调用
  - `callCustomAPI()` - 自定义API调用
- 新增 `parseAIResponse()` 通用响应解析函数

#### 3. `AIConfigPanel.tsx`
- 更新供应商选择器，支持动态模型列表
- 新增条件配置字段：
  - 自定义API端点输入（仅自定义OpenAPI显示）
  - OpenAI组织ID输入（仅OpenAI显示）
- 更新配置提示信息，根据选择的供应商显示相应提示

#### 4. `ThemeEditor.tsx`
- 更新AI配置初始化，使用 `loadAIConfig()` 函数
- 新增配置变更处理函数
- 更新AIConfigPanel组件的props传递

## 📊 各供应商特性

### OpenRouter
- **特点**: 聚合平台，提供多种免费模型
- **推荐模型**: Google Gemini 2.0 Flash Exp (Free)
- **配置**: 只需API密钥

### OpenAI
- **特点**: GPT系列模型官方API
- **推荐模型**: GPT-4o, GPT-4o Mini
- **配置**: API密钥 + 可选组织ID

### Anthropic
- **特点**: Claude系列模型，擅长对话和分析
- **推荐模型**: Claude 3.5 Sonnet
- **配置**: API密钥
- **特殊**: 使用不同的API格式（system参数独立）

### DeepSeek
- **特点**: 国产大模型，性价比高
- **推荐模型**: DeepSeek Chat, DeepSeek R1
- **配置**: API密钥

### 豆包/字节跳动
- **特点**: 字节跳动自研大模型
- **配置**: API密钥

### 阿里巴巴千问
- **特点**: 阿里云大模型服务
- **推荐模型**: Qwen Max, Qwen Plus
- **配置**: API密钥
- **特殊**: 使用不同的请求格式

### 自定义OpenAPI
- **特点**: 支持任何兼容OpenAI格式的API
- **配置**: API密钥 + 自定义端点URL

## 🔒 安全性

- 所有API密钥都存储在本地浏览器中
- 支持密钥显示/隐藏切换
- 敏感信息不会发送到服务器

## 🎯 使用指南

1. **选择供应商**: 在AI配置面板中选择合适的供应商
2. **输入密钥**: 填写对应供应商的API密钥
3. **选择模型**: 从该供应商的可用模型中选择
4. **额外配置**: 根据需要填写baseUrl或organization
5. **保存配置**: 点击保存按钮存储配置
6. **开始生成**: 切换到生成主题标签页开始使用

## 🚨 注意事项

- 不同供应商的API格式可能略有差异
- 部分供应商可能需要特殊的认证方式
- 自定义API需要确保兼容OpenAI格式
- 建议先测试API连接再进行主题生成

## 🔄 向后兼容性

- 保持了原有的OpenRouter配置兼容性
- 现有的配置会自动迁移到新的格式
- `FREE_OPENROUTER_MODELS` 仍然可用（指向新的PROVIDER_MODELS.openrouter）

---

# 🎨 增强提示词功能更新

## 📋 新增功能概述

基于深度分析文档的建议，我们为主题编辑器添加了增强的提示词功能，解决了以下关键问题：

### 🎯 解决的核心问题

1. **浅色/暗色模式混乱** - 明确区分主题模式，避免配色错乱
2. **组件可读性差** - 强制对比度要求，确保文本清晰可见
3. **色彩搭配缺乏艺术性** - 引入专业画家风格预设
4. **生成质量不稳定** - 结构化提示词模板，提高一致性

## 🆕 新增功能特性

### 1. 增强提示词模式
- **智能开关**: 可选择启用/禁用增强模式
- **结构化模板**: 基于专业设计原则的提示词结构
- **可读性约束**: 强制4.5:1对比度要求
- **模式特定约束**: 浅色/暗色模式专门优化

### 2. 画家风格预设
新增6种专业艺术风格：

#### 🎨 莫奈印象派
- **色彩**: 柔和蓝紫色调 (#6A7FAF)
- **特点**: 光影自然，平静舒适
- **适用**: 商务、办公类应用

#### 🌟 梵高表现主义
- **色彩**: 鲜明蓝黄绿色 (#1A4789, #FFCF40)
- **特点**: 饱和度高，充满活力
- **适用**: 创意、艺术类应用

#### 📐 蒙德里安几何
- **色彩**: 纯粹三原色 (#D40000, #FFCE00, #0051BA)
- **特点**: 几何简洁，现代理性
- **适用**: 科技、工具类应用

#### 🔥 马蒂斯野兽派
- **色彩**: 大胆鲜艳色彩 (#FF3D3D, #FF9A3D)
- **特点**: 对比强烈，充满热情
- **适用**: 娱乐、社交类应用

#### ❄️ 北欧极简
- **色彩**: 简洁自然色调 (#5D7A8B, #D4B896)
- **特点**: 温暖舒适，功能性强
- **适用**: 生活、健康类应用

#### 🎋 日式和风
- **色彩**: 淡雅素净色调 (#8B4513, #DEB887)
- **特点**: 禅意宁静，和谐平衡
- **适用**: 文化、教育类应用

### 3. 主题模式选择
- **浅色模式**: 适合日间使用，背景明亮
- **暗色模式**: 适合夜间使用，背景深色
- **自适应模式**: 根据系统设置自动切换

### 4. 增强的用户界面
- **色彩预览**: 实时显示选中风格的色彩搭配
- **智能提示**: 根据选择的模式和风格提供专业建议
- **配置保存**: 自动保存用户的偏好设置
- **历史记录**: 显示使用的模式和艺术风格

## 🔧 技术实现细节

### 核心文件更新

#### 1. `ai-config.ts` 新增配置
```typescript
// 主题模式选项
export const THEME_MODES = [
  { label: '浅色模式', value: 'light' },
  { label: '暗色模式', value: 'dark' },
  { label: '自适应', value: 'auto' }
]

// 画家风格预设
export const ARTIST_STYLES = [
  {
    label: '莫奈印象派',
    value: 'monet',
    colors: { primary: '#6A7FAF', secondary: '#F0E68C' },
    prompt: '基于莫奈印象派风格...'
  }
  // ... 更多风格
]

// 增强提示词生成
export function generateEnhancedPrompt(options: EnhancedPromptOptions): string
```

#### 2. `EnhancedThemeGenerationPanel.tsx` 新组件
- 集成所有新功能的主界面
- 响应式设计，适配不同屏幕
- 实时预览和智能提示

#### 3. `ai-theme-generator.ts` 增强逻辑
- 支持增强提示词路由
- 专业的系统提示词模板
- 严格的可读性约束

### 提示词模板示例

#### 浅色主题 + 莫奈风格
```
为 Naive UI 创建一个浅色主题，风格为莫奈印象派。

艺术风格: 莫奈印象派
风格描述: 基于莫奈印象派风格，使用柔和的蓝紫色调...

浅色主题特别要求:
- 背景应使用白色或非常浅的色调
- 文本应使用深色以确保可读性
- 确保所有文本与背景对比度至少4.5:1

可读性强制要求:
1. 文本与背景对比度至少4.5:1
2. 避免纯色背景上使用相近色调的文本
3. 确保hover、active、disabled等状态有明显区别
```

## 📊 使用效果对比

### 传统模式 vs 增强模式

| 特性 | 传统模式 | 增强模式 |
|------|----------|----------|
| 提示词结构 | 简单描述 | 专业模板 |
| 色彩理论 | 随机生成 | 艺术家风格 |
| 可读性保证 | 无约束 | 强制4.5:1对比度 |
| 模式区分 | 模糊 | 明确浅色/暗色 |
| 生成质量 | 不稳定 | 高度一致 |

## 🎯 使用建议

### 最佳实践
1. **启用增强模式**: 获得更专业的主题质量
2. **选择合适风格**: 根据应用类型选择画家风格
3. **明确主题模式**: 根据使用场景选择浅色/暗色
4. **测试可读性**: 生成后检查文本在各种背景下的可读性

### 风格选择指南
- **商务应用**: 推荐莫奈印象派或北欧极简
- **创意应用**: 推荐梵高表现主义或马蒂斯野兽派
- **科技应用**: 推荐蒙德里安几何
- **文化应用**: 推荐日式和风

## 🚀 未来规划

1. **更多艺术风格**: 计划添加更多画家和设计流派
2. **智能推荐**: 基于应用类型自动推荐合适风格
3. **A/B测试**: 支持多个主题方案对比
4. **用户自定义**: 允许用户创建自己的风格预设

通过这次增强，Naive UI 主题编辑器的 AI 生成功能达到了专业级别，能够产生既美观又实用的高质量主题！🎨✨

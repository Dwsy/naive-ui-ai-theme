# Google Gemini 集成指南

## 概述

主题编辑器现已支持 Google Gemini AI 模型！🎉 您可以使用 Google 的最新 Gemini 模型来生成高质量的 Naive UI 主题配置。

## 支持的模型

我们支持以下 Google Gemini 模型：

- **Gemini 2.0 Flash Exp** - 最新的实验性模型，速度快，性能优秀
- **Gemini 1.5 Pro** - 高性能模型，适合复杂的主题生成任务
- **Gemini 1.5 Flash** - 平衡性能和速度的模型
- **Gemini 1.5 Flash-8B** - 轻量级模型，响应快速
- **Gemini 1.0 Pro** - 稳定的基础模型

## 配置步骤

### 1. 获取 API 密钥

1. 访问 [Google AI Studio](https://aistudio.google.com/)
2. 登录您的 Google 账户
3. 创建新的 API 密钥
4. 复制生成的 API 密钥

### 2. 在主题编辑器中配置

1. 打开主题编辑器
2. 在 AI 配置面板中：
   - **供应商**: 选择 "Google Gemini"
   - **API 密钥**: 粘贴您的 Gemini API 密钥
   - **模型**: 选择您想使用的 Gemini 模型（推荐 Gemini 2.0 Flash Exp）

### 3. 开始生成主题

配置完成后，您就可以使用 Gemini 来生成主题了！

## API 特性

### 技术实现

- **端点**: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
- **认证**: 使用查询参数传递 API 密钥
- **格式**: 支持 Gemini 特有的 `contents` 消息格式
- **配置**: 支持温度和最大输出令牌数设置

### 消息格式

Gemini API 使用独特的消息格式：

```json
{
  "contents": [
    {
      "parts": [
        { "text": "系统提示词和用户提示词的组合" }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 4096
  }
}
```

## 使用建议

### 模型选择

- **Gemini 2.0 Flash Exp**: 最新功能，适合尝试新特性
- **Gemini 1.5 Pro**: 复杂主题设计，需要高质量输出
- **Gemini 1.5 Flash**: 日常使用，平衡性能和成本
- **Gemini 1.5 Flash-8B**: 快速原型设计

### 最佳实践

1. **清晰的提示词**: Gemini 对详细的描述响应很好
2. **艺术风格**: 利用增强模式和艺术风格预设
3. **组件选择**: 明确选择需要定制的组件
4. **主题模式**: 指定浅色或暗色模式以获得更好的结果

## 错误处理

常见错误及解决方案：

### API 密钥错误
```
错误: Gemini API 请求失败 (401): Invalid API key
```
**解决**: 检查 API 密钥是否正确，确保在 Google AI Studio 中已启用

### 模型不可用
```
错误: Gemini API 请求失败 (404): Model not found
```
**解决**: 确认选择的模型名称正确，某些模型可能需要特殊权限

### 配额限制
```
错误: Gemini API 请求失败 (429): Quota exceeded
```
**解决**: 检查您的 API 使用配额，可能需要升级计划或等待配额重置

## 示例配置

以下是一个完整的 Gemini 配置示例：

```typescript
const geminiConfig = {
  provider: 'gemini',
  apiKey: 'your-gemini-api-key-here',
  model: 'gemini-2.0-flash-exp'
}
```

## 与其他供应商的比较

| 特性 | Gemini | OpenAI | Anthropic |
|------|--------|--------|-----------|
| 响应速度 | 快 | 中等 | 中等 |
| 创意性 | 高 | 高 | 高 |
| 技术准确性 | 高 | 高 | 高 |
| 成本 | 低-中 | 中-高 | 中 |
| 免费额度 | 有 | 有限 | 有限 |

## 故障排除

如果遇到问题，请检查：

1. ✅ API 密钥格式正确
2. ✅ 网络连接正常
3. ✅ 选择的模型可用
4. ✅ 提示词不为空
5. ✅ 至少选择了一个组件

## 更新日志

- **2024-01**: 添加 Google Gemini 支持
- 支持所有主要 Gemini 模型
- 实现 Gemini 特有的 API 格式
- 集成到现有的主题生成流程

---

🎨 享受使用 Google Gemini 创建美丽的主题吧！

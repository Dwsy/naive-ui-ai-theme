# JSON 主题导入功能指南

## 🎯 功能概述

主题编辑器现在支持直接导入 JSON 格式的主题配置！🎉 您可以快速导入现有的主题配置，无需重新配置每个组件。

## 🔧 功能特性

### ✨ 核心功能
- **直接粘贴**: 支持复制粘贴 JSON 主题配置
- **实时验证**: 自动验证 JSON 格式的正确性
- **一键导入**: 点击按钮即可应用主题
- **错误提示**: 详细的错误信息和解决建议

### 🎨 用户界面
- **折叠面板**: 可展开/收起的导入界面
- **代码编辑器**: 等宽字体的文本输入区域
- **状态反馈**: 成功/错误状态的清晰提示
- **操作按钮**: 导入和清空功能按钮

## 📋 使用方法

### 1. 打开导入面板
1. 在 AI 配置面板中找到 "📥 导入主题" 卡片
2. 点击 "展开导入面板" 按钮
3. 导入界面会展开显示

### 2. 输入 JSON 配置
1. 在文本区域中粘贴您的 JSON 主题配置
2. 支持标准的 Naive UI 主题格式
3. 系统会自动验证 JSON 格式

### 3. 导入主题
1. 点击 "导入主题" 按钮
2. 系统会验证并应用主题配置
3. 成功后会显示确认提示

### 4. 管理输入
- **清空**: 点击 "清空" 按钮清除输入内容
- **收起**: 点击 "收起导入面板" 隐藏界面

## 📄 支持的 JSON 格式

### 标准主题配置格式
```json
{
  "common": {
    "primaryColor": "#18a058",
    "primaryColorHover": "#36ad6a",
    "primaryColorPressed": "#0c7a43",
    "primaryColorSuppl": "#36ad6a"
  },
  "Button": {
    "textColor": "#ffffff",
    "textColorHover": "#ffffff",
    "textColorPressed": "#ffffff",
    "colorPrimary": "#18a058",
    "colorHoverPrimary": "#36ad6a",
    "colorPressedPrimary": "#0c7a43"
  },
  "Input": {
    "borderRadius": "6px",
    "borderColor": "#e0e0e6",
    "borderColorHover": "#36ad6a",
    "borderColorFocus": "#18a058"
  }
}
```

### 完整主题示例
```json
{
  "common": {
    "primaryColor": "#722ed1",
    "primaryColorHover": "#9254de",
    "primaryColorPressed": "#531dab",
    "infoColor": "#1890ff",
    "successColor": "#52c41a",
    "warningColor": "#faad14",
    "errorColor": "#ff4d4f"
  },
  "Button": {
    "borderRadius": "8px",
    "fontWeight": "500"
  },
  "Card": {
    "borderRadius": "12px",
    "boxShadow": "0 2px 8px rgba(0, 0, 0, 0.1)"
  },
  "Input": {
    "borderRadius": "8px",
    "fontSize": "14px"
  }
}
```

## ⚠️ 注意事项

### JSON 格式要求
- **有效 JSON**: 必须是标准的 JSON 格式
- **对象类型**: 根级别必须是对象 `{}`
- **正确语法**: 注意逗号、引号、括号的正确使用

### 常见错误
1. **语法错误**: 缺少逗号、引号不匹配等
2. **格式错误**: 不是有效的 JSON 对象
3. **空内容**: 输入框为空时无法导入

### 最佳实践
- 从可信来源复制主题配置
- 导入前检查 JSON 格式
- 保存重要的主题配置作为备份

## 🔄 技术实现

### 验证流程
```typescript
// 1. 检查输入是否为空
if (!jsonInput.value.trim()) {
  importError.value = '请输入 JSON 主题配置'
  return
}

// 2. 解析 JSON
try {
  const theme = JSON.parse(jsonInput.value.trim())
  
  // 3. 验证格式
  if (typeof theme !== 'object' || theme === null) {
    throw new Error('无效的主题格式：必须是一个对象')
  }
  
  // 4. 调用导入回调
  if (props.onImportTheme) {
    props.onImportTheme(theme)
    importSuccess.value = true
  }
} catch (error) {
  importError.value = `JSON 解析失败: ${error.message}`
}
```

### 状态管理
- `jsonInput`: 存储用户输入的 JSON 文本
- `showJsonImport`: 控制导入面板的显示/隐藏
- `importError`: 存储错误信息
- `importSuccess`: 标记导入成功状态

### 用户体验优化
- **自动清空**: 成功导入后自动清空输入
- **定时隐藏**: 成功提示 3 秒后自动消失
- **实时反馈**: 即时显示错误和成功状态

## 🎨 界面设计

### 视觉层次
1. **卡片标题**: 📥 导入主题
2. **功能说明**: 简洁的功能描述
3. **展开按钮**: 控制面板显示状态
4. **输入区域**: 代码风格的文本框
5. **状态提示**: 错误/成功的反馈信息
6. **操作按钮**: 导入和清空功能

### 交互设计
- **渐进式展示**: 默认收起，按需展开
- **即时反馈**: 操作后立即显示结果
- **防误操作**: 空输入时禁用按钮
- **状态清晰**: 明确的成功/错误状态

## 🚀 使用场景

### 1. 主题分享
- 从社区获取主题配置
- 分享自己的主题设计
- 团队间同步主题风格

### 2. 快速配置
- 导入预设的主题模板
- 批量设置组件样式
- 避免重复的手动配置

### 3. 备份恢复
- 保存当前主题配置
- 恢复之前的主题设置
- 版本管理和回滚

### 4. 开发调试
- 测试不同的主题配置
- 快速切换主题风格
- 验证主题兼容性

## 🔮 未来扩展

### 可能的改进
- **格式验证**: 更严格的主题格式验证
- **预览功能**: 导入前预览主题效果
- **历史记录**: 保存导入历史
- **模板库**: 内置常用主题模板

### 集成功能
- **文件导入**: 支持从文件导入主题
- **URL 导入**: 从网络地址导入主题
- **批量导入**: 同时导入多个主题配置

## 📚 示例集合

### 简单主题
```json
{
  "common": {
    "primaryColor": "#1890ff"
  }
}
```

### 深色主题
```json
{
  "common": {
    "bodyColor": "#1f1f1f",
    "cardColor": "#2d2d2d",
    "textColorBase": "#ffffff",
    "primaryColor": "#1890ff"
  }
}
```

### 彩色主题
```json
{
  "common": {
    "primaryColor": "#ff6b6b",
    "infoColor": "#4ecdc4",
    "successColor": "#45b7d1",
    "warningColor": "#f9ca24",
    "errorColor": "#f0932b"
  }
}
```

---

🎉 **总结**: JSON 导入功能让主题配置变得更加灵活和高效，支持快速导入、分享和管理主题配置！

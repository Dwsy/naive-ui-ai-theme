# NSelect 组件配合 Tag 和 Filterable 实现动态模型选择

## 🎯 实现方案

使用 Naive UI 的 `NSelect` 组件，配合 `tag` 和 `filterable` 属性，实现既可以从预设列表选择，又可以动态创建自定义选项的功能。

## 🔧 核心配置

### 关键属性
```typescript
<NSelect
  value={this.config.model}
  options={this.modelOptions}
  placeholder="选择或输入 AI 模型名称"
  filterable          // 启用过滤功能
  tag                  // 允许创建新标签
  clearable           // 允许清空选择
  onUpdateValue={(value: string) => this.updateConfig('model', value)}
  renderLabel={...}    // 自定义标签渲染
  renderOption={...}   // 自定义选项渲染
/>
```

### 属性说明

#### `filterable`
- **功能**: 启用搜索过滤功能
- **用户体验**: 用户可以输入文本来过滤选项列表
- **适用场景**: 当选项较多时，帮助用户快速找到目标选项

#### `tag`
- **功能**: 允许用户创建新的选项
- **用户体验**: 输入不存在的值后按回车键可以创建新选项
- **适用场景**: 支持自定义模型名称，如新发布的模型

#### `clearable`
- **功能**: 显示清空按钮
- **用户体验**: 用户可以快速清空当前选择
- **适用场景**: 重置模型选择

## 🎨 自定义渲染

### 标签渲染 (renderLabel)
```typescript
renderLabel={(option: any) => (
  <NSpace align="center" justify="space-between" style={{ width: '100%' }}>
    {{
      default: () => [
        <NText>
          {{
            default: () => option.label || option.value
          }}
        </NText>,
        (option.value?.includes(':free') || this.config.provider !== 'openrouter') && (
          <NTag size="tiny" type="success">
            {{
              default: () => this.config.provider === 'openrouter' ? '免费' : '可用'
            }}
          </NTag>
        )
      ]
    }}
  </NSpace>
)}
```

**特点**:
- 显示模型名称
- 为免费模型添加标识
- 支持回退显示 (label || value)

### 选项渲染 (renderOption)
```typescript
renderOption={(option: any) => (
  <NSpace align="center" justify="space-between" style={{ width: '100%' }}>
    {{
      default: () => [
        <NText>
          {{
            default: () => option.label
          }}
        </NText>,
        (option.value?.includes(':free') || this.config.provider !== 'openrouter') && (
          <NTag size="tiny" type="success">
            {{
              default: () => this.config.provider === 'openrouter' ? '免费' : '可用'
            }}
          </NTag>
        )
      ]
    }}
  </NSpace>
)}
```

**特点**:
- 下拉列表中的选项样式
- 一致的视觉设计
- 状态标识清晰

## 🔄 数据流程

### 1. 选项数据准备
```typescript
// 转换为自动完成选项格式
const modelOptions = computed(() => {
  return availableModels.value
    .filter((model: any) => model && model.label && model.value)
    .map((model: any) => ({
      label: model.label,
      value: model.value
    }))
})
```

### 2. 用户交互流程
```
用户操作 → 选择/输入 → 验证数据 → 更新配置
    ↓         ↓         ↓         ↓
  点击选项   输入文本   过滤选项   触发回调
  创建标签   按回车键   创建选项   更新状态
```

### 3. 状态管理
- **静态模型**: 来自预设配置的模型列表
- **动态模型**: 通过 API 获取的最新模型列表
- **自定义模型**: 用户通过 tag 功能创建的模型

## 🎯 用户体验

### 选择预设模型
1. 点击下拉框
2. 浏览可用模型列表
3. 点击选择目标模型
4. 自动更新配置

### 输入自定义模型
1. 点击下拉框或直接输入
2. 输入自定义模型名称
3. 按回车键创建新选项
4. 自动选择并更新配置

### 搜索过滤
1. 在输入框中输入关键词
2. 选项列表自动过滤
3. 显示匹配的模型
4. 支持模糊匹配

## 🔍 与 AutoComplete 的对比

| 特性 | NSelect + tag | NAutoComplete |
|------|---------------|---------------|
| **预设选项** | ✅ 完整支持 | ✅ 完整支持 |
| **自定义输入** | ✅ tag 创建 | ✅ 直接输入 |
| **选项管理** | ✅ 统一管理 | ❌ 分散处理 |
| **视觉一致性** | ✅ 选择器样式 | ⚠️ 输入框样式 |
| **用户认知** | ✅ 明确的选择 | ⚠️ 可能混淆 |
| **数据验证** | ✅ 选项验证 | ⚠️ 需额外验证 |

## 🛡️ 数据安全

### 输入验证
```typescript
// 过滤有效的模型数据
.filter((model: any) => model && model.label && model.value)

// 安全的属性访问
option.value?.includes(':free')
```

### 错误处理
- API 调用失败时回退到静态列表
- 无效数据自动过滤
- 用户输入验证

## 📱 响应式设计

### 移动端适配
- 下拉选择器在移动端表现更好
- 触摸友好的交互方式
- 适当的选项间距

### 桌面端优化
- 键盘导航支持
- 快速搜索过滤
- 鼠标悬停效果

## 🎨 样式定制

### 选项样式
```typescript
<NSpace align="center" justify="space-between" style={{ width: '100%' }}>
  // 模型名称 + 状态标签的布局
</NSpace>
```

### 状态标识
- **免费模型**: 绿色 success 标签
- **可用模型**: 根据供应商显示
- **自定义模型**: 蓝色 info 标签

## 🚀 最佳实践

### 1. 选项数据结构
```typescript
interface ModelOption {
  label: string    // 显示名称
  value: string    // 实际值
}
```

### 2. 用户指导
- 清晰的占位符文本
- 详细的使用说明
- 状态提示信息

### 3. 性能优化
- 计算属性缓存选项列表
- 避免不必要的重新渲染
- 异步加载动态数据

---

🎉 **总结**: 使用 `NSelect` 配合 `tag` 和 `filterable` 属性，提供了更好的用户体验和更一致的界面设计，同时保持了灵活性和可扩展性。

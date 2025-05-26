// Naive UI 组件主题配置定义
// 用于 AI 生成主题时的组件样式属性指导

export interface ComponentThemeConfig {
  name: string
  description: string
  category: string
  commonProps: string[]
  specificProps: ComponentProp[]
}

export interface ComponentProp {
  name: string
  description: string
  type: 'color' | 'size' | 'spacing' | 'border' | 'shadow' | 'font' | 'other'
  example?: string
  required?: boolean
}

// 组件主题配置映射
export const COMPONENT_THEME_CONFIGS: Record<string, ComponentThemeConfig> = {
  Alert: {
    name: 'Alert',
    description: '警告提示组件',
    category: 'feedback',
    commonProps: ['fontSize', 'borderRadius', 'padding'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#f0f2f5' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#666666' },
      { name: 'borderColor', description: '边框颜色', type: 'color', example: '#d9d9d9' },
      { name: 'closeIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'padding', description: '内边距', type: 'spacing', example: '12px 16px' }
    ]
  },

  Anchor: {
    name: 'Anchor',
    description: '锚点组件',
    category: 'navigation',
    commonProps: ['fontSize', 'textColor'],
    specificProps: [
      { name: 'linkColor', description: '链接颜色', type: 'color', example: '#1890ff' },
      { name: 'linkColorHover', description: '链接悬停颜色', type: 'color', example: '#40a9ff' },
      { name: 'linkColorActive', description: '激活链接颜色', type: 'color', example: '#096dd9' },
      { name: 'railColor', description: '轨道颜色', type: 'color', example: '#e8e8e8' }
    ]
  },

  AutoComplete: {
    name: 'AutoComplete',
    description: '自动完成组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius', 'borderColor'],
    specificProps: [
      { name: 'menuHeight', description: '菜单高度', type: 'size', example: '200px' },
      { name: 'optionHeight', description: '选项高度', type: 'size', example: '32px' },
      { name: 'optionTextColor', description: '选项文字颜色', type: 'color', example: '#333333' },
      { name: 'optionColorHover', description: '选项悬停背景色', type: 'color', example: '#f5f5f5' }
    ]
  },

  Avatar: {
    name: 'Avatar',
    description: '头像组件',
    category: 'data-display',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'borderRadius', description: '圆角', type: 'border', example: '50%', required: true },
      { name: 'color', description: '背景色', type: 'color', example: '#f0f0f0' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #d9d9d9' }
    ]
  },

  BackTop: {
    name: 'BackTop',
    description: '回到顶部组件',
    category: 'other',
    commonProps: ['borderRadius', 'boxShadow'],
    specificProps: [
      { name: 'width', description: '宽度', type: 'size', example: '48px' },
      { name: 'height', description: '高度', type: 'size', example: '48px' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '24px' },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '24px' },
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#666666' },
      { name: 'iconColorHover', description: '图标悬停颜色', type: 'color', example: '#1890ff' },
      { name: 'boxShadow', description: '阴影', type: 'shadow', example: '0 2px 8px rgba(0,0,0,0.12)' }
    ]
  },

  Badge: {
    name: 'Badge',
    description: '徽标组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ff4d4f' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#ffffff' },
      { name: 'fontSize', description: '字体大小', type: 'font', example: '12px' },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '10px' },
      { name: 'padding', description: '内边距', type: 'spacing', example: '0 6px' }
    ]
  },

  Breadcrumb: {
    name: 'Breadcrumb',
    description: '面包屑组件',
    category: 'navigation',
    commonProps: ['fontSize', 'textColor'],
    specificProps: [
      { name: 'fontSize', description: '字体大小', type: 'font', example: '14px' },
      { name: 'itemTextColor', description: '项目文字颜色', type: 'color', example: '#666666' },
      { name: 'itemTextColorHover', description: '项目悬停文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemTextColorActive', description: '激活项目文字颜色', type: 'color', example: '#333333' },
      { name: 'separatorColor', description: '分隔符颜色', type: 'color', example: '#999999' },
      { name: 'fontWeightActive', description: '激活项目字重', type: 'font', example: '500' }
    ]
  },

  Button: {
    name: 'Button',
    description: '按钮组件',
    category: 'general',
    commonProps: ['fontSize', 'borderRadius', 'padding'],
    specificProps: [
      { name: 'heightTiny', description: '微小尺寸高度', type: 'size', example: '22px' },
      { name: 'heightSmall', description: '小尺寸高度', type: 'size', example: '28px' },
      { name: 'heightMedium', description: '中等尺寸高度', type: 'size', example: '34px', required: true },
      { name: 'heightLarge', description: '大尺寸高度', type: 'size', example: '40px' },
      { name: 'fontSizeTiny', description: '微小尺寸字体', type: 'font', example: '12px' },
      { name: 'fontSizeSmall', description: '小尺寸字体', type: 'font', example: '14px' },
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '14px', required: true },
      { name: 'fontSizeLarge', description: '大尺寸字体', type: 'font', example: '16px' },
      { name: 'paddingTiny', description: '微小尺寸内边距', type: 'spacing', example: '0 8px' },
      { name: 'paddingSmall', description: '小尺寸内边距', type: 'spacing', example: '0 12px' },
      { name: 'paddingMedium', description: '中等尺寸内边距', type: 'spacing', example: '0 16px', required: true },
      { name: 'paddingLarge', description: '大尺寸内边距', type: 'spacing', example: '0 20px' },
      { name: 'borderRadiusTiny', description: '微小尺寸圆角', type: 'border', example: '3px' },
      { name: 'borderRadiusSmall', description: '小尺寸圆角', type: 'border', example: '3px' },
      { name: 'borderRadiusMedium', description: '中等尺寸圆角', type: 'border', example: '3px', required: true },
      { name: 'borderRadiusLarge', description: '大尺寸圆角', type: 'border', example: '3px' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'textColorHover', description: '悬停文字颜色', type: 'color', example: '#1890ff' },
      { name: 'textColorPressed', description: '按下文字颜色', type: 'color', example: '#096dd9' },
      { name: 'textColorDisabled', description: '禁用文字颜色', type: 'color', example: '#cccccc' },
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'colorHover', description: '悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'colorPressed', description: '按下背景色', type: 'color', example: '#e6e6e6' },
      { name: 'colorDisabled', description: '禁用背景色', type: 'color', example: '#f5f5f5' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderHover', description: '悬停边框', type: 'border', example: '1px solid #1890ff' },
      { name: 'borderPressed', description: '按下边框', type: 'border', example: '1px solid #096dd9' },
      { name: 'borderDisabled', description: '禁用边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '18px' },
      { name: 'iconMargin', description: '图标边距', type: 'spacing', example: '4px' },
      { name: 'fontWeight', description: '字重', type: 'font', example: '400' },
      { name: 'fontWeightStrong', description: '粗体字重', type: 'font', example: '600' }
    ]
  },

  Card: {
    name: 'Card',
    description: '卡片组件',
    category: 'data-display',
    commonProps: ['borderRadius', 'boxShadow', 'padding'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff', required: true },
      { name: 'borderColor', description: '边框颜色', type: 'color', example: '#e8e8e8' },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '6px' },
      { name: 'paddingSmall', description: '小尺寸内边距', type: 'spacing', example: '12px' },
      { name: 'paddingMedium', description: '中等尺寸内边距', type: 'spacing', example: '16px', required: true },
      { name: 'paddingLarge', description: '大尺寸内边距', type: 'spacing', example: '20px' },
      { name: 'paddingHuge', description: '超大尺寸内边距', type: 'spacing', example: '24px' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'textColor', description: '内容文字颜色', type: 'color', example: '#666666' },
      { name: 'boxShadow', description: '阴影', type: 'shadow', example: '0 2px 8px rgba(0,0,0,0.1)' },
      { name: 'actionColor', description: '操作区背景色', type: 'color', example: '#fafafa' },
      { name: 'closeIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'closeIconColorHover', description: '关闭图标悬停颜色', type: 'color', example: '#666666' }
    ]
  },

  Cascader: {
    name: 'Cascader',
    description: '级联选择组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius', 'borderColor'],
    specificProps: [
      { name: 'menuHeight', description: '菜单高度', type: 'size', example: '200px' },
      { name: 'optionHeight', description: '选项高度', type: 'size', example: '32px' },
      { name: 'optionTextColor', description: '选项文字颜色', type: 'color', example: '#333333' },
      { name: 'optionColorHover', description: '选项悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'optionColorActive', description: '选项激活背景色', type: 'color', example: '#e6f7ff' },
      { name: 'loadingColor', description: '加载颜色', type: 'color', example: '#1890ff' }
    ]
  },

  Checkbox: {
    name: 'Checkbox',
    description: '多选框组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'sizeMedium', description: '中等尺寸大小', type: 'size', example: '16px', required: true },
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '14px', required: true },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '2px' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderChecked', description: '选中边框', type: 'border', example: '1px solid #1890ff' },
      { name: 'borderDisabled', description: '禁用边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderDisabledChecked', description: '禁用选中边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'colorChecked', description: '选中背景色', type: 'color', example: '#1890ff' },
      { name: 'colorDisabled', description: '禁用背景色', type: 'color', example: '#f5f5f5' },
      { name: 'colorDisabledChecked', description: '禁用选中背景色', type: 'color', example: '#f5f5f5' },
      { name: 'checkMarkColor', description: '勾选标记颜色', type: 'color', example: '#ffffff' },
      { name: 'checkMarkColorDisabled', description: '禁用勾选标记颜色', type: 'color', example: '#cccccc' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'textColorDisabled', description: '禁用文字颜色', type: 'color', example: '#cccccc' },
      { name: 'labelPadding', description: '标签内边距', type: 'spacing', example: '0 0 0 8px' }
    ]
  },

  DataTable: {
    name: 'DataTable',
    description: '数据表格组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderColor'],
    specificProps: [
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '14px', required: true },
      { name: 'thColor', description: '表头背景色', type: 'color', example: '#fafafa', required: true },
      { name: 'thTextColor', description: '表头文字颜色', type: 'color', example: '#333333', required: true },
      { name: 'thFontWeight', description: '表头字重', type: 'font', example: '500' },
      { name: 'tdColor', description: '表格行背景色', type: 'color', example: '#ffffff' },
      { name: 'tdTextColor', description: '表格行文字颜色', type: 'color', example: '#333333' },
      { name: 'tdColorHover', description: '行悬停背景色', type: 'color', example: '#f5f5f5', required: true },
      { name: 'tdColorStriped', description: '斑马纹背景色', type: 'color', example: '#fafafa' },
      { name: 'borderColor', description: '边框颜色', type: 'color', example: '#e8e8e8', required: true },
      { name: 'thPaddingSmall', description: '表头小尺寸内边距', type: 'spacing', example: '6px 12px' },
      { name: 'thPaddingMedium', description: '表头中等尺寸内边距', type: 'spacing', example: '8px 12px', required: true },
      { name: 'thPaddingLarge', description: '表头大尺寸内边距', type: 'spacing', example: '12px 12px' },
      { name: 'tdPaddingSmall', description: '表格行小尺寸内边距', type: 'spacing', example: '6px 12px' },
      { name: 'tdPaddingMedium', description: '表格行中等尺寸内边距', type: 'spacing', example: '8px 12px', required: true },
      { name: 'tdPaddingLarge', description: '表格行大尺寸内边距', type: 'spacing', example: '12px 12px' },
      { name: 'thIconColor', description: '表头图标颜色', type: 'color', example: '#999999' },
      { name: 'thButtonColorHover', description: '表头按钮悬停颜色', type: 'color', example: '#f5f5f5' }
    ]
  },

  DatePicker: {
    name: 'DatePicker',
    description: '日期选择器组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'itemBorderRadius', description: '日期项圆角', type: 'border', example: '4px' },
      { name: 'itemSize', description: '日期项尺寸', type: 'size', example: '28px' },
      { name: 'itemFontSize', description: '日期项字体大小', type: 'font', example: '14px' },
      { name: 'itemTextColor', description: '日期项文字颜色', type: 'color', example: '#333333' },
      { name: 'itemTextColorActive', description: '激活日期项文字颜色', type: 'color', example: '#ffffff' },
      { name: 'itemTextColorCurrent', description: '当前日期项文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemColorHover', description: '日期项悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'itemColorActive', description: '激活日期项背景色', type: 'color', example: '#1890ff' },
      { name: 'itemColorDisabled', description: '禁用日期项背景色', type: 'color', example: 'transparent' },
      { name: 'calendarDaysFontSize', description: '日历天数字体大小', type: 'font', example: '14px' },
      { name: 'calendarTitleFontSize', description: '日历标题字体大小', type: 'font', example: '14px' },
      { name: 'arrowColor', description: '箭头颜色', type: 'color', example: '#999999' },
      { name: 'arrowSize', description: '箭头尺寸', type: 'size', example: '14px' }
    ]
  },

  Dialog: {
    name: 'Dialog',
    description: '对话框组件',
    category: 'feedback',
    commonProps: ['borderRadius', 'boxShadow'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff', required: true },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'padding', description: '内边距', type: 'spacing', example: '24px', required: true },
      { name: 'titleFontSize', description: '标题字体大小', type: 'font', example: '16px' },
      { name: 'fontSize', description: '内容字体大小', type: 'font', example: '14px' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '24px' },
      { name: 'iconMargin', description: '图标边距', type: 'spacing', example: '0 8px 0 0' },
      { name: 'closeIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'closeIconColorHover', description: '关闭图标悬停颜色', type: 'color', example: '#666666' },
      { name: 'actionSpace', description: '操作按钮间距', type: 'spacing', example: '12px' },
      { name: 'contentMargin', description: '内容边距', type: 'spacing', example: '12px 0 20px 0' }
    ]
  },

  Dropdown: {
    name: 'Dropdown',
    description: '下拉菜单组件',
    category: 'navigation',
    commonProps: ['borderRadius', 'boxShadow'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'optionTextColor', description: '选项文字颜色', type: 'color', example: '#333333' },
      { name: 'optionTextColorHover', description: '选项悬停文字颜色', type: 'color', example: '#1890ff' },
      { name: 'optionTextColorActive', description: '选项激活文字颜色', type: 'color', example: '#1890ff' },
      { name: 'optionColorHover', description: '选项悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'optionColorActive', description: '选项激活背景色', type: 'color', example: '#e6f7ff' },
      { name: 'optionHeightMedium', description: '中等尺寸选项高度', type: 'size', example: '32px' },
      { name: 'optionFontSizeMedium', description: '中等尺寸选项字体', type: 'font', example: '14px' },
      { name: 'optionPadding', description: '选项内边距', type: 'spacing', example: '0 12px' },
      { name: 'dividerColor', description: '分割线颜色', type: 'color', example: '#e8e8e8' }
    ]
  },

  Input: {
    name: 'Input',
    description: '输入框组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius', 'borderColor'],
    specificProps: [
      { name: 'heightSmall', description: '小尺寸高度', type: 'size', example: '28px' },
      { name: 'heightMedium', description: '中等尺寸高度', type: 'size', example: '34px', required: true },
      { name: 'heightLarge', description: '大尺寸高度', type: 'size', example: '40px' },
      { name: 'fontSizeSmall', description: '小尺寸字体', type: 'font', example: '12px' },
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '14px', required: true },
      { name: 'fontSizeLarge', description: '大尺寸字体', type: 'font', example: '16px' },
      { name: 'paddingSmall', description: '小尺寸内边距', type: 'spacing', example: '0 8px' },
      { name: 'paddingMedium', description: '中等尺寸内边距', type: 'spacing', example: '0 12px', required: true },
      { name: 'paddingLarge', description: '大尺寸内边距', type: 'spacing', example: '0 14px' },
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'colorDisabled', description: '禁用背景色', type: 'color', example: '#f5f5f5' },
      { name: 'colorFocus', description: '聚焦背景色', type: 'color', example: '#ffffff' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'textColorDisabled', description: '禁用文字颜色', type: 'color', example: '#cccccc' },
      { name: 'placeholderColor', description: '占位符颜色', type: 'color', example: '#999999' },
      { name: 'placeholderColorDisabled', description: '禁用占位符颜色', type: 'color', example: '#cccccc' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderHover', description: '悬停边框', type: 'border', example: '1px solid #1890ff', required: true },
      { name: 'borderFocus', description: '聚焦边框', type: 'border', example: '1px solid #1890ff', required: true },
      { name: 'borderDisabled', description: '禁用边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderError', description: '错误边框', type: 'border', example: '1px solid #ff4d4f' },
      { name: 'borderWarning', description: '警告边框', type: 'border', example: '1px solid #faad14' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '16px', required: true },
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#999999' },
      { name: 'iconColorHover', description: '图标悬停颜色', type: 'color', example: '#666666' },
      { name: 'iconColorPressed', description: '图标按下颜色', type: 'color', example: '#333333' },
      { name: 'clearColor', description: '清除按钮颜色', type: 'color', example: '#999999' },
      { name: 'clearColorHover', description: '清除按钮悬停颜色', type: 'color', example: '#666666' },
      { name: 'clearColorPressed', description: '清除按钮按下颜色', type: 'color', example: '#333333' },
      { name: 'suffixTextColor', description: '后缀文字颜色', type: 'color', example: '#666666' }
    ]
  },

  Message: {
    name: 'Message',
    description: '消息提示组件',
    category: 'feedback',
    commonProps: ['borderRadius', 'fontSize'],
    specificProps: [
      { name: 'padding', description: '内边距', type: 'spacing', example: '12px 16px', required: true },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '6px', required: true },
      { name: 'maxWidth', description: '最大宽度', type: 'size', example: '480px' },
      { name: 'minWidth', description: '最小宽度', type: 'size', example: '240px' },
      { name: 'iconMargin', description: '图标边距', type: 'spacing', example: '0 8px 0 0' },
      { name: 'closeMargin', description: '关闭按钮边距', type: 'spacing', example: '0 0 0 8px' },
      { name: 'colorInfo', description: '信息类型背景色', type: 'color', example: '#e6f7ff', required: true },
      { name: 'colorSuccess', description: '成功类型背景色', type: 'color', example: '#f6ffed', required: true },
      { name: 'colorWarning', description: '警告类型背景色', type: 'color', example: '#fffbe6', required: true },
      { name: 'colorError', description: '错误类型背景色', type: 'color', example: '#fff2f0', required: true },
      { name: 'textColorInfo', description: '信息类型文字颜色', type: 'color', example: '#1890ff', required: true },
      { name: 'textColorSuccess', description: '成功类型文字颜色', type: 'color', example: '#52c41a', required: true },
      { name: 'textColorWarning', description: '警告类型文字颜色', type: 'color', example: '#faad14', required: true },
      { name: 'textColorError', description: '错误类型文字颜色', type: 'color', example: '#ff4d4f', required: true },
      { name: 'iconColorInfo', description: '信息类型图标颜色', type: 'color', example: '#1890ff', required: true },
      { name: 'iconColorSuccess', description: '成功类型图标颜色', type: 'color', example: '#52c41a', required: true },
      { name: 'iconColorWarning', description: '警告类型图标颜色', type: 'color', example: '#faad14', required: true },
      { name: 'iconColorError', description: '错误类型图标颜色', type: 'color', example: '#ff4d4f', required: true },
      { name: 'closeIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'closeIconColorHover', description: '关闭图标悬停颜色', type: 'color', example: '#666666' },
      { name: 'closeSize', description: '关闭按钮尺寸', type: 'size', example: '16px' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '16px' }
    ]
  },

  Modal: {
    name: 'Modal',
    description: '模态框组件',
    category: 'feedback',
    commonProps: ['borderRadius', 'boxShadow'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff', required: true },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'boxShadow', description: '阴影', type: 'shadow', example: '0 4px 16px rgba(0,0,0,0.12)' }
    ]
  },

  Pagination: {
    name: 'Pagination',
    description: '分页组件',
    category: 'navigation',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'itemSizeMedium', description: '中等尺寸项目大小', type: 'size', example: '32px', required: true },
      { name: 'itemFontSizeMedium', description: '中等尺寸项目字体', type: 'font', example: '14px', required: true },
      { name: 'itemPaddingMedium', description: '中等尺寸项目内边距', type: 'spacing', example: '0 8px' },
      { name: 'itemMarginMedium', description: '中等尺寸项目边距', type: 'spacing', example: '0 4px' },
      { name: 'itemColor', description: '项目背景色', type: 'color', example: 'transparent' },
      { name: 'itemColorHover', description: '项目悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'itemColorActive', description: '项目激活背景色', type: 'color', example: '#1890ff' },
      { name: 'itemColorDisabled', description: '项目禁用背景色', type: 'color', example: 'transparent' },
      { name: 'itemTextColor', description: '项目文字颜色', type: 'color', example: '#333333' },
      { name: 'itemTextColorHover', description: '项目悬停文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemTextColorActive', description: '项目激活文字颜色', type: 'color', example: '#ffffff' },
      { name: 'itemTextColorDisabled', description: '项目禁用文字颜色', type: 'color', example: '#cccccc' },
      { name: 'itemBorderRadius', description: '项目圆角', type: 'border', example: '4px' }
    ]
  },

  Popover: {
    name: 'Popover',
    description: '弹出信息组件',
    category: 'data-display',
    commonProps: ['borderRadius', 'boxShadow', 'fontSize'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff', required: true },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'fontSize', description: '字体大小', type: 'font', example: '14px', required: true },
      { name: 'padding', description: '内边距', type: 'spacing', example: '12px 16px', required: true },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '6px' },
      { name: 'boxShadow', description: '阴影', type: 'shadow', example: '0 2px 8px rgba(0,0,0,0.12)' },
      { name: 'arrowHeight', description: '箭头高度', type: 'size', example: '6px' },
      { name: 'arrowOffset', description: '箭头偏移', type: 'spacing', example: '12px' },
      { name: 'space', description: '间距', type: 'spacing', example: '6px' }
    ]
  },

  Select: {
    name: 'Select',
    description: '选择器组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius', 'borderColor'],
    specificProps: [
      { name: 'heightMedium', description: '中等尺寸高度', type: 'size', example: '34px', required: true },
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '14px', required: true },
      { name: 'paddingSingle', description: '单选内边距', type: 'spacing', example: '0 28px 0 12px' },
      { name: 'paddingMultiple', description: '多选内边距', type: 'spacing', example: '3px 28px 3px 3px' }
    ]
  },

  Switch: {
    name: 'Switch',
    description: '开关组件',
    category: 'data-entry',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'railHeightMedium', description: '中等尺寸轨道高度', type: 'size', example: '18px', required: true },
      { name: 'railWidthMedium', description: '中等尺寸轨道宽度', type: 'size', example: '36px', required: true },
      { name: 'buttonHeightMedium', description: '中等尺寸按钮高度', type: 'size', example: '14px', required: true },
      { name: 'buttonWidthMedium', description: '中等尺寸按钮宽度', type: 'size', example: '14px', required: true },
      { name: 'railBorderRadiusMedium', description: '中等尺寸轨道圆角', type: 'border', example: '9px' },
      { name: 'buttonBorderRadiusMedium', description: '中等尺寸按钮圆角', type: 'border', example: '7px' },
      { name: 'railColor', description: '轨道颜色', type: 'color', example: '#e0e0e6', required: true },
      { name: 'railColorActive', description: '激活轨道颜色', type: 'color', example: '#1890ff', required: true },
      { name: 'buttonColor', description: '按钮颜色', type: 'color', example: '#ffffff' },
      { name: 'buttonBoxShadow', description: '按钮阴影', type: 'shadow', example: '0 1px 3px rgba(0,0,0,0.12)' },
      { name: 'opacityDisabled', description: '禁用透明度', type: 'other', example: '0.6' }
    ]
  },

  Table: {
    name: 'Table',
    description: '表格组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderColor'],
    specificProps: [
      { name: 'thColor', description: '表头背景色', type: 'color', example: '#fafafa', required: true },
      { name: 'thTextColor', description: '表头文字颜色', type: 'color', example: '#333333', required: true },
      { name: 'thFontWeight', description: '表头字重', type: 'font', example: '500' },
      { name: 'tdColor', description: '表格行背景色', type: 'color', example: '#ffffff' },
      { name: 'tdTextColor', description: '表格行文字颜色', type: 'color', example: '#333333' },
      { name: 'borderColor', description: '边框颜色', type: 'color', example: '#e8e8e8', required: true },
      { name: 'thPaddingMedium', description: '表头中等尺寸内边距', type: 'spacing', example: '8px 12px', required: true },
      { name: 'tdPaddingMedium', description: '表格行中等尺寸内边距', type: 'spacing', example: '8px 12px', required: true }
    ]
  },

  Tag: {
    name: 'Tag',
    description: '标签组件',
    category: 'data-display',
    commonProps: ['borderRadius', 'fontSize'],
    specificProps: [
      { name: 'borderRadius', description: '圆角', type: 'border', example: '4px', required: true },
      { name: 'padding', description: '内边距', type: 'spacing', example: '0 8px', required: true },
      { name: 'heightMedium', description: '中等尺寸高度', type: 'size', example: '24px', required: true },
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '12px', required: true },
      { name: 'color', description: '背景色', type: 'color', example: '#f5f5f5', required: true },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333', required: true },
      { name: 'border', description: '边框', type: 'border', example: '1px solid transparent' },
      { name: 'closeIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'closeIconColorHover', description: '关闭图标悬停颜色', type: 'color', example: '#666666' },
      { name: 'closeMargin', description: '关闭按钮边距', type: 'spacing', example: '0 0 0 4px' },
      { name: 'closeSizeMedium', description: '中等尺寸关闭按钮大小', type: 'size', example: '14px' }
    ]
  },

  Tooltip: {
    name: 'Tooltip',
    description: '文字提示组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'peers', description: '继承 Popover 样式', type: 'other', example: 'Popover 配置' }
    ]
  },

  // 新增组件配置
  AvatarGroup: {
    name: 'AvatarGroup',
    description: '头像组组件',
    category: 'data-display',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'gap', description: '头像间距', type: 'spacing', example: '8px' },
      { name: 'borderColor', description: '边框颜色', type: 'color', example: '#ffffff' }
    ]
  },

  ButtonGroup: {
    name: 'ButtonGroup',
    description: '按钮组组件',
    category: 'general',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'borderRadius', description: '圆角', type: 'border', example: '6px' }
    ]
  },

  Calendar: {
    name: 'Calendar',
    description: '日历组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'titleFontSize', description: '标题字体大小', type: 'font', example: '16px' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'daysFontSize', description: '日期字体大小', type: 'font', example: '14px' },
      { name: 'dateTextColor', description: '日期文字颜色', type: 'color', example: '#333333' },
      { name: 'dateColorHover', description: '日期悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'dateColorCurrent', description: '当前日期背景色', type: 'color', example: '#e6f7ff' },
      { name: 'weekTextColor', description: '星期文字颜色', type: 'color', example: '#666666' }
    ]
  },

  Carousel: {
    name: 'Carousel',
    description: '走马灯组件',
    category: 'data-display',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'dotSize', description: '指示点大小', type: 'size', example: '8px' },
      { name: 'dotColor', description: '指示点颜色', type: 'color', example: 'rgba(255,255,255,0.4)' },
      { name: 'dotColorActive', description: '激活指示点颜色', type: 'color', example: '#ffffff' },
      { name: 'arrowColor', description: '箭头颜色', type: 'color', example: 'rgba(255,255,255,0.8)' },
      { name: 'arrowColorHover', description: '箭头悬停颜色', type: 'color', example: '#ffffff' }
    ]
  },

  Code: {
    name: 'Code',
    description: '代码组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#f5f5f5' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#e83e8c' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #e8e8e8' },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '3px' },
      { name: 'fontFamily', description: '字体族', type: 'font', example: 'Monaco, Consolas, monospace' },
      { name: 'fontSize', description: '字体大小', type: 'font', example: '14px' },
      { name: 'padding', description: '内边距', type: 'spacing', example: '2px 4px' }
    ]
  },

  Collapse: {
    name: 'Collapse',
    description: '折叠面板组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'titleFontSize', description: '标题字体大小', type: 'font', example: '14px' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'titleTextColorDisabled', description: '禁用标题文字颜色', type: 'color', example: '#cccccc' },
      { name: 'titlePadding', description: '标题内边距', type: 'spacing', example: '16px 0' },
      { name: 'dividerColor', description: '分割线颜色', type: 'color', example: '#e8e8e8' },
      { name: 'arrowColor', description: '箭头颜色', type: 'color', example: '#999999' },
      { name: 'arrowColorDisabled', description: '禁用箭头颜色', type: 'color', example: '#cccccc' }
    ]
  },

  ColorPicker: {
    name: 'ColorPicker',
    description: '颜色选择器组件',
    category: 'data-entry',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'width', description: '宽度', type: 'size', example: '200px' },
      { name: 'height', description: '高度', type: 'size', example: '200px' },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '6px' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #d9d9d9' }
    ]
  },

  Descriptions: {
    name: 'Descriptions',
    description: '描述列表组件',
    category: 'data-display',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'titleFontSize', description: '标题字体大小', type: 'font', example: '16px' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'titleFontWeight', description: '标题字重', type: 'font', example: '600' },
      { name: 'labelFontSize', description: '标签字体大小', type: 'font', example: '14px' },
      { name: 'labelTextColor', description: '标签文字颜色', type: 'color', example: '#666666' },
      { name: 'contentFontSize', description: '内容字体大小', type: 'font', example: '14px' },
      { name: 'contentTextColor', description: '内容文字颜色', type: 'color', example: '#333333' },
      { name: 'metaPadding', description: '元数据内边距', type: 'spacing', example: '8px 0' }
    ]
  },

  Divider: {
    name: 'Divider',
    description: '分割线组件',
    category: 'layout',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'color', description: '分割线颜色', type: 'color', example: '#e8e8e8', required: true },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#666666' },
      { name: 'fontSize', description: '文字字体大小', type: 'font', example: '14px' },
      { name: 'fontWeight', description: '文字字重', type: 'font', example: '500' }
    ]
  },

  Drawer: {
    name: 'Drawer',
    description: '抽屉组件',
    category: 'feedback',
    commonProps: ['boxShadow'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff', required: true },
      { name: 'titleFontSize', description: '标题字体大小', type: 'font', example: '16px' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'titleFontWeight', description: '标题字重', type: 'font', example: '600' },
      { name: 'bodyPadding', description: '内容区内边距', type: 'spacing', example: '24px' },
      { name: 'headerPadding', description: '头部内边距', type: 'spacing', example: '24px 24px 0 24px' },
      { name: 'footerPadding', description: '底部内边距', type: 'spacing', example: '12px 24px 24px 24px' }
    ]
  },

  DynamicInput: {
    name: 'DynamicInput',
    description: '动态输入组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'actionMargin', description: '操作按钮边距', type: 'spacing', example: '0 0 0 8px' },
      { name: 'actionSize', description: '操作按钮尺寸', type: 'size', example: '24px' }
    ]
  },

  DynamicTags: {
    name: 'DynamicTags',
    description: '动态标签组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'tagMargin', description: '标签边距', type: 'spacing', example: '0 8px 8px 0' }
    ]
  },

  Empty: {
    name: 'Empty',
    description: '空状态组件',
    category: 'data-display',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '48px' },
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#cccccc' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#999999' },
      { name: 'fontSize', description: '字体大小', type: 'font', example: '14px' },
      { name: 'extraTextColor', description: '额外文字颜色', type: 'color', example: '#666666' }
    ]
  },

  Form: {
    name: 'Form',
    description: '表单组件',
    category: 'data-entry',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'labelFontSizeTopSmall', description: '顶部小标签字体', type: 'font', example: '12px' },
      { name: 'labelFontSizeTopMedium', description: '顶部中等标签字体', type: 'font', example: '14px' },
      { name: 'labelFontSizeTopLarge', description: '顶部大标签字体', type: 'font', example: '16px' },
      { name: 'labelFontSizeLeftSmall', description: '左侧小标签字体', type: 'font', example: '12px' },
      { name: 'labelFontSizeLeftMedium', description: '左侧中等标签字体', type: 'font', example: '14px' },
      { name: 'labelFontSizeLeftLarge', description: '左侧大标签字体', type: 'font', example: '16px' },
      { name: 'labelTextColor', description: '标签文字颜色', type: 'color', example: '#333333' },
      { name: 'asteriskColor', description: '必填星号颜色', type: 'color', example: '#ff4d4f' },
      { name: 'feedbackTextColor', description: '反馈文字颜色', type: 'color', example: '#666666' },
      { name: 'feedbackTextColorError', description: '错误反馈文字颜色', type: 'color', example: '#ff4d4f' },
      { name: 'feedbackTextColorWarning', description: '警告反馈文字颜色', type: 'color', example: '#faad14' }
    ]
  },

  Icon: {
    name: 'Icon',
    description: '图标组件',
    category: 'general',
    commonProps: [],
    specificProps: [
      { name: 'color', description: '图标颜色', type: 'color', example: '#333333' },
      { name: 'size', description: '图标尺寸', type: 'size', example: '16px' }
    ]
  },

  Image: {
    name: 'Image',
    description: '图片组件',
    category: 'data-display',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'toolbarColor', description: '工具栏背景色', type: 'color', example: 'rgba(0,0,0,0.5)' },
      { name: 'toolbarIconColor', description: '工具栏图标颜色', type: 'color', example: '#ffffff' },
      { name: 'toolbarBorderRadius', description: '工具栏圆角', type: 'border', example: '6px' }
    ]
  },

  InputNumber: {
    name: 'InputNumber',
    description: '数字输入框组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius', 'borderColor'],
    specificProps: [
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#999999' },
      { name: 'iconColorHover', description: '图标悬停颜色', type: 'color', example: '#666666' },
      { name: 'iconColorDisabled', description: '禁用图标颜色', type: 'color', example: '#cccccc' }
    ]
  },

  Layout: {
    name: 'Layout',
    description: '布局组件',
    category: 'layout',
    commonProps: [],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#f5f5f5' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'siderColor', description: '侧边栏背景色', type: 'color', example: '#001529' },
      { name: 'siderColorInverted', description: '反转侧边栏背景色', type: 'color', example: '#ffffff' },
      { name: 'siderBorderColor', description: '侧边栏边框颜色', type: 'color', example: '#e8e8e8' },
      { name: 'headerColor', description: '头部背景色', type: 'color', example: '#ffffff' },
      { name: 'headerBorderColor', description: '头部边框颜色', type: 'color', example: '#e8e8e8' },
      { name: 'footerColor', description: '底部背景色', type: 'color', example: '#ffffff' },
      { name: 'footerBorderColor', description: '底部边框颜色', type: 'color', example: '#e8e8e8' }
    ]
  },

  List: {
    name: 'List',
    description: '列表组件',
    category: 'data-display',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'colorHover', description: '悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'borderColor', description: '边框颜色', type: 'color', example: '#e8e8e8' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'fontSize', description: '字体大小', type: 'font', example: '14px' }
    ]
  },

  Menu: {
    name: 'Menu',
    description: '导航菜单组件',
    category: 'navigation',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'itemHeight', description: '菜单项高度', type: 'size', example: '42px', required: true },
      { name: 'itemIconSize', description: '菜单项图标尺寸', type: 'size', example: '18px' },
      { name: 'itemTextColor', description: '菜单项文字颜色', type: 'color', example: '#333333' },
      { name: 'itemTextColorHover', description: '菜单项悬停文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemTextColorActive', description: '菜单项激活文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemTextColorChildActive', description: '子菜单激活文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemColorHover', description: '菜单项悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'itemColorActive', description: '菜单项激活背景色', type: 'color', example: '#e6f7ff' },
      { name: 'itemIconColor', description: '菜单项图标颜色', type: 'color', example: '#666666' },
      { name: 'itemIconColorHover', description: '菜单项悬停图标颜色', type: 'color', example: '#1890ff' },
      { name: 'itemIconColorActive', description: '菜单项激活图标颜色', type: 'color', example: '#1890ff' },
      { name: 'arrowColor', description: '箭头颜色', type: 'color', example: '#999999' },
      { name: 'arrowColorHover', description: '箭头悬停颜色', type: 'color', example: '#1890ff' },
      { name: 'arrowColorActive', description: '箭头激活颜色', type: 'color', example: '#1890ff' },
      { name: 'groupTextColor', description: '分组文字颜色', type: 'color', example: '#999999' },
      { name: 'dividerColor', description: '分割线颜色', type: 'color', example: '#e8e8e8' }
    ]
  },

  Notification: {
    name: 'Notification',
    description: '通知提醒组件',
    category: 'feedback',
    commonProps: ['borderRadius', 'boxShadow'],
    specificProps: [
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff', required: true },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'metaTextColor', description: '元信息文字颜色', type: 'color', example: '#999999' },
      { name: 'titleFontWeight', description: '标题字重', type: 'font', example: '600' },
      { name: 'padding', description: '内边距', type: 'spacing', example: '16px 20px', required: true },
      { name: 'titleMargin', description: '标题边距', type: 'spacing', example: '0 0 8px 0' },
      { name: 'metaMargin', description: '元信息边距', type: 'spacing', example: '4px 0 0 0' },
      { name: 'iconMargin', description: '图标边距', type: 'spacing', example: '0 12px 0 0' },
      { name: 'closeMargin', description: '关闭按钮边距', type: 'spacing', example: '0 0 0 10px' },
      { name: 'closeSize', description: '关闭按钮尺寸', type: 'size', example: '16px' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '24px' },
      { name: 'width', description: '宽度', type: 'size', example: '384px' },
      { name: 'maxWidth', description: '最大宽度', type: 'size', example: 'calc(100vw - 32px)' }
    ]
  },

  Popconfirm: {
    name: 'Popconfirm',
    description: '气泡确认框组件',
    category: 'feedback',
    commonProps: ['borderRadius', 'boxShadow'],
    specificProps: [
      { name: 'fontSize', description: '字体大小', type: 'font', example: '14px' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '16px' },
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#faad14' }
    ]
  },

  Progress: {
    name: 'Progress',
    description: '进度条组件',
    category: 'feedback',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'railHeight', description: '轨道高度', type: 'size', example: '8px', required: true },
      { name: 'railColor', description: '轨道颜色', type: 'color', example: '#f5f5f5', required: true },
      { name: 'fillColor', description: '填充颜色', type: 'color', example: '#1890ff', required: true },
      { name: 'textColorCircle', description: '环形进度文字颜色', type: 'color', example: '#333333' },
      { name: 'textColorLineInner', description: '线形内部文字颜色', type: 'color', example: '#ffffff' },
      { name: 'textColorLineOuter', description: '线形外部文字颜色', type: 'color', example: '#333333' },
      { name: 'lineBorderRadius', description: '线形圆角', type: 'border', example: '4px' },
      { name: 'fontSizeCircle', description: '环形进度字体大小', type: 'font', example: '24px' },
      { name: 'fontSizeLine', description: '线形进度字体大小', type: 'font', example: '12px' }
    ]
  },

  Radio: {
    name: 'Radio',
    description: '单选框组件',
    category: 'data-entry',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'sizeMedium', description: '中等尺寸大小', type: 'size', example: '16px', required: true },
      { name: 'fontSizeMedium', description: '中等尺寸字体', type: 'font', example: '14px', required: true },
      { name: 'radioSize', description: '单选框尺寸', type: 'size', example: '16px' },
      { name: 'color', description: '背景色', type: 'color', example: '#ffffff' },
      { name: 'colorChecked', description: '选中背景色', type: 'color', example: '#1890ff' },
      { name: 'colorDisabled', description: '禁用背景色', type: 'color', example: '#f5f5f5' },
      { name: 'colorDisabledChecked', description: '禁用选中背景色', type: 'color', example: '#f5f5f5' },
      { name: 'border', description: '边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderChecked', description: '选中边框', type: 'border', example: '1px solid #1890ff' },
      { name: 'borderDisabled', description: '禁用边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'borderDisabledChecked', description: '禁用选中边框', type: 'border', example: '1px solid #d9d9d9' },
      { name: 'dotColorChecked', description: '选中点颜色', type: 'color', example: '#ffffff' },
      { name: 'dotColorDisabledChecked', description: '禁用选中点颜色', type: 'color', example: '#cccccc' },
      { name: 'textColor', description: '文字颜色', type: 'color', example: '#333333' },
      { name: 'textColorDisabled', description: '禁用文字颜色', type: 'color', example: '#cccccc' },
      { name: 'labelPadding', description: '标签内边距', type: 'spacing', example: '0 0 0 8px' }
    ]
  },

  Rate: {
    name: 'Rate',
    description: '评分组件',
    category: 'data-entry',
    commonProps: [],
    specificProps: [
      { name: 'itemSize', description: '星星尺寸', type: 'size', example: '20px', required: true },
      { name: 'itemColor', description: '星星颜色', type: 'color', example: '#e8e8e8' },
      { name: 'itemColorActive', description: '激活星星颜色', type: 'color', example: '#fadb14', required: true },
      { name: 'itemMargin', description: '星星边距', type: 'spacing', example: '0 4px 0 0' }
    ]
  },

  Result: {
    name: 'Result',
    description: '结果页组件',
    category: 'feedback',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'titleFontSize', description: '标题字体大小', type: 'font', example: '24px' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'textColor', description: '描述文字颜色', type: 'color', example: '#666666' },
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '72px' },
      { name: 'iconColorInfo', description: '信息图标颜色', type: 'color', example: '#1890ff' },
      { name: 'iconColorSuccess', description: '成功图标颜色', type: 'color', example: '#52c41a' },
      { name: 'iconColorWarning', description: '警告图标颜色', type: 'color', example: '#faad14' },
      { name: 'iconColorError', description: '错误图标颜色', type: 'color', example: '#ff4d4f' }
    ]
  },

  Skeleton: {
    name: 'Skeleton',
    description: '骨架屏组件',
    category: 'feedback',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'color', description: '骨架屏颜色', type: 'color', example: '#f2f3f5', required: true },
      { name: 'colorEnd', description: '骨架屏结束颜色', type: 'color', example: '#e6e8eb', required: true },
      { name: 'borderRadius', description: '圆角', type: 'border', example: '4px' }
    ]
  },

  Slider: {
    name: 'Slider',
    description: '滑块组件',
    category: 'data-entry',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'railHeight', description: '轨道高度', type: 'size', example: '6px', required: true },
      { name: 'railColor', description: '轨道颜色', type: 'color', example: '#e0e0e6', required: true },
      { name: 'railColorHover', description: '轨道悬停颜色', type: 'color', example: '#d0d0d6' },
      { name: 'fillColor', description: '填充颜色', type: 'color', example: '#1890ff', required: true },
      { name: 'fillColorHover', description: '填充悬停颜色', type: 'color', example: '#40a9ff' },
      { name: 'handleSize', description: '滑块尺寸', type: 'size', example: '18px', required: true },
      { name: 'handleColor', description: '滑块颜色', type: 'color', example: '#ffffff' },
      { name: 'handleColorHover', description: '滑块悬停颜色', type: 'color', example: '#ffffff' },
      { name: 'dotHeight', description: '刻度点高度', type: 'size', example: '8px' },
      { name: 'dotWidth', description: '刻度点宽度', type: 'size', example: '8px' },
      { name: 'dotColor', description: '刻度点颜色', type: 'color', example: '#e0e0e6' },
      { name: 'dotColorModal', description: '模态刻度点颜色', type: 'color', example: '#e0e0e6' },
      { name: 'dotColorPopover', description: '弹出刻度点颜色', type: 'color', example: '#e0e0e6' }
    ]
  },

  Spin: {
    name: 'Spin',
    description: '加载中组件',
    category: 'feedback',
    commonProps: [],
    specificProps: [
      { name: 'color', description: '加载颜色', type: 'color', example: '#1890ff', required: true },
      { name: 'sizeSmall', description: '小尺寸大小', type: 'size', example: '14px' },
      { name: 'sizeMedium', description: '中等尺寸大小', type: 'size', example: '16px' },
      { name: 'sizeLarge', description: '大尺寸大小', type: 'size', example: '20px' }
    ]
  },

  Steps: {
    name: 'Steps',
    description: '步骤条组件',
    category: 'navigation',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'stepHeaderFontSizeSmall', description: '小尺寸步骤头字体', type: 'font', example: '12px' },
      { name: 'stepHeaderFontSizeMedium', description: '中等尺寸步骤头字体', type: 'font', example: '14px' },
      { name: 'stepHeaderFontSizeLarge', description: '大尺寸步骤头字体', type: 'font', example: '16px' },
      { name: 'indicatorIndexFontSizeSmall', description: '小尺寸指示器字体', type: 'font', example: '12px' },
      { name: 'indicatorIndexFontSizeMedium', description: '中等尺寸指示器字体', type: 'font', example: '14px' },
      { name: 'indicatorIndexFontSizeLarge', description: '大尺寸指示器字体', type: 'font', example: '16px' },
      { name: 'indicatorSizeSmall', description: '小尺寸指示器大小', type: 'size', example: '22px' },
      { name: 'indicatorSizeMedium', description: '中等尺寸指示器大小', type: 'size', example: '28px' },
      { name: 'indicatorSizeLarge', description: '大尺寸指示器大小', type: 'size', example: '34px' },
      { name: 'indicatorColor', description: '指示器颜色', type: 'color', example: '#e0e0e6' },
      { name: 'indicatorColorActive', description: '激活指示器颜色', type: 'color', example: '#1890ff' },
      { name: 'indicatorTextColor', description: '指示器文字颜色', type: 'color', example: '#333333' },
      { name: 'indicatorTextColorActive', description: '激活指示器文字颜色', type: 'color', example: '#ffffff' },
      { name: 'splitorColor', description: '分隔线颜色', type: 'color', example: '#e0e0e6' },
      { name: 'splitorColorActive', description: '激活分隔线颜色', type: 'color', example: '#1890ff' },
      { name: 'headerTextColor', description: '头部文字颜色', type: 'color', example: '#333333' },
      { name: 'headerTextColorActive', description: '激活头部文字颜色', type: 'color', example: '#1890ff' },
      { name: 'descriptionTextColor', description: '描述文字颜色', type: 'color', example: '#666666' }
    ]
  },

  Tabs: {
    name: 'Tabs',
    description: '标签页组件',
    category: 'navigation',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'tabFontSizeSmall', description: '小尺寸标签字体', type: 'font', example: '12px' },
      { name: 'tabFontSizeMedium', description: '中等尺寸标签字体', type: 'font', example: '14px' },
      { name: 'tabFontSizeLarge', description: '大尺寸标签字体', type: 'font', example: '16px' },
      { name: 'tabGapSmall', description: '小尺寸标签间距', type: 'spacing', example: '12px' },
      { name: 'tabGapMedium', description: '中等尺寸标签间距', type: 'spacing', example: '16px' },
      { name: 'tabGapLarge', description: '大尺寸标签间距', type: 'spacing', example: '20px' },
      { name: 'tabPaddingSmall', description: '小尺寸标签内边距', type: 'spacing', example: '6px 14px' },
      { name: 'tabPaddingMedium', description: '中等尺寸标签内边距', type: 'spacing', example: '10px 18px' },
      { name: 'tabPaddingLarge', description: '大尺寸标签内边距', type: 'spacing', example: '14px 22px' },
      { name: 'tabColor', description: '标签背景色', type: 'color', example: 'transparent' },
      { name: 'tabColorSegment', description: '分段标签背景色', type: 'color', example: '#f5f5f5' },
      { name: 'tabTextColor', description: '标签文字颜色', type: 'color', example: '#666666' },
      { name: 'tabTextColorActive', description: '激活标签文字颜色', type: 'color', example: '#1890ff' },
      { name: 'tabTextColorHover', description: '悬停标签文字颜色', type: 'color', example: '#1890ff' },
      { name: 'tabTextColorDisabled', description: '禁用标签文字颜色', type: 'color', example: '#cccccc' },
      { name: 'tabCloseIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'tabCloseIconColorHover', description: '关闭图标悬停颜色', type: 'color', example: '#666666' },
      { name: 'paneTextColor', description: '面板文字颜色', type: 'color', example: '#333333' },
      { name: 'barColor', description: '指示条颜色', type: 'color', example: '#1890ff' }
    ]
  },

  TimePicker: {
    name: 'TimePicker',
    description: '时间选择器组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'itemFontSize', description: '时间项字体大小', type: 'font', example: '14px' },
      { name: 'itemHeight', description: '时间项高度', type: 'size', example: '32px' },
      { name: 'itemTextColor', description: '时间项文字颜色', type: 'color', example: '#333333' },
      { name: 'itemTextColorActive', description: '激活时间项文字颜色', type: 'color', example: '#1890ff' },
      { name: 'itemColorHover', description: '时间项悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'itemColorActive', description: '激活时间项背景色', type: 'color', example: '#e6f7ff' }
    ]
  },

  Timeline: {
    name: 'Timeline',
    description: '时间轴组件',
    category: 'data-display',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'iconSize', description: '图标尺寸', type: 'size', example: '12px' },
      { name: 'iconColor', description: '图标颜色', type: 'color', example: '#1890ff' },
      { name: 'iconColorError', description: '错误图标颜色', type: 'color', example: '#ff4d4f' },
      { name: 'iconColorSuccess', description: '成功图标颜色', type: 'color', example: '#52c41a' },
      { name: 'iconColorWarning', description: '警告图标颜色', type: 'color', example: '#faad14' },
      { name: 'iconColorInfo', description: '信息图标颜色', type: 'color', example: '#1890ff' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'contentTextColor', description: '内容文字颜色', type: 'color', example: '#666666' },
      { name: 'metaTextColor', description: '元信息文字颜色', type: 'color', example: '#999999' },
      { name: 'lineColor', description: '连接线颜色', type: 'color', example: '#e0e0e6' }
    ]
  },

  Transfer: {
    name: 'Transfer',
    description: '穿梭框组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'listColor', description: '列表背景色', type: 'color', example: '#ffffff' },
      { name: 'headerColor', description: '头部背景色', type: 'color', example: '#fafafa' },
      { name: 'itemColorPending', description: '待选项背景色', type: 'color', example: '#f5f5f5' },
      { name: 'itemTextColor', description: '项目文字颜色', type: 'color', example: '#333333' },
      { name: 'itemTextColorDisabled', description: '禁用项目文字颜色', type: 'color', example: '#cccccc' },
      { name: 'titleTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'closeIconColor', description: '关闭图标颜色', type: 'color', example: '#999999' },
      { name: 'closeIconColorHover', description: '关闭图标悬停颜色', type: 'color', example: '#666666' }
    ]
  },

  Tree: {
    name: 'Tree',
    description: '树形控件组件',
    category: 'data-display',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'nodeHeight', description: '节点高度', type: 'size', example: '30px', required: true },
      { name: 'nodeWrapperPadding', description: '节点包装器内边距', type: 'spacing', example: '3px 0' },
      { name: 'nodeContentHeight', description: '节点内容高度', type: 'size', example: '24px' },
      { name: 'nodeTextColor', description: '节点文字颜色', type: 'color', example: '#333333' },
      { name: 'nodeTextColorDisabled', description: '禁用节点文字颜色', type: 'color', example: '#cccccc' },
      { name: 'nodeColorHover', description: '节点悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'nodeColorPressed', description: '节点按下背景色', type: 'color', example: '#e6e6e6' },
      { name: 'nodeColorActive', description: '节点激活背景色', type: 'color', example: '#e6f7ff' },
      { name: 'arrowColor', description: '箭头颜色', type: 'color', example: '#999999' },
      { name: 'loadingColor', description: '加载颜色', type: 'color', example: '#1890ff' },
      { name: 'dropMarkColor', description: '拖拽标记颜色', type: 'color', example: '#1890ff' }
    ]
  },

  TreeSelect: {
    name: 'TreeSelect',
    description: '树选择组件',
    category: 'data-entry',
    commonProps: ['fontSize', 'borderRadius'],
    specificProps: [
      { name: 'menuHeight', description: '菜单高度', type: 'size', example: '200px' },
      { name: 'menuPadding', description: '菜单内边距', type: 'spacing', example: '4px' }
    ]
  },

  Typography: {
    name: 'Typography',
    description: '排版组件',
    category: 'general',
    commonProps: ['fontSize'],
    specificProps: [
      { name: 'headerFontSize1', description: 'H1字体大小', type: 'font', example: '38px' },
      { name: 'headerFontSize2', description: 'H2字体大小', type: 'font', example: '30px' },
      { name: 'headerFontSize3', description: 'H3字体大小', type: 'font', example: '24px' },
      { name: 'headerFontSize4', description: 'H4字体大小', type: 'font', example: '20px' },
      { name: 'headerFontSize5', description: 'H5字体大小', type: 'font', example: '16px' },
      { name: 'headerFontSize6', description: 'H6字体大小', type: 'font', example: '14px' },
      { name: 'headerMargin1', description: 'H1边距', type: 'spacing', example: '28px 0 16px 0' },
      { name: 'headerMargin2', description: 'H2边距', type: 'spacing', example: '20px 0 12px 0' },
      { name: 'headerMargin3', description: 'H3边距', type: 'spacing', example: '16px 0 8px 0' },
      { name: 'headerMargin4', description: 'H4边距', type: 'spacing', example: '14px 0 6px 0' },
      { name: 'headerMargin5', description: 'H5边距', type: 'spacing', example: '12px 0 4px 0' },
      { name: 'headerMargin6', description: 'H6边距', type: 'spacing', example: '12px 0 4px 0' },
      { name: 'headerTextColor', description: '标题文字颜色', type: 'color', example: '#333333' },
      { name: 'textColor', description: '正文文字颜色', type: 'color', example: '#333333' },
      { name: 'textColor2', description: '次要文字颜色', type: 'color', example: '#666666' },
      { name: 'textColor3', description: '辅助文字颜色', type: 'color', example: '#999999' }
    ]
  },

  Upload: {
    name: 'Upload',
    description: '上传组件',
    category: 'data-entry',
    commonProps: ['borderRadius'],
    specificProps: [
      { name: 'draggerColor', description: '拖拽区背景色', type: 'color', example: '#fafafa' },
      { name: 'draggerColorHover', description: '拖拽区悬停背景色', type: 'color', example: '#f0f0f0' },
      { name: 'draggerBorder', description: '拖拽区边框', type: 'border', example: '1px dashed #d9d9d9' },
      { name: 'draggerBorderHover', description: '拖拽区悬停边框', type: 'border', example: '1px dashed #1890ff' },
      { name: 'itemColorHover', description: '文件项悬停背景色', type: 'color', example: '#f5f5f5' },
      { name: 'itemColorHoverError', description: '错误文件项悬停背景色', type: 'color', example: '#fff2f0' },
      { name: 'itemTextColor', description: '文件项文字颜色', type: 'color', example: '#333333' },
      { name: 'itemTextColorError', description: '错误文件项文字颜色', type: 'color', example: '#ff4d4f' },
      { name: 'itemTextColorSuccess', description: '成功文件项文字颜色', type: 'color', example: '#52c41a' },
      { name: 'itemIconColor', description: '文件项图标颜色', type: 'color', example: '#999999' },
      { name: 'itemDisabledOpacity', description: '禁用文件项透明度', type: 'other', example: '0.6' }
    ]
  }
}

// 组件分类
export const COMPONENT_CATEGORIES = {
  general: '通用',
  layout: '布局',
  navigation: '导航',
  'data-entry': '数据录入',
  'data-display': '数据展示',
  feedback: '反馈',
  other: '其他'
} as const

// 获取组件配置
export function getComponentConfig(componentName: string): ComponentThemeConfig | undefined {
  return COMPONENT_THEME_CONFIGS[componentName]
}

// 获取所有组件名称
export function getAllComponentNames(): string[] {
  return Object.keys(COMPONENT_THEME_CONFIGS)
}

// 根据分类获取组件
export function getComponentsByCategory(category: string): ComponentThemeConfig[] {
  return Object.values(COMPONENT_THEME_CONFIGS).filter(config => config.category === category)
}

// 生成组件的提示词描述
export function generateComponentPrompt(componentName: string): string {
  const config = getComponentConfig(componentName)
  if (!config) return ''

  const requiredProps = config.specificProps.filter(prop => prop.required)
  const optionalProps = config.specificProps.filter(prop => !prop.required)

  let prompt = `**${config.name} ${config.description}**：\n`

  if (requiredProps.length > 0) {
    prompt += '- 必需属性：\n'
    requiredProps.forEach(prop => {
      prompt += `  - ${prop.name}: ${prop.description}${prop.example ? ` (如 ${prop.example})` : ''}\n`
    })
  }

  if (optionalProps.length > 0) {
    prompt += '- 可选属性：\n'
    optionalProps.forEach(prop => {
      prompt += `  - ${prop.name}: ${prop.description}${prop.example ? ` (如 ${prop.example})` : ''}\n`
    })
  }

  return prompt
}

// AI 主题生成相关配置和常量

// AI 供应商配置
export const AI_PROVIDERS = [
  { label: 'OpenRouter', value: 'openrouter', description: '聚合多个AI模型的平台' },
  { label: 'OpenAI', value: 'openai', description: 'GPT系列模型官方API' },
  { label: 'Google Gemini', value: 'gemini', description: 'Google Gemini 官方API' },
  { label: 'Anthropic', value: 'anthropic', description: 'Claude系列模型' },
  { label: 'DeepSeek', value: 'deepseek', description: 'DeepSeek官方API' },
  { label: '豆包/字节跳动', value: 'doubao', description: '字节跳动豆包大模型' },
  { label: '阿里巴巴千问', value: 'qwen', description: '阿里云千问大模型' },
  { label: '自定义OpenAPI', value: 'custom', description: '兼容OpenAI格式的自定义API' }
]

// 各供应商的模型配置
export const PROVIDER_MODELS = {
  openrouter: [
    { label: 'Google Gemini 2.5 Pro Exp', value: 'google/gemini-2.5-pro-exp-03-25' },
    { label: 'Google Gemini 2.0 Flash Exp (Free)', value: 'google/gemini-2.0-flash-exp:free' },
    { label: 'Meta Llama 4 Scout (Free)', value: 'meta-llama/llama-4-scout:free' },
    { label: 'TNG DeepSeek R1T Chimera (Free)', value: 'tngtech/deepseek-r1t-chimera:free' },
    { label: 'Microsoft MAI DS R1 (Free)', value: 'microsoft/mai-ds-r1:free' },
    { label: 'DeepSeek Chat V3 (Free)', value: 'deepseek/deepseek-chat-v3-0324:free' },
    { label: 'DeepSeek R1 (Free)', value: 'deepseek/deepseek-r1:free' },
    { label: 'Meta Llama 4 Maverick (Free)', value: 'meta-llama/llama-4-maverick:free' },
    { label: 'Qwen 3 235B A22B (Free)', value: 'qwen/qwen3-235b-a22b:free' }
  ],
  openai: [
    { label: 'GPT-4o', value: 'gpt-4o' },
    { label: 'GPT-4o Mini', value: 'gpt-4o-mini' },
    { label: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
    { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' }
  ],
  gemini: [
    { label: 'Gemini 2.0 Flash Exp', value: 'gemini-2.0-flash-exp' },
    { label: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
    { label: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' },
    { label: 'Gemini 1.5 Flash-8B', value: 'gemini-1.5-flash-8b' },
    { label: 'Gemini 1.0 Pro', value: 'gemini-1.0-pro' }
  ],
  anthropic: [
    { label: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet-20241022' },
    { label: 'Claude 3.5 Haiku', value: 'claude-3-5-haiku-20241022' },
    { label: 'Claude 3 Opus', value: 'claude-3-opus-20240229' },
    { label: 'Claude 3 Sonnet', value: 'claude-3-sonnet-20240229' }
  ],
  deepseek: [
    { label: 'DeepSeek Chat', value: 'deepseek-chat' },
    { label: 'DeepSeek Coder', value: 'deepseek-coder' },
    { label: 'DeepSeek R1', value: 'deepseek-r1' }
  ],
  doubao: [
    { label: '豆包 Pro', value: 'ep-20241230140207-8xqvs' },
    { label: '豆包 Lite', value: 'ep-20241230140207-lite' },
    { label: '豆包 32K', value: 'ep-20241230140207-32k' }
  ],
  qwen: [
    { label: 'Qwen Max', value: 'qwen-max' },
    { label: 'Qwen Plus', value: 'qwen-plus' },
    { label: 'Qwen Turbo', value: 'qwen-turbo' },
    { label: 'Qwen Long', value: 'qwen-long' }
  ],
  custom: [
    { label: '自定义模型', value: 'custom-model' }
  ]
}

// 兼容性：保持原有的 FREE_OPENROUTER_MODELS 导出
export const FREE_OPENROUTER_MODELS = PROVIDER_MODELS.openrouter

// 主题模式选项
export const THEME_MODES = [
  { label: '浅色模式', value: 'light', description: '适合日间使用，背景明亮，文字深色' },
  { label: '暗色模式', value: 'dark', description: '适合夜间使用，背景深色，文字浅色' },
  { label: '自适应', value: 'auto', description: '根据用户系统设置自动切换' }
]

// 画家风格预设
export const ARTIST_STYLES = [
  {
    label: '莫奈印象派',
    value: 'monet',
    description: '柔和蓝紫色调，光影自然，平静舒适',
    colors: {
      primary: '#6A7FAF',
      secondary: '#F0E68C',
      accent: '#F4BBCF',
      neutral: '#E0E0E0'
    },
    prompt: '基于莫奈印象派风格，使用柔和的蓝紫色调和温暖的黄色作为主色，色彩过渡自然和谐。背景应有微妙的纹理感，就像莫奈画作中的光影效果。整体感觉应轻盈、通透，给人平静舒适的感受。'
  },
  {
    label: '梵高表现主义',
    value: 'vangogh',
    description: '鲜明蓝黄绿色，饱和度高，充满活力',
    colors: {
      primary: '#1A4789',
      secondary: '#FFCF40',
      accent: '#2E5902',
      neutral: '#F5F2E9'
    },
    prompt: '基于梵高表现主义风格，使用鲜明的黄色、蓝色和绿色作为主色，色彩饱和度高但不刺眼。可以在元素边缘添加细微的"笔触"效果。整体感觉应充满活力和情感，但保持界面的清晰可用性。'
  },
  {
    label: '蒙德里安几何',
    value: 'mondrian',
    description: '纯粹三原色，几何简洁，现代理性',
    colors: {
      primary: '#D40000',
      secondary: '#FFCE00',
      accent: '#0051BA',
      neutral: '#FFFFFF'
    },
    prompt: '基于蒙德里安几何风格，使用纯粹的红、黄、蓝三原色作为主色，搭配黑色线条和白色背景。界面元素应有明确的几何感，方正简洁。整体感觉应现代、理性且结构化，强调视觉平衡。'
  },
  {
    label: '马蒂斯野兽派',
    value: 'matisse',
    description: '大胆鲜艳色彩，对比强烈，充满热情',
    colors: {
      primary: '#FF3D3D',
      secondary: '#FF9A3D',
      accent: '#7A3DFF',
      neutral: '#F9F3E9'
    },
    prompt: '基于马蒂斯野兽派风格，使用大胆鲜艳的色彩如红色、橙色、紫色作为主色，色彩对比强烈但和谐。界面元素可以有轻微的不规则感。整体感觉应充满活力、热情且现代，但确保文本清晰可读。'
  },
  {
    label: '北欧极简',
    value: 'nordic',
    description: '简洁自然，温暖木色，舒适宜人',
    colors: {
      primary: '#5D7A8B',
      secondary: '#D4B896',
      accent: '#A8C09A',
      neutral: '#F7F5F3'
    },
    prompt: '基于北欧极简风格，使用自然的灰蓝色、温暖的米色和清新的绿色。色彩饱和度适中，给人温暖舒适的感觉。界面应简洁干净，注重功能性和可用性。'
  },
  {
    label: '日式和风',
    value: 'japanese',
    description: '淡雅素净，禅意宁静，和谐平衡',
    colors: {
      primary: '#8B4513',
      secondary: '#DEB887',
      accent: '#CD853F',
      neutral: '#F5F5DC'
    },
    prompt: '基于日式和风美学，使用淡雅的棕色、米色和浅色调。色彩应低饱和度，给人宁静平和的感觉。界面设计应注重留白和平衡，体现禅意美学。'
  }
]

// 预设风格选项（传统风格，保持兼容性）
export const PRESET_STYLES = [
  { label: '现代简约', value: '现代简约风格，使用简洁的线条和大量留白，色彩搭配清新淡雅' },
  { label: '商务专业', value: '商务专业风格，使用深色调和正式的设计元素，体现专业性和可信度' },
  { label: '活力青春', value: '活力青春风格，使用明亮鲜艳的色彩，充满活力和创意' },
  { label: '温馨自然', value: '温馨自然风格，使用大地色系和自然元素，营造温暖舒适的感觉' },
  { label: '科技未来', value: '科技未来风格，使用蓝色和银色调，体现科技感和未来感' },
  { label: '优雅复古', value: '优雅复古风格，使用经典的色彩搭配和传统的设计元素' },
  { label: '极简黑白', value: '极简黑白风格，主要使用黑白灰三色，追求极致的简洁' },
  { label: '暖色温馨', value: '暖色温馨风格，使用橙色、黄色等暖色调，营造温暖的氛围' },
  { label: '冷色专业', value: '冷色专业风格，使用蓝色、绿色等冷色调，体现专业和冷静' },
  { label: '彩虹渐变', value: '彩虹渐变风格，使用多种颜色的渐变效果，充满创意和活力' }
]

// AI 配置接口
export interface AIProviderConfig {
  provider: string
  apiKey: string
  model: string
  baseUrl?: string  // 自定义API端点（用于自定义OpenAPI）
  organization?: string  // OpenAI组织ID（可选）
}

// 主题生成请求接口
export interface ThemeGenerationRequest {
  prompt: string
  style?: string
  components: string[]
  themeMode?: 'light' | 'dark' | 'auto'
  artistStyle?: string
  useEnhancedPrompt?: boolean
}

// 主题生成记录接口
export interface ThemeGenerationRecord {
  id: string
  timestamp: number
  prompt: string
  style?: string
  components: string[]
  themeMode?: 'light' | 'dark' | 'auto'
  artistStyle?: string
  themeOverrides: any
}

// 各供应商的API端点配置
export const PROVIDER_ENDPOINTS = {
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
  anthropic: 'https://api.anthropic.com/v1/messages',
  deepseek: 'https://api.deepseek.com/chat/completions',
  doubao: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
  qwen: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
  custom: '' // 用户自定义
}

// 各供应商的认证头配置
export const PROVIDER_AUTH_HEADERS = {
  openrouter: (apiKey: string) => ({
    'Authorization': `Bearer ${apiKey}`,
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Naive UI Theme Generator'
  }),
  openai: (apiKey: string, organization?: string) => ({
    'Authorization': `Bearer ${apiKey}`,
    ...(organization && { 'OpenAI-Organization': organization })
  }),
  gemini: (_apiKey: string) => ({
    'Content-Type': 'application/json'
    // Gemini API 使用查询参数传递 API Key，不使用 Authorization 头
  }),
  anthropic: (apiKey: string) => ({
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  }),
  deepseek: (apiKey: string) => ({
    'Authorization': `Bearer ${apiKey}`
  }),
  doubao: (apiKey: string) => ({
    'Authorization': `Bearer ${apiKey}`
  }),
  qwen: (apiKey: string) => ({
    'Authorization': `Bearer ${apiKey}`,
    'X-DashScope-SSE': 'disable'
  }),
  custom: (apiKey: string) => ({
    'Authorization': `Bearer ${apiKey}`
  })
}

// 默认 AI 配置
export const DEFAULT_AI_CONFIG: AIProviderConfig = {
  provider: localStorage['naive-ui-ai-config-provider'] || 'openrouter',
  apiKey: localStorage['naive-ui-ai-config-apikey'] || '',
  model: localStorage['naive-ui-ai-config-model'] || 'google/gemini-2.0-flash-exp:free',
  baseUrl: localStorage['naive-ui-ai-config-baseurl'] || undefined,
  organization: localStorage['naive-ui-ai-config-organization'] || undefined
}

// 本地存储键名
export const STORAGE_KEYS = {
  AI_CONFIG_API_KEY: 'naive-ui-ai-config-apikey',
  AI_CONFIG_PROVIDER: 'naive-ui-ai-config-provider',
  AI_CONFIG_MODEL: 'naive-ui-ai-config-model',
  AI_CONFIG_BASE_URL: 'naive-ui-ai-config-baseurl',
  AI_CONFIG_ORGANIZATION: 'naive-ui-ai-config-organization',
  THEME_OVERRIDES: 'naive-ui-theme-overrides',
  GENERATION_RECORDS: 'naive-ui-theme-generation-records'
} as const

// AI 生成相关的工具函数
export function saveAIConfig(config: AIProviderConfig): void {
  localStorage[STORAGE_KEYS.AI_CONFIG_API_KEY] = config.apiKey
  localStorage[STORAGE_KEYS.AI_CONFIG_PROVIDER] = config.provider
  localStorage[STORAGE_KEYS.AI_CONFIG_MODEL] = config.model
  if (config.baseUrl) {
    localStorage[STORAGE_KEYS.AI_CONFIG_BASE_URL] = config.baseUrl
  } else {
    localStorage.removeItem(STORAGE_KEYS.AI_CONFIG_BASE_URL)
  }
  if (config.organization) {
    localStorage[STORAGE_KEYS.AI_CONFIG_ORGANIZATION] = config.organization
  } else {
    localStorage.removeItem(STORAGE_KEYS.AI_CONFIG_ORGANIZATION)
  }
}

// 加载AI配置
export function loadAIConfig(): AIProviderConfig {
  return {
    provider: localStorage[STORAGE_KEYS.AI_CONFIG_PROVIDER] || 'openrouter',
    apiKey: localStorage[STORAGE_KEYS.AI_CONFIG_API_KEY] || '',
    model: localStorage[STORAGE_KEYS.AI_CONFIG_MODEL] || 'google/gemini-2.0-flash-exp:free',
    baseUrl: localStorage[STORAGE_KEYS.AI_CONFIG_BASE_URL] || undefined,
    organization: localStorage[STORAGE_KEYS.AI_CONFIG_ORGANIZATION] || undefined
  }
}

// 获取供应商的可用模型
export function getProviderModels(provider: string) {
  return PROVIDER_MODELS[provider as keyof typeof PROVIDER_MODELS] || []
}

// 获取供应商的API端点
export function getProviderEndpoint(provider: string, customBaseUrl?: string): string {
  if (provider === 'custom' && customBaseUrl) {
    return customBaseUrl
  }
  return PROVIDER_ENDPOINTS[provider as keyof typeof PROVIDER_ENDPOINTS] || ''
}

// 获取供应商的认证头
export function getProviderAuthHeaders(provider: string, apiKey: string, organization?: string) {
  const headerFunc = PROVIDER_AUTH_HEADERS[provider as keyof typeof PROVIDER_AUTH_HEADERS]
  if (!headerFunc) {
    return { 'Authorization': `Bearer ${apiKey}` }
  }
  return headerFunc(apiKey, organization)
}



export function saveGenerationRecords(records: ThemeGenerationRecord[]): void {
  localStorage[STORAGE_KEYS.GENERATION_RECORDS] = JSON.stringify(records)
}

export function loadGenerationRecords(): ThemeGenerationRecord[] {
  try {
    return JSON.parse(localStorage[STORAGE_KEYS.GENERATION_RECORDS] || '[]')
  } catch {
    return []
  }
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

// 增强的提示词生成接口
export interface EnhancedPromptOptions {
  userPrompt: string
  themeMode: 'light' | 'dark' | 'auto'
  artistStyle?: string
  traditionalStyle?: string
  components: string[]
}

// 生成增强的提示词
export function generateEnhancedPrompt(options: EnhancedPromptOptions): string {
  const { userPrompt, themeMode, artistStyle, traditionalStyle, components } = options

  // 获取画家风格信息
  const selectedArtistStyle = artistStyle ? ARTIST_STYLES.find(style => style.value === artistStyle) : null

  // 基础提示词结构
  let enhancedPrompt = `为 Naive UI 创建一个${themeMode === 'light' ? '浅色' : themeMode === 'dark' ? '暗色' : '自适应'}主题。

用户需求: ${userPrompt}

主题类型: ${themeMode === 'light' ? '浅色模式' : themeMode === 'dark' ? '暗色模式' : '自适应模式'}
选中组件: ${components.join(', ')}

`

  // 添加画家风格
  if (selectedArtistStyle) {
    enhancedPrompt += `艺术风格: ${selectedArtistStyle.label}
风格描述: ${selectedArtistStyle.prompt}
参考色彩:
- 主色: ${selectedArtistStyle.colors.primary}
- 辅助色: ${selectedArtistStyle.colors.secondary}
- 强调色: ${selectedArtistStyle.colors.accent}
- 中性色: ${selectedArtistStyle.colors.neutral}

`
  } else if (traditionalStyle) {
    enhancedPrompt += `传统风格: ${traditionalStyle}

`
  }

  // 添加模式特定约束
  if (themeMode === 'light') {
    enhancedPrompt += `浅色主题特别要求:
- 背景应使用白色或非常浅的色调
- 文本应使用深色以确保可读性
- 主色应用于重点元素，不要过度使用
- 禁用状态应使用浅灰色而非深色
- 确保所有文本与背景对比度至少4.5:1

`
  } else if (themeMode === 'dark') {
    enhancedPrompt += `暗色主题特别要求:
- 背景应使用深色但避免纯黑(#000)，推荐使用#1e1e1e或#282828等深灰
- 文本应使用白色或浅色以确保可读性
- 主色应适当提亮以在暗背景上更加醒目
- 避免使用过于鲜艳的色彩造成视觉疲劳
- 确保所有文本与背景对比度至少4.5:1

`
  }

  // 添加可读性约束
  enhancedPrompt += `关键组件要求:
- 按钮: 确保文本在各种状态下都清晰可见，hover和pressed状态有明显区别
- 卡片和面板: 背景与内容形成足够对比，边框颜色适中
- 表单元素: 输入区域与标签文本区分明确，焦点状态突出
- 导航元素: 当前状态与非活动状态有明显区别
- 表格: 行间隔清晰，表头与内容区分明显

可读性强制要求:
1. 文本与背景对比度:
   - 正文文本: 对比度至少4.5:1
   - 大号标题: 对比度至少3:1
   - 禁用状态: 对比度至少3:1

2. 色彩应用:
   - 避免纯色背景上使用相近色调的文本
   - 避免使用互补色作为文本和背景(如红色背景上的绿色文本)
   - 避免在彩色背景上使用彩色文本

3. 状态区分:
   - 确保hover、active、disabled等状态有明显区别
   - 错误状态应使用红色系，但文本必须清晰可读
   - 成功状态使用绿色系，警告状态使用橙/黄色系

整体要求:
- 保持色彩一致性，使用有限的调色板
- 确保所有状态下的文本都清晰可读
- 遵循选定的艺术风格，但优先保证可用性
- 生成的主题应该美观且实用

请返回完整的 JSON 格式主题配置，包含 common 配置和所选组件的详细样式。`

  return enhancedPrompt
}

// 获取画家风格信息
export function getArtistStyle(value: string) {
  return ARTIST_STYLES.find(style => style.value === value)
}

// 获取主题模式信息
export function getThemeMode(value: string) {
  return THEME_MODES.find(mode => mode.value === value)
}

// 默认模型列表，当API调用失败时使用
export function getDefaultModels(provider: string): string[] {
  switch (provider) {
    case 'openai':
      return ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo']
    case 'gemini':
      return ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.0-pro']
    case 'anthropic':
      return ['claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229']
    case 'deepseek':
      return ['deepseek-chat', 'deepseek-coder', 'deepseek-r1']
    case 'doubao':
      return ['ep-20241230140207-8xqvs', 'ep-20241230140207-lite', 'ep-20241230140207-32k']
    case 'qwen':
      return ['qwen-max', 'qwen-plus', 'qwen-turbo', 'qwen-long']
    case 'openrouter':
      return ['google/gemini-2.0-flash-exp:free', 'meta-llama/llama-4-scout:free', 'deepseek/deepseek-r1:free']
    case 'custom':
      return ['gpt-4o', 'gpt-3.5-turbo', 'claude-3-5-sonnet-20241022']
    default:
      return ['gpt-4o', 'gpt-3.5-turbo']
  }
}

// 动态获取各供应商的可用模型列表
export async function getAvailableModels(provider: string, apiKey: string, baseUrl?: string): Promise<string[]> {
  if (!apiKey) {
    return getDefaultModels(provider)
  }

  try {
    switch (provider) {
      case 'openrouter':
        return await getOpenRouterModels(apiKey)
      case 'openai':
        return await getOpenAIModels(apiKey)
      case 'gemini':
        return await getGeminiModels(apiKey)
      case 'anthropic':
        return await getAnthropicModels(apiKey)
      case 'deepseek':
        return await getOpenAICompatibleModels(apiKey, 'https://api.deepseek.com/v1')
      case 'doubao':
        return await getOpenAICompatibleModels(apiKey, 'https://ark.cn-beijing.volces.com/api/v3')
      case 'qwen':
        return await getQwenModels(apiKey)
      case 'custom':
        return baseUrl ? await getOpenAICompatibleModels(apiKey, baseUrl) : getDefaultModels(provider)
      default:
        return getDefaultModels(provider)
    }
  } catch (error) {
    console.warn(`获取 ${provider} 模型列表失败，使用默认列表:`, error)
    return getDefaultModels(provider)
  }
}

// 获取 OpenRouter 可用模型列表
export async function getOpenRouterModels(apiKey: string): Promise<string[]> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    if (!response.ok) {
      throw new Error(`获取模型列表失败: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
      .filter((model: any) => model && model.id && typeof model.id === 'string')
      .map((model: any) => model.id)
  } catch (error) {
    console.error('获取 OpenRouter 模型列表失败', error)
    return getDefaultModels('openrouter')
  }
}

// 获取 OpenAI 可用模型列表
export async function getOpenAIModels(apiKey: string): Promise<string[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    if (!response.ok) {
      throw new Error(`获取 OpenAI 模型列表失败: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
      .filter((model: any) => model && model.id && typeof model.id === 'string' && model.id.includes('gpt'))
      .map((model: any) => model.id)
  } catch (error) {
    console.error('获取 OpenAI 模型列表失败', error)
    return getDefaultModels('openai')
  }
}

// 获取 Google Gemini 可用模型列表
export async function getGeminiModels(apiKey: string): Promise<string[]> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`获取 Gemini 模型列表失败: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.models
      .filter((model: any) =>
        model &&
        model.name &&
        typeof model.name === 'string' &&
        model.name.includes('gemini') &&
        model.supportedGenerationMethods?.includes('generateContent')
      )
      .map((model: any) => model.name.replace('models/', ''))
  } catch (error) {
    console.error('获取 Gemini 模型列表失败', error)
    return getDefaultModels('gemini')
  }
}

// 获取 Anthropic 可用模型列表
export async function getAnthropicModels(_apiKey: string): Promise<string[]> {
  // Anthropic 没有公开的模型列表 API，返回已知模型
  return getDefaultModels('anthropic')
}

// 获取千问可用模型列表
export async function getQwenModels(_apiKey: string): Promise<string[]> {
  try {
    // 千问使用不同的API格式，这里返回默认列表
    // 实际项目中可以根据千问的API文档实现
    return getDefaultModels('qwen')
  } catch (error) {
    console.error('获取千问模型列表失败', error)
    return getDefaultModels('qwen')
  }
}

// 获取通用 OpenAI 兼容格式的模型列表
export async function getOpenAICompatibleModels(apiKey: string, baseUrl: string): Promise<string[]> {
  try {
    const response = await fetch(`${baseUrl}/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    if (!response.ok) {
      throw new Error(`获取模型列表失败: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
      .filter((model: any) => model && model.id && typeof model.id === 'string')
      .map((model: any) => model.id)
  } catch (error) {
    console.error('获取模型列表失败', error)
    // 返回一些常见的模型名称作为备选
    return ['gpt-3.5-turbo', 'gpt-4']
  }
}

// AI 主题生成相关配置和常量

// AI 供应商配置
export const AI_PROVIDERS = [
  { label: 'OpenRouter', value: 'openrouter' }
]

// 免费的 OpenRouter 模型列表
export const FREE_OPENROUTER_MODELS = [
  { label: 'Google Gemini 2.5 Pro Exp', value: 'google/gemini-2.5-pro-exp-03-25' },
  { label: 'Google Gemini 2.0 Flash Exp (Free)', value: 'google/gemini-2.0-flash-exp:free' },
  { label: 'Meta Llama 4 Scout (Free)', value: 'meta-llama/llama-4-scout:free' },
  { label: 'TNG DeepSeek R1T Chimera (Free)', value: 'tngtech/deepseek-r1t-chimera:free' },
  { label: 'Microsoft MAI DS R1 (Free)', value: 'microsoft/mai-ds-r1:free' },
  { label: 'DeepSeek Chat V3 (Free)', value: 'deepseek/deepseek-chat-v3-0324:free' },
  { label: 'DeepSeek R1 (Free)', value: 'deepseek/deepseek-r1:free' },
  { label: 'Meta Llama 4 Maverick (Free)', value: 'meta-llama/llama-4-maverick:free' },
  { label: 'Qwen 3 235B A22B (Free)', value: 'qwen/qwen3-235b-a22b:free' }
]

// 预设风格选项
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
}

// 主题生成请求接口
export interface ThemeGenerationRequest {
  prompt: string
  style?: string
  components: string[]
}

// 主题生成记录接口
export interface ThemeGenerationRecord {
  id: string
  timestamp: number
  prompt: string
  style?: string
  components: string[]
  themeOverrides: any
}

// 默认 AI 配置
export const DEFAULT_AI_CONFIG: AIProviderConfig = {
  provider: 'openrouter',
  apiKey: localStorage['naive-ui-ai-config-apikey'] || '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',
  model: localStorage['naive-ui-ai-config-model'] || 'google/gemini-2.0-flash-exp:free'
}

// 本地存储键名
export const STORAGE_KEYS = {
  AI_CONFIG_API_KEY: 'naive-ui-ai-config-apikey',
  AI_CONFIG_PROVIDER: 'naive-ui-ai-config-provider',
  AI_CONFIG_MODEL: 'naive-ui-ai-config-model',
  THEME_OVERRIDES: 'naive-ui-theme-overrides',
  GENERATION_RECORDS: 'naive-ui-theme-generation-records'
} as const

// AI 生成相关的工具函数
export function saveAIConfig(config: AIProviderConfig): void {
  localStorage[STORAGE_KEYS.AI_CONFIG_API_KEY] = config.apiKey
  localStorage[STORAGE_KEYS.AI_CONFIG_PROVIDER] = config.provider
  localStorage[STORAGE_KEYS.AI_CONFIG_MODEL] = config.model
}

export function loadAIConfig(): AIProviderConfig {
  return {
    provider: localStorage[STORAGE_KEYS.AI_CONFIG_PROVIDER] || DEFAULT_AI_CONFIG.provider,
    apiKey: localStorage[STORAGE_KEYS.AI_CONFIG_API_KEY] || DEFAULT_AI_CONFIG.apiKey,
    model: localStorage[STORAGE_KEYS.AI_CONFIG_MODEL] || DEFAULT_AI_CONFIG.model
  }
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

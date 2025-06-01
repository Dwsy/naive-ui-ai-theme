// AI 主题生成相关配置和常量

// AI 供应商配置
export const AI_PROVIDERS = [
  { label: 'OpenRouter', value: 'openrouter' },
  { label: 'Ollama', value: 'ollama' },
  { label: 'OpenAI', value: 'openai' },
  { label: 'DeepSeek', value: 'deepseek' }
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

// Ollama 模型列表
export const OLLAMA_MODELS = [
  { label: 'llama2 (example)', value: 'llama2' }
];

// OpenAI 模型列表
export const OPENAI_MODELS = [
  { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
  { label: 'GPT-4', value: 'gpt-4' },
  { label: 'GPT-4 Turbo', value: 'gpt-4-turbo-preview' }
];

// DeepSeek 模型列表
export const DEEPSEEK_MODELS = [
  { label: 'DeepSeek Chat', value: 'deepseek-chat' },
  { label: 'DeepSeek Coder', value: 'deepseek-coder' }
];

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
  provider: 'ollama', // Default provider
  apiKey: '', // Default API key for Ollama
  model: OLLAMA_MODELS.length > 0 ? OLLAMA_MODELS[0].value : '' // Default model for Ollama
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
  // Determine provider, defaulting to DEFAULT_AI_CONFIG.provider if nothing is stored
  let provider = localStorage[STORAGE_KEYS.AI_CONFIG_PROVIDER] || DEFAULT_AI_CONFIG.provider;

  // Ensure the loaded or default provider is valid, otherwise fallback to 'ollama'
  const knownProviderValues = AI_PROVIDERS.map(p => p.value);
  if (!knownProviderValues.includes(provider)) {
    provider = 'ollama'; // Fallback to 'ollama' if stored provider is invalid
  }

  // Determine API key
  let apiKey = localStorage[STORAGE_KEYS.AI_CONFIG_API_KEY];
  if (apiKey === null || apiKey === undefined) { // Check for null or undefined explicitly
    apiKey = provider === 'ollama' ? '' : DEFAULT_AI_CONFIG.apiKey; // Use OpenRouter's default API key if not Ollama
  }
  // If provider is ollama, ensure apiKey is always an empty string unless specifically set in localStorage (which is atypical)
  if (provider === 'ollama' && localStorage[STORAGE_KEYS.AI_CONFIG_API_KEY] === undefined) {
      apiKey = '';
  }


  // Determine model
  let model = localStorage[STORAGE_KEYS.AI_CONFIG_MODEL];
  if (!model) {
    if (provider === 'ollama') {
      model = OLLAMA_MODELS.length > 0 ? OLLAMA_MODELS[0].value : '';
    } else if (provider === 'openrouter') {
      model = FREE_OPENROUTER_MODELS.length > 0 ? FREE_OPENROUTER_MODELS[0].value : '';
    } else if (provider === 'openai') {
      model = OPENAI_MODELS.length > 0 ? OPENAI_MODELS[0].value : '';
    } else if (provider === 'deepseek') {
      model = DEEPSEEK_MODELS.length > 0 ? DEEPSEEK_MODELS[0].value : '';
    } else {
      // Fallback for a newly introduced provider that might not be 'ollama', 'openrouter', 'openai', or 'deepseek'
      // This case should ideally not be reached if 'provider' is correctly validated above.
      model = '';
    }
  }

  return {
    provider: provider,
    apiKey: apiKey,
    model: model
  };
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

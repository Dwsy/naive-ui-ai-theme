// AI 主题生成核心逻辑

import type { GlobalThemeOverrides } from 'naive-ui'
import { generateComponentPrompt } from './component-theme-config'
import type { AIProviderConfig, ThemeGenerationRequest } from './ai-config'
import {
  getProviderEndpoint,
  getProviderAuthHeaders,
  generateEnhancedPrompt,
  type EnhancedPromptOptions
} from './ai-config'

// 生成步骤接口
export interface GenerationStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'success' | 'error'
  startTime?: number
  endTime?: number
  data?: any
  error?: string
}

// 思考步骤接口
export interface ThinkingStep {
  id: string
  type: 'thinking' | 'analyzing' | 'generating' | 'validating' | 'complete' | 'error'
  content: string
  timestamp: number
  duration?: number
}

// 生成过程回调接口
export interface GenerationCallbacks {
  onStepStart?: (step: GenerationStep) => void
  onStepComplete?: (step: GenerationStep) => void
  onStepError?: (step: GenerationStep, error: string) => void
  onProgress?: (progress: number) => void
  onRawResponse?: (response: string) => void
  onThinkingStep?: (step: ThinkingStep) => void
  onThinkingContent?: (content: string) => void
}

/**
 * 调用 AI API 生成主题（带进度回调）
 */
export async function callAIAPI(
  request: ThemeGenerationRequest,
  config: AIProviderConfig,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const { provider, apiKey, model } = config

  // 定义生成步骤
  const steps: GenerationStep[] = [
    {
      id: 'validate',
      title: '验证配置',
      description: '检查 AI 配置和请求参数',
      status: 'pending'
    },
    {
      id: 'prepare',
      title: '准备提示词',
      description: '生成组件配置说明和构建提示词',
      status: 'pending'
    },
    {
      id: 'request',
      title: '调用 AI API',
      description: `向 ${provider} 发送请求`,
      status: 'pending'
    },
    {
      id: 'parse',
      title: '解析响应',
      description: '解析 AI 返回的主题配置',
      status: 'pending'
    },
    {
      id: 'validate_result',
      title: '验证结果',
      description: '验证生成的主题配置完整性',
      status: 'pending'
    }
  ]

  let currentStepIndex = 0
  const totalSteps = steps.length

  // 更新步骤状态的辅助函数
  const updateStep = (stepId: string, updates: Partial<GenerationStep>) => {
    const step = steps.find(s => s.id === stepId)
    if (step) {
      Object.assign(step, updates)
      if (updates.status === 'running') {
        step.startTime = Date.now()
        callbacks?.onStepStart?.(step)
      } else if (updates.status === 'success') {
        step.endTime = Date.now()
        callbacks?.onStepComplete?.(step)
        currentStepIndex++
        callbacks?.onProgress?.(Math.round((currentStepIndex / totalSteps) * 100))
      } else if (updates.status === 'error') {
        step.endTime = Date.now()
        callbacks?.onStepError?.(step, updates.error || '未知错误')
      }
    }
  }

  try {
    // 步骤1: 验证配置
    updateStep('validate', { status: 'running' })
    if (!apiKey || !model) {
      throw new Error('API 密钥或模型未配置')
    }
    if (!request.prompt.trim()) {
      throw new Error('提示词不能为空')
    }
    if (request.components.length === 0) {
      throw new Error('至少需要选择一个组件')
    }
    updateStep('validate', { status: 'success' })

    // 步骤2: 准备提示词
    updateStep('prepare', { status: 'running' })

    // 添加思考过程
    await simulateThinkingProcess(request, callbacks)

    let systemPrompt: string
    let userPrompt: string

    // 检查是否使用增强提示词
    if (request.useEnhancedPrompt && request.themeMode) {
      // 使用增强提示词
      const enhancedOptions: EnhancedPromptOptions = {
        userPrompt: request.prompt,
        themeMode: request.themeMode,
        artistStyle: request.artistStyle,
        traditionalStyle: request.style,
        components: request.components
      }

      const selectedComponentsPrompts = request.components
        .map(componentName => generateComponentPrompt(componentName))
        .filter(prompt => prompt)
        .join('\n\n')

      systemPrompt = generateEnhancedSystemPrompt(request.components, selectedComponentsPrompts)
      userPrompt = generateEnhancedPrompt(enhancedOptions)
    } else {
      // 使用传统提示词
      const selectedComponentsPrompts = request.components
        .map(componentName => generateComponentPrompt(componentName))
        .filter(prompt => prompt)
        .join('\n\n')

      systemPrompt = generateSystemPrompt(request.components, selectedComponentsPrompts)
      userPrompt = generateUserPrompt(request)
    }

    updateStep('prepare', {
      status: 'success',
      data: {
        componentsCount: request.components.length,
        promptLength: userPrompt.length,
        systemPromptLength: systemPrompt.length
      }
    })

    // 步骤3: 调用 AI API
    updateStep('request', { status: 'running' })
    let result: GlobalThemeOverrides

    // 根据供应商调用相应的API
    switch (provider) {
      case 'openrouter':
        result = await callOpenRouterAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
        break
      case 'openai':
        result = await callOpenAIAPI(systemPrompt, userPrompt, model, config, callbacks)
        break
      case 'gemini':
        result = await callGeminiAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
        break
      case 'anthropic':
        result = await callAnthropicAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
        break
      case 'deepseek':
        result = await callDeepSeekAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
        break
      case 'doubao':
        result = await callDoubaoAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
        break
      case 'qwen':
        result = await callQwenAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
        break
      case 'custom':
        result = await callCustomAPI(systemPrompt, userPrompt, model, config, callbacks)
        break
      default:
        throw new Error(`不支持的 AI 供应商: ${provider}`)
    }

    updateStep('request', { status: 'success' })

    // 步骤4: 解析响应（在 callOpenRouterAPI 中处理）
    updateStep('parse', { status: 'success' })

    // 步骤5: 验证结果
    updateStep('validate_result', { status: 'running' })
    if (!validateThemeConfig(result)) {
      throw new Error('生成的主题配置不完整')
    }
    updateStep('validate_result', { status: 'success' })

    return result

  } catch (error) {
    const currentStep = steps[currentStepIndex]
    if (currentStep) {
      updateStep(currentStep.id, {
        status: 'error',
        error: error instanceof Error ? error.message : '未知错误'
      })
    }
    throw error
  }
}

/**
 * 生成系统提示词
 */
function generateSystemPrompt(components: string[], selectedComponentsPrompts: string): string {
  return `你是一个专业的 UI 主题设计师，精通 Naive UI 组件库的主题系统。请根据用户的描述生成高质量的主题样式配置。

## 用户选择的组件
${components.join(', ')}

## 主题结构说明
Naive UI 主题采用层次化结构，包含以下关键部分：

### 1. common 通用配置（必须包含）
- **基础颜色系统**：
  - primaryColor: 主色调（如 #4FB233）
  - primaryColorHover: 主色调悬停态（通常比主色调亮15%）
  - primaryColorPressed: 主色调按下态（通常比主色调暗15%）
  - infoColor, successColor, warningColor, errorColor: 语义颜色
  - 对应的 hover 和 pressed 状态颜色
- **文本颜色**：
  - textColor1: 主要文本色
  - textColor2: 次要文本色
  - textColor3: 辅助文本色
  - textColorDisabled: 禁用文本色
- **背景和边框**：
  - borderColor: 边框颜色
  - dividerColor: 分割线颜色
  - hoverColor: 悬停背景色
  - inputColor: 输入框背景色
- **基础样式**：
  - fontSize: 基础字体大小（通常16px）
  - fontWeightStrong: 粗体字重（通常600-700）
  - borderRadius: 基础圆角（如16px）

### 2. 选中组件的详细配置
${selectedComponentsPrompts || '请根据选中的组件生成相应的样式配置。'}

## 设计原则
1. **颜色协调性**：确保所有颜色在视觉上协调统一
2. **对比度**：文本与背景对比度至少4.5:1，确保可访问性
3. **状态一致性**：hover和pressed状态要有明显但不突兀的变化
4. **尺寸规律**：字体、间距、圆角要遵循一定的比例关系
5. **语义明确**：success用绿色系，error用红色系，warning用橙/黄色系

## 颜色生成规则
- hover状态：在原色基础上叠加15%的白色或调亮15%
- pressed状态：在原色基础上叠加15%的黑色或调暗15%
- 禁用状态：降低透明度或使用灰色系

## 返回格式
请返回一个完整的 JSON 对象，包含 common 配置和所选组件的详细样式：

{
  "common": {
    "primaryColor": "#4FB233",
    "primaryColorHover": "#5BC247",
    "primaryColorPressed": "#43A02C",
    "fontSize": "16px",
    "fontWeightStrong": "600",
    "borderRadius": "16px",
    "textColor1": "#333333",
    "textColor2": "#666666",
    "borderColor": "#E0E0E6",
    "hoverColor": "rgba(79, 178, 51, 0.1)"
  },
  "Button": {
    "heightMedium": "48px",
    "fontSizeMedium": "16px",
    "paddingMedium": "0 40px",
    "borderRadiusMedium": "24px"
  }
}

## 重要要求
1. 必须包含 common 配置
2. 所有颜色使用十六进制格式（#RRGGBB）
3. 尺寸值包含单位（px）
4. 确保样式协调统一
5. 只返回 JSON，不要其他文字或解释`
}

/**
 * 生成用户提示词
 */
function generateUserPrompt(request: ThemeGenerationRequest): string {
  return `## 任务要求
请为以下组件生成专业的主题样式配置：${request.components.join(', ')}

## 用户需求描述
${request.prompt}
${request.style ? `\n## 预设风格偏好\n${request.style}` : ''}

## 具体要求
1. **必须包含 common 通用配置**，包括完整的颜色系统
2. **为每个选中的组件**生成详细的样式配置
3. **确保颜色协调统一**，遵循设计系统原则
4. **考虑用户体验**，确保足够的对比度和可访问性
5. **保持样式一致性**，所有组件应该有统一的视觉风格

## 参考示例
基于 tusimple 主题的配色方案，你可以参考以下颜色搭配：
- 主色调：#4FB233（绿色系）
- 信息色：#335FFF（蓝色系）
- 成功色：#4FB233（绿色系）
- 警告色：#FFAC26（橙色系）
- 错误色：#D92149（红色系）

请根据用户需求调整这些颜色，确保整体协调。`
}

/**
 * 调用 OpenRouter API
 */
async function callOpenRouterAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Naive UI Theme Generator'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('AI 返回内容为空')
  }

  // 通知原始响应
  callbacks?.onRawResponse?.(content)

  // 尝试解析 JSON
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('无法从 AI 响应中提取 JSON')
    }
    const parsed = JSON.parse(jsonMatch[0])
    return parsed
  } catch (parseError) {
    console.error('JSON 解析失败:', parseError)
    console.error( content)
    throw new Error(`AI 返回的主题格式无效: ${parseError instanceof Error ? parseError.message : '未知错误'}`)
  }
}

/**
 * 验证生成的主题配置
 */
export function validateThemeConfig(themeConfig: any): boolean {
  // 检查是否包含 common 配置
  if (!themeConfig.common) {
    return false
  }

  // 检查 common 配置是否包含必要的属性
  const requiredCommonProps = ['primaryColor', 'textColor1', 'borderColor']
  for (const prop of requiredCommonProps) {
    if (!themeConfig.common[prop]) {
      return false
    }
  }

  return true
}

/**
 * 清理和标准化主题配置
 */
export function normalizeThemeConfig(themeConfig: any): GlobalThemeOverrides {
  // 这里可以添加一些清理和标准化逻辑
  // 比如确保颜色格式正确，尺寸单位统一等
  return themeConfig
}

/**
 * 调用 OpenAI API
 */
async function callOpenAIAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  config: AIProviderConfig,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const endpoint = getProviderEndpoint('openai', config.baseUrl)
  const headers = {
    'Content-Type': 'application/json',
    ...getProviderAuthHeaders('openai', config.apiKey, config.organization)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('OpenAI 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 调用 Google Gemini API
 */
async function callGeminiAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  // Gemini API 使用不同的端点格式
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const headers = {
    'Content-Type': 'application/json'
  }

  // Gemini API 使用不同的消息格式
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `${systemPrompt}\n\n${userPrompt}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 65536,
      }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!content) {
    throw new Error('Gemini 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 调用 Anthropic API
 */
async function callAnthropicAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const endpoint = getProviderEndpoint('anthropic')
  const headers = {
    'Content-Type': 'application/json',
    ...getProviderAuthHeaders('anthropic', apiKey)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Anthropic API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.content[0]?.text

  if (!content) {
    throw new Error('Anthropic 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 调用 DeepSeek API
 */
async function callDeepSeekAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const endpoint = getProviderEndpoint('deepseek')
  const headers = {
    'Content-Type': 'application/json',
    ...getProviderAuthHeaders('deepseek', apiKey)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`DeepSeek API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('DeepSeek 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 调用豆包 API
 */
async function callDoubaoAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const endpoint = getProviderEndpoint('doubao')
  const headers = {
    'Content-Type': 'application/json',
    ...getProviderAuthHeaders('doubao', apiKey)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`豆包 API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('豆包 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 调用千问 API
 */
async function callQwenAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const endpoint = getProviderEndpoint('qwen')
  const headers = {
    'Content-Type': 'application/json',
    ...getProviderAuthHeaders('qwen', apiKey)
  }

  // 千问API使用不同的请求格式
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      input: {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      },
      parameters: {
        temperature: 0.7,
        result_format: 'message'
      }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`千问 API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.output?.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('千问 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 调用自定义 OpenAPI 兼容 API
 */
async function callCustomAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  config: AIProviderConfig,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  if (!config.baseUrl) {
    throw new Error('自定义API需要配置baseUrl')
  }

  const endpoint = getProviderEndpoint('custom', config.baseUrl)
  const headers = {
    'Content-Type': 'application/json',
    ...getProviderAuthHeaders('custom', config.apiKey)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`自定义API 请求失败 (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error('自定义API 返回内容为空')
  }

  return parseAIResponse(content, callbacks)
}

/**
 * 通用的AI响应解析函数
 */
function parseAIResponse(content: string, callbacks?: GenerationCallbacks): GlobalThemeOverrides {
  // 通知原始响应
  callbacks?.onRawResponse?.(content)

  // 尝试解析 JSON
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('无法从 AI 响应中提取 JSON')
    }
    const parsed = JSON.parse(jsonMatch[0])
    return parsed
  } catch (parseError) {
    console.error('JSON 解析失败:', parseError)
    console.error('原始内容:', content)
    throw new Error(`AI 返回的主题格式无效: ${parseError instanceof Error ? parseError.message : '未知错误'}`)
  }
}

/**
 * 模拟AI思考过程
 */
async function simulateThinkingProcess(
  request: ThemeGenerationRequest,
  callbacks?: GenerationCallbacks
): Promise<void> {
  if (!callbacks?.onThinkingStep && !callbacks?.onThinkingContent) return

  // 生成更丰富的思考步骤
  const thinkingSteps = generateThinkingSteps(request)

  for (let i = 0; i < thinkingSteps.length; i++) {
    const step = thinkingSteps[i]

    // 发送思考步骤
    callbacks?.onThinkingStep?.({
      id: `thinking-${i}`,
      type: step.type,
      content: step.content,
      timestamp: Date.now()
    })

    // 模拟打字机效果的内容
    if (callbacks?.onThinkingContent) {
      const words = step.content.split('')
      let currentContent = ''

      for (const char of words) {
        currentContent += char
        callbacks.onThinkingContent(currentContent)
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20))
      }
    }

    // 等待一段时间再进行下一步
    await new Promise(resolve => setTimeout(resolve, step.delay))
  }
}

/**
 * 生成增强的系统提示词
 */
function generateEnhancedSystemPrompt(components: string[], selectedComponentsPrompts: string): string {
  return `你是一个专业的 UI 主题设计师，精通 Naive UI 组件库的主题系统和现代设计美学。你具备深厚的色彩理论知识和艺术修养，能够创造既美观又实用的主题配置。

## 核心职责
根据用户的描述和选择的艺术风格，生成高质量、可读性强的 Naive UI 主题样式配置。

## 用户选择的组件
${components.join(', ')}

## 主题结构说明
Naive UI 主题采用层次化结构，包含以下关键部分：

### 1. common 通用配置（必须包含）
- **基础颜色系统**：
  - primaryColor: 主色调
  - primaryColorHover: 主色调悬停态（通常比主色调亮15%）
  - primaryColorPressed: 主色调按下态（通常比主色调暗15%）
  - infoColor, successColor, warningColor, errorColor: 语义颜色
  - 对应的 hover 和 pressed 状态颜色
- **文本颜色**：
  - textColor1: 主要文本色
  - textColor2: 次要文本色
  - textColor3: 辅助文本色
  - textColorDisabled: 禁用文本色
- **背景和边框**：
  - borderColor: 边框颜色
  - dividerColor: 分割线颜色
  - hoverColor: 悬停背景色
  - inputColor: 输入框背景色
- **基础样式**：
  - fontSize: 基础字体大小（通常16px）
  - fontWeightStrong: 粗体字重（通常600-700）
  - borderRadius: 基础圆角

### 2. 选中组件的详细配置
${selectedComponentsPrompts || '请根据选中的组件生成相应的样式配置。'}

## 设计原则（严格遵循）
1. **可读性优先**：确保所有文本与背景对比度至少4.5:1
2. **色彩协调性**：确保所有颜色在视觉上协调统一
3. **状态一致性**：hover和pressed状态要有明显但不突兀的变化
4. **尺寸规律**：字体、间距、圆角要遵循一定的比例关系
5. **语义明确**：success用绿色系，error用红色系，warning用橙/黄色系

## 返回格式要求
请返回一个完整的 JSON 对象，包含 common 配置和所选组件的详细样式。确保：
- 所有颜色使用十六进制格式（#RRGGBB）
- 尺寸值包含单位（px）
- 样式协调统一
- 文本清晰可读
- 只返回 JSON，不要其他文字或解释

## 重要提醒
- 必须严格遵循用户指定的主题模式（浅色/暗色）
- 如果指定了艺术风格，要在保证可用性的前提下体现风格特色
- 优先保证可读性和可用性，其次考虑美观性`
}

/**
 * 生成丰富的思考步骤
 */
function generateThinkingSteps(request: ThemeGenerationRequest) {
  const steps = []

  // 第一步：分析用户需求
  steps.push({
    type: 'thinking' as const,
    content: `🤔 让我仔细分析一下您的需求："${request.prompt}"`,
    delay: 1000
  })

  // 第二步：模式检测
  if (request.useEnhancedPrompt) {
    const modeText = request.themeMode === 'light' ? '浅色模式' :
                    request.themeMode === 'dark' ? '暗色模式' : '自适应模式'
    steps.push({
      type: 'analyzing' as const,
      content: `✨ 检测到增强模式！将为您生成专业级的${modeText}主题`,
      delay: 0
    })
  } else {
    steps.push({
      type: 'analyzing' as const,
      content: `📝 使用传统模式生成主题，基于基础配色原则`,
      delay: 0
    })
  }

  // 第三步：艺术风格分析
  if (request.artistStyle) {
    const styleNames = {
      'monet': '莫奈印象派',
      'vangogh': '梵高表现主义',
      'mondrian': '蒙德里安几何',
      'matisse': '马蒂斯野兽派',
      'nordic': '北欧极简',
      'japanese': '日式和风'
    }
    const styleName = styleNames[request.artistStyle as keyof typeof styleNames] || request.artistStyle
    steps.push({
      type: 'analyzing' as const,
      content: `🎨 应用${styleName}艺术风格，调整色彩搭配策略...`,
      delay: 0
    })

    steps.push({
      type: 'thinking' as const,
      content: `💭 正在从${styleName}的色彩理论中提取灵感，确保配色既有艺术感又实用`,
      delay: 0
    })
  }

  // 第四步：组件分析
  const componentCount = request.components.length
  const componentPreview = request.components.slice(0, 3).join('、')
  const moreText = componentCount > 3 ? `等${componentCount}个` : ''

  steps.push({
    type: 'generating' as const,
    content: `🧩 分析${componentPreview}${moreText}组件的样式需求和层次关系`,
    delay: 0
  })

  // 第五步：色彩生成
  steps.push({
    type: 'generating' as const,
    content: `🌈 生成主色调、辅助色和语义色彩，确保视觉和谐统一`,
    delay: 0
  })

  // 第六步：可读性验证
  steps.push({
    type: 'validating' as const,
    content: `👁️ 验证色彩对比度，确保所有文本都清晰可读（对比度≥4.5:1）`,
    delay: 0
  })

  // 第七步：一致性优化
  steps.push({
    type: 'generating' as const,
    content: `⚖️ 优化组件间的视觉一致性，调整hover和active状态`,
    delay: 0
  })

  // 第八步：最终检查
  steps.push({
    type: 'validating' as const,
    content: `🔍 最终检查：确保主题在不同场景下都能完美呈现`,
    delay: 0
  })

  return steps
}
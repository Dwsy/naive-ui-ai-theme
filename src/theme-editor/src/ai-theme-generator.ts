// AI 主题生成核心逻辑

import type { GlobalThemeOverrides } from 'naive-ui'
import { generateComponentPrompt } from './component-theme-config'
import type { AIProviderConfig, ThemeGenerationRequest } from './ai-config'

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

// 生成过程回调接口
export interface GenerationCallbacks {
  onStepStart?: (step: GenerationStep) => void
  onStepComplete?: (step: GenerationStep) => void
  onStepError?: (step: GenerationStep, error: string) => void
  onProgress?: (progress: number) => void
  onRawResponse?: (response: string) => void
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
    const selectedComponentsPrompts = request.components
      .map(componentName => generateComponentPrompt(componentName))
      .filter(prompt => prompt)
      .join('\n\n')

    const systemPrompt = generateSystemPrompt(request.components, selectedComponentsPrompts)
    const userPrompt = generateUserPrompt(request)

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

    if (provider === 'openrouter') {
      result = await callOpenRouterAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
    } else if (provider === 'ollama') {
      result = await callOllamaAPI(systemPrompt, userPrompt, model, callbacks)
    } else if (provider === 'openai') {
      result = await callOpenAIAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
    } else if (provider === 'openai') {
      result = await callOpenAIAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
    } else if (provider === 'deepseek') {
      result = await callDeepSeekAPI(systemPrompt, userPrompt, model, apiKey, callbacks)
    } else {
      throw new Error('不支持的 AI 供应商')
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
 * 调用 Ollama API
 */
async function callOllamaAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  // Combine prompts, ensuring system instructions for JSON output are clear
  const combinedPrompt = `${systemPrompt}\n\n${userPrompt}`

  // Ollama's /api/generate endpoint typically runs on localhost:11434
  const ollamaEndpoint = 'http://localhost:11434/api/generate'

  callbacks?.onStepStart?.({ id: 'ollama_request', title: '向Ollama发送请求', description: `模型: ${model}`, status: 'running', startTime: Date.now() })

  try {
    const response = await fetch(ollamaEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        prompt: combinedPrompt,
        stream: false, // Important: Get the full response at once
        format: 'json' // Request JSON output format if supported by the model
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      callbacks?.onStepError?.({ id: 'ollama_request', title: 'Ollama请求失败', description: errorText, status: 'error', endTime: Date.now() }, errorText)
      throw new Error(`Ollama API 请求失败 (${response.status}): ${errorText}`)
    }

    const data = await response.json()

    if (!data || !data.response) {
      callbacks?.onStepError?.({ id: 'ollama_request', title: 'Ollama响应无效', description: '响应中缺少 response 字段', status: 'error', endTime: Date.now() }, '响应中缺少 response 字段')
      throw new Error('Ollama API 响应无效: 缺少 `response` 字段')
    }

    const content = data.response // This should be the JSON string for the theme

    // 通知原始响应
    callbacks?.onRawResponse?.(content)
    callbacks?.onStepComplete?.({ id: 'ollama_request', title: 'Ollama请求成功', description: '已收到响应', status: 'success', endTime: Date.now(), data: { responseLength: content.length } })

    // 步骤: 解析响应 (moved from callAIAPI for Ollama specific parsing)
    callbacks?.onStepStart?.({ id: 'parse_ollama', title: '解析Ollama响应', description: '解析 AI 返回的主题配置', status: 'running', startTime: Date.now() })

    // 尝试解析 JSON (the 'content' variable is expected to be a JSON string)
    try {
      // Ollama with format: 'json' might return an already parsed JSON object in data.response if the model strictly adheres.
      // However, it's safer to assume data.response is a string that needs parsing,
      // as this is the behavior without format: 'json' or if the model doesn't fully support it.
      let parsed: GlobalThemeOverrides;
      if (typeof content === 'string') {
        // Attempt to strip potential markdown fences if format: 'json' wasn't fully effective
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/);
        if (!jsonMatch) {
          throw new Error('无法从 Ollama 响应中提取 JSON 内容。响应可能不是有效的JSON字符串，或者缺少JSON代码块。');
        }
        // Prioritize the captured group within ```json ... ```, then the general JSON object match.
        const jsonString = jsonMatch[1] || jsonMatch[2];
        parsed = JSON.parse(jsonString);
      } else if (typeof content === 'object') {
        // If content is already an object, use it directly (might happen if format: 'json' works perfectly)
        parsed = content as GlobalThemeOverrides;
      } else {
        throw new Error('Ollama 响应的 response 字段类型未知或非JSON。')
      }

      callbacks?.onStepComplete?.({ id: 'parse_ollama', title: '解析Ollama响应成功', description: '主题配置已解析', status: 'success', endTime: Date.now() })
      return parsed
    } catch (parseError) {
      console.error('Ollama JSON 解析失败:', parseError)
      console.error('原始响应内容:', content)
      const errorMessage = `Ollama 返回的主题格式无效: ${parseError instanceof Error ? parseError.message : '未知解析错误'}`
      callbacks?.onStepError?.({ id: 'parse_ollama', title: '解析Ollama响应失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage)
      throw new Error(errorMessage)
    }
  } catch (error) {
    // Handle network errors or other issues with the fetch call itself
    const errorMessage = error instanceof Error ? error.message : '与Ollama通信时发生未知网络错误'
    callbacks?.onStepError?.({ id: 'ollama_request', title: 'Ollama通信失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage)
    // Re-throw the error to be caught by the main callAIAPI function's error handler
    throw error;
  }
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
  const deepseekEndpoint = 'https://api.deepseek.com/v1/chat/completions';

  callbacks?.onStepStart?.({ id: 'deepseek_request', title: '向DeepSeek发送请求', description: `模型: ${model}`, status: 'running', startTime: Date.now() });

  try {
    const response = await fetch(deepseekEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        // DeepSeek API might support response_format, similar to OpenAI.
        // If it doesn't, the prompt-based JSON instruction is the fallback.
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      callbacks?.onStepError?.({ id: 'deepseek_request', title: 'DeepSeek请求失败', description: errorText, status: 'error', endTime: Date.now() }, errorText);
      throw new Error(`DeepSeek API 请求失败 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      callbacks?.onStepError?.({ id: 'deepseek_request', title: 'DeepSeek响应无效', description: '响应中缺少 content 字段', status: 'error', endTime: Date.now() }, '响应中缺少 content 字段');
      throw new Error('DeepSeek API 响应无效: 响应中缺少 `choices[0].message.content`');
    }

    callbacks?.onRawResponse?.(content);
    callbacks?.onStepComplete?.({ id: 'deepseek_request', title: 'DeepSeek请求成功', description: '已收到响应', status: 'success', endTime: Date.now(), data: { responseLength: content.length } });

    callbacks?.onStepStart?.({ id: 'parse_deepseek', title: '解析DeepSeek响应', description: '解析 AI 返回的主题配置', status: 'running', startTime: Date.now() });

    try {
      let parsed: GlobalThemeOverrides;
      if (typeof content === 'string') {
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/);
        if (jsonMatch && (jsonMatch[1] || jsonMatch[2])) {
          const jsonString = jsonMatch[1] || jsonMatch[2];
          parsed = JSON.parse(jsonString);
        } else {
          parsed = JSON.parse(content);
        }
      } else if (typeof content === 'object') {
        parsed = content as GlobalThemeOverrides;
      } else {
        throw new Error('DeepSeek 响应的 content 字段类型未知或非JSON。');
      }

      callbacks?.onStepComplete?.({ id: 'parse_deepseek', title: '解析DeepSeek响应成功', description: '主题配置已解析', status: 'success', endTime: Date.now() });
      return parsed;
    } catch (parseError) {
      console.error('DeepSeek JSON 解析失败:', parseError);
      console.error('原始响应内容:', content);
      const errorMessage = `DeepSeek 返回的主题格式无效: ${parseError instanceof Error ? parseError.message : '未知解析错误'}`;
      callbacks?.onStepError?.({ id: 'parse_deepseek', title: '解析DeepSeek响应失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '与DeepSeek通信时发生未知网络错误';
    callbacks?.onStepError?.({ id: 'deepseek_request', title: 'DeepSeek通信失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage);
    throw error;
  }
}

/**
 * 调用 OpenAI API
 */
async function callOpenAIAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

  callbacks?.onStepStart?.({ id: 'openai_request', title: '向OpenAI发送请求', description: `模型: ${model}`, status: 'running', startTime: Date.now() });

  try {
    const response = await fetch(openaiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" } // Request JSON output for compatible models
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      callbacks?.onStepError?.({ id: 'openai_request', title: 'OpenAI请求失败', description: errorText, status: 'error', endTime: Date.now() }, errorText);
      throw new Error(`OpenAI API 请求失败 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      callbacks?.onStepError?.({ id: 'openai_request', title: 'OpenAI响应无效', description: '响应中缺少 content 字段', status: 'error', endTime: Date.now() }, '响应中缺少 content 字段');
      throw new Error('OpenAI API 响应无效: 响应中缺少 `choices[0].message.content`');
    }

    callbacks?.onRawResponse?.(content);
    callbacks?.onStepComplete?.({ id: 'openai_request', title: 'OpenAI请求成功', description: '已收到响应', status: 'success', endTime: Date.now(), data: { responseLength: content.length } });

    callbacks?.onStepStart?.({ id: 'parse_openai', title: '解析OpenAI响应', description: '解析 AI 返回的主题配置', status: 'running', startTime: Date.now() });

    try {
      // content should be a JSON string if response_format: { type: "json_object" } worked
      // or if the model correctly followed prompt instructions.
      let parsed: GlobalThemeOverrides;
      if (typeof content === 'string') {
        // Attempt to strip potential markdown fences as a fallback,
        // though response_format: { type: "json_object" } should prevent this.
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/);
        if (jsonMatch && (jsonMatch[1] || jsonMatch[2])) {
          const jsonString = jsonMatch[1] || jsonMatch[2];
          parsed = JSON.parse(jsonString);
        } else {
          // If no markdown, try parsing directly, assuming it's a plain JSON string
          parsed = JSON.parse(content);
        }
      } else if (typeof content === 'object') {
        // This case might occur if the API directly returns a parsed object in the content field (less common for this specific API field)
        parsed = content as GlobalThemeOverrides;
      } else {
        throw new Error('OpenAI 响应的 content 字段类型未知或非JSON。');
      }

      callbacks?.onStepComplete?.({ id: 'parse_openai', title: '解析OpenAI响应成功', description: '主题配置已解析', status: 'success', endTime: Date.now() });
      return parsed;
    } catch (parseError) {
      console.error('OpenAI JSON 解析失败:', parseError);
      console.error('原始响应内容:', content);
      const errorMessage = `OpenAI 返回的主题格式无效: ${parseError instanceof Error ? parseError.message : '未知解析错误'}`;
      callbacks?.onStepError?.({ id: 'parse_openai', title: '解析OpenAI响应失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '与OpenAI通信时发生未知网络错误';
    callbacks?.onStepError?.({ id: 'openai_request', title: 'OpenAI通信失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage);
    throw error;
  }
}

/**
 * 调用 OpenAI API
 */
async function callOpenAIAPI(
  systemPrompt: string,
  userPrompt: string,
  model: string,
  apiKey: string,
  callbacks?: GenerationCallbacks
): Promise<GlobalThemeOverrides> {
  const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

  callbacks?.onStepStart?.({ id: 'openai_request', title: '向OpenAI发送请求', description: `模型: ${model}`, status: 'running', startTime: Date.now() });

  try {
    const response = await fetch(openaiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" } // Request JSON output
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      callbacks?.onStepError?.({ id: 'openai_request', title: 'OpenAI请求失败', description: errorText, status: 'error', endTime: Date.now() }, errorText);
      throw new Error(`OpenAI API 请求失败 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      callbacks?.onStepError?.({ id: 'openai_request', title: 'OpenAI响应无效', description: '响应中缺少 content 字段', status: 'error', endTime: Date.now() }, '响应中缺少 content 字段');
      throw new Error('OpenAI API 响应无效: 响应中缺少 `choices[0].message.content`');
    }

    callbacks?.onRawResponse?.(content);
    callbacks?.onStepComplete?.({ id: 'openai_request', title: 'OpenAI请求成功', description: '已收到响应', status: 'success', endTime: Date.now(), data: { responseLength: content.length } });

    callbacks?.onStepStart?.({ id: 'parse_openai', title: '解析OpenAI响应', description: '解析 AI 返回的主题配置', status: 'running', startTime: Date.now() });

    try {
      // content should be a JSON string if response_format: { type: "json_object" } worked
      let parsed: GlobalThemeOverrides;
      if (typeof content === 'string') {
        // Attempt to strip potential markdown fences as a fallback
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/);
        if (jsonMatch && (jsonMatch[1] || jsonMatch[2])) {
          const jsonString = jsonMatch[1] || jsonMatch[2];
          parsed = JSON.parse(jsonString);
        } else {
          // If no markdown, try parsing directly, assuming it might be a plain JSON string
          parsed = JSON.parse(content);
        }
      } else if (typeof content === 'object') {
        // If it's already an object (less likely for OpenAI's current API for this field but good to check)
        parsed = content as GlobalThemeOverrides;
      } else {
        throw new Error('OpenAI 响应的 content 字段类型未知或非JSON。');
      }

      callbacks?.onStepComplete?.({ id: 'parse_openai', title: '解析OpenAI响应成功', description: '主题配置已解析', status: 'success', endTime: Date.now() });
      return parsed;
    } catch (parseError) {
      console.error('OpenAI JSON 解析失败:', parseError);
      console.error('原始响应内容:', content);
      const errorMessage = `OpenAI 返回的主题格式无效: ${parseError instanceof Error ? parseError.message : '未知解析错误'}`;
      callbacks?.onStepError?.({ id: 'parse_openai', title: '解析OpenAI响应失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '与OpenAI通信时发生未知网络错误';
    callbacks?.onStepError?.({ id: 'openai_request', title: 'OpenAI通信失败', description: errorMessage, status: 'error', endTime: Date.now() }, errorMessage);
    throw error;
  }
}

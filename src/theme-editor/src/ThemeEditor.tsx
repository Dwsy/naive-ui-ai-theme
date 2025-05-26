import { cloneDeep, merge } from 'lodash-es'
import {
  computed,
  defineComponent,
  Fragment,
  h,
  inject,
  ref,
  toRaw,
  watch
} from 'vue'
import { useLocale } from '../../_mixins'
import { download, lockHtmlScrollRightCompensationRef } from '../../_utils'
import { NButton } from '../../button'
import { NCheckbox, NCheckboxGroup } from '../../checkbox'
import { NCollapse, NCollapseItem } from '../../collapse'
import { NColorPicker } from '../../color-picker'
import {
  type GlobalTheme,
  type GlobalThemeOverrides,
  NConfigProvider
} from '../../config-provider'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { NDivider } from '../../divider'
import { NElement } from '../../element'
import { NEmpty } from '../../empty'
import { NGi, NGrid } from '../../grid'
import { NIcon } from '../../icon'
import { NInput } from '../../input'
import { NPopover } from '../../popover'
import { NSelect } from '../../select'
import { NSpace } from '../../space'
import { NTabs, NTabPane } from '../../tabs'
import { lightTheme } from '../../themes'
import { MaximizeIcon } from './MaximizeIcon'
import { MinimizeIcon } from './MinimizeIcon'
import {
  generateComponentPrompt
} from './component-theme-config'

// AI 配置数据结构
interface AIProviderConfig {
  provider: string
  apiKey: string
  model: string
}

// 主题生成请求数据结构
interface ThemeGenerationRequest {
  prompt: string
  style?: string
  components: string[]
}

// 生成记录数据结构
interface ThemeGenerationRecord {
  id: string
  timestamp: number
  prompt: string
  style?: string
  components: string[]
  themeOverrides: GlobalThemeOverrides
}

// 预设风格选项
const PRESET_STYLES = [
  { label: '暗黑', value: 'dark' },
  { label: '明亮', value: 'light' },
  { label: '柔和', value: 'soft' },
  { label: '鲜艳', value: 'vibrant' },
  { label: '科技', value: 'tech' },
  { label: '自然', value: 'nature' }
]

// AI 供应商选项
const AI_PROVIDERS = [
  { label: 'OpenRouter.AI', value: 'openrouter' },
  { label: 'OpenAI', value: 'openai' },
  { label: 'Claude', value: 'claude' }
]

// 免费 OpenRouter 模型选项
const FREE_OPENROUTER_MODELS = [
  { label: 'Google Gemini 2.5 Pro Exp', value: 'google/gemini-2.5-pro-exp-03-25' },
  { label: 'Google Gemini 2.0 Flash Exp (Free)', value: 'google/gemini-2.0-flash-exp:free' },
  { label: 'Meta Llama 4 Scout (Free)', value: 'meta-llama/llama-4-scout:free' },
  { label: 'TNG DeepSeek R1T Chimera (Free)', value: 'tngtech/deepseek-r1t-chimera:free' },
  { label: 'Microsoft MAI DS R1 (Free)', value: 'microsoft/mai-ds-r1:free' },
  { label: 'DeepSeek Chat V3 (Free)', value: 'deepseek/deepseek-chat-v3-0324:free' },
  { label: 'DeepSeek R1 (Free)', value: 'deepseek/deepseek-r1:free' },
  { label: 'Meta Llama 4 Maverick (Free)', value: 'meta-llama/llama-4-maverick:free' },
  { label: 'Qwen 3 235B (Free)', value: 'qwen/qwen3-235b-a22b:free' },
  { label: 'Claude 3.5 Sonnet (付费)', value: 'anthropic/claude-3.5-sonnet' }
]

function renderColorWandIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1em', height: '1em', color: 'currentColor' }}
    >
      <path
        d="M13.5 1C13.7761 1 14 1.22386 14 1.5V2H14.5C14.7761 2 15 2.22386 15 2.5C15 2.77614 14.7761 3 14.5 3H14V3.5C14 3.77614 13.7761 4 13.5 4C13.2239 4 13 3.77614 13 3.5V3H12.5C12.2239 3 12 2.77614 12 2.5C12 2.22386 12.2239 2 12.5 2H13V1.5C13 1.22386 13.2239 1 13.5 1Z"
        fill="currentColor"
      >
      </path>
      <path
        d="M3.5 3C3.77615 3 4 3.22386 4 3.5V4H4.5C4.77615 4 5 4.22386 5 4.5C5 4.77614 4.77615 5 4.5 5H4V5.5C4 5.77614 3.77615 6 3.5 6C3.22386 6 3 5.77614 3 5.5V5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H3V3.5C3 3.22386 3.22386 3 3.5 3Z"
        fill="currentColor"
      >
      </path>
      <path
        d="M12.5 12C12.7761 12 13 11.7761 13 11.5C13 11.2239 12.7761 11 12.5 11H12V10.5C12 10.2239 11.7761 10 11.5 10C11.2239 10 11 10.2239 11 10.5V11H10.5C10.2239 11 10 11.2239 10 11.5C10 11.7761 10.2239 12 10.5 12H11V12.5C11 12.7761 11.2239 13 11.5 13C11.7761 13 12 12.7761 12 12.5V12H12.5Z"
        fill="currentColor"
      >
      </path>
      <path
        d="M8.72956 4.56346C9.4771 3.81592 10.6891 3.81592 11.4367 4.56347C12.1842 5.31102 12.1842 6.52303 11.4367 7.27058L4.26679 14.4404C3.51924 15.1879 2.30723 15.1879 1.55968 14.4404C0.812134 13.6928 0.812138 12.4808 1.55969 11.7333L8.72956 4.56346ZM8.25002 6.4572L2.26679 12.4404C1.90977 12.7974 1.90977 13.3763 2.26679 13.7333C2.62381 14.0903 3.20266 14.0903 3.55968 13.7333L9.54292 7.75009L8.25002 6.4572ZM10.25 7.04299L10.7295 6.56347C11.0866 6.20645 11.0866 5.6276 10.7296 5.27057C10.3725 4.91355 9.79368 4.91355 9.43666 5.27057L8.95713 5.7501L10.25 7.04299Z"
        fill="currentColor"
      >
      </path>
    </svg>
  )
}

// button colorOpacitySecondary var is not color
function showColorPicker(key: string): boolean {
  if (key.includes('pacity'))
    return false
  if (key.includes('color') || key.includes('Color'))
    return true
  return false
}

export default defineComponent({
  name: 'ThemeEditor',
  inheritAttrs: false,
  setup() {
    const isMaximized = ref<boolean>(false)
    const fileInputRef = ref<HTMLInputElement | null>(null)
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const overridesRef = ref<any>(
      JSON.parse((localStorage['naive-ui-theme-overrides'] as string) || '{}')
    )
    const theme = computed(() => {
      const mergedTheme: GlobalTheme
        = NConfigProvider?.mergedThemeRef.value || lightTheme
      const mergedThemeOverrides
        = NConfigProvider?.mergedThemeOverridesRef.value
      const common = merge(
        {},
        mergedTheme.common || lightTheme.common,
        mergedThemeOverrides?.common,
        overridesRef.value.common || {}
      ) as NonNullable<GlobalTheme['common']>
      const overrides: GlobalThemeOverrides = {
        common
      }
      for (const key of Object.keys(lightTheme) as Array<
        Exclude<keyof typeof lightTheme, 'name'>
      >) {
        if (key === 'common') {
          continue
        }
        ;(overrides as any)[key] = (mergedTheme[key]?.self?.(common)
          || lightTheme[key].self?.(common)) as any
        // There (last line) we must use as any, nor ts 2590 will be raised since the union
        // is too complex
        if (mergedThemeOverrides && (overrides as any)[key]) {
          merge((overrides as any)[key], mergedThemeOverrides[key])
        }
      }
      return overrides
    })
    const themeCommonDefaultRef = computed(() => {
      return NConfigProvider?.mergedThemeRef.value?.common || lightTheme.common
    })
    const showPanelRef = ref(false)
    const tempOverridesRef = ref<any>(
      JSON.parse((localStorage['naive-ui-theme-overrides'] as string) || '{}')
    )
    const varNamePatternRef = ref('')
    const compNamePatternRef = ref('')
    const tempVarNamePatternRef = ref('')
    const tempCompNamePatternRef = ref('')

    // AI 功能相关状态
    const aiConfigRef = ref<AIProviderConfig>({
      provider: 'openrouter',
      apiKey: localStorage['naive-ui-ai-config-apikey'] || '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',
      model: localStorage['naive-ui-ai-config-model'] || 'google/gemini-2.0-flash-exp:free'
    })
    const aiPromptRef = ref('')
    const aiStyleRef = ref<string | null>(null)
    const selectedComponentsRef = ref<string[]>([])
    const isGeneratingRef = ref(false)
    const generationRecordsRef = ref<ThemeGenerationRecord[]>(
      JSON.parse(localStorage['naive-ui-theme-generation-records'] || '[]')
    )
    const activeTabRef = ref('config')
    function applyTempOverrides(): void {
      overridesRef.value = cloneDeep(toRaw(tempOverridesRef.value))
    }
    function setTempOverrides(
      compName: string,
      varName: string,
      value: string
    ): void {
      const { value: tempOverrides } = tempOverridesRef
      if (!(compName in tempOverrides))
        tempOverrides[compName] = {}
      const compOverrides = tempOverrides[compName]
      if (value) {
        compOverrides[varName] = value
      }
      else {
        delete compOverrides[varName]
      }
    }
    function handleClearAllClick(): void {
      tempOverridesRef.value = {}
      overridesRef.value = {}
    }
    function handleImportClick(): void {
      const { value: fileInput } = fileInputRef
      if (!fileInput)
        return
      fileInput.click()
    }
    function toggleMaximized(): void {
      isMaximized.value = !isMaximized.value
    }
    function handleInputFileChange(): void {
      const { value: fileInput } = fileInputRef
      if (!fileInput)
        return
      const fileList = fileInput.files
      const file = fileList?.[0]
      if (!file)
        return
      file
        .text()
        .then((value) => {
          overridesRef.value = JSON.parse(value)
          tempOverridesRef.value = JSON.parse(value)
        })
        .catch((e) => {
          // eslint-disable-next-line no-alert
          alert('Imported File is Invalid')
          console.error(e)
        })
        .finally(() => {
          fileInput.value = ''
        })
    }
    function handleExportClick(): void {
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(overridesRef.value, undefined, 2)])
      )
      download(url, 'naive-ui-theme-overrides.json')
      URL.revokeObjectURL(url)
    }

    // AI 功能相关方法
    function saveAIConfig(): void {
      localStorage['naive-ui-ai-config-apikey'] = aiConfigRef.value.apiKey
      localStorage['naive-ui-ai-config-provider'] = aiConfigRef.value.provider
      localStorage['naive-ui-ai-config-model'] = aiConfigRef.value.model
    }

    function getAllComponentNames(): string[] {
      return Object.keys(theme.value).filter(key => key !== 'common')
    }

    function handleSelectAllComponents(): void {
      const allComponents = getAllComponentNames()
      if (selectedComponentsRef.value.length === allComponents.length) {
        selectedComponentsRef.value = []
      } else {
        selectedComponentsRef.value = [...allComponents]
      }
    }

    async function generateThemeWithAI(): Promise<void> {
      if (!aiConfigRef.value.apiKey) {
        // eslint-disable-next-line no-alert
        alert('请输入 API 密钥')
        return
      }
      if (!aiPromptRef.value.trim()) {
        // eslint-disable-next-line no-alert
        alert('请输入提示词')
        return
      }
      if (selectedComponentsRef.value.length === 0) {
        // eslint-disable-next-line no-alert
        alert('请至少选择一个组件')
        return
      }

      isGeneratingRef.value = true
      try {
        // 构建 AI 请求
        const request: ThemeGenerationRequest = {
          prompt: aiPromptRef.value,
          style: aiStyleRef.value || undefined,
          components: selectedComponentsRef.value
        }

        // 调用 AI API 生成主题
        const generatedTheme = await callAIAPI(request)

        // 应用生成的主题
        tempOverridesRef.value = { ...tempOverridesRef.value, ...generatedTheme }
        applyTempOverrides()

        // 保存生成记录
        const record: ThemeGenerationRecord = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          prompt: aiPromptRef.value,
          style: aiStyleRef.value || undefined,
          components: [...selectedComponentsRef.value],
          themeOverrides: generatedTheme
        }
        generationRecordsRef.value.unshift(record)

        // 限制记录数量为20条
        if (generationRecordsRef.value.length > 20) {
          generationRecordsRef.value = generationRecordsRef.value.slice(0, 20)
        }

        localStorage['naive-ui-theme-generation-records'] = JSON.stringify(generationRecordsRef.value)

        // eslint-disable-next-line no-alert
        alert('主题生成成功！')
      } catch (error) {
        console.error('AI 主题生成失败:', error)
        // eslint-disable-next-line no-alert
        alert('主题生成失败，请检查网络连接和 API 配置')
      } finally {
        isGeneratingRef.value = false
      }
    }

    async function callAIAPI(request: ThemeGenerationRequest): Promise<GlobalThemeOverrides> {
      const { provider, apiKey, model } = aiConfigRef.value

      // 生成选中组件的详细配置说明
      const selectedComponentsPrompts = request.components
        .map(componentName => generateComponentPrompt(componentName))
        .filter(prompt => prompt)
        .join('\n\n')

      // 构建系统提示词
      const systemPrompt = `你是一个专业的 UI 主题设计师，精通 Naive UI 组件库的主题系统。请根据用户的描述生成高质量的主题样式配置。

## 用户选择的组件
${request.components.join(', ')}
${request.style ? `预设风格: ${request.style}` : ''}

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

      const userPrompt = `## 任务要求
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

      if (provider === 'openrouter') {
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
            max_tokens: 2000
          })
        })

        if (!response.ok) {
          throw new Error(`API 请求失败: ${response.status}`)
        }

        const data = await response.json()
        const content = data.choices[0]?.message?.content

        if (!content) {
          throw new Error('AI 返回内容为空')
        }

        // 尝试解析 JSON
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/)
          if (!jsonMatch) {
            throw new Error('无法从 AI 响应中提取 JSON')
          }
          return JSON.parse(jsonMatch[0])
        } catch (parseError) {
          console.error('JSON 解析失败:', parseError)
          throw new Error('AI 返回的主题格式无效')
        }
      }

      throw new Error('不支持的 AI 供应商')
    }

    function applyGenerationRecord(record: ThemeGenerationRecord): void {
      tempOverridesRef.value = { ...tempOverridesRef.value, ...record.themeOverrides }
      applyTempOverrides()
    }

    function formatTimestamp(timestamp: number): string {
      return new Date(timestamp).toLocaleString()
    }

    watch(overridesRef, (value) => {
      localStorage['naive-ui-theme-overrides'] = JSON.stringify(value)
    })
    return {
      locale: useLocale('ThemeEditor').localeRef,
      themeCommonDefault: themeCommonDefaultRef,
      theme,
      showPanel: showPanelRef,
      tempOverrides: tempOverridesRef,
      overrides: overridesRef,
      compNamePattern: compNamePatternRef,
      tempCompNamePattern: tempCompNamePatternRef,
      varNamePattern: varNamePatternRef,
      tempVarNamePattern: tempVarNamePatternRef,
      fileInputRef,
      applyTempOverrides,
      setTempOverrides,
      handleClearAllClick,
      handleExportClick,
      handleImportClick,
      handleInputFileChange,
      toggleMaximized,
      isMaximized,
      // AI 功能相关
      aiConfig: aiConfigRef,
      aiPrompt: aiPromptRef,
      aiStyle: aiStyleRef,
      selectedComponents: selectedComponentsRef,
      isGenerating: isGeneratingRef,
      generationRecords: generationRecordsRef,
      activeTab: activeTabRef,
      saveAIConfig,
      getAllComponentNames,
      handleSelectAllComponents,
      generateThemeWithAI,
      applyGenerationRecord,
      formatTimestamp,
      PRESET_STYLES,
      AI_PROVIDERS,
      FREE_OPENROUTER_MODELS
    }
  },
  render() {
    return (
      <NConfigProvider themeOverrides={this.overrides}>
        {{
          default: () => [
            <NPopover
              scrollable
              arrowPointToCenter
              trigger="manual"
              show={this.showPanel}
              displayDirective="show"
              placement="top-end"
              style={{
                width: this.isMaximized ? 'calc(100vw - 80px)' : '588px',
                height: 'calc(100vh - 200px)',
                padding: 0
              }}
            >
              {{
                trigger: () => (
                  <NElement
                    style={[
                      {
                        position: 'fixed',
                        zIndex: 10,
                        bottom: '40px',
                        right: `calc(40px + ${lockHtmlScrollRightCompensationRef.value})`,
                        width: '44px',
                        height: '44px',
                        fontSize: '26px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: 'var(--popover-color)',
                        color: 'var(--text-color-2)',
                        transition:
                          'color .3s var(--cubic-bezier-ease-in-out), background-color .3s var(--cubic-bezier-ease-in-out), box-shadow .3s var(--cubic-bezier-ease-in-out)',
                        boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
                        cursor: 'pointer'
                      },
                      this.$attrs.style
                    ]}
                    // @ts-expect-error We use ts-ignore for vue-tsc, since it
                    // seems to patch native event for vue components
                    onClick={() => {
                      this.showPanel = !this.showPanel
                    }}
                  >
                    {{ default: renderColorWandIcon }}
                  </NElement>
                ),
                default: () => (
                  <>
                    <input
                      type="file"
                      ref="fileInputRef"
                      style={{
                        display: 'block',
                        width: 0,
                        height: 0,
                        visibility: 'hidden'
                      }}
                      onChange={this.handleInputFileChange}
                    />
                    <NSpace vertical>
                      {{
                        default: () => [
                          <NSpace
                            align="center"
                            justify="space-between"
                            style={{
                              marginBottom: '8px',
                              fontSize: '18px',
                              fontWeight: 500
                            }}
                          >
                            {{
                              default: () => (
                                <>
                                  <span>{this.locale.title}</span>
                                  <NButton
                                    onClick={this.toggleMaximized}
                                    secondary
                                    circle
                                    size="tiny"
                                  >
                                    {{
                                      icon: () => (
                                        <NIcon
                                          component={
                                            this.isMaximized
                                              ? MinimizeIcon
                                              : MaximizeIcon
                                          }
                                        />
                                      )
                                    }}
                                  </NButton>
                                </>
                              )
                            }}
                          </NSpace>,
                          this.locale.filterCompName,
                          <NInput
                            onChange={() => {
                              this.compNamePattern = this.tempCompNamePattern
                            }}
                            onInput={(value: string) => {
                              this.tempCompNamePattern = value
                            }}
                            value={this.tempCompNamePattern}
                            placeholder={this.locale.filterCompName}
                          />,
                          this.locale.filterVarName,
                          <NInput
                            onChange={(value: string) => {
                              this.varNamePattern = value
                            }}
                            onInput={(value: string) => {
                              this.tempVarNamePattern = value
                            }}
                            value={this.tempVarNamePattern}
                            placeholder={this.locale.filterVarName}
                          />,
                          <NButton
                            size="small"
                            onClick={() => {
                              this.compNamePattern = ''
                              this.varNamePattern = ''
                              this.tempCompNamePattern = ''
                              this.tempVarNamePattern = ''
                            }}
                            block
                          >
                            {{ default: () => this.locale.clearSearch }}
                          </NButton>,
                          <NButton
                            size="small"
                            onClick={this.handleClearAllClick}
                            block
                          >
                            {{
                              default: () => this.locale.clearAllVars
                            }}
                          </NButton>,
                          <NSpace itemStyle={{ flex: 1 }}>
                            {{
                              default: () => (
                                <>
                                  <NButton
                                    block
                                    size="small"
                                    onClick={this.handleImportClick}
                                  >
                                    {{
                                      default: () => this.locale.import
                                    }}
                                  </NButton>
                                  <NButton
                                    block
                                    size="small"
                                    onClick={this.handleExportClick}
                                  >
                                    {{
                                      default: () => this.locale.export
                                    }}
                                  </NButton>
                                </>
                              )
                            }}
                          </NSpace>
                        ]
                      }}
                    </NSpace>
                    <NDivider />

                    {/* AI 生成主题功能 */}
                    <NCollapse>
                      {{
                        default: () => (
                          <NCollapseItem title={this.locale.aiGenerate} name="ai-generate">
                            {{
                              default: () => (
                                <NTabs value={this.activeTab} onUpdateValue={(value: string) => { this.activeTab = value }}>
                                  {{
                                    default: () => [
                                      <NTabPane name="config" tab={this.locale.aiProviderConfig}>
                                        {{
                                          default: () => (
                                            <NSpace vertical>
                                              {{
                                                default: () => [
                                                  <div>
                                                    <div style={{ marginBottom: '8px' }}>{this.locale.provider}</div>
                                                    <NSelect
                                                      value={this.aiConfig.provider}
                                                      options={this.AI_PROVIDERS}
                                                      onUpdateValue={(value: string) => {
                                                        this.aiConfig.provider = value
                                                      }}
                                                    />
                                                  </div>,
                                                  <div>
                                                    <div style={{ marginBottom: '8px' }}>{this.locale.apiKey}</div>
                                                    <NInput
                                                      value={this.aiConfig.apiKey}
                                                      type="password"
                                                      placeholder={this.locale.apiKeyRequired}
                                                      onUpdateValue={(value: string) => {
                                                        this.aiConfig.apiKey = value
                                                      }}
                                                    />
                                                  </div>,
                                                  <div>
                                                    <div style={{ marginBottom: '8px' }}>{this.locale.model}</div>
                                                    <NSelect
                                                      value={this.aiConfig.model}
                                                      filterable
                                                      placeholder="选择模型"
                                                      options={this.FREE_OPENROUTER_MODELS}
                                                      onUpdateValue={(value: string) => {
                                                        this.aiConfig.model = value
                                                      }}
                                                    />
                                                  </div>,
                                                  <NButton
                                                    block
                                                    type="primary"
                                                    onClick={this.saveAIConfig}
                                                  >
                                                    {{ default: () => this.locale.saveConfig }}
                                                  </NButton>
                                                ]
                                              }}
                                            </NSpace>
                                          )
                                        }}
                                      </NTabPane>,
                                      <NTabPane name="generate" tab={this.locale.themeGeneration}>
                                        {{
                                          default: () => (
                                            <NSpace vertical>
                                              {{
                                                default: () => [
                                                  <div>
                                                    <div style={{ marginBottom: '8px' }}>提示词</div>
                                                    <NInput
                                                      value={this.aiPrompt}
                                                      type="textarea"
                                                      placeholder={this.locale.promptPlaceholder}
                                                      rows={3}
                                                      onUpdateValue={(value: string) => {
                                                        this.aiPrompt = value
                                                      }}
                                                    />
                                                  </div>,
                                                  <div>
                                                    <div style={{ marginBottom: '8px' }}>{this.locale.presetStyle}</div>
                                                    <NSelect
                                                      value={this.aiStyle}
                                                      clearable
                                                      placeholder="选择预设风格（可选）"
                                                      options={this.PRESET_STYLES}
                                                      onUpdateValue={(value: string | null) => {
                                                        this.aiStyle = value
                                                      }}
                                                    />
                                                  </div>,
                                                  <div>
                                                    <div style={{ marginBottom: '8px' }}>{this.locale.selectComponents}</div>
                                                    <NSpace style={{ marginBottom: '8px' }}>
                                                      {{
                                                        default: () => [
                                                          <NCheckbox
                                                            checked={this.selectedComponents.length === this.getAllComponentNames().length}
                                                            indeterminate={this.selectedComponents.length > 0 && this.selectedComponents.length < this.getAllComponentNames().length}
                                                            onUpdateChecked={this.handleSelectAllComponents}
                                                          >
                                                            {{ default: () => this.locale.selectAll }}
                                                          </NCheckbox>
                                                        ]
                                                      }}
                                                    </NSpace>
                                                    <NCheckboxGroup
                                                      value={this.selectedComponents}
                                                      onUpdateValue={(value: (string | number)[]) => {
                                                        this.selectedComponents = value as string[]
                                                      }}
                                                    >
                                                      {{
                                                        default: () => (
                                                          <NGrid cols={this.isMaximized ? 4 : 2} xGap={12} yGap={8}>
                                                            {{
                                                              default: () => this.getAllComponentNames().map(name => (
                                                                <NGi>
                                                                  {{
                                                                    default: () => (
                                                                      <NCheckbox value={name}>
                                                                        {{ default: () => name }}
                                                                      </NCheckbox>
                                                                    )
                                                                  }}
                                                                </NGi>
                                                              ))
                                                            }}
                                                          </NGrid>
                                                        )
                                                      }}
                                                    </NCheckboxGroup>
                                                  </div>,
                                                  <NButton
                                                    block
                                                    type="primary"
                                                    loading={this.isGenerating}
                                                    disabled={!this.aiConfig.apiKey || !this.aiPrompt.trim() || this.selectedComponents.length === 0}
                                                    onClick={this.generateThemeWithAI}
                                                  >
                                                    {{ default: () => this.isGenerating ? this.locale.generating : this.locale.generateTheme }}
                                                  </NButton>
                                                ]
                                              }}
                                            </NSpace>
                                          )
                                        }}
                                      </NTabPane>,
                                      <NTabPane name="history" tab={this.locale.generationHistory}>
                                        {{
                                          default: () => (
                                            <NSpace vertical>
                                              {{
                                                default: () => this.generationRecords.length === 0
                                                  ? [<NEmpty description={this.locale.noRecords} />]
                                                  : this.generationRecords.map(record => (
                                                      <div
                                                        key={record.id}
                                                        style={{
                                                          padding: '12px',
                                                          border: '1px solid var(--border-color)',
                                                          borderRadius: '6px',
                                                          backgroundColor: 'var(--card-color)'
                                                        }}
                                                      >
                                                        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--text-color-3)' }}>
                                                          {this.locale.generatedAt}: {this.formatTimestamp(record.timestamp)}
                                                        </div>
                                                        <div style={{ marginBottom: '8px', fontWeight: 500 }}>
                                                          {record.prompt}
                                                        </div>
                                                        {record.style && (
                                                          <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--text-color-2)' }}>
                                                            风格: {record.style}
                                                          </div>
                                                        )}
                                                        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--text-color-2)' }}>
                                                          组件: {record.components.join(', ')}
                                                        </div>
                                                        <NButton
                                                          size="small"
                                                          type="primary"
                                                          onClick={() => this.applyGenerationRecord(record)}
                                                        >
                                                          {{ default: () => this.locale.apply }}
                                                        </NButton>
                                                      </div>
                                                    ))
                                              }}
                                            </NSpace>
                                          )
                                        }}
                                      </NTabPane>
                                    ]
                                  }}
                                </NTabs>
                              )
                            }}
                          </NCollapseItem>
                        )
                      }}
                    </NCollapse>

                    <NDivider />
                    <NCollapse>
                      {{
                        default: () => {
                          const { theme, compNamePattern, varNamePattern }
                            = this
                          const themeKeys = Object.keys(theme)
                          const compNamePatternLower
                            = compNamePattern.toLowerCase()
                          const varNamePatternLower
                            = varNamePattern.toLowerCase()
                          let filteredItemsCount = 0
                          const collapsedItems = themeKeys
                            .filter((themeKey) => {
                              return themeKey
                                .toLowerCase()
                                .includes(compNamePatternLower)
                            })
                            .map((themeKey) => {
                              const componentTheme:
                                | Record<string, string>
                                | undefined
                                = themeKey === 'common'
                                  ? this.themeCommonDefault
                                  : (theme as any)[themeKey]
                              if (componentTheme === undefined) {
                                return null
                              }
                              const varKeys = Object.keys(
                                componentTheme
                              ).filter((key) => {
                                return (
                                  key !== 'name'
                                  && key
                                    .toLowerCase()
                                    .includes(varNamePatternLower)
                                )
                              })
                              if (!varKeys.length) {
                                return null
                              }
                              filteredItemsCount += 1
                              return (
                                <NCollapseItem title={themeKey} name={themeKey}>
                                  {{
                                    default: () => (
                                      <NGrid
                                        xGap={32}
                                        yGap={16}
                                        responsive="screen"
                                        cols={
                                          this.isMaximized
                                            ? '1 xs:1 s:2 m:3 l:4'
                                            : 1
                                        }
                                      >
                                        {{
                                          default: () =>
                                            varKeys.map(varKey => (
                                              <NGi>
                                                {{
                                                  default: () => (
                                                    <>
                                                      <div
                                                        key={`${varKey}Label`}
                                                        style={{
                                                          wordBreak:
                                                            'break-word'
                                                        }}
                                                      >
                                                        {varKey}
                                                      </div>
                                                      {showColorPicker(
                                                        varKey
                                                      ) ? (
                                                            <NColorPicker
                                                              key={varKey}
                                                              modes={['rgb', 'hex']}
                                                              value={
                                                                this
                                                                  .tempOverrides?.[
                                                                    themeKey
                                                                  ]?.[varKey]
                                                                  || componentTheme[
                                                                    varKey
                                                                  ]
                                                              }
                                                              onComplete={
                                                                this
                                                                  .applyTempOverrides
                                                              }
                                                              onUpdateValue={(
                                                                value: string
                                                              ) => {
                                                                this.setTempOverrides(
                                                                  themeKey,
                                                                  varKey,
                                                                  value
                                                                )
                                                              }}
                                                            >
                                                              {{
                                                                action: () => (
                                                                  <NButton
                                                                    size="small"
                                                                    disabled={
                                                                      componentTheme[
                                                                        varKey
                                                                      ]
                                                                      === this
                                                                        .tempOverrides?.[
                                                                          themeKey
                                                                        ]?.[varKey]
                                                                    }
                                                                    onClick={() => {
                                                                      this.setTempOverrides(
                                                                        themeKey,
                                                                        varKey,
                                                                        componentTheme[
                                                                          varKey
                                                                        ]
                                                                      )
                                                                      this.applyTempOverrides()
                                                                    }}
                                                                  >
                                                                    {{
                                                                      default: () =>
                                                                        this.locale
                                                                          .restore
                                                                    }}
                                                                  </NButton>
                                                                )
                                                              }}
                                                            </NColorPicker>
                                                          ) : (
                                                            <NInput
                                                              key={varKey}
                                                              onChange={
                                                                this
                                                                  .applyTempOverrides
                                                              }
                                                              onUpdateValue={(
                                                                value: string
                                                              ) => {
                                                                this.setTempOverrides(
                                                                  themeKey,
                                                                  varKey,
                                                                  value
                                                                )
                                                              }}
                                                              value={
                                                                this
                                                                  .tempOverrides?.[
                                                                    themeKey
                                                                  ]?.[varKey] || ''
                                                              }
                                                              placeholder={
                                                                componentTheme[
                                                                  varKey
                                                                ]
                                                              }
                                                            />
                                                          )}
                                                    </>
                                                  )
                                                }}
                                              </NGi>
                                            ))
                                        }}
                                      </NGrid>
                                    )
                                  }}
                                </NCollapseItem>
                              )
                            })
                          if (!filteredItemsCount)
                            return <NEmpty />
                          return collapsedItems
                        }
                      }}
                    </NCollapse>
                  </>
                )
              }}
            </NPopover>,
            this.$slots.default?.()
          ]
        }}
      </NConfigProvider>
    )
  }
})

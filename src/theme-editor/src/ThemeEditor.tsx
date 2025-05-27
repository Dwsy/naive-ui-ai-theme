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
import { NCard } from '../../card'
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
import { NSpace } from '../../space'
import { NTabs, NTabPane } from '../../tabs'
import { NText } from '../../typography'
import { lightTheme } from '../../themes'
import { MaximizeIcon } from './MaximizeIcon'
import { MinimizeIcon } from './MinimizeIcon'
import {
  AI_PROVIDERS,
  PROVIDER_MODELS,
  PRESET_STYLES,
  THEME_MODES,
  ARTIST_STYLES,
  loadAIConfig,
  saveAIConfig as saveAIConfigToStorage,
  type AIProviderConfig,
  type ThemeGenerationRequest,
  type ThemeGenerationRecord
} from './ai-config'
import {
  callAIAPI,
  type GenerationStep,
  type GenerationCallbacks,
  type ThinkingStep
} from './ai-theme-generator'
import AIGenerationProcess from './AIGenerationProcess'
import AIConfigPanel from './AIConfigPanel'
import EnhancedThemeGenerationPanel from './EnhancedThemeGenerationPanel'
import AIThinkingProcess from './AIThinkingProcess'
import './theme-editor-styles.css'

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
      ></path>
      <path
        d="M3.5 3C3.77615 3 4 3.22386 4 3.5V4H4.5C4.77615 4 5 4.22386 5 4.5C5 4.77614 4.77615 5 4.5 5H4V5.5C4 5.77614 3.77615 6 3.5 6C3.22386 6 3 5.77614 3 5.5V5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H3V3.5C3 3.22386 3.22386 3 3.5 3Z"
        fill="currentColor"
      ></path>
      <path
        d="M12.5 12C12.7761 12 13 11.7761 13 11.5C13 11.2239 12.7761 11 12.5 11H12V10.5C12 10.2239 11.7761 10 11.5 10C11.2239 10 11 10.2239 11 10.5V11H10.5C10.2239 11 10 11.2239 10 11.5C10 11.7761 10.2239 12 10.5 12H11V12.5C11 12.7761 11.2239 13 11.5 13C11.7761 13 12 12.7761 12 12.5V12H12.5Z"
        fill="currentColor"
      ></path>
      <path
        d="M8.72956 4.56346C9.4771 3.81592 10.6891 3.81592 11.4367 4.56347C12.1842 5.31102 12.1842 6.52303 11.4367 7.27058L4.26679 14.4404C3.51924 15.1879 2.30723 15.1879 1.55968 14.4404C0.812134 13.6928 0.812138 12.4808 1.55969 11.7333L8.72956 4.56346ZM8.25002 6.4572L2.26679 12.4404C1.90977 12.7974 1.90977 13.3763 2.26679 13.7333C2.62381 14.0903 3.20266 14.0903 3.55968 13.7333L9.54292 7.75009L8.25002 6.4572ZM10.25 7.04299L10.7295 6.56347C11.0866 6.20645 11.0866 5.6276 10.7296 5.27057C10.3725 4.91355 9.79368 4.91355 9.43666 5.27057L8.95713 5.7501L10.25 7.04299Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

// button colorOpacitySecondary var is not color
function showColorPicker(key: string): boolean {
  if (key.includes('pacity')) return false
  if (key.includes('color') || key.includes('Color')) return true
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
      const mergedTheme: GlobalTheme =
        NConfigProvider?.mergedThemeRef.value || lightTheme
      const mergedThemeOverrides =
        NConfigProvider?.mergedThemeOverridesRef.value
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
        ;(overrides as any)[key] = (mergedTheme[key]?.self?.(common) ||
          lightTheme[key].self?.(common)) as any
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
    const aiConfigRef = ref<AIProviderConfig>(loadAIConfig())
    const aiPromptRef = ref('')
    const aiStyleRef = ref<string | undefined>(undefined)
    const aiThemeModeRef = ref<'light' | 'dark' | 'auto'>('light')
    const aiArtistStyleRef = ref<string | undefined>(undefined)
    const useEnhancedPromptRef = ref(true)
    const selectedComponentsRef = ref<string[]>([])
    const isGeneratingRef = ref(false)
    const generationRecordsRef = ref<ThemeGenerationRecord[]>(
      JSON.parse(localStorage['naive-ui-theme-generation-records'] || '[]')
    )
    const activeTabRef = ref('config')

    // 可视化相关状态
    const generationStepsRef = ref<GenerationStep[]>([])
    const currentStepRef = ref<string>('')
    const generationProgressRef = ref(0)
    const showProcessRef = ref(false)
    const rawResponseRef = ref<string>('')
    const parsedResultRef = ref<any>(null)

    // 思考过程相关状态
    const thinkingStepsRef = ref<ThinkingStep[]>([])
    const showThinkingRef = ref(false)
    const isThinkingRef = ref(false)
    const currentThinkingContentRef = ref('')
    function applyTempOverrides(): void {
      overridesRef.value = cloneDeep(toRaw(tempOverridesRef.value))
    }
    function setTempOverrides(
      compName: string,
      varName: string,
      value: string
    ): void {
      const { value: tempOverrides } = tempOverridesRef
      if (!(compName in tempOverrides)) tempOverrides[compName] = {}
      const compOverrides = tempOverrides[compName]
      if (value) {
        compOverrides[varName] = value
      } else {
        delete compOverrides[varName]
      }
    }
    function handleClearAllClick(): void {
      tempOverridesRef.value = {}
      overridesRef.value = {}
    }
    function handleImportClick(): void {
      const { value: fileInput } = fileInputRef
      if (!fileInput) return
      fileInput.click()
    }
    function toggleMaximized(): void {
      isMaximized.value = !isMaximized.value
    }
    function handleInputFileChange(): void {
      const { value: fileInput } = fileInputRef
      if (!fileInput) return
      const fileList = fileInput.files
      const file = fileList?.[0]
      if (!file) return
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
      return Object.keys(theme.value).filter((key) => key !== 'common')
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

      // 重置可视化状态
      generationStepsRef.value = []
      currentStepRef.value = ''
      generationProgressRef.value = 0
      showProcessRef.value = true
      rawResponseRef.value = ''
      parsedResultRef.value = null

      // 初始化思考过程
      thinkingStepsRef.value = []
      showThinkingRef.value = true
      isThinkingRef.value = true
      currentThinkingContentRef.value = ''

      isGeneratingRef.value = true
      try {
        // 构建 AI 请求
        const request: ThemeGenerationRequest = {
          prompt: aiPromptRef.value,
          style: aiStyleRef.value || undefined,
          components: selectedComponentsRef.value,
          themeMode: aiThemeModeRef.value,
          artistStyle: aiArtistStyleRef.value,
          useEnhancedPrompt: useEnhancedPromptRef.value
        }

        // 设置生成过程回调
        const callbacks: GenerationCallbacks = {
          onStepStart: (step) => {
            currentStepRef.value = step.id
            const existingIndex = generationStepsRef.value.findIndex(
              (s) => s.id === step.id
            )
            if (existingIndex >= 0) {
              generationStepsRef.value[existingIndex] = { ...step }
            } else {
              generationStepsRef.value.push({ ...step })
            }
          },
          onStepComplete: (step) => {
            const existingIndex = generationStepsRef.value.findIndex(
              (s) => s.id === step.id
            )
            if (existingIndex >= 0) {
              generationStepsRef.value[existingIndex] = { ...step }
            }
          },
          onStepError: (step, error) => {
            const existingIndex = generationStepsRef.value.findIndex(
              (s) => s.id === step.id
            )
            if (existingIndex >= 0) {
              generationStepsRef.value[existingIndex] = { ...step, error }
            }
          },
          onProgress: (progress) => {
            generationProgressRef.value = progress
          },
          onRawResponse: (response) => {
            rawResponseRef.value = response
          },
          onThinkingStep: (step) => {
            thinkingStepsRef.value.push(step)
          },
          onThinkingContent: (content) => {
            currentThinkingContentRef.value = content
          }
        }

        // 调用 AI API 生成主题
        const generatedTheme = await callAIAPI(
          request,
          aiConfigRef.value,
          callbacks
        )

        // 保存解析结果
        parsedResultRef.value = generatedTheme

        // 应用生成的主题
        // 添加完成步骤
        thinkingStepsRef.value.push({
          id: `complete-${Date.now()}`,
          type: 'complete',
          content: '🎉 主题生成完成！已为您创建了专业级的主题配置',
          timestamp: Date.now()
        })

        tempOverridesRef.value = {
          ...tempOverridesRef.value,
          ...generatedTheme
        }
        applyTempOverrides()

        // 保存生成记录
        const record: ThemeGenerationRecord = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          prompt: aiPromptRef.value,
          style: aiStyleRef.value || undefined,
          components: [...selectedComponentsRef.value],
          themeMode: aiThemeModeRef.value,
          artistStyle: aiArtistStyleRef.value,
          themeOverrides: generatedTheme
        }
        generationRecordsRef.value.unshift(record)

        // 限制记录数量为20条
        if (generationRecordsRef.value.length > 20) {
          generationRecordsRef.value = generationRecordsRef.value.slice(0, 20)
        }

        localStorage['naive-ui-theme-generation-records'] = JSON.stringify(
          generationRecordsRef.value
        )

        // eslint-disable-next-line no-alert
        alert('主题生成成功！🎉')
      } catch (error) {
        console.error('AI 主题生成失败:', error)

        // 添加错误步骤
        thinkingStepsRef.value.push({
          id: `error-${Date.now()}`,
          type: 'error',
          content: `❌ 生成失败：${error instanceof Error ? error.message : '未知错误'}`,
          timestamp: Date.now()
        })

        // eslint-disable-next-line no-alert
        alert(
          `主题生成失败: ${error instanceof Error ? error.message : '未知错误'}`
        )
      } finally {
        isGeneratingRef.value = false
        isThinkingRef.value = false
        // 延迟关闭思考窗口，让用户看到完成状态
        setTimeout(() => {
          showThinkingRef.value = false
        }, 2000)
      }
    }

    function applyGenerationRecord(record: ThemeGenerationRecord): void {
      tempOverridesRef.value = {
        ...tempOverridesRef.value,
        ...record.themeOverrides
      }
      applyTempOverrides()
    }

    function formatTimestamp(timestamp: number): string {
      return new Date(timestamp).toLocaleString()
    }

    function handleAIConfigChange(config: AIProviderConfig): void {
      aiConfigRef.value = config
    }

    function handleSaveAIConfig(): void {
      saveAIConfigToStorage(aiConfigRef.value)
    }

    function handleImportTheme(theme: any): void {
      try {
        // 应用导入的主题配置
        tempOverridesRef.value = {
          ...tempOverridesRef.value,
          ...theme
        }
        applyTempOverrides()

        console.log('主题导入成功:', theme)
      } catch (error) {
        console.error('应用导入主题失败:', error)
        // eslint-disable-next-line no-alert
        alert(`应用主题失败: ${error instanceof Error ? error.message : '未知错误'}`)
      }
    }

    function handleCopyPrompt(): void {
      try {
        // 构建完整的提示词
        let fullPrompt = aiPromptRef.value.trim()

        if (useEnhancedPromptRef.value) {
          // 增强模式：添加更多上下文信息
          const components = selectedComponentsRef.value.join(', ')
          const themeMode = aiThemeModeRef.value === 'light' ? '浅色' :
                          aiThemeModeRef.value === 'dark' ? '暗色' : '自适应'
          const artistStyle = aiArtistStyleRef.value ?
            ARTIST_STYLES.find(s => s.value === aiArtistStyleRef.value)?.label : '无'

          fullPrompt = `请为 Naive UI 组件库生成主题配置：

主题描述：${fullPrompt}

配置要求：
- 主题模式：${themeMode}
- 艺术风格：${artistStyle}
- 目标组件：${components}
- 输出格式：JSON 格式的主题配置对象

请确保：
1. 颜色搭配协调，符合设计美学
2. 保证文本可读性，对比度适中
3. 遵循 Naive UI 的主题配置规范
4. 输出标准的 JSON 格式，可直接使用

浅色主题特别要求:

浅色主题特别要求:
- 背景应使用白色或非常浅的色调
- 文本应使用深色以确保可读性
- 主色应用于重点元素，不要过度使用
- 禁用状态应使用浅灰色而非深色
- 确保所有文本与背景对比度至少4.5:1

关键组件要求:
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

请返回完整的 JSON 格式主题配置，包含 common 配置和所选组件的详细样式。"


`
        } else {
          // 简单模式：基础提示词
          const style = aiStyleRef.value || '默认'
          fullPrompt = `请为 Naive UI 生成 ${style} 风格的主题配置：${fullPrompt}`
        }

        // 复制到剪贴板
        navigator.clipboard.writeText(fullPrompt).then(() => {
          // eslint-disable-next-line no-alert
          alert('✅ 提示词已复制到剪贴板！')
        }).catch(() => {
          // 降级方案：显示提示词内容
          // eslint-disable-next-line no-alert
          alert(`提示词内容：

${fullPrompt}`)
        })
      } catch (error) {
        console.error('复制提示词失败:', error)
        // eslint-disable-next-line no-alert
        alert('复制失败，请手动复制提示词')
      }
    }

    function handlePasteJson(theme: any): void {
      try {
        // 应用粘贴的主题配置（与导入主题相同的逻辑）
        tempOverridesRef.value = {
          ...tempOverridesRef.value,
          ...theme
        }
        applyTempOverrides()

        console.log('JSON 主题粘贴成功:', theme)

        // eslint-disable-next-line no-alert
        alert('🎉 主题配置已成功应用！')
      } catch (error) {
        console.error('应用粘贴主题失败:', error)
        // eslint-disable-next-line no-alert
        alert(`应用主题失败: ${error instanceof Error ? error.message : '未知错误'}`)
      }
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
      aiThemeMode: aiThemeModeRef,
      aiArtistStyle: aiArtistStyleRef,
      useEnhancedPrompt: useEnhancedPromptRef,
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
      handleAIConfigChange,
      handleSaveAIConfig,
      handleImportTheme,
      handleCopyPrompt,
      handlePasteJson,
      PRESET_STYLES,
      THEME_MODES,
      ARTIST_STYLES,
      AI_PROVIDERS,
      PROVIDER_MODELS,
      // 可视化相关
      generationSteps: generationStepsRef,
      currentStep: currentStepRef,
      generationProgress: generationProgressRef,
      showProcess: showProcessRef,
      rawResponse: rawResponseRef,
      parsedResult: parsedResultRef,
      // 思考过程相关
      thinkingSteps: thinkingStepsRef,
      showThinking: showThinkingRef,
      isThinking: isThinkingRef,
      currentThinkingContent: currentThinkingContentRef
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
                width: this.isMaximized ? 'calc(100vw - 80px)' : '60vw',
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
                    {/* AI 思考过程窗口 */}
                    {/* <AIThinkingProcess
                      visible={this.showThinking}
                      isThinking={this.isThinking}
                      steps={this.thinkingSteps}
                      currentContent={this.currentThinkingContent}
                      onClose={() => {
                        this.showThinking = false
                      }}
                    /> */}

                    {/* AI 生成主题功能 */}
                    <NCollapse expandedNames={['ai-generate']}>
                      {{
                        default: () => (
                          <NCollapseItem
                            title="🤖 AI 主题生成"
                            name="ai-generate"
                          >
                            {{
                              default: () => (
                                <NTabs
                                  value={this.activeTab}
                                  onUpdateValue={(value: string) => {
                                    this.activeTab = value
                                  }}
                                >
                                  {{
                                    default: () => [
                                      <NTabPane name="config" tab="⚙️ AI 配置">
                                        {{
                                          default: () => (
                                            <AIConfigPanel
                                              config={this.aiConfig}
                                              onConfigChange={this.handleAIConfigChange}
                                              onSave={this.handleSaveAIConfig}
                                              onImportTheme={this.handleImportTheme}
                                              isConnected={
                                                !!this.aiConfig.apiKey
                                              }
                                              totalGenerations={
                                                this.generationRecords.length
                                              }
                                              lastUsed={
                                                this.generationRecords[0]
                                                  ?.timestamp
                                              }
                                            />
                                          )
                                        }}
                                      </NTabPane>,
                                      <NTabPane
                                        name="generate"
                                        tab="🎨 生成主题"
                                      >
                                        {{
                                          default: () => (
                                            <NSpace vertical>
                                              {{
                                                default: () => [
                                                  <EnhancedThemeGenerationPanel
                                                    prompt={this.aiPrompt}
                                                    style={this.aiStyle}
                                                    themeMode={this.aiThemeMode}
                                                    artistStyle={this.aiArtistStyle}
                                                    useEnhancedPrompt={this.useEnhancedPrompt}
                                                    selectedComponents={
                                                      this.selectedComponents
                                                    }
                                                    allComponents={this.getAllComponentNames()}
                                                    isGenerating={
                                                      this.isGenerating
                                                    }
                                                    onPromptChange={(
                                                      value: string
                                                    ) => {
                                                      this.aiPrompt = value
                                                    }}
                                                    onStyleChange={(
                                                      value: string | undefined
                                                    ) => {
                                                      this.aiStyle = value
                                                    }}
                                                    onThemeModeChange={(
                                                      value: 'light' | 'dark' | 'auto'
                                                    ) => {
                                                      this.aiThemeMode = value
                                                    }}
                                                    onArtistStyleChange={(
                                                      value: string | undefined
                                                    ) => {
                                                      this.aiArtistStyle = value
                                                    }}
                                                    onUseEnhancedPromptChange={(
                                                      value: boolean
                                                    ) => {
                                                      this.useEnhancedPrompt = value
                                                    }}
                                                    onComponentsChange={(
                                                      value: string[]
                                                    ) => {
                                                      this.selectedComponents =
                                                        value
                                                    }}
                                                    onSelectAllComponents={
                                                      this
                                                        .handleSelectAllComponents
                                                    }
                                                    onGenerate={
                                                      this.generateThemeWithAI
                                                    }
                                                    onCopyPrompt={
                                                      this.handleCopyPrompt
                                                    }
                                                    onPasteJson={
                                                      this.handlePasteJson
                                                    }
                                                  />,
                                                  <AIGenerationProcess
                                                    visible={this.showProcess}
                                                    steps={this.generationSteps}
                                                    currentStep={
                                                      this.currentStep
                                                    }
                                                    progress={
                                                      this.generationProgress
                                                    }
                                                    rawResponse={
                                                      this.rawResponse
                                                    }
                                                    parsedResult={
                                                      this.parsedResult
                                                    }
                                                    onClose={() => {
                                                      this.showProcess = false
                                                    }}
                                                  />
                                                ]
                                              }}
                                            </NSpace>
                                          )
                                        }}
                                      </NTabPane>,
                                      <NTabPane
                                        name="history"
                                        tab="📚 生成历史"
                                      >
                                        {{
                                          default: () => (
                                            <NSpace vertical>
                                              {{
                                                default: () =>
                                                  this.generationRecords
                                                    .length === 0
                                                    ? [
                                                        <NEmpty description="暂无生成记录" />
                                                      ]
                                                    : this.generationRecords.map(
                                                        (record) => (
                                                          <NCard
                                                            key={record.id}
                                                            size="small"
                                                            style={{
                                                              background:
                                                                'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                                                            }}
                                                          >
                                                            {{
                                                              default: () => (
                                                                <NSpace
                                                                  vertical
                                                                  size="small"
                                                                >
                                                                  <NSpace
                                                                    align="center"
                                                                    justify="space-between"
                                                                  >
                                                                    <NText
                                                                      depth={3}
                                                                      style={{
                                                                        fontSize:
                                                                          '12px'
                                                                      }}
                                                                    >
                                                                      {{
                                                                        default: () => this.formatTimestamp(
                                                                          record.timestamp
                                                                        )
                                                                      }}
                                                                    </NText>
                                                                    <NButton
                                                                      size="small"
                                                                      type="primary"
                                                                      onClick={() =>
                                                                        this.applyGenerationRecord(
                                                                          record
                                                                        )
                                                                      }
                                                                    >
                                                                      {{
                                                                        default: () => '应用主题'
                                                                      }}
                                                                    </NButton>
                                                                  </NSpace>
                                                                  <NText
                                                                    strong
                                                                    style={{
                                                                      fontSize:
                                                                        '14px'
                                                                    }}
                                                                  >
                                                                    {{
                                                                      default: () => record.prompt
                                                                    }}
                                                                  </NText>
                                                                  {record.style && (
                                                                    <NText
                                                                      depth={2}
                                                                      style={{
                                                                        fontSize:
                                                                          '12px'
                                                                      }}
                                                                    >
                                                                      {{
                                                                        default: () => `风格: ${record.style}`
                                                                      }}
                                                                    </NText>
                                                                  )}
                                                                  {record.themeMode && (
                                                                    <NText
                                                                      depth={2}
                                                                      style={{
                                                                        fontSize:
                                                                          '12px'
                                                                      }}
                                                                    >
                                                                      {{
                                                                        default: () => `模式: ${record.themeMode === 'light' ? '浅色' :
                                                                         record.themeMode === 'dark' ? '暗色' : '自适应'}`
                                                                      }}
                                                                    </NText>
                                                                  )}
                                                                  {record.artistStyle && (
                                                                    <NText
                                                                      depth={2}
                                                                      style={{
                                                                        fontSize:
                                                                          '12px'
                                                                      }}
                                                                    >
                                                                      {{
                                                                        default: () => `艺术风格: ${this.ARTIST_STYLES.find(s => s.value === record.artistStyle)?.label || record.artistStyle}`
                                                                      }}
                                                                    </NText>
                                                                  )}
                                                                  <NText
                                                                    depth={2}
                                                                    style={{
                                                                      fontSize:
                                                                        '12px'
                                                                    }}
                                                                  >
                                                                    {{
                                                                      default: () => `组件: ${record.components
                                                                        .slice(0, 5)
                                                                        .join(', ')}${record.components.length > 5 ? ` 等 ${record.components.length} 个` : ''}`
                                                                    }}
                                                                  </NText>
                                                                </NSpace>
                                                              )
                                                            }}
                                                          </NCard>
                                                        )
                                                      )
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

                    <NDivider />
                    <NCollapse>
                      {{
                        default: () => {
                          const { theme, compNamePattern, varNamePattern } =
                            this
                          const themeKeys = Object.keys(theme)
                          const compNamePatternLower =
                            compNamePattern.toLowerCase()
                          const varNamePatternLower =
                            varNamePattern.toLowerCase()
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
                                | undefined =
                                themeKey === 'common'
                                  ? this.themeCommonDefault
                                  : (theme as any)[themeKey]
                              if (componentTheme === undefined) {
                                return null
                              }
                              const varKeys = Object.keys(
                                componentTheme
                              ).filter((key) => {
                                return (
                                  key !== 'name' &&
                                  key
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
                                            varKeys.map((varKey) => (
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
                                                            ]?.[varKey] ||
                                                            componentTheme[
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
                                                                  ] ===
                                                                  this
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
                          if (!filteredItemsCount) return <NEmpty />
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

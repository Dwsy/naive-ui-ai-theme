// 增强的主题生成面板组件

import { defineComponent, ref, computed, h } from 'vue'
import {
  NCard, NSpace, NInput, NSelect, NButton, NText, NIcon, NAlert,
  NTag, NTooltip, NCheckbox, NGrid, NGi, NSwitch, NCollapse, NCollapseItem
} from 'naive-ui'
import {
  Brush, Settings,
  InformationCircle, CheckmarkCircle, Flash, ColorFilter, Link, Copy,
  DocumentText, Download, CloudUpload
} from '@vicons/ionicons5'
import {
  THEME_MODES,
  ARTIST_STYLES,
  PRESET_STYLES,
  getArtistStyle,
  getThemeMode
} from './ai-config'

export interface EnhancedThemeGenerationPanelProps {
  prompt: string
  style?: string
  themeMode: 'light' | 'dark' | 'auto'
  artistStyle?: string
  useEnhancedPrompt: boolean
  selectedComponents: string[]
  allComponents: string[]
  isGenerating: boolean
  onPromptChange: (value: string) => void
  onStyleChange: (value: string | undefined) => void
  onThemeModeChange: (value: 'light' | 'dark' | 'auto') => void
  onArtistStyleChange: (value: string | undefined) => void
  onUseEnhancedPromptChange: (value: boolean) => void
  onComponentsChange: (value: string[]) => void
  onSelectAllComponents: () => void
  onGenerate: () => void
  onCopyPrompt?: () => void
  onPasteJson?: (theme: any) => void
}

export default defineComponent({
  name: 'EnhancedThemeGenerationPanel',
  props: {
    prompt: { type: String, required: true },
    style: String,
    themeMode: { type: String as () => 'light' | 'dark' | 'auto', default: 'light' },
    artistStyle: String,
    useEnhancedPrompt: { type: Boolean, default: true },
    selectedComponents: { type: Array as () => string[], required: true },
    allComponents: { type: Array as () => string[], required: true },
    isGenerating: { type: Boolean, default: false },
    onPromptChange: { type: Function as () => (value: string) => void, required: true },
    onStyleChange: { type: Function as () => (value: string | undefined) => void, required: true },
    onThemeModeChange: { type: Function as () => (value: 'light' | 'dark' | 'auto') => void, required: true },
    onArtistStyleChange: { type: Function as () => (value: string | undefined) => void, required: true },
    onUseEnhancedPromptChange: { type: Function as () => (value: boolean) => void, required: true },
    onComponentsChange: { type: Function as () => (value: string[]) => void, required: true },
    onSelectAllComponents: { type: Function as () => () => void, required: true },
    onGenerate: { type: Function as () => () => void, required: true },
    onCopyPrompt: { type: Function as () => () => void, required: false },
    onPasteJson: { type: Function as () => (theme: any) => void, required: false }
  },
  setup(props) {
    const showAdvanced = ref(false)

    // JSON 粘贴相关状态
    const jsonInput = ref('')
    const showJsonPaste = ref(false)
    const pasteError = ref('')
    const pasteSuccess = ref(false)

    // 计算选中的画家风格信息
    const selectedArtistStyle = computed(() => {
      return props.artistStyle ? getArtistStyle(props.artistStyle) : null
    })

    // 计算选中的主题模式信息
    const selectedThemeMode = computed(() => {
      return getThemeMode(props.themeMode)
    })

    // 计算是否所有组件都被选中
    const isAllSelected = computed(() => {
      return props.selectedComponents.length === props.allComponents.length
    })

    // 计算生成按钮是否可用
    const canGenerate = computed(() => {
      return props.prompt.trim() && props.selectedComponents.length > 0 && !props.isGenerating
    })

    // JSON 粘贴处理函数
    const handlePasteJson = () => {
      pasteError.value = ''
      pasteSuccess.value = false

      if (!jsonInput.value.trim()) {
        pasteError.value = '请输入 JSON 主题配置'
        return
      }

      try {
        const theme = JSON.parse(jsonInput.value.trim())

        // 基本验证：检查是否是有效的主题对象
        if (typeof theme !== 'object' || theme === null) {
          throw new Error('无效的主题格式：必须是一个对象')
        }

        // 调用父组件的粘贴回调
        if (props.onPasteJson) {
          props.onPasteJson(theme)
          pasteSuccess.value = true
          jsonInput.value = ''

          // 3秒后自动隐藏成功提示
          setTimeout(() => {
            pasteSuccess.value = false
          }, 3000)
        }
      } catch (error) {
        pasteError.value = `JSON 解析失败: ${error instanceof Error ? error.message : '未知错误'}`
      }
    }

    // 切换 JSON 粘贴面板显示状态
    const toggleJsonPaste = () => {
      showJsonPaste.value = !showJsonPaste.value
      if (!showJsonPaste.value) {
        // 隐藏时清空状态
        jsonInput.value = ''
        pasteError.value = ''
        pasteSuccess.value = false
      }
    }

    // 清空 JSON 输入
    const clearJsonInput = () => {
      jsonInput.value = ''
      pasteError.value = ''
      pasteSuccess.value = false
    }

    return {
      showAdvanced,
      selectedArtistStyle,
      selectedThemeMode,
      isAllSelected,
      canGenerate,
      THEME_MODES,
      ARTIST_STYLES,
      PRESET_STYLES,
      // JSON 粘贴相关
      jsonInput,
      showJsonPaste,
      pasteError,
      pasteSuccess,
      handlePasteJson,
      toggleJsonPaste,
      clearJsonInput
    }
  },
  render() {
    return (
      <NSpace vertical size="large">
        {/* 增强提示词开关 */}
        <NCard size="small">
          <NSpace align="center" justify="space-between">
            <NSpace align="center">
              <NIcon component={Flash} color="#52c41a" />
              <NText strong>增强提示词模式</NText>
              <NTooltip>
                {{
                  trigger: () => <NIcon component={InformationCircle} color="#1890ff" size={16} />,
                  default: () => '启用后将使用专业的艺术风格和可读性约束来生成更高质量的主题'
                }}
              </NTooltip>
            </NSpace>
            <NSwitch
              value={this.useEnhancedPrompt}
              onUpdateValue={this.onUseEnhancedPromptChange}
            />
          </NSpace>
        </NCard>

        {/* 基础配置 */}
        <NCard title="🎨 基础配置" size="small">
          <NSpace vertical size="large">
            {/* 提示词输入 */}
            <div>
              <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                <NIcon component={Settings} color="#722ed1" />
                <NText strong>主题描述</NText>
              </NSpace>
              <NInput
                value={this.prompt}
                type="textarea"
                placeholder="描述您想要的主题风格，例如：现代简约的商务风格，使用蓝色作为主色调..."
                rows={3}
                onUpdateValue={this.onPromptChange}
              />
            </div>

            {/* 主题模式选择 */}
            {this.useEnhancedPrompt && (
              <div>
                <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                  <NIcon component={ColorFilter} color="#1890ff" />
                  <NText strong>主题模式</NText>
                </NSpace>
                <NSelect
                  value={this.themeMode}
                  options={THEME_MODES}
                  placeholder="选择主题模式"
                  onUpdateValue={this.onThemeModeChange}
                  renderLabel={(option: any) => (
                    <NSpace align="center">
                      <NText>{option.label}</NText>
                      <NText depth={3} style={{ fontSize: '12px' }}>
                        {option.description}
                      </NText>
                    </NSpace>
                  )}
                />
                {this.selectedThemeMode && (
                  <NText depth={3} style={{ fontSize: '12px', marginTop: '4px' }}>
                    {this.selectedThemeMode.description}
                  </NText>
                )}
              </div>
            )}

            {/* 画家风格选择 */}
            {this.useEnhancedPrompt && (
              <div>
                <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                  <NIcon component={Brush} color="#fa8c16" />
                  <NText strong>艺术风格</NText>
                  <NTag size="small" type="info">推荐</NTag>
                </NSpace>
                <NSelect
                  value={this.artistStyle}
                  options={ARTIST_STYLES}
                  placeholder="选择画家风格（可选）"
                  clearable
                  onUpdateValue={this.onArtistStyleChange}
                  renderLabel={(option: any) => (
                    <NSpace align="center" justify="space-between" style={{ width: '100%' }}>
                      <NSpace align="center">
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: `linear-gradient(45deg, ${option.colors.primary}, ${option.colors.secondary})`,
                            border: '1px solid #d9d9d9'
                          }}
                        />
                        <NText>{option.label}</NText>
                      </NSpace>
                      <NText depth={3} style={{ fontSize: '11px' }}>
                        {option.description}
                      </NText>
                    </NSpace>
                  )}
                />
                {this.selectedArtistStyle && (
                  <NSpace style={{ marginTop: '8px' }}>
                    <NText depth={3} style={{ fontSize: '12px' }}>
                      色彩预览:
                    </NText>
                    {Object.entries(this.selectedArtistStyle.colors).map(([key, color]) => (
                      <NTooltip key={key}>
                        {{
                          trigger: () => (
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: color as string,
                                borderRadius: '4px',
                                border: '1px solid #d9d9d9',
                                cursor: 'pointer'
                              }}
                            />
                          ),
                          default: () => `${key}: ${color}`
                        }}
                      </NTooltip>
                    ))}
                  </NSpace>
                )}
              </div>
            )}

            {/* 传统风格选择（仅在未启用增强模式时显示） */}
            {!this.useEnhancedPrompt && (
              <div>
                <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                  <NIcon component={Settings} color="#52c41a" />
                  <NText strong>预设风格</NText>
                </NSpace>
                <NSelect
                  value={this.style}
                  options={PRESET_STYLES}
                  placeholder="选择预设风格（可选）"
                  clearable
                  onUpdateValue={this.onStyleChange}
                />
              </div>
            )}
          </NSpace>
        </NCard>

        {/* 组件选择 */}
        <NCard title="🧩 组件选择" size="small">
          <NSpace vertical>
            <NSpace align="center" justify="space-between">
              <NText depth={2}>
                已选择 {this.selectedComponents.length} / {this.allComponents.length} 个组件
              </NText>
              <NButton
                size="small"
                onClick={this.onSelectAllComponents}
              >
                {this.isAllSelected ? '取消全选' : '全选'}
              </NButton>
            </NSpace>

            <NCheckbox
              checked={this.isAllSelected}
              indeterminate={this.selectedComponents.length > 0 && !this.isAllSelected}
              onUpdateChecked={this.onSelectAllComponents}
            >
              选择所有组件
            </NCheckbox>

            <NGrid cols={4} xGap={8} yGap={8}>
              {this.allComponents.map(component => (
                <NGi key={component}>
                  <NCheckbox
                    checked={this.selectedComponents.includes(component)}
                    onUpdateChecked={(checked: boolean) => {
                      const newComponents = checked
                        ? [...this.selectedComponents, component]
                        : this.selectedComponents.filter(c => c !== component)
                      this.onComponentsChange(newComponents)
                    }}
                  >
                    {component}
                  </NCheckbox>
                </NGi>
              ))}
            </NGrid>
          </NSpace>
        </NCard>

        {/* JSON 主题粘贴 */}
        {this.onPasteJson && (
          <NCard title="📥 粘贴主题 JSON" size="small">
            <NSpace vertical size="medium">
              {/* 粘贴说明 */}
              <NSpace align="center" size="small">
                <NIcon component={DocumentText} color="#52c41a" />
                <NText>
                  {{
                    default: () => '可以直接粘贴大模型输出的 JSON 主题配置'
                  }}
                </NText>
              </NSpace>

              {/* 展开/收起按钮 */}
              <NButton
                secondary
                block
                onClick={this.toggleJsonPaste}
              >
                {{
                  icon: () => <NIcon component={this.showJsonPaste ? CloudUpload : Download} />,
                  default: () => this.showJsonPaste ? '收起粘贴面板' : '展开粘贴面板'
                }}
              </NButton>

              {/* JSON 输入区域 */}
              {this.showJsonPaste && (
                <NSpace vertical size="medium">
                  <NInput
                    value={this.jsonInput}
                    type="textarea"
                    placeholder="请粘贴大模型输出的 JSON 主题配置..."
                    rows={6}
                    onUpdateValue={(value: string) => { this.jsonInput = value }}
                    style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                  />

                  {/* 错误提示 */}
                  {this.pasteError && (
                    <NAlert type="error" showIcon>
                      {{
                        default: () => this.pasteError
                      }}
                    </NAlert>
                  )}

                  {/* 成功提示 */}
                  {this.pasteSuccess && (
                    <NAlert type="success" showIcon>
                      {{
                        default: () => '🎉 主题应用成功！'
                      }}
                    </NAlert>
                  )}

                  {/* 操作按钮 */}
                  <NSpace>
                    <NButton
                      type="primary"
                      onClick={this.handlePasteJson}
                      disabled={!this.jsonInput.trim()}
                    >
                      {{
                        icon: () => <NIcon component={CloudUpload} />,
                        default: () => '应用主题'
                      }}
                    </NButton>
                    <NButton
                      onClick={this.clearJsonInput}
                      disabled={!this.jsonInput.trim()}
                    >
                      {{
                        default: () => '清空'
                      }}
                    </NButton>
                  </NSpace>

                  {/* 使用说明 */}
                  <NAlert type="info" showIcon={false}>
                    {{
                      default: () => (
                        <NSpace vertical size="small">
                          <NText strong>
                            {{
                              default: () => '💡 使用说明'
                            }}
                          </NText>
                          <ul style={{ margin: 0, paddingLeft: '16px' }}>
                            <li>支持粘贴 ChatGPT、Claude 等大模型输出的主题 JSON</li>
                            <li>会自动解析并应用到主题编辑器</li>
                            <li>支持部分主题配置和完整主题配置</li>
                            <li>应用后可以继续在编辑器中调整</li>
                          </ul>
                        </NSpace>
                      )
                    }}
                  </NAlert>
                </NSpace>
              )}
            </NSpace>
          </NCard>
        )}

        {/* 生成按钮和复制提示词 */}
        <NSpace vertical size="medium">
          <NButton
            type="primary"
            size="large"
            block
            loading={this.isGenerating}
            disabled={!this.canGenerate}
            onClick={this.onGenerate}
          >
            {{
              icon: () => <NIcon component={this.useEnhancedPrompt ? Flash : Brush} />,
              default: () => this.isGenerating ? '正在生成主题...' :
                this.useEnhancedPrompt ? '🎨 生成增强主题' : '生成主题'
            }}
          </NButton>

          {/* 复制提示词按钮 */}
          {this.onCopyPrompt && (
            <NButton
              size="medium"
              block
              secondary
              onClick={this.onCopyPrompt}
              disabled={!this.prompt.trim()}
            >
              {{
                icon: () => <NIcon component={Copy} />,
                default: () => '📋 复制完整提示词'
              }}
            </NButton>
          )}
        </NSpace>

        {/* 提示信息 */}
        {this.useEnhancedPrompt && (
          <NAlert type="info" showIcon={false}>
            {{
              default: () => (
                <NSpace vertical size="small">
                  <NText strong>💡 增强模式特性</NText>
                  <ul style={{ margin: 0, paddingLeft: '16px' }}>
                    <li>基于专业艺术家色彩理论的配色方案</li>
                    <li>严格的可读性约束，确保文本清晰可见</li>
                    <li>明确的浅色/暗色模式区分</li>
                    <li>更加一致和协调的组件样式</li>
                  </ul>
                </NSpace>
              )
            }}
          </NAlert>
        )}
      </NSpace>
    )
  }
})

// AI 配置面板组件

import { defineComponent, ref, computed, h } from 'vue'
import {
  NCard, NSpace, NInput, NSelect, NButton, NText, NIcon, NAlert,
  NTag, NTooltip, NGrid, NGi, NStatistic
} from 'naive-ui'
import {
  Settings, Key, Cog as Cpu, CheckmarkCircle, Warning,
  Flash, Globe, Sparkles, Link, Refresh, SwapHorizontal,
  DocumentText, Download, CloudUpload
} from '@vicons/ionicons5'
import {
  AI_PROVIDERS,
  getProviderModels,
  getAvailableModels,
  type AIProviderConfig
} from './ai-config'

export interface AIConfigPanelProps {
  config: AIProviderConfig
  onConfigChange: (config: AIProviderConfig) => void
  onSave: () => void
  onImportTheme?: (theme: any) => void
  isConnected?: boolean
  lastUsed?: number
  totalGenerations?: number
}

export default defineComponent({
  name: 'AIConfigPanel',
  props: {
    config: {
      type: Object as () => AIProviderConfig,
      required: true
    },
    onConfigChange: {
      type: Function as unknown as () => (config: AIProviderConfig) => void,
      required: true
    },
    onSave: {
      type: Function as unknown as () => () => void,
      required: true
    },
    onImportTheme: {
      type: Function as unknown as () => (theme: any) => void,
      required: false
    },
    isConnected: {
      type: Boolean,
      default: false
    },
    lastUsed: Number,
    totalGenerations: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const showApiKey = ref(false)
    const dynamicModels = ref<string[]>([])
    const isLoadingModels = ref(false)
    const useStaticModels = ref(true) // 默认使用静态模型列表

    // JSON 导入相关状态
    const jsonInput = ref('')
    const showJsonImport = ref(false)
    const importError = ref('')
    const importSuccess = ref(false)

    // 计算API密钥的显示状态
    const maskedApiKey = computed(() => {
      if (!props.config.apiKey) return ''
      if (showApiKey.value) return props.config.apiKey
      return props.config.apiKey.slice(0, 8) + '••••••••' + props.config.apiKey.slice(-4)
    })

    // 计算连接状态
    const connectionStatus = computed(() => {
      if (!props.config.apiKey) return { type: 'warning', text: '未配置', color: '#faad14' }
      if (props.isConnected) return { type: 'success', text: '已连接', color: '#52c41a' }
      return { type: 'default', text: '未知', color: '#d9d9d9' }
    })

    // 格式化最后使用时间
    const formatLastUsed = (timestamp?: number) => {
      if (!timestamp) return '从未使用'
      const now = Date.now()
      const diff = now - timestamp
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (days > 0) return `${days}天前`
      if (hours > 0) return `${hours}小时前`
      if (minutes > 0) return `${minutes}分钟前`
      return '刚刚'
    }

    // 获取当前供应商的可用模型（静态列表）
    const staticModels = computed(() => {
      return getProviderModels(props.config.provider)
    })

    // 获取最终的模型列表（动态或静态）
    const availableModels = computed(() => {
      if (useStaticModels.value || dynamicModels.value.length === 0) {
        return staticModels.value
      }
      // 将动态模型转换为与静态模型相同的格式
      return dynamicModels.value
        .filter(model => model && typeof model === 'string')
        .map(model => ({
          label: model,
          value: model
        }))
    })

    // 转换为自动完成选项格式
    const modelOptions = computed(() => {
      return availableModels.value
        .filter((model: any) => model && model.label && model.value)
        .map((model: any) => ({
          label: model.label,
          value: model.value
        }))
    })

    // 动态获取模型列表
    const fetchDynamicModels = async () => {
      if (!props.config.apiKey) {
        return
      }

      isLoadingModels.value = true
      try {
        const models = await getAvailableModels(
          props.config.provider,
          props.config.apiKey,
          props.config.baseUrl
        )
        dynamicModels.value = models
        useStaticModels.value = false
      } catch (error) {
        console.error('获取动态模型列表失败:', error)
        // 保持使用静态模型列表
      } finally {
        isLoadingModels.value = false
      }
    }

    // 切换模型列表类型
    const toggleModelListType = () => {
      useStaticModels.value = !useStaticModels.value
    }

    // 获取模型信息
    const selectedModelInfo = computed(() => {
      return availableModels.value.find((model: any) => model.value === props.config.model)
    })

    // 检查当前模型是否为自定义模型（不在预设列表中）
    const isCustomModel = computed(() => {
      return props.config.model && !availableModels.value.some((model: any) => model.value === props.config.model)
    })

    // 是否需要显示额外配置
    const needsBaseUrl = computed(() => {
      return props.config.provider === 'custom'
    })

    const needsOrganization = computed(() => {
      return props.config.provider === 'openai'
    })

    // 更新配置
    const updateConfig = (key: keyof AIProviderConfig, value: string) => {
      props.onConfigChange({
        ...props.config,
        [key]: value
      })
    }

    // JSON 导入处理函数
    const handleImportJson = () => {
      importError.value = ''
      importSuccess.value = false

      if (!jsonInput.value.trim()) {
        importError.value = '请输入 JSON 主题配置'
        return
      }

      try {
        const theme = JSON.parse(jsonInput.value.trim())

        // 基本验证：检查是否是有效的主题对象
        if (typeof theme !== 'object' || theme === null) {
          throw new Error('无效的主题格式：必须是一个对象')
        }

        // 调用父组件的导入回调
        if (props.onImportTheme) {
          props.onImportTheme(theme)
          importSuccess.value = true
          jsonInput.value = ''

          // 3秒后自动隐藏成功提示
          setTimeout(() => {
            importSuccess.value = false
          }, 3000)
        }
      } catch (error) {
        importError.value = `JSON 解析失败: ${error instanceof Error ? error.message : '未知错误'}`
      }
    }

    // 切换 JSON 导入面板显示状态
    const toggleJsonImport = () => {
      showJsonImport.value = !showJsonImport.value
      if (!showJsonImport.value) {
        // 隐藏时清空状态
        jsonInput.value = ''
        importError.value = ''
        importSuccess.value = false
      }
    }

    // 清空 JSON 输入
    const clearJsonInput = () => {
      jsonInput.value = ''
      importError.value = ''
      importSuccess.value = false
    }

    return {
      showApiKey,
      maskedApiKey,
      connectionStatus,
      formatLastUsed,
      selectedModelInfo,
      availableModels,
      modelOptions,
      isCustomModel,
      needsBaseUrl,
      needsOrganization,
      updateConfig,
      dynamicModels,
      isLoadingModels,
      useStaticModels,
      fetchDynamicModels,
      toggleModelListType,
      // JSON 导入相关
      jsonInput,
      showJsonImport,
      importError,
      importSuccess,
      handleImportJson,
      toggleJsonImport,
      clearJsonInput
    }
  },
  render() {
    return (
      <NSpace vertical size="large">
        {/* 状态概览卡片 */}
        <NCard
          title="🔗 连接状态"
          size="small"
          style={{
            color: 'white'
          }}
          headerStyle={{ color: 'white', borderBottom: 'none' }}
          contentStyle={{ padding: '12px 20px' }}
        >
          <NGrid cols={3} xGap={16}>
            <NGi>
              <NStatistic label="连接状态" tabularNums>
                {{
                  default: () => (
                    <NSpace align="center" size="small">
                      <NIcon
                        component={this.connectionStatus.type === 'success' ? CheckmarkCircle : Warning}
                        color={this.connectionStatus.color}
                        size={16}
                      />
                      <NText style={{ color: 'white', fontSize: '14px' }}>
                        {{
                          default: () => this.connectionStatus.text
                        }}
                      </NText>
                    </NSpace>
                  )
                }}
              </NStatistic>
            </NGi>
            <NGi>
              <NStatistic label="总生成次数" value={this.totalGenerations} tabularNums>
                {{
                  prefix: () => <NIcon component={Sparkles} style={{ color: 'white' }} />
                }}
              </NStatistic>
            </NGi>
            <NGi>
              <NStatistic label="最后使用" tabularNums>
                {{
                  default: () => (
                    <NText style={{ color: 'white', fontSize: '14px' }}>
                      {{
                        default: () => this.formatLastUsed(this.lastUsed)
                      }}
                    </NText>
                  )
                }}
              </NStatistic>
            </NGi>
          </NGrid>
        </NCard>

        {/* 配置表单 */}
        <NCard title="⚙️ AI 配置" size="small">
          <NSpace vertical size="large">
            {/* 供应商选择 */}
            <div>
              <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                <NIcon component={Globe} color="#1890ff" />
                <NText strong>
                  {{
                    default: () => 'AI 供应商'
                  }}
                </NText>
              </NSpace>
              <NSelect
                value={this.config.provider}
                options={AI_PROVIDERS}
                placeholder="选择 AI 供应商"
                onUpdateValue={(value: string) => this.updateConfig('provider', value)}
                renderLabel={(option: any) => (
                  <NSpace align="center">
                    {{
                      default: () => [
                        <NIcon component={Flash} color="#52c41a" size={14} />,
                        option.label
                      ]
                    }}
                  </NSpace>
                )}
              />
            </div>

            {/* API 密钥 */}
            <div>
              <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                <NIcon component={Key} color="#fa8c16" />
                <NText strong>
                  {{
                    default: () => 'API 密钥'
                  }}
                </NText>
                <NTooltip>
                  {{
                    trigger: () => <NIcon component={Warning} color="#faad14" size={14} />,
                    default: () => '请确保 API 密钥安全，不要在公共场所暴露'
                  }}
                </NTooltip>
              </NSpace>
              <NSpace>
                <NInput
                  value={this.config.apiKey}
                  type={this.showApiKey ? 'text' : 'password'}
                  placeholder="请输入 API 密钥"
                  onUpdateValue={(value: string) => this.updateConfig('apiKey', value)}
                  style={{ flex: 1 }}
                  showPasswordOn="click"
                />
                <NButton
                  size="small"
                  onClick={() => { this.showApiKey = !this.showApiKey }}
                >
                  {{
                    default: () => this.showApiKey ? '隐藏' : '显示'
                  }}
                </NButton>
              </NSpace>
              {this.config.apiKey && (
                <NText depth={3} style={{ fontSize: '12px', marginTop: '4px' }}>
                  {{
                    default: () => `当前密钥: ${this.maskedApiKey}`
                  }}
                </NText>
              )}
            </div>

            {/* 模型选择 */}
            <div>
              <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                <NIcon component={Cpu} color="#722ed1" />
                <NText strong>
                  {{
                    default: () => 'AI 模型'
                  }}
                </NText>
                {this.selectedModelInfo && (
                  <NTag size="small" type="success">
                    {{
                      default: () => '预设'
                    }}
                  </NTag>
                )}
                {this.isCustomModel && (
                  <NTag size="small" type="info">
                    {{
                      default: () => '自定义'
                    }}
                  </NTag>
                )}
                {this.useStaticModels && (
                  <NTag size="small" type="default">
                    {{
                      default: () => '静态列表'
                    }}
                  </NTag>
                )}
                {!this.useStaticModels && (
                  <NTag size="small" type="warning">
                    {{
                      default: () => '动态列表'
                    }}
                  </NTag>
                )}
                <div style={{ marginLeft: 'auto' }}>
                  <NSpace size="small">
                    <NTooltip>
                      {{
                        trigger: () => (
                          <NButton
                            size="tiny"
                            circle
                            onClick={this.toggleModelListType}
                            disabled={this.isLoadingModels}
                          >
                            {{
                              icon: () => <NIcon component={SwapHorizontal} />
                            }}
                          </NButton>
                        ),
                        default: () => this.useStaticModels ? '切换到动态模型列表' : '切换到静态模型列表'
                      }}
                    </NTooltip>
                    <NTooltip>
                      {{
                        trigger: () => (
                          <NButton
                            size="tiny"
                            circle
                            onClick={this.fetchDynamicModels}
                            loading={this.isLoadingModels}
                            disabled={!this.config.apiKey}
                          >
                            {{
                              icon: () => <NIcon component={Refresh} />
                            }}
                          </NButton>
                        ),
                        default: () => '刷新模型列表'
                      }}
                    </NTooltip>
                  </NSpace>
                </div>
              </NSpace>
              {/* {JSON.stringify(this.modelOptions)} */}
              <NSelect
                value={this.config.model}
                options={this.modelOptions}
                placeholder="选择或输入 AI 模型名称"
                filterable
                tag
                clearable
                onUpdateValue={(value: string) => this.updateConfig('model', value)}

              />

{/* renderLabe1l={(option: any) => (
                  <NSpace align="center" justify="space-between" style={{ width: '100%' }}>
                    {{
                      default: () => [
                        {option}
                        ,
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
                renderOp1tion={ ({ node, option }: { node: VNode, option: SelectOption }) => (
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
                )} */}
              <NSpace style={{ marginTop: '4px' }}>
                {this.selectedModelInfo && (
                  <NText depth={3} style={{ fontSize: '12px' }}>
                    {{
                      default: () => `预设模型: ${this.selectedModelInfo?.label || ''}`
                    }}
                  </NText>
                )}
                {this.isCustomModel && (
                  <NText depth={3} style={{ fontSize: '12px', color: '#1890ff' }}>
                    {{
                      default: () => `自定义模型: ${this.config.model}`
                    }}
                  </NText>
                )}
              </NSpace>
              <NSpace vertical size="small" style={{ marginTop: '4px' }}>
                <NText depth={3} style={{ fontSize: '11px', color: '#999' }}>
                  {{
                    default: () => '💡 可以从下拉列表选择预设模型，或输入自定义模型名称后按回车创建'
                  }}
                </NText>
                {this.useStaticModels ? (
                  <NText depth={3} style={{ fontSize: '11px', color: '#666' }}>
                    {{
                      default: () => '📋 当前使用静态模型列表，点击刷新按钮获取最新模型'
                    }}
                  </NText>
                ) : (
                  <NText depth={3} style={{ fontSize: '11px', color: '#1890ff' }}>
                    {{
                      default: () => `🔄 动态模型列表 (${this.dynamicModels.length} 个模型)`
                    }}
                  </NText>
                )}
              </NSpace>
            </div>

            {/* 自定义API端点 */}
            {this.needsBaseUrl && (
              <div>
                <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                  <NIcon component={Link} color="#13c2c2" />
                  <NText strong>
                    {{
                      default: () => 'API 端点'
                    }}
                  </NText>
                  <NTooltip>
                    {{
                      trigger: () => <NIcon component={Warning} color="#faad14" size={14} />,
                      default: () => '请输入兼容OpenAI格式的API端点URL'
                    }}
                  </NTooltip>
                </NSpace>
                <NInput
                  value={this.config.baseUrl || ''}
                  placeholder="https://api.example.com/v1/chat/completions"
                  onUpdateValue={(value: string) => this.updateConfig('baseUrl', value)}
                />
              </div>
            )}

            {/* OpenAI 组织ID */}
            {this.needsOrganization && (
              <div>
                <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                  <NIcon component={Settings} color="#722ed1" />
                  <NText strong>
                    {{
                      default: () => '组织ID（可选）'
                    }}
                  </NText>
                  <NTooltip>
                    {{
                      trigger: () => <NIcon component={Warning} color="#faad14" size={14} />,
                      default: () => 'OpenAI组织ID，如果您属于某个组织请填写'
                    }}
                  </NTooltip>
                </NSpace>
                <NInput
                  value={this.config.organization || ''}
                  placeholder="org-xxxxxxxxxxxxxxxxxx"
                  onUpdateValue={(value: string) => this.updateConfig('organization', value)}
                />
              </div>
            )}

            {/* 配置提示 */}
            <NAlert type="info" showIcon={false}>
              {{
                default: () => (
                  <NSpace vertical size="small">
                    <NText strong>
                      {{
                        default: () => '💡 配置提示'
                      }}
                    </NText>
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      {this.config.provider === 'openrouter' && (
                        <li>推荐使用免费的 Gemini 2.0 Flash 模型，速度快且质量高</li>
                      )}
                      {this.config.provider === 'openai' && (
                        <li>需要有效的 OpenAI API 密钥，支持 GPT-4 系列模型</li>
                      )}
                      {this.config.provider === 'gemini' && (
                        <li>需要 Google AI Studio API 密钥，支持 Gemini 系列模型</li>
                      )}
                      {this.config.provider === 'anthropic' && (
                        <li>需要 Anthropic API 密钥，支持 Claude 系列模型</li>
                      )}
                      {this.config.provider === 'deepseek' && (
                        <li>需要 DeepSeek API 密钥，支持 DeepSeek 系列模型</li>
                      )}
                      {this.config.provider === 'doubao' && (
                        <li>需要字节跳动豆包 API 密钥</li>
                      )}
                      {this.config.provider === 'qwen' && (
                        <li>需要阿里云千问 API 密钥</li>
                      )}
                      {this.config.provider === 'custom' && (
                        <li>请确保API端点兼容OpenAI格式</li>
                      )}
                      <li>API 密钥会安全存储在本地浏览器中</li>
                      <li>配置保存后即可开始生成主题</li>
                    </ul>
                  </NSpace>
                )
              }}
            </NAlert>

            {/* 保存按钮 */}
            <NButton
              type="primary"
              size="large"
              block
              onClick={this.onSave}
              disabled={!this.config.apiKey || !this.config.model}
            >
              {{
                icon: () => <NIcon component={Settings} />,
                default: () => '保存配置'
              }}
            </NButton>
          </NSpace>
        </NCard>

        {/* JSON 主题导入 */}
        <NCard title="📥 导入主题" size="small">
          <NSpace vertical size="medium">
            {/* 导入说明 */}
            <NSpace align="center" size="small">
              <NIcon component={DocumentText} color="#1890ff" />
              <NText>
                {{
                  default: () => '可以直接粘贴 JSON 格式的主题配置进行快速导入'
                }}
              </NText>
            </NSpace>

            {/* 展开/收起按钮 */}
            <NButton
              secondary
              block
              onClick={this.toggleJsonImport}
            >
              {{
                icon: () => <NIcon component={this.showJsonImport ? CloudUpload : Download} />,
                default: () => this.showJsonImport ? '收起导入面板' : '展开导入面板'
              }}
            </NButton>

            {/* JSON 输入区域 */}
            {this.showJsonImport && (
              <NSpace vertical size="medium">
                <NInput
                  value={this.jsonInput}
                  type="textarea"
                  placeholder="请粘贴 JSON 主题配置..."
                  rows={8}
                  onUpdateValue={(value: string) => { this.jsonInput = value }}
                  style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                />

                {/* 错误提示 */}
                {this.importError && (
                  <NAlert type="error" showIcon>
                    {{
                      default: () => this.importError
                    }}
                  </NAlert>
                )}

                {/* 成功提示 */}
                {this.importSuccess && (
                  <NAlert type="success" showIcon>
                    {{
                      default: () => '🎉 主题导入成功！'
                    }}
                  </NAlert>
                )}

                {/* 操作按钮 */}
                <NSpace>
                  <NButton
                    type="primary"
                    onClick={this.handleImportJson}
                    disabled={!this.jsonInput.trim()}
                  >
                    {{
                      icon: () => <NIcon component={CloudUpload} />,
                      default: () => '导入主题'
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
                            default: () => '📋 使用说明'
                          }}
                        </NText>
                        <ul style={{ margin: 0, paddingLeft: '16px' }}>
                          <li>支持标准的 Naive UI 主题配置格式</li>
                          <li>可以导入从其他地方复制的主题 JSON</li>
                          <li>导入后会自动应用到当前主题编辑器</li>
                          <li>支持完整的主题覆盖配置</li>
                        </ul>
                      </NSpace>
                    )
                  }}
                </NAlert>
              </NSpace>
            )}
          </NSpace>
        </NCard>
      </NSpace>
    )
  }
})

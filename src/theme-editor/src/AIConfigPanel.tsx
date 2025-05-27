// AI 配置面板组件

import { defineComponent, ref, computed, h } from 'vue'
import { useLocale } from '../../../_mixins'
import { 
  NCard, NSpace, NInput, NSelect, NButton, NText, NIcon, NAlert, 
  NTag, NTooltip, NGrid, NGi, NStatistic, NProgress, NSwitch
} from 'naive-ui'
import { 
  Settings, Key, Cog as Cpu, CheckmarkCircle, Warning, 
  Flash, Globe, Sparkles, CreateOutline
} from '@vicons/ionicons5'
import { AI_PROVIDERS, FREE_OPENROUTER_MODELS, OLLAMA_MODELS, type AIProviderConfig } from './ai-config'

export interface AIConfigPanelProps {
  config: AIProviderConfig
  onConfigChange: (config: AIProviderConfig) => void
  onSave: () => void
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
      type: Function as () => (config: AIProviderConfig) => void,
      required: true
    },
    onSave: {
      type: Function as () => () => void,
      required: true
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
    const { localeRef } = useLocale('ThemeEditor')
    const showApiKey = ref(false)
    const useCustomModelInput = ref(false)

    const isOllamaProvider = computed(() => props.config.provider === 'ollama')

    // 计算API密钥的显示状态
    const maskedApiKey = computed(() => {
      if (!props.config.apiKey || isOllamaProvider.value) return ''
      if (showApiKey.value) return props.config.apiKey
      return props.config.apiKey.slice(0, 8) + '••••••••' + props.config.apiKey.slice(-4)
    })

    // 计算连接状态
    const connectionStatus = computed(() => {
      if (isOllamaProvider.value) {
        // For Ollama, connection status might depend on local server reachability,
        // but for config panel, we assume it's "configurable" without an API key.
        // A true connection test would be out of scope for this panel.
        // We can indicate it's ready for use if a model is selected.
        return props.config.model 
          ? { type: 'info', text: '准备就绪 (Ollama)', color: '#1890ff' }
          : { type: 'warning', text: '请选择模型 (Ollama)', color: '#faad14' };
      }
      if (!props.config.apiKey) return { type: 'warning', text: '未配置API密钥', color: '#faad14' }
      if (props.isConnected) return { type: 'success', text: '已连接', color: '#52c41a' }
      return { type: 'default', text: '未知 (需要API密钥)', color: '#d9d9d9' }
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

    const currentModelList = computed(() => {
      if (props.config.provider === 'ollama') {
        return OLLAMA_MODELS
      }
      return FREE_OPENROUTER_MODELS
    })

    // 获取模型信息
    const selectedModelInfo = computed(() => {
      if (useCustomModelInput.value) {
        return { label: `自定义: ${props.config.model}`, value: props.config.model };
      }
      return currentModelList.value.find(model => model.value === props.config.model)
    })

    // 更新配置
    const updateConfig = (key: keyof AIProviderConfig, value: string | boolean) => {
      const newConfig = {
        ...props.config,
        [key]: value
      }
      // If provider changes to ollama, clear API key if it's not already user-modified for ollama
      if (key === 'provider' && value === 'ollama') {
        newConfig.apiKey = '' // Clear API key for Ollama
        useCustomModelInput.value = false // Reset custom model input
        // Set to default model for Ollama if current model not in OLLAMA_MODELS
        const currentOllamaModels = OLLAMA_MODELS.map(m => m.value)
        if (!currentOllamaModels.includes(newConfig.model)) {
          newConfig.model = OLLAMA_MODELS.length > 0 ? OLLAMA_MODELS[0].value : ''
        }
      } else if (key === 'provider' && value === 'openrouter') {
        useCustomModelInput.value = false // Reset custom model input
        // Set to default model for OpenRouter if current model not in FREE_OPENROUTER_MODELS
        const currentOpenRouterModels = FREE_OPENROUTER_MODELS.map(m => m.value)
        if (!currentOpenRouterModels.includes(newConfig.model)) {
          newConfig.model = FREE_OPENROUTER_MODELS.length > 0 ? FREE_OPENROUTER_MODELS[0].value : ''
        }
      }
      props.onConfigChange(newConfig)
    }
    
    const handleProviderChange = (value: string) => {
      updateConfig('provider', value)
    }

    const handleModelChange = (value: string) => {
      updateConfig('model', value)
    }
    
    const handleApiKeyChange = (value: string) => {
      updateConfig('apiKey', value)
    }

    return {
      showApiKey,
      useCustomModelInput,
      isOllamaProvider,
      currentModelList,
      maskedApiKey,
      connectionStatus,
      formatLastUsed,
      selectedModelInfo,
      updateConfig,
      handleProviderChange,
      handleModelChange,
      handleApiKeyChange,
      localeRef
    }
  },
  render() {
    const isSaveDisabled = computed(() => {
      if (this.isOllamaProvider) {
        return !this.config.model // For Ollama, only model is required
      }
      return !this.config.apiKey || !this.config.model // For others, API key and model are required
    })

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
                        {this.connectionStatus.text}
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
                      {this.formatLastUsed(this.lastUsed)}
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
                <NText strong>AI 供应商</NText>
              </NSpace>
              <NSelect
                value={this.config.provider}
                options={AI_PROVIDERS}
                placeholder="选择 AI 供应商"
                onUpdateValue={(value: string) => this.updateConfig('provider', value)}
                renderLabel={(option: any) => (
                  <NSpace align="center">
                    <NIcon component={Flash} color="#52c41a" size={14} />
                    {option.label}
                  </NSpace>
                )}
              />
            </div>

            {/* API 密钥 */}
            {!this.isOllamaProvider && (
              <div>
                <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                  <NIcon component={Key} color="#fa8c16" />
                  <NText strong>API 密钥</NText>
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
                    onUpdateValue={this.handleApiKeyChange}
                    style={{ flex: 1 }}
                    showPasswordOn="click"
                  />
                  <NButton
                    size="small"
                    onClick={() => { this.showApiKey = !this.showApiKey }}
                  >
                    {this.showApiKey ? '隐藏' : '显示'}
                  </NButton>
                </NSpace>
                {this.config.apiKey && (
                  <NText depth={3} style={{ fontSize: '12px', marginTop: '4px' }}>
                    当前密钥: {this.maskedApiKey}
                  </NText>
                )}
              </div>
            )}
            {this.isOllamaProvider && (
               <NAlert type="info" title="Ollama Provider" showIcon={false} style={{ marginBottom: '12px' }}>
                {this.localeRef.ollamaApiKeyMessage}
              </NAlert>
            )}

            {/* 模型选择 */}
            <div>
              <NSpace align="center" justify="space-between" style={{ marginBottom: '8px' }}>
                <NSpace align="center" size="small">
                  <NIcon component={Cpu} color="#722ed1" />
                  <NText strong>AI 模型</NText>
                  {this.selectedModelInfo && !this.useCustomModelInput && this.selectedModelInfo.value.includes(':free') && (
                    <NTag size="small" type="success">
                      免费
                    </NTag>
                  )}
                </NSpace>
                <NSpace align="center" size="small">
                  <NText style={{fontSize: '12px'}}>{this.localeRef.useCustomModel}</NText>
                  <NSwitch value={this.useCustomModelInput} onUpdateValue={(val: boolean) => this.useCustomModelInput = val}>
                    {{
                      checked: () => <NIcon component={CreateOutline} />,
                      unchecked: () => <NIcon component={Cpu} /> // Use aliased Cog (Cpu)
                    }}
                  </NSwitch>
                </NSpace>
              </NSpace>

              {this.useCustomModelInput ? (
                <NInput
                  value={this.config.model}
                  placeholder={this.localeRef.customModelPlaceholder}
                  onUpdateValue={this.handleModelChange}
                />
              ) : (
                <NSelect
                  value={this.config.model}
                  options={this.currentModelList}
                  placeholder="选择 AI 模型"
                  filterable
                  onUpdateValue={this.handleModelChange}
                  renderLabel={(option: any) => (
                    <NSpace align="center" justify="space-between" style={{ width: '100%' }}>
                      <NText>{option.label}</NText>
                      {option.value.includes(':free') && (
                        <NTag size="tiny" type="success">免费</NTag>
                      )}
                    </NSpace>
                  )}
                />
              )}
              {this.selectedModelInfo && (
                <NText depth={3} style={{ fontSize: '12px', marginTop: '4px' }}>
                  已选择: {this.selectedModelInfo.label}
                </NText>
              )}
            </div>

            {/* 配置提示 */}
            <NAlert type="info" showIcon={false}>
              {{
                default: () => (
                  <NSpace vertical size="small">
                    <NText strong>💡 配置提示</NText>
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      <li>推荐使用免费的 Gemini 2.0 Flash 模型，速度快且质量高</li>
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
              disabled={isSaveDisabled.value}
            >
              {{
                icon: () => <NIcon component={Settings} />,
                default: () => this.localeRef.saveConfig // Also localize the save button text
              }}
            </NButton>
          </NSpace>
        </NCard>
      </NSpace>
    )
  }
})

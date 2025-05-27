// AI 思考过程可视化组件 - 类似 Grok 的思考窗口

import { defineComponent, ref, computed, watch, nextTick, h, Fragment } from 'vue'
import {
  NCard, NSpace, NText, NScrollbar, NIcon, NButton, NProgress, NTag
} from 'naive-ui'
import {
  Flash, CheckmarkCircle, AlertCircle, Close, Settings
} from '@vicons/ionicons5'

export interface ThinkingStep {
  id: string
  type: 'thinking' | 'analyzing' | 'generating' | 'validating' | 'complete' | 'error'
  content: string
  timestamp: number
  duration?: number
}

export interface AIThinkingProcessProps {
  visible: boolean
  isThinking: boolean
  steps: ThinkingStep[]
  currentContent?: string
  onClose?: () => void
}

export default defineComponent({
  name: 'AIThinkingProcess',
  props: {
    visible: { type: Boolean, default: false },
    isThinking: { type: Boolean, default: false },
    steps: { type: Array as () => ThinkingStep[], default: () => [] },
    currentContent: String,
    onClose: Function
  },
  setup(props) {
    const scrollbarRef = ref<any>(null)
    const containerRef = ref<HTMLElement>()
    const typewriterText = ref('')
    const typewriterIndex = ref(0)
    const isTyping = ref(false)

    // 当前正在显示的步骤
    const currentStep = computed(() => {
      return props.steps[props.steps.length - 1]
    })

    // 思考进度
    const thinkingProgress = computed(() => {
      if (!props.isThinking) return 100
      return Math.min((props.steps.length / 5) * 100, 95)
    })

    // 获取步骤图标
    const getStepIcon = (type: string) => {
      switch (type) {
        case 'thinking': return Settings
        case 'analyzing': return Flash
        case 'generating': return Flash
        case 'validating': return CheckmarkCircle
        case 'complete': return CheckmarkCircle
        case 'error': return AlertCircle
        default: return Settings
      }
    }

    // 获取步骤颜色
    const getStepColor = (type: string) => {
      switch (type) {
        case 'thinking': return '#1890ff'
        case 'analyzing': return '#722ed1'
        case 'generating': return '#fa8c16'
        case 'validating': return '#52c41a'
        case 'complete': return '#52c41a'
        case 'error': return '#ff4d4f'
        default: return '#1890ff'
      }
    }

    // 获取步骤标签
    const getStepLabel = (type: string) => {
      switch (type) {
        case 'thinking': return '思考中'
        case 'analyzing': return '分析中'
        case 'generating': return '生成中'
        case 'validating': return '验证中'
        case 'complete': return '完成'
        case 'error': return '错误'
        default: return '处理中'
      }
    }

    // 增强的打字机效果
    const typewriterEffect = (text: string) => {
      if (!text) return

      isTyping.value = true
      typewriterText.value = ''
      typewriterIndex.value = 0

      const typeNextChar = () => {
        if (typewriterIndex.value < text.length) {
          const char = text[typewriterIndex.value]
          typewriterText.value += char
          typewriterIndex.value++

          // 根据字符类型调整打字速度
          let delay = 30
          if (char === '.' || char === '。' || char === '！' || char === '？') {
            delay = 200 // 句号后停顿更长
          } else if (char === ',' || char === '，') {
            delay = 100 // 逗号后短暂停顿
          } else if (char === ' ') {
            delay = 50 // 空格稍快
          } else {
            delay = 20 + Math.random() * 40 // 随机延迟模拟真实打字
          }

          setTimeout(typeNextChar, delay)
        } else {
          isTyping.value = false
          // 自动滚动到底部
          scrollToBottom()
        }
      }

      typeNextChar()
    }

    // 自动滚动到底部
    const scrollToBottom = async () => {
      await nextTick()
      if (scrollbarRef.value) {
        scrollbarRef.value.scrollTo({ top: 999999, behavior: 'smooth' })
      }
    }

    // 监听步骤变化
    watch(() => props.steps.length, () => {
      scrollToBottom()
    })

    // 监听当前内容变化，触发打字机效果
    watch(() => props.currentContent, (newContent) => {
      if (newContent && props.isThinking) {
        typewriterEffect(newContent)
      }
    })

    // 监听可见性变化
    watch(() => props.visible, (visible) => {
      if (visible) {
        scrollToBottom()
      }
    })

    return {
      scrollbarRef,
      containerRef,
      typewriterText,
      isTyping,
      currentStep,
      thinkingProgress,
      getStepIcon,
      getStepColor,
      getStepLabel,
      scrollToBottom
    }
  },
  render() {
    if (!this.visible) return null

    return (
      <NCard
        class="ai-thinking-window"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '420px',
          maxHeight: '600px',
          zIndex: 1000,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 30, 0.95) 100%)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          transform: this.visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        contentStyle={{ padding: 0 }}
      >
        {{
          default: () => (
            <NSpace vertical size={0}>
              {/* 头部 */}
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
                backgroundSize: '200% 200%',
                animation: this.isThinking ? 'gradient-shift 3s ease-in-out infinite' : 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                position: 'relative'
              }}>
                <NSpace align="center" justify="space-between">
                  <NSpace align="center">
                    <NIcon
                      component={Settings}
                      size={18}
                      color="white"
                      style={{
                        animation: this.isThinking ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                    <NText style={{ color: 'white', fontWeight: 600 }}>
                      {{
                        default: () => 'AI 思考过程'
                      }}
                    </NText>
                    {this.isThinking && (
                      <NTag size="small" type="info" style={{ background: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none' }}>
                        {{
                          default: () => this.getStepLabel(this.currentStep?.type || 'thinking')
                        }}
                      </NTag>
                    )}
                  </NSpace>
                  {this.onClose && (
                    <NButton
                      size="small"
                      quaternary
                      style={{ color: 'white' }}
                      onClick={() => this.onClose?.()}
                    >
                      <NIcon component={Close} />
                    </NButton>
                  )}
                </NSpace>

                {/* 进度条 */}
                {this.isThinking && (
                  <div style={{ marginTop: '8px' }}>
                    <NProgress
                      type="line"
                      percentage={this.thinkingProgress}
                      showIndicator={false}
                      height={3}
                      color="rgba(255, 255, 255, 0.8)"
                      railColor="rgba(255, 255, 255, 0.2)"
                    />
                  </div>
                )}
              </div>

              {/* 思考内容 */}
              <div style={{ height: '400px' }}>
                <NScrollbar ref="scrollbarRef" style={{ height: '100%' }}>
                  <div style={{ padding: '16px' }}>
                    <NSpace vertical size="medium">
                      {/* 历史步骤 */}
                      {this.steps.map((step) => (
                        <div key={step.id} style={{
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          borderLeft: `3px solid ${this.getStepColor(step.type)}`
                        }}>
                          <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                            <NIcon
                              component={this.getStepIcon(step.type)}
                              size={14}
                              color={this.getStepColor(step.type)}
                            />
                            <NText style={{ color: this.getStepColor(step.type), fontSize: '12px', fontWeight: 600 }}>
                              {{
                                default: () => this.getStepLabel(step.type)
                              }}
                            </NText>
                            <NText style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px' }}>
                              {{
                                default: () => new Date(step.timestamp).toLocaleTimeString()
                              }}
                            </NText>
                            {step.duration && (
                              <NText style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px' }}>
                                {{
                                  default: () => `${step.duration}ms`
                                }}
                              </NText>
                            )}
                          </NSpace>
                          <NText style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            display: 'block'
                          }}>
                            {{
                              default: () => step.content
                            }}
                          </NText>
                        </div>
                      ))}

                      {/* 当前思考内容（打字机效果） */}
                      {this.isThinking && this.typewriterText && (
                        <div style={{
                          padding: '12px',
                          background: 'rgba(102, 126, 234, 0.1)',
                          borderRadius: '8px',
                          borderLeft: '3px solid #667eea'
                        }}>
                          <NSpace align="center" size="small" style={{ marginBottom: '8px' }}>
                            <NIcon
                              component={Settings}
                              size={14}
                              color="#667eea"
                              style={{ animation: 'pulse 1.5s infinite' }}
                            />
                            <NText style={{ color: '#667eea', fontSize: '12px', fontWeight: 600 }}>
                              {{
                                default: () => '正在思考...'
                              }}
                            </NText>
                          </NSpace>
                          <NText style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            display: 'block'
                          }}>
                            {{
                              default: () => (
                                <>
                                  {this.typewriterText}
                                  {this.isTyping && (
                                    <span style={{
                                      animation: 'blink 1s infinite',
                                      color: '#667eea'
                                    }}>|</span>
                                  )}
                                </>
                              )
                            }}
                          </NText>
                        </div>
                      )}
                    </NSpace>
                  </div>
                </NScrollbar>
              </div>
            </NSpace>
          )
        }}
      </NCard>
    )
  }
})

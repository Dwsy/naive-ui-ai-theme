// AI 主题生成过程可视化组件

import { defineComponent, ref, computed, watch, nextTick,h } from 'vue'
import { NCard, NSpace, NProgress, NText, NCode, NScrollbar, NTimeline, NTimelineItem, NIcon, NButton, NCollapse, NCollapseItem } from 'naive-ui'
import { CheckmarkCircle, Time, AlertCircle } from '@vicons/ionicons5'

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

export interface AIGenerationProcessProps {
  visible: boolean
  steps: GenerationStep[]
  currentStep?: string
  progress: number
  rawResponse?: string
  parsedResult?: any
  onClose?: () => void
}

export default defineComponent({
  name: 'AIGenerationProcess',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array as () => GenerationStep[],
      default: () => []
    },
    currentStep: String,
    progress: {
      type: Number,
      default: 0
    },
    rawResponse: String,
    parsedResult: Object,
    onClose: Function
  },
  setup(props) {
    const scrollbarRef = ref()
    const activeCollapseKeys = ref(['timeline'])

    // 计算当前步骤的状态
    const currentStepData = computed(() => {
      return props.steps.find(step => step.id === props.currentStep)
    })

    // 计算完成的步骤数
    const completedSteps = computed(() => {
      return props.steps.filter(step => step.status === 'success').length
    })

    // 计算总耗时
    const totalDuration = computed(() => {
      const completedSteps = props.steps.filter(step => step.status === 'success' && step.startTime && step.endTime)
      if (completedSteps.length === 0) return 0
      
      const firstStart = Math.min(...completedSteps.map(step => step.startTime!))
      const lastEnd = Math.max(...completedSteps.map(step => step.endTime!))
      return lastEnd - firstStart
    })

    // 格式化持续时间
    const formatDuration = (ms: number) => {
      if (ms < 1000) return `${ms}ms`
      return `${(ms / 1000).toFixed(1)}s`
    }

    // 获取步骤图标
    const getStepIcon = (step: GenerationStep) => {
      switch (step.status) {
        case 'success':
          return CheckmarkCircle
        case 'error':
          return AlertCircle
        case 'running':
          return Time
        default:
          return Time
      }
    }

    // 获取步骤颜色
    const getStepColor = (step: GenerationStep) => {
      switch (step.status) {
        case 'success':
          return '#52c41a'
        case 'error':
          return '#ff4d4f'
        case 'running':
          return '#1890ff'
        default:
          return '#d9d9d9'
      }
    }

    // 监听步骤变化，自动滚动到当前步骤
    watch(() => props.currentStep, () => {
      nextTick(() => {
        if (scrollbarRef.value) {
          scrollbarRef.value.scrollTo({ top: scrollbarRef.value.scrollHeight })
        }
      })
    })

    return {
      scrollbarRef,
      activeCollapseKeys,
      currentStepData,
      completedSteps,
      totalDuration,
      formatDuration,
      getStepIcon,
      getStepColor
    }
  },
  render() {
    if (!this.visible) return null

    return (
      <NCard
        title="🤖 AI 主题生成过程"
        style={{
          width: '100%',
          maxHeight: '600px',
          marginTop: '16px'
        }}
        headerStyle={{
          color: 'white',
          borderRadius: '6px 6px 0 0'
        }}
        contentStyle={{ padding: 0 }}
      >
        {{
          'header-extra': () => (
            <NSpace align="center">
              <NText style={{ color: 'white', fontSize: '14px' }}>
                {this.completedSteps}/{this.steps.length} 步骤完成
              </NText>
              {this.totalDuration > 0 && (
                <NText style={{ color: 'white', fontSize: '12px' }}>
                  耗时: {this.formatDuration(this.totalDuration)}
                </NText>
              )}
              {this.onClose && (
                <NButton
                  size="small"
                  quaternary
                  style={{ color: 'white' }}
                  onClick={this.onClose}
                >
                  ✕
                </NButton>
              )}
            </NSpace>
          ),
          default: () => (
            <NSpace vertical size={0}>
              {/* 进度条 */}
              <div style={{ padding: '16px 20px 0' }}>
                <NProgress
                  type="line"
                  percentage={this.progress}
                  status={this.steps.some(s => s.status === 'error') ? 'error' : 'default'}
                  showIndicator={false}
                  height={6}
                  borderRadius={3}
                />
              </div>

              <NCollapse value={this.activeCollapseKeys} onUpdateValue={(keys: string[]) => { this.activeCollapseKeys = keys }}>
                {/* 时间线 */}
                <NCollapseItem title="📋 生成步骤" name="timeline">
                  <NScrollbar
                    ref="scrollbarRef"
                    style={{ maxHeight: '200px', padding: '0 20px' }}
                  >
                    <NTimeline>
                      {this.steps.map(step => (
                        <NTimelineItem
                          key={step.id}
                          type={step.status === 'error' ? 'error' : step.status === 'success' ? 'success' : 'info'}
                          title={step.title}
                          content={step.description}
                          time={step.endTime ? this.formatDuration(step.endTime - (step.startTime || 0)) : undefined}
                        >
                          {{
                            icon: () => (
                              <NIcon
                                component={this.getStepIcon(step)}
                                color={this.getStepColor(step)}
                                size={16}
                              />
                            )
                          }}
                        </NTimelineItem>
                      ))}
                    </NTimeline>
                  </NScrollbar>
                </NCollapseItem>

                {/* 原始响应 */}
                {this.rawResponse && (
                  <NCollapseItem title="📄 AI 原始响应" name="raw-response">
                    <div style={{ padding: '0 20px 16px' }}>
                      <NCode
                        language="json"
                        code={this.rawResponse}
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </NCollapseItem>
                )}

                {/* 解析结果 */}
                {this.parsedResult && (
                  <NCollapseItem title="🎨 解析后的主题配置" name="parsed-result">
                    <div style={{ padding: '0 20px 16px' }}>
                      <NCode
                        language="json"
                        code={JSON.stringify(this.parsedResult, null, 2)}
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  </NCollapseItem>
                )}
              </NCollapse>
            </NSpace>
          )
        }}
      </NCard>
    )
  }
})

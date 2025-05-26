// 主题生成面板组件

import { defineComponent, ref, computed,h } from 'vue'
import {
  NCard, NSpace, NInput, NSelect, NButton, NText, NIcon, NCheckbox,
  NCheckboxGroup, NGrid, NGi, NTag, NTooltip, NAlert, NStatistic,
  NProgress, NCollapse, NCollapseItem
} from 'naive-ui'
import {
  BagCheckOutline as Palette, Sparkles, 
  Cube, Flash, Bulb
} from '@vicons/ionicons5'
import { PRESET_STYLES } from './ai-config'

export interface ThemeGenerationPanelProps {
  prompt: string
  style: string | undefined
  selectedComponents: string[]
  allComponents: string[]
  isGenerating: boolean
  onPromptChange: (value: string) => void
  onStyleChange: (value: string | undefined) => void
  onComponentsChange: (value: string[]) => void
  onSelectAllComponents: () => void
  onGenerate: () => void
}

export default defineComponent({
  name: 'ThemeGenerationPanel',
  props: {
    prompt: {
      type: String,
      required: true
    },
    style: String,
    selectedComponents: {
      type: Array as () => string[],
      required: true
    },
    allComponents: {
      type: Array as () => string[],
      required: true
    },
    isGenerating: {
      type: Boolean,
      default: false
    },
    onPromptChange: {
      type: Function as () => (value: string) => void,
      required: true
    },
    onStyleChange: {
      type: Function as () => (value: string | undefined) => void,
      required: true
    },
    onComponentsChange: {
      type: Function as () => (value: string[]) => void,
      required: true
    },
    onSelectAllComponents: {
      type: Function as () => () => void,
      required: true
    },
    onGenerate: {
      type: Function as () => () => void,
      required: true
    }
  },
  setup(props) {
    const expandedSections = ref(['prompt', 'components'])

    // 计算选择状态
    const selectionState = computed(() => {
      const selected = props.selectedComponents.length
      const total = props.allComponents.length
      const percentage = total > 0 ? Math.round((selected / total) * 100) : 0

      return {
        selected,
        total,
        percentage,
        isAllSelected: selected === total,
        isIndeterminate: selected > 0 && selected < total
      }
    })

    // 计算生成按钮状态
    const canGenerate = computed(() => {
      return props.prompt.trim().length > 0 && props.selectedComponents.length > 0
    })

    // 获取预设风格的显示信息
    const selectedStyleInfo = computed(() => {
      return PRESET_STYLES.find(style => style.value === props.style)
    })

    // 组件分类
    const componentCategories = computed(() => {
      const categories: Record<string, string[]> = {
        '通用': [],
        '布局': [],
        '导航': [],
        '数据录入': [],
        '数据展示': [],
        '反馈': [],
        '其他': []
      }

      // 简单的组件分类逻辑
      props.allComponents.forEach(component => {
        if (['Button', 'Icon', 'Typography'].includes(component)) {
          categories['通用'].push(component)
        } else if (['Grid', 'Layout', 'Space', 'Divider'].includes(component)) {
          categories['布局'].push(component)
        } else if (['Menu', 'Breadcrumb', 'Pagination', 'Steps'].includes(component)) {
          categories['导航'].push(component)
        } else if (['Input', 'Select', 'Form', 'Checkbox', 'Radio'].includes(component)) {
          categories['数据录入'].push(component)
        } else if (['Table', 'List', 'Card', 'Avatar', 'Badge'].includes(component)) {
          categories['数据展示'].push(component)
        } else if (['Alert', 'Message', 'Modal', 'Notification'].includes(component)) {
          categories['反馈'].push(component)
        } else {
          categories['其他'].push(component)
        }
      })

      return Object.entries(categories).filter(([_, components]) => components.length > 0)
    })

    return {
      expandedSections,
      selectionState,
      canGenerate,
      selectedStyleInfo,
      componentCategories
    }
  },
  render() {
    return (
      <NSpace vertical size="large">
        {/* 生成统计 */}
        <NCard size="small" style={{
          color: 'white'
        }} headerStyle={{ color: 'white', borderBottom: 'none' }}>
          <NGrid cols={3} xGap={16}>
            <NGi>
              <NStatistic label="提示词长度" value={this.prompt.length} tabularNums>
                {{
                  suffix: () => <NText style={{ color: 'white' }}> 字符</NText>
                }}
              </NStatistic>
            </NGi>
            <NGi>
              <NStatistic label="选中组件" value={this.selectionState.selected} tabularNums>
                {{
                  suffix: () => <NText style={{ color: 'white' }}> / {this.selectionState.total}</NText>
                }}
              </NStatistic>
            </NGi>
            <NGi>
              <NStatistic label="覆盖率" value={this.selectionState.percentage} tabularNums>
                {{
                  suffix: () => <NText style={{ color: 'white' }}>%</NText>
                }}
              </NStatistic>
            </NGi>
          </NGrid>
        </NCard>

        <NCollapse
          value={this.expandedSections}

          defaultExpandedNames={['prompt']}
          onUpdateValue={(keys: string[]) => { this.expandedSections = keys }}
        >
          {/* 提示词输入 */}
          <NCollapseItem title="✨ 主题描述" name="prompt">
            {{
              'header-extra': () => (
                <NTag size="small" type={this.prompt.trim() ? 'success' : 'warning'}>
                  {this.prompt.trim() ? '已填写' : '必填'}
                </NTag>
              ),
              default: () => (
                <NSpace vertical>
                  <NInput
                    value={this.prompt}
                    type="textarea"
                    placeholder="请描述您想要的主题风格，例如：现代简约的蓝色主题，适合企业应用，按钮圆角较大，整体色调偏冷..."
                    rows={4}
                    onUpdateValue={this.onPromptChange}
                    maxlength={500}
                    showCount
                  />
                  <NAlert type="info" showIcon={false}>
                    {{
                      default: () => (
                        <NSpace vertical size="small">
                          <NText strong>💡 提示词建议</NText>
                          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px' }}>
                            <li>描述整体色调和风格（如：现代、复古、温馨等）</li>
                            <li>指定主色调偏好（如：蓝色系、绿色系等）</li>
                            <li>说明使用场景（如：企业应用、个人博客等）</li>
                            <li>提及特殊要求（如：高对比度、大圆角等）</li>
                          </ul>
                        </NSpace>
                      )
                    }}
                  </NAlert>
                </NSpace>
              )
            }}
          </NCollapseItem>

          {/* 预设风格 */}
          <NCollapseItem title="🎨 预设风格" name="style">
            {{
              'header-extra': () => (
                <NTag size="small" type={this.style ? 'info' : 'default'}>
                  {this.style ? '已选择' : '可选'}
                </NTag>
              ),
              default: () => (
                <NSpace vertical>
                  <NSelect
                    value={this.style}
                    options={PRESET_STYLES}
                    placeholder="选择预设风格（可选）"
                    clearable
                    onUpdateValue={(value: string | null) => this.onStyleChange(value || undefined)}
                    renderLabel={(option: any) => (
                      <NSpace align="center">
                        <NIcon component={Palette} color="#722ed1" size={14} />
                        {option.label}
                      </NSpace>
                    )}
                  />
                  {this.selectedStyleInfo && (
                    <NAlert type="info" showIcon={false}>
                      {{
                        default: () => (
                          <NSpace vertical size="small">
                            <NText strong>🎯 {this.selectedStyleInfo.label}</NText>
                            <NText depth={2} style={{ fontSize: '12px' }}>
                              {this.selectedStyleInfo.value}
                            </NText>
                          </NSpace>
                        )
                      }}
                    </NAlert>
                  )}
                </NSpace>
              )
            }}
          </NCollapseItem>

          {/* 组件选择 */}
          <NCollapseItem title="🧩 组件选择" name="components">
            {{
              'header-extra': () => (
                <NSpace size="small">
                  <NProgress
                    type="circle"
                    percentage={this.selectionState.percentage}
                    size={20}
                    showIndicator={false}
                  />
                  <NTag size="small" type={this.selectionState.selected > 0 ? 'success' : 'warning'}>
                    {this.selectionState.selected}/{this.selectionState.total}
                  </NTag>
                </NSpace>
              ),
              default: () => (
                <NSpace vertical>
                  {/* 全选控制 */}
                  <NSpace align="center" justify="space-between">
                    <NCheckbox
                      checked={this.selectionState.isAllSelected}
                      indeterminate={this.selectionState.isIndeterminate}
                      onUpdateChecked={this.onSelectAllComponents}
                    >
                      全选组件 ({this.selectionState.total} 个)
                    </NCheckbox>
                    <NText depth={3} style={{ fontSize: '12px' }}>
                      已选择 {this.selectionState.selected} 个组件
                    </NText>
                  </NSpace>

                  {/* 分类组件选择 */}
                  <NCheckboxGroup
                    value={this.selectedComponents}
                    onUpdateValue={this.onComponentsChange}
                  >
                    <NSpace vertical size="large">
                      {this.componentCategories.map(([category, components]) => (
                        <div key={category}>
                          <NText strong style={{ marginBottom: '8px', display: 'block' }}>
                            {category} ({components.length})
                          </NText>
                          <NGrid cols={3} xGap={8} yGap={8}>
                            {components.map(component => (
                              <NGi key={component}>
                                <NCheckbox value={component}>
                                  <NTooltip>
                                    {{
                                      trigger: () => (
                                        <NSpace align="center" size="small">
                                          <NIcon component={Cube} size={12} />
                                          {component}
                                        </NSpace>
                                      ),
                                      default: () => `${component} 组件主题配置`
                                    }}
                                  </NTooltip>
                                </NCheckbox>
                              </NGi>
                            ))}
                          </NGrid>
                        </div>
                      ))}
                    </NSpace>
                  </NCheckboxGroup>
                </NSpace>
              )
            }}
          </NCollapseItem>
        </NCollapse>

        {/* 生成按钮 */}
        <NButton
          type="primary"
          size="large"
          block
          loading={this.isGenerating}
          disabled={!this.canGenerate}
          onClick={this.onGenerate}
          style={{

            border: 'none',
            height: '48px'
          }}
        >
          {{
            icon: () => <NIcon component={this.isGenerating ? Flash : Sparkles} />,
            default: () => this.isGenerating ? '正在生成主题...' : '🚀 生成主题'
          }}
        </NButton>

        {!this.canGenerate && (
          <NAlert type="warning" showIcon={false}>
            {{
              default: () => (
                <NSpace align="center">
                  <NIcon component={Bulb} color="#faad14" />
                  <NText>
                    请填写主题描述并选择至少一个组件后开始生成
                  </NText>
                </NSpace>
              )
            }}
          </NAlert>
        )}
      </NSpace>
    )
  }
})

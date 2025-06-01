import type { NLocale } from './enUS'

const zhTW: NLocale = {
  name: 'zh-TW',
  global: {
    undo: '復原',
    redo: '重做',
    confirm: '確定',
    clear: '清除'
  },
  Popconfirm: {
    positiveText: '確定',
    negativeText: '取消'
  },
  Cascader: {
    placeholder: '請選擇',
    loading: '載入中',
    loadingRequiredMessage: (label: string): string =>
      `載入全部 ${label} 的子節點後才可選擇`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy 年',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: '清除',
    now: '現在',
    confirm: '確定',
    selectTime: '選擇時間',
    selectDate: '選擇日期',
    datePlaceholder: '選擇日期',
    datetimePlaceholder: '選擇日期時間',
    monthPlaceholder: '選擇月份',
    yearPlaceholder: '選擇年份',
    quarterPlaceholder: '選擇季度',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: '開始日期',
    endDatePlaceholder: '結束日期',
    startDatetimePlaceholder: '開始日期時間',
    endDatetimePlaceholder: '結束日期時間',
    startMonthPlaceholder: '開始月份',
    endMonthPlaceholder: '結束月份',
    monthBeforeYear: false,
    firstDayOfWeek: 0,
    today: '今天'
  },
  DataTable: {
    checkTableAll: '選擇全部表格資料',
    uncheckTableAll: '取消選擇全部表格資料',
    confirm: '確定',
    clear: '重設'
  },
  LegacyTransfer: {
    sourceTitle: '來源',
    targetTitle: '目標'
  },
  Transfer: {
    selectAll: '全選',
    unselectAll: '取消全選',
    clearAll: '清除全部',
    total: (num: number): string => `共 ${num} 項`,
    selected: (num: number): string => `已選 ${num} 項`
  },
  Empty: {
    description: '無資料'
  },
  Select: {
    placeholder: '請選擇'
  },
  TimePicker: {
    placeholder: '請選擇時間',
    positiveText: '確定',
    negativeText: '取消',
    now: '現在',
    clear: '清除'
  },
  Pagination: {
    goto: '跳至',
    selectionSuffix: '頁'
  },
  DynamicTags: {
    add: '新增'
  },
  Log: {
    loading: '載入中'
  },
  Input: {
    placeholder: '請輸入'
  },
  InputNumber: {
    placeholder: '請輸入'
  },
  DynamicInput: {
    create: '新增'
  },
  ThemeEditor: {
    title: '主題編輯器',
    clearAllVars: '清除全部變數',
    clearSearch: '清除搜尋',
    filterCompName: '過濾組件名稱',
    filterVarName: '過濾變數名稱',
    import: '匯入',
    export: '匯出',
    restore: '恢復預設',
    aiGenerate: 'AI 生成主題',
    aiProviderConfig: 'AI 供應商配置',
    themeGeneration: '主題生成',
    generationHistory: '生成歷史',
    provider: '供應商',
    apiKey: 'API 金鑰',
    model: '模型',
    saveConfig: '儲存配置',
    promptPlaceholder: '描述您想要的主題風格...',
    presetStyle: '預設風格',
    selectComponents: '選擇組件',
    selectAll: '全選',
    generateTheme: '生成主題',
    generating: '生成中...',
    generatedAt: '生成時間',
    apply: '套用',
    preview: '預覽',
    noRecords: '暫無生成記錄',
    configSaved: '配置儲存成功',
    generateSuccess: '主題生成成功',
    generateError: '主題生成失敗',
    apiKeyRequired: '請輸入 API 金鑰',
    promptRequired: '請輸入提示詞',
    noComponentsSelected: '請至少選擇一個組件',
    useCustomModel: '使用自訂模型',
    customModelPlaceholder: '輸入自訂模型名稱',
    ollamaApiKeyMessage: '本地 Ollama 實例通常不需要 API 金鑰。'
  },
  Image: {
    tipPrevious: '上一張（←）',
    tipNext: '下一張（→）',
    tipCounterclockwise: '向左旋轉',
    tipClockwise: '向右旋轉',
    tipZoomOut: '縮小',
    tipZoomIn: '放大',
    tipDownload: '下載',
    tipClose: '關閉（Esc）',
    tipOriginalSize: '縮放到原始尺寸'
  }
}

export default zhTW

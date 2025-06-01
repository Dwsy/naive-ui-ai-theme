import type { NLocale } from './enUS'

const kmKH: NLocale = {
  name: 'km-KH',
  global: {
    undo: 'បោះបង់',
    redo: 'ធ្វើឡើងវិញ',
    confirm: 'បញ្ជាក់',
    clear: 'ច្បាស់'
  },
  Popconfirm: {
    positiveText: 'បញ្ជាក់',
    negativeText: 'បោះបង់'
  },
  Cascader: {
    placeholder: 'សូមជ្រើសរើស',
    loading: 'ការផ្ទុក',
    loadingRequiredMessage: (label: string): string =>
      `អាចជ្រើសរើសបានតែបន្ទាប់ពីផ្ទុកថ្នាំងកូន  ${label} ទាំងអស់។`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyyឆ្នាំ',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-wសប្តាហ៍',
    clear: 'ច្បាស់',
    now: 'ឥឡូវនេះ',
    confirm: 'បញ្ជាក់',
    selectTime: 'ជ្រើសរើសកាលបរិច្ឆេទ',
    selectDate: 'ជ្រើសរើសកាលបរិច្ឆេទ',
    datePlaceholder: 'ជ្រើសរើសកាលបរិច្ឆេទ',
    datetimePlaceholder: 'ជ្រើសរើសពេលវេលាកាលបរិច្ឆេទ',
    monthPlaceholder: 'ជ្រើសរើសខែ',
    yearPlaceholder: 'ជ្រើសរើសឆ្នាំ',
    quarterPlaceholder: 'ជ្រើសរើសត្រីមាស',
    weekPlaceholder: 'ជ្រើសរើសសប្តាហ៍',
    startDatePlaceholder: 'កាលបរិច្ឆេទចាប់ផ្តើម',
    endDatePlaceholder: 'កាលបរិច្ឆេទបញ្ចប់',
    startDatetimePlaceholder: 'កាលបរិច្ឆេទចាប់ផ្តើម',
    endDatetimePlaceholder: 'កាលបរិច្ឆេទបញ្ចប់',
    startMonthPlaceholder: 'ខែចាប់ផ្តើម',
    endMonthPlaceholder: 'ចុងខែ',
    monthBeforeYear: false,
    firstDayOfWeek: 0,
    today: 'ថ្ងៃនេះ'
  },
  DataTable: {
    checkTableAll: 'ជ្រើសរើសទិន្នន័យតារាងទាំងអស់។',
    uncheckTableAll: 'ដកការជ្រើសរើសទិន្នន័យតារាងទាំងអស់។',
    confirm: 'បញ្ជាក់',
    clear: 'កំណត់ឡើងវិញ'
  },
  LegacyTransfer: {
    sourceTitle: 'ធាតុប្រភព',
    targetTitle: 'ធាតុគោលដៅ'
  },
  Transfer: {
    selectAll: 'ជ្រើសរើសទាំងអស់។',
    clearAll: 'ច្បាស់',
    unselectAll: 'ដកការជ្រើសរើសទាំងអស់។',
    total: (num: number): string => `ទូទៅ ${num} ធាតុ`,
    selected: (num: number): string => `បានជ្រើសរើស ${num} ធាតុ`
  },
  Empty: {
    description: 'គ្មានទិន្នន័យ'
  },
  Select: {
    placeholder: 'សូមជ្រើសរើស'
  },
  TimePicker: {
    placeholder: 'សូមជ្រើសរើសពេលវេលាមួយ។',
    positiveText: 'បញ្ជាក់',
    negativeText: 'បោះបង់',
    now: 'ឥឡូវនេះ',
    clear: 'ច្បាស់'
  },
  Pagination: {
    goto: 'លោតទៅ',
    selectionSuffix: 'ទំព័រ'
  },
  DynamicTags: {
    add: 'បន្ថែមទៅ'
  },
  Log: {
    loading: 'ការផ្ទុក'
  },
  Input: {
    placeholder: 'សូមបញ្ចូល'
  },
  InputNumber: {
    placeholder: 'សូមបញ្ចូល'
  },
  DynamicInput: {
    create: 'បន្ថែមទៅ'
  },
  ThemeEditor: {
    title: 'កម្មវិធីនិពន្ធប្រធានបទ', // Existing, keep
    clearAllVars: 'សម្អាតអថេរទាំងអស់។', // Existing, keep
    clearSearch: 'ជម្រះការស្វែងរក', // Existing, keep
    filterCompName: 'តម្រងឈ្មោះសមាសភាគ', // Existing, keep
    filterVarName: 'ត្រងឈ្មោះអថេរ', // Existing, keep
    import: 'នាំចូល', // Existing, keep
    export: 'នាំចេញ', // Existing, keep
    restore: 'ស្តារលំនាំដើម', // Existing, keep
    // Adding missing keys with English placeholders
    aiGenerate: 'AI Generate Theme',
    aiProviderConfig: 'AI Provider Configuration',
    themeGeneration: 'Theme Generation',
    generationHistory: 'Generation History',
    provider: 'Provider',
    apiKey: 'API Key',
    model: 'Model',
    saveConfig: 'Save Configuration',
    promptPlaceholder: 'Describe the theme style you want...',
    presetStyle: 'Preset Style',
    selectComponents: 'Select Components',
    selectAll: 'Select All',
    generateTheme: 'Generate Theme',
    generating: 'Generating...',
    generatedAt: 'Generated at',
    apply: 'Apply',
    preview: 'Preview',
    noRecords: 'No generation records',
    configSaved: 'Configuration saved successfully',
    generateSuccess: 'Theme generated successfully',
    generateError: 'Failed to generate theme',
    apiKeyRequired: 'API Key is required',
    promptRequired: 'Prompt is required',
    noComponentsSelected: 'Please select at least one component',
    useCustomModel: 'Use Custom Model',
    customModelPlaceholder: 'Enter custom model name',
    ollamaApiKeyMessage: 'API key is generally not required for local Ollama instances.'
  },
  Image: {
    tipPrevious: 'រូបភាពមុន។（←）',
    tipNext: 'បន្ទាប់（→）',
    tipCounterclockwise: 'បង្វិលឆ្វេង',
    tipClockwise: 'បង្វិលស្តាំ',
    tipZoomOut: 'បង្រួម ',
    tipZoomIn: 'ពង្រីក',
    tipDownload: 'ទាញយក',
    tipClose: 'ការបិទ（Esc）',
    tipOriginalSize: 'ធ្វើមាត្រដ្ឋានទៅទំហំដើម'
  }
}

export default kmKH

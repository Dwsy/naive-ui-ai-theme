import type { NLocale } from './enUS'

const eo: NLocale = {
  name: 'eo',
  global: {
    undo: 'Malfari',
    redo: 'Refari',
    confirm: 'Konfirmi',
    clear: 'Malplenigi'
  },
  Popconfirm: {
    positiveText: 'Konfirmi',
    negativeText: 'Nuligi'
  },
  Cascader: {
    placeholder: 'Bonvolu elekti',
    loading: 'Ŝargiĝo',
    loadingRequiredMessage: (label: string): string =>
      `Bonvolu ŝargi ĉiujn idojn de ${label} antaŭ ol elekti ĝin.`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Malplenigi',
    now: 'Nun',
    confirm: 'Konfirmi',
    selectTime: 'Elekti tempon',
    selectDate: 'Elekti daton',
    datePlaceholder: 'Elekti daton',
    datetimePlaceholder: 'Elekti daton kaj tempon',
    monthPlaceholder: 'Elekti monaton',
    yearPlaceholder: 'Elekti jaron',
    quarterPlaceholder: 'Elekti jarkvaronon',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Komenca dato',
    endDatePlaceholder: 'Fina dato',
    startDatetimePlaceholder: 'Komencaj dato kaj tempo',
    endDatetimePlaceholder: 'Finaj dato kaj tempo',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hodiaŭ'
  },
  DataTable: {
    checkTableAll: 'Elekti ĉiujn en la tabelo',
    uncheckTableAll: 'Malelekti ĉiujn en la tabelo',
    confirm: 'Konfirmi',
    clear: 'Malplenigi'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target'
  },
  // TODO: translation
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (num: number): string => `Total ${num} items`,
    selected: (num: number): string => `${num} items selected`
  },
  Empty: {
    description: 'Neniu datumo'
  },
  Select: {
    placeholder: 'Bonvolu elekti'
  },
  TimePicker: {
    placeholder: 'Elekti tempon',
    positiveText: 'Bone',
    negativeText: 'Nuligi',
    now: 'Nun',
    clear: 'Malplenigi'
  },
  Pagination: {
    goto: 'Iri al',
    selectionSuffix: 'paĝo'
  },
  DynamicTags: {
    add: 'Aldoni'
  },
  Log: {
    loading: 'Ŝargado'
  },
  Input: {
    placeholder: 'Bonvolu entajpi'
  },
  InputNumber: {
    placeholder: 'Bonvolu entajpi'
  },
  DynamicInput: {
    create: 'Krei'
  },
  ThemeEditor: {
    title: 'Etosredaktilo', // Existing, keep
    clearAllVars: 'Malplenigi ĉiujn variablojn', // Existing, keep
    clearSearch: 'Malplenigi serĉon', // Existing, keep
    filterCompName: 'Filtri nomojn de komponaĵoj', // Existing, keep
    filterVarName: 'Filtri nomojn de variabloj', // Existing, keep
    import: 'Importi', // Existing, keep
    export: 'Eksporti', // Existing, keep
    restore: 'Restarigi defaŭltajn valorojn', // Existing, keep
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
    tipPrevious: 'Antaŭa bildo (←)',
    tipNext: 'Sekva bildo (→)',
    tipCounterclockwise: 'Maldekstrume',
    tipClockwise: 'Dekstrume',
    tipZoomOut: 'Malzomi',
    tipZoomIn: 'Zomi',
    tipDownload: 'Elŝuti',
    tipClose: 'Fermi (Esc)',
    tipOriginalSize: 'Zoom to original size'
  }
}

export default eo

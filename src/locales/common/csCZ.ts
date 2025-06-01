import type { NLocale } from './enUS'

const csCZ: NLocale = {
  name: 'cs-CZ',
  global: {
    undo: 'Zpět',
    redo: 'Obnovit',
    confirm: 'Potvrdit',
    clear: 'Vyčistit'
  },
  Popconfirm: {
    positiveText: 'Potvrdit',
    negativeText: 'Zrušit'
  },
  Cascader: {
    placeholder: 'Prosím vyberte',
    loading: 'Načítání',
    loadingRequiredMessage: (label: string): string =>
      `Prosím načtěte před kontrolou všechny potomky pro ${label}.`
  },
  Time: {
    dateFormat: 'd-M-yyyy',
    dateTimeFormat: 'd-M-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'EEEE',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MMM-yyyy',
    dateFormat: 'd-M-yyyy',
    dateTimeFormat: 'd-M-yyyy HH:mm:ss',
    quarterFormat: 'qqq-yyyy',
    weekFormat: 'YYYY-w',
    clear: 'Vyčistit',
    now: 'Teď',
    confirm: 'Potvrdit',
    selectTime: 'Vybrat čas',
    selectDate: 'Vybrat datum',
    datePlaceholder: 'Vyberte čas',
    datetimePlaceholder: 'Vyberte datum a čas',
    monthPlaceholder: 'Vyberte měsíc',
    yearPlaceholder: 'Vyberte rok',
    quarterPlaceholder: 'Vyberte čtvrtletí',
    weekPlaceholder: 'Vyberte týden',
    startDatePlaceholder: 'Datum začátku',
    endDatePlaceholder: 'Datum ukončení',
    startDatetimePlaceholder: 'Datum a čas začátku',
    endDatetimePlaceholder: 'Datum a čas ukončení ',
    startMonthPlaceholder: 'Začátek měsíce',
    endMonthPlaceholder: 'Konec měsíce',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Dnes'
  },
  DataTable: {
    checkTableAll: 'Vybrat vše v tabulce',
    uncheckTableAll: 'Zrušit výběr všeho v tabulce ',
    confirm: 'Potvrdit',
    clear: 'Vyčistit'
  },
  LegacyTransfer: {
    sourceTitle: 'Zdroj',
    targetTitle: 'Cíl'
  },
  Transfer: {
    selectAll: 'Vybrat vše',
    unselectAll: 'Odznačit vše',
    clearAll: 'Vyčistit',
    total: (num: number): string => `Celkem ${num} položek`,
    selected: (num: number): string => `${num} položek vybráno`
  },
  Empty: {
    description: 'Žádná data'
  },
  Select: {
    placeholder: 'Prosím vyberte'
  },
  TimePicker: {
    placeholder: 'Vybrat čas',
    positiveText: 'OK',
    negativeText: 'Zrušit',
    now: 'Teď',
    clear: 'Vyčistit'
  },
  Pagination: {
    goto: 'Jít na',
    selectionSuffix: 'Strana'
  },
  DynamicTags: {
    add: 'Přidat'
  },
  Log: {
    loading: 'Načítání'
  },
  Input: {
    placeholder: 'Zadejte'
  },
  InputNumber: {
    placeholder: 'Zadejte'
  },
  DynamicInput: {
    create: 'Vytvořit'
  },
  ThemeEditor: {
    title: 'Editor témat', // Existing, keep
    clearAllVars: 'Vymazat všechny proměnné', // Existing, keep
    clearSearch: 'Vymazat vyhledávání', // Existing, keep
    filterCompName: 'Filtrovat název komponenty', // Existing, keep
    filterVarName: 'Filztrovat název proměnné', // Existing, keep
    import: 'Importovat', // Existing, keep
    export: 'Exportovat', // Existing, keep
    restore: 'Obnovit původní nastavení', // Existing, keep
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
    tipPrevious: 'Předchozí obrázek (←)',
    tipNext: 'Další obrázek (→)',
    tipCounterclockwise: 'Proti směru hodinových ručiček',
    tipClockwise: 'Ve směru hodinových ručiček',
    tipZoomOut: 'Oddálit',
    tipZoomIn: 'Přiblížit',
    tipDownload: 'Stáhnout',
    tipClose: 'Zavřít (Esc)',
    tipOriginalSize: 'Přiblížit na původní velikost'
  }
}

export default csCZ

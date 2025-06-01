import type { NLocale } from './enUS'

const itIT: NLocale = {
  name: 'it-IT',
  global: {
    undo: 'Annulla',
    redo: 'Ripeti',
    confirm: 'Conferma',
    clear: 'Cancella'
  },
  Popconfirm: {
    positiveText: 'Conferma',
    negativeText: 'Annulla'
  },
  Cascader: {
    placeholder: 'Si prega di selezionare',
    loading: 'Caricamento',
    loadingRequiredMessage: (label: string): string =>
      `Carica tutti i discendenti di ${label} prima di controllarlo.`
  },
  Time: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
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
    clear: 'Cancella',
    now: 'Adesso',
    confirm: 'Conferma',
    selectTime: 'Seleziona ora',
    selectDate: 'Seleziona data',
    datePlaceholder: 'Seleziona data',
    datetimePlaceholder: 'Seleziona data e ora',
    monthPlaceholder: 'Seleziona mese',
    yearPlaceholder: 'Seleziona anno',
    quarterPlaceholder: 'Seleziona trimestre',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Data inizio',
    endDatePlaceholder: 'Data fine',
    startDatetimePlaceholder: 'Data e ora di inizio',
    endDatetimePlaceholder: 'Data e ora di fine',
    startMonthPlaceholder: 'Mese di inizio',
    endMonthPlaceholder: 'Mese di fine',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Oggi'
  },
  DataTable: {
    checkTableAll: 'Seleziona tutto nella tabella',
    uncheckTableAll: 'Deseleziona tutto nella tabella',
    confirm: 'Conferma',
    clear: 'Cancella'
  },
  LegacyTransfer: {
    sourceTitle: 'Fonte',
    targetTitle: 'Destinazione'
  },
  Transfer: {
    selectAll: 'Seleziona tutto',
    unselectAll: 'Deseleziona tutto',
    clearAll: 'Pulisci',
    total: (num: number): string => {
      if (num !== 1)
        return `${num} elementi in totale`
      return '1 elemento in totale'
    },
    selected: (num: number): string => {
      if (num !== 1)
        return `${num} elementi selezionati`
      return '1 elemento selezionato'
    }
  },
  Empty: {
    description: 'Nessun Dato'
  },
  Select: {
    placeholder: 'Si prega di selezionare'
  },
  TimePicker: {
    placeholder: 'Seleziona ora',
    positiveText: 'OK',
    negativeText: 'Annulla',
    now: 'Ora',
    clear: 'Cancella'
  },
  Pagination: {
    goto: 'Vai a',
    selectionSuffix: 'per pagina'
  },
  DynamicTags: {
    add: 'Aggiungi'
  },
  Log: {
    loading: 'Caricamento'
  },
  Input: {
    placeholder: 'Si prega di inserire'
  },
  InputNumber: {
    placeholder: 'Si prega di inserire'
  },
  DynamicInput: {
    create: 'Crea'
  },
  ThemeEditor: {
    title: 'Editor Tema', // Existing, keep
    clearAllVars: 'Cancella tutte le variabili', // Existing, keep
    clearSearch: 'Cancella ricerca', // Existing, keep
    filterCompName: 'Filtra componenti', // Existing, keep
    filterVarName: 'Filtra variabili', // Existing, keep
    import: 'Importa', // Existing, keep
    export: 'Esporta', // Existing, keep
    restore: 'Ripristina', // Existing, keep
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
    tipPrevious: 'Immagine precedente (←)',
    tipNext: 'Immagine successiva (→)',
    tipCounterclockwise: 'Ruota a sinistra',
    tipClockwise: 'Ruota a destra',
    tipZoomOut: 'Ingrandisci',
    tipZoomIn: 'Riduci',
    tipDownload: 'Download',
    tipClose: 'Chiudi (Esc)',
    tipOriginalSize: 'Torna alla dimensione originale'
  }
}

export default itIT

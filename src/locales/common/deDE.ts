import type { NLocale } from './enUS'

const deDE: NLocale = {
  name: 'de-DE',
  global: {
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    confirm: 'Bestätigen',
    clear: 'Löschen'
  },
  Popconfirm: {
    positiveText: 'Bestätigen',
    negativeText: 'Abbrechen'
  },
  Cascader: {
    placeholder: 'Bitte auswählen',
    loading: 'Wird geladen',
    loadingRequiredMessage: (label: string): string =>
      `Bitte laden Sie alle Unterpunkte von ${label}, bevor Sie es auswählen.`
  },
  Time: {
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Löschen',
    now: 'Jetzt',
    confirm: 'Bestätigen',
    selectTime: 'Uhrzeit auswählen',
    selectDate: 'Datum auswählen',
    datePlaceholder: 'Datum auswählen',
    datetimePlaceholder: 'Datum und Uhrzeit auswählen',
    monthPlaceholder: 'Monat auswählen',
    yearPlaceholder: 'Jahr auswählen',
    quarterPlaceholder: 'Quartal auswählen',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Anfangsdatum',
    endDatePlaceholder: 'Enddatum',
    startDatetimePlaceholder: 'Anfangsdatum und Uhrzeit',
    endDatetimePlaceholder: 'Enddatum und Uhrzeit',
    startMonthPlaceholder: 'Anfangsmonat',
    endMonthPlaceholder: 'Endmonat',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Heute'
  },
  DataTable: {
    checkTableAll: 'Alles auswählen',
    uncheckTableAll: 'Auswahl aufheben',
    confirm: 'Bestätigen',
    clear: 'Löschen'
  },
  LegacyTransfer: {
    sourceTitle: 'Quelle',
    targetTitle: 'Ziel'
  },
  Transfer: {
    selectAll: 'Alle auswählen',
    unselectAll: 'Alle abwählen',
    clearAll: 'Leeren',
    total: (num: number): string => `Insgesamt ${num} Einträge`,
    selected: (num: number): string => `${num} Einträge ausgewählt`
  },
  Empty: {
    description: 'Keine Daten'
  },
  Select: {
    placeholder: 'Bitte auswählen'
  },
  TimePicker: {
    placeholder: 'Uhrzeit auswählen',
    positiveText: 'OK',
    negativeText: 'Abbrechen',
    now: 'Jetzt',
    clear: 'Löschen'
  },
  Pagination: {
    goto: 'Gehe zu',
    selectionSuffix: 'Seite'
  },
  DynamicTags: {
    add: 'Hinzufügen'
  },
  Log: {
    loading: 'Wird geladen'
  },
  Input: {
    placeholder: 'Bitte ausfüllen'
  },
  InputNumber: {
    placeholder: 'Bitte ausfüllen'
  },
  DynamicInput: {
    create: 'Erstellen'
  },
  ThemeEditor: {
    title: 'Theme Editor', // Existing, keep
    clearAllVars: 'Alle Variablen löschen', // Existing, keep
    clearSearch: 'Suche löschen', // Existing, keep
    filterCompName: 'Filter Komponentenname', // Existing, keep
    filterVarName: 'Filter Variablenname', // Existing, keep
    import: 'Importieren', // Existing, keep
    export: 'Exportieren', // Existing, keep
    restore: 'Auf Standard zurücksetzen', // Existing, keep
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
    tipPrevious: 'Vorheriges Bild (←)',
    tipNext: 'Nächstes Bild (→)',
    tipCounterclockwise: 'Gegen Uhrzeigersinn',
    tipClockwise: 'Uhrzeigersinn',
    tipZoomOut: 'Rauszoomen',
    tipZoomIn: 'Reinzoomen',
    tipDownload: 'Download',
    tipClose: 'Schließen (Esc)',
    tipOriginalSize: 'Zoom zurücksetzen'
  }
}

export default deDE

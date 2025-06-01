import type { NLocale } from './enUS'

const frFR: NLocale = {
  name: 'fr-FR',
  global: {
    undo: 'Défaire',
    redo: 'Refaire',
    confirm: 'Confirmer',
    clear: 'Effacer'
  },
  Popconfirm: {
    positiveText: 'Confirmer',
    negativeText: 'Annuler'
  },
  Cascader: {
    placeholder: 'Sélectionner',
    loading: 'Chargement',
    loadingRequiredMessage: (label: string): string =>
      `Charger tous les enfants de ${label} avant de le sélectionner`
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
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'qqq yyyy',
    weekFormat: 'YYYY-w',
    clear: 'Effacer',
    now: 'Maintenant',
    confirm: 'Confirmer',
    selectTime: 'Sélectionner l\'heure',
    selectDate: 'Sélectionner la date',
    datePlaceholder: 'Sélectionner la date',
    datetimePlaceholder: 'Sélectionner la date et l\'heure',
    monthPlaceholder: 'Sélectionner le mois',
    yearPlaceholder: 'Sélectionner l\'année',
    quarterPlaceholder: 'Sélectionner le trimestre',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Date de début',
    endDatePlaceholder: 'Date de fin',
    startDatetimePlaceholder: 'Date et heure de début',
    endDatetimePlaceholder: 'Date et heure de fin',
    startMonthPlaceholder: 'Mois de début',
    endMonthPlaceholder: 'Mois de fin',
    monthBeforeYear: true,
    firstDayOfWeek: 0,
    today: 'Aujourd\'hui'
  },
  DataTable: {
    checkTableAll: 'Sélectionner tout',
    uncheckTableAll: 'Désélectionner tout',
    confirm: 'Confirmer',
    clear: 'Effacer'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Cible'
  },
  Transfer: {
    selectAll: 'Sélectionner tout',
    unselectAll: 'Désélectionner tout',
    clearAll: 'Effacer',
    total: (num: number): string => `Total ${num} éléments`,
    selected: (num: number): string => `${num} éléments sélectionnés`
  },
  Empty: {
    description: 'Aucune donnée'
  },
  Select: {
    placeholder: 'Sélectionner'
  },
  TimePicker: {
    placeholder: 'Sélectionner l\'heure',
    positiveText: 'OK',
    negativeText: 'Annuler',
    now: 'Maintenant',
    clear: 'Effacer'
  },
  Pagination: {
    goto: 'Aller à',
    selectionSuffix: 'page'
  },
  DynamicTags: {
    add: 'Ajouter'
  },
  Log: {
    loading: 'Chargement'
  },
  Input: {
    placeholder: 'Saisir'
  },
  InputNumber: {
    placeholder: 'Saisir'
  },
  DynamicInput: {
    create: 'Créer'
  },
  ThemeEditor: {
    title: 'Éditeur de thème', // Existing, keep
    clearAllVars: 'Effacer toutes les variables', // Existing, keep
    clearSearch: 'Effacer la recherche', // Existing, keep
    filterCompName: 'Filtrer par nom de composant', // Existing, keep
    filterVarName: 'Filtrer par nom de variable', // Existing, keep
    import: 'Importer', // Existing, keep
    export: 'Exporter', // Existing, keep
    restore: 'Réinitialiser', // Existing, keep
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
    tipPrevious: 'Image précédente (←)',
    tipNext: 'Image suivante (→)',
    tipCounterclockwise: 'Sens antihoraire',
    tipClockwise: 'Sens horaire',
    tipZoomOut: 'Dézoomer',
    tipZoomIn: 'Zoomer',
    tipDownload: 'Descargar',
    tipClose: 'Fermer (Échap.)',
    tipOriginalSize: 'Zoom à la taille originale'
  }
}

export default frFR

import type { NLocale } from './enUS'

const idID: NLocale = {
  name: 'id-ID',
  global: {
    undo: 'Membatalkan',
    redo: 'Mem-perbarui',
    confirm: 'Setuju',
    clear: 'Bersihkan'
  },
  Popconfirm: {
    positiveText: 'Setuju',
    negativeText: 'Batalkan'
  },
  Cascader: {
    placeholder: 'Mohon Pilih',
    loading: 'Memuat',
    loadingRequiredMessage: (label: string): string =>
      `Mohon muat semua ${label} sebelum memeriksa.`
  },
  Time: {
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Bersihkan',
    now: 'Sekarang',
    confirm: 'Setuju',
    selectTime: 'Pilih Waktu',
    selectDate: 'Pilih Tanggal',
    datePlaceholder: 'Pilih Tanggal',
    datetimePlaceholder: 'Pilih Tanggal dan Waktu',
    monthPlaceholder: 'Pilih Bulan',
    // FIXME: translation needed
    yearPlaceholder: 'Pilih tahun',
    quarterPlaceholder: 'Pilih perempat tahun',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Tanggal Mulai',
    endDatePlaceholder: 'Tanggal Selesai',
    startDatetimePlaceholder: 'Tanggal dan Waktu Mulai',
    endDatetimePlaceholder: 'Tanggal dan Waktu Selesai',
    // FIXME: translation needed
    startMonthPlaceholder: 'Awal bulan',
    endMonthPlaceholder: 'Akhir bulan',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hari ini'
  },
  DataTable: {
    checkTableAll: 'Pilih semua pada tabel',
    uncheckTableAll: 'Batalkan pilihan semua',
    confirm: 'Setuju',
    clear: 'Bersihkan'
  },
  LegacyTransfer: {
    sourceTitle: 'Sumber',
    targetTitle: 'Tujuan'
  },
  // TODO: translation
  Transfer: {
    selectAll: 'Pilih semua',
    unselectAll: 'Batalkan pilihan',
    clearAll: 'Bersihkan',
    total: (num: number): string => `Total ${num} item`,
    selected: (num: number): string => `${num} item dipilih`
  },
  Empty: {
    description: 'Tidak ada data'
  },
  Select: {
    placeholder: 'Mohon Pilih'
  },
  TimePicker: {
    placeholder: 'Pilih Waktu',
    positiveText: 'OK',
    negativeText: 'Batalkan',
    now: 'Sekarang',
    clear: 'Bersihkan'
  },
  Pagination: {
    goto: 'Ke',
    selectionSuffix: 'halaman'
  },
  DynamicTags: {
    add: 'Tambah'
  },
  Log: {
    loading: 'Memuat'
  },
  Input: {
    placeholder: 'Mohon isi'
  },
  InputNumber: {
    placeholder: 'Mohon isi'
  },
  DynamicInput: {
    create: 'Buat baru'
  },
  ThemeEditor: {
    title: 'Pengaturan Tema', // Existing, keep
    clearAllVars: 'Bersihkan semua variabel', // Existing, keep
    clearSearch: 'Bersihkan pencarian', // Existing, keep
    filterCompName: 'Saring nama komponen', // Existing, keep
    filterVarName: 'Saring nama variabel', // Existing, keep
    import: 'Impor', // Existing, keep
    export: 'Ekspor', // Existing, keep
    restore: 'Setel ulang ke awal', // Existing, keep
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
    tipPrevious: 'Gambar sebelumnya (←)',
    tipNext: 'Gambar berikutnya (→)',
    tipCounterclockwise: 'Berlawanan arah jarum jam',
    tipClockwise: 'Searah jarum jam',
    tipZoomOut: 'Zoom out',
    tipZoomIn: 'Zoom in',
    tipDownload: 'Download',
    tipClose: 'Tutup (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom ke ukuran asli'
  }
}

export default idID

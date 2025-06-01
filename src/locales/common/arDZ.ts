import type { NLocale } from './enUS'

const arDZ: NLocale = {
  name: 'ar-DZ',
  global: {
    undo: 'تراجع',
    redo: 'إعادة',
    confirm: 'تأكيد',
    clear: 'مسح'
  },
  Popconfirm: {
    positiveText: 'تأكيد',
    negativeText: 'إلغاء'
  },
  Cascader: {
    placeholder: 'يرجى التحديد',
    loading: 'جاري التحميل',
    loadingRequiredMessage: (label: string): string =>
      `يرجى تحميل جميع الـ ${label} الفرعية قبل التحقق منها.`
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
    clear: 'مسح',
    now: 'الآن',
    confirm: 'تأكيد',
    selectTime: 'إختيار الوقت',
    selectDate: 'إختيار التاريخ',
    datePlaceholder: 'إختيار التاريخ',
    datetimePlaceholder: 'إختيار التاريخ والوقت',
    monthPlaceholder: 'إختيار الشهر',
    yearPlaceholder: 'إختيار السنة',
    quarterPlaceholder: 'إختيار الربع',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'تاريخ البدء',
    endDatePlaceholder: 'تاريخ الإنتهاء',
    startDatetimePlaceholder: 'تاريخ ووقت البدء',
    endDatetimePlaceholder: 'تاريخ ووقت الإنتهاء',
    startMonthPlaceholder: 'شهر البدء',
    endMonthPlaceholder: 'شهر الإنتهاء',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'اليوم'
  },
  DataTable: {
    checkTableAll: 'تحديد كل العناصر في الجدول',
    uncheckTableAll: 'إلغاء تحديد كل العناصر في الجدول',
    confirm: 'تأكيد',
    clear: 'مسح'
  },
  LegacyTransfer: {
    sourceTitle: 'المصدر',
    targetTitle: 'الهدف'
  },
  Transfer: {
    selectAll: 'تحديد الكل',
    unselectAll: 'إلغاء تحديد الكل',
    clearAll: 'مسح',
    total: (num: number): string => `إجمالي ${num} عنصر`,
    selected: (num: number): string => `${num} عنصر محدد`
  },
  Empty: {
    description: 'لا توجد بيانات'
  },
  Select: {
    placeholder: 'يرجى الإختيار'
  },
  TimePicker: {
    placeholder: 'إختيار الوقت',
    positiveText: 'تأكيد',
    negativeText: 'إلغاء',
    now: 'الآن',
    clear: 'مسح'
  },
  Pagination: {
    goto: 'إذهب إلى',
    selectionSuffix: 'صفحة'
  },
  DynamicTags: {
    add: 'إضافة'
  },
  Log: {
    loading: 'جاري التحميل'
  },
  Input: {
    placeholder: 'يرجى الإدخال'
  },
  InputNumber: {
    placeholder: 'يرجى الإدخال'
  },
  DynamicInput: {
    create: 'إنشاء'
  },
  ThemeEditor: {
    title: 'محرر النمط', // Existing, keep
    clearAllVars: 'مسح جميع المتغيرات', // Existing, keep
    clearSearch: 'مسح البحث', // Existing, keep
    filterCompName: 'تصفية إسم المكون', // Existing, keep
    filterVarName: 'تصفية إسم المتغير', // Existing, keep
    import: 'إستيراد', // Existing, keep
    export: 'تصدير', // Existing, keep
    restore: 'إعادة تعيين إلى الإفتراضي', // Existing, keep
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
    tipPrevious: '(→) الصورة السابقة',
    tipNext: '(←) الصورة التالية',
    tipCounterclockwise: 'عكس عقارب الساعة',
    tipClockwise: 'إتجاه عقارب الساعة',
    tipZoomOut: 'تكبير',
    tipZoomIn: 'تصغير',
    tipDownload: 'للتحميل',
    tipClose: 'إغلاق (Esc زر)',
    tipOriginalSize: 'تكبير إلى الحجم الأصلي'
  }
}

export default arDZ

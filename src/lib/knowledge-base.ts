/**
 * مكتبة المعرفة - Knowledge Base
 * مكتبة شاملة للقوانين متعددة البلدان ومكونات النظام
 */

import { countriesLaws, getCountryLaw, type CountryLaw } from './countries-laws';

export { countriesLaws, getCountryLaw };

export const knowledgeBase = {
  // ====================================
  // القوانين حسب البلد
  // ====================================
  countriesLaws,

  // ====================================
  // المعايير الدولية المطبقة
  // ====================================
  internationalStandards: {
    ifrs: {
      title: 'المعايير الدولية لإعداد التقارير المالية (IFRS)',
      standards: {
        'IAS 1': 'عرض القوائم المالية',
        'IAS 2': 'المخزون',
        'IAS 7': 'قائمة التدفقات النقدية',
        'IAS 8': 'السياسات المحاسبية والتغييرات في التقديرات والأخطاء',
        'IAS 16': 'الممتلكات والمنشآت والمعدات',
        'IFRS 15': 'الإيراد من العقود مع العملاء',
        'IFRS 16': 'عقود الإيجار'
      }
    },
    pmbok: {
      title: 'دليل المعرفة لإدارة المشاريع (PMBOK 7th)',
      areas: [
        'إدارة التكامل',
        'إدارة النطاق',
        'إدارة الجدول الزمني',
        'إدارة التكلفة',
        'إدارة الجودة',
        'إدارة الموارد',
        'إدارة الاتصالات',
        'إدارة المخاطر',
        'إدارة المشتريات',
        'إدارة أصحاب المصلحة'
      ]
    }
  },

  // ====================================
  // مكونات النظام الكاملة
  // ====================================
  systemComponents: {
    modules: [
      {
        id: 'accounting',
        name: { ar: 'المحاسبة', en: 'Accounting' },
        icon: '💰',
        description: { 
          ar: 'إدارة الحسابات المالية والقيود المحاسبية والتقارير المالية',
          en: 'Manage financial accounts, journal entries and financial reports'
        },
        pages: [
          { path: '/accounting/chart-of-accounts', name: { ar: 'دليل الحسابات', en: 'Chart of Accounts' } },
          { path: '/accounting/journal-entries', name: { ar: 'قيود اليومية', en: 'Journal Entries' } },
          { path: '/accounting/invoices', name: { ar: 'الفواتير', en: 'Invoices' } },
          { path: '/accounting/payments', name: { ar: 'سندات القبض', en: 'Receipts' } },
          { path: '/accounting/receipts', name: { ar: 'سندات الصرف', en: 'Payments' } },
          { path: '/accounting/cost-centers', name: { ar: 'مراكز التكلفة', en: 'Cost Centers' } },
          { path: '/accounting/budgets', name: { ar: 'الموازنات', en: 'Budgets' } },
          { path: '/accounting/fixed-assets', name: { ar: 'الأصول الثابتة', en: 'Fixed Assets' } },
          { path: '/accounting/depreciation', name: { ar: 'الاستهلاك', en: 'Depreciation' } },
          { path: '/accounting/trial-balance', name: { ar: 'ميزان المراجعة', en: 'Trial Balance' } },
          { path: '/accounting/balance-sheet', name: { ar: 'الميزانية العمومية', en: 'Balance Sheet' } },
          { path: '/accounting/income-statement', name: { ar: 'قائمة الدخل', en: 'Income Statement' } }
        ]
      },
      {
        id: 'sales',
        name: { ar: 'المبيعات', en: 'Sales' },
        icon: '📊',
        description: { 
          ar: 'إدارة عمليات المبيعات والعملاء وعروض الأسعار',
          en: 'Manage sales operations, customers and quotations'
        },
        pages: [
          { path: '/sales/customers', name: { ar: 'العملاء', en: 'Customers' } },
          { path: '/sales/quotes', name: { ar: 'عروض الأسعار', en: 'Quotations' } },
          { path: '/sales/orders', name: { ar: 'طلبات البيع', en: 'Sales Orders' } },
          { path: '/sales/invoices', name: { ar: 'فواتير المبيعات', en: 'Sales Invoices' } },
          { path: '/sales/returns', name: { ar: 'مرتجعات المبيعات', en: 'Sales Returns' } }
        ]
      },
      {
        id: 'purchases',
        name: { ar: 'المشتريات', en: 'Purchases' },
        icon: '🛒',
        description: { 
          ar: 'إدارة عمليات الشراء والموردين وأوامر الشراء',
          en: 'Manage purchasing operations, suppliers and purchase orders'
        },
        pages: [
          { path: '/purchases/suppliers', name: { ar: 'الموردين', en: 'Suppliers' } },
          { path: '/purchases/rfqs', name: { ar: 'طلبات عروض الأسعار', en: 'RFQs' } },
          { path: '/purchases/orders', name: { ar: 'أوامر الشراء', en: 'Purchase Orders' } },
          { path: '/purchases/invoices', name: { ar: 'فواتير المشتريات', en: 'Purchase Invoices' } },
          { path: '/purchases/returns', name: { ar: 'مرتجعات المشتريات', en: 'Purchase Returns' } }
        ]
      },
      {
        id: 'inventory',
        name: { ar: 'المخزون', en: 'Inventory' },
        icon: '📦',
        description: { 
          ar: 'إدارة المخازن والحركات والجرد الفعلي',
          en: 'Manage warehouses, movements and physical inventory'
        },
        pages: [
          { path: '/inventory/warehouses', name: { ar: 'المخازن', en: 'Warehouses' } },
          { path: '/inventory/items', name: { ar: 'الأصناف', en: 'Items' } },
          { path: '/inventory/categories', name: { ar: 'التصنيفات', en: 'Categories' } },
          { path: '/inventory/movements', name: { ar: 'حركات المخزون', en: 'Movements' } },
          { path: '/inventory/physical-count', name: { ar: 'الجرد الفعلي', en: 'Physical Count' } },
          { path: '/inventory/valuation', name: { ar: 'تقييم المخزون', en: 'Valuation' } },
          { path: '/inventory/abc-analysis', name: { ar: 'تحليل ABC', en: 'ABC Analysis' } },
          { path: '/inventory/aging-report', name: { ar: 'تقرير التقادم', en: 'Aging Report' } }
        ]
      },
      {
        id: 'hr',
        name: { ar: 'الموارد البشرية', en: 'Human Resources' },
        icon: '👥',
        description: { 
          ar: 'إدارة الموظفين والرواتب والحضور والإجازات',
          en: 'Manage employees, payroll, attendance and leaves'
        },
        pages: [
          { path: '/hr/employees', name: { ar: 'الموظفين', en: 'Employees' } },
          { path: '/hr/attendance', name: { ar: 'الحضور والانصراف', en: 'Attendance' } },
          { path: '/hr/leaves', name: { ar: 'الإجازات', en: 'Leaves' } },
          { path: '/hr/payroll', name: { ar: 'الرواتب', en: 'Payroll' } },
          { path: '/hr/allowances', name: { ar: 'البدلات', en: 'Allowances' } },
          { path: '/hr/deductions', name: { ar: 'الاستقطاعات', en: 'Deductions' } },
          { path: '/hr/end-of-service', name: { ar: 'مكافآت نهاية الخدمة', en: 'End of Service' } }
        ]
      },
      {
        id: 'projects',
        name: { ar: 'المشاريع', en: 'Projects' },
        icon: '📊',
        description: { 
          ar: 'إدارة المشاريع والمهام والموارد',
          en: 'Manage projects, tasks and resources'
        },
        pages: [
          { path: '/projects', name: { ar: 'المشاريع', en: 'Projects' } },
          { path: '/projects/tasks', name: { ar: 'المهام', en: 'Tasks' } },
          { path: '/projects/schedule', name: { ar: 'الجدول الزمني', en: 'Schedule' } },
          { path: '/projects/budget', name: { ar: 'الميزانية', en: 'Budget' } },
          { path: '/projects/resources', name: { ar: 'الموارد', en: 'Resources' } }
        ]
      },
      {
        id: 'settings',
        name: { ar: 'الإعدادات', en: 'Settings' },
        icon: '⚙️',
        description: { 
          ar: 'إعدادات النظام والشركة والفروع',
          en: 'System, company and branch settings'
        },
        pages: [
          { path: '/settings/company', name: { ar: 'إعدادات الشركة', en: 'Company Settings' } },
          { path: '/settings/branches', name: { ar: 'الفروع', en: 'Branches' } },
          { path: '/settings/currencies', name: { ar: 'العملات', en: 'Currencies' } },
          { path: '/settings/users', name: { ar: 'المستخدمين', en: 'Users' } },
          { path: '/settings/roles', name: { ar: 'الأدوار', en: 'Roles' } }
        ]
      }
    ]
  },

  // ====================================
  // التحيات والردود التفاعلية
  // ====================================
  greetings: {
    welcome: {
      ar: [
        'أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟ 😊',
        'مرحباً بك! أنا هنا لمساعدتك في أي استفسار 👋',
        'السلام عليكم! تفضل، كيف أقدر أخدمك؟',
        'هلا والله! شلون أقدر أساعدك اليوم؟',
        'يا هلا! شبيك؟ شنو تحتاج؟'
      ],
      en: [
        'Hello! How can I help you today? 😊',
        'Welcome! I\'m here to assist you 👋',
        'Hi there! What can I do for you?',
        'Greetings! How may I assist you today?',
        'Hey! What do you need help with?'
      ]
    },
    goodbye: {
      ar: [
        'مع السلامة! أتمنى لك يوم سعيد 😊',
        'الله معاك! إذا احتجت أي مساعدة، أنا هنا',
        'يسلموو! بالتوفيق',
        'باي باي! الله يحفظك',
        'مع السلامة! ننطر شوفتك مرة ثانية'
      ],
      en: [
        'Goodbye! Have a great day! 😊',
        'See you later! I\'m here if you need anything',
        'Take care! Good luck!',
        'Bye bye! Stay safe!',
        'Farewell! Looking forward to helping you again'
      ]
    },
    thanks: {
      ar: [
        'عفواً! سعيد بخدمتك 😊',
        'لا شكر على واجب! أنا هنا دائماً',
        'حياك الله! بالخدمة',
        'العفو حبيبي! متى ما تحتاج، أنا موجود',
        'تسلم! هذا واجبنا'
      ],
      en: [
        'You\'re welcome! Happy to help 😊',
        'No problem! I\'m always here',
        'My pleasure! Anytime!',
        'You\'re welcome! Let me know if you need anything else',
        'Glad I could help!'
      ]
    }
  },

  // ====================================
  // الأسئلة الشائعة والإجابات
  // ====================================
  faq: {
    accounting: [
      {
        q: { ar: 'كيف أضيف قيد محاسبي؟', en: 'How to add journal entry?' },
        a: { 
          ar: 'اذهب إلى المحاسبة > قيود اليومية > إضافة قيد جديد. حدد التاريخ، الحسابات المدينة والدائنة، والمبالغ.',
          en: 'Go to Accounting > Journal Entries > Add New Entry. Select date, debit and credit accounts, and amounts.'
        },
        path: '/accounting/journal-entries'
      },
      {
        q: { ar: 'وين أشوف الميزانية العمومية؟', en: 'Where can I see the balance sheet?' },
        a: { 
          ar: 'روح على المحاسبة > الميزانية العمومية. تقدر تختار الفترة الزمنية وطباعة التقرير.',
          en: 'Go to Accounting > Balance Sheet. You can select time period and print the report.'
        },
        path: '/accounting/balance-sheet'
      }
    ],
    hr: [
      {
        q: { ar: 'شلون أحسب مكافأة نهاية الخدمة؟', en: 'How to calculate end of service gratuity?' },
        a: { 
          ar: 'حسب قانون العمل العراقي: راتب شهر × عدد سنوات الخدمة (إنهاء خدمة أو تقاعد)، أو نصف راتب × سنوات الخدمة (استقالة).',
          en: 'Per Iraqi Labor Law: 1 month salary × years of service (termination/retirement), or 0.5 month × years (resignation).'
        },
        path: '/hr/end-of-service'
      },
      {
        q: { ar: 'كم يوم إجازة سنوية للموظف؟', en: 'How many annual leave days?' },
        a: { 
          ar: '30 يوم سنوياً للسنوات الخمس الأولى، ثم 36 يوم، ثم 42 يوم بعد 10 سنوات خدمة.',
          en: '30 days annually for first 5 years, then 36 days, then 42 days after 10 years of service.'
        },
        path: '/hr/leaves'
      }
    ]
  }
};

// ====================================
// محرك الذكاء الاصطناعي للمساعد
// ====================================
export class AIAssistant {
  private locale: 'ar' | 'en' = 'ar';

  constructor(locale: 'ar' | 'en' = 'ar') {
    this.locale = locale;
  }

  // تحليل النص وفهم القصد
  analyzeIntent(query: string): {
    intent: string;
    entities: string[];
    language: 'ar' | 'en';
    sentiment: 'positive' | 'neutral' | 'negative';
  } {
    const lowerQuery = query.toLowerCase();
    
    // تحديد اللغة
    const hasArabic = /[\u0600-\u06FF]/.test(query);
    const language = hasArabic ? 'ar' : 'en';

    // الكلمات المفتاحية العربية (فصحى وعامية)
    const arKeywords = {
      greeting: ['مرحبا', 'هلا', 'السلام', 'صباح', 'مساء', 'شلون', 'كيف حالك', 'شبيك'],
      goodbye: ['وداع', 'باي', 'سلام', 'مع السلامة', 'يلا باي'],
      thanks: ['شكرا', 'شكراً', 'يسلموو', 'تسلم', 'ممنون', 'مشكور'],
      accounting: ['محاسبة', 'قيد', 'فاتورة', 'ميزانية', 'حساب', 'تقرير مالي', 'دفتر اليومية'],
      hr: ['موظف', 'راتب', 'اجازة', 'إجازة', 'حضور', 'انصراف', 'مكافأة', 'نهاية خدمة'],
      sales: ['مبيعات', 'عميل', 'زبون', 'فاتورة بيع', 'طلب بيع', 'عرض سعر'],
      inventory: ['مخزون', 'مخزن', 'صنف', 'جرد', 'حركة', 'بضاعة'],
      help: ['مساعدة', 'ساعدني', 'شلون', 'كيف', 'وين', 'شنو', 'ايش', 'اي'],
      law: ['قانون', 'نظام', 'قاعدة', 'تشريع']
    };

    const enKeywords = {
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'how are you'],
      goodbye: ['goodbye', 'bye', 'see you', 'farewell'],
      thanks: ['thank', 'thanks', 'appreciate'],
      accounting: ['accounting', 'journal', 'invoice', 'balance', 'account', 'financial'],
      hr: ['employee', 'hr', 'salary', 'leave', 'attendance', 'payroll'],
      sales: ['sales', 'customer', 'invoice', 'order', 'quote'],
      inventory: ['inventory', 'warehouse', 'item', 'stock'],
      help: ['help', 'how', 'where', 'what', 'can you'],
      law: ['law', 'regulation', 'legal', 'rule']
    };

    const keywords = language === 'ar' ? arKeywords : enKeywords;

    // تحديد القصد
    let intent = 'unknown';
    let entities: string[] = [];

    for (const [key, values] of Object.entries(keywords)) {
      if (values.some(word => lowerQuery.includes(word))) {
        intent = key;
        entities.push(key);
      }
    }

    // تحديد المشاعر
    const positiveWords = language === 'ar' 
      ? ['ممتاز', 'رائع', 'جميل', 'شكرا', 'حلو', 'زين']
      : ['great', 'good', 'nice', 'thanks', 'excellent'];
    const negativeWords = language === 'ar'
      ? ['مشكلة', 'خطأ', 'سيء', 'صعب']
      : ['problem', 'error', 'bad', 'difficult'];

    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (positiveWords.some(word => lowerQuery.includes(word))) sentiment = 'positive';
    if (negativeWords.some(word => lowerQuery.includes(word))) sentiment = 'negative';

    return { intent, entities, language, sentiment };
  }

  // الرد على الاستفسار
  respond(query: string): {
    response: string;
    suggestions?: Array<{ text: string; path?: string }>;
    actions?: Array<{ label: string; action: string }>;
  } {
    const { intent, language } = this.analyzeIntent(query);

    // التحيات
    if (intent === 'greeting') {
      const greetings = knowledgeBase.greetings.welcome[language];
      return {
        response: greetings[Math.floor(Math.random() * greetings.length)],
        suggestions: [
          { text: language === 'ar' ? 'كيف أضيف قيد محاسبي؟' : 'How to add journal entry?', path: '/accounting/journal-entries' },
          { text: language === 'ar' ? 'كيف أحسب مكافأة نهاية الخدمة؟' : 'How to calculate end of service?', path: '/hr/end-of-service' },
          { text: language === 'ar' ? 'ما هي أنواع الشركات في العراق؟' : 'What are company types in Iraq?' }
        ]
      };
    }

    // الوداع
    if (intent === 'goodbye') {
      const goodbyes = knowledgeBase.greetings.goodbye[language];
      return {
        response: goodbyes[Math.floor(Math.random() * goodbyes.length)]
      };
    }

    // الشكر
    if (intent === 'thanks') {
      const thanks = knowledgeBase.greetings.thanks[language];
      return {
        response: thanks[Math.floor(Math.random() * thanks.length)]
      };
    }

    // أسئلة المحاسبة
    if (intent === 'accounting') {
      return this.handleAccountingQuery(query, language);
    }

    // أسئلة الموارد البشرية
    if (intent === 'hr') {
      return this.handleHRQuery(query, language);
    }

    // أسئلة القوانين
    if (intent === 'law') {
      return this.handleLawQuery(query, language);
    }

    // رد افتراضي
    return {
      response: language === 'ar' 
        ? 'عذراً، لم أفهم سؤالك بشكل كامل. هل يمكنك إعادة صياغته؟ أو اختر من الاقتراحات التالية:'
        : 'Sorry, I didn\'t fully understand your question. Can you rephrase it? Or choose from the suggestions:',
      suggestions: [
        { text: language === 'ar' ? 'أسئلة عن المحاسبة' : 'Accounting questions' },
        { text: language === 'ar' ? 'أسئلة عن الموارد البشرية' : 'HR questions' },
        { text: language === 'ar' ? 'أسئلة عن القوانين العراقية' : 'Iraqi laws questions' }
      ]
    };
  }

  private handleAccountingQuery(query: string, language: 'ar' | 'en') {
    const faqs = knowledgeBase.faq.accounting;
    
    // البحث في الأسئلة الشائعة
    for (const faq of faqs) {
      const question = faq.q[language].toLowerCase();
      if (this.similarityScore(query.toLowerCase(), question) > 0.3) {
        return {
          response: faq.a[language],
          actions: faq.path ? [
            { label: language === 'ar' ? 'اذهب إلى الصفحة' : 'Go to page', action: faq.path }
          ] : undefined
        };
      }
    }

    return {
      response: language === 'ar'
        ? 'يمكنني مساعدتك في أسئلة المحاسبة. هل تريد معرفة عن:\n• القيود المحاسبية\n• التقارير المالية\n• الفواتير والسندات\n• الأصول الثابتة'
        : 'I can help with accounting questions. Would you like to know about:\n• Journal entries\n• Financial reports\n• Invoices and vouchers\n• Fixed assets'
    };
  }

  private handleHRQuery(query: string, language: 'ar' | 'en') {
    const faqs = knowledgeBase.faq.hr;
    
    for (const faq of faqs) {
      const question = faq.q[language].toLowerCase();
      if (this.similarityScore(query.toLowerCase(), question) > 0.3) {
        return {
          response: faq.a[language],
          actions: faq.path ? [
            { label: language === 'ar' ? 'اذهب إلى الصفحة' : 'Go to page', action: faq.path }
          ] : undefined
        };
      }
    }

    return {
      response: language === 'ar'
        ? 'أستطيع مساعدتك في:\n• حساب مكافأة نهاية الخدمة\n• الإجازات السنوية والمرضية\n• الرواتب والبدلات\n• الحضور والانصراف'
        : 'I can help with:\n• End of service calculation\n• Annual and sick leave\n• Payroll and allowances\n• Attendance tracking'
    };
  }

  private handleLawQuery(query: string, language: 'ar' | 'en') {
    return {
      response: language === 'ar'
        ? 'النظام متوافق مع القوانين العراقية:\n\n📋 قانون العمل العراقي رقم 37 لسنة 2015\n• ساعات العمل: 8 ساعات يومياً\n• الإجازة السنوية: 30 يوم\n• مكافأة نهاية الخدمة: راتب شهر × سنوات الخدمة\n\n💰 قانون الضرائب العراقي\n• ضريبة الدخل: تصاعدية 0%-20%\n• ضريبة الشركات: 15% ثابتة\n\n🏢 قانون الشركات رقم 21 لسنة 1997\n• أنواع الشركات المختلفة\n• متطلبات التسجيل'
        : 'System complies with Iraqi laws:\n\n📋 Iraqi Labor Law No. 37/2015\n• Working hours: 8 hours daily\n• Annual leave: 30 days\n• End of service: 1 month × years\n\n💰 Iraqi Tax Law\n• Income tax: Progressive 0%-20%\n• Corporate tax: Fixed 15%\n\n🏢 Companies Law No. 21/1997\n• Company types\n• Registration requirements'
    };
  }

  // حساب التشابه بين النصوص
  private similarityScore(str1: string, str2: string): number {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  // البحث في مكونات النظام
  searchComponents(query: string, language: 'ar' | 'en'): Array<{
    name: string;
    path: string;
    module: string;
    description: string;
  }> {
    const results: Array<any> = [];
    const lowerQuery = query.toLowerCase();

    knowledgeBase.systemComponents.modules.forEach(module => {
      module.pages.forEach(page => {
        const pageName = page.name[language].toLowerCase();
        if (pageName.includes(lowerQuery) || lowerQuery.includes(pageName)) {
          results.push({
            name: page.name[language],
            path: page.path,
            module: module.name[language],
            description: module.description[language]
          });
        }
      });
    });

    return results;
  }
}
/**
 * نظام الخبراء الاستشاريين المتخصصين
 * Expert Advisory System
 */

import { getCountryLaw } from './countries-laws';

// ====================================
// 1️⃣ محلل الحسابات الخبير
// ====================================
export const accountingExpert = {
  profile: {
    name: { ar: 'د. محمد الخبير المحاسبي', en: 'Dr. Mohamed - Accounting Expert' },
    title: {
      ar: 'محلل حسابات معتمد | خبير IFRS | مدقق حسابات قانوني | خبير ضرائب دولي',
      en: 'Certified Accountant | IFRS Expert | Legal Auditor | International Tax Expert'
    },
    credentials: [
      'CPA - Certified Public Accountant',
      'CIA - Certified Internal Auditor',
      'IFRS Certification',
      'Tax Expert - Multiple Countries',
      '20+ Years Experience'
    ],
    expertise: {
      ar: [
        '📊 المعايير الدولية IFRS/IAS الكاملة',
        '💰 أنظمة الضرائب لـ 5 دول عربية',
        '📝 تدقيق الحسابات والمراجعة',
        '🏛️ الامتثال القانوني والتنظيمي',
        '📈 التخطيط الضريبي والتحسين',
        '🔍 كشف الأخطاء والاحتيال',
        '📋 إعداد القوائم المالية المعتمدة'
      ],
      en: [
        '📊 Full IFRS/IAS Standards',
        '💰 Tax Systems for 5 Arab Countries',
        '📝 Auditing and Review',
        '🏛️ Legal and Regulatory Compliance',
        '📈 Tax Planning and Optimization',
        '🔍 Error and Fraud Detection',
        '📋 Certified Financial Statements'
      ]
    }
  },

  assessmentQuestions: {
    ar: [
      {
        id: 'Q1',
        question: 'ما هو حجم إيراداتك السنوية؟',
        type: 'number',
        category: 'financial_size',
        importance: 'critical'
      },
      {
        id: 'Q2',
        question: 'هل تطبق المعايير الدولية IFRS حالياً؟',
        type: 'choice',
        options: ['نعم بالكامل', 'جزئياً', 'لا', 'لا أعلم'],
        category: 'compliance',
        importance: 'high'
      },
      {
        id: 'Q3',
        question: 'كم عدد القيود المحاسبية الشهرية تقريباً؟',
        type: 'number',
        category: 'activity_level',
        importance: 'medium'
      },
      {
        id: 'Q4',
        question: 'هل تم تدقيق حساباتك من قبل مدقق خارجي؟',
        type: 'choice',
        options: ['نعم سنوياً', 'أحياناً', 'لا', 'غير مطلوب'],
        category: 'audit',
        importance: 'high'
      },
      {
        id: 'Q5',
        question: 'ما هي أكبر التحديات المحاسبية التي تواجهها؟',
        type: 'multiple',
        options: [
          'التوافق مع المعايير الدولية',
          'حساب الضرائب بدقة',
          'إعداد التقارير المالية',
          'تنظيم دليل الحسابات',
          'المطابقات البنكية',
          'إدارة الأصول الثابتة'
        ],
        category: 'challenges',
        importance: 'critical'
      }
    ]
  },

  analyzeFinancialData(data: any) {
    const insights = [];
    const recommendations = [];
    let score = 0;

    // تحليل الإيرادات
    if (data.revenue) {
      if (data.revenue > 10000000) {
        insights.push({
          ar: '✅ شركة كبيرة - يُنصح بتطبيق IFRS كاملاً',
          en: '✅ Large company - Full IFRS recommended',
          severity: 'info'
        });
        score += 20;
      }
    }

    // تحليل الامتثال
    if (data.ifrsCompliance === 'نعم بالكامل') {
      score += 30;
      insights.push({
        ar: '✅ ممتاز! الشركة متوافقة مع IFRS',
        en: '✅ Excellent! IFRS compliant',
        severity: 'success'
      });
    } else {
      recommendations.push({
        ar: '⚠️ يُنصح بالبدء في تطبيق معايير IFRS',
        en: '⚠️ Start implementing IFRS standards',
        priority: 'high',
        steps: [
          'تدريب الفريق المحاسبي على IFRS',
          'إعادة هيكلة دليل الحسابات',
          'تحديث السياسات المحاسبية',
          'تطبيق تدريجي على 6-12 شهر'
        ]
      });
    }

    return { insights, recommendations, score, maxScore: 100 };
  },

  taxOptimization(country: string, data: any) {
    const countryLaw = getCountryLaw(country);
    if (!countryLaw) return null;

    const strategies = [];
    const savings = [];

    // استراتيجيات تحسين ضريبي
    if (country === 'SA') {
      strategies.push({
        ar: '💡 استراتيجية الزكاة: تحسين حساب الوعاء الزكوي',
        en: '💡 Zakat Strategy: Optimize zakat base calculation',
        impact: 'high',
        details: {
          ar: 'مراجعة الأصول والخصوم لتقليل الوعاء الزكوي بشكل قانوني',
          en: 'Review assets and liabilities to legally reduce zakat base'
        }
      });
    }

    if (country === 'AE') {
      strategies.push({
        ar: '💡 استفد من حد الإعفاء 375,000 درهم للضريبة',
        en: '💡 Utilize 375,000 AED tax exemption threshold',
        impact: 'medium'
      });
    }

    return { strategies, estimatedSavings: savings };
  },

  chartOfAccountsReview(accounts: any[]) {
    const issues = [];
    const suggestions = [];

    // مراجعة دليل الحسابات
    const accountGroups = {
      assets: accounts.filter(a => a.type === 'asset'),
      liabilities: accounts.filter(a => a.type === 'liability'),
      equity: accounts.filter(a => a.type === 'equity'),
      revenue: accounts.filter(a => a.type === 'revenue'),
      expenses: accounts.filter(a => a.type === 'expense')
    };

    // التحقق من الهيكل
    if (accountGroups.assets.length < 10) {
      issues.push({
        ar: '⚠️ دليل الحسابات غير شامل - الأصول قليلة جداً',
        en: '⚠️ Chart of accounts incomplete - too few asset accounts',
        severity: 'medium'
      });
    }

    // اقتراحات
    suggestions.push({
      ar: '📊 يُنصح بإضافة حسابات فرعية للأصول الثابتة حسب IAS 16',
      en: '📊 Add sub-accounts for fixed assets per IAS 16',
      standard: 'IAS 16'
    });

    return { issues, suggestions, accountGroups };
  }
};

// ====================================
// 2️⃣ خبير المشتريات وسلسلة التوريد
// ====================================
export const purchasingExpert = {
  profile: {
    name: { ar: 'د. أحمد - خبير المشتريات', en: 'Dr. Ahmed - Procurement Expert' },
    title: {
      ar: 'خبير سلسلة التوريد | محلل مشتريات استراتيجي | معتمد ISO 9001',
      en: 'Supply Chain Expert | Strategic Procurement Analyst | ISO 9001 Certified'
    },
    credentials: [
      'CPSM - Certified Professional in Supply Management',
      'CSCP - Certified Supply Chain Professional',
      'ISO 9001 Lead Auditor',
      'Lean Six Sigma Black Belt',
      '15+ Years in Supply Chain'
    ],
    expertise: {
      ar: [
        '🔗 إدارة سلسلة التوريد الشاملة',
        '📦 تحسين عمليات المشتريات',
        '💼 إدارة علاقات الموردين (SRM)',
        '📊 تحليل التكاليف والتفاوض',
        '⚡ Just-in-Time & Lean Procurement',
        '🎯 KPIs ومؤشرات الأداء',
        '🔍 تقييم الموردين وإدارة المخاطر'
      ],
      en: [
        '🔗 Complete Supply Chain Management',
        '📦 Procurement Process Optimization',
        '💼 Supplier Relationship Management',
        '📊 Cost Analysis & Negotiation',
        '⚡ Just-in-Time & Lean Procurement',
        '🎯 KPIs and Performance Metrics',
        '🔍 Supplier Evaluation & Risk Management'
      ]
    }
  },

  assessmentQuestions: {
    ar: [
      {
        id: 'P1',
        question: 'ما هي قيمة مشترياتك السنوية؟',
        type: 'number',
        category: 'volume'
      },
      {
        id: 'P2',
        question: 'كم عدد الموردين النشطين لديك؟',
        type: 'number',
        category: 'supplier_base'
      },
      {
        id: 'P3',
        question: 'ما هو متوسط وقت التسليم من الطلب حتى الاستلام؟',
        type: 'choice',
        options: ['أقل من أسبوع', '1-2 أسبوع', '2-4 أسابيع', 'أكثر من شهر'],
        category: 'lead_time'
      },
      {
        id: 'P4',
        question: 'هل لديك نظام تقييم موردين؟',
        type: 'choice',
        options: ['نعم منهجي', 'بسيط', 'لا يوجد'],
        category: 'supplier_management'
      },
      {
        id: 'P5',
        question: 'ما هي التحديات الرئيسية في المشتريات؟',
        type: 'multiple',
        options: [
          'ارتفاع الأسعار',
          'تأخر التسليم',
          'جودة المنتجات',
          'إدارة المخزون',
          'التفاوض مع الموردين',
          'نقص الشفافية'
        ],
        category: 'challenges'
      }
    ]
  },

  analyzeSupplyChain(data: any) {
    const analysis = {
      efficiency: 0,
      risks: [],
      opportunities: [],
      recommendations: []
    };

    // تحليل الكفاءة
    if (data.leadTime === 'أقل من أسبوع') {
      analysis.efficiency += 40;
    } else if (data.leadTime === 'أكثر من شهر') {
      analysis.risks.push({
        ar: '🔴 وقت التسليم طويل جداً - خطر على العمليات',
        en: '🔴 Lead time too long - operational risk',
        severity: 'high'
      });
    }

    // تحليل قاعدة الموردين
    if (data.supplierCount < 5) {
      analysis.risks.push({
        ar: '⚠️ الاعتماد على موردين قليلين - خطر انقطاع التوريد',
        en: '⚠️ Too few suppliers - supply disruption risk',
        severity: 'medium'
      });
      analysis.recommendations.push({
        ar: '📌 توسيع قاعدة الموردين إلى 8-10 موردين على الأقل',
        en: '📌 Expand supplier base to 8-10 suppliers minimum',
        priority: 'high'
      });
    }

    // فرص التحسين
    analysis.opportunities.push({
      ar: '💡 تطبيق نظام Just-in-Time لتقليل المخزون بنسبة 30%',
      en: '💡 Implement Just-in-Time to reduce inventory by 30%',
      impact: 'high',
      timeline: '3-6 months'
    });

    return analysis;
  },

  supplierScorecard(supplier: any) {
    const criteria = {
      quality: 0,
      delivery: 0,
      price: 0,
      service: 0,
      compliance: 0
    };

    // حساب النقاط
    const totalScore = Object.values(criteria).reduce((a, b) => a + b, 0) / 5;

    return {
      supplier: supplier.name,
      overallScore: totalScore,
      criteria,
      rating: totalScore >= 80 ? 'A' : totalScore >= 60 ? 'B' : totalScore >= 40 ? 'C' : 'D',
      recommendation: totalScore >= 80 
        ? { ar: '✅ مورد ممتاز - يُنصح بالتعامل المستمر', en: '✅ Excellent supplier - continue partnership' }
        : { ar: '⚠️ يحتاج تحسين أو البحث عن بديل', en: '⚠️ Needs improvement or find alternative' }
    };
  },

  costSavingStrategies(data: any) {
    return {
      ar: [
        '💰 التفاوض الجماعي: توحيد الطلبات لخصومات أفضل (توفير 15-25%)',
        '📊 تحليل ABC: التركيز على أهم 20% من الأصناف (قاعدة باريتو)',
        '🔄 عقود طويلة الأجل: تثبيت الأسعار لمدة 12-24 شهر',
        '🌐 موردين بديلين: المنافسة تخفض الأسعار 10-20%',
        '📦 تحسين حجم الطلبيات: تقليل تكاليف الشحن والمناولة',
        '⚡ الدفع المبكر: خصم 2-5% مقابل الدفع خلال 10 أيام'
      ],
      en: [
        '💰 Group Negotiation: Consolidate orders for better discounts (15-25% savings)',
        '📊 ABC Analysis: Focus on top 20% items (Pareto principle)',
        '🔄 Long-term Contracts: Lock prices for 12-24 months',
        '🌐 Alternative Suppliers: Competition reduces prices 10-20%',
        '📦 Order Size Optimization: Reduce shipping and handling costs',
        '⚡ Early Payment: 2-5% discount for payment within 10 days'
      ]
    };
  }
};

// ====================================
// 3️⃣ خبير المبيعات الاستراتيجي
// ====================================
export const salesExpert = {
  profile: {
    name: { ar: 'د. سارة - خبيرة المبيعات', en: 'Dr. Sarah - Sales Expert' },
    title: {
      ar: 'خبيرة استراتيجيات المبيعات | محللة بيانات تجارية | مستشارة نمو',
      en: 'Sales Strategy Expert | Business Analytics | Growth Consultant'
    },
    credentials: [
      'MBA in Marketing & Sales',
      'Certified Sales Leader (CSL)',
      'Data Analytics Expert',
      'CRM Specialist',
      '12+ Years Sales Leadership'
    ],
    expertise: {
      ar: [
        '📈 تحليل بيانات المبيعات المتقدم',
        '🎯 استراتيجيات البيع الحديثة',
        '💼 إدارة علاقات العملاء CRM',
        '📊 التنبؤ بالمبيعات (Forecasting)',
        '🔍 تحليل سلوك العملاء',
        '💡 خطط النمو والتوسع',
        '⚡ تحسين معدلات التحويل'
      ],
      en: [
        '📈 Advanced Sales Data Analytics',
        '🎯 Modern Sales Strategies',
        '💼 CRM Management',
        '📊 Sales Forecasting',
        '🔍 Customer Behavior Analysis',
        '💡 Growth & Expansion Plans',
        '⚡ Conversion Rate Optimization'
      ]
    }
  },

  assessmentQuestions: {
    ar: [
      {
        id: 'S1',
        question: 'ما هو متوسط قيمة الصفقة (Average Deal Size)؟',
        type: 'number',
        category: 'deal_size'
      },
      {
        id: 'S2',
        question: 'ما هو معدل تحويل العروض إلى مبيعات؟',
        type: 'choice',
        options: ['أقل من 20%', '20-40%', '40-60%', 'أكثر من 60%'],
        category: 'conversion_rate'
      },
      {
        id: 'S3',
        question: 'كم عدد العملاء النشطين حالياً؟',
        type: 'number',
        category: 'customer_base'
      },
      {
        id: 'S4',
        question: 'ما هي قنوات البيع الرئيسية؟',
        type: 'multiple',
        options: [
          'المبيعات المباشرة',
          'الموقع الإلكتروني',
          'وسائل التواصل الاجتماعي',
          'الوكلاء والموزعين',
          'المعارض والفعاليات',
          'التسويق الهاتفي'
        ],
        category: 'channels'
      },
      {
        id: 'S5',
        question: 'ما هو هدف النمو المستهدف للسنة القادمة؟',
        type: 'choice',
        options: ['10-20%', '20-50%', '50-100%', 'أكثر من 100%'],
        category: 'growth_target'
      }
    ]
  },

  analyzeSalesData(data: any) {
    const analysis = {
      performance: '',
      strengths: [],
      weaknesses: [],
      opportunities: [],
      kpis: {}
    };

    // تحليل معدل التحويل
    if (data.conversionRate === 'أكثر من 60%') {
      analysis.strengths.push({
        ar: '✅ معدل تحويل ممتاز! أعلى من المعدل الصناعي',
        en: '✅ Excellent conversion rate! Above industry average'
      });
    } else if (data.conversionRate === 'أقل من 20%') {
      analysis.weaknesses.push({
        ar: '🔴 معدل تحويل منخفض - يحتاج تحسين عاجل',
        en: '🔴 Low conversion rate - needs urgent improvement'
      });
      analysis.opportunities.push({
        ar: '💡 تحسين عملية البيع يمكن أن يضاعف الإيرادات',
        en: '💡 Improving sales process can double revenue',
        impact: 'critical'
      });
    }

    return analysis;
  },

  createSalesForecast(historicalData: any[], months: number = 12) {
    const forecast = [];
    
    // حساب معدل النمو
    const growthRate = 0.15; // افتراضي 15% شهرياً

    for (let i = 0; i < months; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() + i);
      
      forecast.push({
        month: month.toLocaleDateString('ar', { year: 'numeric', month: 'long' }),
        pessimistic: 100000 * (1 + growthRate * 0.5) ** i,
        realistic: 100000 * (1 + growthRate) ** i,
        optimistic: 100000 * (1 + growthRate * 1.5) ** i,
        confidence: Math.max(50, 90 - i * 3) // تقل الثقة مع البعد الزمني
      });
    }

    return {
      forecast,
      assumptions: {
        ar: [
          'معدل نمو شهري: 15%',
          'استقرار السوق',
          'عدم تغييرات جذرية في المنافسة',
          'استمرار الأداء الحالي'
        ],
        en: [
          'Monthly growth rate: 15%',
          'Market stability',
          'No drastic competition changes',
          'Current performance continues'
        ]
      }
    };
  },

  salesPlan(data: any) {
    return {
      monthlyTargets: [],
      strategies: {
        ar: [
          '🎯 استراتيجية 1: تحسين معدل التحويل من 30% إلى 50%',
          '📱 استراتيجية 2: التوسع في التسويق الرقمي (Google Ads + Facebook)',
          '🤝 استراتيجية 3: برنامج إحالة العملاء (مكافأة 10%)',
          '📊 استراتيجية 4: تجزئة العملاء (A, B, C) وخطة لكل فئة',
          '💼 استراتيجية 5: تدريب فريق المبيعات على تقنيات الإقناع',
          '⚡ استراتيجية 6: تسريع دورة البيع من 30 إلى 15 يوم'
        ],
        en: [
          '🎯 Strategy 1: Improve conversion from 30% to 50%',
          '📱 Strategy 2: Expand digital marketing (Google Ads + Facebook)',
          '🤝 Strategy 3: Customer referral program (10% reward)',
          '📊 Strategy 4: Customer segmentation (A, B, C) with tailored plans',
          '💼 Strategy 5: Train sales team on persuasion techniques',
          '⚡ Strategy 6: Accelerate sales cycle from 30 to 15 days'
        ]
      },
      implementation: {
        ar: [
          'الشهر 1-2: تحليل وتحسين عملية البيع الحالية',
          'الشهر 3-4: إطلاق حملة تسويق رقمي مكثفة',
          'الشهر 5-6: تطبيق برنامج الإحالات والمكافآت',
          'الشهر 7-8: توسيع فريق المبيعات بـ 2-3 موظفين',
          'الشهر 9-10: فتح قناة بيع جديدة (أونلاين أو وكيل)',
          'الشهر 11-12: تقييم النتائج والتخطيط للسنة القادمة'
        ],
        en: [
          'Month 1-2: Analyze and improve current sales process',
          'Month 3-4: Launch intensive digital marketing campaign',
          'Month 5-6: Implement referral and rewards program',
          'Month 7-8: Expand sales team by 2-3 employees',
          'Month 9-10: Open new sales channel (online or agent)',
          'Month 11-12: Evaluate results and plan next year'
        ]
      }
    };
  },

  customerSegmentation(customers: any[]) {
    return {
      segments: {
        VIP: {
          criteria: 'معاملات > 100,000 أو 10+ طلبات/سنة',
          count: 0,
          strategy: 'خدمة مخصصة + مدير حساب + خصومات خاصة'
        },
        A: {
          criteria: 'معاملات 50,000-100,000',
          count: 0,
          strategy: 'اهتمام عالي + عروض شهرية'
        },
        B: {
          criteria: 'معاملات 10,000-50,000',
          count: 0,
          strategy: 'متابعة منتظمة + نشرة دورية'
        },
        C: {
          criteria: 'معاملات < 10,000',
          count: 0,
          strategy: 'خدمة ذاتية + عروض آلية'
        }
      }
    };
  }
};

// ====================================
// 4️⃣ خبير المشاريع الدولي
// ====================================
export const projectExpert = {
  profile: {
    name: { ar: 'د. خالد - خبير المشاريع', en: 'Dr. Khaled - Project Expert' },
    title: {
      ar: 'مدير مشاريع معتمد PMP | خبير إدارة القيمة المكتسبة | مستشار Agile',
      en: 'PMP Certified | EVM Expert | Agile Consultant'
    },
    credentials: [
      'PMP - Project Management Professional',
      'PMI-ACP - Agile Certified Practitioner',
      'Prince2 Practitioner',
      'Scrum Master Certified',
      '18+ Years Project Leadership'
    ],
    expertise: {
      ar: [
        '📊 PMBOK 7th Edition - أحدث معايير PMI',
        '⚡ Agile & Scrum Methodologies',
        '💰 إدارة القيمة المكتسبة (EVM)',
        '⏱️ التخطيط الزمني المتقدم (CPM/PERT)',
        '💼 إدارة أصحاب المصلحة',
        '🎯 تحليل المخاطر وإدارتها',
        '📈 مراقبة الأداء والتحكم'
      ],
      en: [
        '📊 PMBOK 7th Edition - Latest PMI Standards',
        '⚡ Agile & Scrum Methodologies',
        '💰 Earned Value Management (EVM)',
        '⏱️ Advanced Scheduling (CPM/PERT)',
        '💼 Stakeholder Management',
        '🎯 Risk Analysis & Management',
        '📈 Performance Monitoring & Control'
      ]
    }
  },

  assessmentQuestions: {
    ar: [
      {
        id: 'PM1',
        question: 'ما هي قيمة المشروع الإجمالية؟',
        type: 'number',
        category: 'budget'
      },
      {
        id: 'PM2',
        question: 'ما هي المدة الزمنية المخططة للمشروع؟',
        type: 'choice',
        options: ['أقل من 3 أشهر', '3-6 أشهر', '6-12 شهر', 'أكثر من سنة'],
        category: 'duration'
      },
      {
        id: 'PM3',
        question: 'كم عدد أعضاء فريق المشروع؟',
        type: 'number',
        category: 'team_size'
      },
      {
        id: 'PM4',
        question: 'ما هي منهجية إدارة المشروع المستخدمة؟',
        type: 'choice',
        options: ['Waterfall', 'Agile', 'Hybrid', 'لا يوجد منهجية محددة'],
        category: 'methodology'
      },
      {
        id: 'PM5',
        question: 'ما هي أكبر المخاطر المتوقعة؟',
        type: 'multiple',
        options: [
          'تجاوز الميزانية',
          'تأخر الجدول الزمني',
          'نقص الموارد',
          'تغيير المتطلبات',
          'مشاكل فنية',
          'عدم رضا أصحاب المصلحة'
        ],
        category: 'risks'
      }
    ]
  },

  evaluateProject(data: any) {
    const evaluation = {
      healthScore: 0,
      status: '',
      redFlags: [],
      greenFlags: [],
      recommendations: []
    };

    // تقييم الصحة العامة
    let score = 100;

    // فحص المنهجية
    if (data.methodology === 'لا يوجد منهجية محددة') {
      score -= 30;
      evaluation.redFlags.push({
        ar: '🔴 خطر حرج: لا توجد منهجية محددة لإدارة المشروع',
        en: '🔴 Critical: No defined project methodology',
        severity: 'critical'
      });
      evaluation.recommendations.push({
        ar: '📌 عاجل: تطبيق منهجية Agile أو Waterfall فوراً',
        en: '📌 Urgent: Implement Agile or Waterfall immediately',
        priority: 'critical',
        timeline: 'الأسبوع القادم'
      });
    }

    // فحص حجم الفريق
    if (data.teamSize < 3 && data.duration !== 'أقل من 3 أشهر') {
      score -= 15;
      evaluation.redFlags.push({
        ar: '⚠️ فريق صغير لمشروع طويل - خطر على التسليم',
        en: '⚠️ Small team for long project - delivery risk',
        severity: 'high'
      });
    }

    evaluation.healthScore = Math.max(0, score);
    evaluation.status = score >= 80 ? 'صحي' : score >= 60 ? 'مقبول' : score >= 40 ? 'يحتاج انتباه' : 'حرج';

    return evaluation;
  },

  earnedValueAnalysis(project: any) {
    // إدارة القيمة المكتسبة (EVM)
    const PV = project.plannedValue || 0; // القيمة المخططة
    const EV = project.earnedValue || 0; // القيمة المكتسبة
    const AC = project.actualCost || 0; // التكلفة الفعلية

    const SV = EV - PV; // انحراف الجدول الزمني
    const CV = EV - AC; // انحراف التكلفة
    const SPI = PV > 0 ? EV / PV : 0; // مؤشر أداء الجدول
    const CPI = AC > 0 ? EV / AC : 0; // مؤشر أداء التكلفة

    return {
      metrics: {
        PV, EV, AC, SV, CV, SPI, CPI
      },
      status: {
        schedule: SPI >= 1 ? 'على المسار' : SPI >= 0.9 ? 'تأخر طفيف' : 'تأخر كبير',
        cost: CPI >= 1 ? 'ضمن الميزانية' : CPI >= 0.9 ? 'تجاوز طفيف' : 'تجاوز كبير'
      },
      forecast: {
        EAC: AC / CPI, // التقدير عند الإنجاز
        ETC: (AC / CPI) - AC, // التقدير للإنجاز
        VAC: project.budget - (AC / CPI) // انحراف عند الإنجاز
      },
      interpretation: {
        ar: SPI >= 1 && CPI >= 1 
          ? '✅ المشروع يسير بشكل ممتاز' 
          : SPI < 1 && CPI < 1
          ? '🔴 المشروع متأخر وتجاوز الميزانية - تدخل عاجل مطلوب'
          : SPI < 1
          ? '⚠️ المشروع متأخر عن الجدول الزمني'
          : '⚠️ المشروع تجاوز الميزانية',
        en: SPI >= 1 && CPI >= 1 
          ? '✅ Project performing excellently' 
          : '🔴 Project needs attention'
      }
    };
  },

  riskMatrix(risks: any[]) {
    const matrix = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };

    risks.forEach(risk => {
      const score = (risk.probability || 0) * (risk.impact || 0);
      if (score >= 15) matrix.critical.push(risk);
      else if (score >= 9) matrix.high.push(risk);
      else if (score >= 4) matrix.medium.push(risk);
      else matrix.low.push(risk);
    });

    return {
      matrix,
      mitigationPlan: {
        ar: [
          '🎯 المخاطر الحرجة: خطة استجابة فورية خلال 24 ساعة',
          '⚠️ المخاطر العالية: خطة تخفيف خلال أسبوع',
          '📊 المخاطر المتوسطة: مراقبة أسبوعية',
          '✅ المخاطر المنخفضة: مراجعة شهرية'
        ],
        en: [
          '🎯 Critical Risks: Immediate response plan within 24 hours',
          '⚠️ High Risks: Mitigation plan within a week',
          '📊 Medium Risks: Weekly monitoring',
          '✅ Low Risks: Monthly review'
        ]
      }
    };
  }
};

// ====================================
// 5️⃣ خبير إدارة المخاطر
// ====================================
export const riskExpert = {
  profile: {
    name: { ar: 'د. ليلى - خبيرة المخاطر', en: 'Dr. Layla - Risk Expert' },
    title: {
      ar: 'خبيرة إدارة المخاطر المؤسسية | محللة امتثال | مستشارة حوكمة',
      en: 'Enterprise Risk Management Expert | Compliance Analyst | Governance Consultant'
    },
    credentials: [
      'FRM - Financial Risk Manager',
      'CERM - Certified Enterprise Risk Manager',
      'ISO 31000 Lead Implementer',
      'COSO Framework Expert',
      '14+ Years Risk Management'
    ],
    expertise: {
      ar: [
        '🎯 إدارة المخاطر المؤسسية (ERM)',
        '📊 تقييم وتحليل المخاطر',
        '🛡️ الحوكمة والامتثال',
        '💼 مخاطر العمليات والمالية',
        '🔍 الرقابة الداخلية',
        '⚖️ الامتثال التنظيمي',
        '📈 مؤشرات المخاطر الرئيسية (KRIs)'
      ],
      en: [
        '🎯 Enterprise Risk Management (ERM)',
        '📊 Risk Assessment & Analysis',
        '🛡️ Governance & Compliance',
        '💼 Operational & Financial Risks',
        '🔍 Internal Controls',
        '⚖️ Regulatory Compliance',
        '📈 Key Risk Indicators (KRIs)'
      ]
    }
  },

  assessmentQuestions: {
    ar: [
      {
        id: 'R1',
        question: 'هل لديك إطار عمل لإدارة المخاطر؟',
        type: 'choice',
        options: ['نعم موثق', 'غير رسمي', 'لا يوجد'],
        category: 'framework'
      },
      {
        id: 'R2',
        question: 'كم مرة تقوم بتقييم المخاطر؟',
        type: 'choice',
        options: ['شهرياً', 'ربع سنوي', 'سنوياً', 'نادراً'],
        category: 'frequency'
      },
      {
        id: 'R3',
        question: 'هل لديك تأمينات تجارية؟',
        type: 'multiple',
        options: [
          'تأمين الممتلكات',
          'تأمين المسؤولية',
          'تأمين الموظفين',
          'تأمين ضد التوقف',
          'لا يوجد تأمينات'
        ],
        category: 'insurance'
      },
      {
        id: 'R4',
        question: 'ما هي أكبر المخاطر التي تواجه عملك؟',
        type: 'multiple',
        options: [
          'مخاطر مالية (سيولة، ديون)',
          'مخاطر تشغيلية (أعطال، كوارث)',
          'مخاطر قانونية (قضايا، عقوبات)',
          'مخاطر سمعة (تقييمات سلبية)',
          'مخاطر سوق (منافسة، ركود)',
          'مخاطر سيبرانية (هجمات، بيانات)'
        ],
        category: 'risk_types'
      },
      {
        id: 'R5',
        question: 'هل سبق أن تعرضت لخسارة كبيرة؟',
        type: 'choice',
        options: ['نعم مؤخراً', 'نعم سابقاً', 'لا'],
        category: 'history'
      }
    ]
  },

  comprehensiveRiskAssessment(data: any) {
    const assessment = {
      overallRiskLevel: 'متوسط',
      riskScore: 0,
      categories: {
        financial: { level: 0, risks: [] },
        operational: { level: 0, risks: [] },
        compliance: { level: 0, risks: [] },
        strategic: { level: 0, risks: [] },
        reputational: { level: 0, risks: [] }
      },
      actionPlan: []
    };

    // تقييم إطار العمل
    if (data.framework === 'لا يوجد') {
      assessment.riskScore += 40;
      assessment.actionPlan.push({
        priority: 'critical',
        ar: '🔴 عاجل: تطوير إطار عمل لإدارة المخاطر (ISO 31000)',
        en: '🔴 Urgent: Develop risk management framework (ISO 31000)',
        timeline: 'شهر واحد'
      });
    }

    // تقييم التأمينات
    if (data.insurance?.includes('لا يوجد تأمينات')) {
      assessment.riskScore += 25;
      assessment.actionPlan.push({
        priority: 'high',
        ar: '⚠️ الحصول على تأمينات أساسية (ممتلكات + مسؤولية)',
        en: '⚠️ Get basic insurance (property + liability)',
        timeline: 'أسبوعين'
      });
    }

    return assessment;
  },

  riskHeatmap() {
    return {
      ar: `
      📊 خريطة المخاطر الحرارية (Risk Heatmap)
      
      الاحتمالية ↑
      5 | 🟡  🟠  🔴  🔴  🔴
      4 | 🟢  🟡  🟠  🔴  🔴
      3 | 🟢  🟡  🟡  🟠  🔴
      2 | 🟢  🟢  🟡  🟡  🟠
      1 | 🟢  🟢  🟢  🟡  🟡
        +-------------------→ التأثير
          1   2   3   4   5
      
      🟢 منخفض   🟡 متوسط   🟠 عالي   🔴 حرج
      `,
      en: `
      📊 Risk Heatmap
      
      Likelihood ↑
      5 | 🟡  🟠  🔴  🔴  🔴
      4 | 🟢  🟡  🟠  🔴  🔴
      3 | 🟢  🟡  🟡  🟠  🔴
      2 | 🟢  🟢  🟡  🟡  🟠
      1 | 🟢  🟢  🟢  🟡  🟡
        +-------------------→ Impact
          1   2   3   4   5
      
      🟢 Low   🟡 Medium   🟠 High   🔴 Critical
      `
    };
  },

  complianceChecklist(country: string) {
    const checklists: any = {
      IQ: {
        ar: [
          '✅ تسجيل الشركة في دائرة الشركات',
          '✅ الحصول على رخصة العمل',
          '✅ التسجيل في هيئة الضرائب',
          '✅ فتح حساب بنكي تجاري',
          '✅ التسجيل في غرفة التجارة',
          '✅ تأمينات العاملين (إن وجد)',
          '✅ الامتثال لقانون العمل رقم 37/2015'
        ]
      },
      SA: {
        ar: [
          '✅ السجل التجاري من وزارة التجارة',
          '✅ رقم ضريبي من هيئة الزكاة والضريبة',
          '✅ رقم ضريبة القيمة المضافة',
          '✅ التسجيل في GOSI (التأمينات)',
          '✅ رخصة البلدية',
          '✅ شهادة الدفاع المدني',
          '✅ التوطين (نطاقات)',
          '✅ الامتثال لنظام العمل السعودي'
        ]
      }
    };

    return checklists[country] || checklists.IQ;
  }
};

// ====================================
// 6️⃣ الخبير الإداري الشامل
// ====================================
export const managementExpert = {
  profile: {
    name: { ar: 'د. عمر - خبير الإدارة', en: 'Dr. Omar - Management Expert' },
    title: {
      ar: 'خبير إدارة استراتيجية | مستشار تطوير مؤسسي | قيادي تنفيذي',
      en: 'Strategic Management Expert | Organizational Development | Executive Leadership'
    },
    credentials: [
      'DBA - Doctor of Business Administration',
      'Certified Management Consultant (CMC)',
      'Change Management Expert',
      'Leadership Coach',
      'OKR & KPI Specialist',
      '25+ Years Executive Experience'
    ],
    expertise: {
      ar: [
        '🎯 التخطيط الاستراتيجي (Strategic Planning)',
        '👥 القيادة وتطوير الفرق',
        '📊 إدارة الأداء (KPIs/OKRs)',
        '🔄 إدارة التغيير المؤسسي',
        '💡 الابتكار وريادة الأعمال',
        '🏆 التميز المؤسسي',
        '📈 النمو والتوسع الاستراتيجي'
      ],
      en: [
        '🎯 Strategic Planning',
        '👥 Leadership & Team Development',
        '📊 Performance Management (KPIs/OKRs)',
        '🔄 Organizational Change Management',
        '💡 Innovation & Entrepreneurship',
        '🏆 Organizational Excellence',
        '📈 Strategic Growth & Expansion'
      ]
    }
  },

  assessmentQuestions: {
    ar: [
      {
        id: 'M1',
        question: 'كم عدد الموظفين في شركتك؟',
        type: 'choice',
        options: ['1-10', '11-50', '51-200', 'أكثر من 200'],
        category: 'size'
      },
      {
        id: 'M2',
        question: 'هل لديك خطة استراتيجية مكتوبة؟',
        type: 'choice',
        options: ['نعم ومحدثة', 'نعم لكن قديمة', 'لا يوجد'],
        category: 'strategy'
      },
      {
        id: 'M3',
        question: 'كيف تقيس أداء الشركة؟',
        type: 'multiple',
        options: [
          'مؤشرات أداء رئيسية (KPIs)',
          'الأهداف والنتائج الرئيسية (OKRs)',
          'بطاقة الأداء المتوازن (BSC)',
          'التقارير المالية فقط',
          'لا يوجد قياس منتظم'
        ],
        category: 'performance'
      },
      {
        id: 'M4',
        question: 'ما هو نمط الإدارة السائد؟',
        type: 'choice',
        options: [
          'مركزي (قرارات من الإدارة العليا)',
          'لا مركزي (تفويض صلاحيات)',
          'مختلط',
          'غير واضح'
        ],
        category: 'style'
      },
      {
        id: 'M5',
        question: 'ما هي أهم التحديات الإدارية؟',
        type: 'multiple',
        options: [
          'التواصل الداخلي',
          'تحفيز الموظفين',
          'إدارة الوقت والأولويات',
          'اتخاذ القرارات',
          'إدارة الصراعات',
          'التخطيط طويل الأمد'
        ],
        category: 'challenges'
      }
    ]
  },

  organizationalDiagnosis(data: any) {
    const diagnosis = {
      maturityLevel: '',
      score: 0,
      strengths: [],
      gaps: [],
      developmentRoadmap: []
    };

    // تقييم النضج المؤسسي
    let maturityScore = 0;

    // فحص الاستراتيجية
    if (data.strategy === 'نعم ومحدثة') {
      maturityScore += 25;
      diagnosis.strengths.push({
        ar: '✅ استراتيجية واضحة ومحدثة',
        en: '✅ Clear and updated strategy'
      });
    } else {
      diagnosis.gaps.push({
        ar: '❌ غياب استراتيجية واضحة',
        en: '❌ Lack of clear strategy',
        priority: 'critical'
      });
    }

    // فحص قياس الأداء
    if (data.performance?.includes('مؤشرات أداء رئيسية (KPIs)')) {
      maturityScore += 25;
    } else if (data.performance?.includes('لا يوجد قياس منتظم')) {
      diagnosis.gaps.push({
        ar: '❌ عدم وجود نظام لقياس الأداء',
        en: '❌ No performance measurement system',
        priority: 'high'
      });
    }

    // تحديد مستوى النضج
    if (maturityScore >= 80) diagnosis.maturityLevel = 'متقدم';
    else if (maturityScore >= 60) diagnosis.maturityLevel = 'نامي';
    else if (maturityScore >= 40) diagnosis.maturityLevel = 'متوسط';
    else diagnosis.maturityLevel = 'مبتدئ';

    diagnosis.score = maturityScore;

    return diagnosis;
  },

  strategicPlan(vision: string, mission: string) {
    return {
      vision,
      mission,
      values: {
        ar: ['النزاهة', 'التميز', 'الابتكار', 'العمل الجماعي', 'رضا العملاء'],
        en: ['Integrity', 'Excellence', 'Innovation', 'Teamwork', 'Customer Satisfaction']
      },
      strategicGoals: {
        ar: [
          '🎯 الهدف 1: زيادة الحصة السوقية بنسبة 30% خلال 3 سنوات',
          '💰 الهدف 2: تحقيق نمو في الإيرادات بنسبة 25% سنوياً',
          '👥 الهدف 3: بناء فريق عمل متميز (50+ موظف)',
          '🌍 الهدف 4: التوسع إلى 3 مدن جديدة',
          '⭐ الهدف 5: الوصول لتصنيف 4.5+ في رضا العملاء'
        ],
        en: [
          '🎯 Goal 1: Increase market share by 30% in 3 years',
          '💰 Goal 2: Achieve 25% annual revenue growth',
          '👥 Goal 3: Build excellent team (50+ employees)',
          '🌍 Goal 4: Expand to 3 new cities',
          '⭐ Goal 5: Achieve 4.5+ customer satisfaction rating'
        ]
      },
      initiatives: {
        ar: [
          '📱 مبادرة 1: التحول الرقمي الكامل',
          '🎓 مبادرة 2: برنامج تطوير الموظفين',
          '🤝 مبادرة 3: شراكات استراتيجية',
          '💡 مبادرة 4: الابتكار في المنتجات',
          '🌟 مبادرة 5: برنامج التميز المؤسسي'
        ],
        en: [
          '📱 Initiative 1: Complete Digital Transformation',
          '🎓 Initiative 2: Employee Development Program',
          '🤝 Initiative 3: Strategic Partnerships',
          '💡 Initiative 4: Product Innovation',
          '🌟 Initiative 5: Organizational Excellence Program'
        ]
      }
    };
  },

  kpiDashboard() {
    return {
      financial: [
        { name: 'نمو الإيرادات', target: '25%', current: '18%', status: 'warning' },
        { name: 'هامش الربح', target: '20%', current: '22%', status: 'success' },
        { name: 'العائد على الاستثمار', target: '15%', current: '17%', status: 'success' }
      ],
      customer: [
        { name: 'رضا العملاء', target: '4.5', current: '4.2', status: 'warning' },
        { name: 'معدل الاحتفاظ', target: '90%', current: '85%', status: 'warning' },
        { name: 'صافي الترويج (NPS)', target: '50', current: '45', status: 'warning' }
      ],
      internal: [
        { name: 'كفاءة العمليات', target: '95%', current: '92%', status: 'success' },
        { name: 'جودة المنتج', target: '99%', current: '98%', status: 'success' },
        { name: 'وقت التسليم', target: '3 أيام', current: '4 أيام', status: 'warning' }
      ],
      learning: [
        { name: 'رضا الموظفين', target: '80%', current: '75%', status: 'warning' },
        { name: 'ساعات التدريب', target: '40 ساعة', current: '30 ساعة', status: 'warning' },
        { name: 'معدل الدوران', target: '<10%', current: '12%', status: 'danger' }
      ]
    };
  },

  leadershipDevelopment() {
    return {
      ar: {
        title: '🎓 برنامج تطوير القيادات',
        modules: [
          {
            name: 'المستوى 1: القيادة الذاتية',
            duration: 'شهرين',
            topics: [
              'الذكاء العاطفي',
              'إدارة الوقت والأولويات',
              'التفكير الاستراتيجي',
              'اتخاذ القرارات'
            ]
          },
          {
            name: 'المستوى 2: قيادة الفرق',
            duration: '3 أشهر',
            topics: [
              'بناء الفرق عالية الأداء',
              'التحفيز والتمكين',
              'إدارة الصراعات',
              'التواصل الفعال'
            ]
          },
          {
            name: 'المستوى 3: القيادة التنظيمية',
            duration: '4 أشهر',
            topics: [
              'التخطيط الاستراتيجي',
              'إدارة التغيير',
              'بناء الثقافة المؤسسية',
              'القيادة التحويلية'
            ]
          }
        ],
        outcomes: [
          '✅ قادة مؤهلين لإدارة الفرق',
          '✅ تحسين الأداء المؤسسي 30%',
          '✅ زيادة رضا الموظفين',
          '✅ تقليل معدل الدوران',
          '✅ تحقيق الأهداف الاستراتيجية'
        ]
      },
      en: {
        title: '🎓 Leadership Development Program',
        modules: [
          {
            name: 'Level 1: Self Leadership',
            duration: '2 months',
            topics: [
              'Emotional Intelligence',
              'Time & Priority Management',
              'Strategic Thinking',
              'Decision Making'
            ]
          },
          {
            name: 'Level 2: Team Leadership',
            duration: '3 months',
            topics: [
              'Building High-Performance Teams',
              'Motivation & Empowerment',
              'Conflict Management',
              'Effective Communication'
            ]
          },
          {
            name: 'Level 3: Organizational Leadership',
            duration: '4 months',
            topics: [
              'Strategic Planning',
              'Change Management',
              'Building Organizational Culture',
              'Transformational Leadership'
            ]
          }
        ]
      }
    };
  },

  changeManagementPlan(change: string) {
    return {
      phases: {
        ar: [
          {
            phase: '1️⃣ الإعداد والتخطيط',
            duration: 'أسبوعين',
            activities: [
              'تحديد نطاق التغيير',
              'تحليل أصحاب المصلحة',
              'تقييم الجاهزية للتغيير',
              'إنشاء فريق قيادة التغيير'
            ]
          },
          {
            phase: '2️⃣ التواصل والمشاركة',
            duration: 'شهر',
            activities: [
              'توضيح رؤية التغيير',
              'إشراك جميع المستويات',
              'معالجة المخاوف والمقاومة',
              'بناء التحالفات'
            ]
          },
          {
            phase: '3️⃣ التنفيذ',
            duration: '2-3 أشهر',
            activities: [
              'تطبيق التغيير تدريجياً',
              'التدريب والدعم',
              'المراقبة والتعديل',
              'الاحتفال بالإنجازات السريعة'
            ]
          },
          {
            phase: '4️⃣ الترسيخ والاستدامة',
            duration: 'مستمر',
            activities: [
              'دمج التغيير في الثقافة',
              'قياس النتائج',
              'التحسين المستمر',
              'مكافأة المساهمين'
            ]
          }
        ]
      },
      successFactors: {
        ar: [
          '✅ قيادة قوية وملتزمة',
          '✅ تواصل واضح ومستمر',
          '✅ مشاركة الموظفين',
          '✅ تدريب كافٍ',
          '✅ احتفال بالنجاحات',
          '✅ مرونة وقدرة على التكيف'
        ],
        en: [
          '✅ Strong committed leadership',
          '✅ Clear continuous communication',
          '✅ Employee engagement',
          '✅ Adequate training',
          '✅ Celebrate successes',
          '✅ Flexibility and adaptability'
        ]
      }
    };
  }
};

// دالة مساعدة للحصول على الخبير المناسب
export function getExpert(domain: string) {
  const experts: any = {
    accounting: accountingExpert,
    purchasing: purchasingExpert,
    sales: salesExpert,
    project: projectExpert,
    risk: riskExpert,
    management: managementExpert
  };

  return experts[domain] || null;
}

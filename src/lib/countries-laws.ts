/**
 * نظام القوانين متعدد البلدان
 * Multi-Country Legal System
 */

export interface CountryLaw {
  code: string;
  name: { ar: string; en: string };
  flag: string;
  currency: string;
  laborLaw: {
    title: { ar: string; en: string };
    workingHours: {
      daily: number;
      weekly: number;
      description: { ar: string; en: string };
    };
    annualLeave: {
      basic: number;
      after5Years?: number;
      after10Years?: number;
      description: { ar: string; en: string };
    };
    sickLeave: {
      fullPay: number; // days
      halfPay: number; // days
      noPay: number; // days
      description: { ar: string; en: string };
    };
    endOfService: {
      termination: string; // formula
      resignation: string; // formula
      description: { ar: string; en: string };
    };
    overtime: {
      regular: number; // percentage
      weekend: number; // percentage
      holiday: number; // percentage
      description: { ar: string; en: string };
    };
    minimumWage: {
      amount: number;
      currency: string;
      year: number;
      description: { ar: string; en: string };
    };
  };
  taxLaw: {
    title: { ar: string; en: string };
    personalIncome: {
      type: 'progressive' | 'flat';
      brackets?: Array<{
        min: number;
        max: number;
        rate: number;
        description: { ar: string; en: string };
      }>;
      flatRate?: number;
      description: { ar: string; en: string };
    };
    corporateTax: {
      rate: number;
      description: { ar: string; en: string };
    };
    vat?: {
      rate: number;
      description: { ar: string; en: string };
    };
    socialInsurance?: {
      employeeRate: number;
      employerRate: number;
      description: { ar: string; en: string };
    };
  };
  companiesLaw: {
    title: { ar: string; en: string };
    types: Array<{
      type: string;
      name: { ar: string; en: string };
      minCapital: number;
      owners: string;
      liability: 'limited' | 'unlimited';
    }>;
  };
}

export const countriesLaws: Record<string, CountryLaw> = {
  // ====================================
  // 🇮🇶 العراق
  // ====================================
  IQ: {
    code: 'IQ',
    name: { ar: 'العراق', en: 'Iraq' },
    flag: '🇮🇶',
    currency: 'IQD',
    laborLaw: {
      title: { ar: 'قانون العمل العراقي رقم 37 لسنة 2015', en: 'Iraqi Labor Law No. 37 of 2015' },
      workingHours: {
        daily: 8,
        weekly: 48,
        description: {
          ar: 'ساعات العمل الفعلية 8 ساعات يومياً و48 ساعة أسبوعياً',
          en: 'Effective working hours are 8 hours daily and 48 hours weekly'
        }
      },
      annualLeave: {
        basic: 30,
        after5Years: 36,
        after10Years: 42,
        description: {
          ar: '30 يوم سنوياً، 36 يوم بعد 5 سنوات، 42 يوم بعد 10 سنوات',
          en: '30 days annually, 36 after 5 years, 42 after 10 years'
        }
      },
      sickLeave: {
        fullPay: 30,
        halfPay: 60,
        noPay: Infinity,
        description: {
          ar: 'شهر براتب كامل، شهرين بنصف راتب، ثم بدون راتب',
          en: '1 month full pay, 2 months half pay, then no pay'
        }
      },
      endOfService: {
        termination: '1 * years',
        resignation: '0.5 * years',
        description: {
          ar: 'راتب شهر × سنوات الخدمة (إنهاء)، نصف راتب × سنوات (استقالة)',
          en: '1 month × years (termination), 0.5 month × years (resignation)'
        }
      },
      overtime: {
        regular: 150,
        weekend: 200,
        holiday: 200,
        description: {
          ar: '150% عادي، 200% عطل وأعياد',
          en: '150% regular, 200% weekends and holidays'
        }
      },
      minimumWage: {
        amount: 350000,
        currency: 'IQD',
        year: 2023,
        description: {
          ar: '350,000 دينار عراقي شهرياً (2023)',
          en: '350,000 IQD monthly (2023)'
        }
      }
    },
    taxLaw: {
      title: { ar: 'قانون ضريبة الدخل رقم 113 لسنة 1982', en: 'Income Tax Law No. 113 of 1982' },
      personalIncome: {
        type: 'progressive',
        brackets: [
          { min: 0, max: 250000, rate: 0, description: { ar: 'معفى', en: 'Exempt' } },
          { min: 250001, max: 500000, rate: 3, description: { ar: '3%', en: '3%' } },
          { min: 500001, max: 1000000, rate: 5, description: { ar: '5%', en: '5%' } },
          { min: 1000001, max: 2000000, rate: 10, description: { ar: '10%', en: '10%' } },
          { min: 2000001, max: 5000000, rate: 15, description: { ar: '15%', en: '15%' } },
          { min: 5000001, max: Infinity, rate: 20, description: { ar: '20%', en: '20%' } }
        ],
        description: {
          ar: 'ضريبة تصاعدية من 0% إلى 20%',
          en: 'Progressive tax from 0% to 20%'
        }
      },
      corporateTax: {
        rate: 15,
        description: {
          ar: 'نسبة ثابتة 15% على صافي الأرباح',
          en: 'Fixed rate of 15% on net profits'
        }
      }
    },
    companiesLaw: {
      title: { ar: 'قانون الشركات رقم 21 لسنة 1997', en: 'Companies Law No. 21 of 1997' },
      types: [
        {
          type: 'sole',
          name: { ar: 'المؤسسة الفردية', en: 'Sole Proprietorship' },
          minCapital: 0,
          owners: '1',
          liability: 'unlimited'
        },
        {
          type: 'llc',
          name: { ar: 'شركة محدودة المسؤولية', en: 'LLC' },
          minCapital: 1000000,
          owners: '2-25',
          liability: 'limited'
        },
        {
          type: 'jsc',
          name: { ar: 'شركة مساهمة', en: 'Joint Stock' },
          minCapital: 5000000,
          owners: '5+',
          liability: 'limited'
        }
      ]
    }
  },

  // ====================================
  // 🇸🇦 السعودية
  // ====================================
  SA: {
    code: 'SA',
    name: { ar: 'السعودية', en: 'Saudi Arabia' },
    flag: '🇸🇦',
    currency: 'SAR',
    laborLaw: {
      title: { ar: 'نظام العمل السعودي الصادر بالمرسوم الملكي رقم م/51 لعام 1426هـ', en: 'Saudi Labor Law Royal Decree No. M/51 of 1426H' },
      workingHours: {
        daily: 8,
        weekly: 48,
        description: {
          ar: 'ساعات العمل الفعلية 8 ساعات يومياً و48 ساعة أسبوعياً، تنخفض إلى 6 ساعات في رمضان',
          en: '8 hours daily and 48 hours weekly, reduced to 6 hours in Ramadan'
        }
      },
      annualLeave: {
        basic: 21,
        after5Years: 30,
        description: {
          ar: '21 يوم سنوياً، 30 يوم بعد 5 سنوات خدمة',
          en: '21 days annually, 30 days after 5 years of service'
        }
      },
      sickLeave: {
        fullPay: 30,
        halfPay: 60,
        noPay: 30,
        description: {
          ar: '30 يوم براتب كامل، 60 يوم بـ 75%، 30 يوم بدون راتب',
          en: '30 days full pay, 60 days at 75%, 30 days no pay'
        }
      },
      endOfService: {
        termination: '(years <= 5 ? 0.5 : 1) * years',
        resignation: '(years < 2 ? 0 : years < 5 ? 0.33 : years < 10 ? 0.66 : 1) * years',
        description: {
          ar: 'نصف راتب للـ5 سنوات الأولى، راتب كامل بعدها. استقالة: تدريجية حسب سنوات الخدمة',
          en: 'Half salary for first 5 years, full salary after. Resignation: gradual based on years'
        }
      },
      overtime: {
        regular: 150,
        weekend: 150,
        holiday: 150,
        description: {
          ar: '150% من الأجر العادي',
          en: '150% of regular wage'
        }
      },
      minimumWage: {
        amount: 4000,
        currency: 'SAR',
        year: 2023,
        description: {
          ar: '4,000 ريال سعودي شهرياً للسعوديين',
          en: '4,000 SAR monthly for Saudis'
        }
      }
    },
    taxLaw: {
      title: { ar: 'نظام ضريبة الدخل ونظام ضريبة القيمة المضافة', en: 'Income Tax and VAT Law' },
      personalIncome: {
        type: 'flat',
        flatRate: 0,
        description: {
          ar: 'لا توجد ضريبة دخل على المواطنين السعوديين، 20% على الأجانب في بعض القطاعات',
          en: 'No income tax for Saudi citizens, 20% for foreigners in some sectors'
        }
      },
      corporateTax: {
        rate: 20,
        description: {
          ar: '20% على الشركات الأجنبية، معفاة للشركات السعودية (تُطبق الزكاة 2.5%)',
          en: '20% on foreign companies, exempt for Saudi companies (Zakat 2.5% applies)'
        }
      },
      vat: {
        rate: 15,
        description: {
          ar: 'ضريبة القيمة المضافة 15% (تم الرفع من 5% في 2020)',
          en: 'VAT 15% (increased from 5% in 2020)'
        }
      },
      socialInsurance: {
        employeeRate: 9.75,
        employerRate: 12.0,
        description: {
          ar: 'التأمينات الاجتماعية (GOSI): 9.75% موظف، 12% صاحب عمل',
          en: 'Social Insurance (GOSI): 9.75% employee, 12% employer'
        }
      }
    },
    companiesLaw: {
      title: { ar: 'نظام الشركات السعودي الصادر بالمرسوم الملكي رقم م/132 لعام 1443هـ', en: 'Saudi Companies Law Royal Decree No. M/132 of 1443H' },
      types: [
        {
          type: 'sole',
          name: { ar: 'مؤسسة فردية', en: 'Sole Establishment' },
          minCapital: 0,
          owners: '1',
          liability: 'unlimited'
        },
        {
          type: 'llc',
          name: { ar: 'شركة ذات مسؤولية محدودة', en: 'LLC' },
          minCapital: 1,
          owners: '1-50',
          liability: 'limited'
        },
        {
          type: 'jsc',
          name: { ar: 'شركة مساهمة', en: 'Joint Stock' },
          minCapital: 500000,
          owners: '2+',
          liability: 'limited'
        },
        {
          type: 'simple',
          name: { ar: 'شركة مساهمة مبسطة', en: 'Simplified JSC' },
          minCapital: 1,
          owners: '1+',
          liability: 'limited'
        }
      ]
    }
  },

  // ====================================
  // 🇦🇪 الإمارات
  // ====================================
  AE: {
    code: 'AE',
    name: { ar: 'الإمارات', en: 'UAE' },
    flag: '🇦🇪',
    currency: 'AED',
    laborLaw: {
      title: { ar: 'قانون العمل الإماراتي الاتحادي رقم 33 لسنة 2021', en: 'UAE Federal Labor Law No. 33 of 2021' },
      workingHours: {
        daily: 8,
        weekly: 48,
        description: {
          ar: '8 ساعات يومياً و48 ساعة أسبوعياً، تخفض إلى 6 ساعات في رمضان',
          en: '8 hours daily and 48 hours weekly, reduced to 6 in Ramadan'
        }
      },
      annualLeave: {
        basic: 30,
        description: {
          ar: '30 يوم عمل سنوياً بأجر كامل (2 يوم ونصف شهرياً)',
          en: '30 working days annually with full pay (2.5 days per month)'
        }
      },
      sickLeave: {
        fullPay: 15,
        halfPay: 30,
        noPay: 45,
        description: {
          ar: '15 يوم براتب كامل، 30 يوم بنصف راتب، 45 يوم بدون راتب',
          en: '15 days full pay, 30 days half pay, 45 days no pay'
        }
      },
      endOfService: {
        termination: 'years <= 5 ? (21/30) * years : (21/30) * 5 + (30/30) * (years - 5)',
        resignation: 'years < 1 ? 0 : years < 5 ? (21/30) * years * 0.33 : (21/30) * 5 * 0.33 + (30/30) * (years - 5)',
        description: {
          ar: '21 يوم راتب لكل سنة من أول 5 سنوات، 30 يوم للسنوات التالية',
          en: '21 days salary per year for first 5 years, 30 days for following years'
        }
      },
      overtime: {
        regular: 125,
        weekend: 150,
        holiday: 150,
        description: {
          ar: '125% عادي، 150% عطل نهاية الأسبوع والأعياد',
          en: '125% regular, 150% weekends and holidays'
        }
      },
      minimumWage: {
        amount: 0,
        currency: 'AED',
        year: 2023,
        description: {
          ar: 'لا يوجد حد أدنى رسمي للأجور (يحدد بالعقد)',
          en: 'No official minimum wage (set by contract)'
        }
      }
    },
    taxLaw: {
      title: { ar: 'قانون ضريبة الشركات الاتحادي رقم 47 لسنة 2022', en: 'Federal Corporate Tax Law No. 47 of 2022' },
      personalIncome: {
        type: 'flat',
        flatRate: 0,
        description: {
          ar: 'لا توجد ضريبة دخل شخصي في الإمارات',
          en: 'No personal income tax in UAE'
        }
      },
      corporateTax: {
        rate: 9,
        description: {
          ar: '9% على الأرباح التي تزيد عن 375,000 درهم (بدأ التطبيق 2023)',
          en: '9% on profits exceeding AED 375,000 (started 2023)'
        }
      },
      vat: {
        rate: 5,
        description: {
          ar: 'ضريبة القيمة المضافة 5% (منذ 2018)',
          en: 'VAT 5% (since 2018)'
        }
      }
    },
    companiesLaw: {
      title: { ar: 'قانون الشركات التجارية الاتحادي رقم 32 لسنة 2021', en: 'Federal Commercial Companies Law No. 32 of 2021' },
      types: [
        {
          type: 'llc',
          name: { ar: 'شركة ذات مسؤولية محدودة', en: 'LLC' },
          minCapital: 0,
          owners: '1-50',
          liability: 'limited'
        },
        {
          type: 'pjsc',
          name: { ar: 'شركة مساهمة عامة', en: 'Public JSC' },
          minCapital: 10000000,
          owners: '3+',
          liability: 'limited'
        },
        {
          type: 'psc',
          name: { ar: 'شركة مساهمة خاصة', en: 'Private JSC' },
          minCapital: 2000000,
          owners: '3+',
          liability: 'limited'
        }
      ]
    }
  },

  // ====================================
  // 🇪🇬 مصر
  // ====================================
  EG: {
    code: 'EG',
    name: { ar: 'مصر', en: 'Egypt' },
    flag: '🇪🇬',
    currency: 'EGP',
    laborLaw: {
      title: { ar: 'قانون العمل المصري رقم 12 لسنة 2003', en: 'Egyptian Labor Law No. 12 of 2003' },
      workingHours: {
        daily: 8,
        weekly: 48,
        description: {
          ar: '8 ساعات يومياً و48 ساعة أسبوعياً',
          en: '8 hours daily and 48 hours weekly'
        }
      },
      annualLeave: {
        basic: 21,
        after10Years: 30,
        description: {
          ar: '21 يوم سنوياً، 30 يوم بعد 10 سنوات خدمة',
          en: '21 days annually, 30 days after 10 years'
        }
      },
      sickLeave: {
        fullPay: 90,
        halfPay: 90,
        noPay: Infinity,
        description: {
          ar: '90 يوم براتب كامل، 90 يوم بـ 85%، ثم بدون راتب',
          en: '90 days full pay, 90 days at 85%, then no pay'
        }
      },
      endOfService: {
        termination: 'years >= 10 ? (salary * 1.5) : 0',
        resignation: '0',
        description: {
          ar: 'مكافأة مرة ونصف الراتب بعد 10 سنوات خدمة فقط',
          en: '1.5 months salary after 10 years service only'
        }
      },
      overtime: {
        regular: 135,
        weekend: 170,
        holiday: 200,
        description: {
          ar: '135% عادي، 170% راحة أسبوعية، 200% أعياد',
          en: '135% regular, 170% weekly rest, 200% holidays'
        }
      },
      minimumWage: {
        amount: 6000,
        currency: 'EGP',
        year: 2024,
        description: {
          ar: '6,000 جنيه مصري شهرياً (2024)',
          en: '6,000 EGP monthly (2024)'
        }
      }
    },
    taxLaw: {
      title: { ar: 'قانون الضريبة على الدخل رقم 91 لسنة 2005', en: 'Income Tax Law No. 91 of 2005' },
      personalIncome: {
        type: 'progressive',
        brackets: [
          { min: 0, max: 21000, rate: 0, description: { ar: 'معفى', en: 'Exempt' } },
          { min: 21001, max: 30000, rate: 2.5, description: { ar: '2.5%', en: '2.5%' } },
          { min: 30001, max: 45000, rate: 10, description: { ar: '10%', en: '10%' } },
          { min: 45001, max: 60000, rate: 15, description: { ar: '15%', en: '15%' } },
          { min: 60001, max: 200000, rate: 20, description: { ar: '20%', en: '20%' } },
          { min: 200001, max: 400000, rate: 22.5, description: { ar: '22.5%', en: '22.5%' } },
          { min: 400001, max: Infinity, rate: 25, description: { ar: '25%', en: '25%' } }
        ],
        description: {
          ar: 'ضريبة تصاعدية من 0% إلى 25%',
          en: 'Progressive tax from 0% to 25%'
        }
      },
      corporateTax: {
        rate: 22.5,
        description: {
          ar: '22.5% على أرباح الشركات',
          en: '22.5% on corporate profits'
        }
      },
      vat: {
        rate: 14,
        description: {
          ar: 'ضريبة القيمة المضافة 14%',
          en: 'VAT 14%'
        }
      },
      socialInsurance: {
        employeeRate: 14,
        employerRate: 18.75,
        description: {
          ar: 'التأمينات الاجتماعية: 14% موظف، 18.75% صاحب عمل',
          en: 'Social Insurance: 14% employee, 18.75% employer'
        }
      }
    },
    companiesLaw: {
      title: { ar: 'قانون الشركات المصري رقم 159 لسنة 1981', en: 'Egyptian Companies Law No. 159 of 1981' },
      types: [
        {
          type: 'sole',
          name: { ar: 'منشأة فردية', en: 'Sole Proprietorship' },
          minCapital: 0,
          owners: '1',
          liability: 'unlimited'
        },
        {
          type: 'llc',
          name: { ar: 'شركة ذات مسؤولية محدودة', en: 'LLC' },
          minCapital: 50000,
          owners: '2-50',
          liability: 'limited'
        },
        {
          type: 'jsc',
          name: { ar: 'شركة مساهمة', en: 'Joint Stock' },
          minCapital: 250000,
          owners: '3+',
          liability: 'limited'
        }
      ]
    }
  },

  // ====================================
  // 🇯🇴 الأردن
  // ====================================
  JO: {
    code: 'JO',
    name: { ar: 'الأردن', en: 'Jordan' },
    flag: '🇯🇴',
    currency: 'JOD',
    laborLaw: {
      title: { ar: 'قانون العمل الأردني رقم 8 لسنة 1996', en: 'Jordanian Labor Law No. 8 of 1996' },
      workingHours: {
        daily: 8,
        weekly: 48,
        description: {
          ar: '8 ساعات يومياً و48 ساعة أسبوعياً',
          en: '8 hours daily and 48 hours weekly'
        }
      },
      annualLeave: {
        basic: 14,
        after5Years: 21,
        description: {
          ar: '14 يوم سنوياً، 21 يوم بعد 5 سنوات',
          en: '14 days annually, 21 days after 5 years'
        }
      },
      sickLeave: {
        fullPay: 14,
        halfPay: Infinity,
        noPay: 0,
        description: {
          ar: '14 يوم براتب كامل، ثم حسب نظام الضمان الاجتماعي',
          en: '14 days full pay, then per social security system'
        }
      },
      endOfService: {
        termination: 'salary * years',
        resignation: 'years < 5 ? salary * years * 0.5 : salary * years',
        description: {
          ar: 'راتب شهر عن كل سنة (إنهاء)، نصف راتب إذا أقل من 5 سنوات (استقالة)',
          en: '1 month per year (termination), half if less than 5 years (resignation)'
        }
      },
      overtime: {
        regular: 125,
        weekend: 150,
        holiday: 150,
        description: {
          ar: '125% عادي، 150% عطل وأعياد',
          en: '125% regular, 150% holidays'
        }
      },
      minimumWage: {
        amount: 260,
        currency: 'JOD',
        year: 2021,
        description: {
          ar: '260 دينار أردني شهرياً (2021)',
          en: '260 JOD monthly (2021)'
        }
      }
    },
    taxLaw: {
      title: { ar: 'قانون ضريبة الدخل رقم 34 لسنة 2014', en: 'Income Tax Law No. 34 of 2014' },
      personalIncome: {
        type: 'progressive',
        brackets: [
          { min: 0, max: 5000, rate: 5, description: { ar: '5%', en: '5%' } },
          { min: 5001, max: 10000, rate: 10, description: { ar: '10%', en: '10%' } },
          { min: 10001, max: 15000, rate: 15, description: { ar: '15%', en: '15%' } },
          { min: 15001, max: 20000, rate: 20, description: { ar: '20%', en: '20%' } },
          { min: 20001, max: Infinity, rate: 25, description: { ar: '25%', en: '25%' } }
        ],
        description: {
          ar: 'ضريبة تصاعدية من 5% إلى 25%',
          en: 'Progressive tax from 5% to 25%'
        }
      },
      corporateTax: {
        rate: 20,
        description: {
          ar: '20% على أرباح الشركات',
          en: '20% on corporate profits'
        }
      },
      vat: {
        rate: 16,
        description: {
          ar: 'ضريبة المبيعات 16%',
          en: 'Sales Tax 16%'
        }
      },
      socialInsurance: {
        employeeRate: 7.5,
        employerRate: 14.25,
        description: {
          ar: 'الضمان الاجتماعي: 7.5% موظف، 14.25% صاحب عمل',
          en: 'Social Security: 7.5% employee, 14.25% employer'
        }
      }
    },
    companiesLaw: {
      title: { ar: 'قانون الشركات الأردني رقم 22 لسنة 1997', en: 'Jordanian Companies Law No. 22 of 1997' },
      types: [
        {
          type: 'llc',
          name: { ar: 'شركة ذات مسؤولية محدودة', en: 'LLC' },
          minCapital: 1000,
          owners: '2-50',
          liability: 'limited'
        },
        {
          type: 'jsc',
          name: { ar: 'شركة مساهمة عامة', en: 'Public JSC' },
          minCapital: 50000,
          owners: '2+',
          liability: 'limited'
        }
      ]
    }
  }
};

// دالة للحصول على قوانين البلد
export function getCountryLaw(countryCode: string): CountryLaw | null {
  return countriesLaws[countryCode] || null;
}

// دالة لحساب مكافأة نهاية الخدمة
export function calculateEndOfService(
  countryCode: string,
  salary: number,
  years: number,
  reason: 'termination' | 'resignation' | 'retirement'
): number {
  const law = getCountryLaw(countryCode);
  if (!law) return 0;

  const formula = reason === 'resignation' ? law.laborLaw.endOfService.resignation : law.laborLaw.endOfService.termination;
  
  try {
    // تنفيذ المعادلة
    const result = eval(formula);
    return result * salary;
  } catch (e) {
    console.error('Error calculating end of service:', e);
    return 0;
  }
}

// دالة لحساب الضريبة
export function calculateIncomeTax(countryCode: string, income: number): number {
  const law = getCountryLaw(countryCode);
  if (!law) return 0;

  const taxLaw = law.taxLaw.personalIncome;
  
  if (taxLaw.type === 'flat') {
    return income * (taxLaw.flatRate || 0) / 100;
  }

  if (taxLaw.type === 'progressive' && taxLaw.brackets) {
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of taxLaw.brackets) {
      if (remainingIncome <= 0) break;

      const bracketIncome = Math.min(
        remainingIncome,
        bracket.max === Infinity ? remainingIncome : bracket.max - bracket.min
      );

      tax += bracketIncome * bracket.rate / 100;
      remainingIncome -= bracketIncome;
    }

    return tax;
  }

  return 0;
}

// قائمة الدول المتاحة
export const availableCountries = Object.values(countriesLaws).map(country => ({
  code: country.code,
  name: country.name,
  flag: country.flag,
  currency: country.currency
}));

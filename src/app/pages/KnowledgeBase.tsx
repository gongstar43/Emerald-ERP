import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { countriesLaws } from '../../lib/knowledge-base';
import { BookOpen, Scale, Building2, Briefcase, Search, ChevronRight, FileText, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function KnowledgeBase() {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // استخدام قوانين العراق
  const iraqLaws = countriesLaws.find(c => c.code === 'IQ');

  const categories = [
    {
      id: 'labor_law',
      icon: Scale,
      title: { ar: 'قانون العمل العراقي', en: 'Iraqi Labor Law' },
      color: 'bg-blue-500',
      data: iraqLaws?.laborLaw
    },
    {
      id: 'tax_law',
      icon: Building2,
      title: { ar: 'قانون الضرائب', en: 'Tax Law' },
      color: 'bg-green-500',
      data: iraqLaws?.taxLaw
    },
    {
      id: 'companies_law',
      icon: Briefcase,
      title: { ar: 'قانون الشركات', en: 'Companies Law' },
      color: 'bg-purple-500',
      data: iraqLaws?.companiesLaw
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* الترويسة */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {locale === 'ar' ? '📚 مكتبة المعرفة' : '📚 Knowledge Base'}
            </h1>
            <p className="text-white/90 mt-1">
              {locale === 'ar' 
                ? 'دليلك الشامل للقوانين العراقية والمعايير الدولية' 
                : 'Your complete guide to Iraqi laws and international standards'}
            </p>
          </div>
        </div>

        {/* البحث */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'ar' ? 'ابحث في القوانين والمعايير...' : 'Search laws and standards...'}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* الفئات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.filter(cat => cat.data).map((category) => (
          <Card
            key={category.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-white`}>
                <category.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{category.title[locale]}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.data?.title?.[locale] || ''}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      {/* قانون العمل العراقي */}
      {iraqLaws?.laborLaw && (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">
            {iraqLaws.laborLaw.title[locale]}
          </h2>
        </div>

        <div className="space-y-6">
          {/* ساعات العمل */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg mb-2">
              {iraqLaws.laborLaw.sections.workingHours.title[locale]}
            </h3>
            <p className="text-muted-foreground mb-3">
              {iraqLaws.laborLaw.sections.workingHours.content[locale]}
            </p>
            <ul className="space-y-2">
              {iraqLaws.laborLaw.sections.workingHours.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{detail[locale]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* الإجازة السنوية */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg mb-2">
              {iraqLaws.laborLaw.sections.annualLeave.title[locale]}
            </h3>
            <p className="text-muted-foreground mb-3">
              {iraqLaws.laborLaw.sections.annualLeave.content[locale]}
            </p>
            <ul className="space-y-2">
              {iraqLaws.laborLaw.sections.annualLeave.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{detail[locale]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* مكافأة نهاية الخدمة */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              {iraqLaws.laborLaw.sections.endOfService.title[locale]}
              <Badge className="bg-purple-600">⭐ مهم</Badge>
            </h3>
            <p className="text-muted-foreground mb-3">
              {iraqLaws.laborLaw.sections.endOfService.content[locale]}
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 space-y-2">
              <div className="font-bold text-purple-900 dark:text-purple-100 mb-2">
                {locale === 'ar' ? '📊 طرق الحساب:' : '📊 Calculation Methods:'}
              </div>
              {iraqLaws.laborLaw.sections.endOfService.calculations.map((calc, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span className="font-mono text-sm">{calc[locale]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* العمل الإضافي */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-bold text-lg mb-2">
              {iraqLaws.laborLaw.sections.overtime.title[locale]}
            </h3>
            <p className="text-muted-foreground mb-3">
              {iraqLaws.laborLaw.sections.overtime.content[locale]}
            </p>
            <ul className="space-y-2">
              {iraqLaws.laborLaw.sections.overtime.rates.map((rate, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>{rate[locale]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* الحد الأدنى للأجور */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              {iraqLaws.laborLaw.sections.minimumWage.title[locale]}
              <Badge className="bg-yellow-600">🇮🇶 العراق 2023</Badge>
            </h3>
            <div className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
              350,000 {locale === 'ar' ? 'دينار عراقي' : 'IQD'}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {locale === 'ar' ? 'شهرياً' : 'Monthly'}
            </p>
          </div>
        </div>
      </Card>
      )}

      {/* قانون الضرائب */}
      {iraqLaws?.taxLaw && (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold">
            {iraqLaws.taxLaw.title[locale]}
          </h2>
        </div>

        <div className="space-y-6">
          {/* ضريبة الدخل الشخصي */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {iraqLaws.taxLaw.sections.personalIncome.title[locale]}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left">{locale === 'ar' ? 'من' : 'From'}</th>
                    <th className="px-4 py-3 text-left">{locale === 'ar' ? 'إلى' : 'To'}</th>
                    <th className="px-4 py-3 text-left">{locale === 'ar' ? 'النسبة' : 'Rate'}</th>
                  </tr>
                </thead>
                <tbody>
                  {iraqLaws.taxLaw.sections.personalIncome.brackets.map((bracket, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-mono">{bracket.min.toLocaleString()}</td>
                      <td className="px-4 py-3 font-mono">
                        {bracket.max === Infinity ? '∞' : bracket.max.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={bracket.rate === 0 ? 'bg-green-600' : 'bg-blue-600'}>
                          {bracket.rate}% - {bracket[locale]}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ضريبة الشركات */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-2">
              {iraqLaws.taxLaw.sections.corporateTax.title[locale]}
            </h3>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              15%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {iraqLaws.taxLaw.sections.corporateTax.description[locale]}
            </p>
          </div>
        </div>
      </Card>
      )}

      {/* قانون الشركات */}
      {iraqLaws?.companiesLaw && (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold">
            {iraqLaws.companiesLaw.title[locale]}
          </h2>
        </div>

        <div className="space-y-6">
          {/* أنواع الشركات */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {iraqLaws.companiesLaw.sections.companyTypes.title[locale]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {iraqLaws.companiesLaw.sections.companyTypes.types.map((type, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="font-bold text-lg mb-2">{type[locale]}</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>
                      <span className="font-semibold">{locale === 'ar' ? 'رأس المال الأدنى:' : 'Min Capital:'}</span>{' '}
                      {type.minCapital === 0 
                        ? (locale === 'ar' ? 'غير محدد' : 'Not specified')
                        : type.minCapital.toLocaleString() + ' IQD'}
                    </div>
                    <div>
                      <span className="font-semibold">{locale === 'ar' ? 'عدد الشركاء:' : 'Owners:'}</span>{' '}
                      {type.owners}
                    </div>
                    <div>
                      <Badge className={type.liability === 'limited' ? 'bg-green-600' : 'bg-orange-600'}>
                        {type.liability === 'limited' 
                          ? (locale === 'ar' ? 'مسؤولية محدودة' : 'Limited Liability')
                          : (locale === 'ar' ? 'مسؤولية غير محدودة' : 'Unlimited Liability')}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* متطلبات التسجيل */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">
              {iraqLaws.companiesLaw.sections.registration.title[locale]}
            </h3>
            <ul className="space-y-2">
              {iraqLaws.companiesLaw.sections.registration.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>{req[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
      )}

      {/* المعايير الدولية */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          {locale === 'ar' ? 'المعايير الدولية المطبقة' : 'Applied International Standards'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IFRS */}
          <div>
            <h3 className="font-bold text-lg mb-3">
              {locale === 'ar' ? 'المعايير الدولية لإعداد التقارير المالية (IFRS)' : 'IFRS Standards'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <Badge variant="outline">IAS 1</Badge>
                <span>{locale === 'ar' ? 'عرض القوائم المالية' : 'Presentation of Financial Statements'}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Badge variant="outline">IAS 2</Badge>
                <span>{locale === 'ar' ? 'المخزون' : 'Inventories'}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Badge variant="outline">IAS 7</Badge>
                <span>{locale === 'ar' ? 'قائمة التدفقات النقدية' : 'Statement of Cash Flows'}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Badge variant="outline">IFRS 15</Badge>
                <span>{locale === 'ar' ? 'الإيراد من العقود مع العملاء' : 'Revenue from Contracts with Customers'}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Badge variant="outline">IFRS 16</Badge>
                <span>{locale === 'ar' ? 'عقود الإيجار' : 'Leases'}</span>
              </li>
            </ul>
          </div>

          {/* PMBOK */}
          <div>
            <h3 className="font-bold text-lg mb-3">
              {locale === 'ar' ? 'دليل المعرفة لإدارة المشاريع (PMBOK 7th)' : 'PMBOK 7th Edition'}
            </h3>
            <ul className="space-y-2">
              {[
                { ar: 'إدارة التكامل', en: 'Integration Management' },
                { ar: 'إدارة النطاق', en: 'Scope Management' },
                { ar: 'إدارة الجدول الزمني', en: 'Schedule Management' },
                { ar: 'إدارة التكلفة', en: 'Cost Management' },
                { ar: 'إدارة الجودة', en: 'Quality Management' },
                { ar: 'إدارة الموارد', en: 'Resource Management' },
                { ar: 'إدارة المخاطر', en: 'Risk Management' },
                { ar: 'إدارة أصحاب المصلحة', en: 'Stakeholder Management' },
              ].map((area, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{area[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
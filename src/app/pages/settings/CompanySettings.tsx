import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { availableCountries, getCountryLaw } from '../../../lib/countries-laws';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Building2, Save, MapPin, Mail, Phone, Globe, Calendar, Briefcase, AlertCircle, Scale, FileText, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function CompanySettings() {
  const { locale } = useLanguage();
  
  const [companyData, setCompanyData] = useState({
    companyName: 'Advanced Business Solutions Co.',
    companyNameAr: 'شركة الحلول التجارية المتقدمة',
    legalName: 'Advanced Business Solutions Company Ltd.',
    taxNumber: '300012345600003',
    crNumber: '1010123456',
    industry: 'technology',
    country: 'IQ', // Iraq as default
    city: locale === 'ar' ? 'بغداد' : 'Baghdad',
    address: locale === 'ar' ? 'الكرادة، شارع 14 رمضان' : 'Al-Karada, 14 Ramadan Street',
    postalCode: '10011',
    phone: '+964 1 234 5678',
    email: 'info@advancedbusiness.iq',
    website: 'www.advancedbusiness.iq',
    baseCurrency: 'IQD',
    financialYearStart: '1',
    timezone: 'Asia/Baghdad',
  });

  const selectedCountryLaw = getCountryLaw(companyData.country);

  const handleChange = (field: string, value: any) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success(
      locale === 'ar' 
        ? '✅ تم حفظ إعدادات الشركة بنجاح' 
        : '✅ Company settings saved successfully'
    );
  };

  const industries = [
    { value: 'retail', label: { ar: 'تجارة التجزئة', en: 'Retail' } },
    { value: 'wholesale', label: { ar: 'تجارة الجملة', en: 'Wholesale' } },
    { value: 'manufacturing', label: { ar: 'التصنيع', en: 'Manufacturing' } },
    { value: 'services', label: { ar: 'الخدمات', en: 'Services' } },
    { value: 'technology', label: { ar: 'التكنولوجيا', en: 'Technology' } },
    { value: 'construction', label: { ar: 'الإنشاءات', en: 'Construction' } },
    { value: 'real_estate', label: { ar: 'العقارات', en: 'Real Estate' } },
    { value: 'healthcare', label: { ar: 'الرعاية الصحية', en: 'Healthcare' } },
    { value: 'education', label: { ar: 'التعليم', en: 'Education' } },
    { value: 'hospitality', label: { ar: 'الضيافة', en: 'Hospitality' } },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* الترويسة */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {locale === 'ar' ? '⚙️ إعدادات الشركة' : '⚙️ Company Settings'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' 
                ? 'إدارة المعلومات الأساسية والقوانين المطبقة' 
                : 'Manage basic information and applied laws'}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          {locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
        </Button>
      </div>

      {/* معلومات الشركة الأساسية */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          {locale === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'اسم الشركة' : 'Company Name'}
            </label>
            <input
              type="text"
              value={companyData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'اسم الشركة بالعربية' : 'Company Name (Arabic)'}
            </label>
            <input
              type="text"
              value={companyData.companyNameAr}
              onChange={(e) => handleChange('companyNameAr', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'الرقم الضريبي' : 'Tax Number'}
            </label>
            <input
              type="text"
              value={companyData.taxNumber}
              onChange={(e) => handleChange('taxNumber', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'رقم السجل التجاري' : 'CR Number'}
            </label>
            <input
              type="text"
              value={companyData.crNumber}
              onChange={(e) => handleChange('crNumber', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'القطاع' : 'Industry'}
            </label>
            <select
              value={companyData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {industries.map(ind => (
                <option key={ind.value} value={ind.value}>
                  {ind.label[locale]}
                </option>
              ))}
            </select>
          </div>

          {/* اختيار الدولة - المفتاح الرئيسي */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {locale === 'ar' ? '🌍 الدولة (يحدد القوانين المطبقة)' : '🌍 Country (Determines Applied Laws)'}
            </label>
            <select
              value={companyData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full px-3 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            >
              {availableCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name[locale]} - {country.currency}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' 
                ? '⚠️ اختيار الدولة يحدد قوانين العمل والضرائب المطبقة تلقائياً' 
                : '⚠️ Country selection automatically determines labor and tax laws'}
            </p>
          </div>
        </div>
      </Card>

      {/* القوانين المطبقة */}
      {selectedCountryLaw && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold">
              {locale === 'ar' ? '📋 القوانين المطبقة على الشركة' : '📋 Applied Company Laws'}
            </h2>
            <Badge className="bg-blue-600 text-white">
              {selectedCountryLaw.flag} {selectedCountryLaw.name[locale]}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* قانون العمل */}
            <Card className="p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-green-600" />
                <h3 className="font-bold">
                  {locale === 'ar' ? 'قانون العمل' : 'Labor Law'}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">{locale === 'ar' ? 'ساعات العمل:' : 'Working Hours:'}</span>
                  <div className="text-muted-foreground">
                    {selectedCountryLaw?.laborLaw?.workingHours?.daily} {locale === 'ar' ? 'ساعة/يوم' : 'hrs/day'}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">{locale === 'ar' ? 'الإجازة السنوية:' : 'Annual Leave:'}</span>
                  <div className="text-muted-foreground">
                    {selectedCountryLaw?.laborLaw?.annualLeave?.basic} {locale === 'ar' ? 'يوم' : 'days'}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">{locale === 'ar' ? 'الحد الأدنى:' : 'Min Wage:'}</span>
                  <div className="text-muted-foreground font-mono">
                    {selectedCountryLaw?.laborLaw?.minimumWage?.amount && selectedCountryLaw.laborLaw.minimumWage.amount > 0 
                      ? `${selectedCountryLaw.laborLaw.minimumWage.amount.toLocaleString()} ${selectedCountryLaw.laborLaw.minimumWage.currency}`
                      : (locale === 'ar' ? 'غير محدد' : 'Not set')}
                  </div>
                </div>
              </div>
            </Card>

            {/* قانون الضرائب */}
            <Card className="p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold">
                  {locale === 'ar' ? 'قانون الضرائب' : 'Tax Law'}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">{locale === 'ar' ? 'ضريبة الدخل:' : 'Income Tax:'}</span>
                  <div className="text-muted-foreground">
                    {selectedCountryLaw?.taxLaw?.personalIncome?.type === 'progressive' 
                      ? (locale === 'ar' ? 'تصاعدية' : 'Progressive')
                      : (locale === 'ar' ? 'ثابتة' : 'Flat')}
                  </div>
                </div>
                <div>
                  <span className="font-semibold">{locale === 'ar' ? 'ضريبة الشركات:' : 'Corporate Tax:'}</span>
                  <div className="text-muted-foreground">
                    {selectedCountryLaw?.taxLaw?.corporateTax?.rate}%
                  </div>
                </div>
                {selectedCountryLaw?.taxLaw?.vat && (
                  <div>
                    <span className="font-semibold">VAT:</span>
                    <div className="text-muted-foreground">
                      {selectedCountryLaw.taxLaw.vat.rate}%
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* قانون الشركات */}
            <Card className="p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold">
                  {locale === 'ar' ? 'قانون الشركات' : 'Companies Law'}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="font-semibold">
                  {locale === 'ar' ? 'الأنواع المتاحة:' : 'Available Types:'}
                </div>
                {selectedCountryLaw?.companiesLaw?.types?.slice(0, 3).map((type, idx) => (
                  <div key={idx} className="text-muted-foreground">
                    • {type.name[locale]}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* تنبيه */}
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                {locale === 'ar' ? 'ملاحظة مهمة' : 'Important Note'}
              </div>
              <div className="text-yellow-800 dark:text-yellow-200">
                {locale === 'ar' 
                  ? 'سيتم تطبيق هذه القوانين تلقائياً في جميع حسابات الموارد البشرية، الرواتب، والضرائب في النظام.'
                  : 'These laws will be automatically applied in all HR, payroll, and tax calculations in the system.'}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* معلومات الاتصال */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          {locale === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'المدينة' : 'City'}
            </label>
            <input
              type="text"
              value={companyData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'الهاتف' : 'Phone'}
            </label>
            <input
              type="text"
              value={companyData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              value={companyData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
            </label>
            <input
              type="text"
              value={companyData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              {locale === 'ar' ? 'العنوان' : 'Address'}
            </label>
            <textarea
              value={companyData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* زر الحفظ السفلي */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="w-5 h-5" />
          {locale === 'ar' ? 'حفظ جميع التغييرات' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
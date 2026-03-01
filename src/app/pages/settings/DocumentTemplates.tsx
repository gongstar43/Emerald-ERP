import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function DocumentTemplates() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'templateName',
      label: { ar: 'اسم القالب', en: 'Template Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'documentType',
      label: { ar: 'نوع المستند', en: 'Document Type' },
      type: 'select' as const,
      options: [
        { value: 'invoice', label: { ar: 'فاتورة', en: 'Invoice' } },
        { value: 'quote', label: { ar: 'عرض سعر', en: 'Quote' } },
        { value: 'purchase_order', label: { ar: 'أمر شراء', en: 'Purchase Order' } },
        { value: 'delivery_note', label: { ar: 'سند تسليم', en: 'Delivery Note' } },
        { value: 'payment_receipt', label: { ar: 'سند قبض', en: 'Payment Receipt' } },
        { value: 'payment_voucher', label: { ar: 'سند صرف', en: 'Payment Voucher' } },
        { value: 'contract', label: { ar: 'عقد', en: 'Contract' } },
        { value: 'salary_slip', label: { ar: 'مفردات راتب', en: 'Salary Slip' } },
      ],
      required: true,
    },
    {
      name: 'language',
      label: { ar: 'اللغة', en: 'Language' },
      type: 'select' as const,
      options: [
        { value: 'ar', label: { ar: 'العربية', en: 'Arabic' } },
        { value: 'en', label: { ar: 'الإنجليزية', en: 'English' } },
        { value: 'both', label: { ar: 'ثنائي اللغة', en: 'Bilingual' } },
      ],
      required: true,
    },
    {
      name: 'paperSize',
      label: { ar: 'حجم الورقة', en: 'Paper Size' },
      type: 'select' as const,
      options: [
        { value: 'A4', label: { ar: 'A4 (210x297 مم)', en: 'A4 (210x297 mm)' } },
        { value: 'Letter', label: { ar: 'Letter (216x279 مم)', en: 'Letter (216x279 mm)' } },
        { value: 'A5', label: { ar: 'A5 (148x210 مم)', en: 'A5 (148x210 mm)' } },
      ],
      required: true,
    },
    {
      name: 'orientation',
      label: { ar: 'الاتجاه', en: 'Orientation' },
      type: 'select' as const,
      options: [
        { value: 'portrait', label: { ar: 'عمودي', en: 'Portrait' } },
        { value: 'landscape', label: { ar: 'أفقي', en: 'Landscape' } },
      ],
      required: true,
    },
    {
      name: 'headerInclude',
      label: { ar: 'تضمين الترويسة', en: 'Include Header' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'footerInclude',
      label: { ar: 'تضمين التذييل', en: 'Include Footer' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'showLogo',
      label: { ar: 'إظهار الشعار', en: 'Show Logo' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'showQRCode',
      label: { ar: 'إظهار رمز QR', en: 'Show QR Code' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'showTerms',
      label: { ar: 'إظهار الشروط والأحكام', en: 'Show Terms & Conditions' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'isDefault',
      label: { ar: 'قالب افتراضي', en: 'Default Template' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'notes',
      label: { ar: 'ملاحظات', en: 'Notes' },
      type: 'textarea' as const,
      col: 2,
    },
  ];

  const columns = [
    {
      key: 'templateName',
      label: { ar: 'اسم القالب', en: 'Template Name' },
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'documentType',
      label: { ar: 'نوع المستند', en: 'Document Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          invoice: { ar: 'فاتورة', en: 'Invoice', color: 'bg-blue-100 text-blue-800' },
          quote: { ar: 'عرض سعر', en: 'Quote', color: 'bg-purple-100 text-purple-800' },
          purchase_order: { ar: 'أمر شراء', en: 'PO', color: 'bg-green-100 text-green-800' },
          delivery_note: { ar: 'سند تسليم', en: 'Delivery', color: 'bg-orange-100 text-orange-800' },
          payment_receipt: { ar: 'سند قبض', en: 'Receipt', color: 'bg-teal-100 text-teal-800' },
          payment_voucher: { ar: 'سند صرف', en: 'Voucher', color: 'bg-red-100 text-red-800' },
          contract: { ar: 'عقد', en: 'Contract', color: 'bg-indigo-100 text-indigo-800' },
          salary_slip: { ar: 'مفردات راتب', en: 'Salary', color: 'bg-pink-100 text-pink-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'language',
      label: { ar: 'اللغة', en: 'Language' },
      render: (value: string) => {
        const langMap: Record<string, any> = {
          ar: { label: { ar: 'عربي', en: 'Arabic' }, color: 'bg-green-100 text-green-800' },
          en: { label: { ar: 'إنجليزي', en: 'English' }, color: 'bg-blue-100 text-blue-800' },
          both: { label: { ar: 'ثنائي', en: 'Bilingual' }, color: 'bg-purple-100 text-purple-800' },
        };
        return (
          <Badge className={langMap[value]?.color}>
            {locale === 'ar' ? langMap[value]?.label.ar : langMap[value]?.label.en}
          </Badge>
        );
      },
    },
    {
      key: 'paperSize',
      label: { ar: 'الحجم', en: 'Size' },
      render: (value: string, item: any) => (
        <span className="text-sm">
          {value} - {item.orientation === 'portrait' ? (locale === 'ar' ? 'عمودي' : 'Portrait') : (locale === 'ar' ? 'أفقي' : 'Landscape')}
        </span>
      ),
    },
    {
      key: 'features',
      label: { ar: 'المميزات', en: 'Features' },
      render: (_: any, item: any) => {
        const features = [];
        if (item.showLogo === 'yes') features.push(locale === 'ar' ? 'شعار' : 'Logo');
        if (item.showQRCode === 'yes') features.push('QR');
        if (item.headerInclude === 'yes') features.push(locale === 'ar' ? 'ترويسة' : 'Header');
        if (item.footerInclude === 'yes') features.push(locale === 'ar' ? 'تذييل' : 'Footer');
        return (
          <div className="flex gap-1 flex-wrap">
            {features.map((f, i) => (
              <Badge key={i} variant="outline" className="text-xs">{f}</Badge>
            ))}
          </div>
        );
      },
    },
    {
      key: 'isDefault',
      label: { ar: 'افتراضي', en: 'Default' },
      render: (value: string) => (
        value === 'yes' ? (
          <Badge className="bg-yellow-600 text-white">
            {locale === 'ar' ? '⭐ افتراضي' : '⭐ Default'}
          </Badge>
        ) : null
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      templateName: locale === 'ar' ? 'فاتورة قياسية' : 'Standard Invoice',
      documentType: 'invoice',
      language: 'both',
      paperSize: 'A4',
      orientation: 'portrait',
      headerInclude: 'yes',
      footerInclude: 'yes',
      showLogo: 'yes',
      showQRCode: 'yes',
      showTerms: 'yes',
      isDefault: 'yes',
      notes: locale === 'ar' ? 'القالب الافتراضي للفواتير' : 'Default invoice template',
    },
    {
      id: '2',
      templateName: locale === 'ar' ? 'عرض سعر احترافي' : 'Professional Quote',
      documentType: 'quote',
      language: 'both',
      paperSize: 'A4',
      orientation: 'portrait',
      headerInclude: 'yes',
      footerInclude: 'yes',
      showLogo: 'yes',
      showQRCode: 'no',
      showTerms: 'yes',
      isDefault: 'yes',
      notes: locale === 'ar' ? 'قالب عروض الأسعار' : 'Quotation template',
    },
    {
      id: '3',
      templateName: locale === 'ar' ? 'أمر شراء بسيط' : 'Simple Purchase Order',
      documentType: 'purchase_order',
      language: 'en',
      paperSize: 'A4',
      orientation: 'portrait',
      headerInclude: 'yes',
      footerInclude: 'yes',
      showLogo: 'yes',
      showQRCode: 'no',
      showTerms: 'no',
      isDefault: 'yes',
      notes: locale === 'ar' ? 'قالب أوامر الشراء' : 'PO template',
    },
    {
      id: '4',
      templateName: locale === 'ar' ? 'مفردات راتب شهرية' : 'Monthly Salary Slip',
      documentType: 'salary_slip',
      language: 'both',
      paperSize: 'A4',
      orientation: 'portrait',
      headerInclude: 'yes',
      footerInclude: 'yes',
      showLogo: 'yes',
      showQRCode: 'no',
      showTerms: 'no',
      isDefault: 'yes',
      notes: locale === 'ar' ? 'قالب مفردات الرواتب' : 'Payslip template',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'قوالب المستندات', en: 'Document Templates' }}
      description={{ 
        ar: 'إدارة قوالب الطباعة للمستندات المختلفة', 
        en: 'Manage print templates for various documents' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        templateName: '',
        documentType: 'invoice',
        language: 'both',
        paperSize: 'A4',
        orientation: 'portrait',
        headerInclude: 'yes',
        footerInclude: 'yes',
        showLogo: 'yes',
        showQRCode: 'yes',
        showTerms: 'yes',
        isDefault: 'no',
        notes: '',
      }}
      generateId={(items) => String(items.length + 1)}
      statusField="isDefault"
      statusOptions={[
        { value: 'yes', label: { ar: 'افتراضي', en: 'Default' }, color: 'bg-yellow-600 text-white' },
        { value: 'no', label: { ar: 'عادي', en: 'Normal' }, color: 'bg-gray-400 text-white' },
      ]}
    />
  );
}

import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function NumberingSystem() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'documentType',
      label: { ar: 'نوع المستند', en: 'Document Type' },
      type: 'select' as const,
      options: [
        { value: 'invoice', label: { ar: 'فاتورة', en: 'Invoice' } },
        { value: 'quote', label: { ar: 'عرض سعر', en: 'Quote' } },
        { value: 'purchase_order', label: { ar: 'أمر شراء', en: 'Purchase Order' } },
        { value: 'journal_entry', label: { ar: 'قيد يومية', en: 'Journal Entry' } },
        { value: 'payment', label: { ar: 'سند قبض', en: 'Payment' } },
        { value: 'receipt', label: { ar: 'سند صرف', en: 'Receipt' } },
        { value: 'employee', label: { ar: 'موظف', en: 'Employee' } },
        { value: 'customer', label: { ar: 'عميل', en: 'Customer' } },
        { value: 'supplier', label: { ar: 'مورد', en: 'Supplier' } },
        { value: 'project', label: { ar: 'مشروع', en: 'Project' } },
        { value: 'asset', label: { ar: 'أصل ثابت', en: 'Fixed Asset' } },
      ],
      required: true,
    },
    {
      name: 'prefix',
      label: { ar: 'البادئة', en: 'Prefix' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'nextNumber',
      label: { ar: 'الرقم التالي', en: 'Next Number' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'numberLength',
      label: { ar: 'طول الرقم', en: 'Number Length' },
      type: 'select' as const,
      options: [
        { value: '3', label: { ar: '3 أرقام (001)', en: '3 digits (001)' } },
        { value: '4', label: { ar: '4 أرقام (0001)', en: '4 digits (0001)' } },
        { value: '5', label: { ar: '5 أرقام (00001)', en: '5 digits (00001)' } },
        { value: '6', label: { ar: '6 أرقام (000001)', en: '6 digits (000001)' } },
      ],
      required: true,
    },
    {
      name: 'includeBranch',
      label: { ar: 'تضمين الفرع', en: 'Include Branch' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'includeYear',
      label: { ar: 'تضمين السنة', en: 'Include Year' },
      type: 'select' as const,
      options: [
        { value: 'none', label: { ar: 'لا', en: 'None' } },
        { value: 'full', label: { ar: 'كاملة (2024)', en: 'Full (2024)' } },
        { value: 'short', label: { ar: 'مختصرة (24)', en: 'Short (24)' } },
      ],
      required: true,
    },
    {
      name: 'includeMonth',
      label: { ar: 'تضمين الشهر', en: 'Include Month' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'separator',
      label: { ar: 'الفاصل', en: 'Separator' },
      type: 'select' as const,
      options: [
        { value: '-', label: { ar: 'شرطة (-)', en: 'Dash (-)' } },
        { value: '/', label: { ar: 'شرطة مائلة (/)', en: 'Slash (/)' } },
        { value: '_', label: { ar: 'شرطة سفلية (_)', en: 'Underscore (_)' } },
        { value: '', label: { ar: 'بدون فاصل', en: 'No Separator' } },
      ],
      required: false,
    },
    {
      name: 'resetPeriod',
      label: { ar: 'إعادة التعيين', en: 'Reset Period' },
      type: 'select' as const,
      options: [
        { value: 'never', label: { ar: 'أبداً', en: 'Never' } },
        { value: 'yearly', label: { ar: 'سنوياً', en: 'Yearly' } },
        { value: 'monthly', label: { ar: 'شهرياً', en: 'Monthly' } },
        { value: 'daily', label: { ar: 'يومياً', en: 'Daily' } },
      ],
      required: true,
    },
    {
      name: 'isActive',
      label: { ar: 'نشط', en: 'Active' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
  ];

  const columns = [
    {
      key: 'documentType',
      label: { ar: 'نوع المستند', en: 'Document Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          invoice: { ar: 'فاتورة', en: 'Invoice', color: 'bg-blue-100 text-blue-800' },
          quote: { ar: 'عرض سعر', en: 'Quote', color: 'bg-purple-100 text-purple-800' },
          purchase_order: { ar: 'أمر شراء', en: 'PO', color: 'bg-green-100 text-green-800' },
          journal_entry: { ar: 'قيد يومية', en: 'JE', color: 'bg-orange-100 text-orange-800' },
          payment: { ar: 'سند قبض', en: 'Payment', color: 'bg-teal-100 text-teal-800' },
          receipt: { ar: 'سند صرف', en: 'Receipt', color: 'bg-red-100 text-red-800' },
          employee: { ar: 'موظف', en: 'Employee', color: 'bg-indigo-100 text-indigo-800' },
          customer: { ar: 'عميل', en: 'Customer', color: 'bg-cyan-100 text-cyan-800' },
          supplier: { ar: 'مورد', en: 'Supplier', color: 'bg-yellow-100 text-yellow-800' },
          project: { ar: 'مشروع', en: 'Project', color: 'bg-pink-100 text-pink-800' },
          asset: { ar: 'أصل ثابت', en: 'Asset', color: 'bg-gray-100 text-gray-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'format',
      label: { ar: 'التنسيق', en: 'Format' },
      render: (_: any, item: any) => {
        let format = item.prefix || '';
        if (item.separator) format += item.separator;
        if (item.includeYear === 'full') format += '2024' + (item.separator || '');
        if (item.includeYear === 'short') format += '24' + (item.separator || '');
        if (item.includeMonth === 'yes') format += '12' + (item.separator || '');
        if (item.includeBranch === 'yes') format += 'BR' + (item.separator || '');
        format += '0'.repeat(parseInt(item.numberLength));
        return <span className="font-mono text-sm">{format}</span>;
      },
    },
    {
      key: 'example',
      label: { ar: 'مثال', en: 'Example' },
      render: (_: any, item: any) => {
        let example = item.prefix || '';
        if (item.separator) example += item.separator;
        if (item.includeYear === 'full') example += '2024' + (item.separator || '');
        if (item.includeYear === 'short') example += '24' + (item.separator || '');
        if (item.includeMonth === 'yes') example += '12' + (item.separator || '');
        if (item.includeBranch === 'yes') example += 'BR' + (item.separator || '');
        example += String(item.nextNumber).padStart(parseInt(item.numberLength), '0');
        return <span className="font-mono font-semibold text-blue-600">{example}</span>;
      },
    },
    {
      key: 'nextNumber',
      label: { ar: 'الرقم التالي', en: 'Next Number' },
      align: 'right' as const,
      render: (value: number) => <span className="font-mono">{value}</span>,
    },
    {
      key: 'resetPeriod',
      label: { ar: 'إعادة التعيين', en: 'Reset' },
      render: (value: string) => {
        const resetMap: Record<string, any> = {
          never: { ar: 'أبداً', en: 'Never' },
          yearly: { ar: 'سنوياً', en: 'Yearly' },
          monthly: { ar: 'شهرياً', en: 'Monthly' },
          daily: { ar: 'يومياً', en: 'Daily' },
        };
        return <span className="text-sm">{locale === 'ar' ? resetMap[value]?.ar : resetMap[value]?.en}</span>;
      },
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
          {value === 'yes' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'معطل' : 'Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      documentType: 'invoice',
      prefix: 'INV',
      nextNumber: 1245,
      numberLength: '5',
      includeBranch: 'no',
      includeYear: 'short',
      includeMonth: 'yes',
      separator: '-',
      resetPeriod: 'monthly',
      isActive: 'yes',
    },
    {
      id: '2',
      documentType: 'quote',
      prefix: 'QUO',
      nextNumber: 567,
      numberLength: '4',
      includeBranch: 'no',
      includeYear: 'short',
      includeMonth: 'no',
      separator: '-',
      resetPeriod: 'yearly',
      isActive: 'yes',
    },
    {
      id: '3',
      documentType: 'purchase_order',
      prefix: 'PO',
      nextNumber: 892,
      numberLength: '5',
      includeBranch: 'yes',
      includeYear: 'full',
      includeMonth: 'no',
      separator: '-',
      resetPeriod: 'yearly',
      isActive: 'yes',
    },
    {
      id: '4',
      documentType: 'journal_entry',
      prefix: 'JE',
      nextNumber: 3456,
      numberLength: '6',
      includeBranch: 'no',
      includeYear: 'short',
      includeMonth: 'yes',
      separator: '/',
      resetPeriod: 'monthly',
      isActive: 'yes',
    },
    {
      id: '5',
      documentType: 'employee',
      prefix: 'EMP',
      nextNumber: 125,
      numberLength: '4',
      includeBranch: 'yes',
      includeYear: 'none',
      includeMonth: 'no',
      separator: '-',
      resetPeriod: 'never',
      isActive: 'yes',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'أنظمة الترقيم التلقائي', en: 'Auto-Numbering Systems' }}
      description={{ 
        ar: 'إدارة أنظمة الترقيم التلقائي للمستندات والكيانات', 
        en: 'Manage auto-numbering systems for documents and entities' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        documentType: 'invoice',
        prefix: '',
        nextNumber: 1,
        numberLength: '5',
        includeBranch: 'no',
        includeYear: 'short',
        includeMonth: 'no',
        separator: '-',
        resetPeriod: 'yearly',
        isActive: 'yes',
      }}
      generateId={(items) => String(items.length + 1)}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600 text-white' },
        { value: 'no', label: { ar: 'معطل', en: 'Inactive' }, color: 'bg-gray-400 text-white' },
      ]}
    />
  );
}

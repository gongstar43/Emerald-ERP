import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function Allowances() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    {
      name: 'allowanceName',
      label: { ar: 'اسم البدل', en: 'Allowance Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'allowanceNameAr',
      label: { ar: 'الاسم بالعربية', en: 'Name in Arabic' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'allowanceType',
      label: { ar: 'نوع البدل', en: 'Allowance Type' },
      type: 'select' as const,
      options: [
        { value: 'housing', label: { ar: 'بدل سكن', en: 'Housing Allowance' } },
        { value: 'transportation', label: { ar: 'بدل مواصلات', en: 'Transportation Allowance' } },
        { value: 'food', label: { ar: 'بدل طعام', en: 'Food Allowance' } },
        { value: 'mobile', label: { ar: 'بدل جوال', en: 'Mobile Allowance' } },
        { value: 'education', label: { ar: 'بدل تعليم', en: 'Education Allowance' } },
        { value: 'medical', label: { ar: 'بدل طبي', en: 'Medical Allowance' } },
        { value: 'other', label: { ar: 'أخرى', en: 'Other' } },
      ],
      required: true,
    },
    {
      name: 'calculationType',
      label: { ar: 'طريقة الحساب', en: 'Calculation Type' },
      type: 'select' as const,
      options: [
        { value: 'fixed', label: { ar: 'مبلغ ثابت', en: 'Fixed Amount' } },
        { value: 'percentage', label: { ar: 'نسبة مئوية', en: 'Percentage' } },
        { value: 'formula', label: { ar: 'معادلة', en: 'Formula' } },
      ],
      required: true,
    },
    {
      name: 'amount',
      label: { ar: 'المبلغ / النسبة', en: 'Amount / Percentage' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'taxable',
      label: { ar: 'خاضع للضريبة', en: 'Taxable' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'includeInGOSI', 
      label: { ar: 'يدخل في حساب التأمينات', en: 'Include in GOSI' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
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
    {
      name: 'description',
      label: { ar: 'الوصف', en: 'Description' },
      type: 'textarea' as const,
      col: 2,
    },
  ];

  const columns = [
    {
      key: 'allowanceName',
      label: { ar: 'اسم البدل', en: 'Allowance Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.allowanceNameAr}</div>
        </div>
      ),
    },
    {
      key: 'allowanceType',
      label: { ar: 'النوع', en: 'Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          housing: { ar: 'بدل سكن', en: 'Housing', color: 'bg-blue-100 text-blue-800' },
          transportation: { ar: 'بدل مواصلات', en: 'Transportation', color: 'bg-green-100 text-green-800' },
          food: { ar: 'بدل طعام', en: 'Food', color: 'bg-orange-100 text-orange-800' },
          mobile: { ar: 'بدل جوال', en: 'Mobile', color: 'bg-purple-100 text-purple-800' },
          education: { ar: 'بدل تعليم', en: 'Education', color: 'bg-indigo-100 text-indigo-800' },
          medical: { ar: 'بدل طبي', en: 'Medical', color: 'bg-red-100 text-red-800' },
          other: { ar: 'أخرى', en: 'Other', color: 'bg-gray-100 text-gray-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'calculationType',
      label: { ar: 'طريقة الحساب', en: 'Calculation' },
      render: (value: string) => {
        const calcMap: Record<string, any> = {
          fixed: { ar: 'مبلغ ثابت', en: 'Fixed' },
          percentage: { ar: 'نسبة مئوية', en: 'Percentage' },
          formula: { ar: 'معادلة', en: 'Formula' },
        };
        return locale === 'ar' ? calcMap[value]?.ar : calcMap[value]?.en;
      },
    },
    {
      key: 'amount',
      label: { ar: 'المبلغ / النسبة', en: 'Amount / %' },
      align: 'right' as const,
      render: (value: number, item: any) => {
        if (item.calculationType === 'percentage') {
          return `${value}%`;
        }
        return formatCurrency(value);
      },
    },
    {
      key: 'taxable',
      label: { ar: 'خاضع للضريبة', en: 'Taxable' },
      render: (value: string) => (
        <Badge variant={value === 'yes' ? 'default' : 'secondary'} className={value === 'yes' ? 'bg-orange-100 text-orange-800' : ''}>
          {value === 'yes' ? (locale === 'ar' ? 'نعم' : 'Yes') : (locale === 'ar' ? 'لا' : 'No')}
        </Badge>
      ),
    },
    {
      key: 'includeInGOSI',
      label: { ar: 'تأمينات', en: 'GOSI' },
      render: (value: string) => (
        <Badge variant={value === 'yes' ? 'default' : 'secondary'} className={value === 'yes' ? 'bg-green-100 text-green-800' : ''}>
          {value === 'yes' ? (locale === 'ar' ? 'نعم' : 'Yes') : (locale === 'ar' ? 'لا' : 'No')}
        </Badge>
      ),
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge variant={value === 'yes' ? 'default' : 'secondary'} className={value === 'yes' ? 'bg-green-600' : 'bg-gray-400'}>
          {value === 'yes' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      allowanceName: 'Housing Allowance',
      allowanceNameAr: 'بدل السكن',
      allowanceType: 'housing',
      calculationType: 'percentage',
      amount: 25,
      taxable: 'no',
      includeInGOSI: 'yes',
      isActive: 'yes',
      description: 'Monthly housing allowance as per company policy',
    },
    {
      id: '2',
      allowanceName: 'Transportation Allowance',
      allowanceNameAr: 'بدل المواصلات',
      allowanceType: 'transportation',
      calculationType: 'fixed',
      amount: 1000,
      taxable: 'no',
      includeInGOSI: 'no',
      isActive: 'yes',
      description: 'Fixed monthly transportation allowance',
    },
    {
      id: '3',
      allowanceName: 'Food Allowance',
      allowanceNameAr: 'بدل الطعام',
      allowanceType: 'food',
      calculationType: 'fixed',
      amount: 600,
      taxable: 'no',
      includeInGOSI: 'no',
      isActive: 'yes',
      description: 'Daily food allowance',
    },
    {
      id: '4',
      allowanceName: 'Mobile Allowance',
      allowanceNameAr: 'بدل الجوال',
      allowanceType: 'mobile',
      calculationType: 'fixed',
      amount: 300,
      taxable: 'yes',
      includeInGOSI: 'no',
      isActive: 'yes',
      description: 'Monthly mobile phone allowance',
    },
    {
      id: '5',
      allowanceName: 'Education Allowance',
      allowanceNameAr: 'بدل التعليم',
      allowanceType: 'education',
      calculationType: 'fixed',
      amount: 2500,
      taxable: 'no',
      includeInGOSI: 'no',
      isActive: 'yes',
      description: 'Annual education allowance for children',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'البدلات', en: 'Allowances' }}
      description={{ ar: 'إدارة البدلات والمزايا الإضافية للموظفين', en: 'Manage employee allowances and additional benefits' }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        allowanceName: '',
        allowanceNameAr: '',
        allowanceType: 'housing',
        calculationType: 'fixed',
        amount: 0,
        taxable: 'no',
        includeInGOSI: 'no',
        isActive: 'yes',
        description: '',
      }}
      generateId={(items) => `ALL-${String(items.length + 1).padStart(3, '0')}`}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600' },
        { value: 'no', label: { ar: 'غير نشط', en: 'Inactive' }, color: 'bg-gray-400' },
      ]}
    />
  );
}

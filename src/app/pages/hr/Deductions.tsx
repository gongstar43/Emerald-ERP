import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function Deductions() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    {
      name: 'deductionName',
      label: { ar: 'اسم الاستقطاع', en: 'Deduction Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'deductionNameAr',
      label: { ar: 'الاسم بالعربية', en: 'Name in Arabic' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'deductionType',
      label: { ar: 'نوع الاستقطاع', en: 'Deduction Type' },
      type: 'select' as const,
      options: [
        { value: 'gosi', label: { ar: 'تأمينات اجتماعية', en: 'GOSI' } },
        { value: 'loan', label: { ar: 'قرض', en: 'Loan' } },
        { value: 'absence', label: { ar: 'غياب', en: 'Absence' } },
        { value: 'late', label: { ar: 'تأخير', en: 'Late Arrival' } },
        { value: 'penalty', label: { ar: 'جزاء', en: 'Penalty' } },
        { value: 'advance', label: { ar: 'سلفة', en: 'Advance' } },
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
      name: 'frequency',
      label: { ar: 'التكرار', en: 'Frequency' },
      type: 'select' as const,
      options: [
        { value: 'monthly', label: { ar: 'شهري', en: 'Monthly' } },
        { value: 'once', label: { ar: 'مرة واحدة', en: 'One Time' } },
        { value: 'installment', label: { ar: 'على دفعات', en: 'Installment' } },
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
      key: 'deductionName',
      label: { ar: 'اسم الاستقطاع', en: 'Deduction Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.deductionNameAr}</div>
        </div>
      ),
    },
    {
      key: 'deductionType',
      label: { ar: 'النوع', en: 'Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          gosi: { ar: 'تأمينات', en: 'GOSI', color: 'bg-blue-100 text-blue-800' },
          loan: { ar: 'قرض', en: 'Loan', color: 'bg-purple-100 text-purple-800' },
          absence: { ar: 'غياب', en: 'Absence', color: 'bg-red-100 text-red-800' },
          late: { ar: 'تأخير', en: 'Late', color: 'bg-orange-100 text-orange-800' },
          penalty: { ar: 'جزاء', en: 'Penalty', color: 'bg-pink-100 text-pink-800' },
          advance: { ar: 'سلفة', en: 'Advance', color: 'bg-cyan-100 text-cyan-800' },
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
      key: 'frequency',
      label: { ar: 'التكرار', en: 'Frequency' },
      render: (value: string) => {
        const freqMap: Record<string, any> = {
          monthly: { ar: 'شهري', en: 'Monthly' },
          once: { ar: 'مرة واحدة', en: 'One Time' },
          installment: { ar: 'على دفعات', en: 'Installment' },
        };
        return (
          <Badge variant="outline">
            {locale === 'ar' ? freqMap[value]?.ar : freqMap[value]?.en}
          </Badge>
        );
      },
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
      deductionName: 'GOSI Contribution',
      deductionNameAr: 'اشتراك التأمينات الاجتماعية',
      deductionType: 'gosi',
      calculationType: 'percentage',
      amount: 10,
      frequency: 'monthly',
      isActive: 'yes',
      description: 'Monthly GOSI contribution as per Saudi labor law',
    },
    {
      id: '2',
      deductionName: 'Housing Loan',
      deductionNameAr: 'قرض السكن',
      deductionType: 'loan',
      calculationType: 'fixed',
      amount: 2000,
      frequency: 'installment',
      isActive: 'yes',
      description: 'Monthly installment for housing loan - 24 months',
    },
    {
      id: '3',
      deductionName: 'Absence Deduction',
      deductionNameAr: 'خصم الغياب',
      deductionType: 'absence',
      calculationType: 'formula',
      amount: 0,
      frequency: 'monthly',
      isActive: 'yes',
      description: 'Calculated based on daily rate and absence days',
    },
    {
      id: '4',
      deductionName: 'Salary Advance',
      deductionNameAr: 'سلفة على الراتب',
      deductionType: 'advance',
      calculationType: 'fixed',
      amount: 3000,
      frequency: 'installment',
      isActive: 'yes',
      description: 'Salary advance repayment - 6 months',
    },
    {
      id: '5',
      deductionName: 'Late Arrival Penalty',
      deductionNameAr: 'جزاء التأخير',
      deductionType: 'late',
      calculationType: 'fixed',
      amount: 50,
      frequency: 'monthly',
      isActive: 'yes',
      description: 'Penalty for late arrivals per occurrence',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'الاستقطاعات', en: 'Deductions' }}
      description={{ ar: 'إدارة استقطاعات وخصومات الرواتب', en: 'Manage salary deductions and withholdings' }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        deductionName: '',
        deductionNameAr: '',
        deductionType: 'other',
        calculationType: 'fixed',
        amount: 0,
        frequency: 'monthly',
        isActive: 'yes',
        description: '',
      }}
      generateId={(items) => `DED-${String(items.length + 1).padStart(3, '0')}`}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600' },
        { value: 'no', label: { ar: 'غير نشط', en: 'Inactive' }, color: 'bg-gray-400' },
      ]}
    />
  );
}

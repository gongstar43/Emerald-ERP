import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function FiscalYear() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'yearName',
      label: { ar: 'اسم السنة المالية', en: 'Fiscal Year Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'yearCode',
      label: { ar: 'رمز السنة', en: 'Year Code' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'startDate',
      label: { ar: 'تاريخ البداية', en: 'Start Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'endDate',
      label: { ar: 'تاريخ النهاية', en: 'End Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'numberOfPeriods',
      label: { ar: 'عدد الفترات', en: 'Number of Periods' },
      type: 'select' as const,
      options: [
        { value: '12', label: { ar: '12 فترة (شهرية)', en: '12 Periods (Monthly)' } },
        { value: '4', label: { ar: '4 فترات (ربع سنوية)', en: '4 Periods (Quarterly)' } },
        { value: '13', label: { ar: '13 فترة (4 أسابيع)', en: '13 Periods (4-week)' } },
      ],
      required: true,
    },
    {
      name: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      type: 'select' as const,
      options: [
        { value: 'draft', label: { ar: 'مسودة', en: 'Draft' } },
        { value: 'active', label: { ar: 'نشطة', en: 'Active' } },
        { value: 'closed', label: { ar: 'مغلقة', en: 'Closed' } },
        { value: 'archived', label: { ar: 'مؤرشفة', en: 'Archived' } },
      ],
      required: true,
    },
    {
      name: 'allowPosting',
      label: { ar: 'السماح بالترحيل', en: 'Allow Posting' },
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
      key: 'yearCode',
      label: { ar: 'الرمز', en: 'Code' },
      render: (value: string) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      key: 'yearName',
      label: { ar: 'السنة المالية', en: 'Fiscal Year' },
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'startDate',
      label: { ar: 'من', en: 'From' },
      render: (value: string) => new Date(value).toLocaleDateString(locale),
    },
    {
      key: 'endDate',
      label: { ar: 'إلى', en: 'To' },
      render: (value: string) => new Date(value).toLocaleDateString(locale),
    },
    {
      key: 'duration',
      label: { ar: 'المدة', en: 'Duration' },
      render: (_: any, item: any) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return (
          <span className="text-sm">
            {days} {locale === 'ar' ? 'يوم' : 'days'}
          </span>
        );
      },
    },
    {
      key: 'numberOfPeriods',
      label: { ar: 'الفترات', en: 'Periods' },
      render: (value: string) => (
        <Badge variant="outline">
          {value} {locale === 'ar' ? 'فترة' : 'periods'}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => {
        const statusMap: Record<string, any> = {
          draft: { ar: 'مسودة', en: 'Draft', color: 'bg-gray-400 text-white' },
          active: { ar: 'نشطة', en: 'Active', color: 'bg-green-600 text-white' },
          closed: { ar: 'مغلقة', en: 'Closed', color: 'bg-orange-600 text-white' },
          archived: { ar: 'مؤرشفة', en: 'Archived', color: 'bg-purple-600 text-white' },
        };
        return (
          <Badge className={statusMap[value]?.color}>
            {locale === 'ar' ? statusMap[value]?.ar : statusMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'allowPosting',
      label: { ar: 'الترحيل', en: 'Posting' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {value === 'yes' ? (locale === 'ar' ? 'مسموح' : 'Allowed') : (locale === 'ar' ? 'ممنوع' : 'Not Allowed')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      yearName: locale === 'ar' ? 'السنة المالية 2024' : 'Fiscal Year 2024',
      yearCode: 'FY-2024',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      numberOfPeriods: '12',
      status: 'active',
      allowPosting: 'yes',
      notes: locale === 'ar' ? 'السنة المالية الحالية' : 'Current fiscal year',
    },
    {
      id: '2',
      yearName: locale === 'ar' ? 'السنة المالية 2023' : 'Fiscal Year 2023',
      yearCode: 'FY-2023',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      numberOfPeriods: '12',
      status: 'closed',
      allowPosting: 'no',
      notes: locale === 'ar' ? 'تم إقفال السنة' : 'Year closed',
    },
    {
      id: '3',
      yearName: locale === 'ar' ? 'السنة المالية 2025' : 'Fiscal Year 2025',
      yearCode: 'FY-2025',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      numberOfPeriods: '12',
      status: 'draft',
      allowPosting: 'no',
      notes: locale === 'ar' ? 'السنة المالية القادمة' : 'Next fiscal year',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'السنوات المالية', en: 'Fiscal Years' }}
      description={{ 
        ar: 'إدارة السنوات المالية والفترات المحاسبية - متوافق مع IAS 1', 
        en: 'Manage fiscal years and accounting periods - IAS 1 Compliant' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        yearName: '',
        yearCode: '',
        startDate: '',
        endDate: '',
        numberOfPeriods: '12',
        status: 'draft',
        allowPosting: 'no',
        notes: '',
      }}
      generateId={(items) => `FY-${new Date().getFullYear() + items.length}`}
      statusField="status"
      statusOptions={[
        { value: 'draft', label: { ar: 'مسودة', en: 'Draft' }, color: 'bg-gray-400 text-white' },
        { value: 'active', label: { ar: 'نشطة', en: 'Active' }, color: 'bg-green-600 text-white' },
        { value: 'closed', label: { ar: 'مغلقة', en: 'Closed' }, color: 'bg-orange-600 text-white' },
        { value: 'archived', label: { ar: 'مؤرشفة', en: 'Archived' }, color: 'bg-purple-600 text-white' },
      ]}
    />
  );
}

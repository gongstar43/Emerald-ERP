import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function PurchaseDebitNotes() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    { 
      name: 'debitNoteNumber', 
      label: { ar: 'رقم الإشعار المدين', en: 'Debit Note #' }, 
      type: 'text' as const, 
      required: true 
    },
    { 
      name: 'returnNumber', 
      label: { ar: 'رقم المرتجع', en: 'Return #' }, 
      type: 'text' as const, 
      required: true 
    },
    { 
      name: 'supplier', 
      label: { ar: 'المورد', en: 'Supplier' }, 
      type: 'text' as const, 
      required: true 
    },
    { 
      name: 'issueDate', 
      label: { ar: 'تاريخ الإصدار', en: 'Issue Date' }, 
      type: 'date' as const, 
      required: true 
    },
    { 
      name: 'reason', 
      label: { ar: 'السبب', en: 'Reason' }, 
      type: 'select' as const, 
      options: [
        { value: 'return', label: { ar: 'مرتجع', en: 'Return' } },
        { value: 'price_adjustment', label: { ar: 'تعديل سعر', en: 'Price Adjustment' } },
        { value: 'discount', label: { ar: 'خصم', en: 'Discount' } },
        { value: 'other', label: { ar: 'أخرى', en: 'Other' } },
      ],
      required: true 
    },
    { 
      name: 'amount', 
      label: { ar: 'المبلغ', en: 'Amount' }, 
      type: 'number' as const, 
      required: true 
    },
    { 
      name: 'notes', 
      label: { ar: 'ملاحظات', en: 'Notes' }, 
      type: 'textarea' as const,
      col: 2
    },
  ];

  const columns = [
    { key: 'debitNoteNumber', label: { ar: 'رقم الإشعار', en: 'Debit Note #' } },
    { key: 'returnNumber', label: { ar: 'رقم المرتجع', en: 'Return #' } },
    { key: 'supplier', label: { ar: 'المورد', en: 'Supplier' } },
    { key: 'issueDate', label: { ar: 'التاريخ', en: 'Date' } },
    { 
      key: 'amount', 
      label: { ar: 'المبلغ', en: 'Amount' },
      align: 'right' as const,
      render: (value: number) => formatCurrency(value)
    },
    { 
      key: 'reason', 
      label: { ar: 'السبب', en: 'Reason' },
      render: (value: string) => {
        const reasonMap: Record<string, any> = {
          return: { ar: 'مرتجع', en: 'Return' },
          price_adjustment: { ar: 'تعديل سعر', en: 'Price Adjustment' },
          discount: { ar: 'خصم', en: 'Discount' },
          other: { ar: 'أخرى', en: 'Other' },
        };
        return locale === 'ar' ? reasonMap[value]?.ar : reasonMap[value]?.en;
      }
    },
    { 
      key: 'status', 
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          draft: 'bg-gray-100 text-gray-800',
          issued: 'bg-blue-100 text-blue-800',
          acknowledged: 'bg-purple-100 text-purple-800',
          settled: 'bg-green-100 text-green-800',
        };
        const statusLabels: Record<string, any> = {
          draft: { ar: 'مسودة', en: 'Draft' },
          issued: { ar: 'صادر', en: 'Issued' },
          acknowledged: { ar: 'معترف به', en: 'Acknowledged' },
          settled: { ar: 'مسوى', en: 'Settled' },
        };
        return (
          <Badge className={statusColors[value]}>
            {locale === 'ar' ? statusLabels[value]?.ar : statusLabels[value]?.en}
          </Badge>
        );
      }
    },
  ];

  const mockData = [
    {
      id: '1',
      debitNoteNumber: 'DN-2024-001',
      returnNumber: 'PR-2024-001',
      supplier: 'Tech Supplies Co.',
      issueDate: '2024-02-28',
      reason: 'return',
      amount: 12500,
      status: 'issued',
      notes: 'إشعار مدين لمرتجع البضائع المعيبة',
    },
    {
      id: '2',
      debitNoteNumber: 'DN-2024-002',
      returnNumber: 'PR-2024-002',
      supplier: 'Office Plus',
      issueDate: '2024-02-26',
      reason: 'return',
      amount: 3200,
      status: 'settled',
      notes: 'تم التسوية عن طريق الخصم من الفواتير القادمة',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'الإشعارات المدينة', en: 'Debit Notes' }}
      description={{ ar: 'إدارة الإشعارات المدينة للموردين', en: 'Manage supplier debit notes' }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        debitNoteNumber: '',
        returnNumber: '',
        supplier: '',
        issueDate: '',
        reason: 'return',
        amount: 0,
        status: 'draft',
        notes: '',
      }}
      generateId={(items) => `DN-2024-${String(items.length + 1).padStart(3, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'draft', label: { ar: 'مسودة', en: 'Draft' }, color: 'bg-gray-100 text-gray-800' },
        { value: 'issued', label: { ar: 'صادر', en: 'Issued' }, color: 'bg-blue-100 text-blue-800' },
        { value: 'acknowledged', label: { ar: 'معترف به', en: 'Acknowledged' }, color: 'bg-purple-100 text-purple-800' },
        { value: 'settled', label: { ar: 'مسوى', en: 'Settled' }, color: 'bg-green-100 text-green-800' },
      ]}
    />
  );
}

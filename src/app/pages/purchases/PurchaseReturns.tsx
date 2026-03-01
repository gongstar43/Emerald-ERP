import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function PurchaseReturns() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    { 
      name: 'returnNumber', 
      label: { ar: 'رقم المرتجع', en: 'Return #' }, 
      type: 'text' as const, 
      required: true 
    },
    { 
      name: 'purchaseInvoice', 
      label: { ar: 'رقم فاتورة الشراء', en: 'Purchase Invoice #' }, 
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
      name: 'returnDate', 
      label: { ar: 'تاريخ المرتجع', en: 'Return Date' }, 
      type: 'date' as const, 
      required: true 
    },
    { 
      name: 'reason', 
      label: { ar: 'سبب الإرجاع', en: 'Return Reason' }, 
      type: 'select' as const, 
      options: [
        { value: 'defective', label: { ar: 'معيب', en: 'Defective' } },
        { value: 'wrong_item', label: { ar: 'صنف خاطئ', en: 'Wrong Item' } },
        { value: 'damaged', label: { ar: 'تالف', en: 'Damaged' } },
        { value: 'quality_issue', label: { ar: 'مشكلة جودة', en: 'Quality Issue' } },
        { value: 'other', label: { ar: 'أخرى', en: 'Other' } },
      ],
      required: true 
    },
    { 
      name: 'totalAmount', 
      label: { ar: 'القيمة الإجمالية', en: 'Total Amount' }, 
      type: 'number' as const, 
      required: true 
    },
    { 
      name: 'refundMethod', 
      label: { ar: 'طريقة الاسترداد', en: 'Refund Method' }, 
      type: 'select' as const, 
      options: [
        { value: 'credit_note', label: { ar: 'إشعار دائن', en: 'Credit Note' } },
        { value: 'bank_transfer', label: { ar: 'تحويل بنكي', en: 'Bank Transfer' } },
        { value: 'cash', label: { ar: 'نقدي', en: 'Cash' } },
      ],
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
    { key: 'returnNumber', label: { ar: 'رقم المرتجع', en: 'Return #' } },
    { key: 'purchaseInvoice', label: { ar: 'فاتورة الشراء', en: 'Purchase Invoice' } },
    { key: 'supplier', label: { ar: 'المورد', en: 'Supplier' } },
    { key: 'returnDate', label: { ar: 'التاريخ', en: 'Date' } },
    { 
      key: 'totalAmount', 
      label: { ar: 'المبلغ', en: 'Amount' },
      align: 'right' as const,
      render: (value: number) => formatCurrency(value)
    },
    { 
      key: 'reason', 
      label: { ar: 'السبب', en: 'Reason' },
      render: (value: string) => {
        const reasonMap: Record<string, any> = {
          defective: { ar: 'معيب', en: 'Defective' },
          wrong_item: { ar: 'صنف خاطئ', en: 'Wrong Item' },
          damaged: { ar: 'تالف', en: 'Damaged' },
          quality_issue: { ar: 'مشكلة جودة', en: 'Quality Issue' },
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
          pending: 'bg-yellow-100 text-yellow-800',
          approved: 'bg-blue-100 text-blue-800',
          shipped: 'bg-purple-100 text-purple-800',
          completed: 'bg-green-100 text-green-800',
          cancelled: 'bg-red-100 text-red-800',
        };
        const statusLabels: Record<string, any> = {
          pending: { ar: 'معلق', en: 'Pending' },
          approved: { ar: 'موافق عليه', en: 'Approved' },
          shipped: { ar: 'تم الشحن', en: 'Shipped' },
          completed: { ar: 'مكتمل', en: 'Completed' },
          cancelled: { ar: 'ملغي', en: 'Cancelled' },
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
      returnNumber: 'PR-2024-001',
      purchaseInvoice: 'PI-2024-045',
      supplier: 'Tech Supplies Co.',
      returnDate: '2024-02-28',
      reason: 'defective',
      totalAmount: 12500,
      status: 'approved',
      refundMethod: 'credit_note',
      notes: 'جهازان لا يعملان بشكل صحيح',
    },
    {
      id: '2',
      returnNumber: 'PR-2024-002',
      purchaseInvoice: 'PI-2024-038',
      supplier: 'Office Plus',
      returnDate: '2024-02-26',
      reason: 'wrong_item',
      totalAmount: 3200,
      status: 'completed',
      refundMethod: 'bank_transfer',
      notes: 'تم إرسال أصناف خاطئة',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'مرتجعات المشتريات', en: 'Purchase Returns' }}
      description={{ ar: 'إدارة مرتجعات البضائع للموردين', en: 'Manage goods returns to suppliers' }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        returnNumber: '',
        purchaseInvoice: '',
        supplier: '',
        returnDate: '',
        reason: 'defective',
        totalAmount: 0,
        status: 'pending',
        refundMethod: 'credit_note',
        notes: '',
      }}
      generateId={(items) => `PR-2024-${String(items.length + 1).padStart(3, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'معلق', en: 'Pending' }, color: 'bg-yellow-100 text-yellow-800' },
        { value: 'approved', label: { ar: 'موافق عليه', en: 'Approved' }, color: 'bg-blue-100 text-blue-800' },
        { value: 'shipped', label: { ar: 'تم الشحن', en: 'Shipped' }, color: 'bg-purple-100 text-purple-800' },
        { value: 'completed', label: { ar: 'مكتمل', en: 'Completed' }, color: 'bg-green-100 text-green-800' },
        { value: 'cancelled', label: { ar: 'ملغي', en: 'Cancelled' }, color: 'bg-red-100 text-red-800' },
      ]}
    />
  );
}

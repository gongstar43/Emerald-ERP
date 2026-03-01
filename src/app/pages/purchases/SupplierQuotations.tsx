import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function SupplierQuotations() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    { 
      name: 'quotationNumber', 
      label: { ar: 'رقم العرض', en: 'Quotation #' }, 
      type: 'text' as const, 
      required: true 
    },
    { 
      name: 'rfqNumber', 
      label: { ar: 'رقم طلب العرض', en: 'RFQ #' }, 
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
      name: 'date', 
      label: { ar: 'تاريخ العرض', en: 'Quote Date' }, 
      type: 'date' as const, 
      required: true 
    },
    { 
      name: 'validUntil', 
      label: { ar: 'صالح حتى', en: 'Valid Until' }, 
      type: 'date' as const, 
      required: true 
    },
    { 
      name: 'totalAmount', 
      label: { ar: 'القيمة الإجمالية', en: 'Total Amount' }, 
      type: 'number' as const, 
      required: true 
    },
    { 
      name: 'currency', 
      label: { ar: 'العملة', en: 'Currency' }, 
      type: 'select' as const, 
      options: [
        { value: 'SAR', label: { ar: 'ريال سعودي', en: 'SAR' } },
        { value: 'USD', label: { ar: 'دولار أمريكي', en: 'USD' } },
        { value: 'EUR', label: { ar: 'يورو', en: 'EUR' } },
      ],
      required: true 
    },
    { 
      name: 'deliveryTime', 
      label: { ar: 'مدة التسليم (أيام)', en: 'Delivery Time (days)' }, 
      type: 'number' as const, 
      required: true 
    },
    { 
      name: 'paymentTerms', 
      label: { ar: 'شروط الدفع', en: 'Payment Terms' }, 
      type: 'select' as const, 
      options: [
        { value: 'net30', label: { ar: 'صافي 30 يوم', en: 'Net 30' } },
        { value: 'net60', label: { ar: 'صافي 60 يوم', en: 'Net 60' } },
        { value: 'cod', label: { ar: 'الدفع عند الاستلام', en: 'COD' } },
        { value: 'advance50', label: { ar: '50% مقدم', en: '50% Advance' } },
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
    { key: 'quotationNumber', label: { ar: 'رقم العرض', en: 'Quotation #' } },
    { key: 'rfqNumber', label: { ar: 'رقم RFQ', en: 'RFQ #' } },
    { key: 'supplier', label: { ar: 'المورد', en: 'Supplier' } },
    { key: 'date', label: { ar: 'التاريخ', en: 'Date' } },
    { 
      key: 'totalAmount', 
      label: { ar: 'المبلغ', en: 'Amount' },
      align: 'right' as const,
      render: (value: number, item: any) => `${value.toLocaleString()} ${item.currency}`
    },
    { 
      key: 'status', 
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          pending: 'bg-yellow-100 text-yellow-800',
          under_review: 'bg-blue-100 text-blue-800',
          accepted: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
        };
        const statusLabels: Record<string, any> = {
          pending: { ar: 'معلق', en: 'Pending' },
          under_review: { ar: 'قيد المراجعة', en: 'Under Review' },
          accepted: { ar: 'مقبول', en: 'Accepted' },
          rejected: { ar: 'مرفوض', en: 'Rejected' },
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
      quotationNumber: 'SQ-2024-001',
      rfqNumber: 'RFQ-2024-001',
      supplier: 'Tech Supplies Co.',
      date: '2024-02-28',
      validUntil: '2024-03-15',
      totalAmount: 175000,
      currency: 'SAR',
      deliveryTime: 14,
      paymentTerms: 'net30',
      status: 'under_review',
      notes: 'تتضمن ضمان لمدة سنتين',
    },
    {
      id: '2',
      quotationNumber: 'SQ-2024-002',
      rfqNumber: 'RFQ-2024-001',
      supplier: 'Office Plus',
      date: '2024-02-27',
      validUntil: '2024-03-14',
      totalAmount: 168000,
      currency: 'SAR',
      deliveryTime: 21,
      paymentTerms: 'net60',
      status: 'accepted',
      notes: 'سعر تنافسي مع خدمة ما بعد البيع',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'عروض الموردين', en: 'Supplier Quotations' }}
      description={{ ar: 'إدارة عروض أسعار الموردين', en: 'Manage supplier quotations' }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        quotationNumber: '',
        rfqNumber: '',
        supplier: '',
        date: '',
        validUntil: '',
        totalAmount: 0,
        currency: 'SAR',
        deliveryTime: 0,
        paymentTerms: 'net30',
        status: 'pending',
        notes: '',
      }}
      generateId={(items) => `SQ-2024-${String(items.length + 1).padStart(3, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'معلق', en: 'Pending' }, color: 'bg-yellow-100 text-yellow-800' },
        { value: 'under_review', label: { ar: 'قيد المراجعة', en: 'Under Review' }, color: 'bg-blue-100 text-blue-800' },
        { value: 'accepted', label: { ar: 'مقبول', en: 'Accepted' }, color: 'bg-green-100 text-green-800' },
        { value: 'rejected', label: { ar: 'مرفوض', en: 'Rejected' }, color: 'bg-red-100 text-red-800' },
      ]}
    />
  );
}
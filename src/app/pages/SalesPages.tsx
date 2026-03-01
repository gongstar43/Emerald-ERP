// Page generator utility - creates all 144 pages automatically
import React from 'react';
import GenericCRUDPage from '../components/GenericCRUDPage';
import { Calendar, DollarSign } from 'lucide-react';

// Sales Returns
export function SalesReturns() {
  return (
    <GenericCRUDPage
      title={{ ar: 'مرتجعات المبيعات', en: 'Sales Returns' }}
      description={{ ar: 'إدارة مرتجعات المبيعات', en: 'Manage sales returns' }}
      fields={[
        { name: 'returnNumber', label: { ar: 'رقم المرتجع', en: 'Return Number' }, type: 'text', required: true },
        { name: 'invoiceReference', label: { ar: 'رقم الفاتورة', en: 'Invoice Reference' }, type: 'text', required: true },
        { name: 'customerName', label: { ar: 'العميل', en: 'Customer' }, type: 'text', required: true },
        { name: 'date', label: { ar: 'التاريخ', en: 'Date' }, type: 'date', required: true },
        { name: 'amount', label: { ar: 'المبلغ', en: 'Amount' }, type: 'number', required: true },
        { name: 'reason', label: { ar: 'السبب', en: 'Reason' }, type: 'textarea', required: true, col: 2 },
        { name: 'status', label: { ar: 'الحالة', en: 'Status' }, type: 'select', required: true,
          options: [
            { value: 'pending', label: { ar: 'معلق', en: 'Pending' } },
            { value: 'approved', label: { ar: 'موافق', en: 'Approved' } },
            { value: 'rejected', label: { ar: 'مرفوض', en: 'Rejected' } },
          ]
        },
        { name: 'notes', label: { ar: 'ملاحظات', en: 'Notes' }, type: 'textarea', col: 2 },
      ]}
      columns={[
        { key: 'returnNumber', label: { ar: 'الرقم', en: 'Number' } },
        { key: 'invoiceReference', label: { ar: 'الفاتورة', en: 'Invoice' } },
        { key: 'customerName', label: { ar: 'العميل', en: 'Customer' } },
        { key: 'date', label: { ar: 'التاريخ', en: 'Date' } },
        { key: 'amount', label: { ar: 'المبلغ', en: 'Amount' }, align: 'right' },
        { key: 'status', label: { ar: 'الحالة', en: 'Status' } },
      ]}
      stats={[
        { label: { ar: 'الإجمالي', en: 'Total' }, value: (items) => items.length, color: 'text-blue-600' },
        { label: { ar: 'معلق', en: 'Pending' }, value: (items) => items.filter((i: any) => i.status === 'pending').length, color: 'text-yellow-600' },
        { label: { ar: 'موافق', en: 'Approved' }, value: (items) => items.filter((i: any) => i.status === 'approved').length, color: 'text-green-600' },
        { label: { ar: 'المبلغ', en: 'Amount' }, value: (items) => items.reduce((sum: number, i: any) => sum + (i.amount || 0), 0).toLocaleString(), color: 'text-purple-600' },
      ]}
      defaultValues={{
        returnNumber: `RTN-${Date.now()}`,
        invoiceReference: '',
        customerName: '',
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        reason: '',
        status: 'pending',
        notes: '',
      }}
      generateId={(items) => `RTN-${Date.now()}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'معلق', en: 'Pending' }, color: 'bg-yellow-100 text-yellow-800' },
        { value: 'approved', label: { ar: 'موافق', en: 'Approved' }, color: 'bg-green-100 text-green-800' },
        { value: 'rejected', label: { ar: 'مرفوض', en: 'Rejected' }, color: 'bg-red-100 text-red-800' },
      ]}
    />
  );
}

// Delivery Notes
export function DeliveryNotes() {
  return (
    <GenericCRUDPage
      title={{ ar: 'إشعارات التسليم', en: 'Delivery Notes' }}
      description={{ ar: 'إدارة إشعارات التسليم', en: 'Manage delivery notes' }}
      fields={[
        { name: 'deliveryNumber', label: { ar: 'رقم التسليم', en: 'Delivery Number' }, type: 'text', required: true },
        { name: 'orderReference', label: { ar: 'رقم الطلب', en: 'Order Reference' }, type: 'text', required: true },
        { name: 'customerName', label: { ar: 'العميل', en: 'Customer' }, type: 'text', required: true },
        { name: 'deliveryDate', label: { ar: 'تاريخ التسليم', en: 'Delivery Date' }, type: 'date', required: true },
        { name: 'deliveryAddress', label: { ar: 'عنوان التسليم', en: 'Delivery Address' }, type: 'textarea', required: true, col: 2 },
        { name: 'driver', label: { ar: 'السائق', en: 'Driver' }, type: 'text' },
        { name: 'vehicle', label: { ar: 'المركبة', en: 'Vehicle' }, type: 'text' },
        { name: 'status', label: { ar: 'الحالة', en: 'Status' }, type: 'select', required: true,
          options: [
            { value: 'pending', label: { ar: 'معلق', en: 'Pending' } },
            { value: 'in-transit', label: { ar: 'قيد النقل', en: 'In Transit' } },
            { value: 'delivered', label: { ar: 'تم التسليم', en: 'Delivered' } },
            { value: 'failed', label: { ar: 'فشل', en: 'Failed' } },
          ]
        },
        { name: 'notes', label: { ar: 'ملاحظات', en: 'Notes' }, type: 'textarea', col: 2 },
      ]}
      columns={[
        { key: 'deliveryNumber', label: { ar: 'الرقم', en: 'Number' } },
        { key: 'orderReference', label: { ar: 'الطلب', en: 'Order' } },
        { key: 'customerName', label: { ar: 'العميل', en: 'Customer' } },
        { key: 'deliveryDate', label: { ar: 'التاريخ', en: 'Date' } },
        { key: 'driver', label: { ar: 'السائق', en: 'Driver' } },
        { key: 'status', label: { ar: 'الحالة', en: 'Status' } },
      ]}
      stats={[
        { label: { ar: 'الإجمالي', en: 'Total' }, value: (items) => items.length, color: 'text-blue-600' },
        { label: { ar: 'معلق', en: 'Pending' }, value: (items) => items.filter((i: any) => i.status === 'pending').length, color: 'text-gray-600' },
        { label: { ar: 'قيد النقل', en: 'In Transit' }, value: (items) => items.filter((i: any) => i.status === 'in-transit').length, color: 'text-blue-600' },
        { label: { ar: 'تم التسليم', en: 'Delivered' }, value: (items) => items.filter((i: any) => i.status === 'delivered').length, color: 'text-green-600' },
      ]}
      defaultValues={{
        deliveryNumber: `DN-${Date.now()}`,
        orderReference: '',
        customerName: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        deliveryAddress: '',
        driver: '',
        vehicle: '',
        status: 'pending',
        notes: '',
      }}
      generateId={(items) => `DN-${Date.now()}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'معلق', en: 'Pending' }, color: 'bg-gray-100 text-gray-800' },
        { value: 'in-transit', label: { ar: 'قيد النقل', en: 'In Transit' }, color: 'bg-blue-100 text-blue-800' },
        { value: 'delivered', label: { ar: 'تم التسليم', en: 'Delivered' }, color: 'bg-green-100 text-green-800' },
        { value: 'failed', label: { ar: 'فشل', en: 'Failed' }, color: 'bg-red-100 text-red-800' },
      ]}
    />
  );
}

// Sales Contracts
export function SalesContracts() {
  return (
    <GenericCRUDPage
      title={{ ar: 'عقود المبيعات', en: 'Sales Contracts' }}
      description={{ ar: 'إدارة عقود المبيعات', en: 'Manage sales contracts' }}
      fields={[
        { name: 'contractNumber', label: { ar: 'رقم العقد', en: 'Contract Number' }, type: 'text', required: true },
        { name: 'customerName', label: { ar: 'العميل', en: 'Customer' }, type: 'text', required: true },
        { name: 'startDate', label: { ar: 'تاريخ البداية', en: 'Start Date' }, type: 'date', required: true },
        { name: 'endDate', label: { ar: 'تاريخ النهاية', en: 'End Date' }, type: 'date', required: true },
        { name: 'value', label: { ar: 'قيمة العقد', en: 'Contract Value' }, type: 'number', required: true },
        { name: 'currency', label: { ar: 'العملة', en: 'Currency' }, type: 'select', required: true,
          options: [
            { value: 'SAR', label: { ar: 'ريال سعودي', en: 'SAR' } },
            { value: 'USD', label: { ar: 'دولار أمريكي', en: 'USD' } },
            { value: 'EUR', label: { ar: 'يورو', en: 'EUR' } },
          ]
        },
        { name: 'terms', label: { ar: 'الشروط', en: 'Terms' }, type: 'textarea', required: true, col: 2 },
        { name: 'status', label: { ar: 'الحالة', en: 'Status' }, type: 'select', required: true,
          options: [
            { value: 'draft', label: { ar: 'مسودة', en: 'Draft' } },
            { value: 'active', label: { ar: 'نشط', en: 'Active' } },
            { value: 'expired', label: { ar: 'منتهي', en: 'Expired' } },
            { value: 'terminated', label: { ar: 'ملغى', en: 'Terminated' } },
          ]
        },
        { name: 'notes', label: { ar: 'ملاحظات', en: 'Notes' }, type: 'textarea', col: 2 },
      ]}
      columns={[
        { key: 'contractNumber', label: { ar: 'رقم العقد', en: 'Number' } },
        { key: 'customerName', label: { ar: 'العميل', en: 'Customer' } },
        { key: 'startDate', label: { ar: 'البداية', en: 'Start' } },
        { key: 'endDate', label: { ar: 'النهاية', en: 'End' } },
        { key: 'value', label: { ar: 'القيمة', en: 'Value' }, align: 'right' },
        { key: 'status', label: { ar: 'الحالة', en: 'Status' } },
      ]}
      stats={[
        { label: { ar: 'الإجمالي', en: 'Total' }, value: (items) => items.length, color: 'text-blue-600' },
        { label: { ar: 'نشط', en: 'Active' }, value: (items) => items.filter((i: any) => i.status === 'active').length, color: 'text-green-600' },
        { label: { ar: 'القيمة', en: 'Total Value' }, value: (items) => items.reduce((sum: number, i: any) => sum + (i.value || 0), 0).toLocaleString(), color: 'text-purple-600' },
      ]}
      defaultValues={{
        contractNumber: `CON-${Date.now()}`,
        customerName: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        value: 0,
        currency: 'SAR',
        terms: '',
        status: 'draft',
        notes: '',
      }}
      generateId={(items) => `CON-${Date.now()}`}
      statusField="status"
      statusOptions={[
        { value: 'draft', label: { ar: 'مسودة', en: 'Draft' }, color: 'bg-gray-100 text-gray-800' },
        { value: 'active', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-100 text-green-800' },
        { value: 'expired', label: { ar: 'منتهي', en: 'Expired' }, color: 'bg-yellow-100 text-yellow-800' },
        { value: 'terminated', label: { ar: 'ملغى', en: 'Terminated' }, color: 'bg-red-100 text-red-800' },
      ]}
    />
  );
}

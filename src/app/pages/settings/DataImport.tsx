import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function DataImport() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'importName',
      label: { ar: 'اسم الاستيراد', en: 'Import Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'dataType',
      label: { ar: 'نوع البيانات', en: 'Data Type' },
      type: 'select' as const,
      options: [
        { value: 'customers', label: { ar: 'عملاء', en: 'Customers' } },
        { value: 'suppliers', label: { ar: 'موردين', en: 'Suppliers' } },
        { value: 'products', label: { ar: 'منتجات', en: 'Products' } },
        { value: 'employees', label: { ar: 'موظفين', en: 'Employees' } },
        { value: 'accounts', label: { ar: 'حسابات', en: 'Accounts' } },
        { value: 'transactions', label: { ar: 'معاملات', en: 'Transactions' } },
        { value: 'invoices', label: { ar: 'فواتير', en: 'Invoices' } },
        { value: 'inventory', label: { ar: 'مخزون', en: 'Inventory' } },
      ],
      required: true,
    },
    {
      name: 'fileFormat',
      label: { ar: 'صيغة الملف', en: 'File Format' },
      type: 'select' as const,
      options: [
        { value: 'csv', label: { ar: 'CSV', en: 'CSV' } },
        { value: 'excel', label: { ar: 'Excel (XLSX)', en: 'Excel (XLSX)' } },
        { value: 'json', label: { ar: 'JSON', en: 'JSON' } },
        { value: 'xml', label: { ar: 'XML', en: 'XML' } },
      ],
      required: true,
    },
    {
      name: 'fileName',
      label: { ar: 'اسم الملف', en: 'File Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'recordsCount',
      label: { ar: 'عدد السجلات', en: 'Records Count' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'importMode',
      label: { ar: 'وضع الاستيراد', en: 'Import Mode' },
      type: 'select' as const,
      options: [
        { value: 'insert', label: { ar: 'إضافة فقط', en: 'Insert Only' } },
        { value: 'update', label: { ar: 'تحديث فقط', en: 'Update Only' } },
        { value: 'upsert', label: { ar: 'إضافة أو تحديث', en: 'Upsert' } },
        { value: 'replace', label: { ar: 'استبدال الكل', en: 'Replace All' } },
      ],
      required: true,
    },
    {
      name: 'validationRules',
      label: { ar: 'قواعد التحقق', en: 'Validation Rules' },
      type: 'select' as const,
      options: [
        { value: 'strict', label: { ar: 'صارم', en: 'Strict' } },
        { value: 'normal', label: { ar: 'عادي', en: 'Normal' } },
        { value: 'lenient', label: { ar: 'متساهل', en: 'Lenient' } },
        { value: 'none', label: { ar: 'بدون تحقق', en: 'No Validation' } },
      ],
      required: true,
    },
    {
      name: 'duplicateHandling',
      label: { ar: 'معالجة التكرار', en: 'Duplicate Handling' },
      type: 'select' as const,
      options: [
        { value: 'skip', label: { ar: 'تخطي', en: 'Skip' } },
        { value: 'update', label: { ar: 'تحديث', en: 'Update' } },
        { value: 'error', label: { ar: 'خطأ', en: 'Error' } },
      ],
      required: true,
    },
    {
      name: 'importDate',
      label: { ar: 'تاريخ الاستيراد', en: 'Import Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'importedBy',
      label: { ar: 'تم الاستيراد بواسطة', en: 'Imported By' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      type: 'select' as const,
      options: [
        { value: 'pending', label: { ar: 'قيد الانتظار', en: 'Pending' } },
        { value: 'processing', label: { ar: 'جاري المعالجة', en: 'Processing' } },
        { value: 'completed', label: { ar: 'مكتمل', en: 'Completed' } },
        { value: 'failed', label: { ar: 'فشل', en: 'Failed' } },
        { value: 'partial', label: { ar: 'جزئي', en: 'Partial' } },
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
      key: 'importName',
      label: { ar: 'اسم الاستيراد', en: 'Import Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.fileName}</div>
        </div>
      ),
    },
    {
      key: 'dataType',
      label: { ar: 'نوع البيانات', en: 'Data Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          customers: { ar: 'عملاء', en: 'Customers', icon: '👥', color: 'bg-blue-100 text-blue-800' },
          suppliers: { ar: 'موردين', en: 'Suppliers', icon: '🏢', color: 'bg-green-100 text-green-800' },
          products: { ar: 'منتجات', en: 'Products', icon: '📦', color: 'bg-purple-100 text-purple-800' },
          employees: { ar: 'موظفين', en: 'Employees', icon: '👨‍💼', color: 'bg-orange-100 text-orange-800' },
          accounts: { ar: 'حسابات', en: 'Accounts', icon: '💰', color: 'bg-yellow-100 text-yellow-800' },
          transactions: { ar: 'معاملات', en: 'Transactions', icon: '💳', color: 'bg-cyan-100 text-cyan-800' },
          invoices: { ar: 'فواتير', en: 'Invoices', icon: '📄', color: 'bg-pink-100 text-pink-800' },
          inventory: { ar: 'مخزون', en: 'Inventory', icon: '📊', color: 'bg-teal-100 text-teal-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {typeMap[value]?.icon} {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'fileFormat',
      label: { ar: 'الصيغة', en: 'Format' },
      render: (value: string) => (
        <Badge variant="outline" className="font-mono">
          .{value.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'recordsCount',
      label: { ar: 'السجلات', en: 'Records' },
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-semibold">{value ? value.toLocaleString() : '-'}</span>
      ),
    },
    {
      key: 'importMode',
      label: { ar: 'الوضع', en: 'Mode' },
      render: (value: string) => {
        const modeMap: Record<string, any> = {
          insert: { ar: 'إضافة', en: 'Insert', icon: '➕' },
          update: { ar: 'تحديث', en: 'Update', icon: '🔄' },
          upsert: { ar: 'إضافة/تحديث', en: 'Upsert', icon: '🔀' },
          replace: { ar: 'استبدال', en: 'Replace', icon: '🔁' },
        };
        return (
          <span className="text-sm">
            {modeMap[value]?.icon} {locale === 'ar' ? modeMap[value]?.ar : modeMap[value]?.en}
          </span>
        );
      },
    },
    {
      key: 'importDate',
      label: { ar: 'التاريخ', en: 'Date' },
      render: (value: string) => new Date(value).toLocaleDateString(locale),
    },
    {
      key: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => {
        const statusMap: Record<string, any> = {
          pending: { ar: 'انتظار', en: 'Pending', color: 'bg-gray-400 text-white' },
          processing: { ar: 'معالجة', en: 'Processing', color: 'bg-blue-600 text-white animate-pulse' },
          completed: { ar: 'مكتمل', en: 'Completed', color: 'bg-green-600 text-white' },
          failed: { ar: 'فشل', en: 'Failed', color: 'bg-red-600 text-white' },
          partial: { ar: 'جزئي', en: 'Partial', color: 'bg-orange-600 text-white' },
        };
        return (
          <Badge className={statusMap[value]?.color}>
            {locale === 'ar' ? statusMap[value]?.ar : statusMap[value]?.en}
          </Badge>
        );
      },
    },
  ];

  const mockData = [
    {
      id: '1',
      importName: locale === 'ar' ? 'استيراد العملاء من النظام القديم' : 'Import Customers from Legacy',
      dataType: 'customers',
      fileFormat: 'excel',
      fileName: 'customers_2024.xlsx',
      recordsCount: 1250,
      importMode: 'upsert',
      validationRules: 'strict',
      duplicateHandling: 'update',
      importDate: '2024-02-28',
      importedBy: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      status: 'completed',
      notes: locale === 'ar' ? 'استيراد ناجح بدون أخطاء' : 'Successfully imported without errors',
    },
    {
      id: '2',
      importName: locale === 'ar' ? 'استيراد المنتجات' : 'Import Products',
      dataType: 'products',
      fileFormat: 'csv',
      fileName: 'products_catalog.csv',
      recordsCount: 3500,
      importMode: 'insert',
      validationRules: 'normal',
      duplicateHandling: 'skip',
      importDate: '2024-02-27',
      importedBy: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      status: 'completed',
      notes: locale === 'ar' ? 'تم تخطي 45 منتج مكرر' : 'Skipped 45 duplicate products',
    },
    {
      id: '3',
      importName: locale === 'ar' ? 'استيراد الموظفين' : 'Import Employees',
      dataType: 'employees',
      fileFormat: 'excel',
      fileName: 'employees_hr.xlsx',
      recordsCount: 250,
      importMode: 'upsert',
      validationRules: 'strict',
      duplicateHandling: 'update',
      importDate: '2024-02-28',
      importedBy: locale === 'ar' ? 'خالد سعيد' : 'Khalid Saeed',
      status: 'processing',
      notes: locale === 'ar' ? 'جاري المعالجة...' : 'Processing...',
    },
    {
      id: '4',
      importName: locale === 'ar' ? 'استيراد الفواتير' : 'Import Invoices',
      dataType: 'invoices',
      fileFormat: 'json',
      fileName: 'invoices_2023.json',
      recordsCount: 5600,
      importMode: 'insert',
      validationRules: 'normal',
      duplicateHandling: 'error',
      importDate: '2024-02-26',
      importedBy: locale === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      status: 'partial',
      notes: locale === 'ar' ? 'تم استيراد 5500، فشل 100 سجل' : 'Imported 5500, failed 100 records',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'استيراد البيانات', en: 'Data Import' }}
      description={{ 
        ar: 'استيراد البيانات من ملفات خارجية (Excel, CSV, JSON, XML)', 
        en: 'Import data from external files (Excel, CSV, JSON, XML)' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        importName: '',
        dataType: 'customers',
        fileFormat: 'excel',
        fileName: '',
        recordsCount: 0,
        importMode: 'upsert',
        validationRules: 'normal',
        duplicateHandling: 'skip',
        importDate: new Date().toISOString().split('T')[0],
        importedBy: '',
        status: 'pending',
        notes: '',
      }}
      generateId={(items) => `IMP-${String(items.length + 1).padStart(4, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'قيد الانتظار', en: 'Pending' }, color: 'bg-gray-400 text-white' },
        { value: 'processing', label: { ar: 'جاري المعالجة', en: 'Processing' }, color: 'bg-blue-600 text-white' },
        { value: 'completed', label: { ar: 'مكتمل', en: 'Completed' }, color: 'bg-green-600 text-white' },
        { value: 'failed', label: { ar: 'فشل', en: 'Failed' }, color: 'bg-red-600 text-white' },
        { value: 'partial', label: { ar: 'جزئي', en: 'Partial' }, color: 'bg-orange-600 text-white' },
      ]}
    />
  );
}

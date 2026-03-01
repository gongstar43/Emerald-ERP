import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function DataExport() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'exportName',
      label: { ar: 'اسم التصدير', en: 'Export Name' },
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
        { value: 'financial_reports', label: { ar: 'تقارير مالية', en: 'Financial Reports' } },
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
        { value: 'pdf', label: { ar: 'PDF', en: 'PDF' } },
        { value: 'json', label: { ar: 'JSON', en: 'JSON' } },
        { value: 'xml', label: { ar: 'XML', en: 'XML' } },
      ],
      required: true,
    },
    {
      name: 'dateRange',
      label: { ar: 'نطاق التاريخ', en: 'Date Range' },
      type: 'select' as const,
      options: [
        { value: 'today', label: { ar: 'اليوم', en: 'Today' } },
        { value: 'this_week', label: { ar: 'هذا الأسبوع', en: 'This Week' } },
        { value: 'this_month', label: { ar: 'هذا الشهر', en: 'This Month' } },
        { value: 'this_quarter', label: { ar: 'هذا الربع', en: 'This Quarter' } },
        { value: 'this_year', label: { ar: 'هذه السنة', en: 'This Year' } },
        { value: 'all', label: { ar: 'الكل', en: 'All Time' } },
        { value: 'custom', label: { ar: 'مخصص', en: 'Custom' } },
      ],
      required: true,
    },
    {
      name: 'includeHeaders',
      label: { ar: 'تضمين العناوين', en: 'Include Headers' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'includeArchived',
      label: { ar: 'تضمين المؤرشف', en: 'Include Archived' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
    {
      name: 'compression',
      label: { ar: 'ضغط الملف', en: 'File Compression' },
      type: 'select' as const,
      options: [
        { value: 'none', label: { ar: 'بدون ضغط', en: 'No Compression' } },
        { value: 'zip', label: { ar: 'ZIP', en: 'ZIP' } },
        { value: 'gzip', label: { ar: 'GZIP', en: 'GZIP' } },
      ],
      required: true,
    },
    {
      name: 'recordsCount',
      label: { ar: 'عدد السجلات', en: 'Records Count' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'fileSize',
      label: { ar: 'حجم الملف (MB)', en: 'File Size (MB)' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'exportDate',
      label: { ar: 'تاريخ التصدير', en: 'Export Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'exportedBy',
      label: { ar: 'تم التصدير بواسطة', en: 'Exported By' },
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
        { value: 'downloaded', label: { ar: 'تم التحميل', en: 'Downloaded' } },
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
      key: 'exportName',
      label: { ar: 'اسم التصدير', en: 'Export Name' },
      render: (value: string) => <div className="font-medium">{value}</div>,
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
          financial_reports: { ar: 'تقارير مالية', en: 'Reports', icon: '📈', color: 'bg-indigo-100 text-indigo-800' },
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
      render: (value: string, item: any) => {
        const formats: Record<string, string> = {
          csv: '📄 CSV',
          excel: '📊 XLSX',
          pdf: '📕 PDF',
          json: '📋 JSON',
          xml: '📰 XML',
        };
        return (
          <div>
            <div className="font-mono text-sm">{formats[value]}</div>
            {item.compression !== 'none' && (
              <div className="text-xs text-muted-foreground">
                + {item.compression.toUpperCase()}
              </div>
            )}
          </div>
        );
      },
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
      key: 'fileSize',
      label: { ar: 'الحجم', en: 'Size' },
      align: 'right' as const,
      render: (value: number) => {
        if (!value) return '-';
        if (value < 1) return `${(value * 1024).toFixed(0)} KB`;
        return `${value.toFixed(2)} MB`;
      },
    },
    {
      key: 'exportDate',
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
          downloaded: { ar: 'تم التحميل', en: 'Downloaded', color: 'bg-purple-600 text-white' },
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
      exportName: locale === 'ar' ? 'تقرير العملاء الشهري' : 'Monthly Customers Report',
      dataType: 'customers',
      fileFormat: 'excel',
      dateRange: 'this_month',
      includeHeaders: 'yes',
      includeArchived: 'no',
      compression: 'none',
      recordsCount: 1850,
      fileSize: 2.3,
      exportDate: '2024-02-28',
      exportedBy: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      status: 'completed',
      notes: locale === 'ar' ? 'تصدير شهري للعملاء النشطين' : 'Monthly active customers export',
    },
    {
      id: '2',
      exportName: locale === 'ar' ? 'القوائم المالية السنوية' : 'Annual Financial Statements',
      dataType: 'financial_reports',
      fileFormat: 'pdf',
      dateRange: 'this_year',
      includeHeaders: 'yes',
      includeArchived: 'yes',
      compression: 'zip',
      recordsCount: 0,
      fileSize: 15.8,
      exportDate: '2024-02-27',
      exportedBy: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      status: 'downloaded',
      notes: locale === 'ar' ? 'تقارير مالية سنوية كاملة' : 'Complete annual financial reports',
    },
    {
      id: '3',
      exportName: locale === 'ar' ? 'بيانات المخزون' : 'Inventory Data',
      dataType: 'inventory',
      fileFormat: 'csv',
      dateRange: 'all',
      includeHeaders: 'yes',
      includeArchived: 'no',
      compression: 'gzip',
      recordsCount: 4520,
      fileSize: 0.8,
      exportDate: '2024-02-28',
      exportedBy: locale === 'ar' ? 'خالد سعيد' : 'Khalid Saeed',
      status: 'processing',
      notes: locale === 'ar' ? 'جاري تصدير جميع بيانات المخزون' : 'Exporting all inventory data',
    },
    {
      id: '4',
      exportName: locale === 'ar' ? 'الفواتير ربع السنوية' : 'Quarterly Invoices',
      dataType: 'invoices',
      fileFormat: 'json',
      dateRange: 'this_quarter',
      includeHeaders: 'yes',
      includeArchived: 'no',
      compression: 'none',
      recordsCount: 3250,
      fileSize: 4.2,
      exportDate: '2024-02-26',
      exportedBy: locale === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      status: 'completed',
      notes: locale === 'ar' ? 'فواتير الربع الأول 2024' : 'Q1 2024 invoices',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'تصدير البيانات', en: 'Data Export' }}
      description={{ 
        ar: 'تصدير البيانات إلى ملفات خارجية (Excel, CSV, PDF, JSON, XML)', 
        en: 'Export data to external files (Excel, CSV, PDF, JSON, XML)' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        exportName: '',
        dataType: 'customers',
        fileFormat: 'excel',
        dateRange: 'this_month',
        includeHeaders: 'yes',
        includeArchived: 'no',
        compression: 'none',
        recordsCount: 0,
        fileSize: 0,
        exportDate: new Date().toISOString().split('T')[0],
        exportedBy: '',
        status: 'pending',
        notes: '',
      }}
      generateId={(items) => `EXP-${String(items.length + 1).padStart(4, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'قيد الانتظار', en: 'Pending' }, color: 'bg-gray-400 text-white' },
        { value: 'processing', label: { ar: 'جاري المعالجة', en: 'Processing' }, color: 'bg-blue-600 text-white' },
        { value: 'completed', label: { ar: 'مكتمل', en: 'Completed' }, color: 'bg-green-600 text-white' },
        { value: 'failed', label: { ar: 'فشل', en: 'Failed' }, color: 'bg-red-600 text-white' },
        { value: 'downloaded', label: { ar: 'تم التحميل', en: 'Downloaded' }, color: 'bg-purple-600 text-white' },
      ]}
    />
  );
}

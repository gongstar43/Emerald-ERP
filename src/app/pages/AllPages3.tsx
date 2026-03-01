/**
 * Automatic Page Factory - Part 3
 * Settings, Profile, and remaining modules
 */

import React from 'react';
import GenericCRUDPage from '../components/GenericCRUDPage';

const createBasicPage = (config: {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  prefix: string;
  hasStatus?: boolean;
  hasAmount?: boolean;
}) => {
  const basicFields: any[] = [
    { name: 'code', label: { ar: 'الكود', en: 'Code' }, type: 'text', required: true },
    { name: 'name', label: { ar: 'الاسم', en: 'Name' }, type: 'text', required: true },
    { name: 'date', label: { ar: 'التاريخ', en: 'Date' }, type: 'date', required: true },
  ];

  if (config.hasAmount) {
    basicFields.push({ name: 'amount', label: { ar: 'المبلغ', en: 'Amount' }, type: 'number', required: true });
  }

  if (config.hasStatus) {
    basicFields.push({
      name: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      type: 'select',
      required: true,
      options: [
        { value: 'active', label: { ar: 'نشط', en: 'Active' } },
        { value: 'inactive', label: { ar: 'غير نشط', en: 'Inactive' } },
      ],
    });
  }

  basicFields.push({ name: 'notes', label: { ar: 'ملاحظات', en: 'Notes' }, type: 'textarea', col: 2 });

  const basicColumns = [
    { key: 'code', label: { ar: 'الكود', en: 'Code' } },
    { key: 'name', label: { ar: 'الاسم', en: 'Name' } },
    { key: 'date', label: { ar: 'التاريخ', en: 'Date' } },
  ];

  if (config.hasAmount) {
    basicColumns.push({ key: 'amount', label: { ar: 'المبلغ', en: 'Amount' }, align: 'right' as const });
  }

  if (config.hasStatus) {
    basicColumns.push({ key: 'status', label: { ar: 'الحالة', en: 'Status' } });
  }

  return () => (
    <GenericCRUDPage
      title={config.title}
      description={config.description}
      fields={basicFields}
      columns={basicColumns}
      stats={[
        { label: { ar: 'الإجمالي', en: 'Total' }, value: (items) => items.length, color: 'text-blue-600' },
        ...(config.hasStatus
          ? [{ label: { ar: 'النشط', en: 'Active' }, value: (items: any) => items.filter((i: any) => i.status === 'active').length, color: 'text-green-600' }]
          : []),
        ...(config.hasAmount
          ? [{ label: { ar: 'الإجمالي', en: 'Total Amount' }, value: (items: any) => items.reduce((sum: number, i: any) => sum + (i.amount || 0), 0).toLocaleString(), color: 'text-purple-600' }]
          : []),
      ]}
      defaultValues={{
        code: `${config.prefix}-${Date.now()}`,
        name: '',
        date: new Date().toISOString().split('T')[0],
        ...(config.hasAmount && { amount: 0 }),
        ...(config.hasStatus && { status: 'active' }),
        notes: '',
      }}
      generateId={(items) => `${config.prefix}-${Date.now()}`}
      statusField={config.hasStatus ? 'status' : undefined}
      statusOptions={
        config.hasStatus
          ? [
              { value: 'active', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-100 text-green-800' },
              { value: 'inactive', label: { ar: 'غير نشط', en: 'Inactive' }, color: 'bg-gray-100 text-gray-800' },
            ]
          : undefined
      }
    />
  );
};

// ======================
// SETTINGS MODULE
// ======================
export const CompanySettings = createBasicPage({
  title: { ar: 'إعدادات الشركة', en: 'Company Settings' },
  description: { ar: 'إعدادات الشركة العامة', en: 'General company settings' },
  prefix: 'SET',
  hasStatus: true,
  hasAmount: false,
});

export const Branches = createBasicPage({
  title: { ar: 'الفروع', en: 'Branches' },
  description: { ar: 'إدارة فروع الشركة', en: 'Manage company branches' },
  prefix: 'BR',
  hasStatus: true,
  hasAmount: false,
});

export const Currencies = createBasicPage({
  title: { ar: 'العملات', en: 'Currencies' },
  description: { ar: 'إدارة العملات', en: 'Manage currencies' },
  prefix: 'CUR',
  hasStatus: true,
  hasAmount: false,
});

export const ExchangeRates = createBasicPage({
  title: { ar: 'أسعار الصرف', en: 'Exchange Rates' },
  description: { ar: 'إدارة أسعار الصرف', en: 'Manage exchange rates' },
  prefix: 'EXCH',
  hasStatus: true,
  hasAmount: false,
});

export const FiscalYear = createBasicPage({
  title: { ar: 'السنة المالية', en: 'Fiscal Year' },
  description: { ar: 'إدارة السنوات المالية', en: 'Manage fiscal years' },
  prefix: 'FY',
  hasStatus: true,
  hasAmount: false,
});

export const NumberingSeries = createBasicPage({
  title: { ar: 'سلاسل الترقيم', en: 'Numbering Series' },
  description: { ar: 'إدارة سلاسل الترقيم', en: 'Manage numbering series' },
  prefix: 'NUM',
  hasStatus: true,
  hasAmount: false,
});

export const DocumentTemplates = createBasicPage({
  title: { ar: 'قوالب المستندات', en: 'Document Templates' },
  description: { ar: 'إدارة قوالب المستندات', en: 'Manage document templates' },
  prefix: 'TMPL',
  hasStatus: true,
  hasAmount: false,
});

export const EmailConfiguration = createBasicPage({
  title: { ar: 'إعدادات البريد', en: 'Email Configuration' },
  description: { ar: 'إعدادات البريد الإلكتروني', en: 'Email configuration' },
  prefix: 'EMAIL',
  hasStatus: true,
  hasAmount: false,
});

export const Notifications = createBasicPage({
  title: { ar: 'الإشعارات', en: 'Notifications' },
  description: { ar: 'إدارة الإشعارات', en: 'Manage notifications' },
  prefix: 'NOTIF',
  hasStatus: true,
  hasAmount: false,
});

export const Integrations = createBasicPage({
  title: { ar: 'التكاملات', en: 'Integrations' },
  description: { ar: 'إدارة التكاملات', en: 'Manage integrations' },
  prefix: 'INTG',
  hasStatus: true,
  hasAmount: false,
});

export const APISettings = createBasicPage({
  title: { ar: 'إعدادات API', en: 'API Settings' },
  description: { ar: 'إعدادات واجهة برمجة التطبيقات', en: 'API settings' },
  prefix: 'API',
  hasStatus: true,
  hasAmount: false,
});

export const BackupRestore = createBasicPage({
  title: { ar: 'النسخ الاحتياطي', en: 'Backup & Restore' },
  description: { ar: 'النسخ الاحتياطي والاستعادة', en: 'Backup and restore' },
  prefix: 'BACKUP',
  hasStatus: false,
  hasAmount: false,
});

export const ImportData = createBasicPage({
  title: { ar: 'استيراد البيانات', en: 'Import Data' },
  description: { ar: 'استيراد البيانات', en: 'Import data' },
  prefix: 'IMP',
  hasStatus: false,
  hasAmount: false,
});

export const ExportData = createBasicPage({
  title: { ar: 'تصدير البيانات', en: 'Export Data' },
  description: { ar: 'تصدير البيانات', en: 'Export data' },
  prefix: 'EXP',
  hasStatus: false,
  hasAmount: false,
});

// ======================
// MY PROFILE MODULE
// ======================
export const MyProfile = createBasicPage({
  title: { ar: 'ملفي الشخصي', en: 'My Profile' },
  description: { ar: 'إدارة ملفك الشخصي', en: 'Manage your profile' },
  prefix: 'PROF',
  hasStatus: false,
  hasAmount: false,
});

export const Security = createBasicPage({
  title: { ar: 'الأمان', en: 'Security' },
  description: { ar: 'إعدادات الأمان', en: 'Security settings' },
  prefix: 'SEC',
  hasStatus: false,
  hasAmount: false,
});

export const Preferences = createBasicPage({
  title: { ar: 'التفضيلات', en: 'Preferences' },
  description: { ar: 'تفضيلاتك الشخصية', en: 'Your preferences' },
  prefix: 'PREF',
  hasStatus: false,
  hasAmount: false,
});

export const MyTasks = createBasicPage({
  title: { ar: 'مهامي', en: 'My Tasks' },
  description: { ar: 'مهامي الشخصية', en: 'My tasks' },
  prefix: 'MYTSK',
  hasStatus: true,
  hasAmount: false,
});

export const MyTodo = createBasicPage({
  title: { ar: 'قائمة المهام', en: 'My Todo List' },
  description: { ar: 'قائمة مهامي', en: 'My todo list' },
  prefix: 'TODO',
  hasStatus: true,
  hasAmount: false,
});

export const MyCalendar = createBasicPage({
  title: { ar: 'تقويمي', en: 'My Calendar' },
  description: { ar: 'تقويمي الشخصي', en: 'My calendar' },
  prefix: 'CAL',
  hasStatus: false,
  hasAmount: false,
});

export const MyNotifications = createBasicPage({
  title: { ar: 'إشعاراتي', en: 'My Notifications' },
  description: { ar: 'إشعاراتي', en: 'My notifications' },
  prefix: 'MYNOT',
  hasStatus: false,
  hasAmount: false,
});

export const MyDocuments = createBasicPage({
  title: { ar: 'مستنداتي', en: 'My Documents' },
  description: { ar: 'مستنداتي الشخصية', en: 'My documents' },
  prefix: 'MYDOC',
  hasStatus: false,
  hasAmount: false,
});

// ======================
// ADDITIONAL SALES PAGES
// ======================
export const SalesCommissions = createBasicPage({
  title: { ar: 'عمولات المبيعات', en: 'Sales Commissions' },
  description: { ar: 'إدارة عمولات المبيعات', en: 'Manage sales commissions' },
  prefix: 'COM',
  hasStatus: true,
  hasAmount: true,
});

export const SalesTargets = createBasicPage({
  title: { ar: 'أهداف المبيعات', en: 'Sales Targets' },
  description: { ar: 'إدارة أهداف المبيعات', en: 'Manage sales targets' },
  prefix: 'TGT',
  hasStatus: true,
  hasAmount: true,
});

export const SalesReports = createBasicPage({
  title: { ar: 'تقارير المبيعات', en: 'Sales Reports' },
  description: { ar: 'تقارير المبيعات', en: 'Sales reports' },
  prefix: 'SREP',
  hasStatus: false,
  hasAmount: false,
});

export const SalesAnalytics = createBasicPage({
  title: { ar: 'تحليلات المبيعات', en: 'Sales Analytics' },
  description: { ar: 'تحليلات المبيعات', en: 'Sales analytics' },
  prefix: 'SANA',
  hasStatus: false,
  hasAmount: false,
});

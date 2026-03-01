import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function EmailSettings() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'profileName',
      label: { ar: 'اسم الملف', en: 'Profile Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'smtpHost',
      label: { ar: 'خادم SMTP', en: 'SMTP Host' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'smtpPort',
      label: { ar: 'منفذ SMTP', en: 'SMTP Port' },
      type: 'select' as const,
      options: [
        { value: '25', label: { ar: '25 (غير مشفر)', en: '25 (Unencrypted)' } },
        { value: '465', label: { ar: '465 (SSL)', en: '465 (SSL)' } },
        { value: '587', label: { ar: '587 (TLS)', en: '587 (TLS)' } },
        { value: '2525', label: { ar: '2525 (بديل)', en: '2525 (Alternative)' } },
      ],
      required: true,
    },
    {
      name: 'encryption',
      label: { ar: 'التشفير', en: 'Encryption' },
      type: 'select' as const,
      options: [
        { value: 'none', label: { ar: 'بدون تشفير', en: 'None' } },
        { value: 'ssl', label: { ar: 'SSL', en: 'SSL' } },
        { value: 'tls', label: { ar: 'TLS', en: 'TLS' } },
      ],
      required: true,
    },
    {
      name: 'username',
      label: { ar: 'اسم المستخدم', en: 'Username' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'password',
      label: { ar: 'كلمة المرور', en: 'Password' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'fromEmail',
      label: { ar: 'البريد المرسل', en: 'From Email' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'fromName',
      label: { ar: 'اسم المرسل', en: 'From Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'replyToEmail',
      label: { ar: 'بريد الرد', en: 'Reply-To Email' },
      type: 'text' as const,
      required: false,
    },
    {
      name: 'emailSignature',
      label: { ar: 'التوقيع', en: 'Email Signature' },
      type: 'textarea' as const,
      col: 2,
      required: false,
    },
    {
      name: 'isDefault',
      label: { ar: 'افتراضي', en: 'Default' },
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
  ];

  const columns = [
    {
      key: 'profileName',
      label: { ar: 'اسم الملف', en: 'Profile Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.fromEmail}</div>
        </div>
      ),
    },
    {
      key: 'smtpHost',
      label: { ar: 'خادم SMTP', en: 'SMTP Host' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-mono text-sm">{value}</div>
          <div className="text-xs text-muted-foreground">
            {locale === 'ar' ? 'منفذ' : 'Port'}: {item.smtpPort}
          </div>
        </div>
      ),
    },
    {
      key: 'encryption',
      label: { ar: 'التشفير', en: 'Encryption' },
      render: (value: string) => {
        const encMap: Record<string, any> = {
          none: { ar: 'بدون', en: 'None', color: 'bg-gray-200 text-gray-800' },
          ssl: { ar: 'SSL', en: 'SSL', color: 'bg-green-100 text-green-800' },
          tls: { ar: 'TLS', en: 'TLS', color: 'bg-blue-100 text-blue-800' },
        };
        return (
          <Badge className={encMap[value]?.color}>
            {locale === 'ar' ? encMap[value]?.ar : encMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'fromName',
      label: { ar: 'اسم المرسل', en: 'From Name' },
    },
    {
      key: 'isDefault',
      label: { ar: 'افتراضي', en: 'Default' },
      render: (value: string) => (
        value === 'yes' ? (
          <Badge className="bg-yellow-600 text-white">
            {locale === 'ar' ? '⭐ افتراضي' : '⭐ Default'}
          </Badge>
        ) : null
      ),
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
          {value === 'yes' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'معطل' : 'Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      profileName: locale === 'ar' ? 'بريد الشركة الرئيسي' : 'Company Main Email',
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      encryption: 'tls',
      username: 'info@company.sa',
      password: '••••••••',
      fromEmail: 'info@company.sa',
      fromName: locale === 'ar' ? 'شركة الحلول التجارية' : 'Business Solutions Co.',
      replyToEmail: 'support@company.sa',
      emailSignature: locale === 'ar' 
        ? 'مع تحيات فريق شركة الحلول التجارية\nهاتف: 00966112345678\nالموقع: www.company.sa'
        : 'Best Regards,\nBusiness Solutions Team\nPhone: +966112345678\nWebsite: www.company.sa',
      isDefault: 'yes',
      isActive: 'yes',
    },
    {
      id: '2',
      profileName: locale === 'ar' ? 'بريد المبيعات' : 'Sales Email',
      smtpHost: 'smtp.office365.com',
      smtpPort: '587',
      encryption: 'tls',
      username: 'sales@company.sa',
      password: '••••••••',
      fromEmail: 'sales@company.sa',
      fromName: locale === 'ar' ? 'قسم المبيعات' : 'Sales Department',
      replyToEmail: 'sales@company.sa',
      emailSignature: locale === 'ar' 
        ? 'فريق المبيعات\nشركة الحلول التجارية'
        : 'Sales Team\nBusiness Solutions Co.',
      isDefault: 'no',
      isActive: 'yes',
    },
    {
      id: '3',
      profileName: locale === 'ar' ? 'بريد الدعم الفني' : 'Support Email',
      smtpHost: 'smtp.gmail.com',
      smtpPort: '465',
      encryption: 'ssl',
      username: 'support@company.sa',
      password: '••••••••',
      fromEmail: 'support@company.sa',
      fromName: locale === 'ar' ? 'الدعم الفني' : 'Technical Support',
      replyToEmail: 'support@company.sa',
      emailSignature: locale === 'ar' 
        ? 'فريق الدعم الفني\nمتاحون 24/7'
        : 'Support Team\nAvailable 24/7',
      isDefault: 'no',
      isActive: 'yes',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'إعدادات البريد الإلكتروني', en: 'Email Settings' }}
      description={{ 
        ar: 'إدارة إعدادات SMTP وحسابات البريد الإلكتروني', 
        en: 'Manage SMTP settings and email accounts' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        profileName: '',
        smtpHost: '',
        smtpPort: '587',
        encryption: 'tls',
        username: '',
        password: '',
        fromEmail: '',
        fromName: '',
        replyToEmail: '',
        emailSignature: '',
        isDefault: 'no',
        isActive: 'yes',
      }}
      generateId={(items) => String(items.length + 1)}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600 text-white' },
        { value: 'no', label: { ar: 'معطل', en: 'Inactive' }, color: 'bg-gray-400 text-white' },
      ]}
    />
  );
}

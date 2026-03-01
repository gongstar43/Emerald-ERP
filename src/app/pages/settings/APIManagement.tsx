import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function APIManagement() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'apiName',
      label: { ar: 'اسم API', en: 'API Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'apiKey',
      label: { ar: 'مفتاح API', en: 'API Key' },
      type: 'text' as const,
      required: false,
    },
    {
      name: 'application',
      label: { ar: 'التطبيق', en: 'Application' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'permissions',
      label: { ar: 'الصلاحيات', en: 'Permissions' },
      type: 'select' as const,
      options: [
        { value: 'read', label: { ar: 'قراءة فقط', en: 'Read Only' } },
        { value: 'write', label: { ar: 'كتابة فقط', en: 'Write Only' } },
        { value: 'read_write', label: { ar: 'قراءة وكتابة', en: 'Read & Write' } },
        { value: 'admin', label: { ar: 'مدير كامل', en: 'Full Admin' } },
      ],
      required: true,
    },
    {
      name: 'rateLimit',
      label: { ar: 'حد الطلبات (لكل ساعة)', en: 'Rate Limit (per hour)' },
      type: 'select' as const,
      options: [
        { value: '100', label: { ar: '100 طلب', en: '100 requests' } },
        { value: '500', label: { ar: '500 طلب', en: '500 requests' } },
        { value: '1000', label: { ar: '1000 طلب', en: '1000 requests' } },
        { value: '5000', label: { ar: '5000 طلب', en: '5000 requests' } },
        { value: 'unlimited', label: { ar: 'غير محدود', en: 'Unlimited' } },
      ],
      required: true,
    },
    {
      name: 'ipWhitelist',
      label: { ar: 'قائمة IP المسموحة', en: 'IP Whitelist' },
      type: 'textarea' as const,
      col: 2,
    },
    {
      name: 'expiryDate',
      label: { ar: 'تاريخ الانتهاء', en: 'Expiry Date' },
      type: 'date' as const,
      required: false,
    },
    {
      name: 'createdDate',
      label: { ar: 'تاريخ الإنشاء', en: 'Created Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'lastUsed',
      label: { ar: 'آخر استخدام', en: 'Last Used' },
      type: 'date' as const,
      required: false,
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
      name: 'notes',
      label: { ar: 'ملاحظات', en: 'Notes' },
      type: 'textarea' as const,
      col: 2,
    },
  ];

  const columns = [
    {
      key: 'apiName',
      label: { ar: 'اسم API', en: 'API Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.application}</div>
        </div>
      ),
    },
    {
      key: 'apiKey',
      label: { ar: 'المفتاح', en: 'Key' },
      render: (value: string) => (
        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {value ? value.substring(0, 20) + '••••••' : locale === 'ar' ? 'سيتم التوليد' : 'Will be generated'}
        </div>
      ),
    },
    {
      key: 'permissions',
      label: { ar: 'الصلاحيات', en: 'Permissions' },
      render: (value: string) => {
        const permMap: Record<string, any> = {
          read: { ar: 'قراءة', en: 'Read', color: 'bg-blue-100 text-blue-800', icon: '👁️' },
          write: { ar: 'كتابة', en: 'Write', color: 'bg-green-100 text-green-800', icon: '✏️' },
          read_write: { ar: 'قراءة/كتابة', en: 'Read/Write', color: 'bg-purple-100 text-purple-800', icon: '🔄' },
          admin: { ar: 'مدير', en: 'Admin', color: 'bg-red-100 text-red-800', icon: '👑' },
        };
        return (
          <Badge className={permMap[value]?.color}>
            {permMap[value]?.icon} {locale === 'ar' ? permMap[value]?.ar : permMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'rateLimit',
      label: { ar: 'حد الطلبات', en: 'Rate Limit' },
      render: (value: string) => (
        <Badge variant="outline">
          {value === 'unlimited' 
            ? (locale === 'ar' ? '∞ غير محدود' : '∞ Unlimited') 
            : `${value}/h`}
        </Badge>
      ),
    },
    {
      key: 'lastUsed',
      label: { ar: 'آخر استخدام', en: 'Last Used' },
      render: (value: string) => {
        if (!value) return <span className="text-muted-foreground text-sm">{locale === 'ar' ? 'لم يستخدم' : 'Never'}</span>;
        const date = new Date(value);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString(locale)}</div>
            <div className="text-xs text-muted-foreground">
              {locale === 'ar' ? `منذ ${diffDays} يوم` : `${diffDays} days ago`}
            </div>
          </div>
        );
      },
    },
    {
      key: 'expiryDate',
      label: { ar: 'الانتهاء', en: 'Expiry' },
      render: (value: string) => {
        if (!value) return <span className="text-muted-foreground text-sm">{locale === 'ar' ? 'لا ينتهي' : 'No expiry'}</span>;
        const expiryDate = new Date(value);
        const now = new Date();
        const isExpired = expiryDate < now;
        return (
          <Badge className={isExpired ? 'bg-red-600 text-white' : 'bg-green-100 text-green-800'}>
            {expiryDate.toLocaleDateString(locale)}
          </Badge>
        );
      },
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
          {value === 'yes' ? (locale === 'ar' ? '🟢 نشط' : '🟢 Active') : (locale === 'ar' ? '🔴 معطل' : '🔴 Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      apiName: 'Mobile App API',
      apiKey: 'sk_live_51MqR2wKxN8K2p4Y7',
      application: 'iOS & Android App',
      permissions: 'read_write',
      rateLimit: '5000',
      ipWhitelist: '',
      expiryDate: '2025-12-31',
      createdDate: '2024-01-15',
      lastUsed: '2024-02-28',
      isActive: 'yes',
      notes: locale === 'ar' ? 'API الرئيسي لتطبيق الجوال' : 'Main API for mobile application',
    },
    {
      id: '2',
      apiName: 'Partner Integration',
      apiKey: 'pk_live_89PqT3vLmO9L5r8Z2',
      application: 'Partner Portal',
      permissions: 'read',
      rateLimit: '1000',
      ipWhitelist: '192.168.1.0/24\n10.0.0.1',
      expiryDate: '2024-12-31',
      createdDate: '2023-06-10',
      lastUsed: '2024-02-27',
      isActive: 'yes',
      notes: locale === 'ar' ? 'تكامل مع بوابة الشركاء' : 'Integration with partner portal',
    },
    {
      id: '3',
      apiName: 'Analytics Dashboard',
      apiKey: 'ak_test_12XyZ4AbC5DeF6Gh7',
      application: 'Analytics System',
      permissions: 'read',
      rateLimit: '500',
      ipWhitelist: '203.0.113.0/24',
      expiryDate: '',
      createdDate: '2024-02-01',
      lastUsed: '2024-02-28',
      isActive: 'yes',
      notes: locale === 'ar' ? 'لوحة التحليلات' : 'Analytics dashboard',
    },
    {
      id: '4',
      apiName: 'Legacy System',
      apiKey: 'lk_old_98VwX7YzA6BcD5Ef4',
      application: 'Old ERP System',
      permissions: 'admin',
      rateLimit: 'unlimited',
      ipWhitelist: '172.16.0.0/16',
      expiryDate: '2024-03-31',
      createdDate: '2022-01-01',
      lastUsed: '2024-01-15',
      isActive: 'no',
      notes: locale === 'ar' ? 'سيتم إيقافه قريباً' : 'To be deprecated soon',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'إدارة API', en: 'API Management' }}
      description={{ 
        ar: 'إدارة مفاتيح API والصلاحيات والحدود', 
        en: 'Manage API keys, permissions, and rate limits' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        apiName: '',
        apiKey: '',
        application: '',
        permissions: 'read',
        rateLimit: '1000',
        ipWhitelist: '',
        expiryDate: '',
        createdDate: new Date().toISOString().split('T')[0],
        lastUsed: '',
        isActive: 'yes',
        notes: '',
      }}
      generateId={(items) => `API-${String(items.length + 1).padStart(3, '0')}`}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600 text-white' },
        { value: 'no', label: { ar: 'معطل', en: 'Inactive' }, color: 'bg-gray-400 text-white' },
      ]}
    />
  );
}

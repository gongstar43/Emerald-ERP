import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function Integrations() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'serviceName',
      label: { ar: 'اسم الخدمة', en: 'Service Name' },
      type: 'select' as const,
      options: [
        { value: 'stripe', label: { ar: 'Stripe (بوابة دفع)', en: 'Stripe (Payment Gateway)' } },
        { value: 'paypal', label: { ar: 'PayPal (بوابة دفع)', en: 'PayPal (Payment Gateway)' } },
        { value: 'sms_provider', label: { ar: 'مزود SMS', en: 'SMS Provider' } },
        { value: 'shipping', label: { ar: 'خدمة شحن', en: 'Shipping Service' } },
        { value: 'accounting', label: { ar: 'برنامج محاسبي', en: 'Accounting Software' } },
        { value: 'crm', label: { ar: 'نظام CRM', en: 'CRM System' } },
        { value: 'google_workspace', label: { ar: 'Google Workspace', en: 'Google Workspace' } },
        { value: 'microsoft365', label: { ar: 'Microsoft 365', en: 'Microsoft 365' } },
        { value: 'slack', label: { ar: 'Slack', en: 'Slack' } },
        { value: 'custom', label: { ar: 'تكامل مخصص', en: 'Custom Integration' } },
      ],
      required: true,
    },
    {
      name: 'displayName',
      label: { ar: 'الاسم المعروض', en: 'Display Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'apiUrl',
      label: { ar: 'رابط API', en: 'API URL' },
      type: 'text' as const,
      required: true,
      col: 2,
    },
    {
      name: 'apiKey',
      label: { ar: 'مفتاح API', en: 'API Key' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'apiSecret',
      label: { ar: 'سر API', en: 'API Secret' },
      type: 'text' as const,
      required: false,
    },
    {
      name: 'authMethod',
      label: { ar: 'طريقة المصادقة', en: 'Auth Method' },
      type: 'select' as const,
      options: [
        { value: 'api_key', label: { ar: 'مفتاح API', en: 'API Key' } },
        { value: 'oauth2', label: { ar: 'OAuth 2.0', en: 'OAuth 2.0' } },
        { value: 'basic', label: { ar: 'Basic Auth', en: 'Basic Auth' } },
        { value: 'bearer', label: { ar: 'Bearer Token', en: 'Bearer Token' } },
      ],
      required: true,
    },
    {
      name: 'syncDirection',
      label: { ar: 'اتجاه المزامنة', en: 'Sync Direction' },
      type: 'select' as const,
      options: [
        { value: 'bidirectional', label: { ar: 'ثنائي الاتجاه', en: 'Bidirectional' } },
        { value: 'push', label: { ar: 'دفع فقط', en: 'Push Only' } },
        { value: 'pull', label: { ar: 'سحب فقط', en: 'Pull Only' } },
      ],
      required: true,
    },
    {
      name: 'syncFrequency',
      label: { ar: 'تردد المزامنة', en: 'Sync Frequency' },
      type: 'select' as const,
      options: [
        { value: 'realtime', label: { ar: 'فوري', en: 'Real-time' } },
        { value: 'hourly', label: { ar: 'كل ساعة', en: 'Hourly' } },
        { value: 'daily', label: { ar: 'يومياً', en: 'Daily' } },
        { value: 'manual', label: { ar: 'يدوي', en: 'Manual' } },
      ],
      required: true,
    },
    {
      name: 'lastSync',
      label: { ar: 'آخر مزامنة', en: 'Last Sync' },
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
      key: 'displayName',
      label: { ar: 'اسم الخدمة', en: 'Service Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.serviceName}</div>
        </div>
      ),
    },
    {
      key: 'serviceName',
      label: { ar: 'النوع', en: 'Type' },
      render: (value: string) => {
        const serviceMap: Record<string, any> = {
          stripe: { icon: '💳', color: 'bg-purple-100 text-purple-800' },
          paypal: { icon: '💰', color: 'bg-blue-100 text-blue-800' },
          sms_provider: { icon: '📱', color: 'bg-green-100 text-green-800' },
          shipping: { icon: '📦', color: 'bg-orange-100 text-orange-800' },
          accounting: { icon: '💼', color: 'bg-cyan-100 text-cyan-800' },
          crm: { icon: '👥', color: 'bg-pink-100 text-pink-800' },
          google_workspace: { icon: '🔵', color: 'bg-blue-100 text-blue-800' },
          microsoft365: { icon: '🟦', color: 'bg-indigo-100 text-indigo-800' },
          slack: { icon: '💬', color: 'bg-purple-100 text-purple-800' },
          custom: { icon: '⚙️', color: 'bg-gray-100 text-gray-800' },
        };
        return (
          <Badge className={serviceMap[value]?.color}>
            {serviceMap[value]?.icon} {value}
          </Badge>
        );
      },
    },
    {
      key: 'authMethod',
      label: { ar: 'المصادقة', en: 'Auth' },
      render: (value: string) => {
        const authMap: Record<string, any> = {
          api_key: { ar: 'API Key', en: 'API Key' },
          oauth2: { ar: 'OAuth 2.0', en: 'OAuth 2.0' },
          basic: { ar: 'Basic', en: 'Basic' },
          bearer: { ar: 'Bearer', en: 'Bearer' },
        };
        return <Badge variant="outline">{locale === 'ar' ? authMap[value]?.ar : authMap[value]?.en}</Badge>;
      },
    },
    {
      key: 'syncDirection',
      label: { ar: 'المزامنة', en: 'Sync' },
      render: (value: string) => {
        const syncMap: Record<string, any> = {
          bidirectional: { ar: '⇄ ثنائي', en: '⇄ Bi', icon: '⇄' },
          push: { ar: '→ دفع', en: '→ Push', icon: '→' },
          pull: { ar: '← سحب', en: '← Pull', icon: '←' },
        };
        return <span className="text-sm font-mono">{syncMap[value]?.icon} {locale === 'ar' ? syncMap[value]?.ar : syncMap[value]?.en}</span>;
      },
    },
    {
      key: 'syncFrequency',
      label: { ar: 'التردد', en: 'Frequency' },
      render: (value: string) => {
        const freqMap: Record<string, any> = {
          realtime: { ar: 'فوري', en: 'Real-time', color: 'text-green-600' },
          hourly: { ar: 'ساعي', en: 'Hourly', color: 'text-blue-600' },
          daily: { ar: 'يومي', en: 'Daily', color: 'text-orange-600' },
          manual: { ar: 'يدوي', en: 'Manual', color: 'text-gray-600' },
        };
        return (
          <span className={`text-sm font-semibold ${freqMap[value]?.color}`}>
            {locale === 'ar' ? freqMap[value]?.ar : freqMap[value]?.en}
          </span>
        );
      },
    },
    {
      key: 'lastSync',
      label: { ar: 'آخر مزامنة', en: 'Last Sync' },
      render: (value: string) => value ? new Date(value).toLocaleDateString(locale) : '-',
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
      serviceName: 'stripe',
      displayName: 'Stripe Payment Gateway',
      apiUrl: 'https://api.stripe.com/v1',
      apiKey: 'sk_test_••••••••••••••••',
      apiSecret: 'sk_secret_••••••••',
      authMethod: 'bearer',
      syncDirection: 'bidirectional',
      syncFrequency: 'realtime',
      lastSync: '2024-02-28',
      isActive: 'yes',
      notes: locale === 'ar' ? 'بوابة الدفع الرئيسية' : 'Main payment gateway',
    },
    {
      id: '2',
      serviceName: 'sms_provider',
      displayName: locale === 'ar' ? 'مزود الرسائل النصية' : 'SMS Provider',
      apiUrl: 'https://api.smsprovider.com',
      apiKey: 'api_••••••••',
      apiSecret: '',
      authMethod: 'api_key',
      syncDirection: 'push',
      syncFrequency: 'realtime',
      lastSync: '2024-02-28',
      isActive: 'yes',
      notes: locale === 'ar' ? 'إرسال الإشعارات النصية' : 'Send SMS notifications',
    },
    {
      id: '3',
      serviceName: 'google_workspace',
      displayName: 'Google Workspace',
      apiUrl: 'https://www.googleapis.com',
      apiKey: 'gcp_••••••••',
      apiSecret: 'secret_••••••••',
      authMethod: 'oauth2',
      syncDirection: 'bidirectional',
      syncFrequency: 'hourly',
      lastSync: '2024-02-27',
      isActive: 'yes',
      notes: locale === 'ar' ? 'مزامنة البريد والتقويم' : 'Sync email and calendar',
    },
    {
      id: '4',
      serviceName: 'slack',
      displayName: 'Slack Workspace',
      apiUrl: 'https://slack.com/api',
      apiKey: 'xoxb-••••••••',
      apiSecret: '',
      authMethod: 'bearer',
      syncDirection: 'push',
      syncFrequency: 'realtime',
      lastSync: '2024-02-28',
      isActive: 'yes',
      notes: locale === 'ar' ? 'إشعارات Slack' : 'Slack notifications',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'التكاملات الخارجية', en: 'External Integrations' }}
      description={{ 
        ar: 'إدارة التكاملات مع الخدمات والأنظمة الخارجية', 
        en: 'Manage integrations with external services and systems' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        serviceName: 'custom',
        displayName: '',
        apiUrl: '',
        apiKey: '',
        apiSecret: '',
        authMethod: 'api_key',
        syncDirection: 'bidirectional',
        syncFrequency: 'hourly',
        lastSync: '',
        isActive: 'yes',
        notes: '',
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

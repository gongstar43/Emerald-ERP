import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function BackupSettings() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'backupName',
      label: { ar: 'اسم النسخة', en: 'Backup Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'backupType',
      label: { ar: 'نوع النسخ', en: 'Backup Type' },
      type: 'select' as const,
      options: [
        { value: 'full', label: { ar: 'كامل', en: 'Full Backup' } },
        { value: 'incremental', label: { ar: 'تزايدي', en: 'Incremental' } },
        { value: 'differential', label: { ar: 'تفاضلي', en: 'Differential' } },
        { value: 'database_only', label: { ar: 'قاعدة بيانات فقط', en: 'Database Only' } },
        { value: 'files_only', label: { ar: 'ملفات فقط', en: 'Files Only' } },
      ],
      required: true,
    },
    {
      name: 'frequency',
      label: { ar: 'التكرار', en: 'Frequency' },
      type: 'select' as const,
      options: [
        { value: 'hourly', label: { ar: 'كل ساعة', en: 'Hourly' } },
        { value: 'daily', label: { ar: 'يومياً', en: 'Daily' } },
        { value: 'weekly', label: { ar: 'أسبوعياً', en: 'Weekly' } },
        { value: 'monthly', label: { ar: 'شهرياً', en: 'Monthly' } },
        { value: 'manual', label: { ar: 'يدوي', en: 'Manual' } },
      ],
      required: true,
    },
    {
      name: 'scheduledTime',
      label: { ar: 'الوقت المحدد', en: 'Scheduled Time' },
      type: 'text' as const,
      required: false,
    },
    {
      name: 'retention',
      label: { ar: 'مدة الاحتفاظ', en: 'Retention Period' },
      type: 'select' as const,
      options: [
        { value: '7', label: { ar: '7 أيام', en: '7 days' } },
        { value: '30', label: { ar: '30 يوم', en: '30 days' } },
        { value: '90', label: { ar: '90 يوم', en: '90 days' } },
        { value: '180', label: { ar: '180 يوم', en: '180 days' } },
        { value: '365', label: { ar: 'سنة واحدة', en: '1 year' } },
        { value: 'forever', label: { ar: 'للأبد', en: 'Forever' } },
      ],
      required: true,
    },
    {
      name: 'storage',
      label: { ar: 'مكان التخزين', en: 'Storage Location' },
      type: 'select' as const,
      options: [
        { value: 'local', label: { ar: 'محلي', en: 'Local Server' } },
        { value: 's3', label: { ar: 'Amazon S3', en: 'Amazon S3' } },
        { value: 'google_drive', label: { ar: 'Google Drive', en: 'Google Drive' } },
        { value: 'azure', label: { ar: 'Azure Storage', en: 'Azure Storage' } },
        { value: 'dropbox', label: { ar: 'Dropbox', en: 'Dropbox' } },
      ],
      required: true,
    },
    {
      name: 'compression',
      label: { ar: 'الضغط', en: 'Compression' },
      type: 'select' as const,
      options: [
        { value: 'none', label: { ar: 'بدون ضغط', en: 'No Compression' } },
        { value: 'low', label: { ar: 'ضغط منخفض', en: 'Low' } },
        { value: 'medium', label: { ar: 'ضغط متوسط', en: 'Medium' } },
        { value: 'high', label: { ar: 'ضغط عالي', en: 'High' } },
      ],
      required: true,
    },
    {
      name: 'encryption',
      label: { ar: 'التشفير', en: 'Encryption' },
      type: 'select' as const,
      options: [
        { value: 'none', label: { ar: 'بدون تشفير', en: 'None' } },
        { value: 'aes128', label: { ar: 'AES-128', en: 'AES-128' } },
        { value: 'aes256', label: { ar: 'AES-256', en: 'AES-256' } },
      ],
      required: true,
    },
    {
      name: 'lastBackup',
      label: { ar: 'آخر نسخة', en: 'Last Backup' },
      type: 'date' as const,
      required: false,
    },
    {
      name: 'nextBackup',
      label: { ar: 'النسخة القادمة', en: 'Next Backup' },
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
      key: 'backupName',
      label: { ar: 'اسم النسخة', en: 'Backup Name' },
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'backupType',
      label: { ar: 'النوع', en: 'Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          full: { ar: 'كامل', en: 'Full', color: 'bg-purple-100 text-purple-800', icon: '💾' },
          incremental: { ar: 'تزايدي', en: 'Incremental', color: 'bg-blue-100 text-blue-800', icon: '📊' },
          differential: { ar: 'تفاضلي', en: 'Differential', color: 'bg-green-100 text-green-800', icon: '📈' },
          database_only: { ar: 'قاعدة بيانات', en: 'DB Only', color: 'bg-orange-100 text-orange-800', icon: '🗄️' },
          files_only: { ar: 'ملفات', en: 'Files', color: 'bg-cyan-100 text-cyan-800', icon: '📁' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {typeMap[value]?.icon} {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'frequency',
      label: { ar: 'التكرار', en: 'Frequency' },
      render: (value: string) => {
        const freqMap: Record<string, any> = {
          hourly: { ar: 'ساعي', en: 'Hourly', icon: '⏱️' },
          daily: { ar: 'يومي', en: 'Daily', icon: '📅' },
          weekly: { ar: 'أسبوعي', en: 'Weekly', icon: '🗓️' },
          monthly: { ar: 'شهري', en: 'Monthly', icon: '📆' },
          manual: { ar: 'يدوي', en: 'Manual', icon: '✋' },
        };
        return (
          <span className="text-sm">
            {freqMap[value]?.icon} {locale === 'ar' ? freqMap[value]?.ar : freqMap[value]?.en}
          </span>
        );
      },
    },
    {
      key: 'storage',
      label: { ar: 'التخزين', en: 'Storage' },
      render: (value: string) => {
        const storageMap: Record<string, any> = {
          local: { label: { ar: 'محلي', en: 'Local' }, icon: '🖥️' },
          s3: { label: { ar: 'S3', en: 'S3' }, icon: '☁️' },
          google_drive: { label: { ar: 'Google', en: 'Google' }, icon: '📁' },
          azure: { label: { ar: 'Azure', en: 'Azure' }, icon: '☁️' },
          dropbox: { label: { ar: 'Dropbox', en: 'Dropbox' }, icon: '📦' },
        };
        return (
          <Badge variant="outline">
            {storageMap[value]?.icon} {locale === 'ar' ? storageMap[value]?.label.ar : storageMap[value]?.label.en}
          </Badge>
        );
      },
    },
    {
      key: 'retention',
      label: { ar: 'الاحتفاظ', en: 'Retention' },
      render: (value: string) => (
        <span className="text-sm">
          {value === 'forever' 
            ? (locale === 'ar' ? '∞ دائم' : '∞ Forever') 
            : `${value} ${locale === 'ar' ? 'يوم' : 'days'}`}
        </span>
      ),
    },
    {
      key: 'lastBackup',
      label: { ar: 'آخر نسخة', en: 'Last Backup' },
      render: (value: string) => {
        if (!value) return <span className="text-muted-foreground text-sm">{locale === 'ar' ? 'لم يتم' : 'Never'}</span>;
        const date = new Date(value);
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        return (
          <div className="text-sm">
            <div>{date.toLocaleDateString(locale)}</div>
            <div className="text-xs text-muted-foreground">
              {locale === 'ar' ? `منذ ${diffHours} ساعة` : `${diffHours}h ago`}
            </div>
          </div>
        );
      },
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
          {value === 'yes' ? (locale === 'ar' ? '✓ نشط' : '✓ Active') : (locale === 'ar' ? '✗ معطل' : '✗ Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      backupName: locale === 'ar' ? 'نسخ احتياطي يومي كامل' : 'Daily Full Backup',
      backupType: 'full',
      frequency: 'daily',
      scheduledTime: '02:00 AM',
      retention: '30',
      storage: 's3',
      compression: 'high',
      encryption: 'aes256',
      lastBackup: '2024-02-28',
      nextBackup: '2024-03-01',
      isActive: 'yes',
      notes: locale === 'ar' ? 'نسخة احتياطية كاملة يومية' : 'Daily full system backup',
    },
    {
      id: '2',
      backupName: locale === 'ar' ? 'نسخ تزايدي ساعي' : 'Hourly Incremental',
      backupType: 'incremental',
      frequency: 'hourly',
      scheduledTime: 'Every hour',
      retention: '7',
      storage: 'local',
      compression: 'medium',
      encryption: 'aes128',
      lastBackup: '2024-02-28',
      nextBackup: '2024-02-28',
      isActive: 'yes',
      notes: locale === 'ar' ? 'نسخ تزايدي كل ساعة' : 'Hourly incremental backup',
    },
    {
      id: '3',
      backupName: locale === 'ar' ? 'نسخ قاعدة البيانات' : 'Database Backup',
      backupType: 'database_only',
      frequency: 'daily',
      scheduledTime: '03:00 AM',
      retention: '90',
      storage: 'azure',
      compression: 'high',
      encryption: 'aes256',
      lastBackup: '2024-02-28',
      nextBackup: '2024-03-01',
      isActive: 'yes',
      notes: locale === 'ar' ? 'نسخة قاعدة البيانات فقط' : 'Database only backup',
    },
    {
      id: '4',
      backupName: locale === 'ar' ? 'نسخ أسبوعي للملفات' : 'Weekly File Backup',
      backupType: 'files_only',
      frequency: 'weekly',
      scheduledTime: 'Sunday 01:00 AM',
      retention: '365',
      storage: 'google_drive',
      compression: 'low',
      encryption: 'none',
      lastBackup: '2024-02-25',
      nextBackup: '2024-03-03',
      isActive: 'yes',
      notes: locale === 'ar' ? 'نسخ الملفات أسبوعياً' : 'Weekly file backup',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'إعدادات النسخ الاحتياطي', en: 'Backup Settings' }}
      description={{ 
        ar: 'إدارة جدولة النسخ الاحتياطي وإعداداته', 
        en: 'Manage backup scheduling and settings' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        backupName: '',
        backupType: 'full',
        frequency: 'daily',
        scheduledTime: '02:00 AM',
        retention: '30',
        storage: 'local',
        compression: 'medium',
        encryption: 'aes256',
        lastBackup: '',
        nextBackup: '',
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

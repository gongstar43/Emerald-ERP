import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../lib/i18n';
import { useSettings } from '../../lib/settings';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import {
  Settings as SettingsIcon,
  Globe,
  Bell,
  Shield,
  Database,
  Mail,
  Palette,
  Calendar,
  Clock,
  User,
  Building2,
  CreditCard,
  FileText,
  Lock,
  Eye,
  Download,
  Upload,
  Save,
  RefreshCw,
  Check,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

const translations = {
  ar: {
    settings: 'الإعدادات',
    systemSettings: 'إعدادات النظام',
    settingsDescription: 'إدارة وتخصيص إعدادات النظام الشامل',
    general: 'عام',
    language: 'اللغة واللغات الإقليمية',
    security: 'الأمان',
    notifications: 'الإشعارات',
    appearance: 'المظهر',
    backup: 'النسخ الاحتياطي',
    email: 'البريد الإلكتروني',
    company: 'معلومات الشركة',
    
    // General Settings
    companyName: 'اسم الشركة',
    companyNamePlaceholder: 'أدخل اسم الشركة',
    companyEmail: 'بريد الشركة الإلكتروني',
    companyPhone: 'هاتف الشركة',
    companyAddress: 'عنوان الشركة',
    companyWebsite: 'موقع الشركة الإلكتروني',
    companyLogo: 'شعار الشركة',
    taxNumber: 'الرقم الضريبي',
    registrationNumber: 'رقم السجل التجاري',
    fiscalYearStart: 'بداية السنة المالية',
    fiscalYearEnd: 'نهاية السنة المالية',
    baseCurrency: 'العملة الأساسية',
    
    // Language Settings
    systemLanguage: 'لغة النظام',
    dateFormat: 'تنسيق التاريخ',
    timeFormat: 'تنسيق الوقت',
    timezone: 'المنطقة الزمنية',
    numberFormat: 'تنسيق الأرقام',
    rtlSupport: 'دعم الكتابة من اليمين لليسار',
    
    // Security Settings
    twoFactorAuth: 'المصادقة الثنائية',
    passwordPolicy: 'سياسة كلمات المرور',
    sessionTimeout: 'مهلة الجلسة (بالدقائق)',
    loginAttempts: 'عدد محاولات تسجيل الدخول المسموحة',
    ipWhitelist: 'القائمة البيضاء لعناوين IP',
    enableAuditLog: 'تفعيل سجل التدقيق',
    dataEncryption: 'تشفير البيانات',
    securityLevel: 'مستوى الأمان',
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    
    // Notification Settings
    emailNotifications: 'إشعارات البريد الإلكتروني',
    pushNotifications: 'الإشعارات الفورية',
    smsNotifications: 'إشعارات الرسائل النصية',
    notifyNewInvoice: 'إشعار عند فاتورة جديدة',
    notifyPaymentReceived: 'إشعار عند استلام دفعة',
    notifyLowStock: 'إشعار عند انخفاض المخزون',
    notifyApprovalRequired: 'إشعار عند الحاجة للموافقة',
    notifySystemUpdates: 'إشعار عند تحديثات النظام',
    dailyReport: 'تقرير يومي',
    weeklyReport: 'تقرير أسبوعي',
    monthlyReport: 'تقرير شهري',
    
    // Appearance Settings
    theme: 'السمة',
    light: 'فاتح',
    dark: 'داكن',
    auto: 'تلقائي',
    colorScheme: 'نظام الألوان',
    primaryColor: 'اللون الأساسي',
    accentColor: 'لون التمييز',
    fontSize: 'حجم الخط',
    small: 'صغير',
    normal: 'عادي',
    large: 'كبير',
    compactMode: 'الوضع المضغوط',
    showAnimations: 'إظهار الحركات',
    
    // Backup Settings
    autoBackup: 'النسخ الاحتياطي التلقائي',
    backupFrequency: 'تكرار النسخ الاحتياطي',
    daily: 'يومي',
    weekly: 'أسبوعي',
    monthly: 'شهري',
    backupLocation: 'موقع النسخ الاحتياطي',
    lastBackup: 'آخر نسخة احتياطية',
    backupNow: 'إنشاء نسخة احتياطية الآن',
    restoreBackup: 'استعادة من نسخة احتياطية',
    backupSize: 'حجم النسخة الاحتياطية',
    
    // Email Settings
    smtpServer: 'خادم SMTP',
    smtpPort: 'منفذ SMTP',
    smtpUsername: 'اسم مستخدم SMTP',
    smtpPassword: 'كلمة مرور SMTP',
    senderEmail: 'البريد المرسل',
    senderName: 'اسم المرسل',
    useSSL: 'استخدام SSL',
    useTLS: 'استخدام TLS',
    testEmailConnection: 'اختبار الاتصال',
    
    // Actions
    save: 'حفظ التغييرات',
    cancel: 'إلغاء',
    reset: 'إعادة تعيين',
    apply: 'تطبيق',
    export: 'تصدير',
    import: 'استيراد',
    
    // Messages
    settingsSaved: 'تم حفظ الإعدادات بنجاح',
    settingsError: 'حدث خطأ أثناء حفظ الإعدادات',
    backupCreated: 'تم إنشاء النسخة الاحتياطية بنجاح',
    backupRestored: 'تم استعادة النسخة الاحتياطية بنجاح',
    emailTestSent: 'تم إرسال بريد الاختبار بنجاح',
  },
  en: {
    settings: 'Settings',
    systemSettings: 'System Settings',
    settingsDescription: 'Manage and customize system-wide settings',
    general: 'General',
    language: 'Language & Regional',
    security: 'Security',
    notifications: 'Notifications',
    appearance: 'Appearance',
    backup: 'Backup & Restore',
    email: 'Email Configuration',
    company: 'Company Information',
    
    // General Settings
    companyName: 'Company Name',
    companyNamePlaceholder: 'Enter company name',
    companyEmail: 'Company Email',
    companyPhone: 'Company Phone',
    companyAddress: 'Company Address',
    companyWebsite: 'Company Website',
    companyLogo: 'Company Logo',
    taxNumber: 'Tax Number',
    registrationNumber: 'Registration Number',
    fiscalYearStart: 'Fiscal Year Start',
    fiscalYearEnd: 'Fiscal Year End',
    baseCurrency: 'Base Currency',
    
    // Language Settings
    systemLanguage: 'System Language',
    dateFormat: 'Date Format',
    timeFormat: 'Time Format',
    timezone: 'Timezone',
    numberFormat: 'Number Format',
    rtlSupport: 'RTL Support',
    
    // Security Settings
    twoFactorAuth: 'Two-Factor Authentication',
    passwordPolicy: 'Password Policy',
    sessionTimeout: 'Session Timeout (minutes)',
    loginAttempts: 'Max Login Attempts',
    ipWhitelist: 'IP Whitelist',
    enableAuditLog: 'Enable Audit Log',
    dataEncryption: 'Data Encryption',
    securityLevel: 'Security Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Notification Settings
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    smsNotifications: 'SMS Notifications',
    notifyNewInvoice: 'Notify on New Invoice',
    notifyPaymentReceived: 'Notify on Payment Received',
    notifyLowStock: 'Notify on Low Stock',
    notifyApprovalRequired: 'Notify on Approval Required',
    notifySystemUpdates: 'Notify on System Updates',
    dailyReport: 'Daily Report',
    weeklyReport: 'Weekly Report',
    monthlyReport: 'Monthly Report',
    
    // Appearance Settings
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    colorScheme: 'Color Scheme',
    primaryColor: 'Primary Color',
    accentColor: 'Accent Color',
    fontSize: 'Font Size',
    small: 'Small',
    normal: 'Normal',
    large: 'Large',
    compactMode: 'Compact Mode',
    showAnimations: 'Show Animations',
    
    // Backup Settings
    autoBackup: 'Auto Backup',
    backupFrequency: 'Backup Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    backupLocation: 'Backup Location',
    lastBackup: 'Last Backup',
    backupNow: 'Backup Now',
    restoreBackup: 'Restore Backup',
    backupSize: 'Backup Size',
    
    // Email Settings
    smtpServer: 'SMTP Server',
    smtpPort: 'SMTP Port',
    smtpUsername: 'SMTP Username',
    smtpPassword: 'SMTP Password',
    senderEmail: 'Sender Email',
    senderName: 'Sender Name',
    useSSL: 'Use SSL',
    useTLS: 'Use TLS',
    testEmailConnection: 'Test Connection',
    
    // Actions
    save: 'Save Changes',
    cancel: 'Cancel',
    reset: 'Reset',
    apply: 'Apply',
    export: 'Export',
    import: 'Import',
    
    // Messages
    settingsSaved: 'Settings saved successfully',
    settingsError: 'Error saving settings',
    backupCreated: 'Backup created successfully',
    backupRestored: 'Backup restored successfully',
    emailTestSent: 'Test email sent successfully',
  },
};

export default function Settings() {
  const { locale, setLocale, isRTL } = useLanguage();
  const { 
    settings, 
    updateCompanySettings, 
    updateLanguageSettings,
    updateSecuritySettings,
    updateNotificationSettings,
    updateAppearanceSettings,
    updateBackupSettings,
    updateEmailSettings,
    getCurrencySymbol,
  } = useSettings();
  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  // General Settings - initialize from context
  const [companyName, setCompanyName] = useState(settings.company.companyName);
  const [companyEmail, setCompanyEmail] = useState(settings.company.companyEmail);
  const [companyPhone, setCompanyPhone] = useState(settings.company.companyPhone);
  const [companyAddress, setCompanyAddress] = useState(settings.company.companyAddress);
  const [registrationNumber, setRegistrationNumber] = useState(settings.company.registrationNumber);
  const [baseCurrency, setBaseCurrency] = useState(settings.company.baseCurrency);
  const [taxNumber, setTaxNumber] = useState(settings.company.taxNumber);

  // Language Settings - initialize from context
  const [systemLanguage, setSystemLanguage] = useState(locale);
  const [dateFormat, setDateFormat] = useState(settings.language.dateFormat);
  const [timeFormat, setTimeFormat] = useState(settings.language.timeFormat);
  const [timezone, setTimezone] = useState(settings.language.timezone);

  // Security Settings - initialize from context
  const [twoFactorAuth, setTwoFactorAuth] = useState(settings.security.twoFactorAuth);
  const [sessionTimeout, setSessionTimeout] = useState(settings.security.sessionTimeout);
  const [loginAttempts, setLoginAttempts] = useState(settings.security.loginAttempts);
  const [enableAuditLog, setEnableAuditLog] = useState(settings.security.enableAuditLog);
  const [dataEncryption, setDataEncryption] = useState(settings.security.dataEncryption);

  // Notification Settings - initialize from context
  const [emailNotifications, setEmailNotifications] = useState(settings.notifications.emailNotifications);
  const [pushNotifications, setPushNotifications] = useState(settings.notifications.pushNotifications);
  const [notifyNewInvoice, setNotifyNewInvoice] = useState(settings.notifications.notifyNewInvoice);
  const [notifyPaymentReceived, setNotifyPaymentReceived] = useState(settings.notifications.notifyPaymentReceived);
  const [notifyLowStock, setNotifyLowStock] = useState(settings.notifications.notifyLowStock);

  // Appearance Settings - initialize from context
  const [theme, setTheme] = useState(settings.appearance.theme);
  const [fontSize, setFontSize] = useState(settings.appearance.fontSize);
  const [compactMode, setCompactMode] = useState(settings.appearance.compactMode);
  const [showAnimations, setShowAnimations] = useState(settings.appearance.showAnimations);

  // Backup Settings - initialize from context
  const [autoBackup, setAutoBackup] = useState(settings.backup.autoBackup);
  const [backupFrequency, setBackupFrequency] = useState(settings.backup.backupFrequency);

  // Email Settings - initialize from context
  const [smtpServer, setSmtpServer] = useState(settings.email.smtpServer);
  const [smtpPort, setSmtpPort] = useState(settings.email.smtpPort);
  const [smtpUsername, setSmtpUsername] = useState(settings.email.smtpUsername);
  const [useSSL, setUseSSL] = useState(settings.email.useSSL);
  const [useTLS, setUseTLS] = useState(settings.email.useTLS);

  // Load settings from context on mount
  useEffect(() => {
    setCompanyName(settings.company.companyName);
    setCompanyEmail(settings.company.companyEmail);
    setCompanyPhone(settings.company.companyPhone);
    setCompanyAddress(settings.company.companyAddress);
    setRegistrationNumber(settings.company.registrationNumber);
    setBaseCurrency(settings.company.baseCurrency);
    setTaxNumber(settings.company.taxNumber);
    setDateFormat(settings.language.dateFormat);
    setTimeFormat(settings.language.timeFormat);
    setTimezone(settings.language.timezone);
  }, [settings]);

  const handleSave = () => {
    // Update company settings
    updateCompanySettings({
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
      registrationNumber,
      baseCurrency,
      taxNumber,
    });

    // Update language settings
    updateLanguageSettings({
      dateFormat,
      timeFormat,
      timezone,
    });

    // Update security settings
    updateSecuritySettings({
      twoFactorAuth,
      sessionTimeout,
      loginAttempts,
      enableAuditLog,
      dataEncryption,
    });

    // Update notification settings
    updateNotificationSettings({
      emailNotifications,
      pushNotifications,
      notifyNewInvoice,
      notifyPaymentReceived,
      notifyLowStock,
    });

    // Update appearance settings
    updateAppearanceSettings({
      theme,
      fontSize,
      compactMode,
      showAnimations,
    });

    // Update backup settings
    updateBackupSettings({
      autoBackup,
      backupFrequency,
    });

    // Update email settings
    updateEmailSettings({
      smtpServer,
      smtpPort,
      smtpUsername,
      useSSL,
      useTLS,
    });

    // Update language
    if (systemLanguage !== locale) {
      setLocale(systemLanguage as 'ar' | 'en');
    }

    toast.success(t('settingsSaved'));
    setHasChanges(false);
  };

  const handleBackupNow = () => {
    toast.success(t('backupCreated'));
  };

  const handleTestEmail = () => {
    toast.success(t('emailTestSent'));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            {t('systemSettings')}
          </h1>
          <p className="text-gray-600 mt-1">{t('settingsDescription')}</p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {t('save')}
            </Button>
          )}
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {t('general')}
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {t('language')}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('security')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t('notifications')}
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {t('appearance')}
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            {t('backup')}
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            {t('email')}
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t('company')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'معلومات أساسية عن شركتك'
                  : 'Basic information about your company'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">{t('companyName')}</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder={t('companyNamePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">{t('companyEmail')}</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={companyEmail}
                    onChange={(e) => {
                      setCompanyEmail(e.target.value);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">{t('companyPhone')}</Label>
                  <Input
                    id="companyPhone"
                    value={companyPhone}
                    onChange={(e) => {
                      setCompanyPhone(e.target.value);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxNumber">{t('taxNumber')}</Label>
                  <Input
                    id="taxNumber"
                    value={taxNumber}
                    onChange={(e) => {
                      setTaxNumber(e.target.value);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">{t('registrationNumber')}</Label>
                  <Input
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={(e) => {
                      setRegistrationNumber(e.target.value);
                      setHasChanges(true);
                    }}
                    placeholder="CR-123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baseCurrency">{t('baseCurrency')}</Label>
                  <Select
                    value={baseCurrency}
                    onValueChange={(value) => {
                      setBaseCurrency(value);
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IQD">🇮🇶 IQD - Iraqi Dinar (دينار عراقي)</SelectItem>
                      <SelectItem value="SAR">🇸🇦 SAR - Saudi Riyal (ريال سعودي)</SelectItem>
                      <SelectItem value="AED">🇦🇪 AED - UAE Dirham (درهم إماراتي)</SelectItem>
                      <SelectItem value="EGP">🇪🇬 EGP - Egyptian Pound (جنيه مصري)</SelectItem>
                      <SelectItem value="JOD">🇯🇴 JOD - Jordanian Dinar (دينار أردني)</SelectItem>
                      <SelectItem value="KWD">🇰🇼 KWD - Kuwaiti Dinar (دينار كويتي)</SelectItem>
                      <SelectItem value="BHD">🇧🇭 BHD - Bahraini Dinar (دينار بحريني)</SelectItem>
                      <SelectItem value="OMR">🇴🇲 OMR - Omani Rial (ريال عماني)</SelectItem>
                      <SelectItem value="QAR">🇶🇦 QAR - Qatari Riyal (ريال قطري)</SelectItem>
                      <SelectItem value="USD">🇺🇸 USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">🇪🇺 EUR - Euro</SelectItem>
                      <SelectItem value="GBP">🇬🇧 GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress">{t('companyAddress')}</Label>
                <Textarea
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
                    setHasChanges(true);
                  }}
                  placeholder={
                    locale === 'ar' ? 'العنوان الكامل للشركة' : 'Full company address'
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Settings */}
        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('language')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'إعدادات اللغة والتنسيقات الإقليمية'
                  : 'Language and regional format settings'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemLanguage">{t('systemLanguage')}</Label>
                  <Select
                    value={systemLanguage}
                    onValueChange={(value) => {
                      setSystemLanguage(value);
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      <SelectItem value="en">English (الإنجليزية)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">{t('timezone')}</Label>
                  <Select 
                    value={timezone} 
                    onValueChange={(value) => {
                      setTimezone(value);
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">Asia/Riyadh (GMT+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GMT+4)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">
                        America/New_York (GMT-5)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">{t('dateFormat')}</Label>
                  <Select 
                    value={dateFormat} 
                    onValueChange={(value) => {
                      setDateFormat(value);
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">{t('timeFormat')}</Label>
                  <Select 
                    value={timeFormat} 
                    onValueChange={(value) => {
                      setTimeFormat(value);
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('security')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'إعدادات الأمان وحماية البيانات'
                  : 'Security and data protection settings'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('twoFactorAuth')}</Label>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar'
                      ? 'تفعيل المصادقة الثنائية لحماية إضافية'
                      : 'Enable two-factor authentication for extra security'}
                  </p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('enableAuditLog')}</Label>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar'
                      ? 'تسجيل جميع العمليات في سجل التدقيق'
                      : 'Log all operations in audit trail'}
                  </p>
                </div>
                <Switch checked={enableAuditLog} onCheckedChange={setEnableAuditLog} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('dataEncryption')}</Label>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar'
                      ? 'تشفير البيانات الحساسة في قاعدة البيانات'
                      : 'Encrypt sensitive data in database'}
                  </p>
                </div>
                <Switch checked={dataEncryption} onCheckedChange={setDataEncryption} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">{t('sessionTimeout')}</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">{t('loginAttempts')}</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={loginAttempts}
                    onChange={(e) => setLoginAttempts(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityLevel">{t('securityLevel')}</Label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('low')}</SelectItem>
                    <SelectItem value="medium">{t('medium')}</SelectItem>
                    <SelectItem value="high">{t('high')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t('notifications')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'إدارة تفضيلات الإشعارات'
                  : 'Manage notification preferences'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-4">
                  {locale === 'ar' ? 'قنوات الإشعارات' : 'Notification Channels'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('emailNotifications')}</Label>
                      <p className="text-sm text-gray-500">
                        {locale === 'ar'
                          ? 'استلام إشعارات عبر البريد الإلكتروني'
                          : 'Receive notifications via email'}
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('pushNotifications')}</Label>
                      <p className="text-sm text-gray-500">
                        {locale === 'ar'
                          ? 'استلام إشعارات فورية في المتصفح'
                          : 'Receive push notifications in browser'}
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">
                  {locale === 'ar' ? 'أنواع الإشعارات' : 'Notification Types'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t('notifyNewInvoice')}</Label>
                    <Switch checked={notifyNewInvoice} onCheckedChange={setNotifyNewInvoice} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('notifyPaymentReceived')}</Label>
                    <Switch
                      checked={notifyPaymentReceived}
                      onCheckedChange={setNotifyPaymentReceived}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('notifyLowStock')}</Label>
                    <Switch checked={notifyLowStock} onCheckedChange={setNotifyLowStock} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('notifyApprovalRequired')}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('notifySystemUpdates')}</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">
                  {locale === 'ar' ? 'التقارير الدورية' : 'Periodic Reports'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{t('dailyReport')}</Label>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('weeklyReport')}</Label>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>{t('monthlyReport')}</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                {t('appearance')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'تخصيص مظهر النظام' : 'Customize system appearance'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">{t('theme')}</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t('light')}</SelectItem>
                      <SelectItem value="dark">{t('dark')}</SelectItem>
                      <SelectItem value="auto">{t('auto')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize">{t('fontSize')}</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">{t('small')}</SelectItem>
                      <SelectItem value="normal">{t('normal')}</SelectItem>
                      <SelectItem value="large">{t('large')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('compactMode')}</Label>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'تقليل المسافات والهوامش' : 'Reduce spacing and margins'}
                  </p>
                </div>
                <Switch checked={compactMode} onCheckedChange={setCompactMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('showAnimations')}</Label>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'عرض الحركات والانتقالات' : 'Show transitions and animations'}
                  </p>
                </div>
                <Switch checked={showAnimations} onCheckedChange={setShowAnimations} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {t('backup')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'إدارة النسخ الاحتياطي واستعادة البيانات'
                  : 'Manage backups and data restoration'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('autoBackup')}</Label>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar'
                      ? 'إنشاء نسخ احتياطية تلقائية بشكل دوري'
                      : 'Create automatic backups periodically'}
                  </p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>

              {autoBackup && (
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">{t('backupFrequency')}</Label>
                  <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">{t('daily')}</SelectItem>
                      <SelectItem value="weekly">{t('weekly')}</SelectItem>
                      <SelectItem value="monthly">{t('monthly')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('lastBackup')}</span>
                  <span className="text-sm text-gray-600">
                    {locale === 'ar' ? '27 فبراير 2026، 10:00 ص' : 'Feb 27, 2026, 10:00 AM'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('backupSize')}</span>
                  <span className="text-sm text-gray-600">2.4 GB</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleBackupNow} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  {t('backupNow')}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  {t('restoreBackup')}
                </Button>
              </div>

              <div
                className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  {locale === 'ar'
                    ? 'تأكد من الاحتفاظ بنسخة احتياطية في موقع آمن خارج النظام. عملية الاستعادة ستستبدل جميع البيانات الحالية.'
                    : 'Make sure to keep a backup in a secure location outside the system. The restore process will replace all current data.'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {t('email')}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'إعدادات خادم البريد الإلكتروني'
                  : 'Email server configuration'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">{t('smtpServer')}</Label>
                  <Input
                    id="smtpServer"
                    value={smtpServer}
                    onChange={(e) => setSmtpServer(e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">{t('smtpPort')}</Label>
                  <Input
                    id="smtpPort"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    placeholder="587"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">{t('smtpUsername')}</Label>
                  <Input
                    id="smtpUsername"
                    value={smtpUsername}
                    onChange={(e) => setSmtpUsername(e.target.value)}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">{t('smtpPassword')}</Label>
                  <Input id="smtpPassword" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">{t('senderEmail')}</Label>
                  <Input id="senderEmail" type="email" placeholder="noreply@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderName">{t('senderName')}</Label>
                  <Input
                    id="senderName"
                    placeholder={locale === 'ar' ? 'اسم الشركة' : 'Company Name'}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="useSSL" checked={useSSL} onCheckedChange={setUseSSL} />
                  <Label htmlFor="useSSL">{t('useSSL')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="useTLS" checked={useTLS} onCheckedChange={setUseTLS} />
                  <Label htmlFor="useTLS">{t('useTLS')}</Label>
                </div>
              </div>

              <Button onClick={handleTestEmail} variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                {t('testEmailConnection')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button Fixed at Bottom */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleSave}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Check className="h-5 w-5 mr-2" />
            {t('save')}
          </Button>
        </div>
      )}
    </div>
  );
}
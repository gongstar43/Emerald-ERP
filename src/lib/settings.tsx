import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CompanySettings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  registrationNumber: string;
  taxNumber: string;
  baseCurrency: string;
}

interface LanguageSettings {
  dateFormat: string;
  timeFormat: string;
  timezone: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: string;
  loginAttempts: string;
  enableAuditLog: boolean;
  dataEncryption: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notifyNewInvoice: boolean;
  notifyPaymentReceived: boolean;
  notifyLowStock: boolean;
}

interface AppearanceSettings {
  theme: string;
  fontSize: string;
  compactMode: boolean;
  showAnimations: boolean;
}

interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: string;
}

interface EmailSettings {
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  useSSL: boolean;
  useTLS: boolean;
}

interface Settings {
  company: CompanySettings;
  language: LanguageSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  backup: BackupSettings;
  email: EmailSettings;
}

interface SettingsContextType {
  settings: Settings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;
  updateLanguageSettings: (settings: Partial<LanguageSettings>) => void;
  updateSecuritySettings: (settings: Partial<SecuritySettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  updateAppearanceSettings: (settings: Partial<AppearanceSettings>) => void;
  updateBackupSettings: (settings: Partial<BackupSettings>) => void;
  updateEmailSettings: (settings: Partial<EmailSettings>) => void;
  getCurrencySymbol: () => string;
  formatCurrency: (amount: number) => string;
}

const defaultSettings: Settings = {
  company: {
    companyName: 'شركة التقنية المتقدمة',
    companyEmail: 'info@company.com',
    companyPhone: '+966 11 234 5678',
    companyAddress: '',
    registrationNumber: '',
    taxNumber: '123456789',
    baseCurrency: 'SAR',
  },
  language: {
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    timezone: 'Asia/Riyadh',
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAttempts: '5',
    enableAuditLog: true,
    dataEncryption: true,
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    notifyNewInvoice: true,
    notifyPaymentReceived: true,
    notifyLowStock: true,
  },
  appearance: {
    theme: 'light',
    fontSize: 'normal',
    compactMode: false,
    showAnimations: false, // Disabled for better performance
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
  },
  email: {
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    useSSL: false,
    useTLS: true,
  },
};

const STORAGE_KEY = 'erp_system_settings';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateCompanySettings = (newSettings: Partial<CompanySettings>) => {
    setSettings((prev) => ({
      ...prev,
      company: { ...prev.company, ...newSettings },
    }));
  };

  const updateLanguageSettings = (newSettings: Partial<LanguageSettings>) => {
    setSettings((prev) => ({
      ...prev,
      language: { ...prev.language, ...newSettings },
    }));
  };

  const updateSecuritySettings = (newSettings: Partial<SecuritySettings>) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, ...newSettings },
    }));
  };

  const updateNotificationSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...newSettings },
    }));
  };

  const updateAppearanceSettings = (newSettings: Partial<AppearanceSettings>) => {
    setSettings((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, ...newSettings },
    }));
  };

  const updateBackupSettings = (newSettings: Partial<BackupSettings>) => {
    setSettings((prev) => ({
      ...prev,
      backup: { ...prev.backup, ...newSettings },
    }));
  };

  const updateEmailSettings = (newSettings: Partial<EmailSettings>) => {
    setSettings((prev) => ({
      ...prev,
      email: { ...prev.email, ...newSettings },
    }));
  };

  const getCurrencySymbol = () => {
    const currencySymbols: Record<string, string> = {
      IQD: 'د.ع',
      SAR: 'ر.س',
      USD: '$',
      EUR: '€',
      AED: 'د.إ',
      GBP: '£',
      EGP: 'ج.م',
      KWD: 'د.ك',
      BHD: 'د.ب',
      OMR: 'ر.ع',
      QAR: 'ر.ق',
      JOD: 'د.أ',
    };
    return currencySymbols[settings.company.baseCurrency] || settings.company.baseCurrency;
  };

  const formatCurrency = (amount: number) => {
    const symbol = getCurrencySymbol();
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    
    // For Arabic currencies, put symbol after amount
    if (['IQD', 'SAR', 'AED', 'EGP', 'KWD', 'BHD', 'OMR', 'QAR', 'JOD'].includes(settings.company.baseCurrency)) {
      return `${formatted} ${symbol}`;
    }
    // For western currencies, put symbol before amount
    return `${symbol}${formatted}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateCompanySettings,
        updateLanguageSettings,
        updateSecuritySettings,
        updateNotificationSettings,
        updateAppearanceSettings,
        updateBackupSettings,
        updateEmailSettings,
        getCurrencySymbol,
        formatCurrency,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
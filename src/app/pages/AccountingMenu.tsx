import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  FileText, 
  BookOpen, 
  Receipt, 
  CreditCard,
  Shield,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AccountingMenu() {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();

  const modules = [
    {
      title: t('accounts'),
      description: locale === 'ar' ? 'إدارة دليل الحسابات' : 'Manage chart of accounts',
      icon: BookOpen,
      path: '/accounting/accounts',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: t('journal'),
      description: locale === 'ar' ? 'القيود اليومية' : 'Journal entries',
      icon: FileText,
      path: '/accounting/journal',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: t('invoices'),
      description: locale === 'ar' ? 'فواتير البيع والشراء' : 'Sales and purchase invoices',
      icon: FileText,
      path: '/accounting/invoices',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      title: t('receipts'),
      description: locale === 'ar' ? 'سندات القبض' : 'Receipt vouchers',
      icon: Receipt,
      path: '/accounting/receipts',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      title: t('payments'),
      description: locale === 'ar' ? 'سندات الصرف' : 'Payment vouchers',
      icon: CreditCard,
      path: '/accounting/payments',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
    {
      title: t('audit'),
      description: locale === 'ar' ? 'سجل التدقيق' : 'Audit log',
      icon: Shield,
      path: '/accounting/audit',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900',
    },
    {
      title: t('reports'),
      description: locale === 'ar' ? 'التقارير المالية' : 'Financial reports',
      icon: BarChart3,
      path: '/accounting/reports',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100 dark:bg-teal-900',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('accounting')}</h1>
        <p className="text-muted-foreground mt-1">
          {locale === 'ar' ? 'إدارة جميع العمليات المحاسبية' : 'Manage all accounting operations'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(module.path)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${module.bgColor}`}>
                  <module.icon className={`h-6 w-6 ${module.color}`} />
                </div>
              </div>
              <CardTitle className="mt-4">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full">
                {locale === 'ar' ? 'فتح' : 'Open'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

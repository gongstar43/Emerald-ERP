import React, { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth';
import { useLanguage } from '../../lib/i18n';
import { useSettings } from '../../lib/settings';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import FormattedDateTime from '../components/FormattedDateTime';
import { 
  TrendingUp,
  Users,
  Package,
  BookOpen,
  ShoppingCart,
  Briefcase,
  Globe,
  Layers,
  Clock,
  TrendingDown,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  BarChart3,
  TrendingUpIcon,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const { settings, formatCurrency, getCurrencySymbol } = useSettings();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* System Settings Info Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <div>
                <div className="font-semibold text-xs text-muted-foreground">
                  {locale === 'ar' ? 'العملة' : 'Currency'}
                </div>
                <div className="font-bold text-blue-700 dark:text-blue-400">
                  {settings.company.baseCurrency} ({getCurrencySymbol()})
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <div className="font-semibold text-xs text-muted-foreground">
                  {locale === 'ar' ? 'المنطقة الزمنية' : 'Timezone'}
                </div>
                <div className="font-bold text-green-700 dark:text-green-400">
                  {settings.language.timezone}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <div>
                <div className="font-semibold text-xs text-muted-foreground">
                  {locale === 'ar' ? 'التاريخ' : 'Date Format'}
                </div>
                <div className="font-bold text-purple-700 dark:text-purple-400">
                  {settings.language.dateFormat}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <div>
                <div className="font-semibold text-xs text-muted-foreground">
                  {locale === 'ar' ? 'الوقت الحالي' : 'Current Time'}
                </div>
                <div className="font-bold text-orange-700 dark:text-orange-400">
                  <FormattedDateTime date={currentTime} showTime />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/sales/invoices')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(45231.89)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +20.1% {locale === 'ar' ? 'عن الشهر الماضي' : 'from last month'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/purchases/invoices')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'المشتريات' : 'Purchases'}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(23450.00)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-red-600" />
              -12.5% {locale === 'ar' ? 'عن الشهر الماضي' : 'from last month'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/sales/customers')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'العملاء' : 'Customers'}
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              +180 {locale === 'ar' ? 'هذا الشهر' : 'this month'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/projects')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
            </CardTitle>
            <Briefcase className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 {locale === 'ar' ? 'قيد التنفيذ' : 'in progress'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Modules Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            {locale === 'ar' ? 'نظرة عامة على المكونات' : 'System Modules Overview'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' 
              ? '165+ صفحة | 240+ API | 6 معايير دولية'
              : '165+ Pages | 240+ APIs | 6 International Standards'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Accounting */}
            <div 
              className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-blue-500"
              onClick={() => navigate('/accounting/accounts')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{locale === 'ar' ? 'المحاسبة' : 'Accounting'}</div>
                  <Badge variant="outline" className="text-xs">IFRS/IAS</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? '180+ حساب محاسبي' : '180+ Accounts'}
              </div>
            </div>

            {/* Sales */}
            <div 
              className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-green-500"
              onClick={() => navigate('/sales/customers')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{locale === 'ar' ? 'المبيعات' : 'Sales'}</div>
                  <Badge variant="outline" className="text-xs">IFRS 15</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? '12 صفحة كاملة' : '12 Complete Pages'}
              </div>
            </div>

            {/* Purchases */}
            <div 
              className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-purple-500"
              onClick={() => navigate('/purchases/suppliers')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{locale === 'ar' ? 'المشتريات' : 'Purchases'}</div>
                  <Badge variant="outline" className="text-xs">ISO 9001</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? '11 صفحة كاملة' : '11 Complete Pages'}
              </div>
            </div>

            {/* Projects */}
            <div 
              className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-orange-500"
              onClick={() => navigate('/projects')}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{locale === 'ar' ? 'المشاريع' : 'Projects'}</div>
                  <Badge variant="outline" className="text-xs">PMBOK 7</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground">
                {locale === 'ar' ? 'EVM + Agile' : 'EVM + Agile'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {locale === 'ar' ? 'الإيرادات والمصروفات' : 'Revenue & Expenses'}
            </CardTitle>
            <CardDescription>
              {locale === 'ar' ? 'آخر 30 يوم' : 'Last 30 days'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{locale === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}</span>
                <span className="font-bold text-green-600">{formatCurrency(67850.50)}</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{locale === 'ar' ? 'إجمالي المصروفات' : 'Total Expenses'}</span>
                <span className="font-bold text-red-600">{formatCurrency(34200.00)}</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{locale === 'ar' ? 'صافي الربح' : 'Net Profit'}</span>
                <span className="font-bold text-lg text-green-600">{formatCurrency(33650.50)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'ar' ? 'هامش ربح 49.6%' : '49.6% profit margin'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {locale === 'ar' ? 'الفواتير والمستندات' : 'Invoices & Documents'}
            </CardTitle>
            <CardDescription>
              {locale === 'ar' ? 'الحالة الحالية' : 'Current Status'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'مدفوعة' : 'Paid'}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">45</div>
                <div className="text-xs text-muted-foreground">{formatCurrency(45231.89)}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'معلقة' : 'Pending'}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">12</div>
                <div className="text-xs text-muted-foreground">{formatCurrency(15670.00)}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">{locale === 'ar' ? 'متأخرة' : 'Overdue'}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">3</div>
                <div className="text-xs text-muted-foreground">{formatCurrency(4520.00)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {locale === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'الوصول السريع للعمليات المهمة' : 'Fast access to important operations'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <button
              onClick={() => navigate('/sales/invoices/new')}
              className="p-4 border rounded-lg hover:shadow-md transition-all text-left hover:border-green-500"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div className="font-semibold text-sm">{locale === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/purchases/orders/new')}
              className="p-4 border rounded-lg hover:shadow-md transition-all text-left hover:border-blue-500"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div className="font-semibold text-sm">{locale === 'ar' ? 'طلب شراء' : 'Purchase Order'}</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/accounting/journal-entries/new')}
              className="p-4 border rounded-lg hover:shadow-md transition-all text-left hover:border-purple-500"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <div className="font-semibold text-sm">{locale === 'ar' ? 'قيد يومية' : 'Journal Entry'}</div>
              </div>
            </button>

            <button
              onClick={() => navigate('/projects/new')}
              className="p-4 border rounded-lg hover:shadow-md transition-all text-left hover:border-orange-500"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                </div>
                <div className="font-semibold text-sm">{locale === 'ar' ? 'مشروع جديد' : 'New Project'}</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
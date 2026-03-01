import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Download,
  Printer,
  FileSpreadsheet,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

interface TrialBalanceItem {
  accountCode: string;
  accountName: string;
  accountNameEn: string;
  accountType: string;
  debit: number;
  credit: number;
  balance: number;
  level: number;
}

export default function TrialBalance() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [period, setPeriod] = useState('current');
  const [accountLevel, setAccountLevel] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock data - في الإنتاج سيتم جلبها من API
  const trialBalanceData: TrialBalanceItem[] = [
    // الأصول
    { accountCode: '1', accountName: 'الأصول', accountNameEn: 'Assets', accountType: 'Assets', debit: 0, credit: 0, balance: 8500000, level: 1 },
    { accountCode: '1-1', accountName: 'الأصول المتداولة', accountNameEn: 'Current Assets', accountType: 'Assets', debit: 0, credit: 0, balance: 3500000, level: 2 },
    { accountCode: '1-1-1', accountName: 'النقدية وما يعادلها', accountNameEn: 'Cash and Equivalents', accountType: 'Assets', debit: 1500000, credit: 200000, balance: 1300000, level: 3 },
    { accountCode: '1-1-2', accountName: 'المدينون', accountNameEn: 'Accounts Receivable', accountType: 'Assets', debit: 1800000, credit: 150000, balance: 1650000, level: 3 },
    { accountCode: '1-1-3', accountName: 'المخزون', accountNameEn: 'Inventory', accountType: 'Assets', debit: 550000, credit: 0, balance: 550000, level: 3 },
    { accountCode: '1-2', accountName: 'الأصول الثابتة', accountNameEn: 'Fixed Assets', accountType: 'Assets', debit: 0, credit: 0, balance: 5000000, level: 2 },
    { accountCode: '1-2-1', accountName: 'الأراضي والمباني', accountNameEn: 'Land and Buildings', accountType: 'Assets', debit: 3000000, credit: 0, balance: 3000000, level: 3 },
    { accountCode: '1-2-2', accountName: 'الآلات والمعدات', accountNameEn: 'Machinery', accountType: 'Assets', debit: 1500000, credit: 0, balance: 1500000, level: 3 },
    { accountCode: '1-2-3', accountName: 'مجمع الإهلاك', accountNameEn: 'Accumulated Depreciation', accountType: 'Assets', debit: 0, credit: 500000, balance: -500000, level: 3 },
    
    // الخصوم
    { accountCode: '2', accountName: 'الخصوم', accountNameEn: 'Liabilities', accountType: 'Liabilities', debit: 0, credit: 0, balance: 3200000, level: 1 },
    { accountCode: '2-1', accountName: 'الخصوم المتداولة', accountNameEn: 'Current Liabilities', accountType: 'Liabilities', debit: 0, credit: 0, balance: 1800000, level: 2 },
    { accountCode: '2-1-1', accountName: 'الدائنون', accountNameEn: 'Accounts Payable', accountType: 'Liabilities', debit: 100000, credit: 1200000, balance: 1100000, level: 3 },
    { accountCode: '2-1-2', accountName: 'القروض قصيرة الأجل', accountNameEn: 'Short-term Loans', accountType: 'Liabilities', debit: 0, credit: 700000, balance: 700000, level: 3 },
    { accountCode: '2-2', accountName: 'الخصوم طويلة الأجل', accountNameEn: 'Long-term Liabilities', accountType: 'Liabilities', debit: 0, credit: 0, balance: 1400000, level: 2 },
    { accountCode: '2-2-1', accountName: 'القروض طويلة الأجل', accountNameEn: 'Long-term Loans', accountType: 'Liabilities', debit: 0, credit: 1400000, balance: 1400000, level: 3 },
    
    // حقوق الملكية
    { accountCode: '3', accountName: 'حقوق الملكية', accountNameEn: 'Equity', accountType: 'Equity', debit: 0, credit: 0, balance: 5300000, level: 1 },
    { accountCode: '3-1', accountName: 'رأس المال', accountNameEn: 'Capital', accountType: 'Equity', debit: 0, credit: 5000000, balance: 5000000, level: 2 },
    { accountCode: '3-2', accountName: 'الأرباح المحتجزة', accountNameEn: 'Retained Earnings', accountType: 'Equity', debit: 0, credit: 300000, balance: 300000, level: 2 },
    
    // الإيرادات
    { accountCode: '4', accountName: 'الإيرادات', accountNameEn: 'Revenue', accountType: 'Revenue', debit: 0, credit: 0, balance: 4500000, level: 1 },
    { accountCode: '4-1', accountName: 'إيرادات المبيعات', accountNameEn: 'Sales Revenue', accountType: 'Revenue', debit: 150000, credit: 4350000, balance: 4200000, level: 2 },
    { accountCode: '4-2', accountName: 'إيرادات أخرى', accountNameEn: 'Other Revenue', accountType: 'Revenue', debit: 0, credit: 300000, balance: 300000, level: 2 },
    
    // المصروفات
    { accountCode: '5', accountName: 'المصروفات', accountNameEn: 'Expenses', accountType: 'Expenses', debit: 0, credit: 0, balance: 3200000, level: 1 },
    { accountCode: '5-1', accountName: 'تكلفة المبيعات', accountNameEn: 'Cost of Sales', accountType: 'Expenses', debit: 2000000, credit: 0, balance: 2000000, level: 2 },
    { accountCode: '5-2', accountName: 'المصروفات الإدارية', accountNameEn: 'Admin Expenses', accountType: 'Expenses', debit: 800000, credit: 0, balance: 800000, level: 2 },
    { accountCode: '5-3', accountName: 'المصروفات التشغيلية', accountNameEn: 'Operating Expenses', accountType: 'Expenses', debit: 400000, credit: 0, balance: 400000, level: 2 },
  ];

  const totalDebit = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);
  const isBalanced = totalDebit === totalCredit;

  const filteredData = trialBalanceData.filter(item => {
    if (accountLevel === 'all') return true;
    return item.level === parseInt(accountLevel);
  });

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(locale === 'ar' ? 'تم تحديث البيانات' : 'Data refreshed');
    }, 1000);
  };

  const handleExport = (format: 'pdf' | 'excel' | 'print') => {
    toast.success(
      locale === 'ar' 
        ? `جاري التصدير بصيغة ${format}...` 
        : `Exporting as ${format}...`
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'ميزان المراجعة' : 'Trial Balance'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'عرض وتحليل ميزان المراجعة' : 'View and analyze trial balance'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {locale === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
          <Button variant="outline" onClick={() => handleExport('print')}>
            <Printer className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'طباعة' : 'Print'}
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'Excel' : 'Excel'}
          </Button>
          <Button onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'PDF' : 'PDF'}
          </Button>
        </div>
      </div>

      {/* Balance Status */}
      <Card className={isBalanced ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isBalanced ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-lg font-bold text-green-600">
                      {locale === 'ar' ? 'الميزان متوازن' : 'Balance is Correct'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'ar' ? 'إجمالي المدين يساوي إجمالي الدائن' : 'Total debit equals total credit'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-lg font-bold text-red-600">
                      {locale === 'ar' ? 'الميزان غير متوازن' : 'Balance is Incorrect'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'ar' ? 'يرجى مراجعة القيود المحاسبية' : 'Please review journal entries'}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-right">
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'إجمالي المدين' : 'Total Debit'}</p>
                <p className="text-xl font-bold">{formatCurrency(totalDebit)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'إجمالي الدائن' : 'Total Credit'}</p>
                <p className="text-xl font-bold">{formatCurrency(totalCredit)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label>{locale === 'ar' ? 'الفترة' : 'Period'}</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">{locale === 'ar' ? 'الفترة الحالية' : 'Current Period'}</SelectItem>
                  <SelectItem value="month">{locale === 'ar' ? 'هذا الشهر' : 'This Month'}</SelectItem>
                  <SelectItem value="quarter">{locale === 'ar' ? 'هذا الربع' : 'This Quarter'}</SelectItem>
                  <SelectItem value="year">{locale === 'ar' ? 'هذه السنة' : 'This Year'}</SelectItem>
                  <SelectItem value="custom">{locale === 'ar' ? 'فترة مخصصة' : 'Custom Period'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex-1">
              <Label>{locale === 'ar' ? 'مستوى الحساب' : 'Account Level'}</Label>
              <Select value={accountLevel} onValueChange={setAccountLevel}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'جميع المستويات' : 'All Levels'}</SelectItem>
                  <SelectItem value="1">{locale === 'ar' ? 'المستوى 1 - رئيسي' : 'Level 1 - Main'}</SelectItem>
                  <SelectItem value="2">{locale === 'ar' ? 'المستوى 2 - فرعي' : 'Level 2 - Sub'}</SelectItem>
                  <SelectItem value="3">{locale === 'ar' ? 'المستوى 3 - تفصيلي' : 'Level 3 - Detail'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trial Balance Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'ميزان المراجعة التفصيلي' : 'Detailed Trial Balance'}</CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'كما في تاريخ' : 'As of'} {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الحساب' : 'Account Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'اسم الحساب' : 'Account Name'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'المدين' : 'Debit'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الدائن' : 'Credit'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الرصيد' : 'Balance'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow 
                  key={item.accountCode}
                  className={item.level === 1 ? 'bg-muted/50 font-bold' : item.level === 2 ? 'font-semibold' : ''}
                >
                  <TableCell 
                    className="font-mono"
                    style={{ paddingLeft: `${item.level * 1.5}rem` }}
                  >
                    {item.accountCode}
                  </TableCell>
                  <TableCell>
                    {locale === 'ar' ? item.accountName : item.accountNameEn}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(Math.abs(item.balance))}
                    {item.balance < 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {locale === 'ar' ? 'دائن' : 'Cr'}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-primary text-primary-foreground">
                <TableCell colSpan={2} className="font-bold text-right">
                  {locale === 'ar' ? 'الإجمالي' : 'Total'}
                </TableCell>
                <TableCell className="text-right font-bold text-lg">
                  {formatCurrency(totalDebit)}
                </TableCell>
                <TableCell className="text-right font-bold text-lg">
                  {formatCurrency(totalCredit)}
                </TableCell>
                <TableCell className="text-right">
                  {isBalanced ? (
                    <Badge variant="secondary" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {locale === 'ar' ? 'متوازن' : 'Balanced'}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {locale === 'ar' ? 'غير متوازن' : 'Unbalanced'}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Summary by Account Type */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'ملخص حسب نوع الحساب' : 'Summary by Account Type'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'].map((type) => {
              const typeData = trialBalanceData.filter(item => item.accountType === type && item.level === 1);
              const total = typeData.reduce((sum, item) => sum + Math.abs(item.balance), 0);
              
              const typeLabels: Record<string, { ar: string; en: string }> = {
                Assets: { ar: 'الأصول', en: 'Assets' },
                Liabilities: { ar: 'الخصوم', en: 'Liabilities' },
                Equity: { ar: 'حقوق الملكية', en: 'Equity' },
                Revenue: { ar: 'الإيرادات', en: 'Revenue' },
                Expenses: { ar: 'المصروفات', en: 'Expenses' },
              };

              return (
                <Card key={type}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {locale === 'ar' ? typeLabels[type].ar : typeLabels[type].en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(total)}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

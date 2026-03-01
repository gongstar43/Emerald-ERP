import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { TrendingUp, TrendingDown, Download, Calendar, Info, DollarSign, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export default function IncomeStatement() {
  const { locale } = useLanguage();
  const [showGuide, setShowGuide] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  const handleExport = () => {
    toast.success(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...');
  };

  // Sample data
  const incomeData = {
    revenue: {
      salesRevenue: 2500000,
      serviceRevenue: 850000,
      otherRevenue: 150000,
    },
    cogs: {
      materials: 800000,
      labor: 400000,
      overhead: 200000,
    },
    operatingExpenses: {
      salaries: 450000,
      marketing: 180000,
      rent: 120000,
      utilities: 45000,
      depreciation: 85000,
      other: 120000,
    },
    otherIncome: {
      interest: 25000,
      investments: 45000,
    },
    otherExpenses: {
      interest: 35000,
      losses: 15000,
    },
    tax: 215000,
  };

  const totalRevenue = incomeData.revenue.salesRevenue + incomeData.revenue.serviceRevenue + incomeData.revenue.otherRevenue;
  const totalCOGS = incomeData.cogs.materials + incomeData.cogs.labor + incomeData.cogs.overhead;
  const grossProfit = totalRevenue - totalCOGS;
  const totalOperatingExpenses = Object.values(incomeData.operatingExpenses).reduce((a, b) => a + b, 0);
  const operatingIncome = grossProfit - totalOperatingExpenses;
  const totalOtherIncome = incomeData.otherIncome.interest + incomeData.otherIncome.investments;
  const totalOtherExpenses = incomeData.otherExpenses.interest + incomeData.otherExpenses.losses;
  const incomeBeforeTax = operatingIncome + totalOtherIncome - totalOtherExpenses;
  const netIncome = incomeBeforeTax - incomeData.tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const stats = [
    {
      label: locale === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: locale === 'ar' ? 'إجمالي الربح' : 'Gross Profit',
      value: formatCurrency(grossProfit),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: locale === 'ar' ? 'الدخل التشغيلي' : 'Operating Income',
      value: formatCurrency(operatingIncome),
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: locale === 'ar' ? 'صافي الدخل' : 'Net Income',
      value: formatCurrency(netIncome),
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {locale === 'ar' ? 'قائمة الدخل' : 'Income Statement'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'قائمة الدخل الشامل متوافقة مع IAS 1 و IFRS' 
              : 'Comprehensive income statement compliant with IAS 1 & IFRS'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowGuide(true)}>
            <Info className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'دليل المعايير' : 'Standards Guide'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle className="text-base">
              {locale === 'ar' ? 'الفترة المالية' : 'Financial Period'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {['2024', '2023', '2022'].map((year) => (
              <Button
                key={year}
                variant={selectedPeriod === year ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(year)}
              >
                {year}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className={stat.bgColor}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Income Statement Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {locale === 'ar' ? 'قائمة الدخل التفصيلية' : 'Detailed Income Statement'}
              </CardTitle>
              <CardDescription className="mt-2">
                <Badge variant="outline">IAS 1</Badge>
                <Badge variant="outline" className="ml-2">IFRS Compliant</Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/3">{locale === 'ar' ? 'البند' : 'Item'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Revenue Section */}
              <TableRow className="bg-blue-50 dark:bg-blue-950 font-semibold">
                <TableCell>{locale === 'ar' ? 'الإيرادات' : 'Revenue'}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalRevenue)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'إيرادات المبيعات' : 'Sales Revenue'}</TableCell>
                <TableCell className="text-right">{formatCurrency(incomeData.revenue.salesRevenue)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'إيرادات الخدمات' : 'Service Revenue'}</TableCell>
                <TableCell className="text-right">{formatCurrency(incomeData.revenue.serviceRevenue)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'إيرادات أخرى' : 'Other Revenue'}</TableCell>
                <TableCell className="text-right">{formatCurrency(incomeData.revenue.otherRevenue)}</TableCell>
              </TableRow>

              {/* COGS Section */}
              <TableRow className="bg-red-50 dark:bg-red-950 font-semibold">
                <TableCell>{locale === 'ar' ? 'تكلفة البضاعة المباعة' : 'Cost of Goods Sold'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(totalCOGS)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'المواد' : 'Materials'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(incomeData.cogs.materials)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'العمالة' : 'Labor'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(incomeData.cogs.labor)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'التكاليف غير المباشرة' : 'Overhead'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(incomeData.cogs.overhead)})</TableCell>
              </TableRow>

              {/* Gross Profit */}
              <TableRow className="bg-green-50 dark:bg-green-950 font-bold text-lg">
                <TableCell>{locale === 'ar' ? 'إجمالي الربح' : 'Gross Profit'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(grossProfit)}</TableCell>
              </TableRow>

              {/* Operating Expenses */}
              <TableRow className="bg-orange-50 dark:bg-orange-950 font-semibold">
                <TableCell>{locale === 'ar' ? 'المصروفات التشغيلية' : 'Operating Expenses'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(totalOperatingExpenses)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'الرواتب والأجور' : 'Salaries'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(incomeData.operatingExpenses.salaries)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'التسويق' : 'Marketing'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(incomeData.operatingExpenses.marketing)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'الإيجار' : 'Rent'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(incomeData.operatingExpenses.rent)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'المرافق' : 'Utilities'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(incomeData.operatingExpenses.utilities)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'الإهلاك' : 'Depreciation'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(incomeData.operatingExpenses.depreciation)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'أخرى' : 'Other'}</TableCell>
                <TableCell className="text-right text-orange-600">({formatCurrency(incomeData.operatingExpenses.other)})</TableCell>
              </TableRow>

              {/* Operating Income */}
              <TableRow className="bg-purple-50 dark:bg-purple-950 font-bold text-lg">
                <TableCell>{locale === 'ar' ? 'الدخل التشغيلي' : 'Operating Income'}</TableCell>
                <TableCell className="text-right text-purple-600">{formatCurrency(operatingIncome)}</TableCell>
              </TableRow>

              {/* Other Income & Expenses */}
              <TableRow className="bg-muted/50">
                <TableCell>{locale === 'ar' ? 'إيرادات أخرى' : 'Other Income'}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalOtherIncome)}</TableCell>
              </TableRow>
              <TableRow className="bg-muted/50">
                <TableCell>{locale === 'ar' ? 'مصروفات أخرى' : 'Other Expenses'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(totalOtherExpenses)})</TableCell>
              </TableRow>

              {/* Income Before Tax */}
              <TableRow className="bg-blue-50 dark:bg-blue-950 font-bold">
                <TableCell>{locale === 'ar' ? 'الدخل قبل الضريبة' : 'Income Before Tax'}</TableCell>
                <TableCell className="text-right text-blue-600">{formatCurrency(incomeBeforeTax)}</TableCell>
              </TableRow>

              {/* Tax */}
              <TableRow>
                <TableCell>{locale === 'ar' ? 'ضريبة الدخل' : 'Income Tax'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(incomeData.tax)})</TableCell>
              </TableRow>

              {/* Net Income */}
              <TableRow className="bg-emerald-100 dark:bg-emerald-950 font-bold text-xl border-t-2 border-emerald-600">
                <TableCell>{locale === 'ar' ? 'صافي الدخل' : 'Net Income'}</TableCell>
                <TableCell className="text-right text-emerald-600">{formatCurrency(netIncome)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Standards Guide Dialog */}
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              {locale === 'ar' ? 'دليل المعايير المحاسبية لقائمة الدخل' : 'Income Statement Accounting Standards Guide'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'قائمة الدخل معدة وفقاً لمعايير IAS 1 والمبادئ المحاسبية المقبولة' 
                : 'Income statement prepared in accordance with IAS 1 and GAAP principles'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 mt-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Badge className="bg-blue-600">IAS 1</Badge>
                {locale === 'ar' ? 'معيار المحاسبة الدولي 1' : 'IAS 1 - Presentation of Financial Statements'}
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• {locale === 'ar' ? 'عرض قائمة الدخل الشامل' : 'Presentation of comprehensive income statement'}</li>
                <li>• {locale === 'ar' ? 'التصنيف حسب الوظيفة أو الطبيعة' : 'Classification by function or nature'}</li>
                <li>• {locale === 'ar' ? 'الإفصاح عن البنود الاستثنائية' : 'Disclosure of exceptional items'}</li>
                <li>• {locale === 'ar' ? 'ربحية السهم الواحد (EPS)' : 'Earnings per share (EPS)'}</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Badge className="bg-green-600">{locale === 'ar' ? 'المكونات' : 'Components'}</Badge>
                {locale === 'ar' ? 'مكونات قائمة الدخل' : 'Income Statement Components'}
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ {locale === 'ar' ? 'الإيرادات من العمليات العادية' : 'Revenue from ordinary activities'}</li>
                <li>✓ {locale === 'ar' ? 'تكلفة المبيعات' : 'Cost of sales'}</li>
                <li>✓ {locale === 'ar' ? 'إجمالي الربح' : 'Gross profit'}</li>
                <li>✓ {locale === 'ar' ? 'المصروفات التشغيلية' : 'Operating expenses'}</li>
                <li>✓ {locale === 'ar' ? 'الدخل التشغيلي' : 'Operating income'}</li>
                <li>✓ {locale === 'ar' ? 'الإيرادات والمصروفات الأخرى' : 'Other income and expenses'}</li>
                <li>✓ {locale === 'ar' ? 'ضريبة الدخل' : 'Income tax'}</li>
                <li>✓ {locale === 'ar' ? 'صافي الدخل' : 'Net income'}</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { TrendingUp, TrendingDown, Download, Calendar, Info, DollarSign, Activity } from 'lucide-react';
import { toast } from 'sonner';

export default function CashFlowStatement() {
  const { locale } = useLanguage();
  const [showGuide, setShowGuide] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  const handleExport = () => {
    toast.success(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...');
  };

  // Sample data
  const cashFlowData = {
    operating: {
      netIncome: 890000,
      depreciation: 85000,
      amortization: 25000,
      accountsReceivableDecrease: 120000,
      inventoryIncrease: -80000,
      accountsPayableIncrease: 65000,
      accruedExpensesIncrease: 35000,
    },
    investing: {
      equipmentPurchase: -250000,
      landPurchase: -500000,
      investmentSale: 150000,
      intangibleAssetPurchase: -75000,
    },
    financing: {
      loanProceeds: 400000,
      loanRepayment: -180000,
      dividendsPaid: -200000,
      shareIssuance: 300000,
    },
  };

  const operatingCashFlow = Object.values(cashFlowData.operating).reduce((a, b) => a + b, 0);
  const investingCashFlow = Object.values(cashFlowData.investing).reduce((a, b) => a + b, 0);
  const financingCashFlow = Object.values(cashFlowData.financing).reduce((a, b) => a + b, 0);
  const netCashChange = operatingCashFlow + investingCashFlow + financingCashFlow;
  const beginningCash = 850000;
  const endingCash = beginningCash + netCashChange;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
    }).format(Math.abs(amount));
  };

  const stats = [
    {
      label: locale === 'ar' ? 'التدفقات من العمليات' : 'Operating Cash Flow',
      value: formatCurrency(operatingCashFlow),
      icon: Activity,
      color: operatingCashFlow >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: operatingCashFlow >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
    {
      label: locale === 'ar' ? 'التدفقات من الاستثمار' : 'Investing Cash Flow',
      value: formatCurrency(investingCashFlow),
      icon: TrendingDown,
      color: investingCashFlow >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: investingCashFlow >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
    {
      label: locale === 'ar' ? 'التدفقات من التمويل' : 'Financing Cash Flow',
      value: formatCurrency(financingCashFlow),
      icon: DollarSign,
      color: financingCashFlow >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: financingCashFlow >= 0 ? 'bg-green-50' : 'bg-red-50',
    },
    {
      label: locale === 'ar' ? 'صافي التغير النقدي' : 'Net Cash Change',
      value: formatCurrency(netCashChange),
      icon: TrendingUp,
      color: netCashChange >= 0 ? 'text-emerald-600' : 'text-red-600',
      bgColor: netCashChange >= 0 ? 'bg-emerald-50' : 'bg-red-50',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {locale === 'ar' ? 'قائمة التدفقات النقدية' : 'Cash Flow Statement'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'قائمة التدفقات النقدية متوافقة مع IAS 7' 
              : 'Cash flow statement compliant with IAS 7'}
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

      {/* Cash Flow Statement Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {locale === 'ar' ? 'قائمة التدفقات النقدية التفصيلية' : 'Detailed Cash Flow Statement'}
              </CardTitle>
              <CardDescription className="mt-2">
                <Badge variant="outline">IAS 7</Badge>
                <Badge variant="outline" className="ml-2">Indirect Method</Badge>
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
              {/* Operating Activities */}
              <TableRow className="bg-blue-50 dark:bg-blue-950 font-bold text-lg">
                <TableCell colSpan={2}>
                  {locale === 'ar' ? 'التدفقات النقدية من الأنشطة التشغيلية' : 'Cash Flows from Operating Activities'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'صافي الدخل' : 'Net Income'}</TableCell>
                <TableCell className="text-right">{formatCurrency(cashFlowData.operating.netIncome)}</TableCell>
              </TableRow>
              <TableRow className="bg-muted/30">
                <TableCell className="pl-8 font-semibold" colSpan={2}>
                  {locale === 'ar' ? 'تسويات لتحويل صافي الدخل إلى نقد' : 'Adjustments to reconcile net income to cash'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-12">{locale === 'ar' ? 'الإهلاك والاستهلاك' : 'Depreciation & Amortization'}</TableCell>
                <TableCell className="text-right">{formatCurrency(cashFlowData.operating.depreciation + cashFlowData.operating.amortization)}</TableCell>
              </TableRow>
              <TableRow className="bg-muted/30">
                <TableCell className="pl-8 font-semibold" colSpan={2}>
                  {locale === 'ar' ? 'التغيرات في رأس المال العامل' : 'Changes in working capital'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-12">{locale === 'ar' ? 'انخفاض في الذمم المدينة' : 'Decrease in accounts receivable'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(cashFlowData.operating.accountsReceivableDecrease)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-12">{locale === 'ar' ? 'زيادة في المخزون' : 'Increase in inventory'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(cashFlowData.operating.inventoryIncrease)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-12">{locale === 'ar' ? 'زيادة في الذمم الدائنة' : 'Increase in accounts payable'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(cashFlowData.operating.accountsPayableIncrease)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-12">{locale === 'ar' ? 'زيادة في المصروفات المستحقة' : 'Increase in accrued expenses'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(cashFlowData.operating.accruedExpensesIncrease)}</TableCell>
              </TableRow>
              <TableRow className="bg-blue-100 dark:bg-blue-900 font-bold">
                <TableCell className="pl-8">
                  {locale === 'ar' ? 'صافي النقد من الأنشطة التشغيلية' : 'Net Cash from Operating Activities'}
                </TableCell>
                <TableCell className={`text-right ${operatingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {operatingCashFlow >= 0 ? formatCurrency(operatingCashFlow) : `(${formatCurrency(operatingCashFlow)})`}
                </TableCell>
              </TableRow>

              {/* Investing Activities */}
              <TableRow className="bg-purple-50 dark:bg-purple-950 font-bold text-lg">
                <TableCell colSpan={2}>
                  {locale === 'ar' ? 'التدفقات النقدية من الأنشطة الاستثمارية' : 'Cash Flows from Investing Activities'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'شراء معدات' : 'Purchase of equipment'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(cashFlowData.investing.equipmentPurchase)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'شراء أراضي' : 'Purchase of land'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(cashFlowData.investing.landPurchase)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'بيع استثمارات' : 'Sale of investments'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(cashFlowData.investing.investmentSale)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'شراء أصول غير ملموسة' : 'Purchase of intangible assets'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(cashFlowData.investing.intangibleAssetPurchase)})</TableCell>
              </TableRow>
              <TableRow className="bg-purple-100 dark:bg-purple-900 font-bold">
                <TableCell className="pl-8">
                  {locale === 'ar' ? 'صافي النقد من الأنشطة الاستثمارية' : 'Net Cash from Investing Activities'}
                </TableCell>
                <TableCell className={`text-right ${investingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {investingCashFlow >= 0 ? formatCurrency(investingCashFlow) : `(${formatCurrency(investingCashFlow)})`}
                </TableCell>
              </TableRow>

              {/* Financing Activities */}
              <TableRow className="bg-orange-50 dark:bg-orange-950 font-bold text-lg">
                <TableCell colSpan={2}>
                  {locale === 'ar' ? 'التدفقات النقدية من الأنشطة التمويلية' : 'Cash Flows from Financing Activities'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'حصيلة القروض' : 'Proceeds from loans'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(cashFlowData.financing.loanProceeds)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'سداد القروض' : 'Repayment of loans'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(cashFlowData.financing.loanRepayment)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'توزيعات الأرباح المدفوعة' : 'Dividends paid'}</TableCell>
                <TableCell className="text-right text-red-600">({formatCurrency(cashFlowData.financing.dividendsPaid)})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8">{locale === 'ar' ? 'إصدار أسهم' : 'Issuance of shares'}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(cashFlowData.financing.shareIssuance)}</TableCell>
              </TableRow>
              <TableRow className="bg-orange-100 dark:bg-orange-900 font-bold">
                <TableCell className="pl-8">
                  {locale === 'ar' ? 'صافي النقد من الأنشطة التمويلية' : 'Net Cash from Financing Activities'}
                </TableCell>
                <TableCell className={`text-right ${financingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {financingCashFlow >= 0 ? formatCurrency(financingCashFlow) : `(${formatCurrency(financingCashFlow)})`}
                </TableCell>
              </TableRow>

              {/* Net Change */}
              <TableRow className="bg-emerald-50 dark:bg-emerald-950 font-bold text-lg border-t-2">
                <TableCell>
                  {locale === 'ar' ? 'صافي التغير في النقد وما يعادله' : 'Net Change in Cash and Cash Equivalents'}
                </TableCell>
                <TableCell className={`text-right ${netCashChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {netCashChange >= 0 ? formatCurrency(netCashChange) : `(${formatCurrency(netCashChange)})`}
                </TableCell>
              </TableRow>

              {/* Beginning and Ending Cash */}
              <TableRow>
                <TableCell>{locale === 'ar' ? 'النقد في بداية الفترة' : 'Cash at beginning of period'}</TableCell>
                <TableCell className="text-right">{formatCurrency(beginningCash)}</TableCell>
              </TableRow>
              <TableRow className="bg-emerald-100 dark:bg-emerald-900 font-bold text-xl border-t-2 border-emerald-600">
                <TableCell>{locale === 'ar' ? 'النقد في نهاية الفترة' : 'Cash at end of period'}</TableCell>
                <TableCell className="text-right text-emerald-600">{formatCurrency(endingCash)}</TableCell>
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
              {locale === 'ar' ? 'دليل المعايير المحاسبية لقائمة التدفقات النقدية' : 'Cash Flow Statement Accounting Standards Guide'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'قائمة التدفقات النقدية معدة وفقاً لمعيار IAS 7' 
                : 'Cash flow statement prepared in accordance with IAS 7'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 mt-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Badge className="bg-blue-600">IAS 7</Badge>
                {locale === 'ar' ? 'معيار المحاسبة الدولي 7' : 'IAS 7 - Statement of Cash Flows'}
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• {locale === 'ar' ? 'تصنيف التدفقات النقدية إلى ثلاث فئات' : 'Classification of cash flows into three categories'}</li>
                <li>• {locale === 'ar' ? 'الطريقة المباشرة أو غير المباشرة' : 'Direct or indirect method'}</li>
                <li>• {locale === 'ar' ? 'إفصاحات المعاملات غير النقدية' : 'Disclosures of non-cash transactions'}</li>
                <li>• {locale === 'ar' ? 'تعريف النقد وما يعادله' : 'Definition of cash and cash equivalents'}</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                <h4 className="font-bold mb-2">{locale === 'ar' ? 'الأنشطة التشغيلية' : 'Operating Activities'}</h4>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' 
                    ? 'الأنشطة الرئيسية المدرة للإيرادات والأنشطة الأخرى غير الاستثمارية أو التمويلية' 
                    : 'Principal revenue-generating activities and other activities that are not investing or financing'}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950">
                <h4 className="font-bold mb-2">{locale === 'ar' ? 'الأنشطة الاستثمارية' : 'Investing Activities'}</h4>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' 
                    ? 'شراء وبيع الأصول طويلة الأجل والاستثمارات الأخرى' 
                    : 'Acquisition and disposal of long-term assets and other investments'}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950">
                <h4 className="font-bold mb-2">{locale === 'ar' ? 'الأنشطة التمويلية' : 'Financing Activities'}</h4>
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' 
                    ? 'الأنشطة التي تؤدي إلى تغييرات في حجم وتكوين حقوق الملكية والقروض' 
                    : 'Activities that result in changes in the size and composition of equity and borrowings'}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

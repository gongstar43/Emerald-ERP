import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  DollarSign,
  PieChart,
} from 'lucide-react';

const translations = {
  ar: {
    financialReports: 'التقارير المالية',
    reportsDescription: 'تقارير مالية متوافقة مع معايير IFRS',
    balanceSheet: 'قائمة المركز المالي',
    incomeStatement: 'قائمة الدخل',
    cashFlow: 'قائمة التدفقات النقدية',
    equity: 'قائمة التغير في حقوق الملكية',
    trialBalance: 'ميزان المراجعة',
    export: 'تصدير',
    print: 'طباعة',
    asOf: 'كما في',
    forPeriod: 'للفترة',
    // Balance Sheet
    assets: 'الأصول',
    currentAssets: 'أصول متداولة',
    nonCurrentAssets: 'أصول غير متداولة',
    totalAssets: 'إجمالي الأصول',
    liabilities: 'الالتزامات',
    currentLiabilities: 'التزامات متداولة',
    nonCurrentLiabilities: 'التزامات غير متداولة',
    totalLiabilities: 'إجمالي الالتزامات',
    equitySection: 'حقوق الملكية',
    totalEquity: 'إجمالي حقوق الملكية',
    totalLiabilitiesAndEquity: 'إجمالي الالتزامات وحقوق الملكية',
    // Income Statement
    revenue: 'الإيرادات',
    costOfGoodsSold: 'تكلفة البضاعة المباعة',
    grossProfit: 'إجمالي الربح',
    operatingExpenses: 'المصروفات التشغيلية',
    operatingIncome: 'الدخل التشغيلي',
    otherIncome: 'إيرادات أخرى',
    otherExpenses: 'مصروفات أخرى',
    netIncomeBeforeTax: 'صافي الدخل قبل الضريبة',
    incomeTax: 'ضريبة الدخل',
    netIncome: 'صافي الدخل',
    // Cash Flow
    operatingActivities: 'الأنشطة التشغيلية',
    investingActivities: 'الأنشطة الاستثمارية',
    financingActivities: 'الأنشطة التمويلية',
    netCashFlow: 'صافي التدفق النقدي',
    beginningCash: 'النقدية في بداية الفترة',
    endingCash: 'النقدية في نهاية الفترة',
    // Trial Balance
    accountCode: 'رمز الحساب',
    accountName: 'اسم الحساب',
    debit: 'مدين',
    credit: 'دائن',
    balance: 'الرصيد',
    totals: 'الإجماليات',
  },
  en: {
    financialReports: 'Financial Reports',
    reportsDescription: 'IFRS-compliant financial reports',
    balanceSheet: 'Balance Sheet',
    incomeStatement: 'Income Statement',
    cashFlow: 'Cash Flow Statement',
    equity: 'Statement of Changes in Equity',
    trialBalance: 'Trial Balance',
    export: 'Export',
    print: 'Print',
    asOf: 'As of',
    forPeriod: 'For Period',
    // Balance Sheet
    assets: 'Assets',
    currentAssets: 'Current Assets',
    nonCurrentAssets: 'Non-Current Assets',
    totalAssets: 'Total Assets',
    liabilities: 'Liabilities',
    currentLiabilities: 'Current Liabilities',
    nonCurrentLiabilities: 'Non-Current Liabilities',
    totalLiabilities: 'Total Liabilities',
    equitySection: 'Equity',
    totalEquity: 'Total Equity',
    totalLiabilitiesAndEquity: 'Total Liabilities and Equity',
    // Income Statement
    revenue: 'Revenue',
    costOfGoodsSold: 'Cost of Goods Sold',
    grossProfit: 'Gross Profit',
    operatingExpenses: 'Operating Expenses',
    operatingIncome: 'Operating Income',
    otherIncome: 'Other Income',
    otherExpenses: 'Other Expenses',
    netIncomeBeforeTax: 'Net Income Before Tax',
    incomeTax: 'Income Tax',
    netIncome: 'Net Income',
    // Cash Flow
    operatingActivities: 'Operating Activities',
    investingActivities: 'Investing Activities',
    financingActivities: 'Financing Activities',
    netCashFlow: 'Net Cash Flow',
    beginningCash: 'Beginning Cash',
    endingCash: 'Ending Cash',
    // Trial Balance
    accountCode: 'Account Code',
    accountName: 'Account Name',
    debit: 'Debit',
    credit: 'Credit',
    balance: 'Balance',
    totals: 'Totals',
  },
};

// Mock data for Balance Sheet
const mockBalanceSheet = {
  currentAssets: [
    { name: 'Cash and Cash Equivalents', nameAr: 'النقدية وما في حكمها', amount: 450000 },
    { name: 'Trade Receivables', nameAr: 'المدينون التجاريون', amount: 320000 },
    { name: 'Inventory', nameAr: 'المخزون', amount: 280000 },
    { name: 'Prepaid Expenses', nameAr: 'مصروفات مدفوعة مقدماً', amount: 45000 },
  ],
  nonCurrentAssets: [
    { name: 'Property, Plant and Equipment', nameAr: 'الممتلكات والمعدات', amount: 1250000 },
    { name: 'Less: Accumulated Depreciation', nameAr: 'مجمع الإهلاك', amount: -350000 },
    { name: 'Intangible Assets', nameAr: 'أصول غير ملموسة', amount: 180000 },
    { name: 'Long-term Investments', nameAr: 'استثمارات طويلة الأجل', amount: 200000 },
  ],
  currentLiabilities: [
    { name: 'Trade Payables', nameAr: 'الدائنون التجاريون', amount: 245000 },
    { name: 'Short-term Loans', nameAr: 'قروض قصيرة الأجل', amount: 150000 },
    { name: 'Accrued Expenses', nameAr: 'مصروفات مستحقة', amount: 95000 },
  ],
  nonCurrentLiabilities: [
    { name: 'Long-term Loans', nameAr: 'قروض طويلة الأجل', amount: 500000 },
    { name: 'Provisions', nameAr: 'مخصصات', amount: 120000 },
  ],
  equity: [
    { name: 'Share Capital', nameAr: 'رأس المال', amount: 1000000 },
    { name: 'Retained Earnings', nameAr: 'أرباح محتجزة', amount: 325000 },
  ],
};

// Mock data for Income Statement
const mockIncomeStatement = {
  revenue: [
    { name: 'Product Sales', nameAr: 'مبيعات منتجات', amount: 2850000 },
    { name: 'Service Revenue', nameAr: 'إيرادات خدمات', amount: 450000 },
  ],
  cogs: [
    { name: 'Cost of Goods Sold', nameAr: 'تكلفة البضاعة المباعة', amount: 1650000 },
  ],
  operatingExpenses: [
    { name: 'Salaries and Wages', nameAr: 'رواتب وأجور', amount: 580000 },
    { name: 'Rent Expense', nameAr: 'مصروف إيجار', amount: 120000 },
    { name: 'Utilities', nameAr: 'خدمات عامة', amount: 35000 },
    { name: 'Depreciation', nameAr: 'إهلاك', amount: 85000 },
    { name: 'Other Expenses', nameAr: 'مصروفات أخرى', amount: 165000 },
  ],
  otherIncome: [
    { name: 'Interest Income', nameAr: 'إيرادات فوائد', amount: 25000 },
  ],
  otherExpenses: [
    { name: 'Interest Expense', nameAr: 'مصروف فوائد', amount: 45000 },
  ],
  incomeTax: 95000,
};

// Mock data for Cash Flow
const mockCashFlow = {
  operating: [
    { name: 'Net Income', nameAr: 'صافي الدخل', amount: 355000 },
    { name: 'Depreciation', nameAr: 'إهلاك', amount: 85000 },
    { name: 'Changes in Receivables', nameAr: 'التغير في المدينون', amount: -45000 },
    { name: 'Changes in Inventory', nameAr: 'التغير في المخزون', amount: -35000 },
    { name: 'Changes in Payables', nameAr: 'التغير في الدائنون', amount: 55000 },
  ],
  investing: [
    { name: 'Purchase of Equipment', nameAr: 'شراء معدات', amount: -180000 },
    { name: 'Sale of Investments', nameAr: 'بيع استثمارات', amount: 75000 },
  ],
  financing: [
    { name: 'Proceeds from Loans', nameAr: 'قروض مستلمة', amount: 200000 },
    { name: 'Repayment of Loans', nameAr: 'سداد قروض', amount: -150000 },
    { name: 'Dividends Paid', nameAr: 'توزيعات أرباح مدفوعة', amount: -80000 },
  ],
  beginningCash: 250000,
};

// Mock data for Trial Balance
const mockTrialBalance = [
  { code: '11100', name: 'Cash on Hand', nameAr: 'النقدية في الصندوق', debit: 125000, credit: 0 },
  { code: '11200', name: 'Cash at Bank', nameAr: 'النقدية في البنك', debit: 325000, credit: 0 },
  { code: '12100', name: 'Accounts Receivable', nameAr: 'حسابات مدينة', debit: 320000, credit: 0 },
  { code: '13300', name: 'Finished Goods', nameAr: 'بضاعة تامة', debit: 280000, credit: 0 },
  { code: '16120', name: 'Buildings', nameAr: 'مباني', debit: 800000, credit: 0 },
  { code: '16130', name: 'Machinery', nameAr: 'آلات', debit: 450000, credit: 0 },
  { code: '16121', name: 'Acc. Dep. - Buildings', nameAr: 'مجمع إهلاك - مباني', debit: 0, credit: 200000 },
  { code: '16131', name: 'Acc. Dep. - Machinery', nameAr: 'مجمع إهلاك - آلات', debit: 0, credit: 150000 },
  { code: '21100', name: 'Accounts Payable', nameAr: 'حسابات دائنة', debit: 0, credit: 245000 },
  { code: '22200', name: 'Short-term Loans', nameAr: 'قروض قصيرة الأجل', debit: 0, credit: 150000 },
  { code: '26100', name: 'Long-term Loans', nameAr: 'قروض طويلة الأجل', debit: 0, credit: 500000 },
  { code: '31100', name: 'Common Stock', nameAr: 'أسهم عادية', debit: 0, credit: 1000000 },
  { code: '32100', name: 'Retained Earnings', nameAr: 'أرباح محتجزة', debit: 0, credit: 325000 },
  { code: '41100', name: 'Product Sales', nameAr: 'مبيعات منتجات', debit: 0, credit: 2850000 },
  { code: '41200', name: 'Service Revenue', nameAr: 'إيرادات خدمات', debit: 0, credit: 450000 },
  { code: '50000', name: 'Cost of Goods Sold', nameAr: 'تكلفة البضاعة المباعة', debit: 1650000, credit: 0 },
  { code: '62100', name: 'Salaries and Wages', nameAr: 'رواتب وأجور', debit: 580000, credit: 0 },
  { code: '62300', name: 'Rent Expense', nameAr: 'مصروف إيجار', debit: 120000, credit: 0 },
  { code: '63100', name: 'Depreciation', nameAr: 'إهلاك', debit: 85000, credit: 0 },
  { code: '71000', name: 'Interest Expense', nameAr: 'مصروف فوائد', debit: 45000, credit: 0 },
];

export default function FinancialReports() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const [activeTab, setActiveTab] = useState('balance-sheet');

  // Calculate Balance Sheet totals
  const totalCurrentAssets = mockBalanceSheet.currentAssets.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentAssets = mockBalanceSheet.nonCurrentAssets.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const totalCurrentLiabilities = mockBalanceSheet.currentLiabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentLiabilities = mockBalanceSheet.nonCurrentLiabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;

  const totalEquity = mockBalanceSheet.equity.reduce((sum, item) => sum + item.amount, 0);

  // Calculate Income Statement totals
  const totalRevenue = mockIncomeStatement.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalCOGS = mockIncomeStatement.cogs.reduce((sum, item) => sum + item.amount, 0);
  const grossProfit = totalRevenue - totalCOGS;
  const totalOperatingExpenses = mockIncomeStatement.operatingExpenses.reduce((sum, item) => sum + item.amount, 0);
  const operatingIncome = grossProfit - totalOperatingExpenses;
  const totalOtherIncome = mockIncomeStatement.otherIncome.reduce((sum, item) => sum + item.amount, 0);
  const totalOtherExpenses = mockIncomeStatement.otherExpenses.reduce((sum, item) => sum + item.amount, 0);
  const netIncomeBeforeTax = operatingIncome + totalOtherIncome - totalOtherExpenses;
  const netIncome = netIncomeBeforeTax - mockIncomeStatement.incomeTax;

  // Calculate Cash Flow totals
  const operatingCashFlow = mockCashFlow.operating.reduce((sum, item) => sum + item.amount, 0);
  const investingCashFlow = mockCashFlow.investing.reduce((sum, item) => sum + item.amount, 0);
  const financingCashFlow = mockCashFlow.financing.reduce((sum, item) => sum + item.amount, 0);
  const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;
  const endingCash = mockCashFlow.beginningCash + netCashFlow;

  // Calculate Trial Balance totals
  const totalDebit = mockTrialBalance.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = mockTrialBalance.reduce((sum, item) => sum + item.credit, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            {t('financialReports')}
          </h1>
          <p className="text-gray-600 mt-1">{t('reportsDescription')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            {t('print')}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
        </div>
      </div>

      {/* Reports Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="balance-sheet">{t('balanceSheet')}</TabsTrigger>
          <TabsTrigger value="income-statement">{t('incomeStatement')}</TabsTrigger>
          <TabsTrigger value="cash-flow">{t('cashFlow')}</TabsTrigger>
          <TabsTrigger value="trial-balance">{t('trialBalance')}</TabsTrigger>
        </TabsList>

        {/* Balance Sheet */}
        <TabsContent value="balance-sheet">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {locale === 'ar' ? 'شركة التقنية المتقدمة' : 'Advanced Technology Company'}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {t('balanceSheet')}
              </CardDescription>
              <p className="text-center text-gray-600">
                {t('asOf')} {new Date().toLocaleDateString(locale)}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Assets */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-600">{t('assets')}</h3>
                  
                  <div className="ml-6 space-y-2">
                    <h4 className="font-semibold text-lg">{t('currentAssets')}</h4>
                    {mockBalanceSheet.currentAssets.map((item, idx) => (
                      <div key={idx} className="flex justify-between ml-6">
                        <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between ml-6 font-semibold border-t pt-2">
                      <span>{t('currentAssets')}</span>
                      <span>{formatCurrency(totalCurrentAssets)}</span>
                    </div>
                  </div>

                  <div className="ml-6 space-y-2 mt-4">
                    <h4 className="font-semibold text-lg">{t('nonCurrentAssets')}</h4>
                    {mockBalanceSheet.nonCurrentAssets.map((item, idx) => (
                      <div key={idx} className="flex justify-between ml-6">
                        <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between ml-6 font-semibold border-t pt-2">
                      <span>{t('nonCurrentAssets')}</span>
                      <span>{formatCurrency(totalNonCurrentAssets)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-lg mt-4 border-t-2 pt-2">
                    <span>{t('totalAssets')}</span>
                    <span className="text-blue-600">{formatCurrency(totalAssets)}</span>
                  </div>
                </div>

                {/* Liabilities */}
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600">{t('liabilities')}</h3>
                  
                  <div className="ml-6 space-y-2">
                    <h4 className="font-semibold text-lg">{t('currentLiabilities')}</h4>
                    {mockBalanceSheet.currentLiabilities.map((item, idx) => (
                      <div key={idx} className="flex justify-between ml-6">
                        <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between ml-6 font-semibold border-t pt-2">
                      <span>{t('currentLiabilities')}</span>
                      <span>{formatCurrency(totalCurrentLiabilities)}</span>
                    </div>
                  </div>

                  <div className="ml-6 space-y-2 mt-4">
                    <h4 className="font-semibold text-lg">{t('nonCurrentLiabilities')}</h4>
                    {mockBalanceSheet.nonCurrentLiabilities.map((item, idx) => (
                      <div key={idx} className="flex justify-between ml-6">
                        <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between ml-6 font-semibold border-t pt-2">
                      <span>{t('nonCurrentLiabilities')}</span>
                      <span>{formatCurrency(totalNonCurrentLiabilities)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-lg mt-4 border-t pt-2">
                    <span>{t('totalLiabilities')}</span>
                    <span className="text-red-600">{formatCurrency(totalLiabilities)}</span>
                  </div>
                </div>

                {/* Equity */}
                <div className="pt-6">
                  <h3 className="text-xl font-bold mb-4 text-purple-600">{t('equitySection')}</h3>
                  
                  <div className="ml-6 space-y-2">
                    {mockBalanceSheet.equity.map((item, idx) => (
                      <div key={idx} className="flex justify-between ml-6">
                        <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>{t('totalEquity')}</span>
                      <span className="text-purple-600">{formatCurrency(totalEquity)}</span>
                    </div>
                  </div>
                </div>

                {/* Total Liabilities and Equity */}
                <div className="flex justify-between font-bold text-xl border-t-2 pt-4 text-blue-600">
                  <span>{t('totalLiabilitiesAndEquity')}</span>
                  <span>{formatCurrency(totalLiabilities + totalEquity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income Statement */}
        <TabsContent value="income-statement">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {locale === 'ar' ? 'شركة التقنية المتقدمة' : 'Advanced Technology Company'}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {t('incomeStatement')}
              </CardDescription>
              <p className="text-center text-gray-600">
                {t('forPeriod')} {new Date().getFullYear()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Revenue */}
                <div>
                  <h3 className="font-semibold text-lg">{t('revenue')}</h3>
                  {mockIncomeStatement.revenue.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>{t('revenue')}</span>
                    <span className="text-green-600">{formatCurrency(totalRevenue)}</span>
                  </div>
                </div>

                {/* COGS */}
                <div>
                  <h3 className="font-semibold text-lg">{t('costOfGoodsSold')}</h3>
                  {mockIncomeStatement.cogs.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span>({formatCurrency(item.amount)})</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-lg border-t-2 pt-2">
                  <span>{t('grossProfit')}</span>
                  <span className="text-blue-600">{formatCurrency(grossProfit)}</span>
                </div>

                {/* Operating Expenses */}
                <div>
                  <h3 className="font-semibold text-lg">{t('operatingExpenses')}</h3>
                  {mockIncomeStatement.operatingExpenses.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span>({formatCurrency(item.amount)})</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>{t('operatingExpenses')}</span>
                    <span className="text-red-600">({formatCurrency(totalOperatingExpenses)})</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg border-t-2 pt-2">
                  <span>{t('operatingIncome')}</span>
                  <span className="text-blue-600">{formatCurrency(operatingIncome)}</span>
                </div>

                {/* Other Income/Expenses */}
                <div>
                  <h3 className="font-semibold text-lg">{t('otherIncome')}</h3>
                  {mockIncomeStatement.otherIncome.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span>{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{t('otherExpenses')}</h3>
                  {mockIncomeStatement.otherExpenses.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span>({formatCurrency(item.amount)})</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-lg border-t-2 pt-2">
                  <span>{t('netIncomeBeforeTax')}</span>
                  <span className="text-blue-600">{formatCurrency(netIncomeBeforeTax)}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t('incomeTax')}</span>
                  <span>({formatCurrency(mockIncomeStatement.incomeTax)})</span>
                </div>

                <div className="flex justify-between font-bold text-xl border-t-2 border-b-2 pt-2 pb-2">
                  <span>{t('netIncome')}</span>
                  <span className="text-green-600">{formatCurrency(netIncome)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Statement */}
        <TabsContent value="cash-flow">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {locale === 'ar' ? 'شركة التقنية المتقدمة' : 'Advanced Technology Company'}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {t('cashFlow')}
              </CardDescription>
              <p className="text-center text-gray-600">
                {t('forPeriod')} {new Date().getFullYear()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Operating Activities */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-600">{t('operatingActivities')}</h3>
                  {mockCashFlow.operating.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span className={item.amount < 0 ? 'text-red-600' : ''}>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>{t('operatingActivities')}</span>
                    <span className="text-blue-600">{formatCurrency(operatingCashFlow)}</span>
                  </div>
                </div>

                {/* Investing Activities */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-600">{t('investingActivities')}</h3>
                  {mockCashFlow.investing.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span className={item.amount < 0 ? 'text-red-600' : ''}>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>{t('investingActivities')}</span>
                    <span className="text-purple-600">{formatCurrency(investingCashFlow)}</span>
                  </div>
                </div>

                {/* Financing Activities */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-orange-600">{t('financingActivities')}</h3>
                  {mockCashFlow.financing.map((item, idx) => (
                    <div key={idx} className="flex justify-between ml-6">
                      <span>{locale === 'ar' ? item.nameAr : item.name}</span>
                      <span className={item.amount < 0 ? 'text-red-600' : ''}>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>{t('financingActivities')}</span>
                    <span className="text-orange-600">{formatCurrency(financingCashFlow)}</span>
                  </div>
                </div>

                {/* Net Cash Flow */}
                <div className="border-t-2 pt-4 space-y-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('netCashFlow')}</span>
                    <span className="text-green-600">{formatCurrency(netCashFlow)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('beginningCash')}</span>
                    <span>{formatCurrency(mockCashFlow.beginningCash)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t-2 pt-2">
                    <span>{t('endingCash')}</span>
                    <span className="text-blue-600">{formatCurrency(endingCash)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trial Balance */}
        <TabsContent value="trial-balance">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                {locale === 'ar' ? 'شركة التقنية المتقدمة' : 'Advanced Technology Company'}
              </CardTitle>
              <CardDescription className="text-center text-lg">
                {t('trialBalance')}
              </CardDescription>
              <p className="text-center text-gray-600">
                {t('asOf')} {new Date().toLocaleDateString(locale)}
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('accountCode')}</TableHead>
                    <TableHead>{t('accountName')}</TableHead>
                    <TableHead className="text-right">{t('debit')}</TableHead>
                    <TableHead className="text-right">{t('credit')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTrialBalance.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono">{item.code}</TableCell>
                      <TableCell>{locale === 'ar' ? item.nameAr : item.name}</TableCell>
                      <TableCell className="text-right">
                        {item.debit > 0 ? formatCurrency(item.debit) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.credit > 0 ? formatCurrency(item.credit) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold bg-gray-50 dark:bg-gray-800">
                    <TableCell colSpan={2}>{t('totals')}</TableCell>
                    <TableCell className="text-right text-blue-600">
                      {formatCurrency(totalDebit)}
                    </TableCell>
                    <TableCell className="text-right text-blue-600">
                      {formatCurrency(totalCredit)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

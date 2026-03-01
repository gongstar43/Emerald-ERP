import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
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
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';

interface BalanceSheetItem {
  code: string;
  name: string;
  nameEn: string;
  amount: number;
  percentage: number;
  level: number;
  children?: BalanceSheetItem[];
}

export default function BalanceSheet() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [period, setPeriod] = useState('current');
  const [comparison, setComparison] = useState(false);

  // Mock data - IFRS compliant structure
  const assets: BalanceSheetItem[] = [
    {
      code: '1',
      name: 'الأصول',
      nameEn: 'Assets',
      amount: 8500000,
      percentage: 100,
      level: 1,
      children: [
        {
          code: '1-1',
          name: 'الأصول المتداولة',
          nameEn: 'Current Assets',
          amount: 3500000,
          percentage: 41.2,
          level: 2,
          children: [
            { code: '1-1-1', name: 'النقدية وما يعادلها', nameEn: 'Cash and Cash Equivalents', amount: 1300000, percentage: 15.3, level: 3 },
            { code: '1-1-2', name: 'المدينون التجاريون', nameEn: 'Trade Receivables', amount: 1650000, percentage: 19.4, level: 3 },
            { code: '1-1-3', name: 'المخزون', nameEn: 'Inventory', amount: 550000, percentage: 6.5, level: 3 },
          ],
        },
        {
          code: '1-2',
          name: 'الأصول غير المتداولة',
          nameEn: 'Non-Current Assets',
          amount: 5000000,
          percentage: 58.8,
          level: 2,
          children: [
            { code: '1-2-1', name: 'الممتلكات والمعدات', nameEn: 'Property, Plant & Equipment', amount: 4000000, percentage: 47.1, level: 3 },
            { code: '1-2-2', name: 'الأصول غير الملموسة', nameEn: 'Intangible Assets', amount: 800000, percentage: 9.4, level: 3 },
            { code: '1-2-3', name: 'الاستثمارات طويلة الأجل', nameEn: 'Long-term Investments', amount: 200000, percentage: 2.4, level: 3 },
          ],
        },
      ],
    },
  ];

  const liabilities: BalanceSheetItem[] = [
    {
      code: '2',
      name: 'الخصوم',
      nameEn: 'Liabilities',
      amount: 3200000,
      percentage: 100,
      level: 1,
      children: [
        {
          code: '2-1',
          name: 'الخصوم المتداولة',
          nameEn: 'Current Liabilities',
          amount: 1800000,
          percentage: 56.3,
          level: 2,
          children: [
            { code: '2-1-1', name: 'الدائنون التجاريون', nameEn: 'Trade Payables', amount: 1100000, percentage: 34.4, level: 3 },
            { code: '2-1-2', name: 'القروض قصيرة الأجل', nameEn: 'Short-term Loans', amount: 700000, percentage: 21.9, level: 3 },
          ],
        },
        {
          code: '2-2',
          name: 'الخصوم غير المتداولة',
          nameEn: 'Non-Current Liabilities',
          amount: 1400000,
          percentage: 43.8,
          level: 2,
          children: [
            { code: '2-2-1', name: 'القروض طويلة الأجل', nameEn: 'Long-term Loans', amount: 1400000, percentage: 43.8, level: 3 },
          ],
        },
      ],
    },
  ];

  const equity: BalanceSheetItem[] = [
    {
      code: '3',
      name: 'حقوق الملكية',
      nameEn: 'Equity',
      amount: 5300000,
      percentage: 100,
      level: 1,
      children: [
        { code: '3-1', name: 'رأس المال', nameEn: 'Share Capital', amount: 5000000, percentage: 94.3, level: 2 },
        { code: '3-2', name: 'الأرباح المحتجزة', nameEn: 'Retained Earnings', amount: 300000, percentage: 5.7, level: 2 },
      ],
    },
  ];

  const totalAssets = assets[0].amount;
  const totalLiabilities = liabilities[0].amount;
  const totalEquity = equity[0].amount;
  const isBalanced = totalAssets === (totalLiabilities + totalEquity);

  const renderItem = (item: BalanceSheetItem, showPercentage: boolean = false): React.ReactNode[] => {
    const indent = (item.level - 1) * 2;
    const rows: React.ReactNode[] = [];
    
    // Add current row
    rows.push(
      <TableRow key={item.code} className={`${item.level === 1 ? 'bg-primary text-primary-foreground font-bold' : item.level === 2 ? 'bg-muted/50 font-semibold' : ''}`}>
        <TableCell className="font-mono" style={{ paddingLeft: `${indent + 1}rem` }}>
          {item.code}
        </TableCell>
        <TableCell className={item.level === 1 || item.level === 2 ? 'font-bold' : ''}>
          {locale === 'ar' ? item.name : item.nameEn}
        </TableCell>
        <TableCell className="text-right font-medium">
          {formatCurrency(item.amount)}
        </TableCell>
        {showPercentage && (
          <TableCell className="text-right">
            {item.percentage.toFixed(1)}%
          </TableCell>
        )}
      </TableRow>
    );
    
    // Add children rows
    if (item.children) {
      item.children.forEach(child => {
        rows.push(...renderItem(child, showPercentage));
      });
    }
    
    return rows;
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast.success(locale === 'ar' ? `جاري التصدير بصيغة ${format}...` : `Exporting as ${format}...`);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الميزانية العمومية' : 'Balance Sheet'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'المركز المالي وفقاً لمعايير IFRS' : 'Financial Position per IFRS Standards'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'طباعة' : 'Print'}
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الأصول' : 'Total Assets'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAssets)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الخصوم' : 'Total Liabilities'}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalLiabilities)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'حقوق الملكية' : 'Total Equity'}
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalEquity)}</div>
          </CardContent>
        </Card>

        <Card className={isBalanced ? 'border-green-500' : 'border-red-500'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'التوازن' : 'Balance'}
            </CardTitle>
            <DollarSign className={`h-4 w-4 ${isBalanced ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <Badge className={isBalanced ? 'bg-green-600' : 'bg-red-600'}>
              {isBalanced ? (locale === 'ar' ? 'متوازن' : 'Balanced') : (locale === 'ar' ? 'غير متوازن' : 'Unbalanced')}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Balance Sheet */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'الميزانية العمومية التفصيلية' : 'Detailed Balance Sheet'}</CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'كما في' : 'As of'} {new Date().toLocaleDateString()} | 
            <Badge variant="outline" className="ml-2">IFRS Compliant</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="assets">
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="assets">{locale === 'ar' ? 'الأصول' : 'Assets'}</TabsTrigger>
              <TabsTrigger value="liabilities">{locale === 'ar' ? 'الخصوم' : 'Liabilities'}</TabsTrigger>
              <TabsTrigger value="equity">{locale === 'ar' ? 'حقوق الملكية' : 'Equity'}</TabsTrigger>
              <TabsTrigger value="full">{locale === 'ar' ? 'كامل' : 'Full Statement'}</TabsTrigger>
            </TabsList>

            <TabsContent value="assets">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'البند' : 'Item'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map(item => renderItem(item, true))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="liabilities">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'البند' : 'Item'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {liabilities.map(item => renderItem(item, true))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="equity">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'البند' : 'Item'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equity.map(item => renderItem(item, true))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'البند' : 'Item'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map(item => renderItem(item, false))}
                  <TableRow className="border-t-2">
                    <TableCell colSpan={3} className="h-4" />
                  </TableRow>
                  {liabilities.map(item => renderItem(item, false))}
                  <TableRow className="border-t-2">
                    <TableCell colSpan={3} className="h-4" />
                  </TableRow>
                  {equity.map(item => renderItem(item, false))}
                </TableBody>
                <TableFooter>
                  <TableRow className="bg-primary text-primary-foreground">
                    <TableCell colSpan={2} className="font-bold">
                      {locale === 'ar' ? 'المعادلة المحاسبية' : 'Accounting Equation'}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {isBalanced ? '✓' : '✗'} {formatCurrency(totalAssets)} = {formatCurrency(totalLiabilities + totalEquity)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'النسب المالية الرئيسية' : 'Key Financial Ratios'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'النسبة الجارية' : 'Current Ratio'}</p>
              <p className="text-2xl font-bold mt-1">
                {(3500000 / 1800000).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'ar' ? 'الأصول المتداولة / الخصوم المتداولة' : 'Current Assets / Current Liabilities'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'نسبة المديونية' : 'Debt Ratio'}</p>
              <p className="text-2xl font-bold mt-1">
                {((totalLiabilities / totalAssets) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'ar' ? 'الخصوم / الأصول' : 'Total Liabilities / Total Assets'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'نسبة المل��ية' : 'Equity Ratio'}</p>
              <p className="text-2xl font-bold mt-1">
                {((totalEquity / totalAssets) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === 'ar' ? 'حقوق الملكية / الأصول' : 'Total Equity / Total Assets'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
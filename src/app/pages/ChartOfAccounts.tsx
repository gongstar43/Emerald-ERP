import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Search, 
  Download, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Building2,
  ChevronRight,
  ChevronDown,
  FileSpreadsheet,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  universalChartOfAccounts, 
  Account,
  getAccountsByType,
  getAccountsByParent,
  searchAccounts,
  getPostableAccounts,
} from '../../lib/chartOfAccountsData';

export default function ChartOfAccounts() {
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<Account['type'] | 'all'>('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2', '3', '4', '5']));
  const [showStandardsGuide, setShowStandardsGuide] = useState(false);

  const toggleNode = (code: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedNodes(newExpanded);
  };

  const renderAccountRow = (account: Account): JSX.Element[] => {
    const hasChildren = universalChartOfAccounts.some(a => a.parentCode === account.code);
    const isExpanded = expandedNodes.has(account.code);
    const indent = (account.level - 1) * 2;

    const rows: JSX.Element[] = [
      <TableRow key={account.code} className={`${account.isHeader ? 'bg-muted/50 font-semibold' : ''} ${account.level === 1 ? 'bg-primary text-primary-foreground font-bold' : ''}`}>
        <TableCell style={{ paddingLeft: `${indent + 1}rem` }}>
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={() => toggleNode(account.code)}
                className="hover:bg-muted rounded p-1"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            {!hasChildren && <span className="w-6" />}
            <span className="font-mono">{account.code}</span>
          </div>
        </TableCell>
        <TableCell>
          <div>
            <p className={account.isHeader ? 'font-bold' : ''}>
              {locale === 'ar' ? account.nameAr : account.name}
            </p>
            {(account.iasReference || account.ifrsReference) && (
              <p className="text-xs text-muted-foreground">
                {account.iasReference || account.ifrsReference}
              </p>
            )}
          </div>
        </TableCell>
        <TableCell>
          <Badge variant={account.allowPosting ? 'default' : 'outline'}>
            {account.allowPosting ? 
              (locale === 'ar' ? 'قابل للترحيل' : 'Postable') : 
              (locale === 'ar' ? 'رئيسي' : 'Header')
            }
          </Badge>
        </TableCell>
        <TableCell>
          <Badge className={getTypeBadgeColor(account.type)}>
            {getTypeLabel(account.type)}
          </Badge>
        </TableCell>
        <TableCell>
          {account.category}
          {account.subCategory && ` / ${account.subCategory}`}
        </TableCell>
      </TableRow>
    ];

    if (isExpanded && hasChildren) {
      const children = getAccountsByParent(account.code);
      children.forEach(child => {
        rows.push(...renderAccountRow(child));
      });
    }

    return rows;
  };

  const getTypeBadgeColor = (type: Account['type']) => {
    const colors = {
      asset: 'bg-blue-600',
      liability: 'bg-red-600',
      equity: 'bg-green-600',
      revenue: 'bg-purple-600',
      expense: 'bg-orange-600',
    };
    return colors[type];
  };

  const getTypeLabel = (type: Account['type']) => {
    if (locale === 'ar') {
      const labels = {
        asset: 'أصول',
        liability: 'خصوم',
        equity: 'حقوق ملكية',
        revenue: 'إيرادات',
        expense: 'مصروفات',
      };
      return labels[type];
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getFilteredAccounts = () => {
    let accounts = universalChartOfAccounts;

    if (selectedType !== 'all') {
      accounts = accounts.filter(a => a.type === selectedType);
    }

    if (searchTerm) {
      accounts = searchAccounts(searchTerm);
    }

    return accounts.filter(a => a.level === 1);
  };

  const handleExport = () => {
    toast.success(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...');
  };

  const stats = [
    {
      label: locale === 'ar' ? 'إجمالي الحسابات' : 'Total Accounts',
      value: universalChartOfAccounts.length,
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      label: locale === 'ar' ? 'حسابات قابلة للترحيل' : 'Postable Accounts',
      value: getPostableAccounts().length,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      label: locale === 'ar' ? 'الأصول' : 'Assets',
      value: getAccountsByType('asset').length,
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      label: locale === 'ar' ? 'الخصوم' : 'Liabilities',
      value: getAccountsByType('liability').length,
      icon: TrendingDown,
      color: 'text-red-600',
    },
    {
      label: locale === 'ar' ? 'حقوق الملكية' : 'Equity',
      value: getAccountsByType('equity').length,
      icon: Building2,
      color: 'text-green-600',
    },
    {
      label: locale === 'ar' ? 'الإيرادات' : 'Revenue',
      value: getAccountsByType('revenue').length,
      icon: DollarSign,
      color: 'text-purple-600',
    },
    {
      label: locale === 'ar' ? 'المصروفات' : 'Expenses',
      value: getAccountsByType('expense').length,
      icon: TrendingDown,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {locale === 'ar' ? 'دليل الحسابات الشامل' : 'Universal Chart of Accounts'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === 'ar' ? 
              '300+ حساب متوافق مع IFRS/IAS/GAAP - شجرة حسابات عالمية شاملة' : 
              '300+ Accounts compliant with IFRS/IAS/GAAP - Universal comprehensive structure'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowStandardsGuide(true)}>
            <Info className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'دليل المعايير' : 'Standards Guide'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث بالكود أو الاسم...' : 'Search by code or name...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {locale === 'ar' ? 'شجرة الحسابات التفصيلية' : 'Detailed Account Hierarchy'}
              </CardTitle>
              <CardDescription>
                <Badge variant="outline" className="mt-2">IFRS Compliant</Badge>
                <Badge variant="outline" className="mt-2 ml-2">IAS Standards</Badge>
                <Badge variant="outline" className="mt-2 ml-2">GAAP Compatible</Badge>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedType === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                {locale === 'ar' ? 'الكل' : 'All'}
              </Button>
              <Button 
                variant={selectedType === 'asset' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('asset')}
              >
                {locale === 'ar' ? 'الأصول' : 'Assets'}
              </Button>
              <Button 
                variant={selectedType === 'liability' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('liability')}
              >
                {locale === 'ar' ? 'الخصوم' : 'Liabilities'}
              </Button>
              <Button 
                variant={selectedType === 'equity' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('equity')}
              >
                {locale === 'ar' ? 'حقوق الملكية' : 'Equity'}
              </Button>
              <Button 
                variant={selectedType === 'revenue' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('revenue')}
              >
                {locale === 'ar' ? 'الإيرادات' : 'Revenue'}
              </Button>
              <Button 
                variant={selectedType === 'expense' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedType('expense')}
              >
                {locale === 'ar' ? 'المصروفات' : 'Expenses'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className="w-64">{locale === 'ar' ? 'رمز الحساب' : 'Account Code'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'اسم الحساب' : 'Account Name'}</TableHead>
                  <TableHead className="w-32">{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead className="w-32">{locale === 'ar' ? 'التصنيف' : 'Classification'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredAccounts().map(account => renderAccountRow(account))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Standards Guide Dialog */}
      <Dialog open={showStandardsGuide} onOpenChange={setShowStandardsGuide}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              {locale === 'ar' ? 'المعايير المحاسبية المطبقة' : 'Applied Accounting Standards'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'دليل الحسابات متوافق مع أحدث معايير IFRS و IAS الدولية' 
                : 'Chart of Accounts compliant with latest IFRS and IAS international standards'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 md:grid-cols-3 mt-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Badge className="bg-blue-600">IFRS</Badge>
                IFRS Standards
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• IFRS 3 - Business Combinations</li>
                <li>• IFRS 9 - Financial Instruments</li>
                <li>• IFRS 10 - Consolidated Financial Statements</li>
                <li>• IFRS 11 - Joint Arrangements</li>
                <li>• IFRS 15 - Revenue from Contracts</li>
                <li>• IFRS 16 - Leases</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Badge className="bg-green-600">IAS</Badge>
                IAS Standards
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• IAS 1 - Presentation of Financial Statements</li>
                <li>• IAS 2 - Inventories</li>
                <li>• IAS 7 - Statement of Cash Flows</li>
                <li>• IAS 12 - Income Taxes</li>
                <li>• IAS 16 - Property, Plant and Equipment</li>
                <li>• IAS 19 - Employee Benefits</li>
                <li>• IAS 21 - Foreign Currency</li>
                <li>• IAS 24 - Related Party Disclosures</li>
                <li>• IAS 28 - Investments in Associates</li>
                <li>• IAS 36 - Impairment of Assets</li>
                <li>• IAS 37 - Provisions</li>
                <li>• IAS 38 - Intangible Assets</li>
                <li>• IAS 40 - Investment Property</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Badge className="bg-purple-600">{locale === 'ar' ? 'مميزات' : 'Features'}</Badge>
                {locale === 'ar' ? 'الخصائص الرئيسية' : 'Key Features'}
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>✓ {locale === 'ar' ? '300+ حساب شامل' : '300+ comprehensive accounts'}</li>
                <li>✓ {locale === 'ar' ? '4 مستويات هرمية' : '4 hierarchical levels'}</li>
                <li>✓ {locale === 'ar' ? 'توافق كامل مع IFRS/IAS' : 'Full IFRS/IAS compliance'}</li>
                <li>✓ {locale === 'ar' ? 'يصلح لجميع أنواع الأعمال' : 'Suitable for all business types'}</li>
                <li>✓ {locale === 'ar' ? 'تصنيف واضح ومنظم' : 'Clear and organized classification'}</li>
                <li>✓ {locale === 'ar' ? 'مراجع المعايير الدولية' : 'International standards references'}</li>
                <li>✓ {locale === 'ar' ? 'دعم كامل للعربية والإنجليزية' : 'Full Arabic/English support'}</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { IFRS_CHART_OF_ACCOUNTS, AccountType } from '../../../lib/accounting-standards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

const translations = {
  ar: {
    chartOfAccounts: 'دليل الحسابات',
    chartDescription: 'دليل حسابات متوافق مع المعايير الدولية للمحاسبة (IFRS)',
    searchAccounts: 'البحث في الحسابات...',
    addAccount: 'إضافة حساب',
    exportChart: 'تصدير الدليل',
    importChart: 'استيراد دليل',
    accountCode: 'رمز الحساب',
    accountName: 'اسم الحساب',
    type: 'النوع',
    normalBalance: 'الرصيد الطبيعي',
    status: 'الحالة',
    actions: 'الإجراءات',
    debit: 'مدين',
    credit: 'دائن',
    active: 'نشط',
    inactive: 'غير نشط',
    asset: 'أصل',
    liability: 'التزام',
    equity: 'حقوق ملكية',
    revenue: 'إيراد',
    expense: 'مصروف',
    edit: 'تعديل',
    delete: 'حذف',
    totalAccounts: 'إجمالي الحسابات',
    assets: 'الأصول',
    liabilities: 'الالتزامات',
    revenues: 'الإيرادات',
    expenses: 'المصروفات',
  },
  en: {
    chartOfAccounts: 'Chart of Accounts',
    chartDescription: 'IFRS-compliant chart of accounts',
    searchAccounts: 'Search accounts...',
    addAccount: 'Add Account',
    exportChart: 'Export Chart',
    importChart: 'Import Chart',
    accountCode: 'Account Code',
    accountName: 'Account Name',
    type: 'Type',
    normalBalance: 'Normal Balance',
    status: 'Status',
    actions: 'Actions',
    debit: 'Debit',
    credit: 'Credit',
    active: 'Active',
    inactive: 'Inactive',
    asset: 'Asset',
    liability: 'Liability',
    equity: 'Equity',
    revenue: 'Revenue',
    expense: 'Expense',
    edit: 'Edit',
    delete: 'Delete',
    totalAccounts: 'Total Accounts',
    assets: 'Assets',
    liabilities: 'Liabilities',
    revenues: 'Revenues',
    expenses: 'Expenses',
  },
};

export default function ChartOfAccounts() {
  const { locale } = useLanguage();
  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const [accounts] = useState<AccountType[]>(IFRS_CHART_OF_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<string>('all');

  // Filter accounts based on search and type
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.accountCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.nameAr.includes(searchTerm);

    const matchesType = filterType === 'all' || account.category === filterType;

    return matchesSearch && matchesType;
  });

  // Get parent accounts (level 1)
  const parentAccounts = filteredAccounts.filter((acc) => acc.level === 1);

  // Get children for a parent
  const getChildren = (parentId: string, level: number): AccountType[] => {
    return filteredAccounts.filter((acc) => acc.parentId === parentId && acc.level === level);
  };

  const toggleExpand = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'asset':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'liability':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'equity':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'revenue':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'expense':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: accounts.length,
    assets: accounts.filter((a) => a.category === 'asset').length,
    liabilities: accounts.filter((a) => a.category === 'liability').length,
    equity: accounts.filter((a) => a.category === 'equity').length,
    revenue: accounts.filter((a) => a.category === 'revenue').length,
    expense: accounts.filter((a) => a.category === 'expense').length,
  };

  const renderAccount = (account: AccountType, depth: number = 0) => {
    const isExpanded = expandedAccounts.has(account.id);
    const hasChildren = filteredAccounts.some((a) => a.parentId === account.id);
    const paddingLeft = `${depth * 2}rem`;

    return (
      <React.Fragment key={account.id}>
        <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800">
          <TableCell style={{ paddingLeft }}>
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(account.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-6" />}
              <span className="font-mono text-sm">{account.accountCode}</span>
            </div>
          </TableCell>
          <TableCell className="font-medium">
            {locale === 'ar' ? account.nameAr : account.name}
          </TableCell>
          <TableCell>
            <Badge className={getCategoryColor(account.category)}>
              {t(account.category as any)}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant={account.normalBalance === 'debit' ? 'default' : 'secondary'}>
              {t(account.normalBalance)}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant={account.isActive ? 'default' : 'secondary'}>
              {account.isActive ? t('active') : t('inactive')}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {isExpanded &&
          hasChildren &&
          getChildren(account.id, account.level + 1).map((child) =>
            renderAccount(child, depth + 1)
          )}
      </React.Fragment>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            {t('chartOfAccounts')}
          </h1>
          <p className="text-gray-600 mt-1">{t('chartDescription')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            {t('importChart')}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('exportChart')}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('addAccount')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('totalAccounts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              {t('assets')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              {t('liabilities')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.liabilities}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">
              {t('equity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.equity}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              {t('revenues')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              {t('expenses')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expense}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('searchAccounts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                {locale === 'ar' ? 'الكل' : 'All'}
              </Button>
              <Button
                variant={filterType === 'asset' ? 'default' : 'outline'}
                onClick={() => setFilterType('asset')}
              >
                {t('assets')}
              </Button>
              <Button
                variant={filterType === 'liability' ? 'default' : 'outline'}
                onClick={() => setFilterType('liability')}
              >
                {t('liabilities')}
              </Button>
              <Button
                variant={filterType === 'revenue' ? 'default' : 'outline'}
                onClick={() => setFilterType('revenue')}
              >
                {t('revenues')}
              </Button>
              <Button
                variant={filterType === 'expense' ? 'default' : 'outline'}
                onClick={() => setFilterType('expense')}
              >
                {t('expenses')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('accountCode')}</TableHead>
                <TableHead>{t('accountName')}</TableHead>
                <TableHead>{t('type')}</TableHead>
                <TableHead>{t('normalBalance')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parentAccounts.map((account) => renderAccount(account, 0))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

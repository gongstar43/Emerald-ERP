import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  PackageX,
  Plus,
  Search,
  Eye,
  Edit,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingDown,
} from 'lucide-react';

const mockReturns = [
  {
    id: 'SR-2024-001',
    invoiceId: 'INV-2024-015',
    customer: 'شركة الأمل التجارية',
    returnDate: '2024-02-20',
    reason: 'منتج معيب',
    amount: 15000,
    status: 'approved',
    refundMethod: 'credit_note',
    items: [
      { name: 'كمبيوتر محمول', quantity: 1, price: 15000 },
    ],
    createdAt: '2024-02-20',
  },
  {
    id: 'SR-2024-002',
    invoiceId: 'INV-2024-018',
    customer: 'مؤسسة النجاح',
    returnDate: '2024-02-22',
    reason: 'خطأ في الطلب',
    amount: 8500,
    status: 'pending',
    refundMethod: 'refund',
    items: [
      { name: 'طابعة ليزر', quantity: 1, price: 8500 },
    ],
    createdAt: '2024-02-22',
  },
  {
    id: 'SR-2024-003',
    invoiceId: 'INV-2024-020',
    customer: 'شركة التقنية المتطورة',
    returnDate: '2024-02-25',
    reason: 'تغيير في المتطلبات',
    amount: 25000,
    status: 'rejected',
    refundMethod: null,
    items: [
      { name: 'خادم', quantity: 1, price: 25000 },
    ],
    createdAt: '2024-02-25',
  },
];

export default function SalesReturns() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [returns, setReturns] = useState(mockReturns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translations = {
    ar: {
      title: 'مرتجعات المبيعات',
      subtitle: 'إدارة المرتجعات والاستردادات',
      addReturn: 'مرتجع جديد',
      search: 'بحث...',
      status: 'الحالة',
      all: 'الكل',
      pending: 'قيد المراجعة',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      returnId: 'رقم المرتجع',
      invoiceId: 'رقم الفاتورة',
      customer: 'العميل',
      returnDate: 'تاريخ المرتجع',
      reason: 'السبب',
      amount: 'المبلغ',
      refundMethod: 'طريقة الاسترداد',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      totalReturns: 'إجمالي المرتجعات',
      pendingReview: 'قيد المراجعة',
      totalAmount: 'إجمالي المبلغ',
      creditNote: 'إشعار دائن',
      refund: 'استرداد نقدي',
    },
    en: {
      title: 'Sales Returns',
      subtitle: 'Manage Returns and Refunds',
      addReturn: 'New Return',
      search: 'Search...',
      status: 'Status',
      all: 'All',
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      returnId: 'Return ID',
      invoiceId: 'Invoice ID',
      customer: 'Customer',
      returnDate: 'Return Date',
      reason: 'Reason',
      amount: 'Amount',
      refundMethod: 'Refund Method',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      totalReturns: 'Total Returns',
      pendingReview: 'Pending Review',
      totalAmount: 'Total Amount',
      creditNote: 'Credit Note',
      refund: 'Cash Refund',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('pending'), variant: 'outline' as const, icon: Clock },
      approved: { label: t('approved'), variant: 'default' as const, icon: CheckCircle },
      rejected: { label: t('rejected'), variant: 'destructive' as const, icon: AlertCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = 
      ret.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ret.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = returns.filter(r => r.status === 'pending').length;
  const totalAmount = returns.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <PackageX className="h-8 w-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalReturns')}</CardTitle>
            <PackageX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{returns.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('pendingReview')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalAmount')}</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all')}</SelectItem>
                  <SelectItem value="pending">{t('pending')}</SelectItem>
                  <SelectItem value="approved">{t('approved')}</SelectItem>
                  <SelectItem value="rejected">{t('rejected')}</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addReturn')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('returnId')}</TableHead>
                <TableHead>{t('invoiceId')}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('returnDate')}</TableHead>
                <TableHead>{t('reason')}</TableHead>
                <TableHead>{t('amount')}</TableHead>
                <TableHead>{t('refundMethod')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.map((ret) => (
                <TableRow key={ret.id}>
                  <TableCell className="font-medium">{ret.id}</TableCell>
                  <TableCell>{ret.invoiceId}</TableCell>
                  <TableCell>{ret.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {ret.returnDate}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{ret.reason}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {formatCurrency(ret.amount)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {ret.refundMethod ? (
                      <Badge variant="secondary">
                        {ret.refundMethod === 'credit_note' ? t('creditNote') : t('refund')}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(ret.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

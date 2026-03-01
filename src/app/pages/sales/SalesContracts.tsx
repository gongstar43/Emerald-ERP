import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import {
  FileCheck,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  User,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Target,
} from 'lucide-react';
import { toast } from 'sonner';

// IFRS 15 - Step 1: Identify the contract with a customer
const mockContracts = [
  {
    id: 'CONT-2024-001',
    customer: 'شركة الأمل التجارية',
    title: 'عقد توريد معدات',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 500000,
    status: 'active',
    paymentTerms: 'شهري',
    performanceObligations: [
      { description: 'توريد المعدات', status: 'completed', value: 200000 },
      { description: 'التركيب والتشغيل', status: 'in_progress', value: 150000 },
      { description: 'الصيانة لمدة سنة', status: 'pending', value: 150000 },
    ],
    revenueRecognized: 200000,
    createdAt: '2024-01-01',
  },
  {
    id: 'CONT-2024-002',
    customer: 'مؤسسة النجاح',
    title: 'عقد خدمات استشارية',
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    value: 300000,
    status: 'active',
    paymentTerms: 'ربع سنوي',
    performanceObligations: [
      { description: 'دراسة وتحليل', status: 'completed', value: 100000 },
      { description: 'إعداد خطة استراتيجية', status: 'in_progress', value: 100000 },
      { description: 'التنفيذ والمتابعة', status: 'pending', value: 100000 },
    ],
    revenueRecognized: 100000,
    createdAt: '2024-02-01',
  },
  {
    id: 'CONT-2024-003',
    customer: 'شركة التقنية المتطورة',
    title: 'عقد تطوير نظام ERP',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    value: 800000,
    status: 'active',
    paymentTerms: 'حسب المراحل',
    performanceObligations: [
      { description: 'تحليل المتطلبات', status: 'completed', value: 150000 },
      { description: 'التصميم والتطوير', status: 'in_progress', value: 400000 },
      { description: 'الاختبار والتسليم', status: 'pending', value: 150000 },
      { description: 'التدريب والدعم', status: 'pending', value: 100000 },
    ],
    revenueRecognized: 150000,
    createdAt: '2024-03-01',
  },
];

export default function SalesContracts() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [contracts, setContracts] = useState(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const translations = {
    ar: {
      title: 'عقود المبيعات',
      subtitle: 'إدارة العقود والالتزامات الأدائية - IFRS 15',
      addContract: 'عقد جديد',
      search: 'بحث...',
      status: 'الحالة',
      all: 'الكل',
      active: 'نشط',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      contractId: 'رقم العقد',
      customer: 'العميل',
      contractTitle: 'عنوان العقد',
      startDate: 'تاريخ البداية',
      endDate: 'تاريخ النهاية',
      value: 'القيمة',
      revenueRecognized: 'الإيراد المعترف به',
      paymentTerms: 'شروط الدفع',
      performanceObligations: 'الالتزامات الأدائية',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ',
      cancel: 'إلغاء',
      obligation: 'الالتزام',
      obligationStatus: 'حالة الالتزام',
      obligationValue: 'قيمة الالتزام',
      inProgress: 'قيد التنفيذ',
      pending: 'معلق',
      totalContracts: 'إجمالي العقود',
      totalValue: 'إجمالي القيمة',
      totalRevenue: 'إجمالي الإيراد المعترف به',
      contractDetails: 'تفاصيل العقد',
    },
    en: {
      title: 'Sales Contracts',
      subtitle: 'Manage Contracts and Performance Obligations - IFRS 15',
      addContract: 'New Contract',
      search: 'Search...',
      status: 'Status',
      all: 'All',
      active: 'Active',
      completed: 'Completed',
      cancelled: 'Cancelled',
      contractId: 'Contract ID',
      customer: 'Customer',
      contractTitle: 'Contract Title',
      startDate: 'Start Date',
      endDate: 'End Date',
      value: 'Value',
      revenueRecognized: 'Revenue Recognized',
      paymentTerms: 'Payment Terms',
      performanceObligations: 'Performance Obligations',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      obligation: 'Obligation',
      obligationStatus: 'Status',
      obligationValue: 'Value',
      inProgress: 'In Progress',
      pending: 'Pending',
      totalContracts: 'Total Contracts',
      totalValue: 'Total Value',
      totalRevenue: 'Total Revenue Recognized',
      contractDetails: 'Contract Details',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: t('active'), variant: 'default' as const, icon: CheckCircle },
      completed: { label: t('completed'), variant: 'secondary' as const, icon: CheckCircle },
      cancelled: { label: t('cancelled'), variant: 'destructive' as const, icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getObligationStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: t('completed'), variant: 'default' as const },
      in_progress: { label: t('inProgress'), variant: 'secondary' as const },
      pending: { label: t('pending'), variant: 'outline' as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
  const totalRevenue = contracts.reduce((sum, c) => sum + c.revenueRecognized, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileCheck className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
        <Badge className="bg-blue-600 text-white">IFRS 15 - Step 1</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalContracts')}</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalValue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRevenue')}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalRevenue / totalValue) * 100).toFixed(1)}% {locale === 'ar' ? 'من الإجمالي' : 'of total'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
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
                  <SelectItem value="active">{t('active')}</SelectItem>
                  <SelectItem value="completed">{t('completed')}</SelectItem>
                  <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t('addContract')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('contractId')}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('contractTitle')}</TableHead>
                <TableHead>{t('startDate')}</TableHead>
                <TableHead>{t('endDate')}</TableHead>
                <TableHead>{t('value')}</TableHead>
                <TableHead>{t('revenueRecognized')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {contract.customer}
                    </div>
                  </TableCell>
                  <TableCell>{contract.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {contract.startDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {contract.endDate}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(contract.value)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(contract.revenueRecognized)}</div>
                      <div className="text-xs text-muted-foreground">
                        {((contract.revenueRecognized / contract.value) * 100).toFixed(0)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedContract(contract)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contract Details Dialog */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('contractDetails')}</DialogTitle>
            <DialogDescription>
              {selectedContract?.id} - {selectedContract?.customer}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContract && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('contractTitle')}</Label>
                  <p className="font-medium mt-1">{selectedContract.title}</p>
                </div>
                <div>
                  <Label>{t('status')}</Label>
                  <div className="mt-1">{getStatusBadge(selectedContract.status)}</div>
                </div>
                <div>
                  <Label>{t('startDate')}</Label>
                  <p className="font-medium mt-1">{selectedContract.startDate}</p>
                </div>
                <div>
                  <Label>{t('endDate')}</Label>
                  <p className="font-medium mt-1">{selectedContract.endDate}</p>
                </div>
                <div>
                  <Label>{t('value')}</Label>
                  <p className="font-medium mt-1">{formatCurrency(selectedContract.value)}</p>
                </div>
                <div>
                  <Label>{t('revenueRecognized')}</Label>
                  <p className="font-medium mt-1">{formatCurrency(selectedContract.revenueRecognized)}</p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-lg">{t('performanceObligations')}</Label>
                <div className="mt-4 space-y-3">
                  {selectedContract.performanceObligations.map((obligation: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{obligation.description}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatCurrency(obligation.value)}
                            </p>
                          </div>
                          {getObligationStatusBadge(obligation.status)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedContract(null)}>
              {t('cancel')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

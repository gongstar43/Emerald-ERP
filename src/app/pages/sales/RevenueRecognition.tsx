import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Users,
  DollarSign,
  BarChart3,
  Calendar,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

// IFRS 15 - Five Step Model
const mockContracts = [
  {
    id: 'CONT-2024-001',
    customer: 'شركة الأمل التجارية',
    contractValue: 500000,
    step1: { status: 'completed', date: '2024-01-01', note: 'تم تحديد العقد مع العميل' },
    step2: { status: 'completed', date: '2024-01-02', obligations: 3 },
    step3: { status: 'completed', date: '2024-01-03', transactionPrice: 500000 },
    step4: { status: 'completed', date: '2024-01-04', allocation: 'نسبي حسب القيمة' },
    step5: { status: 'in_progress', date: '2024-01-05', recognizedRevenue: 200000, percentage: 40 },
    contractAsset: 50000,
    contractLiability: 100000,
    deferredRevenue: 200000,
  },
  {
    id: 'CONT-2024-002',
    customer: 'مؤسسة النجاح',
    contractValue: 300000,
    step1: { status: 'completed', date: '2024-02-01', note: 'تم تحديد العقد مع العميل' },
    step2: { status: 'completed', date: '2024-02-02', obligations: 3 },
    step3: { status: 'completed', date: '2024-02-03', transactionPrice: 300000 },
    step4: { status: 'completed', date: '2024-02-04', allocation: 'نسبي حسب القيمة' },
    step5: { status: 'in_progress', date: '2024-02-05', recognizedRevenue: 100000, percentage: 33 },
    contractAsset: 30000,
    contractLiability: 50000,
    deferredRevenue: 150000,
  },
];

export default function RevenueRecognition() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [contracts, setContracts] = useState(mockContracts);
  const [showGuide, setShowGuide] = useState(false);

  const translations = {
    ar: {
      title: 'الاعتراف بالإيراد',
      subtitle: 'نموذج الخطوات الخمس - IFRS 15',
      overview: 'نظرة عامة',
      fiveStepModel: 'نموذج الخطوات الخمس',
      contractAnalysis: 'تحليل العقود',
      
      // Five Steps
      step1: 'الخطوة 1: تحديد العقد',
      step1Desc: 'تحديد العقد مع العميل',
      step2: 'الخطوة 2: الالتزامات الأدائية',
      step2Desc: 'تحديد الالتزامات الأدائية في العقد',
      step3: 'الخطوة 3: سعر المعاملة',
      step3Desc: 'تحديد سعر المعاملة',
      step4: 'الخطوة 4: تخصيص السعر',
      step4Desc: 'تخصيص سعر المعاملة على الالتزامات',
      step5: 'الخطوة 5: الاعتراف بالإيراد',
      step5Desc: 'الاعتراف بالإيراد عند تنفيذ الالتزام',
      
      // Status
      completed: 'مكتمل',
      inProgress: 'قيد التنفيذ',
      pending: 'معلق',
      
      // Metrics
      totalContracts: 'إجمالي العقود',
      totalContractValue: 'إجمالي قيمة العقود',
      recognizedRevenue: 'الإيراد المعترف به',
      deferredRevenue: 'الإيراد المؤجل',
      contractAssets: 'أصول العقود',
      contractLiabilities: 'التزامات العقود',
      
      // Table
      contractId: 'رقم العقد',
      customer: 'العميل',
      contractValue: 'قيمة العقد',
      revenueRecognized: 'الإيراد المعترف به',
      progress: 'التقدم',
      status: 'الحالة',
      actions: 'الإجراءات',
      view: 'عرض',
      
      // Details
      obligations: 'التزامات',
      transactionPrice: 'سعر المعاملة',
      allocation: 'التخصيص',
      percentage: 'النسبة',
    },
    en: {
      title: 'Revenue Recognition',
      subtitle: 'Five-Step Model - IFRS 15',
      overview: 'Overview',
      fiveStepModel: 'Five-Step Model',
      contractAnalysis: 'Contract Analysis',
      
      // Five Steps
      step1: 'Step 1: Identify Contract',
      step1Desc: 'Identify the contract with a customer',
      step2: 'Step 2: Performance Obligations',
      step2Desc: 'Identify performance obligations in the contract',
      step3: 'Step 3: Transaction Price',
      step3Desc: 'Determine the transaction price',
      step4: 'Step 4: Allocate Price',
      step4Desc: 'Allocate transaction price to obligations',
      step5: 'Step 5: Recognize Revenue',
      step5Desc: 'Recognize revenue when obligation is satisfied',
      
      // Status
      completed: 'Completed',
      inProgress: 'In Progress',
      pending: 'Pending',
      
      // Metrics
      totalContracts: 'Total Contracts',
      totalContractValue: 'Total Contract Value',
      recognizedRevenue: 'Revenue Recognized',
      deferredRevenue: 'Deferred Revenue',
      contractAssets: 'Contract Assets',
      contractLiabilities: 'Contract Liabilities',
      
      // Table
      contractId: 'Contract ID',
      customer: 'Customer',
      contractValue: 'Contract Value',
      revenueRecognized: 'Revenue Recognized',
      progress: 'Progress',
      status: 'Status',
      actions: 'Actions',
      view: 'View',
      
      // Details
      obligations: 'Obligations',
      transactionPrice: 'Transaction Price',
      allocation: 'Allocation',
      percentage: 'Percentage',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const totalContractValue = contracts.reduce((sum, c) => sum + c.contractValue, 0);
  const totalRecognized = contracts.reduce((sum, c) => sum + c.step5.recognizedRevenue, 0);
  const totalDeferred = contracts.reduce((sum, c) => sum + c.deferredRevenue, 0);
  const totalContractAssets = contracts.reduce((sum, c) => sum + c.contractAsset, 0);
  const totalContractLiabilities = contracts.reduce((sum, c) => sum + c.contractLiability, 0);

  const getStepStatus = (status: string) => {
    const statusConfig = {
      completed: { label: t('completed'), variant: 'default' as const, icon: CheckCircle },
      in_progress: { label: t('inProgress'), variant: 'secondary' as const, icon: Clock },
      pending: { label: t('pending'), variant: 'outline' as const, icon: AlertCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || AlertCircle;
    
    return (
      <Badge variant={config?.variant || 'outline'} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config?.label || status}
      </Badge>
    );
  };

  const FiveStepCard = ({ step, title, desc, icon: Icon }: any) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm">{desc}</CardDescription>
            </div>
          </div>
          <Badge className="bg-blue-600 text-white">{step}</Badge>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <Badge className="bg-blue-600 text-white">IFRS 15</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{t('subtitle')}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowGuide(true)}>
          <BookOpen className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'دليل النموذج' : 'Model Guide'}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalContracts')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalContractValue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalContractValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('recognizedRevenue')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRecognized)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalRecognized / totalContractValue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('deferredRevenue')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDeferred)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('contractAssets')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalContractAssets)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('contractLiabilities')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalContractLiabilities)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>{t('contractAnalysis')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('contractId')}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead className="text-right">{t('contractValue')}</TableHead>
                <TableHead className="text-right">{t('revenueRecognized')}</TableHead>
                <TableHead>{t('progress')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.customer}</TableCell>
                  <TableCell className="text-right">{formatCurrency(contract.contractValue)}</TableCell>
                  <TableCell className="text-right">
                    <div>
                      <div className="font-medium">{formatCurrency(contract.step5.recognizedRevenue)}</div>
                      <div className="text-xs text-muted-foreground">
                        {contract.step5.percentage}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={contract.step5.percentage} className="w-[100px]" />
                      <span className="text-xs text-muted-foreground">{contract.step5.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStepStatus(contract.step5.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      {t('view')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Five-Step Model Guide Dialog */}
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              {t('fiveStepModel')}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'نموذج الخطوات الخمس للاعتراف بالإيراد وفقاً لمعيار IFRS 15' 
                : 'Five-Step Model for Revenue Recognition according to IFRS 15'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <FiveStepCard
              step="1"
              title={t('step1')}
              desc={t('step1Desc')}
              icon={FileText}
            />
            <FiveStepCard
              step="2"
              title={t('step2')}
              desc={t('step2Desc')}
              icon={CheckCircle}
            />
            <FiveStepCard
              step="3"
              title={t('step3')}
              desc={t('step3Desc')}
              icon={DollarSign}
            />
            <FiveStepCard
              step="4"
              title={t('step4')}
              desc={t('step4Desc')}
              icon={BarChart3}
            />
            <FiveStepCard
              step="5"
              title={t('step5')}
              desc={t('step5Desc')}
              icon={Target}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
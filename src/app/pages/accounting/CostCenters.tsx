import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
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
} from '../../components/ui/table';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import {
  Plus,
  Search,
  Filter,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  PieChart,
  Target,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

interface CostCenter {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  type: 'department' | 'project' | 'activity' | 'product';
  parent?: string;
  manager: string;
  budget: number;
  actualCost: number;
  variance: number;
  variancePercentage: number;
  status: 'active' | 'inactive';
  startDate: string;
  endDate?: string;
  description: string;
}

export default function CostCenters() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<CostCenter | null>(null);

  // Mock data
  const costCenters: CostCenter[] = [
    {
      id: '1',
      code: 'CC-001',
      name: 'قسم تقنية المعلومات',
      nameEn: 'IT Department',
      type: 'department',
      manager: 'أحمد محمد',
      budget: 1200000,
      actualCost: 980000,
      variance: 220000,
      variancePercentage: 18.3,
      status: 'active',
      startDate: '2024-01-01',
      description: 'مسؤول عن جميع عمليات تقنية المعلومات',
    },
    {
      id: '2',
      code: 'CC-002',
      name: 'قسم المبيعات',
      nameEn: 'Sales Department',
      type: 'department',
      manager: 'فاطمة علي',
      budget: 850000,
      actualCost: 920000,
      variance: -70000,
      variancePercentage: -8.2,
      status: 'active',
      startDate: '2024-01-01',
      description: 'إدارة عمليات المبيعات والعملاء',
    },
    {
      id: '3',
      code: 'CC-PRJ-001',
      name: 'مشروع تطوير ERP',
      nameEn: 'ERP Development Project',
      type: 'project',
      manager: 'خالد أحمد',
      budget: 5000000,
      actualCost: 2450000,
      variance: 2550000,
      variancePercentage: 51,
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      description: 'تطوير نظام ERP متكامل',
    },
    {
      id: '4',
      code: 'CC-003',
      name: 'قسم الموارد البشرية',
      nameEn: 'HR Department',
      type: 'department',
      manager: 'سارة محمود',
      budget: 650000,
      actualCost: 580000,
      variance: 70000,
      variancePercentage: 10.8,
      status: 'active',
      startDate: '2024-01-01',
      description: 'إدارة الموارد البشرية والتوظيف',
    },
  ];

  const getTypeBadge = (type: CostCenter['type']) => {
    const typeConfig = {
      department: { label: locale === 'ar' ? 'قسم' : 'Department', className: 'bg-blue-600' },
      project: { label: locale === 'ar' ? 'مشروع' : 'Project', className: 'bg-purple-600' },
      activity: { label: locale === 'ar' ? 'نشاط' : 'Activity', className: 'bg-green-600' },
      product: { label: locale === 'ar' ? 'منتج' : 'Product', className: 'bg-orange-600' },
    };
    const config = typeConfig[type];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: CostCenter['status']) => {
    return status === 'active' ? (
      <Badge className="bg-green-600">{locale === 'ar' ? 'نشط' : 'Active'}</Badge>
    ) : (
      <Badge variant="secondary">{locale === 'ar' ? 'غير نشط' : 'Inactive'}</Badge>
    );
  };

  const totalBudget = costCenters.reduce((sum, cc) => sum + cc.budget, 0);
  const totalActual = costCenters.reduce((sum, cc) => sum + cc.actualCost, 0);
  const totalVariance = totalBudget - totalActual;
  const overBudgetCount = costCenters.filter(cc => cc.variance < 0).length;

  const filteredCenters = costCenters.filter(cc => {
    const matchesSearch = cc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cc.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || cc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'مراكز التكلفة' : 'Cost Centers'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة ومتابعة مراكز التكلفة والميزانيات' : 'Manage and monitor cost centers and budgets'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'مركز تكلفة جديد' : 'New Cost Center'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إضافة مركز تكلفة جديد' : 'Add New Cost Center'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'املأ معلومات مركز التكلفة' : 'Fill in cost center information'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الكود' : 'Code'}</Label>
                  <Input placeholder="CC-XXX" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'النوع' : 'Type'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر النوع' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">{locale === 'ar' ? 'قسم' : 'Department'}</SelectItem>
                      <SelectItem value="project">{locale === 'ar' ? 'مشروع' : 'Project'}</SelectItem>
                      <SelectItem value="activity">{locale === 'ar' ? 'نشاط' : 'Activity'}</SelectItem>
                      <SelectItem value="product">{locale === 'ar' ? 'منتج' : 'Product'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم بالعربية' : 'Arabic Name'}</Label>
                <Input placeholder={locale === 'ar' ? 'أدخل الاسم' : 'Enter name'} />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم بالإنجليزية' : 'English Name'}</Label>
                <Input placeholder="Enter name" />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'المسؤول' : 'Manager'}</Label>
                <Input placeholder={locale === 'ar' ? 'اسم المسؤول' : 'Manager name'} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الميزانية' : 'Budget'}</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ البدء' : 'Start Date'}</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                <Textarea 
                  placeholder={locale === 'ar' ? 'أضف وصف...' : 'Add description...'}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم إضافة مركز التكلفة' : 'Cost center added');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الميزانية' : 'Total Budget'}
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {costCenters.length} {locale === 'ar' ? 'مركز' : 'centers'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'التكلفة الفعلية' : 'Actual Cost'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalActual)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((totalActual / totalBudget) * 100)}% {locale === 'ar' ? 'من الميزانية' : 'of budget'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'الفرق' : 'Variance'}
            </CardTitle>
            {totalVariance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalVariance >= 0 ? '+' : ''}{formatCurrency(totalVariance)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.abs(Math.round((totalVariance / totalBudget) * 100))}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'تجاوز الميزانية' : 'Over Budget'}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overBudgetCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'مركز' : 'centers'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                <SelectItem value="department">{locale === 'ar' ? 'قسم' : 'Department'}</SelectItem>
                <SelectItem value="project">{locale === 'ar' ? 'مشروع' : 'Project'}</SelectItem>
                <SelectItem value="activity">{locale === 'ar' ? 'نشاط' : 'Activity'}</SelectItem>
                <SelectItem value="product">{locale === 'ar' ? 'منتج' : 'Product'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cost Centers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المسؤول' : 'Manager'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الميزانية' : 'Budget'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الفعلي' : 'Actual'}</TableHead>
                <TableHead className="text-center">{locale === 'ar' ? 'الفرق' : 'Variance'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell className="font-medium">{center.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{locale === 'ar' ? center.name : center.nameEn}</p>
                      <p className="text-xs text-muted-foreground">{center.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(center.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {center.manager}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(center.budget)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className="font-medium">{formatCurrency(center.actualCost)}</p>
                      <Progress 
                        value={(center.actualCost / center.budget) * 100} 
                        className="h-1.5 mt-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`font-medium ${center.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {center.variance >= 0 ? '+' : ''}{formatCurrency(center.variance)}
                      <p className="text-xs">
                        ({center.variance >= 0 ? '+' : ''}{center.variancePercentage.toFixed(1)}%)
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(center.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCenter(center)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      {selectedCenter && (
        <Dialog open={!!selectedCenter} onOpenChange={() => setSelectedCenter(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {locale === 'ar' ? selectedCenter.name : selectedCenter.nameEn}
              </DialogTitle>
              <DialogDescription>{selectedCenter.code}</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">{locale === 'ar' ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                <TabsTrigger value="budget">{locale === 'ar' ? 'الميزانية' : 'Budget'}</TabsTrigger>
                <TabsTrigger value="analysis">{locale === 'ar' ? 'التحليل' : 'Analysis'}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{locale === 'ar' ? 'النوع' : 'Type'}</CardTitle>
                    </CardHeader>
                    <CardContent>{getTypeBadge(selectedCenter.type)}</CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{locale === 'ar' ? 'المسؤول' : 'Manager'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{selectedCenter.manager}</p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">{locale === 'ar' ? 'الوصف' : 'Description'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedCenter.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="budget" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{locale === 'ar' ? 'الميزانية' : 'Budget'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatCurrency(selectedCenter.budget)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{locale === 'ar' ? 'الفعلي' : 'Actual'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatCurrency(selectedCenter.actualCost)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{locale === 'ar' ? 'الفرق' : 'Variance'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${selectedCenter.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedCenter.variance >= 0 ? '+' : ''}{formatCurrency(selectedCenter.variance)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analysis">
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{locale === 'ar' ? 'التحليلات والمخططات' : 'Analytics and Charts'}</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

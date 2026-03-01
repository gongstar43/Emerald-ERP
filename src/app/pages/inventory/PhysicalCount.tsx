import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Plus,
  Search,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Equal,
  Eye,
  Download,
  FileText,
  Target,
  Edit,
  Trash2,
  Save,
  Printer,
  BarChart3,
  Package,
  Calendar,
  User,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';
import { universalInventoryItems } from '../../../lib/inventoryData';

interface PhysicalCount {
  id: string;
  countNumber: string;
  date: string;
  warehouse: string;
  warehouseId: string;
  countType: 'full' | 'partial' | 'cycle';
  status: 'planned' | 'in_progress' | 'completed' | 'reconciled';
  itemsCounted: number;
  totalItems: number;
  variances: number;
  countedBy: string;
  approvedBy?: string;
  notes: string;
  createdDate: string;
  completedDate?: string;
}

interface CountItem {
  id: string;
  itemCode: string;
  itemName: string;
  itemNameAr: string;
  systemQty: number;
  countedQty: number | null;
  variance: number;
  varianceValue: number;
  unitCost: number;
  unit: string;
  unitAr: string;
  location: string;
  status: 'pending' | 'matched' | 'over' | 'short';
  notes: string;
  countedDate?: string;
  countedBy?: string;
}

export default function PhysicalCount() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState<PhysicalCount | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    warehouse: '',
    countType: '',
    scheduledDate: '',
    countedBy: '',
    notes: '',
  });

  // Mock data - using real inventory items
  const physicalCounts: PhysicalCount[] = [
    {
      id: '1',
      countNumber: 'PC-2024-001',
      date: '2024-02-28',
      warehouse: locale === 'ar' ? 'مستودع الرياض الرئيسي' : 'Riyadh Main Warehouse',
      warehouseId: 'WH-001',
      countType: 'full',
      status: 'in_progress',
      itemsCounted: 145,
      totalItems: 230,
      variances: 12,
      countedBy: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      notes: locale === 'ar' ? 'جرد ربع سنوي - Q1 2024' : 'Quarterly count - Q1 2024',
      createdDate: '2024-02-28T08:00:00',
    },
    {
      id: '2',
      countNumber: 'PC-2024-002',
      date: '2024-02-25',
      warehouse: locale === 'ar' ? 'فرع جدة' : 'Jeddah Branch',
      warehouseId: 'WH-002',
      countType: 'cycle',
      status: 'completed',
      itemsCounted: 45,
      totalItems: 45,
      variances: 3,
      countedBy: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      approvedBy: locale === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      notes: locale === 'ar' ? 'جرد دوري - مواد سريعة الحركة' : 'Cycle count - Fast moving items',
      createdDate: '2024-02-25T09:00:00',
      completedDate: '2024-02-25T16:30:00',
    },
    {
      id: '3',
      countNumber: 'PC-2024-003',
      date: '2024-02-20',
      warehouse: locale === 'ar' ? 'فرع الدمام' : 'Dammam Branch',
      warehouseId: 'WH-003',
      countType: 'partial',
      status: 'reconciled',
      itemsCounted: 85,
      totalItems: 85,
      variances: 5,
      countedBy: locale === 'ar' ? 'خالد عبدالله' : 'Khalid Abdullah',
      approvedBy: locale === 'ar' ? 'محمد سعيد' : 'Mohammed Saeed',
      notes: locale === 'ar' ? 'جرد جزئي - قسم الإلكترونيات' : 'Partial count - Electronics section',
      createdDate: '2024-02-20T10:00:00',
      completedDate: '2024-02-20T15:00:00',
    },
  ];

  // Generate count items from universal inventory
  const generateCountItems = (): CountItem[] => {
    return universalInventoryItems.slice(0, 20).map((item, index) => {
      const systemQty = item.currentStock;
      const countedQty = systemQty + Math.floor(Math.random() * 11) - 5; // Random variance between -5 and +5
      const variance = countedQty - systemQty;
      const varianceValue = variance * item.costPrice;
      
      let status: CountItem['status'] = 'pending';
      if (countedQty !== null) {
        if (variance === 0) status = 'matched';
        else if (variance > 0) status = 'over';
        else status = 'short';
      }

      return {
        id: `CI-${index + 1}`,
        itemCode: item.code,
        itemName: item.nameEn,
        itemNameAr: item.nameAr,
        systemQty,
        countedQty,
        variance,
        varianceValue,
        unitCost: item.costPrice,
        unit: item.unit,
        unitAr: item.unitAr,
        location: item.warehouseLocation,
        status,
        notes: '',
        countedDate: status !== 'pending' ? '2024-02-28T10:30:00' : undefined,
        countedBy: status !== 'pending' ? (locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed') : undefined,
      };
    });
  };

  const countItems = generateCountItems();

  const getStatusBadge = (status: PhysicalCount['status']) => {
    const statusConfig = {
      planned: {
        label: locale === 'ar' ? 'مخطط' : 'Planned',
        variant: 'secondary' as const,
      },
      in_progress: {
        label: locale === 'ar' ? 'قيد التنفيذ' : 'In Progress',
        variant: 'default' as const,
        className: 'bg-blue-600',
      },
      completed: {
        label: locale === 'ar' ? 'مكتمل' : 'Completed',
        variant: 'default' as const,
        className: 'bg-green-600',
      },
      reconciled: {
        label: locale === 'ar' ? 'مسوى' : 'Reconciled',
        variant: 'default' as const,
        className: 'bg-purple-600',
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getCountTypeBadge = (type: PhysicalCount['countType']) => {
    const typeConfig = {
      full: locale === 'ar' ? 'جرد كامل' : 'Full Count',
      partial: locale === 'ar' ? 'جرد جزئي' : 'Partial Count',
      cycle: locale === 'ar' ? 'جرد دوري' : 'Cycle Count',
    };

    return (
      <Badge variant="outline">
        {typeConfig[type]}
      </Badge>
    );
  };

  const getItemStatusBadge = (status: CountItem['status']) => {
    const statusConfig = {
      pending: {
        label: locale === 'ar' ? 'معلق' : 'Pending',
        variant: 'secondary' as const,
      },
      matched: {
        label: locale === 'ar' ? 'متطابق' : 'Matched',
        variant: 'default' as const,
        className: 'bg-green-600',
      },
      over: {
        label: locale === 'ar' ? 'فائض' : 'Over',
        variant: 'default' as const,
        className: 'bg-blue-600',
      },
      short: {
        label: locale === 'ar' ? 'عجز' : 'Short',
        variant: 'default' as const,
        className: 'bg-red-600',
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getVarianceStatus = (item: CountItem) => {
    if (item.countedQty === null) {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{locale === 'ar' ? 'لم يتم العد' : 'Not Counted'}</span>
        </div>
      );
    }

    if (item.variance === 0) {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <Equal className="h-4 w-4" />
          <span>{locale === 'ar' ? 'متطابق' : 'Matched'}</span>
        </div>
      );
    } else if (item.variance > 0) {
      return (
        <div className="flex items-center gap-2 text-blue-600">
          <TrendingUp className="h-4 w-4" />
          <span className="font-bold">+{item.variance}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 text-red-600">
          <TrendingDown className="h-4 w-4" />
          <span className="font-bold">{item.variance}</span>
        </div>
      );
    }
  };

  const handleCreateCount = () => {
    if (!formData.warehouse || !formData.countType || !formData.scheduledDate) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    toast.success(locale === 'ar' ? 'تم إنشاء الجرد بنجاح' : 'Count created successfully');
    setIsCreateOpen(false);
    setFormData({
      warehouse: '',
      countType: '',
      scheduledDate: '',
      countedBy: '',
      notes: '',
    });
  };

  const handleViewDetails = (count: PhysicalCount) => {
    setSelectedCount(count);
    setIsDetailsOpen(true);
  };

  const handleExportCount = (count: PhysicalCount) => {
    toast.success(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...');
  };

  const handleReconcile = (count: PhysicalCount) => {
    toast.success(locale === 'ar' ? 'تم التسوية بنجاح' : 'Reconciled successfully');
  };

  // Calculate statistics
  const stats = {
    inProgress: physicalCounts.filter(c => c.status === 'in_progress').length,
    completed: physicalCounts.filter(c => c.status === 'completed').length,
    totalVariances: physicalCounts.reduce((sum, c) => sum + c.variances, 0),
    accuracy: 94.5,
    overageCount: countItems.filter(i => i.status === 'over').length,
    shortageCount: countItems.filter(i => i.status === 'short').length,
    matchedCount: countItems.filter(i => i.status === 'matched').length,
    pendingCount: countItems.filter(i => i.status === 'pending').length,
  };

  const filteredCounts = physicalCounts.filter(count => {
    const matchesSearch = count.countNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         count.warehouse.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || count.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الجرد الفعلي' : 'Physical Inventory Count'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'إدارة عمليات الجرد ومطابقة المخزون - متوافق مع IAS 2' 
              : 'Manage count operations and inventory reconciliation - IAS 2 Compliant'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'جرد جديد' : 'New Count'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {locale === 'ar' ? 'إنشاء جرد فعلي جديد' : 'Create New Physical Count'}
                </DialogTitle>
                <DialogDescription>
                  {locale === 'ar' ? 'حدد نوع الجرد والمستودع والتاريخ المخطط' : 'Select count type, warehouse and scheduled date'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'المستودع' : 'Warehouse'} *</Label>
                    <Select value={formData.warehouse} onValueChange={(value) => setFormData({ ...formData, warehouse: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={locale === 'ar' ? 'اختر المستودع' : 'Select warehouse'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WH-001">
                          {locale === 'ar' ? 'مستودع الرياض الرئيسي' : 'Riyadh Main Warehouse'}
                        </SelectItem>
                        <SelectItem value="WH-002">
                          {locale === 'ar' ? 'فرع جدة' : 'Jeddah Branch'}
                        </SelectItem>
                        <SelectItem value="WH-003">
                          {locale === 'ar' ? 'فرع الدمام' : 'Dammam Branch'}
                        </SelectItem>
                        <SelectItem value="WH-004">
                          {locale === 'ar' ? 'فرع مكة' : 'Makkah Branch'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'نوع الجرد' : 'Count Type'} *</Label>
                    <Select value={formData.countType} onValueChange={(value) => setFormData({ ...formData, countType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={locale === 'ar' ? 'اختر نوع الجرد' : 'Select count type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">
                          <div className="flex flex-col">
                            <span className="font-medium">{locale === 'ar' ? 'جرد كامل' : 'Full Count'}</span>
                            <span className="text-xs text-muted-foreground">
                              {locale === 'ar' ? 'جرد جميع الأصناف في المستودع' : 'Count all items in warehouse'}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value="partial">
                          <div className="flex flex-col">
                            <span className="font-medium">{locale === 'ar' ? 'جرد جزئي' : 'Partial Count'}</span>
                            <span className="text-xs text-muted-foreground">
                              {locale === 'ar' ? 'جرد أصناف محددة' : 'Count selected items'}
                            </span>
                          </div>
                        </SelectItem>
                        <SelectItem value="cycle">
                          <div className="flex flex-col">
                            <span className="font-medium">{locale === 'ar' ? 'جرد دوري' : 'Cycle Count'}</span>
                            <span className="text-xs text-muted-foreground">
                              {locale === 'ar' ? 'جرد منتظم للأصناف الهامة' : 'Regular count of important items'}
                            </span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'التاريخ المخطط' : 'Scheduled Date'} *</Label>
                    <Input 
                      type="date" 
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'المسؤول عن الجرد' : 'Counted By'}</Label>
                    <Input
                      placeholder={locale === 'ar' ? 'اسم الموظف' : 'Employee name'}
                      value={formData.countedBy}
                      onChange={(e) => setFormData({ ...formData, countedBy: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
                  <Textarea
                    placeholder={locale === 'ar' ? 'أدخل أي ملاحظات إضافية' : 'Enter any additional notes'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button onClick={handleCreateCount}>
                  <Save className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'إنشاء' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</div>
            <ClipboardList className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'عملية جرد نشطة' : 'Active count operations'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'مكتمل' : 'Completed'}</div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'هذا الشهر' : 'This month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'إجمالي الفروقات' : 'Total Variances'}</div>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVariances}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'يحتاج إلى مراجعة' : 'Requires review'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'دقة الجرد' : 'Count Accuracy'}</div>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'متوسط الدقة' : 'Average accuracy'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث برقم الجرد أو المستودع...' : 'Search by count number or warehouse...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'الحالة' : 'Status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="planned">{locale === 'ar' ? 'مخطط' : 'Planned'}</SelectItem>
                <SelectItem value="in_progress">{locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</SelectItem>
                <SelectItem value="completed">{locale === 'ar' ? 'مكتمل' : 'Completed'}</SelectItem>
                <SelectItem value="reconciled">{locale === 'ar' ? 'مسوى' : 'Reconciled'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="counts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="counts">
            {locale === 'ar' ? 'عمليات الجرد' : 'Count Operations'}
          </TabsTrigger>
          <TabsTrigger value="items">
            {locale === 'ar' ? 'الأصناف' : 'Items'}
          </TabsTrigger>
          <TabsTrigger value="variances">
            {locale === 'ar' ? 'تحليل الفروقات' : 'Variance Analysis'}
          </TabsTrigger>
        </TabsList>

        {/* Count Operations Tab */}
        <TabsContent value="counts" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'رقم الجرد' : 'Count #'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المستودع' : 'Warehouse'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التقدم' : 'Progress'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الفروقات' : 'Variances'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المسؤول' : 'Counted By'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCounts.map((count) => (
                    <TableRow key={count.id}>
                      <TableCell className="font-medium font-mono">{count.countNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(count.date).toLocaleDateString(locale)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {count.warehouse}
                        </div>
                      </TableCell>
                      <TableCell>{getCountTypeBadge(count.countType)}</TableCell>
                      <TableCell>{getStatusBadge(count.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{count.itemsCounted}/{count.totalItems}</span>
                            <span className="text-muted-foreground">
                              {Math.round((count.itemsCounted / count.totalItems) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${(count.itemsCounted / count.totalItems) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {count.variances > 0 ? (
                          <Badge variant="destructive">{count.variances}</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700">0</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{count.countedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(count)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {count.status === 'completed' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReconcile(count)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleExportCount(count)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Items Tab */}
        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{locale === 'ar' ? 'تفاصيل الأصناف المعدودة' : 'Counted Item Details'}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    {locale === 'ar' ? 'طباعة' : 'Print'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'كود الصنف' : 'Item Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الموقع' : 'Location'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الكمية النظامية' : 'System Qty'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الكمية المعدودة' : 'Counted Qty'}</TableHead>
                      <TableHead className="text-center">{locale === 'ar' ? 'الفرق' : 'Variance'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'قيمة الفرق' : 'Variance Value'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium font-mono">{item.itemCode}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{locale === 'ar' ? item.itemNameAr : item.itemName}</p>
                            <p className="text-xs text-muted-foreground">
                              {locale === 'ar' ? item.unitAr : item.unit}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.location}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{item.systemQty.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          {item.countedQty !== null ? (
                            <span className="font-bold">{item.countedQty.toLocaleString()}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {getVarianceStatus(item)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={
                            item.varianceValue > 0 
                              ? 'text-blue-600 font-bold' 
                              : item.varianceValue < 0 
                              ? 'text-red-600 font-bold' 
                              : ''
                          }>
                            {item.varianceValue > 0 ? '+' : ''}{item.varianceValue.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getItemStatusBadge(item.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Variances Tab */}
        <TabsContent value="variances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  {locale === 'ar' ? 'فائض' : 'Overage'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.overageCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === 'ar' ? 'أصناف بكميات زائدة' : 'Items with excess quantity'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  {locale === 'ar' ? 'عجز' : 'Shortage'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.shortageCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === 'ar' ? 'أصناف بكميات ناقصة' : 'Items with shortage'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Equal className="h-4 w-4 text-green-600" />
                  {locale === 'ar' ? 'متطابق' : 'Matched'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.matchedCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === 'ar' ? 'أصناف متطابقة تماماً' : 'Perfectly matched items'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-600" />
                  {locale === 'ar' ? 'معلق' : 'Pending'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{stats.pendingCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === 'ar' ? 'في انتظار الجرد' : 'Awaiting count'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Variance Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'تفاصيل الفروقات' : 'Variance Details'}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'فرق الكمية' : 'Qty Variance'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'فرق القيمة' : 'Value Variance'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الموقع' : 'Location'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countItems
                    .filter(item => item.variance !== 0)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{locale === 'ar' ? item.itemNameAr : item.itemName}</p>
                            <p className="text-xs text-muted-foreground font-mono">{item.itemCode}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`font-bold ${item.variance > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {item.variance > 0 ? '+' : ''}{item.variance}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`font-bold ${item.varianceValue > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {item.varianceValue > 0 ? '+' : ''}{item.varianceValue.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {item.variance > 0 ? (
                            <Badge className="bg-blue-600">
                              {locale === 'ar' ? 'فائض' : 'Overage'}
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              {locale === 'ar' ? 'عجز' : 'Shortage'}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.location}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* IAS 2 Compliance Note */}
      <Card className="border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {locale === 'ar' ? 'التوافق مع معيار المحاسبة الدولي IAS 2' : 'IAS 2 Compliance'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'يتم إجراء الجرد الفعلي وفقاً لمعيار المحاسبة الدولي IAS 2 (المخزون) الذي يتطلب التحقق الفعلي من الكميات الموجودة وتسوية أي فروقات. جميع الفروقات يتم توثيقها ومراجعتها واعتمادها قبل إجراء التسويات المحاسبية.'
                  : 'Physical count is conducted in accordance with IAS 2 (Inventories) which requires physical verification of quantities on hand and reconciliation of any variances. All variances are documented, reviewed and approved before making accounting adjustments.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

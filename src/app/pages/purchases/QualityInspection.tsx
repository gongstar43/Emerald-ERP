import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
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
  CheckCircle,
  Plus,
  Search,
  Eye,
  Edit,
  Calendar,
  AlertCircle,
  XCircle,
  Clock,
  Award,
  Target,
} from 'lucide-react';

const mockInspections = [
  {
    id: 'QI-2024-001',
    receiptId: 'GR-2024-001',
    supplier: 'شركة التوريدات المتقدمة',
    inspectionDate: '2024-02-20',
    inspector: 'أحمد محمد',
    status: 'passed',
    items: 5,
    criteriaTotal: 10,
    criteriaPassed: 9,
    criteriaFailed: 1,
    qualityScore: 90,
    defectsFound: 2,
    notes: 'جودة جيدة بشكل عام مع وجود عيوب طفيفة',
  },
  {
    id: 'QI-2024-002',
    receiptId: 'GR-2024-002',
    supplier: 'مؤسسة الإمدادات الصناعية',
    inspectionDate: '2024-02-22',
    inspector: 'خالد علي',
    status: 'in_progress',
    items: 3,
    criteriaTotal: 8,
    criteriaPassed: 5,
    criteriaFailed: 0,
    qualityScore: 0,
    defectsFound: 0,
    notes: 'قيد الفحص',
  },
  {
    id: 'QI-2024-003',
    receiptId: 'GR-2024-003',
    supplier: 'شركة المواد الأولية',
    inspectionDate: '2024-02-25',
    inspector: 'محمد سعيد',
    status: 'failed',
    items: 8,
    criteriaTotal: 12,
    criteriaPassed: 7,
    criteriaFailed: 5,
    qualityScore: 58,
    defectsFound: 15,
    notes: 'عدم مطابقة المواصفات المطلوبة',
  },
];

export default function QualityInspection() {
  const { locale } = useLanguage();
  const [inspections, setInspections] = useState(mockInspections);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translations = {
    ar: {
      title: 'فحص الجودة',
      subtitle: 'إدارة عمليات فحص ومراقبة الجودة - ISO 9001',
      addInspection: 'فحص جديد',
      search: 'بحث...',
      status: 'الحالة',
      all: 'الكل',
      pending: 'قيد الانتظار',
      inProgress: 'قيد الفحص',
      passed: 'ناجح',
      failed: 'راسب',
      inspectionId: 'رقم الفحص',
      receiptId: 'رقم الاستلام',
      supplier: 'المورد',
      inspectionDate: 'تاريخ الفحص',
      inspector: 'المفتش',
      items: 'الأصناف',
      criteria: 'المعايير',
      qualityScore: 'نقاط الجودة',
      defects: 'العيوب',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      totalInspections: 'إجمالي الفحوصات',
      passRate: 'معدل النجاح',
      avgQualityScore: 'متوسط الجودة',
      criteriaPassed: 'معايير ناجحة',
      criteriaFailed: 'معايير راسبة',
      notes: 'ملاحظات',
    },
    en: {
      title: 'Quality Inspection',
      subtitle: 'Manage Quality Inspection and Control - ISO 9001',
      addInspection: 'New Inspection',
      search: 'Search...',
      status: 'Status',
      all: 'All',
      pending: 'Pending',
      inProgress: 'In Progress',
      passed: 'Passed',
      failed: 'Failed',
      inspectionId: 'Inspection ID',
      receiptId: 'Receipt ID',
      supplier: 'Supplier',
      inspectionDate: 'Inspection Date',
      inspector: 'Inspector',
      items: 'Items',
      criteria: 'Criteria',
      qualityScore: 'Quality Score',
      defects: 'Defects',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      totalInspections: 'Total Inspections',
      passRate: 'Pass Rate',
      avgQualityScore: 'Avg Quality Score',
      criteriaPassed: 'Criteria Passed',
      criteriaFailed: 'Criteria Failed',
      notes: 'Notes',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('pending'), variant: 'outline' as const, icon: Clock },
      in_progress: { label: t('inProgress'), variant: 'secondary' as const, icon: AlertCircle },
      passed: { label: t('passed'), variant: 'default' as const, icon: CheckCircle },
      failed: { label: t('failed'), variant: 'destructive' as const, icon: XCircle },
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

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = 
      inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.receiptId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const passedCount = inspections.filter(i => i.status === 'passed').length;
  const completedCount = inspections.filter(i => i.status === 'passed' || i.status === 'failed').length;
  const passRate = completedCount > 0 ? (passedCount / completedCount) * 100 : 0;
  
  const avgQualityScore = inspections
    .filter(i => i.qualityScore > 0)
    .reduce((sum, i) => sum + i.qualityScore, 0) / 
    inspections.filter(i => i.qualityScore > 0).length || 0;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
        <Badge className="bg-blue-600 text-white">ISO 9001</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalInspections')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inspections.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('passRate')}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passRate.toFixed(1)}%</div>
            <Progress value={passRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('avgQualityScore')}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgQualityScore.toFixed(0)}/100</div>
            <Progress value={avgQualityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('inProgress')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inspections.filter(i => i.status === 'in_progress').length}
            </div>
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
                  <SelectItem value="in_progress">{t('inProgress')}</SelectItem>
                  <SelectItem value="passed">{t('passed')}</SelectItem>
                  <SelectItem value="failed">{t('failed')}</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addInspection')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('inspectionId')}</TableHead>
                <TableHead>{t('receiptId')}</TableHead>
                <TableHead>{t('supplier')}</TableHead>
                <TableHead>{t('inspectionDate')}</TableHead>
                <TableHead>{t('inspector')}</TableHead>
                <TableHead>{t('criteria')}</TableHead>
                <TableHead>{t('qualityScore')}</TableHead>
                <TableHead>{t('defects')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>{inspection.receiptId}</TableCell>
                  <TableCell>{inspection.supplier}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {inspection.inspectionDate}
                    </div>
                  </TableCell>
                  <TableCell>{inspection.inspector}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">{inspection.criteriaPassed}</span>
                        <XCircle className="h-4 w-4 text-red-600 ml-2" />
                        <span className="text-red-600 font-medium">{inspection.criteriaFailed}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        / {inspection.criteriaTotal} {t('criteria')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {inspection.qualityScore > 0 ? (
                      <div className="space-y-1">
                        <div className="font-medium">{inspection.qualityScore}/100</div>
                        <Progress value={inspection.qualityScore} className="w-[80px]" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {inspection.defectsFound > 0 ? (
                      <Badge variant="destructive">{inspection.defectsFound}</Badge>
                    ) : (
                      <Badge variant="outline">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(inspection.status)}</TableCell>
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

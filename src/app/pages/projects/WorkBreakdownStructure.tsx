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
import { Textarea } from '../../components/ui/textarea';
import { Progress } from '../../components/ui/progress';
import {
  Plus,
  GitBranch,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Target,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface WBSItem {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'phase' | 'deliverable' | 'work_package' | 'task';
  parentId?: string;
  level: number;
  children?: WBSItem[];
  assignee?: string;
  startDate?: string;
  endDate?: string;
  duration?: number;
  budget?: number;
  actualCost?: number;
  progress?: number;
  status?: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
}

export default function WorkBreakdownStructure() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1']));
  const [selectedItem, setSelectedItem] = useState<WBSItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock WBS data
  const wbsData: WBSItem[] = [
    {
      id: '1',
      code: '1.0',
      name: 'مشروع تطوير نظام ERP',
      description: 'تطوير نظام ERP متكامل',
      type: 'phase',
      level: 1,
      progress: 35,
      status: 'in_progress',
      budget: 5000000,
      actualCost: 1750000,
      children: [
        {
          id: '1.1',
          code: '1.1',
          name: 'مرحلة التخطيط',
          description: 'التخطيط والتحضير للمشروع',
          type: 'phase',
          parentId: '1',
          level: 2,
          progress: 100,
          status: 'completed',
          budget: 500000,
          actualCost: 480000,
          children: [
            {
              id: '1.1.1',
              code: '1.1.1',
              name: 'ميثاق المشروع',
              description: 'إعداد ميثاق المشروع',
              type: 'deliverable',
              parentId: '1.1',
              level: 3,
              assignee: 'أحمد محمد',
              startDate: '2024-01-01',
              endDate: '2024-01-15',
              duration: 15,
              progress: 100,
              status: 'completed',
              budget: 100000,
              actualCost: 95000,
            },
            {
              id: '1.1.2',
              code: '1.1.2',
              name: 'خطة إدارة المشروع',
              description: 'إعداد خطة إدارة المشروع الشاملة',
              type: 'deliverable',
              parentId: '1.1',
              level: 3,
              assignee: 'فاطمة علي',
              startDate: '2024-01-16',
              endDate: '2024-02-15',
              duration: 30,
              progress: 100,
              status: 'completed',
              budget: 200000,
              actualCost: 190000,
            },
            {
              id: '1.1.3',
              code: '1.1.3',
              name: 'تحليل المتطلبات',
              description: 'جمع وتحليل متطلبات النظام',
              type: 'work_package',
              parentId: '1.1',
              level: 3,
              assignee: 'خالد أحمد',
              startDate: '2024-02-01',
              endDate: '2024-02-28',
              duration: 28,
              progress: 100,
              status: 'completed',
              budget: 200000,
              actualCost: 195000,
            },
          ],
        },
        {
          id: '1.2',
          code: '1.2',
          name: 'مرحلة التصميم',
          description: 'تصميم النظام والواجهات',
          type: 'phase',
          parentId: '1',
          level: 2,
          progress: 60,
          status: 'in_progress',
          budget: 800000,
          actualCost: 450000,
          children: [
            {
              id: '1.2.1',
              code: '1.2.1',
              name: 'تصميم قاعدة البيانات',
              description: 'تصميم هيكل قاعدة البيانات',
              type: 'deliverable',
              parentId: '1.2',
              level: 3,
              assignee: 'سارة محمود',
              startDate: '2024-03-01',
              endDate: '2024-03-31',
              duration: 31,
              progress: 100,
              status: 'completed',
              budget: 250000,
              actualCost: 240000,
            },
            {
              id: '1.2.2',
              code: '1.2.2',
              name: 'تصميم واجهات المستخدم',
              description: 'تصميم واجهات النظام',
              type: 'deliverable',
              parentId: '1.2',
              level: 3,
              assignee: 'نورة عبدالله',
              startDate: '2024-03-15',
              endDate: '2024-04-30',
              duration: 46,
              progress: 80,
              status: 'in_progress',
              budget: 300000,
              actualCost: 210000,
            },
            {
              id: '1.2.3',
              code: '1.2.3',
              name: 'تصميم المعمارية التقنية',
              description: 'تصميم البنية التقنية للنظام',
              type: 'deliverable',
              parentId: '1.2',
              level: 3,
              assignee: 'محمد عبدالرحمن',
              startDate: '2024-03-01',
              endDate: '2024-04-15',
              duration: 45,
              progress: 100,
              status: 'completed',
              budget: 250000,
              actualCost: 245000,
            },
          ],
        },
        {
          id: '1.3',
          code: '1.3',
          name: 'مرحلة التطوير',
          description: 'تطوير وبرمجة النظام',
          type: 'phase',
          parentId: '1',
          level: 2,
          progress: 25,
          status: 'in_progress',
          budget: 2500000,
          actualCost: 625000,
          children: [
            {
              id: '1.3.1',
              code: '1.3.1',
              name: 'وحدة المحاسبة',
              description: 'تطوير وحدة المحاسبة',
              type: 'work_package',
              parentId: '1.3',
              level: 3,
              assignee: 'فريق التطوير 1',
              startDate: '2024-05-01',
              endDate: '2024-07-31',
              duration: 92,
              progress: 45,
              status: 'in_progress',
              budget: 600000,
              actualCost: 270000,
            },
            {
              id: '1.3.2',
              code: '1.3.2',
              name: 'وحدة المبيعات',
              description: 'تطوير وحدة المبيعات',
              type: 'work_package',
              parentId: '1.3',
              level: 3,
              assignee: 'فريق التطوير 2',
              startDate: '2024-05-15',
              endDate: '2024-08-15',
              duration: 92,
              progress: 30,
              status: 'in_progress',
              budget: 500000,
              actualCost: 150000,
            },
            {
              id: '1.3.3',
              code: '1.3.3',
              name: 'وحدة المشتريات',
              description: 'تطوير وحدة المشتريات',
              type: 'work_package',
              parentId: '1.3',
              level: 3,
              assignee: 'فريق التطوير 3',
              startDate: '2024-06-01',
              endDate: '2024-08-31',
              duration: 92,
              progress: 15,
              status: 'in_progress',
              budget: 500000,
              actualCost: 75000,
            },
          ],
        },
        {
          id: '1.4',
          code: '1.4',
          name: 'مرحلة الاختبار',
          description: 'اختبار النظام وضمان الجودة',
          type: 'phase',
          parentId: '1',
          level: 2,
          progress: 0,
          status: 'not_started',
          budget: 700000,
          actualCost: 0,
        },
        {
          id: '1.5',
          code: '1.5',
          name: 'مرحلة النشر',
          description: 'نشر النظام وتسليمه',
          type: 'phase',
          parentId: '1',
          level: 2,
          progress: 0,
          status: 'not_started',
          budget: 500000,
          actualCost: 0,
        },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusBadge = (status?: WBSItem['status']) => {
    if (!status) return null;
    const statusConfig = {
      not_started: { label: locale === 'ar' ? 'لم يبدأ' : 'Not Started', className: 'bg-gray-500' },
      in_progress: { label: locale === 'ar' ? 'قيد التنفيذ' : 'In Progress', className: 'bg-blue-600' },
      completed: { label: locale === 'ar' ? 'مكتمل' : 'Completed', className: 'bg-green-600' },
      on_hold: { label: locale === 'ar' ? 'معلق' : 'On Hold', className: 'bg-orange-600' },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: WBSItem['type']) => {
    const typeConfig = {
      phase: { label: locale === 'ar' ? 'مرحلة' : 'Phase', variant: 'default' as const },
      deliverable: { label: locale === 'ar' ? 'مخرج' : 'Deliverable', variant: 'secondary' as const },
      work_package: { label: locale === 'ar' ? 'حزمة عمل' : 'Work Package', variant: 'outline' as const },
      task: { label: locale === 'ar' ? 'مهمة' : 'Task', variant: 'outline' as const },
    };
    const config = typeConfig[type];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const renderWBSItem = (item: WBSItem) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const indent = (item.level - 1) * 2;

    return (
      <div key={item.id}>
        <div 
          className={`flex items-center gap-2 py-3 px-4 border-b hover:bg-muted/50 cursor-pointer ${
            item.level === 1 ? 'bg-muted/30 font-bold' : ''
          }`}
          style={{ paddingLeft: `${indent + 1}rem` }}
          onClick={() => hasChildren && toggleExpand(item.id)}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )
            ) : (
              <span className="w-4" />
            )}
            <GitBranch className="h-4 w-4 text-blue-600" />
            <span className="font-mono text-sm font-medium">{item.code}</span>
            <span className={item.level === 1 ? 'font-bold' : ''}>{item.name}</span>
            {getTypeBadge(item.type)}
            {item.status && getStatusBadge(item.status)}
          </div>

          {item.progress !== undefined && (
            <div className="flex items-center gap-2 w-48">
              <Progress value={item.progress} className="h-2" />
              <span className="text-sm font-medium w-12 text-right">{item.progress}%</span>
            </div>
          )}

          {item.assignee && (
            <div className="flex items-center gap-2 w-32">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate">{item.assignee}</span>
            </div>
          )}

          {item.budget && (
            <div className="w-32 text-right text-sm">
              {formatCurrency(item.actualCost || 0)} / {formatCurrency(item.budget)}
            </div>
          )}

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div>
            {item.children!.map(child => renderWBSItem(child))}
          </div>
        )}
      </div>
    );
  };

  const calculateTotals = (items: WBSItem[]): { budget: number; actual: number; progress: number } => {
    let totalBudget = 0;
    let totalActual = 0;
    let totalProgress = 0;
    let count = 0;

    const traverse = (item: WBSItem) => {
      if (item.budget) {
        totalBudget += item.budget;
        totalActual += item.actualCost || 0;
      }
      if (item.progress !== undefined) {
        totalProgress += item.progress;
        count++;
      }
      if (item.children) {
        item.children.forEach(traverse);
      }
    };

    items.forEach(traverse);
    return {
      budget: totalBudget,
      actual: totalActual,
      progress: count > 0 ? Math.round(totalProgress / count) : 0,
    };
  };

  const totals = calculateTotals(wbsData);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'هيكلية تجزئة العمل (WBS)' : 'Work Breakdown Structure (WBS)'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'تنظيم وإدارة عناصر المشروع' : 'Organize and manage project elements'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'عنصر جديد' : 'New Item'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إضافة عنصر WBS جديد' : 'Add New WBS Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الكود' : 'Code'}</Label>
                  <Input placeholder="1.1.1" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'النوع' : 'Type'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase">{locale === 'ar' ? 'مرحلة' : 'Phase'}</SelectItem>
                      <SelectItem value="deliverable">{locale === 'ar' ? 'مخرج' : 'Deliverable'}</SelectItem>
                      <SelectItem value="work_package">{locale === 'ar' ? 'حزمة عمل' : 'Work Package'}</SelectItem>
                      <SelectItem value="task">{locale === 'ar' ? 'مهمة' : 'Task'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم' : 'Name'}</Label>
                <Input />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                <Textarea rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'المسؤول' : 'Assignee'}</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الميزانية' : 'Budget'}</Label>
                  <Input type="number" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ البدء' : 'Start Date'}</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تمت الإضافة بنجاح' : 'Added successfully');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الميزانية' : 'Total Budget'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.budget)}</div>
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
            <div className="text-2xl font-bold">{formatCurrency(totals.actual)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((totals.actual / totals.budget) * 100)}% {locale === 'ar' ? 'من الميزانية' : 'of budget'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'نسبة الإنجاز' : 'Progress'}
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.progress}%</div>
            <Progress value={totals.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'المتبقي' : 'Remaining'}
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.budget - totals.actual)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {100 - Math.round((totals.actual / totals.budget) * 100)}% {locale === 'ar' ? 'متبقي' : 'remaining'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* WBS Tree */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'هيكلية المشروع' : 'Project Structure'}</CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'شجرة تفصيلية لعناصر المشروع' : 'Detailed tree of project elements'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border rounded-lg">
            {wbsData.map(item => renderWBSItem(item))}
          </div>
        </CardContent>
      </Card>

      {/* Item Details Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="font-mono">{selectedItem.code}</span>
                <span>{selectedItem.name}</span>
              </DialogTitle>
              <DialogDescription>{selectedItem.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'النوع' : 'Type'}</Label>
                  <div className="mt-1">{getTypeBadge(selectedItem.type)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'الحالة' : 'Status'}</Label>
                  <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                </div>
              </div>

              {selectedItem.assignee && (
                <div>
                  <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'المسؤول' : 'Assignee'}</Label>
                  <p className="mt-1 font-medium">{selectedItem.assignee}</p>
                </div>
              )}

              {selectedItem.budget && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'الميزانية' : 'Budget'}</Label>
                    <p className="mt-1 font-bold text-lg">{formatCurrency(selectedItem.budget)}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'التكلفة الفعلية' : 'Actual Cost'}</Label>
                    <p className="mt-1 font-bold text-lg">{formatCurrency(selectedItem.actualCost || 0)}</p>
                  </div>
                </div>
              )}

              {selectedItem.progress !== undefined && (
                <div>
                  <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'نسبة الإنجاز' : 'Progress'}</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={selectedItem.progress} className="flex-1" />
                    <span className="font-bold">{selectedItem.progress}%</span>
                  </div>
                </div>
              )}

              {selectedItem.startDate && selectedItem.endDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'تاريخ البدء' : 'Start Date'}</Label>
                    <p className="mt-1">{selectedItem.startDate}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">{locale === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</Label>
                    <p className="mt-1">{selectedItem.endDate}</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

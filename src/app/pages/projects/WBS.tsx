import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
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
  Plus,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Save,
  Download,
  GitBranch,
  Box,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  BarChart3,
} from 'lucide-react';
import { toast } from 'sonner';

interface WBSItem {
  id: string;
  code: string;
  name: string;
  description: string;
  level: number;
  parentId: string | null;
  type: 'phase' | 'deliverable' | 'work-package' | 'activity';
  duration: number; // in days
  cost: number;
  assignee: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number; // 0-100
  children?: WBSItem[];
}

export default function WBS() {
  const { locale } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['1', '2', '3']));
  const [selectedProject, setSelectedProject] = useState('project-1');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Mock WBS Data - Hierarchical structure
  const wbsData: WBSItem[] = [
    {
      id: '1',
      code: '1.0',
      name: locale === 'ar' ? 'التخطيط' : 'Planning Phase',
      description: locale === 'ar' ? 'مرحلة التخطيط الشامل للمشروع' : 'Comprehensive project planning phase',
      level: 1,
      parentId: null,
      type: 'phase',
      duration: 30,
      cost: 50000,
      assignee: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      status: 'completed',
      progress: 100,
      children: [
        {
          id: '1.1',
          code: '1.1',
          name: locale === 'ar' ? 'جمع المتطلبات' : 'Requirements Gathering',
          description: locale === 'ar' ? 'جمع وتوثيق متطلبات المشروع' : 'Collect and document project requirements',
          level: 2,
          parentId: '1',
          type: 'deliverable',
          duration: 10,
          cost: 15000,
          assignee: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
          status: 'completed',
          progress: 100,
          children: [
            {
              id: '1.1.1',
              code: '1.1.1',
              name: locale === 'ar' ? 'مقابلات أصحاب المصلحة' : 'Stakeholder Interviews',
              description: '',
              level: 3,
              parentId: '1.1',
              type: 'activity',
              duration: 5,
              cost: 7500,
              assignee: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
              status: 'completed',
              progress: 100,
            },
            {
              id: '1.1.2',
              code: '1.1.2',
              name: locale === 'ar' ? 'تحليل الأعمال' : 'Business Analysis',
              description: '',
              level: 3,
              parentId: '1.1',
              type: 'activity',
              duration: 5,
              cost: 7500,
              assignee: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
              status: 'completed',
              progress: 100,
            },
          ],
        },
        {
          id: '1.2',
          code: '1.2',
          name: locale === 'ar' ? 'تصميم الحل' : 'Solution Design',
          description: locale === 'ar' ? 'تصميم الحل التقني والمعماري' : 'Technical and architectural solution design',
          level: 2,
          parentId: '1',
          type: 'deliverable',
          duration: 15,
          cost: 25000,
          assignee: locale === 'ar' ? 'محمد خالد' : 'Mohammed Khaled',
          status: 'completed',
          progress: 100,
          children: [
            {
              id: '1.2.1',
              code: '1.2.1',
              name: locale === 'ar' ? 'التصميم المعماري' : 'Architectural Design',
              description: '',
              level: 3,
              parentId: '1.2',
              type: 'activity',
              duration: 7,
              cost: 12000,
              assignee: locale === 'ar' ? 'محمد خالد' : 'Mohammed Khaled',
              status: 'completed',
              progress: 100,
            },
            {
              id: '1.2.2',
              code: '1.2.2',
              name: locale === 'ar' ? 'تصميم قاعدة البيانات' : 'Database Design',
              description: '',
              level: 3,
              parentId: '1.2',
              type: 'activity',
              duration: 5,
              cost: 8000,
              assignee: locale === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
              status: 'completed',
              progress: 100,
            },
            {
              id: '1.2.3',
              code: '1.2.3',
              name: locale === 'ar' ? 'تصميم واجهة المستخدم' : 'UI Design',
              description: '',
              level: 3,
              parentId: '1.2',
              type: 'activity',
              duration: 3,
              cost: 5000,
              assignee: locale === 'ar' ? 'نورة عبدالله' : 'Noura Abdullah',
              status: 'completed',
              progress: 100,
            },
          ],
        },
        {
          id: '1.3',
          code: '1.3',
          name: locale === 'ar' ? 'تخطيط المشروع' : 'Project Planning',
          description: locale === 'ar' ? 'إعداد خطة تنفيذ المشروع' : 'Prepare project execution plan',
          level: 2,
          parentId: '1',
          type: 'deliverable',
          duration: 5,
          cost: 10000,
          assignee: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
          status: 'completed',
          progress: 100,
        },
      ],
    },
    {
      id: '2',
      code: '2.0',
      name: locale === 'ar' ? 'التنفيذ' : 'Execution Phase',
      description: locale === 'ar' ? 'مرحلة التنفيذ والتطوير' : 'Implementation and development phase',
      level: 1,
      parentId: null,
      type: 'phase',
      duration: 120,
      cost: 300000,
      assignee: locale === 'ar' ? 'محمد خالد' : 'Mohammed Khaled',
      status: 'in-progress',
      progress: 65,
      children: [
        {
          id: '2.1',
          code: '2.1',
          name: locale === 'ar' ? 'تطوير الواجهة الخلفية' : 'Backend Development',
          description: locale === 'ar' ? 'تطوير APIs والخدمات' : 'Develop APIs and services',
          level: 2,
          parentId: '2',
          type: 'work-package',
          duration: 45,
          cost: 120000,
          assignee: locale === 'ar' ? 'خالد عمر' : 'Khaled Omar',
          status: 'in-progress',
          progress: 80,
          children: [
            {
              id: '2.1.1',
              code: '2.1.1',
              name: locale === 'ar' ? 'تطوير API المصادقة' : 'Authentication API',
              description: '',
              level: 3,
              parentId: '2.1',
              type: 'activity',
              duration: 10,
              cost: 25000,
              assignee: locale === 'ar' ? 'خالد عمر' : 'Khaled Omar',
              status: 'completed',
              progress: 100,
            },
            {
              id: '2.1.2',
              code: '2.1.2',
              name: locale === 'ar' ? 'تطوير API الأعمال' : 'Business Logic API',
              description: '',
              level: 3,
              parentId: '2.1',
              type: 'activity',
              duration: 25,
              cost: 70000,
              assignee: locale === 'ar' ? 'خالد عمر' : 'Khaled Omar',
              status: 'in-progress',
              progress: 70,
            },
            {
              id: '2.1.3',
              code: '2.1.3',
              name: locale === 'ar' ? 'تطوير API التقارير' : 'Reporting API',
              description: '',
              level: 3,
              parentId: '2.1',
              type: 'activity',
              duration: 10,
              cost: 25000,
              assignee: locale === 'ar' ? 'خالد عمر' : 'Khaled Omar',
              status: 'not-started',
              progress: 0,
            },
          ],
        },
        {
          id: '2.2',
          code: '2.2',
          name: locale === 'ar' ? 'تطوير الواجهة الأمامية' : 'Frontend Development',
          description: locale === 'ar' ? 'تطوير واجهات المستخدم' : 'Develop user interfaces',
          level: 2,
          parentId: '2',
          type: 'work-package',
          duration: 40,
          cost: 100000,
          assignee: locale === 'ar' ? 'نورة عبدالله' : 'Noura Abdullah',
          status: 'in-progress',
          progress: 60,
          children: [
            {
              id: '2.2.1',
              code: '2.2.1',
              name: locale === 'ar' ? 'شاشات تسجيل الدخول' : 'Login Screens',
              description: '',
              level: 3,
              parentId: '2.2',
              type: 'activity',
              duration: 5,
              cost: 15000,
              assignee: locale === 'ar' ? 'نورة عبدالله' : 'Noura Abdullah',
              status: 'completed',
              progress: 100,
            },
            {
              id: '2.2.2',
              code: '2.2.2',
              name: locale === 'ar' ? 'لوحة التحكم' : 'Dashboard',
              description: '',
              level: 3,
              parentId: '2.2',
              type: 'activity',
              duration: 15,
              cost: 45000,
              assignee: locale === 'ar' ? 'نورة عبدالله' : 'Noura Abdullah',
              status: 'in-progress',
              progress: 70,
            },
            {
              id: '2.2.3',
              code: '2.2.3',
              name: locale === 'ar' ? 'شاشات التقارير' : 'Reporting Screens',
              description: '',
              level: 3,
              parentId: '2.2',
              type: 'activity',
              duration: 10,
              cost: 30000,
              assignee: locale === 'ar' ? 'نورة عبدالله' : 'Noura Abdullah',
              status: 'not-started',
              progress: 0,
            },
          ],
        },
        {
          id: '2.3',
          code: '2.3',
          name: locale === 'ar' ? 'التكامل' : 'Integration',
          description: locale === 'ar' ? 'تكامل المكونات والأنظمة' : 'Integrate components and systems',
          level: 2,
          parentId: '2',
          type: 'work-package',
          duration: 25,
          cost: 60000,
          assignee: locale === 'ar' ? 'عمر سعيد' : 'Omar Said',
          status: 'not-started',
          progress: 0,
        },
      ],
    },
    {
      id: '3',
      code: '3.0',
      name: locale === 'ar' ? 'الاختبار' : 'Testing Phase',
      description: locale === 'ar' ? 'مرحلة اختبار النظام' : 'System testing phase',
      level: 1,
      parentId: null,
      type: 'phase',
      duration: 30,
      cost: 70000,
      assignee: locale === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      status: 'not-started',
      progress: 0,
      children: [
        {
          id: '3.1',
          code: '3.1',
          name: locale === 'ar' ? 'اختبار الوحدات' : 'Unit Testing',
          description: '',
          level: 2,
          parentId: '3',
          type: 'activity',
          duration: 10,
          cost: 20000,
          assignee: locale === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
          status: 'not-started',
          progress: 0,
        },
        {
          id: '3.2',
          code: '3.2',
          name: locale === 'ar' ? 'اختبار التكامل' : 'Integration Testing',
          description: '',
          level: 2,
          parentId: '3',
          type: 'activity',
          duration: 10,
          cost: 25000,
          assignee: locale === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
          status: 'not-started',
          progress: 0,
        },
        {
          id: '3.3',
          code: '3.3',
          name: locale === 'ar' ? 'اختبار قبول المستخدم' : 'User Acceptance Testing',
          description: '',
          level: 2,
          parentId: '3',
          type: 'activity',
          duration: 10,
          cost: 25000,
          assignee: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
          status: 'not-started',
          progress: 0,
        },
      ],
    },
    {
      id: '4',
      code: '4.0',
      name: locale === 'ar' ? 'النشر' : 'Deployment Phase',
      description: locale === 'ar' ? 'مرحلة نشر النظام للإنتاج' : 'System deployment to production phase',
      level: 1,
      parentId: null,
      type: 'phase',
      duration: 10,
      cost: 30000,
      assignee: locale === 'ar' ? 'عمر سعيد' : 'Omar Said',
      status: 'not-started',
      progress: 0,
      children: [
        {
          id: '4.1',
          code: '4.1',
          name: locale === 'ar' ? 'إعداد بيئة الإنتاج' : 'Production Environment Setup',
          description: '',
          level: 2,
          parentId: '4',
          type: 'activity',
          duration: 3,
          cost: 10000,
          assignee: locale === 'ar' ? 'عمر سعيد' : 'Omar Said',
          status: 'not-started',
          progress: 0,
        },
        {
          id: '4.2',
          code: '4.2',
          name: locale === 'ar' ? 'نشر التطبيق' : 'Application Deployment',
          description: '',
          level: 2,
          parentId: '4',
          type: 'activity',
          duration: 2,
          cost: 8000,
          assignee: locale === 'ar' ? 'عمر سعيد' : 'Omar Said',
          status: 'not-started',
          progress: 0,
        },
        {
          id: '4.3',
          code: '4.3',
          name: locale === 'ar' ? 'تدريب المستخدمين' : 'User Training',
          description: '',
          level: 2,
          parentId: '4',
          type: 'activity',
          duration: 5,
          cost: 12000,
          assignee: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
          status: 'not-started',
          progress: 0,
        },
      ],
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'not-started': { label: locale === 'ar' ? 'لم يبدأ' : 'Not Started', className: 'bg-gray-600' },
      'in-progress': { label: locale === 'ar' ? 'قيد التنفيذ' : 'In Progress', className: 'bg-blue-600' },
      'completed': { label: locale === 'ar' ? 'مكتمل' : 'Completed', className: 'bg-green-600' },
      'on-hold': { label: locale === 'ar' ? 'متوقف' : 'On Hold', className: 'bg-orange-600' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phase':
        return <Box className="h-5 w-5 text-purple-600" />;
      case 'deliverable':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'work-package':
        return <GitBranch className="h-5 w-5 text-blue-600" />;
      case 'activity':
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <Box className="h-5 w-5" />;
    }
  };

  const calculateTotals = (items: WBSItem[]): { duration: number; cost: number } => {
    return items.reduce((acc, item) => {
      return {
        duration: acc.duration + item.duration,
        cost: acc.cost + item.cost,
      };
    }, { duration: 0, cost: 0 });
  };

  const totals = calculateTotals(wbsData);

  const renderWBSItem = (item: WBSItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const indentWidth = depth * 24;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center p-3 hover:bg-muted rounded-lg transition-colors border-l-4 ${
            item.type === 'phase' ? 'border-purple-600 bg-purple-50' :
            item.type === 'deliverable' ? 'border-green-600 bg-green-50' :
            item.type === 'work-package' ? 'border-blue-600 bg-blue-50' :
            'border-orange-600'
          }`}
          style={{ marginLeft: `${indentWidth}px` }}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(item.id)}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            {!hasChildren && <div className="w-6" />}
            
            {getTypeIcon(item.type)}
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{item.code}</span>
                <span className="font-semibold">{item.name}</span>
                {getStatusBadge(item.status)}
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{item.duration} {locale === 'ar' ? 'يوم' : 'days'}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{item.cost.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{item.assignee}</span>
            </div>
            <div className="w-32">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.progress === 100 ? 'bg-green-600' :
                      item.progress > 0 ? 'bg-blue-600' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-10 text-right">{item.progress}%</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderWBSItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي المراحل' : 'Total Phases',
      value: wbsData.length,
      icon: Box,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: locale === 'ar' ? 'إجمالي المهام' : 'Total Tasks',
      value: wbsData.reduce((acc, phase) => {
        const countChildren = (items: WBSItem[]): number => {
          return items.reduce((count, item) => {
            return count + 1 + (item.children ? countChildren(item.children) : 0);
          }, 0);
        };
        return acc + countChildren(phase.children || []);
      }, 0),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'إجمالي المدة' : 'Total Duration',
      value: `${totals.duration} ${locale === 'ar' ? 'يوم' : 'days'}`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'إجمالي التكلفة' : 'Total Cost',
      value: `${(totals.cost / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'هيكلية تقسيم العمل (WBS)' : 'Work Breakdown Structure (WBS)'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'تقسيم هرمي شامل للعمل - متوافق مع PMBOK 7th'
              : 'Comprehensive hierarchical work decomposition - PMBOK 7th Compliant'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'إضافة عنصر' : 'Add Item'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{locale === 'ar' ? 'إضافة عنصر WBS جديد' : 'Add New WBS Item'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'الكود' : 'Code'} *</Label>
                    <Input placeholder="1.1.1" />
                  </div>
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'النوع' : 'Type'} *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase">{locale === 'ar' ? 'مرحلة' : 'Phase'}</SelectItem>
                        <SelectItem value="deliverable">{locale === 'ar' ? 'مخرج' : 'Deliverable'}</SelectItem>
                        <SelectItem value="work-package">{locale === 'ar' ? 'حزمة عمل' : 'Work Package'}</SelectItem>
                        <SelectItem value="activity">{locale === 'ar' ? 'نشاط' : 'Activity'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الاسم' : 'Name'} *</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                  <Textarea rows={3} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'المدة (أيام)' : 'Duration (days)'} *</Label>
                    <Input type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'التكلفة' : 'Cost'} *</Label>
                    <Input type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'المسؤول' : 'Assignee'} *</Label>
                    <Input />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'حفظ' : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">{stat.title}</div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{locale === 'ar' ? 'أنواع العناصر' : 'Item Types'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-purple-600" />
              <span className="text-sm">{locale === 'ar' ? 'مرحلة' : 'Phase'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">{locale === 'ar' ? 'مخرج' : 'Deliverable'}</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-600" />
              <span className="text-sm">{locale === 'ar' ? 'حزمة عمل' : 'Work Package'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm">{locale === 'ar' ? 'نشاط' : 'Activity'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WBS Tree */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'الهيكل الهرمي' : 'Hierarchical Structure'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {wbsData.map(item => renderWBSItem(item))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'ملخص المشروع' : 'Project Summary'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-50">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'نسبة الإنجاز' : 'Completion Rate'}</p>
                <p className="text-2xl font-bold">55%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'مهام مكتملة' : 'Tasks Completed'}</p>
                <p className="text-2xl font-bold">8/20</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-50">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الوقت المستهلك' : 'Time Elapsed'}</p>
                <p className="text-2xl font-bold">105 / 190</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-50">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الميزانية المستهلكة' : 'Budget Spent'}</p>
                <p className="text-2xl font-bold">247K / 450K</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

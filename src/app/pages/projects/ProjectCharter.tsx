import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  FileText,
  Download,
  Printer,
  CheckCircle,
  AlertCircle,
  Users,
  Calendar,
  DollarSign,
  Target,
  Flag,
  TrendingUp,
  Shield,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProjectCharter {
  id: string;
  code: string;
  projectName: string;
  projectManager: string;
  sponsor: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  status: 'draft' | 'approved' | 'active' | 'completed' | 'cancelled';
  businessCase: string;
  objectives: string[];
  scope: {
    inScope: string[];
    outOfScope: string[];
  };
  deliverables: string[];
  assumptions: string[];
  constraints: string[];
  risks: string[];
  stakeholders: {
    name: string;
    role: string;
    responsibility: string;
    influence: string;
  }[];
  successCriteria: string[];
  approvalDate?: string;
  approvedBy?: string;
}

export default function ProjectCharter() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedCharter, setSelectedCharter] = useState<ProjectCharter | null>(null);

  // Mock data - Project Charters
  const charters: ProjectCharter[] = [
    {
      id: '1',
      code: 'CH-2024-001',
      projectName: locale === 'ar' ? 'نظام إدارة المخزون' : 'Inventory Management System',
      projectManager: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      sponsor: locale === 'ar' ? 'محمد عبدالله' : 'Mohammed Abdullah',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      budget: 500000,
      currency: 'SAR',
      status: 'approved',
      businessCase: locale === 'ar' 
        ? 'تحسين كفاءة إدارة المخزون وتقليل الفاقد بنسبة 30%'
        : 'Improve inventory management efficiency and reduce waste by 30%',
      objectives: [
        locale === 'ar' ? 'تطوير نظام مخزون متكامل' : 'Develop integrated inventory system',
        locale === 'ar' ? 'تقليل زمن معالجة الطلبات بنسبة 40%' : 'Reduce order processing time by 40%',
        locale === 'ar' ? 'تحسين دقة البيانات إلى 99%' : 'Improve data accuracy to 99%',
        locale === 'ar' ? 'دمج النظام مع ERP الحالي' : 'Integrate with existing ERP system',
      ],
      scope: {
        inScope: [
          locale === 'ar' ? 'إدارة المستودعات' : 'Warehouse management',
          locale === 'ar' ? 'تتبع المخزون' : 'Inventory tracking',
          locale === 'ar' ? 'إدارة الطلبات' : 'Order management',
          locale === 'ar' ? 'التقارير والتحليلات' : 'Reports and analytics',
        ],
        outOfScope: [
          locale === 'ar' ? 'إدارة النقل' : 'Transportation management',
          locale === 'ar' ? 'إدارة الموردين' : 'Supplier management',
          locale === 'ar' ? 'التكامل مع أنظمة خارجية' : 'Third-party integrations',
        ],
      },
      deliverables: [
        locale === 'ar' ? 'نظام إدارة مخزون كامل' : 'Complete inventory management system',
        locale === 'ar' ? 'تطبيق موبايل للمستودع' : 'Mobile warehouse application',
        locale === 'ar' ? 'لوحة تحكم إدارية' : 'Administrative dashboard',
        locale === 'ar' ? 'وثائق فنية شاملة' : 'Comprehensive technical documentation',
        locale === 'ar' ? 'تدريب المستخدمين' : 'User training',
      ],
      assumptions: [
        locale === 'ar' ? 'توفر الفريق المطلوب' : 'Required team availability',
        locale === 'ar' ? 'استقرار البنية التحتية' : 'Infrastructure stability',
        locale === 'ar' ? 'دعم الإدارة العليا' : 'Executive management support',
        locale === 'ar' ? 'توفر الميزانية' : 'Budget availability',
      ],
      constraints: [
        locale === 'ar' ? 'الوقت: 10 أشهر' : 'Time: 10 months',
        locale === 'ar' ? 'الميزانية: 500,000 ريال' : 'Budget: SAR 500,000',
        locale === 'ar' ? 'الموارد: 8 أعضاء فريق' : 'Resources: 8 team members',
        locale === 'ar' ? 'التكنولوجيا: استخدام التقنيات الحالية' : 'Technology: Use existing technologies',
      ],
      risks: [
        locale === 'ar' ? 'تأخير في التسليم' : 'Delivery delays',
        locale === 'ar' ? 'تجاوز الميزانية' : 'Budget overrun',
        locale === 'ar' ? 'مقاومة التغيير من المستخدمين' : 'User resistance to change',
        locale === 'ar' ? 'مشاكل التكامل التقني' : 'Technical integration issues',
      ],
      stakeholders: [
        {
          name: locale === 'ar' ? 'محمد عبدالله' : 'Mohammed Abdullah',
          role: locale === 'ar' ? 'راعي المشروع' : 'Project Sponsor',
          responsibility: locale === 'ar' ? 'الموافقة على القرارات الرئيسية' : 'Approve major decisions',
          influence: 'high',
        },
        {
          name: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
          role: locale === 'ar' ? 'مدير المشروع' : 'Project Manager',
          responsibility: locale === 'ar' ? 'إدارة تنفيذ المشروع' : 'Manage project execution',
          influence: 'high',
        },
        {
          name: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
          role: locale === 'ar' ? 'مدير المخزون' : 'Inventory Manager',
          responsibility: locale === 'ar' ? 'المتطلبات والاختبار' : 'Requirements and testing',
          influence: 'medium',
        },
      ],
      successCriteria: [
        locale === 'ar' ? 'تسليم المشروع في الموعد المحدد' : 'On-time project delivery',
        locale === 'ar' ? 'ضمن الميزانية المحددة' : 'Within approved budget',
        locale === 'ar' ? 'تحقيق جميع الأهداف' : 'Achievement of all objectives',
        locale === 'ar' ? 'رضا أصحاب المصلحة > 90%' : 'Stakeholder satisfaction > 90%',
      ],
      approvalDate: '2024-02-15',
      approvedBy: locale === 'ar' ? 'محمد عبدالله' : 'Mohammed Abdullah',
    },
    {
      id: '2',
      code: 'CH-2024-002',
      projectName: locale === 'ar' ? 'تطوير موقع التجارة الإلكترونية' : 'E-commerce Website Development',
      projectManager: locale === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      sponsor: locale === 'ar' ? 'خالد محمد' : 'Khaled Mohammed',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      budget: 300000,
      currency: 'SAR',
      status: 'active',
      businessCase: locale === 'ar'
        ? 'توسيع قنوات البيع وزيادة الإيرادات بنسبة 50%'
        : 'Expand sales channels and increase revenue by 50%',
      objectives: [
        locale === 'ar' ? 'إطلاق منصة تجارة إلكترونية' : 'Launch e-commerce platform',
        locale === 'ar' ? 'دعم 10,000 منتج' : 'Support 10,000 products',
        locale === 'ar' ? 'معالجة 1000 طلب يومياً' : 'Process 1000 orders daily',
      ],
      scope: {
        inScope: [
          locale === 'ar' ? 'واجهة المستخدم' : 'User interface',
          locale === 'ar' ? 'سلة التسوق' : 'Shopping cart',
          locale === 'ar' ? 'نظام الدفع' : 'Payment system',
        ],
        outOfScope: [
          locale === 'ar' ? 'تطبيق الموبايل' : 'Mobile app',
          locale === 'ar' ? 'التسويق الرقمي' : 'Digital marketing',
        ],
      },
      deliverables: [
        locale === 'ar' ? 'موقع ويب متجاوب' : 'Responsive website',
        locale === 'ar' ? 'لوحة إدارة' : 'Admin panel',
        locale === 'ar' ? 'نظام إدارة محتوى' : 'CMS',
      ],
      assumptions: [],
      constraints: [],
      risks: [],
      stakeholders: [],
      successCriteria: [],
      approvalDate: '2024-03-20',
      approvedBy: locale === 'ar' ? 'خالد محمد' : 'Khaled Mohammed',
    },
  ];

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي المشاريع' : 'Total Projects',
      value: charters.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'مشاريع نشطة' : 'Active Projects',
      value: charters.filter(c => c.status === 'active' || c.status === 'approved').length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'مشاريع معتمدة' : 'Approved Charters',
      value: charters.filter(c => c.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: locale === 'ar' ? 'إجمالي الميزانية' : 'Total Budget',
      value: '800K',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const filteredCharters = charters.filter(charter =>
    charter.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    charter.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: locale === 'ar' ? 'مسودة' : 'Draft', className: 'bg-gray-600' },
      approved: { label: locale === 'ar' ? 'معتمد' : 'Approved', className: 'bg-green-600' },
      active: { label: locale === 'ar' ? 'نشط' : 'Active', className: 'bg-blue-600' },
      completed: { label: locale === 'ar' ? 'مكتمل' : 'Completed', className: 'bg-purple-600' },
      cancelled: { label: locale === 'ar' ? 'ملغي' : 'Cancelled', className: 'bg-red-600' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleExport = (charter: ProjectCharter) => {
    toast.success(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...');
  };

  const handlePrint = (charter: ProjectCharter) => {
    toast.info(locale === 'ar' ? 'جاري الطباعة...' : 'Printing...');
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'ميثاق المشروع' : 'Project Charter'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'توثيق شامل لمواثيق المشاريع - متوافق مع PMBOK 7th'
              : 'Comprehensive project charter documentation - PMBOK 7th Compliant'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'ميثاق جديد' : 'New Charter'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{locale === 'ar' ? 'إنشاء ميثاق مشروع جديد' : 'Create New Project Charter'}</DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'املأ جميع الحقول المطلوبة' : 'Fill in all required fields'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'اسم المشروع' : 'Project Name'} *</Label>
                  <Input placeholder={locale === 'ar' ? 'أدخل اسم المشروع' : 'Enter project name'} />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الكود' : 'Code'} *</Label>
                  <Input placeholder="CH-2024-XXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'مدير المشروع' : 'Project Manager'} *</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'راعي المشروع' : 'Project Sponsor'} *</Label>
                  <Input />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ البداية' : 'Start Date'} *</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ النهاية' : 'End Date'} *</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الميزانية' : 'Budget'} *</Label>
                  <Input type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'حالة العمل' : 'Business Case'} *</Label>
                <Textarea rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
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

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Charters List */}
      <div className="space-y-4">
        {filteredCharters.map((charter) => (
          <Card key={charter.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{charter.projectName}</CardTitle>
                    {getStatusBadge(charter.status)}
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="font-mono text-sm">{charter.code}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {charter.projectManager}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(charter.startDate).toLocaleDateString(locale)} - {new Date(charter.endDate).toLocaleDateString(locale)}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {charter.budget.toLocaleString()} {charter.currency}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePrint(charter)}>
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(charter)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedCharter(charter)}>
                    {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">{locale === 'ar' ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                  <TabsTrigger value="objectives">{locale === 'ar' ? 'الأهداف' : 'Objectives'}</TabsTrigger>
                  <TabsTrigger value="scope">{locale === 'ar' ? 'النطاق' : 'Scope'}</TabsTrigger>
                  <TabsTrigger value="stakeholders">{locale === 'ar' ? 'أصحاب المصلحة' : 'Stakeholders'}</TabsTrigger>
                  <TabsTrigger value="risks">{locale === 'ar' ? 'المخاطر' : 'Risks'}</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">{locale === 'ar' ? 'حالة العمل' : 'Business Case'}</h4>
                      <p className="text-sm text-muted-foreground">{charter.businessCase}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">{locale === 'ar' ? 'معايير النجاح' : 'Success Criteria'}</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {charter.successCriteria.map((criteria, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {charter.approvalDate && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          {locale === 'ar' ? 'معتمد في' : 'Approved on'} {new Date(charter.approvalDate).toLocaleDateString(locale)}
                        </p>
                        <p className="text-xs text-green-700">
                          {locale === 'ar' ? 'بواسطة' : 'By'} {charter.approvedBy}
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="objectives" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">{locale === 'ar' ? 'أهداف المشروع' : 'Project Objectives'}</h4>
                    <div className="space-y-2">
                      {charter.objectives.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                          <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                          <p className="text-sm">{obj}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">{locale === 'ar' ? 'المخرجات' : 'Deliverables'}</h4>
                    <div className="space-y-2">
                      {charter.deliverables.map((del, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                          <Flag className="h-5 w-5 text-purple-600 mt-0.5" />
                          <p className="text-sm">{del}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scope" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">{locale === 'ar' ? 'ضمن النطاق' : 'In Scope'}</h4>
                      <div className="space-y-2">
                        {charter.scope.inScope.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700">{locale === 'ar' ? 'خارج النطاق' : 'Out of Scope'}</h4>
                      <div className="space-y-2">
                        {charter.scope.outOfScope.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">{locale === 'ar' ? 'القيود' : 'Constraints'}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {charter.constraints.map((constraint, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                          <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                          <p className="text-sm">{constraint}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stakeholders">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                        <TableHead>{locale === 'ar' ? 'الدور' : 'Role'}</TableHead>
                        <TableHead>{locale === 'ar' ? 'المسؤولية' : 'Responsibility'}</TableHead>
                        <TableHead>{locale === 'ar' ? 'التأثير' : 'Influence'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {charter.stakeholders.map((stakeholder, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{stakeholder.name}</TableCell>
                          <TableCell>{stakeholder.role}</TableCell>
                          <TableCell>{stakeholder.responsibility}</TableCell>
                          <TableCell>
                            <Badge
                              variant={stakeholder.influence === 'high' ? 'default' : 'secondary'}
                              className={stakeholder.influence === 'high' ? 'bg-red-600' : stakeholder.influence === 'medium' ? 'bg-orange-600' : 'bg-green-600'}
                            >
                              {stakeholder.influence === 'high'
                                ? locale === 'ar' ? 'عالي' : 'High'
                                : stakeholder.influence === 'medium'
                                ? locale === 'ar' ? 'متوسط' : 'Medium'
                                : locale === 'ar' ? 'منخفض' : 'Low'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="risks" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">{locale === 'ar' ? 'المخاطر المحددة' : 'Identified Risks'}</h4>
                    <div className="space-y-2">
                      {charter.risks.map((risk, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                          <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                          <p className="text-sm">{risk}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">{locale === 'ar' ? 'الافتراضات' : 'Assumptions'}</h4>
                    <div className="space-y-2">
                      {charter.assumptions.map((assumption, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <p className="text-sm">{assumption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

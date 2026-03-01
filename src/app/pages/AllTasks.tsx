import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ListTodo, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  PlayCircle,
  XCircle,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: 'Review Q1 Financial Reports',
    titleAr: 'مراجعة التقارير المالية للربع الأول',
    description: 'Complete review of financial statements',
    descriptionAr: 'مراجعة كاملة للبيانات المالية',
    project: 'Finance Audit 2024',
    projectAr: 'التدقيق المالي 2024',
    assignedTo: 'Ahmed Hassan',
    assignedToAr: 'أحمد حسن',
    assignedBy: 'Sara Ali',
    assignedByAr: 'سارة علي',
    priority: 'high' as const,
    status: 'in_progress' as const,
    dueDate: '2024-03-15',
    startDate: '2024-03-01',
    progress: 65,
    department: 'Finance',
    departmentAr: 'المالية',
    tags: ['Finance', 'Audit', 'Q1'],
    tagsAr: ['مالية', 'تدقيق', 'الربع الأول'],
  },
  {
    id: 2,
    title: 'Update Inventory System',
    titleAr: 'تحديث نظام المخزون',
    description: 'Implement new inventory tracking features',
    descriptionAr: 'تطبيق ميزات جديدة لتتبع المخزون',
    project: 'ERP Enhancement',
    projectAr: 'تحسين نظام ERP',
    assignedTo: 'Mohammed Ali',
    assignedToAr: 'محمد علي',
    assignedBy: 'Fatima Ahmad',
    assignedByAr: 'فاطمة أحمد',
    priority: 'medium' as const,
    status: 'pending' as const,
    dueDate: '2024-03-20',
    startDate: '2024-03-05',
    progress: 0,
    department: 'IT',
    departmentAr: 'تقنية المعلومات',
    tags: ['IT', 'Inventory', 'Development'],
    tagsAr: ['تقنية', 'مخزون', 'تطوير'],
  },
  {
    id: 3,
    title: 'Prepare Sales Presentation',
    titleAr: 'تحضير عرض المبيعات',
    description: 'Create presentation for Q2 sales strategy',
    descriptionAr: 'إنشاء عرض تقديمي لاستراتيجية المبيعات للربع الثاني',
    project: 'Sales Strategy 2024',
    projectAr: 'استراتيجية المبيعات 2024',
    assignedTo: 'Layla Ibrahim',
    assignedToAr: 'ليلى إبراهيم',
    assignedBy: 'Khaled Mansour',
    assignedByAr: 'خالد منصور',
    priority: 'high' as const,
    status: 'in_progress' as const,
    dueDate: '2024-03-10',
    startDate: '2024-03-01',
    progress: 80,
    department: 'Sales',
    departmentAr: 'المبيعات',
    tags: ['Sales', 'Strategy', 'Q2'],
    tagsAr: ['مبيعات', 'استراتيجية', 'الربع الثاني'],
  },
  {
    id: 4,
    title: 'HR Policy Review',
    titleAr: 'مراجعة سياسات الموارد البشرية',
    description: 'Review and update company HR policies',
    descriptionAr: 'مراجعة وتحديث سياسات الموارد البشرية للشركة',
    project: 'HR Modernization',
    projectAr: 'تحديث الموارد البشرية',
    assignedTo: 'Nour Hassan',
    assignedToAr: 'نور حسن',
    assignedBy: 'Omar Khaled',
    assignedByAr: 'عمر خالد',
    priority: 'low' as const,
    status: 'completed' as const,
    dueDate: '2024-03-05',
    startDate: '2024-02-20',
    progress: 100,
    department: 'HR',
    departmentAr: 'الموارد البشرية',
    tags: ['HR', 'Policy', 'Compliance'],
    tagsAr: ['موارد بشرية', 'سياسات', 'امتثال'],
  },
  {
    id: 5,
    title: 'Equipment Maintenance Scheduling',
    titleAr: 'جدولة صيانة المعدات',
    description: 'Schedule quarterly maintenance for all equipment',
    descriptionAr: 'جدولة الصيانة الفصلية لجميع المعدات',
    project: 'Facility Management',
    projectAr: 'إدارة المرافق',
    assignedTo: 'Youssef Ahmed',
    assignedToAr: 'يوسف أحمد',
    assignedBy: 'Mona Salem',
    assignedByAr: 'منى سالم',
    priority: 'medium' as const,
    status: 'on_hold' as const,
    dueDate: '2024-03-25',
    startDate: '2024-03-08',
    progress: 30,
    department: 'Operations',
    departmentAr: 'العمليات',
    tags: ['Maintenance', 'Equipment', 'Facility'],
    tagsAr: ['صيانة', 'معدات', 'مرافق'],
  },
  {
    id: 6,
    title: 'Customer Feedback Analysis',
    titleAr: 'تحليل ملاحظات العملاء',
    description: 'Analyze Q1 customer feedback and prepare report',
    descriptionAr: 'تحليل ملاحظات العملاء للربع الأول وإعداد التقرير',
    project: 'Customer Experience',
    projectAr: 'تجربة العملاء',
    assignedTo: 'Hana Mohammed',
    assignedToAr: 'هناء محمد',
    assignedBy: 'Rami Farouk',
    assignedByAr: 'رامي فاروق',
    priority: 'high' as const,
    status: 'in_progress' as const,
    dueDate: '2024-03-12',
    startDate: '2024-03-03',
    progress: 45,
    department: 'Customer Service',
    departmentAr: 'خدمة العملاء',
    tags: ['Customer Service', 'Feedback', 'Analysis'],
    tagsAr: ['خدمة العملاء', 'ملاحظات', 'تحليل'],
  },
  {
    id: 7,
    title: 'Security Audit',
    titleAr: 'تدقيق الأمان',
    description: 'Conduct comprehensive security audit',
    descriptionAr: 'إجراء تدقيق أمني شامل',
    project: 'Security Enhancement',
    projectAr: 'تعزيز الأمان',
    assignedTo: 'Karim Nasser',
    assignedToAr: 'كريم ناصر',
    assignedBy: 'Dina Youssef',
    assignedByAr: 'دينا يوسف',
    priority: 'critical' as const,
    status: 'pending' as const,
    dueDate: '2024-03-18',
    startDate: '2024-03-10',
    progress: 0,
    department: 'IT',
    departmentAr: 'تقنية المعلومات',
    tags: ['Security', 'Audit', 'Critical'],
    tagsAr: ['أمان', 'تدقيق', 'حرج'],
  },
  {
    id: 8,
    title: 'Budget Planning for Q2',
    titleAr: 'تخطيط الميزانية للربع الثاني',
    description: 'Prepare detailed budget plan for Q2',
    descriptionAr: 'إعداد خطة ميزانية مفصلة للربع الثاني',
    project: 'Financial Planning',
    projectAr: 'التخطيط المالي',
    assignedTo: 'Rana Adel',
    assignedToAr: 'رنا عادل',
    assignedBy: 'Tarek Mahmoud',
    assignedByAr: 'طارق محمود',
    priority: 'high' as const,
    status: 'in_progress' as const,
    dueDate: '2024-03-22',
    startDate: '2024-03-01',
    progress: 55,
    department: 'Finance',
    departmentAr: 'المالية',
    tags: ['Finance', 'Budget', 'Planning'],
    tagsAr: ['مالية', 'ميزانية', 'تخطيط'],
  },
];

export default function AllTasks() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { label: string; className: string }> = {
      critical: {
        label: locale === 'ar' ? 'حرج' : 'Critical',
        className: 'bg-purple-600 text-white animate-pulse',
      },
      high: {
        label: locale === 'ar' ? 'عالية' : 'High',
        className: 'bg-red-600 text-white',
      },
      medium: {
        label: locale === 'ar' ? 'متوسطة' : 'Medium',
        className: 'bg-orange-600 text-white',
      },
      low: {
        label: locale === 'ar' ? 'منخفضة' : 'Low',
        className: 'bg-green-600 text-white',
      },
    };
    return <Badge className={config[priority].className}>{config[priority].label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; icon: React.ElementType; className: string }> = {
      pending: {
        label: locale === 'ar' ? 'قيد الانتظار' : 'Pending',
        icon: Circle,
        className: 'bg-gray-600 text-white',
      },
      in_progress: {
        label: locale === 'ar' ? 'قيد التنفيذ' : 'In Progress',
        icon: PlayCircle,
        className: 'bg-blue-600 text-white',
      },
      on_hold: {
        label: locale === 'ar' ? 'معلق' : 'On Hold',
        icon: AlertCircle,
        className: 'bg-yellow-600 text-white',
      },
      completed: {
        label: locale === 'ar' ? 'مكتمل' : 'Completed',
        icon: CheckCircle2,
        className: 'bg-green-600 text-white',
      },
      cancelled: {
        label: locale === 'ar' ? 'ملغي' : 'Cancelled',
        icon: XCircle,
        className: 'bg-red-600 text-white',
      },
    };
    const Icon = config[status].icon;
    return (
      <Badge className={config[status].className}>
        <Icon className="h-3 w-3 mr-1" />
        {config[status].label}
      </Badge>
    );
  };

  // Statistics
  const stats = {
    total: mockTasks.length,
    pending: mockTasks.filter(t => t.status === 'pending').length,
    inProgress: mockTasks.filter(t => t.status === 'in_progress').length,
    completed: mockTasks.filter(t => t.status === 'completed').length,
    onHold: mockTasks.filter(t => t.status === 'on_hold').length,
    highPriority: mockTasks.filter(t => t.priority === 'high' || t.priority === 'critical').length,
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch =
      (locale === 'ar' ? task.titleAr : task.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (locale === 'ar' ? task.projectAr : task.project).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (locale === 'ar' ? task.assignedToAr : task.assignedTo).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesDepartment = departmentFilter === 'all' || (locale === 'ar' ? task.departmentAr : task.department) === departmentFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ListTodo className="h-8 w-8 text-blue-600" />
            {locale === 'ar' ? 'جميع المهام' : 'All Tasks'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'عرض وإدارة جميع المهام في النظام'
              : 'View and manage all tasks in the system'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert('Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Button onClick={() => alert('Creating new task...')}>
            <Plus className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'مهمة جديدة' : 'New Task'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي المهام' : 'Total Tasks'}
            </CardTitle>
            <ListTodo className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'قيد الانتظار' : 'Pending'}
            </CardTitle>
            <Circle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
            </CardTitle>
            <PlayCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'مكتملة' : 'Completed'}
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'معلقة' : 'On Hold'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onHold}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'أولوية عالية' : 'High Priority'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'الحالة' : 'Status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="pending">{locale === 'ar' ? 'قيد الانتظار' : 'Pending'}</SelectItem>
                <SelectItem value="in_progress">{locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</SelectItem>
                <SelectItem value="on_hold">{locale === 'ar' ? 'معلق' : 'On Hold'}</SelectItem>
                <SelectItem value="completed">{locale === 'ar' ? 'مكتمل' : 'Completed'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'الأولوية' : 'Priority'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأولويات' : 'All Priorities'}</SelectItem>
                <SelectItem value="critical">{locale === 'ar' ? 'حرج' : 'Critical'}</SelectItem>
                <SelectItem value="high">{locale === 'ar' ? 'عالية' : 'High'}</SelectItem>
                <SelectItem value="medium">{locale === 'ar' ? 'متوسطة' : 'Medium'}</SelectItem>
                <SelectItem value="low">{locale === 'ar' ? 'منخفضة' : 'Low'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'القسم' : 'Department'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
                <SelectItem value={locale === 'ar' ? 'المالية' : 'Finance'}>{locale === 'ar' ? 'المالية' : 'Finance'}</SelectItem>
                <SelectItem value={locale === 'ar' ? 'تقنية المعلومات' : 'IT'}>{locale === 'ar' ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                <SelectItem value={locale === 'ar' ? 'المبيعات' : 'Sales'}>{locale === 'ar' ? 'المبيعات' : 'Sales'}</SelectItem>
                <SelectItem value={locale === 'ar' ? 'الموارد البشرية' : 'HR'}>{locale === 'ar' ? 'الموارد البشرية' : 'HR'}</SelectItem>
                <SelectItem value={locale === 'ar' ? 'العمليات' : 'Operations'}>{locale === 'ar' ? 'العمليات' : 'Operations'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'قائمة المهام' : 'Tasks List'}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? `عرض ${filteredTasks.length} من ${mockTasks.length} مهمة`
              : `Showing ${filteredTasks.length} of ${mockTasks.length} tasks`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'المهمة' : 'Task'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المشروع' : 'Project'}</TableHead>
                <TableHead>{locale === 'ar' ? 'مسند إلى' : 'Assigned To'}</TableHead>
                <TableHead>{locale === 'ar' ? 'القسم' : 'Department'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الأولوية' : 'Priority'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التقدم' : 'Progress'}</TableHead>
                <TableHead>{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{locale === 'ar' ? task.titleAr : task.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {locale === 'ar' ? task.descriptionAr : task.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      {locale === 'ar' ? task.projectAr : task.project}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-600" />
                      {locale === 'ar' ? task.assignedToAr : task.assignedTo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{locale === 'ar' ? task.departmentAr : task.department}</Badge>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            task.progress === 100
                              ? 'bg-green-600'
                              : task.progress >= 50
                              ? 'bg-blue-600'
                              : 'bg-yellow-600'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      {new Date(task.dueDate).toLocaleDateString(locale)}
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

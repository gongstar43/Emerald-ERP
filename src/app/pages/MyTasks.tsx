import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  ListTodo,
} from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
  assignedTo?: string;
  category: string;
  createdAt: string;
}

export default function MyTasks() {
  const { locale } = useLanguage();
  
  const MOCK_TASKS: Task[] = [
    {
      id: '1',
      title: locale === 'ar' ? 'مراجعة فواتير المبيعات' : 'Review Sales Invoices',
      description: locale === 'ar' ? 'مراجعة والموافقة على فواتير المبيعات للشهر الحالي' : 'Review and approve sales invoices for current month',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2026-02-28',
      category: locale === 'ar' ? 'المبيعات' : 'Sales',
      createdAt: '2026-02-20',
    },
    {
      id: '2',
      title: locale === 'ar' ? 'إعداد تقرير المخزون' : 'Prepare Inventory Report',
      description: locale === 'ar' ? 'إعداد تقرير شامل عن حالة المخزون والأصناف' : 'Prepare comprehensive report on inventory status and items',
      priority: 'medium',
      status: 'todo',
      dueDate: '2026-03-05',
      category: locale === 'ar' ? 'المخزون' : 'Inventory',
      createdAt: '2026-02-25',
    },
    {
      id: '3',
      title: locale === 'ar' ? 'اجتماع فريق المبيعات' : 'Sales Team Meeting',
      description: locale === 'ar' ? 'اجتماع شهري لمناقشة الأهداف والإنجازات' : 'Monthly meeting to discuss targets and achievements',
      priority: 'urgent',
      status: 'todo',
      dueDate: '2026-02-27',
      category: locale === 'ar' ? 'اجتماعات' : 'Meetings',
      createdAt: '2026-02-26',
    },
    {
      id: '4',
      title: locale === 'ar' ? 'تحديث بيانات العملاء' : 'Update Customer Data',
      description: locale === 'ar' ? 'مراجعة وتحديث معلومات العملاء في النظام' : 'Review and update customer information in the system',
      priority: 'low',
      status: 'completed',
      dueDate: '2026-02-26',
      category: locale === 'ar' ? 'إدارة البيانات' : 'Data Management',
      createdAt: '2026-02-15',
    },
    {
      id: '5',
      title: locale === 'ar' ? 'مراجعة طلبات الشراء' : 'Review Purchase Orders',
      description: locale === 'ar' ? 'الموافقة على طلبات الشراء المعلقة' : 'Approve pending purchase orders',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2026-03-01',
      category: locale === 'ar' ? 'المشتريات' : 'Purchases',
      createdAt: '2026-02-24',
    },
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    dueDate: '',
    category: '',
  });

  // Initialize tasks on mount
  React.useEffect(() => {
    setTasks(MOCK_TASKS);
  }, []);

  const PRIORITIES = [
    { value: 'low', label: { ar: 'منخفضة', en: 'Low' }, color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: { ar: 'متوسطة', en: 'Medium' }, color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: { ar: 'عالية', en: 'High' }, color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: { ar: 'عاجلة', en: 'Urgent' }, color: 'bg-red-100 text-red-800' },
  ];

  const STATUSES = [
    { value: 'todo', label: { ar: 'قيد الانتظار', en: 'To Do' }, icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'in_progress', label: { ar: 'قيد التنفيذ', en: 'In Progress' }, icon: AlertCircle, color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: { ar: 'مكتملة', en: 'Completed' }, icon: CheckCircle2, color: 'bg-green-100 text-green-800' },
  ];

  const getPriorityBadge = (priority: string) => {
    const priorityData = PRIORITIES.find((p) => p.value === priority);
    if (!priorityData) return null;
    return (
      <Badge className={priorityData.color}>
        {priorityData.label[locale]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusData = STATUSES.find((s) => s.value === status);
    if (!statusData) return null;
    const StatusIcon = statusData.icon;
    return (
      <Badge className={statusData.color}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {statusData.label[locale]}
      </Badge>
    );
  };

  const handleAddTask = () => {
    if (!formData.title || !formData.dueDate) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newTask: Task = {
      id: String(tasks.length + 1),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      category: formData.category,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks([...tasks, newTask]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(locale === 'ar' ? 'تم إضافة المهمة بنجاح' : 'Task added successfully');
  };

  const handleEditTask = () => {
    if (!selectedTask) return;

    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id
        ? {
            ...task,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
            dueDate: formData.dueDate,
            category: formData.category,
          }
        : task
    );

    setTasks(updatedTasks);
    setIsEditDialogOpen(false);
    setSelectedTask(null);
    resetForm();
    toast.success(locale === 'ar' ? 'تم تحديث المهمة بنجاح' : 'Task updated successfully');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success(locale === 'ar' ? 'تم حذف المهمة بنجاح' : 'Task deleted successfully');
  };

  const handleChangeStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast.success(locale === 'ar' ? 'تم تحديث حالة المهمة' : 'Task status updated');
  };

  const openEditDialog = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      category: task.category,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      category: '',
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ListTodo className="h-8 w-8 text-blue-600" />
            {locale === 'ar' ? 'مهامي' : 'My Tasks'}
          </h1>
          <p className="text-gray-600 mt-1">
            {locale === 'ar' ? 'إدارة ومتابعة المهام الشخصية' : 'Manage and track personal tasks'}
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة مهمة' : 'Add Task'}
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'إجمالي المهام' : 'Total Tasks'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {tasks.filter((t) => t.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'مكتملة' : 'Completed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {tasks.filter((t) => t.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'متأخرة' : 'Overdue'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {tasks.filter((t) => isOverdue(t.dueDate, t.status)).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'جميع الأولويات' : 'All Priorities'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأولويات' : 'All Priorities'}</SelectItem>
                {PRIORITIES.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'جميع الحالات' : 'All Status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Status'}</SelectItem>
                {STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'مزيد من الفلاتر' : 'More Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'قائمة المهام' : 'Tasks List'}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'عرض وإدارة جميع المهام المخصصة لك'
              : 'View and manage all tasks assigned to you'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ar' ? 'المهمة' : 'Task'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الأولوية' : 'Priority'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'التصنيف' : 'Category'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</TableHead>
                  <TableHead className="text-center">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {locale === 'ar' ? 'لا توجد مهام' : 'No tasks found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-gray-600">
                        {task.description}
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                          <Tag className="h-3 w-3" />
                          {task.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`flex items-center gap-2 text-sm ${
                            isOverdue(task.dueDate, task.status) ? 'text-red-600 font-semibold' : 'text-gray-600'
                          }`}
                        >
                          <Calendar className="h-3 w-3" />
                          {formatDate(task.dueDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openEditDialog(task)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {locale === 'ar' ? 'تعديل' : 'Edit'}
                              </DropdownMenuItem>
                              {task.status !== 'completed' && (
                                <DropdownMenuItem onClick={() => handleChangeStatus(task.id, 'completed')}>
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  {locale === 'ar' ? 'وضع علامة كمكتمل' : 'Mark as Completed'}
                                </DropdownMenuItem>
                              )}
                              {task.status === 'todo' && (
                                <DropdownMenuItem onClick={() => handleChangeStatus(task.id, 'in_progress')}>
                                  <AlertCircle className="h-4 w-4 mr-2" />
                                  {locale === 'ar' ? 'بدء التنفيذ' : 'Start Progress'}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {locale === 'ar' ? 'حذف' : 'Delete'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {locale === 'ar' ? 'إضافة مهمة جديدة' : 'Add New Task'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar'
                ? 'أدخل تفاصيل المهمة الجديدة'
                : 'Enter the details of the new task'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {locale === 'ar' ? 'عنوان المهمة' : 'Task Title'} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={locale === 'ar' ? 'أدخل عنوان المهمة' : 'Enter task title'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={locale === 'ar' ? 'أدخل وصف المهمة' : 'Enter task description'}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">{locale === 'ar' ? 'الأولوية' : 'Priority'}</Label>
                <Select value={formData.priority} onValueChange={(value: Task['priority']) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{locale === 'ar' ? 'الحالة' : 'Status'}</Label>
                <Select value={formData.status} onValueChange={(value: Task['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">
                  {locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{locale === 'ar' ? 'التصنيف' : 'Category'}</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder={locale === 'ar' ? 'مثال: المبيعات' : 'e.g., Sales'}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              resetForm();
            }}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">
              {locale === 'ar' ? 'إضافة المهمة' : 'Add Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              {locale === 'ar' ? 'تعديل المهمة' : 'Edit Task'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' ? 'تحديث تفاصيل المهمة' : 'Update task details'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">{locale === 'ar' ? 'عنوان المهمة' : 'Task Title'}</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-priority">{locale === 'ar' ? 'الأولوية' : 'Priority'}</Label>
                <Select value={formData.priority} onValueChange={(value: Task['priority']) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">{locale === 'ar' ? 'الحالة' : 'Status'}</Label>
                <Select value={formData.status} onValueChange={(value: Task['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dueDate">{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">{locale === 'ar' ? 'التصنيف' : 'Category'}</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setSelectedTask(null);
              resetForm();
            }}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleEditTask} className="bg-blue-600 hover:bg-blue-700">
              {locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
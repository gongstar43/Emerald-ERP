import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, Clock, Users, Download, Plus, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  nameAr: string;
  startDate: string;
  endDate: string;
  duration: number;
  progress: number;
  assignee: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  dependencies: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function ProjectSchedule() {
  const { locale } = useLanguage();
  const [viewMode, setViewMode] = useState<'gantt' | 'timeline' | 'list'>('gantt');
  const [filterStatus, setFilterStatus] = useState('all');

  const tasks: Task[] = [
    {
      id: 'T001',
      name: 'Project Initiation',
      nameAr: 'بدء المشروع',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      duration: 15,
      progress: 100,
      assignee: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      status: 'completed',
      dependencies: [],
      priority: 'high',
    },
    {
      id: 'T002',
      name: 'Requirements Gathering',
      nameAr: 'جمع المتطلبات',
      startDate: '2024-01-16',
      endDate: '2024-02-15',
      duration: 30,
      progress: 100,
      assignee: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      status: 'completed',
      dependencies: ['T001'],
      priority: 'critical',
    },
    {
      id: 'T003',
      name: 'System Design',
      nameAr: 'تصميم النظام',
      startDate: '2024-02-16',
      endDate: '2024-03-20',
      duration: 33,
      progress: 85,
      assignee: locale === 'ar' ? 'خالد سعيد' : 'Khalid Saeed',
      status: 'in_progress',
      dependencies: ['T002'],
      priority: 'high',
    },
    {
      id: 'T004',
      name: 'Database Design',
      nameAr: 'تصميم قاعدة البيانات',
      startDate: '2024-02-20',
      endDate: '2024-03-10',
      duration: 19,
      progress: 100,
      assignee: locale === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      status: 'completed',
      dependencies: ['T002'],
      priority: 'high',
    },
    {
      id: 'T005',
      name: 'Frontend Development',
      nameAr: 'تطوير الواجهة الأمامية',
      startDate: '2024-03-21',
      endDate: '2024-05-15',
      duration: 56,
      progress: 45,
      assignee: locale === 'ar' ? 'محمد حسن' : 'Mohammed Hassan',
      status: 'in_progress',
      dependencies: ['T003'],
      priority: 'high',
    },
    {
      id: 'T006',
      name: 'Backend Development',
      nameAr: 'تطوير الخادم',
      startDate: '2024-03-21',
      endDate: '2024-05-20',
      duration: 61,
      progress: 50,
      assignee: locale === 'ar' ? 'عبدالله ناصر' : 'Abdullah Nasser',
      status: 'in_progress',
      dependencies: ['T003', 'T004'],
      priority: 'critical',
    },
    {
      id: 'T007',
      name: 'Integration Testing',
      nameAr: 'اختبار التكامل',
      startDate: '2024-05-21',
      endDate: '2024-06-15',
      duration: 26,
      progress: 0,
      assignee: locale === 'ar' ? 'نورة عبدالرحمن' : 'Noura Abdulrahman',
      status: 'not_started',
      dependencies: ['T005', 'T006'],
      priority: 'high',
    },
    {
      id: 'T008',
      name: 'User Acceptance Testing',
      nameAr: 'اختبار قبول المستخدم',
      startDate: '2024-06-16',
      endDate: '2024-07-05',
      duration: 20,
      progress: 0,
      assignee: locale === 'ar' ? 'ليلى إبراهيم' : 'Layla Ibrahim',
      status: 'not_started',
      dependencies: ['T007'],
      priority: 'medium',
    },
    {
      id: 'T009',
      name: 'Deployment',
      nameAr: 'النشر',
      startDate: '2024-07-06',
      endDate: '2024-07-15',
      duration: 10,
      progress: 0,
      assignee: locale === 'ar' ? 'يوسف محمد' : 'Youssef Mohammed',
      status: 'not_started',
      dependencies: ['T008'],
      priority: 'critical',
    },
    {
      id: 'T010',
      name: 'Training & Handover',
      nameAr: 'التدريب والتسليم',
      startDate: '2024-07-16',
      endDate: '2024-07-31',
      duration: 16,
      progress: 0,
      assignee: locale === 'ar' ? 'مريم خالد' : 'Mariam Khalid',
      status: 'not_started',
      dependencies: ['T009'],
      priority: 'medium',
    },
  ];

  const getStatusBadge = (status: Task['status']) => {
    const config = {
      not_started: {
        label: locale === 'ar' ? 'لم تبدأ' : 'Not Started',
        className: 'bg-gray-400 text-white',
      },
      in_progress: {
        label: locale === 'ar' ? 'قيد التنفيذ' : 'In Progress',
        className: 'bg-blue-600 text-white',
      },
      completed: {
        label: locale === 'ar' ? 'مكتمل' : 'Completed',
        className: 'bg-green-600 text-white',
      },
      delayed: {
        label: locale === 'ar' ? 'متأخر' : 'Delayed',
        className: 'bg-red-600 text-white',
      },
    };
    return <Badge className={config[status].className}>{config[status].label}</Badge>;
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const config = {
      low: { label: locale === 'ar' ? 'منخفضة' : 'Low', className: 'bg-gray-200 text-gray-800' },
      medium: { label: locale === 'ar' ? 'متوسطة' : 'Medium', className: 'bg-blue-200 text-blue-800' },
      high: { label: locale === 'ar' ? 'عالية' : 'High', className: 'bg-orange-200 text-orange-800' },
      critical: { label: locale === 'ar' ? 'حرجة' : 'Critical', className: 'bg-red-200 text-red-800' },
    };
    return <Badge className={config[priority].className}>{config[priority].label}</Badge>;
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const notStartedTasks = tasks.filter(t => t.status === 'not_started').length;
  const overallProgress = Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / totalTasks);

  // Filter tasks
  const filteredTasks = filterStatus === 'all' ? tasks : tasks.filter(t => t.status === filterStatus);

  // Gantt chart dates
  const projectStartDate = new Date(Math.min(...tasks.map(t => new Date(t.startDate).getTime())));
  const projectEndDate = new Date(Math.max(...tasks.map(t => new Date(t.endDate).getTime())));
  const totalProjectDays = Math.ceil((projectEndDate.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));

  const calculatePosition = (date: string) => {
    const taskDate = new Date(date);
    const daysFromStart = Math.ceil((taskDate.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));
    return (daysFromStart / totalProjectDays) * 100;
  };

  const calculateWidth = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return (duration / totalProjectDays) * 100;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الجدول الزمني للمشروع' : 'Project Schedule'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'مخطط جانت والجدول الزمني - متوافق مع PMBOK 7th' 
              : 'Gantt Chart & Timeline - PMBOK 7th Edition Compliant'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert('Adding task...')}>
            <Plus className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'مهمة جديدة' : 'New Task'}
          </Button>
          <Button onClick={() => alert('Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Project Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي المهام' : 'Total Tasks'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'مهمة' : 'tasks'}
            </p>
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
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {((completedTasks / totalTasks) * 100).toFixed(0)}% {locale === 'ar' ? 'من الإجمالي' : 'of total'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'مهمة نشطة' : 'active tasks'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'التقدم الإجمالي' : 'Overall Progress'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{overallProgress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${overallProgress}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="not_started">{locale === 'ar' ? 'لم تبدأ' : 'Not Started'}</SelectItem>
                <SelectItem value="in_progress">{locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</SelectItem>
                <SelectItem value="completed">{locale === 'ar' ? 'مكتملة' : 'Completed'}</SelectItem>
                <SelectItem value="delayed">{locale === 'ar' ? 'متأخرة' : 'Delayed'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
        <TabsList>
          <TabsTrigger value="gantt">{locale === 'ar' ? 'مخطط جانت' : 'Gantt Chart'}</TabsTrigger>
          <TabsTrigger value="timeline">{locale === 'ar' ? 'الجدول الزمني' : 'Timeline'}</TabsTrigger>
          <TabsTrigger value="list">{locale === 'ar' ? 'قائمة المهام' : 'Task List'}</TabsTrigger>
        </TabsList>

        {/* Gantt Chart View */}
        <TabsContent value="gantt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale === 'ar' 
                  ? `الجدول الزمني: ${projectStartDate.toLocaleDateString(locale)} - ${projectEndDate.toLocaleDateString(locale)}` 
                  : `Timeline: ${projectStartDate.toLocaleDateString(locale)} - ${projectEndDate.toLocaleDateString(locale)}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Months header */}
                <div className="flex border-b pb-2">
                  <div className="w-64 flex-shrink-0"></div>
                  <div className="flex-1 flex">
                    {[...Array(8)].map((_, i) => {
                      const monthDate = new Date(2024, i, 1);
                      return (
                        <div key={i} className="flex-1 text-center text-sm font-semibold border-l px-2">
                          {monthDate.toLocaleDateString(locale, { month: 'short' })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tasks */}
                {filteredTasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <div className="w-64 flex-shrink-0 pr-4">
                      <div className="font-medium text-sm">{locale === 'ar' ? task.nameAr : task.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(task.status)}
                        <span className="text-xs text-muted-foreground">{task.duration}d</span>
                      </div>
                    </div>
                    <div className="flex-1 relative h-10">
                      <div 
                        className={`absolute h-6 rounded ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in_progress' ? 'bg-blue-500' :
                          task.status === 'delayed' ? 'bg-red-500' :
                          'bg-gray-400'
                        }`}
                        style={{ 
                          left: `${calculatePosition(task.startDate)}%`,
                          width: `${calculateWidth(task.startDate, task.endDate)}%`
                        }}
                      >
                        <div className="h-full bg-green-700 rounded" style={{ width: `${task.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline View */}
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                {/* Tasks */}
                <div className="space-y-8">
                  {filteredTasks.map((task, index) => (
                    <div key={task.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 text-right">
                        <div className="text-sm font-medium">{task.id}</div>
                      </div>
                      <div className="relative flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full border-4 ${
                          task.status === 'completed' ? 'bg-green-500 border-green-200' :
                          task.status === 'in_progress' ? 'bg-blue-500 border-blue-200' :
                          'bg-gray-400 border-gray-200'
                        }`}></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{locale === 'ar' ? task.nameAr : task.name}</h3>
                              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(task.startDate).toLocaleDateString(locale)} - {new Date(task.endDate).toLocaleDateString(locale)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {task.assignee}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                {getStatusBadge(task.status)}
                                {getPriorityBadge(task.priority)}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">{task.progress}%</div>
                              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'المهمة' : 'Task'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'البداية' : 'Start'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'النهاية' : 'End'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'المدة' : 'Duration'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'المسؤول' : 'Assignee'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'الأولوية' : 'Priority'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'التقدم' : 'Progress'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'ar' ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{locale === 'ar' ? task.nameAr : task.name}</div>
                          <div className="text-xs text-muted-foreground">{task.id}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{new Date(task.startDate).toLocaleDateString(locale)}</td>
                        <td className="px-4 py-3 text-sm">{new Date(task.endDate).toLocaleDateString(locale)}</td>
                        <td className="px-4 py-3 text-sm">{task.duration} {locale === 'ar' ? 'يوم' : 'days'}</td>
                        <td className="px-4 py-3 text-sm">{task.assignee}</td>
                        <td className="px-4 py-3">{getPriorityBadge(task.priority)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                            </div>
                            <span className="text-sm font-semibold">{task.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(task.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Critical Path Info */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">
            {locale === 'ar' ? 'المسار الحرج (Critical Path)' : 'Critical Path'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700">
            {locale === 'ar' 
              ? 'المسار الحرج يمثل أطول سلسلة من المهام التي تحدد المدة الإجمالية للمشروع. أي تأخير في هذه المهام سيؤدي إلى تأخير المشروع بأكمله.'
              : 'The critical path represents the longest chain of tasks that determines the overall project duration. Any delay in these tasks will delay the entire project.'}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 bg-purple-200 h-2 rounded-full">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-sm font-semibold text-purple-700">
              {locale === 'ar' ? 'المدة الإجمالية: 213 يوم' : 'Total Duration: 213 days'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

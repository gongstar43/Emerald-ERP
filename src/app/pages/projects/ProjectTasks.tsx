import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
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
  Plus,
  ListTodo,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  User,
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  progress: number;
  dueDate: string;
  estimatedHours: number;
}

export default function ProjectTasks() {
  const { locale } = useLanguage();

  const tasks: Task[] = [
    {
      id: '1',
      title: 'تصميم قاعدة البيانات',
      project: 'نظام ERP',
      assignee: 'أحمد محمد',
      priority: 'high',
      status: 'done',
      progress: 100,
      dueDate: '2024-03-15',
      estimatedHours: 40,
    },
    {
      id: '2',
      title: 'تطوير واجهة المستخدم',
      project: 'نظام ERP',
      assignee: 'فاطمة علي',
      priority: 'high',
      status: 'in_progress',
      progress: 65,
      dueDate: '2024-03-30',
      estimatedHours: 80,
    },
    {
      id: '3',
      title: 'اختبار الوحدات',
      project: 'نظام ERP',
      assignee: 'خالد أحمد',
      priority: 'medium',
      status: 'todo',
      progress: 0,
      dueDate: '2024-04-15',
      estimatedHours: 60,
    },
  ];

  const getPriorityBadge = (priority: Task['priority']) => {
    const config = {
      high: { label: locale === 'ar' ? 'عالي' : 'High', className: 'bg-red-600' },
      medium: { label: locale === 'ar' ? 'متوسط' : 'Medium', className: 'bg-orange-600' },
      low: { label: locale === 'ar' ? 'منخفض' : 'Low', className: 'bg-blue-600' },
    };
    return <Badge className={config[priority].className}>{config[priority].label}</Badge>;
  };

  const getStatusBadge = (status: Task['status']) => {
    const config = {
      todo: { label: locale === 'ar' ? 'للعمل' : 'To Do', className: 'bg-gray-500' },
      in_progress: { label: locale === 'ar' ? 'جاري' : 'In Progress', className: 'bg-blue-600' },
      review: { label: locale === 'ar' ? 'مراجعة' : 'Review', className: 'bg-purple-600' },
      done: { label: locale === 'ar' ? 'منتهي' : 'Done', className: 'bg-green-600' },
    };
    return <Badge className={config[status].className}>{config[status].label}</Badge>;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'مهام المشاريع' : 'Project Tasks'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة ومتابعة مهام المشاريع' : 'Manage and track project tasks'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'مهمة جديدة' : 'New Task'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي المهام' : 'Total Tasks'}
            </CardTitle>
            <ListTodo className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'مكتملة' : 'Completed'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.status === 'done').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'أولوية عالية' : 'High Priority'}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.priority === 'high').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'المهمة' : 'Task'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المشروع' : 'Project'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المسؤول' : 'Assignee'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الأولوية' : 'Priority'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التقدم' : 'Progress'}</TableHead>
                <TableHead>{locale === 'ar' ? 'موعد التسليم' : 'Due Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.project}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {task.assignee}
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="w-20" />
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Plus,
  BookOpen,
  Users,
  Calendar,
  Award,
  Clock,
  Target,
  CheckCircle,
} from 'lucide-react';

interface TrainingProgram {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: number;
  startDate: string;
  endDate: string;
  participants: number;
  capacity: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  completionRate: number;
}

export default function Training() {
  const { locale } = useLanguage();

  const programs: TrainingProgram[] = [
    {
      id: '1',
      title: 'إدارة المشاريع الاحترافية',
      category: 'إدارة',
      instructor: 'د. أحمد محمد',
      duration: 40,
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      participants: 18,
      capacity: 20,
      status: 'in_progress',
      completionRate: 65,
    },
    {
      id: '2',
      title: 'تطوير البرمجيات بـ React',
      category: 'تقنية',
      instructor: 'م. فاطمة علي',
      duration: 60,
      startDate: '2024-02-15',
      endDate: '2024-03-30',
      participants: 15,
      capacity: 15,
      status: 'in_progress',
      completionRate: 80,
    },
    {
      id: '3',
      title: 'مهارات القيادة',
      category: 'تطوير ذاتي',
      instructor: 'أ. خالد أحمد',
      duration: 30,
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      participants: 25,
      capacity: 25,
      status: 'completed',
      completionRate: 100,
    },
  ];

  const getStatusBadge = (status: TrainingProgram['status']) => {
    const config = {
      scheduled: { label: locale === 'ar' ? 'مجدول' : 'Scheduled', className: 'bg-blue-600' },
      in_progress: { label: locale === 'ar' ? 'جاري' : 'In Progress', className: 'bg-orange-600' },
      completed: { label: locale === 'ar' ? 'مكتمل' : 'Completed', className: 'bg-green-600' },
      cancelled: { label: locale === 'ar' ? 'ملغي' : 'Cancelled', className: 'bg-red-600' },
    };
    return <Badge className={config[status].className}>{config[status].label}</Badge>;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'التدريب والتطوير' : 'Training & Development'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة برامج التدريب' : 'Manage training programs'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'برنامج جديد' : 'New Program'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'البرامج النشطة' : 'Active Programs'}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.filter(p => p.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'المشاركون' : 'Participants'}
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((sum, p) => sum + p.participants, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'ساعات التدريب' : 'Training Hours'}
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((sum, p) => sum + p.duration, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'المكتملة' : 'Completed'}
            </CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.filter(p => p.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'البرنامج' : 'Program'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المدرب' : 'Instructor'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المشاركون' : 'Participants'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التقدم' : 'Progress'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{program.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {program.startDate} - {program.endDate}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.category}</Badge>
                  </TableCell>
                  <TableCell>{program.instructor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {program.participants}/{program.capacity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={program.completionRate} className="w-20" />
                      <span className="text-sm font-medium">{program.completionRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(program.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

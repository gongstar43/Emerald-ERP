import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Target, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Users,
  ListChecks,
  TrendingUp,
  AlertCircle,
  Zap,
  Flag,
  ArrowRight,
  BarChart3,
  Activity,
  CheckSquare,
  XCircle,
} from 'lucide-react';

// Agile/Scrum Sprint Management - إدارة السبرنتات حسب معايير Agile/Scrum
interface Sprint {
  id: string;
  sprintNumber: number;
  name: string;
  goal: string;
  status: 'planned' | 'active' | 'completed';
  
  // Dates
  startDate: string;
  endDate: string;
  duration: number; // in days
  
  // Stories & Tasks
  totalStories: number;
  completedStories: number;
  totalStoryPoints: number;
  completedStoryPoints: number;
  totalTasks: number;
  completedTasks: number;
  
  // Team
  teamMembers: string[];
  scrumMaster: string;
  productOwner: string;
  
  // Velocity & Performance
  plannedVelocity: number;
  actualVelocity: number;
  
  // Sprint Metrics
  committedPoints: number;
  deliveredPoints: number;
  carryoverPoints: number;
  
  createdAt: string;
  updatedAt: string;
}

export default function Sprints() {
  const { locale } = useLanguage();
  const [sprints, setSprints] = useState<Sprint[]>(mockSprints(locale));
  const [activeTab, setActiveTab] = useState('active');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeSprint = sprints.find(s => s.status === 'active');
  const plannedSprints = sprints.filter(s => s.status === 'planned');
  const completedSprints = sprints.filter(s => s.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'planned': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'planned': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return locale === 'ar' ? 'نشط' : 'Active';
      case 'planned': return locale === 'ar' ? 'مخطط' : 'Planned';
      case 'completed': return locale === 'ar' ? 'مكتمل' : 'Completed';
      default: return status;
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            {locale === 'ar' ? 'إدارة السبرنتات' : 'Sprint Management'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'ar' 
              ? 'إدارة السبرنتات حسب منهجية Agile/Scrum - تخطيط وتتبع التقدم'
              : 'Agile/Scrum Sprint Management - Planning & Progress Tracking'}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {locale === 'ar' ? 'سبرنت جديد' : 'New Sprint'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {locale === 'ar' ? 'إنشاء سبرنت جديد' : 'Create New Sprint'}
                </DialogTitle>
                <DialogDescription>
                  {locale === 'ar' 
                    ? 'حدد معلومات السبرنت الجديد والفريق المسؤول'
                    : 'Define new sprint information and responsible team'}
                </DialogDescription>
              </DialogHeader>
              <div className="text-center py-8 text-muted-foreground">
                {locale === 'ar' ? 'نموذج الإنشاء قيد التطوير' : 'Creation form under development'}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active Sprint Card */}
      {activeSprint && (
        <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {activeSprint.name}
                    <Badge className="bg-green-600 text-white">
                      <Play className="w-3 h-3 mr-1" />
                      {locale === 'ar' ? 'نشط الآن' : 'Active Now'}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-base">
                    🎯 {activeSprint.goal}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {getDaysRemaining(activeSprint.endDate)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'يوم متبقي' : 'Days Left'}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {activeSprint.completedStoryPoints}/{activeSprint.totalStoryPoints}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'نقاط القصص' : 'Story Points'}
                </div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {activeSprint.completedStories}/{activeSprint.totalStories}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'القصص' : 'Stories'}
                </div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {activeSprint.completedTasks}/{activeSprint.totalTasks}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'المهام' : 'Tasks'}
                </div>
              </div>
              <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round((activeSprint.completedStoryPoints / activeSprint.totalStoryPoints) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'التقدم' : 'Progress'}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    {locale === 'ar' ? 'تقدم نقاط القصص' : 'Story Points Progress'}
                  </span>
                  <span className="text-muted-foreground">
                    {activeSprint.completedStoryPoints} / {activeSprint.totalStoryPoints}
                  </span>
                </div>
                <Progress 
                  value={(activeSprint.completedStoryPoints / activeSprint.totalStoryPoints) * 100} 
                  className="h-3"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-muted-foreground">
                    {locale === 'ar' ? 'البداية:' : 'Start:'}
                  </span>
                  <span className="font-medium">{activeSprint.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-red-500" />
                  <span className="text-muted-foreground">
                    {locale === 'ar' ? 'النهاية:' : 'End:'}
                  </span>
                  <span className="font-medium">{activeSprint.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">
                    {locale === 'ar' ? 'الفريق:' : 'Team:'}
                  </span>
                  <span className="font-medium">{activeSprint.teamMembers.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            <Play className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'نشط' : 'Active'}
            {activeSprint && <Badge className="ml-2 bg-green-600">1</Badge>}
          </TabsTrigger>
          <TabsTrigger value="planned">
            <Clock className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'مخطط' : 'Planned'}
            <Badge className="ml-2" variant="secondary">{plannedSprints.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'مكتمل' : 'Completed'}
            <Badge className="ml-2" variant="secondary">{completedSprints.length}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Active Sprint Tab */}
        <TabsContent value="active" className="space-y-4">
          {activeSprint ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === 'ar' ? 'تفاصيل السبرنت النشط' : 'Active Sprint Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Sprint Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {locale === 'ar' ? 'معلومات السبرنت' : 'Sprint Information'}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'رقم السبرنت:' : 'Sprint Number:'}
                          </span>
                          <span className="font-medium">#{activeSprint.sprintNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'المدة:' : 'Duration:'}
                          </span>
                          <span className="font-medium">
                            {activeSprint.duration} {locale === 'ar' ? 'يوم' : 'days'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'Scrum Master:' : 'Scrum Master:'}
                          </span>
                          <span className="font-medium">{activeSprint.scrumMaster}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'مالك المنتج:' : 'Product Owner:'}
                          </span>
                          <span className="font-medium">{activeSprint.productOwner}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        {locale === 'ar' ? 'مقاييس الأداء' : 'Performance Metrics'}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'السرعة المخططة:' : 'Planned Velocity:'}
                          </span>
                          <span className="font-medium">{activeSprint.plannedVelocity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'نقاط الالتزام:' : 'Committed Points:'}
                          </span>
                          <span className="font-medium">{activeSprint.committedPoints}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'نقاط التسليم:' : 'Delivered Points:'}
                          </span>
                          <span className="font-medium text-green-600">{activeSprint.deliveredPoints}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'ar' ? 'نقاط الترحيل:' : 'Carryover Points:'}
                          </span>
                          <span className="font-medium text-orange-600">{activeSprint.carryoverPoints}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <Activity className="w-4 h-4 mr-2" />
                      {locale === 'ar' ? 'عرض Burndown Chart' : 'View Burndown Chart'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ListChecks className="w-4 h-4 mr-2" />
                      {locale === 'ar' ? 'عرض القصص' : 'View Stories'}
                    </Button>
                    <Button variant="destructive" size="sm" className="ml-auto">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {locale === 'ar' ? 'إنهاء السبرنت' : 'Complete Sprint'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {locale === 'ar' 
                  ? 'لا يوجد سبرنت نشط حالياً. ابدأ سبرنت جديد من السبرنتات المخططة.'
                  : 'No active sprint currently. Start a new sprint from planned sprints.'}
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Planned Sprints Tab */}
        <TabsContent value="planned" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? '#' : '#'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الهدف' : 'Goal'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التواريخ' : 'Dates'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'النقاط' : 'Points'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plannedSprints.map((sprint) => (
                    <TableRow key={sprint.id}>
                      <TableCell className="font-medium">#{sprint.sprintNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium">{sprint.name}</div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{sprint.goal}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{sprint.startDate}</div>
                          <div className="text-muted-foreground">{sprint.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{sprint.totalStoryPoints} pts</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          {locale === 'ar' ? 'بدء' : 'Start'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Sprints Tab */}
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? '#' : '#'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الفترة' : 'Period'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'السرعة' : 'Velocity'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الإنجاز' : 'Achievement'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedSprints.map((sprint) => (
                    <TableRow key={sprint.id}>
                      <TableCell className="font-medium">#{sprint.sprintNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium">{sprint.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{sprint.goal}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {sprint.startDate} - {sprint.endDate}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{sprint.actualVelocity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(sprint.deliveredPoints / sprint.committedPoints) * 100} 
                            className="w-20"
                          />
                          <span className="text-sm font-medium">
                            {Math.round((sprint.deliveredPoints / sprint.committedPoints) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor('completed')}>
                          {getStatusIcon('completed')}
                          <span className="ml-1">{getStatusLabel('completed')}</span>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock Data
function mockSprints(locale: string): Sprint[] {
  return [
    {
      id: '1',
      sprintNumber: 3,
      name: locale === 'ar' ? 'السبرنت 3 - تطوير لوحة التحكم' : 'Sprint 3 - Dashboard Development',
      goal: locale === 'ar' 
        ? 'إكمال لوحة التحكم الرئيسية مع جميع المؤشرات'
        : 'Complete main dashboard with all KPIs',
      status: 'active',
      startDate: '2024-02-15',
      endDate: '2024-02-29',
      duration: 14,
      totalStories: 8,
      completedStories: 5,
      totalStoryPoints: 34,
      completedStoryPoints: 21,
      totalTasks: 42,
      completedTasks: 28,
      teamMembers: ['Ahmed', 'Sara', 'Mohammed', 'Fatima', 'Ali'],
      scrumMaster: locale === 'ar' ? 'أحمد محمود' : 'Ahmed Mahmoud',
      productOwner: locale === 'ar' ? 'سارة العلي' : 'Sara Al-Ali',
      plannedVelocity: 34,
      actualVelocity: 21,
      committedPoints: 34,
      deliveredPoints: 21,
      carryoverPoints: 5,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-28',
    },
    {
      id: '2',
      sprintNumber: 4,
      name: locale === 'ar' ? 'السبرنت 4 - التكامل مع API' : 'Sprint 4 - API Integration',
      goal: locale === 'ar' 
        ? 'تكامل جميع واجهات برمجة التطبيقات الخارجية'
        : 'Integrate all external APIs',
      status: 'planned',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      duration: 14,
      totalStories: 10,
      completedStories: 0,
      totalStoryPoints: 42,
      completedStoryPoints: 0,
      totalTasks: 0,
      completedTasks: 0,
      teamMembers: ['Ahmed', 'Sara', 'Mohammed', 'Fatima'],
      scrumMaster: locale === 'ar' ? 'أحمد محمود' : 'Ahmed Mahmoud',
      productOwner: locale === 'ar' ? 'سارة العلي' : 'Sara Al-Ali',
      plannedVelocity: 42,
      actualVelocity: 0,
      committedPoints: 42,
      deliveredPoints: 0,
      carryoverPoints: 0,
      createdAt: '2024-02-20',
      updatedAt: '2024-02-28',
    },
    {
      id: '3',
      sprintNumber: 2,
      name: locale === 'ar' ? 'السبرنت 2 - نظام المصادقة' : 'Sprint 2 - Authentication System',
      goal: locale === 'ar' 
        ? 'بناء نظام مصادقة كامل مع الأدوار'
        : 'Build complete authentication with roles',
      status: 'completed',
      startDate: '2024-02-01',
      endDate: '2024-02-14',
      duration: 14,
      totalStories: 12,
      completedStories: 11,
      totalStoryPoints: 38,
      completedStoryPoints: 35,
      totalTasks: 56,
      completedTasks: 54,
      teamMembers: ['Ahmed', 'Sara', 'Mohammed', 'Fatima', 'Ali', 'Laila'],
      scrumMaster: locale === 'ar' ? 'أحمد محمود' : 'Ahmed Mahmoud',
      productOwner: locale === 'ar' ? 'سارة العلي' : 'Sara Al-Ali',
      plannedVelocity: 38,
      actualVelocity: 35,
      committedPoints: 38,
      deliveredPoints: 35,
      carryoverPoints: 3,
      createdAt: '2024-01-20',
      updatedAt: '2024-02-14',
    },
    {
      id: '4',
      sprintNumber: 1,
      name: locale === 'ar' ? 'السبرنت 1 - الإعداد الأولي' : 'Sprint 1 - Initial Setup',
      goal: locale === 'ar' 
        ? 'إعداد البنية التحتية الأساسية للمشروع'
        : 'Setup basic project infrastructure',
      status: 'completed',
      startDate: '2024-01-18',
      endDate: '2024-01-31',
      duration: 14,
      totalStories: 6,
      completedStories: 6,
      totalStoryPoints: 21,
      completedStoryPoints: 21,
      totalTasks: 28,
      completedTasks: 28,
      teamMembers: ['Ahmed', 'Mohammed', 'Ali'],
      scrumMaster: locale === 'ar' ? 'أحمد محمود' : 'Ahmed Mahmoud',
      productOwner: locale === 'ar' ? 'سارة العلي' : 'Sara Al-Ali',
      plannedVelocity: 21,
      actualVelocity: 21,
      committedPoints: 21,
      deliveredPoints: 21,
      carryoverPoints: 0,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-31',
    },
  ];
}

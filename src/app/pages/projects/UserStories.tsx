import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';
import { 
  FileText, 
  Plus, 
  User, 
  Target, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Star,
  Filter,
  Search,
  Edit,
  Trash2,
  Eye,
  ListChecks,
  Zap,
  Users,
  TrendingUp,
  Clock,
  Flag,
} from 'lucide-react';

// Agile User Stories - قصص المستخدم حسب معايير Agile
type StoryPointScale = 1 | 2 | 3 | 5 | 8 | 13 | 21;
type Priority = 'low' | 'medium' | 'high' | 'critical';
type Status = 'backlog' | 'ready' | 'in-progress' | 'review' | 'done';

interface UserStory {
  id: string;
  storyId: string;
  
  // User Story Format: As a [user type], I want [goal] so that [benefit]
  userType: string;
  goal: string;
  benefit: string;
  
  // Details
  title: string;
  description: string;
  
  // Agile Metrics
  storyPoints: StoryPointScale;
  priority: Priority;
  status: Status;
  
  // Assignment
  assignedTo: string[];
  sprintId?: string;
  sprintName?: string;
  
  // Acceptance Criteria
  acceptanceCriteria: string[];
  
  // Tasks
  totalTasks: number;
  completedTasks: number;
  
  // Dependencies
  dependencies: string[];
  blockedBy: string[];
  
  // Dates
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export default function UserStories() {
  const { locale } = useLanguage();
  const [stories, setStories] = useState<UserStory[]>(mockUserStories(locale));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || story.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || story.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'review': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ready': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'backlog': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Status) => {
    const labels: Record<Status, { ar: string; en: string }> = {
      backlog: { ar: 'قائمة الانتظار', en: 'Backlog' },
      ready: { ar: 'جاهز', en: 'Ready' },
      'in-progress': { ar: 'قيد التنفيذ', en: 'In Progress' },
      review: { ar: 'المراجعة', en: 'Review' },
      done: { ar: 'مكتمل', en: 'Done' },
    };
    return locale === 'ar' ? labels[status].ar : labels[status].en;
  };

  const getPriorityLabel = (priority: Priority) => {
    const labels: Record<Priority, { ar: string; en: string }> = {
      critical: { ar: 'حرج', en: 'Critical' },
      high: { ar: 'مرتفع', en: 'High' },
      medium: { ar: 'متوسط', en: 'Medium' },
      low: { ar: 'منخفض', en: 'Low' },
    };
    return locale === 'ar' ? labels[priority].ar : labels[priority].en;
  };

  // Statistics
  const totalStoryPoints = stories.reduce((sum, s) => sum + s.storyPoints, 0);
  const completedStoryPoints = stories.filter(s => s.status === 'done').reduce((sum, s) => sum + s.storyPoints, 0);
  const inProgressStories = stories.filter(s => s.status === 'in-progress');
  const readyStories = stories.filter(s => s.status === 'ready');

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8 text-purple-600" />
            {locale === 'ar' ? 'قصص المستخدم' : 'User Stories'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'ar' 
              ? 'إدارة قصص المستخدم حسب منهجية Agile - As a [user], I want [goal] so that [benefit]'
              : 'Agile User Story Management - As a [user], I want [goal] so that [benefit]'}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {locale === 'ar' ? 'قصة جديدة' : 'New Story'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {locale === 'ar' ? 'إنشاء قصة مستخدم جديدة' : 'Create New User Story'}
                </DialogTitle>
                <DialogDescription>
                  {locale === 'ar' 
                    ? 'صِف القصة بصيغة: كـ [نوع المستخدم]، أريد [الهدف] حتى [الفائدة]'
                    : 'Describe the story as: As a [user type], I want [goal] so that [benefit]'}
                </DialogDescription>
              </DialogHeader>
              <div className="text-center py-8 text-muted-foreground">
                {locale === 'ar' ? 'نموذج الإنشاء قيد التطوير' : 'Creation form under development'}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'إجمالي القصص' : 'Total Stories'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stories.length}</div>
            <p className="text-xs text-muted-foreground">
              {totalStoryPoints} {locale === 'ar' ? 'نقطة' : 'points'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'قيد التنفيذ' : 'In Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressStories.length}</div>
            <p className="text-xs text-muted-foreground">
              {inProgressStories.reduce((sum, s) => sum + s.storyPoints, 0)} {locale === 'ar' ? 'نقطة' : 'points'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مكتمل' : 'Completed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stories.filter(s => s.status === 'done').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {completedStoryPoints} {locale === 'ar' ? 'نقطة' : 'points'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'الإنجاز' : 'Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((completedStoryPoints / totalStoryPoints) * 100)}%
            </div>
            <Progress value={(completedStoryPoints / totalStoryPoints) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={locale === 'ar' ? 'البحث عن القصص...' : 'Search stories...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
              <option value="backlog">{getStatusLabel('backlog')}</option>
              <option value="ready">{getStatusLabel('ready')}</option>
              <option value="in-progress">{getStatusLabel('in-progress')}</option>
              <option value="review">{getStatusLabel('review')}</option>
              <option value="done">{getStatusLabel('done')}</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">{locale === 'ar' ? 'جميع الأولويات' : 'All Priorities'}</option>
              <option value="critical">{getPriorityLabel('critical')}</option>
              <option value="high">{getPriorityLabel('high')}</option>
              <option value="medium">{getPriorityLabel('medium')}</option>
              <option value="low">{getPriorityLabel('low')}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* User Stories List */}
      <div className="space-y-4">
        {filteredStories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono">
                      {story.storyId}
                    </Badge>
                    <Badge className={getPriorityColor(story.priority)}>
                      {getPriorityLabel(story.priority)}
                    </Badge>
                    <Badge className={getStatusColor(story.status)}>
                      {getStatusLabel(story.status)}
                    </Badge>
                    {story.sprintName && (
                      <Badge variant="secondary" className="bg-blue-100">
                        <Zap className="w-3 h-3 mr-1" />
                        {story.sprintName}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mb-2">{story.title}</CardTitle>
                  <CardDescription className="text-base">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-3 rounded-lg">
                      <div className="font-semibold text-purple-900 dark:text-purple-100">
                        <User className="w-4 h-4 inline mr-1" />
                        {locale === 'ar' ? 'كـ ' : 'As a '}
                        <span className="text-purple-600">{story.userType}</span>
                        {locale === 'ar' ? '، أريد ' : ', I want '}
                        <Target className="w-4 h-4 inline mr-1" />
                        <span className="text-blue-600">{story.goal}</span>
                        {locale === 'ar' ? ' حتى ' : ' so that '}
                        <Star className="w-4 h-4 inline mr-1" />
                        <span className="text-green-600">{story.benefit}</span>
                      </div>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{story.storyPoints}</div>
                    <div className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'نقاط' : 'points'}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <p className="text-sm text-muted-foreground">{story.description}</p>
                </div>

                {/* Acceptance Criteria */}
                {story.acceptanceCriteria.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <ListChecks className="w-4 h-4" />
                      {locale === 'ar' ? 'معايير القبول' : 'Acceptance Criteria'}
                    </h4>
                    <ul className="space-y-1">
                      {story.acceptanceCriteria.map((criteria, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress & Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {locale === 'ar' ? 'تقدم المهام' : 'Tasks Progress'}
                      </span>
                      <span className="font-medium">
                        {story.completedTasks}/{story.totalTasks}
                      </span>
                    </div>
                    <Progress value={(story.completedTasks / story.totalTasks) * 100} />
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {locale === 'ar' ? 'المعينون' : 'Assigned To'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        {story.assignedTo.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      {locale === 'ar' ? 'عرض' : 'View'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      {locale === 'ar' ? 'تعديل' : 'Edit'}
                    </Button>
                  </div>
                </div>

                {/* Dependencies & Blockers */}
                {(story.dependencies.length > 0 || story.blockedBy.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                    {story.dependencies.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                          <Flag className="w-4 h-4 text-orange-500" />
                          {locale === 'ar' ? 'يعتمد على' : 'Dependencies'}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {story.dependencies.map((dep, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {story.blockedBy.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          {locale === 'ar' ? 'محظور بواسطة' : 'Blocked By'}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {story.blockedBy.map((blocker, idx) => (
                            <Badge key={idx} variant="destructive" className="text-xs">
                              {blocker}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Mock Data
function mockUserStories(locale: string): UserStory[] {
  return [
    {
      id: '1',
      storyId: 'US-001',
      userType: locale === 'ar' ? 'مدير المشروع' : 'Project Manager',
      goal: locale === 'ar' ? 'عرض لوحة تحكم شاملة' : 'view a comprehensive dashboard',
      benefit: locale === 'ar' ? 'أتمكن من متابعة تقدم جميع المشاريع بسرعة' : 'I can quickly monitor all projects progress',
      title: locale === 'ar' ? 'لوحة تحكم المشاريع' : 'Projects Dashboard',
      description: locale === 'ar' 
        ? 'لوحة تحكم تعرض ملخص جميع المشاريع النشطة مع المؤشرات الرئيسية'
        : 'Dashboard displaying summary of all active projects with key metrics',
      storyPoints: 8,
      priority: 'high',
      status: 'in-progress',
      assignedTo: [locale === 'ar' ? 'أحمد' : 'Ahmed', locale === 'ar' ? 'سارة' : 'Sara'],
      sprintId: '3',
      sprintName: locale === 'ar' ? 'السبرنت 3' : 'Sprint 3',
      acceptanceCriteria: [
        locale === 'ar' 
          ? 'عرض عدد المشاريع النشطة والمكتملة'
          : 'Display count of active and completed projects',
        locale === 'ar' 
          ? 'رسم بياني لتوزيع المشاريع حسب الحالة'
          : 'Chart showing project distribution by status',
        locale === 'ar' 
          ? 'قائمة بالمشاريع المتأخرة'
          : 'List of delayed projects',
      ],
      totalTasks: 12,
      completedTasks: 7,
      dependencies: [],
      blockedBy: [],
      createdAt: '2024-02-01',
      updatedAt: '2024-02-25',
    },
    {
      id: '2',
      storyId: 'US-002',
      userType: locale === 'ar' ? 'عضو الفريق' : 'Team Member',
      goal: locale === 'ar' ? 'تسجيل الوقت المستغرق في المهام' : 'log time spent on tasks',
      benefit: locale === 'ar' ? 'يتم حساب ساعات العمل بدقة' : 'work hours are accurately tracked',
      title: locale === 'ar' ? 'تسجيل الوقت' : 'Time Logging',
      description: locale === 'ar' 
        ? 'نظام بسيط لتسجيل الوقت المستغرق على كل مهمة'
        : 'Simple system to log time spent on each task',
      storyPoints: 5,
      priority: 'medium',
      status: 'ready',
      assignedTo: [locale === 'ar' ? 'محمد' : 'Mohammed'],
      sprintId: '3',
      sprintName: locale === 'ar' ? 'السبرنت 3' : 'Sprint 3',
      acceptanceCriteria: [
        locale === 'ar' 
          ? 'إمكانية بدء وإيقاف مؤقت الوقت'
          : 'Ability to start and pause time timer',
        locale === 'ar' 
          ? 'عرض إجمالي الوقت المسجل لكل مهمة'
          : 'Display total logged time per task',
        locale === 'ar' 
          ? 'تصدير تقرير الوقت'
          : 'Export time report',
      ],
      totalTasks: 8,
      completedTasks: 0,
      dependencies: ['US-001'],
      blockedBy: [],
      createdAt: '2024-02-05',
      updatedAt: '2024-02-20',
    },
    {
      id: '3',
      storyId: 'US-003',
      userType: locale === 'ar' ? 'مدير الموارد البشرية' : 'HR Manager',
      goal: locale === 'ar' ? 'حساب نهاية الخدمة تلقائياً' : 'calculate end of service automatically',
      benefit: locale === 'ar' ? 'توفير الوقت وتجنب الأخطاء الحسابية' : 'save time and avoid calculation errors',
      title: locale === 'ar' ? 'حساب نهاية الخدمة' : 'End of Service Calculator',
      description: locale === 'ar' 
        ? 'حساب تلقائي لمكافأة نهاية الخدمة حسب قوانين الدول المختلفة'
        : 'Automatic calculation of end of service benefits based on different country laws',
      storyPoints: 13,
      priority: 'critical',
      status: 'done',
      assignedTo: [locale === 'ar' ? 'فاطمة' : 'Fatima', locale === 'ar' ? 'علي' : 'Ali'],
      sprintId: '2',
      sprintName: locale === 'ar' ? 'السبرنت 2' : 'Sprint 2',
      acceptanceCriteria: [
        locale === 'ar' 
          ? 'دعم قوانين 5 دول (العراق، السعودية، الإمارات، مصر، الأردن)'
          : 'Support laws of 5 countries (Iraq, Saudi, UAE, Egypt, Jordan)',
        locale === 'ar' 
          ? 'احتساب المدة الخدمية بدقة'
          : 'Accurately calculate service duration',
        locale === 'ar' 
          ? 'عرض تفصيل الحساب'
          : 'Display calculation breakdown',
      ],
      totalTasks: 15,
      completedTasks: 15,
      dependencies: [],
      blockedBy: [],
      createdAt: '2024-01-15',
      updatedAt: '2024-02-14',
      completedAt: '2024-02-14',
    },
    {
      id: '4',
      storyId: 'US-004',
      userType: locale === 'ar' ? 'مستخدم النظام' : 'System User',
      goal: locale === 'ar' ? 'التبديل بين العربية والإنجليزية' : 'switch between Arabic and English',
      benefit: locale === 'ar' ? 'أستخدم النظام باللغة المفضلة' : 'use the system in preferred language',
      title: locale === 'ar' ? 'دعم متعدد اللغات' : 'Multi-language Support',
      description: locale === 'ar' 
        ? 'إمكانية التبديل الفوري بين العربية والإنجليزية مع دعم RTL/LTR'
        : 'Instant switching between Arabic and English with RTL/LTR support',
      storyPoints: 8,
      priority: 'high',
      status: 'done',
      assignedTo: [locale === 'ar' ? 'أحمد' : 'Ahmed'],
      sprintId: '1',
      sprintName: locale === 'ar' ? 'السبرنت 1' : 'Sprint 1',
      acceptanceCriteria: [
        locale === 'ar' 
          ? 'زر تبديل اللغة في الترويسة'
          : 'Language toggle button in header',
        locale === 'ar' 
          ? 'جميع النصوص مترجمة'
          : 'All texts translated',
        locale === 'ar' 
          ? 'اتجاه النص صحيح (RTL/LTR)'
          : 'Correct text direction (RTL/LTR)',
      ],
      totalTasks: 10,
      completedTasks: 10,
      dependencies: [],
      blockedBy: [],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-31',
      completedAt: '2024-01-31',
    },
    {
      id: '5',
      storyId: 'US-005',
      userType: locale === 'ar' ? 'محاسب' : 'Accountant',
      goal: locale === 'ar' ? 'إنشاء قيود يومية تلقائية' : 'create automatic journal entries',
      benefit: locale === 'ar' ? 'تقليل الأخطاء اليدوية وتوفير الوقت' : 'reduce manual errors and save time',
      title: locale === 'ar' ? 'القيود التلقائية' : 'Auto Journal Entries',
      description: locale === 'ar' 
        ? 'إنشاء قيود يومية تلقائياً عند الفواتير والمدفوعات'
        : 'Automatically create journal entries for invoices and payments',
      storyPoints: 13,
      priority: 'high',
      status: 'backlog',
      assignedTo: [],
      acceptanceCriteria: [
        locale === 'ar' 
          ? 'قيد تلقائي عند إنشاء فاتورة مبيعات'
          : 'Auto entry on sales invoice creation',
        locale === 'ar' 
          ? 'قيد تلقائي عند إنشاء فاتورة مشتريات'
          : 'Auto entry on purchase invoice creation',
        locale === 'ar' 
          ? 'إمكانية مراجعة القيود قبل الترحيل'
          : 'Ability to review entries before posting',
      ],
      totalTasks: 0,
      completedTasks: 0,
      dependencies: [],
      blockedBy: [],
      createdAt: '2024-02-10',
      updatedAt: '2024-02-10',
    },
    {
      id: '6',
      storyId: 'US-006',
      userType: locale === 'ar' ? 'مدير المبيعات' : 'Sales Manager',
      goal: locale === 'ar' ? 'تتبع أهداف المبيعات' : 'track sales targets',
      benefit: locale === 'ar' ? 'أقيّم أداء فريق المبيعات' : 'evaluate sales team performance',
      title: locale === 'ar' ? 'أهداف المبيعات' : 'Sales Targets',
      description: locale === 'ar' 
        ? 'نظام لتحديد وتتبع أهداف المبيعات الشهرية والسنوية'
        : 'System to set and track monthly and annual sales targets',
      storyPoints: 5,
      priority: 'medium',
      status: 'review',
      assignedTo: [locale === 'ar' ? 'سارة' : 'Sara'],
      sprintId: '3',
      sprintName: locale === 'ar' ? 'السبرنت 3' : 'Sprint 3',
      acceptanceCriteria: [
        locale === 'ar' 
          ? 'تحديد أهداف لكل مندوب مبيعات'
          : 'Set targets for each sales rep',
        locale === 'ar' 
          ? 'مقارنة الأداء الفعلي بالمستهدف'
          : 'Compare actual vs target performance',
        locale === 'ar' 
          ? 'تقارير الأداء'
          : 'Performance reports',
      ],
      totalTasks: 6,
      completedTasks: 6,
      dependencies: [],
      blockedBy: [],
      createdAt: '2024-02-12',
      updatedAt: '2024-02-27',
    },
  ];
}

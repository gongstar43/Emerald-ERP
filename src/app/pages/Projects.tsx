import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Calendar, DollarSign, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  team: string[];
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
}

export default function Projects() {
  const { t, locale } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'on-hold': 'bg-gray-100 text-gray-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || colors.planning;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      planning: locale === 'ar' ? 'التخطيط' : 'Planning',
      'in-progress': locale === 'ar' ? 'قيد التنفيذ' : 'In Progress',
      'on-hold': locale === 'ar' ? 'معلق' : 'On Hold',
      completed: locale === 'ar' ? 'مكتمل' : 'Completed',
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'on-hold':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const activeProjects = projects.filter((p) => p.status === 'in-progress').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;

  const handleSave = () => {
    if (!formData.name || !formData.budget) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    toast.success(t('savedSuccessfully'));
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('projects')}</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'إجمالي الميزانية' : 'Total Budget'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">
              {totalBudget.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المصروف' : 'Total Spent'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {totalSpent.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{activeProjects}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المكتملة' : 'Completed'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{completedProjects}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
                      {getStatusIcon(project.status)}
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t('progress')}</span>
                  <span className="text-sm font-bold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{t('budget')}</span>
                  </div>
                  <p className="font-bold">{project.budget.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}</p>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'مصروف' : 'Spent'}: {project.spent.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{locale === 'ar' ? 'المدة' : 'Duration'}</span>
                  </div>
                  <p className="font-semibold text-xs">
                    {new Date(project.startDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'إلى' : 'to'}{' '}
                    {new Date(project.endDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{locale === 'ar' ? 'الفريق' : 'Team'}</span>
                  </div>
                  <p className="font-bold">{project.team.length} {locale === 'ar' ? 'أعضاء' : 'members'}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{t('tasks')}</span>
                  </div>
                  <p className="font-bold">
                    {project.tasks.completed}/{project.tasks.total}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar' ? 'قيد التنفيذ' : 'In progress'}: {project.tasks.inProgress}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm">
                  {t('view')}
                </Button>
                <Button variant="outline" size="sm">
                  {locale === 'ar' ? 'المهام' : 'Tasks'}
                </Button>
                <Button variant="outline" size="sm">
                  {locale === 'ar' ? 'الفريق' : 'Team'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('addNew')} - {t('project')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'اسم المشروع' : 'Project Name'} *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('description')} *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('startDate')} *</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('endDate')} *</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('budget')} *</Label>
              <Input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSave}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Download,
  Upload,
  UserPlus,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Target,
  BarChart3,
  Mail,
  Phone,
  Building2,
  Shield,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Activity,
  Eye,
  Briefcase,
} from 'lucide-react';

// PMBOK Stakeholder Management - إدارة أصحاب المصلحة حسب معايير PMBOK
interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  
  // Classification
  type: 'internal' | 'external';
  category: 'sponsor' | 'customer' | 'team' | 'supplier' | 'government' | 'community' | 'other';
  
  // Power/Interest Analysis
  power: 'low' | 'medium' | 'high';
  interest: 'low' | 'medium' | 'high';
  influence: 'low' | 'medium' | 'high';
  
  // Engagement Strategy
  engagementLevel: 'unaware' | 'resistant' | 'neutral' | 'supportive' | 'leading';
  desiredEngagement: 'unaware' | 'resistant' | 'neutral' | 'supportive' | 'leading';
  engagementStrategy: string;
  
  // Communication
  communicationMethod: string[];
  communicationFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'as-needed';
  
  // Requirements & Expectations
  requirements: string[];
  expectations: string[];
  
  // Status
  status: 'active' | 'inactive';
  satisfaction: number; // 0-100
  
  // Notes
  notes: string;
  
  createdAt: string;
  updatedAt: string;
}

export default function Stakeholders() {
  const { locale } = useLanguage();
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(mockStakeholders(locale));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  const filteredStakeholders = stakeholders.filter(sh => {
    const matchesSearch = sh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sh.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sh.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || sh.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Power/Interest Matrix Calculation
  const getMatrixPosition = (power: string, interest: string) => {
    if (power === 'high' && interest === 'high') return 'manage-closely';
    if (power === 'high' && interest === 'low') return 'keep-satisfied';
    if (power === 'low' && interest === 'high') return 'keep-informed';
    return 'monitor';
  };

  const getPowerColor = (power: string) => {
    switch (power) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'leading': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'supportive': return 'bg-green-100 text-green-700 border-green-200';
      case 'neutral': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'resistant': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'unaware': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 80) return 'text-green-600';
    if (satisfaction >= 60) return 'text-yellow-600';
    if (satisfaction >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'أصحاب المصلحة' : 'Stakeholders'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'ar' 
              ? 'إدارة أصحاب المصلحة حسب معايير PMBOK - تحليل القوة والاهتمام واستراتيجيات المشاركة'
              : 'PMBOK Stakeholder Management - Power/Interest Analysis & Engagement Strategies'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                {locale === 'ar' ? 'إضافة صاحب مصلحة' : 'Add Stakeholder'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {locale === 'ar' ? 'إضافة صاحب مصلحة جديد' : 'Add New Stakeholder'}
                </DialogTitle>
                <DialogDescription>
                  {locale === 'ar' 
                    ? 'أدخل معلومات صاحب المصلحة وحدد مستوى القوة والاهتمام واستراتيجية المشاركة'
                    : 'Enter stakeholder information and define power, interest levels, and engagement strategy'}
                </DialogDescription>
              </DialogHeader>
              {/* Form content would go here */}
              <div className="text-center py-8 text-muted-foreground">
                {locale === 'ar' ? 'نموذج الإضافة قيد التطوير' : 'Add form under development'}
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
              {locale === 'ar' ? 'إجمالي أصحاب المصلحة' : 'Total Stakeholders'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakeholders.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? `${stakeholders.filter(s => s.status === 'active').length} نشط` : `${stakeholders.filter(s => s.status === 'active').length} Active`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مرتفع القوة والاهتمام' : 'High Power & Interest'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stakeholders.filter(s => s.power === 'high' && s.interest === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'يتطلب إدارة دقيقة' : 'Requires Close Management'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'متوسط الرضا' : 'Avg. Satisfaction'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSatisfactionColor(
              stakeholders.reduce((sum, s) => sum + s.satisfaction, 0) / stakeholders.length
            )}`}>
              {Math.round(stakeholders.reduce((sum, s) => sum + s.satisfaction, 0) / stakeholders.length)}%
            </div>
            <Progress 
              value={stakeholders.reduce((sum, s) => sum + s.satisfaction, 0) / stakeholders.length} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'يحتاج متابعة' : 'Needs Attention'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stakeholders.filter(s => s.engagementLevel !== s.desiredEngagement).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'فجوة في المشاركة' : 'Engagement Gap'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list">
            <Users className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'القائمة' : 'List'}
          </TabsTrigger>
          <TabsTrigger value="matrix">
            <BarChart3 className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'مصفوفة القوة/الاهتمام' : 'Power/Interest Matrix'}
          </TabsTrigger>
          <TabsTrigger value="engagement">
            <Activity className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'المشاركة' : 'Engagement'}
          </TabsTrigger>
          <TabsTrigger value="communication">
            <MessageSquare className="w-4 h-4 mr-2" />
            {locale === 'ar' ? 'الاتصالات' : 'Communications'}
          </TabsTrigger>
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list" className="space-y-4">
          {/* Search & Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={locale === 'ar' ? 'البحث عن أصحاب المصلحة...' : 'Search stakeholders...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={locale === 'ar' ? 'الكل' : 'All'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                    <SelectItem value="internal">{locale === 'ar' ? 'داخلي' : 'Internal'}</SelectItem>
                    <SelectItem value="external">{locale === 'ar' ? 'خارجي' : 'External'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stakeholders Table */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المنظمة' : 'Organization'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الدور' : 'Role'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'القوة' : 'Power'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الاهتمام' : 'Interest'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المشاركة' : 'Engagement'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الرضا' : 'Satisfaction'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStakeholders.map((stakeholder) => (
                    <TableRow key={stakeholder.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <div>{stakeholder.name}</div>
                            <div className="text-xs text-muted-foreground">{stakeholder.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{stakeholder.organization}</TableCell>
                      <TableCell>{stakeholder.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {stakeholder.type === 'internal' 
                            ? (locale === 'ar' ? 'داخلي' : 'Internal')
                            : (locale === 'ar' ? 'خارجي' : 'External')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPowerColor(stakeholder.power)}>
                          {stakeholder.power === 'high' ? (locale === 'ar' ? 'مرتفع' : 'High') :
                           stakeholder.power === 'medium' ? (locale === 'ar' ? 'متوسط' : 'Medium') :
                           (locale === 'ar' ? 'منخفض' : 'Low')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPowerColor(stakeholder.interest)}>
                          {stakeholder.interest === 'high' ? (locale === 'ar' ? 'مرتفع' : 'High') :
                           stakeholder.interest === 'medium' ? (locale === 'ar' ? 'متوسط' : 'Medium') :
                           (locale === 'ar' ? 'منخفض' : 'Low')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEngagementColor(stakeholder.engagementLevel)}>
                          {getEngagementLabel(stakeholder.engagementLevel, locale)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getSatisfactionColor(stakeholder.satisfaction)}`}>
                            {stakeholder.satisfaction}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Power/Interest Matrix Tab */}
        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale === 'ar' ? 'مصفوفة القوة والاهتمام (Power/Interest Matrix)' : 'Power/Interest Matrix'}
              </CardTitle>
              <CardDescription>
                {locale === 'ar' 
                  ? 'تحليل أصحاب المصلحة حسب مستوى القوة والاهتمام - معايير PMBOK'
                  : 'Stakeholder analysis by power and interest levels - PMBOK Standards'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                {/* High Power, High Interest - Manage Closely */}
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-700 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {locale === 'ar' ? 'إدارة دقيقة' : 'Manage Closely'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {locale === 'ar' ? 'قوة مرتفعة / اهتمام مرتفع' : 'High Power / High Interest'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {stakeholders.filter(s => s.power === 'high' && s.interest === 'high').map(sh => (
                      <div key={sh.id} className="p-2 bg-white rounded border border-red-200 text-sm">
                        <div className="font-medium">{sh.name}</div>
                        <div className="text-xs text-muted-foreground">{sh.role}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Low Power, High Interest - Keep Informed */}
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-blue-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {locale === 'ar' ? 'إبقاء على اطلاع' : 'Keep Informed'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {locale === 'ar' ? 'قوة منخفضة / اهتمام مرتفع' : 'Low Power / High Interest'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {stakeholders.filter(s => s.power === 'low' && s.interest === 'high').map(sh => (
                      <div key={sh.id} className="p-2 bg-white rounded border border-blue-200 text-sm">
                        <div className="font-medium">{sh.name}</div>
                        <div className="text-xs text-muted-foreground">{sh.role}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* High Power, Low Interest - Keep Satisfied */}
                <Card className="border-2 border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-yellow-700 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {locale === 'ar' ? 'إبقاء راضياً' : 'Keep Satisfied'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {locale === 'ar' ? 'قوة مرتفعة / اهتمام منخفض' : 'High Power / Low Interest'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {stakeholders.filter(s => s.power === 'high' && s.interest === 'low').map(sh => (
                      <div key={sh.id} className="p-2 bg-white rounded border border-yellow-200 text-sm">
                        <div className="font-medium">{sh.name}</div>
                        <div className="text-xs text-muted-foreground">{sh.role}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Low Power, Low Interest - Monitor */}
                <Card className="border-2 border-gray-200 bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-700 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {locale === 'ar' ? 'مراقبة' : 'Monitor'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {locale === 'ar' ? 'قوة منخفضة / اهتمام منخفض' : 'Low Power / Low Interest'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {stakeholders.filter(s => s.power === 'low' && s.interest === 'low').map(sh => (
                      <div key={sh.id} className="p-2 bg-white rounded border border-gray-200 text-sm">
                        <div className="font-medium">{sh.name}</div>
                        <div className="text-xs text-muted-foreground">{sh.role}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale === 'ar' ? 'مستويات المشاركة' : 'Engagement Levels'}
              </CardTitle>
              <CardDescription>
                {locale === 'ar' 
                  ? 'تتبع وتحسين مستويات مشاركة أصحاب المصلحة'
                  : 'Track and improve stakeholder engagement levels'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStakeholders.map((stakeholder) => (
                  <Card key={stakeholder.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{stakeholder.name}</h3>
                            <p className="text-sm text-muted-foreground">{stakeholder.role} - {stakeholder.organization}</p>
                          </div>
                        </div>
                        <Badge className={getEngagementColor(stakeholder.engagementLevel)}>
                          {getEngagementLabel(stakeholder.engagementLevel, locale)}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              {locale === 'ar' ? 'المستوى الحالي' : 'Current Level'}
                            </span>
                            <span className="font-medium">
                              {getEngagementLabel(stakeholder.engagementLevel, locale)}
                            </span>
                          </div>
                          <Progress value={getEngagementValue(stakeholder.engagementLevel)} />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              {locale === 'ar' ? 'المستوى المطلوب' : 'Desired Level'}
                            </span>
                            <span className="font-medium">
                              {getEngagementLabel(stakeholder.desiredEngagement, locale)}
                            </span>
                          </div>
                          <Progress value={getEngagementValue(stakeholder.desiredEngagement)} className="bg-emerald-100" />
                        </div>

                        {stakeholder.engagementLevel !== stakeholder.desiredEngagement && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>{locale === 'ar' ? 'استراتيجية المشاركة:' : 'Engagement Strategy:'}</strong>
                              <p className="mt-1 text-sm">{stakeholder.engagementStrategy}</p>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale === 'ar' ? 'خطة الاتصالات' : 'Communication Plan'}
              </CardTitle>
              <CardDescription>
                {locale === 'ar' 
                  ? 'تحديد طرق وتكرار الاتصال مع أصحاب المصلحة'
                  : 'Define communication methods and frequency with stakeholders'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'صاحب المصلحة' : 'Stakeholder'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'طرق الاتصال' : 'Methods'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التكرار' : 'Frequency'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'آخر اتصال' : 'Last Contact'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStakeholders.map((stakeholder) => (
                    <TableRow key={stakeholder.id}>
                      <TableCell>
                        <div className="font-medium">{stakeholder.name}</div>
                        <div className="text-xs text-muted-foreground">{stakeholder.organization}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {stakeholder.communicationMethod.map((method, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {method === 'email' && <Mail className="w-3 h-3 mr-1" />}
                              {method === 'phone' && <Phone className="w-3 h-3 mr-1" />}
                              {method === 'meeting' && <Users className="w-3 h-3 mr-1" />}
                              {method}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getFrequencyLabel(stakeholder.communicationFrequency, locale)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {locale === 'ar' ? 'منذ 3 أيام' : '3 days ago'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {locale === 'ar' ? 'اتصال' : 'Contact'}
                        </Button>
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

// Helper Functions
function getEngagementLabel(level: string, locale: string) {
  const labels: Record<string, { ar: string; en: string }> = {
    leading: { ar: 'قائد', en: 'Leading' },
    supportive: { ar: 'داعم', en: 'Supportive' },
    neutral: { ar: 'محايد', en: 'Neutral' },
    resistant: { ar: 'مقاوم', en: 'Resistant' },
    unaware: { ar: 'غير واعي', en: 'Unaware' },
  };
  return locale === 'ar' ? labels[level]?.ar : labels[level]?.en;
}

function getEngagementValue(level: string) {
  const values: Record<string, number> = {
    unaware: 0,
    resistant: 25,
    neutral: 50,
    supportive: 75,
    leading: 100,
  };
  return values[level] || 0;
}

function getFrequencyLabel(frequency: string, locale: string) {
  const labels: Record<string, { ar: string; en: string }> = {
    daily: { ar: 'يومي', en: 'Daily' },
    weekly: { ar: 'أسبوعي', en: 'Weekly' },
    biweekly: { ar: 'كل أسبوعين', en: 'Biweekly' },
    monthly: { ar: 'شهري', en: 'Monthly' },
    quarterly: { ar: 'ربع سنوي', en: 'Quarterly' },
    'as-needed': { ar: 'عند الحاجة', en: 'As Needed' },
  };
  return locale === 'ar' ? labels[frequency]?.ar : labels[frequency]?.en;
}

// Mock Data
function mockStakeholders(locale: string): Stakeholder[] {
  return [
    {
      id: '1',
      name: locale === 'ar' ? 'د. أحمد محمود' : 'Dr. Ahmed Mahmoud',
      role: locale === 'ar' ? 'الراعي التنفيذي' : 'Executive Sponsor',
      organization: locale === 'ar' ? 'الإدارة العليا' : 'Executive Management',
      email: 'ahmed.mahmoud@company.com',
      phone: '+964 770 123 4567',
      type: 'internal',
      category: 'sponsor',
      power: 'high',
      interest: 'high',
      influence: 'high',
      engagementLevel: 'supportive',
      desiredEngagement: 'leading',
      engagementStrategy: locale === 'ar' 
        ? 'تقارير أسبوعية، اجتماعات شهرية، إشراك في القرارات الاستراتيجية'
        : 'Weekly reports, monthly meetings, involvement in strategic decisions',
      communicationMethod: ['email', 'meeting', 'phone'],
      communicationFrequency: 'weekly',
      requirements: [locale === 'ar' ? 'تقارير دورية عن التقدم' : 'Regular progress reports'],
      expectations: [locale === 'ar' ? 'إنجاز المشروع في الموعد' : 'Project delivery on time'],
      status: 'active',
      satisfaction: 85,
      notes: '',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-28',
    },
    {
      id: '2',
      name: locale === 'ar' ? 'سارة العلي' : 'Sara Al-Ali',
      role: locale === 'ar' ? 'ممثل العميل' : 'Client Representative',
      organization: locale === 'ar' ? 'شركة العميل' : 'Client Company',
      email: 'sara.alali@client.com',
      phone: '+964 771 234 5678',
      type: 'external',
      category: 'customer',
      power: 'high',
      interest: 'high',
      influence: 'high',
      engagementLevel: 'neutral',
      desiredEngagement: 'supportive',
      engagementStrategy: locale === 'ar' 
        ? 'عروض تقديمية منتظمة، جلسات مراجعة، إشراك في الاختبارات'
        : 'Regular presentations, review sessions, testing involvement',
      communicationMethod: ['email', 'meeting'],
      communicationFrequency: 'biweekly',
      requirements: [locale === 'ar' ? 'جودة عالية' : 'High quality'],
      expectations: [locale === 'ar' ? 'تسليم حسب المواصفات' : 'Delivery as per specs'],
      status: 'active',
      satisfaction: 70,
      notes: '',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-28',
    },
    {
      id: '3',
      name: locale === 'ar' ? 'م. خالد حسن' : 'Eng. Khaled Hassan',
      role: locale === 'ar' ? 'مدير فني' : 'Technical Manager',
      organization: locale === 'ar' ? 'قسم تقنية المعلومات' : 'IT Department',
      email: 'khaled.hassan@company.com',
      phone: '+964 772 345 6789',
      type: 'internal',
      category: 'team',
      power: 'medium',
      interest: 'high',
      influence: 'medium',
      engagementLevel: 'supportive',
      desiredEngagement: 'leading',
      engagementStrategy: locale === 'ar' 
        ? 'اجتماعات يومية قصيرة، تحديثات فورية، مشاركة في التصميم'
        : 'Daily standups, instant updates, design participation',
      communicationMethod: ['email', 'meeting', 'chat'],
      communicationFrequency: 'daily',
      requirements: [locale === 'ar' ? 'معايير تقنية واضحة' : 'Clear technical standards'],
      expectations: [locale === 'ar' ? 'حلول تقنية مبتكرة' : 'Innovative technical solutions'],
      status: 'active',
      satisfaction: 90,
      notes: '',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-28',
    },
    {
      id: '4',
      name: locale === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed',
      role: locale === 'ar' ? 'مدير الجودة' : 'Quality Manager',
      organization: locale === 'ar' ? 'قسم ضمان الجودة' : 'Quality Assurance',
      email: 'fatima.ahmed@company.com',
      phone: '+964 773 456 7890',
      type: 'internal',
      category: 'other',
      power: 'medium',
      interest: 'high',
      influence: 'medium',
      engagementLevel: 'leading',
      desiredEngagement: 'leading',
      engagementStrategy: locale === 'ar' 
        ? 'تقارير جودة أسبوعية، مراجعات دورية، اختبارات مستمرة'
        : 'Weekly quality reports, regular reviews, continuous testing',
      communicationMethod: ['email', 'meeting'],
      communicationFrequency: 'weekly',
      requirements: [locale === 'ar' ? 'اختبارات شاملة' : 'Comprehensive testing'],
      expectations: [locale === 'ar' ? 'منتج خالي من العيوب' : 'Defect-free product'],
      status: 'active',
      satisfaction: 95,
      notes: '',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-28',
    },
    {
      id: '5',
      name: locale === 'ar' ? 'محمد علي' : 'Mohammed Ali',
      role: locale === 'ar' ? 'مدير المشتريات' : 'Procurement Manager',
      organization: locale === 'ar' ? 'قسم المشتريات' : 'Procurement Dept',
      email: 'mohammed.ali@company.com',
      phone: '+964 774 567 8901',
      type: 'internal',
      category: 'supplier',
      power: 'low',
      interest: 'medium',
      influence: 'low',
      engagementLevel: 'neutral',
      desiredEngagement: 'neutral',
      engagementStrategy: locale === 'ar' 
        ? 'تحديثات شهرية، مشاركة في قرارات الشراء'
        : 'Monthly updates, involvement in purchasing decisions',
      communicationMethod: ['email'],
      communicationFrequency: 'monthly',
      requirements: [locale === 'ar' ? 'معلومات المتطلبات المسبقة' : 'Advance requirements info'],
      expectations: [locale === 'ar' ? 'طلبات واضحة' : 'Clear requests'],
      status: 'active',
      satisfaction: 75,
      notes: '',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-28',
    },
    {
      id: '6',
      name: locale === 'ar' ? 'ليلى محمود' : 'Laila Mahmoud',
      role: locale === 'ar' ? 'مدير الموارد البشرية' : 'HR Manager',
      organization: locale === 'ar' ? 'الموارد البشرية' : 'Human Resources',
      email: 'laila.mahmoud@company.com',
      phone: '+964 775 678 9012',
      type: 'internal',
      category: 'other',
      power: 'low',
      interest: 'low',
      influence: 'low',
      engagementLevel: 'unaware',
      desiredEngagement: 'neutral',
      engagementStrategy: locale === 'ar' 
        ? 'تقارير ربع سنوية، إشعارات عند الحاجة للموارد'
        : 'Quarterly reports, notifications when resources needed',
      communicationMethod: ['email'],
      communicationFrequency: 'quarterly',
      requirements: [locale === 'ar' ? 'إشعار مسبق لاحتياجات الموظفين' : 'Advance notice for staffing needs'],
      expectations: [locale === 'ar' ? 'إدارة جيدة للفريق' : 'Good team management'],
      status: 'active',
      satisfaction: 60,
      notes: '',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-28',
    },
  ];
}

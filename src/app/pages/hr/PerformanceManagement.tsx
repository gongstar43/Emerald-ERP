import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
  Star,
  TrendingUp,
  Target,
  Award,
  Users,
  FileText,
  Calendar,
  Eye,
  BarChart3,
} from 'lucide-react';
import { toast } from 'sonner';

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  reviewPeriod: string;
  reviewDate: string;
  reviewType: 'annual' | 'mid_year' | 'probation' | 'project';
  overallRating: number;
  status: 'draft' | 'pending' | 'completed' | 'acknowledged';
  categories: ReviewCategory[];
  goals: Goal[];
  strengths: string[];
  improvements: string[];
  comments: string;
}

interface ReviewCategory {
  name: string;
  rating: number;
  weight: number;
  comments: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  target: string;
  achievement: number;
  status: 'achieved' | 'in_progress' | 'not_achieved';
}

export default function PerformanceManagement() {
  const { locale } = useLanguage();
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock data
  const reviews: PerformanceReview[] = [
    {
      id: '1',
      employeeId: 'EMP-001',
      employeeName: 'أحمد محمد علي',
      department: 'تقنية المعلومات',
      position: 'مطور برمجيات أول',
      reviewPeriod: '2024',
      reviewDate: '2024-02-28',
      reviewType: 'annual',
      overallRating: 4.5,
      status: 'completed',
      categories: [
        { name: 'الجودة الفنية', rating: 5, weight: 30, comments: 'أداء ممتاز في التطوير' },
        { name: 'العمل الجماعي', rating: 4.5, weight: 20, comments: 'تعاون جيد مع الفريق' },
        { name: 'الالتزام بالمواعيد', rating: 4, weight: 20, comments: 'التزام جيد' },
        { name: 'المبادرة والإبداع', rating: 5, weight: 15, comments: 'أفكار مبتكرة' },
        { name: 'التواصل', rating: 4, weight: 15, comments: 'تواصل فعال' },
      ],
      goals: [
        {
          id: '1',
          title: 'تطوير 3 وحدات جديدة',
          description: 'تطوير وحدات المحاسبة والمبيعات والمشتريات',
          target: '3 وحدات',
          achievement: 100,
          status: 'achieved',
        },
        {
          id: '2',
          title: 'تدريب الموظفين الجدد',
          description: 'تدريب 5 موظفين جدد',
          target: '5 موظفين',
          achievement: 100,
          status: 'achieved',
        },
      ],
      strengths: [
        'مهارات تقنية عالية',
        'قدرة على حل المشكلات',
        'التزام بمعايير الجودة',
      ],
      improvements: [
        'تحسين مهارات التواصل مع العملاء',
        'التطوير المستمر للمهارات',
      ],
      comments: 'موظف متميز بأداء ممتاز',
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      employeeName: 'فاطمة علي أحمد',
      department: 'المالية',
      position: 'محاسب أول',
      reviewPeriod: '2024',
      reviewDate: '2024-02-25',
      reviewType: 'annual',
      overallRating: 4.8,
      status: 'completed',
      categories: [
        { name: 'الدقة في العمل', rating: 5, weight: 35, comments: 'دقة عالية جداً' },
        { name: 'الالتزام بالمواعيد', rating: 5, weight: 25, comments: 'التزام تام' },
        { name: 'المعرفة المهنية', rating: 4.5, weight: 20, comments: 'معرفة واسعة' },
        { name: 'التنظيم', rating: 5, weight: 20, comments: 'تنظيم ممتاز' },
      ],
      goals: [
        {
          id: '1',
          title: 'إعداد التقارير المالية',
          description: 'إعداد تقارير شهرية دقيقة',
          target: '12 تقرير',
          achievement: 100,
          status: 'achieved',
        },
      ],
      strengths: [
        'دقة عالية في العمل',
        'معرفة محاسبية متعمقة',
        'التزام تام',
      ],
      improvements: [
        'تطوير مهارات البرمجيات الحديثة',
      ],
      comments: 'أداء متميز جداً',
    },
  ];

  const getStatusBadge = (status: PerformanceReview['status']) => {
    const statusConfig = {
      draft: { label: locale === 'ar' ? 'مسودة' : 'Draft', className: 'bg-gray-500' },
      pending: { label: locale === 'ar' ? 'معلق' : 'Pending', className: 'bg-orange-600' },
      completed: { label: locale === 'ar' ? 'مكتمل' : 'Completed', className: 'bg-green-600' },
      acknowledged: { label: locale === 'ar' ? 'موثق' : 'Acknowledged', className: 'bg-blue-600' },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getReviewTypeBadge = (type: PerformanceReview['reviewType']) => {
    const typeConfig = {
      annual: locale === 'ar' ? 'سنوي' : 'Annual',
      mid_year: locale === 'ar' ? 'نصف سنوي' : 'Mid-Year',
      probation: locale === 'ar' ? 'تجربة' : 'Probation',
      project: locale === 'ar' ? 'مشروع' : 'Project',
    };
    return <Badge variant="outline">{typeConfig[type]}</Badge>;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'إدارة الأداء' : 'Performance Management'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'تقييم ومتابعة أداء الموظفين' : 'Evaluate and track employee performance'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'تقييم جديد' : 'New Review'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إنشاء تقييم أداء جديد' : 'Create New Performance Review'}
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>{locale === 'ar' ? 'نموذج التقييم' : 'Review Form'}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم إنشاء التقييم' : 'Review created');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'إنشاء' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي التقييمات' : 'Total Reviews'}
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'المكتملة' : 'Completed'}
            </CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(r => r.status === 'completed').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length).toFixed(1)}
            </div>
            <div className="mt-1">{renderStars(4.7)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'الأداء المتميز' : 'Top Performers'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(r => r.overallRating >= 4.5).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
                <TableHead>{locale === 'ar' ? 'القسم' : 'Department'}</TableHead>
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الفترة' : 'Period'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التقييم' : 'Rating'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{review.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{review.position}</p>
                    </div>
                  </TableCell>
                  <TableCell>{review.department}</TableCell>
                  <TableCell>{getReviewTypeBadge(review.reviewType)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {review.reviewPeriod}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`text-xl font-bold ${getRatingColor(review.overallRating)}`}>
                        {review.overallRating.toFixed(1)}
                      </span>
                      {renderStars(review.overallRating)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedReview(review)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Details Dialog */}
      {selectedReview && (
        <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {locale === 'ar' ? 'تقييم الأداء - ' : 'Performance Review - '}
                {selectedReview.employeeName}
              </DialogTitle>
              <DialogDescription>
                {selectedReview.position} - {selectedReview.department}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">{locale === 'ar' ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
                <TabsTrigger value="categories">{locale === 'ar' ? 'التفاصيل' : 'Categories'}</TabsTrigger>
                <TabsTrigger value="goals">{locale === 'ar' ? 'الأهداف' : 'Goals'}</TabsTrigger>
                <TabsTrigger value="feedback">{locale === 'ar' ? 'التعليقات' : 'Feedback'}</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      {locale === 'ar' ? 'التقييم الإجمالي' : 'Overall Rating'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className={`text-6xl font-bold ${getRatingColor(selectedReview.overallRating)}`}>
                          {selectedReview.overallRating.toFixed(1)}
                        </div>
                        <div className="mt-2">{renderStars(selectedReview.overallRating)}</div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {locale === 'ar' ? 'من 5' : 'out of 5'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'نوع التقييم' : 'Review Type'}</CardTitle>
                    </CardHeader>
                    <CardContent>{getReviewTypeBadge(selectedReview.reviewType)}</CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'تاريخ التقييم' : 'Review Date'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{selectedReview.reviewDate}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories" className="space-y-4">
                {selectedReview.categories.map((category, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{category.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getRatingColor(category.rating)}`}>
                            {category.rating.toFixed(1)}
                          </span>
                          {renderStars(category.rating)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={category.rating * 20} className="flex-1" />
                        <Badge variant="outline">{category.weight}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{category.comments}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals" className="space-y-4">
                {selectedReview.goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            {goal.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {goal.description}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">{locale === 'ar' ? 'الهدف:' : 'Target:'}</span> {goal.target}
                          </p>
                        </div>
                        <Badge className={
                          goal.status === 'achieved' ? 'bg-green-600' :
                          goal.status === 'in_progress' ? 'bg-blue-600' :
                          'bg-red-600'
                        }>
                          {goal.status === 'achieved' ? (locale === 'ar' ? 'محقق' : 'Achieved') :
                           goal.status === 'in_progress' ? (locale === 'ar' ? 'قيد التنفيذ' : 'In Progress') :
                           (locale === 'ar' ? 'غير محقق' : 'Not Achieved')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={goal.achievement} className="flex-1" />
                        <span className="font-bold">{goal.achievement}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Feedback Tab */}
              <TabsContent value="feedback" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      {locale === 'ar' ? 'نقاط القوة' : 'Strengths'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedReview.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-600" />
                      {locale === 'ar' ? 'مجالات التحسين' : 'Areas for Improvement'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedReview.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-600 mt-2" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{locale === 'ar' ? 'التعليقات العامة' : 'General Comments'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{selectedReview.comments}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

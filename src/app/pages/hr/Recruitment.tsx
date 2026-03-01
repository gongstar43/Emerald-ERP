import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Plus,
  Search,
  UserPlus,
  Briefcase,
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Send,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';

interface JobPosting {
  id: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: string;
  status: 'draft' | 'open' | 'closed' | 'on_hold';
  postedDate: string;
  closingDate: string;
  applicants: number;
  description: string;
  requirements: string[];
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  appliedDate: string;
  status: 'new' | 'screening' | 'interview' | 'offered' | 'rejected' | 'hired';
  experience: number;
  education: string;
  rating: number;
  resume: string;
}

export default function Recruitment() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  // Mock data
  const jobPostings: JobPosting[] = [
    {
      id: '1',
      jobTitle: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      location: 'الرياض',
      employmentType: 'full-time',
      experience: '3-5 سنوات',
      salary: '12,000 - 15,000 ريال',
      status: 'open',
      postedDate: '2024-02-15',
      closingDate: '2024-03-15',
      applicants: 45,
      description: 'نبحث عن مطور برمجيات متمرس للانضمام لفريقنا',
      requirements: [
        'خبرة 3-5 سنوات في تطوير البرمجيات',
        'إتقان React و TypeScript',
        'خبرة في Node.js',
        'معرفة بقواعد البيانات',
      ],
    },
    {
      id: '2',
      jobTitle: 'محاسب',
      department: 'المالية',
      location: 'جدة',
      employmentType: 'full-time',
      experience: '2-4 سنوات',
      salary: '8,000 - 10,000 ريال',
      status: 'open',
      postedDate: '2024-02-20',
      closingDate: '2024-03-20',
      applicants: 32,
      description: 'مطلوب محاسب للعمل في قسم الحسابات',
      requirements: [
        'بكالوريوس محاسبة',
        'خبرة 2-4 سنوات',
        'شهادة CPA أو SOCPA',
        'إتقان برامج المحاسبة',
      ],
    },
    {
      id: '3',
      jobTitle: 'مدير مبيعات',
      department: 'المبيعات',
      location: 'الدمام',
      employmentType: 'full-time',
      experience: '5+ سنوات',
      salary: '15,000 - 20,000 ريال',
      status: 'open',
      postedDate: '2024-02-10',
      closingDate: '2024-03-10',
      applicants: 28,
      description: 'نبحث عن مدير مبيعات لقيادة فريق المبيعات',
      requirements: [
        'خبرة 5+ سنوات في المبيعات',
        'خبرة إدارية',
        'مهارات تواصل ممتازة',
        'شبكة علاقات واسعة',
      ],
    },
  ];

  const applicants: Applicant[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '0501234567',
      jobTitle: 'مطور برمجيات أول',
      appliedDate: '2024-02-20',
      status: 'interview',
      experience: 4,
      education: 'بكالوريوس علوم حاسب',
      rating: 4.5,
      resume: 'resume_ahmed.pdf',
    },
    {
      id: '2',
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      phone: '0559876543',
      jobTitle: 'محاسب',
      appliedDate: '2024-02-22',
      status: 'screening',
      experience: 3,
      education: 'بكالوريوس محاسبة + CPA',
      rating: 4.8,
      resume: 'resume_fatima.pdf',
    },
    {
      id: '3',
      name: 'خالد أحمد',
      email: 'khaled@example.com',
      phone: '0551112222',
      jobTitle: 'مدير مبيعات',
      appliedDate: '2024-02-18',
      status: 'offered',
      experience: 6,
      education: 'بكالوريوس إدارة أعمال',
      rating: 4.7,
      resume: 'resume_khaled.pdf',
    },
  ];

  const getJobStatusBadge = (status: JobPosting['status']) => {
    const statusConfig = {
      draft: { label: locale === 'ar' ? 'مسودة' : 'Draft', variant: 'secondary' as const },
      open: { label: locale === 'ar' ? 'مفتوح' : 'Open', variant: 'default' as const, className: 'bg-green-600' },
      closed: { label: locale === 'ar' ? 'مغلق' : 'Closed', variant: 'secondary' as const },
      on_hold: { label: locale === 'ar' ? 'معلق' : 'On Hold', variant: 'default' as const, className: 'bg-orange-600' },
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const getApplicantStatusBadge = (status: Applicant['status']) => {
    const statusConfig = {
      new: { label: locale === 'ar' ? 'جديد' : 'New', className: 'bg-blue-600' },
      screening: { label: locale === 'ar' ? 'فحص' : 'Screening', className: 'bg-purple-600' },
      interview: { label: locale === 'ar' ? 'مقابلة' : 'Interview', className: 'bg-orange-600' },
      offered: { label: locale === 'ar' ? 'عرض' : 'Offered', className: 'bg-green-600' },
      rejected: { label: locale === 'ar' ? 'مرفوض' : 'Rejected', className: 'bg-red-600' },
      hired: { label: locale === 'ar' ? 'تم التوظيف' : 'Hired', className: 'bg-green-700' },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getEmploymentTypeBadge = (type: JobPosting['employmentType']) => {
    const typeConfig = {
      'full-time': locale === 'ar' ? 'دوام كامل' : 'Full Time',
      'part-time': locale === 'ar' ? 'دوام جزئي' : 'Part Time',
      'contract': locale === 'ar' ? 'عقد' : 'Contract',
      'internship': locale === 'ar' ? 'تدريب' : 'Internship',
    };
    return <Badge variant="outline">{typeConfig[type]}</Badge>;
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'التوظيف' : 'Recruitment'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة الوظائف والمتقدمين' : 'Manage job postings and applicants'}
          </p>
        </div>
        <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'وظيفة جديدة' : 'New Job'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إضافة وظيفة جديدة' : 'Add New Job Posting'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'املأ تفاصيل الوظيفة' : 'Fill in job details'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</Label>
                  <Input placeholder={locale === 'ar' ? 'مثال: مطور برمجيات' : 'e.g., Software Developer'} />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'القسم' : 'Department'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر القسم' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">{locale === 'ar' ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="hr">{locale === 'ar' ? 'الموارد البشرية' : 'HR'}</SelectItem>
                      <SelectItem value="finance">{locale === 'ar' ? 'المالية' : 'Finance'}</SelectItem>
                      <SelectItem value="sales">{locale === 'ar' ? 'المبيعات' : 'Sales'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الموقع' : 'Location'}</Label>
                  <Input placeholder={locale === 'ar' ? 'الرياض' : 'Riyadh'} />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'نوع التوظيف' : 'Employment Type'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">{locale === 'ar' ? 'دوام كامل' : 'Full Time'}</SelectItem>
                      <SelectItem value="part-time">{locale === 'ar' ? 'دوام جزئي' : 'Part Time'}</SelectItem>
                      <SelectItem value="contract">{locale === 'ar' ? 'عقد' : 'Contract'}</SelectItem>
                      <SelectItem value="internship">{locale === 'ar' ? 'تدريب' : 'Internship'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الخبرة المطلوبة' : 'Experience Required'}</Label>
                  <Input placeholder={locale === 'ar' ? '3-5 سنوات' : '3-5 years'} />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'نطاق الراتب' : 'Salary Range'}</Label>
                  <Input placeholder={locale === 'ar' ? '10,000 - 15,000 ريال' : '10,000 - 15,000 SAR'} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ النشر' : 'Posting Date'}</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ الإغلاق' : 'Closing Date'}</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'وصف الوظيفة' : 'Job Description'}</Label>
                <Textarea 
                  placeholder={locale === 'ar' ? 'أضف وصف الوظيفة...' : 'Add job description...'}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'المتطلبات' : 'Requirements'}</Label>
                <Textarea 
                  placeholder={locale === 'ar' ? 'أضف المتطلبات (سطر لكل متطلب)' : 'Add requirements (one per line)'}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateJobOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم إضافة الوظيفة' : 'Job posted successfully');
                setIsCreateJobOpen(false);
              }}>
                {locale === 'ar' ? 'نشر' : 'Post'}
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
              {locale === 'ar' ? 'الوظائف المفتوحة' : 'Open Jobs'}
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobPostings.filter(j => j.status === 'open').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي المتقدمين' : 'Total Applicants'}
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobPostings.reduce((sum, j) => sum + j.applicants, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'في المقابلة' : 'In Interview'}
            </CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicants.filter(a => a.status === 'interview').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'تم التوظيف' : 'Hired'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applicants.filter(a => a.status === 'hired').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">
            <Briefcase className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'الوظائف' : 'Jobs'}
          </TabsTrigger>
          <TabsTrigger value="applicants">
            <UserPlus className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'المتقدمين' : 'Applicants'}
          </TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'القسم' : 'Department'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الموقع' : 'Location'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المتقدمين' : 'Applicants'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'تاريخ الإغلاق' : 'Closing Date'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPostings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.jobTitle}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{getEmploymentTypeBadge(job.employmentType)}</TableCell>
                      <TableCell>{getJobStatusBadge(job.status)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{job.applicants}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {job.closingDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        {/* Applicants Tab */}
        <TabsContent value="applicants" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الوظيفة' : 'Job'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التعليم' : 'Education'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الخبرة' : 'Experience'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التقييم' : 'Rating'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'تاريخ التقديم' : 'Applied Date'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-xs text-muted-foreground">{applicant.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>{applicant.education}</TableCell>
                      <TableCell>{applicant.experience} {locale === 'ar' ? 'سنوات' : 'years'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{applicant.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getApplicantStatusBadge(applicant.status)}</TableCell>
                      <TableCell>{applicant.appliedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}

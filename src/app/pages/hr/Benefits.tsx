import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  DollarSign,
  Home,
  Car,
  Smartphone,
  GraduationCap,
  Heart,
  Plane,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';

interface Benefit {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  type: 'allowance' | 'reimbursement' | 'bonus' | 'commission';
  category: string;
  isFixed: boolean;
  amount: number;
  percentage?: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  eligibility: string;
  taxable: boolean;
  status: 'active' | 'inactive';
  description: string;
}

interface EmployeeBenefit {
  id: string;
  employeeId: string;
  employeeName: string;
  benefitCode: string;
  benefitName: string;
  amount: number;
  effectiveDate: string;
  expiryDate?: string;
  status: 'active' | 'suspended' | 'expired';
}

export default function Benefits() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // Form state
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    type: '',
    category: '',
    isFixed: true,
    amount: 0,
    percentage: 0,
    frequency: '',
    eligibility: '',
    taxable: false,
    description: '',
  });

  // Mock data - Comprehensive benefits list
  const benefits: Benefit[] = [
    // Housing Allowances
    {
      id: '1',
      code: 'HOU-001',
      nameEn: 'Housing Allowance',
      nameAr: 'بدل سكن',
      type: 'allowance',
      category: 'Housing',
      isFixed: true,
      amount: 3000,
      frequency: 'monthly',
      eligibility: 'All permanent employees',
      taxable: true,
      status: 'active',
      description: 'Monthly housing allowance for permanent employees',
    },
    {
      id: '2',
      code: 'HOU-002',
      nameEn: 'Accommodation Allowance',
      nameAr: 'بدل إقامة',
      type: 'allowance',
      category: 'Housing',
      isFixed: false,
      amount: 0,
      percentage: 25,
      frequency: 'monthly',
      eligibility: 'Managers and above',
      taxable: true,
      status: 'active',
      description: '25% of basic salary for accommodation',
    },
    {
      id: '3',
      code: 'HOU-003',
      nameEn: 'Furniture Allowance',
      nameAr: 'بدل أثاث',
      type: 'allowance',
      category: 'Housing',
      isFixed: true,
      amount: 15000,
      frequency: 'one-time',
      eligibility: 'New employees',
      taxable: true,
      status: 'active',
      description: 'One-time furniture allowance for new employees',
    },

    // Transportation
    {
      id: '4',
      code: 'TRA-001',
      nameEn: 'Transportation Allowance',
      nameAr: 'بدل مواصلات',
      type: 'allowance',
      category: 'Transportation',
      isFixed: true,
      amount: 800,
      frequency: 'monthly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Monthly transportation allowance',
    },
    {
      id: '5',
      code: 'TRA-002',
      nameEn: 'Car Allowance',
      nameAr: 'بدل سيارة',
      type: 'allowance',
      category: 'Transportation',
      isFixed: true,
      amount: 2500,
      frequency: 'monthly',
      eligibility: 'Senior management',
      taxable: true,
      status: 'active',
      description: 'Monthly car allowance for senior management',
    },
    {
      id: '6',
      code: 'TRA-003',
      nameEn: 'Fuel Allowance',
      nameAr: 'بدل وقود',
      type: 'allowance',
      category: 'Transportation',
      isFixed: true,
      amount: 600,
      frequency: 'monthly',
      eligibility: 'Field employees',
      taxable: false,
      status: 'active',
      description: 'Monthly fuel allowance for field employees',
    },

    // Communication
    {
      id: '7',
      code: 'COM-001',
      nameEn: 'Mobile Phone Allowance',
      nameAr: 'بدل هاتف',
      type: 'allowance',
      category: 'Communication',
      isFixed: true,
      amount: 200,
      frequency: 'monthly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Monthly mobile phone allowance',
    },
    {
      id: '8',
      code: 'COM-002',
      nameEn: 'Internet Allowance',
      nameAr: 'بدل إنترنت',
      type: 'allowance',
      category: 'Communication',
      isFixed: true,
      amount: 150,
      frequency: 'monthly',
      eligibility: 'Remote workers',
      taxable: false,
      status: 'active',
      description: 'Monthly internet allowance for remote workers',
    },

    // Education
    {
      id: '9',
      code: 'EDU-001',
      nameEn: 'Children Education Allowance',
      nameAr: 'بدل تعليم الأبناء',
      type: 'allowance',
      category: 'Education',
      isFixed: true,
      amount: 5000,
      frequency: 'yearly',
      eligibility: 'Employees with children',
      taxable: false,
      status: 'active',
      description: 'Annual education allowance per child',
    },
    {
      id: '10',
      code: 'EDU-002',
      nameEn: 'Training Allowance',
      nameAr: 'بدل تدريب',
      type: 'reimbursement',
      category: 'Education',
      isFixed: true,
      amount: 10000,
      frequency: 'yearly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Annual training and development budget',
    },

    // Medical
    {
      id: '11',
      code: 'MED-001',
      nameEn: 'Medical Insurance Premium',
      nameAr: 'تأمين طبي',
      type: 'allowance',
      category: 'Medical',
      isFixed: true,
      amount: 1500,
      frequency: 'monthly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Monthly medical insurance premium',
    },
    {
      id: '12',
      code: 'MED-002',
      nameEn: 'Dental Insurance',
      nameAr: 'تأمين أسنان',
      type: 'allowance',
      category: 'Medical',
      isFixed: true,
      amount: 300,
      frequency: 'monthly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Monthly dental insurance coverage',
    },

    // Travel
    {
      id: '13',
      code: 'TRV-001',
      nameEn: 'Annual Ticket',
      nameAr: 'تذكرة سنوية',
      type: 'allowance',
      category: 'Travel',
      isFixed: true,
      amount: 3500,
      frequency: 'yearly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Annual air ticket to home country',
    },
    {
      id: '14',
      code: 'TRV-002',
      nameEn: 'Family Ticket',
      nameAr: 'تذكرة عائلية',
      type: 'allowance',
      category: 'Travel',
      isFixed: true,
      amount: 10000,
      frequency: 'yearly',
      eligibility: 'Employees with family',
      taxable: false,
      status: 'active',
      description: 'Annual family tickets to home country',
    },

    // Performance
    {
      id: '15',
      code: 'PER-001',
      nameEn: 'Performance Bonus',
      nameAr: 'مكافأة أداء',
      type: 'bonus',
      category: 'Performance',
      isFixed: false,
      amount: 0,
      percentage: 15,
      frequency: 'yearly',
      eligibility: 'Based on performance rating',
      taxable: true,
      status: 'active',
      description: 'Annual performance bonus up to 15% of basic salary',
    },
    {
      id: '16',
      code: 'PER-002',
      nameEn: 'Sales Commission',
      nameAr: 'عمولة مبيعات',
      type: 'commission',
      category: 'Performance',
      isFixed: false,
      amount: 0,
      percentage: 5,
      frequency: 'monthly',
      eligibility: 'Sales team',
      taxable: true,
      status: 'active',
      description: '5% commission on achieved sales',
    },

    // Social
    {
      id: '17',
      code: 'SOC-001',
      nameEn: 'Marriage Bonus',
      nameAr: 'مكافأة زواج',
      type: 'bonus',
      category: 'Social',
      isFixed: true,
      amount: 5000,
      frequency: 'one-time',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'One-time marriage bonus',
    },
    {
      id: '18',
      code: 'SOC-002',
      nameEn: 'Birth Bonus',
      nameAr: 'مكافأة مولود',
      type: 'bonus',
      category: 'Social',
      isFixed: true,
      amount: 2000,
      frequency: 'one-time',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Bonus for new child birth',
    },

    // Other
    {
      id: '19',
      code: 'OTH-001',
      nameEn: 'Meal Allowance',
      nameAr: 'بدل وجبات',
      type: 'allowance',
      category: 'Other',
      isFixed: true,
      amount: 500,
      frequency: 'monthly',
      eligibility: 'All employees',
      taxable: false,
      status: 'active',
      description: 'Monthly meal allowance',
    },
    {
      id: '20',
      code: 'OTH-002',
      nameEn: 'Uniform Allowance',
      nameAr: 'بدل زي',
      type: 'allowance',
      category: 'Other',
      isFixed: true,
      amount: 1000,
      frequency: 'yearly',
      eligibility: 'Employees requiring uniform',
      taxable: false,
      status: 'active',
      description: 'Annual uniform allowance',
    },
  ];

  // Mock employee benefits
  const employeeBenefits: EmployeeBenefit[] = [
    {
      id: '1',
      employeeId: 'EMP-001',
      employeeName: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      benefitCode: 'HOU-001',
      benefitName: locale === 'ar' ? 'بدل سكن' : 'Housing Allowance',
      amount: 3000,
      effectiveDate: '2024-01-01',
      status: 'active',
    },
    {
      id: '2',
      employeeId: 'EMP-001',
      employeeName: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      benefitCode: 'TRA-001',
      benefitName: locale === 'ar' ? 'بدل مواصلات' : 'Transportation Allowance',
      amount: 800,
      effectiveDate: '2024-01-01',
      status: 'active',
    },
  ];

  const categories = Array.from(new Set(benefits.map(b => b.category)));

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي البدلات' : 'Total Benefits',
      value: benefits.length,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'بدلات نشطة' : 'Active Benefits',
      value: benefits.filter(b => b.status === 'active').length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'موظفين مستفيدين' : 'Beneficiaries',
      value: '450',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: locale === 'ar' ? 'التكلفة الشهرية' : 'Monthly Cost',
      value: '1.2M',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const getBenefitTypeIcon = (type: string) => {
    switch (type) {
      case 'allowance':
        return DollarSign;
      case 'bonus':
        return TrendingUp;
      case 'reimbursement':
        return FileText;
      case 'commission':
        return TrendingUp;
      default:
        return DollarSign;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Housing':
        return Home;
      case 'Transportation':
        return Car;
      case 'Communication':
        return Smartphone;
      case 'Education':
        return GraduationCap;
      case 'Medical':
        return Heart;
      case 'Travel':
        return Plane;
      default:
        return DollarSign;
    }
  };

  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch =
      benefit.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      benefit.nameAr.includes(searchQuery) ||
      benefit.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || benefit.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSave = () => {
    if (!formData.nameEn || !formData.type) {
      toast.error(locale === 'ar' ? 'الرجاء ملء الحقول المطلوبة' : 'Please fill required fields');
      return;
    }
    toast.success(locale === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
    setIsCreateOpen(false);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'البدلات والمزايا' : 'Benefits & Allowances'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'إدارة شاملة لبدلات ومزايا الموظفين'
              : 'Comprehensive employee benefits and allowances management'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Dialog open={isCreateOpen} onValueChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'بدل جديد' : 'New Benefit'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {locale === 'ar' ? 'إضافة بدل جديد' : 'Add New Benefit'}
                </DialogTitle>
                <DialogDescription>
                  {locale === 'ar' ? 'أدخل تفاصيل البدل' : 'Enter benefit details'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'الاسم (English)' : 'Name (English)'} *</Label>
                    <Input
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      placeholder="Housing Allowance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'} *</Label>
                    <Input
                      value={formData.nameAr}
                      onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                      placeholder="بدل سكن"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'النوع' : 'Type'} *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allowance">
                          {locale === 'ar' ? 'بدل' : 'Allowance'}
                        </SelectItem>
                        <SelectItem value="bonus">
                          {locale === 'ar' ? 'مكافأة' : 'Bonus'}
                        </SelectItem>
                        <SelectItem value="reimbursement">
                          {locale === 'ar' ? 'تعويض' : 'Reimbursement'}
                        </SelectItem>
                        <SelectItem value="commission">
                          {locale === 'ar' ? 'عمولة' : 'Commission'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'الفئة' : 'Category'}</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Housing">{locale === 'ar' ? 'سكن' : 'Housing'}</SelectItem>
                        <SelectItem value="Transportation">{locale === 'ar' ? 'مواصلات' : 'Transportation'}</SelectItem>
                        <SelectItem value="Communication">{locale === 'ar' ? 'اتصالات' : 'Communication'}</SelectItem>
                        <SelectItem value="Education">{locale === 'ar' ? 'تعليم' : 'Education'}</SelectItem>
                        <SelectItem value="Medical">{locale === 'ar' ? 'طبي' : 'Medical'}</SelectItem>
                        <SelectItem value="Travel">{locale === 'ar' ? 'سفر' : 'Travel'}</SelectItem>
                        <SelectItem value="Performance">{locale === 'ar' ? 'أداء' : 'Performance'}</SelectItem>
                        <SelectItem value="Social">{locale === 'ar' ? 'اجتماعي' : 'Social'}</SelectItem>
                        <SelectItem value="Other">{locale === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'المبلغ' : 'Amount'}</Label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'النسبة %' : 'Percentage %'}</Label>
                    <Input
                      type="number"
                      value={formData.percentage}
                      onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'التكرار' : 'Frequency'}</Label>
                    <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">{locale === 'ar' ? 'شهري' : 'Monthly'}</SelectItem>
                        <SelectItem value="quarterly">{locale === 'ar' ? 'ربع سنوي' : 'Quarterly'}</SelectItem>
                        <SelectItem value="yearly">{locale === 'ar' ? 'سنوي' : 'Yearly'}</SelectItem>
                        <SelectItem value="one-time">{locale === 'ar' ? 'مرة واحدة' : 'One-time'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'حفظ' : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">{stat.title}</div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                <SelectItem value="allowance">{locale === 'ar' ? 'بدلات' : 'Allowances'}</SelectItem>
                <SelectItem value="bonus">{locale === 'ar' ? 'مكافآت' : 'Bonuses'}</SelectItem>
                <SelectItem value="reimbursement">{locale === 'ar' ? 'تعويضات' : 'Reimbursements'}</SelectItem>
                <SelectItem value="commission">{locale === 'ar' ? 'عمولات' : 'Commissions'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="benefits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="benefits">
            {locale === 'ar' ? 'البدلات المعرفة' : 'Defined Benefits'}
          </TabsTrigger>
          <TabsTrigger value="employees">
            {locale === 'ar' ? 'بدلات الموظفين' : 'Employee Benefits'}
          </TabsTrigger>
          <TabsTrigger value="categories">
            {locale === 'ar' ? 'حسب الفئة' : 'By Category'}
          </TabsTrigger>
        </TabsList>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'المبلغ/النسبة' : 'Amount/Rate'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'التكرار' : 'Frequency'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'خاضع للضريبة' : 'Taxable'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBenefits.map((benefit) => {
                      const TypeIcon = getBenefitTypeIcon(benefit.type);
                      const CategoryIcon = getCategoryIcon(benefit.category);
                      
                      return (
                        <TableRow key={benefit.id}>
                          <TableCell className="font-mono text-xs">{benefit.code}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">
                                  {locale === 'ar' ? benefit.nameAr : benefit.nameEn}
                                </p>
                                <p className="text-xs text-muted-foreground">{benefit.eligibility}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {benefit.type === 'allowance'
                                ? locale === 'ar' ? 'بدل' : 'Allowance'
                                : benefit.type === 'bonus'
                                ? locale === 'ar' ? 'مكافأة' : 'Bonus'
                                : benefit.type === 'reimbursement'
                                ? locale === 'ar' ? 'تعويض' : 'Reimbursement'
                                : locale === 'ar' ? 'عمولة' : 'Commission'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{benefit.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {benefit.isFixed ? (
                              <span className="font-bold">
                                {benefit.amount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                              </span>
                            ) : (
                              <span className="font-bold text-blue-600">
                                {benefit.percentage}%
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {benefit.frequency === 'monthly'
                                ? locale === 'ar' ? 'شهري' : 'Monthly'
                                : benefit.frequency === 'quarterly'
                                ? locale === 'ar' ? 'ربع سنوي' : 'Quarterly'
                                : benefit.frequency === 'yearly'
                                ? locale === 'ar' ? 'سنوي' : 'Yearly'
                                : locale === 'ar' ? 'مرة واحدة' : 'One-time'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {benefit.taxable ? (
                              <Badge variant="destructive" className="bg-orange-600">
                                {locale === 'ar' ? 'نعم' : 'Yes'}
                              </Badge>
                            ) : (
                              <Badge variant="default" className="bg-green-600">
                                {locale === 'ar' ? 'لا' : 'No'}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={benefit.status === 'active' ? 'default' : 'secondary'}>
                              {benefit.status === 'active'
                                ? locale === 'ar' ? 'نشط' : 'Active'
                                : locale === 'ar' ? 'غير نشط' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employee Benefits Tab */}
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'بدلات الموظفين النشطة' : 'Active Employee Benefits'}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'البدل' : 'Benefit'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'تاريخ البداية' : 'Effective Date'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeBenefits.map((eb) => (
                    <TableRow key={eb.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{eb.employeeName}</p>
                          <p className="text-xs text-muted-foreground">{eb.employeeId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{eb.benefitName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{eb.benefitCode}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {eb.amount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(eb.effectiveDate).toLocaleDateString(locale)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={eb.status === 'active' ? 'default' : eb.status === 'suspended' ? 'secondary' : 'destructive'}
                          className={eb.status === 'active' ? 'bg-green-600' : ''}
                        >
                          {eb.status === 'active'
                            ? locale === 'ar' ? 'نشط' : 'Active'
                            : eb.status === 'suspended'
                            ? locale === 'ar' ? 'معلق' : 'Suspended'
                            : locale === 'ar' ? 'منتهي' : 'Expired'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => {
              const categoryBenefits = benefits.filter(b => b.category === category);
              const CategoryIcon = getCategoryIcon(category);
              const totalAmount = categoryBenefits
                .filter(b => b.isFixed && b.frequency === 'monthly')
                .reduce((sum, b) => sum + b.amount, 0);
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CategoryIcon className="h-5 w-5" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'عدد البدلات' : 'Benefits'}
                        </span>
                        <span className="font-bold">{categoryBenefits.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'التكلفة الشهرية' : 'Monthly Cost'}
                        </span>
                        <span className="font-bold text-green-600">
                          {totalAmount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

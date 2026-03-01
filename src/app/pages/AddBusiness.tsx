import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Building2,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  Users,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  isicSections,
  businessActivities,
  getActivitiesBySection,
  searchActivities,
  type BusinessActivity,
} from '../../lib/businessClassifications';

interface Branch {
  id: string;
  branchName: string;
  branchNameAr: string;
  address: string;
  addressAr: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  manager: string;
  isHeadquarters: boolean;
}

interface Activity {
  id: string;
  isicCode: string;
  activityNameEn: string;
  activityNameAr: string;
  isPrimary: boolean;
}

export default function AddBusiness() {
  const { locale } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Basic Information
  const [businessInfo, setBusinessInfo] = useState({
    legalName: '',
    legalNameAr: '',
    commercialRegNo: '',
    taxNo: '',
    establishmentDate: '',
    legalForm: '',
    currency: 'SAR',
    fiscalYearStart: '01',
    fiscalYearEnd: '12',
  });

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    mobile: '',
    email: '',
    website: '',
    fax: '',
  });

  // Branches
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      branchName: '',
      branchNameAr: '',
      address: '',
      addressAr: '',
      city: '',
      country: 'Saudi Arabia',
      phone: '',
      email: '',
      manager: '',
      isHeadquarters: true,
    },
  ]);

  // Activities
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const addBranch = () => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      branchName: '',
      branchNameAr: '',
      address: '',
      addressAr: '',
      city: '',
      country: 'Saudi Arabia',
      phone: '',
      email: '',
      manager: '',
      isHeadquarters: false,
    };
    setBranches([...branches, newBranch]);
  };

  const removeBranch = (id: string) => {
    if (branches.length === 1) {
      toast.error(locale === 'ar' ? 'يجب وجود فرع واحد على الأقل' : 'At least one branch is required');
      return;
    }
    const branch = branches.find(b => b.id === id);
    if (branch?.isHeadquarters) {
      toast.error(locale === 'ar' ? 'لا يمكن حذف المقر الرئيسي' : 'Cannot delete headquarters');
      return;
    }
    setBranches(branches.filter(b => b.id !== id));
  };

  const updateBranch = (id: string, field: keyof Branch, value: any) => {
    setBranches(branches.map(b => 
      b.id === id ? { ...b, [field]: value } : b
    ));
  };

  const setAsHeadquarters = (id: string) => {
    setBranches(branches.map(b => ({
      ...b,
      isHeadquarters: b.id === id,
    })));
  };

  const addActivity = (activity: BusinessActivity) => {
    if (activities.some(a => a.isicCode === activity.code)) {
      toast.error(locale === 'ar' ? 'النشاط موجود مسبقاً' : 'Activity already added');
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      isicCode: activity.code,
      activityNameEn: activity.nameEn,
      activityNameAr: activity.nameAr,
      isPrimary: activities.length === 0,
    };

    setActivities([...activities, newActivity]);
    toast.success(locale === 'ar' ? 'تمت إضافة النشاط' : 'Activity added');
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const setPrimaryActivity = (id: string) => {
    setActivities(activities.map(a => ({
      ...a,
      isPrimary: a.id === id,
    })));
  };

  const handleSubmit = () => {
    // Validation
    if (!businessInfo.legalName || !businessInfo.commercialRegNo) {
      toast.error(locale === 'ar' ? 'الرجاء ملء الحقول المطلوبة' : 'Please fill required fields');
      return;
    }

    if (activities.length === 0) {
      toast.error(locale === 'ar' ? 'الرجاء إضافة نشاط واحد على الأقل' : 'Please add at least one activity');
      return;
    }

    const businessData = {
      ...businessInfo,
      ...contactInfo,
      branches,
      activities,
      createdAt: new Date().toISOString(),
    };

    console.log('Business Data:', businessData);
    toast.success(locale === 'ar' ? 'تم حفظ بيانات المنشأة بنجاح' : 'Business data saved successfully');
    
    // Navigate back after saving
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const filteredActivities = searchTerm
    ? searchActivities(searchTerm)
    : selectedSection
    ? getActivitiesBySection(selectedSection)
    : businessActivities;

  const legalForms = [
    { value: 'llc', labelEn: 'Limited Liability Company', labelAr: 'شركة ذات مسؤولية محدودة' },
    { value: 'jsc', labelEn: 'Joint Stock Company', labelAr: 'شركة مساهمة' },
    { value: 'partnership', labelEn: 'Partnership', labelAr: 'شركة تضامن' },
    { value: 'sole', labelEn: 'Sole Proprietorship', labelAr: 'مؤسسة فردية' },
    { value: 'limited_partnership', labelEn: 'Limited Partnership', labelAr: 'شركة توصية بسيطة' },
    { value: 'holding', labelEn: 'Holding Company', labelAr: 'شركة قابضة' },
    { value: 'branch', labelEn: 'Foreign Company Branch', labelAr: 'فرع شركة أجنبية' },
    { value: 'non_profit', labelEn: 'Non-Profit Organization', labelAr: 'منظمة غير ربحية' },
  ];

  const countries = [
    'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
    'Egypt', 'Jordan', 'Lebanon', 'Iraq', 'Syria', 'Yemen', 'Morocco', 'Algeria',
    'Tunisia', 'Libya', 'Sudan', 'Palestine', 'Mauritania', 'Somalia', 'Djibouti',
    'Comoros', 'United States', 'United Kingdom', 'Germany', 'France', 'China',
    'India', 'Pakistan', 'Turkey', 'Other',
  ];

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {[
          { step: 1, label: locale === 'ar' ? 'المعلومات الأساسية' : 'Basic Info' },
          { step: 2, label: locale === 'ar' ? 'الفروع' : 'Branches' },
          { step: 3, label: locale === 'ar' ? 'الأنشطة' : 'Activities' },
          { step: 4, label: locale === 'ar' ? 'المراجعة' : 'Review' },
        ].map((item, index) => (
          <React.Fragment key={item.step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === item.step
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > item.step
                    ? 'bg-green-600 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > item.step ? <CheckCircle2 className="h-5 w-5" /> : item.step}
              </div>
              <p className="text-xs mt-2">{item.label}</p>
            </div>
            {index < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > item.step ? 'bg-green-600' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {locale === 'ar' ? 'إضافة منشأة جديدة' : 'Add New Business'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {locale === 'ar'
                ? 'نظام شامل لإدارة المنشآت متعددة الفروع والأنشطة - متوافق مع ISIC Rev.4'
                : 'Comprehensive system for multi-branch, multi-activity businesses - ISIC Rev.4 Compliant'}
            </p>
          </div>
        </div>
      </div>

      {renderStepIndicator()}

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {locale === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
              </CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'البيانات القانونية والتنظيمية للمنشأة'
                  : 'Legal and regulatory information about the business'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legalName">
                    {locale === 'ar' ? 'الاسم القانوني (English)' : 'Legal Name (English)'} *
                  </Label>
                  <Input
                    id="legalName"
                    value={businessInfo.legalName}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, legalName: e.target.value })}
                    placeholder="Company Name LLC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalNameAr">
                    {locale === 'ar' ? 'الاسم القانوني (عربي)' : 'Legal Name (Arabic)'} *
                  </Label>
                  <Input
                    id="legalNameAr"
                    value={businessInfo.legalNameAr}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, legalNameAr: e.target.value })}
                    placeholder="اسم الشركة ذ.م.م"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commercialRegNo">
                    {locale === 'ar' ? 'رقم السجل التجاري' : 'Commercial Registration No.'} *
                  </Label>
                  <Input
                    id="commercialRegNo"
                    value={businessInfo.commercialRegNo}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, commercialRegNo: e.target.value })}
                    placeholder="1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxNo">
                    {locale === 'ar' ? 'الرقم الضريبي' : 'Tax No.'}
                  </Label>
                  <Input
                    id="taxNo"
                    value={businessInfo.taxNo}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, taxNo: e.target.value })}
                    placeholder="300000000000003"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="establishmentDate">
                    {locale === 'ar' ? 'تاريخ التأسيس' : 'Establishment Date'}
                  </Label>
                  <Input
                    id="establishmentDate"
                    type="date"
                    value={businessInfo.establishmentDate}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, establishmentDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legalForm">
                    {locale === 'ar' ? 'الشكل القانوني' : 'Legal Form'} *
                  </Label>
                  <Select
                    value={businessInfo.legalForm}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, legalForm: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر الشكل القانوني' : 'Select legal form'} />
                    </SelectTrigger>
                    <SelectContent>
                      {legalForms.map((form) => (
                        <SelectItem key={form.value} value={form.value}>
                          {locale === 'ar' ? form.labelAr : form.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">
                    {locale === 'ar' ? 'العملة' : 'Currency'}
                  </Label>
                  <Select
                    value={businessInfo.currency}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                      <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fiscalYearStart">
                    {locale === 'ar' ? 'بداية السنة المالية' : 'Fiscal Year Start'}
                  </Label>
                  <Select
                    value={businessInfo.fiscalYearStart}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, fiscalYearStart: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                          {new Date(2000, month - 1, 1).toLocaleDateString(locale, { month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiscalYearEnd">
                    {locale === 'ar' ? 'نهاية السنة المالية' : 'Fiscal Year End'}
                  </Label>
                  <Select
                    value={businessInfo.fiscalYearEnd}
                    onValueChange={(value) => setBusinessInfo({ ...businessInfo, fiscalYearEnd: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                          {new Date(2000, month - 1, 1).toLocaleDateString(locale, { month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {locale === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-2" />
                    {locale === 'ar' ? 'الهاتف' : 'Phone'}
                  </Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="+966 11 234 5678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">
                    <Phone className="h-4 w-4 inline mr-2" />
                    {locale === 'ar' ? 'الجوال' : 'Mobile'}
                  </Label>
                  <Input
                    id="mobile"
                    value={contactInfo.mobile}
                    onChange={(e) => setContactInfo({ ...contactInfo, mobile: e.target.value })}
                    placeholder="+966 50 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="h-4 w-4 inline mr-2" />
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="info@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">
                    <Globe className="h-4 w-4 inline mr-2" />
                    {locale === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
                  </Label>
                  <Input
                    id="website"
                    value={contactInfo.website}
                    onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
                    placeholder="www.company.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => setCurrentStep(2)} size="lg">
              {locale === 'ar' ? 'التالي' : 'Next'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Branches */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {locale === 'ar' ? 'الفروع' : 'Branches'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'ar'
                      ? 'إدارة فروع المنشأة في مواقع مختلفة'
                      : 'Manage business branches in different locations'}
                  </CardDescription>
                </div>
                <Button onClick={addBranch}>
                  <Plus className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'إضافة فرع' : 'Add Branch'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {branches.map((branch, index) => (
                <Card key={branch.id} className={branch.isHeadquarters ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {locale === 'ar' ? 'الفرع' : 'Branch'} {index + 1}
                        </h3>
                        {branch.isHeadquarters && (
                          <Badge variant="default">
                            {locale === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!branch.isHeadquarters && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAsHeadquarters(branch.id)}
                          >
                            {locale === 'ar' ? 'تعيين كمقر رئيسي' : 'Set as HQ'}
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeBranch(branch.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'اسم الفرع (English)' : 'Branch Name (English)'}
                        </Label>
                        <Input
                          value={branch.branchName}
                          onChange={(e) => updateBranch(branch.id, 'branchName', e.target.value)}
                          placeholder="Main Branch"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'اسم الفرع (عربي)' : 'Branch Name (Arabic)'}
                        </Label>
                        <Input
                          value={branch.branchNameAr}
                          onChange={(e) => updateBranch(branch.id, 'branchNameAr', e.target.value)}
                          placeholder="الفرع الرئيسي"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'العنوان (English)' : 'Address (English)'}
                        </Label>
                        <Textarea
                          value={branch.address}
                          onChange={(e) => updateBranch(branch.id, 'address', e.target.value)}
                          placeholder="123 Main Street, Building 5"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'العنوان (عربي)' : 'Address (Arabic)'}
                        </Label>
                        <Textarea
                          value={branch.addressAr}
                          onChange={(e) => updateBranch(branch.id, 'addressAr', e.target.value)}
                          placeholder="شارع الملك فهد، مبنى 5"
                          rows={2}
                          dir="rtl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'المدينة' : 'City'}
                        </Label>
                        <Input
                          value={branch.city}
                          onChange={(e) => updateBranch(branch.id, 'city', e.target.value)}
                          placeholder="Riyadh"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'الدولة' : 'Country'}
                        </Label>
                        <Select
                          value={branch.country}
                          onValueChange={(value) => updateBranch(branch.id, 'country', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'الهاتف' : 'Phone'}
                        </Label>
                        <Input
                          value={branch.phone}
                          onChange={(e) => updateBranch(branch.id, 'phone', e.target.value)}
                          placeholder="+966 11 234 5678"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </Label>
                        <Input
                          type="email"
                          value={branch.email}
                          onChange={(e) => updateBranch(branch.id, 'email', e.target.value)}
                          placeholder="branch@company.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {locale === 'ar' ? 'المدير' : 'Manager'}
                        </Label>
                        <Input
                          value={branch.manager}
                          onChange={(e) => updateBranch(branch.id, 'manager', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              {locale === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            <Button onClick={() => setCurrentStep(3)}>
              {locale === 'ar' ? 'التالي' : 'Next'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Activities */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Activities Selection */}
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {locale === 'ar' ? 'اختيار الأنشطة (ISIC Rev.4)' : 'Select Activities (ISIC Rev.4)'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'ar'
                      ? 'التصنيف الصناعي الدولي الموحد - 500+ نشاط'
                      : 'International Standard Industrial Classification - 500+ activities'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="mb-4">
                    <Input
                      placeholder={locale === 'ar' ? 'بحث بالكود أو الاسم...' : 'Search by code or name...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Sections Tabs */}
                  <Tabs value={selectedSection} onValueChange={setSelectedSection}>
                    <TabsList className="w-full flex-wrap h-auto">
                      <TabsTrigger value="">
                        {locale === 'ar' ? 'الكل' : 'All'}
                      </TabsTrigger>
                      {isicSections.slice(0, 10).map((section) => (
                        <TabsTrigger key={section.code} value={section.code}>
                          {section.code} - {locale === 'ar' ? section.nameAr : section.nameEn}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value={selectedSection || ''} className="mt-4">
                      <div className="max-h-[500px] overflow-auto space-y-2">
                        {filteredActivities.slice(0, 50).map((activity) => (
                          <div
                            key={activity.code}
                            className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                            onClick={() => addActivity(activity)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{activity.code}</Badge>
                                  <span className="font-medium">
                                    {locale === 'ar' ? activity.nameAr : activity.nameEn}
                                  </span>
                                </div>
                                {activity.description && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {activity.description}
                                  </p>
                                )}
                              </div>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Selected Activities */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {locale === 'ar' ? 'الأنشطة المختارة' : 'Selected Activities'}
                  </CardTitle>
                  <CardDescription>
                    {activities.length} {locale === 'ar' ? 'نشاط' : 'activities'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activities.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        {locale === 'ar'
                          ? 'لم يتم اختيار أي نشاط بعد'
                          : 'No activities selected yet'}
                      </p>
                    ) : (
                      activities.map((activity) => (
                        <Card key={activity.id}>
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {activity.isicCode}
                                  </Badge>
                                  {activity.isPrimary && (
                                    <Badge variant="default" className="text-xs">
                                      {locale === 'ar' ? 'رئيسي' : 'Primary'}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm mt-1">
                                  {locale === 'ar' ? activity.activityNameAr : activity.activityNameEn}
                                </p>
                                {!activity.isPrimary && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0 text-xs"
                                    onClick={() => setPrimaryActivity(activity.id)}
                                  >
                                    {locale === 'ar' ? 'تعيين كنشاط رئيسي' : 'Set as primary'}
                                  </Button>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeActivity(activity.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              {locale === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            <Button onClick={() => setCurrentStep(4)}>
              {locale === 'ar' ? 'التالي' : 'Next'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {locale === 'ar' ? 'مراجعة البيانات' : 'Review Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info Summary */}
              <div>
                <h3 className="font-semibold mb-2">
                  {locale === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      {locale === 'ar' ? 'الاسم القانوني:' : 'Legal Name:'}
                    </span>
                    <span className="ml-2 font-medium">
                      {locale === 'ar' ? businessInfo.legalNameAr : businessInfo.legalName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {locale === 'ar' ? 'السجل التجاري:' : 'CR No.:'}
                    </span>
                    <span className="ml-2 font-medium">{businessInfo.commercialRegNo}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {locale === 'ar' ? 'الشكل القانوني:' : 'Legal Form:'}
                    </span>
                    <span className="ml-2 font-medium">
                      {legalForms.find((f) => f.value === businessInfo.legalForm)?.[
                        locale === 'ar' ? 'labelAr' : 'labelEn'
                      ]}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {locale === 'ar' ? 'العملة:' : 'Currency:'}
                    </span>
                    <span className="ml-2 font-medium">{businessInfo.currency}</span>
                  </div>
                </div>
              </div>

              {/* Branches Summary */}
              <div>
                <h3 className="font-semibold mb-2">
                  {locale === 'ar' ? 'الفروع' : 'Branches'} ({branches.length})
                </h3>
                <div className="space-y-2">
                  {branches.map((branch) => (
                    <div key={branch.id} className="p-3 border rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                          {locale === 'ar' ? branch.branchNameAr : branch.branchName}
                        </span>
                        {branch.isHeadquarters && (
                          <Badge variant="default" className="text-xs">
                            {locale === 'ar' ? 'المقر الرئيسي' : 'HQ'}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {branch.city}, {branch.country}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities Summary */}
              <div>
                <h3 className="font-semibold mb-2">
                  {locale === 'ar' ? 'الأنشطة' : 'Activities'} ({activities.length})
                </h3>
                <div className="space-y-2">
                  {activities.map((activity) => (
                    <div key={activity.id} className="p-3 border rounded-lg text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{activity.isicCode}</Badge>
                        {activity.isPrimary && (
                          <Badge variant="default" className="text-xs">
                            {locale === 'ar' ? 'رئيسي' : 'Primary'}
                          </Badge>
                        )}
                      </div>
                      <p>{locale === 'ar' ? activity.activityNameAr : activity.activityNameEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              {locale === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            <Button onClick={handleSubmit} size="lg">
              <Save className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'حفظ المنشأة' : 'Save Business'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

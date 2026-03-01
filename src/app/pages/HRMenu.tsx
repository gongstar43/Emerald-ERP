import React from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../lib/i18n';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Plane,
  Calendar,
  TrendingUp,
  UserCheck,
  FileText
} from 'lucide-react';

export default function HRMenu() {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: locale === 'ar' ? 'الموظفون' : 'Employees',
      description: locale === 'ar' ? 'إدارة بيانات الموظفين والإدارات' : 'Manage employee data and departments',
      icon: Users,
      path: '/hr/employees',
      color: 'bg-blue-500',
      stats: locale === 'ar' ? 'إدارة كاملة' : 'Full Management'
    },
    {
      title: locale === 'ar' ? 'الحضور والانصراف' : 'Attendance',
      description: locale === 'ar' ? 'تتبع حضور الموظفين وساعات العمل' : 'Track employee attendance and work hours',
      icon: Clock,
      path: '/hr/attendance',
      color: 'bg-green-500',
      stats: locale === 'ar' ? 'متابعة يومية' : 'Daily Tracking'
    },
    {
      title: locale === 'ar' ? 'الرواتب' : 'Payroll',
      description: locale === 'ar' ? 'إدارة الرواتب والبدلات والخصومات' : 'Manage salaries, allowances and deductions',
      icon: DollarSign,
      path: '/hr/payroll',
      color: 'bg-purple-500',
      stats: locale === 'ar' ? 'حسابات تلقائية' : 'Auto Calculations'
    },
    {
      title: locale === 'ar' ? 'الإجازات' : 'Leaves',
      description: locale === 'ar' ? 'إدارة طلبات الإجازات والموافقات' : 'Manage leave requests and approvals',
      icon: Plane,
      path: '/hr/leaves',
      color: 'bg-orange-500',
      stats: locale === 'ar' ? 'موافقات سريعة' : 'Quick Approvals'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {locale === 'ar' ? 'الموارد البشرية' : 'Human Resources'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {locale === 'ar' 
            ? 'إدارة شاملة للموارد البشرية والموظفين' 
            : 'Comprehensive human resources and employee management'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'الموظفون' : 'Employees'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'موظف نشط' : 'Active Employees'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'الحضور اليوم' : "Today's Attendance"}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'حاضر' : 'Present'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'طلبات الإجازة' : 'Leave Requests'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">0</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'معلقة' : 'Pending'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'الرواتب الشهرية' : 'Monthly Payroll'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'ر.س' : 'SAR'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <Card
            key={item.path}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            onClick={() => navigate(item.path)}
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`${item.color} p-3 rounded-lg`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.stats}
                </span>
                <span className="text-sm text-blue-600 font-medium hover:underline">
                  {locale === 'ar' ? 'عرض التفاصيل ←' : 'View Details →'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Calendar className="h-12 w-12 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {locale === 'ar' ? 'ن��ام شامل لإدارة الموارد البشرية' : 'Comprehensive HR Management System'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'نظام متكامل لإدارة الموظفين والحضور والرواتب والإجازات مع تقارير تفصيلية وتحليلات متقدمة'
                  : 'Integrated system for managing employees, attendance, payroll and leaves with detailed reports and advanced analytics'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

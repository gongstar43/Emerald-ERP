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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Textarea } from '../../components/ui/textarea';
import {
  Plus,
  Building2,
  Users,
  UserCircle,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

interface Department {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  manager: string;
  employeeCount: number;
  budget: number;
  location: string;
  description: string;
  status: 'active' | 'inactive';
}

export default function Departments() {
  const { locale } = useLanguage();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const departments: Department[] = [
    {
      id: '1',
      code: 'IT',
      name: 'تقنية المعلومات',
      nameEn: 'Information Technology',
      manager: 'أحمد محمد',
      employeeCount: 25,
      budget: 1200000,
      location: 'المبنى A - الطابق 3',
      description: 'قسم تقنية المعلومات والتطوير',
      status: 'active',
    },
    {
      id: '2',
      code: 'HR',
      name: 'الموارد البشرية',
      nameEn: 'Human Resources',
      manager: 'فاطمة علي',
      employeeCount: 12,
      budget: 650000,
      location: 'المبنى B - الطابق 2',
      description: 'إدارة الموارد البشرية والتوظيف',
      status: 'active',
    },
    {
      id: '3',
      code: 'FIN',
      name: 'المالية',
      nameEn: 'Finance',
      manager: 'خالد أحمد',
      employeeCount: 18,
      budget: 950000,
      location: 'المبنى A - الطابق 1',
      description: 'الإدارة المالية والمحاسبة',
      status: 'active',
    },
    {
      id: '4',
      code: 'SALES',
      name: 'المبيعات',
      nameEn: 'Sales',
      manager: 'سارة محمود',
      employeeCount: 30,
      budget: 850000,
      location: 'المبنى B - الطابق 1',
      description: 'قسم المبيعات وخدمة العملاء',
      status: 'active',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الأقسام' : 'Departments'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة الأقسام والإدارات' : 'Manage organizational departments'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'قسم جديد' : 'New Department'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إضافة قسم جديد' : 'Add New Department'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الكود' : 'Code'}</Label>
                  <Input placeholder="IT" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'المدير' : 'Manager'}</Label>
                  <Input />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم بالعربية' : 'Arabic Name'}</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم بالإنجليزية' : 'English Name'}</Label>
                <Input />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الميزانية' : 'Budget'}</Label>
                  <Input type="number" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الموقع' : 'Location'}</Label>
                  <Input />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                <Textarea rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تمت الإضافة' : 'Department added');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'إضافة' : 'Add'}
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
              {locale === 'ar' ? 'إجمالي الأقسام' : 'Total Departments'}
            </CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}
            </CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departments.reduce((sum, d) => sum + d.employeeCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الميزانيات' : 'Total Budget'}
            </CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(departments.reduce((sum, d) => sum + d.budget, 0) / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'متوسط الموظفين' : 'Avg Employees'}
            </CardTitle>
            <UserCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(departments.reduce((sum, d) => sum + d.employeeCount, 0) / departments.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المدير' : 'Manager'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الموظفون' : 'Employees'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الموقع' : 'Location'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-mono font-bold">{dept.code}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{locale === 'ar' ? dept.name : dept.nameEn}</p>
                      <p className="text-xs text-muted-foreground">{dept.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      {dept.manager}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {dept.employeeCount}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{dept.location}</TableCell>
                  <TableCell>
                    <Badge className={dept.status === 'active' ? 'bg-green-600' : 'bg-gray-500'}>
                      {dept.status === 'active' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
                    </Badge>
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
    </div>
  );
}

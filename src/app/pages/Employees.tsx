import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Plus, Edit, Trash2, Search, UserCircle, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface Employee {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive';
}

export default function Employees() {
  const { t, locale } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: 0,
    hireDate: new Date().toISOString().split('T')[0],
    status: 'active' as const,
  });

  const handleSave = () => {
    if (!formData.name || !formData.code) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    toast.success(t('savedSuccessfully'));
    setIsDialogOpen(false);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    toast.success(t('deletedSuccessfully'));
  };

  const handleAddNew = () => {
    setEditingEmployee(null);
    setFormData({
      code: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: 0,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active',
    });
    setIsDialogOpen(true);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('employees')}</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          {t('add')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الموظفون النشطون' : 'Active Employees'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {employees.filter((e) => e.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'إج��الي الرواتب' : 'Total Payroll'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">
              {employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الأقسام' : 'Departments'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {new Set(employees.map((e) => e.department)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                <TableHead>{t('employee')}</TableHead>
                <TableHead>{t('department')}</TableHead>
                <TableHead>{t('position')}</TableHead>
                <TableHead className="text-right">{t('salary')}</TableHead>
                <TableHead>{t('hireDate')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-mono">{employee.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{employee.name}</p>
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {employee.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {employee.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {employee.department}
                      </span>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {employee.salary.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell>
                      {new Date(employee.hireDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          employee.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {employee.status === 'active' ? t('active') : t('inactive')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(employee.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? t('editItem') : t('addNew')} - {t('employee')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الكود' : 'Code'} *</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('hireDate')} *</Label>
                <Input
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('name')} *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('email')} *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('phone')} *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('department')} *</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">{locale === 'ar' ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                    <SelectItem value="Finance">{locale === 'ar' ? 'المالية' : 'Finance'}</SelectItem>
                    <SelectItem value="HR">{locale === 'ar' ? 'الموارد البشرية' : 'HR'}</SelectItem>
                    <SelectItem value="Sales">{locale === 'ar' ? 'المبيعات' : 'Sales'}</SelectItem>
                    <SelectItem value="Operations">{locale === 'ar' ? 'العمليات' : 'Operations'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('position')} *</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('salary')} *</Label>
              <Input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
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
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
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  DollarSign, 
  Calendar,
  FileText,
  UserCircle,
  Download,
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  overtime: number;
  bonus: number;
  tax: number;
  insurance: number;
  netSalary: number;
  status: 'draft' | 'pending' | 'paid' | 'cancelled';
  paymentDate: string;
  notes: string;
}

export default function Payroll() {
  const { t, locale } = useLanguage();
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PayrollRecord | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeCode: '',
    month: new Date().toLocaleString('en-US', { month: 'long' }),
    year: new Date().getFullYear(),
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    overtime: 0,
    bonus: 0,
    tax: 0,
    insurance: 0,
    netSalary: 0,
    status: 'draft' as const,
    paymentDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const calculateNetSalary = (data: typeof formData) => {
    const gross = data.basicSalary + data.allowances + data.overtime + data.bonus;
    const totalDeductions = data.deductions + data.tax + data.insurance;
    return Math.max(0, gross - totalDeductions);
  };

  const updateFormData = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    newData.netSalary = calculateNetSalary(newData);
    setFormData(newData);
  };

  const handleSave = () => {
    if (!formData.employeeId || !formData.month || !formData.year) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newRecord: PayrollRecord = {
      id: editingRecord?.id || `PAY-${Date.now()}`,
      ...formData,
      netSalary: calculateNetSalary(formData),
    };

    if (editingRecord) {
      setRecords(records.map(r => r.id === editingRecord.id ? newRecord : r));
      toast.success(locale === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully');
    } else {
      setRecords([...records, newRecord]);
      toast.success(locale === 'ar' ? 'تم الإضافة بنجاح' : 'Added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingRecord(null);
    setFormData({
      employeeId: '',
      employeeName: '',
      employeeCode: '',
      month: new Date().toLocaleString('en-US', { month: 'long' }),
      year: new Date().getFullYear(),
      basicSalary: 0,
      allowances: 0,
      deductions: 0,
      overtime: 0,
      bonus: 0,
      tax: 0,
      insurance: 0,
      netSalary: 0,
      status: 'draft',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleEdit = (record: PayrollRecord) => {
    setEditingRecord(record);
    setFormData(record);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setRecords(records.filter(r => r.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: PayrollRecord['status']) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(locale === 'ar' ? 'تم تحديث الحالة' : 'Status updated');
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesMonth = filterMonth === 'all' || record.month === filterMonth;
    const matchesYear = !filterYear || record.year.toString() === filterYear;
    return matchesSearch && matchesStatus && matchesMonth && matchesYear;
  });

  const stats = {
    total: records.length,
    paid: records.filter(r => r.status === 'paid').length,
    pending: records.filter(r => r.status === 'pending').length,
    totalPaid: records.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.netSalary, 0),
    totalPending: records.filter(r => r.status === 'pending').reduce((sum, r) => sum + r.netSalary, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'draft':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      draft: { ar: 'مسودة', en: 'Draft' },
      pending: { ar: 'معلق', en: 'Pending' },
      paid: { ar: 'مدفوع', en: 'Paid' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
    };
    return locale === 'ar' ? labels[status]?.ar : labels[status]?.en;
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthsAr = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الرواتب' : 'Payroll'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة رواتب الموظفين' : 'Manage employee payroll'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'قريباً...' : 'Coming soon...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            {t('add')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'إجمالي السجلات' : 'Total Records'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'مدفوع' : 'Paid'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'معلق' : 'Pending'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'إجمالي المدفوع' : 'Total Paid'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {stats.totalPaid.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'إجمالي المعلق' : 'Total Pending'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.totalPending.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <SelectValue placeholder={locale === 'ar' ? 'الشهر' : 'Month'} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'كل الأشهر' : 'All Months'}</SelectItem>
                {months.map((month, idx) => (
                  <SelectItem key={month} value={month}>
                    {locale === 'ar' ? monthsAr[idx] : month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder={locale === 'ar' ? 'السنة' : 'Year'}
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="pending">{locale === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                <SelectItem value="paid">{locale === 'ar' ? 'مدفوع' : 'Paid'}</SelectItem>
                <SelectItem value="cancelled">{locale === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الشهر/السنة' : 'Month/Year'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'البدلات' : 'Allowances'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الخصومات' : 'Deductions'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الصافي' : 'Net Salary'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">{record.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{record.employeeName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{record.employeeCode}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {locale === 'ar' 
                            ? `${monthsAr[months.indexOf(record.month)]} ${record.year}`
                            : `${record.month} ${record.year}`
                          }
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {record.basicSalary.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      +{record.allowances.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      -{(record.deductions + record.tax + record.insurance).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {record.netSalary.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={record.status}
                        onValueChange={(value: any) => handleStatusChange(record.id, value)}
                      >
                        <SelectTrigger className={`w-32 ${getStatusColor(record.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(record.status)}
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                          <SelectItem value="pending">{locale === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                          <SelectItem value="paid">{locale === 'ar' ? 'مدفوع' : 'Paid'}</SelectItem>
                          <SelectItem value="cancelled">{locale === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(record)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRecord 
                ? (locale === 'ar' ? 'تعديل سجل الراتب' : 'Edit Payroll Record')
                : (locale === 'ar' ? 'إضافة سجل راتب جديد' : 'Add Payroll Record')
              }
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'كود الموظف' : 'Employee Code'} *</Label>
                <Input
                  value={formData.employeeCode}
                  onChange={(e) => updateFormData('employeeCode', e.target.value)}
                  placeholder="EMP-001"
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'اسم الموظف' : 'Employee Name'} *</Label>
                <Input
                  value={formData.employeeName}
                  onChange={(e) => updateFormData('employeeName', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الشهر' : 'Month'} *</Label>
                <Select value={formData.month} onValueChange={(value) => updateFormData('month', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, idx) => (
                      <SelectItem key={month} value={month}>
                        {locale === 'ar' ? monthsAr[idx] : month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'السنة' : 'Year'} *</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => updateFormData('year', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'تاريخ الدفع' : 'Payment Date'}</Label>
                <Input
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => updateFormData('paymentDate', e.target.value)}
                />
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">{locale === 'ar' ? 'تفاصيل الراتب' : 'Salary Details'}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'} *</Label>
                  <Input
                    type="number"
                    value={formData.basicSalary}
                    onChange={(e) => updateFormData('basicSalary', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'البدلات' : 'Allowances'}</Label>
                  <Input
                    type="number"
                    value={formData.allowances}
                    onChange={(e) => updateFormData('allowances', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الوقت الإضافي' : 'Overtime'}</Label>
                  <Input
                    type="number"
                    value={formData.overtime}
                    onChange={(e) => updateFormData('overtime', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'المكافآت' : 'Bonus'}</Label>
                  <Input
                    type="number"
                    value={formData.bonus}
                    onChange={(e) => updateFormData('bonus', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 text-red-600">{locale === 'ar' ? 'الخصومات' : 'Deductions'}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الخصومات' : 'Deductions'}</Label>
                  <Input
                    type="number"
                    value={formData.deductions}
                    onChange={(e) => updateFormData('deductions', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الضريبة' : 'Tax'}</Label>
                  <Input
                    type="number"
                    value={formData.tax}
                    onChange={(e) => updateFormData('tax', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'التأمينات' : 'Insurance'}</Label>
                  <Input
                    type="number"
                    value={formData.insurance}
                    onChange={(e) => updateFormData('insurance', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">{locale === 'ar' ? 'صافي الراتب' : 'Net Salary'}</span>
                <span className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  {formData.netSalary.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Input
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                placeholder={locale === 'ar' ? 'أدخل ملاحظات إضافية...' : 'Enter additional notes...'}
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
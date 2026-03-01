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
  Clock, 
  Calendar,
  CheckCircle2,
  XCircle,
  UserCircle,
  Download,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'overtime';
  notes: string;
}

export default function Attendance() {
  const { t, locale } = useLanguage();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeCode: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '08:00',
    checkOut: '17:00',
    workHours: 9,
    status: 'present' as const,
    notes: '',
  });

  const handleSave = () => {
    if (!formData.employeeId || !formData.date) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: editingRecord?.id || `ATT-${Date.now()}`,
      ...formData,
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
      date: new Date().toISOString().split('T')[0],
      checkIn: '08:00',
      checkOut: '17:00',
      workHours: 9,
      status: 'present',
      notes: '',
    });
  };

  const handleEdit = (record: AttendanceRecord) => {
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

  const calculateWorkHours = (checkIn: string, checkOut: string) => {
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    const hours = (outHour * 60 + outMin - (inHour * 60 + inMin)) / 60;
    return Math.max(0, hours);
  };

  const handleTimeChange = (field: 'checkIn' | 'checkOut', value: string) => {
    const newFormData = { ...formData, [field]: value };
    newFormData.workHours = calculateWorkHours(newFormData.checkIn, newFormData.checkOut);
    setFormData(newFormData);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesDate = !dateFilter || record.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    late: records.filter(r => r.status === 'late').length,
    avgWorkHours: records.length > 0 
      ? (records.reduce((sum, r) => sum + r.workHours, 0) / records.length).toFixed(1)
      : '0',
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'absent':
        return <XCircle className="h-4 w-4" />;
      case 'late':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'half-day':
        return 'bg-orange-100 text-orange-800';
      case 'overtime':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      present: { ar: 'حاضر', en: 'Present' },
      absent: { ar: 'غائب', en: 'Absent' },
      late: { ar: 'متأخر', en: 'Late' },
      'half-day': { ar: 'نصف يوم', en: 'Half Day' },
      overtime: { ar: 'وقت إضافي', en: 'Overtime' },
    };
    return locale === 'ar' ? labels[status]?.ar : labels[status]?.en;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الحضور والانصراف' : 'Attendance'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة سجلات الحضور والانصراف' : 'Manage attendance records'}
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
              {locale === 'ar' ? 'حاضر' : 'Present'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.present}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'غائب' : 'Absent'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'متأخر' : 'Late'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{stats.late}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'متوسط ساعات العمل' : 'Avg Work Hours'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{stats.avgWorkHours}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث بالاسم أو الكود...' : 'Search by name or code...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="present">{locale === 'ar' ? 'حاضر' : 'Present'}</SelectItem>
                <SelectItem value="absent">{locale === 'ar' ? 'غائب' : 'Absent'}</SelectItem>
                <SelectItem value="late">{locale === 'ar' ? 'متأخر' : 'Late'}</SelectItem>
                <SelectItem value="half-day">{locale === 'ar' ? 'نصف يوم' : 'Half Day'}</SelectItem>
                <SelectItem value="overtime">{locale === 'ar' ? 'وقت إضافي' : 'Overtime'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الدخول' : 'Check In'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الخروج' : 'Check Out'}</TableHead>
                <TableHead className="text-center">{locale === 'ar' ? 'ساعات العمل' : 'Work Hours'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
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
                      {new Date(record.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <Clock className="h-3 w-3" />
                        {record.checkIn}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <Clock className="h-3 w-3" />
                        {record.checkOut}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {record.workHours.toFixed(1)}h
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {getStatusLabel(record.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{record.notes || '-'}</span>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRecord 
                ? (locale === 'ar' ? 'تعديل سجل الحضور' : 'Edit Attendance Record')
                : (locale === 'ar' ? 'إضافة سجل حضور جديد' : 'Add Attendance Record')
              }
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'كود الموظف' : 'Employee Code'} *</Label>
                <Input
                  value={formData.employeeCode}
                  onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                  placeholder="EMP-001"
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'اسم الموظف' : 'Employee Name'} *</Label>
                <Input
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'التاريخ' : 'Date'} *</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'وقت الدخول' : 'Check In'} *</Label>
                <Input
                  type="time"
                  value={formData.checkIn}
                  onChange={(e) => handleTimeChange('checkIn', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'وقت الخروج' : 'Check Out'} *</Label>
                <Input
                  type="time"
                  value={formData.checkOut}
                  onChange={(e) => handleTimeChange('checkOut', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'ساعات العمل' : 'Work Hours'}</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.workHours}
                  onChange={(e) => setFormData({ ...formData, workHours: Number(e.target.value) })}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'الحالة' : 'Status'} *</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">{locale === 'ar' ? 'حاضر' : 'Present'}</SelectItem>
                  <SelectItem value="absent">{locale === 'ar' ? 'غائب' : 'Absent'}</SelectItem>
                  <SelectItem value="late">{locale === 'ar' ? 'متأخر' : 'Late'}</SelectItem>
                  <SelectItem value="half-day">{locale === 'ar' ? 'نصف يوم' : 'Half Day'}</SelectItem>
                  <SelectItem value="overtime">{locale === 'ar' ? 'وقت إضافي' : 'Overtime'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Input
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

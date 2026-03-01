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
import { Textarea } from '../components/ui/textarea';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Calendar,
  UserCircle,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Plane,
  FileText,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  leaveType: 'annual' | 'sick' | 'emergency' | 'unpaid' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  requestDate: string;
  approvedBy: string;
  approvalDate: string;
  notes: string;
}

export default function Leaves() {
  const { t, locale } = useLanguage();
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeCode: '',
    leaveType: 'annual' as const,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    days: 1,
    reason: '',
    status: 'pending' as const,
    requestDate: new Date().toISOString().split('T')[0],
    approvedBy: '',
    approvalDate: '',
    notes: '',
  });

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff + 1);
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const newFormData = { ...formData, [field]: value };
    newFormData.days = calculateDays(newFormData.startDate, newFormData.endDate);
    setFormData(newFormData);
  };

  const handleSave = () => {
    if (!formData.employeeId || !formData.startDate || !formData.endDate || !formData.reason) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error(locale === 'ar' ? 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية' : 'End date must be after start date');
      return;
    }

    const newRequest: LeaveRequest = {
      id: editingRequest?.id || `LV-${Date.now()}`,
      ...formData,
      days: calculateDays(formData.startDate, formData.endDate),
    };

    if (editingRequest) {
      setRequests(requests.map(r => r.id === editingRequest.id ? newRequest : r));
      toast.success(locale === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully');
    } else {
      setRequests([...requests, newRequest]);
      toast.success(locale === 'ar' ? 'تم الإضافة بنجاح' : 'Added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingRequest(null);
    setFormData({
      employeeId: '',
      employeeName: '',
      employeeCode: '',
      leaveType: 'annual',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      days: 1,
      reason: '',
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      approvedBy: '',
      approvalDate: '',
      notes: '',
    });
  };

  const handleEdit = (request: LeaveRequest) => {
    setEditingRequest(request);
    setFormData(request);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setRequests(requests.filter(r => r.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: LeaveRequest['status']) => {
    setRequests(requests.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: newStatus,
          approvalDate: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : r.approvalDate,
        };
      }
      return r;
    }));
    toast.success(locale === 'ar' ? 'تم تحديث الحالة' : 'Status updated');
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.leaveType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    totalDays: requests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.days, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      pending: { ar: 'معلق', en: 'Pending' },
      approved: { ar: 'موافق عليه', en: 'Approved' },
      rejected: { ar: 'مرفوض', en: 'Rejected' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
    };
    return locale === 'ar' ? labels[status]?.ar : labels[status]?.en;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'annual':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'emergency':
        return 'bg-orange-100 text-orange-800';
      case 'unpaid':
        return 'bg-gray-100 text-gray-800';
      case 'maternity':
        return 'bg-pink-100 text-pink-800';
      case 'paternity':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      annual: { ar: 'إجازة سنوية', en: 'Annual Leave' },
      sick: { ar: 'إجازة مرضية', en: 'Sick Leave' },
      emergency: { ar: 'إجازة طارئة', en: 'Emergency' },
      unpaid: { ar: 'إجازة بدون أجر', en: 'Unpaid Leave' },
      maternity: { ar: 'إجازة أمومة', en: 'Maternity' },
      paternity: { ar: 'إجازة أبوة', en: 'Paternity' },
    };
    return locale === 'ar' ? labels[type]?.ar : labels[type]?.en;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الإجازات' : 'Leaves'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة طلبات الإجازات' : 'Manage leave requests'}
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
              {locale === 'ar' ? 'إجمالي الطلبات' : 'Total Requests'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
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
              {locale === 'ar' ? 'موافق عليه' : 'Approved'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'مرفوض' : 'Rejected'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'إجمالي الأيام' : 'Total Days'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{stats.totalDays}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'كل الأنواع' : 'All Types'}</SelectItem>
                <SelectItem value="annual">{locale === 'ar' ? 'إجازة سنوية' : 'Annual Leave'}</SelectItem>
                <SelectItem value="sick">{locale === 'ar' ? 'إجازة مرضية' : 'Sick Leave'}</SelectItem>
                <SelectItem value="emergency">{locale === 'ar' ? 'إجازة طارئة' : 'Emergency'}</SelectItem>
                <SelectItem value="unpaid">{locale === 'ar' ? 'بدون أجر' : 'Unpaid'}</SelectItem>
                <SelectItem value="maternity">{locale === 'ar' ? 'أمومة' : 'Maternity'}</SelectItem>
                <SelectItem value="paternity">{locale === 'ar' ? 'أبوة' : 'Paternity'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="pending">{locale === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                <SelectItem value="approved">{locale === 'ar' ? 'موافق عليه' : 'Approved'}</SelectItem>
                <SelectItem value="rejected">{locale === 'ar' ? 'مرفوض' : 'Rejected'}</SelectItem>
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
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'من' : 'From'}</TableHead>
                <TableHead>{locale === 'ar' ? 'إلى' : 'To'}</TableHead>
                <TableHead className="text-center">{locale === 'ar' ? 'الأيام' : 'Days'}</TableHead>
                <TableHead>{locale === 'ar' ? 'السبب' : 'Reason'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono text-sm">{request.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{request.employeeName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{request.employeeCode}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(request.leaveType)}`}>
                        {getTypeLabel(request.leaveType)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(request.startDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(request.endDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                        {request.days}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground truncate max-w-xs" title={request.reason}>
                        {request.reason}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={request.status}
                        onValueChange={(value: any) => handleStatusChange(request.id, value)}
                      >
                        <SelectTrigger className={`w-36 ${getStatusColor(request.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">{locale === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                          <SelectItem value="approved">{locale === 'ar' ? 'موافق عليه' : 'Approved'}</SelectItem>
                          <SelectItem value="rejected">{locale === 'ar' ? 'مرفوض' : 'Rejected'}</SelectItem>
                          <SelectItem value="cancelled">{locale === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(request)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(request.id)}>
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
              {editingRequest 
                ? (locale === 'ar' ? 'تعديل طلب الإجازة' : 'Edit Leave Request')
                : (locale === 'ar' ? 'طلب إجازة جديد' : 'New Leave Request')
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
              <Label>{locale === 'ar' ? 'نوع الإجازة' : 'Leave Type'} *</Label>
              <Select value={formData.leaveType} onValueChange={(value: any) => setFormData({ ...formData, leaveType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">{locale === 'ar' ? 'إجازة سنوية' : 'Annual Leave'}</SelectItem>
                  <SelectItem value="sick">{locale === 'ar' ? 'إجازة مرضية' : 'Sick Leave'}</SelectItem>
                  <SelectItem value="emergency">{locale === 'ar' ? 'إجازة طارئة' : 'Emergency Leave'}</SelectItem>
                  <SelectItem value="unpaid">{locale === 'ar' ? 'إجازة بدون أجر' : 'Unpaid Leave'}</SelectItem>
                  <SelectItem value="maternity">{locale === 'ar' ? 'إجازة أمومة' : 'Maternity Leave'}</SelectItem>
                  <SelectItem value="paternity">{locale === 'ar' ? 'إجازة أبوة' : 'Paternity Leave'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'تاريخ البداية' : 'Start Date'} *</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'تاريخ النهاية' : 'End Date'} *</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'عدد الأيام' : 'Number of Days'}</Label>
                <Input
                  type="number"
                  value={formData.days}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'السبب' : 'Reason'} *</Label>
              <Textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder={locale === 'ar' ? 'اذكر سبب طلب الإجازة...' : 'Enter the reason for leave request...'}
                rows={3}
              />
            </div>
            {editingRequest && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'اعتماد بواسطة' : 'Approved By'}</Label>
                  <Input
                    value={formData.approvedBy}
                    onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ الاعتماد' : 'Approval Date'}</Label>
                  <Input
                    type="date"
                    value={formData.approvalDate}
                    onChange={(e) => setFormData({ ...formData, approvalDate: e.target.value })}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={locale === 'ar' ? 'ملاحظات إضافية...' : 'Additional notes...'}
                rows={2}
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

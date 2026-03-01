import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Shield, 
  Eye, 
  Calendar,
  User,
  FileText,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Download
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'post' | 'cancel';
  module: 'invoice' | 'receipt' | 'payment' | 'journal' | 'account' | 'contact' | 'user' | 'other';
  resourceType: string;
  resourceId: string;
  resourceName: string;
  changes?: { field: string; oldValue: string; newValue: string }[];
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
  description: string;
}

export default function AccountingAudit() {
  const { t, locale } = useLanguage();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      userId: '1',
      userName: 'Admin User',
      action: 'create',
      module: 'invoice',
      resourceType: 'Invoice',
      resourceId: 'INV-001',
      resourceName: 'Invoice INV-001',
      changes: [
        { field: 'status', oldValue: '', newValue: 'draft' },
        { field: 'amount', oldValue: '0', newValue: '5000' },
      ],
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0...',
      status: 'success',
      description: 'Created new sales invoice',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [filterAction, setFilterAction] = useState<'all' | 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'post' | 'cancel'>('all');
  const [filterModule, setFilterModule] = useState<'all' | 'invoice' | 'receipt' | 'payment' | 'journal' | 'account' | 'contact' | 'user' | 'other'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed' | 'warning'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setShowDetailsDialog(true);
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    let matchesDate = true;
    if (dateFrom) {
      matchesDate = matchesDate && new Date(log.timestamp) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchesDate = matchesDate && new Date(log.timestamp) <= new Date(dateTo);
    }
    
    return matchesSearch && matchesAction && matchesModule && matchesStatus && matchesDate;
  });

  const getActionBadge = (action: string) => {
    const actionStyles = {
      create: { bg: 'bg-green-100 text-green-800', icon: Plus },
      update: { bg: 'bg-blue-100 text-blue-800', icon: Edit },
      delete: { bg: 'bg-red-100 text-red-800', icon: Trash2 },
      approve: { bg: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
      reject: { bg: 'bg-orange-100 text-orange-800', icon: XCircle },
      post: { bg: 'bg-purple-100 text-purple-800', icon: FileText },
      cancel: { bg: 'bg-gray-100 text-gray-800', icon: XCircle },
    };
    const actionLabels = {
      create: locale === 'ar' ? 'إنشاء' : 'Create',
      update: locale === 'ar' ? 'تحديث' : 'Update',
      delete: locale === 'ar' ? 'حذف' : 'Delete',
      approve: locale === 'ar' ? 'موافقة' : 'Approve',
      reject: locale === 'ar' ? 'رفض' : 'Reject',
      post: locale === 'ar' ? 'ترحيل' : 'Post',
      cancel: locale === 'ar' ? 'إلغاء' : 'Cancel',
    };
    const style = actionStyles[action as keyof typeof actionStyles];
    const Icon = style.icon;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {actionLabels[action as keyof typeof actionLabels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      success: { bg: 'bg-green-100 text-green-800', icon: CheckCircle },
      failed: { bg: 'bg-red-100 text-red-800', icon: XCircle },
      warning: { bg: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    };
    const statusLabels = {
      success: locale === 'ar' ? 'نجح' : 'Success',
      failed: locale === 'ar' ? 'فشل' : 'Failed',
      warning: locale === 'ar' ? 'تحذير' : 'Warning',
    };
    const style = statusStyles[status as keyof typeof statusStyles];
    const Icon = style.icon;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} flex items-center gap-1 w-fit`}>
        <Icon className="h-3 w-3" />
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getModuleLabel = (module: string) => {
    const labels = {
      invoice: locale === 'ar' ? 'فواتير' : 'Invoice',
      receipt: locale === 'ar' ? 'سندات قبض' : 'Receipt',
      payment: locale === 'ar' ? 'سندات صرف' : 'Payment',
      journal: locale === 'ar' ? 'قيود' : 'Journal',
      account: locale === 'ar' ? 'حسابات' : 'Account',
      contact: locale === 'ar' ? 'جهات اتصال' : 'Contact',
      user: locale === 'ar' ? 'مستخدمين' : 'User',
      other: locale === 'ar' ? 'أخرى' : 'Other',
    };
    return labels[module as keyof typeof labels];
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US'),
      time: date.toLocaleTimeString(locale === 'ar' ? 'ar-SA' : 'en-US'),
    };
  };

  const exportToCSV = () => {
    const headers = ['Timestamp', 'User', 'Action', 'Module', 'Resource', 'Status', 'Description'];
    const rows = filteredLogs.map(log => [
      log.timestamp,
      log.userName,
      log.action,
      log.module,
      log.resourceName,
      log.status,
      log.description,
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            {locale === 'ar' ? 'سجل التدقيق' : 'Audit Log'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'تتبع جميع الأنشطة والتغييرات في النظام' : 'Track all activities and changes in the system'}
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'تصدير CSV' : 'Export CSV'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {locale === 'ar' ? 'إجمالي السجلات' : 'Total Logs'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {locale === 'ar' ? 'ناجحة' : 'Success'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {auditLogs.filter(l => l.status === 'success').length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              {locale === 'ar' ? 'فاشلة' : 'Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
              {auditLogs.filter(l => l.status === 'failed').length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {locale === 'ar' ? 'تحذيرات' : 'Warnings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {auditLogs.filter(l => l.status === 'warning').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{locale === 'ar' ? 'بحث وتصفية' : 'Search & Filter'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative md:col-span-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث في السجلات...' : 'Search in logs...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAction} onValueChange={(value: any) => setFilterAction(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الإجراءات' : 'All Actions'}</SelectItem>
                <SelectItem value="create">{locale === 'ar' ? 'إنشاء' : 'Create'}</SelectItem>
                <SelectItem value="update">{locale === 'ar' ? 'تحديث' : 'Update'}</SelectItem>
                <SelectItem value="delete">{locale === 'ar' ? 'حذف' : 'Delete'}</SelectItem>
                <SelectItem value="approve">{locale === 'ar' ? 'موافقة' : 'Approve'}</SelectItem>
                <SelectItem value="reject">{locale === 'ar' ? 'رفض' : 'Reject'}</SelectItem>
                <SelectItem value="post">{locale === 'ar' ? 'ترحيل' : 'Post'}</SelectItem>
                <SelectItem value="cancel">{locale === 'ar' ? 'إلغاء' : 'Cancel'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterModule} onValueChange={(value: any) => setFilterModule(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الوحدات' : 'All Modules'}</SelectItem>
                <SelectItem value="invoice">{locale === 'ar' ? 'فواتير' : 'Invoice'}</SelectItem>
                <SelectItem value="receipt">{locale === 'ar' ? 'سندات قبض' : 'Receipt'}</SelectItem>
                <SelectItem value="payment">{locale === 'ar' ? 'سندات صرف' : 'Payment'}</SelectItem>
                <SelectItem value="journal">{locale === 'ar' ? 'قيود' : 'Journal'}</SelectItem>
                <SelectItem value="account">{locale === 'ar' ? 'حسابات' : 'Account'}</SelectItem>
                <SelectItem value="contact">{locale === 'ar' ? 'جهات اتصال' : 'Contact'}</SelectItem>
                <SelectItem value="user">{locale === 'ar' ? 'مستخدمي��' : 'User'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="success">{locale === 'ar' ? 'ناجحة' : 'Success'}</SelectItem>
                <SelectItem value="failed">{locale === 'ar' ? 'فاشلة' : 'Failed'}</SelectItem>
                <SelectItem value="warning">{locale === 'ar' ? 'تحذير' : 'Warning'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {locale === 'ar' ? 'من تاريخ' : 'From Date'}
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {locale === 'ar' ? 'إلى تاريخ' : 'To Date'}
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'سجلات التدقيق' : 'Audit Logs'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'المستخدم' : 'User'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الإجراء' : 'Action'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الوحدة' : 'Module'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'المورد' : 'Resource'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'التفاصيل' : 'Details'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      {locale === 'ar' ? 'لا توجد سجلات' : 'No logs found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => {
                    const { date, time } = formatDateTime(log.timestamp);
                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{date}</span>
                            <span className="text-xs text-muted-foreground">{time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{log.userName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getActionBadge(log.action)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getModuleLabel(log.module)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{log.resourceName}</span>
                            <span className="text-xs text-muted-foreground">{log.resourceType}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(log)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      {selectedLog && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                {locale === 'ar' ? 'تفاصيل سجل التدقيق' : 'Audit Log Details'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'معلومات تفصيلية عن النشاط' : 'Detailed information about the activity'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'التاريخ والوقت' : 'Date & Time'}</p>
                  <p className="font-medium">{new Date(selectedLog.timestamp).toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الحالة' : 'Status'}</p>
                  {getStatusBadge(selectedLog.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'المستخدم' : 'User'}</p>
                  <p className="font-medium">{selectedLog.userName}</p>
                  <p className="text-xs text-muted-foreground">ID: {selectedLog.userId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الإجراء' : 'Action'}</p>
                  {getActionBadge(selectedLog.action)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الوحدة' : 'Module'}</p>
                  <Badge variant="outline">{getModuleLabel(selectedLog.module)}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'المورد' : 'Resource'}</p>
                  <p className="font-medium">{selectedLog.resourceName}</p>
                  <p className="text-xs text-muted-foreground">{selectedLog.resourceType} - {selectedLog.resourceId}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الوصف' : 'Description'}</p>
                <p className="font-medium">{selectedLog.description}</p>
              </div>

              {/* Changes */}
              {selectedLog.changes && selectedLog.changes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {locale === 'ar' ? 'التغييرات' : 'Changes'}
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{locale === 'ar' ? 'الحقل' : 'Field'}</TableHead>
                          <TableHead>{locale === 'ar' ? 'القيمة القديمة' : 'Old Value'}</TableHead>
                          <TableHead>{locale === 'ar' ? 'القيمة الجديدة' : 'New Value'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedLog.changes.map((change, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{change.field}</TableCell>
                            <TableCell>
                              <code className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                {change.oldValue || '(empty)'}
                              </code>
                            </TableCell>
                            <TableCell>
                              <code className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                {change.newValue || '(empty)'}
                              </code>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {/* Technical Info */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <h3 className="font-semibold mb-2">{locale === 'ar' ? 'معلومات تقنية' : 'Technical Information'}</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'عنوان IP' : 'IP Address'}</p>
                    <code className="text-xs">{selectedLog.ipAddress}</code>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المتصفح' : 'User Agent'}</p>
                    <code className="text-xs break-all">{selectedLog.userAgent}</code>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  History as HistoryIcon,
  Search,
  Filter,
  FileText,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Calendar,
  Eye,
  Download,
  RefreshCw,
  Activity,
  TrendingUp,
  Clock,
  User,
  Settings,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';

interface HistoryLog {
  id: string;
  type: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'login' | 'logout';
  module: 'sales' | 'purchases' | 'inventory' | 'hr' | 'accounting' | 'projects' | 'system';
  action: string;
  user: string;
  department: string;
  timestamp: string;
  ip?: string;
  details: string;
  entityType?: string;
  entityId?: string;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  status: 'success' | 'failed' | 'pending';
}

const MOCK_HISTORY: HistoryLog[] = [
  {
    id: 'LOG-001',
    type: 'create',
    module: 'sales',
    action: 'Created Sales Invoice',
    user: 'أحمد محمد',
    department: 'المبيعات',
    timestamp: '2026-02-27T10:30:00',
    ip: '192.168.1.100',
    details: 'Created new sales invoice INV-2026-001 for customer ABC Corp',
    entityType: 'invoice',
    entityId: 'INV-2026-001',
    status: 'success',
  },
  {
    id: 'LOG-002',
    type: 'update',
    module: 'inventory',
    action: 'Updated Stock Level',
    user: 'Sara Ahmed',
    department: 'المخزون',
    timestamp: '2026-02-27T09:45:00',
    ip: '192.168.1.101',
    details: 'Updated stock level for item SKU-12345',
    entityType: 'item',
    entityId: 'SKU-12345',
    changes: [
      { field: 'quantity', oldValue: '100', newValue: '150' },
      { field: 'location', oldValue: 'WH-A', newValue: 'WH-B' },
    ],
    status: 'success',
  },
  {
    id: 'LOG-003',
    type: 'approve',
    module: 'purchases',
    action: 'Approved Purchase Order',
    user: 'محمد علي',
    department: 'المشتريات',
    timestamp: '2026-02-27T08:20:00',
    ip: '192.168.1.102',
    details: 'Approved purchase order PO-2026-045 for supplier XYZ Ltd',
    entityType: 'purchase_order',
    entityId: 'PO-2026-045',
    status: 'success',
  },
  {
    id: 'LOG-004',
    type: 'delete',
    module: 'accounting',
    action: 'Deleted Journal Entry',
    user: 'فاطمة حسن',
    department: 'المحاسبة',
    timestamp: '2026-02-27T07:15:00',
    ip: '192.168.1.103',
    details: 'Deleted draft journal entry JE-2026-089',
    entityType: 'journal_entry',
    entityId: 'JE-2026-089',
    status: 'success',
  },
  {
    id: 'LOG-005',
    type: 'login',
    module: 'system',
    action: 'User Login',
    user: 'Admin User',
    department: 'IT',
    timestamp: '2026-02-27T07:00:00',
    ip: '192.168.1.1',
    details: 'User logged in successfully',
    status: 'success',
  },
  {
    id: 'LOG-006',
    type: 'update',
    module: 'hr',
    action: 'Updated Employee Record',
    user: 'نورة السالم',
    department: 'الموارد البشرية',
    timestamp: '2026-02-26T16:30:00',
    ip: '192.168.1.104',
    details: 'Updated employee record for EMP-12345',
    entityType: 'employee',
    entityId: 'EMP-12345',
    changes: [
      { field: 'salary', oldValue: '5000', newValue: '5500' },
      { field: 'position', oldValue: 'Junior', newValue: 'Senior' },
    ],
    status: 'success',
  },
  {
    id: 'LOG-007',
    type: 'reject',
    module: 'sales',
    action: 'Rejected Quotation',
    user: 'خالد عبدالله',
    department: 'المبيعات',
    timestamp: '2026-02-26T15:45:00',
    ip: '192.168.1.105',
    details: 'Rejected quotation QUO-2026-123 due to pricing issues',
    entityType: 'quotation',
    entityId: 'QUO-2026-123',
    status: 'success',
  },
  {
    id: 'LOG-008',
    type: 'create',
    module: 'projects',
    action: 'Created Project Task',
    user: 'عمر الشمري',
    department: 'المشاريع',
    timestamp: '2026-02-26T14:20:00',
    ip: '192.168.1.106',
    details: 'Created new task TASK-456 for project Website Redesign',
    entityType: 'task',
    entityId: 'TASK-456',
    status: 'success',
  },
];

const translations = {
  ar: {
    history: 'سجل النظام',
    systemHistory: 'سجل النظام الشامل',
    totalOperations: 'إجمالي العمليات',
    todayOperations: 'عمليات اليوم',
    weekOperations: 'عمليات الأسبوع',
    activeUsers: 'المستخدمين النشطين',
    filterByType: 'تصفية حسب النوع',
    filterByModule: 'تصفية حسب الوحدة',
    filterByUser: 'تصفية حسب المستخدم',
    all: 'الكل',
    create: 'إنشاء',
    update: 'تحديث',
    delete: 'حذف',
    approve: 'موافقة',
    reject: 'رفض',
    login: 'تسجيل دخول',
    logout: 'تسجيل خروج',
    sales: 'المبيعات',
    purchases: 'المشتريات',
    inventory: 'المخزون',
    hr: 'الموارد البشرية',
    accounting: 'المحاسبة',
    projects: 'المشاريع',
    system: 'النظام',
    type: 'النوع',
    module: 'الوحدة',
    action: 'الإجراء',
    user: 'المستخدم',
    department: 'القسم',
    timestamp: 'التاريخ والوقت',
    status: 'الحالة',
    viewDetails: 'عرض التفاصيل',
    details: 'التفاصيل',
    ipAddress: 'عنوان IP',
    entityType: 'نوع الكيان',
    entityId: 'معرف الكيان',
    changes: 'التغييرات',
    field: 'الحقل',
    oldValue: 'القيمة القديمة',
    newValue: 'القيمة الجديدة',
    success: 'نجح',
    failed: 'فشل',
    pending: 'قيد الانتظار',
    export: 'تصدير',
    refresh: 'تحديث',
    search: 'بحث',
    close: 'إغلاق',
    noChanges: 'لا توجد تغييرات مسجلة',
  },
  en: {
    history: 'History',
    systemHistory: 'System History',
    totalOperations: 'Total Operations',
    todayOperations: "Today's Operations",
    weekOperations: "Week's Operations",
    activeUsers: 'Active Users',
    filterByType: 'Filter by Type',
    filterByModule: 'Filter by Module',
    filterByUser: 'Filter by User',
    all: 'All',
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    approve: 'Approve',
    reject: 'Reject',
    login: 'Login',
    logout: 'Logout',
    sales: 'Sales',
    purchases: 'Purchases',
    inventory: 'Inventory',
    hr: 'Human Resources',
    accounting: 'Accounting',
    projects: 'Projects',
    system: 'System',
    type: 'Type',
    module: 'Module',
    action: 'Action',
    user: 'User',
    department: 'Department',
    timestamp: 'Timestamp',
    status: 'Status',
    viewDetails: 'View Details',
    details: 'Details',
    ipAddress: 'IP Address',
    entityType: 'Entity Type',
    entityId: 'Entity ID',
    changes: 'Changes',
    field: 'Field',
    oldValue: 'Old Value',
    newValue: 'New Value',
    success: 'Success',
    failed: 'Failed',
    pending: 'Pending',
    export: 'Export',
    refresh: 'Refresh',
    search: 'Search',
    close: 'Close',
    noChanges: 'No changes recorded',
  },
};

export default function History() {
  const { locale, isRTL } = useLanguage();
  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<HistoryLog | null>(null);

  const filteredLogs = MOCK_HISTORY.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesType && matchesModule;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <Plus className="h-4 w-4" />;
      case 'update':
        return <Edit className="h-4 w-4" />;
      case 'delete':
        return <Trash2 className="h-4 w-4" />;
      case 'approve':
        return <CheckCircle className="h-4 w-4" />;
      case 'reject':
        return <XCircle className="h-4 w-4" />;
      case 'login':
        return <User className="h-4 w-4" />;
      case 'logout':
        return <User className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'sales':
        return <ShoppingCart className="h-4 w-4" />;
      case 'purchases':
        return <Package className="h-4 w-4" />;
      case 'inventory':
        return <Package className="h-4 w-4" />;
      case 'hr':
        return <Users className="h-4 w-4" />;
      case 'accounting':
        return <DollarSign className="h-4 w-4" />;
      case 'projects':
        return <FileText className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Statistics
  const totalOperations = MOCK_HISTORY.length;
  const todayOperations = MOCK_HISTORY.filter((log) => {
    const logDate = new Date(log.timestamp).toDateString();
    const today = new Date().toDateString();
    return logDate === today;
  }).length;
  const weekOperations = MOCK_HISTORY.filter((log) => {
    const logDate = new Date(log.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return logDate >= weekAgo;
  }).length;
  const activeUsers = new Set(MOCK_HISTORY.map((log) => log.user)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HistoryIcon className="h-8 w-8 text-blue-600" />
            {t('systemHistory')}
          </h1>
          <p className="text-gray-600 mt-1">
            {locale === 'ar'
              ? 'سجل شامل لجميع العمليات والأنشطة في النظام'
              : 'Complete log of all system operations and activities'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('refresh')}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {t('totalOperations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalOperations}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'ar' ? 'إجمالي العمليات المسجلة' : 'Total recorded operations'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('todayOperations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{todayOperations}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'ar' ? 'عمليات اليوم' : "Today's operations"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t('weekOperations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{weekOperations}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'ar' ? 'عمليات آخر 7 أيام' : 'Last 7 days operations'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              {t('activeUsers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">
              {locale === 'ar' ? 'مستخدمين نشطين' : 'Active users'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('search') + '...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('filterByType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all')}</SelectItem>
                <SelectItem value="create">{t('create')}</SelectItem>
                <SelectItem value="update">{t('update')}</SelectItem>
                <SelectItem value="delete">{t('delete')}</SelectItem>
                <SelectItem value="approve">{t('approve')}</SelectItem>
                <SelectItem value="reject">{t('reject')}</SelectItem>
                <SelectItem value="login">{t('login')}</SelectItem>
                <SelectItem value="logout">{t('logout')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('filterByModule')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all')}</SelectItem>
                <SelectItem value="sales">{t('sales')}</SelectItem>
                <SelectItem value="purchases">{t('purchases')}</SelectItem>
                <SelectItem value="inventory">{t('inventory')}</SelectItem>
                <SelectItem value="hr">{t('hr')}</SelectItem>
                <SelectItem value="accounting">{t('accounting')}</SelectItem>
                <SelectItem value="projects">{t('projects')}</SelectItem>
                <SelectItem value="system">{t('system')}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'مزيد من الفلاتر' : 'More Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t('history')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('type')}</TableHead>
                  <TableHead>{t('module')}</TableHead>
                  <TableHead>{t('action')}</TableHead>
                  <TableHead>{t('user')}</TableHead>
                  <TableHead>{t('department')}</TableHead>
                  <TableHead>{t('timestamp')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-center">
                    {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(log.type)}
                        <span className="capitalize">{t(log.type as any)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getModuleIcon(log.module)}
                        <span>{t(log.module as any)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={log.action}>
                        {log.action}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                          {log.user.charAt(0)}
                        </div>
                        <span>{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(log.status)}>{t(log.status as any)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {t('details')}
            </DialogTitle>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('type')}</label>
                  <div className="mt-1 flex items-center gap-2">
                    {getTypeIcon(selectedLog.type)}
                    <span className="capitalize">{t(selectedLog.type as any)}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('module')}</label>
                  <div className="mt-1 flex items-center gap-2">
                    {getModuleIcon(selectedLog.module)}
                    <span>{t(selectedLog.module as any)}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('user')}</label>
                  <div className="mt-1">{selectedLog.user}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('department')}</label>
                  <div className="mt-1">{selectedLog.department}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('timestamp')}</label>
                  <div className="mt-1">{formatTimestamp(selectedLog.timestamp)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('status')}</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedLog.status)}>
                      {t(selectedLog.status as any)}
                    </Badge>
                  </div>
                </div>
                {selectedLog.ip && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('ipAddress')}</label>
                    <div className="mt-1">{selectedLog.ip}</div>
                  </div>
                )}
                {selectedLog.entityType && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('entityType')}</label>
                    <div className="mt-1 capitalize">{selectedLog.entityType}</div>
                  </div>
                )}
                {selectedLog.entityId && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('entityId')}</label>
                    <div className="mt-1 font-mono text-sm">{selectedLog.entityId}</div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">{t('action')}</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">{selectedLog.action}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">{t('details')}</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">{selectedLog.details}</div>
              </div>

              {selectedLog.changes && selectedLog.changes.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">{t('changes')}</label>
                  <div className="mt-2 space-y-2">
                    {selectedLog.changes.map((change, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-50 border border-blue-200 rounded-md"
                      >
                        <div className="font-medium text-sm capitalize">{change.field}</div>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <span className="text-red-600 line-through">{change.oldValue}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-medium">{change.newValue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!selectedLog.changes || selectedLog.changes.length === 0) &&
                selectedLog.type === 'update' && (
                  <div className="text-sm text-gray-500 italic text-center p-4 bg-gray-50 rounded-md">
                    {t('noChanges')}
                  </div>
                )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLog(null)}>
              {t('close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

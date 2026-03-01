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
import { Textarea } from '../components/ui/textarea';
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  FileText,
  Users,
  ShoppingCart,
  Briefcase,
  DollarSign,
  Calendar,
  AlertCircle,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface ApprovalRequest {
  id: string;
  type: 'leave' | 'expense' | 'purchase' | 'project' | 'payment';
  title: string;
  requester: string;
  department: string;
  amount?: number;
  currency?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  dueDate: string;
  description: string;
  attachments?: string[];
  approvalLevel: number;
  totalLevels: number;
  previousApprovers?: string[];
  nextApprovers?: string[];
}

const MOCK_APPROVALS: ApprovalRequest[] = [
  {
    id: 'APP-001',
    type: 'leave',
    title: 'Annual Leave Request',
    requester: 'أحمد محمد',
    department: 'الموارد البشرية',
    priority: 'medium',
    status: 'pending',
    requestDate: '2026-02-25',
    dueDate: '2026-02-28',
    description: 'طلب إجازة سنوية لمدة 5 أيام',
    approvalLevel: 1,
    totalLevels: 2,
  },
  {
    id: 'APP-002',
    type: 'expense',
    title: 'Business Travel Expenses',
    requester: 'Sara Ahmed',
    department: 'Sales',
    amount: 5500,
    currency: 'SAR',
    priority: 'high',
    status: 'pending',
    requestDate: '2026-02-26',
    dueDate: '2026-02-27',
    description: 'Travel expenses for client meeting in Riyadh',
    approvalLevel: 1,
    totalLevels: 3,
  },
  {
    id: 'APP-003',
    type: 'purchase',
    title: 'Office Equipment Purchase',
    requester: 'محمد علي',
    department: 'IT',
    amount: 15000,
    currency: 'SAR',
    priority: 'medium',
    status: 'pending',
    requestDate: '2026-02-24',
    dueDate: '2026-03-01',
    description: 'شراء 5 أجهزة كمبيوتر محمولة للموظفين الجدد',
    approvalLevel: 2,
    totalLevels: 3,
  },
  {
    id: 'APP-004',
    type: 'project',
    title: 'New Website Development',
    requester: 'Fatima Hassan',
    department: 'Marketing',
    amount: 85000,
    currency: 'SAR',
    priority: 'urgent',
    status: 'pending',
    requestDate: '2026-02-27',
    dueDate: '2026-02-28',
    description: 'Approval for new company website development project',
    approvalLevel: 1,
    totalLevels: 4,
  },
  {
    id: 'APP-005',
    type: 'payment',
    title: 'Vendor Payment',
    requester: 'خالد أحمد',
    department: 'Finance',
    amount: 25000,
    currency: 'SAR',
    priority: 'high',
    status: 'pending',
    requestDate: '2026-02-26',
    dueDate: '2026-02-28',
    description: 'دفعة للمورد - فواتير شهر يناير',
    approvalLevel: 2,
    totalLevels: 2,
  },
];

export default function Approvals() {
  const { t, locale } = useLanguage();
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(MOCK_APPROVALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedApproval, setSelectedApproval] = useState<ApprovalRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const typeConfig = {
    leave: {
      icon: Calendar,
      color: 'bg-blue-500',
      label: { ar: 'إجازة', en: 'Leave' },
    },
    expense: {
      icon: DollarSign,
      color: 'bg-green-500',
      label: { ar: 'مصروف', en: 'Expense' },
    },
    purchase: {
      icon: ShoppingCart,
      color: 'bg-purple-500',
      label: { ar: 'شراء', en: 'Purchase' },
    },
    project: {
      icon: Briefcase,
      color: 'bg-orange-500',
      label: { ar: 'مشروع', en: 'Project' },
    },
    payment: {
      icon: FileText,
      color: 'bg-indigo-500',
      label: { ar: 'دفعة', en: 'Payment' },
    },
  };

  const priorityConfig = {
    low: {
      color: 'bg-gray-500',
      label: { ar: 'منخفضة', en: 'Low' },
    },
    medium: {
      color: 'bg-blue-500',
      label: { ar: 'متوسطة', en: 'Medium' },
    },
    high: {
      color: 'bg-orange-500',
      label: { ar: 'عالية', en: 'High' },
    },
    urgent: {
      color: 'bg-red-500',
      label: { ar: 'عاجلة', en: 'Urgent' },
    },
  };

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      label: { ar: 'معلق', en: 'Pending' },
    },
    approved: {
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      label: { ar: 'موافق عليه', en: 'Approved' },
    },
    rejected: {
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      label: { ar: 'مرفوض', en: 'Rejected' },
    },
  };

  const handleApprove = (id: string) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: 'approved' as const } : approval
      )
    );
    toast.success(locale === 'ar' ? 'تمت الموافقة بنجاح' : 'Approved successfully');
    setIsDetailsOpen(false);
  };

  const handleReject = (id: string) => {
    if (!rejectionNote.trim()) {
      toast.error(locale === 'ar' ? 'يرجى إدخال سبب الرفض' : 'Please enter rejection reason');
      return;
    }
    setApprovals(
      approvals.map((approval) =>
        approval.id === id ? { ...approval, status: 'rejected' as const } : approval
      )
    );
    toast.success(locale === 'ar' ? 'تم الرفض بنجاح' : 'Rejected successfully');
    setRejectionNote('');
    setIsDetailsOpen(false);
  };

  const handleViewDetails = (approval: ApprovalRequest) => {
    setSelectedApproval(approval);
    setIsDetailsOpen(true);
  };

  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || approval.type === filterType;
    const matchesPriority = filterPriority === 'all' || approval.priority === filterPriority;
    const matchesTab = activeTab === 'all' || approval.status === activeTab;
    return matchesSearch && matchesType && matchesPriority && matchesTab;
  });

  const stats = {
    pending: approvals.filter((a) => a.status === 'pending').length,
    approved: approvals.filter((a) => a.status === 'approved').length,
    rejected: approvals.filter((a) => a.status === 'rejected').length,
    urgent: approvals.filter((a) => a.priority === 'urgent' && a.status === 'pending').length,
  };

  const formatCurrency = (amount?: number, currency?: string) => {
    if (!amount) return '-';
    return `${amount.toLocaleString()} ${currency || 'SAR'}`;
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{locale === 'ar' ? 'الموافقات' : 'Approvals'}</h1>
        <p className="text-gray-500 mt-2">
          {locale === 'ar'
            ? 'إدارة ومراجعة جميع طلبات الموافقات المعلقة'
            : 'Manage and review all pending approval requests'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {locale === 'ar' ? 'معلقة' : 'Pending'}
                </p>
                <h3 className="text-3xl font-bold text-yellow-600">{stats.pending}</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {locale === 'ar' ? 'موافق عليها' : 'Approved'}
                </p>
                <h3 className="text-3xl font-bold text-green-600">{stats.approved}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {locale === 'ar' ? 'مرفوضة' : 'Rejected'}
                </p>
                <h3 className="text-3xl font-bold text-red-600">{stats.rejected}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {locale === 'ar' ? 'عاجلة' : 'Urgent'}
                </p>
                <h3 className="text-3xl font-bold text-orange-600">{stats.urgent}</h3>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'نوع الطلب' : 'Request Type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="leave">
                  {locale === 'ar' ? 'إجازة' : 'Leave'}
                </SelectItem>
                <SelectItem value="expense">
                  {locale === 'ar' ? 'مصروف' : 'Expense'}
                </SelectItem>
                <SelectItem value="purchase">
                  {locale === 'ar' ? 'شراء' : 'Purchase'}
                </SelectItem>
                <SelectItem value="project">
                  {locale === 'ar' ? 'مشروع' : 'Project'}
                </SelectItem>
                <SelectItem value="payment">
                  {locale === 'ar' ? 'دفعة' : 'Payment'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'الأولوية' : 'Priority'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="urgent">
                  {locale === 'ar' ? 'عاجلة' : 'Urgent'}
                </SelectItem>
                <SelectItem value="high">
                  {locale === 'ar' ? 'عالية' : 'High'}
                </SelectItem>
                <SelectItem value="medium">
                  {locale === 'ar' ? 'متوسطة' : 'Medium'}
                </SelectItem>
                <SelectItem value="low">
                  {locale === 'ar' ? 'منخفضة' : 'Low'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {locale === 'ar' ? 'مرشحات متقدمة' : 'Advanced Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            {locale === 'ar' ? 'الكل' : 'All'} ({approvals.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {locale === 'ar' ? 'معلقة' : 'Pending'} ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="approved">
            {locale === 'ar' ? 'موافق عليها' : 'Approved'} ({stats.approved})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {locale === 'ar' ? 'مرفوضة' : 'Rejected'} ({stats.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {locale === 'ar' ? 'طلبات الموافقة' : 'Approval Requests'} (
                {filteredApprovals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'رقم الطلب' : 'Request ID'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'العنوان' : 'Title'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'مقدم الطلب' : 'Requester'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'القسم' : 'Department'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الأولوية' : 'Priority'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الموعد النهائي' : 'Due Date'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApprovals.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                          {locale === 'ar' ? 'لا توجد طلبات' : 'No requests found'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredApprovals.map((approval) => {
                        const TypeIcon = typeConfig[approval.type].icon;
                        const daysRemaining = getDaysRemaining(approval.dueDate);
                        const isOverdue = daysRemaining < 0;

                        return (
                          <TableRow key={approval.id}>
                            <TableCell className="font-medium">{approval.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`p-2 rounded-full ${typeConfig[approval.type].color}`}
                                >
                                  <TypeIcon className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm">
                                  {typeConfig[approval.type].label[locale]}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{approval.title}</TableCell>
                            <TableCell>{approval.requester}</TableCell>
                            <TableCell>{approval.department}</TableCell>
                            <TableCell>{formatCurrency(approval.amount, approval.currency)}</TableCell>
                            <TableCell>
                              <Badge className={priorityConfig[approval.priority].color}>
                                {priorityConfig[approval.priority].label[locale]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${statusConfig[approval.status].color} text-white`}
                              >
                                {statusConfig[approval.status].label[locale]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{approval.dueDate}</span>
                                {approval.status === 'pending' && (
                                  <span
                                    className={`text-xs ${
                                      isOverdue ? 'text-red-600' : 'text-gray-500'
                                    }`}
                                  >
                                    {isOverdue
                                      ? locale === 'ar'
                                        ? 'متأخر'
                                        : 'Overdue'
                                      : `${Math.abs(daysRemaining)} ${
                                          locale === 'ar' ? 'أيام' : 'days'
                                        }`}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewDetails(approval)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {approval.status === 'pending' && (
                                  <>
                                    <Button
                                      variant="default"
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleApprove(approval.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedApproval(approval);
                                        setIsDetailsOpen(true);
                                      }}
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
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
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle>
              {locale === 'ar' ? 'تفاصيل الطلب' : 'Request Details'}
            </DialogTitle>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'رقم الطلب' : 'Request ID'}
                  </p>
                  <p className="font-medium">{selectedApproval.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'النوع' : 'Type'}
                  </p>
                  <Badge className={typeConfig[selectedApproval.type].color}>
                    {typeConfig[selectedApproval.type].label[locale]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'مقدم الطلب' : 'Requester'}
                  </p>
                  <p className="font-medium">{selectedApproval.requester}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'القسم' : 'Department'}
                  </p>
                  <p className="font-medium">{selectedApproval.department}</p>
                </div>
                {selectedApproval.amount && (
                  <div>
                    <p className="text-sm text-gray-500">
                      {locale === 'ar' ? 'المبلغ' : 'Amount'}
                    </p>
                    <p className="font-medium text-lg text-green-600">
                      {formatCurrency(selectedApproval.amount, selectedApproval.currency)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'الأولوية' : 'Priority'}
                  </p>
                  <Badge className={priorityConfig[selectedApproval.priority].color}>
                    {priorityConfig[selectedApproval.priority].label[locale]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'تاريخ الطلب' : 'Request Date'}
                  </p>
                  <p className="font-medium">{selectedApproval.requestDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {locale === 'ar' ? 'الموعد النهائي' : 'Due Date'}
                  </p>
                  <p className="font-medium">{selectedApproval.dueDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  {locale === 'ar' ? '��لوصف' : 'Description'}
                </p>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">
                  {selectedApproval.description}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">
                  {locale === 'ar' ? 'مستوى الموافقة' : 'Approval Level'}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (selectedApproval.approvalLevel / selectedApproval.totalLevels) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {selectedApproval.approvalLevel} / {selectedApproval.totalLevels}
                  </span>
                </div>
              </div>

              {selectedApproval.status === 'pending' && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">
                    {locale === 'ar' ? 'ملاحظات الرفض (اختياري)' : 'Rejection Notes (Optional)'}
                  </label>
                  <Textarea
                    value={rejectionNote}
                    onChange={(e) => setRejectionNote(e.target.value)}
                    placeholder={
                      locale === 'ar'
                        ? 'أدخل سبب الرفض...'
                        : 'Enter rejection reason...'
                    }
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              {locale === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
            {selectedApproval?.status === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(selectedApproval.id)}
                  className="gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  {locale === 'ar' ? 'رفض' : 'Reject'}
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 gap-2"
                  onClick={() => handleApprove(selectedApproval.id)}
                >
                  <CheckCircle className="h-4 w-4" />
                  {locale === 'ar' ? 'موافقة' : 'Approve'}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

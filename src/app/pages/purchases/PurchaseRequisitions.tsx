import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
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
  Search,
  Filter,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

interface PurchaseRequisition {
  id: string;
  number: string;
  date: string;
  requestedBy: string;
  department: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'converted';
  items: RequisitionItem[];
  totalAmount: number;
  notes: string;
}

interface RequisitionItem {
  id: string;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  estimatedPrice: number;
  totalPrice: number;
  requiredDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export default function PurchaseRequisitions() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<PurchaseRequisition | null>(null);

  // Mock data
  const requisitions: PurchaseRequisition[] = [
    {
      id: '1',
      number: 'PR-2024-001',
      date: '2024-02-28',
      requestedBy: 'أحمد محمد',
      department: 'تقنية المعلومات',
      status: 'submitted',
      items: [
        {
          id: '1',
          itemName: 'أجهزة كمبيوتر محمولة',
          description: 'Dell Latitude 5420, Core i7, 16GB RAM',
          quantity: 5,
          unit: 'قطعة',
          estimatedPrice: 3500,
          totalPrice: 17500,
          requiredDate: '2024-03-15',
          priority: 'high',
        },
      ],
      totalAmount: 17500,
      notes: 'مطلوب بشكل عاجل لفريق التطوير الجديد',
    },
    {
      id: '2',
      number: 'PR-2024-002',
      date: '2024-02-27',
      requestedBy: 'فاطمة علي',
      department: 'الموارد البشرية',
      status: 'approved',
      items: [
        {
          id: '2',
          itemName: 'أثاث مكتبي',
          description: 'مكاتب وكراسي للموظفين الجدد',
          quantity: 10,
          unit: 'طقم',
          estimatedPrice: 1200,
          totalPrice: 12000,
          requiredDate: '2024-03-20',
          priority: 'medium',
        },
      ],
      totalAmount: 12000,
      notes: '',
    },
    {
      id: '3',
      number: 'PR-2024-003',
      date: '2024-02-26',
      requestedBy: 'خالد أحمد',
      department: 'المبيعات',
      status: 'draft',
      items: [],
      totalAmount: 0,
      notes: '',
    },
  ];

  const getStatusBadge = (status: PurchaseRequisition['status']) => {
    const statusConfig = {
      draft: { 
        label: locale === 'ar' ? 'مسودة' : 'Draft', 
        variant: 'secondary' as const,
        icon: FileText,
      },
      submitted: { 
        label: locale === 'ar' ? 'مقدم' : 'Submitted', 
        variant: 'default' as const,
        icon: Clock,
      },
      approved: { 
        label: locale === 'ar' ? 'موافق عليه' : 'Approved', 
        variant: 'default' as const,
        icon: CheckCircle,
        className: 'bg-green-600',
      },
      rejected: { 
        label: locale === 'ar' ? 'مرفوض' : 'Rejected', 
        variant: 'destructive' as const,
        icon: XCircle,
      },
      converted: { 
        label: locale === 'ar' ? 'تم التحويل' : 'Converted', 
        variant: 'default' as const,
        icon: CheckCircle,
        className: 'bg-blue-600',
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: RequisitionItem['priority']) => {
    const priorityConfig = {
      low: { label: locale === 'ar' ? 'منخفض' : 'Low', className: 'bg-gray-500' },
      medium: { label: locale === 'ar' ? 'متوسط' : 'Medium', className: 'bg-blue-500' },
      high: { label: locale === 'ar' ? 'عالي' : 'High', className: 'bg-orange-500' },
      urgent: { label: locale === 'ar' ? 'عاجل' : 'Urgent', className: 'bg-red-600' },
    };

    const config = priorityConfig[priority];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleSubmit = (id: string) => {
    toast.success(locale === 'ar' ? 'تم إرسال الطلب بنجاح' : 'Requisition submitted successfully');
  };

  const handleApprove = (id: string) => {
    toast.success(locale === 'ar' ? 'تمت الموافقة على الطلب' : 'Requisition approved');
  };

  const handleReject = (id: string) => {
    toast.error(locale === 'ar' ? 'تم رفض الطلب' : 'Requisition rejected');
  };

  const handleConvertToPO = (id: string) => {
    toast.success(locale === 'ar' ? 'تم التحويل إلى أمر شراء' : 'Converted to purchase order');
  };

  const filteredRequisitions = requisitions.filter(req => {
    const matchesSearch = req.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.requestedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'طلبات الشراء' : 'Purchase Requisitions'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة طلبات الشراء الداخلية' : 'Manage internal purchase requests'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'طلب شراء جديد' : 'New Requisition'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إنشاء طلب شراء جديد' : 'Create New Requisition'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'أدخل تفاصيل الطلب' : 'Enter requisition details'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'القسم' : 'Department'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر القسم' : 'Select department'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">{locale === 'ar' ? 'تقنية المعلومات' : 'IT'}</SelectItem>
                      <SelectItem value="hr">{locale === 'ar' ? 'الموارد البشرية' : 'HR'}</SelectItem>
                      <SelectItem value="sales">{locale === 'ar' ? 'المبيعات' : 'Sales'}</SelectItem>
                      <SelectItem value="ops">{locale === 'ar' ? 'العمليات' : 'Operations'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'التاريخ المطلوب' : 'Required Date'}</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الملاحظات' : 'Notes'}</Label>
                <Textarea 
                  placeholder={locale === 'ar' ? 'أضف ملاحظات...' : 'Add notes...'}
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{locale === 'ar' ? 'الأصناف' : 'Items'}</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    {locale === 'ar' ? 'إضافة صنف' : 'Add Item'}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-sm font-medium text-muted-foreground">
                    <div>{locale === 'ar' ? 'الصنف' : 'Item'}</div>
                    <div>{locale === 'ar' ? 'الكمية' : 'Quantity'}</div>
                    <div>{locale === 'ar' ? 'الوحدة' : 'Unit'}</div>
                    <div>{locale === 'ar' ? 'السعر التقديري' : 'Est. Price'}</div>
                    <div>{locale === 'ar' ? 'الأولوية' : 'Priority'}</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center text-muted-foreground">
                    {locale === 'ar' ? 'لم تتم إضافة أصناف بعد' : 'No items added yet'}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم حفظ الطلب كمسودة' : 'Requisition saved as draft');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم إرسال الطلب' : 'Requisition submitted');
                setIsCreateOpen(false);
              }}>
                <Send className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'إرسال' : 'Submit'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Status'}</SelectItem>
                <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="submitted">{locale === 'ar' ? 'مقدم' : 'Submitted'}</SelectItem>
                <SelectItem value="approved">{locale === 'ar' ? 'موافق عليه' : 'Approved'}</SelectItem>
                <SelectItem value="rejected">{locale === 'ar' ? 'مرفوض' : 'Rejected'}</SelectItem>
                <SelectItem value="converted">{locale === 'ar' ? 'تم التحويل' : 'Converted'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الطلب' : 'Requisition #'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'مقدم الطلب' : 'Requested By'}</TableHead>
                <TableHead>{locale === 'ar' ? 'القسم' : 'Department'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'القيمة الإجمالية' : 'Total Amount'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequisitions.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.number}</TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell>{req.requestedBy}</TableCell>
                  <TableCell>{req.department}</TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(req.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {req.status === 'draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSubmit(req.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      {req.status === 'submitted' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(req.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReject(req.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {req.status === 'approved' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleConvertToPO(req.id)}
                        >
                          {locale === 'ar' ? 'تحويل' : 'Convert'}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
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

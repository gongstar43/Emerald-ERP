import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  PackageCheck,
  Plus,
  Search,
  Eye,
  Edit,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
} from 'lucide-react';

const mockReceipts = [
  {
    id: 'GR-2024-001',
    poId: 'PO-2024-015',
    supplier: 'شركة التوريدات المتقدمة',
    receiptDate: '2024-02-20',
    status: 'completed',
    items: 5,
    orderedQty: 100,
    receivedQty: 100,
    acceptedQty: 95,
    rejectedQty: 5,
    warehouse: 'المستودع الرئيسي',
    inspector: 'أحمد محمد',
  },
  {
    id: 'GR-2024-002',
    poId: 'PO-2024-018',
    supplier: 'مؤسسة الإمدادات الصناعية',
    receiptDate: '2024-02-22',
    status: 'in_inspection',
    items: 3,
    orderedQty: 50,
    receivedQty: 50,
    acceptedQty: 0,
    rejectedQty: 0,
    warehouse: 'مستودع الفرع',
    inspector: 'خالد علي',
  },
  {
    id: 'GR-2024-003',
    poId: 'PO-2024-020',
    supplier: 'شركة المواد الأولية',
    receiptDate: '2024-02-25',
    status: 'pending',
    items: 8,
    orderedQty: 200,
    receivedQty: 180,
    acceptedQty: 0,
    rejectedQty: 0,
    warehouse: 'المستودع الرئيسي',
    inspector: null,
  },
];

export default function GoodsReceipt() {
  const { locale } = useLanguage();
  const [receipts, setReceipts] = useState(mockReceipts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translations = {
    ar: {
      title: 'استلام البضائع',
      subtitle: 'إدارة عمليات استلام وفحص البضائع - ISO 9001',
      addReceipt: 'استلام جديد',
      search: 'بحث...',
      status: 'الحالة',
      all: 'الكل',
      pending: 'قيد الانتظار',
      inInspection: 'قيد الفحص',
      completed: 'مكتمل',
      rejected: 'مرفوض',
      receiptId: 'رقم الاستلام',
      poId: 'رقم أمر الشراء',
      supplier: 'المورد',
      receiptDate: 'تاريخ الاستلام',
      items: 'الأصناف',
      orderedQty: 'الكمية المطلوبة',
      receivedQty: 'الكمية المستلمة',
      acceptedQty: 'الكمية المقبولة',
      rejectedQty: 'الكمية المرفوضة',
      warehouse: 'المستودع',
      inspector: 'المفتش',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      totalReceipts: 'إجمالي الاستلامات',
      pendingInspection: 'قيد الفحص',
      completedToday: 'مكتملة اليوم',
      acceptanceRate: 'معدل القبول',
    },
    en: {
      title: 'Goods Receipt',
      subtitle: 'Manage Goods Receipt and Inspection - ISO 9001',
      addReceipt: 'New Receipt',
      search: 'Search...',
      status: 'Status',
      all: 'All',
      pending: 'Pending',
      inInspection: 'In Inspection',
      completed: 'Completed',
      rejected: 'Rejected',
      receiptId: 'Receipt ID',
      poId: 'PO ID',
      supplier: 'Supplier',
      receiptDate: 'Receipt Date',
      items: 'Items',
      orderedQty: 'Ordered Qty',
      receivedQty: 'Received Qty',
      acceptedQty: 'Accepted Qty',
      rejectedQty: 'Rejected Qty',
      warehouse: 'Warehouse',
      inspector: 'Inspector',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      totalReceipts: 'Total Receipts',
      pendingInspection: 'Pending Inspection',
      completedToday: 'Completed Today',
      acceptanceRate: 'Acceptance Rate',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('pending'), variant: 'outline' as const, icon: Clock },
      in_inspection: { label: t('inInspection'), variant: 'secondary' as const, icon: AlertTriangle },
      completed: { label: t('completed'), variant: 'default' as const, icon: CheckCircle },
      rejected: { label: t('rejected'), variant: 'destructive' as const, icon: AlertTriangle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = 
      receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.poId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || receipt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = receipts.filter(r => r.status === 'in_inspection').length;
  const completedToday = receipts.filter(r => 
    r.status === 'completed' && r.receiptDate === new Date().toISOString().split('T')[0]
  ).length;
  const totalAccepted = receipts.reduce((sum, r) => sum + r.acceptedQty, 0);
  const totalReceived = receipts.reduce((sum, r) => sum + r.receivedQty, 0);
  const acceptanceRate = totalReceived > 0 ? (totalAccepted / totalReceived) * 100 : 0;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <PackageCheck className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
        <Badge className="bg-green-600 text-white">ISO 9001</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalReceipts')}</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('pendingInspection')}</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('completedToday')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('acceptanceRate')}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptanceRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all')}</SelectItem>
                  <SelectItem value="pending">{t('pending')}</SelectItem>
                  <SelectItem value="in_inspection">{t('inInspection')}</SelectItem>
                  <SelectItem value="completed">{t('completed')}</SelectItem>
                  <SelectItem value="rejected">{t('rejected')}</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addReceipt')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('receiptId')}</TableHead>
                <TableHead>{t('poId')}</TableHead>
                <TableHead>{t('supplier')}</TableHead>
                <TableHead>{t('receiptDate')}</TableHead>
                <TableHead>{t('items')}</TableHead>
                <TableHead>{t('receivedQty')}</TableHead>
                <TableHead>{t('acceptedQty')}</TableHead>
                <TableHead>{t('rejectedQty')}</TableHead>
                <TableHead>{t('warehouse')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell className="font-medium">{receipt.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {receipt.poId}
                    </div>
                  </TableCell>
                  <TableCell>{receipt.supplier}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {receipt.receiptDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {receipt.items}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{receipt.receivedQty}</div>
                      <div className="text-xs text-muted-foreground">
                        / {receipt.orderedQty}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-green-600 font-medium">{receipt.acceptedQty}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-red-600 font-medium">{receipt.rejectedQty}</div>
                  </TableCell>
                  <TableCell>{receipt.warehouse}</TableCell>
                  <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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

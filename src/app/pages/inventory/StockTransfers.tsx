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
  Truck,
  MapPin,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

interface StockTransfer {
  id: string;
  transferNumber: string;
  date: string;
  fromWarehouse: string;
  toWarehouse: string;
  status: 'draft' | 'pending' | 'in_transit' | 'received' | 'cancelled';
  items: TransferItem[];
  totalQuantity: number;
  requestedBy: string;
  notes: string;
  createdAt: string;
  receivedAt?: string;
}

interface TransferItem {
  id: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  serialNumbers?: string[];
  batchNumber?: string;
}

export default function StockTransfers() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock data
  const transfers: StockTransfer[] = [
    {
      id: '1',
      transferNumber: 'STR-2024-001',
      date: '2024-02-28',
      fromWarehouse: 'مستودع الرياض الرئيسي',
      toWarehouse: 'فرع جدة',
      status: 'in_transit',
      items: [
        {
          id: '1',
          itemCode: 'ITM-001',
          itemName: 'كمبيوتر محمول Dell',
          quantity: 10,
          unit: 'قطعة',
        },
        {
          id: '2',
          itemCode: 'ITM-002',
          itemName: 'طابعة HP LaserJet',
          quantity: 5,
          unit: 'قطعة',
        },
      ],
      totalQuantity: 15,
      requestedBy: 'أحمد محمد',
      notes: 'تحويل عاجل لتلبية احتياجات الفرع',
      createdAt: '2024-02-28 10:30',
    },
    {
      id: '2',
      transferNumber: 'STR-2024-002',
      date: '2024-02-27',
      fromWarehouse: 'فرع الدمام',
      toWarehouse: 'مستودع الرياض الرئيسي',
      status: 'received',
      items: [
        {
          id: '3',
          itemCode: 'ITM-005',
          itemName: 'أثاث مكتبي',
          quantity: 20,
          unit: 'طقم',
        },
      ],
      totalQuantity: 20,
      requestedBy: 'فاطمة علي',
      notes: 'مرتجع فائض',
      createdAt: '2024-02-27 14:20',
      receivedAt: '2024-02-28 09:15',
    },
  ];

  const getStatusBadge = (status: StockTransfer['status']) => {
    const statusConfig = {
      draft: {
        label: locale === 'ar' ? 'مسودة' : 'Draft',
        variant: 'secondary' as const,
        icon: Edit,
      },
      pending: {
        label: locale === 'ar' ? 'معلق' : 'Pending',
        variant: 'default' as const,
        icon: Clock,
      },
      in_transit: {
        label: locale === 'ar' ? 'في الطريق' : 'In Transit',
        variant: 'default' as const,
        icon: Truck,
        className: 'bg-blue-600',
      },
      received: {
        label: locale === 'ar' ? 'مستلم' : 'Received',
        variant: 'default' as const,
        icon: CheckCircle,
        className: 'bg-green-600',
      },
      cancelled: {
        label: locale === 'ar' ? 'ملغي' : 'Cancelled',
        variant: 'destructive' as const,
        icon: XCircle,
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

  const handleSend = (id: string) => {
    toast.success(locale === 'ar' ? 'تم إرسال التحويل' : 'Transfer sent');
  };

  const handleReceive = (id: string) => {
    toast.success(locale === 'ar' ? 'تم استلام التحويل' : 'Transfer received');
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.transferNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.fromWarehouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transfer.toWarehouse.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تحويلات المخزون' : 'Stock Transfers'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة التحويلات بين المستودعات' : 'Manage transfers between warehouses'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'تحويل جديد' : 'New Transfer'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إنشاء تحويل مخزون جديد' : 'Create New Stock Transfer'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'أدخل تفاصيل التحويل' : 'Enter transfer details'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'من مستودع' : 'From Warehouse'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر المستودع' : 'Select warehouse'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wh1">{locale === 'ar' ? 'مستودع الرياض الرئيسي' : 'Riyadh Main Warehouse'}</SelectItem>
                      <SelectItem value="wh2">{locale === 'ar' ? 'فرع جدة' : 'Jeddah Branch'}</SelectItem>
                      <SelectItem value="wh3">{locale === 'ar' ? 'فرع الدمام' : 'Dammam Branch'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'إلى مستودع' : 'To Warehouse'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر المستودع' : 'Select warehouse'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wh1">{locale === 'ar' ? 'مستودع الرياض الرئيسي' : 'Riyadh Main Warehouse'}</SelectItem>
                      <SelectItem value="wh2">{locale === 'ar' ? 'فرع جدة' : 'Jeddah Branch'}</SelectItem>
                      <SelectItem value="wh3">{locale === 'ar' ? 'فرع الدمام' : 'Dammam Branch'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'تاريخ التحويل' : 'Transfer Date'}</Label>
                <Input type="date" />
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
                
                <div className="border rounded-lg p-4 text-center text-muted-foreground">
                  {locale === 'ar' ? 'لم تتم إضافة أصناف بعد' : 'No items added yet'}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم حفظ التحويل كمسودة' : 'Transfer saved as draft');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تم إرسال التحويل' : 'Transfer sent');
                setIsCreateOpen(false);
              }}>
                <Send className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'إرسال' : 'Send'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'في الطريق' : 'In Transit'}</div>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'معلق' : 'Pending'}</div>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'مستلم اليوم' : 'Received Today'}</div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{locale === 'ar' ? 'هذا الشهر' : 'This Month'}</div>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
          </CardContent>
        </Card>
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
                <SelectItem value="pending">{locale === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                <SelectItem value="in_transit">{locale === 'ar' ? 'في الطريق' : 'In Transit'}</SelectItem>
                <SelectItem value="received">{locale === 'ar' ? 'مستلم' : 'Received'}</SelectItem>
                <SelectItem value="cancelled">{locale === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
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
                <TableHead>{locale === 'ar' ? 'رقم التحويل' : 'Transfer #'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'من' : 'From'}</TableHead>
                <TableHead>{locale === 'ar' ? 'إلى' : 'To'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الكمية' : 'Quantity'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="font-medium">{transfer.transferNumber}</TableCell>
                  <TableCell>{transfer.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {transfer.fromWarehouse}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {transfer.toWarehouse}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {transfer.totalQuantity}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {transfer.status === 'in_transit' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReceive(transfer.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {transfer.status === 'draft' && (
                        <>
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
                        </>
                      )}
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

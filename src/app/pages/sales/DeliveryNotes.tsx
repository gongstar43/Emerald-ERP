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
  Truck,
  Plus,
  Search,
  Eye,
  Edit,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  Package,
  MapPin,
} from 'lucide-react';

const mockDeliveryNotes = [
  {
    id: 'DN-2024-001',
    orderId: 'SO-2024-015',
    customer: 'شركة الأمل التجارية',
    deliveryDate: '2024-02-20',
    deliveryAddress: 'الرياض، حي الملك فهد، شارع العليا',
    status: 'delivered',
    items: 5,
    signature: 'محمد أحمد',
    createdAt: '2024-02-19',
  },
  {
    id: 'DN-2024-002',
    orderId: 'SO-2024-018',
    customer: 'مؤسسة النجاح',
    deliveryDate: '2024-02-22',
    deliveryAddress: 'جدة، حي الروضة، شارع الأمير سلطان',
    status: 'in_transit',
    items: 3,
    signature: null,
    createdAt: '2024-02-21',
  },
  {
    id: 'DN-2024-003',
    orderId: 'SO-2024-020',
    customer: 'شركة التقنية المتطورة',
    deliveryDate: '2024-02-25',
    deliveryAddress: 'الدمام، حي الشاطئ، طريق الملك فهد',
    status: 'pending',
    items: 8,
    signature: null,
    createdAt: '2024-02-23',
  },
];

export default function DeliveryNotes() {
  const { locale } = useLanguage();
  const [deliveryNotes, setDeliveryNotes] = useState(mockDeliveryNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translations = {
    ar: {
      title: 'إشعارات التسليم',
      subtitle: 'إدارة عمليات التسليم والشحن',
      addNote: 'إشعار جديد',
      search: 'بحث...',
      status: 'الحالة',
      all: 'الكل',
      pending: 'قيد الانتظار',
      inTransit: 'قيد النقل',
      delivered: 'تم التسليم',
      noteId: 'رقم الإشعار',
      orderId: 'رقم الطلب',
      customer: 'العميل',
      deliveryDate: 'تاريخ التسليم',
      deliveryAddress: 'عنوان التسليم',
      items: 'الأصناف',
      signature: 'التوقيع',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      totalNotes: 'إجمالي الإشعارات',
      pendingDeliveries: 'قيد الانتظار',
      completedToday: 'تم اليوم',
    },
    en: {
      title: 'Delivery Notes',
      subtitle: 'Manage Delivery and Shipping Operations',
      addNote: 'New Note',
      search: 'Search...',
      status: 'Status',
      all: 'All',
      pending: 'Pending',
      inTransit: 'In Transit',
      delivered: 'Delivered',
      noteId: 'Note ID',
      orderId: 'Order ID',
      customer: 'Customer',
      deliveryDate: 'Delivery Date',
      deliveryAddress: 'Delivery Address',
      items: 'Items',
      signature: 'Signature',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      totalNotes: 'Total Notes',
      pendingDeliveries: 'Pending',
      completedToday: 'Completed Today',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('pending'), variant: 'outline' as const, icon: Clock },
      in_transit: { label: t('inTransit'), variant: 'secondary' as const, icon: Truck },
      delivered: { label: t('delivered'), variant: 'default' as const, icon: CheckCircle },
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

  const filteredNotes = deliveryNotes.filter(note => {
    const matchesSearch = 
      note.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = deliveryNotes.filter(n => n.status === 'pending').length;
  const deliveredToday = deliveryNotes.filter(n => 
    n.status === 'delivered' && n.deliveryDate === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalNotes')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryNotes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('pendingDeliveries')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
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
            <div className="text-2xl font-bold">{deliveredToday}</div>
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
                  <SelectItem value="in_transit">{t('inTransit')}</SelectItem>
                  <SelectItem value="delivered">{t('delivered')}</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addNote')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('noteId')}</TableHead>
                <TableHead>{t('orderId')}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('deliveryDate')}</TableHead>
                <TableHead>{t('deliveryAddress')}</TableHead>
                <TableHead>{t('items')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('signature')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="font-medium">{note.id}</TableCell>
                  <TableCell>{note.orderId}</TableCell>
                  <TableCell>{note.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {note.deliveryDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{note.deliveryAddress}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {note.items}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(note.status)}</TableCell>
                  <TableCell>
                    {note.signature ? (
                      <span className="text-sm font-medium">{note.signature}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
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

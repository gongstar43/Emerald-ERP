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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Plus,
  Search,
  Barcode,
  QrCode,
  Eye,
  MapPin,
  Calendar,
  Package,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

interface SerialNumber {
  id: string;
  serialNumber: string;
  itemCode: string;
  itemName: string;
  status: 'available' | 'sold' | 'reserved' | 'damaged' | 'returned';
  warehouse: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  sellDate?: string;
  sellPrice?: number;
  warrantyExpiry?: string;
  customer?: string;
  notes?: string;
}

export default function SerialNumbers() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSerial, setSelectedSerial] = useState<SerialNumber | null>(null);

  // Mock data
  const serialNumbers: SerialNumber[] = [
    {
      id: '1',
      serialNumber: 'SN-2024-001234',
      itemCode: 'LAP-001',
      itemName: 'Dell Laptop XPS 15',
      status: 'available',
      warehouse: 'مستودع الرياض',
      location: 'A-01-05',
      purchaseDate: '2024-01-15',
      purchasePrice: 4500,
      warrantyExpiry: '2026-01-15',
    },
    {
      id: '2',
      serialNumber: 'SN-2024-001235',
      itemCode: 'LAP-001',
      itemName: 'Dell Laptop XPS 15',
      status: 'sold',
      warehouse: 'مستودع الرياض',
      location: '-',
      purchaseDate: '2024-01-15',
      purchasePrice: 4500,
      sellDate: '2024-02-20',
      sellPrice: 5200,
      warrantyExpiry: '2026-01-15',
      customer: 'شركة المستقبل',
    },
    {
      id: '3',
      serialNumber: 'SN-2024-001236',
      itemCode: 'LAP-001',
      itemName: 'Dell Laptop XPS 15',
      status: 'reserved',
      warehouse: 'مستودع الرياض',
      location: 'A-01-05',
      purchaseDate: '2024-01-15',
      purchasePrice: 4500,
      warrantyExpiry: '2026-01-15',
      customer: 'شركة الابتكار',
    },
    {
      id: '4',
      serialNumber: 'SN-2024-001237',
      itemCode: 'PRN-001',
      itemName: 'HP LaserJet Pro',
      status: 'damaged',
      warehouse: 'مستودع الرياض',
      location: 'QC-Zone',
      purchaseDate: '2024-02-01',
      purchasePrice: 1200,
      warrantyExpiry: '2025-02-01',
      notes: 'تلف أثناء النقل',
    },
  ];

  const getStatusBadge = (status: SerialNumber['status']) => {
    const statusConfig = {
      available: { label: locale === 'ar' ? 'متاح' : 'Available', className: 'bg-green-600' },
      sold: { label: locale === 'ar' ? 'مباع' : 'Sold', className: 'bg-blue-600' },
      reserved: { label: locale === 'ar' ? 'محجوز' : 'Reserved', className: 'bg-orange-600' },
      damaged: { label: locale === 'ar' ? 'تالف' : 'Damaged', className: 'bg-red-600' },
      returned: { label: locale === 'ar' ? 'مرتجع' : 'Returned', className: 'bg-purple-600' },
    };
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const availableCount = serialNumbers.filter(s => s.status === 'available').length;
  const soldCount = serialNumbers.filter(s => s.status === 'sold').length;
  const reservedCount = serialNumbers.filter(s => s.status === 'reserved').length;
  const damagedCount = serialNumbers.filter(s => s.status === 'damaged').length;

  const filteredSerials = serialNumbers.filter(serial => {
    const matchesSearch = serial.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         serial.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || serial.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الأرقام التسلسلية' : 'Serial Numbers'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'تتبع وإدارة الأرقام التسلسلية للأصناف' : 'Track and manage item serial numbers'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'رقم تسلسلي جديد' : 'New Serial Number'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إضافة رقم تسلسلي' : 'Add Serial Number'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'املأ معلومات الرقم التسلسلي' : 'Fill in serial number information'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الرقم التسلسلي' : 'Serial Number'}</Label>
                <div className="flex gap-2">
                  <Input placeholder="SN-XXXX-XXXXXX" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <Barcode className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الصنف' : 'Item'}</Label>
                <Input placeholder={locale === 'ar' ? 'اختر الصنف' : 'Select item'} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'المستودع' : 'Warehouse'}</Label>
                  <Input placeholder={locale === 'ar' ? 'اختر المستودع' : 'Select warehouse'} />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الموقع' : 'Location'}</Label>
                  <Input placeholder="A-01-05" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'تاريخ الشراء' : 'Purchase Date'}</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'سعر الشراء' : 'Purchase Price'}</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'تاريخ انتهاء الضمان' : 'Warranty Expiry'}</Label>
                <Input type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تمت الإضافة بنجاح' : 'Serial number added successfully');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'متاح' : 'Available'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'مباع' : 'Sold'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'محجوز' : 'Reserved'}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'تالف' : 'Damaged'}
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{damagedCount}</div>
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
                placeholder={locale === 'ar' ? 'بحث برقم تسلسلي أو اسم صنف...' : 'Search by serial or item name...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Status'}</option>
              <option value="available">{locale === 'ar' ? 'متاح' : 'Available'}</option>
              <option value="sold">{locale === 'ar' ? 'مباع' : 'Sold'}</option>
              <option value="reserved">{locale === 'ar' ? 'محجوز' : 'Reserved'}</option>
              <option value="damaged">{locale === 'ar' ? 'تالف' : 'Damaged'}</option>
              <option value="returned">{locale === 'ar' ? 'مرتجع' : 'Returned'}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Serial Numbers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الرقم التسلسلي' : 'Serial Number'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الموقع' : 'Location'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{locale === 'ar' ? 'تاريخ الشراء' : 'Purchase Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الضمان' : 'Warranty'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSerials.map((serial) => (
                <TableRow key={serial.id}>
                  <TableCell className="font-mono font-medium">
                    <div className="flex items-center gap-2">
                      <Barcode className="h-4 w-4 text-muted-foreground" />
                      {serial.serialNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{serial.itemName}</p>
                      <p className="text-xs text-muted-foreground">{serial.itemCode}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{serial.warehouse}</p>
                        <p className="text-xs text-muted-foreground">{serial.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(serial.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {serial.purchaseDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {serial.warrantyExpiry && (
                      <div className="text-sm">
                        {new Date(serial.warrantyExpiry) > new Date() ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {serial.warrantyExpiry}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {locale === 'ar' ? 'منتهي' : 'Expired'}
                          </Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedSerial(serial)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Serial Details Dialog */}
      {selectedSerial && (
        <Dialog open={!!selectedSerial} onOpenChange={() => setSelectedSerial(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Barcode className="h-5 w-5" />
                {selectedSerial.serialNumber}
              </DialogTitle>
              <DialogDescription>{selectedSerial.itemName}</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">{locale === 'ar' ? 'التفاصيل' : 'Details'}</TabsTrigger>
                <TabsTrigger value="history">{locale === 'ar' ? 'السجل' : 'History'}</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'الحالة' : 'Status'}</CardTitle>
                    </CardHeader>
                    <CardContent>{getStatusBadge(selectedSerial.status)}</CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'الموقع' : 'Location'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{selectedSerial.warehouse}</p>
                      <p className="text-sm text-muted-foreground">{selectedSerial.location}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'تاريخ الشراء' : 'Purchase Date'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{selectedSerial.purchaseDate}</p>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'ar' ? 'السعر:' : 'Price:'} {selectedSerial.purchasePrice.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>

                  {selectedSerial.sellDate && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{locale === 'ar' ? 'تاريخ البيع' : 'Sell Date'}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{selectedSerial.sellDate}</p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? 'السعر:' : 'Price:'} {selectedSerial.sellPrice?.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {selectedSerial.customer && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'العميل' : 'Customer'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{selectedSerial.customer}</p>
                    </CardContent>
                  </Card>
                )}

                {selectedSerial.notes && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{selectedSerial.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history">
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{locale === 'ar' ? 'سجل الحركات' : 'Movement History'}</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

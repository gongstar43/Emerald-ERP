import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
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
import { Textarea } from '../components/ui/textarea';
import { Plus, Warehouse, Eye, Edit, Trash2, MapPin, Package } from 'lucide-react';
import { toast } from 'sonner';

interface WarehouseItem {
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  location: string;
}

interface WarehouseData {
  id: string;
  code: string;
  name: string;
  location: string;
  address: string;
  capacity: number;
  manager: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'maintenance';
  items: WarehouseItem[];
  notes: string;
}

export default function Warehouses() {
  const { t, locale } = useLanguage();
  const [warehouses, setWarehouses] = useState<WarehouseData[]>([
    {
      id: '1',
      code: 'WH-001',
      name: 'المستودع الرئيسي',
      location: 'الرياض - حي الملقا',
      address: 'طريق الملك فهد، حي الملقا، الرياض 12382',
      capacity: 10000,
      manager: 'أحمد محمد العلي',
      phone: '0501234567',
      email: 'ahmed@company.com',
      status: 'active',
      items: [
        { itemCode: 'IT-001', itemName: 'أجهزة كمبيوتر محمولة', quantity: 45, unit: 'جهاز', location: 'رف A-12' },
        { itemCode: 'IT-002', itemName: 'شاشات مكتبية', quantity: 78, unit: 'قطعة', location: 'رف B-05' },
        { itemCode: 'ST-001', itemName: 'ورق طباعة A4', quantity: 250, unit: 'رزمة', location: 'رف C-20' },
      ],
      notes: 'المستودع الرئيسي لجميع الأصناف',
    },
    {
      id: '2',
      code: 'WH-002',
      name: 'مستودع جدة',
      location: 'جدة - حي الزهراء',
      address: 'شارع الأمير محمد بن عبدالعزيز، حي الزهراء، جدة 23425',
      capacity: 5000,
      manager: 'خالد أحمد السالم',
      phone: '0509876543',
      email: 'khaled@company.com',
      status: 'active',
      items: [
        { itemCode: 'IT-001', itemName: 'أجهزة كمبيوتر محمولة', quantity: 20, unit: 'جهاز', location: 'رف A-05' },
        { itemCode: 'ST-001', itemName: 'ورق طباعة A4', quantity: 100, unit: 'رزمة', location: 'رف B-10' },
      ],
      notes: 'مستودع فرعي للمنطقة الغربية',
    },
  ]);

  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    location: '',
    address: '',
    capacity: 0,
    manager: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleViewWarehouse = (warehouse: WarehouseData) => {
    setSelectedWarehouse(warehouse);
    setIsViewDialogOpen(true);
  };

  const handleEditWarehouse = (warehouse: WarehouseData) => {
    setSelectedWarehouse(warehouse);
    setFormData({
      code: warehouse.code,
      name: warehouse.name,
      location: warehouse.location,
      address: warehouse.address,
      capacity: warehouse.capacity,
      manager: warehouse.manager,
      phone: warehouse.phone,
      email: warehouse.email,
      notes: warehouse.notes,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteWarehouse = (id: string) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status as keyof typeof colors] || colors.active;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      active: locale === 'ar' ? 'نشط' : 'Active',
      inactive: locale === 'ar' ? 'غير نشط' : 'Inactive',
      maintenance: locale === 'ar' ? 'صيانة' : 'Maintenance',
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const getTotalItems = (items: WarehouseItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCapacityPercentage = (items: WarehouseItem[], capacity: number) => {
    const total = getTotalItems(items);
    return Math.round((total / capacity) * 100);
  };

  const handleSaveWarehouse = () => {
    const newWarehouse: WarehouseData = {
      id: String(Date.now()),
      code: formData.code,
      name: formData.name,
      location: formData.location,
      address: formData.address,
      capacity: formData.capacity,
      manager: formData.manager,
      phone: formData.phone,
      email: formData.email,
      status: 'active',
      items: [],
      notes: formData.notes,
    };

    if (isEditDialogOpen && selectedWarehouse) {
      setWarehouses(warehouses.map(w => 
        w.id === selectedWarehouse.id 
          ? { ...newWarehouse, id: selectedWarehouse.id, items: selectedWarehouse.items }
          : w
      ));
      setIsEditDialogOpen(false);
    } else {
      setWarehouses([...warehouses, newWarehouse]);
      setIsCreateDialogOpen(false);
    }

    setFormData({
      code: '',
      name: '',
      location: '',
      address: '',
      capacity: 0,
      manager: '',
      phone: '',
      email: '',
      notes: '',
    });
    toast.success(t('savedSuccessfully'));
  };

  const filteredWarehouses = warehouses.filter(w =>
    w.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('warehouses')}</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('add')}
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWarehouses.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground p-8">
            {t('noData')}
          </div>
        ) : (
          filteredWarehouses.map((warehouse) => (
            <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Warehouse className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(warehouse.status)}`}>
                    {getStatusText(warehouse.status)}
                  </span>
                </div>
                <CardDescription>{warehouse.code}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{warehouse.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>
                      {getTotalItems(warehouse.items)} / {warehouse.capacity} {locale === 'ar' ? 'قطعة' : 'items'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{locale === 'ar' ? 'السعة' : 'Capacity'}</span>
                    <span className="font-medium">{getCapacityPercentage(warehouse.items, warehouse.capacity)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        getCapacityPercentage(warehouse.items, warehouse.capacity) > 80
                          ? 'bg-red-600'
                          : getCapacityPercentage(warehouse.items, warehouse.capacity) > 60
                          ? 'bg-yellow-600'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${getCapacityPercentage(warehouse.items, warehouse.capacity)}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewWarehouse(warehouse)}>
                    <Eye className="h-4 w-4 mr-2" />
                    {t('view')}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditWarehouse(warehouse)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteWarehouse(warehouse.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedWarehouse?.name}</DialogTitle>
          </DialogHeader>
          {selectedWarehouse && (
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الكود' : 'Code'}</p>
                  <p className="font-semibold">{selectedWarehouse.code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('status')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedWarehouse.status)}`}>
                    {getStatusText(selectedWarehouse.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الموقع' : 'Location'}</p>
                  <p className="font-semibold">{selectedWarehouse.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'السعة' : 'Capacity'}</p>
                  <p className="font-semibold">
                    {getTotalItems(selectedWarehouse.items)} / {selectedWarehouse.capacity}
                    <span className="text-muted-foreground ml-2">
                      ({getCapacityPercentage(selectedWarehouse.items, selectedWarehouse.capacity)}%)
                    </span>
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{t('address')}</p>
                  <p className="font-semibold">{selectedWarehouse.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المدير' : 'Manager'}</p>
                  <p className="font-semibold">{selectedWarehouse.manager}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('phone')}</p>
                  <p className="font-semibold">{selectedWarehouse.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{t('email')}</p>
                  <p className="font-semibold">{selectedWarehouse.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">{t('items')}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'كود الصنف' : 'Item Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                      <TableHead className="text-right">{t('quantity')}</TableHead>
                      <TableHead>{t('unit')}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الموقع' : 'Location'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedWarehouse.items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          {t('noData')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      selectedWarehouse.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.itemCode}</TableCell>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell className="text-right font-semibold">{item.quantity}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{item.location}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {selectedWarehouse.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                  <p className="text-sm border rounded p-3 bg-muted/50">{selectedWarehouse.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? t('edit') : t('addNew')} - {t('warehouse')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الكود' : 'Code'} *</Label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="WH-001"
                />
              </div>
              <div className="space-y-2">
                <Label>{t('name')} *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الموقع' : 'Location'} *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'السعة' : 'Capacity'} *</Label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>{t('address')} *</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'المدير' : 'Manager'} *</Label>
                <Input
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('phone')} *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>{t('email')} *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
            }}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSaveWarehouse}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

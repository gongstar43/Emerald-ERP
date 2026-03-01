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
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Plus, TrendingUp, TrendingDown, ArrowRightLeft, Eye, Trash2, Package } from 'lucide-react';
import { toast } from 'sonner';

interface Movement {
  id: string;
  movementNumber: string;
  date: string;
  type: 'in' | 'out' | 'transfer';
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  fromWarehouse: string;
  toWarehouse: string;
  reference: string;
  performedBy: string;
  notes: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export default function Movements() {
  const { t, locale } = useLanguage();
  const [movements, setMovements] = useState<Movement[]>([
    {
      id: '1',
      movementNumber: 'MV-2024-001',
      date: '2024-03-05',
      type: 'in',
      itemCode: 'IT-001',
      itemName: 'أجهزة كمبيوتر محمولة',
      quantity: 10,
      unit: 'جهاز',
      fromWarehouse: '',
      toWarehouse: 'المستودع الرئيسي',
      reference: 'PO-2024-001',
      performedBy: 'أحمد محمد العلي',
      notes: 'استلام من المورد',
      status: 'completed',
    },
    {
      id: '2',
      movementNumber: 'MV-2024-002',
      date: '2024-03-10',
      type: 'transfer',
      itemCode: 'IT-001',
      itemName: 'أجهزة كمبيوتر محمولة',
      quantity: 5,
      unit: 'جهاز',
      fromWarehouse: 'المستودع الرئيسي',
      toWarehouse: 'مستودع جدة',
      reference: 'TR-2024-001',
      performedBy: 'خالد أحمد السالم',
      notes: 'نقل للفرع',
      status: 'completed',
    },
    {
      id: '3',
      movementNumber: 'MV-2024-003',
      date: '2024-03-15',
      type: 'out',
      itemCode: 'IT-002',
      itemName: 'شاشات مكتبية',
      quantity: 3,
      unit: 'قطعة',
      fromWarehouse: 'المستودع الرئيسي',
      toWarehouse: '',
      reference: 'SO-2024-001',
      performedBy: 'أحمد محمد العلي',
      notes: 'صرف للعميل',
      status: 'completed',
    },
    {
      id: '4',
      movementNumber: 'MV-2024-004',
      date: '2024-03-20',
      type: 'in',
      itemCode: 'ST-001',
      itemName: 'ورق طباعة A4',
      quantity: 150,
      unit: 'رزمة',
      fromWarehouse: '',
      toWarehouse: 'المستودع الرئيسي',
      reference: 'PO-2024-002',
      performedBy: 'أحمد محمد العلي',
      notes: 'استلام من المورد',
      status: 'pending',
    },
  ]);

  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const [formData, setFormData] = useState({
    type: 'in' as Movement['type'],
    itemCode: '',
    itemName: '',
    quantity: 0,
    unit: '',
    fromWarehouse: '',
    toWarehouse: '',
    reference: '',
    notes: '',
  });

  const handleViewMovement = (movement: Movement) => {
    setSelectedMovement(movement);
    setIsViewDialogOpen(true);
  };

  const handleDeleteMovement = (id: string) => {
    setMovements(movements.filter(m => m.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      in: 'bg-green-100 text-green-800',
      out: 'bg-red-100 text-red-800',
      transfer: 'bg-blue-100 text-blue-800',
    };
    return colors[type as keyof typeof colors] || colors.in;
  };

  const getTypeText = (type: string) => {
    const types = {
      in: locale === 'ar' ? 'وارد' : 'In',
      out: locale === 'ar' ? 'صادر' : 'Out',
      transfer: locale === 'ar' ? 'تحويل' : 'Transfer',
    };
    return types[type as keyof typeof types] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      in: <TrendingUp className="h-4 w-4" />,
      out: <TrendingDown className="h-4 w-4" />,
      transfer: <ArrowRightLeft className="h-4 w-4" />,
    };
    return icons[type as keyof typeof icons] || icons.in;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      pending: locale === 'ar' ? 'قيد الانتظار' : 'Pending',
      completed: locale === 'ar' ? 'مكتمل' : 'Completed',
      cancelled: locale === 'ar' ? 'ملغى' : 'Cancelled',
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const handleSaveMovement = () => {
    const movementNumber = `MV-2024-${String(movements.length + 1).padStart(3, '0')}`;
    const newMovement: Movement = {
      id: String(Date.now()),
      movementNumber,
      date: new Date().toISOString().split('T')[0],
      type: formData.type,
      itemCode: formData.itemCode,
      itemName: formData.itemName,
      quantity: formData.quantity,
      unit: formData.unit,
      fromWarehouse: formData.fromWarehouse,
      toWarehouse: formData.toWarehouse,
      reference: formData.reference,
      performedBy: 'Current User', // This would come from auth context
      notes: formData.notes,
      status: 'pending',
    };

    setMovements([...movements, newMovement]);
    setIsCreateDialogOpen(false);
    setFormData({
      type: 'in',
      itemCode: '',
      itemName: '',
      quantity: 0,
      unit: '',
      fromWarehouse: '',
      toWarehouse: '',
      reference: '',
      notes: '',
    });
    toast.success(t('savedSuccessfully'));
  };

  const filteredMovements = movements.filter(m => {
    const matchesSearch = 
      m.movementNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || m.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Statistics
  const totalIn = movements.filter(m => m.type === 'in' && m.status === 'completed').reduce((sum, m) => sum + m.quantity, 0);
  const totalOut = movements.filter(m => m.type === 'out' && m.status === 'completed').reduce((sum, m) => sum + m.quantity, 0);
  const totalTransfer = movements.filter(m => m.type === 'transfer' && m.status === 'completed').reduce((sum, m) => sum + m.quantity, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('movements')}</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('add')}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              {locale === 'ar' ? 'إجمالي الوارد' : 'Total In'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalIn}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'قطعة' : 'items'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              {locale === 'ar' ? 'إجمالي الصادر' : 'Total Out'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalOut}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'قطعة' : 'items'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-blue-600" />
              {locale === 'ar' ? 'إجمالي التحويلات' : 'Total Transfers'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalTransfer}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'قطعة' : 'items'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
            <SelectItem value="in">{locale === 'ar' ? 'وارد' : 'In'}</SelectItem>
            <SelectItem value="out">{locale === 'ar' ? 'صادر' : 'Out'}</SelectItem>
            <SelectItem value="transfer">{locale === 'ar' ? 'تحويل' : 'Transfer'}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('movements')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الحركة' : 'Movement No.'}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                <TableHead className="text-right">{t('quantity')}</TableHead>
                <TableHead>{locale === 'ar' ? 'من' : 'From'}</TableHead>
                <TableHead>{locale === 'ar' ? 'إلى' : 'To'}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">{movement.movementNumber}</TableCell>
                    <TableCell>
                      {new Date(movement.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getTypeColor(movement.type)}`}>
                        {getTypeIcon(movement.type)}
                        {getTypeText(movement.type)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{movement.itemName}</p>
                        <p className="text-xs text-muted-foreground">{movement.itemCode}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {movement.quantity} {movement.unit}
                    </TableCell>
                    <TableCell className="text-sm">
                      {movement.fromWarehouse || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {movement.toWarehouse || '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(movement.status)}`}>
                        {getStatusText(movement.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleViewMovement(movement)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {movement.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMovement(movement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMovement?.movementNumber}</DialogTitle>
          </DialogHeader>
          {selectedMovement && (
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('date')}</p>
                  <p className="font-semibold">
                    {new Date(selectedMovement.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'النوع' : 'Type'}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getTypeColor(selectedMovement.type)}`}>
                    {getTypeIcon(selectedMovement.type)}
                    {getTypeText(selectedMovement.type)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'كود الصنف' : 'Item Code'}</p>
                  <p className="font-semibold">{selectedMovement.itemCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</p>
                  <p className="font-semibold">{selectedMovement.itemName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('quantity')}</p>
                  <p className="font-semibold text-lg">
                    {selectedMovement.quantity} {selectedMovement.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('status')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMovement.status)}`}>
                    {getStatusText(selectedMovement.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'من مستودع' : 'From Warehouse'}</p>
                  <p className="font-semibold">{selectedMovement.fromWarehouse || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'إلى مستودع' : 'To Warehouse'}</p>
                  <p className="font-semibold">{selectedMovement.toWarehouse || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المرجع' : 'Reference'}</p>
                  <p className="font-semibold">{selectedMovement.reference}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'نفذت بواسطة' : 'Performed By'}</p>
                  <p className="font-semibold">{selectedMovement.performedBy}</p>
                </div>
              </div>

              {selectedMovement.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                  <p className="text-sm border rounded p-3 bg-muted/50">{selectedMovement.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('addNew')} - {locale === 'ar' ? 'حركة مخزون' : 'Stock Movement'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'نوع الحركة' : 'Movement Type'} *</Label>
              <Select value={formData.type} onValueChange={(value: Movement['type']) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">{locale === 'ar' ? 'وارد' : 'In'}</SelectItem>
                  <SelectItem value="out">{locale === 'ar' ? 'صادر' : 'Out'}</SelectItem>
                  <SelectItem value="transfer">{locale === 'ar' ? 'تحويل' : 'Transfer'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'كود الصنف' : 'Item Code'} *</Label>
                <Input
                  value={formData.itemCode}
                  onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
                  placeholder="IT-001"
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'} *</Label>
                <Input
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('quantity')} *</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('unit')} *</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={locale === 'ar' ? 'اختر الوحدة' : 'Select Unit'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جهاز">{locale === 'ar' ? 'جهاز' : 'Device'}</SelectItem>
                    <SelectItem value="قطعة">{locale === 'ar' ? 'قطعة' : 'Piece'}</SelectItem>
                    <SelectItem value="رزمة">{locale === 'ar' ? 'رزمة' : 'Bundle'}</SelectItem>
                    <SelectItem value="صندوق">{locale === 'ar' ? 'صندوق' : 'Box'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(formData.type === 'out' || formData.type === 'transfer') && (
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'من مستودع' : 'From Warehouse'} *</Label>
                  <Select value={formData.fromWarehouse} onValueChange={(value) => setFormData({ ...formData, fromWarehouse: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر المستودع' : 'Select Warehouse'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="المستودع الرئيسي">المستودع الرئيسي</SelectItem>
                      <SelectItem value="مستودع جدة">مستودع جدة</SelectItem>
                      <SelectItem value="مستودع الدمام">مستودع الدمام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(formData.type === 'in' || formData.type === 'transfer') && (
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'إلى مستودع' : 'To Warehouse'} *</Label>
                  <Select value={formData.toWarehouse} onValueChange={(value) => setFormData({ ...formData, toWarehouse: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختر المستودع' : 'Select Warehouse'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="المستودع الرئيسي">المستودع الرئيسي</SelectItem>
                      <SelectItem value="مستودع جدة">مستودع جدة</SelectItem>
                      <SelectItem value="مستودع الدمام">مستودع الدمام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'المرجع' : 'Reference'}</Label>
                <Input
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder="PO-2024-001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSaveMovement}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

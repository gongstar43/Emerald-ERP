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
import { Plus, ShoppingBag, Eye, Edit, Trash2, CheckCircle, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  date: string;
  expectedDelivery: string;
  supplier: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'approved' | 'ordered' | 'received' | 'cancelled';
  notes: string;
  deliveryAddress: string;
}

export default function PurchaseOrders() {
  const { t, locale } = useLanguage();
  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: '1',
      orderNumber: 'PO-2024-001',
      date: '2024-02-20',
      expectedDelivery: '2024-03-05',
      supplier: 'شركة التوريدات التقنية',
      items: [
        { description: 'أجهزة كمبيوتر محمولة - Dell Latitude 5420', quantity: 10, unitPrice: 4500, total: 45000 },
        { description: 'شاشات مكتبية - HP 24 بوصة', quantity: 15, unitPrice: 800, total: 12000 },
      ],
      subtotal: 57000,
      tax: 8550,
      discount: 0,
      total: 65550,
      status: 'approved',
      notes: 'يجب التأكد من الضمان لمدة 3 سنوات',
      deliveryAddress: 'الرياض، حي الملقا، مبنى المكاتب الرئيسي',
    },
    {
      id: '2',
      orderNumber: 'PO-2024-002',
      date: '2024-02-22',
      expectedDelivery: '2024-03-08',
      supplier: 'مؤسسة القرطاسية الحديثة',
      items: [
        { description: 'ورق طباعة A4', quantity: 100, unitPrice: 25, total: 2500 },
        { description: 'أقلام حبر جاف', quantity: 200, unitPrice: 2, total: 400 },
        { description: 'ملفات تصنيف', quantity: 50, unitPrice: 15, total: 750 },
      ],
      subtotal: 3650,
      tax: 547.5,
      discount: 182.5,
      total: 4015,
      status: 'ordered',
      notes: 'طلب شهري متكرر',
      deliveryAddress: 'الرياض، حي الملقا، مبنى المكاتب الرئيسي',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    supplier: '',
    date: new Date().toISOString().split('T')[0],
    expectedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    discount: 0,
    notes: '',
    deliveryAddress: '',
  });

  const handleViewOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setFormData({
      supplier: order.supplier,
      date: order.date,
      expectedDelivery: order.expectedDelivery,
      items: order.items,
      discount: order.discount,
      notes: order.notes,
      deliveryAddress: order.deliveryAddress,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleStatusChange = (id: string, status: PurchaseOrder['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    toast.success(locale === 'ar' ? 'تم تحديث الحالة بنجاح' : 'Status updated successfully');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      ordered: 'bg-purple-100 text-purple-800',
      received: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      pending: locale === 'ar' ? 'قيد الانتظار' : 'Pending',
      approved: locale === 'ar' ? 'معتمد' : 'Approved',
      ordered: locale === 'ar' ? 'تم الطلب' : 'Ordered',
      received: locale === 'ar' ? 'تم الاستلام' : 'Received',
      cancelled: locale === 'ar' ? 'ملغى' : 'Cancelled',
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof OrderItem, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    setFormData({ ...formData, items: newItems });
  };

  const getSubtotal = () => formData.items.reduce((sum, item) => sum + item.total, 0);
  const getTax = () => getSubtotal() * 0.15;
  const getDiscount = () => formData.discount;
  const getTotal = () => getSubtotal() + getTax() - getDiscount();

  const handleSaveOrder = () => {
    const orderNumber = `PO-2024-${String(orders.length + 1).padStart(3, '0')}`;
    const newOrder: PurchaseOrder = {
      id: String(Date.now()),
      orderNumber,
      date: formData.date,
      expectedDelivery: formData.expectedDelivery,
      supplier: formData.supplier,
      items: formData.items,
      subtotal: getSubtotal(),
      tax: getTax(),
      discount: getDiscount(),
      total: getTotal(),
      status: 'pending',
      notes: formData.notes,
      deliveryAddress: formData.deliveryAddress,
    };

    if (isEditDialogOpen && selectedOrder) {
      setOrders(orders.map(o => 
        o.id === selectedOrder.id 
          ? { ...newOrder, id: selectedOrder.id, orderNumber: selectedOrder.orderNumber }
          : o
      ));
      setIsEditDialogOpen(false);
    } else {
      setOrders([...orders, newOrder]);
      setIsCreateDialogOpen(false);
    }

    setFormData({
      supplier: '',
      date: new Date().toISOString().split('T')[0],
      expectedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      discount: 0,
      notes: '',
      deliveryAddress: '',
    });
    toast.success(t('savedSuccessfully'));
  };

  const filteredOrders = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('purchaseOrders')}</h1>
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

      <Card>
        <CardHeader>
          <CardTitle>{t('purchaseOrders')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الطلب' : 'Order No.'}</TableHead>
                <TableHead>{t('supplier')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{locale === 'ar' ? 'التسليم المتوقع' : 'Expected Delivery'}</TableHead>
                <TableHead className="text-right">{t('total')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      {new Date(order.expectedDelivery).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {order.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditOrder(order)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {order.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(order.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {order.status === 'approved' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(order.id, 'ordered')}
                          >
                            <ShoppingBag className="h-4 w-4 text-purple-600" />
                          </Button>
                        )}
                        {order.status === 'ordered' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(order.id, 'received')}
                          >
                            <Truck className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('supplier')}</p>
                  <p className="font-semibold">{selectedOrder.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('date')}</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'التسليم المتوقع' : 'Expected Delivery'}</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.expectedDelivery).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('status')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'عنوان التسليم' : 'Delivery Address'}</p>
                <p className="font-semibold">{selectedOrder.deliveryAddress}</p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('description')}</TableHead>
                    <TableHead className="text-right">{t('quantity')}</TableHead>
                    <TableHead className="text-right">{t('unitPrice')}</TableHead>
                    <TableHead className="text-right">{t('total')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.unitPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">{item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold">{selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('tax')} (15%)</span>
                  <span className="font-semibold">{selectedOrder.tax.toLocaleString()}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>{t('discount')}</span>
                    <span className="font-semibold">-{selectedOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>{t('total')}</span>
                  <span className="text-blue-600">
                    {selectedOrder.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                  <p className="text-sm border rounded p-3 bg-muted/50">{selectedOrder.notes}</p>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? t('edit') : t('addNew')} - {t('purchaseOrder')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('supplier')} *</Label>
                <Select value={formData.supplier} onValueChange={(value) => setFormData({ ...formData, supplier: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={locale === 'ar' ? 'اختر المورد' : 'Select Supplier'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شركة التوريدات التقنية">شركة التوريدات التقنية</SelectItem>
                    <SelectItem value="مؤسسة القرطاسية الحديثة">مؤسسة القرطاسية الحديثة</SelectItem>
                    <SelectItem value="شركة المعدات المكتبية">شركة المعدات المكتبية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('date')} *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'التسليم المتوقع' : 'Expected Delivery'} *</Label>
                <Input
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('discount')}</Label>
                <Input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'عنوان التسليم' : 'Delivery Address'} *</Label>
              <Textarea
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-lg">{t('items')}</Label>
                <Button onClick={addItem} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'إضافة صنف' : 'Add Item'}
                </Button>
              </div>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 border rounded">
                    <div className="col-span-5 space-y-1">
                      <Label className="text-xs">{t('description')}</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{t('quantity')}</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{t('unitPrice')}</Label>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{t('total')}</Label>
                      <Input value={item.total.toLocaleString()} disabled />
                    </div>
                    <div className="col-span-1">
                      {formData.items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
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

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-semibold">{getSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('tax')} (15%)</span>
                <span className="font-semibold">{getTax().toLocaleString()}</span>
              </div>
              {formData.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t('discount')}</span>
                  <span className="font-semibold">-{getDiscount().toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>{t('total')}</span>
                <span className="text-blue-600">{getTotal().toLocaleString()}</span>
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
            <Button onClick={handleSaveOrder}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

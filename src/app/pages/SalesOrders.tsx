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
import { Plus, ShoppingCart, Eye, Edit, Trash2, CheckCircle, Package } from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface SalesOrder {
  id: string;
  orderNumber: string;
  date: string;
  deliveryDate: string;
  customer: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes: string;
  shippingAddress: string;
}

export default function SalesOrders() {
  const { t, locale } = useLanguage();
  const [orders, setOrders] = useState<SalesOrder[]>([
    {
      id: '1',
      orderNumber: 'SO-2024-001',
      date: '2024-02-25',
      deliveryDate: '2024-03-10',
      customer: 'شركة التقنية المتقدمة',
      items: [
        { description: 'نظام إدارة موارد المؤسسة', quantity: 1, unitPrice: 50000, total: 50000 },
        { description: 'خدمات التدريب', quantity: 5, unitPrice: 5000, total: 25000 },
      ],
      subtotal: 75000,
      tax: 11250,
      discount: 0,
      total: 86250,
      status: 'confirmed',
      notes: 'يتطلب تنسيق التسليم مع قسم تقنية المعلومات',
      shippingAddress: 'الرياض، حي الملقا، شارع العليا',
    },
    {
      id: '2',
      orderNumber: 'SO-2024-002',
      date: '2024-02-26',
      deliveryDate: '2024-03-05',
      customer: 'مؤسسة الأعمال الذكية',
      items: [
        { description: 'نظام إدارة المخزون', quantity: 1, unitPrice: 35000, total: 35000 },
        { description: 'أجهزة طابعات الباركود', quantity: 3, unitPrice: 2000, total: 6000 },
      ],
      subtotal: 41000,
      tax: 6150,
      discount: 2055,
      total: 45095,
      status: 'processing',
      notes: 'يشمل التركيب والتدريب',
      shippingAddress: 'جدة، حي الزهراء، طريق الملك عبدالعزيز',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    discount: 0,
    notes: '',
    shippingAddress: '',
  });

  const handleViewOrder = (order: SalesOrder) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order: SalesOrder) => {
    setSelectedOrder(order);
    setFormData({
      customer: order.customer,
      date: order.date,
      deliveryDate: order.deliveryDate,
      items: order.items,
      discount: order.discount,
      notes: order.notes,
      shippingAddress: order.shippingAddress,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleStatusChange = (id: string, status: SalesOrder['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    toast.success(locale === 'ar' ? 'تم تحديث الحالة بنجاح' : 'Status updated successfully');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      pending: locale === 'ar' ? 'قيد الانتظار' : 'Pending',
      confirmed: locale === 'ar' ? 'مؤكد' : 'Confirmed',
      processing: locale === 'ar' ? 'قيد المعالجة' : 'Processing',
      shipped: locale === 'ar' ? 'تم الشحن' : 'Shipped',
      delivered: locale === 'ar' ? 'تم التسليم' : 'Delivered',
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
    const orderNumber = `SO-2024-${String(orders.length + 1).padStart(3, '0')}`;
    const newOrder: SalesOrder = {
      id: String(Date.now()),
      orderNumber,
      date: formData.date,
      deliveryDate: formData.deliveryDate,
      customer: formData.customer,
      items: formData.items,
      subtotal: getSubtotal(),
      tax: getTax(),
      discount: getDiscount(),
      total: getTotal(),
      status: 'pending',
      notes: formData.notes,
      shippingAddress: formData.shippingAddress,
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
      customer: '',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      discount: 0,
      notes: '',
      shippingAddress: '',
    });
    toast.success(t('savedSuccessfully'));
  };

  const filteredOrders = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('salesOrders')}</h1>
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
          <CardTitle>{t('salesOrders')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الطلب' : 'Order No.'}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{locale === 'ar' ? 'تاريخ التسليم' : 'Delivery Date'}</TableHead>
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
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      {new Date(order.deliveryDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
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
                            onClick={() => handleStatusChange(order.id, 'confirmed')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {order.status === 'confirmed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(order.id, 'processing')}
                          >
                            <Package className="h-4 w-4 text-purple-600" />
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
                  <p className="text-sm text-muted-foreground">{t('customer')}</p>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('date')}</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'تاريخ التسليم' : 'Delivery Date'}</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.deliveryDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
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
                <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'عنوان الشحن' : 'Shipping Address'}</p>
                <p className="font-semibold">{selectedOrder.shippingAddress}</p>
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
              {isEditDialogOpen ? t('edit') : t('addNew')} - {t('salesOrder')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('customer')} *</Label>
                <Select value={formData.customer} onValueChange={(value) => setFormData({ ...formData, customer: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={locale === 'ar' ? 'اختر العميل' : 'Select Customer'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شركة التقنية المتقدمة">شركة التقنية المتقدمة</SelectItem>
                    <SelectItem value="مؤسسة الأعمال الذكية">مؤسسة الأعمال الذكية</SelectItem>
                    <SelectItem value="شركة الابتكار الرقمي">شركة الابتكار الرقمي</SelectItem>
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
                <Label>{locale === 'ar' ? 'تاريخ التسليم' : 'Delivery Date'} *</Label>
                <Input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
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
              <Label>{locale === 'ar' ? 'عنوان الشحن' : 'Shipping Address'} *</Label>
              <Textarea
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
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

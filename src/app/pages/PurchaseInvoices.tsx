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
import { Plus, FileText, Eye, Edit, Trash2, DollarSign, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  supplier: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  remaining: number;
  status: 'draft' | 'pending' | 'paid' | 'partial' | 'overdue';
  notes: string;
  purchaseOrderRef?: string;
}

export default function PurchaseInvoices() {
  const { t, locale } = useLanguage();
  const [invoices, setInvoices] = useState<PurchaseInvoice[]>([
    {
      id: '1',
      invoiceNumber: 'PI-2024-001',
      date: '2024-03-01',
      dueDate: '2024-03-31',
      supplier: 'شركة التوريدات التقنية',
      items: [
        { description: 'أجهزة كمبيوتر محمولة - Dell Latitude 5420', quantity: 10, unitPrice: 4500, total: 45000 },
        { description: 'شاشات مكتبية - HP 24 بوصة', quantity: 15, unitPrice: 800, total: 12000 },
      ],
      subtotal: 57000,
      tax: 8550,
      discount: 0,
      total: 65550,
      paid: 30000,
      remaining: 35550,
      status: 'partial',
      notes: 'دفعة أولى 30,000 ريال',
      purchaseOrderRef: 'PO-2024-001',
    },
    {
      id: '2',
      invoiceNumber: 'PI-2024-002',
      date: '2024-03-05',
      dueDate: '2024-04-05',
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
      paid: 4015,
      remaining: 0,
      status: 'paid',
      notes: 'تم الدفع بالكامل',
      purchaseOrderRef: 'PO-2024-002',
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<PurchaseInvoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);

  const [formData, setFormData] = useState({
    supplier: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    discount: 0,
    notes: '',
    purchaseOrderRef: '',
  });

  const handleViewInvoice = (invoice: PurchaseInvoice) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const handleEditInvoice = (invoice: PurchaseInvoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      supplier: invoice.supplier,
      date: invoice.date,
      dueDate: invoice.dueDate,
      items: invoice.items,
      discount: invoice.discount,
      notes: invoice.notes,
      purchaseOrderRef: invoice.purchaseOrderRef || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter(i => i.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handlePaymentDialog = (invoice: PurchaseInvoice) => {
    setSelectedInvoice(invoice);
    setPaymentAmount(invoice.remaining);
    setIsPaymentDialogOpen(true);
  };

  const handleRecordPayment = () => {
    if (!selectedInvoice) return;

    const newPaid = selectedInvoice.paid + paymentAmount;
    const newRemaining = selectedInvoice.total - newPaid;
    let newStatus: PurchaseInvoice['status'] = 'pending';
    
    if (newRemaining === 0) {
      newStatus = 'paid';
    } else if (newRemaining < selectedInvoice.total) {
      newStatus = 'partial';
    }

    setInvoices(invoices.map(i => 
      i.id === selectedInvoice.id 
        ? { ...i, paid: newPaid, remaining: newRemaining, status: newStatus }
        : i
    ));

    setIsPaymentDialogOpen(false);
    toast.success(locale === 'ar' ? 'تم تسجيل الدفعة بنجاح' : 'Payment recorded successfully');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      partial: 'bg-blue-100 text-blue-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      draft: locale === 'ar' ? 'مسودة' : 'Draft',
      pending: locale === 'ar' ? 'قيد الانتظار' : 'Pending',
      paid: locale === 'ar' ? 'مدفوعة' : 'Paid',
      partial: locale === 'ar' ? 'مدفوعة جزئياً' : 'Partially Paid',
      overdue: locale === 'ar' ? 'متأخرة' : 'Overdue',
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

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
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

  const handleSaveInvoice = () => {
    const invoiceNumber = `PI-2024-${String(invoices.length + 1).padStart(3, '0')}`;
    const total = getTotal();
    const newInvoice: PurchaseInvoice = {
      id: String(Date.now()),
      invoiceNumber,
      date: formData.date,
      dueDate: formData.dueDate,
      supplier: formData.supplier,
      items: formData.items,
      subtotal: getSubtotal(),
      tax: getTax(),
      discount: getDiscount(),
      total,
      paid: 0,
      remaining: total,
      status: 'draft',
      notes: formData.notes,
      purchaseOrderRef: formData.purchaseOrderRef,
    };

    if (isEditDialogOpen && selectedInvoice) {
      setInvoices(invoices.map(i => 
        i.id === selectedInvoice.id 
          ? { ...newInvoice, id: selectedInvoice.id, invoiceNumber: selectedInvoice.invoiceNumber }
          : i
      ));
      setIsEditDialogOpen(false);
    } else {
      setInvoices([...invoices, newInvoice]);
      setIsCreateDialogOpen(false);
    }

    setFormData({
      supplier: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      discount: 0,
      notes: '',
      purchaseOrderRef: '',
    });
    toast.success(t('savedSuccessfully'));
  };

  const filteredInvoices = invoices.filter(i =>
    i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('purchaseInvoices')}</h1>
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
          <CardTitle>{t('purchaseInvoices')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الفاتورة' : 'Invoice No.'}</TableHead>
                <TableHead>{t('supplier')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</TableHead>
                <TableHead className="text-right">{t('total')}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'المتبقي' : 'Remaining'}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.supplier}</TableCell>
                    <TableCell>
                      {new Date(invoice.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {invoice.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-orange-600">
                      {invoice.remaining.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditInvoice(invoice)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {invoice.status !== 'paid' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePaymentDialog(invoice)}
                          >
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteInvoice(invoice.id)}
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
            <DialogTitle>{selectedInvoice?.invoiceNumber}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('supplier')}</p>
                  <p className="font-semibold">{selectedInvoice.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('date')}</p>
                  <p className="font-semibold">
                    {new Date(selectedInvoice.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</p>
                  <p className="font-semibold">
                    {new Date(selectedInvoice.dueDate).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('status')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInvoice.status)}`}>
                    {getStatusText(selectedInvoice.status)}
                  </span>
                </div>
                {selectedInvoice.purchaseOrderRef && (
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'أمر الشراء' : 'Purchase Order'}</p>
                    <p className="font-semibold">{selectedInvoice.purchaseOrderRef}</p>
                  </div>
                )}
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
                  {selectedInvoice.items.map((item, index) => (
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
                  <span className="font-semibold">{selectedInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('tax')} (15%)</span>
                  <span className="font-semibold">{selectedInvoice.tax.toLocaleString()}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>{t('discount')}</span>
                    <span className="font-semibold">-{selectedInvoice.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>{t('total')}</span>
                  <span className="text-blue-600">
                    {selectedInvoice.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span>{locale === 'ar' ? 'المدفوع' : 'Paid'}</span>
                  <span className="font-semibold text-green-600">{selectedInvoice.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>{locale === 'ar' ? 'المتبقي' : 'Remaining'}</span>
                  <span className="text-orange-600">
                    {selectedInvoice.remaining.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                  <p className="text-sm border rounded p-3 bg-muted/50">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{locale === 'ar' ? 'تسجيل دفعة' : 'Record Payment'}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4 p-4">
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'}</p>
                <p className="font-semibold">{selectedInvoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المبلغ المتبقي' : 'Remaining Amount'}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {selectedInvoice.remaining.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                </p>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'مبلغ الدفعة' : 'Payment Amount'} *</Label>
                <Input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  max={selectedInvoice.remaining}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleRecordPayment}>
              <CheckCircle className="h-4 w-4 mr-2" />
              {t('confirm')}
            </Button>
          </DialogFooter>
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
              {isEditDialogOpen ? t('edit') : t('addNew')} - {t('purchaseInvoice')}
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
                <Label>{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'} *</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'أمر الشراء (اختياري)' : 'Purchase Order (Optional)'}</Label>
                <Input
                  value={formData.purchaseOrderRef}
                  onChange={(e) => setFormData({ ...formData, purchaseOrderRef: e.target.value })}
                  placeholder="PO-2024-001"
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
            <Button onClick={handleSaveInvoice}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

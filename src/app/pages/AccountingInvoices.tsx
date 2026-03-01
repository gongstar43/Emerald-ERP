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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Plus, Search, FileText, Eye, Trash2, Edit, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  contactId: string;
  contactName: string;
  type: 'sales' | 'purchase';
  status: 'draft' | 'approved' | 'paid' | 'cancelled';
  subtotal: number;
  taxAmount: number;
  total: number;
  items: InvoiceItem[];
  notes?: string;
}

export default function AccountingInvoices() {
  const { t, locale } = useLanguage();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'sales' | 'purchase'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'approved' | 'paid' | 'cancelled'>('all');

  const [formData, setFormData] = useState({
    number: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    contactName: '',
    type: 'sales' as 'sales' | 'purchase',
    status: 'draft' as 'draft' | 'approved' | 'paid' | 'cancelled',
    notes: '',
  });

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([{
    id: '1',
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: 15,
    total: 0,
  }]);

  const calculateItemTotal = (quantity: number, unitPrice: number, taxRate: number) => {
    const subtotal = quantity * unitPrice;
    const tax = subtotal * (taxRate / 100);
    return subtotal + tax;
  };

  const calculateInvoiceTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );
    const taxAmount = invoiceItems.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice * item.taxRate / 100), 0
    );
    return { subtotal, taxAmount, total: subtotal + taxAmount };
  };

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 15,
      total: 0,
    }]);
  };

  const handleRemoveItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        updated.total = calculateItemTotal(updated.quantity, updated.unitPrice, updated.taxRate);
        return updated;
      }
      return item;
    }));
  };

  const handleSubmit = () => {
    if (!formData.number || !formData.contactName || invoiceItems.length === 0) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const totals = calculateInvoiceTotals();
    const newInvoice: Invoice = {
      id: selectedInvoice?.id || Date.now().toString(),
      ...formData,
      contactId: Date.now().toString(),
      ...totals,
      items: invoiceItems,
    };

    if (selectedInvoice) {
      setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? newInvoice : inv));
      toast.success(locale === 'ar' ? 'تم تحديث الفاتورة بنجاح' : 'Invoice updated successfully');
    } else {
      setInvoices([newInvoice, ...invoices]);
      toast.success(locale === 'ar' ? 'تم إضافة الفاتورة بنجاح' : 'Invoice added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      number: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      contactName: '',
      type: 'sales',
      status: 'draft',
      notes: '',
    });
    setInvoiceItems([{
      id: '1',
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 15,
      total: 0,
    }]);
    setSelectedInvoice(null);
    setShowDialog(false);
  };

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      number: invoice.number,
      date: invoice.date,
      dueDate: invoice.dueDate,
      contactName: invoice.contactName,
      type: invoice.type,
      status: invoice.status,
      notes: invoice.notes || '',
    });
    setInvoiceItems(invoice.items);
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
    toast.success(locale === 'ar' ? 'تم حذف الفاتورة بنجاح' : 'Invoice deleted successfully');
  };

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewDialog(true);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || invoice.type === filterType;
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800',
      approved: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const statusLabels = {
      draft: locale === 'ar' ? 'مسودة' : 'Draft',
      approved: locale === 'ar' ? 'معتمدة' : 'Approved',
      paid: locale === 'ar' ? 'مدفوعة' : 'Paid',
      cancelled: locale === 'ar' ? 'ملغاة' : 'Cancelled',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return type === 'sales' 
      ? <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {locale === 'ar' ? 'مبيعات' : 'Sales'}
        </span>
      : <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          {locale === 'ar' ? 'مشتريات' : 'Purchase'}
        </span>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{locale === 'ar' ? 'الفواتير' : 'Invoices'}</h1>
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'إدارة فواتير المبيعات والمشتريات' : 'Manage sales and purchase invoices'}
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة فاتورة' : 'Add Invoice'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'إجمالي الفواتير' : 'Total Invoices'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مسودات' : 'Drafts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.filter(i => i.status === 'draft').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'معتمدة' : 'Approved'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.filter(i => i.status === 'approved').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مدفوعة' : 'Paid'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.filter(i => i.status === 'paid').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{locale === 'ar' ? 'بحث وتصفية' : 'Search & Filter'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث برقم الفاتورة أو اسم العميل...' : 'Search by number or contact...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                <SelectItem value="sales">{locale === 'ar' ? 'مبيعات' : 'Sales'}</SelectItem>
                <SelectItem value="purchase">{locale === 'ar' ? 'مشتريات' : 'Purchase'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="approved">{locale === 'ar' ? 'معتمدة' : 'Approved'}</SelectItem>
                <SelectItem value="paid">{locale === 'ar' ? 'مدفوعة' : 'Paid'}</SelectItem>
                <SelectItem value="cancelled">{locale === 'ar' ? 'ملغاة' : 'Cancelled'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'قائمة الفواتير' : 'Invoices List'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم الفاتورة' : 'Invoice #'}</TableHead>
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'العميل/المورد' : 'Contact'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    {locale === 'ar' ? 'لا توجد فواتير' : 'No invoices found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell>{getTypeBadge(invoice.type)}</TableCell>
                    <TableCell>{invoice.contactName}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{invoice.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(invoice)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(invoice)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(invoice.id)}>
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

      {/* Add/Edit Invoice Dialog */}
      <Dialog open={showDialog} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedInvoice 
                ? (locale === 'ar' ? 'تعديل الفاتورة' : 'Edit Invoice')
                : (locale === 'ar' ? 'إضافة فاتورة جديدة' : 'Add New Invoice')
              }
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' ? 'أدخل تفاصيل الفاتورة' : 'Enter invoice details'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'} *</Label>
                <Input
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="INV-001"
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'النوع' : 'Type'} *</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">{locale === 'ar' ? 'فاتورة مبيعات' : 'Sales Invoice'}</SelectItem>
                    <SelectItem value="purchase">{locale === 'ar' ? 'فاتورة مشتريات' : 'Purchase Invoice'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'التاريخ' : 'Date'} *</Label>
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
                <Label>{locale === 'ar' ? 'العميل/المورد' : 'Contact Name'} *</Label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder={locale === 'ar' ? 'اسم العميل أو المورد' : 'Contact name'}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الحالة' : 'Status'}</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                    <SelectItem value="approved">{locale === 'ar' ? 'معتمدة' : 'Approved'}</SelectItem>
                    <SelectItem value="paid">{locale === 'ar' ? 'مدفوعة' : 'Paid'}</SelectItem>
                    <SelectItem value="cancelled">{locale === 'ar' ? 'ملغاة' : 'Cancelled'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Invoice Items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{locale === 'ar' ? 'البنود' : 'Items'}</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'إضافة بند' : 'Add Item'}
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'السعر' : 'Price'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الضريبة %' : 'Tax %'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            placeholder={locale === 'ar' ? 'وصف البند' : 'Item description'}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-28"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.taxRate}
                            onChange={(e) => handleItemChange(item.id, 'taxRate', parseFloat(e.target.value) || 0)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {invoiceItems.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>{locale === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span>{calculateInvoiceTotals().subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{locale === 'ar' ? 'الضريبة:' : 'Tax:'}</span>
                    <span>{calculateInvoiceTotals().taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>{locale === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
                    <span>{calculateInvoiceTotals().total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={locale === 'ar' ? 'ملاحظات إضافية...' : 'Additional notes...'}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmit}>
              {selectedInvoice 
                ? (locale === 'ar' ? 'تحديث' : 'Update')
                : (locale === 'ar' ? 'إضافة' : 'Add')
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      {selectedInvoice && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{locale === 'ar' ? 'تفاصيل الفاتورة' : 'Invoice Details'}</span>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'طباعة' : 'Print'}
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'رقم الفاتورة' : 'Invoice Number'}</p>
                  <p className="font-bold">{selectedInvoice.number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'النوع' : 'Type'}</p>
                  <div className="mt-1">{getTypeBadge(selectedInvoice.type)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'التاريخ' : 'Date'}</p>
                  <p className="font-medium">{selectedInvoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}</p>
                  <p className="font-medium">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'العميل/المورد' : 'Contact'}</p>
                  <p className="font-medium">{selectedInvoice.contactName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الحالة' : 'Status'}</p>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-2">{locale === 'ar' ? 'البنود' : 'Items'}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'السعر' : 'Price'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الضريبة %' : 'Tax %'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>{item.taxRate}%</TableCell>
                        <TableCell>{item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>{locale === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span>{selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{locale === 'ar' ? 'الضريبة:' : 'Tax:'}</span>
                    <span>{selectedInvoice.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>{locale === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
                    <span>{selectedInvoice.total.toFixed(2)} {locale === 'ar' ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                  <p>{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

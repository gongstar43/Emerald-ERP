import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { useSettings } from '../../lib/settings';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Plus, Eye, Search, Filter, X } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Printer, Download } from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customer: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
}

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export default function SalesInvoices() {
  const { t, locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: '2024-03-01',
      customer: 'شركة التقنية المتقدمة',
      items: [
        { description: 'خدمات استشارية', quantity: 10, price: 500, total: 5000 },
        { description: 'تطوير برمجيات', quantity: 1, price: 15000, total: 15000 },
      ],
      subtotal: 20000,
      tax: 3000,
      total: 23000,
      status: 'paid',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: '2024-03-05',
      customer: 'مؤسسة الأعمال الذكية',
      items: [
        { description: 'تصميم نظام ERP', quantity: 1, price: 25000, total: 25000 },
        { description: 'تدريب الموظفين', quantity: 5, price: 1000, total: 5000 },
      ],
      subtotal: 30000,
      tax: 4500,
      total: 34500,
      status: 'sent',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      date: '2024-03-10',
      customer: 'شركة الابتكار الرقمي',
      items: [
        { description: 'نظام محاسبة متكامل', quantity: 1, price: 18000, total: 18000 },
        { description: 'دعم فني سنوي', quantity: 1, price: 5000, total: 5000 },
      ],
      subtotal: 23000,
      tax: 3450,
      total: 26450,
      status: 'draft',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      date: '2024-02-28',
      customer: 'مؤسسة النجاح التجاري',
      items: [
        { description: 'استشارات إدارية', quantity: 20, price: 300, total: 6000 },
      ],
      subtotal: 6000,
      tax: 900,
      total: 6900,
      status: 'paid',
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      date: '2024-03-15',
      customer: 'شركة الحلول الذكية',
      items: [
        { description: 'تطوير موقع إلكتروني', quantity: 1, price: 12000, total: 12000 },
        { description: 'تصميم هوية بصرية', quantity: 1, price: 3000, total: 3000 },
      ],
      subtotal: 15000,
      tax: 2250,
      total: 17250,
      status: 'sent',
    },
  ]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, price: 0, total: 0 }],
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const handlePrint = () => {
    toast.success(locale === 'ar' ? 'جاري الطباعة...' : 'Printing...');
  };

  const handleDownload = () => {
    toast.success(locale === 'ar' ? 'جاري التحميل...' : 'Downloading...');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      draft: locale === 'ar' ? 'مسودة' : 'Draft',
      sent: locale === 'ar' ? 'مرسلة' : 'Sent',
      paid: locale === 'ar' ? 'مدفوعة' : 'Paid',
      cancelled: locale === 'ar' ? 'ملغاة' : 'Cancelled',
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0, total: 0 }],
    });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    setFormData({ ...formData, items: newItems });
  };

  const getSubtotal = () => formData.items.reduce((sum, item) => sum + item.total, 0);
  const getTax = () => getSubtotal() * 0.15;
  const getTotal = () => getSubtotal() + getTax();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{locale === 'ar' ? 'فواتير المبيعات' : 'Sales Invoices'}</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث برقم الفاتورة أو العميل...' : 'Search by invoice or customer...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Status'}</SelectItem>
                <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="sent">{locale === 'ar' ? 'مرسلة' : 'Sent'}</SelectItem>
                <SelectItem value="paid">{locale === 'ar' ? 'مدفوعة' : 'Paid'}</SelectItem>
                <SelectItem value="cancelled">{locale === 'ar' ? 'ملغاة' : 'Cancelled'}</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
              >
                <X className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'إلغاء' : 'Clear'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{locale === 'ar' ? 'رقم الفاتورة' : 'Invoice #'}</TableHead>
              <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
              <TableHead>{locale === 'ar' ? 'العميل' : 'Customer'}</TableHead>
              <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
              <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
              <TableHead className="text-right">{locale === 'ar' ? 'إجراءات' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  {locale === 'ar' ? 'لا توجد فواتير' : 'No invoices found'}
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewInvoice(invoice)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* View Invoice Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedInvoice?.invoiceNumber}</DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'عرض تفاصيل الفاتورة الكاملة' 
                : 'View complete invoice details'}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('customer')}</p>
                  <p className="font-semibold">{selectedInvoice.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('date')}</p>
                  <p className="font-semibold">
                    {new Date(selectedInvoice.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
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
                      <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
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
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>{t('total')}</span>
                  <span className="text-blue-600">
                    {formatCurrency(selectedInvoice.total)}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'طباعة' : 'Print'}
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'تحميل PDF' : 'Download PDF'}
            </Button>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              {locale === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('addNew')} - {t('salesInvoice')}</DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'إنشاء فاتورة مبيعات جديدة للعميل' 
                : 'Create new sales invoice for customer'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('customer')} *</Label>
                <Select value={formData.customer} onValueChange={(value) => setFormData({ ...formData, customer: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={locale === 'ar' ? 'اختر العميل' : 'Select Customer'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer1">شركة التقنية المتقدمة</SelectItem>
                    <SelectItem value="customer2">مؤسسة الأعمال الذكية</SelectItem>
                    <SelectItem value="customer3">شركة الابتكار الرقمي</SelectItem>
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
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-lg">{locale === 'ar' ? 'الأصناف' : 'Items'}</Label>
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
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">{t('total')}</Label>
                      <Input value={item.total.toLocaleString()} disabled />
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>{t('total')}</span>
                <span className="text-blue-600">{formatCurrency(getTotal())}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={() => { toast.success(t('savedSuccessfully')); setIsCreateDialogOpen(false); }}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
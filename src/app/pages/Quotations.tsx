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
import { Plus, FileText, Eye, Edit, Trash2, CheckCircle, XCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

interface QuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Quotation {
  id: string;
  quotationNumber: string;
  date: string;
  validUntil: string;
  customer: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  notes: string;
}

export default function Quotations() {
  const { t, locale } = useLanguage();
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: '1',
      quotationNumber: 'QT-2024-001',
      date: '2024-02-15',
      validUntil: '2024-03-15',
      customer: 'شركة التقنية المتقدمة',
      items: [
        { description: 'نظام إدارة موارد المؤسسة', quantity: 1, unitPrice: 50000, total: 50000 },
        { description: 'خدمات التدريب', quantity: 5, unitPrice: 5000, total: 25000 },
      ],
      subtotal: 75000,
      tax: 11250,
      discount: 0,
      total: 86250,
      status: 'sent',
      notes: 'العرض شامل التدريب والدعم الفني لمدة 3 أشهر',
    },
    {
      id: '2',
      quotationNumber: 'QT-2024-002',
      date: '2024-02-20',
      validUntil: '2024-03-20',
      customer: 'مؤسسة الأعمال الذكية',
      items: [
        { description: 'نظام إدارة المخزون', quantity: 1, unitPrice: 35000, total: 35000 },
      ],
      subtotal: 35000,
      tax: 5250,
      discount: 1750,
      total: 38500,
      status: 'accepted',
      notes: 'العرض شامل التركيب والإعداد',
    },
  ]);

  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    customer: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    discount: 0,
    notes: '',
  });

  const handleViewQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setIsViewDialogOpen(true);
  };

  const handleEditQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setFormData({
      customer: quotation.customer,
      date: quotation.date,
      validUntil: quotation.validUntil,
      items: quotation.items,
      discount: quotation.discount,
      notes: quotation.notes,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteQuotation = (id: string) => {
    setQuotations(quotations.filter(q => q.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleStatusChange = (id: string, status: Quotation['status']) => {
    setQuotations(quotations.map(q => q.id === id ? { ...q, status } : q));
    toast.success(locale === 'ar' ? 'تم تحديث الحالة بنجاح' : 'Status updated successfully');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-orange-100 text-orange-800',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getStatusText = (status: string) => {
    const statuses = {
      draft: locale === 'ar' ? 'مسودة' : 'Draft',
      sent: locale === 'ar' ? 'مرسل' : 'Sent',
      accepted: locale === 'ar' ? 'مقبول' : 'Accepted',
      rejected: locale === 'ar' ? 'مرفوض' : 'Rejected',
      expired: locale === 'ar' ? 'منتهي' : 'Expired',
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

  const updateItem = (index: number, field: keyof QuotationItem, value: any) => {
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

  const handleSaveQuotation = () => {
    const quotationNumber = `QT-2024-${String(quotations.length + 1).padStart(3, '0')}`;
    const newQuotation: Quotation = {
      id: String(Date.now()),
      quotationNumber,
      date: formData.date,
      validUntil: formData.validUntil,
      customer: formData.customer,
      items: formData.items,
      subtotal: getSubtotal(),
      tax: getTax(),
      discount: getDiscount(),
      total: getTotal(),
      status: 'draft',
      notes: formData.notes,
    };

    if (isEditDialogOpen && selectedQuotation) {
      setQuotations(quotations.map(q => 
        q.id === selectedQuotation.id 
          ? { ...newQuotation, id: selectedQuotation.id, quotationNumber: selectedQuotation.quotationNumber }
          : q
      ));
      setIsEditDialogOpen(false);
    } else {
      setQuotations([...quotations, newQuotation]);
      setIsCreateDialogOpen(false);
    }

    setFormData({
      customer: '',
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      discount: 0,
      notes: '',
    });
    toast.success(t('savedSuccessfully'));
  };

  const filteredQuotations = quotations.filter(q =>
    q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('quotations')}</h1>
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
          <CardTitle>{t('quotations')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم العرض' : 'Quotation No.'}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{locale === 'ar' ? 'صالح حتى' : 'Valid Until'}</TableHead>
                <TableHead className="text-right">{t('total')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotations.map((quotation) => (
                  <TableRow key={quotation.id}>
                    <TableCell className="font-medium">{quotation.quotationNumber}</TableCell>
                    <TableCell>{quotation.customer}</TableCell>
                    <TableCell>
                      {new Date(quotation.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      {new Date(quotation.validUntil).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {quotation.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quotation.status)}`}>
                        {getStatusText(quotation.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleViewQuotation(quotation)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditQuotation(quotation)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {quotation.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(quotation.id, 'sent')}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {quotation.status === 'sent' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(quotation.id, 'accepted')}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(quotation.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuotation(quotation.id)}
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
            <DialogTitle>{selectedQuotation?.quotationNumber}</DialogTitle>
          </DialogHeader>
          {selectedQuotation && (
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('customer')}</p>
                  <p className="font-semibold">{selectedQuotation.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('date')}</p>
                  <p className="font-semibold">
                    {new Date(selectedQuotation.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'صالح حتى' : 'Valid Until'}</p>
                  <p className="font-semibold">
                    {new Date(selectedQuotation.validUntil).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('status')}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedQuotation.status)}`}>
                    {getStatusText(selectedQuotation.status)}
                  </span>
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
                  {selectedQuotation.items.map((item, index) => (
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
                  <span className="font-semibold">{selectedQuotation.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('tax')} (15%)</span>
                  <span className="font-semibold">{selectedQuotation.tax.toLocaleString()}</span>
                </div>
                {selectedQuotation.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>{t('discount')}</span>
                    <span className="font-semibold">-{selectedQuotation.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>{t('total')}</span>
                  <span className="text-blue-600">
                    {selectedQuotation.total.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              </div>

              {selectedQuotation.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{locale === 'ar' ? 'ملاحظات' : 'Notes'}</p>
                  <p className="text-sm border rounded p-3 bg-muted/50">{selectedQuotation.notes}</p>
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
              {isEditDialogOpen ? t('edit') : t('addNew')} - {t('quotation')}
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
                <Label>{locale === 'ar' ? 'صالح حتى' : 'Valid Until'} *</Label>
                <Input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
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
            <Button onClick={handleSaveQuotation}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

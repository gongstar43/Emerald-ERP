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
import { Plus, Search, Receipt, Eye, Trash2, Edit, Download, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface ReceiptVoucher {
  id: string;
  number: string;
  date: string;
  contactName: string;
  amount: number;
  paymentMethod: 'cash' | 'bank' | 'check' | 'card';
  referenceNumber?: string;
  accountName: string;
  status: 'draft' | 'posted' | 'cancelled';
  description: string;
  attachments?: string[];
}

export default function AccountingReceipts() {
  const { t, locale } = useLanguage();
  const [receipts, setReceipts] = useState<ReceiptVoucher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptVoucher | null>(null);
  const [filterMethod, setFilterMethod] = useState<'all' | 'cash' | 'bank' | 'check' | 'card'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'posted' | 'cancelled'>('all');

  const [formData, setFormData] = useState({
    number: '',
    date: new Date().toISOString().split('T')[0],
    contactName: '',
    amount: '',
    paymentMethod: 'cash' as 'cash' | 'bank' | 'check' | 'card',
    referenceNumber: '',
    accountName: '',
    status: 'draft' as 'draft' | 'posted' | 'cancelled',
    description: '',
  });

  const handleSubmit = () => {
    if (!formData.number || !formData.contactName || !formData.amount || !formData.accountName) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newReceipt: ReceiptVoucher = {
      id: selectedReceipt?.id || Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (selectedReceipt) {
      setReceipts(receipts.map(r => r.id === selectedReceipt.id ? newReceipt : r));
      toast.success(locale === 'ar' ? 'تم تحديث سند القبض بنجاح' : 'Receipt updated successfully');
    } else {
      setReceipts([newReceipt, ...receipts]);
      toast.success(locale === 'ar' ? 'تم إضافة سند القبض بنجاح' : 'Receipt added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      number: '',
      date: new Date().toISOString().split('T')[0],
      contactName: '',
      amount: '',
      paymentMethod: 'cash',
      referenceNumber: '',
      accountName: '',
      status: 'draft',
      description: '',
    });
    setSelectedReceipt(null);
    setShowDialog(false);
  };

  const handleEdit = (receipt: ReceiptVoucher) => {
    setSelectedReceipt(receipt);
    setFormData({
      number: receipt.number,
      date: receipt.date,
      contactName: receipt.contactName,
      amount: receipt.amount.toString(),
      paymentMethod: receipt.paymentMethod,
      referenceNumber: receipt.referenceNumber || '',
      accountName: receipt.accountName,
      status: receipt.status,
      description: receipt.description,
    });
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    setReceipts(receipts.filter(r => r.id !== id));
    toast.success(locale === 'ar' ? 'تم حذف سند القبض بنجاح' : 'Receipt deleted successfully');
  };

  const handleView = (receipt: ReceiptVoucher) => {
    setSelectedReceipt(receipt);
    setShowViewDialog(true);
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'all' || receipt.paymentMethod === filterMethod;
    const matchesStatus = filterStatus === 'all' || receipt.status === filterStatus;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const totalAmount = receipts.filter(r => r.status === 'posted').reduce((sum, r) => sum + r.amount, 0);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800',
      posted: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const statusLabels = {
      draft: locale === 'ar' ? 'مسودة' : 'Draft',
      posted: locale === 'ar' ? 'مرحّل' : 'Posted',
      cancelled: locale === 'ar' ? 'ملغى' : 'Cancelled',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      cash: locale === 'ar' ? 'نقدي' : 'Cash',
      bank: locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer',
      check: locale === 'ar' ? 'شيك' : 'Check',
      card: locale === 'ar' ? 'بطاقة' : 'Card',
    };
    return labels[method as keyof typeof labels];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{locale === 'ar' ? 'سندات القبض' : 'Receipt Vouchers'}</h1>
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'إدارة سندات القبض والمقبوضات' : 'Manage receipt vouchers and collections'}
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة سند قبض' : 'Add Receipt'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'إجمالي السندات' : 'Total Receipts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مسودات' : 'Drafts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.filter(r => r.status === 'draft').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مرحّلة' : 'Posted'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receipts.filter(r => r.status === 'posted').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {locale === 'ar' ? 'إجمالي المقبوضات' : 'Total Collections'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {totalAmount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
            </div>
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
                placeholder={locale === 'ar' ? 'بحث برقم السند أو اسم العميل...' : 'Search by number or contact...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterMethod} onValueChange={(value: any) => setFilterMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع طرق الدفع' : 'All Methods'}</SelectItem>
                <SelectItem value="cash">{locale === 'ar' ? 'نقدي' : 'Cash'}</SelectItem>
                <SelectItem value="bank">{locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</SelectItem>
                <SelectItem value="check">{locale === 'ar' ? 'شيك' : 'Check'}</SelectItem>
                <SelectItem value="card">{locale === 'ar' ? 'بطاقة' : 'Card'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="posted">{locale === 'ar' ? 'مرحّل' : 'Posted'}</SelectItem>
                <SelectItem value="cancelled">{locale === 'ar' ? 'ملغى' : 'Cancelled'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Receipts Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'قائمة سندات القبض' : 'Receipts List'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم السند' : 'Receipt #'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'من' : 'From'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحساب' : 'Account'}</TableHead>
                <TableHead>{locale === 'ar' ? 'طريقة الدفع' : 'Method'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    {locale === 'ar' ? 'لا توجد سندات قبض' : 'No receipts found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">{receipt.number}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.contactName}</TableCell>
                    <TableCell>{receipt.accountName}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getPaymentMethodLabel(receipt.paymentMethod)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {receipt.amount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(receipt)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(receipt)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(receipt.id)}>
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

      {/* Add/Edit Receipt Dialog */}
      <Dialog open={showDialog} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedReceipt 
                ? (locale === 'ar' ? 'تعديل سند القبض' : 'Edit Receipt')
                : (locale === 'ar' ? 'إضافة سند قبض جديد' : 'Add New Receipt')
              }
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' ? 'أدخل تفاصيل سند القبض' : 'Enter receipt details'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'رقم السند' : 'Receipt Number'} *</Label>
                <Input
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="RCV-001"
                />
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
                <Label>{locale === 'ar' ? 'المستلم من' : 'Received From'} *</Label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder={locale === 'ar' ? 'اسم العميل' : 'Customer name'}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'المبلغ' : 'Amount'} *</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'} *</Label>
                <Select value={formData.paymentMethod} onValueChange={(value: any) => setFormData({ ...formData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">{locale === 'ar' ? 'نقدي' : 'Cash'}</SelectItem>
                    <SelectItem value="bank">{locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'}</SelectItem>
                    <SelectItem value="check">{locale === 'ar' ? 'شيك' : 'Check'}</SelectItem>
                    <SelectItem value="card">{locale === 'ar' ? 'بطاقة' : 'Card'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'رقم المرجع' : 'Reference Number'}</Label>
                <Input
                  value={formData.referenceNumber}
                  onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                  placeholder={locale === 'ar' ? 'رقم الشيك أو الحوالة' : 'Check or transfer number'}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الحساب' : 'Account'} *</Label>
                <Input
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder={locale === 'ar' ? 'حساب الصندوق أو البنك' : 'Cash or bank account'}
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
                    <SelectItem value="posted">{locale === 'ar' ? 'مرحّل' : 'Posted'}</SelectItem>
                    <SelectItem value="cancelled">{locale === 'ar' ? 'ملغى' : 'Cancelled'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'الوصف' : 'Description'} *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={locale === 'ar' ? 'وصف المقبوضات...' : 'Description of receipt...'}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmit}>
              {selectedReceipt 
                ? (locale === 'ar' ? 'تحديث' : 'Update')
                : (locale === 'ar' ? 'إضافة' : 'Add')
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Receipt Dialog */}
      {selectedReceipt && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{locale === 'ar' ? 'سند قبض' : 'Receipt Voucher'}</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'تحميل' : 'Download'}
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg">
                <Receipt className="h-16 w-16 mx-auto mb-2 text-green-600" />
                <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                  {selectedReceipt.amount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                </h2>
                <p className="text-sm text-muted-foreground">{selectedReceipt.number}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'التاريخ' : 'Date'}</p>
                  <p className="font-medium">{selectedReceipt.date}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الحالة' : 'Status'}</p>
                  {getStatusBadge(selectedReceipt.status)}
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'المستلم من' : 'Received From'}</p>
                  <p className="font-medium">{selectedReceipt.contactName}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الحساب' : 'Account'}</p>
                  <p className="font-medium">{selectedReceipt.accountName}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</p>
                  <p className="font-medium">{getPaymentMethodLabel(selectedReceipt.paymentMethod)}</p>
                </div>
                {selectedReceipt.referenceNumber && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'رقم المرجع' : 'Reference'}</p>
                    <p className="font-medium">{selectedReceipt.referenceNumber}</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الوصف' : 'Description'}</p>
                <p>{selectedReceipt.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

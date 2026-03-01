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
import { Plus, Search, CreditCard, Eye, Trash2, Edit, Download, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentVoucher {
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
  category: 'supplier' | 'expense' | 'salary' | 'other';
}

export default function AccountingPayments() {
  const { t, locale } = useLanguage();
  const [payments, setPayments] = useState<PaymentVoucher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentVoucher | null>(null);
  const [filterMethod, setFilterMethod] = useState<'all' | 'cash' | 'bank' | 'check' | 'card'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'posted' | 'cancelled'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'supplier' | 'expense' | 'salary' | 'other'>('all');

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
    category: 'expense' as 'supplier' | 'expense' | 'salary' | 'other',
  });

  const handleSubmit = () => {
    if (!formData.number || !formData.contactName || !formData.amount || !formData.accountName) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newPayment: PaymentVoucher = {
      id: selectedPayment?.id || Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (selectedPayment) {
      setPayments(payments.map(p => p.id === selectedPayment.id ? newPayment : p));
      toast.success(locale === 'ar' ? 'تم تحديث سند الصرف بنجاح' : 'Payment updated successfully');
    } else {
      setPayments([newPayment, ...payments]);
      toast.success(locale === 'ar' ? 'تم إضافة سند الصرف بنجاح' : 'Payment added successfully');
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
      category: 'expense',
    });
    setSelectedPayment(null);
    setShowDialog(false);
  };

  const handleEdit = (payment: PaymentVoucher) => {
    setSelectedPayment(payment);
    setFormData({
      number: payment.number,
      date: payment.date,
      contactName: payment.contactName,
      amount: payment.amount.toString(),
      paymentMethod: payment.paymentMethod,
      referenceNumber: payment.referenceNumber || '',
      accountName: payment.accountName,
      status: payment.status,
      description: payment.description,
      category: payment.category,
    });
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    setPayments(payments.filter(p => p.id !== id));
    toast.success(locale === 'ar' ? 'تم حذف سند الصرف بنجاح' : 'Payment deleted successfully');
  };

  const handleView = (payment: PaymentVoucher) => {
    setSelectedPayment(payment);
    setShowViewDialog(true);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || payment.category === filterCategory;
    return matchesSearch && matchesMethod && matchesStatus && matchesCategory;
  });

  const totalAmount = payments.filter(p => p.status === 'posted').reduce((sum, p) => sum + p.amount, 0);

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

  const getCategoryLabel = (category: string) => {
    const labels = {
      supplier: locale === 'ar' ? 'مورد' : 'Supplier',
      expense: locale === 'ar' ? 'مصروف' : 'Expense',
      salary: locale === 'ar' ? 'راتب' : 'Salary',
      other: locale === 'ar' ? 'أخرى' : 'Other',
    };
    return labels[category as keyof typeof labels];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{locale === 'ar' ? 'سندات الصرف' : 'Payment Vouchers'}</h1>
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'إدارة سندات الصرف والمدفوعات' : 'Manage payment vouchers and disbursements'}
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة سند صرف' : 'Add Payment'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'إجمالي السندات' : 'Total Payments'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مسودات' : 'Drafts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.filter(p => p.status === 'draft').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {locale === 'ar' ? 'مرحّلة' : 'Posted'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.filter(p => p.status === 'posted').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              {locale === 'ar' ? 'إجمالي المدفوعات' : 'Total Disbursed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث برقم السند أو الاسم...' : 'Search by number or name...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={(value: any) => setFilterCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الفئات' : 'All Categories'}</SelectItem>
                <SelectItem value="supplier">{locale === 'ar' ? 'مورد' : 'Supplier'}</SelectItem>
                <SelectItem value="expense">{locale === 'ar' ? 'مصروف' : 'Expense'}</SelectItem>
                <SelectItem value="salary">{locale === 'ar' ? 'راتب' : 'Salary'}</SelectItem>
                <SelectItem value="other">{locale === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'قائمة سندات الصرف' : 'Payments List'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'رقم السند' : 'Payment #'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المدفوع لـ' : 'Paid To'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                <TableHead>{locale === 'ar' ? 'طريقة الدفع' : 'Method'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    {locale === 'ar' ? 'لا توجد سندات صرف' : 'No payments found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.number}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.contactName}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {getCategoryLabel(payment.category)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getPaymentMethodLabel(payment.paymentMethod)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-red-600">
                      {payment.amount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(payment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(payment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(payment.id)}>
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

      {/* Add/Edit Payment Dialog */}
      <Dialog open={showDialog} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPayment 
                ? (locale === 'ar' ? 'تعديل سند الصرف' : 'Edit Payment')
                : (locale === 'ar' ? 'إضافة سند صرف جديد' : 'Add New Payment')
              }
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' ? 'أدخل تفاصيل سند الصرف' : 'Enter payment details'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'رقم السند' : 'Payment Number'} *</Label>
                <Input
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="PAY-001"
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
                <Label>{locale === 'ar' ? 'المدفوع لـ' : 'Paid To'} *</Label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder={locale === 'ar' ? 'اسم المورد أو المستفيد' : 'Supplier or beneficiary name'}
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
                <Label>{locale === 'ar' ? 'الفئة' : 'Category'} *</Label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">{locale === 'ar' ? 'دفع لمورد' : 'Supplier Payment'}</SelectItem>
                    <SelectItem value="expense">{locale === 'ar' ? 'مصروف' : 'Expense'}</SelectItem>
                    <SelectItem value="salary">{locale === 'ar' ? 'راتب' : 'Salary'}</SelectItem>
                    <SelectItem value="other">{locale === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
                  </SelectContent>
                </Select>
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
                placeholder={locale === 'ar' ? 'وصف المدفوعات...' : 'Description of payment...'}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmit}>
              {selectedPayment 
                ? (locale === 'ar' ? 'تحديث' : 'Update')
                : (locale === 'ar' ? 'إضافة' : 'Add')
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Payment Dialog */}
      {selectedPayment && (
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{locale === 'ar' ? 'سند صرف' : 'Payment Voucher'}</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'تحميل' : 'Download'}
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg">
                <CreditCard className="h-16 w-16 mx-auto mb-2 text-red-600" />
                <h2 className="text-3xl font-bold text-red-700 dark:text-red-300 mb-2">
                  {selectedPayment.amount.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                </h2>
                <p className="text-sm text-muted-foreground">{selectedPayment.number}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'التاريخ' : 'Date'}</p>
                  <p className="font-medium">{selectedPayment.date}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الحالة' : 'Status'}</p>
                  {getStatusBadge(selectedPayment.status)}
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'المدفوع لـ' : 'Paid To'}</p>
                  <p className="font-medium">{selectedPayment.contactName}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الفئة' : 'Category'}</p>
                  <p className="font-medium">{getCategoryLabel(selectedPayment.category)}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الحساب' : 'Account'}</p>
                  <p className="font-medium">{selectedPayment.accountName}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</p>
                  <p className="font-medium">{getPaymentMethodLabel(selectedPayment.paymentMethod)}</p>
                </div>
                {selectedPayment.referenceNumber && (
                  <div className="p-3 bg-muted rounded-lg col-span-2">
                    <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'رقم المرجع' : 'Reference'}</p>
                    <p className="font-medium">{selectedPayment.referenceNumber}</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{locale === 'ar' ? 'الوصف' : 'Description'}</p>
                <p>{selectedPayment.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

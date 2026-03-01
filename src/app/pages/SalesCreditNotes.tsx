import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
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
import { Plus, Edit, Trash2, Search, FileText, Calendar, DollarSign, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';

interface CreditNote {
  id: string;
  creditNoteNumber: string;
  invoiceReference: string;
  customerName: string;
  date: string;
  amount: number;
  tax: number;
  total: number;
  reason: string;
  status: 'draft' | 'issued' | 'applied' | 'cancelled';
  notes: string;
}

export default function SalesCreditNotes() {
  const { t, locale } = useLanguage();
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<CreditNote | null>(null);
  const [formData, setFormData] = useState({
    creditNoteNumber: '',
    invoiceReference: '',
    customerName: '',
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    tax: 0,
    total: 0,
    reason: '',
    status: 'draft' as const,
    notes: '',
  });

  const calculateTotal = (amount: number, tax: number) => {
    return amount + (amount * tax / 100);
  };

  const updateAmount = (field: 'amount' | 'tax', value: number) => {
    const newData = { ...formData, [field]: value };
    newData.total = calculateTotal(newData.amount, newData.tax);
    setFormData(newData);
  };

  const handleSave = () => {
    if (!formData.creditNoteNumber || !formData.customerName || !formData.amount) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newNote: CreditNote = {
      id: editingNote?.id || `CN-${Date.now()}`,
      ...formData,
      total: calculateTotal(formData.amount, formData.tax),
    };

    if (editingNote) {
      setCreditNotes(creditNotes.map(n => n.id === editingNote.id ? newNote : n));
      toast.success(locale === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully');
    } else {
      setCreditNotes([...creditNotes, newNote]);
      toast.success(locale === 'ar' ? 'تم الإضافة بنجاح' : 'Added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingNote(null);
    setFormData({
      creditNoteNumber: `CN-${String(creditNotes.length + 1).padStart(4, '0')}`,
      invoiceReference: '',
      customerName: '',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      tax: 15,
      total: 0,
      reason: '',
      status: 'draft',
      notes: '',
    });
  };

  const handleEdit = (note: CreditNote) => {
    setEditingNote(note);
    setFormData(note);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setCreditNotes(creditNotes.filter(n => n.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const filteredNotes = creditNotes.filter(note => {
    const matchesSearch = 
      note.creditNoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.invoiceReference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || note.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: creditNotes.length,
    draft: creditNotes.filter(n => n.status === 'draft').length,
    issued: creditNotes.filter(n => n.status === 'issued').length,
    applied: creditNotes.filter(n => n.status === 'applied').length,
    totalAmount: creditNotes.reduce((sum, n) => sum + n.total, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'issued': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      draft: { ar: 'مسودة', en: 'Draft' },
      issued: { ar: 'صادر', en: 'Issued' },
      applied: { ar: 'مطبق', en: 'Applied' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
    };
    return locale === 'ar' ? labels[status]?.ar : labels[status]?.en;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'إشعارات دائنة المبيعات' : 'Sales Credit Notes'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة إشعارات دائنة المبيعات' : 'Manage sales credit notes'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'قريباً...' : 'Coming soon...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            {t('add')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'الإجمالي' : 'Total'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'مسودة' : 'Draft'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600">{stats.draft}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'صادر' : 'Issued'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.issued}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'مطبق' : 'Applied'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.applied}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount'}</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{stats.totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="draft">{locale === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                <SelectItem value="issued">{locale === 'ar' ? 'صادر' : 'Issued'}</SelectItem>
                <SelectItem value="applied">{locale === 'ar' ? 'مطبق' : 'Applied'}</SelectItem>
                <SelectItem value="cancelled">{locale === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الرقم' : 'Number'}</TableHead>
                <TableHead>{locale === 'ar' ? 'مرجع الفاتورة' : 'Invoice Ref'}</TableHead>
                <TableHead>{locale === 'ar' ? 'العميل' : 'Customer'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredNotes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="font-mono font-semibold">{note.creditNoteNumber}</TableCell>
                    <TableCell className="font-mono">{note.invoiceReference}</TableCell>
                    <TableCell>{note.customerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(note.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{note.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-purple-600">{note.total.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                        {getStatusLabel(note.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(note)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingNote 
                ? (locale === 'ar' ? 'تعديل الإشعار الدائن' : 'Edit Credit Note')
                : (locale === 'ar' ? 'إشعار دائن جديد' : 'New Credit Note')
              }
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'رقم الإشعار' : 'Credit Note Number'} *</Label>
                <Input
                  value={formData.creditNoteNumber}
                  onChange={(e) => setFormData({ ...formData, creditNoteNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'مرجع الفاتورة' : 'Invoice Reference'} *</Label>
                <Input
                  value={formData.invoiceReference}
                  onChange={(e) => setFormData({ ...formData, invoiceReference: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'العميل' : 'Customer'} *</Label>
                <Input
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
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
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'المبلغ' : 'Amount'} *</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => updateAmount('amount', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الضريبة %' : 'Tax %'}</Label>
                <Input
                  type="number"
                  value={formData.tax}
                  onChange={(e) => updateAmount('tax', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الإجمالي' : 'Total'}</Label>
                <Input
                  type="number"
                  value={formData.total.toFixed(2)}
                  disabled
                  className="bg-muted font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'السبب' : 'Reason'} *</Label>
              <Textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder={locale === 'ar' ? 'اذكر سبب الإشعار الدائن...' : 'Enter reason for credit note...'}
                rows={2}
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
                  <SelectItem value="issued">{locale === 'ar' ? 'صادر' : 'Issued'}</SelectItem>
                  <SelectItem value="applied">{locale === 'ar' ? 'مطبق' : 'Applied'}</SelectItem>
                  <SelectItem value="cancelled">{locale === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'ملاحظات' : 'Notes'}</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleSave}>{t('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

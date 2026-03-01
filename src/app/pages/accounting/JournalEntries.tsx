import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  BookText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import { IFRS_CHART_OF_ACCOUNTS } from '../../../lib/accounting-standards';

const translations = {
  ar: {
    journalEntries: 'القيود المحاسبية',
    journalDescription: 'إدارة القيود اليومية وفقاً للمعايير الدولية',
    searchEntries: 'البحث في القيود...',
    newEntry: 'قيد جديد',
    entryNumber: 'رقم القيد',
    date: 'التاريخ',
    description: 'الوصف',
    status: 'الحالة',
    totalDebit: 'إجمالي المدين',
    totalCredit: 'إجمالي الدائن',
    actions: 'الإجراءات',
    draft: 'مسودة',
    posted: 'مرحّل',
    reversed: 'معكوس',
    view: 'عرض',
    edit: 'تعديل',
    delete: 'حذف',
    post: 'ترحيل',
    reverse: 'عكس',
    createJournalEntry: 'إنشاء قيد محاسبي',
    entryDate: 'تاريخ القيد',
    reference: 'المرجع',
    entryDescription: 'وصف القيد',
    account: 'الحساب',
    debit: 'مدين',
    credit: 'دائن',
    addLine: 'إضافة سطر',
    save: 'حفظ',
    cancel: 'إلغاء',
    saveAndPost: 'حفظ وترحيل',
    difference: 'الفرق',
    balanced: 'متوازن',
    unbalanced: 'غير متوازن',
    selectAccount: 'اختر الحساب',
    lineDescription: 'وصف السطر',
  },
  en: {
    journalEntries: 'Journal Entries',
    journalDescription: 'Manage journal entries according to IFRS standards',
    searchEntries: 'Search entries...',
    newEntry: 'New Entry',
    entryNumber: 'Entry No.',
    date: 'Date',
    description: 'Description',
    status: 'Status',
    totalDebit: 'Total Debit',
    totalCredit: 'Total Credit',
    actions: 'Actions',
    draft: 'Draft',
    posted: 'Posted',
    reversed: 'Reversed',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    post: 'Post',
    reverse: 'Reverse',
    createJournalEntry: 'Create Journal Entry',
    entryDate: 'Entry Date',
    reference: 'Reference',
    entryDescription: 'Entry Description',
    account: 'Account',
    debit: 'Debit',
    credit: 'Credit',
    addLine: 'Add Line',
    save: 'Save',
    cancel: 'Cancel',
    saveAndPost: 'Save & Post',
    difference: 'Difference',
    balanced: 'Balanced',
    unbalanced: 'Unbalanced',
    selectAccount: 'Select Account',
    lineDescription: 'Line Description',
  },
};

interface JournalLine {
  id: string;
  accountCode: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
}

interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  reference: string;
  description: string;
  lines: JournalLine[];
  status: 'draft' | 'posted' | 'reversed';
  totalDebit: number;
  totalCredit: number;
}

// Mock data
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    entryNumber: 'JE-2024-001',
    date: '2024-02-27',
    reference: 'INV-001',
    description: 'مبيعات بضاعة نقداً',
    status: 'posted',
    totalDebit: 11500,
    totalCredit: 11500,
    lines: [
      {
        id: '1-1',
        accountCode: '11100',
        accountName: 'النقدية في الصندوق',
        description: 'استلام نقدية من المبيعات',
        debit: 11500,
        credit: 0,
      },
      {
        id: '1-2',
        accountCode: '41100',
        accountName: 'مبيعات منتجات',
        description: 'إيرادات مبيعات',
        debit: 0,
        credit: 10000,
      },
      {
        id: '1-3',
        accountCode: '25100',
        accountName: 'ضريبة القيمة المضافة المستحقة',
        description: 'ضريبة 15%',
        debit: 0,
        credit: 1500,
      },
    ],
  },
  {
    id: '2',
    entryNumber: 'JE-2024-002',
    date: '2024-02-26',
    reference: 'PO-045',
    description: 'شراء مواد خام على الحساب',
    status: 'posted',
    totalDebit: 23000,
    totalCredit: 23000,
    lines: [
      {
        id: '2-1',
        accountCode: '13100',
        accountName: 'مواد خام',
        description: 'شراء مواد خام',
        debit: 20000,
        credit: 0,
      },
      {
        id: '2-2',
        accountCode: '15200',
        accountName: 'ضريبة القيمة المضافة القابلة للاسترداد',
        description: 'ضريبة مستردة',
        debit: 3000,
        credit: 0,
      },
      {
        id: '2-3',
        accountCode: '21100',
        accountName: 'حسابات دائنة',
        description: 'مستحق للمورد',
        debit: 0,
        credit: 23000,
      },
    ],
  },
  {
    id: '3',
    entryNumber: 'JE-2024-003',
    date: '2024-02-25',
    reference: 'SAL-001',
    description: 'مصروف رواتب الشهر',
    status: 'draft',
    totalDebit: 50000,
    totalCredit: 50000,
    lines: [
      {
        id: '3-1',
        accountCode: '62100',
        accountName: 'رواتب وأجور',
        description: 'رواتب شهر فبراير',
        debit: 50000,
        credit: 0,
      },
      {
        id: '3-2',
        accountCode: '23100',
        accountName: 'رواتب مستحقة',
        description: 'رواتب مستحقة للموظفين',
        debit: 0,
        credit: 50000,
      },
    ],
  },
];

export default function JournalEntries() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // New entry state
  const [newEntryDate, setNewEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEntryRef, setNewEntryRef] = useState('');
  const [newEntryDesc, setNewEntryDesc] = useState('');
  const [newEntryLines, setNewEntryLines] = useState<JournalLine[]>([
    { id: '1', accountCode: '', accountName: '', description: '', debit: 0, credit: 0 },
    { id: '2', accountCode: '', accountName: '', description: '', debit: 0, credit: 0 },
  ]);

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.entryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'posted':
        return <Badge className="bg-green-100 text-green-800">{t('posted')}</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('draft')}</Badge>;
      case 'reversed':
        return <Badge className="bg-red-100 text-red-800">{t('reversed')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const addLine = () => {
    const newLine: JournalLine = {
      id: `${newEntryLines.length + 1}`,
      accountCode: '',
      accountName: '',
      description: '',
      debit: 0,
      credit: 0,
    };
    setNewEntryLines([...newEntryLines, newLine]);
  };

  const updateLine = (index: number, field: keyof JournalLine, value: any) => {
    const updatedLines = [...newEntryLines];
    updatedLines[index] = { ...updatedLines[index], [field]: value };

    // If account code changed, update account name
    if (field === 'accountCode') {
      const account = IFRS_CHART_OF_ACCOUNTS.find((a) => a.accountCode === value);
      if (account) {
        updatedLines[index].accountName = locale === 'ar' ? account.nameAr : account.name;
      }
    }

    setNewEntryLines(updatedLines);
  };

  const removeLine = (index: number) => {
    if (newEntryLines.length > 2) {
      setNewEntryLines(newEntryLines.filter((_, i) => i !== index));
    }
  };

  const calculateTotals = () => {
    const totalDebit = newEntryLines.reduce((sum, line) => sum + (line.debit || 0), 0);
    const totalCredit = newEntryLines.reduce((sum, line) => sum + (line.credit || 0), 0);
    const difference = Math.abs(totalDebit - totalCredit);
    const isBalanced = difference < 0.01;

    return { totalDebit, totalCredit, difference, isBalanced };
  };

  const handleSave = (andPost: boolean = false) => {
    const { totalDebit, totalCredit, isBalanced } = calculateTotals();

    if (!isBalanced) {
      toast.error(locale === 'ar' ? 'القيد غير متوازن' : 'Entry is not balanced');
      return;
    }

    const newEntry: JournalEntry = {
      id: `${entries.length + 1}`,
      entryNumber: `JE-2024-${String(entries.length + 1).padStart(3, '0')}`,
      date: newEntryDate,
      reference: newEntryRef,
      description: newEntryDesc,
      lines: newEntryLines,
      status: andPost ? 'posted' : 'draft',
      totalDebit,
      totalCredit,
    };

    setEntries([newEntry, ...entries]);
    setIsCreateDialogOpen(false);
    toast.success(
      andPost
        ? locale === 'ar'
          ? 'تم إنشاء وترحيل القيد بنجاح'
          : 'Entry created and posted successfully'
        : locale === 'ar'
        ? 'تم إنشاء القيد بنجاح'
        : 'Entry created successfully'
    );

    // Reset form
    setNewEntryDate(new Date().toISOString().split('T')[0]);
    setNewEntryRef('');
    setNewEntryDesc('');
    setNewEntryLines([
      { id: '1', accountCode: '', accountName: '', description: '', debit: 0, credit: 0 },
      { id: '2', accountCode: '', accountName: '', description: '', debit: 0, credit: 0 },
    ]);
  };

  const { totalDebit, totalCredit, difference, isBalanced } = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookText className="h-8 w-8 text-blue-600" />
            {t('journalEntries')}
          </h1>
          <p className="text-gray-600 mt-1">{t('journalDescription')}</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {t('newEntry')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('createJournalEntry')}</DialogTitle>
              <DialogDescription>{t('journalDescription')}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Entry Header */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t('entryDate')}</Label>
                  <Input
                    type="date"
                    value={newEntryDate}
                    onChange={(e) => setNewEntryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('reference')}</Label>
                  <Input
                    value={newEntryRef}
                    onChange={(e) => setNewEntryRef(e.target.value)}
                    placeholder="INV-001, PO-045..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('description')}</Label>
                  <Input
                    value={newEntryDesc}
                    onChange={(e) => setNewEntryDesc(e.target.value)}
                  />
                </div>
              </div>

              {/* Entry Lines */}
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {locale === 'ar' ? 'سطور القيد' : 'Entry Lines'}
                  </h3>
                  <Button size="sm" variant="outline" onClick={addLine}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('addLine')}
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">{t('account')}</TableHead>
                      <TableHead>{t('lineDescription')}</TableHead>
                      <TableHead className="w-[150px]">{t('debit')}</TableHead>
                      <TableHead className="w-[150px]">{t('credit')}</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newEntryLines.map((line, index) => (
                      <TableRow key={line.id}>
                        <TableCell>
                          <Select
                            value={line.accountCode}
                            onValueChange={(value) => updateLine(index, 'accountCode', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('selectAccount')} />
                            </SelectTrigger>
                            <SelectContent>
                              {IFRS_CHART_OF_ACCOUNTS.filter((a) => a.level === 3).map(
                                (account) => (
                                  <SelectItem key={account.id} value={account.accountCode}>
                                    {account.accountCode} -{' '}
                                    {locale === 'ar' ? account.nameAr : account.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={line.description}
                            onChange={(e) => updateLine(index, 'description', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={line.debit || ''}
                            onChange={(e) =>
                              updateLine(index, 'debit', parseFloat(e.target.value) || 0)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={line.credit || ''}
                            onChange={(e) =>
                              updateLine(index, 'credit', parseFloat(e.target.value) || 0)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeLine(index)}
                            disabled={newEntryLines.length <= 2}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Totals */}
                <div className="flex justify-end gap-8 pt-4 border-t">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t('totalDebit')}</p>
                    <p className="text-xl font-bold">{formatCurrency(totalDebit)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t('totalCredit')}</p>
                    <p className="text-xl font-bold">{formatCurrency(totalCredit)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t('difference')}</p>
                    <p
                      className={`text-xl font-bold ${
                        isBalanced ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatCurrency(difference)}
                    </p>
                    {isBalanced ? (
                      <Badge className="bg-green-100 text-green-800">{t('balanced')}</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">{t('unbalanced')}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                {t('cancel')}
              </Button>
              <Button variant="outline" onClick={() => handleSave(false)}>
                {t('save')}
              </Button>
              <Button onClick={() => handleSave(true)} disabled={!isBalanced}>
                {t('saveAndPost')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('searchEntries')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                {locale === 'ar' ? 'الكل' : 'All'}
              </Button>
              <Button
                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('draft')}
              >
                {t('draft')}
              </Button>
              <Button
                variant={filterStatus === 'posted' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('posted')}
              >
                {t('posted')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entries Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('entryNumber')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('reference')}</TableHead>
                <TableHead>{t('description')}</TableHead>
                <TableHead>{t('totalDebit')}</TableHead>
                <TableHead>{t('totalCredit')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.entryNumber}</TableCell>
                  <TableCell>{new Date(entry.date).toLocaleDateString(locale)}</TableCell>
                  <TableCell>{entry.reference}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{formatCurrency(entry.totalDebit)}</TableCell>
                  <TableCell>{formatCurrency(entry.totalCredit)}</TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {entry.status === 'draft' && (
                        <>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

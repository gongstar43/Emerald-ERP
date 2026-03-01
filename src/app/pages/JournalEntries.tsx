import React, { useState, useEffect } from 'react';
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
  DialogDescription,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Plus, Edit, Trash2, Search, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  lines: JournalLine[];
  status: 'draft' | 'posted';
  createdBy: string;
}

interface JournalLine {
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description: string;
}

export default function JournalEntries() {
  const { t, locale } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    reference: '',
    description: '',
    lines: [
      { accountCode: '', accountName: '', debit: 0, credit: 0, description: '' },
      { accountCode: '', accountName: '', debit: 0, credit: 0, description: '' },
    ],
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    // Start with clean empty data
    setEntries([]);
  };

  const handleSave = () => {
    const totalDebit = formData.lines.reduce((sum, line) => sum + Number(line.debit), 0);
    const totalCredit = formData.lines.reduce((sum, line) => sum + Number(line.credit), 0);

    if (totalDebit !== totalCredit) {
      toast.error(locale === 'ar' ? 'المجموع المدين والدائن غير متوازن' : 'Debit and Credit totals must match');
      return;
    }

    toast.success(t('savedSuccessfully'));
    setIsDialogOpen(false);
    loadEntries();
  };

  const addLine = () => {
    setFormData({
      ...formData,
      lines: [...formData.lines, { accountCode: '', accountName: '', debit: 0, credit: 0, description: '' }],
    });
  };

  const removeLine = (index: number) => {
    if (formData.lines.length <= 2) {
      toast.error(locale === 'ar' ? 'يجب أن يحتوي القيد على سطرين على الأقل' : 'Entry must have at least 2 lines');
      return;
    }
    const newLines = formData.lines.filter((_, i) => i !== index);
    setFormData({ ...formData, lines: newLines });
  };

  const updateLine = (index: number, field: keyof JournalLine, value: any) => {
    const newLines = [...formData.lines];
    newLines[index] = { ...newLines[index], [field]: value };
    setFormData({ ...formData, lines: newLines });
  };

  const getTotalDebit = () => formData.lines.reduce((sum, line) => sum + Number(line.debit), 0);
  const getTotalCredit = () => formData.lines.reduce((sum, line) => sum + Number(line.credit), 0);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('journalEntries')}</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('add')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {entry.reference}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        entry.status === 'posted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {entry.status === 'posted' ? t('approved') : t('draft')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('accountCode')}</TableHead>
                        <TableHead>{t('accountName')}</TableHead>
                        <TableHead className="text-right">{t('debit')}</TableHead>
                        <TableHead className="text-right">{t('credit')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entry.lines.map((line, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono">{line.accountCode}</TableCell>
                          <TableCell>{line.accountName}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {line.debit > 0 ? line.debit.toLocaleString() : '-'}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {line.credit > 0 ? line.credit.toLocaleString() : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/50 font-bold">
                        <TableCell colSpan={2}>{t('total')}</TableCell>
                        <TableCell className="text-right">
                          {entry.lines.reduce((sum, l) => sum + l.debit, 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {entry.lines.reduce((sum, l) => sum + l.credit, 0).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('addNew')} - {t('journal')}</DialogTitle>
            <DialogDescription>
              {locale === 'ar' 
                ? 'إضافة قيد يومية جديد إلى السجل المحاسبي' 
                : 'Add new journal entry to accounting records'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('date')}</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الرقم المرجعي' : 'Reference'}</Label>
                <Input
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder="JE-001"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t('description')}</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-lg">{locale === 'ar' ? 'السطور' : 'Lines'}</Label>
                <Button onClick={addLine} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'إضافة سطر' : 'Add Line'}
                </Button>
              </div>
              <div className="space-y-3 border rounded-lg p-4">
                {formData.lines.map((line, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end p-3 border rounded">
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">{t('accountCode')}</Label>
                      <Input
                        value={line.accountCode}
                        onChange={(e) => updateLine(index, 'accountCode', e.target.value)}
                        placeholder="1110"
                      />
                    </div>
                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">{t('accountName')}</Label>
                      <Input
                        value={line.accountName}
                        onChange={(e) => updateLine(index, 'accountName', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">{t('debit')}</Label>
                      <Input
                        type="number"
                        value={line.debit}
                        onChange={(e) => updateLine(index, 'debit', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">{t('credit')}</Label>
                      <Input
                        type="number"
                        value={line.credit}
                        onChange={(e) => updateLine(index, 'credit', e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLine(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12 gap-2 p-3 bg-muted rounded font-bold">
                  <div className="col-span-5">{t('total')}</div>
                  <div className="col-span-3 text-right">{getTotalDebit().toLocaleString()}</div>
                  <div className="col-span-3 text-right">{getTotalCredit().toLocaleString()}</div>
                  <div className="col-span-1"></div>
                </div>
                {getTotalDebit() !== getTotalCredit() && (
                  <p className="text-sm text-destructive">
                    {locale === 'ar' ? '⚠️ المجموع غير متوازن' : '⚠️ Totals not balanced'}
                  </p>
                )}
              </div>
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
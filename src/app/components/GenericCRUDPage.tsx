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
import { Plus, Edit, Trash2, Search, Download, Filter, LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

interface GenericItem {
  id: string;
  [key: string]: any;
}

interface FieldConfig {
  name: string;
  label: { ar: string; en: string };
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'email' | 'tel';
  required?: boolean;
  options?: Array<{ value: string; label: { ar: string; en: string } }>;
  placeholder?: { ar: string; en: string };
  disabled?: boolean;
  col?: number; // Grid column span
}

interface StatsConfig {
  label: { ar: string; en: string };
  value: (items: GenericItem[]) => number | string;
  color: string;
  icon?: LucideIcon;
}

interface TableColumnConfig {
  key: string;
  label: { ar: string; en: string };
  render?: (value: any, item: GenericItem) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface GenericCRUDPageProps {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  fields: FieldConfig[];
  columns: TableColumnConfig[];
  stats?: StatsConfig[];
  initialData?: GenericItem[]; // Add initialData prop
  defaultValues: Partial<GenericItem>;
  generateId: (items: GenericItem[]) => string;
  statusField?: string;
  statusOptions?: Array<{ value: string; label: { ar: string; en: string }; color: string }>;
}

export default function GenericCRUDPage({
  title,
  description,
  fields,
  columns,
  stats,
  initialData = [], // Default to empty array
  defaultValues,
  generateId,
  statusField,
  statusOptions,
}: GenericCRUDPageProps) {
  const { t, locale } = useLanguage();
  const [items, setItems] = useState<GenericItem[]>(initialData); // Use initialData
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GenericItem | null>(null);
  const [formData, setFormData] = useState<GenericItem>(defaultValues as GenericItem);

  const handleSave = () => {
    // Basic validation
    const requiredFields = fields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !formData[f.name]);
    
    if (missingFields.length > 0) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    const newItem: GenericItem = {
      id: editingItem?.id || generateId(items),
      ...formData,
    };

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? newItem : item));
      toast.success(locale === 'ar' ? 'تم التحديث بنجاح' : 'Updated successfully');
    } else {
      setItems([...items, newItem]);
      toast.success(locale === 'ar' ? 'تم الإضافة بنجاح' : 'Added successfully');
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData(defaultValues as GenericItem);
  };

  const handleEdit = (item: GenericItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm(t('confirmDelete'))) return;
    setItems(items.filter(item => item.id !== id));
    toast.success(t('deletedSuccessfully'));
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = !statusField || filterStatus === 'all' || item[statusField] === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const getStatusColor = (status: string) => {
    if (!statusOptions) return 'bg-gray-100 text-gray-800';
    const option = statusOptions.find(opt => opt.value === status);
    return option?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    if (!statusOptions) return status;
    const option = statusOptions.find(opt => opt.value === status);
    return locale === 'ar' ? option?.label.ar : option?.label.en;
  };

  const renderField = (field: FieldConfig) => {
    const label = locale === 'ar' ? field.label.ar : field.label.en;
    const placeholder = field.placeholder ? (locale === 'ar' ? field.placeholder.ar : field.placeholder.en) : '';

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="space-y-2" style={{ gridColumn: `span ${field.col || 1}` }}>
            <Label>{label} {field.required && '*'}</Label>
            <Select 
              value={formData[field.name] || ''} 
              onValueChange={(value) => updateFormData(field.name, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {locale === 'ar' ? opt.label.ar : opt.label.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="space-y-2" style={{ gridColumn: `span ${field.col || 2}` }}>
            <Label>{label} {field.required && '*'}</Label>
            <Textarea
              value={formData[field.name] || ''}
              onChange={(e) => updateFormData(field.name, e.target.value)}
              placeholder={placeholder}
              rows={3}
            />
          </div>
        );

      default:
        return (
          <div key={field.name} className="space-y-2" style={{ gridColumn: `span ${field.col || 1}` }}>
            <Label>{label} {field.required && '*'}</Label>
            <Input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => updateFormData(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              placeholder={placeholder}
              disabled={field.disabled}
              className={field.disabled ? 'bg-muted' : ''}
            />
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? title.ar : title.en}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? description.ar : description.en}
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

      {stats && stats.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-${stats.length} gap-4`}>
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-3">
                <p className="text-sm text-muted-foreground">
                  {locale === 'ar' ? stat.label.ar : stat.label.en}
                </p>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value(items)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
            {statusField && statusOptions && (
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'الكل' : 'All'}</SelectItem>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {locale === 'ar' ? opt.label.ar : opt.label.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key} className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}>
                    {locale === 'ar' ? col.label.ar : col.label.en}
                  </TableHead>
                ))}
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-8">
                    {t('noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}>
                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem 
                ? (locale === 'ar' ? `تعديل ${title.ar}` : `Edit ${title.en}`)
                : (locale === 'ar' ? `إضافة ${title.ar}` : `Add ${title.en}`)
              }
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {fields.map(field => renderField(field))}
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
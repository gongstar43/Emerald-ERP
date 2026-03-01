import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { safeApiRequest } from '../../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier' | 'both';
  balance: number;
  address?: string;
}

export default function Contacts() {
  const { t, locale } = useLanguage();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'customer' as const,
    address: '',
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await safeApiRequest('/api/contacts');
      setContacts(data);
    } catch (error: any) {
      // Silently set empty array on error
      setContacts([]);
      
      // Only show toast for unexpected errors (not backend unavailable)
      if (!error?.message?.includes('BACKEND_UNAVAILABLE')) {
        toast.error(
          locale === 'ar' 
            ? 'فشل تحميل جهات الاتصال. حاول مرة أخرى.' 
            : 'Failed to load contacts. Try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await safeApiRequest(`/api/contacts/${editingContact.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        toast.success(locale === 'ar' ? 'تم تحديث جهة الاتصال' : 'Contact updated');
      } else {
        await safeApiRequest('/api/contacts', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        toast.success(locale === 'ar' ? 'تم إضافة جهة الاتصال' : 'Contact added');
      }
      setIsDialogOpen(false);
      resetForm();
      loadContacts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(locale === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) return;
    
    try {
      await safeApiRequest(`/api/contacts/${id}`, { method: 'DELETE' });
      toast.success(locale === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully');
      loadContacts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: 'customer',
      address: '',
    });
    setEditingContact(null);
  };

  const openEditDialog = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      type: contact.type,
      address: contact.address || '',
    });
    setIsDialogOpen(true);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const getTypeLabel = (type: string) => {
    const labels = {
      customer: locale === 'ar' ? 'عميل' : 'Customer',
      supplier: locale === 'ar' ? 'مورد' : 'Supplier',
      both: locale === 'ar' ? 'عميل/مورد' : 'Both',
    };
    return labels[type as keyof typeof labels];
  };

  const getTypeBadgeVariant = (type: string): "default" | "secondary" | "destructive" => {
    return type === 'customer' ? 'default' : type === 'supplier' ? 'secondary' : 'default';
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('contacts')}</h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة العملاء والموردين' : 'Manage customers and suppliers'}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('add')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingContact 
                  ? (locale === 'ar' ? 'تعديل جهة اتصال' : 'Edit Contact')
                  : (locale === 'ar' ? 'إضافة جهة اتصال' : 'Add Contact')
                }
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'أدخل بيانات جهة الاتصال' : 'Enter contact details'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">{locale === 'ar' ? 'النوع' : 'Type'}</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="customer">{getTypeLabel('customer')}</option>
                  <option value="supplier">{getTypeLabel('supplier')}</option>
                  <option value="both">{getTypeLabel('both')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit">{t('save')}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الرصيد' : 'Balance'}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">{t('loading')}</TableCell>
                </TableRow>
              ) : filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {locale === 'ar' ? 'لا توجد جهات اتصال' : 'No contacts found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {contact.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {contact.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(contact.type)}>
                        {getTypeLabel(contact.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={contact.balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {contact.balance.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(contact)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(contact.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}
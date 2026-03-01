import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { useNavigate } from 'react-router';
import { safeApiRequest } from '../../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Building2, Phone, Mail } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  type: string;
  registrationNumber: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

export default function Businesses() {
  const { t, locale } = useLanguage();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const data = await safeApiRequest('/api/businesses');
      setBusinesses(data || []);
    } catch (error) {
      // Set empty array on error
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.registrationNumber.includes(searchQuery)
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('businesses')}</h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة الشركات والمؤسسات' : 'Manage companies and organizations'}
          </p>
        </div>
        <Button onClick={() => navigate('/businesses/add')}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                <TableHead>{locale === 'ar' ? 'رقم السجل' : 'Registration No.'}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">{t('loading')}</TableCell>
                </TableRow>
              ) : filteredBusinesses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {locale === 'ar' ? 'لا توجد شركات' : 'No businesses found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBusinesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{business.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{business.type}</TableCell>
                    <TableCell className="font-mono">{business.registrationNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {business.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {business.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                        {business.status === 'active' 
                          ? (locale === 'ar' ? 'نشط' : 'Active')
                          : (locale === 'ar' ? 'غير نشط' : 'Inactive')
                        }
                      </Badge>
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
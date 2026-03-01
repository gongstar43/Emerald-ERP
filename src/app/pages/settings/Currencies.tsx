import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  Star,
  Globe,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Download,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';
import { globalCurrencies, getCurrenciesByRegion } from '../../../lib/currencyData';
import CurrencySelector from '../../components/CurrencySelector';
import CurrencyAmount from '../../components/CurrencyAmount';

export default function Currencies() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي العملات' : 'Total Currencies',
      value: globalCurrencies.length,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'عملات نشطة' : 'Active Currencies',
      value: globalCurrencies.filter(c => c.isActive).length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'العملة الأساسية' : 'Base Currency',
      value: 'SAR',
      icon: Star,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: locale === 'ar' ? 'آخر تحديث' : 'Last Update',
      value: locale === 'ar' ? 'اليوم' : 'Today',
      icon: RefreshCw,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const regions = [
    { value: 'all', label: locale === 'ar' ? 'جميع المناطق' : 'All Regions' },
    { value: 'middle-east', label: locale === 'ar' ? 'الشرق الأوسط' : 'Middle East' },
    { value: 'asia', label: locale === 'ar' ? 'آسيا' : 'Asia' },
    { value: 'europe', label: locale === 'ar' ? 'أوروبا' : 'Europe' },
    { value: 'americas', label: locale === 'ar' ? 'الأمريكتان' : 'Americas' },
    { value: 'africa', label: locale === 'ar' ? 'أفريقيا' : 'Africa' },
  ];

  const filteredCurrencies = globalCurrencies.filter(currency => {
    const matchesSearch =
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.nameAr.includes(searchQuery) ||
      currency.countryNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.countryNameAr.includes(searchQuery);

    let matchesRegion = true;
    if (selectedRegion !== 'all') {
      const regionCurrencies = getCurrenciesByRegion(selectedRegion as any);
      matchesRegion = regionCurrencies.some(c => c.code === currency.code);
    }

    return matchesSearch && matchesRegion;
  });

  const middleEastCurrencies = getCurrenciesByRegion('middle-east');
  const asiaCurrencies = getCurrenciesByRegion('asia');
  const europeCurrencies = getCurrenciesByRegion('europe');
  const americasCurrencies = getCurrenciesByRegion('americas');
  const africaCurrencies = getCurrenciesByRegion('africa');

  const handleSetBaseCurrency = (code: string) => {
    toast.success(
      locale === 'ar'
        ? `تم تعيين ${code} كعملة أساسية`
        : `${code} set as base currency`
    );
  };

  const handleToggleActive = (code: string, isActive: boolean) => {
    toast.success(
      locale === 'ar'
        ? isActive ? `تم تفعيل ${code}` : `تم إلغاء تفعيل ${code}`
        : isActive ? `${code} activated` : `${code} deactivated`
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'إدارة العملات' : 'Currency Management'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'إدارة شاملة للعملات المتعددة - 40+ عملة عالمية'
              : 'Comprehensive multi-currency management - 40+ global currencies'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التحديث...' : 'Updating...')}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تحديث الأسعار' : 'Update Rates'}
          </Button>
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">{stat.title}</div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث بالكود أو الاسم أو الدولة...' : 'Search by code, name, or country...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            {locale === 'ar' ? 'جميع العملات' : 'All Currencies'}
            <Badge variant="secondary" className="ml-2">{globalCurrencies.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="middle-east">
            {locale === 'ar' ? 'الشرق الأوسط' : 'Middle East'}
            <Badge variant="secondary" className="ml-2">{middleEastCurrencies.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="popular">
            {locale === 'ar' ? 'الأكثر استخداماً' : 'Popular'}
          </TabsTrigger>
        </TabsList>

        {/* All Currencies Tab */}
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الرمز' : 'Symbol'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'العملة' : 'Currency'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الدولة' : 'Country'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'المنازل' : 'Decimals'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCurrencies.map((currency) => (
                      <TableRow key={currency.code}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono font-bold">
                              {currency.code}
                            </Badge>
                            {currency.isBaseCurrency && (
                              <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Badge className="font-mono">{currency.symbol}</Badge>
                            {currency.symbolNative !== currency.symbol && (
                              <Badge variant="outline" className="font-mono">{currency.symbolNative}</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{locale === 'ar' ? currency.nameAr : currency.nameEn}</p>
                            <p className="text-xs text-muted-foreground">
                              {locale === 'ar' ? currency.nameEn : currency.nameAr}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{locale === 'ar' ? currency.countryNameAr : currency.countryNameEn}</p>
                            <p className="text-xs text-muted-foreground">{currency.countryCode}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{currency.decimalDigits}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={currency.isActive ? 'default' : 'secondary'} className={currency.isActive ? 'bg-green-600' : ''}>
                            {currency.isActive ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {!currency.isBaseCurrency && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSetBaseCurrency(currency.code)}
                                title={locale === 'ar' ? 'تعيين كعملة أساسية' : 'Set as base currency'}
                              >
                                <Star className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(currency.code, !currency.isActive)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Middle East Tab */}
        <TabsContent value="middle-east" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {middleEastCurrencies.map((currency) => (
              <Card key={currency.code}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">{currency.code}</Badge>
                      {currency.isBaseCurrency && <Star className="h-4 w-4 text-orange-500 fill-orange-500" />}
                    </div>
                    <Badge className="font-mono text-lg">{currency.symbolNative}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {locale === 'ar' ? currency.nameAr : currency.nameEn}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{locale === 'ar' ? 'الدولة' : 'Country'}</span>
                      <span className="font-medium">{locale === 'ar' ? currency.countryNameAr : currency.countryNameEn}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{locale === 'ar' ? 'المنازل' : 'Decimals'}</span>
                      <Badge variant="secondary">{currency.decimalDigits}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{locale === 'ar' ? 'الحالة' : 'Status'}</span>
                      <Badge variant={currency.isActive ? 'default' : 'secondary'} className={currency.isActive ? 'bg-green-600' : ''}>
                        {currency.isActive ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Popular Currencies Tab */}
        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'العملات الأكثر استخداماً عالمياً' : 'Most Used Currencies Worldwide'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CNY', 'SAR', 'AED'].map((code) => {
                  const currency = globalCurrencies.find(c => c.code === code);
                  if (!currency) return null;

                  return (
                    <Card key={code}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{currency.symbolNative}</div>
                            <div>
                              <p className="font-bold">{currency.code}</p>
                              <p className="text-sm text-muted-foreground">
                                {locale === 'ar' ? currency.nameAr : currency.nameEn}
                              </p>
                            </div>
                          </div>
                          {currency.isBaseCurrency && (
                            <Star className="h-5 w-5 text-orange-500 fill-orange-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Currency Converter Demo */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'تجربة محول العملات' : 'Currency Converter Demo'}</CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'اختبر تحويل العملات في النظام' : 'Test currency conversion in the system'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'المبلغ' : 'Amount'}</Label>
              <Input type="number" defaultValue="1000" />
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'من' : 'From'}</Label>
              <CurrencySelector value="SAR" onChange={() => {}} />
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'إلى' : 'To'}</Label>
              <CurrencySelector value="USD" onChange={() => {}} />
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <CurrencyAmount amount={1000} currency="SAR" bold />
              </div>
              <div className="text-2xl">=</div>
              <div>
                <CurrencyAmount amount={266.60} currency="USD" bold />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

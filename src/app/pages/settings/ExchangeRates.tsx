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
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Download,
  History,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { exchangeRates, getBaseCurrency, globalCurrencies } from '../../../lib/currencyData';
import CurrencySelector from '../../components/CurrencySelector';

export default function ExchangeRates() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    fromCurrency: 'SAR',
    toCurrency: 'USD',
    rate: 0,
    effectiveDate: new Date().toISOString().split('T')[0],
    source: 'Manual',
  });

  const baseCurrency = getBaseCurrency();

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي أسعار الصرف' : 'Total Exchange Rates',
      value: exchangeRates.length,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'أسعار نشطة' : 'Active Rates',
      value: exchangeRates.filter(r => r.isActive).length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'آخر تحديث' : 'Last Updated',
      value: locale === 'ar' ? 'اليوم 8:00 ص' : 'Today 8:00 AM',
      icon: RefreshCw,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: locale === 'ar' ? 'المصدر' : 'Source',
      value: 'SAMA',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const filteredRates = exchangeRates.filter(rate => {
    const matchesSearch =
      rate.fromCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.toCurrency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSave = () => {
    if (!formData.fromCurrency || !formData.toCurrency || formData.rate <= 0) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    toast.success(locale === 'ar' ? 'تم حفظ سعر الصرف' : 'Exchange rate saved');
    setIsAddOpen(false);
  };

  const handleBulkUpdate = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: locale === 'ar' ? 'جاري تحديث الأسعار...' : 'Updating rates...',
        success: locale === 'ar' ? 'تم تحديث جميع الأسعار بنجاح' : 'All rates updated successfully',
        error: locale === 'ar' ? 'فشل التحديث' : 'Update failed',
      }
    );
  };

  // Calculate rate change (mock data)
  const getRateChange = (rate: number) => {
    const change = (Math.random() - 0.5) * 0.02; // Random change between -1% and +1%
    return {
      value: change,
      isPositive: change > 0,
    };
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'أسعار الصرف' : 'Exchange Rates'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'إدارة أسعار صرف العملات - تحديث تلقائي يومي'
              : 'Manage currency exchange rates - Daily automatic updates'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkUpdate}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تحديث الأسعار' : 'Update Rates'}
          </Button>
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {locale === 'ar' ? 'سعر جديد' : 'New Rate'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {locale === 'ar' ? 'إضافة سعر صرف جديد' : 'Add New Exchange Rate'}
                </DialogTitle>
                <DialogDescription>
                  {locale === 'ar' ? 'حدد العملات وسعر الصرف' : 'Select currencies and exchange rate'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'من عملة' : 'From Currency'}</Label>
                    <CurrencySelector
                      value={formData.fromCurrency}
                      onChange={(value) => setFormData({ ...formData, fromCurrency: value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'إلى عملة' : 'To Currency'}</Label>
                    <CurrencySelector
                      value={formData.toCurrency}
                      onChange={(value) => setFormData({ ...formData, toCurrency: value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'سعر الصرف' : 'Exchange Rate'}</Label>
                  <Input
                    type="number"
                    step="0.000001"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })}
                    placeholder="0.2666"
                  />
                  <p className="text-xs text-muted-foreground">
                    {locale === 'ar'
                      ? `1 ${formData.fromCurrency} = ${formData.rate} ${formData.toCurrency}`
                      : `1 ${formData.fromCurrency} = ${formData.rate} ${formData.toCurrency}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'تاريخ السريان' : 'Effective Date'}</Label>
                    <Input
                      type="date"
                      value={formData.effectiveDate}
                      onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{locale === 'ar' ? 'المصدر' : 'Source'}</Label>
                    <Input
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      placeholder="SAMA, Central Bank, Manual"
                    />
                  </div>
                </div>

                {formData.rate > 0 && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      {locale === 'ar' ? 'معاينة' : 'Preview'}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>1 {formData.fromCurrency}</span>
                        <span>=</span>
                        <span className="font-bold">{formData.rate} {formData.toCurrency}</span>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>1 {formData.toCurrency}</span>
                        <span>=</span>
                        <span className="font-bold">{(1 / formData.rate).toFixed(6)} {formData.fromCurrency}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'حفظ' : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={locale === 'ar' ? 'بحث بالعملة...' : 'Search by currency...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            {locale === 'ar' ? 'أسعار نشطة' : 'Active Rates'}
          </TabsTrigger>
          <TabsTrigger value="matrix">
            {locale === 'ar' ? 'جدول التحويل' : 'Conversion Matrix'}
          </TabsTrigger>
          <TabsTrigger value="history">
            {locale === 'ar' ? 'السجل' : 'History'}
          </TabsTrigger>
        </TabsList>

        {/* Active Rates Tab */}
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'من' : 'From'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'إلى' : 'To'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'السعر' : 'Rate'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'السعر العكسي' : 'Inverse Rate'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'التغيير' : 'Change'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'تاريخ السريان' : 'Effective Date'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المصدر' : 'Source'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRates.map((rate) => {
                    const change = getRateChange(rate.rate);
                    return (
                      <TableRow key={rate.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono font-bold">
                            {rate.fromCurrency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono font-bold">
                            {rate.toCurrency}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold font-mono">
                          {rate.rate.toFixed(6)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-muted-foreground">
                          {rate.inverseRate.toFixed(6)}
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {change.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            <span className="text-sm font-medium">
                              {change.isPositive ? '+' : ''}{(change.value * 100).toFixed(2)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(rate.effectiveDate).toLocaleDateString(locale)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{rate.source}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={rate.isActive ? 'default' : 'secondary'} className={rate.isActive ? 'bg-green-600' : ''}>
                            {rate.isActive ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <History className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Matrix Tab */}
        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'جدول تحويل العملات' : 'Currency Conversion Matrix'}</CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'أسعار صرف العملات الرئيسية' : 'Major currency exchange rates'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2 bg-muted font-bold"></th>
                      {['SAR', 'USD', 'EUR', 'GBP', 'AED'].map((currency) => (
                        <th key={currency} className="border p-2 bg-muted font-bold font-mono">
                          {currency}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['SAR', 'USD', 'EUR', 'GBP', 'AED'].map((fromCurrency) => (
                      <tr key={fromCurrency}>
                        <td className="border p-2 bg-muted font-bold font-mono">{fromCurrency}</td>
                        {['SAR', 'USD', 'EUR', 'GBP', 'AED'].map((toCurrency) => {
                          if (fromCurrency === toCurrency) {
                            return (
                              <td key={toCurrency} className="border p-2 text-center bg-blue-50 font-bold">
                                1.000000
                              </td>
                            );
                          }
                          
                          const rate = exchangeRates.find(
                            r => r.fromCurrency === fromCurrency && r.toCurrency === toCurrency
                          );
                          
                          return (
                            <td key={toCurrency} className="border p-2 text-center font-mono">
                              {rate ? rate.rate.toFixed(6) : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'سجل أسعار الصرف' : 'Exchange Rate History'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{locale === 'ar' ? 'سيتم عرض سجل التغييرات هنا' : 'History of changes will be displayed here'}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                {locale === 'ar' ? 'تحديث تلقائي' : 'Automatic Updates'}
              </h4>
              <p className="text-sm text-blue-800">
                {locale === 'ar'
                  ? 'يتم تحديث أسعار الصرف تلقائياً مرتين يومياً (8:00 صباحاً و 4:00 مساءً) من مصادر موثوقة مثل مؤسسة النقد العربي السعودي (SAMA) والبنوك المركزية العالمية.'
                  : 'Exchange rates are automatically updated twice daily (8:00 AM and 4:00 PM) from reliable sources like Saudi Arabian Monetary Authority (SAMA) and global central banks.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

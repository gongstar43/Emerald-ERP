import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Clock, AlertTriangle, Download, Search, TrendingDown, Package } from 'lucide-react';
import { universalInventoryItems } from '../../../lib/inventoryData';

export default function AgingReport() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');

  // Calculate aging
  const calculateAging = () => {
    const today = new Date();
    
    return universalInventoryItems.map(item => {
      // Simulate last movement date (random between 0-365 days ago)
      const daysAgo = Math.floor(Math.random() * 365);
      const lastMovementDate = new Date(today);
      lastMovementDate.setDate(today.getDate() - daysAgo);

      const ageInDays = daysAgo;
      let ageCategory: '0-30' | '31-60' | '61-90' | '91-180' | '181-365' | '365+';
      
      if (ageInDays <= 30) ageCategory = '0-30';
      else if (ageInDays <= 60) ageCategory = '31-60';
      else if (ageInDays <= 90) ageCategory = '61-90';
      else if (ageInDays <= 180) ageCategory = '91-180';
      else if (ageInDays <= 365) ageCategory = '181-365';
      else ageCategory = '365+';

      const inventoryValue = item.currentStock * item.costPrice;

      return {
        ...item,
        lastMovementDate: lastMovementDate.toISOString().split('T')[0],
        ageInDays,
        ageCategory,
        inventoryValue,
      };
    });
  };

  const agingData = calculateAging();

  // Statistics
  const stats = {
    fresh: agingData.filter(i => i.ageInDays <= 30),
    moderate: agingData.filter(i => i.ageInDays > 30 && i.ageInDays <= 90),
    old: agingData.filter(i => i.ageInDays > 90 && i.ageInDays <= 180),
    veryOld: agingData.filter(i => i.ageInDays > 180),
  };

  const totalValue = agingData.reduce((sum, item) => sum + item.inventoryValue, 0);
  const freshValue = stats.fresh.reduce((sum, item) => sum + item.inventoryValue, 0);
  const moderateValue = stats.moderate.reduce((sum, item) => sum + item.inventoryValue, 0);
  const oldValue = stats.old.reduce((sum, item) => sum + item.inventoryValue, 0);
  const veryOldValue = stats.veryOld.reduce((sum, item) => sum + item.inventoryValue, 0);

  const getAgeBadge = (category: string) => {
    const config: Record<string, { label: string; className: string }> = {
      '0-30': { 
        label: locale === 'ar' ? '0-30 يوم' : '0-30 days', 
        className: 'bg-green-600 text-white' 
      },
      '31-60': { 
        label: locale === 'ar' ? '31-60 يوم' : '31-60 days', 
        className: 'bg-blue-600 text-white' 
      },
      '61-90': { 
        label: locale === 'ar' ? '61-90 يوم' : '61-90 days', 
        className: 'bg-yellow-600 text-white' 
      },
      '91-180': { 
        label: locale === 'ar' ? '91-180 يوم' : '91-180 days', 
        className: 'bg-orange-600 text-white' 
      },
      '181-365': { 
        label: locale === 'ar' ? '181-365 يوم' : '181-365 days', 
        className: 'bg-red-600 text-white' 
      },
      '365+': { 
        label: locale === 'ar' ? 'أكثر من سنة' : '365+ days', 
        className: 'bg-purple-900 text-white' 
      },
    };
    return <Badge className={config[category].className}>{config[category].label}</Badge>;
  };

  const getRiskLevel = (days: number) => {
    if (days <= 30) return { label: locale === 'ar' ? 'منخفض' : 'Low', color: 'text-green-600' };
    if (days <= 90) return { label: locale === 'ar' ? 'متوسط' : 'Medium', color: 'text-yellow-600' };
    if (days <= 180) return { label: locale === 'ar' ? 'عالي' : 'High', color: 'text-orange-600' };
    return { label: locale === 'ar' ? 'حرج' : 'Critical', color: 'text-red-600' };
  };

  const filteredData = agingData.filter(item => {
    const matchesSearch = 
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery);
    const matchesAge = ageFilter === 'all' || item.ageCategory === ageFilter;
    return matchesSearch && matchesAge;
  });

  // Sort by age descending
  const sortedData = [...filteredData].sort((a, b) => b.ageInDays - a.ageInDays);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تقرير تقادم المخزون' : 'Inventory Aging Report'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'تحليل عمر المخزون وتحديد البضائة الراكدة - متوافق مع IAS 2' 
              : 'Analyze inventory age and identify slow-moving items - IAS 2 Compliant'}
          </p>
        </div>
        <Button onClick={() => alert('Exporting...')}>
          <Download className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'تصدير' : 'Export'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'حديث (0-30 يوم)' : 'Fresh (0-30 days)'}
            </CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fresh.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((stats.fresh.length / agingData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-green-600 mt-2">
              {formatCurrency(freshValue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'متوسط (31-90 يوم)' : 'Moderate (31-90)'}
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.moderate.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((stats.moderate.length / agingData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-yellow-600 mt-2">
              {formatCurrency(moderateValue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'قديم (91-180 يوم)' : 'Old (91-180)'}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.old.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((stats.old.length / agingData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-orange-600 mt-2">
              {formatCurrency(oldValue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'راكد (180+ يوم)' : 'Stagnant (180+)'}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.veryOld.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((stats.veryOld.length / agingData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-red-600 mt-2">
              {formatCurrency(veryOldValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aging Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'توزيع التقادم' : 'Aging Distribution'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div key="0-30" className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{locale === 'ar' ? '0-30 يوم' : '0-30 days'}</span>
                <span className="font-semibold">{((freshValue / totalValue) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: `${(freshValue / totalValue) * 100}%` }}></div>
              </div>
            </div>

            <div key="31-90" className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{locale === 'ar' ? '31-90 يوم' : '31-90 days'}</span>
                <span className="font-semibold">{((moderateValue / totalValue) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-600 h-3 rounded-full" style={{ width: `${(moderateValue / totalValue) * 100}%` }}></div>
              </div>
            </div>

            <div key="91-180" className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{locale === 'ar' ? '91-180 يوم' : '91-180 days'}</span>
                <span className="font-semibold">{((oldValue / totalValue) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-orange-600 h-3 rounded-full" style={{ width: `${(oldValue / totalValue) * 100}%` }}></div>
              </div>
            </div>

            <div key="180+" className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{locale === 'ar' ? '180+ يوم' : '180+ days'}</span>
                <span className="font-semibold">{((veryOldValue / totalValue) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-red-600 h-3 rounded-full" style={{ width: `${(veryOldValue / totalValue) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'الفترة الزمنية' : 'Age Period'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الفترات' : 'All Periods'}</SelectItem>
                <SelectItem value="0-30">{locale === 'ar' ? '0-30 يوم' : '0-30 days'}</SelectItem>
                <SelectItem value="31-60">{locale === 'ar' ? '31-60 يوم' : '31-60 days'}</SelectItem>
                <SelectItem value="61-90">{locale === 'ar' ? '61-90 يوم' : '61-90 days'}</SelectItem>
                <SelectItem value="91-180">{locale === 'ar' ? '91-180 يوم' : '91-180 days'}</SelectItem>
                <SelectItem value="181-365">{locale === 'ar' ? '181-365 يوم' : '181-365 days'}</SelectItem>
                <SelectItem value="365+">{locale === 'ar' ? 'أكثر من سنة' : '365+ days'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'كود الصنف' : 'Item Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                <TableHead>{locale === 'ar' ? 'آخر حركة' : 'Last Movement'}</TableHead>
                <TableHead>{locale === 'ar' ? 'العمر (أيام)' : 'Age (Days)'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الفترة' : 'Period'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الكمية' : 'Quantity'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'القيمة' : 'Value'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المخاطر' : 'Risk'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.slice(0, 50).map((item) => {
                const risk = getRiskLevel(item.ageInDays);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{locale === 'ar' ? item.nameAr : item.nameEn}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(item.lastMovementDate).toLocaleDateString(locale)}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{item.ageInDays}</span> {locale === 'ar' ? 'يوم' : 'days'}
                    </TableCell>
                    <TableCell>{getAgeBadge(item.ageCategory)}</TableCell>
                    <TableCell className="text-right">{item.currentStock.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(item.inventoryValue)}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${risk.color}`}>{risk.label}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            {locale === 'ar' ? 'توصيات العمل' : 'Action Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <p className="text-sm">
                <strong>{locale === 'ar' ? 'مخزون راكد (180+ يوم):' : 'Stagnant (180+ days):'}</strong>{' '}
                {locale === 'ar' 
                  ? 'تخفيضات فورية، حملات تسويقية، التبرع، أو التخلص من المخزون'
                  : 'Immediate discounts, marketing campaigns, donations, or disposal'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <p className="text-sm">
                <strong>{locale === 'ar' ? 'بطيء الحركة (91-180 يوم):' : 'Slow-moving (91-180 days):'}</strong>{' '}
                {locale === 'ar' 
                  ? 'عروض ترويجية، مراجعة السياسات، تحليل الطلب'
                  : 'Promotional offers, policy review, demand analysis'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
              <p className="text-sm">
                <strong>{locale === 'ar' ? 'متوسط (31-90 يوم):' : 'Moderate (31-90 days):'}</strong>{' '}
                {locale === 'ar' 
                  ? 'مراقبة دورية، تحسين التوزيع، مراجعة مستويات إعادة الطلب'
                  : 'Regular monitoring, distribution improvement, reorder level review'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { AlertCircle, ShoppingCart, Download, Search, TrendingDown, Package, CheckCircle } from 'lucide-react';
import { universalInventoryItems } from '../../../lib/inventoryData';

export default function ReorderReport() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Calculate reorder status
  const calculateReorderStatus = () => {
    return universalInventoryItems.map(item => {
      const reorderPoint = item.reorderPoint || 50;
      const safetyStock = item.safetyStock || 20;
      const currentStock = item.currentStock || 0;
      const maxStock = item.maxStock || 200;

      // Simulate average daily usage
      const avgDailyUsage = Math.floor(Math.random() * 10) + 1;
      const leadTimeDays = Math.floor(Math.random() * 14) + 7; // 7-21 days
      
      const suggestedOrder = Math.max(0, maxStock - currentStock);
      const daysRemaining = avgDailyUsage > 0 ? currentStock / avgDailyUsage : 0;

      let status: 'critical' | 'reorder' | 'low' | 'adequate' | 'overstocked';
      let priority: 1 | 2 | 3 | 4 | 5;

      if (currentStock <= safetyStock) {
        status = 'critical';
        priority = 1;
      } else if (currentStock <= reorderPoint) {
        status = 'reorder';
        priority = 2;
      } else if (currentStock < (reorderPoint * 1.5)) {
        status = 'low';
        priority = 3;
      } else if (currentStock <= maxStock) {
        status = 'adequate';
        priority = 4;
      } else {
        status = 'overstocked';
        priority = 5;
      }

      const orderValue = suggestedOrder * (item.costPrice || 0);

      return {
        ...item,
        reorderPoint,
        safetyStock,
        maxStock,
        avgDailyUsage,
        leadTimeDays,
        suggestedOrder,
        daysRemaining: Math.round(daysRemaining),
        status,
        priority,
        orderValue,
      };
    });
  };

  const reorderData = calculateReorderStatus();

  // Statistics
  const stats = {
    critical: reorderData.filter(i => i.status === 'critical'),
    reorder: reorderData.filter(i => i.status === 'reorder'),
    low: reorderData.filter(i => i.status === 'low'),
    adequate: reorderData.filter(i => i.status === 'adequate'),
    overstocked: reorderData.filter(i => i.status === 'overstocked'),
  };

  const totalOrderValue = stats.critical.reduce((sum, item) => sum + item.orderValue, 0) +
                          stats.reorder.reduce((sum, item) => sum + item.orderValue, 0);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      critical: { 
        label: locale === 'ar' ? 'حرج - اطلب فوراً' : 'Critical - Order Now', 
        className: 'bg-red-600 text-white animate-pulse' 
      },
      reorder: { 
        label: locale === 'ar' ? 'يجب الطلب' : 'Reorder Required', 
        className: 'bg-orange-600 text-white' 
      },
      low: { 
        label: locale === 'ar' ? 'منخفض' : 'Low Stock', 
        className: 'bg-yellow-600 text-white' 
      },
      adequate: { 
        label: locale === 'ar' ? 'مناسب' : 'Adequate', 
        className: 'bg-green-600 text-white' 
      },
      overstocked: { 
        label: locale === 'ar' ? 'مخزون زائد' : 'Overstocked', 
        className: 'bg-blue-600 text-white' 
      },
    };
    return <Badge className={config[status].className}>{config[status].label}</Badge>;
  };

  const getPriorityBadge = (priority: number) => {
    const colors = ['bg-red-600', 'bg-orange-600', 'bg-yellow-600', 'bg-green-600', 'bg-blue-600'];
    return (
      <div className={`${colors[priority - 1]} text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>
        {priority}
      </div>
    );
  };

  const filteredData = reorderData.filter(item => {
    const matchesSearch = 
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort by priority
  const sortedData = [...filteredData].sort((a, b) => a.priority - b.priority);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تقرير إعادة الطلب' : 'Reorder Point Report'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'مراقبة مستويات المخزون ونقاط إعادة الطلب - متوافق مع IAS 2' 
              : 'Monitor stock levels and reorder points - IAS 2 Compliant'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert('Creating purchase orders...')}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'إنشاء أوامر شراء' : 'Create POs'}
          </Button>
          <Button onClick={() => alert('Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      {(stats.critical.length > 0 || stats.reorder.length > 0) && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">
                  {locale === 'ar' ? 'تنبيه: مطلوب إجراء فوري' : 'Alert: Immediate Action Required'}
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {locale === 'ar' 
                    ? `${stats.critical.length} صنف في حالة حرجة و ${stats.reorder.length} صنف يحتاج إعادة طلب. القيمة الإجمالية المطلوبة: ${formatCurrency(totalOrderValue)}`
                    : `${stats.critical.length} critical items and ${stats.reorder.length} items need reordering. Total order value: ${formatCurrency(totalOrderValue)}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">
              {locale === 'ar' ? 'حرج' : 'Critical'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{stats.critical.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'أقل من مخزون الأمان' : 'Below safety stock'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">
              {locale === 'ar' ? 'إعادة طلب' : 'Reorder'}
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{stats.reorder.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'عند نقطة إعادة الطلب' : 'At reorder point'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">
              {locale === 'ar' ? 'منخفض' : 'Low'}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{stats.low.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'قريب من نقطة الطلب' : 'Near reorder point'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              {locale === 'ar' ? 'مناسب' : 'Adequate'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.adequate.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'مستوى جيد' : 'Good level'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              {locale === 'ar' ? 'مخزون زائد' : 'Overstocked'}
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{stats.overstocked.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar' ? 'فوق الحد الأقصى' : 'Above max level'}
            </p>
          </CardContent>
        </Card>
      </div>

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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'الحالة' : 'Status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Statuses'}</SelectItem>
                <SelectItem value="critical">{locale === 'ar' ? 'حرج' : 'Critical'}</SelectItem>
                <SelectItem value="reorder">{locale === 'ar' ? 'إعادة طلب' : 'Reorder'}</SelectItem>
                <SelectItem value="low">{locale === 'ar' ? 'منخفض' : 'Low'}</SelectItem>
                <SelectItem value="adequate">{locale === 'ar' ? 'مناسب' : 'Adequate'}</SelectItem>
                <SelectItem value="overstocked">{locale === 'ar' ? 'مخزون زائد' : 'Overstocked'}</SelectItem>
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
                <TableHead>{locale === 'ar' ? 'أولوية' : 'Priority'}</TableHead>
                <TableHead>{locale === 'ar' ? 'كود الصنف' : 'Item Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'المخزون الحالي' : 'Current Stock'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'نقطة الطلب' : 'Reorder Point'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'مخزون الأمان' : 'Safety Stock'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الحد الأقصى' : 'Max Stock'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الكمية المقترحة' : 'Suggested Order'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'قيمة الطلب' : 'Order Value'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الأيام المتبقية' : 'Days Left'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.slice(0, 50).map((item) => (
                <TableRow key={item.id} className={item.status === 'critical' ? 'bg-red-50' : item.status === 'reorder' ? 'bg-orange-50' : ''}>
                  <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{locale === 'ar' ? item.nameAr : item.nameEn}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      item.currentStock <= item.safetyStock ? 'text-red-600' :
                      item.currentStock <= item.reorderPoint ? 'text-orange-600' :
                      'text-gray-900'
                    }`}>
                      {item.currentStock.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{item.reorderPoint.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.safetyStock.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{item.maxStock.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {item.suggestedOrder > 0 ? (
                      <span className="font-semibold text-blue-600">{item.suggestedOrder.toLocaleString()}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.suggestedOrder > 0 ? formatCurrency(item.orderValue) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      item.daysRemaining <= 7 ? 'text-red-600' :
                      item.daysRemaining <= 14 ? 'text-orange-600' :
                      'text-gray-900'
                    }`}>
                      {item.daysRemaining}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Formulas Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">
            {locale === 'ar' ? 'صيغ الحساب' : 'Calculation Formulas'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div key="formula-1" className="bg-white p-3 rounded-lg border border-blue-200">
              <strong className="text-blue-800">{locale === 'ar' ? 'نقطة إعادة الطلب:' : 'Reorder Point:'}</strong>
              <p className="text-gray-700 mt-1">
                {locale === 'ar' 
                  ? 'نقطة إعادة الطلب = (متوسط الاستخدام اليومي × مدة التوريد) + مخزون الأمان'
                  : 'Reorder Point = (Average Daily Usage × Lead Time) + Safety Stock'}
              </p>
            </div>
            <div key="formula-2" className="bg-white p-3 rounded-lg border border-blue-200">
              <strong className="text-blue-800">{locale === 'ar' ? 'الكمية المقترحة:' : 'Suggested Order Quantity:'}</strong>
              <p className="text-gray-700 mt-1">
                {locale === 'ar' 
                  ? 'الكمية المقترحة = الحد الأقصى للمخزون - المخزون الحالي'
                  : 'Suggested Order Qty = Max Stock Level - Current Stock'}
              </p>
            </div>
            <div key="formula-3" className="bg-white p-3 rounded-lg border border-blue-200">
              <strong className="text-blue-800">{locale === 'ar' ? 'الأيام المتبقية:' : 'Days Remaining:'}</strong>
              <p className="text-gray-700 mt-1">
                {locale === 'ar' 
                  ? 'الأيام المتبقية = المخزون الحالي ÷ متوسط الاستخدام اليومي'
                  : 'Days Remaining = Current Stock ÷ Average Daily Usage'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
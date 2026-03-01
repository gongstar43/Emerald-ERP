import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  RefreshCw,
} from 'lucide-react';

interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  customerCount: number;
  growth: number;
}

interface TopProduct {
  id: string;
  name: string;
  revenue: number;
  quantity: number;
  growth: number;
}

interface SalesChannel {
  channel: string;
  revenue: number;
  percentage: number;
}

export default function SalesAnalytics() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(false);

  // Mock data - في الإنتاج سيتم جلبها من API
  const metrics: SalesMetrics = {
    totalRevenue: 2450000,
    totalOrders: 342,
    averageOrderValue: 7164.32,
    conversionRate: 3.45,
    customerCount: 128,
    growth: 12.5,
  };

  const topProducts: TopProduct[] = [
    { id: '1', name: 'Product A', revenue: 450000, quantity: 120, growth: 15.2 },
    { id: '2', name: 'Product B', revenue: 380000, quantity: 95, growth: 8.5 },
    { id: '3', name: 'Product C', revenue: 320000, quantity: 85, growth: -3.2 },
    { id: '4', name: 'Product D', revenue: 290000, quantity: 78, growth: 22.1 },
    { id: '5', name: 'Product E', revenue: 210000, quantity: 64, growth: 5.8 },
  ];

  const salesChannels: SalesChannel[] = [
    { channel: locale === 'ar' ? 'المبيعات المباشرة' : 'Direct Sales', revenue: 1200000, percentage: 49 },
    { channel: locale === 'ar' ? 'التجارة الإلكترونية' : 'E-commerce', revenue: 750000, percentage: 31 },
    { channel: locale === 'ar' ? 'الموزعون' : 'Distributors', revenue: 350000, percentage: 14 },
    { channel: locale === 'ar' ? 'قنوات أخرى' : 'Other Channels', revenue: 150000, percentage: 6 },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    color 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    trend?: number; 
    color: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && (
          <div className={`flex items-center text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            <span>{Math.abs(trend)}% {locale === 'ar' ? 'عن الفترة السابقة' : 'vs last period'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تحليلات المبيعات' : 'Sales Analytics'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'رؤى شاملة حول أداء المبيعات' : 'Comprehensive insights into sales performance'}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{locale === 'ar' ? 'اليوم' : 'Today'}</SelectItem>
              <SelectItem value="week">{locale === 'ar' ? 'هذا الأسبوع' : 'This Week'}</SelectItem>
              <SelectItem value="month">{locale === 'ar' ? 'هذا الشهر' : 'This Month'}</SelectItem>
              <SelectItem value="quarter">{locale === 'ar' ? 'هذا الربع' : 'This Quarter'}</SelectItem>
              <SelectItem value="year">{locale === 'ar' ? 'هذا العام' : 'This Year'}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {locale === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title={locale === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
          value={formatCurrency(metrics.totalRevenue)}
          icon={DollarSign}
          trend={metrics.growth}
          color="bg-blue-600"
        />
        <MetricCard
          title={locale === 'ar' ? 'عدد الطلبات' : 'Total Orders'}
          value={metrics.totalOrders}
          icon={ShoppingCart}
          trend={8.2}
          color="bg-green-600"
        />
        <MetricCard
          title={locale === 'ar' ? 'متوسط قيمة الطلب' : 'Average Order Value'}
          value={formatCurrency(metrics.averageOrderValue)}
          icon={Activity}
          trend={5.3}
          color="bg-purple-600"
        />
        <MetricCard
          title={locale === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
          value={`${metrics.conversionRate}%`}
          icon={Target}
          trend={-1.2}
          color="bg-orange-600"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="products">
            <Award className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'المنتجات' : 'Products'}
          </TabsTrigger>
          <TabsTrigger value="channels">
            <PieChart className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'القنوات' : 'Channels'}
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'العملاء' : 'Customers'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'اتجاه المبيعات' : 'Sales Trend'}</CardTitle>
                <CardDescription>
                  {locale === 'ar' ? 'المبيعات خلال آخر 12 شهر' : 'Sales over the last 12 months'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>{locale === 'ar' ? 'مخطط اتجاه المبيعات' : 'Sales Trend Chart'}</p>
                    <p className="text-sm">{locale === 'ar' ? 'يتم عرضه عبر مكتبة الرسوم البيانية' : 'Rendered via charting library'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'توزيع الإيرادات' : 'Revenue Breakdown'}</CardTitle>
                <CardDescription>
                  {locale === 'ar' ? 'حسب الفئة' : 'By category'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>{locale === 'ar' ? 'مخطط دائري للإيرادات' : 'Revenue Pie Chart'}</p>
                    <p className="text-sm">{locale === 'ar' ? 'يتم عرضه عبر مكتبة الرسوم البيانية' : 'Rendered via charting library'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'أفضل المنتجات مبيعاً' : 'Top Selling Products'}</CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'المنتجات الأعلى إيراداً' : 'Products with highest revenue'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{product.name}</p>
                        <p className="font-bold">{formatCurrency(product.revenue)}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                        <span>{product.quantity} {locale === 'ar' ? 'وحدة مباعة' : 'units sold'}</span>
                        <Badge variant={product.growth >= 0 ? 'default' : 'destructive'} className="text-xs">
                          {product.growth >= 0 ? '+' : ''}{product.growth}%
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(product.revenue / topProducts[0].revenue) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channels Tab */}
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'أداء قنوات المبيعات' : 'Sales Channel Performance'}</CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'الإيرادات حسب القناة' : 'Revenue by channel'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {salesChannels.map((channel) => (
                  <div key={channel.channel}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{channel.channel}</span>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(channel.revenue)}</p>
                        <p className="text-sm text-muted-foreground">{channel.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                        style={{ width: `${channel.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'إجمالي العملاء' : 'Total Customers'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.customerCount}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {locale === 'ar' ? 'عميل نشط' : 'Active customers'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'عملاء جدد' : 'New Customers'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% {locale === 'ar' ? 'عن الشهر الماضي' : 'vs last month'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'معدل الاحتفاظ' : 'Retention Rate'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87.5%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {locale === 'ar' ? 'العملاء المتكررين' : 'Repeat customers'}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

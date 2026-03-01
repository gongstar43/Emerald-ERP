import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';
import {
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  DollarSign,
  Star,
  BarChart3,
} from 'lucide-react';

interface SupplierPerformance {
  id: string;
  name: string;
  qualityScore: number;
  deliveryScore: number;
  priceScore: number;
  overallScore: number;
  totalOrders: number;
  onTimeDeliveries: number;
  qualityIssues: number;
  averageLeadTime: number;
  totalSpend: number;
  rating: number;
  trend: 'up' | 'down' | 'stable';
}

export default function SupplierPerformance() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [period, setPeriod] = useState('month');
  const [sortBy, setSortBy] = useState('overall');

  // Mock data
  const suppliers: SupplierPerformance[] = [
    {
      id: '1',
      name: 'Tech Supplies Co.',
      qualityScore: 95,
      deliveryScore: 92,
      priceScore: 88,
      overallScore: 92,
      totalOrders: 45,
      onTimeDeliveries: 42,
      qualityIssues: 2,
      averageLeadTime: 12,
      totalSpend: 456000,
      rating: 4.6,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Office Plus',
      qualityScore: 88,
      deliveryScore: 85,
      priceScore: 92,
      overallScore: 88,
      totalOrders: 38,
      onTimeDeliveries: 33,
      qualityIssues: 3,
      averageLeadTime: 15,
      totalSpend: 328000,
      rating: 4.4,
      trend: 'stable',
    },
    {
      id: '3',
      name: 'Industrial Parts Ltd.',
      qualityScore: 82,
      deliveryScore: 78,
      priceScore: 85,
      overallScore: 82,
      totalOrders: 52,
      onTimeDeliveries: 41,
      qualityIssues: 7,
      averageLeadTime: 18,
      totalSpend: 524000,
      rating: 4.1,
      trend: 'down',
    },
  ];

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { variant: 'default' as const, className: 'bg-green-600', label: locale === 'ar' ? 'ممتاز' : 'Excellent' };
    if (score >= 80) return { variant: 'default' as const, className: 'bg-blue-600', label: locale === 'ar' ? 'جيد' : 'Good' };
    if (score >= 70) return { variant: 'default' as const, className: 'bg-orange-500', label: locale === 'ar' ? 'مقبول' : 'Acceptable' };
    return { variant: 'destructive' as const, className: '', label: locale === 'ar' ? 'ضعيف' : 'Poor' };
  };

  const getTrendIcon = (trend: SupplierPerformance['trend']) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <span className="h-4 w-4 text-gray-400">−</span>;
  };

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    subtitle,
    color 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    subtitle: string;
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
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'أداء الموردين' : 'Supplier Performance'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'تقييم وتحليل أداء الموردين' : 'Evaluate and analyze supplier performance'}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">{locale === 'ar' ? 'هذا الشهر' : 'This Month'}</SelectItem>
              <SelectItem value="quarter">{locale === 'ar' ? 'هذا الربع' : 'This Quarter'}</SelectItem>
              <SelectItem value="year">{locale === 'ar' ? 'هذا العام' : 'This Year'}</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تقرير مفصل' : 'Detailed Report'}
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          title={locale === 'ar' ? 'متوسط الجودة' : 'Avg Quality Score'}
          value="88.3%"
          icon={Award}
          subtitle={locale === 'ar' ? 'جميع الموردين' : 'All suppliers'}
          color="bg-blue-600"
        />
        <MetricCard
          title={locale === 'ar' ? 'التسليم في الوقت المحدد' : 'On-Time Delivery'}
          value="86.5%"
          icon={Clock}
          subtitle={locale === 'ar' ? 'معدل الالتزام' : 'Compliance rate'}
          color="bg-green-600"
        />
        <MetricCard
          title={locale === 'ar' ? 'إجمالي الإنفاق' : 'Total Spend'}
          value={formatCurrency(1308000)}
          icon={DollarSign}
          subtitle={locale === 'ar' ? 'خلال الفترة' : 'During period'}
          color="bg-purple-600"
        />
        <MetricCard
          title={locale === 'ar' ? 'مشاكل الجودة' : 'Quality Issues'}
          value="12"
          icon={XCircle}
          subtitle={locale === 'ar' ? 'إجمالي الحوادث' : 'Total incidents'}
          color="bg-orange-600"
        />
      </div>

      {/* Supplier Performance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{locale === 'ar' ? 'تفاصيل أداء الموردين' : 'Supplier Performance Details'}</CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'تقييم شامل لجميع الموردين' : 'Comprehensive evaluation of all suppliers'}
              </CardDescription>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">{locale === 'ar' ? 'الدرجة الإجمالية' : 'Overall Score'}</SelectItem>
                <SelectItem value="quality">{locale === 'ar' ? 'الجودة' : 'Quality'}</SelectItem>
                <SelectItem value="delivery">{locale === 'ar' ? 'التسليم' : 'Delivery'}</SelectItem>
                <SelectItem value="price">{locale === 'ar' ? 'السعر' : 'Price'}</SelectItem>
                <SelectItem value="spend">{locale === 'ar' ? 'الإنفاق' : 'Spend'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'المورد' : 'Supplier'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الدرجة الإجمالية' : 'Overall Score'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الجودة' : 'Quality'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التسليم' : 'Delivery'}</TableHead>
                <TableHead>{locale === 'ar' ? 'السعر' : 'Price'}</TableHead>
                <TableHead>{locale === 'ar' ? 'التصنيف' : 'Rating'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإنفاق' : 'Spend'}</TableHead>
                <TableHead className="text-center">{locale === 'ar' ? 'الاتجاه' : 'Trend'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => {
                const scoreBadge = getScoreBadge(supplier.overallScore);
                return (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.totalOrders} {locale === 'ar' ? 'طلب' : 'orders'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{supplier.overallScore}%</span>
                        <Badge variant={scoreBadge.variant} className={scoreBadge.className}>
                          {scoreBadge.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{supplier.qualityScore}%</span>
                          <span className="text-xs text-muted-foreground">
                            {supplier.qualityIssues} {locale === 'ar' ? 'مشاكل' : 'issues'}
                          </span>
                        </div>
                        <Progress value={supplier.qualityScore} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{supplier.deliveryScore}%</span>
                          <span className="text-xs text-muted-foreground">
                            {supplier.onTimeDeliveries}/{supplier.totalOrders}
                          </span>
                        </div>
                        <Progress value={supplier.deliveryScore} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{supplier.priceScore}%</span>
                          <span className="text-xs text-muted-foreground">
                            {supplier.averageLeadTime}d
                          </span>
                        </div>
                        <Progress value={supplier.priceScore} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{supplier.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(supplier.totalSpend)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getTrendIcon(supplier.trend)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              {locale === 'ar' ? 'أفضل الموردين' : 'Top Performers'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suppliers.slice(0, 3).map((supplier, index) => (
                <div key={supplier.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{supplier.name}</p>
                    <p className="text-xs text-muted-foreground">{supplier.overallScore}% {locale === 'ar' ? 'درجة' : 'score'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              {locale === 'ar' ? 'إحصائيات الطلبات' : 'Order Statistics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'إجمالي الطلبات:' : 'Total Orders:'}</span>
                <span className="font-medium">135</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'تسليم في الموعد:' : 'On-Time:'}</span>
                <span className="font-medium text-green-600">116</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'متأخر:' : 'Late:'}</span>
                <span className="font-medium text-red-600">19</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'متوسط وقت التسليم:' : 'Avg Lead Time:'}</span>
                <span className="font-medium">15 {locale === 'ar' ? 'يوم' : 'days'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              {locale === 'ar' ? 'مشاكل الجودة' : 'Quality Issues'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'أصناف معيبة:' : 'Defective Items:'}</span>
                <span className="font-medium">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'مرتجعات:' : 'Returns:'}</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'شكاوى:' : 'Complaints:'}</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'ar' ? 'معدل القبول:' : 'Acceptance Rate:'}</span>
                <span className="font-medium text-green-600">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

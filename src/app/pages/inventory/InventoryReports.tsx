import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  AlertTriangle,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Boxes,
  Clock,
  Target,
} from 'lucide-react';
import { toast } from 'sonner';
import { universalInventoryItems } from '../../../lib/inventoryData';

export default function InventoryReports() {
  const { locale } = useLanguage();
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-02-28');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Generate ABC Analysis data
  const generateABCAnalysis = () => {
    const items = universalInventoryItems.map(item => ({
      code: item.code,
      name: locale === 'ar' ? item.nameAr : item.nameEn,
      value: item.currentStock * item.costPrice,
      quantity: item.currentStock,
    }));

    const sorted = items.sort((a, b) => b.value - a.value);
    const totalValue = sorted.reduce((sum, item) => sum + item.value, 0);
    
    let cumulative = 0;
    return sorted.map(item => {
      cumulative += item.value;
      const cumulativePercent = (cumulative / totalValue) * 100;
      let classification = 'C';
      if (cumulativePercent <= 80) classification = 'A';
      else if (cumulativePercent <= 95) classification = 'B';
      
      return {
        ...item,
        valuePercent: (item.value / totalValue) * 100,
        cumulativePercent,
        classification,
      };
    });
  };

  const abcData = generateABCAnalysis();

  // Stock movement data
  const stockMovementData = [
    { month: locale === 'ar' ? 'يناير' : 'Jan', inbound: 1250, outbound: 980, adjustment: 45 },
    { month: locale === 'ar' ? 'فبراير' : 'Feb', inbound: 1450, outbound: 1150, adjustment: 32 },
    { month: locale === 'ar' ? 'مارس' : 'Mar', inbound: 1320, outbound: 1080, adjustment: 28 },
    { month: locale === 'ar' ? 'أبريل' : 'Apr', inbound: 1580, outbound: 1250, adjustment: 51 },
    { month: locale === 'ar' ? 'مايو' : 'May', inbound: 1680, outbound: 1420, adjustment: 38 },
    { month: locale === 'ar' ? 'يونيو' : 'Jun', inbound: 1520, outbound: 1380, adjustment: 42 },
  ];

  // Stock value by category
  const categoryData = [
    { category: locale === 'ar' ? 'كيماويات' : 'Chemicals', value: 485000, color: '#3b82f6' },
    { category: locale === 'ar' ? 'أغذية' : 'Food', value: 325000, color: '#10b981' },
    { category: locale === 'ar' ? 'إلكترونيات' : 'Electronics', value: 580000, color: '#f59e0b' },
    { category: locale === 'ar' ? 'مواد بناء' : 'Construction', value: 420000, color: '#ef4444' },
    { category: locale === 'ar' ? 'طبية' : 'Medical', value: 290000, color: '#8b5cf6' },
    { category: locale === 'ar' ? 'أخرى' : 'Others', value: 180000, color: '#6b7280' },
  ];

  // Aging analysis data
  const agingData = [
    { range: '0-30 ' + (locale === 'ar' ? 'يوم' : 'days'), items: 245, value: 850000, percentage: 42 },
    { range: '31-60 ' + (locale === 'ar' ? 'يوم' : 'days'), items: 128, value: 420000, percentage: 21 },
    { range: '61-90 ' + (locale === 'ar' ? 'يوم' : 'days'), items: 87, value: 310000, percentage: 15 },
    { range: '91-180 ' + (locale === 'ar' ? 'يوم' : 'days'), items: 52, value: 180000, percentage: 9 },
    { range: '180+ ' + (locale === 'ar' ? 'يوم' : 'days'), items: 38, value: 260000, percentage: 13 },
  ];

  // Stock turnover data
  const turnoverData = [
    { category: locale === 'ar' ? 'سريع الحركة' : 'Fast Moving', items: 145, turnover: 12.5, status: 'excellent' },
    { category: locale === 'ar' ? 'متوسط الحركة' : 'Medium Moving', items: 238, turnover: 6.8, status: 'good' },
    { category: locale === 'ar' ? 'بطيء الحركة' : 'Slow Moving', items: 92, turnover: 2.3, status: 'warning' },
    { category: locale === 'ar' ? 'راكد' : 'Non Moving', items: 25, turnover: 0, status: 'danger' },
  ];

  // Reorder point analysis
  const reorderData = universalInventoryItems
    .filter(item => item.currentStock <= item.reorderPoint)
    .map(item => ({
      code: item.code,
      name: locale === 'ar' ? item.nameAr : item.nameEn,
      current: item.currentStock,
      reorderPoint: item.reorderPoint,
      suggested: item.maxStock - item.currentStock,
      urgency: item.currentStock === 0 ? 'critical' : item.currentStock <= item.minStock ? 'high' : 'medium',
    }));

  const handleExport = (format: string) => {
    toast.success(
      locale === 'ar' 
        ? `جاري التصدير بصيغة ${format}...` 
        : `Exporting as ${format}...`
    );
  };

  const handlePrint = () => {
    toast.info(locale === 'ar' ? 'جاري الطباعة...' : 'Printing...');
  };

  const stats = [
    {
      title: locale === 'ar' ? 'إجمالي قيمة المخزون' : 'Total Stock Value',
      value: '2,280,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'عدد الأصناف' : 'Total Items',
      value: universalInventoryItems.length,
      change: '+8',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'معدل الدوران' : 'Turnover Rate',
      value: '7.2x',
      change: '+0.5',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: locale === 'ar' ? 'يحتاج إعادة طلب' : 'Needs Reorder',
      value: reorderData.length,
      change: locale === 'ar' ? 'عاجل' : 'Urgent',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تقارير المخزون' : 'Inventory Reports'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'تقارير تحليلية شاملة للمخزون - متوافقة مع IAS 2'
              : 'Comprehensive inventory analytics reports - IAS 2 Compliant'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('Excel')}>
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('PDF')}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'طباعة' : 'Print'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'من تاريخ' : 'From Date'}</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'إلى تاريخ' : 'To Date'}</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'المستودع' : 'Warehouse'}</Label>
              <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'جميع المستودعات' : 'All Warehouses'}</SelectItem>
                  <SelectItem value="wh1">{locale === 'ar' ? 'المستودع الرئيسي' : 'Main Warehouse'}</SelectItem>
                  <SelectItem value="wh2">{locale === 'ar' ? 'فرع جدة' : 'Jeddah Branch'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{locale === 'ar' ? 'الفئة' : 'Category'}</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{locale === 'ar' ? 'جميع الفئات' : 'All Categories'}</SelectItem>
                  <SelectItem value="chemicals">{locale === 'ar' ? 'كيماويات' : 'Chemicals'}</SelectItem>
                  <SelectItem value="food">{locale === 'ar' ? 'أغذية' : 'Food'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="abc" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="abc">
            {locale === 'ar' ? 'تحليل ABC' : 'ABC Analysis'}
          </TabsTrigger>
          <TabsTrigger value="movement">
            {locale === 'ar' ? 'حركة المخزون' : 'Stock Movement'}
          </TabsTrigger>
          <TabsTrigger value="aging">
            {locale === 'ar' ? 'تحليل العمر' : 'Aging Analysis'}
          </TabsTrigger>
          <TabsTrigger value="turnover">
            {locale === 'ar' ? 'معدل الدوران' : 'Turnover'}
          </TabsTrigger>
          <TabsTrigger value="reorder">
            {locale === 'ar' ? 'إعادة الطلب' : 'Reorder'}
          </TabsTrigger>
          <TabsTrigger value="valuation">
            {locale === 'ar' ? 'التقييم' : 'Valuation'}
          </TabsTrigger>
        </TabsList>

        {/* ABC Analysis */}
        <TabsContent value="abc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'تحليل ABC' : 'ABC Analysis'}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'تصنيف الأصناف حسب قيمتها - A (80%)، B (15%)، C (5%)'
                  : 'Classify items by value - A (80%), B (15%), C (5%)'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Badge className="bg-blue-600">A</Badge>
                        {locale === 'ar' ? 'الفئة A' : 'Class A'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {abcData.filter(i => i.classification === 'A').length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {locale === 'ar' ? '80% من القيمة' : '80% of value'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Badge className="bg-green-600">B</Badge>
                        {locale === 'ar' ? 'الفئة B' : 'Class B'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {abcData.filter(i => i.classification === 'B').length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {locale === 'ar' ? '15% من القيمة' : '15% of value'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Badge className="bg-gray-600">C</Badge>
                        {locale === 'ar' ? 'الفئة C' : 'Class C'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {abcData.filter(i => i.classification === 'C').length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {locale === 'ar' ? '5% من القيمة' : '5% of value'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* ABC Table */}
                <div className="max-h-[500px] overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead>{locale === 'ar' ? 'الفئة' : 'Class'}</TableHead>
                        <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                        <TableHead>{locale === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                        <TableHead className="text-right">{locale === 'ar' ? 'الكمية' : 'Qty'}</TableHead>
                        <TableHead className="text-right">{locale === 'ar' ? 'القيمة' : 'Value'}</TableHead>
                        <TableHead className="text-right">{locale === 'ar' ? '% من الإجمالي' : '% of Total'}</TableHead>
                        <TableHead className="text-right">{locale === 'ar' ? '% تراكمي' : 'Cumulative %'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {abcData.slice(0, 50).map((item) => (
                        <TableRow key={item.code}>
                          <TableCell>
                            <Badge
                              className={
                                item.classification === 'A'
                                  ? 'bg-blue-600'
                                  : item.classification === 'B'
                                  ? 'bg-green-600'
                                  : 'bg-gray-600'
                              }
                            >
                              {item.classification}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{item.code}</TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-bold">
                            {item.value.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                          </TableCell>
                          <TableCell className="text-right">{item.valuePercent.toFixed(2)}%</TableCell>
                          <TableCell className="text-right">{item.cumulativePercent.toFixed(2)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stock Movement */}
        <TabsContent value="movement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'حركة المخزون' : 'Stock Movement Trend'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={stockMovementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="inbound"
                    stroke="#10b981"
                    name={locale === 'ar' ? 'وارد' : 'Inbound'}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="outbound"
                    stroke="#ef4444"
                    name={locale === 'ar' ? 'صادر' : 'Outbound'}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="adjustment"
                    stroke="#f59e0b"
                    name={locale === 'ar' ? 'تسوية' : 'Adjustment'}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'القيمة حسب الفئة' : 'Value by Category'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.category}: ${((entry.value / categoryData.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${value.toLocaleString()} ${locale === 'ar' ? 'ر.س' : 'SAR'}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aging Analysis */}
        <TabsContent value="aging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'تحليل عمر المخزون' : 'Inventory Aging Analysis'}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'تحليل المخزون حسب فترة بقائه في المخزن'
                  : 'Analyze inventory by duration in stock'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="items" fill="#3b82f6" name={locale === 'ar' ? 'عدد الأصناف' : 'Items'} />
                    <Bar dataKey="value" fill="#10b981" name={locale === 'ar' ? 'القيمة' : 'Value'} />
                  </BarChart>
                </ResponsiveContainer>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الفترة' : 'Age Range'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'عدد الأصناف' : 'Items'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'القيمة' : 'Value'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'النسبة' : 'Percentage'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agingData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.range}</TableCell>
                        <TableCell className="text-right">{row.items}</TableCell>
                        <TableCell className="text-right">
                          {row.value.toLocaleString()} {locale === 'ar' ? 'ر.س' : 'SAR'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${row.percentage}%` }}
                              />
                            </div>
                            <span>{row.percentage}%</span>
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

        {/* Turnover Analysis */}
        <TabsContent value="turnover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'تحليل معدل دوران المخزون' : 'Inventory Turnover Analysis'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'عدد الأصناف' : 'Items'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'معدل الدوران' : 'Turnover Rate'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {turnoverData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.category}</TableCell>
                      <TableCell className="text-right">{row.items}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold">{row.turnover}x</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          / {locale === 'ar' ? 'سنة' : 'year'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={row.status === 'excellent' ? 'default' : 'secondary'}
                          className={
                            row.status === 'excellent'
                              ? 'bg-green-600'
                              : row.status === 'good'
                              ? 'bg-blue-600'
                              : row.status === 'warning'
                              ? 'bg-orange-600'
                              : 'bg-red-600'
                          }
                        >
                          {row.status === 'excellent'
                            ? locale === 'ar' ? 'ممتاز' : 'Excellent'
                            : row.status === 'good'
                            ? locale === 'ar' ? 'جيد' : 'Good'
                            : row.status === 'warning'
                            ? locale === 'ar' ? 'تحذير' : 'Warning'
                            : locale === 'ar' ? 'خطر' : 'Danger'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reorder Point */}
        <TabsContent value="reorder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'الأصناف التي تحتاج إعادة طلب' : 'Items Requiring Reorder'}</CardTitle>
              <CardDescription>
                <Badge variant="destructive">{reorderData.length}</Badge>
                <span className="ml-2">
                  {locale === 'ar' ? 'صنف يحتاج إعادة طلب' : 'items need reordering'}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الأولوية' : 'Priority'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الصنف' : 'Item'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'الكمية الحالية' : 'Current'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'نقطة الطلب' : 'Reorder Point'}</TableHead>
                    <TableHead className="text-right">{locale === 'ar' ? 'الكمية المقترحة' : 'Suggested Qty'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reorderData.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell>
                        <Badge
                          variant={item.urgency === 'critical' ? 'destructive' : 'default'}
                          className={
                            item.urgency === 'critical'
                              ? ''
                              : item.urgency === 'high'
                              ? 'bg-orange-600'
                              : 'bg-yellow-600'
                          }
                        >
                          {item.urgency === 'critical'
                            ? locale === 'ar' ? 'حرج' : 'Critical'
                            : item.urgency === 'high'
                            ? locale === 'ar' ? 'عالي' : 'High'
                            : locale === 'ar' ? 'متوسط' : 'Medium'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.current === 0 ? 'text-red-600 font-bold' : ''}>
                          {item.current}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{item.reorderPoint}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 font-bold">{item.suggested}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Valuation Methods */}
        <TabsContent value="valuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'طرق تقييم المخزون' : 'Inventory Valuation Methods'}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'متوافق مع IAS 2 - أربع طرق للتقييم'
                  : 'IAS 2 Compliant - Four valuation methods'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">FIFO</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,350,000</div>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'الوارد أولاً صادر أولاً' : 'First In, First Out'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">LIFO</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,180,000</div>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'الوارد أخيراً صادر أولاً' : 'Last In, First Out'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">WAC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,280,000</div>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'المتوسط المرجح' : 'Weighted Average'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Specific ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,420,000</div>
                    <p className="text-xs text-muted-foreground">
                      {locale === 'ar' ? 'التمييز الفعلي' : 'Specific Identification'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">
                  {locale === 'ar' ? 'ملاحظة:' : 'Note:'}
                </p>
                <p>
                  {locale === 'ar'
                    ? 'وفقاً لمعيار المحاسبة الدولي IAS 2، يجب تقييم المخزون بالتكلفة أو صافي القيمة القابلة للتحقق أيهما أقل. الطرق المسموح بها هي FIFO والمتوسط المرجح والتمييز الفعلي.'
                    : 'According to IAS 2, inventory must be valued at the lower of cost or net realizable value. Permitted methods are FIFO, Weighted Average, and Specific Identification.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

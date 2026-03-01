import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { BarChart3, TrendingUp, Package, DollarSign, Download, Filter, Search, PieChart } from 'lucide-react';
import { universalInventoryItems } from '../../../lib/inventoryData';

export default function ABCAnalysis() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  // Calculate ABC classification
  const calculateABCAnalysis = () => {
    const itemsWithValue = universalInventoryItems.map(item => ({
      ...item,
      annualValue: item.currentStock * item.costPrice * 12, // Assuming monthly turnover
    }));

    // Sort by annual value descending
    const sorted = [...itemsWithValue].sort((a, b) => b.annualValue - a.annualValue);
    
    const totalValue = sorted.reduce((sum, item) => sum + item.annualValue, 0);
    let cumulativeValue = 0;
    let cumulativePercentage = 0;

    return sorted.map((item, index) => {
      cumulativeValue += item.annualValue;
      cumulativePercentage = (cumulativeValue / totalValue) * 100;

      let classification: 'A' | 'B' | 'C';
      if (cumulativePercentage <= 80) {
        classification = 'A';
      } else if (cumulativePercentage <= 95) {
        classification = 'B';
      } else {
        classification = 'C';
      }

      return {
        ...item,
        classification,
        valuePercentage: (item.annualValue / totalValue) * 100,
        cumulativePercentage,
        rank: index + 1,
      };
    });
  };

  const analysisData = calculateABCAnalysis();

  // Statistics
  const classA = analysisData.filter(item => item.classification === 'A');
  const classB = analysisData.filter(item => item.classification === 'B');
  const classC = analysisData.filter(item => item.classification === 'C');

  const totalValue = analysisData.reduce((sum, item) => sum + item.annualValue, 0);
  const valueA = classA.reduce((sum, item) => sum + item.annualValue, 0);
  const valueB = classB.reduce((sum, item) => sum + item.annualValue, 0);
  const valueC = classC.reduce((sum, item) => sum + item.annualValue, 0);

  const getClassBadge = (classification: 'A' | 'B' | 'C') => {
    const config = {
      A: { 
        label: locale === 'ar' ? 'فئة A - حرجة' : 'Class A - Critical', 
        className: 'bg-red-600 text-white' 
      },
      B: { 
        label: locale === 'ar' ? 'فئة B - مهمة' : 'Class B - Important', 
        className: 'bg-orange-600 text-white' 
      },
      C: { 
        label: locale === 'ar' ? 'فئة C - عادية' : 'Class C - Regular', 
        className: 'bg-green-600 text-white' 
      },
    };
    return <Badge className={config[classification].className}>{config[classification].label}</Badge>;
  };

  const filteredData = analysisData.filter(item => {
    const matchesSearch = 
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameAr.includes(searchQuery);
    const matchesClass = classFilter === 'all' || item.classification === classFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تحليل ABC للمخزون' : 'ABC Inventory Analysis'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' 
              ? 'تصنيف الأصناف حسب القيمة والأهمية - متوافق مع IAS 2' 
              : 'Classify items by value and importance - IAS 2 Compliant'}
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
              {locale === 'ar' ? 'فئة A' : 'Class A'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classA.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((classA.length / analysisData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-red-600 mt-2">
              {formatCurrency(valueA)} ({((valueA / totalValue) * 100).toFixed(1)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'فئة B' : 'Class B'}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classB.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((classB.length / analysisData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-orange-600 mt-2">
              {formatCurrency(valueB)} ({((valueB / totalValue) * 100).toFixed(1)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'فئة C' : 'Class C'}
            </CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classC.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'صنف' : 'items'} • {((classC.length / analysisData.length) * 100).toFixed(1)}%
            </p>
            <div className="text-sm font-semibold text-green-600 mt-2">
              {formatCurrency(valueC)} ({((valueC / totalValue) * 100).toFixed(1)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي القيمة' : 'Total Value'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysisData.length}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'إجمالي الأصناف' : 'Total items'}
            </p>
            <div className="text-sm font-semibold text-blue-600 mt-2">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ABC Principle Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <PieChart className="h-5 w-5" />
            {locale === 'ar' ? 'مبدأ باريتو ABC' : 'Pareto ABC Principle'}
          </CardTitle>
          <CardDescription className="text-blue-700">
            {locale === 'ar' 
              ? 'قاعدة 80/20: فئة A تمثل 20% من الأصناف وتشكل 80% من القيمة الإجمالية'
              : '80/20 Rule: Class A represents 20% of items accounting for 80% of total value'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div key="class-a" className="bg-white p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="font-semibold text-red-800">
                  {locale === 'ar' ? 'فئة A - حرجة' : 'Class A - Critical'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {locale === 'ar' 
                  ? '~20% من الأصناف • ~80% من القيمة • مراقبة يومية' 
                  : '~20% of items • ~80% of value • Daily monitoring'}
              </p>
            </div>
            <div key="class-b" className="bg-white p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="font-semibold text-orange-800">
                  {locale === 'ar' ? 'فئة B - مهمة' : 'Class B - Important'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {locale === 'ar' 
                  ? '~30% من الأصناف • ~15% من القيمة • مراقبة أسبوعية' 
                  : '~30% of items • ~15% of value • Weekly monitoring'}
              </p>
            </div>
            <div key="class-c" className="bg-white p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-semibold text-green-800">
                  {locale === 'ar' ? 'فئة C - عادية' : 'Class C - Regular'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {locale === 'ar' 
                  ? '~50% من الأصناف • ~5% من القيمة • مراقبة شهرية' 
                  : '~50% of items • ~5% of value • Monthly monitoring'}
              </p>
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
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'الفئة' : 'Class'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الفئات' : 'All Classes'}</SelectItem>
                <SelectItem value="A">{locale === 'ar' ? 'فئة A' : 'Class A'}</SelectItem>
                <SelectItem value="B">{locale === 'ar' ? 'فئة B' : 'Class B'}</SelectItem>
                <SelectItem value="C">{locale === 'ar' ? 'فئة C' : 'Class C'}</SelectItem>
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
                <TableHead>{locale === 'ar' ? 'الترتيب' : 'Rank'}</TableHead>
                <TableHead>{locale === 'ar' ? 'كود الصنف' : 'Item Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الفئة' : 'Class'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الكمية' : 'Quantity'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'تكلفة الوحدة' : 'Unit Cost'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'القيمة السنوية' : 'Annual Value'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'النسبة' : '%'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'تراكمي' : 'Cumulative %'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(0, 50).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.rank}</TableCell>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{locale === 'ar' ? item.nameAr : item.nameEn}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getClassBadge(item.classification)}</TableCell>
                  <TableCell className="text-right">{item.currentStock.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.costPrice)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(item.annualValue)}</TableCell>
                  <TableCell className="text-right">{item.valuePercentage.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span>{item.cumulativePercentage.toFixed(1)}%</span>
                      <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            item.classification === 'A' ? 'bg-red-600' :
                            item.classification === 'B' ? 'bg-orange-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${Math.min(item.cumulativePercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'التوصيات' : 'Recommendations'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-red-800">
                  {locale === 'ar' ? 'فئة A - إدارة مشددة' : 'Class A - Tight Control'}
                </div>
                <p className="text-sm text-red-700 mt-1">
                  {locale === 'ar' 
                    ? 'مراقبة يومية • طلبات صغيرة متكررة • جرد دوري • تحليل دقيق للطلب' 
                    : 'Daily monitoring • Frequent small orders • Cycle counting • Detailed demand analysis'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-orange-800">
                  {locale === 'ar' ? 'فئة B - إدارة معتدلة' : 'Class B - Moderate Control'}
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  {locale === 'ar' 
                    ? 'مراقبة أسبوعية • كميات طلب متوسطة • مراجعة شهرية' 
                    : 'Weekly monitoring • Medium order quantities • Monthly review'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-green-800">
                  {locale === 'ar' ? 'فئة C - إدارة بسيطة' : 'Class C - Simple Control'}
                </div>
                <p className="text-sm text-green-700 mt-1">
                  {locale === 'ar' 
                    ? 'مراقبة شهرية • طلبات كبيرة • مخزون أمان عالي • جرد سنوي' 
                    : 'Monthly monitoring • Large orders • High safety stock • Annual counting'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
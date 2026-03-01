import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
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
import { Badge } from '../../components/ui/badge';
import {
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Download,
  Filter,
} from 'lucide-react';

const translations = {
  ar: {
    inventoryValuation: 'تقييم المخزون',
    valuationDescription: 'تقييم المخزون وفقاً لمعيار IAS 2',
    valuationMethod: 'طريقة التقييم',
    warehouse: 'المستودع',
    category: 'الفئة',
    asOf: 'كما في',
    export: 'تصدير',
    refresh: 'تحديث',
    
    // Methods
    fifo: 'الوارد أولاً صادر أولاً (FIFO)',
    lifo: 'الوارد أخيراً صادر أولاً (LIFO)',
    wac: 'المتوسط المرجح (WAC)',
    specific: 'التحديد الخاص',
    
    // Summary
    summary: 'الملخص',
    totalQuantity: 'إجمالي الكمية',
    totalValue: 'إجمالي القيمة',
    averageUnitCost: 'متوسط تكلفة الوحدة',
    categories: 'الفئات',
    warehouses: 'المستودعات',
    
    // Table
    itemCode: 'رمز الصنف',
    itemName: 'اسم الصنف',
    category: 'الفئة',
    warehouse: 'المستودع',
    quantity: 'الكمية',
    unitCost: 'تكلفة الوحدة',
    totalValue: 'القيمة الإجمالية',
    lastMovement: 'آخر حركة',
    
    // Analysis
    byCategory: 'حسب الفئة',
    byWarehouse: 'حسب المستودع',
    byValue: 'حسب القيمة',
    abcAnalysis: 'تحليل ABC',
    
    // ABC Classification
    classA: 'فئة A (80% من القيمة)',
    classB: 'فئة B (15% من القيمة)',
    classC: 'فئة C (5% من القيمة)',
    
    // Aging
    agingAnalysis: 'تحليل العمر',
    age0to30: '0-30 يوم',
    age31to60: '31-60 يوم',
    age61to90: '61-90 يوم',
    age91to180: '91-180 يوم',
    ageOver180: 'أكثر من 180 يوم',
    slowMoving: 'بطيء الحركة',
    obsolete: 'متقادم',
    
    // Valuation Details
    valuationDetails: 'تفاصيل التقييم',
    costBasis: 'أساس التكلفة',
    nrv: 'صافي القيمة القابلة للتحقق (NRV)',
    lowerOfCostOrNRV: 'الأقل بين التكلفة و NRV',
    writeDown: 'انخفاض القيمة',
  },
  en: {
    inventoryValuation: 'Inventory Valuation',
    valuationDescription: 'Inventory valuation according to IAS 2',
    valuationMethod: 'Valuation Method',
    warehouse: 'Warehouse',
    category: 'Category',
    asOf: 'As of',
    export: 'Export',
    refresh: 'Refresh',
    
    // Methods
    fifo: 'First-In First-Out (FIFO)',
    lifo: 'Last-In First-Out (LIFO)',
    wac: 'Weighted Average Cost (WAC)',
    specific: 'Specific Identification',
    
    // Summary
    summary: 'Summary',
    totalQuantity: 'Total Quantity',
    totalValue: 'Total Value',
    averageUnitCost: 'Average Unit Cost',
    categories: 'Categories',
    warehouses: 'Warehouses',
    
    // Table
    itemCode: 'Item Code',
    itemName: 'Item Name',
    category: 'Category',
    warehouse: 'Warehouse',
    quantity: 'Quantity',
    unitCost: 'Unit Cost',
    totalValue: 'Total Value',
    lastMovement: 'Last Movement',
    
    // Analysis
    byCategory: 'By Category',
    byWarehouse: 'By Warehouse',
    byValue: 'By Value',
    abcAnalysis: 'ABC Analysis',
    
    // ABC Classification
    classA: 'Class A (80% of value)',
    classB: 'Class B (15% of value)',
    classC: 'Class C (5% of value)',
    
    // Aging
    agingAnalysis: 'Aging Analysis',
    age0to30: '0-30 days',
    age31to60: '31-60 days',
    age61to90: '61-90 days',
    age91to180: '91-180 days',
    ageOver180: 'Over 180 days',
    slowMoving: 'Slow Moving',
    obsolete: 'Obsolete',
    
    // Valuation Details
    valuationDetails: 'Valuation Details',
    costBasis: 'Cost Basis',
    nrv: 'Net Realizable Value (NRV)',
    lowerOfCostOrNRV: 'Lower of Cost or NRV',
    writeDown: 'Write Down',
  },
};

// Mock data
const mockInventoryData = [
  {
    itemCode: 'PROD-001',
    itemName: 'منتج إلكتروني A',
    itemNameEn: 'Electronic Product A',
    category: 'إلكترونيات',
    categoryEn: 'Electronics',
    warehouse: 'المستودع الرئيسي',
    warehouseEn: 'Main Warehouse',
    quantity: 500,
    unitCost: 250,
    totalValue: 125000,
    lastMovement: '2024-02-25',
    nrv: 280,
    age: 45,
  },
  {
    itemCode: 'PROD-002',
    itemName: 'قطع غيار B',
    itemNameEn: 'Spare Parts B',
    category: 'قطع غيار',
    categoryEn: 'Spare Parts',
    warehouse: 'المستودع الرئيسي',
    warehouseEn: 'Main Warehouse',
    quantity: 1200,
    unitCost: 75,
    totalValue: 90000,
    lastMovement: '2024-02-26',
    nrv: 80,
    age: 30,
  },
  {
    itemCode: 'PROD-003',
    itemName: 'مواد خام C',
    itemNameEn: 'Raw Material C',
    category: 'مواد خام',
    categoryEn: 'Raw Materials',
    warehouse: 'مستودع المواد',
    warehouseEn: 'Materials Warehouse',
    quantity: 3000,
    unitCost: 25,
    totalValue: 75000,
    lastMovement: '2024-02-20',
    nrv: 26,
    age: 65,
  },
  {
    itemCode: 'PROD-004',
    itemName: 'منتج تام D',
    itemNameEn: 'Finished Product D',
    category: 'منتجات تامة',
    categoryEn: 'Finished Goods',
    warehouse: 'المستودع الرئيسي',
    warehouseEn: 'Main Warehouse',
    quantity: 800,
    unitCost: 180,
    totalValue: 144000,
    lastMovement: '2024-02-27',
    nrv: 200,
    age: 15,
  },
  {
    itemCode: 'PROD-005',
    itemName: 'معدات E',
    itemNameEn: 'Equipment E',
    category: 'معدات',
    categoryEn: 'Equipment',
    warehouse: 'مستودع المعدات',
    warehouseEn: 'Equipment Warehouse',
    quantity: 150,
    unitCost: 1200,
    totalValue: 180000,
    lastMovement: '2024-02-15',
    nrv: 1250,
    age: 100,
  },
  {
    itemCode: 'PROD-006',
    itemName: 'مستلزمات مكتبية F',
    itemNameEn: 'Office Supplies F',
    category: 'مستلزمات',
    categoryEn: 'Supplies',
    warehouse: 'المستودع الرئيسي',
    warehouseEn: 'Main Warehouse',
    quantity: 2500,
    unitCost: 15,
    totalValue: 37500,
    lastMovement: '2024-02-24',
    nrv: 16,
    age: 40,
  },
  {
    itemCode: 'PROD-007',
    itemName: 'بضاعة بطيئة الحركة G',
    itemNameEn: 'Slow Moving Item G',
    category: 'إلكترونيات',
    categoryEn: 'Electronics',
    warehouse: 'المستودع الرئيسي',
    warehouseEn: 'Main Warehouse',
    quantity: 50,
    unitCost: 500,
    totalValue: 25000,
    lastMovement: '2023-09-10',
    nrv: 350,
    age: 200,
  },
];

export default function InventoryValuation() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const [valuationMethod, setValuationMethod] = useState<string>('wac');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('summary');

  // Calculate totals
  const totalQuantity = mockInventoryData.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = mockInventoryData.reduce((sum, item) => sum + item.totalValue, 0);
  const averageUnitCost = totalValue / totalQuantity;

  // Category breakdown
  const categoryBreakdown = mockInventoryData.reduce((acc, item) => {
    const category = locale === 'ar' ? item.category : item.categoryEn;
    if (!acc[category]) {
      acc[category] = { quantity: 0, value: 0 };
    }
    acc[category].quantity += item.quantity;
    acc[category].value += item.totalValue;
    return acc;
  }, {} as Record<string, { quantity: number; value: number }>);

  // Warehouse breakdown
  const warehouseBreakdown = mockInventoryData.reduce((acc, item) => {
    const warehouse = locale === 'ar' ? item.warehouse : item.warehouseEn;
    if (!acc[warehouse]) {
      acc[warehouse] = { quantity: 0, value: 0 };
    }
    acc[warehouse].quantity += item.quantity;
    acc[warehouse].value += item.totalValue;
    return acc;
  }, {} as Record<string, { quantity: number; value: number }>);

  // ABC Analysis
  const sortedByValue = [...mockInventoryData].sort((a, b) => b.totalValue - a.totalValue);
  let cumulativeValue = 0;
  const abcClassification = sortedByValue.map((item) => {
    cumulativeValue += item.totalValue;
    const cumulativePercentage = (cumulativeValue / totalValue) * 100;
    
    let classification = 'C';
    if (cumulativePercentage <= 80) {
      classification = 'A';
    } else if (cumulativePercentage <= 95) {
      classification = 'B';
    }
    
    return { ...item, classification, cumulativePercentage };
  });

  // Aging Analysis
  const agingData = mockInventoryData.reduce((acc, item) => {
    if (item.age <= 30) acc.age0to30 += item.totalValue;
    else if (item.age <= 60) acc.age31to60 += item.totalValue;
    else if (item.age <= 90) acc.age61to90 += item.totalValue;
    else if (item.age <= 180) acc.age91to180 += item.totalValue;
    else acc.ageOver180 += item.totalValue;
    
    if (item.age > 90) acc.slowMoving++;
    if (item.age > 180) acc.obsolete++;
    
    return acc;
  }, {
    age0to30: 0,
    age31to60: 0,
    age61to90: 0,
    age91to180: 0,
    ageOver180: 0,
    slowMoving: 0,
    obsolete: 0,
  });

  // NRV Comparison (IAS 2)
  const nrvComparison = mockInventoryData.map((item) => {
    const cost = item.totalValue;
    const nrvTotal = item.nrv * item.quantity;
    const lowerValue = Math.min(cost, nrvTotal);
    const writeDown = cost - lowerValue;
    
    return {
      ...item,
      nrvTotal,
      lowerValue,
      writeDown,
      needsWriteDown: writeDown > 0,
    };
  });

  const totalWriteDown = nrvComparison.reduce((sum, item) => sum + item.writeDown, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            {t('inventoryValuation')}
          </h1>
          <p className="text-gray-600 mt-1">{t('valuationDescription')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            {t('filter')}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t('export')}
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('refresh')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t('valuationMethod')}
              </label>
              <Select value={valuationMethod} onValueChange={setValuationMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fifo">{t('fifo')}</SelectItem>
                  <SelectItem value="lifo">{t('lifo')}</SelectItem>
                  <SelectItem value="wac">{t('wac')}</SelectItem>
                  <SelectItem value="specific">{t('specific')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t('warehouse')}</label>
              <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {locale === 'ar' ? 'جميع المستودعات' : 'All Warehouses'}
                  </SelectItem>
                  <SelectItem value="main">
                    {locale === 'ar' ? 'المستودع الرئيسي' : 'Main Warehouse'}
                  </SelectItem>
                  <SelectItem value="materials">
                    {locale === 'ar' ? 'مستودع المواد' : 'Materials Warehouse'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t('category')}</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {locale === 'ar' ? 'جميع الفئات' : 'All Categories'}
                  </SelectItem>
                  <SelectItem value="electronics">
                    {locale === 'ar' ? 'إلكترونيات' : 'Electronics'}
                  </SelectItem>
                  <SelectItem value="raw">
                    {locale === 'ar' ? 'مواد خام' : 'Raw Materials'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t('asOf')}</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('totalQuantity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {Object.keys(categoryBreakdown).length} {t('categories')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('totalValue')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalValue)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {Object.keys(warehouseBreakdown).length} {t('warehouses')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('averageUnitCost')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageUnitCost)}</div>
            <p className="text-xs text-gray-500 mt-1">
              {mockInventoryData.length} {locale === 'ar' ? 'صنف' : 'items'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('writeDown')} (IAS 2)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalWriteDown)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {nrvComparison.filter((i) => i.needsWriteDown).length}{' '}
              {locale === 'ar' ? 'صنف يحتاج تخفيض' : 'items need write-down'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">{t('summary')}</TabsTrigger>
          <TabsTrigger value="abc">{t('abcAnalysis')}</TabsTrigger>
          <TabsTrigger value="aging">{t('agingAnalysis')}</TabsTrigger>
          <TabsTrigger value="nrv">{t('valuationDetails')}</TabsTrigger>
        </TabsList>

        {/* Summary */}
        <TabsContent value="summary">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('itemCode')}</TableHead>
                    <TableHead>{t('itemName')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                    <TableHead>{t('warehouse')}</TableHead>
                    <TableHead className="text-right">{t('quantity')}</TableHead>
                    <TableHead className="text-right">{t('unitCost')}</TableHead>
                    <TableHead className="text-right">{t('totalValue')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventoryData.map((item) => (
                    <TableRow key={item.itemCode}>
                      <TableCell className="font-mono">{item.itemCode}</TableCell>
                      <TableCell className="font-medium">
                        {locale === 'ar' ? item.itemName : item.itemNameEn}
                      </TableCell>
                      <TableCell>
                        {locale === 'ar' ? item.category : item.categoryEn}
                      </TableCell>
                      <TableCell>
                        {locale === 'ar' ? item.warehouse : item.warehouseEn}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.unitCost)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.totalValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold bg-gray-50 dark:bg-gray-800">
                    <TableCell colSpan={4}>
                      {locale === 'ar' ? 'الإجمالي' : 'Total'}
                    </TableCell>
                    <TableCell className="text-right">
                      {totalQuantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right text-blue-600">
                      {formatCurrency(totalValue)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABC Analysis */}
        <TabsContent value="abc">
          <Card>
            <CardHeader>
              <CardTitle>{t('abcAnalysis')}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'تصنيف الأصناف حسب القيمة (قاعدة باريتو 80/20)'
                  : 'Item classification by value (Pareto 80/20 rule)'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('itemCode')}</TableHead>
                    <TableHead>{t('itemName')}</TableHead>
                    <TableHead className="text-right">{t('totalValue')}</TableHead>
                    <TableHead className="text-right">
                      {locale === 'ar' ? '% من الإجمالي' : '% of Total'}
                    </TableHead>
                    <TableHead className="text-right">
                      {locale === 'ar' ? '% التراكمي' : 'Cumulative %'}
                    </TableHead>
                    <TableHead>{locale === 'ar' ? 'التصنيف' : 'Class'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {abcClassification.map((item) => (
                    <TableRow key={item.itemCode}>
                      <TableCell className="font-mono">{item.itemCode}</TableCell>
                      <TableCell>
                        {locale === 'ar' ? item.itemName : item.itemNameEn}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.totalValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {((item.totalValue / totalValue) * 100).toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {item.cumulativePercentage.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.classification === 'A'
                              ? 'bg-green-100 text-green-800'
                              : item.classification === 'B'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {locale === 'ar' ? 'فئة' : 'Class'} {item.classification}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aging Analysis */}
        <TabsContent value="aging">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('agingAnalysis')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>{t('age0to30')}</span>
                  <span className="font-bold">{formatCurrency(agingData.age0to30)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('age31to60')}</span>
                  <span className="font-bold">{formatCurrency(agingData.age31to60)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('age61to90')}</span>
                  <span className="font-bold">{formatCurrency(agingData.age61to90)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('age91to180')}</span>
                  <span className="font-bold text-orange-600">
                    {formatCurrency(agingData.age91to180)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('ageOver180')}</span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(agingData.ageOver180)}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span>{t('slowMoving')}</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      {agingData.slowMoving} {locale === 'ar' ? 'صنف' : 'items'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>{t('obsolete')}</span>
                    <Badge className="bg-red-100 text-red-800">
                      {agingData.obsolete} {locale === 'ar' ? 'صنف' : 'items'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'حسب الفئة' : 'By Category'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categoryBreakdown).map(([category, data]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category}</span>
                      <span className="font-bold">{formatCurrency(data.value)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(data.value / totalValue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NRV Comparison */}
        <TabsContent value="nrv">
          <Card>
            <CardHeader>
              <CardTitle>{t('valuationDetails')} - IAS 2</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'المقارنة بين التكلفة وصافي القيمة القابلة للتحقق'
                  : 'Comparison between Cost and Net Realizable Value'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('itemCode')}</TableHead>
                    <TableHead>{t('itemName')}</TableHead>
                    <TableHead className="text-right">{t('costBasis')}</TableHead>
                    <TableHead className="text-right">{t('nrv')}</TableHead>
                    <TableHead className="text-right">{t('lowerOfCostOrNRV')}</TableHead>
                    <TableHead className="text-right">{t('writeDown')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nrvComparison.map((item) => (
                    <TableRow
                      key={item.itemCode}
                      className={item.needsWriteDown ? 'bg-red-50 dark:bg-red-950' : ''}
                    >
                      <TableCell className="font-mono">{item.itemCode}</TableCell>
                      <TableCell>
                        {locale === 'ar' ? item.itemName : item.itemNameEn}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.totalValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.nrvTotal)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.lowerValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.needsWriteDown ? (
                          <span className="text-red-600 font-bold">
                            ({formatCurrency(item.writeDown)})
                          </span>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold bg-gray-50 dark:bg-gray-800">
                    <TableCell colSpan={5}>
                      {locale === 'ar' ? 'إجمالي انخفاض القيمة' : 'Total Write Down'}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      ({formatCurrency(totalWriteDown)})
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Search, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Boxes,
  Warehouse,
  DollarSign,
  BarChart3,
  FileSpreadsheet,
  Download,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  universalInventoryItems,
  getItemsByIndustry,
  getItemsByCategory,
  getItemsByType,
  searchItems,
  getLowStockItems,
  getOutOfStockItems,
  calculateTotalInventoryValue,
  industryCategories,
  itemTypes,
} from '../../lib/inventoryData';

export default function Inventory() {
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getFilteredItems = () => {
    let items = universalInventoryItems;

    if (selectedIndustry !== 'all') {
      items = getItemsByIndustry(selectedIndustry);
    }

    if (selectedType !== 'all') {
      items = items.filter(item => item.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      items = searchItems(searchTerm);
    }

    return items;
  };

  const getTypeLabel = (type: string) => {
    const typeObj = itemTypes.find(t => t.value === type);
    return locale === 'ar' ? typeObj?.labelAr : typeObj?.labelEn;
  };

  const getStatusBadge = (item: any) => {
    if (item.currentStock === 0) {
      return (
        <Badge variant="destructive">
          {locale === 'ar' ? 'نفذ' : 'Out of Stock'}
        </Badge>
      );
    }
    if (item.currentStock <= item.reorderPoint) {
      return (
        <Badge className="bg-orange-600">
          {locale === 'ar' ? 'منخفض' : 'Low Stock'}
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-600">
        {locale === 'ar' ? 'متوفر' : 'In Stock'}
      </Badge>
    );
  };

  const handleExport = () => {
    toast.success(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...');
  };

  const categories = Array.from(new Set(universalInventoryItems.map(item => item.category)));
  const lowStockItems = getLowStockItems();
  const outOfStockItems = getOutOfStockItems();
  const totalValue = calculateTotalInventoryValue();

  const stats = [
    {
      label: locale === 'ar' ? 'إجمالي الأصناف' : 'Total Items',
      value: universalInventoryItems.length,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: locale === 'ar' ? 'قيمة المخزون' : 'Inventory Value',
      value: `${totalValue.toLocaleString()} ${locale === 'ar' ? 'ر.س' : 'SAR'}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: locale === 'ar' ? 'مخزون منخفض' : 'Low Stock',
      value: lowStockItems.length,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: locale === 'ar' ? 'نفذ من المخزون' : 'Out of Stock',
      value: outOfStockItems.length,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'إدارة المخزون الشامل' : 'Universal Inventory Management'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 
              '500+ صنف يغطي جميع الصناعات - متوافق مع IAS 2' : 
              '500+ items covering all industries - IAS 2 Compliant'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
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
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={locale === 'ar' ? 'بحث بالكود، الاسم، الباركود...' : 'Search by code, name, barcode...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Industry Filter */}
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'نوع العمل' : 'Industry'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'كل الأعمال' : 'All Industries'}</SelectItem>
                {industryCategories.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'نوع الصنف' : 'Item Type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'كل الأنواع' : 'All Types'}</SelectItem>
                {itemTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {locale === 'ar' ? type.labelAr : type.labelEn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={locale === 'ar' ? 'الفئة' : 'Category'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'كل الفئات' : 'All Categories'}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            {locale === 'ar' ? 'كل الأصناف' : 'All Items'} ({getFilteredItems().length})
          </TabsTrigger>
          <TabsTrigger value="low-stock">
            {locale === 'ar' ? 'مخزون منخفض' : 'Low Stock'} ({lowStockItems.length})
          </TabsTrigger>
          <TabsTrigger value="out-of-stock">
            {locale === 'ar' ? 'نفذ من المخزون' : 'Out of Stock'} ({outOfStockItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'جميع الأصناف' : 'All Items'}</CardTitle>
              <CardDescription>
                <Badge variant="outline">IAS 2 Compliant</Badge>
                <Badge variant="outline" className="ml-2">FIFO/LIFO/WAC/Specific ID</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-32">{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الكمية' : 'Stock'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'سعر التكلفة' : 'Cost'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'سعر البيع' : 'Price'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'المستودع' : 'Location'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredItems().map(item => (
                      <TableRow key={item.code}>
                        <TableCell className="font-mono text-xs">{item.code}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{locale === 'ar' ? item.nameAr : item.nameEn}</p>
                            {item.barcode && (
                              <p className="text-xs text-muted-foreground">{item.barcode}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{item.category}</p>
                            {item.subCategory && (
                              <p className="text-xs text-muted-foreground">{item.subCategory}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getTypeLabel(item.type)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <p className="font-bold">{item.currentStock}</p>
                            <p className="text-xs text-muted-foreground">
                              {locale === 'ar' ? item.unitAr : item.unit}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.costPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {item.sellingPrice > 0 ? item.sellingPrice.toLocaleString() : '-'}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item)}
                        </TableCell>
                        <TableCell className="text-xs">{item.warehouseLocation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                {locale === 'ar' ? 'أصناف تحتاج إعادة طلب' : 'Items Need Reordering'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الكمية الحالية' : 'Current'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'نقطة إعادة الطلب' : 'Reorder Point'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'الحد الأقصى' : 'Max'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'كمية مقترحة' : 'Suggested Qty'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockItems.map(item => (
                      <TableRow key={item.code}>
                        <TableCell className="font-mono">{item.code}</TableCell>
                        <TableCell>{locale === 'ar' ? item.nameAr : item.nameEn}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-orange-600 font-bold">{item.currentStock}</span>
                        </TableCell>
                        <TableCell className="text-right">{item.reorderPoint}</TableCell>
                        <TableCell className="text-right">{item.maxStock}</TableCell>
                        <TableCell className="text-right">
                          <span className="text-green-600 font-bold">
                            {item.maxStock - item.currentStock}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="out-of-stock">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                {locale === 'ar' ? 'أصناف نفذت من المخزون' : 'Out of Stock Items'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'اسم الصنف' : 'Item Name'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'الفئة' : 'Category'}</TableHead>
                      <TableHead className="text-right">{locale === 'ar' ? 'آخر سعر بيع' : 'Last Price'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'المستودع' : 'Location'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outOfStockItems.map(item => (
                      <TableRow key={item.code}>
                        <TableCell className="font-mono">{item.code}</TableCell>
                        <TableCell>{locale === 'ar' ? item.nameAr : item.nameEn}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.sellingPrice.toLocaleString()}</TableCell>
                        <TableCell>{item.warehouseLocation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Industry Coverage */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'تغطية الصناعات' : 'Industry Coverage'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {industryCategories.map(industry => {
              const count = getItemsByIndustry(industry).length;
              return (
                <div key={industry} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                     onClick={() => setSelectedIndustry(industry)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{industry}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {count} {locale === 'ar' ? 'صنف' : 'items'}
                      </p>
                    </div>
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* IAS 2 Compliance Info */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'التوافق مع معيار المحاسبة الدولي IAS 2' : 'IAS 2 Compliance'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">FIFO</h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'الوارد أولاً صادر أولاً' : 'First In, First Out'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">LIFO</h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'الوارد أخيراً صادر أولاً' : 'Last In, First Out'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">WAC</h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'المتوسط المرجح' : 'Weighted Average Cost'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold mb-2">Specific ID</h3>
              <p className="text-sm text-muted-foreground">
                {locale === 'ar' ? 'التمييز الفعلي' : 'Specific Identification'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

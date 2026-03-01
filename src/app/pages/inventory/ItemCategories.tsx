import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
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
import { Textarea } from '../../components/ui/textarea';
import {
  Plus,
  Search,
  Folder,
  Edit,
  Trash2,
  Package,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  parentId?: string;
  level: number;
  description: string;
  itemsCount: number;
  status: 'active' | 'inactive';
  children?: Category[];
}

export default function ItemCategories() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['1', '2']));

  // Mock data with hierarchical structure
  const categories: Category[] = [
    {
      id: '1',
      code: 'CAT-001',
      name: 'إلكترونيات',
      nameEn: 'Electronics',
      level: 1,
      description: 'الأجهزة والمعدات الإلكترونية',
      itemsCount: 245,
      status: 'active',
      children: [
        {
          id: '1.1',
          code: 'CAT-001-01',
          name: 'أجهزة كمبيوتر',
          nameEn: 'Computers',
          parentId: '1',
          level: 2,
          description: 'أجهزة الكمبيوتر المكتبية والمحمولة',
          itemsCount: 120,
          status: 'active',
          children: [
            {
              id: '1.1.1',
              code: 'CAT-001-01-01',
              name: 'كمبيوتر محمول',
              nameEn: 'Laptops',
              parentId: '1.1',
              level: 3,
              description: 'أجهزة كمبيوتر محمولة',
              itemsCount: 80,
              status: 'active',
            },
            {
              id: '1.1.2',
              code: 'CAT-001-01-02',
              name: 'كمبيوتر مكتبي',
              nameEn: 'Desktops',
              parentId: '1.1',
              level: 3,
              description: 'أجهزة كمبيوتر مكتبية',
              itemsCount: 40,
              status: 'active',
            },
          ],
        },
        {
          id: '1.2',
          code: 'CAT-001-02',
          name: 'طابعات',
          nameEn: 'Printers',
          parentId: '1',
          level: 2,
          description: 'طابعات متنوعة',
          itemsCount: 65,
          status: 'active',
        },
        {
          id: '1.3',
          code: 'CAT-001-03',
          name: 'ملحقات',
          nameEn: 'Accessories',
          parentId: '1',
          level: 2,
          description: 'ملحقات الكمبيوتر',
          itemsCount: 60,
          status: 'active',
        },
      ],
    },
    {
      id: '2',
      code: 'CAT-002',
      name: 'أثاث مكتبي',
      nameEn: 'Office Furniture',
      level: 1,
      description: 'أثاث ومعدات مكتبية',
      itemsCount: 180,
      status: 'active',
      children: [
        {
          id: '2.1',
          code: 'CAT-002-01',
          name: 'مكاتب',
          nameEn: 'Desks',
          parentId: '2',
          level: 2,
          description: 'مكاتب بأحجام مختلفة',
          itemsCount: 85,
          status: 'active',
        },
        {
          id: '2.2',
          code: 'CAT-002-02',
          name: 'كراسي',
          nameEn: 'Chairs',
          parentId: '2',
          level: 2,
          description: 'كراسي مكتبية',
          itemsCount: 95,
          status: 'active',
        },
      ],
    },
    {
      id: '3',
      code: 'CAT-003',
      name: 'قرطاسية',
      nameEn: 'Stationery',
      level: 1,
      description: 'مستلزمات قرطاسية',
      itemsCount: 320,
      status: 'active',
    },
  ];

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category: Category) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = category.children && category.children.length > 0;
    const indent = (category.level - 1) * 2;

    return (
      <React.Fragment key={category.id}>
        <TableRow 
          className={`${category.level === 1 ? 'bg-muted/30 font-semibold' : ''} hover:bg-muted/50`}
        >
          <TableCell style={{ paddingLeft: `${indent + 1}rem` }}>
            <div className="flex items-center gap-2">
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(category.id)}
                  className="hover:bg-muted p-1 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <span className="w-6" />
              )}
              <Folder className={`h-4 w-4 ${category.level === 1 ? 'text-blue-600' : category.level === 2 ? 'text-green-600' : 'text-orange-600'}`} />
              <span className="font-mono text-sm">{category.code}</span>
            </div>
          </TableCell>
          <TableCell className="font-medium">
            {locale === 'ar' ? category.name : category.nameEn}
          </TableCell>
          <TableCell>{category.description}</TableCell>
          <TableCell className="text-center">
            <Badge variant="outline" className="flex items-center gap-1 justify-center w-fit">
              <Package className="h-3 w-3" />
              {category.itemsCount}
            </Badge>
          </TableCell>
          <TableCell>
            {category.status === 'active' ? (
              <Badge className="bg-green-600">{locale === 'ar' ? 'نشط' : 'Active'}</Badge>
            ) : (
              <Badge variant="secondary">{locale === 'ar' ? 'غير نشط' : 'Inactive'}</Badge>
            )}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {isExpanded && hasChildren && category.children!.map(child => renderCategory(child))}
      </React.Fragment>
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'تصنيفات الأصناف' : 'Item Categories'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة التصنيفات الهرمية للأصناف' : 'Manage hierarchical item categories'}
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'تصنيف جديد' : 'New Category'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {locale === 'ar' ? 'إضافة تصنيف جديد' : 'Add New Category'}
              </DialogTitle>
              <DialogDescription>
                {locale === 'ar' ? 'املأ معلومات التصنيف' : 'Fill in category information'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'الكود' : 'Code'}</Label>
                  <Input placeholder="CAT-XXX" />
                </div>
                <div className="space-y-2">
                  <Label>{locale === 'ar' ? 'التصنيف الرئيسي' : 'Parent Category'}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={locale === 'ar' ? 'اختياري' : 'Optional'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{locale === 'ar' ? 'لا يوجد' : 'None'}</SelectItem>
                      <SelectItem value="1">{locale === 'ar' ? 'إلكترونيات' : 'Electronics'}</SelectItem>
                      <SelectItem value="2">{locale === 'ar' ? 'أثاث مكتبي' : 'Office Furniture'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم بالعربية' : 'Arabic Name'}</Label>
                <Input placeholder={locale === 'ar' ? 'أدخل الاسم' : 'Enter name'} />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الاسم بالإنجليزية' : 'English Name'}</Label>
                <Input placeholder="Enter name" />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                <Textarea 
                  placeholder={locale === 'ar' ? 'أضف وصف...' : 'Add description...'}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الحالة' : 'Status'}</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{locale === 'ar' ? 'نشط' : 'Active'}</SelectItem>
                    <SelectItem value="inactive">{locale === 'ar' ? 'غير نشط' : 'Inactive'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                {locale === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={() => {
                toast.success(locale === 'ar' ? 'تمت الإضافة بنجاح' : 'Category added successfully');
                setIsCreateOpen(false);
              }}>
                {locale === 'ar' ? 'إضافة' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي التصنيفات' : 'Total Categories'}
            </CardTitle>
            <Folder className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'التصنيفات الرئيسية' : 'Main Categories'}
            </CardTitle>
            <Folder className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'إجمالي الأصناف' : 'Total Items'}
            </CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">745</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {locale === 'ar' ? 'النشطة' : 'Active'}
            </CardTitle>
            <Folder className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={locale === 'ar' ? 'بحث في التصنيفات...' : 'Search categories...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'هيكل التصنيفات' : 'Category Structure'}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'الكود' : 'Code'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                <TableHead className="text-center">{locale === 'ar' ? 'عدد الأصناف' : 'Items'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                <TableHead className="text-right">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => renderCategory(category))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

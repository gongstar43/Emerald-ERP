import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Shield,
  Search,
  User,
  Crown,
  Save,
  RotateCcw,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Briefcase,
  BarChart3,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  module: string;
  read: boolean;
  write: boolean;
}

interface UserPermissionData {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: Permission[];
}

const MODULES = [
  {
    id: 'dashboard',
    name: { ar: 'لوحة التحكم', en: 'Dashboard' },
    icon: BarChart3,
    pages: [
      { id: 'dashboard', name: { ar: 'الرئيسية', en: 'Main Dashboard' } },
    ],
  },
  {
    id: 'sales',
    name: { ar: 'المبيعات', en: 'Sales' },
    icon: ShoppingCart,
    pages: [
      { id: 'sales_customers', name: { ar: 'العملاء', en: 'Customers' } },
      { id: 'sales_quotations', name: { ar: 'عروض الأسعار', en: 'Quotations' } },
      { id: 'sales_orders', name: { ar: 'طلبات البيع', en: 'Sales Orders' } },
      { id: 'sales_invoices', name: { ar: 'فواتير البيع', en: 'Sales Invoices' } },
      { id: 'sales_returns', name: { ar: 'مرتجعات المبيعات', en: 'Sales Returns' } },
      { id: 'sales_reports', name: { ar: 'تقارير المبيعات', en: 'Sales Reports' } },
    ],
  },
  {
    id: 'purchases',
    name: { ar: 'المشتريات', en: 'Purchases' },
    icon: Package,
    pages: [
      { id: 'purchases_suppliers', name: { ar: 'الموردين', en: 'Suppliers' } },
      { id: 'purchases_orders', name: { ar: 'طلبات الشراء', en: 'Purchase Orders' } },
      { id: 'purchases_invoices', name: { ar: 'فواتير الشراء', en: 'Purchase Invoices' } },
      { id: 'purchases_returns', name: { ar: 'مرتجعات المشتريات', en: 'Purchase Returns' } },
      { id: 'purchases_reports', name: { ar: 'تقارير المشتريات', en: 'Purchase Reports' } },
    ],
  },
  {
    id: 'inventory',
    name: { ar: 'المخزون', en: 'Inventory' },
    icon: Package,
    pages: [
      { id: 'inventory_items', name: { ar: 'الأصناف', en: 'Items' } },
      { id: 'inventory_warehouses', name: { ar: 'المستودعات', en: 'Warehouses' } },
      { id: 'inventory_movements', name: { ar: 'حركات المخزون', en: 'Stock Movements' } },
      { id: 'inventory_adjustments', name: { ar: 'تسويات المخزون', en: 'Stock Adjustments' } },
      { id: 'inventory_reports', name: { ar: 'تقارير المخزون', en: 'Inventory Reports' } },
    ],
  },
  {
    id: 'accounting',
    name: { ar: 'المحاسبة', en: 'Accounting' },
    icon: DollarSign,
    pages: [
      { id: 'accounting_accounts', name: { ar: 'دليل الحسابات', en: 'Chart of Accounts' } },
      { id: 'accounting_journal', name: { ar: 'القيود اليومية', en: 'Journal Entries' } },
      { id: 'accounting_invoices', name: { ar: 'الفواتير', en: 'Invoices' } },
      { id: 'accounting_receipts', name: { ar: 'سندات القبض', en: 'Receipts' } },
      { id: 'accounting_payments', name: { ar: 'سندات الصرف', en: 'Payments' } },
      { id: 'accounting_reports', name: { ar: 'التقارير المالية', en: 'Financial Reports' } },
    ],
  },
  {
    id: 'hr',
    name: { ar: 'الموارد البشرية', en: 'HR' },
    icon: Users,
    pages: [
      { id: 'hr_employees', name: { ar: 'الموظفين', en: 'Employees' } },
      { id: 'hr_attendance', name: { ar: 'الحضور والغياب', en: 'Attendance' } },
      { id: 'hr_payroll', name: { ar: 'الرواتب', en: 'Payroll' } },
      { id: 'hr_leaves', name: { ar: 'الإجازات', en: 'Leaves' } },
      { id: 'hr_reports', name: { ar: 'تقارير الموارد البشرية', en: 'HR Reports' } },
    ],
  },
  {
    id: 'projects',
    name: { ar: 'المشاريع', en: 'Projects' },
    icon: Briefcase,
    pages: [
      { id: 'projects_list', name: { ar: 'المشاريع', en: 'Projects' } },
      { id: 'projects_tasks', name: { ar: 'المهام', en: 'Tasks' } },
      { id: 'projects_resources', name: { ar: 'الموارد', en: 'Resources' } },
      { id: 'projects_reports', name: { ar: 'تقارير المشاريع', en: 'Project Reports' } },
    ],
  },
  {
    id: 'governance',
    name: { ar: 'الحوكمة', en: 'Governance' },
    icon: Shield,
    pages: [
      { id: 'governance_workflows', name: { ar: 'سير العمل', en: 'Workflows' } },
      { id: 'governance_policies', name: { ar: 'السياسات', en: 'Policies' } },
      { id: 'governance_compliance', name: { ar: 'الامتثال', en: 'Compliance' } },
      { id: 'governance_audits', name: { ar: 'المراجعة الداخلية', en: 'Internal Audits' } },
    ],
  },
  {
    id: 'risk',
    name: { ar: 'إدارة المخاطر', en: 'Risk Management' },
    icon: AlertTriangle,
    pages: [
      { id: 'risk_register', name: { ar: 'سجل المخاطر', en: 'Risk Register' } },
      { id: 'risk_assessment', name: { ar: 'تقييم المخاطر', en: 'Risk Assessment' } },
      { id: 'risk_mitigation', name: { ar: 'تخفيف المخاطر', en: 'Risk Mitigation' } },
      { id: 'risk_monitoring', name: { ar: 'مراقبة المخاطر', en: 'Risk Monitoring' } },
    ],
  },
];

const MOCK_USERS: UserPermissionData[] = [
  {
    id: '2',
    name: 'أحمد محمد',
    email: 'ahmed.mohammed@company.com',
    role: 'sales_manager',
    permissions: [
      { module: 'dashboard', read: true, write: false },
      { module: 'sales_customers', read: true, write: true },
      { module: 'sales_quotations', read: true, write: true },
      { module: 'sales_orders', read: true, write: true },
      { module: 'sales_invoices', read: true, write: true },
      { module: 'sales_returns', read: true, write: false },
      { module: 'sales_reports', read: true, write: false },
    ],
  },
  {
    id: '3',
    name: 'Sara Ahmed',
    email: 'sara.ahmed@company.com',
    role: 'accountant',
    permissions: [
      { module: 'dashboard', read: true, write: false },
      { module: 'accounting_accounts', read: true, write: true },
      { module: 'accounting_journal', read: true, write: true },
      { module: 'accounting_invoices', read: true, write: true },
      { module: 'accounting_receipts', read: true, write: true },
      { module: 'accounting_payments', read: true, write: true },
      { module: 'accounting_reports', read: true, write: false },
    ],
  },
  {
    id: '4',
    name: 'محمد علي',
    email: 'mohammed.ali@company.com',
    role: 'warehouse_manager',
    permissions: [
      { module: 'dashboard', read: true, write: false },
      { module: 'inventory_items', read: true, write: true },
      { module: 'inventory_warehouses', read: true, write: true },
      { module: 'inventory_movements', read: true, write: true },
      { module: 'inventory_adjustments', read: true, write: true },
      { module: 'inventory_reports', read: true, write: false },
    ],
  },
];

export default function UserPermissions() {
  const { locale } = useLanguage();
  const [users, setUsers] = useState<UserPermissionData[]>(MOCK_USERS);
  const [selectedUserId, setSelectedUserId] = useState<string>(MOCK_USERS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const updatePermission = (pageId: string, field: 'read' | 'write', value: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === selectedUserId) {
          const existingPermission = user.permissions.find((p) => p.module === pageId);
          if (existingPermission) {
            return {
              ...user,
              permissions: user.permissions.map((p) =>
                p.module === pageId ? { ...p, [field]: value } : p
              ),
            };
          } else {
            return {
              ...user,
              permissions: [
                ...user.permissions,
                { module: pageId, read: field === 'read' ? value : false, write: field === 'write' ? value : false },
              ],
            };
          }
        }
        return user;
      })
    );
    setHasChanges(true);
  };

  const getPermission = (pageId: string): Permission => {
    const permission = selectedUser?.permissions.find((p) => p.module === pageId);
    return permission || { module: pageId, read: false, write: false };
  };

  const handleSave = () => {
    toast.success(locale === 'ar' ? 'تم حفظ الصلاحيات بنجاح' : 'Permissions saved successfully');
    setHasChanges(false);
  };

  const handleReset = () => {
    setUsers(MOCK_USERS);
    setHasChanges(false);
    toast.info(locale === 'ar' ? 'تم إعادة تعيين الصلاحيات' : 'Permissions reset');
  };

  const grantFullAccess = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === selectedUserId) {
          const allPermissions: Permission[] = [];
          MODULES.forEach((module) => {
            module.pages.forEach((page) => {
              allPermissions.push({ module: page.id, read: true, write: true });
            });
          });
          return { ...user, permissions: allPermissions };
        }
        return user;
      })
    );
    setHasChanges(true);
    toast.success(locale === 'ar' ? 'تم منح جميع الصلاحيات' : 'Full access granted');
  };

  const revokeAllAccess = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === selectedUserId) {
          return { ...user, permissions: [] };
        }
        return user;
      })
    );
    setHasChanges(true);
    toast.success(locale === 'ar' ? 'تم إلغاء جميع الصلاحيات' : 'All access revoked');
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            {locale === 'ar' ? 'صلاحيات المستخدمين' : 'User Permissions'}
          </h1>
          <p className="text-gray-600 mt-1">
            {locale === 'ar'
              ? 'تخصيص صلاحيات القراءة والكتابة لكل مستخدم'
              : 'Customize read and write permissions for each user'}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {locale === 'ar' ? 'إعادة تعيين' : 'Reset'}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'صلاحيات فعالة' : 'Active Permissions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {selectedUser?.permissions.length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'صلاحيات القراءة' : 'Read Permissions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {selectedUser?.permissions.filter((p) => p.read).length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'صلاحيات الكتابة' : 'Write Permissions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {selectedUser?.permissions.filter((p) => p.write).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Users List */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHeader>
            <CardTitle>{locale === 'ar' ? 'المستخدمين' : 'Users'}</CardTitle>
            <CardDescription>
              {locale === 'ar' ? 'اختر مستخدم لتعديل صلاحياته' : 'Select a user to edit permissions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Users List */}
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setHasChanges(false);
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedUserId === user.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {user.permissions.length} {locale === 'ar' ? 'صلاحية' : 'permissions'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Panel */}
        <Card className="col-span-12 lg:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {locale === 'ar' ? 'الصلاحيات - ' : 'Permissions - '}
                  {selectedUser?.name}
                </CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'قم بتخصيص صلاحيات القراءة والكتابة لكل وحدة'
                    : 'Customize read and write permissions for each module'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={revokeAllAccess}
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'إلغاء الكل' : 'Revoke All'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={grantFullAccess}
                  className="text-green-600 hover:text-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {locale === 'ar' ? 'منح الكل' : 'Grant All'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={MODULES[0].id} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                {MODULES.map((module) => {
                  const ModuleIcon = module.icon;
                  return (
                    <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2">
                      <ModuleIcon className="h-4 w-4" />
                      {module.name[locale]}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {MODULES.map((module) => (
                <TabsContent key={module.id} value={module.id} className="space-y-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50%]">
                            {locale === 'ar' ? 'الصفحة' : 'Page'}
                          </TableHead>
                          <TableHead className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Lock className="h-4 w-4" />
                              {locale === 'ar' ? 'قراءة' : 'Read'}
                            </div>
                          </TableHead>
                          <TableHead className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Unlock className="h-4 w-4" />
                              {locale === 'ar' ? 'كتابة' : 'Write'}
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {module.pages.map((page) => {
                          const permission = getPermission(page.id);
                          return (
                            <TableRow key={page.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-gray-500" />
                                  {page.name[locale]}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex justify-center">
                                  <Switch
                                    checked={permission.read}
                                    onCheckedChange={(checked) => updatePermission(page.id, 'read', checked)}
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex justify-center">
                                  <Switch
                                    checked={permission.write}
                                    onCheckedChange={(checked) => updatePermission(page.id, 'write', checked)}
                                    disabled={!permission.read}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">
            {locale === 'ar' ? 'لديك تغييرات غير محفوظة' : 'You have unsaved changes'}
          </span>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Users,
  FileText,
  ShoppingCart,
  Package,
  DollarSign,
  Briefcase,
  Settings,
  BarChart3,
  AlertTriangle,
  Save,
} from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  module: string;
  read: boolean;
  write: boolean;
}

interface Role {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  permissions: Permission[];
  usersCount: number;
  isSystem: boolean;
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
      { id: 'inventory_movements', name: { ar: 'الحركات', en: 'Movements' } },
      { id: 'inventory_adjustments', name: { ar: 'التسويات', en: 'Adjustments' } },
      { id: 'inventory_transfers', name: { ar: 'التحويلات', en: 'Transfers' } },
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
      { id: 'accounting_receipts', name: { ar: 'الإيصالات', en: 'Receipts' } },
      { id: 'accounting_payments', name: { ar: 'المدفوعات', en: 'Payments' } },
      { id: 'accounting_reports', name: { ar: 'التقارير المالية', en: 'Financial Reports' } },
    ],
  },
  {
    id: 'hr',
    name: { ar: 'الموارد البشرية', en: 'Human Resources' },
    icon: Users,
    pages: [
      { id: 'hr_employees', name: { ar: 'الموظفون', en: 'Employees' } },
      { id: 'hr_attendance', name: { ar: 'الحضور', en: 'Attendance' } },
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
      { id: 'projects_timesheet', name: { ar: 'سجل الوقت', en: 'Timesheet' } },
      { id: 'projects_expenses', name: { ar: 'المصروفات', en: 'Expenses' } },
      { id: 'projects_reports', name: { ar: 'تقارير المشاريع', en: 'Project Reports' } },
    ],
  },
  {
    id: 'reports',
    name: { ar: 'التقارير', en: 'Reports' },
    icon: FileText,
    pages: [
      { id: 'reports_financial', name: { ar: 'التقارير المالية', en: 'Financial Reports' } },
      { id: 'reports_executive', name: { ar: 'التقارير التنفيذية', en: 'Executive Reports' } },
      { id: 'reports_custom', name: { ar: 'تقارير مخصصة', en: 'Custom Reports' } },
    ],
  },
  {
    id: 'settings',
    name: { ar: 'الإعدادات', en: 'Settings' },
    icon: Settings,
    pages: [
      { id: 'settings_company', name: { ar: 'إعدادات الشركة', en: 'Company Settings' } },
      { id: 'settings_users', name: { ar: 'المستخدمين', en: 'Users' } },
      { id: 'settings_roles', name: { ar: 'الأدوار والصلاحيات', en: 'Roles & Permissions' } },
      { id: 'settings_system', name: { ar: 'إعدادات النظام', en: 'System Settings' } },
    ],
  },
];

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'System Admin',
    nameAr: 'مدير النظام',
    description: 'Full system access with all permissions',
    descriptionAr: 'وصول كامل للنظام مع جميع الصلاحيات',
    permissions: MODULES.flatMap((module) =>
      module.pages.map((page) => ({
        module: page.id,
        read: true,
        write: true,
      }))
    ),
    usersCount: 2,
    isSystem: true,
  },
  {
    id: '2',
    name: 'Sales Manager',
    nameAr: 'مدير المبيعا��',
    description: 'Full access to sales module with reports',
    descriptionAr: 'وصول كامل لوحدة المبيعات مع التقارير',
    permissions: [
      { module: 'dashboard', read: true, write: false },
      { module: 'sales_customers', read: true, write: true },
      { module: 'sales_quotations', read: true, write: true },
      { module: 'sales_orders', read: true, write: true },
      { module: 'sales_invoices', read: true, write: true },
      { module: 'sales_returns', read: true, write: true },
      { module: 'sales_reports', read: true, write: false },
    ],
    usersCount: 5,
    isSystem: false,
  },
  {
    id: '3',
    name: 'Accountant',
    nameAr: 'محاسب',
    description: 'Access to accounting and financial modules',
    descriptionAr: 'وصول لوحدات المحاسبة والمالية',
    permissions: [
      { module: 'dashboard', read: true, write: false },
      { module: 'accounting_accounts', read: true, write: true },
      { module: 'accounting_journal', read: true, write: true },
      { module: 'accounting_invoices', read: true, write: false },
      { module: 'accounting_receipts', read: true, write: true },
      { module: 'accounting_payments', read: true, write: true },
      { module: 'accounting_reports', read: true, write: false },
      { module: 'reports_financial', read: true, write: false },
    ],
    usersCount: 3,
    isSystem: false,
  },
  {
    id: '4',
    name: 'Warehouse Manager',
    nameAr: 'مدير المخزون',
    description: 'Full access to inventory management',
    descriptionAr: 'وصول كامل لإدارة المخزون',
    permissions: [
      { module: 'dashboard', read: true, write: false },
      { module: 'inventory_items', read: true, write: true },
      { module: 'inventory_warehouses', read: true, write: true },
      { module: 'inventory_movements', read: true, write: true },
      { module: 'inventory_adjustments', read: true, write: true },
      { module: 'inventory_transfers', read: true, write: true },
      { module: 'inventory_reports', read: true, write: false },
    ],
    usersCount: 4,
    isSystem: false,
  },
];

export default function RolesPermissions() {
  const { locale } = useLanguage();
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    permissions: [] as Permission[],
  });

  const handleAddRole = () => {
    if (!formData.name || !formData.nameAr) {
      toast.error(
        locale === 'ar'
          ? 'الرجاء ملء الاسم بالعربية والإنجليزية'
          : 'Please fill name in Arabic and English'
      );
      return;
    }

    const newRole: Role = {
      id: String(roles.length + 1),
      name: formData.name,
      nameAr: formData.nameAr,
      description: formData.description,
      descriptionAr: formData.descriptionAr,
      permissions: formData.permissions,
      usersCount: 0,
      isSystem: false,
    };

    setRoles([...roles, newRole]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(locale === 'ar' ? 'تم إضافة الدور بنجاح' : 'Role added successfully');
  };

  const handleEditRole = () => {
    if (!selectedRole) return;

    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id
        ? {
            ...role,
            name: formData.name,
            nameAr: formData.nameAr,
            description: formData.description,
            descriptionAr: formData.descriptionAr,
            permissions: formData.permissions,
          }
        : role
    );

    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
    setSelectedRole(null);
    resetForm();
    toast.success(locale === 'ar' ? 'تم تحديث الدور بنجاح' : 'Role updated successfully');
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role?.isSystem) {
      toast.error(
        locale === 'ar' ? 'لا يمكن حذف الأدوار الأساسية للنظام' : 'Cannot delete system roles'
      );
      return;
    }

    setRoles(roles.filter((r) => r.id !== roleId));
    toast.success(locale === 'ar' ? 'تم حذف الدور بنجاح' : 'Role deleted successfully');
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      nameAr: role.nameAr,
      description: role.description,
      descriptionAr: role.descriptionAr,
      permissions: [...role.permissions],
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (role: Role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      permissions: [],
    });
  };

  const togglePermission = (pageId: string, type: 'read' | 'write') => {
    const existingIndex = formData.permissions.findIndex((p) => p.module === pageId);

    if (existingIndex >= 0) {
      const updatedPermissions = [...formData.permissions];
      updatedPermissions[existingIndex] = {
        ...updatedPermissions[existingIndex],
        [type]: !updatedPermissions[existingIndex][type],
      };

      // If write is enabled, automatically enable read
      if (type === 'write' && updatedPermissions[existingIndex].write) {
        updatedPermissions[existingIndex].read = true;
      }

      // If read is disabled, automatically disable write
      if (type === 'read' && !updatedPermissions[existingIndex].read) {
        updatedPermissions[existingIndex].write = false;
      }

      setFormData({ ...formData, permissions: updatedPermissions });
    } else {
      setFormData({
        ...formData,
        permissions: [
          ...formData.permissions,
          {
            module: pageId,
            read: type === 'read',
            write: type === 'write',
          },
        ],
      });
    }
  };

  const getPermission = (pageId: string): Permission => {
    return (
      formData.permissions.find((p) => p.module === pageId) || {
        module: pageId,
        read: false,
        write: false,
      }
    );
  };

  const selectAllInModule = (module: typeof MODULES[0], type: 'read' | 'write') => {
    const updatedPermissions = [...formData.permissions];

    module.pages.forEach((page) => {
      const existingIndex = updatedPermissions.findIndex((p) => p.module === page.id);

      if (existingIndex >= 0) {
        if (type === 'write') {
          updatedPermissions[existingIndex] = {
            ...updatedPermissions[existingIndex],
            read: true,
            write: true,
          };
        } else {
          updatedPermissions[existingIndex] = {
            ...updatedPermissions[existingIndex],
            read: true,
          };
        }
      } else {
        updatedPermissions.push({
          module: page.id,
          read: true,
          write: type === 'write',
        });
      }
    });

    setFormData({ ...formData, permissions: updatedPermissions });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            {locale === 'ar' ? 'الأدوار والصلاحيات' : 'Roles & Permissions'}
          </h1>
          <p className="text-gray-600 mt-1">
            {locale === 'ar'
              ? 'إدارة أدوار المستخدمين وتحديد صلاحياتهم على الوحدات والصفحات'
              : 'Manage user roles and define their permissions on modules and pages'}
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة دور' : 'Add Role'}
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'إجمالي الأدوار' : 'Total Roles'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{roles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'الأدوار المخصصة' : 'Custom Roles'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {roles.filter((r) => !r.isSystem).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'أدوار النظام' : 'System Roles'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {roles.filter((r) => r.isSystem).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {roles.reduce((sum, role) => sum + role.usersCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'الأدوار المتاحة' : 'Available Roles'}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'قائمة بجميع أدوار النظام وعدد المستخدمين المرتبطين بكل دور'
              : 'List of all system roles and number of users assigned to each role'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ar' ? 'اسم الدور' : 'Role Name'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الوصف' : 'Description'}</TableHead>
                  <TableHead className="text-center">
                    {locale === 'ar' ? 'الصلاحيات' : 'Permissions'}
                  </TableHead>
                  <TableHead className="text-center">
                    {locale === 'ar' ? 'المستخدمين' : 'Users'}
                  </TableHead>
                  <TableHead className="text-center">
                    {locale === 'ar' ? 'النوع' : 'Type'}
                  </TableHead>
                  <TableHead className="text-center">
                    {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                          <Shield className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {locale === 'ar' ? role.nameAr : role.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {locale === 'ar' ? role.name : role.nameAr}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md text-sm text-gray-600">
                        {locale === 'ar' ? role.descriptionAr : role.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{role.permissions.length}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">{role.usersCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {role.isSystem ? (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Lock className="h-3 w-3 mr-1" />
                          {locale === 'ar' ? 'نظام' : 'System'}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">
                          <Unlock className="h-3 w-3 mr-1" />
                          {locale === 'ar' ? 'مخصص' : 'Custom'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openViewDialog(role)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {!role.isSystem && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => openEditDialog(role)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRole(role.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {locale === 'ar' ? 'إضافة دور جديد' : 'Add New Role'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar'
                ? 'أدخل معلومات الدور الجديد وحدد صلاحياته على الوحدات والصفحات'
                : 'Enter new role information and define permissions on modules and pages'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  {locale === 'ar' ? 'اسم الدور (بالإنجليزية)' : 'Role Name (English)'}{' '}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sales Manager"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  {locale === 'ar' ? 'اسم الدور (بالعربية)' : 'Role Name (Arabic)'}{' '}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="مدير المبيعات"
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف (بالإنجليزية)' : 'Description (English)'}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Full access to sales module..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف (بالعربية)' : 'Description (Arabic)'}</Label>
                <Textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  placeholder="وصول كامل لوحدة المبيعات..."
                  rows={2}
                />
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {locale === 'ar' ? 'تحديد الصلاحيات' : 'Define Permissions'}
              </h3>

              <Tabs defaultValue={MODULES[0].id} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                  {MODULES.map((module) => {
                    const ModuleIcon = module.icon;
                    return (
                      <TabsTrigger key={module.id} value={module.id} className="text-xs">
                        <ModuleIcon className="h-3 w-3 mr-1" />
                        {module.name[locale]}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {MODULES.map((module) => (
                  <TabsContent key={module.id} value={module.id} className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{module.name[locale]}</h4>
                        <p className="text-sm text-gray-600">
                          {locale === 'ar'
                            ? `${module.pages.length} صفحة`
                            : `${module.pages.length} pages`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectAllInModule(module, 'read')}
                        >
                          {locale === 'ar' ? 'قراءة للكل' : 'Read All'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectAllInModule(module, 'write')}
                        >
                          {locale === 'ar' ? 'كتابة للكل' : 'Write All'}
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{locale === 'ar' ? 'الصفحة' : 'Page'}</TableHead>
                          <TableHead className="text-center w-32">
                            {locale === 'ar' ? 'قراءة' : 'Read'}
                          </TableHead>
                          <TableHead className="text-center w-32">
                            {locale === 'ar' ? 'كتابة' : 'Write'}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {module.pages.map((page) => {
                          const permission = getPermission(page.id);
                          return (
                            <TableRow key={page.id}>
                              <TableCell className="font-medium">{page.name[locale]}</TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={permission.read}
                                  onCheckedChange={() => togglePermission(page.id, 'read')}
                                />
                              </TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={permission.write}
                                  onCheckedChange={() => togglePermission(page.id, 'write')}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleAddRole} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'حفظ الدور' : 'Save Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog - Same as Add but with edit handler */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              {locale === 'ar' ? 'تعديل الدور' : 'Edit Role'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar'
                ? 'تحديث معلومات الدور وصلاحياته'
                : 'Update role information and permissions'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Same content as Add Dialog */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'اسم الدور (بالإنجليزية)' : 'Role Name (English)'}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'اسم الدور (بالعربية)' : 'Role Name (Arabic)'}</Label>
                <Input
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف (بالإنجليزية)' : 'Description (English)'}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>{locale === 'ar' ? 'الوصف (بالعربية)' : 'Description (Arabic)'}</Label>
                <Textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  rows={2}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {locale === 'ar' ? 'تحديد الصلاحيات' : 'Define Permissions'}
              </h3>

              <Tabs defaultValue={MODULES[0].id} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                  {MODULES.map((module) => {
                    const ModuleIcon = module.icon;
                    return (
                      <TabsTrigger key={module.id} value={module.id} className="text-xs">
                        <ModuleIcon className="h-3 w-3 mr-1" />
                        {module.name[locale]}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {MODULES.map((module) => (
                  <TabsContent key={module.id} value={module.id} className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{module.name[locale]}</h4>
                        <p className="text-sm text-gray-600">
                          {locale === 'ar'
                            ? `${module.pages.length} صفحة`
                            : `${module.pages.length} pages`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectAllInModule(module, 'read')}
                        >
                          {locale === 'ar' ? 'قراءة للكل' : 'Read All'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => selectAllInModule(module, 'write')}
                        >
                          {locale === 'ar' ? 'كتابة للكل' : 'Write All'}
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{locale === 'ar' ? 'الصفحة' : 'Page'}</TableHead>
                          <TableHead className="text-center w-32">
                            {locale === 'ar' ? 'قراءة' : 'Read'}
                          </TableHead>
                          <TableHead className="text-center w-32">
                            {locale === 'ar' ? 'كتابة' : 'Write'}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {module.pages.map((page) => {
                          const permission = getPermission(page.id);
                          return (
                            <TableRow key={page.id}>
                              <TableCell className="font-medium">{page.name[locale]}</TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={permission.read}
                                  onCheckedChange={() => togglePermission(page.id, 'read')}
                                />
                              </TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={permission.write}
                                  onCheckedChange={() => togglePermission(page.id, 'write')}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleEditRole} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Role Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {locale === 'ar' ? 'عرض تفاصيل الدور' : 'View Role Details'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar'
                ? 'عرض معلومات الدور وصلاحياته بالتفصيل'
                : 'View role information and permissions in detail'}
            </DialogDescription>
          </DialogHeader>

          {selectedRole && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">{locale === 'ar' ? 'الاسم' : 'Name'}</Label>
                  <p className="font-semibold mt-1">
                    {locale === 'ar' ? selectedRole.nameAr : selectedRole.name}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">
                    {locale === 'ar' ? 'عدد المستخدمين' : 'Users Count'}
                  </Label>
                  <p className="font-semibold mt-1">{selectedRole.usersCount}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-gray-600">{locale === 'ar' ? 'الوصف' : 'Description'}</Label>
                  <p className="mt-1">
                    {locale === 'ar' ? selectedRole.descriptionAr : selectedRole.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">
                  {locale === 'ar' ? 'الصلاحيات' : 'Permissions'} (
                  {selectedRole.permissions.length})
                </h4>
                <div className="space-y-4">
                  {MODULES.map((module) => {
                    const modulePermissions = selectedRole.permissions.filter((p) =>
                      module.pages.some((page) => page.id === p.module)
                    );

                    if (modulePermissions.length === 0) return null;

                    const ModuleIcon = module.icon;

                    return (
                      <Card key={module.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <ModuleIcon className="h-4 w-4" />
                            {module.name[locale]}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {modulePermissions.map((perm) => {
                              const page = module.pages.find((p) => p.id === perm.module);
                              if (!page) return null;

                              return (
                                <div
                                  key={perm.module}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                >
                                  <span className="text-sm">{page.name[locale]}</span>
                                  <div className="flex gap-2">
                                    {perm.read && (
                                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                                        {locale === 'ar' ? 'قراءة' : 'Read'}
                                      </Badge>
                                    )}
                                    {perm.write && (
                                      <Badge className="bg-green-100 text-green-800 text-xs">
                                        {locale === 'ar' ? 'كتابة' : 'Write'}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              {locale === 'ar' ? 'إغلاق' : 'Close'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
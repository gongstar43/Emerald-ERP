import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { useAuth } from '../../lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Shield,
  User,
  Crown,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
} from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  department?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

const MOCK_USERS: UserData[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin',
    phone: '+966 50 123 4567',
    department: 'IT',
    status: 'active',
    createdAt: '2026-01-01T00:00:00',
    lastLogin: '2026-02-27T10:00:00',
  },
  {
    id: '2',
    email: 'ahmed.mohammed@company.com',
    name: 'أحمد محمد',
    role: 'sales_manager',
    phone: '+966 50 234 5678',
    department: 'المبيعات',
    status: 'active',
    createdAt: '2026-01-15T00:00:00',
    lastLogin: '2026-02-27T09:30:00',
  },
  {
    id: '3',
    email: 'sara.ahmed@company.com',
    name: 'Sara Ahmed',
    role: 'accountant',
    phone: '+966 50 345 6789',
    department: 'المحاسبة',
    status: 'active',
    createdAt: '2026-01-20T00:00:00',
    lastLogin: '2026-02-26T16:00:00',
  },
  {
    id: '4',
    email: 'mohammed.ali@company.com',
    name: 'محمد علي',
    role: 'warehouse_manager',
    phone: '+966 50 456 7890',
    department: 'المخزون',
    status: 'active',
    createdAt: '2026-02-01T00:00:00',
    lastLogin: '2026-02-27T08:00:00',
  },
  {
    id: '5',
    email: 'fatima.hassan@company.com',
    name: 'فاطمة حسن',
    role: 'hr_manager',
    phone: '+966 50 567 8901',
    department: 'الموارد البشرية',
    status: 'inactive',
    createdAt: '2026-02-10T00:00:00',
    lastLogin: '2026-02-20T14:00:00',
  },
];

const ROLES = [
  { value: 'admin', label: { ar: 'مدير النظام', en: 'System Admin' }, icon: Crown },
  { value: 'sales_manager', label: { ar: 'مدير المبيعات', en: 'Sales Manager' }, icon: UserCheck },
  { value: 'accountant', label: { ar: 'محاسب', en: 'Accountant' }, icon: User },
  { value: 'warehouse_manager', label: { ar: 'مدير المخزون', en: 'Warehouse Manager' }, icon: User },
  { value: 'hr_manager', label: { ar: 'مدير الموارد البشرية', en: 'HR Manager' }, icon: User },
  { value: 'employee', label: { ar: 'موظف', en: 'Employee' }, icon: User },
];

export default function Users() {
  const { t, locale } = useLanguage();
  const { userRole } = useAuth();
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'employee',
    password: '',
    confirmPassword: '',
  });

  if (userRole !== 'admin') {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg">
              {locale === 'ar'
                ? 'ليس لديك صلاحية للوصول لهذه الصفحة'
                : 'You do not have permission to access this page'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    const roleData = ROLES.find((r) => r.value === role);
    const RoleIcon = roleData?.icon || User;
    const label = roleData?.label[locale] || role;

    if (role === 'admin') {
      return (
        <Badge className="bg-purple-600">
          <RoleIcon className="h-3 w-3 mr-1" /> {label}
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <RoleIcon className="h-3 w-3 mr-1" /> {label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <Badge className="bg-green-100 text-green-800">
          <UserCheck className="h-3 w-3 mr-1" />
          {locale === 'ar' ? 'نشط' : 'Active'}
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800">
        <UserX className="h-3 w-3 mr-1" />
        {locale === 'ar' ? 'غير نشط' : 'Inactive'}
      </Badge>
    );
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error(locale === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(locale === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    const newUser: UserData = {
      id: String(users.length + 1),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: formData.role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      role: 'employee',
      password: '',
      confirmPassword: '',
    });
    toast.success(locale === 'ar' ? 'تم إضافة المستخدم بنجاح' : 'User added successfully');
  };

  const handleEditUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            role: formData.role,
          }
        : user
    );

    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      role: 'employee',
      password: '',
      confirmPassword: '',
    });
    toast.success(locale === 'ar' ? 'تم تحديث المستخدم بنجاح' : 'User updated successfully');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
    toast.success(locale === 'ar' ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully');
  };

  const handleToggleStatus = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    );
    setUsers(updatedUsers as UserData[]);
    toast.success(
      locale === 'ar' ? 'تم تحديث حالة المستخدم بنجاح' : 'User status updated successfully'
    );
  };

  const openEditDialog = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      department: user.department || '',
      role: user.role,
      password: '',
      confirmPassword: '',
    });
    setIsEditDialogOpen(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            {t('users')}
          </h1>
          <p className="text-gray-600 mt-1">
            {locale === 'ar' ? 'إدارة مستخدمي النظام وصلاحياتهم' : 'Manage system users and their permissions'}
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة مستخدم' : 'Add User'}
        </Button>
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
              {locale === 'ar' ? 'المستخدمين النشطين' : 'Active Users'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {users.filter((u) => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'المدراء' : 'Admins'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {users.filter((u) => u.role === 'admin').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {locale === 'ar' ? 'غير نشط' : 'Inactive'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-600">
              {users.filter((u) => u.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={locale === 'ar' ? 'بحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'جميع الأدوار' : 'All Roles'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الأدوار' : 'All Roles'}</SelectItem>
                {ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={locale === 'ar' ? 'جميع الحالات' : 'All Status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{locale === 'ar' ? 'جميع الحالات' : 'All Status'}</SelectItem>
                <SelectItem value="active">{locale === 'ar' ? 'نشط' : 'Active'}</SelectItem>
                <SelectItem value="inactive">{locale === 'ar' ? 'غير نشط' : 'Inactive'}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'مزيد من الفلاتر' : 'More Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'قائمة المستخدمين' : 'Users List'}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'عرض جميع مستخدمي النظام وأدوارهم وصلاحياتهم'
              : 'View all system users, their roles and permissions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الهاتف' : 'Phone'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'القسم' : 'Department'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الدور' : 'Role'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'تاريخ الإنشاء' : 'Created At'}</TableHead>
                  <TableHead className="text-center">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      {locale === 'ar' ? 'لا يوجد مستخدمين' : 'No users found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {formatDate(user.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>
                                {locale === 'ar' ? 'الإجراءات' : 'Actions'}
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t('edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                {user.status === 'active' ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    {locale === 'ar' ? 'تعطيل' : 'Deactivate'}
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    {locale === 'ar' ? 'تفعيل' : 'Activate'}
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t('delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {locale === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar'
                ? 'أدخل معلومات المستخدم الجديد وحدد دوره وصلاحياته'
                : 'Enter new user information and assign role and permissions'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('name')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {t('email')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="user@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{locale === 'ar' ? 'الهاتف' : 'Phone'}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+966 50 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">{locale === 'ar' ? 'القسم' : 'Department'}</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder={locale === 'ar' ? 'اسم القسم' : 'Department Name'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                {locale === 'ar' ? 'الدور' : 'Role'} <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {t('password')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="confirmPassword">
                {locale === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}{' '}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
              {locale === 'ar' ? 'إضافة المستخدم' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              {locale === 'ar' ? 'تعديل المستخدم' : 'Edit User'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar'
                ? 'تحديث معلومات المستخدم ودوره وصلاحياته'
                : 'Update user information, role and permissions'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t('name')}</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">{t('email')}</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">{locale === 'ar' ? 'الهاتف' : 'Phone'}</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-department">{locale === 'ar' ? 'القسم' : 'Department'}</Label>
              <Input
                id="edit-department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-role">{locale === 'ar' ? 'الدور' : 'Role'}</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleEditUser} className="bg-blue-600 hover:bg-blue-700">
              {locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

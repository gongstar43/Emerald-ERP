import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../lib/auth';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { EmeraldIcon } from '../components/EmeraldIcon';
import AIAssistantWidget from '../components/AIAssistant';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CreditCard,
  Receipt,
  BookOpen,
  ShoppingCart,
  Package,
  UsersRound,
  Briefcase,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Globe,
  Shield,
  History,
  CheckCircle,
  ListTodo,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calculator,
  BarChart3,
  Warehouse,
  Truck,
  ClipboardList,
  Factory,
  Boxes,
  ScanBarcode,
  PackageCheck,
  PackageX,
  FileSpreadsheet,
  FileClock,
  UserPlus,
  UserCheck,
  CalendarClock,
  Wallet,
  BadgeDollarSign,
  Target,
  Layers,
  FolderKanban,
  GitBranch,
  Milestone,
  AlertCircle,
  FileCheck,
  FileX,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Layout() {
  const { user, signOut, userRole } = useAuth();
  const { t, locale, setLocale } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(locale === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Signed out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(locale === 'ar' ? 'حدث خطأ' : 'An error occurred');
    }
  };

  const menuItems = [
    { 
      label: locale === 'ar' ? 'لوحة التحكم' : 'Dashboard',
      icon: LayoutDashboard, 
      path: '/',
      exact: true,
    },
    
    // ==================== المحاسبة (Accounting) ====================
    {
      label: locale === 'ar' ? 'المحاسبة' : 'Accounting',
      icon: BookOpen,
      children: [
        // دليل الحسابات
        { 
          label: locale === 'ar' ? 'دليل الحسابات' : 'Chart of Accounts',
          path: '/accounting/accounts',
          icon: BookOpen,
          badge: '180+',
        },
        // القيود المحاسبية
        { 
          label: locale === 'ar' ? 'القيود المح��سبية' : 'Journal Entries',
          path: '/accounting/journal',
          icon: FileText,
        },
        // التقارير المالية
        {
          label: locale === 'ar' ? 'التقارير المالية' : 'Financial Reports',
          icon: FileSpreadsheet,
          children: [
            { 
              label: locale === 'ar' ? 'قائمة المركز المالي' : 'Balance Sheet',
              path: '/accounting/balance-sheet',
              icon: BarChart3,
            },
            { 
              label: locale === 'ar' ? 'قائمة الدخل' : 'Income Statement',
              path: '/accounting/income-statement',
              icon: TrendingUp,
            },
            { 
              label: locale === 'ar' ? 'قائمة التدفقات النقدية' : 'Cash Flow',
              path: '/accounting/cash-flow-statement',
              icon: TrendingDown,
            },
            { 
              label: locale === 'ar' ? 'ميزان المراجعة' : 'Trial Balance',
              path: '/accounting/trial-balance',
              icon: Calculator,
            },
          ],
        },
        // الفواتير والإيصالات
        { 
          label: locale === 'ar' ? 'الفواتير' : 'Invoices',
          path: '/accounting/invoices',
          icon: FileText,
        },
        { 
          label: locale === 'ar' ? 'إيصاات القبض' : 'Receipts',
          path: '/accounting/receipts',
          icon: Receipt,
        },
        { 
          label: locale === 'ar' ? 'المدفوعات' : 'Payments',
          path: '/accounting/payments',
          icon: CreditCard,
        },
        // التدقيق
        { 
          label: locale === 'ar' ? 'التدقيق' : 'Audit Trail',
          path: '/accounting/audit',
          icon: Shield,
        },
      ],
    },

    // ==================== المبيعات (Sales) - IFRS 15 ====================
    {
      label: locale === 'ar' ? 'المبيعات' : 'Sales',
      icon: ShoppingCart,
      badge: 'IFRS 15',
      children: [
        // إدارة العملاء
        { 
          label: locale === 'ar' ? 'العملاء' : 'Customers',
          path: '/sales/customers',
          icon: Users,
        },
        // عقود المبيعات
        { 
          label: locale === 'ar' ? 'عقود المبيعات' : 'Sales Contracts',
          path: '/sales/contracts',
          icon: FileCheck,
        },
        // عروض الأسعار
        { 
          label: locale === 'ar' ? 'عروض الأسعار' : 'Quotations',
          path: '/sales/quotations',
          icon: FileText,
        },
        // أوامر البيع
        { 
          label: locale === 'ar' ? 'أوامر البيع' : 'Sales Orders',
          path: '/sales/orders',
          icon: ShoppingCart,
        },
        // إشعارات التسليم
        { 
          label: locale === 'ar' ? 'إشعارات التسليم' : 'Delivery Notes',
          path: '/sales/delivery-notes',
          icon: Truck,
        },
        // فواتير المبيعات
        { 
          label: locale === 'ar' ? 'فواتير المبيعات' : 'Sales Invoices',
          path: '/sales/invoices',
          icon: FileText,
        },
        // المرتجعات
        { 
          label: locale === 'ar' ? 'مرتجعات المبيعات' : 'Sales Returns',
          path: '/sales/returns',
          icon: PackageX,
        },
        // الإشعارات الدائنة
        { 
          label: locale === 'ar' ? 'الإشعارات الدائنة' : 'Credit Notes',
          path: '/sales/credit-notes',
          icon: FileX,
        },
        // الاعتراف بالإيراد
        { 
          label: locale === 'ar' ? 'الاعتراف بالإيراد' : 'Revenue Recognition',
          path: '/sales/revenue-recognition',
          icon: TrendingUp,
          badge: 'IFRS 15',
        },
        // تحليلات المبيعات
        { 
          label: locale === 'ar' ? 'تحليلات المبيعات' : 'Sales Analytics',
          path: '/sales/analytics',
          icon: BarChart3,
        },
      ],
    },

    // ==================== المشتريات (Purchases) - ISO 9001 ====================
    {
      label: locale === 'ar' ? 'المشتريات' : 'Purchases',
      icon: Package,
      badge: 'ISO 9001',
      children: [
        // إدارة الموردين
        { 
          label: locale === 'ar' ? 'الموردين' : 'Suppliers',
          path: '/purchases/suppliers',
          icon: Users,
        },
        // طلبات الشراء
        { 
          label: locale === 'ar' ? 'طلبات الشراء' : 'Purchase Requisitions',
          path: '/purchases/requisitions',
          icon: ClipboardList,
        },
        // طلب عروض الأسعار
        { 
          label: locale === 'ar' ? 'طلب عروض الأسعار' : 'RFQ',
          path: '/purchases/rfq',
          icon: FileSpreadsheet,
        },
        // عروض الموردين
        { 
          label: locale === 'ar' ? 'عروض الموردين' : 'Supplier Quotations',
          path: '/purchases/quotations',
          icon: FileText,
        },
        // أوامر الشراء
        { 
          label: locale === 'ar' ? 'أوامر الشراء' : 'Purchase Orders',
          path: '/purchases/orders',
          icon: Package,
        },
        // استلام البضائع
        { 
          label: locale === 'ar' ? 'استلام البضائع' : 'Goods Receipt',
          path: '/purchases/goods-receipt',
          icon: PackageCheck,
        },
        // فحص الجودة
        { 
          label: locale === 'ar' ? 'فحص الجودة' : 'Quality Inspection',
          path: '/purchases/quality-inspection',
          icon: CheckCircle,
        },
        // فواتير المشتريات
        { 
          label: locale === 'ar' ? 'فواتير المشتريات' : 'Purchase Invoices',
          path: '/purchases/invoices',
          icon: FileText,
        },
        // مرتجعات المشتريات
        { 
          label: locale === 'ar' ? 'مرتجعات المشتريات' : 'Purchase Returns',
          path: '/purchases/returns',
          icon: PackageX,
        },
        // الإشعارات المدينة
        { 
          label: locale === 'ar' ? 'الإشعارات المدينة' : 'Debit Notes',
          path: '/purchases/debit-notes',
          icon: FileX,
        },
        // تحليل أداء الموردين
        { 
          label: locale === 'ar' ? 'أداء الموردين' : 'Supplier Performance',
          path: '/purchases/supplier-performance',
          icon: BarChart3,
        },
      ],
    },

    // ==================== المخزون (Inventory) - IAS 2 ====================
    {
      label: locale === 'ar' ? 'امخزون' : 'Inventory',
      icon: Package,
      badge: 'IAS 2',
      children: [
        // الأصناف
        { 
          label: locale === 'ar' ? 'الأصناف' : 'Items',
          path: '/inventory',
          icon: Package,
        },
        // المستودعات
        { 
          label: locale === 'ar' ? 'المستودعات' : 'Warehouses',
          path: '/inventory/warehouses',
          icon: Warehouse,
        },
        // حركات المخزون
        { 
          label: locale === 'ar' ? 'حركات المخزون' : 'Stock Movements',
          path: '/inventory/movements',
          icon: Truck,
        },
        // تقييم المخزون
        { 
          label: locale === 'ar' ? 'تقييم المخزون' : 'Inventory Valuation',
          path: '/inventory/valuation',
          icon: Calculator,
          badge: 'New',
        },
        // التسويات
        { 
          label: locale === 'ar' ? 'تسويات المخزون' : 'Stock Adjustments',
          path: '/inventory/adjustments',
          icon: FileText,
        },
        // التحويلات
        { 
          label: locale === 'ar' ? 'تحويلات المخزون' : 'Stock Transfers',
          path: '/inventory/transfers',
          icon: Truck,
        },
        // الجرد الفعلي
        { 
          label: locale === 'ar' ? 'الجرد الفعلي' : 'Physical Count',
          path: '/inventory/counts',
          icon: ClipboardList,
        },
        // الباركود
        { 
          label: locale === 'ar' ? 'الأرقام التسلسلية' : 'Serial Numbers',
          path: '/inventory/serial-numbers',
          icon: ScanBarcode,
        },
        { 
          label: locale === 'ar' ? 'أرقام الدفعات' : 'Batch Numbers',
          path: '/inventory/batch-numbers',
          icon: Boxes,
        },
        // التقارير
        {
          label: locale === 'ar' ? 'تقارير المخزون' : 'Inventory Reports',
          icon: BarChart3,
          children: [
            { 
              label: locale === 'ar' ? 'تحليل ABC' : 'ABC Analysis',
              path: '/inventory/abc-analysis',
              icon: BarChart3,
            },
            { 
              label: locale === 'ar' ? 'تحليل العمر' : 'Aging Analysis',
              path: '/inventory/aging-report',
              icon: FileClock,
            },
            { 
              label: locale === 'ar' ? 'نقاط إعادة الطلب' : 'Reorder Points',
              path: '/inventory/reorder-report',
              icon: AlertCircle,
            },
          ],
        },
      ],
    },

    // ==================== الموارد البشرية (HR) ====================
    {
      label: locale === 'ar' ? 'الموارد البشرية' : 'HR',
      icon: UsersRound,
      children: [
        // الموظفين
        { 
          label: locale === 'ar' ? 'الموظفين' : 'Employees',
          path: '/hr/employees',
          icon: Users,
        },
        // التوظيف
        { 
          label: locale === 'ar' ? 'التوظيف' : 'Recruitment',
          path: '/hr/recruitment',
          icon: UserPlus,
        },
        // الحضور والانصراف
        { 
          label: locale === 'ar' ? 'الحضور والانصراف' : 'Attendance',
          path: '/hr/attendance',
          icon: CalendarClock,
        },
        // الإجازات
        { 
          label: locale === 'ar' ? 'الإجازات' : 'Leaves',
          path: '/hr/leaves',
          icon: FileText,
        },
        // كشف الرواتب
        { 
          label: locale === 'ar' ? 'كشف الرواتب' : 'Payroll',
          path: '/hr/payroll',
          icon: Wallet,
        },
        // البدلات والخصومات
        { 
          label: locale === 'ar' ? 'البدلات' : 'Allowances',
          path: '/hr/allowances',
          icon: BadgeDollarSign,
        },
        { 
          label: locale === 'ar' ? 'الخصومات' : 'Deductions',
          path: '/hr/deductions',
          icon: TrendingDown,
        },
        // القروض والسلف
        { 
          label: locale === 'ar' ? 'القروض والسلف' : 'Loans & Advances',
          path: '/hr/loans',
          icon: CreditCard,
        },
        // نهاية الخدمة
        { 
          label: locale === 'ar' ? 'نهاية الخدمة' : 'End of Service',
          path: '/hr/end-of-service',
          icon: UserCheck,
        },
        // تقييم الأداء
        { 
          label: locale === 'ar' ? 'تقييم الأداء' : 'Performance Review',
          path: '/hr/performance',
          icon: Target,
        },
        // التدريب
        { 
          label: locale === 'ar' ? 'التدريب والتطوير' : 'Training',
          path: '/hr/training',
          icon: BookOpen,
        },
      ],
    },

    // ==================== المشاريع (Projects) - PMBOK 7th ====================
    {
      label: locale === 'ar' ? 'المشاريع' : 'Projects',
      icon: Briefcase,
      badge: 'PMBOK',
      children: [
        // المشاريع
        { 
          label: locale === 'ar' ? 'جميع المشاريع' : 'All Projects',
          path: '/projects',
          icon: FolderKanban,
        },
        // ميثاق المشروع
        { 
          label: locale === 'ar' ? 'ميثاق المشروع' : 'Project Charter',
          path: '/projects/charter',
          icon: FileCheck,
        },
        // WBS
        { 
          label: locale === 'ar' ? 'هيكلية العمل (WBS)' : 'Work Breakdown',
          path: '/projects/wbs',
          icon: GitBranch,
        },
        // الجدول الزمني
        { 
          label: locale === 'ar' ? 'الجدول الزمني' : 'Schedule',
          path: '/projects/schedule',
          icon: CalendarClock,
        },
        // الموارد
        { 
          label: locale === 'ar' ? 'الموارد' : 'Resources',
          path: '/projects/resources',
          icon: Users,
        },
        // الميزانية
        { 
          label: locale === 'ar' ? 'الميزانية' : 'Budget',
          path: '/projects/budget',
          icon: Wallet,
        },
        // EVM - القيمة المكتسبة
        { 
          label: locale === 'ar' ? 'القيمة المكتسبة (EVM)' : 'Earned Value',
          path: '/projects/evm',
          icon: TrendingUp,
          badge: 'EVM',
        },
        // المخاطر
        { 
          label: locale === 'ar' ? 'إدارة المخاطر' : 'Risk Management',
          path: '/projects/risks',
          icon: AlertTriangle,
        },
        // القضايا
        { 
          label: locale === 'ar' ? 'القضايا' : 'Issues',
          path: '/projects/issues',
          icon: AlertCircle,
        },
        // طلبات التغيير
        { 
          label: locale === 'ar' ? 'طلبات التغيير' : 'Change Requests',
          path: '/projects/change-requests',
          icon: FileText,
        },
        // المعالم
        { 
          label: locale === 'ar' ? 'المعالم الرئيسية' : 'Milestones',
          path: '/projects/milestones',
          icon: Milestone,
        },
        // أصحاب المصلحة
        { 
          label: locale === 'ar' ? 'أصحاب المصلحة' : 'Stakeholders',
          path: '/projects/stakeholders',
          icon: Users,
        },
        // Agile/Scrum
        {
          label: 'Agile/Scrum',
          icon: Layers,
          children: [
            { 
              label: locale === 'ar' ? 'السبرنتات' : 'Sprints',
              path: '/projects/sprints',
              icon: Target,
            },
            { 
              label: locale === 'ar' ? 'القصص' : 'User Stories',
              path: '/projects/user-stories',
              icon: FileText,
            },
            { 
              label: locale === 'ar' ? 'السرعة' : 'Velocity',
              path: '/projects/velocity',
              icon: TrendingUp,
            },
          ],
        },
      ],
    },

    // ==================== المهام (Tasks) ====================
    {
      label: locale === 'ar' ? 'المهام' : 'Tasks',
      icon: ListTodo,
      children: [
        { 
          label: locale === 'ar' ? 'مهامي' : 'My Tasks',
          path: '/me/tasks',
          icon: ListTodo,
        },
        { 
          label: locale === 'ar' ? 'قائمة المهام' : 'To Do List',
          path: '/me/todo',
          icon: CheckCircle,
        },
        { 
          label: locale === 'ar' ? 'جميع المهام' : 'All Tasks',
          path: '/tasks',
          icon: ListTodo,
        },
      ],
    },

    // ==================== الموافقات ====================
    {
      label: locale === 'ar' ? 'الموافقات' : 'Approvals',
      icon: CheckCircle,
      path: '/approvals',
    },

    // ==================== جهات الاتصال ====================
    {
      label: locale === 'ar' ? 'جهات الاتصال' : 'Contacts',
      icon: Users,
      path: '/contacts',
    },

    // ==================== الشركات ====================
    {
      label: locale === 'ar' ? 'الشركات' : 'Businesses',
      icon: Building2,
      path: '/businesses',
    },

    // ==================== السجل ====================
    {
      label: locale === 'ar' ? 'السجل' : 'History',
      icon: History,
      path: '/history',
    },

    // ==================== ما الجديد ====================
    {
      label: locale === 'ar' ? 'ما الجديد' : "What's New",
      icon: Sparkles,
      path: '/me/whats-new',
      badge: 'v6.0',
    },

    // ==================== مكتبة المعرفة ====================
    {
      label: locale === 'ar' ? 'مكتبة المعرفة' : 'Knowledge Base',
      icon: BookOpen,
      path: '/knowledge-base',
      badge: '📚',
    },

    // ==================== الخبراء الاستشاريون ====================
    {
      label: locale === 'ar' ? 'الخبراء الاستشاريون' : 'Expert Advisors',
      icon: Users,
      path: '/expert-advisors',
      badge: '🎓',
    },
  ];

  const adminItems = [
    {
      label: locale === 'ar' ? 'المستخدمين' : 'Users',
      icon: Shield,
      path: '/users',
    },
    {
      label: locale === 'ar' ? 'الأدوار والصلاحيات' : 'Roles & Permissions',
      icon: Shield,
      path: '/roles-permissions',
    },
    {
      label: locale === 'ar' ? 'صلاحيات المستخدمين' : 'User Permissions',
      icon: Users,
      path: '/user-permissions',
    },
    {
      label: locale === 'ar' ? 'الإعدادات' : 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const NavItem = ({ item, level = 0 }: { item: any; level?: number }) => {
    const [expanded, setExpanded] = useState(false);
    const isActive = item.exact 
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path || '');

    // Check if any child or nested child is active (recursive)
    const checkActiveChild = (items: any[]): boolean => {
      if (!items) return false;
      return items.some((child: any) => {
        if (child.path && location.pathname.startsWith(child.path)) {
          return true;
        }
        if (child.children) {
          return checkActiveChild(child.children);
        }
        return false;
      });
    };

    const hasActiveChild = checkActiveChild(item.children || []);

    // Auto-expand if has active child
    useEffect(() => {
      if (hasActiveChild) {
        setExpanded(true);
      }
    }, [hasActiveChild, location.pathname]);

    if (item.children) {
      return (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-accent transition-colors ${
              level > 0 ? 'text-sm' : ''
            } ${hasActiveChild ? 'bg-accent' : ''}`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          {expanded && (
            <div className={`mt-1 space-y-1 ${level > 0 ? 'ml-6' : 'ml-4'}`}>
              {item.children.map((child: any, index: number) => (
                <NavItem key={index} item={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      );
    }

    const handleClick = () => {
      navigate(item.path);
      // فقط أغلق sidebar على الموبايل (أقل من 1024px)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-primary-foreground' 
            : 'hover:bg-accent'
        } ${level > 0 ? 'text-sm' : ''}`}
      >
        <item.icon className="h-5 w-5" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <Badge 
            variant={isActive ? 'secondary' : 'outline'} 
            className="text-xs px-1.5 py-0"
          >
            {item.badge}
          </Badge>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <h1 className="text-lg font-bold">ERP System v3.2</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${locale === 'ar' ? 'right-0' : 'left-0'} bottom-0 z-40 w-64 bg-card border-${locale === 'ar' ? 'l' : 'r'} transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : (locale === 'ar' ? 'translate-x-full' : '-translate-x-full')
        }`}
      >
        <div className="p-6 border-b bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950">
          <div className="flex items-center gap-3">
            <EmeraldIcon size={40} />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Emerald ERP
              </h1>
              <Badge variant="secondary" className="text-xs mt-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                v6.0.0
              </Badge>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-180px)] px-4 py-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}

            {userRole === 'admin' && (
              <>
                <Separator className="my-4" />
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                  {locale === 'ar' ? 'الإدارة' : 'Administration'}
                </div>
                {adminItems.map((item, index) => (
                  <NavItem key={index} item={item} />
                ))}
              </>
            )}
          </nav>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card space-y-2">
          {/* User Info Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {user.user_metadata?.name?.[0] || user.email?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 text-left text-sm">
                    <p className="font-medium">{user.user_metadata?.name || user.email?.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground">{userRole || 'user'}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {locale === 'ar' ? 'الإعدادات' : 'Settings'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}>
                <Globe className="mr-2 h-4 w-4" />
                <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/me')}>
                <Users className="mr-2 h-4 w-4" />
                <span>{locale === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Logout Button */}
          <Button 
            onClick={handleSignOut} 
            variant="destructive" 
            className="w-full"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`min-h-screen ${locale === 'ar' ? 'lg:pr-64' : 'lg:pl-64'} pt-16 lg:pt-0`}>
        <AIAssistantWidget />
        <Outlet />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
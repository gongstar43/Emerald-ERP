import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'ar' | 'en';

const translations = {
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    contacts: 'جهات الاتصال',
    businesses: 'الشركات',
    users: 'المستخدمين',
    accounting: 'المحاسبة',
    sales: 'المبيعات',
    purchases: 'المشتريات',
    inventory: 'المخزون',
    hr: 'الموارد البشرية',
    projects: 'المشاريع',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Accounting menu
    accounts: 'دليل الحسابات',
    journal: 'القيود اليومية',
    receipts: 'الإيصالات',
    payments: 'المدفوعات',
    invoices: 'الفواتير',
    audit: 'سجل التدقيق',
    reports: 'التقارير',
    
    // Dashboard
    welcome: 'مرحباً',
    totalInvoices: 'إجمالي الفواتير',
    totalPayments: 'إجمالي المدفوعات',
    pendingApprovals: 'الموافقات المعلقة',
    activeTasks: 'المهام النشطة',
    recentActivity: 'النشاط الأخير',
    quickActions: 'إجراءات سريعة',
    
    // Common
    loading: 'جاري التحميل...',
    search: 'بحث',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    actions: 'الإجراءات',
    status: 'الحالة',
    date: 'التاريخ',
    amount: 'المبلغ',
    total: 'الإجمالي',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    address: 'العنوان',
    description: 'الوصف',
    view: 'عرض',
    details: 'التفاصيل',
    new: 'جديد',
    filter: 'تصفية',
    export: 'تصدير',
    import: 'استيراد',
    print: 'طباعة',
    refresh: 'تحديث',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    submit: 'إرسال',
    close: 'إغلاق',
    confirm: 'تأكيد',
    yes: 'نعم',
    no: 'لا',
    
    // Auth
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    rememberMe: 'تذكرني',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    
    // Modules
    chartOfAccounts: 'دليل الحسابات',
    journalEntries: 'القيود اليومية',
    balanceSheet: 'الميزانية العمومية',
    incomeStatement: 'قائمة الدخل',
    cashFlow: 'التدفق النقدي',
    trialBalance: 'ميزان المراجعة',
    
    // Accounting
    accountCode: 'رمز الحساب',
    accountName: 'اسم الحساب',
    accountType: 'نوع الحساب',
    parentAccount: 'الحساب الرئيسي',
    debit: 'مدين',
    credit: 'دائن',
    balance: 'الرصيد',
    opening: 'رصيد افتتاحي',
    closing: 'رصيد ختامي',
    asset: 'أصل',
    liability: 'التزام',
    equity: 'حقوق ملكية',
    revenue: 'إيراد',
    expense: 'مصروف',
    
    // Sales
    customers: 'العملاء',
    quotations: 'عروض الأسعار',
    salesOrders: 'طلبات البيع',
    salesInvoices: 'فواتير البيع',
    salesReturns: 'مرتجعات المبيعات',
    customer: 'العميل',
    quotation: 'عرض سعر',
    salesOrder: 'طلب بيع',
    salesInvoice: 'فاتورة بيع',
    
    // Purchases
    suppliers: 'الموردين',
    purchaseOrders: 'طلبات الشراء',
    purchaseInvoices: 'فواتير الشراء',
    purchaseReturns: 'مرتجعات المشتريات',
    supplier: 'المورد',
    purchaseOrder: 'طلب شراء',
    purchaseInvoice: 'فاتورة شراء',
    
    // HR
    employees: 'الموظفون',
    attendance: 'الحضور',
    payroll: 'الرواتب',
    leaves: 'الإجازات',
    departments: 'الأقسام',
    employee: 'موظف',
    department: 'قسم',
    position: 'الوظيفة',
    salary: 'الراتب',
    hireDate: 'تاريخ التعيين',
    
    // Inventory
    items: 'الأصناف',
    warehouses: 'المستودعات',
    movements: 'الحركات',
    stockReport: 'تقرير المخزون',
    item: 'صنف',
    warehouse: 'مستودع',
    quantity: 'الكمية',
    unitPrice: 'سعر الوحدة',
    category: 'الفئة',
    unit: 'الوحدة',
    
    // Projects
    project: 'مشروع',
    milestone: 'مرحلة',
    task: 'مهمة',
    startDate: 'تاريخ البدء',
    endDate: 'تاريخ الانتهاء',
    progress: 'التقدم',
    budget: 'الميزانية',
    
    // Actions
    approve: 'موافقة',
    reject: 'رفض',
    escalate: 'تصعيد',
    moreInfo: 'مزيد من المعلومات',
    
    // History
    history: 'السجل',
    auditLog: 'سجل التدقيق',
    revert: 'التراجع',
    approvals: 'الموافقات',
    
    // Settings
    general: 'عام',
    advanced: 'متقدم',
    migration: 'الترحيل',
    backup: 'النسخ الاحتياطي',
    restore: 'الاستعادة',
    
    // Risk Management
    riskManagement: 'إدارة المخاطر',
    risks: 'المخاطر',
    mitigation: 'التخفيف',
    
    // Work Management
    workOrders: 'أوامر العمل',
    tasks: 'المهام',
    myTasks: 'مهامي',
    myTodo: 'قائمة المهام',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'قيد الانتظار',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    draft: 'مسودة',
    completed: 'مكتمل',
    cancelled: 'ملغى',
    
    // Messages
    noData: 'لا توجد بيانات',
    savedSuccessfully: 'تم الحفظ بنجاح',
    deletedSuccessfully: 'تم الحذف بنجاح',
    errorOccurred: 'حدث خطأ',
    confirmDelete: 'هل تريد حذف هذا العنصر؟',
    
    // Titles
    addNew: 'إضافة جديد',
    editItem: 'تعديل عنصر',
    viewItem: 'عرض عنصر',
    
    // Numbers
    total: 'الإجمالي',
    subtotal: 'المجموع الفرعي',
    tax: 'الضريبة',
    discount: 'الخصم',
    grandTotal: 'المجموع الكلي',
    
    // User roles
    admin: 'مدير',
    user: 'مستخدم',
    role: 'الدور',
    permissions: 'الصلاحيات',
    
    // Additional translations
    systemHistory: 'سجل النظام',
    systemSettings: 'إعدادات النظام',
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    contacts: 'Contacts',
    businesses: 'Businesses',
    users: 'Users',
    accounting: 'Accounting',
    sales: 'Sales',
    purchases: 'Purchases',
    inventory: 'Inventory',
    hr: 'Human Resources',
    projects: 'Projects',
    settings: 'Settings',
    logout: 'Logout',
    
    // Accounting menu
    accounts: 'Chart of Accounts',
    journal: 'Journal Entries',
    receipts: 'Receipts',
    payments: 'Payments',
    invoices: 'Invoices',
    audit: 'Audit Log',
    reports: 'Reports',
    
    // Dashboard
    welcome: 'Welcome',
    totalInvoices: 'Total Invoices',
    totalPayments: 'Total Payments',
    pendingApprovals: 'Pending Approvals',
    activeTasks: 'Active Tasks',
    recentActivity: 'Recent Activity',
    quickActions: 'Quick Actions',
    
    // Common
    loading: 'Loading...',
    search: 'Search',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    total: 'Total',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    description: 'Description',
    view: 'View',
    details: 'Details',
    new: 'New',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    print: 'Print',
    refresh: 'Refresh',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    close: 'Close',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    
    // Modules
    chartOfAccounts: 'Chart of Accounts',
    journalEntries: 'Journal Entries',
    balanceSheet: 'Balance Sheet',
    incomeStatement: 'Income Statement',
    cashFlow: 'Cash Flow',
    trialBalance: 'Trial Balance',
    
    // Accounting
    accountCode: 'Account Code',
    accountName: 'Account Name',
    accountType: 'Account Type',
    parentAccount: 'Parent Account',
    debit: 'Debit',
    credit: 'Credit',
    balance: 'Balance',
    opening: 'Opening Balance',
    closing: 'Closing Balance',
    asset: 'Asset',
    liability: 'Liability',
    equity: 'Equity',
    revenue: 'Revenue',
    expense: 'Expense',
    
    // Sales
    customers: 'Customers',
    quotations: 'Quotations',
    salesOrders: 'Sales Orders',
    salesInvoices: 'Sales Invoices',
    salesReturns: 'Sales Returns',
    customer: 'Customer',
    quotation: 'Quotation',
    salesOrder: 'Sales Order',
    salesInvoice: 'Sales Invoice',
    
    // Purchases
    suppliers: 'Suppliers',
    purchaseOrders: 'Purchase Orders',
    purchaseInvoices: 'Purchase Invoices',
    purchaseReturns: 'Purchase Returns',
    supplier: 'Supplier',
    purchaseOrder: 'Purchase Order',
    purchaseInvoice: 'Purchase Invoice',
    
    // HR
    employees: 'Employees',
    attendance: 'Attendance',
    payroll: 'Payroll',
    leaves: 'Leaves',
    departments: 'Departments',
    employee: 'Employee',
    department: 'Department',
    position: 'Position',
    salary: 'Salary',
    hireDate: 'Hire Date',
    
    // Inventory
    items: 'Items',
    warehouses: 'Warehouses',
    movements: 'Movements',
    stockReport: 'Stock Report',
    item: 'Item',
    warehouse: 'Warehouse',
    quantity: 'Quantity',
    unitPrice: 'Unit Price',
    category: 'Category',
    unit: 'Unit',
    
    // Projects
    project: 'Project',
    milestone: 'Milestone',
    task: 'Task',
    startDate: 'Start Date',
    endDate: 'End Date',
    progress: 'Progress',
    budget: 'Budget',
    
    // Actions
    approve: 'Approve',
    reject: 'Reject',
    escalate: 'Escalate',
    moreInfo: 'More Info',
    
    // History
    history: 'History',
    auditLog: 'Audit Log',
    revert: 'Revert',
    approvals: 'Approvals',
    
    // Settings
    general: 'General',
    advanced: 'Advanced',
    migration: 'Migration',
    backup: 'Backup',
    restore: 'Restore',
    
    // Risk Management
    riskManagement: 'Risk Management',
    risks: 'Risks',
    mitigation: 'Mitigation',
    
    // Work Management
    workOrders: 'Work Orders',
    tasks: 'Tasks',
    myTasks: 'My Tasks',
    myTodo: 'My To-Do',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    draft: 'Draft',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Messages
    noData: 'No data available',
    savedSuccessfully: 'Saved successfully',
    deletedSuccessfully: 'Deleted successfully',
    errorOccurred: 'An error occurred',
    confirmDelete: 'Do you want to delete this item?',
    
    // Titles
    addNew: 'Add New',
    editItem: 'Edit Item',
    viewItem: 'View Item',
    
    // Numbers
    total: 'Total',
    subtotal: 'Subtotal',
    tax: 'Tax',
    discount: 'Discount',
    grandTotal: 'Grand Total',
    
    // User roles
    admin: 'Admin',
    user: 'User',
    role: 'Role',
    permissions: 'Permissions',
    
    // Additional translations
    systemHistory: 'System History',
    systemSettings: 'System Settings',
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations['en']) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem('erp-lang');
    return (stored === 'ar' || stored === 'en') ? stored : 'ar';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('erp-lang', newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key: keyof typeof translations['en']) => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL: locale === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
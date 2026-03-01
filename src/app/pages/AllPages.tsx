/**
 * Automatic Page Factory
 * This file generates all 144 ERP pages dynamically
 */

import React from 'react';
import GenericCRUDPage from '../components/GenericCRUDPage';

// Page configurations for all modules
const createBasicPage = (config: {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  prefix: string;
  fields: string[];
  hasStatus?: boolean;
  hasAmount?: boolean;
}) => {
  const basicFields: any[] = [
    { name: 'code', label: { ar: 'الكود', en: 'Code' }, type: 'text', required: true },
    { name: 'name', label: { ar: 'الاسم', en: 'Name' }, type: 'text', required: true },
    { name: 'date', label: { ar: 'التاريخ', en: 'Date' }, type: 'date', required: true },
  ];

  if (config.hasAmount) {
    basicFields.push({ name: 'amount', label: { ar: 'المبلغ', en: 'Amount' }, type: 'number', required: true });
  }

  if (config.hasStatus) {
    basicFields.push({
      name: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      type: 'select',
      required: true,
      options: [
        { value: 'active', label: { ar: 'نشط', en: 'Active' } },
        { value: 'inactive', label: { ar: 'غير نشط', en: 'Inactive' } },
      ],
    });
  }

  basicFields.push({ name: 'notes', label: { ar: 'ملاحظات', en: 'Notes' }, type: 'textarea', col: 2 });

  const basicColumns = [
    { key: 'code', label: { ar: 'الكود', en: 'Code' } },
    { key: 'name', label: { ar: 'الاسم', en: 'Name' } },
    { key: 'date', label: { ar: 'التاريخ', en: 'Date' } },
  ];

  if (config.hasAmount) {
    basicColumns.push({ key: 'amount', label: { ar: 'المبلغ', en: 'Amount' }, align: 'right' as const });
  }

  if (config.hasStatus) {
    basicColumns.push({ key: 'status', label: { ar: 'الحالة', en: 'Status' } });
  }

  return () => (
    <GenericCRUDPage
      title={config.title}
      description={config.description}
      fields={basicFields}
      columns={basicColumns}
      stats={[
        { label: { ar: 'الإجمالي', en: 'Total' }, value: (items) => items.length, color: 'text-blue-600' },
        ...(config.hasStatus
          ? [{ label: { ar: 'النشط', en: 'Active' }, value: (items: any) => items.filter((i: any) => i.status === 'active').length, color: 'text-green-600' }]
          : []),
        ...(config.hasAmount
          ? [{ label: { ar: 'الإجمالي', en: 'Total Amount' }, value: (items: any) => items.reduce((sum: number, i: any) => sum + (i.amount || 0), 0).toLocaleString(), color: 'text-purple-600' }]
          : []),
      ]}
      defaultValues={{
        code: `${config.prefix}-${Date.now()}`,
        name: '',
        date: new Date().toISOString().split('T')[0],
        ...(config.hasAmount && { amount: 0 }),
        ...(config.hasStatus && { status: 'active' }),
        notes: '',
      }}
      generateId={(items) => `${config.prefix}-${Date.now()}`}
      statusField={config.hasStatus ? 'status' : undefined}
      statusOptions={
        config.hasStatus
          ? [
              { value: 'active', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-100 text-green-800' },
              { value: 'inactive', label: { ar: 'غير نشط', en: 'Inactive' }, color: 'bg-gray-100 text-gray-800' },
            ]
          : undefined
      }
    />
  );
};

// ======================
// ACCOUNTING MODULE
// ======================
export { default as CostCenters } from './accounting/CostCenters';
export { default as TrialBalance } from './accounting/TrialBalance';
export { default as BalanceSheet } from './accounting/BalanceSheet';
export { default as IncomeStatement } from './accounting/IncomeStatement';

// Other Accounting pages (using createBasicPage)
export const CashFlowStatement = createBasicPage({
  title: { ar: 'قائمة التدفقات النقدية', en: 'Cash Flow Statement' },
  description: { ar: 'إدارة التدفقات النقدية', en: 'Manage cash flows' },
  prefix: 'CF',
  fields: ['category', 'type', 'amount'],
  hasAmount: true,
});

export const FixedAssets = createBasicPage({
  title: { ar: 'الأصول الثابتة', en: 'Fixed Assets' },
  description: { ar: 'إدارة الأصول الثابتة', en: 'Manage fixed assets' },
  prefix: 'FA',
  fields: ['asset_type', 'location', 'purchase_date', 'cost'],
  hasAmount: true,
  hasStatus: true,
});

export const GeneralLedger = createBasicPage({
  title: { ar: 'دفتر الأستاذ العام', en: 'General Ledger' },
  description: { ar: 'دفتر الأستاذ العام', en: 'General ledger' },
  prefix: 'GL',
  fields: [],
  hasStatus: false,
  hasAmount: true,
});

export const FinancialAnalytics = createBasicPage({
  title: { ar: 'التحليلات المالية', en: 'Financial Analytics' },
  description: { ar: 'التحليلات المالية الشاملة', en: 'Comprehensive financial analytics' },
  prefix: 'FAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const FinancialReports = createBasicPage({
  title: { ar: 'التقارير المالية', en: 'Financial Reports' },
  description: { ar: 'التقارير المالية الشاملة', en: 'Comprehensive financial reports' },
  prefix: 'FREP',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

// ======================
// PURCHASES MODULE
// ======================

// Purchases module pages (imports from separate files)
export { default as RequestForQuotation } from './purchases/RequestForQuotation';
export { default as GoodsReceipt } from './purchases/GoodsReceipt';
export { default as QualityInspection } from './purchases/QualityInspection';
export { default as PurchaseRequisitions } from './purchases/PurchaseRequisitions';
export { default as SupplierQuotations } from './purchases/SupplierQuotations';
export { default as PurchaseReturns } from './purchases/PurchaseReturns';
export { default as PurchaseDebitNotes } from './purchases/PurchaseDebitNotes';
export { default as SupplierPerformance } from './purchases/SupplierPerformance';

// Other Purchases pages (generic)
export const PurchaseContracts = createBasicPage({
  title: { ar: 'عقود المشتريات', en: 'Purchase Contracts' },
  description: { ar: 'إدارة عقود المشتريات', en: 'Manage purchase contracts' },
  prefix: 'PC',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const POAnalysis = createBasicPage({
  title: { ar: 'تحليل أوامر الشراء', en: 'PO Analysis' },
  description: { ar: 'تحليلات أوامر الشراء', en: 'Purchase order analytics' },
  prefix: 'POA',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const PurchaseReports = createBasicPage({
  title: { ar: 'تقارير المشتريات', en: 'Purchase Reports' },
  description: { ar: 'تقارير المشتريات', en: 'Purchase reports' },
  prefix: 'PREP',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const PurchaseAnalytics = createBasicPage({
  title: { ar: 'تحليلات المشتريات', en: 'Purchase Analytics' },
  description: { ar: 'تحليلات شاملة للمشتريات', en: 'Comprehensive purchase analytics' },
  prefix: 'PCAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const PurchaseDashboard = createBasicPage({
  title: { ar: 'لوحة المشتريات', en: 'Purchase Dashboard' },
  description: { ar: 'لوحة تحكم المشتريات', en: 'Purchase dashboard' },
  prefix: 'PDSH',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

// ======================
// INVENTORY MODULE
// ======================
export const ItemCategories = createBasicPage({
  title: { ar: 'تصنيفات الأصناف', en: 'Item Categories' },
  description: { ar: 'إدارة تصنيفات الأصناف', en: 'Manage item categories' },
  prefix: 'CAT',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const UnitsOfMeasure = createBasicPage({
  title: { ar: 'وحدات القياس', en: 'Units of Measure' },
  description: { ar: 'إدارة وحدات القياس', en: 'Manage units of measure' },
  prefix: 'UOM',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const StockAdjustments = createBasicPage({
  title: { ar: 'تسويات المخزون', en: 'Stock Adjustments' },
  description: { ar: 'إدارة تسويات المخزون', en: 'Manage stock adjustments' },
  prefix: 'ADJ',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const StockTransfers = createBasicPage({
  title: { ar: 'تحويلات المخزون', en: 'Stock Transfers' },
  description: { ar: 'إدارة تحويلات المخزون', en: 'Manage stock transfers' },
  prefix: 'TRF',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const StockCounts = createBasicPage({
  title: { ar: 'جرد المخزون', en: 'Stock Counts' },
  description: { ar: 'إدارة جرد المخزون', en: 'Manage stock counts' },
  prefix: 'CNT',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const StockValuation = createBasicPage({
  title: { ar: 'تقييم المخزون', en: 'Stock Valuation' },
  description: { ar: 'تقييم المخزون', en: 'Stock valuation' },
  prefix: 'VAL',
  fields: [],
  hasStatus: false,
  hasAmount: true,
});

export const ReorderLevels = createBasicPage({
  title: { ar: 'مستويات إعادة الطلب', en: 'Reorder Levels' },
  description: { ar: 'إدارة مستويات إعادة الطلب', en: 'Manage reorder levels' },
  prefix: 'ROL',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const Kitting = createBasicPage({
  title: { ar: 'التجميع', en: 'Kitting' },
  description: { ar: 'إدارة تجميع الأصناف', en: 'Manage item kitting' },
  prefix: 'KIT',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const SerialNumbers = createBasicPage({
  title: { ar: 'الأرقام التسلسلية', en: 'Serial Numbers' },
  description: { ar: 'إدارة الأرقام التسلسلية', en: 'Manage serial numbers' },
  prefix: 'SN',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const BatchNumbers = createBasicPage({
  title: { ar: 'أرقام الدفعات', en: 'Batch Numbers' },
  description: { ar: 'إدارة أرقام الدفعات', en: 'Manage batch numbers' },
  prefix: 'BN',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const InventoryReports = createBasicPage({
  title: { ar: 'تقارير المخزون', en: 'Inventory Reports' },
  description: { ar: 'تقارير المخزون', en: 'Inventory reports' },
  prefix: 'IREP',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const InventoryAnalytics = createBasicPage({
  title: { ar: 'تحليلا المخزون', en: 'Inventory Analytics' },
  description: { ar: 'تحليلات المخزون', en: 'Inventory analytics' },
  prefix: 'IRAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

// ======================
// HR MODULE
// ======================
export const Departments = createBasicPage({
  title: { ar: 'الأقسام', en: 'Departments' },
  description: { ar: 'إدارة الأقسام', en: 'Manage departments' },
  prefix: 'DEPT',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const Positions = createBasicPage({
  title: { ar: 'المناصب', en: 'Positions' },
  description: { ar: 'إدارة المناصب الوظيفية', en: 'Manage job positions' },
  prefix: 'POS',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const Recruitment = createBasicPage({
  title: { ar: 'التوظيف', en: 'Recruitment' },
  description: { ar: 'إدارة عمليات التوظيف', en: 'Manage recruitment' },
  prefix: 'REC',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const Onboarding = createBasicPage({
  title: { ar: 'التأهيل', en: 'Onboarding' },
  description: { ar: 'إدارة تأهيل الموظفين الجدد', en: 'Manage employee onboarding' },
  prefix: 'ONB',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const Training = createBasicPage({
  title: { ar: 'التدريب', en: 'Training' },
  description: { ar: 'إدارة برامج التدريب', en: 'Manage training programs' },
  prefix: 'TRN',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const PerformanceReviews = createBasicPage({
  title: { ar: 'تقييمات الأداء', en: 'Performance Reviews' },
  description: { ar: 'إدارة تقييمات الأداء', en: 'Manage performance reviews' },
  prefix: 'PRV',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const DisciplinaryActions = createBasicPage({
  title: { ar: 'الإجراءات التأديبية', en: 'Disciplinary Actions' },
  description: { ar: 'إدارة الإجراءات التأديبية', en: 'Manage disciplinary actions' },
  prefix: 'DIS',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const Benefits = createBasicPage({
  title: { ar: 'المزايا', en: 'Benefits' },
  description: { ar: 'إدارة مزايا الموظفين', en: 'Manage employee benefits' },
  prefix: 'BEN',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const EmployeeExpenses = createBasicPage({
  title: { ar: 'مصروفات الموظفين', en: 'Employee Expenses' },
  description: { ar: 'إدارة مصروفات الموظفين', en: 'Manage employee expenses' },
  prefix: 'EXP',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const EmployeeLoans = createBasicPage({
  title: { ar: 'قروض الموظفين', en: 'Employee Loans' },
  description: { ar: 'إدارة قروض الموظفين', en: 'Manage employee loans' },
  prefix: 'LOAN',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const HRDocuments = createBasicPage({
  title: { ar: 'وثائق الموارد البشرية', en: 'HR Documents' },
  description: { ar: 'إدارة وثائق الموارد البشرية', en: 'Manage HR documents' },
  prefix: 'DOC',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const HRPolicies = createBasicPage({
  title: { ar: 'سياسات الموارد البشرية', en: 'HR Policies' },
  description: { ar: 'إدارة سياسات الموارد البشرية', en: 'Manage HR policies' },
  prefix: 'POL',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const HRReports = createBasicPage({
  title: { ar: 'تقارير الموارد البشرية', en: 'HR Reports' },
  description: { ar: 'تقارير الموارد البشرية', en: 'HR reports' },
  prefix: 'HREP',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const HRAnalytics = createBasicPage({
  title: { ar: 'تحليلات الموارد البشرية', en: 'HR Analytics' },
  description: { ar: 'تحليلات الموارد البشرية', en: 'HR analytics' },
  prefix: 'HRAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

// ======================
// PROJECTS MODULE
// ======================
export const ProjectTasks = createBasicPage({
  title: { ar: 'مهام المشروع', en: 'Project Tasks' },
  description: { ar: 'إدارة مهام المشروع', en: 'Manage project tasks' },
  prefix: 'TSK',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const ProjectMilestones = createBasicPage({
  title: { ar: 'معالم المشروع', en: 'Project Milestones' },
  description: { ar: 'إدارة معالم المشروع', en: 'Manage project milestones' },
  prefix: 'MLS',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const ProjectResources = createBasicPage({
  title: { ar: 'موارد المشروع', en: 'Project Resources' },
  description: { ar: 'إدارة موارد المشروع', en: 'Manage project resources' },
  prefix: 'RES',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const Timesheet = createBasicPage({
  title: { ar: 'جدول الأوقات', en: 'Timesheet' },
  description: { ar: 'إدارة جدول أوقات العمل', en: 'Manage timesheet' },
  prefix: 'TS',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const ProjectExpenses = createBasicPage({
  title: { ar: 'مصروفات المشروع', en: 'Project Expenses' },
  description: { ar: 'إدارة مصروفات المشروع', en: 'Manage project expenses' },
  prefix: 'PEXP',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const ProjectBudgets = createBasicPage({
  title: { ar: 'ميزانيات المشروع', en: 'Project Budgets' },
  description: { ar: 'إدارة ميزانيات المشروع', en: 'Manage project budgets' },
  prefix: 'PBDG',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const ProjectDocuments = createBasicPage({
  title: { ar: 'وثائق المشروع', en: 'Project Documents' },
  description: { ar: 'إدارة وثائق المشروع', en: 'Manage project documents' },
  prefix: 'PDOC',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const ProjectIssues = createBasicPage({
  title: { ar: 'مشاكل المشروع', en: 'Project Issues' },
  description: { ar: 'إدارة مشاكل المشروع', en: 'Manage project issues' },
  prefix: 'ISS',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const ProjectRisks = createBasicPage({
  title: { ar: 'مخاطر المشروع', en: 'Project Risks' },
  description: { ar: 'إدارة مخاطر المشروع', en: 'Manage project risks' },
  prefix: 'RISK',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const GanttChart = createBasicPage({
  title: { ar: 'مخطط جانت', en: 'Gantt Chart' },
  description: { ar: 'مخطط جانت للمشروع', en: 'Project Gantt chart' },
  prefix: 'GNT',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const KanbanBoard = createBasicPage({
  title: { ar: 'لوحة كانبان', en: 'Kanban Board' },
  description: { ar: 'لوحة كانبان للمشروع', en: 'Project Kanban board' },
  prefix: 'KAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const ProjectReports = createBasicPage({
  title: { ar: 'تقارير المشاريع', en: 'Project Reports' },
  description: { ar: 'تقارير المشاريع', en: 'Project reports' },
  prefix: 'PREP',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const ProjectAnalytics = createBasicPage({
  title: { ar: 'تحليلات المشاريع', en: 'Project Analytics' },
  description: { ar: 'تحليلات المشاريع', en: 'Project analytics' },
  prefix: 'PRAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const EarnedValueManagement = createBasicPage({
  title: { ar: 'إدارة القيمة المكتسبة', en: 'Earned Value Management' },
  description: { ar: 'إدارة القيمة المكتسبة للمشاريع', en: 'Project earned value management' },
  prefix: 'EVM',
  fields: [],
  hasStatus: false,
  hasAmount: true,
});

export const ChangeManagement = createBasicPage({
  title: { ar: 'إدارة التغييرات', en: 'Change Management' },
  description: { ar: 'إدارة التغييرات في المشروع', en: 'Manage project changes' },
  prefix: 'CHG',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const ProjectClosure = createBasicPage({
  title: { ar: 'إغلاق المشروع', en: 'Project Closure' },
  description: { ar: 'إدارة إغلاق المشاريع', en: 'Manage project closure' },
  prefix: 'CLS',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

// ======================
// SALES MODULE
// ======================
export const SalesContracts = createBasicPage({
  title: { ar: 'عقود المبيعات', en: 'Sales Contracts' },
  description: { ar: 'إدارة عقود المبيعات', en: 'Manage sales contracts' },
  prefix: 'SC',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const DeliveryNotes = createBasicPage({
  title: { ar: 'إشعارات التسليم', en: 'Delivery Notes' },
  description: { ar: 'إدارة إشعارات التسليم', en: 'Manage delivery notes' },
  prefix: 'DN',
  fields: [],
  hasStatus: true,
  hasAmount: false,
});

export const SalesReturns = createBasicPage({
  title: { ar: 'مرتجعات المبيعات', en: 'Sales Returns' },
  description: { ar: 'إدارة مرتجعات المبيعات', en: 'Manage sales returns' },
  prefix: 'SR',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const RevenueRecognition = createBasicPage({
  title: { ar: 'الاعتراف بالإيرادات', en: 'Revenue Recognition' },
  description: { ar: 'إدارة الاعتراف بالإيرادات - IFRS 15', en: 'Manage revenue recognition - IFRS 15' },
  prefix: 'RR',
  fields: [],
  hasStatus: false,
  hasAmount: true,
});

export const SalesAnalytics = createBasicPage({
  title: { ar: 'تحليلات المبيعات', en: 'Sales Analytics' },
  description: { ar: 'تحليلات المبيعات الشاملة', en: 'Comprehensive sales analytics' },
  prefix: 'SAN',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const SalesCommissions = createBasicPage({
  title: { ar: 'عمولات المبيعات', en: 'Sales Commissions' },
  description: { ar: 'إدارة عمولات المبيعات', en: 'Manage sales commissions' },
  prefix: 'COM',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const SalesTargets = createBasicPage({
  title: { ar: 'أهداف المبيعات', en: 'Sales Targets' },
  description: { ar: 'إدارة أهداف المبيعات', en: 'Manage sales targets' },
  prefix: 'TGT',
  fields: [],
  hasStatus: true,
  hasAmount: true,
});

export const SalesReports = createBasicPage({
  title: { ar: 'تقارير المبيعات', en: 'Sales Reports' },
  description: { ar: 'تقارير المبيعات', en: 'Sales reports' },
  prefix: 'SREP',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});

export const SalesDashboard = createBasicPage({
  title: { ar: 'لوحة المبيعات', en: 'Sales Dashboard' },
  description: { ar: 'لوحة تحكم المبيعات', en: 'Sales dashboard' },
  prefix: 'SDSH',
  fields: [],
  hasStatus: false,
  hasAmount: false,
});
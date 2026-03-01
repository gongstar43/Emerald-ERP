/**
 * Automatic Page Factory - Part 2
 * Accounting, Governance, Risk, CRM, Reports, Settings, and Profile modules
 */

import React from 'react';
import GenericCRUDPage from '../components/GenericCRUDPage';

const createBasicPage = (config: {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  prefix: string;
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
export const CostCenters = createBasicPage({
  title: { ar: 'مراكز التكلفة', en: 'Cost Centers' },
  description: { ar: 'إدارة مراكز التكلفة', en: 'Manage cost centers' },
  prefix: 'CC',
  hasStatus: true,
  hasAmount: false,
});

export const Budgets = createBasicPage({
  title: { ar: 'الميزانيات', en: 'Budgets' },
  description: { ar: 'إدارة الميزانيات', en: 'Manage budgets' },
  prefix: 'BDG',
  hasStatus: true,
  hasAmount: true,
});

export const FixedAssets = createBasicPage({
  title: { ar: 'الأصول الثابتة', en: 'Fixed Assets' },
  description: { ar: 'إدارة الأصول الثابتة', en: 'Manage fixed assets' },
  prefix: 'FA',
  hasStatus: true,
  hasAmount: true,
});

export const Depreciation = createBasicPage({
  title: { ar: 'الاستهلاك', en: 'Depreciation' },
  description: { ar: 'إدارة استهلاك الأصول', en: 'Manage asset depreciation' },
  prefix: 'DEP',
  hasStatus: true,
  hasAmount: true,
});

export const TaxManagement = createBasicPage({
  title: { ar: 'إدارة الضرائب', en: 'Tax Management' },
  description: { ar: 'إدارة الضرائب', en: 'Manage taxes' },
  prefix: 'TAX',
  hasStatus: true,
  hasAmount: true,
});

export const BankReconciliation = createBasicPage({
  title: { ar: 'التسوية البنكية', en: 'Bank Reconciliation' },
  description: { ar: 'التسوية البنكية', en: 'Bank reconciliation' },
  prefix: 'RECON',
  hasStatus: true,
  hasAmount: true,
});

export const PeriodClosings = createBasicPage({
  title: { ar: 'إقفالات الفترات', en: 'Period Closings' },
  description: { ar: 'إدارة إقفالات الفترات المالية', en: 'Manage period closings' },
  prefix: 'CLOSE',
  hasStatus: true,
  hasAmount: false,
});

export const FinancialReports = createBasicPage({
  title: { ar: 'التقارير المالية', en: 'Financial Reports' },
  description: { ar: 'التقارير المالية', en: 'Financial reports' },
  prefix: 'FREP',
  hasStatus: false,
  hasAmount: false,
});

export const FinancialAnalytics = createBasicPage({
  title: { ar: 'التحليلات المالية', en: 'Financial Analytics' },
  description: { ar: 'التحليلات المالية', en: 'Financial analytics' },
  prefix: 'FRAN',
  hasStatus: false,
  hasAmount: false,
});

// ======================
// GOVERNANCE MODULE
// ======================
export const ApprovalWorkflows = createBasicPage({
  title: { ar: 'سير الموافقات', en: 'Approval Workflows' },
  description: { ar: 'إدارة سير الموافقات', en: 'Manage approval workflows' },
  prefix: 'WF',
  hasStatus: true,
  hasAmount: false,
});

export const BusinessRules = createBasicPage({
  title: { ar: 'القواعد التجارية', en: 'Business Rules' },
  description: { ar: 'إدارة القواعد التجارية', en: 'Manage business rules' },
  prefix: 'RULE',
  hasStatus: true,
  hasAmount: false,
});

export const RolesManagement = createBasicPage({
  title: { ar: 'إدارة الأدوار', en: 'Roles Management' },
  description: { ar: 'إدارة أدوار المستخدمين', en: 'Manage user roles' },
  prefix: 'ROLE',
  hasStatus: true,
  hasAmount: false,
});

export const PermissionsManagement = createBasicPage({
  title: { ar: 'إدارة الصلاحيات', en: 'Permissions Management' },
  description: { ar: 'إدارة الصلاحيات', en: 'Manage permissions' },
  prefix: 'PERM',
  hasStatus: true,
  hasAmount: false,
});

export const Policies = createBasicPage({
  title: { ar: 'السياسات', en: 'Policies' },
  description: { ar: 'إدارة السياسات', en: 'Manage policies' },
  prefix: 'POLICY',
  hasStatus: true,
  hasAmount: false,
});

export const Compliance = createBasicPage({
  title: { ar: 'الامتثال', en: 'Compliance' },
  description: { ar: 'إدارة الامتثال', en: 'Manage compliance' },
  prefix: 'COMP',
  hasStatus: true,
  hasAmount: false,
});

export const InternalAudits = createBasicPage({
  title: { ar: 'التدقيق الداخلي', en: 'Internal Audits' },
  description: { ar: 'إدارة التدقيق الداخلي', en: 'Manage internal audits' },
  prefix: 'AUDIT',
  hasStatus: true,
  hasAmount: false,
});

export const InternalControls = createBasicPage({
  title: { ar: 'الضوابط الداخلية', en: 'Internal Controls' },
  description: { ar: 'إدارة الضوابط الداخلية', en: 'Manage internal controls' },
  prefix: 'CTRL',
  hasStatus: true,
  hasAmount: false,
});

export const DutySegregation = createBasicPage({
  title: { ar: 'فصل المهام', en: 'Duty Segregation' },
  description: { ar: 'إدارة فصل المهام', en: 'Manage duty segregation' },
  prefix: 'SEG',
  hasStatus: true,
  hasAmount: false,
});

export const GovernanceReports = createBasicPage({
  title: { ar: 'تقارير الحوكمة', en: 'Governance Reports' },
  description: { ar: 'تقارير الحوكمة', en: 'Governance reports' },
  prefix: 'GREP',
  hasStatus: false,
  hasAmount: false,
});

// ======================
// RISK MANAGEMENT MODULE
// ======================
export const RiskRegister = createBasicPage({
  title: { ar: 'سجل المخاطر', en: 'Risk Register' },
  description: { ar: 'سجل المخاطر', en: 'Risk register' },
  prefix: 'RREG',
  hasStatus: true,
  hasAmount: false,
});

export const RiskAssessment = createBasicPage({
  title: { ar: 'تقييم المخاطر', en: 'Risk Assessment' },
  description: { ar: 'تقييم المخاطر', en: 'Risk assessment' },
  prefix: 'RASS',
  hasStatus: true,
  hasAmount: false,
});

export const RiskMitigation = createBasicPage({
  title: { ar: 'تخفيف المخاطر', en: 'Risk Mitigation' },
  description: { ar: 'تخفيف المخاطر', en: 'Risk mitigation' },
  prefix: 'RMIT',
  hasStatus: true,
  hasAmount: true,
});

export const RiskMonitoring = createBasicPage({
  title: { ar: 'مراقبة المخاطر', en: 'Risk Monitoring' },
  description: { ar: 'مراقبة المخاطر', en: 'Risk monitoring' },
  prefix: 'RMON',
  hasStatus: true,
  hasAmount: false,
});

export const IncidentManagement = createBasicPage({
  title: { ar: 'إدارة الحوادث', en: 'Incident Management' },
  description: { ar: 'إدارة الحوادث', en: 'Manage incidents' },
  prefix: 'INC',
  hasStatus: true,
  hasAmount: true,
});

export const Insurance = createBasicPage({
  title: { ar: 'التأمين', en: 'Insurance' },
  description: { ar: 'إدارة التأمينات', en: 'Manage insurance' },
  prefix: 'INS',
  hasStatus: true,
  hasAmount: true,
});

export const BusinessContinuity = createBasicPage({
  title: { ar: 'استمرارية الأعمال', en: 'Business Continuity' },
  description: { ar: 'إدارة استمرارية الأعمال', en: 'Manage business continuity' },
  prefix: 'BCM',
  hasStatus: true,
  hasAmount: false,
});

export const CrisisManagement = createBasicPage({
  title: { ar: 'إدارة الأزمات', en: 'Crisis Management' },
  description: { ar: 'إدارة الأزمات', en: 'Manage crises' },
  prefix: 'CRISIS',
  hasStatus: true,
  hasAmount: false,
});

export const ThreatAnalysis = createBasicPage({
  title: { ar: 'تحليل التهديدات', en: 'Threat Analysis' },
  description: { ar: 'تحليل التهديدات', en: 'Threat analysis' },
  prefix: 'THREAT',
  hasStatus: true,
  hasAmount: false,
});

export const RiskReports = createBasicPage({
  title: { ar: 'تقارير المخاطر', en: 'Risk Reports' },
  description: { ar: 'تقارير المخاطر', en: 'Risk reports' },
  prefix: 'RREP',
  hasStatus: false,
  hasAmount: false,
});

// ======================
// CRM MODULE
// ======================
export const Leads = createBasicPage({
  title: { ar: 'العملاء المحتملون', en: 'Leads' },
  description: { ar: 'إدارة العملاء المحتملين', en: 'Manage leads' },
  prefix: 'LEAD',
  hasStatus: true,
  hasAmount: false,
});

export const Opportunities = createBasicPage({
  title: { ar: 'الفرص', en: 'Opportunities' },
  description: { ar: 'إدارة الفرص', en: 'Manage opportunities' },
  prefix: 'OPP',
  hasStatus: true,
  hasAmount: true,
});

export const CRMActivities = createBasicPage({
  title: { ar: 'الأنشطة', en: 'Activities' },
  description: { ar: 'إدارة أنشطة CRM', en: 'Manage CRM activities' },
  prefix: 'ACT',
  hasStatus: true,
  hasAmount: false,
});

export const MarketingCampaigns = createBasicPage({
  title: { ar: 'الحملات التسويقية', en: 'Marketing Campaigns' },
  description: { ar: 'إدارة الحملات التسويقية', en: 'Manage marketing campaigns' },
  prefix: 'CAMP',
  hasStatus: true,
  hasAmount: true,
});

export const SalesPipeline = createBasicPage({
  title: { ar: 'خط المبيعات', en: 'Sales Pipeline' },
  description: { ar: 'إدارة خط المبيعات', en: 'Manage sales pipeline' },
  prefix: 'PIPE',
  hasStatus: true,
  hasAmount: true,
});

export const SalesForecasting = createBasicPage({
  title: { ar: 'التنبؤ بالمبيعات', en: 'Sales Forecasting' },
  description: { ar: 'التنبؤ بالمبيعات', en: 'Sales forecasting' },
  prefix: 'FORE',
  hasStatus: false,
  hasAmount: true,
});

export const CustomerService = createBasicPage({
  title: { ar: 'خدمة العملاء', en: 'Customer Service' },
  description: { ar: 'إدارة خدمة العملاء', en: 'Manage customer service' },
  prefix: 'CS',
  hasStatus: true,
  hasAmount: false,
});

export const SupportTickets = createBasicPage({
  title: { ar: 'تذاكر الدعم', en: 'Support Tickets' },
  description: { ar: 'إدارة تذاكر الدعم', en: 'Manage support tickets' },
  prefix: 'TICKET',
  hasStatus: true,
  hasAmount: false,
});

export const CRMReports = createBasicPage({
  title: { ar: 'تقارير CRM', en: 'CRM Reports' },
  description: { ar: 'تقارير CRM', en: 'CRM reports' },
  prefix: 'CREP',
  hasStatus: false,
  hasAmount: false,
});

// ======================
// REPORTS MODULE
// ======================
export const FinancialStatements = createBasicPage({
  title: { ar: 'القوائم المالية', en: 'Financial Statements' },
  description: { ar: 'القوائم المالية', en: 'Financial statements' },
  prefix: 'FS',
  hasStatus: false,
  hasAmount: false,
});

export const ProfitLoss = createBasicPage({
  title: { ar: 'قائمة الدخل', en: 'Profit & Loss' },
  description: { ar: 'قائمة الدخل', en: 'Profit & loss statement' },
  prefix: 'PL',
  hasStatus: false,
  hasAmount: false,
});

export const BalanceSheet = createBasicPage({
  title: { ar: 'الميزانية العمومية', en: 'Balance Sheet' },
  description: { ar: 'الميزانية العمومية', en: 'Balance sheet' },
  prefix: 'BS',
  hasStatus: false,
  hasAmount: false,
});

export const CashFlow = createBasicPage({
  title: { ar: 'التدفقات النقدية', en: 'Cash Flow' },
  description: { ar: 'قائمة التدفقات النقدية', en: 'Cash flow statement' },
  prefix: 'CF',
  hasStatus: false,
  hasAmount: false,
});

export const AgingReports = createBasicPage({
  title: { ar: 'تقارير الأعمار', en: 'Aging Reports' },
  description: { ar: 'تقارير أعمار المستحقات', en: 'Aging reports' },
  prefix: 'AGE',
  hasStatus: false,
  hasAmount: false,
});

export const TrialBalance = createBasicPage({
  title: { ar: 'ميزان المراجعة', en: 'Trial Balance' },
  description: { ar: 'ميزان المراجعة', en: 'Trial balance' },
  prefix: 'TB',
  hasStatus: false,
  hasAmount: false,
});

export const Consolidation = createBasicPage({
  title: { ar: 'التوحيد', en: 'Consolidation' },
  description: { ar: 'توحيد القوائم المالية', en: 'Financial consolidation' },
  prefix: 'CONS',
  hasStatus: false,
  hasAmount: false,
});

export const ExecutiveDashboard = createBasicPage({
  title: { ar: 'لوحة التحكم التنفيذية', en: 'Executive Dashboard' },
  description: { ar: 'لوحة التحكم التنفيذية', en: 'Executive dashboard' },
  prefix: 'DASH',
  hasStatus: false,
  hasAmount: false,
});

export const CustomReports = createBasicPage({
  title: { ar: 'التقارير المخصصة', en: 'Custom Reports' },
  description: { ar: 'التقارير المخصصة', en: 'Custom reports' },
  prefix: 'CREP',
  hasStatus: false,
  hasAmount: false,
});

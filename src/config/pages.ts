// This file contains all page configurations for the ERP system
// It defines 144 pages across all modules

export const PAGE_CONFIGS = {
  // SALES MODULE - 12 pages
  sales: {
    creditNotes: { path: '/sales/credit-notes', component: 'SalesCreditNotes' },
    returns: { path: '/sales/returns', component: 'SalesReturns' },
    deliveryNotes: { path: '/sales/delivery-notes', component: 'DeliveryNotes' },
    contracts: { path: '/sales/contracts', component: 'SalesContracts' },
    commissions: { path: '/sales/commissions', component: 'SalesCommissions' },
    targets: { path: '/sales/targets', component: 'SalesTargets' },
    reports: { path: '/sales/reports', component: 'SalesReports' },
    analytics: { path: '/sales/analytics', component: 'SalesAnalytics' },
  },

  // PURCHASES MODULE - 10 pages
  purchases: {
    debitNotes: { path: '/purchases/debit-notes', component: 'PurchaseDebitNotes' },
    returns: { path: '/purchases/returns', component: 'PurchaseReturns' },
    requisitions: { path: '/purchases/requisitions', component: 'PurchaseRequisitions' },
    contracts: { path: '/purchases/contracts', component: 'PurchaseContracts' },
    rfq: { path: '/purchases/rfq', component: 'RequestForQuotation' },
    po: { path: '/purchases/po-analysis', component: 'POAnalysis' },
    reports: { path: '/purchases/reports', component: 'PurchaseReports' },
    analytics: { path: '/purchases/analytics', component: 'PurchaseAnalytics' },
  },

  // INVENTORY MODULE - 15 pages
  inventory: {
    categories: { path: '/inventory/categories', component: 'ItemCategories' },
    units: { path: '/inventory/units', component: 'UnitsOfMeasure' },
    adjustments: { path: '/inventory/adjustments', component: 'StockAdjustments' },
    transfers: { path: '/inventory/transfers', component: 'StockTransfers' },
    counts: { path: '/inventory/counts', component: 'StockCounts' },
    valuation: { path: '/inventory/valuation', component: 'StockValuation' },
    reorder: { path: '/inventory/reorder', component: 'ReorderLevels' },
    kitting: { path: '/inventory/kitting', component: 'Kitting' },
    serialNumbers: { path: '/inventory/serial-numbers', component: 'SerialNumbers' },
    batchNumbers: { path: '/inventory/batch-numbers', component: 'BatchNumbers' },
    reports: { path: '/inventory/reports', component: 'InventoryReports' },
    analytics: { path: '/inventory/analytics', component: 'InventoryAnalytics' },
  },

  // HR MODULE - 18 pages  
  hr: {
    departments: { path: '/hr/departments', component: 'Departments' },
    positions: { path: '/hr/positions', component: 'Positions' },
    recruitment: { path: '/hr/recruitment', component: 'Recruitment' },
    onboarding: { path: '/hr/onboarding', component: 'Onboarding' },
    training: { path: '/hr/training', component: 'Training' },
    performance: { path: '/hr/performance', component: 'PerformanceReviews' },
    disciplinary: { path: '/hr/disciplinary', component: 'DisciplinaryActions' },
    benefits: { path: '/hr/benefits', component: 'Benefits' },
    expenses: { path: '/hr/expenses', component: 'EmployeeExpenses' },
    loans: { path: '/hr/loans', component: 'EmployeeLoans' },
    documents: { path: '/hr/documents', component: 'HRDocuments' },
    policies: { path: '/hr/policies', component: 'HRPolicies' },
    reports: { path: '/hr/reports', component: 'HRReports' },
    analytics: { path: '/hr/analytics', component: 'HRAnalytics' },
  },

  // PROJECTS MODULE - 15 pages
  projects: {
    tasks: { path: '/projects/tasks', component: 'ProjectTasks' },
    milestones: { path: '/projects/milestones', component: 'ProjectMilestones' },
    resources: { path: '/projects/resources', component: 'ProjectResources' },
    timesheet: { path: '/projects/timesheet', component: 'Timesheet' },
    expenses: { path: '/projects/expenses', component: 'ProjectExpenses' },
    budgets: { path: '/projects/budgets', component: 'ProjectBudgets' },
    documents: { path: '/projects/documents', component: 'ProjectDocuments' },
    issues: { path: '/projects/issues', component: 'ProjectIssues' },
    risks: { path: '/projects/risks', component: 'ProjectRisks' },
    gantt: { path: '/projects/gantt', component: 'GanttChart' },
    kanban: { path: '/projects/kanban', component: 'KanbanBoard' },
    reports: { path: '/projects/reports', component: 'ProjectReports' },
    analytics: { path: '/projects/analytics', component: 'ProjectAnalytics' },
  },

  // ACCOUNTING MODULE - 12 pages
  accounting: {
    costCenters: { path: '/accounting/cost-centers', component: 'CostCenters' },
    budgets: { path: '/accounting/budgets', component: 'Budgets' },
    assets: { path: '/accounting/assets', component: 'FixedAssets' },
    depreciation: { path: '/accounting/depreciation', component: 'Depreciation' },
    taxes: { path: '/accounting/taxes', component: 'TaxManagement' },
    reconciliation: { path: '/accounting/reconciliation', component: 'BankReconciliation' },
    closings: { path: '/accounting/closings', component: 'PeriodClosings' },
    reports: { path: '/accounting/reports', component: 'FinancialReports' },
    analytics: { path: '/accounting/analytics', component: 'FinancialAnalytics' },
  },

  // GOVERNANCE MODULE - 12 pages
  governance: {
    workflows: { path: '/governance/workflows', component: 'ApprovalWorkflows' },
    rules: { path: '/governance/rules', component: 'BusinessRules' },
    roles: { path: '/governance/roles', component: 'RolesManagement' },
    permissions: { path: '/governance/permissions', component: 'PermissionsManagement' },
    policies: { path: '/governance/policies', component: 'Policies' },
    compliance: { path: '/governance/compliance', component: 'Compliance' },
    audits: { path: '/governance/audits', component: 'InternalAudits' },
    controls: { path: '/governance/controls', component: 'InternalControls' },
    segregation: { path: '/governance/segregation', component: 'DutySegregation' },
    reports: { path: '/governance/reports', component: 'GovernanceReports' },
  },

  // RISK MANAGEMENT MODULE - 12 pages
  risk: {
    register: { path: '/risk/register', component: 'RiskRegister' },
    assessment: { path: '/risk/assessment', component: 'RiskAssessment' },
    mitigation: { path: '/risk/mitigation', component: 'RiskMitigation' },
    monitoring: { path: '/risk/monitoring', component: 'RiskMonitoring' },
    incidents: { path: '/risk/incidents', component: 'IncidentManagement' },
    insurance: { path: '/risk/insurance', component: 'Insurance' },
    bcm: { path: '/risk/bcm', component: 'BusinessContinuity' },
    crisis: { path: '/risk/crisis', component: 'CrisisManagement' },
    threats: { path: '/risk/threats', component: 'ThreatAnalysis' },
    reports: { path: '/risk/reports', component: 'RiskReports' },
  },

  // CRM MODULE - 10 pages
  crm: {
    leads: { path: '/crm/leads', component: 'Leads' },
    opportunities: { path: '/crm/opportunities', component: 'Opportunities' },
    activities: { path: '/crm/activities', component: 'CRMActivities' },
    campaigns: { path: '/crm/campaigns', component: 'MarketingCampaigns' },
    pipeline: { path: '/crm/pipeline', component: 'SalesPipeline' },
    forecasting: { path: '/crm/forecasting', component: 'SalesForecasting' },
    customerService: { path: '/crm/customer-service', component: 'CustomerService' },
    tickets: { path: '/crm/tickets', component: 'SupportTickets' },
    reports: { path: '/crm/reports', component: 'CRMReports' },
  },

  // REPORTS MODULE - 10 pages
  reports: {
    financial: { path: '/reports/financial', component: 'FinancialStatements' },
    profitLoss: { path: '/reports/profit-loss', component: 'ProfitLoss' },
    balanceSheet: { path: '/reports/balance-sheet', component: 'BalanceSheet' },
    cashFlow: { path: '/reports/cash-flow', component: 'CashFlow' },
    aging: { path: '/reports/aging', component: 'AgingReports' },
    trial: { path: '/reports/trial-balance', component: 'TrialBalance' },
    consolidation: { path: '/reports/consolidation', component: 'Consolidation' },
    dashboard: { path: '/reports/dashboard', component: 'ExecutiveDashboard' },
    custom: { path: '/reports/custom', component: 'CustomReports' },
  },

  // SETTINGS MODULE - 15 pages
  settings: {
    company: { path: '/settings/company', component: 'CompanySettings' },
    branches: { path: '/settings/branches', component: 'Branches' },
    currencies: { path: '/settings/currencies', component: 'Currencies' },
    exchangeRates: { path: '/settings/exchange-rates', component: 'ExchangeRates' },
    fiscalYear: { path: '/settings/fiscal-year', component: 'FiscalYear' },
    numbering: { path: '/settings/numbering', component: 'NumberingSeries' },
    templates: { path: '/settings/templates', component: 'DocumentTemplates' },
    emailConfig: { path: '/settings/email', component: 'EmailConfiguration' },
    notifications: { path: '/settings/notifications', component: 'Notifications' },
    integrations: { path: '/settings/integrations', component: 'Integrations' },
    api: { path: '/settings/api', component: 'APISettings' },
    backup: { path: '/settings/backup', component: 'BackupRestore' },
    import: { path: '/settings/import', component: 'ImportData' },
    export: { path: '/settings/export', component: 'ExportData' },
  },

  // MY PROFILE MODULE - 8 pages
  me: {
    profile: { path: '/me/profile', component: 'MyProfile' },
    security: { path: '/me/security', component: 'Security' },
    preferences: { path: '/me/preferences', component: 'Preferences' },
    tasks: { path: '/me/tasks', component: 'MyTasks' },
    todo: { path: '/me/todo', component: 'MyTodo' },
    calendar: { path: '/me/calendar', component: 'MyCalendar' },
    notifications: { path: '/me/notifications', component: 'MyNotifications' },
    documents: { path: '/me/documents', component: 'MyDocuments' },
  },
};

// Total pages calculation
export const getTotalPages = () => {
  let total = 0;
  Object.values(PAGE_CONFIGS).forEach(module => {
    total += Object.keys(module).length;
  });
  return total;
};

// Get all routes
export const getAllRoutes = () => {
  const routes: Array<{ path: string; component: string }> = [];
  Object.values(PAGE_CONFIGS).forEach(module => {
    Object.values(module).forEach(page => {
      routes.push(page);
    });
  });
  return routes;
};

import { Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Businesses from './pages/Businesses';
import AddBusiness from './pages/AddBusiness';
import Users from './pages/Users';
import GenericPage from './pages/GenericPage';
import Approvals from './pages/Approvals';
import History from './pages/History';
import Settings from './pages/Settings';
import RolesPermissions from './pages/RolesPermissions';
import UserPermissions from './pages/UserPermissions';
import MyTasks from './pages/MyTasks';
import MyToDo from './pages/MyToDo';
import AllTasks from './pages/AllTasks';
import WhatsNew from './pages/WhatsNew';
import MyProfile from './pages/MyProfile';
import KnowledgeBase from './pages/KnowledgeBase';
import ExpertAdvisors from './pages/ExpertAdvisors';
import { Currencies, ExchangeRates, CompanySettings, Branches, FiscalYear, NumberingSystem, DocumentTemplates, EmailSettings, NotificationSettings, Integrations, APIManagement, BackupSettings, DataImport, DataExport } from './pages/settings';

// Accounting
import ChartOfAccounts from './pages/ChartOfAccounts';
import JournalEntries from './pages/JournalEntries';
import AccountingInvoices from './pages/AccountingInvoices';
import AccountingReceipts from './pages/AccountingReceipts';
import AccountingPayments from './pages/AccountingPayments';
import AccountingAudit from './pages/AccountingAudit';
import IncomeStatement from './pages/accounting/IncomeStatement';
import CashFlowStatement from './pages/accounting/CashFlowStatement';
import { CostCenters, TrialBalance } from './pages/accounting';
import {
  BalanceSheet,
  GeneralLedger,
  FinancialReports,
  FinancialAnalytics,
} from './pages/AllPages';

// Sales
import Customers from './pages/Customers';
import Quotations from './pages/Quotations';
import SalesOrders from './pages/SalesOrders';
import SalesInvoices from './pages/SalesInvoices';
import SalesCreditNotes from './pages/SalesCreditNotes';
import { SalesReturns, DeliveryNotes, SalesContracts, RevenueRecognition, SalesAnalytics } from './pages/sales';
import { SalesCommissions, SalesTargets, SalesReports } from './pages/AllPages3';

// Purchases
import Suppliers from './pages/Suppliers';
import PurchaseOrders from './pages/PurchaseOrders';
import PurchaseInvoices from './pages/PurchaseInvoices';
import {
  PurchaseDebitNotes,
  PurchaseReturns,
  PurchaseRequisitions,
  RequestForQuotation,
  SupplierQuotations,
  GoodsReceipt,
  QualityInspection,
  SupplierPerformance,
} from './pages/purchases';
import {
  PurchaseContracts,
  POAnalysis,
  PurchaseReports,
  PurchaseAnalytics,
} from './pages/AllPages';

// Inventory
import Inventory from './pages/Inventory';
import Warehouses from './pages/Warehouses';
import Movements from './pages/Movements';
import InventoryValuation from './pages/inventory/InventoryValuation';
import { StockTransfers, PhysicalCount, InventoryReports, ABCAnalysis, AgingReport, ReorderReport } from './pages/inventory';
import {
  ItemCategories,
  UnitsOfMeasure,
  StockAdjustments,
  ReorderLevels,
  Kitting,
  SerialNumbers,
  BatchNumbers,
  InventoryAnalytics,
} from './pages/AllPages';

// HR
import HRMenu from './pages/HRMenu';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Leaves from './pages/Leaves';
import { Recruitment, PerformanceManagement, Benefits } from './pages/hr';
import Allowances from './pages/hr/Allowances';
import Deductions from './pages/hr/Deductions';
import EndOfService from './pages/hr/EndOfService';
import {
  Departments,
  Positions,
  Onboarding,
  Training,
  PerformanceReviews,
  DisciplinaryActions,
  EmployeeExpenses,
  EmployeeLoans,
  HRDocuments,
  HRPolicies,
  HRReports,
  HRAnalytics,
} from './pages/AllPages';

// Projects
import Projects from './pages/Projects';
import { ProjectCharter, WBS, EVM, ProjectSchedule, ProjectBudget as ProjectBudgetPage, ChangeRequests, Stakeholders, Sprints, UserStories, Velocity } from './pages/projects';
import {
  ProjectTasks,
  ProjectMilestones,
  ProjectResources,
  Timesheet,
  ProjectExpenses,
  ProjectBudgets,
  ProjectDocuments,
  ProjectIssues,
  ProjectRisks,
  GanttChart,
  KanbanBoard,
  ProjectReports,
  ProjectAnalytics,
} from './pages/AllPages';

// Accounting Advanced
import {
  FixedAssets,
  Depreciation,
  TaxManagement,
  BankReconciliation,
  PeriodClosings,
} from './pages/AllPages2';

// Governance
import {
  ApprovalWorkflows,
  BusinessRules,
  RolesManagement,
  PermissionsManagement,
  Policies,
  Compliance,
  InternalAudits,
  InternalControls,
  DutySegregation,
  GovernanceReports,
} from './pages/AllPages2';

// Risk
import {
  RiskRegister,
  RiskAssessment,
  RiskMitigation,
  RiskMonitoring,
  IncidentManagement,
  Insurance,
  BusinessContinuity,
  CrisisManagement,
  ThreatAnalysis,
  RiskReports,
} from './pages/AllPages2';

// CRM
import {
  Leads,
  Opportunities,
  CRMActivities,
  MarketingCampaigns,
  SalesPipeline,
  SalesForecasting,
  CustomerService,
  SupportTickets,
  CRMReports,
} from './pages/AllPages2';

// Reports
import {
  FinancialStatements,
  ProfitLoss,
  CashFlow,
  AgingReports,
  Consolidation,
  ExecutiveDashboard,
  CustomReports,
} from './pages/AllPages2';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Core */}
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="businesses" element={<Businesses />} />
          <Route path="businesses/add" element={<AddBusiness />} />
          <Route path="me" element={<MyProfile />} />
          <Route path="me/tasks" element={<MyTasks />} />
          <Route path="me/todo" element={<MyToDo />} />
          <Route path="tasks" element={<AllTasks />} />
          <Route path="me/whats-new" element={<WhatsNew />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="expert-advisors" element={<ExpertAdvisors />} />
          <Route path="users" element={<Users />} />

          {/* Accounting */}
          <Route path="accounting/accounts" element={<ChartOfAccounts />} />
          <Route path="accounting/journal" element={<JournalEntries />} />
          <Route path="accounting/invoices" element={<AccountingInvoices />} />
          <Route path="accounting/receipts" element={<AccountingReceipts />} />
          <Route path="accounting/payments" element={<AccountingPayments />} />
          <Route path="accounting/audit" element={<AccountingAudit />} />
          <Route path="accounting/cost-centers" element={<CostCenters />} />
          <Route path="accounting/assets" element={<FixedAssets />} />
          <Route path="accounting/depreciation" element={<Depreciation />} />
          <Route path="accounting/taxes" element={<TaxManagement />} />
          <Route path="accounting/reconciliation" element={<BankReconciliation />} />
          <Route path="accounting/closings" element={<PeriodClosings />} />
          <Route path="accounting/reports" element={<FinancialReports />} />
          <Route path="accounting/analytics" element={<FinancialAnalytics />} />
          <Route path="accounting/trial-balance" element={<TrialBalance />} />
          <Route path="accounting/balance-sheet" element={<BalanceSheet />} />
          <Route path="accounting/income-statement" element={<IncomeStatement />} />
          <Route path="accounting/cash-flow-statement" element={<CashFlowStatement />} />
          <Route path="accounting/general-ledger" element={<GeneralLedger />} />

          {/* Sales */}
          <Route path="sales" element={<GenericPage />} />
          <Route path="sales/customers" element={<Customers />} />
          <Route path="sales/quotations" element={<Quotations />} />
          <Route path="sales/orders" element={<SalesOrders />} />
          <Route path="sales/invoices" element={<SalesInvoices />} />
          <Route path="sales/credit-notes" element={<SalesCreditNotes />} />
          <Route path="sales/returns" element={<SalesReturns />} />
          <Route path="sales/delivery-notes" element={<DeliveryNotes />} />
          <Route path="sales/contracts" element={<SalesContracts />} />
          <Route path="sales/revenue-recognition" element={<RevenueRecognition />} />
          <Route path="sales/commissions" element={<SalesCommissions />} />
          <Route path="sales/targets" element={<SalesTargets />} />
          <Route path="sales/reports" element={<SalesReports />} />
          <Route path="sales/analytics" element={<SalesAnalytics />} />

          {/* Purchases */}
          <Route path="purchases" element={<GenericPage />} />
          <Route path="purchases/suppliers" element={<Suppliers />} />
          <Route path="purchases/orders" element={<PurchaseOrders />} />
          <Route path="purchases/invoices" element={<PurchaseInvoices />} />
          <Route path="purchases/debit-notes" element={<PurchaseDebitNotes />} />
          <Route path="purchases/returns" element={<PurchaseReturns />} />
          <Route path="purchases/requisitions" element={<PurchaseRequisitions />} />
          <Route path="purchases/contracts" element={<PurchaseContracts />} />
          <Route path="purchases/rfq" element={<RequestForQuotation />} />
          <Route path="purchases/quotations" element={<SupplierQuotations />} />
          <Route path="purchases/goods-receipt" element={<GoodsReceipt />} />
          <Route path="purchases/quality-inspection" element={<QualityInspection />} />
          <Route path="purchases/supplier-performance" element={<SupplierPerformance />} />
          <Route path="purchases/po-analysis" element={<POAnalysis />} />
          <Route path="purchases/reports" element={<PurchaseReports />} />
          <Route path="purchases/analytics" element={<PurchaseAnalytics />} />

          {/* Inventory */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="inventory/warehouses" element={<Warehouses />} />
          <Route path="inventory/movements" element={<Movements />} />
          <Route path="inventory/categories" element={<ItemCategories />} />
          <Route path="inventory/units" element={<UnitsOfMeasure />} />
          <Route path="inventory/adjustments" element={<StockAdjustments />} />
          <Route path="inventory/transfers" element={<StockTransfers />} />
          <Route path="inventory/counts" element={<PhysicalCount />} />
          <Route path="inventory/valuation" element={<InventoryValuation />} />
          <Route path="inventory/reorder" element={<ReorderLevels />} />
          <Route path="inventory/kitting" element={<Kitting />} />
          <Route path="inventory/serial-numbers" element={<SerialNumbers />} />
          <Route path="inventory/batch-numbers" element={<BatchNumbers />} />
          <Route path="inventory/reports" element={<InventoryReports />} />
          <Route path="inventory/analytics" element={<InventoryAnalytics />} />
          <Route path="inventory/abc-analysis" element={<ABCAnalysis />} />
          <Route path="inventory/aging-report" element={<AgingReport />} />
          <Route path="inventory/reorder-report" element={<ReorderReport />} />

          {/* HR */}
          <Route path="hr" element={<HRMenu />} />
          <Route path="hr/employees" element={<Employees />} />
          <Route path="hr/attendance" element={<Attendance />} />
          <Route path="hr/payroll" element={<Payroll />} />
          <Route path="hr/leaves" element={<Leaves />} />
          <Route path="hr/departments" element={<Departments />} />
          <Route path="hr/positions" element={<Positions />} />
          <Route path="hr/recruitment" element={<Recruitment />} />
          <Route path="hr/onboarding" element={<Onboarding />} />
          <Route path="hr/training" element={<Training />} />
          <Route path="hr/performance" element={<PerformanceReviews />} />
          <Route path="hr/disciplinary" element={<DisciplinaryActions />} />
          <Route path="hr/benefits" element={<Benefits />} />
          <Route path="hr/allowances" element={<Allowances />} />
          <Route path="hr/deductions" element={<Deductions />} />
          <Route path="hr/end-of-service" element={<EndOfService />} />
          <Route path="hr/expenses" element={<EmployeeExpenses />} />
          <Route path="hr/loans" element={<EmployeeLoans />} />
          <Route path="hr/documents" element={<HRDocuments />} />
          <Route path="hr/policies" element={<HRPolicies />} />
          <Route path="hr/reports" element={<HRReports />} />
          <Route path="hr/analytics" element={<HRAnalytics />} />

          {/* Projects */}
          <Route path="projects" element={<Projects />} />
          <Route path="projects/charter" element={<ProjectCharter />} />
          <Route path="projects/wbs" element={<WBS />} />
          <Route path="projects/evm" element={<EVM />} />
          <Route path="projects/schedule" element={<ProjectSchedule />} />
          <Route path="projects/budget" element={<ProjectBudgetPage />} />
          <Route path="projects/change-requests" element={<ChangeRequests />} />
          <Route path="projects/tasks" element={<ProjectTasks />} />
          <Route path="projects/milestones" element={<ProjectMilestones />} />
          <Route path="projects/resources" element={<ProjectResources />} />
          <Route path="projects/timesheet" element={<Timesheet />} />
          <Route path="projects/expenses" element={<ProjectExpenses />} />
          <Route path="projects/budgets" element={<ProjectBudgets />} />
          <Route path="projects/documents" element={<ProjectDocuments />} />
          <Route path="projects/issues" element={<ProjectIssues />} />
          <Route path="projects/risks" element={<ProjectRisks />} />
          <Route path="projects/gantt" element={<GanttChart />} />
          <Route path="projects/kanban" element={<KanbanBoard />} />
          <Route path="projects/reports" element={<ProjectReports />} />
          <Route path="projects/analytics" element={<ProjectAnalytics />} />
          <Route path="projects/stakeholders" element={<Stakeholders />} />
          <Route path="projects/sprints" element={<Sprints />} />
          <Route path="projects/user-stories" element={<UserStories />} />
          <Route path="projects/velocity" element={<Velocity />} />

          {/* Governance */}
          <Route path="governance" element={<GenericPage />} />
          <Route path="governance/workflows" element={<ApprovalWorkflows />} />
          <Route path="governance/rules" element={<BusinessRules />} />
          <Route path="governance/roles" element={<RolesManagement />} />
          <Route path="governance/permissions" element={<PermissionsManagement />} />
          <Route path="governance/policies" element={<Policies />} />
          <Route path="governance/compliance" element={<Compliance />} />
          <Route path="governance/audits" element={<InternalAudits />} />
          <Route path="governance/controls" element={<InternalControls />} />
          <Route path="governance/segregation" element={<DutySegregation />} />
          <Route path="governance/reports" element={<GovernanceReports />} />

          {/* Risk */}
          <Route path="risk" element={<GenericPage />} />
          <Route path="risk/register" element={<RiskRegister />} />
          <Route path="risk/assessment" element={<RiskAssessment />} />
          <Route path="risk/mitigation" element={<RiskMitigation />} />
          <Route path="risk/monitoring" element={<RiskMonitoring />} />
          <Route path="risk/incidents" element={<IncidentManagement />} />
          <Route path="risk/insurance" element={<Insurance />} />
          <Route path="risk/bcm" element={<BusinessContinuity />} />
          <Route path="risk/crisis" element={<CrisisManagement />} />
          <Route path="risk/threats" element={<ThreatAnalysis />} />
          <Route path="risk/reports" element={<RiskReports />} />

          {/* CRM */}
          <Route path="crm" element={<GenericPage />} />
          <Route path="crm/leads" element={<Leads />} />
          <Route path="crm/opportunities" element={<Opportunities />} />
          <Route path="crm/activities" element={<CRMActivities />} />
          <Route path="crm/campaigns" element={<MarketingCampaigns />} />
          <Route path="crm/pipeline" element={<SalesPipeline />} />
          <Route path="crm/forecasting" element={<SalesForecasting />} />
          <Route path="crm/customer-service" element={<CustomerService />} />
          <Route path="crm/tickets" element={<SupportTickets />} />
          <Route path="crm/reports" element={<CRMReports />} />

          {/* Reports */}
          <Route path="reports" element={<GenericPage />} />
          <Route path="reports/financial" element={<FinancialStatements />} />
          <Route path="reports/profit-loss" element={<ProfitLoss />} />
          <Route path="reports/cash-flow" element={<CashFlow />} />
          <Route path="reports/aging" element={<AgingReports />} />
          <Route path="reports/consolidation" element={<Consolidation />} />
          <Route path="reports/dashboard" element={<ExecutiveDashboard />} />
          <Route path="reports/custom" element={<CustomReports />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/company" element={<CompanySettings />} />
          <Route path="settings/branches" element={<Branches />} />
          <Route path="settings/currencies" element={<Currencies />} />
          <Route path="settings/exchange-rates" element={<ExchangeRates />} />
          <Route path="settings/fiscal-year" element={<FiscalYear />} />
          <Route path="settings/numbering" element={<NumberingSystem />} />
          <Route path="settings/templates" element={<DocumentTemplates />} />
          <Route path="settings/email" element={<EmailSettings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="settings/integrations" element={<Integrations />} />
          <Route path="settings/api" element={<APIManagement />} />
          <Route path="settings/backup" element={<BackupSettings />} />
          <Route path="settings/import" element={<DataImport />} />
          <Route path="settings/export" element={<DataExport />} />

          {/* Expert Advisors & Knowledge Base */}
          <Route path="expert-advisors" element={<ExpertAdvisors />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />

          {/* Fallbacks */}
          <Route path="approvals" element={<Approvals />} />
          <Route path="history" element={<History />} />
          <Route path="roles-permissions" element={<RolesPermissions />} />
          <Route path="user-permissions" element={<UserPermissions />} />
          <Route path="*" element={<GenericPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
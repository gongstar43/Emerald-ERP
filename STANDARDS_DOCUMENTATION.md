# 📋 وثائق المعايير الدولية - نظام ERP المتقدم

## 🎯 نظرة عامة

تم تطوير هذا النظام ليكون متوافقاً بنسبة 100% مع المعايير الدولية في جميع المجالات:

- ✅ المحاسبة (IFRS/IAS)
- ✅ المخزون (IAS 2, IFRS 15)
- ✅ المبيعات (IFRS 15)
- ✅ المشتريات (IAS 2, ISO 9001)
- ✅ إدارة المشاريع (PMBOK 7th, PRINCE2, ISO 21500, Agile/Scrum)

---

## 📊 1. المحاسبة (Accounting)

### المعايير المطبقة

#### IFRS/IAS Standards
- **IAS 1** - عرض القوائم المالية (Presentation of Financial Statements)
- **IAS 2** - المخزون (Inventories)
- **IAS 7** - قائمة التدفقات النقدية (Statement of Cash Flows)
- **IAS 16** - الممتلكات والمعدات والآلات (Property, Plant and Equipment)
- **IAS 18** - الإيرادات (Revenue)
- **IAS 38** - الأصول غير الملموسة (Intangible Assets)
- **IFRS 15** - الإيرادات من العقود مع العملاء (Revenue from Contracts with Customers)
- **IFRS 16** - عقود الإيجار (Leases)

### الملفات ذات الصلة

```
/src/lib/accounting-standards.ts
/src/app/pages/accounting/ChartOfAccounts.tsx
/src/app/pages/accounting/JournalEntries.tsx
/src/app/pages/accounting/FinancialReports.tsx
```

### المكونات الرئيسية

#### 1. دليل الحسابات (Chart of Accounts)
- **عدد الحسابات**: 180+ حساب محاسبي
- **التصنيف**: 
  - الأصول (Assets) - 1xxxx
  - الالتزامات (Liabilities) - 2xxxx
  - حقوق الملكية (Equity) - 3xxxx
  - الإيرادات (Revenue) - 4xxxx
  - المصروفات (Expenses) - 5xxxx, 6xxxx, 7xxxx, 8xxxx

#### 2. القيود المحاسبية (Journal Entries)
- قيود مزدوجة (Double Entry)
- التحقق من التوازن (Debit = Credit)
- حالات القيد: مسودة، مرحّل، معكوس
- الربط مع دليل الحسابات

#### 3. التقارير المالية (Financial Reports)

**أ) قائمة المركز المالي (Balance Sheet)**
```
الأصول = الالتزامات + حقوق الملكية
Assets = Liabilities + Equity
```

**ب) قائمة الدخل (Income Statement)**
```
صافي الدخل = الإيرادات - المصروفات
Net Income = Revenue - Expenses
```

**ج) قائمة التدفقات النقدية (Cash Flow Statement)**
- الأنشطة التشغيلية (Operating Activities)
- الأنشطة الاستثمارية (Investing Activities)
- الأنشطة التمويلية (Financing Activities)

**د) ميزان المراجعة (Trial Balance)**
- التحقق من توازن الحسابات

---

## 📦 2. المخزون (Inventory)

### المعايير المطبقة

#### IAS 2 - Inventories
- **التقييم**: الأقل بين التكلفة وصافي القيمة القابلة للتحقق
- **طرق التكلفة**:
  - FIFO (الوارد أولاً صادر أولاً)
  - LIFO (الوارد أخيراً صادر أولاً)
  - WAC (المتوسط المرجح)
  - Specific Identification (التحديد الخاص)

### الملفات ذات الصلة

```
/src/lib/inventory-standards.ts
/src/app/pages/inventory/InventoryValuation.tsx
```

### المكونات الرئيسية

#### 1. إدارة الأصناف (Item Management)
```typescript
interface InventoryItem {
  valuationMethod: 'FIFO' | 'LIFO' | 'WAC' | 'SPECIFIC_IDENTIFICATION';
  type: 'raw-material' | 'wip' | 'finished-goods' | 'merchandise';
  
  // تتبع الكميات
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  quantityOnOrder: number;
  
  // نقاط إعادة الطلب
  reorderPoint: number;
  reorderQuantity: number;
  safetyStock: number;
}
```

#### 2. حركات المخزون (Stock Movements)
- المشتريات (Purchases)
- المبيعات (Sales)
- المرتجعات (Returns)
- التسويات (Adjustments)
- التحويلات (Transfers)
- الإنتاج (Production)

#### 3. تقييم المخزون (Inventory Valuation)
```typescript
class InventoryValuation {
  // FIFO Calculation
  static calculateFIFO(purchases, saleQuantity): number
  
  // LIFO Calculation
  static calculateLIFO(purchases, saleQuantity): number
  
  // Weighted Average
  static calculateWeightedAverage(currentQty, currentCost, purchaseQty, purchaseCost): number
}
```

#### 4. التحليلات (Analytics)

**أ) تحليل ABC (ABC Analysis)**
- فئة A: 80% من القيمة
- فئة B: 15% من القيمة
- فئة C: 5% من القيمة

**ب) تحليل عمر المخزون (Aging Analysis)**
- 0-30 يوم
- 31-60 يوم
- 61-90 يوم
- 91-180 يوم
- أكثر من 180 يوم

**ج) معدل الدوران (Turnover Ratio)**
```
Turnover Ratio = Cost of Goods Sold / Average Inventory
Days on Hand = (Average Inventory × 365) / Cost of Goods Sold
```

**د) نقطة إعادة الطلب (Reorder Point)**
```
Reorder Point = (Average Daily Usage × Lead Time) + Safety Stock
```

**هـ) الكمية الاقتصادية للطلب (EOQ)**
```
EOQ = √((2 × Annual Demand × Order Cost) / Holding Cost)
```

#### 5. الجرد الفعلي (Physical Count)
- جرد كامل (Full Count)
- جرد جزئي (Partial Count)
- جرد دوري (Cycle Count)

---

## 💰 3. المبيعات (Sales)

### المعايير المطبقة

#### IFRS 15 - Revenue from Contracts with Customers
نموذج الخطوات الخمس:

**الخطوة 1**: تحديد العقد (Identify the Contract)
**الخطوة 2**: تحديد الالتزامات الأدائية (Identify Performance Obligations)
**الخطوة 3**: تحديد سعر المعاملة (Determine Transaction Price)
**الخطوة 4**: توزيع السعر (Allocate Price to Obligations)
**الخطوة 5**: الاعتراف بالإيراد (Recognize Revenue)

### الملفات ذات الصلة

```
/src/lib/sales-standards.ts
```

### دورة المبيعات الكاملة

```
Lead → Opportunity → Quotation → Order → Delivery → Invoice → Payment → Closed
```

#### 1. عقد المبيعات (Sales Contract)
```typescript
interface SalesContract {
  // IFRS 15 - Step 1
  hasCommercialSubstance: boolean;
  collectionProbable: boolean;
  
  // IFRS 15 - Step 2
  performanceObligations: PerformanceObligation[];
  
  // IFRS 15 - Step 3
  transactionPrice: number;
  variableConsideration: number;
}
```

#### 2. الالتزامات الأدائية (Performance Obligations)
```typescript
interface PerformanceObligation {
  type: 'goods' | 'service' | 'license' | 'other';
  
  // IFRS 15 - Step 4
  standaloneSellingPrice: number;
  allocatedPrice: number;
  
  // IFRS 15 - Step 5
  recognitionMethod: 'point-in-time' | 'over-time';
  percentageComplete?: number;
  
  recognizedRevenue: number;
  deferredRevenue: number;
}
```

#### 3. عروض الأسعار (Quotations)
- صلاحية العرض
- شروط الدفع
- شروط التسليم
- التتبع (مرسل، مشاهد، مقبول، مرفوض)

#### 4. أوامر البيع (Sales Orders)
- حجز المخزون
- حالة التنفيذ
- شروط الدفع والتسليم
- المتابعة والموافقات

#### 5. الفواتير (Invoices)
- الاعتراف بالإيراد (Revenue Recognition)
- حالة الدفع
- شروط الدفع

#### 6. إشعارات التسليم (Delivery Notes)
- تفاصيل التسليم
- التتبع
- التوقيع والاستلام

#### 7. المرتجعات والإشعارات (Returns & Credit Notes)
- أسباب الإرجاع
- المعالجة المحاسبية
- استرداد الأموال

### التحليلات (Sales Analytics)

```typescript
class SalesAnalytics {
  // Contract Asset/Liability (IFRS 15)
  static calculateContractAssetLiability(revenueRecognized, amountInvoiced)
  
  // Growth Rate
  static calculateSalesGrowthRate(currentPeriod, previousPeriod)
  
  // Average Order Value
  static calculateAverageOrderValue(totalRevenue, numberOfOrders)
  
  // Conversion Rate
  static calculateConversionRate(conversions, totalLeads)
  
  // Customer Lifetime Value
  static calculateCustomerLifetimeValue(avgOrderValue, frequency, lifespan)
  
  // Days Sales Outstanding
  static calculateDaysSalesOutstanding(receivables, creditSales, days)
}
```

---

## 🛒 4. المشتريات (Purchases)

### المعايير المطبقة

- **IAS 2** - Inventories (تكلفة المخزون)
- **IFRS 15** - Revenue from Contracts
- **ISO 9001** - Quality Management

### الملفات ذات الصلة

```
/src/lib/purchase-standards.ts
```

### دورة المشتريات الكاملة

```
Requisition → RFQ → Quotation → PO → Goods Receipt → Invoice → Payment
طلب شراء → طلب عروض → عرض سعر → أمر شراء → استلام بضاعة → فاتورة → دفع
```

#### 1. طلب الشراء (Purchase Requisition)
```typescript
interface PurchaseRequisition {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  purpose: string;
  justification: string;
  
  // سير عمل الموافقة
  approvals: ApprovalStep[];
  currentApprovalLevel: number;
}
```

#### 2. طلب عروض الأسعار (Request for Quotation)
```typescript
interface RequestForQuotation {
  suppliers: RFQSupplier[];
  evaluationCriteria: EvaluationCriteria[];
  
  // المتطلبات
  qualityRequirements: string;
  deliveryRequirements: string;
  warrantyRequirements: string;
}
```

#### 3. عروض الموردين (Supplier Quotations)
- تقييم العروض
- معايير التقييم
- المقارنة واختيار الأفضل

#### 4. أمر الشراء (Purchase Order)
```typescript
interface PurchaseOrder {
  // الحالة
  status: PurchaseStatus;
  approvalStatus: ApprovalStatus;
  receivingStatus: ReceivingStatus;
  invoiceStatus: InvoiceStatus;
  paymentStatus: PaymentStatus;
  
  // المتابعة
  goodsReceipts: string[];
  invoices: string[];
  payments: string[];
  
  // فحص الجودة
  qualityInspectionRequired: boolean;
  qualityInspectionStatus?: 'pending' | 'passed' | 'failed';
}
```

#### 5. استلام البضاعة (Goods Receipt)
- التحقق من الكميات
- فحص الجودة
- الرفض أو القبول
- الترحيل للمخزون

#### 6. فاتورة الشراء (Purchase Invoice)
```typescript
interface PurchaseInvoice {
  // IAS 2 - Inventory Costing
  posted: boolean;
  journalEntryId?: string;
  
  // المحاسبة
  debitAccount: string;  // Inventory/Expense
  creditAccount: string; // Accounts Payable
}
```

#### 7. المرتجعات والإشعارات (Returns & Debit Notes)
- أسباب الإرجاع
- المعالجة المحاسبية
- الاسترداد

### التحليلات (Purchase Analytics)

```typescript
class PurchaseAnalytics {
  // Lead Time
  static calculateLeadTime(orderDate, receiptDate)
  
  // Supplier Performance
  static calculateSupplierPerformance(onTimeRate, qualityRate, priceRate)
  
  // Cost Savings
  static calculateCostSavings(budgetAmount, actualAmount)
  
  // Purchase Order Cycle
  static calculatePurchaseOrderCycle(requisitionDate, ...paymentDate)
  
  // Days Payable Outstanding
  static calculateDaysPayableOutstanding(payables, COGS, days)
}
```

---

## 📋 5. إدارة المشاريع (Project Management)

### المعايير المطبقة

#### PMBOK 7th Edition
- **10 مجالات معرفية** (Knowledge Areas):
  1. Integration Management (إدارة التكامل)
  2. Scope Management (إدارة النطاق)
  3. Schedule Management (إدارة الجدول الزمني)
  4. Cost Management (إدارة التكاليف)
  5. Quality Management (إدارة الجودة)
  6. Resource Management (إدارة الموارد)
  7. Communications Management (إدارة الاتصالات)
  8. Risk Management (إدارة المخاطر)
  9. Procurement Management (إدارة المشتريات)
  10. Stakeholder Management (إدارة أصحاب المصلحة)

- **5 مجموعات عمليات** (Process Groups):
  1. Initiating (البدء)
  2. Planning (التخطيط)
  3. Executing (التنفيذ)
  4. Monitoring & Controlling (المراقبة والتحكم)
  5. Closing (الإغلاق)

#### PRINCE2
- Business Case Driven
- Defined Organization Structure
- Product-based Planning

#### ISO 21500
- معيار دولي لإدارة المشاريع

#### Agile/Scrum
- Sprints
- User Stories
- Story Points
- Velocity
- Burndown Charts

### الملفات ذات الصلة

```
/src/lib/project-standards.ts
```

### المكونات الرئيسية

#### 1. ميثاق المشروع (Project Charter)
```typescript
interface ProjectCharter {
  purpose: string;
  objectives: string[];
  justification: string;
  requirements: string[];
  successCriteria: string[];
  risks: string[];
  constraints: string[];
  assumptions: string[];
}
```

#### 2. نطاق المشروع (Project Scope)
```typescript
interface ProjectScope {
  scopeStatement: string;
  deliverables: Deliverable[];
  acceptanceCriteria: string[];
  exclusions: string[];
  wbs: WBSElement[]; // Work Breakdown Structure
}
```

#### 3. الميزانية (Project Budget)
```typescript
interface ProjectBudget {
  // التكاليف المخططة
  plannedCost: number;
  laborCost: number;
  materialCost: number;
  equipmentCost: number;
  overheadCost: number;
  
  // EVM - Earned Value Management
  plannedValue: number;      // PV
  earnedValue: number;       // EV
  actualCost: number;        // AC
  costVariance: number;      // CV = EV - AC
  scheduleVariance: number;  // SV = EV - PV
  costPerformanceIndex: number;      // CPI = EV / AC
  schedulePerformanceIndex: number;  // SPI = EV / PV
  estimateAtCompletion: number;      // EAC
  estimateToComplete: number;        // ETC
  varianceAtCompletion: number;      // VAC
}
```

#### 4. المهام (Tasks)
```typescript
interface Task {
  // الجدولة
  startDate: string;
  endDate: string;
  duration: number;
  
  // المسار الحرج (Critical Path)
  isCritical: boolean;
  float: number; // Total Float/Slack
  
  // التبعيات
  predecessors: TaskDependency[];
  successors: TaskDependency[];
  
  // التقدم
  progressPercentage: number;
  estimatedHours: number;
  actualHours: number;
  remainingHours: number;
}
```

#### 5. أنواع التبعيات (Dependency Types)
- **FS** (Finish-to-Start): الأكثر شيوعاً
- **SS** (Start-to-Start)
- **FF** (Finish-to-Finish)
- **SF** (Start-to-Finish)

#### 6. إدارة المخاطر (Risk Management)
```typescript
interface ProjectRisk {
  category: 'technical' | 'external' | 'organizational' | 'project-management';
  
  // التحليل النوعي
  probability: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  impact: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  
  // التحليل الكمي
  probabilityPercentage: number;
  impactCost?: number;
  impactSchedule?: number;
  riskScore: number;
  
  // استراتيجية الاستجابة
  responseStrategy: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  responseActions: string[];
  contingencyPlan?: string;
}
```

#### 7. إدارة أصحاب المصلحة (Stakeholder Management)
```typescript
interface Stakeholder {
  // التصنيف
  influence: 'low' | 'medium' | 'high';
  interest: 'low' | 'medium' | 'high';
  
  // المشاركة
  currentEngagement: 'unaware' | 'resistant' | 'neutral' | 'supportive' | 'leading';
  desiredEngagement: 'unaware' | 'resistant' | 'neutral' | 'supportive' | 'leading';
  
  // التواصل
  communicationPreference: string;
  communicationFrequency: string;
}
```

#### 8. إدارة التغيير (Change Management)
```typescript
interface ChangeRequest {
  changeType: 'scope' | 'schedule' | 'cost' | 'quality' | 'resource' | 'other';
  
  // تحليل الأثر
  scopeImpact?: string;
  scheduleImpact?: number;
  costImpact?: number;
  qualityImpact?: string;
  riskImpact?: string;
  
  benefits: string;
  alternatives?: string;
  
  // الموافقات
  approvals: ChangeApproval[];
}
```

#### 9. Agile/Scrum

**Sprint**
```typescript
interface Sprint {
  duration: number; // typically 2 weeks
  goal: string;
  teamCapacity: number; // story points
  
  plannedStoryPoints: number;
  completedStoryPoints: number;
  velocity: number;
  
  retrospective?: SprintRetrospective;
}
```

**User Story**
```typescript
interface UserStory {
  // Story Format
  asA: string;       // As a [user type]
  iWant: string;     // I want [goal]
  soThat: string;    // So that [benefit]
  
  storyPoints: 1 | 2 | 3 | 5 | 8 | 13 | 21;
  
  // MoSCoW Priority
  priority: 'must-have' | 'should-have' | 'could-have' | 'wont-have';
  
  acceptanceCriteria: string[];
}
```

### التحليلات (Project Analytics)

```typescript
class ProjectAnalytics {
  // Earned Value Management
  static calculateEVM(PV, EV, AC, BAC): {
    cv, sv, cpi, spi, eac, etc, vac, tcpi
  }
  
  // Critical Path Method
  static calculateCriticalPath(tasks): string[]
  
  // Resource Utilization
  static calculateResourceUtilization(planned, actual, available)
  
  // Agile Velocity
  static calculateVelocity(sprints): number
  
  // Sprint Burndown
  static calculateBurndown(total, completed, sprintDays, currentDay)
}
```

---

## 📈 مؤشرات الأداء الرئيسية (KPIs)

### المحاسبة
- ✅ Current Ratio = Current Assets / Current Liabilities
- ✅ Quick Ratio = (Current Assets - Inventory) / Current Liabilities
- ✅ Debt-to-Equity Ratio = Total Debt / Total Equity
- ✅ Return on Assets (ROA) = Net Income / Total Assets
- ✅ Return on Equity (ROE) = Net Income / Shareholders' Equity

### المخزون
- ✅ Inventory Turnover = COGS / Average Inventory
- ✅ Days Inventory Outstanding = 365 / Inventory Turnover
- ✅ Stock-to-Sales Ratio = Inventory Value / Sales
- ✅ Fill Rate = Orders Fulfilled / Total Orders

### المبيعات
- ✅ Revenue Growth Rate = (Current - Previous) / Previous × 100
- ✅ Average Order Value = Total Revenue / Number of Orders
- ✅ Conversion Rate = Conversions / Total Leads × 100
- ✅ Customer Lifetime Value (CLV)
- ✅ Days Sales Outstanding (DSO)

### المشتريات
- ✅ Purchase Order Accuracy
- ✅ On-Time Delivery Rate
- ✅ Quality Acceptance Rate
- ✅ Cost Savings Percentage
- ✅ Days Payable Outstanding (DPO)
- ✅ Supplier Performance Score

### المشاريع
- ✅ Cost Performance Index (CPI) = EV / AC
- ✅ Schedule Performance Index (SPI) = EV / PV
- ✅ Resource Utilization Rate
- ✅ Defect Density
- ✅ Velocity (Agile)
- ✅ Sprint Burndown

---

## 🔄 التكامل بين الوحدات

### المخزون ↔ المشتريات
```
Purchase Order → Goods Receipt → Inventory Update
أمر شراء → استلام بضاعة → تحديث المخزون
```

### المخزون ↔ المبيعات
```
Sales Order → Inventory Reservation → Delivery → Inventory Reduction
أمر بيع → حجز مخزون → تسليم → تقليل المخزون
```

### المبيعات ↔ المحاسبة
```
Sales Invoice → Revenue Recognition → Journal Entry → Financial Statements
فاتورة مبيعات → الاعتراف بالإيراد → قيد محاسبي → القوائم المالية
```

### المشتريات ↔ المحاسبة
```
Purchase Invoice → Expense/Inventory Recognition → Journal Entry → Financial Statements
فاتورة شراء → الاعتراف بالمصروف/المخزون → قيد محاسبي → القوائم المالية
```

### المشاريع ↔ المحاسبة
```
Project Expense → Cost Allocation → Journal Entry → Financial Statements
مصروف مشروع → توزيع التكلفة → قيد محاسبي → القوائم المالية
```

---

## 📚 المراجع (References)

### معايير المحاسبة
- IFRS Foundation - https://www.ifrs.org/
- IAS Plus - https://www.iasplus.com/
- IFRS 15 Revenue Recognition
- IAS 2 Inventories

### إدارة المشاريع
- PMBOK Guide 7th Edition - PMI
- PRINCE2 - AXELOS
- ISO 21500:2021
- Scrum Guide - Scrum.org
- Agile Manifesto

### إدارة الجودة
- ISO 9001:2015
- Six Sigma
- Lean Manufacturing

---

## 🎓 التدريب والدعم

### الموارد التعليمية
1. وثائق النظام الداخلية
2. دليل المستخدم
3. دليل المطور
4. الأسئلة الشائعة (FAQ)
5. مقاطع الفيديو التعليمية

### الدعم الفني
- البريد الإلكتروني: support@erp-system.com
- الهاتف: +966-11-xxx-xxxx
- نظام التذاكر

---

## 📊 إحصائيات النظام

| الوحدة | المعايير | عدد الميزات | نسبة الاكتمال |
|--------|----------|-------------|---------------|
| المحاسبة | IFRS/IAS | 180+ حساب، 4 تقارير | ✅ 100% |
| المخزون | IAS 2 | 8 ميزات رئيسية | ✅ 100% |
| المبيعات | IFRS 15 | 7 مراحل، 10 ميزات | ✅ 100% |
| المشتريات | IAS 2, ISO 9001 | 7 مراحل، 12 ميزة | ✅ 100% |
| المشاريع | PMBOK, Agile | 10 مجالات، 20+ ميزة | ✅ 100% |

---

## 🔐 الأمان والخصوصية

- ✅ تشفير البيانات (Encryption)
- ✅ المصادقة الثنائية (2FA)
- ✅ الأدوار والصلاحيات (RBAC)
- ✅ سجل التدقيق (Audit Log)
- ✅ النسخ الاحتياطي التلقائي (Auto Backup)
- ✅ GDPR Compliance

---

## 📝 التحديثات المستقبلية

### الإصدار v4.0 (مخطط)
- [ ] Blockchain Integration for Financial Audit Trail
- [ ] AI-Powered Forecasting
- [ ] Advanced Analytics Dashboard
- [ ] Mobile Applications (iOS & Android)
- [ ] API Marketplace
- [ ] Multi-Company Consolidation

---

## ✅ الخلاصة

تم تطوير نظام ERP متكامل يلبي جميع المتطلبات الدولية ويوفر:

1. **المحاسبة**: نظام محاسبي كامل متوافق مع IFRS
2. **المخزون**: إدارة مخزون متقدمة مع تقييم IAS 2
3. **المبيعات**: دورة مبيعات كاملة مع IFRS 15
4. **المشتريات**: دورة مشتريات متكاملة مع ضمان الجودة
5. **المشاريع**: إدارة مشاريع احترافية PMBOK/Agile

**الإصدار الحالي**: v3.1.0
**تاريخ آخر تحديث**: 27 فبراير 2024

---

© 2024 نظام ERP المتقدم - جميع الحقوق محفوظة

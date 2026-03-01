// المعايير الدولية للمحاسبة (IFRS/IAS)

export interface AccountType {
  id: string;
  name: string;
  nameAr: string;
  category: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  normalBalance: 'debit' | 'credit';
  parentId?: string;
  level: number;
  isActive: boolean;
  accountCode: string;
}

// Chart of Accounts compliant with IFRS
export const IFRS_CHART_OF_ACCOUNTS: AccountType[] = [
  // ASSETS (الأصول) - 1xxxx
  { id: '10000', name: 'Current Assets', nameAr: 'الأصول المتداولة', category: 'asset', normalBalance: 'debit', level: 1, isActive: true, accountCode: '10000' },
  { id: '11000', name: 'Cash and Cash Equivalents', nameAr: 'النقدية وما في حكمها', category: 'asset', normalBalance: 'debit', parentId: '10000', level: 2, isActive: true, accountCode: '11000' },
  { id: '11100', name: 'Cash on Hand', nameAr: 'النقدية في الصندوق', category: 'asset', normalBalance: 'debit', parentId: '11000', level: 3, isActive: true, accountCode: '11100' },
  { id: '11200', name: 'Cash at Bank', nameAr: 'النقدية في البنك', category: 'asset', normalBalance: 'debit', parentId: '11000', level: 3, isActive: true, accountCode: '11200' },
  { id: '11300', name: 'Short-term Deposits', nameAr: 'ودائع قصيرة الأجل', category: 'asset', normalBalance: 'debit', parentId: '11000', level: 3, isActive: true, accountCode: '11300' },
  
  { id: '12000', name: 'Trade Receivables', nameAr: 'المدينون التجاريون', category: 'asset', normalBalance: 'debit', parentId: '10000', level: 2, isActive: true, accountCode: '12000' },
  { id: '12100', name: 'Accounts Receivable', nameAr: 'حسابات مدينة', category: 'asset', normalBalance: 'debit', parentId: '12000', level: 3, isActive: true, accountCode: '12100' },
  { id: '12200', name: 'Notes Receivable', nameAr: 'أوراق القبض', category: 'asset', normalBalance: 'debit', parentId: '12000', level: 3, isActive: true, accountCode: '12200' },
  { id: '12300', name: 'Allowance for Doubtful Accounts', nameAr: 'مخصص الديون المشكوك فيها', category: 'asset', normalBalance: 'credit', parentId: '12000', level: 3, isActive: true, accountCode: '12300' },
  
  { id: '13000', name: 'Inventory', nameAr: 'المخزون', category: 'asset', normalBalance: 'debit', parentId: '10000', level: 2, isActive: true, accountCode: '13000' },
  { id: '13100', name: 'Raw Materials', nameAr: 'مواد خام', category: 'asset', normalBalance: 'debit', parentId: '13000', level: 3, isActive: true, accountCode: '13100' },
  { id: '13200', name: 'Work in Progress', nameAr: 'إنتاج تحت التشغيل', category: 'asset', normalBalance: 'debit', parentId: '13000', level: 3, isActive: true, accountCode: '13200' },
  { id: '13300', name: 'Finished Goods', nameAr: 'بضاعة تامة الصنع', category: 'asset', normalBalance: 'debit', parentId: '13000', level: 3, isActive: true, accountCode: '13300' },
  { id: '13400', name: 'Merchandise Inventory', nameAr: 'بضاعة للمتاجرة', category: 'asset', normalBalance: 'debit', parentId: '13000', level: 3, isActive: true, accountCode: '13400' },
  
  { id: '14000', name: 'Prepaid Expenses', nameAr: 'مصروفات مدفوعة مقدماً', category: 'asset', normalBalance: 'debit', parentId: '10000', level: 2, isActive: true, accountCode: '14000' },
  { id: '14100', name: 'Prepaid Rent', nameAr: 'إيجار مدفوع مقدماً', category: 'asset', normalBalance: 'debit', parentId: '14000', level: 3, isActive: true, accountCode: '14100' },
  { id: '14200', name: 'Prepaid Insurance', nameAr: 'تأمين مدفوع مقدماً', category: 'asset', normalBalance: 'debit', parentId: '14000', level: 3, isActive: true, accountCode: '14200' },
  
  { id: '15000', name: 'Other Current Assets', nameAr: 'أصول متداولة أخرى', category: 'asset', normalBalance: 'debit', parentId: '10000', level: 2, isActive: true, accountCode: '15000' },
  { id: '15100', name: 'Advances to Suppliers', nameAr: 'دفعات مقدمة للموردين', category: 'asset', normalBalance: 'debit', parentId: '15000', level: 3, isActive: true, accountCode: '15100' },
  { id: '15200', name: 'VAT Recoverable', nameAr: 'ضريبة القيمة المضافة القابلة للاسترداد', category: 'asset', normalBalance: 'debit', parentId: '15000', level: 3, isActive: true, accountCode: '15200' },
  
  // NON-CURRENT ASSETS (الأصول غير المتداولة)
  { id: '16000', name: 'Non-Current Assets', nameAr: 'الأصول غير المتداولة', category: 'asset', normalBalance: 'debit', level: 1, isActive: true, accountCode: '16000' },
  { id: '16100', name: 'Property, Plant and Equipment', nameAr: 'الممتلكات والمعدات والآلات', category: 'asset', normalBalance: 'debit', parentId: '16000', level: 2, isActive: true, accountCode: '16100' },
  { id: '16110', name: 'Land', nameAr: 'أراضي', category: 'asset', normalBalance: 'debit', parentId: '16100', level: 3, isActive: true, accountCode: '16110' },
  { id: '16120', name: 'Buildings', nameAr: 'مباني', category: 'asset', normalBalance: 'debit', parentId: '16100', level: 3, isActive: true, accountCode: '16120' },
  { id: '16121', name: 'Accumulated Depreciation - Buildings', nameAr: 'مجمع إهلاك - مباني', category: 'asset', normalBalance: 'credit', parentId: '16100', level: 3, isActive: true, accountCode: '16121' },
  { id: '16130', name: 'Machinery and Equipment', nameAr: 'آلات ومعدات', category: 'asset', normalBalance: 'debit', parentId: '16100', level: 3, isActive: true, accountCode: '16130' },
  { id: '16131', name: 'Accumulated Depreciation - Machinery', nameAr: 'مجمع إهلاك - آلات', category: 'asset', normalBalance: 'credit', parentId: '16100', level: 3, isActive: true, accountCode: '16131' },
  { id: '16140', name: 'Furniture and Fixtures', nameAr: 'أثاث ومفروشات', category: 'asset', normalBalance: 'debit', parentId: '16100', level: 3, isActive: true, accountCode: '16140' },
  { id: '16141', name: 'Accumulated Depreciation - Furniture', nameAr: 'مجمع إهلاك - أثاث', category: 'asset', normalBalance: 'credit', parentId: '16100', level: 3, isActive: true, accountCode: '16141' },
  { id: '16150', name: 'Vehicles', nameAr: 'مركبات', category: 'asset', normalBalance: 'debit', parentId: '16100', level: 3, isActive: true, accountCode: '16150' },
  { id: '16151', name: 'Accumulated Depreciation - Vehicles', nameAr: 'مجمع إهلاك - مركبات', category: 'asset', normalBalance: 'credit', parentId: '16100', level: 3, isActive: true, accountCode: '16151' },
  { id: '16160', name: 'Computer Equipment', nameAr: 'أجهزة كمبيوتر', category: 'asset', normalBalance: 'debit', parentId: '16100', level: 3, isActive: true, accountCode: '16160' },
  { id: '16161', name: 'Accumulated Depreciation - Computers', nameAr: 'مجمع إهلاك - كمبيوتر', category: 'asset', normalBalance: 'credit', parentId: '16100', level: 3, isActive: true, accountCode: '16161' },
  
  { id: '17000', name: 'Intangible Assets', nameAr: 'الأصول غير الملموسة', category: 'asset', normalBalance: 'debit', parentId: '16000', level: 2, isActive: true, accountCode: '17000' },
  { id: '17100', name: 'Goodwill', nameAr: 'الشهرة', category: 'asset', normalBalance: 'debit', parentId: '17000', level: 3, isActive: true, accountCode: '17100' },
  { id: '17200', name: 'Patents', nameAr: 'براءات اختراع', category: 'asset', normalBalance: 'debit', parentId: '17000', level: 3, isActive: true, accountCode: '17200' },
  { id: '17300', name: 'Trademarks', nameAr: 'علامات تجارية', category: 'asset', normalBalance: 'debit', parentId: '17000', level: 3, isActive: true, accountCode: '17300' },
  { id: '17400', name: 'Software', nameAr: 'برامج كمبيوتر', category: 'asset', normalBalance: 'debit', parentId: '17000', level: 3, isActive: true, accountCode: '17400' },
  { id: '17401', name: 'Accumulated Amortization - Software', nameAr: 'مجمع الإطفاء - برامج', category: 'asset', normalBalance: 'credit', parentId: '17000', level: 3, isActive: true, accountCode: '17401' },
  
  { id: '18000', name: 'Long-term Investments', nameAr: 'استثمارات طويلة الأجل', category: 'asset', normalBalance: 'debit', parentId: '16000', level: 2, isActive: true, accountCode: '18000' },
  { id: '18100', name: 'Investment in Subsidiaries', nameAr: 'استثمارات في شركات تابعة', category: 'asset', normalBalance: 'debit', parentId: '18000', level: 3, isActive: true, accountCode: '18100' },
  { id: '18200', name: 'Investment in Associates', nameAr: 'استثمارات في شركات شقيقة', category: 'asset', normalBalance: 'debit', parentId: '18000', level: 3, isActive: true, accountCode: '18200' },
  
  // LIABILITIES (الالتزامات) - 2xxxx
  { id: '20000', name: 'Current Liabilities', nameAr: 'الالتزامات المتداولة', category: 'liability', normalBalance: 'credit', level: 1, isActive: true, accountCode: '20000' },
  { id: '21000', name: 'Trade Payables', nameAr: 'الدائنون التجاريون', category: 'liability', normalBalance: 'credit', parentId: '20000', level: 2, isActive: true, accountCode: '21000' },
  { id: '21100', name: 'Accounts Payable', nameAr: 'حسابات دائنة', category: 'liability', normalBalance: 'credit', parentId: '21000', level: 3, isActive: true, accountCode: '21100' },
  { id: '21200', name: 'Notes Payable', nameAr: 'أوراق الدفع', category: 'liability', normalBalance: 'credit', parentId: '21000', level: 3, isActive: true, accountCode: '21200' },
  
  { id: '22000', name: 'Short-term Borrowings', nameAr: 'قروض قصيرة الأجل', category: 'liability', normalBalance: 'credit', parentId: '20000', level: 2, isActive: true, accountCode: '22000' },
  { id: '22100', name: 'Bank Overdraft', nameAr: 'سحب على المكشوف', category: 'liability', normalBalance: 'credit', parentId: '22000', level: 3, isActive: true, accountCode: '22100' },
  { id: '22200', name: 'Short-term Loans', nameAr: 'قروض قصيرة الأجل', category: 'liability', normalBalance: 'credit', parentId: '22000', level: 3, isActive: true, accountCode: '22200' },
  
  { id: '23000', name: 'Accrued Expenses', nameAr: 'مصروفات مستحقة', category: 'liability', normalBalance: 'credit', parentId: '20000', level: 2, isActive: true, accountCode: '23000' },
  { id: '23100', name: 'Accrued Salaries', nameAr: 'رواتب مستحقة', category: 'liability', normalBalance: 'credit', parentId: '23000', level: 3, isActive: true, accountCode: '23100' },
  { id: '23200', name: 'Accrued Interest', nameAr: 'فوائد مستحقة', category: 'liability', normalBalance: 'credit', parentId: '23000', level: 3, isActive: true, accountCode: '23200' },
  { id: '23300', name: 'Accrued Taxes', nameAr: 'ضرائب مستحقة', category: 'liability', normalBalance: 'credit', parentId: '23000', level: 3, isActive: true, accountCode: '23300' },
  
  { id: '24000', name: 'Unearned Revenue', nameAr: 'إيرادات مقبوضة مقدماً', category: 'liability', normalBalance: 'credit', parentId: '20000', level: 2, isActive: true, accountCode: '24000' },
  { id: '24100', name: 'Deferred Revenue', nameAr: 'إيرادات مؤجلة', category: 'liability', normalBalance: 'credit', parentId: '24000', level: 3, isActive: true, accountCode: '24100' },
  { id: '24200', name: 'Customer Deposits', nameAr: 'تأمينات عملاء', category: 'liability', normalBalance: 'credit', parentId: '24000', level: 3, isActive: true, accountCode: '24200' },
  
  { id: '25000', name: 'Other Current Liabilities', nameAr: 'التزامات متداولة أخرى', category: 'liability', normalBalance: 'credit', parentId: '20000', level: 2, isActive: true, accountCode: '25000' },
  { id: '25100', name: 'VAT Payable', nameAr: 'ضريبة القيمة المضافة المستحقة', category: 'liability', normalBalance: 'credit', parentId: '25000', level: 3, isActive: true, accountCode: '25100' },
  { id: '25200', name: 'Social Insurance Payable', nameAr: 'التأمينات الاجتماعية المستحقة', category: 'liability', normalBalance: 'credit', parentId: '25000', level: 3, isActive: true, accountCode: '25200' },
  
  // NON-CURRENT LIABILITIES (الالتزامات غير المتداولة)
  { id: '26000', name: 'Non-Current Liabilities', nameAr: 'الالتزامات غير المتداولة', category: 'liability', normalBalance: 'credit', level: 1, isActive: true, accountCode: '26000' },
  { id: '26100', name: 'Long-term Loans', nameAr: 'قروض طويلة الأجل', category: 'liability', normalBalance: 'credit', parentId: '26000', level: 2, isActive: true, accountCode: '26100' },
  { id: '26200', name: 'Bonds Payable', nameAr: 'سندات مستحقة الدفع', category: 'liability', normalBalance: 'credit', parentId: '26000', level: 2, isActive: true, accountCode: '26200' },
  { id: '26300', name: 'Deferred Tax Liability', nameAr: 'التزامات ضريبية مؤجلة', category: 'liability', normalBalance: 'credit', parentId: '26000', level: 2, isActive: true, accountCode: '26300' },
  { id: '26400', name: 'Provisions', nameAr: 'مخصصات', category: 'liability', normalBalance: 'credit', parentId: '26000', level: 2, isActive: true, accountCode: '26400' },
  { id: '26410', name: 'Provision for Employee Benefits', nameAr: 'مخصص مكافأة نهاية الخدمة', category: 'liability', normalBalance: 'credit', parentId: '26400', level: 3, isActive: true, accountCode: '26410' },
  
  // EQUITY (حقوق الملكية) - 3xxxx
  { id: '30000', name: 'Equity', nameAr: 'حقوق الملكية', category: 'equity', normalBalance: 'credit', level: 1, isActive: true, accountCode: '30000' },
  { id: '31000', name: 'Share Capital', nameAr: 'رأس المال', category: 'equity', normalBalance: 'credit', parentId: '30000', level: 2, isActive: true, accountCode: '31000' },
  { id: '31100', name: 'Common Stock', nameAr: 'أسهم عادية', category: 'equity', normalBalance: 'credit', parentId: '31000', level: 3, isActive: true, accountCode: '31100' },
  { id: '31200', name: 'Preferred Stock', nameAr: 'أسهم ممتازة', category: 'equity', normalBalance: 'credit', parentId: '31000', level: 3, isActive: true, accountCode: '31200' },
  
  { id: '32000', name: 'Retained Earnings', nameAr: 'أرباح محتجزة', category: 'equity', normalBalance: 'credit', parentId: '30000', level: 2, isActive: true, accountCode: '32000' },
  { id: '32100', name: 'Retained Earnings - Current Year', nameAr: 'أرباح محتجزة - السنة الحالية', category: 'equity', normalBalance: 'credit', parentId: '32000', level: 3, isActive: true, accountCode: '32100' },
  { id: '32200', name: 'Retained Earnings - Prior Years', nameAr: 'أرباح محتجزة - سنوات سابقة', category: 'equity', normalBalance: 'credit', parentId: '32000', level: 3, isActive: true, accountCode: '32200' },
  
  { id: '33000', name: 'Reserves', nameAr: 'الاحتياطيات', category: 'equity', normalBalance: 'credit', parentId: '30000', level: 2, isActive: true, accountCode: '33000' },
  { id: '33100', name: 'Legal Reserve', nameAr: 'احتياطي نظامي', category: 'equity', normalBalance: 'credit', parentId: '33000', level: 3, isActive: true, accountCode: '33100' },
  { id: '33200', name: 'Statutory Reserve', nameAr: 'احتياطي قانوني', category: 'equity', normalBalance: 'credit', parentId: '33000', level: 3, isActive: true, accountCode: '33200' },
  { id: '33300', name: 'General Reserve', nameAr: 'احتياطي عام', category: 'equity', normalBalance: 'credit', parentId: '33000', level: 3, isActive: true, accountCode: '33300' },
  
  { id: '34000', name: 'Treasury Stock', nameAr: 'أسهم خزينة', category: 'equity', normalBalance: 'debit', parentId: '30000', level: 2, isActive: true, accountCode: '34000' },
  { id: '35000', name: 'Dividends', nameAr: 'توزيعات أرباح', category: 'equity', normalBalance: 'debit', parentId: '30000', level: 2, isActive: true, accountCode: '35000' },
  
  // REVENUE (الإيرادات) - 4xxxx
  { id: '40000', name: 'Revenue', nameAr: 'الإيرادات', category: 'revenue', normalBalance: 'credit', level: 1, isActive: true, accountCode: '40000' },
  { id: '41000', name: 'Sales Revenue', nameAr: 'إيرادات المبيعات', category: 'revenue', normalBalance: 'credit', parentId: '40000', level: 2, isActive: true, accountCode: '41000' },
  { id: '41100', name: 'Product Sales', nameAr: 'مبيعات منتجات', category: 'revenue', normalBalance: 'credit', parentId: '41000', level: 3, isActive: true, accountCode: '41100' },
  { id: '41200', name: 'Service Revenue', nameAr: 'إيرادات خدمات', category: 'revenue', normalBalance: 'credit', parentId: '41000', level: 3, isActive: true, accountCode: '41200' },
  { id: '41300', name: 'Sales Returns and Allowances', nameAr: 'مردودات ومسموحات المبيعات', category: 'revenue', normalBalance: 'debit', parentId: '41000', level: 3, isActive: true, accountCode: '41300' },
  { id: '41400', name: 'Sales Discounts', nameAr: 'خصومات المبيعات', category: 'revenue', normalBalance: 'debit', parentId: '41000', level: 3, isActive: true, accountCode: '41400' },
  
  { id: '42000', name: 'Other Operating Revenue', nameAr: 'إيرادات تشغيلية أخرى', category: 'revenue', normalBalance: 'credit', parentId: '40000', level: 2, isActive: true, accountCode: '42000' },
  { id: '42100', name: 'Rental Income', nameAr: 'إيرادات إيجار', category: 'revenue', normalBalance: 'credit', parentId: '42000', level: 3, isActive: true, accountCode: '42100' },
  { id: '42200', name: 'Consulting Revenue', nameAr: 'إيرادات استشارات', category: 'revenue', normalBalance: 'credit', parentId: '42000', level: 3, isActive: true, accountCode: '42200' },
  
  { id: '43000', name: 'Non-Operating Revenue', nameAr: 'إيرادات غير تشغيلية', category: 'revenue', normalBalance: 'credit', parentId: '40000', level: 2, isActive: true, accountCode: '43000' },
  { id: '43100', name: 'Interest Income', nameAr: 'إيرادات فوائد', category: 'revenue', normalBalance: 'credit', parentId: '43000', level: 3, isActive: true, accountCode: '43100' },
  { id: '43200', name: 'Dividend Income', nameAr: 'إيرادات توزيعات أرباح', category: 'revenue', normalBalance: 'credit', parentId: '43000', level: 3, isActive: true, accountCode: '43200' },
  { id: '43300', name: 'Gain on Sale of Assets', nameAr: 'أرباح بيع أصول', category: 'revenue', normalBalance: 'credit', parentId: '43000', level: 3, isActive: true, accountCode: '43300' },
  { id: '43400', name: 'Foreign Exchange Gain', nameAr: 'أرباح فروقات عملة', category: 'revenue', normalBalance: 'credit', parentId: '43000', level: 3, isActive: true, accountCode: '43400' },
  
  // EXPENSES (المصروفات) - 5xxxx
  { id: '50000', name: 'Cost of Goods Sold', nameAr: 'تكلفة البضاعة المباعة', category: 'expense', normalBalance: 'debit', level: 1, isActive: true, accountCode: '50000' },
  { id: '51000', name: 'Direct Materials', nameAr: 'مواد مباشرة', category: 'expense', normalBalance: 'debit', parentId: '50000', level: 2, isActive: true, accountCode: '51000' },
  { id: '52000', name: 'Direct Labor', nameAr: 'أجور مباشرة', category: 'expense', normalBalance: 'debit', parentId: '50000', level: 2, isActive: true, accountCode: '52000' },
  { id: '53000', name: 'Manufacturing Overhead', nameAr: 'تكاليف صناعية غير مباشرة', category: 'expense', normalBalance: 'debit', parentId: '50000', level: 2, isActive: true, accountCode: '53000' },
  
  { id: '60000', name: 'Operating Expenses', nameAr: 'المصروفات التشغيلية', category: 'expense', normalBalance: 'debit', level: 1, isActive: true, accountCode: '60000' },
  
  { id: '61000', name: 'Selling Expenses', nameAr: 'مصروفات بيعية', category: 'expense', normalBalance: 'debit', parentId: '60000', level: 2, isActive: true, accountCode: '61000' },
  { id: '61100', name: 'Advertising Expense', nameAr: 'مصروف إعلان', category: 'expense', normalBalance: 'debit', parentId: '61000', level: 3, isActive: true, accountCode: '61100' },
  { id: '61200', name: 'Sales Commission', nameAr: 'عمولات مبيعات', category: 'expense', normalBalance: 'debit', parentId: '61000', level: 3, isActive: true, accountCode: '61200' },
  { id: '61300', name: 'Shipping and Delivery', nameAr: 'مصروف شحن وتوصيل', category: 'expense', normalBalance: 'debit', parentId: '61000', level: 3, isActive: true, accountCode: '61300' },
  
  { id: '62000', name: 'General and Administrative Expenses', nameAr: 'مصروفات عمومية وإدارية', category: 'expense', normalBalance: 'debit', parentId: '60000', level: 2, isActive: true, accountCode: '62000' },
  { id: '62100', name: 'Salaries and Wages', nameAr: 'رواتب وأجور', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62100' },
  { id: '62200', name: 'Employee Benefits', nameAr: 'مزايا الموظفين', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62200' },
  { id: '62300', name: 'Rent Expense', nameAr: 'مصروف إيجار', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62300' },
  { id: '62400', name: 'Utilities Expense', nameAr: 'مصروف خدمات عامة', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62400' },
  { id: '62500', name: 'Office Supplies', nameAr: 'لوازم مكتبية', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62500' },
  { id: '62600', name: 'Insurance Expense', nameAr: 'مصروف تأمين', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62600' },
  { id: '62700', name: 'Repairs and Maintenance', nameAr: 'مصروف صيانة وإصلاح', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62700' },
  { id: '62800', name: 'Telephone and Internet', nameAr: 'مصروف هاتف وإنترنت', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62800' },
  { id: '62900', name: 'Professional Fees', nameAr: 'أتعاب مهنية', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62900' },
  { id: '62910', name: 'Legal Fees', nameAr: 'أتعاب قانونية', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62910' },
  { id: '62920', name: 'Audit Fees', nameAr: 'أتعاب مراجعة', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62920' },
  { id: '62930', name: 'Bank Charges', nameAr: 'رسوم بنكية', category: 'expense', normalBalance: 'debit', parentId: '62000', level: 3, isActive: true, accountCode: '62930' },
  
  { id: '63000', name: 'Depreciation and Amortization', nameAr: 'الإهلاك والإطفاء', category: 'expense', normalBalance: 'debit', parentId: '60000', level: 2, isActive: true, accountCode: '63000' },
  { id: '63100', name: 'Depreciation Expense', nameAr: 'مصروف إهلاك', category: 'expense', normalBalance: 'debit', parentId: '63000', level: 3, isActive: true, accountCode: '63100' },
  { id: '63200', name: 'Amortization Expense', nameAr: 'مصروف إطفاء', category: 'expense', normalBalance: 'debit', parentId: '63000', level: 3, isActive: true, accountCode: '63200' },
  
  { id: '64000', name: 'Bad Debt Expense', nameAr: 'مصروف ديون معدومة', category: 'expense', normalBalance: 'debit', parentId: '60000', level: 2, isActive: true, accountCode: '64000' },
  
  { id: '70000', name: 'Non-Operating Expenses', nameAr: 'مصروفات غير تشغيلية', category: 'expense', normalBalance: 'debit', level: 1, isActive: true, accountCode: '70000' },
  { id: '71000', name: 'Interest Expense', nameAr: 'مصروف فوائد', category: 'expense', normalBalance: 'debit', parentId: '70000', level: 2, isActive: true, accountCode: '71000' },
  { id: '72000', name: 'Loss on Sale of Assets', nameAr: 'خسائر بيع أصول', category: 'expense', normalBalance: 'debit', parentId: '70000', level: 2, isActive: true, accountCode: '72000' },
  { id: '73000', name: 'Foreign Exchange Loss', nameAr: 'خسائر فروقات عملة', category: 'expense', normalBalance: 'debit', parentId: '70000', level: 2, isActive: true, accountCode: '73000' },
  
  { id: '80000', name: 'Income Tax Expense', nameAr: 'مصروف ضريبة الدخل', category: 'expense', normalBalance: 'debit', level: 1, isActive: true, accountCode: '80000' },
  { id: '81000', name: 'Current Tax Expense', nameAr: 'مصروف ضريبة جارية', category: 'expense', normalBalance: 'debit', parentId: '80000', level: 2, isActive: true, accountCode: '81000' },
  { id: '82000', name: 'Deferred Tax Expense', nameAr: 'مصروف ضريبة مؤجلة', category: 'expense', normalBalance: 'debit', parentId: '80000', level: 2, isActive: true, accountCode: '82000' },
];

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  lines: JournalLine[];
  status: 'draft' | 'posted' | 'reversed';
  createdBy: string;
  createdAt: string;
  postedAt?: string;
}

export interface JournalLine {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  description?: string;
}

// Financial Statement Types
export interface BalanceSheetData {
  assets: {
    currentAssets: AccountBalance[];
    nonCurrentAssets: AccountBalance[];
    totalAssets: number;
  };
  liabilities: {
    currentLiabilities: AccountBalance[];
    nonCurrentLiabilities: AccountBalance[];
    totalLiabilities: number;
  };
  equity: {
    equityAccounts: AccountBalance[];
    totalEquity: number;
  };
}

export interface IncomeStatementData {
  revenue: AccountBalance[];
  costOfGoodsSold: AccountBalance[];
  grossProfit: number;
  operatingExpenses: AccountBalance[];
  operatingIncome: number;
  nonOperatingItems: AccountBalance[];
  netIncomeBeforeTax: number;
  incomeTax: number;
  netIncome: number;
}

export interface CashFlowStatementData {
  operatingActivities: CashFlowItem[];
  investingActivities: CashFlowItem[];
  financingActivities: CashFlowItem[];
  netCashFlow: number;
  beginningCash: number;
  endingCash: number;
}

export interface AccountBalance {
  accountCode: string;
  accountName: string;
  accountNameAr: string;
  balance: number;
  children?: AccountBalance[];
}

export interface CashFlowItem {
  description: string;
  descriptionAr: string;
  amount: number;
}

export interface TrialBalanceItem {
  accountCode: string;
  accountName: string;
  accountNameAr: string;
  debit: number;
  credit: number;
  balance: number;
}

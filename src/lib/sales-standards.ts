// معايير المبيعات الدولية (IFRS 15 - Revenue from Contracts with Customers)

export type SalesStage = 'lead' | 'opportunity' | 'quotation' | 'order' | 'delivery' | 'invoice' | 'payment' | 'closed';
export type PaymentTerm = 'immediate' | 'net15' | 'net30' | 'net45' | 'net60' | 'net90' | 'custom';
export type DeliveryMethod = 'pickup' | 'delivery' | 'shipping' | 'courier' | 'digital';

// IFRS 15 - Five-Step Model
export enum RevenueRecognitionStep {
  IDENTIFY_CONTRACT = 1,           // تحديد العقد
  IDENTIFY_OBLIGATIONS = 2,        // تحديد الالتزامات الأدائية
  DETERMINE_PRICE = 3,             // تحديد سعر المعاملة
  ALLOCATE_PRICE = 4,              // توزيع السعر على الالتزامات
  RECOGNIZE_REVENUE = 5,           // الاعتراف بالإيراد
}

export interface SalesContract {
  id: string;
  contractNumber: string;
  contractDate: string;
  customerId: string;
  customerName: string;
  
  // IFRS 15 - Step 1: Identify the Contract
  contractType: 'sales' | 'service' | 'subscription' | 'mixed';
  contractStatus: 'draft' | 'approved' | 'active' | 'completed' | 'terminated';
  hasCommercialSubstance: boolean;
  collectionProbable: boolean;
  
  // Terms
  startDate: string;
  endDate?: string;
  duration?: number;
  durationUnit?: 'days' | 'months' | 'years';
  
  // IFRS 15 - Step 2: Identify Performance Obligations
  performanceObligations: PerformanceObligation[];
  
  // IFRS 15 - Step 3: Determine Transaction Price
  totalAmount: number;
  variableConsideration: number;
  constraintOnVariable: number;
  transactionPrice: number;
  
  // Payment
  paymentTerms: PaymentTerm;
  paymentSchedule: PaymentSchedule[];
  
  // Discounts & Penalties
  discountPercentage: number;
  discountAmount: number;
  latePenaltyRate?: number;
  earlyPaymentDiscount?: number;
  
  // Status
  totalInvoiced: number;
  totalPaid: number;
  totalOutstanding: number;
  
  // Documents
  attachments: string[];
  
  // Approval
  approvedBy?: string;
  approvedAt?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceObligation {
  id: string;
  description: string;
  type: 'goods' | 'service' | 'license' | 'other';
  
  // IFRS 15 - Step 4: Allocate Transaction Price
  standaloneSellingPrice: number;
  allocatedPrice: number;
  
  // IFRS 15 - Step 5: Recognize Revenue
  recognitionMethod: 'point-in-time' | 'over-time';
  recognitionCriteria?: string;
  
  // Over Time Recognition
  progressMeasurement?: 'input' | 'output';
  percentageComplete?: number;
  
  // Status
  status: 'pending' | 'in-progress' | 'completed';
  completionDate?: string;
  
  // Revenue
  recognizedRevenue: number;
  deferredRevenue: number;
}

export interface PaymentSchedule {
  id: string;
  dueDate: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: string;
  paidAmount?: number;
}

export interface SalesQuotation {
  id: string;
  quotationNumber: string;
  quotationDate: string;
  expiryDate: string;
  
  // Customer
  customerId: string;
  customerName: string;
  contactPerson?: string;
  
  // Items
  items: SalesQuotationItem[];
  
  // Pricing
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  
  // Terms
  paymentTerms: PaymentTerm;
  deliveryTerms?: string;
  validityDays: number;
  
  // Status
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'converted';
  convertedToOrder?: string;
  
  // Notes
  terms?: string;
  notes?: string;
  internalNotes?: string;
  
  // Tracking
  sentDate?: string;
  viewedDate?: string;
  responseDate?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesQuotationItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  description?: string;
  
  quantity: number;
  unit: string;
  
  unitPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  // Alternative Pricing
  alternatives?: ItemAlternative[];
}

export interface ItemAlternative {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  advantages?: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  expectedDeliveryDate?: string;
  
  // Customer
  customerId: string;
  customerName: string;
  shippingAddress: Address;
  billingAddress: Address;
  
  // Items
  items: SalesOrderItem[];
  
  // Pricing
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  
  // Payment
  paymentTerms: PaymentTerm;
  paymentMethod?: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overpaid';
  
  // Delivery
  deliveryMethod: DeliveryMethod;
  deliveryStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  
  // Status
  status: 'draft' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  
  // References
  quotationId?: string;
  contractId?: string;
  
  // Fulfillment
  invoices: string[];
  deliveryNotes: string[];
  
  // Notes
  customerNotes?: string;
  internalNotes?: string;
  
  // Approval
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesOrderItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  quantityOrdered: number;
  quantityShipped: number;
  quantityInvoiced: number;
  quantityCancelled: number;
  
  unit: string;
  unitPrice: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  // Stock
  warehouseId?: string;
  reservedStock?: boolean;
  
  // Revenue Recognition (IFRS 15)
  revenueRecognized: number;
  deferredRevenue: number;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface SalesInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  
  // Customer
  customerId: string;
  customerName: string;
  billingAddress: Address;
  
  // References
  orderId?: string;
  contractId?: string;
  
  // Items
  items: SalesInvoiceItem[];
  
  // Pricing
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  
  // Payment
  paymentTerms: PaymentTerm;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue';
  amountPaid: number;
  amountDue: number;
  
  // Revenue Recognition (IFRS 15)
  revenueRecognitionDate: string;
  revenueRecognitionMethod: 'point-in-time' | 'over-time';
  recognizedAmount: number;
  deferredAmount: number;
  
  // Status
  status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  
  // Tracking
  sentDate?: string;
  viewedDate?: string;
  paidDate?: string;
  
  // Notes
  terms?: string;
  notes?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalesInvoiceItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  description?: string;
  
  quantity: number;
  unit: string;
  
  unitPrice: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  // Accounting
  accountCode?: string;
  costCenterId?: string;
}

export interface DeliveryNote {
  id: string;
  deliveryNoteNumber: string;
  deliveryDate: string;
  
  // Customer
  customerId: string;
  customerName: string;
  deliveryAddress: Address;
  
  // Reference
  orderId: string;
  orderNumber: string;
  
  // Items
  items: DeliveryNoteItem[];
  
  // Delivery
  deliveryMethod: DeliveryMethod;
  carrier?: string;
  trackingNumber?: string;
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  
  // Status
  status: 'draft' | 'ready' | 'in-transit' | 'delivered' | 'returned';
  
  // Confirmation
  receivedBy?: string;
  receivedDate?: string;
  signature?: string;
  
  // Notes
  notes?: string;
  specialInstructions?: string;
  
  createdBy: string;
  createdAt: string;
}

export interface DeliveryNoteItem {
  id: string;
  orderItemId: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  quantityOrdered: number;
  quantityDelivered: number;
  
  unit: string;
  
  batchNumber?: string;
  serialNumbers?: string[];
  expiryDate?: string;
  
  notes?: string;
}

export interface SalesReturn {
  id: string;
  returnNumber: string;
  returnDate: string;
  
  // Customer
  customerId: string;
  customerName: string;
  
  // Reference
  invoiceId: string;
  invoiceNumber: string;
  
  // Items
  items: SalesReturnItem[];
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  
  // Return
  returnReason: string;
  returnType: 'refund' | 'replacement' | 'credit-note';
  
  // Status
  status: 'pending' | 'approved' | 'processed' | 'rejected';
  
  // Refund
  refundMethod?: 'cash' | 'bank' | 'credit' | 'original-payment';
  refundAmount?: number;
  refundDate?: string;
  
  // Approval
  approvedBy?: string;
  approvedAt?: string;
  
  // Notes
  notes?: string;
  
  createdBy: string;
  createdAt: string;
}

export interface SalesReturnItem {
  id: string;
  invoiceItemId: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  quantitySold: number;
  quantityReturned: number;
  
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  returnReason: string;
  condition: 'new' | 'opened' | 'used' | 'damaged';
  
  restockable: boolean;
  warehouseId?: string;
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  creditNoteDate: string;
  
  // Customer
  customerId: string;
  customerName: string;
  
  // Reference
  invoiceId: string;
  invoiceNumber: string;
  returnId?: string;
  
  // Items
  items: CreditNoteItem[];
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  
  // Reason
  reason: string;
  reasonType: 'return' | 'discount' | 'correction' | 'cancellation';
  
  // Status
  status: 'draft' | 'issued' | 'applied' | 'cancelled';
  appliedDate?: string;
  
  // Notes
  notes?: string;
  
  createdBy: string;
  createdAt: string;
}

export interface CreditNoteItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
}

// Sales Analytics (IFRS 15 Compliance)
export class SalesAnalytics {
  static calculateContractAssetLiability(
    revenueRecognized: number,
    amountInvoiced: number
  ): { type: 'asset' | 'liability'; amount: number } {
    const difference = revenueRecognized - amountInvoiced;
    
    if (difference > 0) {
      return { type: 'asset', amount: difference }; // Contract Asset (Unbilled Revenue)
    } else if (difference < 0) {
      return { type: 'liability', amount: Math.abs(difference) }; // Contract Liability (Deferred Revenue)
    } else {
      return { type: 'asset', amount: 0 };
    }
  }
  
  static calculateRevenueRecognitionSchedule(
    contract: SalesContract,
    startDate: Date,
    endDate: Date
  ): { date: string; amount: number }[] {
    const schedule: { date: string; amount: number }[] = [];
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dailyAmount = contract.transactionPrice / totalDays;
    
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      schedule.push({
        date: currentDate.toISOString().split('T')[0],
        amount: dailyAmount,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return schedule;
  }
  
  static calculateSalesGrowthRate(currentPeriod: number, previousPeriod: number): number {
    if (previousPeriod === 0) return 0;
    return ((currentPeriod - previousPeriod) / previousPeriod) * 100;
  }
  
  static calculateAverageOrderValue(totalRevenue: number, numberOfOrders: number): number {
    if (numberOfOrders === 0) return 0;
    return totalRevenue / numberOfOrders;
  }
  
  static calculateConversionRate(conversions: number, totalLeads: number): number {
    if (totalLeads === 0) return 0;
    return (conversions / totalLeads) * 100;
  }
  
  static calculateCustomerLifetimeValue(
    averageOrderValue: number,
    purchaseFrequency: number,
    customerLifespan: number
  ): number {
    return averageOrderValue * purchaseFrequency * customerLifespan;
  }
  
  static calculateDayssSalesOutstanding(
    accountsReceivable: number,
    totalCreditSales: number,
    days: number = 365
  ): number {
    if (totalCreditSales === 0) return 0;
    return (accountsReceivable / totalCreditSales) * days;
  }
}

// Sales Performance Metrics
export interface SalesMetrics {
  period: string;
  totalRevenue: number;
  recognizedRevenue: number;
  deferredRevenue: number;
  contractAssets: number;
  contractLiabilities: number;
  
  totalOrders: number;
  averageOrderValue: number;
  
  totalQuotations: number;
  quotationConversionRate: number;
  
  newCustomers: number;
  returningCustomers: number;
  customerRetentionRate: number;
  
  daysSalesOutstanding: number;
  
  topProducts: { itemId: string; itemName: string; revenue: number; quantity: number }[];
  topCustomers: { customerId: string; customerName: string; revenue: number; orders: number }[];
}

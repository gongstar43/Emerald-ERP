// معايير المشتريات الدولية (IAS 2, IFRS 15, ISO 9001)

export type PurchaseStatus = 'draft' | 'pending' | 'approved' | 'ordered' | 'received' | 'invoiced' | 'paid' | 'closed' | 'cancelled';
export type ApprovalStatus = 'not-required' | 'pending' | 'approved' | 'rejected';
export type ReceivingStatus = 'pending' | 'partial' | 'received' | 'over-received';

export interface PurchaseRequisition {
  id: string;
  requisitionNumber: string;
  requisitionDate: string;
  requiredDate: string;
  
  // Requester
  requestedBy: string;
  department: string;
  costCenter?: string;
  project?: string;
  
  // Items
  items: PurchaseRequisitionItem[];
  
  // Amounts
  estimatedTotal: number;
  
  // Priority
  priority: 'low' | 'medium' | 'high' | 'urgent';
  urgency: string;
  
  // Purpose
  purpose: string;
  justification?: string;
  
  // Status
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'converted' | 'cancelled';
  
  // Approval Workflow
  approvals: ApprovalStep[];
  currentApprovalLevel: number;
  
  // Conversion
  convertedToPO?: string[];
  convertedToRFQ?: string;
  
  // Notes
  notes?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseRequisitionItem {
  id: string;
  itemId?: string;
  itemCode?: string;
  itemName: string;
  description: string;
  
  quantity: number;
  unit: string;
  
  estimatedUnitPrice: number;
  estimatedTotal: number;
  
  // Justification
  reason: string;
  
  // Specifications
  specifications?: string;
  technicalSpecs?: Record<string, string>;
  
  // Suggested Supplier
  suggestedSupplierId?: string;
  suggestedSupplierName?: string;
  
  // Stock
  currentStock?: number;
  reorderLevel?: number;
  
  status: 'pending' | 'approved' | 'ordered' | 'received';
}

export interface ApprovalStep {
  level: number;
  approverRole: string;
  approverId?: string;
  approverName?: string;
  status: ApprovalStatus;
  approvalDate?: string;
  comments?: string;
  
  // Approval Limits
  maxAmount?: number;
}

export interface RequestForQuotation {
  id: string;
  rfqNumber: string;
  rfqDate: string;
  responseDeadline: string;
  
  // Source
  requisitionId?: string;
  
  // Suppliers
  suppliers: RFQSupplier[];
  
  // Items
  items: RFQItem[];
  
  // Terms
  paymentTerms?: string;
  deliveryTerms?: string;
  incoterms?: string;
  
  // Requirements
  qualityRequirements?: string;
  deliveryRequirements?: string;
  warrantyRequirements?: string;
  
  // Status
  status: 'draft' | 'sent' | 'responded' | 'evaluated' | 'awarded' | 'cancelled';
  
  // Evaluation
  evaluationCriteria: EvaluationCriteria[];
  selectedSupplierId?: string;
  
  // Notes
  notes?: string;
  terms?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RFQSupplier {
  supplierId: string;
  supplierName: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  
  status: 'invited' | 'viewed' | 'responded' | 'declined' | 'selected';
  invitedDate: string;
  viewedDate?: string;
  responseDate?: string;
  
  quotationId?: string;
}

export interface RFQItem {
  id: string;
  itemId?: string;
  itemCode?: string;
  itemName: string;
  description: string;
  
  quantity: number;
  unit: string;
  
  specifications?: string;
  technicalSpecs?: Record<string, string>;
  
  // Responses from suppliers
  responses: RFQItemResponse[];
}

export interface RFQItemResponse {
  supplierId: string;
  unitPrice: number;
  totalPrice: number;
  deliveryTime: number;
  deliveryTimeUnit: 'days' | 'weeks' | 'months';
  warranty?: string;
  notes?: string;
  
  // Evaluation Score
  evaluationScore?: number;
}

export interface EvaluationCriteria {
  criterion: string;
  weight: number; // Percentage
  description?: string;
}

export interface SupplierQuotation {
  id: string;
  quotationNumber: string;
  quotationDate: string;
  validUntil: string;
  
  // Supplier
  supplierId: string;
  supplierName: string;
  
  // Reference
  rfqId?: string;
  rfqNumber?: string;
  
  // Items
  items: SupplierQuotationItem[];
  
  // Pricing
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  
  // Terms
  paymentTerms: string;
  deliveryTerms: string;
  deliveryTime: number;
  deliveryTimeUnit: 'days' | 'weeks' | 'months';
  warranty?: string;
  
  // Currency
  currency: string;
  exchangeRate?: number;
  
  // Status
  status: 'received' | 'under-review' | 'accepted' | 'rejected' | 'expired';
  
  // Evaluation
  evaluationScore?: number;
  evaluationNotes?: string;
  
  // Conversion
  convertedToPO?: string;
  
  // Notes
  notes?: string;
  
  createdAt: string;
}

export interface SupplierQuotationItem {
  id: string;
  itemId?: string;
  itemCode?: string;
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
  
  // Specifications
  specifications?: string;
  partNumber?: string;
  manufacturer?: string;
  
  // Alternative
  isAlternative?: boolean;
  originalItemId?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  poDate: string;
  expectedDeliveryDate: string;
  
  // Supplier
  supplierId: string;
  supplierName: string;
  supplierAddress: Address;
  contactPerson?: string;
  
  // References
  requisitionId?: string;
  rfqId?: string;
  quotationId?: string;
  contractId?: string;
  
  // Items
  items: PurchaseOrderItem[];
  
  // Pricing
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCost: number;
  otherCharges: number;
  totalAmount: number;
  
  // Currency
  currency: string;
  exchangeRate: number;
  localCurrencyTotal: number;
  
  // Terms
  paymentTerms: string;
  deliveryTerms: string;
  incoterms?: string;
  
  // Delivery
  deliveryAddress: Address;
  requestedDeliveryDate: string;
  
  // Status
  status: PurchaseStatus;
  approvalStatus: ApprovalStatus;
  receivingStatus: ReceivingStatus;
  invoiceStatus: 'not-invoiced' | 'partial' | 'invoiced' | 'over-invoiced';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  
  // Approval
  approvals: ApprovalStep[];
  approvedBy?: string;
  approvedAt?: string;
  
  // Tracking
  goodsReceipts: string[];
  invoices: string[];
  payments: string[];
  
  // Amounts Tracking
  amountReceived: number;
  amountInvoiced: number;
  amountPaid: number;
  
  // Quality
  qualityInspectionRequired: boolean;
  qualityInspectionStatus?: 'pending' | 'passed' | 'failed';
  
  // Notes
  notes?: string;
  terms?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  description?: string;
  
  quantityOrdered: number;
  quantityReceived: number;
  quantityRejected: number;
  quantityInvoiced: number;
  
  unit: string;
  
  unitPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  // Delivery
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  
  // Warehouse
  warehouseId: string;
  warehouseLocation?: string;
  
  // Accounting (IAS 2)
  accountCode?: string;
  costCenterId?: string;
  projectId?: string;
  
  // Quality
  qualityStandard?: string;
  inspectionRequired: boolean;
  
  // Status
  status: 'pending' | 'partial' | 'received' | 'cancelled';
  
  // Notes
  notes?: string;
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

export interface GoodsReceipt {
  id: string;
  grNumber: string;
  receiptDate: string;
  
  // PO Reference
  poId: string;
  poNumber: string;
  
  // Supplier
  supplierId: string;
  supplierName: string;
  
  // Delivery
  deliveryNoteNumber?: string;
  deliveryDate?: string;
  carrier?: string;
  vehicleNumber?: string;
  driverName?: string;
  
  // Warehouse
  warehouseId: string;
  warehouseName: string;
  
  // Items
  items: GoodsReceiptItem[];
  
  // Quality
  qualityInspectionRequired: boolean;
  qualityInspectionStatus?: 'pending' | 'passed' | 'failed';
  inspectedBy?: string;
  inspectionDate?: string;
  inspectionNotes?: string;
  
  // Status
  status: 'draft' | 'received' | 'inspected' | 'accepted' | 'rejected' | 'returned';
  
  // Posting
  posted: boolean;
  postedDate?: string;
  postedBy?: string;
  
  // Notes
  notes?: string;
  issues?: string;
  
  receivedBy: string;
  createdAt: string;
}

export interface GoodsReceiptItem {
  id: string;
  poItemId: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  quantityOrdered: number;
  quantityReceived: number;
  quantityAccepted: number;
  quantityRejected: number;
  
  unit: string;
  unitPrice: number;
  totalAmount: number;
  
  // Tracking
  batchNumber?: string;
  serialNumbers?: string[];
  expiryDate?: string;
  manufactureDate?: string;
  
  // Quality
  qualityStatus: 'pending' | 'passed' | 'failed' | 'conditional';
  rejectionReason?: string;
  
  // Storage
  locationId?: string;
  binLocation?: string;
  
  // Notes
  notes?: string;
}

export interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  supplierInvoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  
  // Supplier
  supplierId: string;
  supplierName: string;
  
  // References
  poId?: string;
  poNumber?: string;
  grIds?: string[];
  
  // Items
  items: PurchaseInvoiceItem[];
  
  // Pricing
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingCost: number;
  otherCharges: number;
  totalAmount: number;
  
  // Currency
  currency: string;
  exchangeRate: number;
  localCurrencyTotal: number;
  
  // Payment
  paymentTerms: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue';
  amountPaid: number;
  amountDue: number;
  
  // Status
  status: 'draft' | 'posted' | 'paid' | 'cancelled';
  
  // Posting (IAS 2 - Inventory Costing)
  posted: boolean;
  postedDate?: string;
  postedBy?: string;
  
  // GL Impact
  journalEntryId?: string;
  
  // Withholding Tax
  withholdingTaxRate?: number;
  withholdingTaxAmount?: number;
  
  // Notes
  notes?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseInvoiceItem {
  id: string;
  poItemId?: string;
  grItemId?: string;
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
  
  // Accounting (IAS 2)
  accountCode: string;
  costCenterId?: string;
  projectId?: string;
  
  // Inventory Impact
  affectsInventory: boolean;
  warehouseId?: string;
  
  // GL Posting
  debitAccount: string;
  creditAccount: string;
}

export interface PurchaseReturn {
  id: string;
  returnNumber: string;
  returnDate: string;
  
  // Supplier
  supplierId: string;
  supplierName: string;
  
  // References
  poId?: string;
  grId?: string;
  invoiceId?: string;
  
  // Items
  items: PurchaseReturnItem[];
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  
  // Return
  returnReason: string;
  returnType: 'refund' | 'replacement' | 'debit-note';
  
  // Status
  status: 'draft' | 'approved' | 'shipped' | 'completed' | 'cancelled';
  
  // Approval
  approvedBy?: string;
  approvedAt?: string;
  
  // Shipping
  carrier?: string;
  trackingNumber?: string;
  shippedDate?: string;
  
  // Refund
  refundMethod?: 'cash' | 'bank' | 'credit' | 'offset';
  refundAmount?: number;
  refundDate?: string;
  
  // Notes
  notes?: string;
  
  createdBy: string;
  createdAt: string;
}

export interface PurchaseReturnItem {
  id: string;
  grItemId?: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  quantityReceived: number;
  quantityReturned: number;
  
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  returnReason: string;
  condition: 'defective' | 'damaged' | 'wrong-item' | 'excess' | 'quality-issue';
  
  // Tracking
  batchNumber?: string;
  serialNumbers?: string[];
  
  // Warehouse
  warehouseId: string;
}

export interface DebitNote {
  id: string;
  debitNoteNumber: string;
  debitNoteDate: string;
  
  // Supplier
  supplierId: string;
  supplierName: string;
  
  // Reference
  invoiceId?: string;
  invoiceNumber?: string;
  returnId?: string;
  
  // Items
  items: DebitNoteItem[];
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  
  // Reason
  reason: string;
  reasonType: 'return' | 'discount' | 'correction' | 'shortage';
  
  // Status
  status: 'draft' | 'issued' | 'applied' | 'cancelled';
  appliedDate?: string;
  
  // Notes
  notes?: string;
  
  createdBy: string;
  createdAt: string;
}

export interface DebitNoteItem {
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

// Purchase Analytics
export class PurchaseAnalytics {
  static calculateLeadTime(orderDate: Date, receiptDate: Date): number {
    return Math.ceil((receiptDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  static calculateSupplierPerformance(
    onTimeDeliveries: number,
    totalDeliveries: number,
    qualityAcceptanceRate: number,
    priceCompetitiveness: number
  ): number {
    if (totalDeliveries === 0) return 0;
    
    const onTimeRate = (onTimeDeliveries / totalDeliveries) * 100;
    
    // Weighted score: 40% on-time, 40% quality, 20% price
    return (onTimeRate * 0.4) + (qualityAcceptanceRate * 0.4) + (priceCompetitiveness * 0.2);
  }
  
  static calculateCostSavings(budgetAmount: number, actualAmount: number): {
    savings: number;
    percentage: number;
  } {
    const savings = budgetAmount - actualAmount;
    const percentage = budgetAmount > 0 ? (savings / budgetAmount) * 100 : 0;
    
    return { savings, percentage };
  }
  
  static calculatePurchaseOrderCycle(
    requisitionDate: Date,
    orderDate: Date,
    receiptDate: Date,
    invoiceDate: Date,
    paymentDate: Date
  ): {
    requisitionToOrder: number;
    orderToReceipt: number;
    receiptToInvoice: number;
    invoiceToPayment: number;
    totalCycle: number;
  } {
    const requisitionToOrder = Math.ceil((orderDate.getTime() - requisitionDate.getTime()) / (1000 * 60 * 60 * 24));
    const orderToReceipt = Math.ceil((receiptDate.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
    const receiptToInvoice = Math.ceil((invoiceDate.getTime() - receiptDate.getTime()) / (1000 * 60 * 60 * 24));
    const invoiceToPayment = Math.ceil((paymentDate.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalCycle = Math.ceil((paymentDate.getTime() - requisitionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      requisitionToOrder,
      orderToReceipt,
      receiptToInvoice,
      invoiceToPayment,
      totalCycle,
    };
  }
  
  static calculateDaysPayableOutstanding(
    accountsPayable: number,
    costOfGoodsSold: number,
    days: number = 365
  ): number {
    if (costOfGoodsSold === 0) return 0;
    return (accountsPayable / costOfGoodsSold) * days;
  }
  
  static calculatePurchaseSpend(purchases: PurchaseOrder[]): {
    totalSpend: number;
    byCategory: Record<string, number>;
    bySupplier: Record<string, number>;
  } {
    const totalSpend = purchases.reduce((sum, po) => sum + po.totalAmount, 0);
    const byCategory: Record<string, number> = {};
    const bySupplier: Record<string, number> = {};
    
    purchases.forEach((po) => {
      // By supplier
      if (!bySupplier[po.supplierId]) {
        bySupplier[po.supplierId] = 0;
      }
      bySupplier[po.supplierId] += po.totalAmount;
    });
    
    return { totalSpend, byCategory, bySupplier };
  }
}

// Purchase Performance Metrics
export interface PurchaseMetrics {
  period: string;
  
  // Volume
  totalPOs: number;
  totalPOValue: number;
  averagePOValue: number;
  
  // Cycle Times
  averageRequisitionToOrderTime: number;
  averageOrderToReceiptTime: number;
  averageTotalCycleTime: number;
  
  // Quality
  qualityAcceptanceRate: number;
  totalReturns: number;
  returnRate: number;
  
  // Delivery
  onTimeDeliveryRate: number;
  averageLeadTime: number;
  
  // Financial
  costSavings: number;
  daysPayableOutstanding: number;
  
  // Compliance
  requisitionsWithPO: number;
  requisitionsWithoutPO: number;
  approvalComplianceRate: number;
  
  // Suppliers
  activeSuppliers: number;
  topSuppliers: { supplierId: string; supplierName: string; totalSpend: number }[];
}

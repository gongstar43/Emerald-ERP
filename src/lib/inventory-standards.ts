// معايير المخزون الدولية (IAS 2, IFRS 15)

export type ValuationMethod = 'FIFO' | 'LIFO' | 'WAC' | 'SPECIFIC_IDENTIFICATION';
export type StockStatus = 'available' | 'reserved' | 'damaged' | 'expired' | 'in-transit';
export type MovementType = 'purchase' | 'sale' | 'return' | 'adjustment' | 'transfer' | 'production';

export interface InventoryItem {
  id: string;
  itemCode: string;
  itemName: string;
  itemNameAr: string;
  category: string;
  subCategory?: string;
  type: 'raw-material' | 'wip' | 'finished-goods' | 'merchandise';
  
  // Valuation (IAS 2)
  valuationMethod: ValuationMethod;
  unitCost: number;
  averageCost: number;
  lastCost: number;
  standardCost?: number;
  
  // Quantity
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  quantityOnOrder: number;
  quantityInTransit: number;
  
  // Reorder Management
  reorderPoint: number;
  reorderQuantity: number;
  minimumQuantity: number;
  maximumQuantity: number;
  safetyStock: number;
  
  // Units
  baseUnit: string;
  purchaseUnit?: string;
  salesUnit?: string;
  conversionFactor: number;
  
  // Tracking
  trackBySerial: boolean;
  trackByBatch: boolean;
  trackByExpiry: boolean;
  
  // Warehouse
  defaultWarehouse: string;
  defaultLocation?: string;
  
  // Pricing
  costPrice: number;
  sellingPrice: number;
  minimumPrice?: number;
  wholesalePrice?: number;
  
  // Tax
  taxable: boolean;
  taxRate: number;
  
  // Status
  status: 'active' | 'inactive' | 'discontinued';
  isStockItem: boolean;
  
  // Images & Specs
  imageUrl?: string;
  barcode?: string;
  sku?: string;
  manufacturer?: string;
  brand?: string;
  weight?: number;
  dimensions?: string;
  
  // Dates
  createdAt: string;
  updatedAt: string;
  lastStockDate?: string;
}

export interface StockMovement {
  id: string;
  movementNumber: string;
  movementDate: string;
  movementType: MovementType;
  itemId: string;
  itemCode: string;
  itemName: string;
  
  // Warehouse & Location
  fromWarehouse?: string;
  toWarehouse?: string;
  fromLocation?: string;
  toLocation?: string;
  
  // Quantity & Valuation
  quantity: number;
  unitCost: number;
  totalCost: number;
  
  // Batch & Serial Tracking
  batchNumber?: string;
  serialNumber?: string;
  expiryDate?: string;
  manufactureDate?: string;
  
  // Reference
  referenceType?: 'purchase' | 'sale' | 'transfer' | 'adjustment';
  referenceNumber?: string;
  referenceId?: string;
  
  // Status & Notes
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
  reason?: string;
  
  // Approval
  approvedBy?: string;
  approvedAt?: string;
  
  // User
  createdBy: string;
  createdAt: string;
}

export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  adjustmentDate: string;
  adjustmentType: 'increase' | 'decrease' | 'recount';
  reason: string;
  
  warehouse: string;
  location?: string;
  
  items: StockAdjustmentItem[];
  
  totalValue: number;
  status: 'draft' | 'approved' | 'posted' | 'cancelled';
  
  approvedBy?: string;
  approvedAt?: string;
  postedBy?: string;
  postedAt?: string;
  
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface StockAdjustmentItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  currentQuantity: number;
  adjustedQuantity: number;
  difference: number;
  unitCost: number;
  totalCost: number;
  reason?: string;
  batchNumber?: string;
  serialNumber?: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  transferDate: string;
  fromWarehouse: string;
  toWarehouse: string;
  
  items: StockTransferItem[];
  
  status: 'draft' | 'pending' | 'in-transit' | 'received' | 'cancelled';
  
  requestedBy: string;
  approvedBy?: string;
  shippedBy?: string;
  receivedBy?: string;
  
  shippedDate?: string;
  receivedDate?: string;
  
  notes?: string;
  createdAt: string;
}

export interface StockTransferItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  quantityRequested: number;
  quantityShipped: number;
  quantityReceived: number;
  unitCost: number;
  batchNumber?: string;
  serialNumber?: string;
}

export interface PhysicalCount {
  id: string;
  countNumber: string;
  countDate: string;
  countType: 'full' | 'partial' | 'cycle';
  warehouse: string;
  
  items: PhysicalCountItem[];
  
  status: 'planned' | 'in-progress' | 'completed' | 'posted';
  
  variance: number;
  variancePercentage: number;
  
  countedBy: string[];
  verifiedBy?: string;
  approvedBy?: string;
  
  startDate: string;
  endDate?: string;
  
  notes?: string;
  createdAt: string;
}

export interface PhysicalCountItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  systemQuantity: number;
  countedQuantity: number;
  variance: number;
  unitCost: number;
  varianceCost: number;
  reason?: string;
  counted: boolean;
}

export interface StockValuation {
  date: string;
  warehouse?: string;
  valuationMethod: ValuationMethod;
  
  items: StockValuationItem[];
  
  totalQuantity: number;
  totalValue: number;
  
  byCategory: Record<string, { quantity: number; value: number }>;
  byWarehouse: Record<string, { quantity: number; value: number }>;
}

export interface StockValuationItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  category: string;
  warehouse: string;
  quantity: number;
  unitCost: number;
  totalValue: number;
}

export interface ReorderReport {
  date: string;
  items: ReorderItem[];
}

export interface ReorderItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  quantityOnOrder: number;
  reorderPoint: number;
  reorderQuantity: number;
  suggestedOrderQuantity: number;
  preferredSupplier?: string;
  lastPurchasePrice?: number;
  leadTime?: number;
  urgency: 'critical' | 'high' | 'medium' | 'low';
}

export interface AgingReport {
  date: string;
  items: AgingItem[];
}

export interface AgingItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  value: number;
  age0to30: number;
  age31to60: number;
  age61to90: number;
  age91to180: number;
  ageOver180: number;
  slowMoving: boolean;
  obsolete: boolean;
  daysOnHand: number;
}

// Valuation Calculations
export class InventoryValuation {
  static calculateFIFO(purchases: { quantity: number; cost: number }[], saleQuantity: number): number {
    let remainingQty = saleQuantity;
    let totalCost = 0;
    
    for (const purchase of purchases) {
      if (remainingQty <= 0) break;
      
      const qtyToUse = Math.min(remainingQty, purchase.quantity);
      totalCost += qtyToUse * purchase.cost;
      remainingQty -= qtyToUse;
    }
    
    return totalCost;
  }
  
  static calculateLIFO(purchases: { quantity: number; cost: number }[], saleQuantity: number): number {
    let remainingQty = saleQuantity;
    let totalCost = 0;
    const reversedPurchases = [...purchases].reverse();
    
    for (const purchase of reversedPurchases) {
      if (remainingQty <= 0) break;
      
      const qtyToUse = Math.min(remainingQty, purchase.quantity);
      totalCost += qtyToUse * purchase.cost;
      remainingQty -= qtyToUse;
    }
    
    return totalCost;
  }
  
  static calculateWeightedAverage(
    currentQty: number,
    currentCost: number,
    purchaseQty: number,
    purchaseCost: number
  ): number {
    const totalQty = currentQty + purchaseQty;
    if (totalQty === 0) return 0;
    
    const totalValue = (currentQty * currentCost) + (purchaseQty * purchaseCost);
    return totalValue / totalQty;
  }
}

// Stock Analysis
export class StockAnalysis {
  static calculateTurnoverRatio(costOfGoodsSold: number, averageInventory: number): number {
    if (averageInventory === 0) return 0;
    return costOfGoodsSold / averageInventory;
  }
  
  static calculateDaysOnHand(averageInventory: number, costOfGoodsSold: number, days: number = 365): number {
    if (costOfGoodsSold === 0) return 0;
    return (averageInventory * days) / costOfGoodsSold;
  }
  
  static calculateReorderPoint(
    averageDailyUsage: number,
    leadTimeDays: number,
    safetyStock: number
  ): number {
    return (averageDailyUsage * leadTimeDays) + safetyStock;
  }
  
  static calculateEOQ(
    annualDemand: number,
    orderCost: number,
    holdingCost: number
  ): number {
    return Math.sqrt((2 * annualDemand * orderCost) / holdingCost);
  }
  
  static classifyABC(items: { id: string; value: number }[]): {
    A: string[];
    B: string[];
    C: string[];
  } {
    const sorted = [...items].sort((a, b) => b.value - a.value);
    const totalValue = sorted.reduce((sum, item) => sum + item.value, 0);
    
    let cumulativeValue = 0;
    let cumulativePercentage = 0;
    
    const A: string[] = [];
    const B: string[] = [];
    const C: string[] = [];
    
    for (const item of sorted) {
      cumulativeValue += item.value;
      cumulativePercentage = (cumulativeValue / totalValue) * 100;
      
      if (cumulativePercentage <= 80) {
        A.push(item.id);
      } else if (cumulativePercentage <= 95) {
        B.push(item.id);
      } else {
        C.push(item.id);
      }
    }
    
    return { A, B, C };
  }
}

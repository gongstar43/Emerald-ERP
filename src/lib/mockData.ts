/**
 * Mock Data - بيانات وهمية للنظام عند عدم توفر Backend
 */

// Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'supplier' | 'both';
  balance: number;
  taxNumber?: string;
  address?: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  number: string;
  contactId: string;
  contactName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DashboardStats {
  invoices: { total: number; pending: number; paid: number };
  payments: { total: number; amount: number };
  contacts: { total: number };
  businesses: { total: number };
  tasks: { active: number; completed: number };
  approvals: { pending: number };
}

// Mock Contacts Data
const mockContacts: Contact[] = [];

// Mock Invoices Data
const mockInvoices: Invoice[] = [];

// Mock Dashboard Stats
const mockDashboardStats: DashboardStats = {
  invoices: {
    total: 0,
    pending: 0,
    paid: 0
  },
  payments: {
    total: 0,
    amount: 0
  },
  contacts: {
    total: 0
  },
  businesses: {
    total: 0
  },
  tasks: {
    active: 0,
    completed: 0
  },
  approvals: {
    pending: 0
  }
};

/**
 * Mock API Service - يحاكي الـ API عندما يكون Backend غير متاح
 */
export class MockApiService {
  private static contacts = [...mockContacts];
  private static invoices = [...mockInvoices];
  
  static async getContacts(): Promise<Contact[]> {
    return Promise.resolve([...this.contacts]);
  }
  
  static async getContactById(id: string): Promise<Contact | null> {
    const contact = this.contacts.find(c => c.id === id);
    return Promise.resolve(contact || null);
  }
  
  static async createContact(data: Omit<Contact, 'id' | 'balance'>): Promise<Contact> {
    const newContact: Contact = {
      ...data,
      id: Date.now().toString(),
      balance: 0
    };
    this.contacts.push(newContact);
    return Promise.resolve(newContact);
  }
  
  static async updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) {
      return Promise.reject(new Error('Contact not found'));
    }
    this.contacts[index] = { ...this.contacts[index], ...data };
    return Promise.resolve(this.contacts[index]);
  }
  
  static async deleteContact(id: string): Promise<void> {
    this.contacts = this.contacts.filter(c => c.id !== id);
    return Promise.resolve();
  }
  
  static async getInvoices(): Promise<Invoice[]> {
    return Promise.resolve([...this.invoices]);
  }
  
  static async getDashboardStats(): Promise<DashboardStats> {
    return Promise.resolve({ ...mockDashboardStats });
  }
  
  static async getBusinesses(): Promise<any[]> {
    return Promise.resolve([]);
  }
  
  static async getTasks(): Promise<any[]> {
    return Promise.resolve([]);
  }
  
  static async getApprovals(): Promise<any[]> {
    return Promise.resolve([]);
  }
  
  static async getUsers(): Promise<any[]> {
    return Promise.resolve([]);
  }
  
  static async getAccounts(): Promise<any[]> {
    return Promise.resolve([]);
  }
  
  static resetData(): void {
    this.contacts = [...mockContacts];
    this.invoices = [...mockInvoices];
  }
}

export default MockApiService;
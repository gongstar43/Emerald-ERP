import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";

const app = new Hono();

// Mock data storage - NO DATABASE CONNECTION
const mockData = {
  contacts: [],
  businesses: [],
  accounts: [],
  approvals: [
    {
      id: 'APP-001',
      type: 'leave',
      title: 'Annual Leave Request',
      requester: 'أحمد محمد',
      department: 'الموارد البشرية',
      priority: 'medium',
      status: 'pending',
      requestDate: '2026-02-25',
      dueDate: '2026-02-28',
      description: 'طلب إجازة سنوية لمدة 5 أيام',
      approvalLevel: 1,
      totalLevels: 2,
    },
    {
      id: 'APP-002',
      type: 'expense',
      title: 'Business Travel Expenses',
      requester: 'Sara Ahmed',
      department: 'Sales',
      amount: 5500,
      currency: 'SAR',
      priority: 'high',
      status: 'pending',
      requestDate: '2026-02-26',
      dueDate: '2026-02-27',
      description: 'Travel expenses for client meeting in Riyadh',
      approvalLevel: 1,
      totalLevels: 3,
    },
    {
      id: 'APP-003',
      type: 'purchase',
      title: 'Office Equipment Purchase',
      requester: 'محمد علي',
      department: 'IT',
      amount: 15000,
      currency: 'SAR',
      priority: 'medium',
      status: 'pending',
      requestDate: '2026-02-24',
      dueDate: '2026-03-01',
      description: 'شراء 5 أجهزة كمبيوتر محمولة للموظفين الجدد',
      approvalLevel: 2,
      totalLevels: 3,
    },
    {
      id: 'APP-004',
      type: 'project',
      title: 'New Website Development',
      requester: 'Fatima Hassan',
      department: 'Marketing',
      amount: 85000,
      currency: 'SAR',
      priority: 'urgent',
      status: 'pending',
      requestDate: '2026-02-27',
      dueDate: '2026-02-28',
      description: 'Approval for new company website development project',
      approvalLevel: 1,
      totalLevels: 4,
    },
    {
      id: 'APP-005',
      type: 'payment',
      title: 'Vendor Payment',
      requester: 'خالد أحمد',
      department: 'Finance',
      amount: 25000,
      currency: 'SAR',
      priority: 'high',
      status: 'pending',
      requestDate: '2026-02-26',
      dueDate: '2026-02-28',
      description: 'دفعة للمورد - فواتير شهر يناير',
      approvalLevel: 2,
      totalLevels: 2,
    },
  ],
};

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Helper to get authenticated user (simplified for mock mode)
function getAuthenticatedUser(c: any) {
  return { id: 'mock-user', email: 'user@mock.com', user_metadata: { name: 'Mock User' } };
}

// Auth endpoints (mock responses)
app.post('/make-server-bfdaa8c0/api/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    console.log(`✅ Mock signup for: ${email}`);
    
    return c.json({ 
      success: true, 
      user: { id: 'mock-user-' + Date.now(), email, user_metadata: { name } }, 
      role: 'admin' 
    });
  } catch (error: any) {
    console.error('Signup error:', error.message);
    return c.json({ error: error.message }, 400);
  }
});

app.get('/make-server-bfdaa8c0/api/auth/me', async (c) => {
  return c.json({
    id: 'mock-user',
    email: 'user@mock.com',
    name: 'Mock User',
    role: 'admin',
    permissions: [],
  });
});

// Dashboard endpoint
app.get('/make-server-bfdaa8c0/api/dashboard', async (c) => {
  console.log('✅ Returning mock dashboard data');
  
  return c.json({
    invoices: { total: 0, pending: 0, paid: 0 },
    payments: { total: 0, amount: 0 },
    contacts: { total: mockData.contacts.length },
    businesses: { total: mockData.businesses.length },
    tasks: { active: 0, completed: 0 },
    approvals: { pending: mockData.approvals.filter((a: any) => a.status === 'pending').length },
  });
});

// Approvals endpoints
app.get('/make-server-bfdaa8c0/api/approvals', async (c) => {
  console.log('✅ Returning mock approvals data');
  return c.json(mockData.approvals);
});

app.put('/make-server-bfdaa8c0/api/approvals/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const index = mockData.approvals.findIndex((a: any) => a.id === id);
    
    if (index === -1) {
      return c.json({ error: 'Approval not found' }, 404);
    }
    
    mockData.approvals[index] = {
      ...mockData.approvals[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Mock approval updated:', id);
    return c.json(mockData.approvals[index]);
  } catch (error: any) {
    console.error('Error updating approval:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Contacts endpoints
app.get('/make-server-bfdaa8c0/api/contacts', async (c) => {
  console.log('✅ Returning mock contacts data');
  return c.json(mockData.contacts);
});

app.post('/make-server-bfdaa8c0/api/contacts', async (c) => {
  try {
    const data = await c.req.json();
    const id = crypto.randomUUID();
    const contact = {
      id,
      ...data,
      balance: 0,
      createdAt: new Date().toISOString(),
    };
    
    mockData.contacts.push(contact);
    console.log('✅ Mock contact created:', id);
    return c.json(contact);
  } catch (error: any) {
    console.error('Error creating contact:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.put('/make-server-bfdaa8c0/api/contacts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const index = mockData.contacts.findIndex(c => c.id === id);
    
    if (index === -1) {
      return c.json({ error: 'Contact not found' }, 404);
    }
    
    mockData.contacts[index] = {
      ...mockData.contacts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Mock contact updated:', id);
    return c.json(mockData.contacts[index]);
  } catch (error: any) {
    console.error('Error updating contact:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete('/make-server-bfdaa8c0/api/contacts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const index = mockData.contacts.findIndex(c => c.id === id);
    
    if (index !== -1) {
      mockData.contacts.splice(index, 1);
      console.log('✅ Mock contact deleted:', id);
    }
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting contact:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Businesses endpoints
app.get('/make-server-bfdaa8c0/api/businesses', async (c) => {
  console.log('✅ Returning mock businesses data');
  return c.json(mockData.businesses);
});

// Accounts endpoints (Chart of Accounts)
app.get('/make-server-bfdaa8c0/api/accounts', async (c) => {
  console.log('✅ Returning mock accounts data');
  return c.json(mockData.accounts);
});

app.post('/make-server-bfdaa8c0/api/accounts', async (c) => {
  try {
    const data = await c.req.json();
    const id = crypto.randomUUID();
    const account = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    mockData.accounts.push(account);
    console.log('✅ Mock account created:', id);
    return c.json(account);
  } catch (error: any) {
    console.error('Error creating account:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.put('/make-server-bfdaa8c0/api/accounts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    const index = mockData.accounts.findIndex((a: any) => a.id === id);
    
    if (index === -1) {
      return c.json({ error: 'Account not found' }, 404);
    }
    
    mockData.accounts[index] = {
      ...mockData.accounts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Mock account updated:', id);
    return c.json(mockData.accounts[index]);
  } catch (error: any) {
    console.error('Error updating account:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.delete('/make-server-bfdaa8c0/api/accounts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const index = mockData.accounts.findIndex((a: any) => a.id === id);
    
    if (index !== -1) {
      mockData.accounts.splice(index, 1);
      console.log('✅ Mock account deleted:', id);
    }
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Health check endpoint
app.get("/make-server-bfdaa8c0/health", (c) => {
  return c.json({ status: "ok", mode: "mock" });
});

console.log('🚀 Mock ERP Server started - NO DATABASE CONNECTION');
console.log('📦 All data is stored in memory only');

Deno.serve(app.fetch);
# 🚀 Quick Start: Enable Backend & Database

## 📋 الوضع الحالي - Current Status

```
❌ Backend:  DISABLED (offline mode)
❌ Database: NOT CONNECTED
✅ Frontend: WORKING (with mock data)
```

---

## ⚡ Option 1: Enable Supabase (5 Minutes Setup!)

### Step 1: Get Supabase Credentials

Visit: https://app.supabase.com

```bash
1. Create new project
2. Wait 2 minutes for setup
3. Go to Settings → API
4. Copy:
   - Project URL: https://xxxxx.supabase.co
   - anon/public key: eyJhbGc...
```

### Step 2: Update Credentials

```typescript
// File: /utils/supabase/info.ts
export const projectId = 'YOUR_PROJECT_ID'; // from URL
export const publicAnonKey = 'YOUR_ANON_KEY'; // from API settings
```

### Step 3: Enable Backend in Code

```typescript
// File: /src/lib/supabase.ts

// Line 16 - Change from:
let backendAvailable = false; // Start as false - ALWAYS USE MOCK DATA

// To:
let backendAvailable = true; // ✅ Enable backend
```

```typescript
// Line 24-29 - Change from:
async function checkBackendAvailability(): Promise<boolean> {
  // ALWAYS RETURN FALSE - Force offline mode
  backendAvailable = false;
  console.log('🔧 Backend check disabled - using offline mode with mock data');
  return false;
}

// To:
async function checkBackendAvailability(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    });
    backendAvailable = response.ok;
    return backendAvailable;
  } catch (error) {
    backendAvailable = false;
    return false;
  }
}
```

```typescript
// Line 165-168 - Change from:
export async function safeApiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  // ALWAYS use mock data - backend is disabled
  return getMockData(endpoint, options);
}

// To:
export async function safeApiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  // Check backend availability periodically
  const now = Date.now();
  if (now - lastCheckTime > CHECK_INTERVAL) {
    lastCheckTime = now;
    await checkBackendAvailability();
  }

  // If backend is unavailable, use mock data
  if (!backendAvailable) {
    return getMockData(endpoint, options);
  }

  try {
    return await apiRequest(endpoint, options);
  } catch (error: any) {
    if (error?.message === 'BACKEND_UNAVAILABLE') {
      return getMockData(endpoint, options);
    }
    throw error;
  }
}
```

### Step 4: Create Database Tables

Go to: Supabase Dashboard → SQL Editor

```sql
-- ============================================
-- EMERALD ERP - DATABASE SCHEMA v1.0
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Contacts Table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  type TEXT CHECK (type IN ('customer', 'supplier', 'both')),
  balance DECIMAL(15,2) DEFAULT 0,
  tax_number TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Iraq',
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Chart of Accounts
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT,
  parent_code TEXT,
  balance DECIMAL(15,2) DEFAULT 0,
  currency TEXT DEFAULT 'IQD',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT UNIQUE NOT NULL,
  contact_id UUID REFERENCES contacts(id),
  invoice_date DATE NOT NULL,
  due_date DATE,
  subtotal DECIMAL(15,2) NOT NULL,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  status TEXT CHECK (status IN ('draft', 'pending', 'paid', 'overdue', 'cancelled')),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Invoice Items
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(15,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  discount_rate DECIMAL(5,2) DEFAULT 0,
  total DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. Journal Entries
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT UNIQUE NOT NULL,
  entry_date DATE NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('draft', 'posted')),
  total_debit DECIMAL(15,2) NOT NULL,
  total_credit DECIMAL(15,2) NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  posted_at TIMESTAMP
);

-- 7. Journal Entry Lines
CREATE TABLE journal_entry_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id UUID REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_code TEXT NOT NULL,
  description TEXT,
  debit DECIMAL(15,2) DEFAULT 0,
  credit DECIMAL(15,2) DEFAULT 0,
  cost_center TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Inventory Items
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT,
  unit_of_measure TEXT,
  quantity DECIMAL(10,2) DEFAULT 0,
  unit_cost DECIMAL(15,2) DEFAULT 0,
  selling_price DECIMAL(15,2) DEFAULT 0,
  reorder_level DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. Employees
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_number TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  department TEXT,
  position TEXT,
  hire_date DATE,
  salary DECIMAL(15,2),
  country TEXT DEFAULT 'Iraq',
  labor_law TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 10. Attendance
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id),
  attendance_date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status TEXT CHECK (status IN ('present', 'absent', 'late', 'leave')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_contact ON invoices(contact_id);
CREATE INDEX idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ✅ Database schema created!
```

### Step 5: Create Backend API (Supabase Edge Function)

In Supabase Dashboard:
1. Go to Edge Functions
2. Click "Create Function"
3. Name: `make-server`
4. Paste this code:

```typescript
// Supabase Edge Function - Emerald ERP API
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Health check
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // GET /api/contacts
    if (path === '/api/contacts' && method === 'GET') {
      const { data, error } = await supabaseClient
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // POST /api/contacts
    if (path === '/api/contacts' && method === 'POST') {
      const body = await req.json()
      const { data, error } = await supabaseClient
        .from('contacts')
        .insert([body])
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // PUT /api/contacts/:id
    if (path.startsWith('/api/contacts/') && method === 'PUT') {
      const id = path.split('/').pop()
      const body = await req.json()
      const { data, error } = await supabaseClient
        .from('contacts')
        .update(body)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // DELETE /api/contacts/:id
    if (path.startsWith('/api/contacts/') && method === 'DELETE') {
      const id = path.split('/').pop()
      const { error } = await supabaseClient
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) throw error
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // GET /api/dashboard
    if (path === '/api/dashboard' && method === 'GET') {
      // Get stats from multiple tables
      const [contacts, invoices, employees] = await Promise.all([
        supabaseClient.from('contacts').select('*', { count: 'exact', head: true }),
        supabaseClient.from('invoices').select('*'),
        supabaseClient.from('employees').select('*', { count: 'exact', head: true }),
      ])

      const stats = {
        contacts: { total: contacts.count || 0 },
        invoices: {
          total: invoices.data?.length || 0,
          pending: invoices.data?.filter(i => i.status === 'pending').length || 0,
          paid: invoices.data?.filter(i => i.status === 'paid').length || 0,
        },
        employees: { total: employees.count || 0 },
      }

      return new Response(JSON.stringify(stats), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Default: 404
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

### Step 6: Test It!

```bash
1. Restart your application
2. Go to Contacts page
3. Add a new contact
4. Check Supabase Dashboard → Table Editor → contacts
5. You should see the new contact! ✅
```

---

## 🎯 Option 2: Custom Node.js Backend (Full Guide)

### Quick Setup (10 minutes)

```bash
# 1. Create backend folder
mkdir emerald-erp-backend
cd emerald-erp-backend

# 2. Initialize project
npm init -y

# 3. Install dependencies
npm install express pg cors dotenv bcrypt jsonwebtoken
npm install -D typescript @types/express @types/node @types/pg ts-node nodemon

# 4. Setup TypeScript
npx tsc --init
```

### Create Server

```typescript
// File: src/index.ts
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'emerald_erp',
  password: 'your_password',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/contacts
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, type, balance } = req.body;
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, type, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, type, balance || 0]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
```

### Update Frontend

```typescript
// File: /src/lib/supabase.ts
export const API_BASE_URL = 'http://localhost:3000';
let backendAvailable = true;
```

### Run It

```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

---

## ✅ Verification Checklist

```
□ Backend responds to /health
□ Can create contact via API
□ Data persists in database
□ Frontend shows real data
□ Authentication works
□ CORS configured correctly
```

---

## 🚨 Common Issues

### Issue 1: CORS Error
```typescript
// Add to backend:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue 2: Database Connection Failed
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check connection string
psql -U postgres -d emerald_erp
```

### Issue 3: 404 Not Found
```typescript
// Check API_BASE_URL matches backend
console.log('API URL:', API_BASE_URL);
```

---

## 📞 Need Help?

Check these files:
- `/SYSTEM_ARCHITECTURE.md` - Full architecture details
- `/src/lib/supabase.ts` - API configuration
- `/src/lib/mockData.ts` - Mock data structure

---

**🎉 بعد التفعيل، النظام سيعمل بقاعدة بيانات حقيقية!**

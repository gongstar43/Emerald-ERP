# 🏗️ Emerald ERP - Architecture Diagram

## 🔴 CURRENT ARCHITECTURE (Offline Mode)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  EMERALD ERP FRONTEND (React + TypeScript)                │ │
│  │  http://localhost:5173                                    │ │
│  │                                                           │ │
│  │  📄 Pages (165 total):                                    │ │
│  │    ├─ Dashboard.tsx                                       │ │
│  │    ├─ Accounting (30 pages)                               │ │
│  │    ├─ Sales (15 pages)                                    │ │
│  │    ├─ Purchases (12 pages)                                │ │
│  │    ├─ Inventory (15 pages)                                │ │
│  │    ├─ HR (20 pages)                                       │ │
│  │    ├─ Projects (25 pages)                                 │ │
│  │    ├─ Risk & Governance (15 pages)                        │ │
│  │    └─ Settings (28 pages)                                 │ │
│  │                                                           │ │
│  │  🎨 Features:                                             │ │
│  │    ✅ Arabic + English                                     │ │
│  │    ✅ RTL + LTR                                            │ │
│  │    ✅ Light/Dark Theme                                     │ │
│  │    ✅ 12 Currencies                                        │ │
│  │    ✅ Multi-country Laws                                   │ │
│  │    ✅ Expert Advisors                                      │ │
│  └───────────────────────┬─────────────────────────────────────┘ │
│                          │                                       │
│                          │ API Calls                             │
│                          │ safeApiRequest()                      │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  API LAYER (/src/lib/supabase.ts)                         │ │
│  │                                                           │ │
│  │  ❌ backendAvailable = false                              │ │
│  │  ❌ checkBackendAvailability() → always returns false     │ │
│  │  ❌ safeApiRequest() → always uses getMockData()          │ │
│  │                                                           │ │
│  │  Status: DISABLED (offline mode)                          │ │
│  └───────────────────────┬─────────────────────────────────────┘ │
│                          │                                       │
│                          │ Falls back to                         │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  MOCK DATA SERVICE (/src/lib/mockData.ts)                 │ │
│  │                                                           │ │
│  │  📦 Mock Contacts (empty array)                           │ │
│  │  📦 Mock Invoices (empty array)                           │ │
│  │  📦 Mock Employees (empty array)                          │ │
│  │  📦 Mock Dashboard Stats (zeros)                          │ │
│  │                                                           │ │
│  │  💾 Storage: Browser localStorage                         │ │
│  │  ⚠️  Warning: Cleared on browser cache clear              │ │
│  │  ⚠️  Warning: Not shared between users                    │ │
│  │  ⚠️  Warning: Limited to 5-10MB                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

❌ NO DATABASE CONNECTION
❌ NO PERSISTENT STORAGE
❌ NO MULTI-USER SUPPORT
❌ NO CLOUD BACKUP
```

---

## 🟢 TARGET ARCHITECTURE (After Activation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  EMERALD ERP FRONTEND (React + TypeScript)                │ │
│  │  https://emerald-erp.vercel.app                           │ │
│  │                                                           │ │
│  │  Same 165 pages + features                                │ │
│  └───────────────────────┬─────────────────────────────────────┘ │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                           │ HTTPS REST API Calls
                           │ Authorization: Bearer <JWT>
                           │ Content-Type: application/json
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUD BACKEND API                            │
│             (Supabase Edge Functions / Node.js)                 │
│                                                                 │
│  🔌 API Endpoints (239 total):                                  │
│                                                                 │
│  Authentication:                                                │
│    POST   /api/auth/login                                       │
│    POST   /api/auth/register                                    │
│    POST   /api/auth/logout                                      │
│    GET    /api/auth/me                                          │
│                                                                 │
│  Accounting (30 endpoints):                                     │
│    GET    /api/accounts                                         │
│    POST   /api/accounts                                         │
│    PUT    /api/accounts/:id                                     │
│    DELETE /api/accounts/:id                                     │
│    GET    /api/journal-entries                                  │
│    POST   /api/journal-entries                                  │
│    GET    /api/reports/balance-sheet                            │
│    GET    /api/reports/trial-balance                            │
│    GET    /api/reports/profit-loss                              │
│    ...                                                          │
│                                                                 │
│  Sales (20 endpoints):                                          │
│    GET    /api/customers                                        │
│    POST   /api/customers                                        │
│    GET    /api/sales-invoices                                   │
│    POST   /api/sales-invoices                                   │
│    GET    /api/quotations                                       │
│    POST   /api/sales-orders                                     │
│    ...                                                          │
│                                                                 │
│  Purchases (20 endpoints):                                      │
│    GET    /api/suppliers                                        │
│    POST   /api/suppliers                                        │
│    GET    /api/purchase-orders                                  │
│    POST   /api/purchase-invoices                                │
│    ...                                                          │
│                                                                 │
│  Inventory (25 endpoints):                                      │
│    GET    /api/inventory                                        │
│    POST   /api/stock-movements                                  │
│    GET    /api/warehouses                                       │
│    ...                                                          │
│                                                                 │
│  HR (35 endpoints):                                             │
│    GET    /api/employees                                        │
│    POST   /api/employees                                        │
│    GET    /api/attendance                                       │
│    POST   /api/payroll                                          │
│    GET    /api/leaves                                           │
│    ...                                                          │
│                                                                 │
│  Projects (40 endpoints):                                       │
│    GET    /api/projects                                         │
│    POST   /api/projects                                         │
│    GET    /api/tasks                                            │
│    POST   /api/milestones                                       │
│    ...                                                          │
│                                                                 │
│  Risk & Governance (30 endpoints):                              │
│    GET    /api/risks                                            │
│    POST   /api/risks                                            │
│    GET    /api/compliance                                       │
│    ...                                                          │
│                                                                 │
│  Reports (39 endpoints):                                        │
│    GET    /api/reports/financial                                │
│    GET    /api/reports/sales                                    │
│    GET    /api/analytics/dashboard                              │
│    ...                                                          │
│                                                                 │
│  🔒 Security:                                                    │
│    ✅ JWT Authentication                                         │
│    ✅ Role-based Authorization                                   │
│    ✅ Request Validation                                         │
│    ✅ Rate Limiting                                              │
│    ✅ SQL Injection Protection                                   │
│    ✅ CORS Configuration                                         │
│                                                                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ SQL Queries
                          │ SELECT, INSERT, UPDATE, DELETE
                          │ Transactions, Joins, Indexes
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                        │
│                                                                 │
│  📊 Tables (50+ tables):                                        │
│                                                                 │
│  Core Tables:                                                   │
│    ├─ users (id, email, name, role, permissions)               │
│    ├─ companies (id, name, country, laws)                      │
│    └─ settings (id, key, value, company_id)                    │
│                                                                 │
│  Accounting:                                                    │
│    ├─ accounts (180 accounts)                                  │
│    ├─ journal_entries                                          │
│    ├─ journal_entry_lines                                      │
│    ├─ cost_centers                                             │
│    └─ fiscal_years                                             │
│                                                                 │
│  Sales:                                                         │
│    ├─ customers                                                │
│    ├─ sales_invoices                                           │
│    ├─ sales_invoice_items                                      │
│    ├─ quotations                                               │
│    └─ sales_orders                                             │
│                                                                 │
│  Purchases:                                                     │
│    ├─ suppliers                                                │
│    ├─ purchase_orders                                          │
│    ├─ purchase_invoices                                        │
│    └─ goods_receipts                                           │
│                                                                 │
│  Inventory:                                                     │
│    ├─ inventory_items                                          │
│    ├─ warehouses                                               │
│    ├─ stock_movements                                          │
│    ├─ serial_numbers                                           │
│    └─ batch_numbers                                            │
│                                                                 │
│  HR:                                                            │
│    ├─ employees                                                │
│    ├─ attendance                                               │
│    ├─ payroll                                                  │
│    ├─ leaves                                                   │
│    ├─ benefits                                                 │
│    └─ end_of_service                                           │
│                                                                 │
│  Projects:                                                      │
│    ├─ projects                                                 │
│    ├─ tasks                                                    │
│    ├─ milestones                                               │
│    ├─ resources                                                │
│    └─ time_tracking                                            │
│                                                                 │
│  Risk & Governance:                                             │
│    ├─ risks                                                    │
│    ├─ controls                                                 │
│    ├─ compliance_checks                                        │
│    └─ audit_logs                                               │
│                                                                 │
│  🔐 Features:                                                    │
│    ✅ ACID Transactions                                          │
│    ✅ Foreign Key Constraints                                    │
│    ✅ Indexes for Performance                                    │
│    ✅ Automatic Timestamps                                       │
│    ✅ Row Level Security (RLS)                                   │
│    ✅ Automated Backups                                          │
│    ✅ Point-in-time Recovery                                     │
│                                                                 │
│  💾 Storage:                                                     │
│    ✅ Persistent (永久)                                          │
│    ✅ Scalable (up to 100GB+)                                   │
│    ✅ Multi-user Support                                        │
│    ✅ Real-time Sync                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

✅ FULL DATABASE CONNECTION
✅ PERSISTENT STORAGE
✅ MULTI-USER SUPPORT
✅ AUTOMATED CLOUD BACKUP
```

---

## 📊 DATA FLOW COMPARISON

### BEFORE (Current - Offline):
```
User Action (Add Contact)
    ↓
Frontend validates input
    ↓
safeApiRequest('/api/contacts', { method: 'POST', body: data })
    ↓
API Layer checks: backendAvailable = false ❌
    ↓
Falls back to getMockData()
    ↓
Mock Data Service generates temporary ID
    ↓
Saves to localStorage (browser only)
    ↓
Returns success to Frontend
    ↓
UI updates with new contact
    ↓
⚠️  Data is TEMPORARY (cleared on cache clear)
⚠️  Not shared with other users
⚠️  No backup
```

### AFTER (With Database):
```
User Action (Add Contact)
    ↓
Frontend validates input
    ↓
safeApiRequest('/api/contacts', { method: 'POST', body: data })
    ↓
API Layer checks: backendAvailable = true ✅
    ↓
Sends HTTPS request to Backend API
    Authorization: Bearer <JWT>
    ↓
Backend API validates JWT token
    ↓
Backend validates request data
    ↓
Backend executes SQL:
    INSERT INTO contacts (name, email, phone, type)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    ↓
PostgreSQL saves data PERMANENTLY
    ↓
Backend returns new contact with UUID
    ↓
Frontend receives response
    ↓
UI updates with new contact
    ↓
✅ Data is PERMANENT (saved in cloud)
✅ Shared with all authorized users
✅ Automatically backed up
✅ Can be accessed from any device
```

---

## 🔄 AUTHENTICATION FLOW (After Activation)

```
┌──────────────┐
│  User Login  │
│  Page        │
└──────┬───────┘
       │
       │ 1. User enters email + password
       ▼
┌──────────────────────┐
│  POST /api/auth/login│
│  { email, password } │
└──────┬───────────────┘
       │
       │ 2. API validates credentials
       ▼
┌─────────────────────────────┐
│  Database checks:           │
│  SELECT * FROM users        │
│  WHERE email = $1           │
│  AND password_hash = $2     │
└──────┬──────────────────────┘
       │
       │ 3. Match found ✅
       ▼
┌─────────────────────────────┐
│  Generate JWT Token:        │
│  {                          │
│    userId: "uuid",          │
│    email: "user@email.com", │
│    role: "admin",           │
│    exp: timestamp           │
│  }                          │
└──────┬──────────────────────┘
       │
       │ 4. Return token
       ▼
┌─────────────────────────────┐
│  Frontend stores token:     │
│  localStorage.setItem(      │
│    'auth_token',            │
│    token                    │
│  )                          │
└──────┬──────────────────────┘
       │
       │ 5. Include in all requests
       ▼
┌─────────────────────────────┐
│  Every API call:            │
│  Authorization:             │
│    Bearer <JWT>             │
└─────────────────────────────┘
```

---

## 🎯 SUMMARY

| Component | Current (Offline) | After Activation |
|-----------|------------------|------------------|
| **Frontend** | ✅ Complete (165 pages) | ✅ Same |
| **API Layer** | ⚠️ Disabled | ✅ Active (239 endpoints) |
| **Backend** | ❌ None | ✅ Supabase / Node.js |
| **Database** | ❌ None | ✅ PostgreSQL (50+ tables) |
| **Storage** | localStorage (5MB) | ✅ Cloud (unlimited) |
| **Multi-user** | ❌ No | ✅ Yes |
| **Backup** | ❌ None | ✅ Automated |
| **Security** | ❌ None | ✅ JWT + RLS |
| **Cost** | $0 | $0-25/month |
| **Setup Time** | - | 30 min - 1 week |

---

**📁 Next Steps:** Check `/DATABASE_STATUS_AR.md` for activation guide

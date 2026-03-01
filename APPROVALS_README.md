# 🎯 Approvals Page - صفحة الموافقات

## Quick Overview

Professional, full-featured Approvals page for managing all approval requests across the ERP system.

## ✨ Key Features

### 📊 Statistics Dashboard
- Pending, Approved, Rejected, Urgent counts
- Real-time updates
- Color-coded indicators

### 🔍 Advanced Filtering
- Text search
- Filter by type (Leave, Expense, Purchase, Project, Payment)
- Filter by priority (Low, Medium, High, Urgent)
- Filter by status (All, Pending, Approved, Rejected)

### 👁️ Request Details
- Full request information
- Requester details
- Amount and currency
- Due date with remaining days
- Approval level progress bar
- Description

### ⚡ Quick Actions
- ✅ One-click approval
- ❌ Reject with notes
- 👁️ View full details

## 🎨 Supported Request Types

| Type | Icon | Color | Description |
|------|------|-------|-------------|
| Leave | 📅 | Blue | Employee leave requests |
| Expense | 💰 | Green | Business expenses |
| Purchase | 🛒 | Purple | Equipment purchases |
| Project | 💼 | Orange | New projects |
| Payment | 💵 | Indigo | Vendor payments |

## 🔴 Priority Levels

- 🔴 **Urgent** - Immediate action required
- 🟠 **High** - High priority
- 🔵 **Medium** - Medium priority
- ⚫ **Low** - Low priority

## 🌐 Localization

Full support for:
- Arabic (RTL) 🇸🇦
- English (LTR) 🇺🇸

## 📱 Responsive Design

Works perfectly on:
- 📱 Mobile (320px+)
- 💻 Tablet (768px+)
- 🖥️ Desktop (1024px+)

## 🔗 API Endpoints

```typescript
GET  /api/approvals       // Get all approvals
PUT  /api/approvals/:id   // Update approval status
GET  /api/dashboard       // Dashboard stats
```

## 🚀 Usage

```typescript
import Approvals from './pages/Approvals';

// Route
<Route path="/approvals" element={<Approvals />} />
```

## 📦 Mock Data

5 sample approval requests included:
- APP-001: Leave request
- APP-002: Travel expenses (5,500 SAR)
- APP-003: Equipment purchase (15,000 SAR)
- APP-004: Website development (85,000 SAR)
- APP-005: Vendor payment (25,000 SAR)

## 🎯 Status

✅ **100% Complete** - Ready for production

---

**Version:** 1.0.0  
**Date:** February 27, 2026  
**Author:** Figma Make

import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function ProjectBudget() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    {
      name: 'projectCode',
      label: { ar: 'رمز المشروع', en: 'Project Code' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'projectName',
      label: { ar: 'اسم المشروع', en: 'Project Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'category',
      label: { ar: 'فئة الميزانية', en: 'Budget Category' },
      type: 'select' as const,
      options: [
        { value: 'labor', label: { ar: 'العمالة', en: 'Labor' } },
        { value: 'materials', label: { ar: 'المواد', en: 'Materials' } },
        { value: 'equipment', label: { ar: 'المعدات', en: 'Equipment' } },
        { value: 'subcontractors', label: { ar: 'مقاولو الباطن', en: 'Subcontractors' } },
        { value: 'overhead', label: { ar: 'المصروفات العامة', en: 'Overhead' } },
        { value: 'contingency', label: { ar: 'احتياطي', en: 'Contingency' } },
      ],
      required: true,
    },
    {
      name: 'plannedBudget',
      label: { ar: 'الميزانية المخططة', en: 'Planned Budget' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'actualSpent',
      label: { ar: 'المصروف الفعلي', en: 'Actual Spent' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'committed',
      label: { ar: 'الملتزم به', en: 'Committed' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'forecastCost',
      label: { ar: 'التكلفة المتوقعة', en: 'Forecast Cost' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'startDate',
      label: { ar: 'تاريخ البداية', en: 'Start Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'endDate',
      label: { ar: 'تاريخ النهاية', en: 'End Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'notes',
      label: { ar: 'ملاحظات', en: 'Notes' },
      type: 'textarea' as const,
      col: 2,
    },
  ];

  const columns = [
    {
      key: 'projectCode',
      label: { ar: 'المشروع', en: 'Project' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-mono font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.projectName}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: { ar: 'الفئة', en: 'Category' },
      render: (value: string) => {
        const categoryMap: Record<string, any> = {
          labor: { ar: 'العمالة', en: 'Labor', color: 'bg-blue-100 text-blue-800' },
          materials: { ar: 'المواد', en: 'Materials', color: 'bg-green-100 text-green-800' },
          equipment: { ar: 'المعدات', en: 'Equipment', color: 'bg-purple-100 text-purple-800' },
          subcontractors: { ar: 'مقاولو الباطن', en: 'Subcontractors', color: 'bg-orange-100 text-orange-800' },
          overhead: { ar: 'المصروفات العامة', en: 'Overhead', color: 'bg-gray-100 text-gray-800' },
          contingency: { ar: 'احتياطي', en: 'Contingency', color: 'bg-yellow-100 text-yellow-800' },
        };
        return (
          <Badge className={categoryMap[value]?.color}>
            {locale === 'ar' ? categoryMap[value]?.ar : categoryMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'plannedBudget',
      label: { ar: 'الميزانية المخططة', en: 'Planned Budget' },
      align: 'right' as const,
      render: (value: number) => formatCurrency(value),
    },
    {
      key: 'actualSpent',
      label: { ar: 'المصروف الفعلي', en: 'Actual Spent' },
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-semibold text-orange-600">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'committed',
      label: { ar: 'الملتزم به', en: 'Committed' },
      align: 'right' as const,
      render: (value: number) => formatCurrency(value || 0),
    },
    {
      key: 'remaining',
      label: { ar: 'المتبقي', en: 'Remaining' },
      align: 'right' as const,
      render: (_: any, item: any) => {
        const remaining = item.plannedBudget - item.actualSpent - (item.committed || 0);
        const color = remaining >= 0 ? 'text-green-600' : 'text-red-600';
        return <span className={`font-semibold ${color}`}>{formatCurrency(remaining)}</span>;
      },
    },
    {
      key: 'variance',
      label: { ar: 'الانحراف', en: 'Variance' },
      align: 'right' as const,
      render: (_: any, item: any) => {
        const variance = item.plannedBudget - item.actualSpent;
        const percentage = ((variance / item.plannedBudget) * 100).toFixed(1);
        const color = variance >= 0 ? 'text-green-600' : 'text-red-600';
        return (
          <div className={`font-semibold ${color}`}>
            <div>{formatCurrency(variance)}</div>
            <div className="text-xs">({percentage}%)</div>
          </div>
        );
      },
    },
    {
      key: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      render: (_: any, item: any) => {
        const spent = item.actualSpent;
        const budget = item.plannedBudget;
        const percentage = (spent / budget) * 100;

        let status, color;
        if (percentage <= 75) {
          status = { ar: 'ضمن الميزانية', en: 'On Budget' };
          color = 'bg-green-600';
        } else if (percentage <= 90) {
          status = { ar: 'تحذير', en: 'Warning' };
          color = 'bg-yellow-600';
        } else if (percentage <= 100) {
          status = { ar: 'حرج', en: 'Critical' };
          color = 'bg-orange-600';
        } else {
          status = { ar: 'تجاوز الميزانية', en: 'Over Budget' };
          color = 'bg-red-600';
        }

        return (
          <Badge className={`${color} text-white`}>
            {locale === 'ar' ? status.ar : status.en}
          </Badge>
        );
      },
    },
  ];

  const mockData = [
    {
      id: '1',
      projectCode: 'PRJ-2024-001',
      projectName: locale === 'ar' ? 'نظام إدارة المبيعات' : 'Sales Management System',
      category: 'labor',
      plannedBudget: 500000,
      actualSpent: 325000,
      committed: 75000,
      forecastCost: 480000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'on_budget',
      notes: locale === 'ar' ? 'سير العمل ضمن الجدول الزمني' : 'On schedule and on budget',
    },
    {
      id: '2',
      projectCode: 'PRJ-2024-001',
      projectName: locale === 'ar' ? 'نظام إدارة المبيعات' : 'Sales Management System',
      category: 'materials',
      plannedBudget: 200000,
      actualSpent: 145000,
      committed: 35000,
      forecastCost: 195000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'on_budget',
      notes: locale === 'ar' ? 'توفير في المواد' : 'Material savings achieved',
    },
    {
      id: '3',
      projectCode: 'PRJ-2024-001',
      projectName: locale === 'ar' ? 'نظام إدارة المبيعات' : 'Sales Management System',
      category: 'equipment',
      plannedBudget: 150000,
      actualSpent: 135000,
      committed: 15000,
      forecastCost: 150000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'on_budget',
      notes: locale === 'ar' ? 'تم شراء جميع المعدات' : 'All equipment purchased',
    },
    {
      id: '4',
      projectCode: 'PRJ-2024-002',
      projectName: locale === 'ar' ? 'منصة التجارة الإلكترونية' : 'E-Commerce Platform',
      category: 'labor',
      plannedBudget: 800000,
      actualSpent: 720000,
      committed: 120000,
      forecastCost: 850000,
      startDate: '2024-02-01',
      endDate: '2024-09-30',
      status: 'critical',
      notes: locale === 'ar' ? 'يحتاج إلى مراجعة الميزانية' : 'Budget review required',
    },
    {
      id: '5',
      projectCode: 'PRJ-2024-002',
      projectName: locale === 'ar' ? 'منصة التجارة الإلكترونية' : 'E-Commerce Platform',
      category: 'subcontractors',
      plannedBudget: 300000,
      actualSpent: 185000,
      committed: 90000,
      forecastCost: 290000,
      startDate: '2024-02-01',
      endDate: '2024-09-30',
      status: 'on_budget',
      notes: locale === 'ar' ? 'تنفيذ جيد من المقاولين' : 'Good contractor performance',
    },
    {
      id: '6',
      projectCode: 'PRJ-2024-003',
      projectName: locale === 'ar' ? 'تطوير تطبيق الجوال' : 'Mobile App Development',
      category: 'labor',
      plannedBudget: 400000,
      actualSpent: 420000,
      committed: 0,
      forecastCost: 420000,
      startDate: '2024-03-01',
      endDate: '2024-07-31',
      status: 'over_budget',
      notes: locale === 'ar' ? 'تجاوز الميزانية - مشاكل تقنية' : 'Over budget - technical issues',
    },
    {
      id: '7',
      projectCode: 'PRJ-2024-003',
      projectName: locale === 'ar' ? 'تطوير تطبيق الجوال' : 'Mobile App Development',
      category: 'contingency',
      plannedBudget: 80000,
      actualSpent: 25000,
      committed: 0,
      forecastCost: 35000,
      startDate: '2024-03-01',
      endDate: '2024-07-31',
      status: 'on_budget',
      notes: locale === 'ar' ? 'احتياطي للطوارئ' : 'Contingency reserve',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'ميزانية المشروع', en: 'Project Budget' }}
      description={{ 
        ar: 'إدارة ميزانيات المشاريع ومراقبة التكاليف - متوافق مع PMBOK 7th', 
        en: 'Manage project budgets and monitor costs - PMBOK 7th Compliant' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        projectCode: '',
        projectName: '',
        category: 'labor',
        plannedBudget: 0,
        actualSpent: 0,
        committed: 0,
        forecastCost: 0,
        startDate: '',
        endDate: '',
        status: 'on_budget',
        notes: '',
      }}
      generateId={(items) => `BUD-${String(items.length + 1).padStart(3, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'on_budget', label: { ar: 'ضمن الميزانية', en: 'On Budget' }, color: 'bg-green-600 text-white' },
        { value: 'warning', label: { ar: 'تحذير', en: 'Warning' }, color: 'bg-yellow-600 text-white' },
        { value: 'critical', label: { ar: 'حرج', en: 'Critical' }, color: 'bg-orange-600 text-white' },
        { value: 'over_budget', label: { ar: 'تجاوز الميزانية', en: 'Over Budget' }, color: 'bg-red-600 text-white' },
      ]}
      stats={[
        {
          label: { ar: 'إجمالي الميزانية', en: 'Total Budget' },
          value: (items) => {
            const total = items.reduce((sum, item) => sum + (item.plannedBudget || 0), 0);
            return formatCurrency(total);
          },
          color: 'text-blue-600',
        },
        {
          label: { ar: 'إجمالي المصروف', en: 'Total Spent' },
          value: (items) => {
            const total = items.reduce((sum, item) => sum + (item.actualSpent || 0), 0);
            return formatCurrency(total);
          },
          color: 'text-orange-600',
        },
        {
          label: { ar: 'المتبقي', en: 'Remaining' },
          value: (items) => {
            const budget = items.reduce((sum, item) => sum + (item.plannedBudget || 0), 0);
            const spent = items.reduce((sum, item) => sum + (item.actualSpent || 0), 0);
            const committed = items.reduce((sum, item) => sum + (item.committed || 0), 0);
            return formatCurrency(budget - spent - committed);
          },
          color: 'text-green-600',
        },
      ]}
    />
  );
}

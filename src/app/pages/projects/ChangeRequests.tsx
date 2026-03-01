import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function ChangeRequests() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    {
      name: 'requestNumber',
      label: { ar: 'رقم الطلب', en: 'Request Number' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'projectCode',
      label: { ar: 'رمز المشروع', en: 'Project Code' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'requestTitle',
      label: { ar: 'عنوان الطلب', en: 'Request Title' },
      type: 'text' as const,
      required: true,
      col: 2,
    },
    {
      name: 'requestType',
      label: { ar: 'نوع التغيير', en: 'Change Type' },
      type: 'select' as const,
      options: [
        { value: 'scope', label: { ar: 'تغيير النطاق', en: 'Scope Change' } },
        { value: 'schedule', label: { ar: 'تغيير الجدول الزمني', en: 'Schedule Change' } },
        { value: 'budget', label: { ar: 'تغيير الميزانية', en: 'Budget Change' } },
        { value: 'quality', label: { ar: 'تغيير الجودة', en: 'Quality Change' } },
        { value: 'resource', label: { ar: 'تغيير الموارد', en: 'Resource Change' } },
        { value: 'risk', label: { ar: 'تغيير المخاطر', en: 'Risk Change' } },
      ],
      required: true,
    },
    {
      name: 'priority',
      label: { ar: 'الأولوية', en: 'Priority' },
      type: 'select' as const,
      options: [
        { value: 'low', label: { ar: 'منخفضة', en: 'Low' } },
        { value: 'medium', label: { ar: 'متوسطة', en: 'Medium' } },
        { value: 'high', label: { ar: 'عالية', en: 'High' } },
        { value: 'critical', label: { ar: 'حرجة', en: 'Critical' } },
      ],
      required: true,
    },
    {
      name: 'requestedBy',
      label: { ar: 'مقدم الطلب', en: 'Requested By' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'requestDate',
      label: { ar: 'تاريخ الطلب', en: 'Request Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'impactCost',
      label: { ar: 'الأثر على التكلفة', en: 'Cost Impact' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'impactDays',
      label: { ar: 'الأثر على المدة (أيام)', en: 'Schedule Impact (days)' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'description',
      label: { ar: 'وصف التغيير', en: 'Change Description' },
      type: 'textarea' as const,
      col: 2,
      required: true,
    },
    {
      name: 'justification',
      label: { ar: 'المبرر', en: 'Justification' },
      type: 'textarea' as const,
      col: 2,
      required: true,
    },
    {
      name: 'reviewedBy',
      label: { ar: 'تمت المراجعة بواسطة', en: 'Reviewed By' },
      type: 'text' as const,
      required: false,
    },
    {
      name: 'reviewDate',
      label: { ar: 'تاريخ المراجعة', en: 'Review Date' },
      type: 'date' as const,
      required: false,
    },
    {
      name: 'decision',
      label: { ar: 'القرار', en: 'Decision' },
      type: 'textarea' as const,
      col: 2,
      required: false,
    },
  ];

  const columns = [
    {
      key: 'requestNumber',
      label: { ar: 'رقم الطلب', en: 'Request #' },
      render: (value: string) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      key: 'projectCode',
      label: { ar: 'المشروع', en: 'Project' },
      render: (value: string) => <span className="font-mono text-sm">{value}</span>,
    },
    {
      key: 'requestTitle',
      label: { ar: 'العنوان', en: 'Title' },
      render: (value: string) => <div className="max-w-xs truncate font-medium">{value}</div>,
    },
    {
      key: 'requestType',
      label: { ar: 'النوع', en: 'Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          scope: { ar: 'النطاق', en: 'Scope', color: 'bg-blue-100 text-blue-800' },
          schedule: { ar: 'الجدول', en: 'Schedule', color: 'bg-purple-100 text-purple-800' },
          budget: { ar: 'الميزانية', en: 'Budget', color: 'bg-green-100 text-green-800' },
          quality: { ar: 'الجودة', en: 'Quality', color: 'bg-orange-100 text-orange-800' },
          resource: { ar: 'الموارد', en: 'Resource', color: 'bg-cyan-100 text-cyan-800' },
          risk: { ar: 'المخاطر', en: 'Risk', color: 'bg-red-100 text-red-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'priority',
      label: { ar: 'الأولوية', en: 'Priority' },
      render: (value: string) => {
        const priorityMap: Record<string, any> = {
          low: { ar: 'منخفضة', en: 'Low', color: 'bg-gray-200 text-gray-800' },
          medium: { ar: 'متوسطة', en: 'Medium', color: 'bg-blue-200 text-blue-800' },
          high: { ar: 'عالية', en: 'High', color: 'bg-orange-200 text-orange-800' },
          critical: { ar: 'حرجة', en: 'Critical', color: 'bg-red-200 text-red-800' },
        };
        return (
          <Badge className={priorityMap[value]?.color}>
            {locale === 'ar' ? priorityMap[value]?.ar : priorityMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'impactCost',
      label: { ar: 'أثر التكلفة', en: 'Cost Impact' },
      align: 'right' as const,
      render: (value: number) => {
        if (!value || value === 0) return <span className="text-muted-foreground">-</span>;
        const color = value > 0 ? 'text-red-600' : 'text-green-600';
        return <span className={`font-semibold ${color}`}>{formatCurrency(Math.abs(value))}</span>;
      },
    },
    {
      key: 'impactDays',
      label: { ar: 'أثر المدة', en: 'Schedule Impact' },
      align: 'right' as const,
      render: (value: number) => {
        if (!value || value === 0) return <span className="text-muted-foreground">-</span>;
        const color = value > 0 ? 'text-red-600' : 'text-green-600';
        const sign = value > 0 ? '+' : '';
        return (
          <span className={`font-semibold ${color}`}>
            {sign}{value} {locale === 'ar' ? 'يوم' : 'days'}
          </span>
        );
      },
    },
    {
      key: 'requestedBy',
      label: { ar: 'مقدم الطلب', en: 'Requested By' },
      render: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      key: 'requestDate',
      label: { ar: 'التاريخ', en: 'Date' },
      render: (value: string) => new Date(value).toLocaleDateString(locale),
    },
    {
      key: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => {
        const statusMap: Record<string, any> = {
          draft: { ar: 'مسودة', en: 'Draft', color: 'bg-gray-400 text-white' },
          submitted: { ar: 'مقدم', en: 'Submitted', color: 'bg-blue-600 text-white' },
          under_review: { ar: 'قيد المراجعة', en: 'Under Review', color: 'bg-purple-600 text-white' },
          approved: { ar: 'موافق عليه', en: 'Approved', color: 'bg-green-600 text-white' },
          rejected: { ar: 'مرفوض', en: 'Rejected', color: 'bg-red-600 text-white' },
          implemented: { ar: 'منفذ', en: 'Implemented', color: 'bg-teal-600 text-white' },
        };
        return (
          <Badge className={statusMap[value]?.className}>
            {locale === 'ar' ? statusMap[value]?.ar : statusMap[value]?.en}
          </Badge>
        );
      },
    },
  ];

  const mockData = [
    {
      id: '1',
      requestNumber: 'CR-2024-001',
      projectCode: 'PRJ-2024-001',
      requestTitle: locale === 'ar' ? 'إضافة وحدة التقارير المتقدمة' : 'Add Advanced Reporting Module',
      requestType: 'scope',
      priority: 'high',
      requestedBy: locale === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      requestDate: '2024-02-15',
      impactCost: 50000,
      impactDays: 20,
      status: 'approved',
      description: locale === 'ar' 
        ? 'إضافة وحدة تقارير متقدمة مع لوحات معلومات تفاعلية'
        : 'Add advanced reporting module with interactive dashboards',
      justification: locale === 'ar'
        ? 'طلب من العميل لتحسين اتخاذ القرارات'
        : 'Client request to improve decision making',
      reviewedBy: locale === 'ar' ? 'خالد سعيد' : 'Khalid Saeed',
      reviewDate: '2024-02-20',
      decision: locale === 'ar' ? 'موافق - سيتم التنفيذ في المرحلة 2' : 'Approved - to be implemented in Phase 2',
    },
    {
      id: '2',
      requestNumber: 'CR-2024-002',
      projectCode: 'PRJ-2024-001',
      requestTitle: locale === 'ar' ? 'تمديد الجدول الزمني للاختبار' : 'Extend Testing Timeline',
      requestType: 'schedule',
      priority: 'medium',
      requestedBy: locale === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      requestDate: '2024-03-01',
      impactCost: 15000,
      impactDays: 10,
      status: 'under_review',
      description: locale === 'ar'
        ? 'تمديد فترة الاختبار لضمان الجودة'
        : 'Extend testing period to ensure quality',
      justification: locale === 'ar'
        ? 'اكتشاف مشاكل تتطلب وقت إضافي للحل'
        : 'Issues discovered requiring additional time to resolve',
      reviewedBy: '',
      reviewDate: '',
      decision: '',
    },
    {
      id: '3',
      requestNumber: 'CR-2024-003',
      projectCode: 'PRJ-2024-002',
      requestTitle: locale === 'ar' ? 'تغيير تقنية قاعدة البيانات' : 'Change Database Technology',
      requestType: 'quality',
      priority: 'critical',
      requestedBy: locale === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      requestDate: '2024-02-10',
      impactCost: -20000,
      impactDays: -5,
      status: 'approved',
      description: locale === 'ar'
        ? 'الانتقال إلى قاعدة بيانات أكثر كفاءة'
        : 'Move to more efficient database',
      justification: locale === 'ar'
        ? 'تحسين الأداء وتقليل التكاليف التشغيلية'
        : 'Improve performance and reduce operational costs',
      reviewedBy: locale === 'ar' ? 'محمد حسن' : 'Mohammed Hassan',
      reviewDate: '2024-02-12',
      decision: locale === 'ar' ? 'موافق - توفير في التكاليف' : 'Approved - cost savings',
    },
    {
      id: '4',
      requestNumber: 'CR-2024-004',
      projectCode: 'PRJ-2024-002',
      requestTitle: locale === 'ar' ? 'زيادة أعضاء الفريق' : 'Increase Team Members',
      requestType: 'resource',
      priority: 'high',
      requestedBy: locale === 'ar' ? 'عبدالله ناصر' : 'Abdullah Nasser',
      requestDate: '2024-03-05',
      impactCost: 80000,
      impactDays: -15,
      status: 'submitted',
      description: locale === 'ar'
        ? 'إضافة 3 مطورين إضافيين لتسريع التنفيذ'
        : 'Add 3 additional developers to accelerate delivery',
      justification: locale === 'ar'
        ? 'تسريع التسليم للوفاء بالموعد النهائي'
        : 'Accelerate delivery to meet deadline',
      reviewedBy: '',
      reviewDate: '',
      decision: '',
    },
    {
      id: '5',
      requestNumber: 'CR-2024-005',
      projectCode: 'PRJ-2024-003',
      requestTitle: locale === 'ar' ? 'إلغاء ميزة الدفع بالعملات المشفرة' : 'Cancel Cryptocurrency Payment Feature',
      requestType: 'scope',
      priority: 'low',
      requestedBy: locale === 'ar' ? 'نورة عبدالرحمن' : 'Noura Abdulrahman',
      requestDate: '2024-02-25',
      impactCost: -30000,
      impactDays: -10,
      status: 'rejected',
      description: locale === 'ar'
        ? 'إزالة ميزة الدفع بالعملات المشفرة'
        : 'Remove cryptocurrency payment feature',
      justification: locale === 'ar'
        ? 'قيود تنظيمية في السوق المستهدف'
        : 'Regulatory constraints in target market',
      reviewedBy: locale === 'ar' ? 'ليلى إبراهيم' : 'Layla Ibrahim',
      reviewDate: '2024-02-28',
      decision: locale === 'ar' ? 'مرفوض - الميزة ضرورية للعملاء الدوليين' : 'Rejected - feature essential for international clients',
    },
    {
      id: '6',
      requestNumber: 'CR-2024-006',
      projectCode: 'PRJ-2024-003',
      requestTitle: locale === 'ar' ? 'تحديث متطلبات الأمان' : 'Update Security Requirements',
      requestType: 'quality',
      priority: 'critical',
      requestedBy: locale === 'ar' ? 'يوسف محمد' : 'Youssef Mohammed',
      requestDate: '2024-03-10',
      impactCost: 45000,
      impactDays: 15,
      status: 'approved',
      description: locale === 'ar'
        ? 'تطبيق معايير أمان أعلى وفقاً لـ ISO 27001'
        : 'Implement higher security standards per ISO 27001',
      justification: locale === 'ar'
        ? 'متطلبات امتثال جديدة من الجهات التنظيمية'
        : 'New compliance requirements from regulators',
      reviewedBy: locale === 'ar' ? 'مريم خالد' : 'Mariam Khalid',
      reviewDate: '2024-03-12',
      decision: locale === 'ar' ? 'موافق - ضروري للامتثال' : 'Approved - necessary for compliance',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'طلبات التغيير', en: 'Change Requests' }}
      description={{ 
        ar: 'إدارة طلبات تغيير المشروع ومراقبة الأثر - متوافق مع PMBOK 7th', 
        en: 'Manage project change requests and monitor impact - PMBOK 7th Compliant' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        requestNumber: '',
        projectCode: '',
        requestTitle: '',
        requestType: 'scope',
        priority: 'medium',
        requestedBy: '',
        requestDate: '',
        impactCost: 0,
        impactDays: 0,
        status: 'draft',
        description: '',
        justification: '',
        reviewedBy: '',
        reviewDate: '',
        decision: '',
      }}
      generateId={(items) => `CR-2024-${String(items.length + 1).padStart(3, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'draft', label: { ar: 'مسودة', en: 'Draft' }, color: 'bg-gray-400 text-white' },
        { value: 'submitted', label: { ar: 'مقدم', en: 'Submitted' }, color: 'bg-blue-600 text-white' },
        { value: 'under_review', label: { ar: 'قيد المراجعة', en: 'Under Review' }, color: 'bg-purple-600 text-white' },
        { value: 'approved', label: { ar: 'موافق عليه', en: 'Approved' }, color: 'bg-green-600 text-white' },
        { value: 'rejected', label: { ar: 'مرفوض', en: 'Rejected' }, color: 'bg-red-600 text-white' },
        { value: 'implemented', label: { ar: 'منفذ', en: 'Implemented' }, color: 'bg-teal-600 text-white' },
      ]}
      stats={[
        {
          label: { ar: 'إجمالي الطلبات', en: 'Total Requests' },
          value: (items) => items.length,
          color: 'text-blue-600',
        },
        {
          label: { ar: 'قيد المراجعة', en: 'Under Review' },
          value: (items) => items.filter(i => i.status === 'under_review' || i.status === 'submitted').length,
          color: 'text-purple-600',
        },
        {
          label: { ar: 'موافق عليها', en: 'Approved' },
          value: (items) => items.filter(i => i.status === 'approved').length,
          color: 'text-green-600',
        },
        {
          label: { ar: 'الأثر على التكلفة', en: 'Cost Impact' },
          value: (items) => {
            const total = items.filter(i => i.status === 'approved').reduce((sum, i) => sum + (i.impactCost || 0), 0);
            return formatCurrency(total);
          },
          color: total => total >= 0 ? 'text-red-600' : 'text-green-600',
        },
      ]}
    />
  );
}

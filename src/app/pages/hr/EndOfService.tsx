import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function EndOfService() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();

  const fields = [
    {
      name: 'employeeCode',
      label: { ar: 'رقم الموظف', en: 'Employee Code' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'employeeName',
      label: { ar: 'اسم الموظف', en: 'Employee Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'terminationType',
      label: { ar: 'نوع الإنهاء', en: 'Termination Type' },
      type: 'select' as const,
      options: [
        { value: 'resignation', label: { ar: 'استقالة', en: 'Resignation' } },
        { value: 'termination', label: { ar: 'إنهاء خدمة', en: 'Termination' } },
        { value: 'retirement', label: { ar: 'تقاعد', en: 'Retirement' } },
        { value: 'contract_end', label: { ar: 'انتهاء عقد', en: 'Contract End' } },
        { value: 'death', label: { ar: 'وفاة', en: 'Death' } },
      ],
      required: true,
    },
    {
      name: 'joinDate',
      label: { ar: 'تاريخ الالتحاق', en: 'Join Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'terminationDate',
      label: { ar: 'تاريخ الإنهاء', en: 'Termination Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'lastSalary',
      label: { ar: 'آخر راتب', en: 'Last Salary' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'serviceYears',
      label: { ar: 'سنوات الخدمة', en: 'Service Years' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'serviceMonths',
      label: { ar: 'أشهر إضافية', en: 'Additional Months' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'eosAmount',
      label: { ar: 'مكافأة نهاية الخدمة', en: 'EOS Amount' },
      type: 'number' as const,
      required: true,
    },
    {
      name: 'vacationBalance',
      label: { ar: 'رصيد الإجازات', en: 'Vacation Balance' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'otherDues',
      label: { ar: 'مستحقات أخرى', en: 'Other Dues' },
      type: 'number' as const,
      required: false,
    },
    {
      name: 'deductions',
      label: { ar: 'الاستقطاعات', en: 'Deductions' },
      type: 'number' as const,
      required: false,
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
      key: 'employeeCode',
      label: { ar: 'رقم الموظف', en: 'Emp Code' },
      render: (value: string) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      key: 'employeeName',
      label: { ar: 'اسم الموظف', en: 'Employee Name' },
    },
    {
      key: 'terminationType',
      label: { ar: 'نوع الإنهاء', en: 'Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          resignation: { ar: 'استقالة', en: 'Resignation', color: 'bg-blue-100 text-blue-800' },
          termination: { ar: 'إنهاء خدمة', en: 'Termination', color: 'bg-red-100 text-red-800' },
          retirement: { ar: 'تقاعد', en: 'Retirement', color: 'bg-purple-100 text-purple-800' },
          contract_end: { ar: 'انتهاء عقد', en: 'Contract End', color: 'bg-orange-100 text-orange-800' },
          death: { ar: 'وفاة', en: 'Death', color: 'bg-gray-100 text-gray-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'serviceYears',
      label: { ar: 'سنوات الخدمة', en: 'Service Years' },
      render: (value: number, item: any) => {
        const years = value;
        const months = item.serviceMonths || 0;
        return (
          <div className="text-sm">
            <span className="font-semibold">{years}</span> {locale === 'ar' ? 'سنة' : 'years'}
            {months > 0 && (
              <span className="text-muted-foreground">
                {' '}{months} {locale === 'ar' ? 'شهر' : 'months'}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'eosAmount',
      label: { ar: 'مكافأة نهاية الخدمة', en: 'EOS Amount' },
      align: 'right' as const,
      render: (value: number) => (
        <span className="font-semibold text-green-600">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'totalSettlement',
      label: { ar: 'إجمالي التسوية', en: 'Total Settlement' },
      align: 'right' as const,
      render: (_: any, item: any) => {
        const total = item.eosAmount + (item.vacationBalance || 0) + (item.otherDues || 0) - (item.deductions || 0);
        return (
          <span className="font-bold text-blue-600">{formatCurrency(total)}</span>
        );
      },
    },
    {
      key: 'terminationDate',
      label: { ar: 'تاريخ الإنهاء', en: 'Term. Date' },
      render: (value: string) => new Date(value).toLocaleDateString(locale),
    },
    {
      key: 'status',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => {
        const statusMap: Record<string, any> = {
          pending: { ar: 'معلق', en: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
          calculated: { ar: 'محسوب', en: 'Calculated', color: 'bg-blue-100 text-blue-800' },
          approved: { ar: 'موافق عليه', en: 'Approved', color: 'bg-green-100 text-green-800' },
          paid: { ar: 'مدفوع', en: 'Paid', color: 'bg-purple-100 text-purple-800' },
        };
        return (
          <Badge className={statusMap[value]?.color}>
            {locale === 'ar' ? statusMap[value]?.ar : statusMap[value]?.en}
          </Badge>
        );
      },
    },
  ];

  const mockData = [
    {
      id: '1',
      employeeCode: 'EMP-2024-045',
      employeeName: locale === 'ar' ? 'أحمد محمد علي' : 'Ahmed Mohammed Ali',
      terminationType: 'resignation',
      joinDate: '2019-03-15',
      terminationDate: '2024-03-15',
      lastSalary: 12000,
      serviceYears: 5,
      serviceMonths: 0,
      eosAmount: 30000,
      vacationBalance: 4800,
      otherDues: 2000,
      deductions: 1500,
      status: 'calculated',
      notes: locale === 'ar' ? 'استقالة لظروف شخصية' : 'Resignation for personal reasons',
    },
    {
      id: '2',
      employeeCode: 'EMP-2024-012',
      employeeName: locale === 'ar' ? 'فاطمة عبدالله' : 'Fatima Abdullah',
      terminationType: 'contract_end',
      joinDate: '2021-06-01',
      terminationDate: '2024-06-01',
      lastSalary: 8500,
      serviceYears: 3,
      serviceMonths: 0,
      eosAmount: 12750,
      vacationBalance: 2833,
      otherDues: 0,
      deductions: 0,
      status: 'approved',
      notes: locale === 'ar' ? 'انتهاء عقد محدد المدة' : 'Fixed-term contract expiry',
    },
    {
      id: '3',
      employeeCode: 'EMP-2024-089',
      employeeName: locale === 'ar' ? 'خالد سعيد' : 'Khalid Saeed',
      terminationType: 'retirement',
      joinDate: '2004-01-10',
      terminationDate: '2024-02-01',
      lastSalary: 18000,
      serviceYears: 20,
      serviceMonths: 1,
      eosAmount: 180000,
      vacationBalance: 12000,
      otherDues: 5000,
      deductions: 3000,
      status: 'paid',
      notes: locale === 'ar' ? 'تقاعد مبكر' : 'Early retirement',
    },
    {
      id: '4',
      employeeCode: 'EMP-2024-123',
      employeeName: locale === 'ar' ? 'سارة أحمد' : 'Sara Ahmed',
      terminationType: 'termination',
      joinDate: '2022-08-20',
      terminationDate: '2024-01-15',
      lastSalary: 7000,
      serviceYears: 1,
      serviceMonths: 5,
      eosAmount: 5250,
      vacationBalance: 1166,
      otherDues: 0,
      deductions: 500,
      status: 'calculated',
      notes: locale === 'ar' ? 'إنهاء خدمة لأسباب إدارية' : 'Termination for administrative reasons',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'مكافآت نهاية الخدمة', en: 'End of Service Benefits' }}
      description={{ 
        ar: 'حساب وإدارة مكافآت نهاية الخدمة وفقاً لنظام العمل السعودي', 
        en: 'Calculate and manage end of service benefits according to Saudi Labor Law' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        employeeCode: '',
        employeeName: '',
        terminationType: 'resignation',
        joinDate: '',
        terminationDate: '',
        lastSalary: 0,
        serviceYears: 0,
        serviceMonths: 0,
        eosAmount: 0,
        vacationBalance: 0,
        otherDues: 0,
        deductions: 0,
        status: 'pending',
        notes: '',
      }}
      generateId={(items) => `EOS-${String(items.length + 1).padStart(3, '0')}`}
      statusField="status"
      statusOptions={[
        { value: 'pending', label: { ar: 'معلق', en: 'Pending' }, color: 'bg-yellow-100 text-yellow-800' },
        { value: 'calculated', label: { ar: 'محسوب', en: 'Calculated' }, color: 'bg-blue-100 text-blue-800' },
        { value: 'approved', label: { ar: 'موافق عليه', en: 'Approved' }, color: 'bg-green-100 text-green-800' },
        { value: 'paid', label: { ar: 'مدفوع', en: 'Paid' }, color: 'bg-purple-100 text-purple-800' },
      ]}
    />
  );
}

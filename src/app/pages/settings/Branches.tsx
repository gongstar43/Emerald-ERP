import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function Branches() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'branchCode',
      label: { ar: 'رمز الفرع', en: 'Branch Code' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'branchName',
      label: { ar: 'اسم الفرع', en: 'Branch Name' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'branchNameAr',
      label: { ar: 'الاسم بالعربية', en: 'Name in Arabic' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'branchType',
      label: { ar: 'نوع الفرع', en: 'Branch Type' },
      type: 'select' as const,
      options: [
        { value: 'head_office', label: { ar: 'المكتب الرئيسي', en: 'Head Office' } },
        { value: 'branch', label: { ar: 'فرع', en: 'Branch' } },
        { value: 'warehouse', label: { ar: 'مستودع', en: 'Warehouse' } },
        { value: 'showroom', label: { ar: 'صالة عرض', en: 'Showroom' } },
        { value: 'service_center', label: { ar: 'مركز خدمة', en: 'Service Center' } },
      ],
      required: true,
    },
    {
      name: 'manager',
      label: { ar: 'مدير الفرع', en: 'Branch Manager' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'country',
      label: { ar: 'الدولة', en: 'Country' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'city',
      label: { ar: 'المدينة', en: 'City' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'address',
      label: { ar: 'العنوان', en: 'Address' },
      type: 'textarea' as const,
      required: true,
      col: 2,
    },
    {
      name: 'phone',
      label: { ar: 'الهاتف', en: 'Phone' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'email',
      label: { ar: 'البريد الإلكتروني', en: 'Email' },
      type: 'text' as const,
      required: true,
    },
    {
      name: 'openingDate',
      label: { ar: 'تاريخ الافتتاح', en: 'Opening Date' },
      type: 'date' as const,
      required: true,
    },
    {
      name: 'isActive',
      label: { ar: 'نشط', en: 'Active' },
      type: 'select' as const,
      options: [
        { value: 'yes', label: { ar: 'نعم', en: 'Yes' } },
        { value: 'no', label: { ar: 'لا', en: 'No' } },
      ],
      required: true,
    },
  ];

  const columns = [
    {
      key: 'branchCode',
      label: { ar: 'الرمز', en: 'Code' },
      render: (value: string) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      key: 'branchName',
      label: { ar: 'اسم الفرع', en: 'Branch Name' },
      render: (value: string, item: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{item.branchNameAr}</div>
        </div>
      ),
    },
    {
      key: 'branchType',
      label: { ar: 'النوع', en: 'Type' },
      render: (value: string) => {
        const typeMap: Record<string, any> = {
          head_office: { ar: 'مكتب رئيسي', en: 'Head Office', color: 'bg-purple-600 text-white' },
          branch: { ar: 'فرع', en: 'Branch', color: 'bg-blue-100 text-blue-800' },
          warehouse: { ar: 'مستودع', en: 'Warehouse', color: 'bg-green-100 text-green-800' },
          showroom: { ar: 'صالة عرض', en: 'Showroom', color: 'bg-orange-100 text-orange-800' },
          service_center: { ar: 'مركز خدمة', en: 'Service Center', color: 'bg-cyan-100 text-cyan-800' },
        };
        return (
          <Badge className={typeMap[value]?.color}>
            {locale === 'ar' ? typeMap[value]?.ar : typeMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'city',
      label: { ar: 'المدينة', en: 'City' },
    },
    {
      key: 'manager',
      label: { ar: 'المدير', en: 'Manager' },
    },
    {
      key: 'phone',
      label: { ar: 'الهاتف', en: 'Phone' },
      render: (value: string) => <span className="font-mono text-sm">{value}</span>,
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-600' : 'bg-gray-400'}>
          {value === 'yes' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      branchCode: 'BR-001',
      branchName: 'Riyadh Head Office',
      branchNameAr: 'المكتب الرئيسي - الرياض',
      branchType: 'head_office',
      manager: locale === 'ar' ? 'عبدالله محمد' : 'Abdullah Mohammed',
      country: locale === 'ar' ? 'السعودية' : 'Saudi Arabia',
      city: locale === 'ar' ? 'الرياض' : 'Riyadh',
      address: locale === 'ar' 
        ? 'حي العليا، طريق الملك فهد، برج الفيصلية'
        : 'Al Olaya, King Fahd Road, Al Faisaliah Tower',
      phone: '+966 11 234 5678',
      email: 'riyadh@company.sa',
      openingDate: '2010-01-15',
      isActive: 'yes',
    },
    {
      id: '2',
      branchCode: 'BR-002',
      branchName: 'Jeddah Branch',
      branchNameAr: 'فرع جدة',
      branchType: 'branch',
      manager: locale === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed',
      country: locale === 'ar' ? 'السعودية' : 'Saudi Arabia',
      city: locale === 'ar' ? 'جدة' : 'Jeddah',
      address: locale === 'ar' 
        ? 'حي الزهراء، طريق الأمير محمد بن عبدالعزيز'
        : 'Al Zahra, Prince Mohammed bin Abdulaziz Road',
      phone: '+966 12 345 6789',
      email: 'jeddah@company.sa',
      openingDate: '2015-03-20',
      isActive: 'yes',
    },
    {
      id: '3',
      branchCode: 'BR-003',
      branchName: 'Dammam Branch',
      branchNameAr: 'فرع الدمام',
      branchType: 'branch',
      manager: locale === 'ar' ? 'خالد سعيد' : 'Khalid Saeed',
      country: locale === 'ar' ? 'السعودية' : 'Saudi Arabia',
      city: locale === 'ar' ? 'الدمام' : 'Dammam',
      address: locale === 'ar' 
        ? 'الكورنيش، شارع الملك عبدالعزيز'
        : 'Corniche, King Abdulaziz Street',
      phone: '+966 13 456 7890',
      email: 'dammam@company.sa',
      openingDate: '2018-06-10',
      isActive: 'yes',
    },
    {
      id: '4',
      branchCode: 'BR-004',
      branchName: 'Central Warehouse',
      branchNameAr: 'المستودع المركزي',
      branchType: 'warehouse',
      manager: locale === 'ar' ? 'سارة علي' : 'Sara Ali',
      country: locale === 'ar' ? 'السعودية' : 'Saudi Arabia',
      city: locale === 'ar' ? 'الرياض' : 'Riyadh',
      address: locale === 'ar' 
        ? 'المدينة الصناعية الثانية'
        : 'Second Industrial City',
      phone: '+966 11 567 8901',
      email: 'warehouse@company.sa',
      openingDate: '2012-09-01',
      isActive: 'yes',
    },
    {
      id: '5',
      branchCode: 'BR-005',
      branchName: 'Dubai Branch',
      branchNameAr: 'فرع دبي',
      branchType: 'branch',
      manager: locale === 'ar' ? 'محمد حسن' : 'Mohammed Hassan',
      country: locale === 'ar' ? 'الإمارات' : 'UAE',
      city: locale === 'ar' ? 'دبي' : 'Dubai',
      address: locale === 'ar' 
        ? 'منطقة دبي المالية العالمية، برج البوابة'
        : 'DIFC, Gate Village',
      phone: '+971 4 234 5678',
      email: 'dubai@company.ae',
      openingDate: '2020-01-10',
      isActive: 'yes',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'إدارة الفروع', en: 'Branches Management' }}
      description={{ 
        ar: 'إدارة فروع الشركة والمواقع المختلفة', 
        en: 'Manage company branches and locations' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        branchCode: '',
        branchName: '',
        branchNameAr: '',
        branchType: 'branch',
        manager: '',
        country: '',
        city: '',
        address: '',
        phone: '',
        email: '',
        openingDate: '',
        isActive: 'yes',
      }}
      generateId={(items) => `BR-${String(items.length + 1).padStart(3, '0')}`}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600' },
        { value: 'no', label: { ar: 'غير نشط', en: 'Inactive' }, color: 'bg-gray-400' },
      ]}
    />
  );
}

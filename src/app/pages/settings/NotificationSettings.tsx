import React from 'react';
import { useLanguage } from '../../../lib/i18n';
import GenericCRUDPage from '../../components/GenericCRUDPage';
import { Badge } from '../../components/ui/badge';

export default function NotificationSettings() {
  const { locale } = useLanguage();

  const fields = [
    {
      name: 'eventType',
      label: { ar: 'نوع الحدث', en: 'Event Type' },
      type: 'select' as const,
      options: [
        { value: 'invoice_created', label: { ar: 'إنشاء فاتورة', en: 'Invoice Created' } },
        { value: 'payment_received', label: { ar: 'استلام دفعة', en: 'Payment Received' } },
        { value: 'order_approved', label: { ar: 'اعتماد طلب', en: 'Order Approved' } },
        { value: 'stock_low', label: { ar: 'مخزون منخفض', en: 'Low Stock' } },
        { value: 'employee_leave', label: { ar: 'طلب إجازة', en: 'Leave Request' } },
        { value: 'task_assigned', label: { ar: 'تعيين مهمة', en: 'Task Assigned' } },
        { value: 'document_expired', label: { ar: 'انتهاء مستند', en: 'Document Expired' } },
        { value: 'user_login', label: { ar: 'تسجيل دخول', en: 'User Login' } },
      ],
      required: true,
    },
    {
      name: 'notificationTitle',
      label: { ar: 'عنوان الإشعار', en: 'Notification Title' },
      type: 'text' as const,
      required: true,
      col: 2,
    },
    {
      name: 'notificationMessage',
      label: { ar: 'رسالة الإشعار', en: 'Notification Message' },
      type: 'textarea' as const,
      required: true,
      col: 2,
    },
    {
      name: 'channels',
      label: { ar: 'القنوات', en: 'Channels' },
      type: 'select' as const,
      options: [
        { value: 'system', label: { ar: 'النظام فقط', en: 'System Only' } },
        { value: 'email', label: { ar: 'بريد إلكتروني', en: 'Email' } },
        { value: 'sms', label: { ar: 'رسالة نصية', en: 'SMS' } },
        { value: 'both', label: { ar: 'بريد + رسالة', en: 'Email + SMS' } },
        { value: 'all', label: { ar: 'جميع القنوات', en: 'All Channels' } },
      ],
      required: true,
    },
    {
      name: 'recipientType',
      label: { ar: 'نوع المستلم', en: 'Recipient Type' },
      type: 'select' as const,
      options: [
        { value: 'user', label: { ar: 'مستخدم محدد', en: 'Specific User' } },
        { value: 'role', label: { ar: 'دور محدد', en: 'Specific Role' } },
        { value: 'department', label: { ar: 'قسم محدد', en: 'Specific Department' } },
        { value: 'all_users', label: { ar: 'جميع المستخدمين', en: 'All Users' } },
        { value: 'custom', label: { ar: 'مخصص', en: 'Custom' } },
      ],
      required: true,
    },
    {
      name: 'priority',
      label: { ar: 'الأولوية', en: 'Priority' },
      type: 'select' as const,
      options: [
        { value: 'low', label: { ar: 'منخفضة', en: 'Low' } },
        { value: 'normal', label: { ar: 'عادية', en: 'Normal' } },
        { value: 'high', label: { ar: 'عالية', en: 'High' } },
        { value: 'urgent', label: { ar: 'عاجلة', en: 'Urgent' } },
      ],
      required: true,
    },
    {
      name: 'autoDelete',
      label: { ar: 'حذف تلقائي بعد', en: 'Auto Delete After' },
      type: 'select' as const,
      options: [
        { value: 'never', label: { ar: 'أبداً', en: 'Never' } },
        { value: '7', label: { ar: '7 أيام', en: '7 days' } },
        { value: '30', label: { ar: '30 يوم', en: '30 days' } },
        { value: '90', label: { ar: '90 يوم', en: '90 days' } },
      ],
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
      key: 'eventType',
      label: { ar: 'نوع الحدث', en: 'Event Type' },
      render: (value: string) => {
        const eventMap: Record<string, any> = {
          invoice_created: { ar: 'فاتورة جديدة', en: 'Invoice', color: 'bg-blue-100 text-blue-800' },
          payment_received: { ar: 'دفعة', en: 'Payment', color: 'bg-green-100 text-green-800' },
          order_approved: { ar: 'اعتماد طلب', en: 'Order', color: 'bg-purple-100 text-purple-800' },
          stock_low: { ar: 'مخزون منخفض', en: 'Low Stock', color: 'bg-red-100 text-red-800' },
          employee_leave: { ar: 'إجازة', en: 'Leave', color: 'bg-orange-100 text-orange-800' },
          task_assigned: { ar: 'مهمة', en: 'Task', color: 'bg-cyan-100 text-cyan-800' },
          document_expired: { ar: 'انتهاء', en: 'Expired', color: 'bg-yellow-100 text-yellow-800' },
          user_login: { ar: 'دخول', en: 'Login', color: 'bg-gray-100 text-gray-800' },
        };
        return (
          <Badge className={eventMap[value]?.color}>
            {locale === 'ar' ? eventMap[value]?.ar : eventMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'notificationTitle',
      label: { ar: 'العنوان', en: 'Title' },
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: 'channels',
      label: { ar: 'القنوات', en: 'Channels' },
      render: (value: string) => {
        const channelMap: Record<string, any> = {
          system: { ar: 'نظام', en: 'System', icon: '🔔' },
          email: { ar: 'بريد', en: 'Email', icon: '📧' },
          sms: { ar: 'رسالة', en: 'SMS', icon: '📱' },
          both: { ar: 'بريد+رسالة', en: 'Email+SMS', icon: '📧📱' },
          all: { ar: 'الكل', en: 'All', icon: '🔔📧📱' },
        };
        return (
          <Badge variant="outline">
            {channelMap[value]?.icon} {locale === 'ar' ? channelMap[value]?.ar : channelMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'recipientType',
      label: { ar: 'المستلم', en: 'Recipient' },
      render: (value: string) => {
        const recipientMap: Record<string, any> = {
          user: { ar: 'مستخدم', en: 'User' },
          role: { ar: 'دور', en: 'Role' },
          department: { ar: 'قسم', en: 'Department' },
          all_users: { ar: 'الجميع', en: 'All' },
          custom: { ar: 'مخصص', en: 'Custom' },
        };
        return <span className="text-sm">{locale === 'ar' ? recipientMap[value]?.ar : recipientMap[value]?.en}</span>;
      },
    },
    {
      key: 'priority',
      label: { ar: 'الأولوية', en: 'Priority' },
      render: (value: string) => {
        const priorityMap: Record<string, any> = {
          low: { ar: 'منخفضة', en: 'Low', color: 'bg-gray-200 text-gray-800' },
          normal: { ar: 'عادية', en: 'Normal', color: 'bg-blue-200 text-blue-800' },
          high: { ar: 'عالية', en: 'High', color: 'bg-orange-200 text-orange-800' },
          urgent: { ar: 'عاجلة', en: 'Urgent', color: 'bg-red-200 text-red-800' },
        };
        return (
          <Badge className={priorityMap[value]?.color}>
            {locale === 'ar' ? priorityMap[value]?.ar : priorityMap[value]?.en}
          </Badge>
        );
      },
    },
    {
      key: 'isActive',
      label: { ar: 'الحالة', en: 'Status' },
      render: (value: string) => (
        <Badge className={value === 'yes' ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
          {value === 'yes' ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'معطل' : 'Inactive')}
        </Badge>
      ),
    },
  ];

  const mockData = [
    {
      id: '1',
      eventType: 'invoice_created',
      notificationTitle: locale === 'ar' ? 'فاتورة جديدة' : 'New Invoice Created',
      notificationMessage: locale === 'ar' 
        ? 'تم إنشاء فاتورة جديدة رقم {invoice_number} بمبلغ {amount}'
        : 'New invoice #{invoice_number} created for {amount}',
      channels: 'both',
      recipientType: 'role',
      priority: 'normal',
      autoDelete: '30',
      isActive: 'yes',
    },
    {
      id: '2',
      eventType: 'payment_received',
      notificationTitle: locale === 'ar' ? 'استلام دفعة' : 'Payment Received',
      notificationMessage: locale === 'ar' 
        ? 'تم استلام دفعة بمبلغ {amount} من العميل {customer_name}'
        : 'Payment of {amount} received from {customer_name}',
      channels: 'email',
      recipientType: 'role',
      priority: 'high',
      autoDelete: '90',
      isActive: 'yes',
    },
    {
      id: '3',
      eventType: 'stock_low',
      notificationTitle: locale === 'ar' ? 'تحذير مخزون منخفض' : 'Low Stock Alert',
      notificationMessage: locale === 'ar' 
        ? 'المخزون منخفض للصنف {item_name}. الكمية المتبقية: {quantity}'
        : 'Low stock alert for {item_name}. Remaining: {quantity}',
      channels: 'all',
      recipientType: 'department',
      priority: 'urgent',
      autoDelete: 'never',
      isActive: 'yes',
    },
    {
      id: '4',
      eventType: 'employee_leave',
      notificationTitle: locale === 'ar' ? 'طلب إجازة جديد' : 'New Leave Request',
      notificationMessage: locale === 'ar' 
        ? 'طلب إجازة من {employee_name} من {start_date} إلى {end_date}'
        : 'Leave request from {employee_name} from {start_date} to {end_date}',
      channels: 'system',
      recipientType: 'role',
      priority: 'normal',
      autoDelete: '7',
      isActive: 'yes',
    },
    {
      id: '5',
      eventType: 'task_assigned',
      notificationTitle: locale === 'ar' ? 'مهمة جديدة' : 'New Task Assigned',
      notificationMessage: locale === 'ar' 
        ? 'تم تعيين مهمة جديدة لك: {task_name}'
        : 'New task assigned to you: {task_name}',
      channels: 'both',
      recipientType: 'user',
      priority: 'high',
      autoDelete: '30',
      isActive: 'yes',
    },
  ];

  return (
    <GenericCRUDPage
      title={{ ar: 'إعدادات الإشعارات', en: 'Notification Settings' }}
      description={{ 
        ar: 'إدارة الإشعارات التلقائية للأحداث المختلفة', 
        en: 'Manage automatic notifications for various events' 
      }}
      fields={fields}
      columns={columns}
      initialData={mockData}
      defaultValues={{
        eventType: 'invoice_created',
        notificationTitle: '',
        notificationMessage: '',
        channels: 'system',
        recipientType: 'user',
        priority: 'normal',
        autoDelete: '30',
        isActive: 'yes',
      }}
      generateId={(items) => String(items.length + 1)}
      statusField="isActive"
      statusOptions={[
        { value: 'yes', label: { ar: 'نشط', en: 'Active' }, color: 'bg-green-600 text-white' },
        { value: 'no', label: { ar: 'معطل', en: 'Inactive' }, color: 'bg-gray-400 text-white' },
      ]}
    />
  );
}

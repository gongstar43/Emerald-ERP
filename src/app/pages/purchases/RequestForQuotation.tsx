import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { useSettings } from '../../../lib/settings';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  FileSpreadsheet,
  Plus,
  Search,
  Eye,
  Edit,
  Send,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  FileText,
  Mail,
} from 'lucide-react';

const mockRFQs = [
  {
    id: 'RFQ-2024-001',
    title: 'طلب عروض أسعار - معدات مكتبية',
    createdDate: '2024-02-15',
    dueDate: '2024-02-25',
    status: 'open',
    suppliersInvited: 5,
    quotationsReceived: 3,
    items: 8,
    estimatedValue: 150000,
    department: 'المشتريات',
  },
  {
    id: 'RFQ-2024-002',
    title: 'طلب عروض أسعار - أجهزة حاسوب',
    createdDate: '2024-02-18',
    dueDate: '2024-02-28',
    status: 'open',
    suppliersInvited: 4,
    quotationsReceived: 2,
    items: 12,
    estimatedValue: 300000,
    department: 'تقنية المعلومات',
  },
  {
    id: 'RFQ-2024-003',
    title: 'طلب عروض أسعار - مواد إنشائية',
    createdDate: '2024-02-10',
    dueDate: '2024-02-20',
    status: 'closed',
    suppliersInvited: 6,
    quotationsReceived: 5,
    items: 15,
    estimatedValue: 500000,
    department: 'المشاريع',
  },
];

export default function RequestForQuotation() {
  const { locale } = useLanguage();
  const { formatCurrency } = useSettings();
  const [rfqs, setRFQs] = useState(mockRFQs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translations = {
    ar: {
      title: 'طلب عروض الأسعار',
      subtitle: 'إدارة طلبات عروض الأسعار من الموردين - ISO 9001',
      addRFQ: 'طلب جديد',
      search: 'بحث...',
      status: 'الحالة',
      all: 'الكل',
      draft: 'مسودة',
      open: 'مفتوح',
      closed: 'مغلق',
      awarded: 'تم الترسية',
      rfqId: 'رقم الطلب',
      rfqTitle: 'عنوان الطلب',
      createdDate: 'تاريخ الإنشاء',
      dueDate: 'تاريخ الاستحقاق',
      suppliersInvited: 'الموردين المدعوين',
      quotationsReceived: 'العروض المستلمة',
      items: 'الأصناف',
      estimatedValue: 'القيمة التقديرية',
      department: 'القسم',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      send: 'إرسال',
      totalRFQs: 'إجمالي الطلبات',
      openRFQs: 'طلبات مفتوحة',
      totalValue: 'القيمة الإجمالية',
      avgResponse: 'متوسط الاستجابة',
    },
    en: {
      title: 'Request for Quotation',
      subtitle: 'Manage RFQs from Suppliers - ISO 9001',
      addRFQ: 'New RFQ',
      search: 'Search...',
      status: 'Status',
      all: 'All',
      draft: 'Draft',
      open: 'Open',
      closed: 'Closed',
      awarded: 'Awarded',
      rfqId: 'RFQ ID',
      rfqTitle: 'RFQ Title',
      createdDate: 'Created Date',
      dueDate: 'Due Date',
      suppliersInvited: 'Suppliers Invited',
      quotationsReceived: 'Quotations Received',
      items: 'Items',
      estimatedValue: 'Estimated Value',
      department: 'Department',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      send: 'Send',
      totalRFQs: 'Total RFQs',
      openRFQs: 'Open RFQs',
      totalValue: 'Total Value',
      avgResponse: 'Avg Response',
    },
  };

  const t = (key: keyof typeof translations['en']) => translations[locale][key];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: t('draft'), variant: 'outline' as const, icon: FileText },
      open: { label: t('open'), variant: 'default' as const, icon: Clock },
      closed: { label: t('closed'), variant: 'secondary' as const, icon: CheckCircle },
      awarded: { label: t('awarded'), variant: 'default' as const, icon: CheckCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = 
      rfq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfq.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openRFQsCount = rfqs.filter(r => r.status === 'open').length;
  const totalValue = rfqs.reduce((sum, r) => sum + r.estimatedValue, 0);
  const avgResponse = rfqs.reduce((sum, r) => sum + (r.quotationsReceived / r.suppliersInvited), 0) / rfqs.length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileSpreadsheet className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
        <Badge className="bg-blue-600 text-white">ISO 9001</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRFQs')}</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rfqs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('openRFQs')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRFQsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalValue')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('avgResponse')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(avgResponse * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder={t('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all')}</SelectItem>
                  <SelectItem value="draft">{t('draft')}</SelectItem>
                  <SelectItem value="open">{t('open')}</SelectItem>
                  <SelectItem value="closed">{t('closed')}</SelectItem>
                  <SelectItem value="awarded">{t('awarded')}</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('addRFQ')}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('rfqId')}</TableHead>
                <TableHead>{t('rfqTitle')}</TableHead>
                <TableHead>{t('department')}</TableHead>
                <TableHead>{t('createdDate')}</TableHead>
                <TableHead>{t('dueDate')}</TableHead>
                <TableHead>{t('suppliersInvited')}</TableHead>
                <TableHead>{t('quotationsReceived')}</TableHead>
                <TableHead>{t('estimatedValue')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRFQs.map((rfq) => (
                <TableRow key={rfq.id}>
                  <TableCell className="font-medium">{rfq.id}</TableCell>
                  <TableCell>{rfq.title}</TableCell>
                  <TableCell>{rfq.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {rfq.createdDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {rfq.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {rfq.suppliersInvited}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{rfq.quotationsReceived}</span>
                      <span className="text-xs text-muted-foreground">
                        ({((rfq.quotationsReceived / rfq.suppliersInvited) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(rfq.estimatedValue)}</TableCell>
                  <TableCell>{getStatusBadge(rfq.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {rfq.status === 'draft' && (
                        <Button variant="ghost" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

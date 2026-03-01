import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  Download,
  RefreshCw,
  CheckCircle,
  Activity,
} from 'lucide-react';
import { toast } from 'sonner';

export default function EVM() {
  const { locale } = useLanguage();
  const [selectedProject, setSelectedProject] = useState('project-1');

  // Earned Value Management Mock Data
  const evmData = {
    projectName: locale === 'ar' ? 'نظام إدارة المخزون' : 'Inventory Management System',
    projectCode: 'PRJ-2024-001',
    startDate: '2024-03-01',
    currentDate: '2024-08-15',
    endDate: '2024-12-31',
    
    // Budget at Completion (BAC)
    BAC: 500000,
    
    // Current values
    PV: 290000,  // Planned Value
    EV: 247000,  // Earned Value
    AC: 265000,  // Actual Cost
    
    // Calculate variances and indices
    get SV() { return this.EV - this.PV; },  // Schedule Variance
    get CV() { return this.EV - this.AC; },  // Cost Variance
    get SPI() { return this.EV / this.PV; }, // Schedule Performance Index
    get CPI() { return this.EV / this.AC; }, // Cost Performance Index
    
    // Forecasting
    get EAC() { return this.BAC / this.CPI; }, // Estimate at Completion
    get ETC() { return this.EAC - this.AC; },  // Estimate to Complete
    get VAC() { return this.BAC - this.EAC; }, // Variance at Completion
    get TCPI() { return (this.BAC - this.EV) / (this.BAC - this.AC); }, // To-Complete Performance Index
  };

  // Historical data for charts
  const historicalData = [
    { 
      month: locale === 'ar' ? 'مارس' : 'Mar',
      PV: 50000,
      EV: 48000,
      AC: 52000,
    },
    { 
      month: locale === 'ar' ? 'أبريل' : 'Apr',
      PV: 100000,
      EV: 95000,
      AC: 102000,
    },
    { 
      month: locale === 'ar' ? 'مايو' : 'May',
      PV: 150000,
      EV: 142000,
      AC: 155000,
    },
    { 
      month: locale === 'ar' ? 'يونيو' : 'Jun',
      PV: 200000,
      EV: 185000,
      AC: 198000,
    },
    { 
      month: locale === 'ar' ? 'يوليو' : 'Jul',
      PV: 250000,
      EV: 225000,
      AC: 242000,
    },
    { 
      month: locale === 'ar' ? 'أغسطس' : 'Aug',
      PV: 290000,
      EV: 247000,
      AC: 265000,
    },
  ];

  // Forecasting data
  const forecastData = [
    ...historicalData,
    { 
      month: locale === 'ar' ? 'سبتمبر' : 'Sep',
      PV: 340000,
      EV: null,
      AC: null,
      forecast: 295000,
    },
    { 
      month: locale === 'ar' ? 'أكتوبر' : 'Oct',
      PV: 390000,
      EV: null,
      AC: null,
      forecast: 355000,
    },
    { 
      month: locale === 'ar' ? 'نوفمبر' : 'Nov',
      PV: 440000,
      EV: null,
      AC: null,
      forecast: 425000,
    },
    { 
      month: locale === 'ar' ? 'ديسمبر' : 'Dec',
      PV: 500000,
      EV: null,
      AC: null,
      forecast: 530000,
    },
  ];

  const getPerformanceStatus = (value: number, threshold: number = 1) => {
    if (value >= threshold) {
      return {
        status: 'good',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: TrendingUp,
      };
    } else {
      return {
        status: 'bad',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: TrendingDown,
      };
    }
  };

  const spiStatus = getPerformanceStatus(evmData.SPI);
  const cpiStatus = getPerformanceStatus(evmData.CPI);

  const keyMetrics = [
    {
      title: locale === 'ar' ? 'القيمة المخططة (PV)' : 'Planned Value (PV)',
      value: evmData.PV.toLocaleString(),
      subtitle: locale === 'ar' ? 'ما كان يجب إنفاقه' : 'What should be spent',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: locale === 'ar' ? 'القيمة المكتسبة (EV)' : 'Earned Value (EV)',
      value: evmData.EV.toLocaleString(),
      subtitle: locale === 'ar' ? 'قيمة العمل المنجز' : 'Value of work done',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: locale === 'ar' ? 'التكلفة الفعلية (AC)' : 'Actual Cost (AC)',
      value: evmData.AC.toLocaleString(),
      subtitle: locale === 'ar' ? 'ما تم إنفاقه فعلاً' : 'What was actually spent',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: locale === 'ar' ? 'الميزانية عند الإنجاز (BAC)' : 'Budget at Completion (BAC)',
      value: evmData.BAC.toLocaleString(),
      subtitle: locale === 'ar' ? 'إجمالي الميزانية' : 'Total budget',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const varianceMetrics = [
    {
      title: locale === 'ar' ? 'انحراف الجدول الزمني (SV)' : 'Schedule Variance (SV)',
      value: evmData.SV,
      formatted: evmData.SV.toLocaleString(),
      percentage: ((evmData.SV / evmData.PV) * 100).toFixed(1) + '%',
      status: evmData.SV >= 0 ? 'good' : 'bad',
      description: locale === 'ar' 
        ? evmData.SV >= 0 ? 'متقدم عن الجدول' : 'متأخر عن الجدول'
        : evmData.SV >= 0 ? 'Ahead of schedule' : 'Behind schedule',
    },
    {
      title: locale === 'ar' ? 'انحراف التكلفة (CV)' : 'Cost Variance (CV)',
      value: evmData.CV,
      formatted: evmData.CV.toLocaleString(),
      percentage: ((evmData.CV / evmData.EV) * 100).toFixed(1) + '%',
      status: evmData.CV >= 0 ? 'good' : 'bad',
      description: locale === 'ar'
        ? evmData.CV >= 0 ? 'تحت الميزانية' : 'تجاوز الميزانية'
        : evmData.CV >= 0 ? 'Under budget' : 'Over budget',
    },
    {
      title: locale === 'ar' ? 'مؤشر أداء الجدول (SPI)' : 'Schedule Performance Index (SPI)',
      value: evmData.SPI,
      formatted: evmData.SPI.toFixed(3),
      percentage: ((evmData.SPI - 1) * 100).toFixed(1) + '%',
      status: evmData.SPI >= 1 ? 'good' : 'bad',
      description: locale === 'ar'
        ? evmData.SPI >= 1 ? 'أداء جيد' : 'أداء ضعيف'
        : evmData.SPI >= 1 ? 'Good performance' : 'Poor performance',
    },
    {
      title: locale === 'ar' ? 'مؤشر أداء التكلفة (CPI)' : 'Cost Performance Index (CPI)',
      value: evmData.CPI,
      formatted: evmData.CPI.toFixed(3),
      percentage: ((evmData.CPI - 1) * 100).toFixed(1) + '%',
      status: evmData.CPI >= 1 ? 'good' : 'bad',
      description: locale === 'ar'
        ? evmData.CPI >= 1 ? 'كفاءة عالية' : 'كفاءة منخفضة'
        : evmData.CPI >= 1 ? 'High efficiency' : 'Low efficiency',
    },
  ];

  const forecastMetrics = [
    {
      title: locale === 'ar' ? 'التقدير عند الإنجاز (EAC)' : 'Estimate at Completion (EAC)',
      value: evmData.EAC.toLocaleString(),
      description: locale === 'ar' ? 'التكلفة المتوقعة النهائية' : 'Expected final cost',
      icon: Target,
    },
    {
      title: locale === 'ar' ? 'التقدير للإكمال (ETC)' : 'Estimate to Complete (ETC)',
      value: evmData.ETC.toLocaleString(),
      description: locale === 'ar' ? 'التكلفة المتبقية المتوقعة' : 'Expected remaining cost',
      icon: Activity,
    },
    {
      title: locale === 'ar' ? 'الانحراف عند الإنجاز (VAC)' : 'Variance at Completion (VAC)',
      value: evmData.VAC.toLocaleString(),
      description: locale === 'ar' 
        ? evmData.VAC >= 0 ? 'توفير متوقع' : 'تجاوز متوقع'
        : evmData.VAC >= 0 ? 'Expected savings' : 'Expected overrun',
      icon: evmData.VAC >= 0 ? TrendingUp : TrendingDown,
      color: evmData.VAC >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: locale === 'ar' ? 'مؤشر الأداء للإكمال (TCPI)' : 'To-Complete Performance Index (TCPI)',
      value: evmData.TCPI.toFixed(3),
      description: locale === 'ar' ? 'الكفاءة المطلوبة للإنجاز' : 'Required efficiency to complete',
      icon: Target,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'إدارة القيمة المكتسبة (EVM)' : 'Earned Value Management (EVM)'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar'
              ? 'تحليل شامل لأداء المشروع والتنبؤ بالتكاليف - متوافق مع PMBOK'
              : 'Comprehensive project performance analysis and cost forecasting - PMBOK Compliant'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التحديث...' : 'Updating...')}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تحديث' : 'Refresh'}
          </Button>
          <Button variant="outline" onClick={() => toast.info(locale === 'ar' ? 'جاري التصدير...' : 'Exporting...')}>
            <Download className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تصدير التقرير' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{evmData.projectName}</h3>
              <p className="text-sm text-muted-foreground font-mono">{evmData.projectCode}</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">{locale === 'ar' ? 'البداية:' : 'Start:'}</span>
                <span className="ml-2 font-medium">{new Date(evmData.startDate).toLocaleDateString(locale)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{locale === 'ar' ? 'الحالي:' : 'Current:'}</span>
                <span className="ml-2 font-medium">{new Date(evmData.currentDate).toLocaleDateString(locale)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{locale === 'ar' ? 'النهاية:' : 'End:'}</span>
                <span className="ml-2 font-medium">{new Date(evmData.endDate).toLocaleDateString(locale)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <div className="text-xs font-medium text-muted-foreground">{metric.title}</div>
              </div>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Variance and Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        {varianceMetrics.map((metric, index) => (
          <Card key={index} className={metric.status === 'good' ? 'border-green-200' : 'border-red-200'}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{metric.title}</span>
                <Badge variant={metric.status === 'good' ? 'default' : 'destructive'} className={metric.status === 'good' ? 'bg-green-600' : ''}>
                  {metric.description}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <span className={`text-3xl font-bold ${metric.status === 'good' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.formatted}
                </span>
                <span className={`text-lg ${metric.status === 'good' ? 'text-green-600' : 'text-red-600'}`}>
                  ({metric.percentage})
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trend">{locale === 'ar' ? 'الاتجاه التاريخي' : 'Historical Trend'}</TabsTrigger>
          <TabsTrigger value="forecast">{locale === 'ar' ? 'التنبؤ' : 'Forecast'}</TabsTrigger>
          <TabsTrigger value="variance">{locale === 'ar' ? 'الانحرافات' : 'Variances'}</TabsTrigger>
        </TabsList>

        <TabsContent value="trend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'منحنى القيمة المكتسبة' : 'Earned Value Curve'}</CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'مقارنة القيمة المخططة والمكتسبة والتكلفة الفعلية' : 'Compare planned, earned value, and actual cost'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => `${value.toLocaleString()} SAR`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PV"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name={locale === 'ar' ? 'القيمة المخططة (PV)' : 'Planned Value (PV)'}
                  />
                  <Line
                    type="monotone"
                    dataKey="EV"
                    stroke="#10b981"
                    strokeWidth={2}
                    name={locale === 'ar' ? 'القيمة المكتسبة (EV)' : 'Earned Value (EV)'}
                  />
                  <Line
                    type="monotone"
                    dataKey="AC"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name={locale === 'ar' ? 'التكلفة الفعلية (AC)' : 'Actual Cost (AC)'}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'التنبؤ بالتكلفة' : 'Cost Forecast'}</CardTitle>
              <CardDescription>
                {locale === 'ar' ? 'التنبؤ بالتكاليف بناءً على الأداء الحالي' : 'Cost projection based on current performance'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorPV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => value ? `${value.toLocaleString()} SAR` : 'N/A'} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="PV"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorPV)"
                    name={locale === 'ar' ? 'المخطط' : 'Planned'}
                  />
                  <Area
                    type="monotone"
                    dataKey="EV"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorEV)"
                    name={locale === 'ar' ? 'المكتسب' : 'Earned'}
                  />
                  <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#f59e0b"
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#colorForecast)"
                    name={locale === 'ar' ? 'التنبؤ' : 'Forecast'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Forecast Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            {forecastMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <metric.icon className={`h-5 w-5 ${metric.color || 'text-blue-600'}`} />
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="variance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'انحراف الجدول الزمني' : 'Schedule Variance'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={historicalData.map(d => ({ ...d, SV: d.EV - d.PV }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `${value.toLocaleString()} SAR`} />
                    <Bar dataKey="SV" fill={(data: any) => data.SV >= 0 ? '#10b981' : '#ef4444'} name="SV" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'انحراف التكلفة' : 'Cost Variance'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={historicalData.map(d => ({ ...d, CV: d.EV - d.AC }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `${value.toLocaleString()} SAR`} />
                    <Bar dataKey="CV" fill={(data: any) => data.CV >= 0 ? '#10b981' : '#ef4444'} name="CV" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'ملخص التحليل' : 'Analysis Summary'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${evmData.SPI < 1 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
              <div className="flex items-start gap-3">
                {evmData.SPI < 1 ? (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold ${evmData.SPI < 1 ? 'text-red-900' : 'text-green-900'}`}>
                    {locale === 'ar' ? 'حالة الجدول الزمني' : 'Schedule Status'}
                  </h4>
                  <p className={`text-sm mt-1 ${evmData.SPI < 1 ? 'text-red-800' : 'text-green-800'}`}>
                    {locale === 'ar'
                      ? `المشروع ${evmData.SPI < 1 ? 'متأخر' : 'متقدم'} بنسبة ${Math.abs(((evmData.SPI - 1) * 100)).toFixed(1)}%. القيمة المكتسبة ${evmData.SV < 0 ? 'أقل' : 'أكثر'} من القيمة المخططة بمقدار ${Math.abs(evmData.SV).toLocaleString()} ريال.`
                      : `Project is ${evmData.SPI < 1 ? 'behind' : 'ahead'} by ${Math.abs(((evmData.SPI - 1) * 100)).toFixed(1)}%. Earned value is ${Math.abs(evmData.SV).toLocaleString()} SAR ${evmData.SV < 0 ? 'below' : 'above'} planned value.`}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${evmData.CPI < 1 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
              <div className="flex items-start gap-3">
                {evmData.CPI < 1 ? (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold ${evmData.CPI < 1 ? 'text-red-900' : 'text-green-900'}`}>
                    {locale === 'ar' ? 'حالة التكلفة' : 'Cost Status'}
                  </h4>
                  <p className={`text-sm mt-1 ${evmData.CPI < 1 ? 'text-red-800' : 'text-green-800'}`}>
                    {locale === 'ar'
                      ? `المشروع ${evmData.CPI < 1 ? 'يتجاوز' : 'تحت'} الميزانية بنسبة ${Math.abs(((evmData.CPI - 1) * 100)).toFixed(1)}%. التكلفة الفعلية ${evmData.CV < 0 ? 'أكثر' : 'أقل'} من القيمة المكتسبة بمقدار ${Math.abs(evmData.CV).toLocaleString()} ريال.`
                      : `Project is ${evmData.CPI < 1 ? 'over' : 'under'} budget by ${Math.abs(((evmData.CPI - 1) * 100)).toFixed(1)}%. Actual cost is ${Math.abs(evmData.CV).toLocaleString()} SAR ${evmData.CV < 0 ? 'above' : 'below'} earned value.`}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${evmData.VAC < 0 ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">
                    {locale === 'ar' ? 'توقعات الإنجاز' : 'Completion Forecast'}
                  </h4>
                  <p className="text-sm text-blue-800 mt-1">
                    {locale === 'ar'
                      ? `من المتوقع أن تكون التكلفة النهائية ${evmData.EAC.toLocaleString()} ريال، ${evmData.VAC < 0 ? 'بتجاوز' : 'بتوفير'} قدره ${Math.abs(evmData.VAC).toLocaleString()} ريال عن الميزانية المخططة. يتطلب إنجاز المشروع ضمن الميزانية كفاءة ${evmData.TCPI.toFixed(3)} في المراحل المتبقية.`
                      : `Expected final cost is ${evmData.EAC.toLocaleString()} SAR, representing ${evmData.VAC < 0 ? 'an overrun' : 'savings'} of ${Math.abs(evmData.VAC).toLocaleString()} SAR. Completing the project within budget requires an efficiency of ${evmData.TCPI.toFixed(3)} for remaining work.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EVM Formulas Reference */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'معادلات EVM المرجعية' : 'EVM Formulas Reference'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{locale === 'ar' ? 'المقياس' : 'Metric'}</TableHead>
                <TableHead>{locale === 'ar' ? 'المعادلة' : 'Formula'}</TableHead>
                <TableHead>{locale === 'ar' ? 'الوصف' : 'Description'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">SV</TableCell>
                <TableCell className="font-mono">EV - PV</TableCell>
                <TableCell>{locale === 'ar' ? 'انحراف الجدول الزمني' : 'Schedule Variance'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CV</TableCell>
                <TableCell className="font-mono">EV - AC</TableCell>
                <TableCell>{locale === 'ar' ? 'انحراف التكلفة' : 'Cost Variance'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SPI</TableCell>
                <TableCell className="font-mono">EV / PV</TableCell>
                <TableCell>{locale === 'ar' ? 'مؤشر أداء الجدول' : 'Schedule Performance Index'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CPI</TableCell>
                <TableCell className="font-mono">EV / AC</TableCell>
                <TableCell>{locale === 'ar' ? 'مؤشر أداء التكلفة' : 'Cost Performance Index'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EAC</TableCell>
                <TableCell className="font-mono">BAC / CPI</TableCell>
                <TableCell>{locale === 'ar' ? 'التقدير عند الإنجاز' : 'Estimate at Completion'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ETC</TableCell>
                <TableCell className="font-mono">EAC - AC</TableCell>
                <TableCell>{locale === 'ar' ? 'التقدير للإكمال' : 'Estimate to Complete'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">VAC</TableCell>
                <TableCell className="font-mono">BAC - EAC</TableCell>
                <TableCell>{locale === 'ar' ? 'الانحراف عند الإنجاز' : 'Variance at Completion'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">TCPI</TableCell>
                <TableCell className="font-mono">(BAC - EV) / (BAC - AC)</TableCell>
                <TableCell>{locale === 'ar' ? 'مؤشر الأداء للإكمال' : 'To-Complete Performance Index'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

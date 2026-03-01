import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { useLanguage } from '../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Construction, 
  ArrowLeft, 
  Home,
  Wrench,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function GenericPage() {
  const { '*': path } = useParams();
  const location = useLocation();
  const { locale } = useLanguage();
  const navigate = useNavigate();

  const getPageTitle = () => {
    if (!path) {
      const pathname = location.pathname.replace('/', '');
      if (!pathname) return locale === 'ar' ? 'الصفحة' : 'Page';
      
      const parts = pathname.split('/');
      const lastPart = parts[parts.length - 1] || parts[parts.length - 2];
      
      // Format the title
      return lastPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1] || parts[parts.length - 2];
    
    return lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCurrentPath = () => {
    return location.pathname;
  };

  const developmentFeatures = [
    {
      icon: Wrench,
      title: locale === 'ar' ? 'قيد التطوير' : 'In Development',
      description: locale === 'ar' 
        ? 'نعمل حالياً على بناء هذه الصفحة بميزات متقدمة' 
        : 'We are currently building this page with advanced features',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      title: locale === 'ar' ? 'قريباً' : 'Coming Soon',
      description: locale === 'ar' 
        ? 'ستكون الصفحة جاهزة في التحديثات القادمة' 
        : 'This page will be ready in upcoming updates',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: CheckCircle2,
      title: locale === 'ar' ? 'جودة عالية' : 'High Quality',
      description: locale === 'ar' 
        ? 'نضمن تقديم تجربة مستخدم استثنائية' 
        : 'We ensure an exceptional user experience',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Sparkles,
      title: locale === 'ar' ? 'ميزات متقدمة' : 'Advanced Features',
      description: locale === 'ar' 
        ? 'الصفحة ستحتوي على مميزات احترافية شاملة' 
        : 'The page will include comprehensive professional features',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
          <p className="text-muted-foreground mt-1">{getCurrentPath()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'رجوع' : 'Back'}
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
              <Construction className="h-10 w-10 text-orange-600 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Construction className="h-6 w-6 text-orange-600" />
            {locale === 'ar' ? 'صفحة قيد التطوير' : 'Page Under Development'}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {locale === 'ar'
              ? 'نعمل بجد لتقديم هذه الصفحة لك قريباً بأفضل جودة ممكنة'
              : 'We are working hard to bring you this page soon with the best possible quality'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {developmentFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${feature.bgColor} border border-opacity-20`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-white`}>
                      <Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${feature.color}`}>{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {locale === 'ar' ? 'حالة التطوير' : 'Development Progress'}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {locale === 'ar' ? 'جاري العمل...' : 'In Progress...'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-3/4"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {locale === 'ar'
                ? 'نقدر صبرك ونعدك بتجربة رائعة'
                : 'We appreciate your patience and promise you a great experience'}
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{locale === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
              {locale === 'ar'
                ? 'يمكنك العودة إلى الصفحة الرئيسية أو استكشاف الصفحات الأخرى المتاحة في النظام.'
                : 'You can return to the home page or explore other available pages in the system.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">
              {locale === 'ar' ? 'الصفحة الرئيسية' : 'Dashboard'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {locale === 'ar'
                ? 'عرض شامل لجميع أنشطة النظام'
                : 'Comprehensive view of all system activities'}
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              {locale === 'ar' ? 'انتقل' : 'Go'}
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">
              {locale === 'ar' ? 'الصفحات المكتملة' : 'Completed Pages'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {locale === 'ar'
                ? '35+ صفحة جاهزة للاستخدام'
                : '35+ pages ready to use'}
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              {locale === 'ar' ? 'استكشف' : 'Explore'}
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">
              {locale === 'ar' ? 'مهامي' : 'My Tasks'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {locale === 'ar'
                ? 'إدارة المهام والأنشطة الشخصية'
                : 'Manage personal tasks and activities'}
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/me/tasks')}>
              {locale === 'ar' ? 'انتقل' : 'Go'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
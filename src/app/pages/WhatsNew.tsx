import React from 'react';
import { useLanguage } from '../../lib/i18n';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Sparkles, 
  Check, 
  ArrowRight,
  Globe,
  Users,
  BarChart3,
  ShoppingCart,
  TrendingUp,
  Briefcase,
  Shield,
  Target,
  BookOpen,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function WhatsNew() {
  const { locale } = useLanguage();
  const navigate = useNavigate();

  const releases = [
    {
      version: 'v6.0.0',
      date: '2024-02-28',
      title: {
        ar: '🌍🎓 النسخة النهائية - نظام متعدد البلدان + فريق الخبراء',
        en: '🌍🎓 Final Edition - Multi-Country + Expert Advisors'
      },
      badge: 'MAJOR UPDATE',
      color: 'from-purple-600 to-pink-600',
      features: {
        ar: [
          {
            category: '🌍 نظام متعدد البلدان',
            items: [
              '5 دول عربية كاملة (العراق، السعودية، الإمارات، مصر، الأردن)',
              '15 قانون متكامل (5 عمل + 5 ضرائب + 5 شركات)',
              'تطبيق تلقائي للقوانين عند اختيار البلد',
              'حسابات دقيقة للضرائب ونهاية الخدمة',
              'معلومات محدثة 2023-2024'
            ]
          },
          {
            category: '🎓 فريق الخبراء الاستشاريين (6 خبراء)',
            items: [
              '📊 محلل الحسابات الخبير - IFRS + Tax + Audit',
              '🛒 خبير المشتريات - Supply Chain + ISO 9001',
              '📈 خبير المبيعات - Strategy + Forecasting',
              '💼 خبير المشاريع - PMBOK 7th + EVM + Agile',
              '🛡️ خبير المخاطر - ERM + Governance',
              '👔 خبير الإدارة - Strategic Planning + Leadership'
            ]
          },
          {
            category: '🎯 نظام التقييم الذكي',
            items: [
              'أسئلة تقييمية مخصصة لكل مجال',
              'تحليل ذكي للإجابات',
              'توصيات احترافية مفصلة',
              'خطط عمل قابلة للتنفيذ',
              'تقارير شاملة وقابلة للحفظ'
            ]
          },
          {
            category: '📚 مكتبة المعرفة الشاملة',
            items: [
              'جميع القوانين والمعايير الدولية',
              'دلائل استخدام تفصيلية',
              'أمثلة عملية تطبيقية',
              'بحث متقدم ذكي',
              'دعم للغتين العربية والإنجليزية'
            ]
          }
        ],
        en: [
          {
            category: '🌍 Multi-Country System',
            items: [
              '5 complete Arab countries (Iraq, Saudi, UAE, Egypt, Jordan)',
              '15 integrated laws (5 labor + 5 tax + 5 companies)',
              'Automatic law application based on country selection',
              'Accurate tax and end-of-service calculations',
              'Updated information 2023-2024'
            ]
          },
          {
            category: '🎓 Expert Advisory Team (6 Experts)',
            items: [
              '📊 Accounting Expert - IFRS + Tax + Audit',
              '🛒 Purchasing Expert - Supply Chain + ISO 9001',
              '📈 Sales Expert - Strategy + Forecasting',
              '💼 Project Expert - PMBOK 7th + EVM + Agile',
              '🛡️ Risk Expert - ERM + Governance',
              '👔 Management Expert - Strategic Planning + Leadership'
            ]
          },
          {
            category: '🎯 Smart Assessment System',
            items: [
              'Customized assessment questions per domain',
              'Intelligent answer analysis',
              'Detailed professional recommendations',
              'Actionable implementation plans',
              'Comprehensive downloadable reports'
            ]
          },
          {
            category: '📚 Comprehensive Knowledge Base',
            items: [
              'All laws and international standards',
              'Detailed user guides',
              'Practical application examples',
              'Advanced smart search',
              'Arabic and English support'
            ]
          }
        ]
      },
      highlights: {
        ar: [
          '23 شهادة احترافية عبر جميع الخبراء',
          '104+ سنة خبرة مجمعة',
          '30+ سؤال تقييمي',
          '50+ توصية احترافية',
          'تحليل 360 درجة لأعمالك'
        ],
        en: [
          '23 professional certifications across all experts',
          '104+ years combined experience',
          '30+ assessment questions',
          '50+ professional recommendations',
          '360-degree business analysis'
        ]
      }
    },
    {
      version: 'v5.0.0',
      date: '2024-02-27',
      title: {
        ar: '🤖 المساعد الذكي AI + مكتبة المعرفة',
        en: '🤖 AI Assistant + Knowledge Base'
      },
      badge: 'AI POWERED',
      color: 'from-blue-600 to-cyan-600',
      features: {
        ar: [
          {
            category: '🤖 المساعد الذكي التفاعلي',
            items: [
              'فهم اللهجة العامية العربية',
              'إجابات بلغة السؤال',
              'معرفة شاملة بالقوانين العراقية',
              'ارتباط بمكونات النظام',
              'أمثلة عملية تطبيقية'
            ]
          },
          {
            category: '📚 مكتبة المعرفة',
            items: [
              'قوانين العمل والضرائب والشركات',
              'المعايير الدولية IFRS/PMBOK/ISO',
              'دلائل الاستخدام التفصيلية',
              'الأسئلة الشائعة',
              'بحث متقدم'
            ]
          }
        ],
        en: [
          {
            category: '🤖 Interactive AI Assistant',
            items: [
              'Understanding Arabic colloquial dialect',
              'Answers in question language',
              'Comprehensive Iraqi law knowledge',
              'Connected to system components',
              'Practical application examples'
            ]
          },
          {
            category: '📚 Knowledge Base',
            items: [
              'Labor, tax, and company laws',
              'International standards IFRS/PMBOK/ISO',
              'Detailed user guides',
              'FAQs',
              'Advanced search'
            ]
          }
        ]
      }
    },
    {
      version: 'v4.0.0',
      date: '2024-02-26',
      title: {
        ar: '📊 نظام ERP شامل - 165+ صفحة',
        en: '📊 Complete ERP System - 165+ Pages'
      },
      badge: 'COMPLETE',
      color: 'from-green-600 to-emerald-600',
      features: {
        ar: [
          {
            category: '💼 المكونات الرئيسية',
            items: [
              'المحاسبة (IFRS/IAS) - 180+ حساب',
              'المبيعات (IFRS 15)',
              'المشتريات (ISO 9001)',
              'المخزون (IAS 2)',
              'الموارد البشرية',
              'إدارة المشاريع (PMBOK 7)',
              'الحوكمة',
              'إدارة المخاطر'
            ]
          }
        ],
        en: [
          {
            category: '💼 Main Components',
            items: [
              'Accounting (IFRS/IAS) - 180+ accounts',
              'Sales (IFRS 15)',
              'Purchasing (ISO 9001)',
              'Inventory (IAS 2)',
              'Human Resources',
              'Project Management (PMBOK 7)',
              'Governance',
              'Risk Management'
            ]
          }
        ]
      }
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {locale === 'ar' ? '✨ ما الجديد' : "✨ What's New"}
            </h1>
            <p className="text-lg opacity-90">
              {locale === 'ar' 
                ? 'آخر التحديثات والميزات الجديدة'
                : 'Latest updates and new features'}
            </p>
          </div>
        </div>
        <Badge className="bg-white text-purple-600 text-lg px-6 py-2">
          {releases[0].version} - {locale === 'ar' ? 'الإصدار الأخير' : 'Latest Release'}
        </Badge>
      </div>

      {/* Releases Timeline */}
      <div className="space-y-6">
        {releases.map((release, idx) => (
          <Card key={release.version} className="overflow-hidden">
            {/* Release Header */}
            <div className={`bg-gradient-to-r ${release.color} text-white p-6`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 text-white text-sm">
                    {release.version}
                  </Badge>
                  <Badge className="bg-yellow-500 text-black font-bold">
                    {release.badge}
                  </Badge>
                </div>
                <div className="text-sm opacity-90">
                  {new Date(release.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                {release.title[locale]}
              </h2>
            </div>

            {/* Features */}
            <div className="p-6 space-y-6">
              {release.features[locale].map((category, catIdx) => (
                <div key={catIdx}>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Highlights */}
              {release.highlights && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-bold mb-3">
                    {locale === 'ar' ? '🌟 أبرز الإحصائيات:' : '🌟 Key Highlights:'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {release.highlights[locale].map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-amber-600" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Access Buttons - Only for latest version */}
              {idx === 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => navigate('/settings/company')}
                  >
                    <Globe className="w-4 h-4" />
                    {locale === 'ar' ? 'اختيار البلد' : 'Select Country'}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => navigate('/expert-advisors')}
                  >
                    <Users className="w-4 h-4" />
                    {locale === 'ar' ? 'الخبراء' : 'Advisors'}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => navigate('/knowledge-base')}
                  >
                    <BookOpen className="w-4 h-4" />
                    {locale === 'ar' ? 'المعرفة' : 'Knowledge'}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* System Stats */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h3 className="text-xl font-bold mb-4">
          {locale === 'ar' ? '📊 إحصائيات النظام الكاملة' : '📊 Complete System Statistics'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">165+</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'صفحة' : 'Pages'}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-green-600">240+</div>
            <div className="text-sm text-muted-foreground">
              API Endpoints
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">5</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'دول' : 'Countries'}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">6</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'خبراء' : 'Experts'}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-red-600">15</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'قانون' : 'Laws'}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-cyan-600">110+</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'عملة' : 'Currencies'}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-pink-600">23</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'شهادة' : 'Certificates'}
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-3xl font-bold text-indigo-600">100%</div>
            <div className="text-sm text-muted-foreground">
              {locale === 'ar' ? 'مكتمل' : 'Complete'}
            </div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <Brain className="w-16 h-16 mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-2">
          {locale === 'ar' ? '🚀 جاهز للبدء؟' : '🚀 Ready to Start?'}
        </h3>
        <p className="mb-6 opacity-90">
          {locale === 'ar' 
            ? 'استفد من كل الميزات الجديدة واستشر خبراءنا الآن!'
            : 'Take advantage of all new features and consult our experts now!'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/expert-advisors')}
            className="gap-2"
          >
            <Users className="w-5 h-5" />
            {locale === 'ar' ? 'استشر خبير' : 'Consult Expert'}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/settings/company')}
            className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <Globe className="w-5 h-5" />
            {locale === 'ar' ? 'اختر بلدك' : 'Select Country'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

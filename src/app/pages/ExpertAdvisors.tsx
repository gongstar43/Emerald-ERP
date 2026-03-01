import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import {
  accountingExpert,
  purchasingExpert,
  salesExpert,
  projectExpert,
  riskExpert,
  managementExpert
} from '../../lib/expert-advisors';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Users,
  TrendingUp,
  ShoppingCart,
  Briefcase,
  Shield,
  Target,
  ChevronRight,
  MessageCircle,
  Award,
  BarChart3,
  CheckCircle
} from 'lucide-react';

export default function ExpertAdvisors() {
  const { locale } = useLanguage();
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'analysis' | 'recommendations'>('intro');
  const [answers, setAnswers] = useState<any>({});

  const experts = [
    {
      id: 'accounting',
      icon: BarChart3,
      color: 'bg-blue-600',
      expert: accountingExpert,
      name: { ar: 'محلل الحسابات الخبير', en: 'Accounting Expert' }
    },
    {
      id: 'purchasing',
      icon: ShoppingCart,
      color: 'bg-purple-600',
      expert: purchasingExpert,
      name: { ar: 'خبير المشتريات', en: 'Purchasing Expert' }
    },
    {
      id: 'sales',
      icon: TrendingUp,
      color: 'bg-green-600',
      expert: salesExpert,
      name: { ar: 'خبير المبيعات', en: 'Sales Expert' }
    },
    {
      id: 'project',
      icon: Briefcase,
      color: 'bg-orange-600',
      expert: projectExpert,
      name: { ar: 'خبير المشاريع', en: 'Project Expert' }
    },
    {
      id: 'risk',
      icon: Shield,
      color: 'bg-red-600',
      expert: riskExpert,
      name: { ar: 'خبير المخاطر', en: 'Risk Expert' }
    },
    {
      id: 'management',
      icon: Target,
      color: 'bg-indigo-600',
      expert: managementExpert,
      name: { ar: 'خبير الإدارة', en: 'Management Expert' }
    }
  ];

  const getSelectedExpert = () => {
    return experts.find(e => e.id === selectedExpert);
  };

  const renderExpertIntro = () => {
    const expert = getSelectedExpert();
    if (!expert) return null;

    return (
      <div className="space-y-6">
        {/* بطاقة الخبير */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-full ${expert.color} flex items-center justify-center text-white`}>
              <expert.icon className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {expert.expert.profile.name[locale]}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {expert.expert.profile.title[locale]}
              </p>
              
              {/* الشهادات */}
              <div className="flex flex-wrap gap-2 mb-4">
                {expert.expert.profile.credentials.map((cred, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    {cred}
                  </Badge>
                ))}
              </div>

              {/* مجالات الخبرة */}
              <div className="space-y-2">
                <h3 className="font-bold">
                  {locale === 'ar' ? '🎯 مجالات الخبرة:' : '🎯 Areas of Expertise:'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {expert.expert.profile.expertise[locale].map((exp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* بدء التقييم */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {locale === 'ar' ? '📋 جاهز للتقييم؟' : '📋 Ready for Assessment?'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {locale === 'ar' 
              ? 'سيقوم الخبير بطرح مجموعة من الأسئلة لتقييم وضعك الحالي وتقديم توصيات مخصصة.'
              : 'The expert will ask you questions to assess your current situation and provide customized recommendations.'}
          </p>
          <Button onClick={() => setCurrentStep('questions')} size="lg" className="gap-2">
            <MessageCircle className="w-5 h-5" />
            {locale === 'ar' ? 'ابدأ التقييم الآن' : 'Start Assessment Now'}
          </Button>
        </Card>
      </div>
    );
  };

  const renderQuestions = () => {
    const expert = getSelectedExpert();
    if (!expert) return null;

    const questions = expert.expert.assessmentQuestions[locale];
    if (!questions) return null;

    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {locale === 'ar' ? '❓ أسئلة التقييم' : '❓ Assessment Questions'}
          </h2>

          {questions.map((q: any, idx: number) => (
            <div key={q.id} className="mb-8 pb-8 border-b last:border-b-0">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3">{q.question}</h3>

                  {q.type === 'number' && (
                    <input
                      type="number"
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder={locale === 'ar' ? 'أدخل الرقم...' : 'Enter number...'}
                    />
                  )}

                  {q.type === 'choice' && q.options && (
                    <div className="space-y-2">
                      {q.options.map((option: string, optIdx: number) => (
                        <label
                          key={optIdx}
                          className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={option}
                            checked={answers[q.id] === option}
                            onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                            className="w-4 h-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'multiple' && q.options && (
                    <div className="space-y-2">
                      {q.options.map((option: string, optIdx: number) => (
                        <label
                          key={optIdx}
                          className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <input
                            type="checkbox"
                            value={option}
                            checked={answers[q.id]?.includes(option)}
                            onChange={(e) => {
                              const current = answers[q.id] || [];
                              if (e.target.checked) {
                                setAnswers({ ...answers, [q.id]: [...current, option] });
                              } else {
                                setAnswers({ ...answers, [q.id]: current.filter((v: string) => v !== option) });
                              }
                            }}
                            className="w-4 h-4"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-4 mt-8">
            <Button variant="outline" onClick={() => setCurrentStep('intro')}>
              {locale === 'ar' ? 'رجوع' : 'Back'}
            </Button>
            <Button onClick={() => setCurrentStep('analysis')} className="gap-2">
              {locale === 'ar' ? 'تحليل النتائج' : 'Analyze Results'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const renderAnalysis = () => {
    const expert = getSelectedExpert();
    if (!expert) return null;

    // محاكاة التحليل
    const mockResults = {
      score: 72,
      maxScore: 100,
      level: locale === 'ar' ? 'جيد' : 'Good',
      insights: [
        {
          ar: '✅ لديك أساس جيد في هذا المجال',
          en: '✅ You have a good foundation in this area',
          severity: 'success'
        },
        {
          ar: '⚠️ هناك فرص للتحسين في بعض الجوانب',
          en: '⚠️ There are opportunities for improvement',
          severity: 'warning'
        }
      ],
      recommendations: [
        {
          ar: '📌 توصية 1: تطبيق أفضل الممارسات الدولية',
          en: '📌 Recommendation 1: Implement international best practices',
          priority: 'high'
        },
        {
          ar: '📌 توصية 2: تدريب الفريق على التقنيات الحديثة',
          en: '📌 Recommendation 2: Train team on modern techniques',
          priority: 'medium'
        },
        {
          ar: '📌 توصية 3: إنشاء نظام للمراقبة والقياس',
          en: '📌 Recommendation 3: Create monitoring and measurement system',
          priority: 'high'
        }
      ]
    };

    return (
      <div className="space-y-6">
        {/* النتيجة الإجمالية */}
        <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              {mockResults.score}/{mockResults.maxScore}
            </div>
            <div className="text-xl text-muted-foreground">
              {locale === 'ar' ? 'درجة التقييم' : 'Assessment Score'}
            </div>
            <Badge className="mt-4 bg-green-600 text-white text-lg px-6 py-2">
              {mockResults.level}
            </Badge>
          </div>
        </Card>

        {/* الرؤى */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {locale === 'ar' ? '💡 الرؤى والتحليل' : '💡 Insights & Analysis'}
          </h3>
          <div className="space-y-3">
            {mockResults.insights.map((insight, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  insight.severity === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200'
                }`}
              >
                {insight[locale]}
              </div>
            ))}
          </div>
        </Card>

        {/* التوصيات */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            {locale === 'ar' ? '📋 التوصيات' : '📋 Recommendations'}
          </h3>
          <div className="space-y-4">
            {mockResults.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-4 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{rec[locale]}</span>
                  <Badge className={rec.priority === 'high' ? 'bg-red-600' : 'bg-orange-600'}>
                    {rec.priority === 'high' 
                      ? (locale === 'ar' ? 'أولوية عالية' : 'High Priority')
                      : (locale === 'ar' ? 'أولوية متوسطة' : 'Medium Priority')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* خطة العمل */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <h3 className="text-xl font-bold mb-4">
            {locale === 'ar' ? '🎯 خطة العمل المقترحة' : '🎯 Suggested Action Plan'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">
                  {locale === 'ar' ? 'الأسبوع 1-2: التقييم والتخطيط' : 'Week 1-2: Assessment & Planning'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' 
                    ? 'مراجعة شاملة للوضع الحالي ووضع خطة تفصيلية'
                    : 'Comprehensive review of current status and detailed planning'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">
                  {locale === 'ar' ? 'الشهر 1-2: التنفيذ السريع' : 'Month 1-2: Quick Wins'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' 
                    ? 'تطبيق التحسينات السهلة والسريعة ذات التأثير العالي'
                    : 'Implement easy, quick improvements with high impact'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">
                  {locale === 'ar' ? 'الشهر 3-6: التحسين المستمر' : 'Month 3-6: Continuous Improvement'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {locale === 'ar' 
                    ? 'تطبيق التحسينات الاستراتيجية طويلة المدى'
                    : 'Implement long-term strategic improvements'}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setCurrentStep('questions')}>
            {locale === 'ar' ? 'رجوع للأسئلة' : 'Back to Questions'}
          </Button>
          <Button onClick={() => {
            alert(locale === 'ar' ? 'تم حفظ التقرير!' : 'Report saved!');
          }} className="gap-2">
            {locale === 'ar' ? 'حفظ التقرير' : 'Save Report'}
          </Button>
        </div>
      </div>
    );
  };

  if (!selectedExpert) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* الترويسة */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">
            {locale === 'ar' ? '🎓 الخبراء الاستشاريون' : '🎓 Expert Advisors'}
          </h1>
          <p className="text-lg opacity-90">
            {locale === 'ar' 
              ? 'فريق من الخبراء المتخصصين لتقييم أعمالك وتقديم توصيات احترافية'
              : 'Team of specialized experts to assess your business and provide professional recommendations'}
          </p>
        </div>

        {/* قائمة الخبراء */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card
              key={expert.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => {
                setSelectedExpert(expert.id);
                setCurrentStep('intro');
                setAnswers({});
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full ${expert.color} flex items-center justify-center text-white mb-4`}>
                  <expert.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {expert.name[locale]}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {expert.expert.profile.title[locale]}
                </p>
                <Button variant="outline" className="gap-2">
                  {locale === 'ar' ? 'استشر الخبير' : 'Consult Expert'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* زر الرجوع */}
      <Button
        variant="outline"
        onClick={() => {
          setSelectedExpert(null);
          setCurrentStep('intro');
        }}
      >
        ← {locale === 'ar' ? 'رجوع للخبراء' : 'Back to Experts'}
      </Button>

      {/* المحتوى حسب الخطوة */}
      {currentStep === 'intro' && renderExpertIntro()}
      {currentStep === 'questions' && renderQuestions()}
      {currentStep === 'analysis' && renderAnalysis()}
    </div>
  );
}

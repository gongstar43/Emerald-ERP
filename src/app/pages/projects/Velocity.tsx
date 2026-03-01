import React, { useState } from 'react';
import { useLanguage } from '../../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  BarChart3,
  Target,
  Zap,
  Award,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react';

// Agile Velocity Metrics - قياس سرعة الفريق حسب Agile/Scrum
interface VelocityData {
  sprintNumber: number;
  sprintName: string;
  committedPoints: number;
  completedPoints: number;
  carryoverPoints: number;
  addedPoints: number;
  teamSize: number;
  daysWorked: number;
  startDate: string;
  endDate: string;
}

export default function Velocity() {
  const { locale } = useLanguage();
  const velocityData: VelocityData[] = mockVelocityData(locale);

  // Calculate metrics
  const avgVelocity = Math.round(velocityData.reduce((sum, d) => sum + d.completedPoints, 0) / velocityData.length);
  const latestVelocity = velocityData[velocityData.length - 1]?.completedPoints || 0;
  const previousVelocity = velocityData[velocityData.length - 2]?.completedPoints || 0;
  const velocityTrend = latestVelocity - previousVelocity;
  const avgCommitment = Math.round(velocityData.reduce((sum, d) => sum + d.committedPoints, 0) / velocityData.length);
  const avgCompletion = Math.round((velocityData.reduce((sum, d) => sum + (d.completedPoints / d.committedPoints), 0) / velocityData.length) * 100);

  // Predictability metrics
  const totalCommitted = velocityData.reduce((sum, d) => sum + d.committedPoints, 0);
  const totalCompleted = velocityData.reduce((sum, d) => sum + d.completedPoints, 0);
  const predictability = Math.round((totalCompleted / totalCommitted) * 100);

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (trend < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          {locale === 'ar' ? 'سرعة الفريق (Velocity)' : 'Team Velocity'}
        </h1>
        <p className="text-muted-foreground">
          {locale === 'ar' 
            ? 'قياس وتحليل سرعة الفريق حسب منهجية Agile/Scrum - Story Points Per Sprint'
            : 'Agile/Scrum Team Velocity Measurement & Analysis - Story Points Per Sprint'}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {locale === 'ar' ? 'متوسط السرعة' : 'Average Velocity'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{avgVelocity}</div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' ? 'نقطة / سبرنت' : 'points / sprint'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {locale === 'ar' ? 'السبرنت الأخير' : 'Latest Sprint'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{latestVelocity}</div>
              <div className={`flex items-center gap-1 ${getTrendColor(velocityTrend)}`}>
                {getTrendIcon(velocityTrend)}
                <span className="font-semibold">{Math.abs(velocityTrend)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {locale === 'ar' 
                ? `${velocityTrend > 0 ? 'زيادة' : velocityTrend < 0 ? 'نقصان' : 'مستقر'} عن السابق`
                : `${velocityTrend > 0 ? 'increase' : velocityTrend < 0 ? 'decrease' : 'stable'} from previous`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              {locale === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{avgCompletion}%</div>
            <Progress value={avgCompletion} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              {locale === 'ar' ? 'القدرة على التنبؤ' : 'Predictability'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${predictability >= 80 ? 'text-green-600' : predictability >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {predictability}%
            </div>
            <p className="text-xs text-muted-foreground">
              {predictability >= 80 
                ? (locale === 'ar' ? 'ممتاز' : 'Excellent')
                : predictability >= 60 
                ? (locale === 'ar' ? 'جيد' : 'Good')
                : (locale === 'ar' ? 'يحتاج تحسين' : 'Needs Improvement')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Velocity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {locale === 'ar' ? 'مخطط السرعة - Velocity Chart' : 'Velocity Chart'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' 
              ? 'مقارنة النقاط الملتزم بها مقابل المكتملة لكل سبرنت'
              : 'Committed vs Completed Story Points per Sprint'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {velocityData.map((sprint, idx) => {
              const completionRate = Math.round((sprint.completedPoints / sprint.committedPoints) * 100);
              const maxPoints = Math.max(...velocityData.map(s => Math.max(s.committedPoints, s.completedPoints)));
              
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{sprint.sprintNumber}</Badge>
                      <span className="font-medium">{sprint.sprintName}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{sprint.startDate} - {sprint.endDate}</span>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {sprint.teamSize}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* Committed Points */}
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm text-muted-foreground">
                        {locale === 'ar' ? 'ملتزم' : 'Committed'}
                      </div>
                      <div className="flex-1">
                        <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded">
                          <div 
                            className="absolute h-full bg-blue-500 rounded flex items-center justify-end pr-2"
                            style={{ width: `${(sprint.committedPoints / maxPoints) * 100}%` }}
                          >
                            <span className="text-white text-sm font-semibold">
                              {sprint.committedPoints}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Completed Points */}
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm text-muted-foreground">
                        {locale === 'ar' ? 'مكتمل' : 'Completed'}
                      </div>
                      <div className="flex-1">
                        <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded">
                          <div 
                            className={`absolute h-full rounded flex items-center justify-end pr-2 ${
                              completionRate >= 90 ? 'bg-green-500' :
                              completionRate >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(sprint.completedPoints / maxPoints) * 100}%` }}
                          >
                            <span className="text-white text-sm font-semibold">
                              {sprint.completedPoints}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-right">
                        <Badge className={
                          completionRate >= 90 ? 'bg-green-100 text-green-700' :
                          completionRate >= 70 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {completionRate}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  {(sprint.carryoverPoints > 0 || sprint.addedPoints > 0) && (
                    <div className="flex gap-4 text-xs pl-26">
                      {sprint.carryoverPoints > 0 && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <AlertCircle className="w-3 h-3" />
                          <span>{locale === 'ar' ? 'ترحيل:' : 'Carryover:'} {sprint.carryoverPoints}</span>
                        </div>
                      )}
                      {sprint.addedPoints > 0 && (
                        <div className="flex items-center gap-1 text-purple-600">
                          <Activity className="w-3 h-3" />
                          <span>{locale === 'ar' ? 'إضافة:' : 'Added:'} {sprint.addedPoints}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Average Line */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-600"></div>
                <span className="text-sm font-semibold">
                  {locale === 'ar' ? 'متوسط السرعة' : 'Average Velocity'}
                </span>
              </div>
              <div className="text-lg font-bold text-blue-600">{avgVelocity} {locale === 'ar' ? 'نقطة' : 'points'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {locale === 'ar' ? 'نقاط القوة' : 'Strengths'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {predictability >= 80 && (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'قدرة تنبؤ عالية' : 'High Predictability'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? `الفريق يحقق ${predictability}% من التزاماته بشكل مستمر`
                      : `Team consistently achieves ${predictability}% of commitments`}
                  </div>
                </div>
              </div>
            )}
            
            {velocityTrend > 0 && (
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'تحسن مستمر' : 'Continuous Improvement'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? `زيادة في السرعة بمقدار ${velocityTrend} نقطة في السبرنت الأخير`
                      : `Velocity increased by ${velocityTrend} points in latest sprint`}
                  </div>
                </div>
              </div>
            )}

            {avgCompletion >= 90 && (
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'معدل إنجاز ممتاز' : 'Excellent Completion Rate'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? `الفريق يكمل ${avgCompletion}% من القصص المخططة`
                      : `Team completes ${avgCompletion}% of planned stories`}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              {locale === 'ar' ? 'فرص التحسين' : 'Improvement Opportunities'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {predictability < 80 && (
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'تحسين التقديرات' : 'Improve Estimations'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? 'القدرة على التنبؤ منخفضة - راجع عملية التقدير'
                      : 'Low predictability - review estimation process'}
                  </div>
                </div>
              </div>
            )}

            {velocityTrend < 0 && (
              <div className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-red-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'انخفاض في السرعة' : 'Velocity Decline'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? 'تحقق من وجود عوائق أو مشاكل في الفريق'
                      : 'Check for blockers or team issues'}
                  </div>
                </div>
              </div>
            )}

            {velocityData.some(s => s.carryoverPoints > 5) && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'تقليل الترحيل' : 'Reduce Carryover'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? 'العديد من القصص تُرحّل - راجع حجم القصص والتقديرات'
                      : 'Many stories carried over - review story sizing and estimates'}
                  </div>
                </div>
              </div>
            )}

            {velocityData.some(s => s.addedPoints > 8) && (
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-purple-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {locale === 'ar' ? 'تقليل التغييرات' : 'Reduce Scope Changes'}
                  </div>
                  <div className="text-muted-foreground">
                    {locale === 'ar' 
                      ? 'إضافة الكثير من القصص أثناء السبرنت - التزم بالخطة'
                      : 'Too many stories added mid-sprint - stick to the plan'}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Team Capacity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {locale === 'ar' ? 'سعة الفريق' : 'Team Capacity'}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' 
              ? 'السرعة لكل عضو فريق حسب السبرنتات'
              : 'Velocity per team member across sprints'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {velocityData.map((sprint, idx) => {
              const pointsPerPerson = (sprint.completedPoints / sprint.teamSize).toFixed(1);
              
              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{sprint.sprintNumber}</Badge>
                    <span className="font-medium">{sprint.sprintName}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {locale === 'ar' ? 'حجم الفريق' : 'Team Size'}
                      </div>
                      <div className="font-semibold">{sprint.teamSize}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {locale === 'ar' ? 'نقاط/شخص' : 'Points/Person'}
                      </div>
                      <div className="font-semibold text-blue-600">{pointsPerPerson}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {locale === 'ar' ? 'أيام العمل' : 'Days Worked'}
                      </div>
                      <div className="font-semibold">{sprint.daysWorked}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock Data
function mockVelocityData(locale: string): VelocityData[] {
  return [
    {
      sprintNumber: 1,
      sprintName: locale === 'ar' ? 'السبرنت 1' : 'Sprint 1',
      committedPoints: 21,
      completedPoints: 21,
      carryoverPoints: 0,
      addedPoints: 0,
      teamSize: 3,
      daysWorked: 14,
      startDate: '2024-01-18',
      endDate: '2024-01-31',
    },
    {
      sprintNumber: 2,
      sprintName: locale === 'ar' ? 'السبرنت 2' : 'Sprint 2',
      committedPoints: 38,
      completedPoints: 35,
      carryoverPoints: 3,
      addedPoints: 5,
      teamSize: 6,
      daysWorked: 14,
      startDate: '2024-02-01',
      endDate: '2024-02-14',
    },
    {
      sprintNumber: 3,
      sprintName: locale === 'ar' ? 'السبرنت 3' : 'Sprint 3',
      committedPoints: 34,
      completedPoints: 28,
      carryoverPoints: 6,
      addedPoints: 8,
      teamSize: 5,
      daysWorked: 14,
      startDate: '2024-02-15',
      endDate: '2024-02-29',
    },
    {
      sprintNumber: 4,
      sprintName: locale === 'ar' ? 'السبرنت 4' : 'Sprint 4',
      committedPoints: 42,
      completedPoints: 0,
      carryoverPoints: 0,
      addedPoints: 0,
      teamSize: 4,
      daysWorked: 0,
      startDate: '2024-03-01',
      endDate: '2024-03-15',
    },
  ].filter(s => s.completedPoints > 0); // Only show completed sprints
}

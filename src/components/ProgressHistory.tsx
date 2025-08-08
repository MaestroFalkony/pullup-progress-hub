import React from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { StatsCard } from '@/components/ui/stats-card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const ProgressHistory = () => {
  const weeklyData = [
    { day: 'Пн', reps: 20, completed: true },
    { day: 'Вт', reps: 25, completed: true },
    { day: 'Ср', reps: 18, completed: true },
    { day: 'Чт', reps: 30, completed: true },
    { day: 'Пт', reps: 22, completed: true },
    { day: 'Сб', reps: 0, completed: false },
    { day: 'Вс', reps: 0, completed: false }
  ];

  const achievements = [
    { title: "Первые 100", description: "100 подтягиваний за неделю", earned: true },
    { title: "Силач", description: "Максимальная сила 90%+", earned: true },
    { title: "Постоянство", description: "7 дней подряд", earned: false },
    { title: "Марафонец", description: "1000 подтягиваний", earned: false }
  ];

  const monthlyProgress = [
    { month: 'Янв', reps: 420 },
    { month: 'Фев', reps: 520 },
    { month: 'Мар', reps: 680 },
    { month: 'Апр', reps: 450 }
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">История прогресса</h1>
        <p className="text-muted-foreground">Отслеживайте свои достижения</p>
      </div>

      {/* Current Month Summary */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Этот месяц"
          value={450}
          unit="подтягиваний"
          change={15}
          icon="📈"
        />
        <StatsCard
          title="Лучший день"
          value={30}
          unit="подтягиваний"
          change={25}
          icon="🏆"
        />
      </div>

      {/* Weekly Progress */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Эта неделя</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 text-sm font-bold neumorphic-subtle",
                day.completed ? "text-primary" : "text-muted-foreground"
              )}>
                {day.reps || "-"}
              </div>
              <div className="text-xs text-muted-foreground">{day.day}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            Выполнено: {weeklyData.filter(d => d.completed).length}/7 дней
          </div>
        </div>
      </NeumorphicCard>

      {/* Monthly Chart */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Прогресс по месяцам</h3>
        <div className="space-y-3">
          {monthlyProgress.map((month, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm text-muted-foreground">{month.month}</div>
              <div className="flex-1">
                <div className="w-full h-6 bg-muted rounded-full overflow-hidden neumorphic-inset">
                  <div 
                    className="h-full gradient-orange transition-all duration-500"
                    style={{ width: `${(month.reps / 700) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm font-semibold text-right">{month.reps}</div>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Achievements */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Достижения</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={cn(
              "p-4 rounded-xl border-2 transition-all",
              achievement.earned 
                ? "border-primary/30 bg-primary/5" 
                : "border-muted bg-muted/20"
            )}>
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-lg",
                  achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {achievement.earned ? "🏆" : "🔒"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-semibold",
                    achievement.earned ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {achievement.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Personal Records */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Личные рекорды</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Максимум за день</span>
            <span className="font-bold text-primary">30 подтягиваний</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Максимальная сила</span>
            <span className="font-bold text-primary">92%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Лучшее время/повтор</span>
            <span className="font-bold text-primary">8 сек</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Серия дней подряд</span>
            <span className="font-bold text-primary">12 дней</span>
          </div>
        </div>
      </NeumorphicCard>
    </div>
  );
};
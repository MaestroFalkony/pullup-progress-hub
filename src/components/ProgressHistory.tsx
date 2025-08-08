import React from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { StatsCard } from '@/components/ui/stats-card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

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
      {/* Metrics Charts */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Ключевые метрики</h3>
        <Tabs defaultValue="weight" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 mb-4">
            <TabsTrigger value="weight">Вес</TabsTrigger>
            <TabsTrigger value="reps">Подтягивания</TabsTrigger>
            <TabsTrigger value="grip">Сила хвата (N)</TabsTrigger>
            <TabsTrigger value="explosive">Взрывная сила (dF/dt)</TabsTrigger>
            <TabsTrigger value="hang">Время виса</TabsTrigger>
            <TabsTrigger value="pullupTime">Время подтягивания</TabsTrigger>
          </TabsList>

          <TabsContent value="weight">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { d: 'Пн', kg: 75 }, { d: 'Вт', kg: 75.2 }, { d: 'Ср', kg: 75.1 }, { d: 'Чт', kg: 74.9 }, { d: 'Пт', kg: 75 }, { d: 'Сб', kg: 75.3 }, { d: 'Вс', kg: 75.2 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[70, 80]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: any) => [`${v} кг`, 'Вес']} />
                  <Line type="monotone" dataKey="kg" stroke="hsl(var(--primary))" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="reps">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { set: 'П1', reps: 10 }, { set: 'П2', reps: 8 }, { set: 'П3', reps: 6 }, { set: 'П4', reps: 5 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="set" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: any) => [`${v}`, 'Повторения']} />
                  <Bar dataKey="reps" fill="hsl(var(--primary))" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="grip">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { t: 'Пн', N: 540 }, { t: 'Вт', N: 560 }, { t: 'Ср', N: 520 }, { t: 'Чт', N: 600 }, { t: 'Пт', N: 580 }, { t: 'Сб', N: 510 }, { t: 'Вс', N: 530 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 900]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: any) => [`${v} N`, 'Сила хвата']} />
                  <Line type="monotone" dataKey="N" stroke="hsl(var(--primary))" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="explosive">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { t: 'Пн', dFdt: 1200 }, { t: 'Вт', dFdt: 1400 }, { t: 'Ср', dFdt: 1100 }, { t: 'Чт', dFdt: 1600 }, { t: 'Пт', dFdt: 1500 }, { t: 'Сб', dFdt: 1000 }, { t: 'Вс', dFdt: 1150 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 2000]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: any) => [`${v} N/s`, 'dF/dt']} />
                  <Line type="monotone" dataKey="dFdt" stroke="hsl(var(--primary))" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="hang">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { set: 'П1', sec: 20 }, { set: 'П2', sec: 18 }, { set: 'П3', sec: 22 }, { set: 'П4', sec: 15 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="set" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: any) => [`${v} с`, 'Время виса']} />
                  <Bar dataKey="sec" fill="hsl(var(--primary))" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="pullupTime">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { set: 'П1', sec: 8.2 }, { set: 'П2', sec: 7.8 }, { set: 'П3', sec: 9.1 }, { set: 'П4', sec: 8.6 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="set" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: any) => [`${v} с`, 'Время/подтягивание']} />
                  <Bar dataKey="sec" fill="hsl(var(--primary))" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </NeumorphicCard>

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
            <span className="font-bold text-primary">620 N</span>
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
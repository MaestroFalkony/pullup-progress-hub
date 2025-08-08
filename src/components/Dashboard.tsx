import React, { useState, useEffect } from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { StatsCard } from '@/components/ui/stats-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DashboardProps {
  onStartWorkout: () => void;
}

export const Dashboard = ({ onStartWorkout }: DashboardProps) => {
  const [isConnected, setIsConnected] = useState(true);
  const [currentStrength, setCurrentStrength] = useState(550);

  // Simulate real-time data updates
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStrength(prev => {
        const change = (Math.random() - 0.5) * 60;
        return Math.max(0, Math.min(900, prev + change));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Дашборд</h1>
          <p className="text-muted-foreground">Добро пожаловать на тренировку!</p>
        </div>
        <Badge 
          variant={isConnected ? "default" : "destructive"}
          className={cn(
            "px-3 py-1",
            isConnected && "bg-primary text-primary-foreground"
          )}
        >
          {isConnected ? "🟢 Подключено" : "🔴 Отключено"}
        </Badge>
      </div>

      {/* Current Status */}
      <NeumorphicCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Текущее состояние</h3>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Сила хвата: <span className="font-bold text-primary">{Math.round(currentStrength)} N</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Вес: <span className="font-bold">75 кг</span>
              </div>
            </div>
          </div>
          <Button onClick={onStartWorkout} className="gradient-orange px-8 py-3">
            Начать тренировку
          </Button>
        </div>
      </NeumorphicCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Подтягивания сегодня"
          value={24}
          change={12}
          icon="💪"
        />
        <StatsCard
          title="Максимальная сила"
          value={620}
          unit="N"
          change={5}
          icon="⚡"
        />
        <StatsCard
          title="Время тренировки"
          value={45}
          unit="мин"
          change={-8}
          icon="⏱️"
        />
        <StatsCard
          title="Средний вес"
          value={75}
          unit="кг"
          change={0}
          icon="⚖️"
        />
      </div>

      {/* Weekly Progress */}
<NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Активность за 7 дней</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { day: 'Пн', reps: 20 },
              { day: 'Вт', reps: 24 },
              { day: 'Ср', reps: 18 },
              { day: 'Чт', reps: 30 },
              { day: 'Пт', reps: 22 },
              { day: 'Сб', reps: 12 },
              { day: 'Вс', reps: 15 },
            ]}>
              <defs>
                <linearGradient id="colorReps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="reps" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorReps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </NeumorphicCard>

      {/* Ranking */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Рейтинг среди друзей</h3>
        <div className="space-y-3">
          {[
            { name: "Алексей К.", score: 245, isYou: false },
            { name: "Вы", score: 170, isYou: true },
            { name: "Михаил Р.", score: 156, isYou: false },
            { name: "Дмитрий С.", score: 142, isYou: false }
          ].map((user, index) => (
            <div key={index} className={cn(
              "flex items-center justify-between p-3 rounded-xl",
              user.isYou ? "bg-primary/10" : "bg-muted/50"
            )}>
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  index === 0 ? "bg-yellow-500 text-white" : 
                  index === 1 ? "bg-gray-400 text-white" :
                  index === 2 ? "bg-yellow-600 text-white" : "bg-muted"
                )}>
                  {index + 1}
                </div>
                <span className={cn("font-medium", user.isYou && "text-primary")}>
                  {user.name}
                </span>
              </div>
              <span className="font-bold">{user.score}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </div>
  );
};
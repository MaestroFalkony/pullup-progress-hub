import React, { useState } from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

export const SocialChallenges = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const activeChallenges = [
    {
      id: 1,
      title: "Апрельский марафон",
      description: "500 подтягиваний за месяц",
      progress: 68,
      current: 340,
      target: 500,
      participants: 24,
      timeLeft: "12 дней",
      prize: "🏆 Золотая медаль"
    },
    {
      id: 2,
      title: "Недельный спринт",
      description: "100 подтягиваний за неделю",
      progress: 45,
      current: 45,
      target: 100,
      participants: 8,
      timeLeft: "3 дня",
      prize: "🥇 Серебряная медаль"
    }
  ];

  const completedChallenges = [
    {
      id: 3,
      title: "Мартовский вызов",
      description: "300 подтягиваний за месяц",
      result: "1 место",
      participants: 15,
      prize: "🏆 Золотая медаль",
      date: "Март 2024"
    },
    {
      id: 4,
      title: "Силовой тест",
      description: "Максимальная сила 85%+",
      result: "Выполнено",
      participants: 32,
      prize: "🎯 Значок силача",
      date: "Февраль 2024"
    }
  ];

  const leaderboard = [
    { name: "Алексей К.", score: 485, rank: 1, isYou: false },
    { name: "Михаил Р.", score: 420, rank: 2, isYou: false },
    { name: "Вы", score: 340, rank: 3, isYou: true },
    { name: "Дмитрий С.", score: 280, rank: 4, isYou: false },
    { name: "Игорь В.", score: 255, rank: 5, isYou: false }
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Челленджи</h1>
        <p className="text-muted-foreground">Соревнуйтесь с друзьями и достигайте новых высот</p>
      </div>

      {/* Tab switcher */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'active' ? 'default' : 'outline'}
          onClick={() => setActiveTab('active')}
          className={cn(
            "flex-1 neumorphic-subtle",
            activeTab === 'active' && "gradient-orange"
          )}
        >
          Активные
        </Button>
        <Button
          variant={activeTab === 'completed' ? 'default' : 'outline'}
          onClick={() => setActiveTab('completed')}
          className={cn(
            "flex-1 neumorphic-subtle",
            activeTab === 'completed' && "gradient-orange"
          )}
        >
          Завершенные
        </Button>
      </div>

      {/* Active Challenges */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeChallenges.map((challenge) => (
            <NeumorphicCard key={challenge.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <Badge variant="outline" className="ml-4">
                  {challenge.timeLeft}
                </Badge>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex-shrink-0">
                  <ProgressRing progress={challenge.progress} size={80}>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {challenge.progress}%
                      </div>
                    </div>
                  </ProgressRing>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-semibold">
                      {challenge.current}/{challenge.target}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full neumorphic-inset">
                    <div 
                      className="h-full gradient-orange rounded-full transition-all duration-300"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{challenge.participants} участников</span>
                    <span>{challenge.prize}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full gradient-orange">
                Посмотреть лидеров
              </Button>
            </NeumorphicCard>
          ))}

          {/* Create Challenge */}
          <NeumorphicCard className="p-6 text-center">
            <div className="text-4xl mb-2">➕</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Создать челлендж</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Бросьте вызов друзьям или присоединитесь к сообществу
            </p>
            <Button variant="outline" className="neumorphic-subtle">
              Создать
            </Button>
          </NeumorphicCard>
        </div>
      )}

      {/* Completed Challenges */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedChallenges.map((challenge) => (
            <NeumorphicCard key={challenge.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{challenge.title}</h3>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <Badge className="ml-4 bg-primary text-primary-foreground">
                  {challenge.result}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{challenge.participants} участников</span>
                <span className="text-muted-foreground">{challenge.date}</span>
              </div>
              
              <div className="mt-3 p-3 bg-primary/10 rounded-xl">
                <div className="text-center">
                  <span className="text-2xl">{challenge.prize.split(' ')[0]}</span>
                  <div className="text-sm text-primary font-semibold">
                    {challenge.prize.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Лидеры "Апрельский марафон"
        </h3>
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div key={user.rank} className={cn(
              "flex items-center justify-between p-3 rounded-xl transition-all",
              user.isYou ? "bg-primary/10 ring-2 ring-primary/20" : "bg-muted/30"
            )}>
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  user.rank === 1 ? "bg-yellow-500 text-white" : 
                  user.rank === 2 ? "bg-gray-400 text-white" :
                  user.rank === 3 ? "bg-yellow-600 text-white" : "bg-muted"
                )}>
                  {user.rank}
                </div>
                <span className={cn(
                  "font-medium",
                  user.isYou && "text-primary"
                )}>
                  {user.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">{user.score}</span>
                {user.rank <= 3 && (
                  <span className="text-lg">
                    {user.rank === 1 ? "🏆" : user.rank === 2 ? "🥈" : "🥉"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

interface WorkoutSessionProps {
  onEndWorkout: () => void;
}

export const WorkoutSession = ({ onEndWorkout }: WorkoutSessionProps) => {
  const [isActive, setIsActive] = useState(false);
  const [reps, setReps] = useState(0);
  const [currentForce, setCurrentForce] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [maxForce, setMaxForce] = useState(0);

  // Simulate real-time workout data
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
        
        // Simulate force changes during pullup
        const newForce = Math.random() * 100;
        setCurrentForce(newForce);
        setMaxForce(prev => Math.max(prev, newForce));
        
        // Auto-detect rep completion (when force drops significantly)
        if (newForce < 20 && currentForce > 70) {
          setReps(prev => prev + 1);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, currentForce]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleEndWorkout = () => {
    setIsActive(false);
    onEndWorkout();
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Тренировка</h1>
          <p className="text-muted-foreground">
            {isActive ? "Тренировка активна" : "Готов к началу"}
          </p>
        </div>
        <Button 
          onClick={handleEndWorkout}
          variant="outline"
          className="neumorphic"
        >
          Завершить
        </Button>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-2 gap-4">
        <NeumorphicCard className="p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{reps}</div>
          <div className="text-sm text-muted-foreground">Подтягиваний</div>
        </NeumorphicCard>
        
        <NeumorphicCard className="p-6 text-center">
          <div className="text-4xl font-bold text-foreground mb-2">{formatTime(workoutTime)}</div>
          <div className="text-sm text-muted-foreground">Время</div>
        </NeumorphicCard>
      </div>

      {/* Force indicator */}
      <NeumorphicCard className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4 text-center">
          Сила в реальном времени
        </h3>
        <div className="flex justify-center mb-4">
          <ProgressRing 
            progress={currentForce} 
            size={200}
            className={cn(isActive && currentForce > 80 && "animate-pulse-orange")}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {currentForce.toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Текущая</div>
              <div className="text-xs text-muted-foreground">
                Макс: {maxForce.toFixed(0)}%
              </div>
            </div>
          </ProgressRing>
        </div>
        
        {/* Force bar visualization */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Слабо</span>
            <span>Умеренно</span>
            <span>Сильно</span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden neumorphic-inset">
            <div 
              className="h-full gradient-orange transition-all duration-100 ease-out"
              style={{ width: `${currentForce}%` }}
            />
          </div>
        </div>
      </NeumorphicCard>

      {/* Control button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleStartStop}
          className={cn(
            "px-12 py-4 text-xl font-bold rounded-full",
            isActive 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
              : "gradient-orange"
          )}
        >
          {isActive ? "Пауза" : "Старт"}
        </Button>
      </div>

      {/* Live stats */}
      <div className="grid grid-cols-3 gap-3">
        <NeumorphicCard className="p-4 text-center">
          <div className="text-lg font-bold text-foreground">{Math.floor(currentForce * 0.8)}</div>
          <div className="text-xs text-muted-foreground">Сила хвата</div>
        </NeumorphicCard>
        
        <NeumorphicCard className="p-4 text-center">
          <div className="text-lg font-bold text-foreground">75</div>
          <div className="text-xs text-muted-foreground">Вес, кг</div>
        </NeumorphicCard>
        
        <NeumorphicCard className="p-4 text-center">
          <div className="text-lg font-bold text-foreground">
            {reps > 0 ? Math.floor(workoutTime / reps) : 0}
          </div>
          <div className="text-xs text-muted-foreground">Сек/повтор</div>
        </NeumorphicCard>
      </div>
    </div>
  );
};
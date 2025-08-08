import React, { useState, useEffect, useRef } from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

interface WorkoutSessionProps {
  onEndWorkout: () => void;
}

export const WorkoutSession = ({ onEndWorkout }: WorkoutSessionProps) => {
  const MAX_FORCE_N = 900; // calibration 0–900 N
  const SAMPLE_MS = 20; // ~50 Hz
  const REP_HIGH = 600;
  const REP_LOW = 200;

  const [isActive, setIsActive] = useState(false);
  const [reps, setReps] = useState(0);
  const [currentForce, setCurrentForce] = useState(0); // Newtons
  const [workoutTime, setWorkoutTime] = useState(0); // seconds (float)
  const [maxForce, setMaxForce] = useState(0);
  const [samples, setSamples] = useState<{ t: number; F: number }[]>([]);
  const [repMarkers, setRepMarkers] = useState<number[]>([]);
  const timeRef = useRef(0);
  const prevForceRef = useRef(0);
  const aboveHighRef = useRef(false);

// Simulate real-time workout data
useEffect(() => {
  let interval: ReturnType<typeof setInterval>;
  if (isActive) {
    interval = setInterval(() => {
      // advance time
      timeRef.current += SAMPLE_MS / 1000;
      setWorkoutTime((prev) => +(prev + SAMPLE_MS / 1000).toFixed(1));

      // simulate force waveform (Newtons)
      const t = timeRef.current;
      const base = 350 + 250 * Math.sin((2 * Math.PI * t) / 2); // ~2s cycle
      const noise = (Math.random() - 0.5) * 60;
      const F = Math.max(0, Math.min(MAX_FORCE_N, base + noise));
      setCurrentForce(F);
      setMaxForce((prev) => Math.max(prev, F));

      // rep detection: high -> low
      const prevF = prevForceRef.current;
      if (F > REP_HIGH) aboveHighRef.current = true;
      if (aboveHighRef.current && F < REP_LOW && prevF >= REP_LOW) {
        setReps((prev) => prev + 1);
        setRepMarkers((prev) => [...prev, t]);
        aboveHighRef.current = false;
      }
      prevForceRef.current = F;

      // store samples (trim)
      setSamples((prev) => {
        const next = [...prev, { t, F }];
        return next.length > 600 ? next.slice(next.length - 600) : next;
      });
    }, SAMPLE_MS);
  }
  return () => clearInterval(interval);
}, [isActive]);

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
            progress={Math.min(100, (currentForce / MAX_FORCE_N) * 100)} 
            size={200}
            className={cn(isActive && currentForce > REP_HIGH && "animate-pulse-orange")}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.round(currentForce)} N
              </div>
              <div className="text-sm text-muted-foreground">Текущая</div>
              <div className="text-xs text-muted-foreground">
                Макс: {Math.round(maxForce)} N
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
              style={{ width: `${Math.min(100, (currentForce / MAX_FORCE_N) * 100)}%` }}
            />
</div>

        </div>

        {/* Real-time force vs time chart */}
        <div className="mt-6 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={samples} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis type="number" dataKey="t" domain={["auto", "auto"]} tickFormatter={(v) => `${Number(v).toFixed(1)}с`} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={[0, MAX_FORCE_N]} tickFormatter={(v) => `${Math.round(Number(v))}`} stroke="hsl(var(--muted-foreground))" />
              <Tooltip formatter={(v: any) => [`${Math.round(v as number)} N`, 'Сила']} labelFormatter={(l: any) => `t=${Number(l).toFixed(2)}с`} />
              <Line type="monotone" dataKey="F" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} />
              {repMarkers.map((x, idx) => (
                <ReferenceLine key={idx} x={x} stroke="hsl(var(--primary-dark))" strokeDasharray="4 4" />
              ))}
            </LineChart>
          </ResponsiveContainer>
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
<div className="text-lg font-bold text-foreground">{Math.round(currentForce)} N</div>
          <div className="text-xs text-muted-foreground">Сила хвата</div>
        </NeumorphicCard>
        
        <NeumorphicCard className="p-4 text-center">
          <div className="text-lg font-bold text-foreground">75</div>
          <div className="text-xs text-muted-foreground">Вес, кг</div>
        </NeumorphicCard>
        
        <NeumorphicCard className="p-4 text-center">
<div className="text-lg font-bold text-foreground">
            {reps > 0 ? (workoutTime / reps).toFixed(1) : '0.0'}
          </div>
          <div className="text-xs text-muted-foreground">Сек/повтор</div>
        </NeumorphicCard>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressRing } from '@/components/ui/progress-ring';
import { cn } from '@/lib/utils';

interface DeviceConnectionProps {
  onConnect: () => void;
}

export const DeviceConnection = ({ onConnect }: DeviceConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [wifiName, setWifiName] = useState('');
  const [password, setPassword] = useState('');
  const [connectionProgress, setConnectionProgress] = useState(0);

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionProgress(0);

    // Simulate connection process
    const steps = [
      { progress: 25, text: 'Поиск устройства...' },
      { progress: 50, text: 'Подключение к WiFi...' },
      { progress: 75, text: 'Настройка MQTT...' },
      { progress: 100, text: 'Готов к тренировке!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectionProgress(step.progress);
    }

    setTimeout(() => {
      onConnect();
    }, 1000);
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <NeumorphicCard className="w-full max-w-md p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Подключение устройства</h2>
          
          <div className="flex justify-center">
            <ProgressRing 
              progress={connectionProgress} 
              size={150}
              className="animate-pulse-orange"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{connectionProgress}%</div>
                <div className="text-sm text-muted-foreground">Подключение</div>
              </div>
            </ProgressRing>
          </div>

          <div className="space-y-2">
            <div className="text-lg font-semibold">
              {connectionProgress <= 25 && "Поиск устройства..."}
              {connectionProgress > 25 && connectionProgress <= 50 && "Подключение к WiFi..."}
              {connectionProgress > 50 && connectionProgress <= 75 && "Настройка MQTT..."}
              {connectionProgress > 75 && "Готов к тренировке!"}
            </div>
            <div className="text-sm text-muted-foreground">
              Убедитесь, что турник включен и находится рядом
            </div>
          </div>
        </NeumorphicCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <NeumorphicCard className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Умный Турник</h1>
          <p className="text-muted-foreground">Подключите ваше устройство для начала тренировок</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wifi">Имя WiFi сети</Label>
            <Input
              id="wifi"
              value={wifiName}
              onChange={(e) => setWifiName(e.target.value)}
              placeholder="Введите имя сети"
              className="neumorphic-inset"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="neumorphic-inset"
            />
          </div>
        </div>

        <Button 
          onClick={handleConnect}
          disabled={!wifiName || !password}
          className="w-full py-3 text-lg gradient-orange"
        >
          Подключить устройство
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Убедитесь, что турник включен и находится в режиме настройки
          </p>
        </div>
      </NeumorphicCard>
    </div>
  );
};
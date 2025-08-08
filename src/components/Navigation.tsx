import React from 'react';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Дашборд' },
    { id: 'workout', icon: '💪', label: 'Тренировка' },
    { id: 'history', icon: '📈', label: 'История' },
    { id: 'challenges', icon: '🏆', label: 'Челленджи' }
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50">
      <NeumorphicCard className="px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200",
                currentPage === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </NeumorphicCard>
    </div>
  );
};
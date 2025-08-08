import React from 'react';
import { NeumorphicCard } from './neumorphic-card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  unit, 
  change, 
  icon, 
  className 
}: StatsCardProps) => {
  return (
    <NeumorphicCard className={cn("p-6 animate-scale-in", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              change > 0 ? "text-primary" : change < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
              {change > 0 ? "↗" : change < 0 ? "↘" : "→"} {Math.abs(change)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="text-primary text-2xl">
            {icon}
          </div>
        )}
      </div>
    </NeumorphicCard>
  );
};
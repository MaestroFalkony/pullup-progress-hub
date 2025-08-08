import React from 'react';
import { cn } from '@/lib/utils';

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'inset' | 'subtle';
  interactive?: boolean;
}

export const NeumorphicCard = ({ 
  children, 
  className, 
  variant = 'default',
  interactive = false 
}: NeumorphicCardProps) => {
  const baseClass = 'rounded-2xl transition-all duration-200';
  
  const variants = {
    default: 'neumorphic',
    inset: 'neumorphic-inset',
    subtle: 'neumorphic-subtle'
  };

  const interactiveClass = interactive 
    ? 'hover:scale-105 active:scale-95 cursor-pointer' 
    : '';

  return (
    <div 
      className={cn(
        baseClass,
        variants[variant],
        interactiveClass,
        className
      )}
    >
      {children}
    </div>
  );
};
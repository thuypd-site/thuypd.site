import React from 'react';
import { cn } from '../../core/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  hoverEffect = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#dce9ff]/70 p-6 sm:p-8 shadow-[0_4px_20px_rgba(11,28,48,0.03)]',
        hoverEffect &&
          'transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,99,152,0.08)] hover:border-[#006398]/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

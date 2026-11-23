import React from 'react';
import { STATUS_COLORS } from '@/config/constants';

interface BadgeProps {
  status: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase() as keyof typeof STATUS_COLORS;
  const colorClass = STATUS_COLORS[normalized] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${colorClass} ${className}`}
    >
      {status}
    </span>
  );
};

import React from 'react';

export interface StatusBadgeProps {
  status: 'SECURE' | 'WARNING' | 'CRITICAL' | 'SCANNING' | 'INFO';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  className = '',
}) => {
  const configs = {
    SECURE: {
      text: label || 'All Systems Secure',
      bg: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
      dot: 'bg-emerald-400',
    },
    WARNING: {
      text: label || 'Action Required',
      bg: 'bg-amber-950/70 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
      dot: 'bg-amber-400',
    },
    CRITICAL: {
      text: label || 'Critical Threat Detected',
      bg: 'bg-rose-950/70 border-rose-500/50 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse',
      dot: 'bg-rose-500',
    },
    SCANNING: {
      text: label || 'Scanning in Progress...',
      bg: 'bg-blue-950/70 border-blue-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
      dot: 'bg-cyan-400 animate-ping',
    },
    INFO: {
      text: label || 'Protected',
      bg: 'bg-slate-900/70 border-slate-700 text-slate-300',
      dot: 'bg-slate-400',
    },
  };

  const current = configs[status];
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border font-semibold backdrop-blur-md ${sizeClasses[size]} ${current.bg} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${current.dot}`} />
      <span>{current.text}</span>
    </div>
  );
};

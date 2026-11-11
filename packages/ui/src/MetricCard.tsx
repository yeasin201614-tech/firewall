import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'blue' | 'red' | 'cyan' | 'yellow' | 'green';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'blue',
  className = '',
}) => {
  const variantStyles = {
    blue: {
      border: 'border-cyber-blue/30 hover:border-cyber-blue',
      glow: 'shadow-[0_0_15px_rgba(8,123,255,0.2)]',
      iconBg: 'bg-cyber-blue/20 text-cyber-blue',
    },
    red: {
      border: 'border-cyber-red/30 hover:border-cyber-red',
      glow: 'shadow-[0_0_15px_rgba(255,64,87,0.2)]',
      iconBg: 'bg-cyber-red/20 text-cyber-red',
    },
    cyan: {
      border: 'border-cyber-cyan/30 hover:border-cyber-cyan',
      glow: 'shadow-[0_0_15px_rgba(0,217,255,0.2)]',
      iconBg: 'bg-cyber-cyan/20 text-cyber-cyan',
    },
    yellow: {
      border: 'border-amber-500/30 hover:border-amber-400',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
      iconBg: 'bg-amber-500/20 text-amber-400',
    },
    green: {
      border: 'border-cyber-green/30 hover:border-cyber-green',
      glow: 'shadow-[0_0_15px_rgba(0,214,143,0.2)]',
      iconBg: 'bg-cyber-green/20 text-cyber-green',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`relative rounded-2xl bg-[#0A1330]/90 backdrop-blur-md p-4 border transition-all duration-300 ${style.border} ${style.glow} ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${style.iconBg}`}>{icon}</div>
        {subtitle && <span className="text-xs text-slate-400 font-medium">{subtitle}</span>}
      </div>
      <div>
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        <div className="text-xs text-slate-400 font-medium mt-0.5">{title}</div>
      </div>
    </div>
  );
};

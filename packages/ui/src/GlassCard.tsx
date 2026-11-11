import React from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: 'blue' | 'cyan' | 'orange' | 'green' | 'red' | 'none';
  variant?: 'default' | 'surface' | 'active';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  glow = 'none',
  variant = 'default',
  className = '',
  ...props
}) => {
  const glowClasses = {
    none: 'border-white/10 hover:border-cyber-blue/30',
    blue: 'border-cyber-blue/40 shadow-[0_0_20px_rgba(8,123,255,0.25)] hover:border-cyber-blue',
    cyan: 'border-cyber-cyan/40 shadow-[0_0_20px_rgba(0,217,255,0.25)] hover:border-cyber-cyan',
    orange: 'border-cyber-orange/40 shadow-[0_0_20px_rgba(255,106,0,0.25)] hover:border-cyber-orange',
    green: 'border-cyber-green/40 shadow-[0_0_20px_rgba(0,214,143,0.25)] hover:border-cyber-green',
    red: 'border-cyber-red/40 shadow-[0_0_20px_rgba(255,64,87,0.25)] hover:border-cyber-red',
  };

  const bgClasses = {
    default: 'bg-[#0A1330]/80 backdrop-blur-md',
    surface: 'bg-[#101D42]/90 backdrop-blur-lg',
    active: 'bg-gradient-to-b from-[#101D42] to-[#0A1330] border-cyber-blue/50 shadow-neon-blue',
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${bgClasses[variant]} ${glowClasses[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

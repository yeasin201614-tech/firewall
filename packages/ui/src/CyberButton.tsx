import React from 'react';

export interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base font-bold rounded-2xl gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#087BFF] to-[#0062D6] text-white shadow-[0_0_20px_rgba(8,123,255,0.45)] hover:shadow-[0_0_30px_rgba(8,123,255,0.7)] hover:from-[#1A87FF] hover:to-[#0A6FE6] border border-blue-400/30',
    secondary:
      'bg-[#101D42] text-slate-200 border border-white/10 hover:border-cyber-blue/50 hover:bg-[#152554] shadow-sm',
    danger:
      'bg-gradient-to-r from-[#FF4057] to-[#D92036] text-white shadow-[0_0_20px_rgba(255,64,87,0.35)] hover:shadow-[0_0_30px_rgba(255,64,87,0.6)] border border-red-400/30',
    success:
      'bg-gradient-to-r from-[#00D68F] to-[#00A86E] text-slate-950 font-bold shadow-[0_0_20px_rgba(0,214,143,0.35)] hover:shadow-[0_0_30px_rgba(0,214,143,0.6)]',
    outline:
      'bg-transparent border border-cyber-blue/60 text-cyber-cyan hover:bg-cyber-blue/10 hover:border-cyber-cyan shadow-[0_0_15px_rgba(0,217,255,0.2)]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
};

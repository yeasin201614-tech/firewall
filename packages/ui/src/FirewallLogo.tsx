import React from 'react';

export interface FirewallLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const FirewallLogo: React.FC<FirewallLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 32, font: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 44, font: 'text-2xl', sub: 'text-[11px]' },
    lg: { icon: 64, font: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 96, font: 'text-5xl', sub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Shield Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={current.icon}
          height={current.icon}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(8,123,255,0.65)]"
        >
          <defs>
            {/* Outer Shield Gradient */}
            <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#8FA8D6" />
              <stop offset="70%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#087BFF" />
            </linearGradient>

            {/* Inner Shield Background */}
            <linearGradient id="shieldBg" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#081A45" />
              <stop offset="100%" stopColor="#020819" />
            </linearGradient>

            {/* Fire Gradient */}
            <linearGradient id="fireGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="40%" stopColor="#FF7700" />
              <stop offset="100%" stopColor="#D92000" />
            </linearGradient>

            {/* Cyan Orbital Glow Ring */}
            <linearGradient id="cyanOrbital" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#087BFF" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Shield Outline and Body */}
          <path
            d="M60 12 L98 28 C98 64 78 94 60 106 C42 94 22 64 22 28 L60 12 Z"
            fill="url(#shieldBg)"
            stroke="url(#shieldBorder)"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Glowing Brick Wall */}
          <g transform="translate(36, 48)">
            {/* Row 1 */}
            <rect x="0" y="0" width="22" height="9" rx="1.5" fill="#D9381E" stroke="#FF6A00" strokeWidth="0.8" />
            <rect x="25" y="0" width="22" height="9" rx="1.5" fill="#C22D15" stroke="#FF6A00" strokeWidth="0.8" />
            {/* Row 2 */}
            <rect x="-3" y="11" width="13" height="9" rx="1.5" fill="#B3240D" stroke="#FF6A00" strokeWidth="0.8" />
            <rect x="13" y="11" width="22" height="9" rx="1.5" fill="#E64522" stroke="#FF6A00" strokeWidth="0.8" />
            <rect x="38" y="11" width="13" height="9" rx="1.5" fill="#B3240D" stroke="#FF6A00" strokeWidth="0.8" />
            {/* Row 3 */}
            <rect x="0" y="22" width="22" height="9" rx="1.5" fill="#D9381E" stroke="#FF6A00" strokeWidth="0.8" />
            <rect x="25" y="22" width="22" height="9" rx="1.5" fill="#C22D15" stroke="#FF6A00" strokeWidth="0.8" />
          </g>

          {/* Blazing Flame */}
          <path
            d="M60 20 C64 30 73 34 73 44 C73 54 65 58 60 62 C55 58 47 54 47 44 C47 34 56 30 60 20 Z"
            fill="url(#fireGrad)"
            filter="drop-shadow(0 0 6px #FF6A00)"
          />
          <path
            d="M60 28 C62 34 67 37 67 44 C67 50 63 52 60 55 C57 52 53 50 53 44 C53 37 58 34 60 28 Z"
            fill="#FFF5A0"
          />

          {/* Secure Padlock */}
          <g transform="translate(62, 52)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))">
            {/* Shackle */}
            <path
              d="M7 10 V5 C7 2.2 9.2 0 12 0 C14.8 0 17 2.2 17 5 V10"
              stroke="#E2E8F0"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Body */}
            <rect x="3" y="9" width="18" height="15" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
            {/* Keyhole */}
            <circle cx="12" cy="15" r="2" fill="#0F172A" />
            <path d="M11 16.5 L13 16.5 L12.5 19.5 L11.5 19.5 Z" fill="#0F172A" />
          </g>

          {/* Glowing 3D Cyan Orbital Ring */}
          <ellipse
            cx="60"
            cy="70"
            rx="46"
            ry="15"
            stroke="url(#cyanOrbital)"
            strokeWidth="3.5"
            fill="none"
            transform="rotate(-18 60 70)"
            strokeDasharray="180 30"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight leading-none ${current.font}`}>
          <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Fire</span>
          <span className="bg-gradient-to-r from-[#FF6A00] via-[#FF8C00] to-[#FFAA00] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,106,0,0.5)]">
            wall
          </span>
        </div>
        {showTagline && (
          <div
            className={`font-medium tracking-wider text-slate-400 mt-1 uppercase flex items-center gap-1.5 ${current.sub}`}
          >
            <span className="w-2.5 h-[1px] bg-cyber-blue inline-block"></span>
            <span>Your Digital World, Protected.</span>
            <span className="w-2.5 h-[1px] bg-cyber-blue inline-block"></span>
          </div>
        )}
      </div>
    </div>
  );
};

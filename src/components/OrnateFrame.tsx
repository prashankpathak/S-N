import React from 'react';

export const CornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 52 }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return '';
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return 'top-1.5 left-1.5';
      case 'top-right':
        return 'top-1.5 right-1.5';
      case 'bottom-left':
        return 'bottom-1.5 left-1.5';
      case 'bottom-right':
        return 'bottom-1.5 right-1.5';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
      className={`absolute ${getPositionClass()} pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf953f" />
          <stop offset="30%" stopColor="#fcf6ba" />
          <stop offset="60%" stopColor="#b38728" />
          <stop offset="100%" stopColor="#aa771c" />
        </linearGradient>
      </defs>
      {/* Intricate Victorian Filigree Path */}
      <path
        d="M6 6 C 24 6, 42 12, 54 24 C 66 36, 70 54, 70 70 M6 6 C 6 24, 12 42, 24 54 C 36 66, 54 70, 70 70 M6 6 L 16 16 M10 4 C 30 8, 50 18, 62 34 M4 10 C 8 30, 18 50, 34 62 M20 6 C 26 22, 22 40, 6 48 M6 20 C 22 26, 40 22, 48 6 M18 18 C 28 28, 38 42, 42 58 M18 18 C 28 28, 42 38, 58 42 M14 2 C 14 14, 2 14, 2 2"
        stroke={`url(#goldGrad-${position})`}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" fill={`url(#goldGrad-${position})`} />
      <circle cx="28" cy="8" r="1.5" fill={`url(#goldGrad-${position})`} />
      <circle cx="8" cy="28" r="1.5" fill={`url(#goldGrad-${position})`} />
    </svg>
  );
};

export const RoyalCross: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 60 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf953f" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#b38728" />
          <stop offset="85%" stopColor="#fbf5b7" />
          <stop offset="100%" stopColor="#aa771c" />
        </linearGradient>
      </defs>
      {/* Vertical beam */}
      <path
        d="M27 4 C27 2 33 2 33 4 L33 74 C33 76 27 76 27 74 Z"
        fill="url(#crossGold)"
      />
      {/* Horizontal beam */}
      <path
        d="M10 23 C8 23 8 29 10 29 L50 29 C52 29 52 23 50 23 Z"
        fill="url(#crossGold)"
      />
      {/* Decorative finials */}
      <circle cx="30" cy="4" r="3.5" fill="url(#crossGold)" />
      <circle cx="30" cy="74" r="3.5" fill="url(#crossGold)" />
      <circle cx="9" cy="26" r="3.5" fill="url(#crossGold)" />
      <circle cx="51" cy="26" r="3.5" fill="url(#crossGold)" />
      {/* Center radiant diamond */}
      <polygon points="30,19 37,26 30,33 23,26" fill="#fffdfa" stroke="url(#crossGold)" strokeWidth="1.5" />
      <circle cx="30" cy="26" r="2" fill="url(#crossGold)" />
    </svg>
  );
};

export const GoldDivider: React.FC<{ className?: string; text?: string }> = ({ className = '', text }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c5a059] to-[#bf953f] opacity-60" />
      {text ? (
        <span className="font-cinzel text-xs tracking-[0.25em] text-[#8c6b2b] uppercase px-2 font-medium">
          {text}
        </span>
      ) : (
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b38728]" />
          <div className="w-2.5 h-2.5 rotate-45 border border-[#c5a059] bg-[#fbf5b7]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b38728]" />
        </div>
      )}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c5a059] to-[#bf953f] opacity-60" />
    </div>
  );
};

export const MonogramBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <div className="w-20 h-20 rounded-full border-2 border-[#c5a059]/40 p-1 bg-gradient-to-b from-[#fefbf6] to-[#f5ede0] shadow-md flex items-center justify-center">
        <div className="w-full h-full rounded-full border border-dashed border-[#b38728]/50 flex items-center justify-center relative">
          <span className="font-cormorant font-black text-2xl text-gold-shining tracking-tighter">
            S
          </span>
          <span className="font-cormorant italic text-sm text-[#8a5200] px-0.5 mt-0.5 font-black">
            &amp;
          </span>
          <span className="font-cormorant font-black text-2xl text-gold-shining tracking-tighter">
            N
          </span>
        </div>
      </div>
    </div>
  );
};

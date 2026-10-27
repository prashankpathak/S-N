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
          <stop offset="0%" stopColor="#854f05" />
          <stop offset="25%" stopColor="#d4a342" />
          <stop offset="50%" stopColor="#fff6c7" />
          <stop offset="75%" stopColor="#e1ad40" />
          <stop offset="100%" stopColor="#94590b" />
        </linearGradient>
      </defs>
      {/* Intricate Victorian Filigree Path with Double Pinstripe */}
      <path
        d="M6 6 C 24 6, 42 12, 54 24 C 66 36, 70 54, 70 70 M6 6 C 6 24, 12 42, 24 54 C 36 66, 54 70, 70 70 M6 6 L 16 16 M10 4 C 30 8, 50 18, 62 34 M4 10 C 8 30, 18 50, 34 62 M20 6 C 26 22, 22 40, 6 48 M6 20 C 22 26, 40 22, 48 6 M18 18 C 28 28, 38 42, 42 58 M18 18 C 28 28, 42 38, 58 42 M14 2 C 14 14, 2 14, 2 2"
        stroke={`url(#goldGrad-${position})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.8" fill={`url(#goldGrad-${position})`} />
      <circle cx="28" cy="8" r="1.6" fill={`url(#goldGrad-${position})`} />
      <circle cx="8" cy="28" r="1.6" fill={`url(#goldGrad-${position})`} />
      <circle cx="36" cy="36" r="1.2" fill={`url(#goldGrad-${position})`} />
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
      className={`mx-auto drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#783e00" />
          <stop offset="25%" stopColor="#ffd700" />
          <stop offset="50%" stopColor="#fffde0" />
          <stop offset="75%" stopColor="#e5a823" />
          <stop offset="100%" stopColor="#854907" />
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
      <polygon points="30,18 38,26 30,34 22,26" fill="#fffdfa" stroke="url(#crossGold)" strokeWidth="1.8" />
      <circle cx="30" cy="26" r="2.2" fill="url(#crossGold)" />
    </svg>
  );
};

export const GoldDivider: React.FC<{ className?: string; text?: string }> = ({ className = '', text }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-[#8a5b17] opacity-70" />
      {text ? (
        <span className="font-cinzel text-xs tracking-[0.25em] text-[#8a5b17] uppercase px-2 font-bold">
          {text}
        </span>
      ) : (
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b38728]" />
          <div className="w-2.5 h-2.5 rotate-45 border border-[#c5a059] bg-[#fff3a3] shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#b38728]" />
        </div>
      )}
      <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-[#8a5b17] opacity-70" />
    </div>
  );
};

export const MonogramBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      {/* Subtle outer glowing aureole */}
      <div className="w-22 h-22 rounded-full border-2 border-[#c5a059]/60 p-1 bg-gradient-to-b from-[#ffffff] via-[#fefbf6] to-[#f4e9d5] shadow-[0_6px_20px_rgba(184,122,0,0.22)] flex items-center justify-center">
        <div className="w-full h-full rounded-full border border-dashed border-[#b38728]/60 flex items-center justify-center relative bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9)_0%,rgba(251,245,230,0.5)_100%)]">
          {/* Subtle laurel leaf wreath SVG accents */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="#b38728" strokeWidth="0.8" fill="none" />
            <circle cx="50" cy="50" r="38" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="2 3" fill="none" />
          </svg>
          <span className="font-cormorant font-black text-2.5xl text-gold-shining tracking-tighter">
            S
          </span>
          <span className="font-cormorant italic text-base text-[#7c4400] px-0.5 mt-0.5 font-black">
            &amp;
          </span>
          <span className="font-cormorant font-black text-2.5xl text-gold-shining tracking-tighter">
            N
          </span>
        </div>
      </div>
    </div>
  );
};

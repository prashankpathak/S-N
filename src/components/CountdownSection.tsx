import React, { useState, useEffect } from 'react';

export const CountdownSection: React.FC = () => {
  // Target: 13 November 2026, 4:00 PM IST (UTC+05:30)
  const targetDate = new Date('2026-11-13T16:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative my-8 py-4 px-3 flex flex-col items-center text-center">
      {/* ================= PEARL NECKLACE ILLUSTRATION AROUND DATE ================= */}
      <div className="relative w-full max-w-[320px] mx-auto py-6 px-4">
        {/* SVG Pearl Necklace Frame */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 340 160"
            className="w-full h-auto drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="pearlShine" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#fffcf5" />
                <stop offset="75%" stopColor="#ede3d1" />
                <stop offset="100%" stopColor="#c5b59a" />
              </radialGradient>
              <linearGradient id="silkRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bf953f" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#aa771c" />
              </linearGradient>
            </defs>

            {/* Pearl necklace arrangement without overlapping line */}

            {/* Individual Lustrous Pearls arranged along the oval necklace curve */}
            {(() => {
              const pearls = [];
              const count = 30;
              const a = 145; // x-radius
              const b = 50;  // y-radius
              const cx = 170;
              const cy = 80;

              for (let i = 0; i < count; i++) {
                const angle = (i * 2 * Math.PI) / count;
                const px = cx + a * Math.cos(angle);
                const py = cy + b * Math.sin(angle);
                const isCenterTop = Math.abs(px - cx) < 15 && py < cy;
                const isCenterBottom = Math.abs(px - cx) < 15 && py > cy;
                const r = isCenterBottom ? 6.5 : isCenterTop ? 5.5 : 4.5;

                pearls.push(
                  <g key={i}>
                    {/* Pearl shadow */}
                    <circle cx={px + 0.8} cy={py + 1.2} r={r} fill="rgba(0,0,0,0.15)" />
                    {/* Pearl body with pearlescent gradient */}
                    <circle cx={px} cy={py} r={r} fill="url(#pearlShine)" stroke="#d4af37" strokeWidth="0.5" />
                    {/* Tiny specular highlight */}
                    <circle cx={px - r * 0.3} cy={py - r * 0.3} r={r * 0.28} fill="#ffffff" opacity="0.9" />
                  </g>
                );
              }
              return pearls;
            })()}

            {/* Gold Pendant clasp at bottom center */}
            <polygon points="170,134 175,142 170,150 165,142" fill="url(#silkRibbon)" stroke="#8c6b2b" strokeWidth="0.5" />
            <circle cx="170" cy="142" r="1.5" fill="#fff" />
          </svg>

          {/* Enclosed Date Text within the Pearl Necklace */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8c6b2b] uppercase font-semibold">
              The Wedding Day
            </span>
            <span className="font-cormorant font-bold text-2xl sm:text-3xl text-gold-foil tracking-wide mt-0.5">
              13 November 2026
            </span>
            <span className="font-cormorant italic text-xs text-[#6e5830]">
              As the clock strikes 4:00 PM IST
            </span>
          </div>
        </div>
      </div>

      {/* ================= LIVE COUNTDOWN UNITS ================= */}
      <div className="w-full max-w-[340px] mt-2">
        <div className="grid grid-cols-4 gap-2">
          {/* Days */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#faf5ec] border border-[#c5a059]/40 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#3d2f16] tabular-nums">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#8c6b2b] uppercase mt-0.5">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#faf5ec] border border-[#c5a059]/40 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#3d2f16] tabular-nums">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#8c6b2b] uppercase mt-0.5">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#faf5ec] border border-[#c5a059]/40 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-[#3d2f16] tabular-nums">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#8c6b2b] uppercase mt-0.5">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] to-[#faf5ec] border border-[#c5a059]/40 shadow-sm">
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-gold-foil tabular-nums">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#8c6b2b] uppercase mt-0.5">
              Secs
            </span>
          </div>
        </div>

        <p className="font-cormorant italic text-xs text-[#7e6438] mt-3">
          Counting down every precious second until we unite in Holy Matrimony
        </p>
      </div>
    </section>
  );
};

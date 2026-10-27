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
      {/* Section Header */}
      <div className="max-w-sm mx-auto mb-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="h-[1.5px] w-8 bg-gradient-to-r from-transparent to-[#b8860b]" />
          <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold">
            The Auspicious Countdown
          </span>
          <span className="h-[1.5px] w-8 bg-gradient-to-l from-transparent to-[#b8860b]" />
        </div>
        <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-gold-radiant">
          Counting Down To The Sacred Vows
        </h3>
      </div>

      {/* ================= LIVE COUNTDOWN UNITS ================= */}
      <div className="w-full max-w-[340px] mt-2">
        <div className="grid grid-cols-4 gap-2">
          {/* Days */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#fefbf6] to-[#f6ecda] border-2 border-[#c5a059]/50 shadow-[0_4px_12px_rgba(184,122,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
            <span className="font-cinzel text-xl sm:text-2xl font-black text-gold-shining tabular-nums">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#78350f] uppercase font-bold mt-0.5">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#fefbf6] to-[#f6ecda] border-2 border-[#c5a059]/50 shadow-[0_4px_12px_rgba(184,122,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
            <span className="font-cinzel text-xl sm:text-2xl font-black text-gold-shining tabular-nums">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#78350f] uppercase font-bold mt-0.5">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#fefbf6] to-[#f6ecda] border-2 border-[#c5a059]/50 shadow-[0_4px_12px_rgba(184,122,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
            <span className="font-cinzel text-xl sm:text-2xl font-black text-gold-shining tabular-nums">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#78350f] uppercase font-bold mt-0.5">
              Mins
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#fefbf6] to-[#f6ecda] border-2 border-[#c5a059]/50 shadow-[0_4px_12px_rgba(184,122,0,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
            <span className="font-cinzel text-xl sm:text-2xl font-black text-gold-shining tabular-nums">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="font-cinzel text-[9px] tracking-wider text-[#78350f] uppercase font-bold mt-0.5">
              Secs
            </span>
          </div>
        </div>

        <p className="font-cormorant italic text-xs text-[#7e6438] mt-3 font-semibold">
          Counting down every precious second until we unite in Holy Matrimony
        </p>
      </div>
    </section>
  );
};

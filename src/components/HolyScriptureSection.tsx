import React from 'react';
import { RoyalCross, CornerFlourish } from './OrnateFrame';

export const HolyScriptureSection: React.FC = () => {
  return (
    <section className="relative my-6 px-2 text-center" id="scripture">
      {/* Royal Christian Cross */}
      <div className="flex justify-center mb-3">
        <RoyalCross size={34} />
      </div>

      {/* Holy Scripture Card */}
      <div className="max-w-sm mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#ffffff] via-[#fbf7ee] to-[#f5ecdc] border-2 border-[#c5a059]/50 shadow-[0_4px_20px_rgba(184,122,0,0.12)] relative overflow-hidden">
        <CornerFlourish position="top-left" size={28} />
        <CornerFlourish position="top-right" size={28} />
        <CornerFlourish position="bottom-left" size={28} />
        <CornerFlourish position="bottom-right" size={28} />

        {/* Decorative watermark cross in background */}
        <div className="absolute -right-3 -bottom-5 text-[#c5a059]/10 pointer-events-none select-none font-serif text-8xl">
          ✝
        </div>

        <div className="relative z-10 space-y-2.5">
          <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold block">
            ✦ Holy Scripture ✦
          </span>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#342714] leading-relaxed font-medium px-2">
            &ldquo;By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="h-px w-8 bg-[#c5a059]/40" />
            <span className="font-cinzel text-xs font-bold text-[#8a5b17] tracking-widest">
              PROVERBS 24:3-4
            </span>
            <span className="h-px w-8 bg-[#c5a059]/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

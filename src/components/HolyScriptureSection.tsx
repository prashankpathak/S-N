import React from 'react';
import { RoyalCross, CornerFlourish } from './OrnateFrame';

export const HolyScriptureSection: React.FC = () => {
  return (
    <section className="relative my-7 px-2 text-center" id="scripture">
      {/* Royal Christian Cross with divine gold radiant effect */}
      <div className="flex justify-center mb-3.5">
        <RoyalCross size={36} />
      </div>

      {/* Holy Scripture Card */}
      <div className="max-w-sm mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#ffffff] via-[#fcf8f0] to-[#f5ebd9] border-2 border-[#b87a00]/60 shadow-[0_6px_25px_rgba(184,122,0,0.16)] relative overflow-hidden">
        {/* Subtle inner gold rim */}
        <div className="absolute inset-1.5 border border-[#c5a059]/30 rounded-xl pointer-events-none" />

        <CornerFlourish position="top-left" size={30} />
        <CornerFlourish position="top-right" size={30} />
        <CornerFlourish position="bottom-left" size={30} />
        <CornerFlourish position="bottom-right" size={30} />

        {/* Decorative watermark cross in background */}
        <div className="absolute -right-3 -bottom-5 text-[#c5a059]/12 pointer-events-none select-none font-serif text-8xl">
          ✝
        </div>

        <div className="relative z-10 space-y-3">
          <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.3em] text-[#8c6b2b] uppercase font-bold block">
            ✦ Holy Scripture ✦
          </span>

          <p className="font-cormorant italic text-lg sm:text-xl text-[#342714] leading-relaxed font-semibold px-2">
            &ldquo;By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="h-[1.5px] w-10 bg-gradient-to-r from-transparent via-[#c5a059] to-[#8a5b17]" />
            <span className="font-cinzel text-xs font-bold text-[#8a5b17] tracking-widest">
              PROVERBS 24:3-4
            </span>
            <span className="h-[1.5px] w-10 bg-gradient-to-l from-transparent via-[#c5a059] to-[#8a5b17]" />
          </div>
        </div>
      </div>
    </section>
  );
};

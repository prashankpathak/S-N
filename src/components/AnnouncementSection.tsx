import React from 'react';
import { GoldDivider, CornerFlourish } from './OrnateFrame';

export const AnnouncementSection: React.FC = () => {
  return (
    <section className="relative my-7 px-2 text-center" id="invitation">
      {/* Opening Invitation Salutation */}
      <div className="space-y-3 max-w-sm mx-auto">
        <p className="font-cinzel text-[11px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold">
          ✦ In The Name Of The Almighty ✦
        </p>

        <p className="font-cormorant text-base sm:text-lg text-[#3a2f21] leading-relaxed italic">
          &ldquo;With a heart full of gratitude &amp; immense joy,
          <br />
          <strong className="font-bold not-italic text-[#241c12] text-lg sm:text-xl block my-1">
            Mrs. Anjani Selot
          </strong>
          requests the honour of your presence at the solemnization of the Holy Matrimony of her beloved son:&rdquo;
        </p>
      </div>

      <GoldDivider className="my-5" />

      {/* Groom & Bride Royal Presentation */}
      <div className="my-5 space-y-5">
        {/* Groom */}
        <div className="space-y-1.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#fdf9f0] to-[#f8edd7] border-2 border-[#b87a00]/80 shadow-[0_8px_25px_rgba(184,122,0,0.2)] max-w-sm mx-auto relative overflow-hidden">
          {/* Top shimmering gold ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-95" />
          <div className="absolute inset-1.5 border border-[#d4af37]/30 rounded-xl pointer-events-none" />
          <CornerFlourish position="top-left" size={24} />
          <CornerFlourish position="top-right" size={24} />

          <span className="font-cinzel text-[10px] tracking-[0.26em] text-[#8a5200] uppercase font-bold block">
            The Groom
          </span>

          <h2 className="font-cormorant font-black text-3xl sm:text-4xl text-gold-shining tracking-tight leading-tight">
            Samarthya Solomon Selot
          </h2>

          <p className="font-cormorant italic text-sm sm:text-base text-[#4d3a22] font-semibold mt-1">
            (S/o Mrs. Anjani Selot &amp; Late Mr. Raveesh Selot)
          </p>
        </div>

        {/* Cursive & ligature */}
        <div className="flex items-center justify-center my-2">
          <div className="h-[2px] w-14 bg-gradient-to-r from-transparent via-[#d4af37] to-[#b87a00]" />
          <span className="font-vibes text-4xl sm:text-5xl text-gold-shining px-4 -mt-2">
            and
          </span>
          <div className="h-[2px] w-14 bg-gradient-to-l from-transparent via-[#d4af37] to-[#b87a00]" />
        </div>

        {/* Bride */}
        <div className="space-y-1.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#fdf9f0] to-[#f8edd7] border-2 border-[#b87a00]/80 shadow-[0_8px_25px_rgba(184,122,0,0.2)] max-w-sm mx-auto relative overflow-hidden">
          {/* Top shimmering gold ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-95" />
          <div className="absolute inset-1.5 border border-[#d4af37]/30 rounded-xl pointer-events-none" />
          <CornerFlourish position="top-left" size={24} />
          <CornerFlourish position="top-right" size={24} />

          <span className="font-cinzel text-[10px] tracking-[0.26em] text-[#8a5200] uppercase font-bold block">
            The Bride
          </span>

          <h2 className="font-cormorant font-black text-3xl sm:text-4xl text-gold-shining tracking-tight leading-tight">
            Nikita Martin
          </h2>

          <p className="font-cormorant italic text-sm sm:text-base text-[#4d3a22] font-semibold mt-1">
            (D/o Mrs. Reena Martin &amp; Mr. Surendra Martin)
          </p>
        </div>
      </div>
    </section>
  );
};

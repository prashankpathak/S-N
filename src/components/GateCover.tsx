import React, { useState } from 'react';
import { weddingAudio } from '../utils/audio';
import { CornerFlourish, RoyalCross } from './OrnateFrame';

interface GateCoverProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose?: () => void;
}

export const GateCover: React.FC<GateCoverProps> = ({ isOpen, onOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTap = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    // Smoothly start the user's flute background music immediately on tap
    weddingAudio.playBackgroundMusic();

    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 1100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      } bg-[#0a0907]/95 backdrop-blur-md select-none`}
      aria-hidden={isOpen}
    >
      {/* Centered mobile envelope container (380px - 440px max) */}
      <div className="relative w-full max-w-[430px] h-[92vh] max-h-[820px] mx-4 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-2 border-[#d4af37]/60 gate-perspective bg-[#130f0a]">
        {/* Subtle gold dust background behind doors */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a2810]/40 via-[#15110c] to-[#0a0805]" />

        {/* Cathedral Arch Top Ribbon Header */}
        <div className="absolute top-0 left-0 right-0 z-25 flex items-center justify-center pointer-events-none pt-2">
          <div className="px-4 py-1 rounded-b-xl bg-gradient-to-b from-[#2a1f11] to-[#1a140b] border-x border-b border-[#d4af37]/50 shadow-md flex items-center gap-2">
            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
            <span className="font-cinzel text-[9px] font-bold text-[#f3e5ab] tracking-[0.28em] uppercase">
              The Royal Invitation
            </span>
            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
          </div>
        </div>

        {/* ================= LEFT DOOR LEAF ================= */}
        <div
          onClick={handleTap}
          className={`door-left absolute inset-y-0 left-0 w-1/2 z-20 cursor-pointer select-none bg-gradient-to-r from-[#faf6ec] via-[#f7f0e0] to-[#ecdcc0] border-r border-[#d4af37]/80 shadow-[6px_0_20px_rgba(0,0,0,0.3)] ${
            isOpen || isAnimating ? 'open' : ''
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 75%),
                              url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 4 C28 14 36 18 44 20 C36 24 32 32 30 40 C26 32 18 32 14 40 C14 32 10 24 2 20 C10 20 18 14 24 4 Z' fill='%23b8860b' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          {/* Inner embossed gold filigree border */}
          <div className="absolute inset-3 border-2 border-[#d4af37]/50 rounded-l-xl pointer-events-none shadow-[inset_0_0_12px_rgba(212,175,55,0.1)]" />
          <div className="absolute inset-4 border border-dashed border-[#b38728]/40 rounded-l-lg pointer-events-none" />

          {/* Left Corner flourishes */}
          <CornerFlourish position="top-left" size={48} />
          <CornerFlourish position="bottom-left" size={48} />

          {/* Left Door Content */}
          <div className="h-full flex flex-col justify-between pt-14 pb-10 px-3 text-right">
            {/* Top Zone: Groom Name (Bold, Shining & Prominent) */}
            <div className="flex flex-col items-end pr-2 sm:pr-4">
              <div className="flex items-center gap-1 mb-1 opacity-90">
                <div className="w-1 h-1 rotate-45 bg-[#b87a00]" />
                <span className="font-cinzel text-[8.5px] sm:text-[9.5px] tracking-[0.24em] text-[#8a5200] uppercase font-bold">
                  Holy Matrimony
                </span>
              </div>

              <h2 className="font-cormorant font-black text-3.5xl sm:text-4xl text-gold-shining tracking-tight leading-tight mt-1 whitespace-nowrap">
                Samarthya
              </h2>

              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.22em] text-[#6b3d00] font-black uppercase mt-1">
                Solomon Selot
              </p>

              <div className="w-16 h-[2px] bg-gradient-to-l from-[#d4af37] via-[#f59e0b] to-transparent mt-2.5" />
            </div>

            {/* Middle Zone: Clean ornamental relief framing the center brooch */}
            <div className="w-full flex items-center justify-end pr-3 opacity-20 pointer-events-none" aria-hidden="true">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#b87a00]" />
            </div>

            {/* Bottom Zone: Date & Time */}
            <div className="flex flex-col items-end pr-2 sm:pr-4">
              <div className="w-12 h-[1.5px] bg-gradient-to-l from-[#d4af37] to-transparent mb-1.5" />
              <p className="font-cinzel text-[10px] tracking-[0.24em] text-[#8a5200] uppercase font-black">
                13 · NOV · 2026
              </p>
              <p className="font-cormorant italic text-xs text-[#523d1d] font-bold mt-0.5">
                Friday at 4:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT DOOR LEAF ================= */}
        <div
          onClick={handleTap}
          className={`door-right absolute inset-y-0 right-0 w-1/2 z-20 cursor-pointer select-none bg-gradient-to-l from-[#faf6ec] via-[#f7f0e0] to-[#ecdcc0] border-l border-[#d4af37]/80 shadow-[-6px_0_20px_rgba(0,0,0,0.3)] ${
            isOpen || isAnimating ? 'open' : ''
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 85% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 75%),
                              url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 4 C28 14 36 18 44 20 C36 24 32 32 30 40 C26 32 18 32 14 40 C14 32 10 24 2 20 C10 20 18 14 24 4 Z' fill='%23b8860b' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          {/* Inner embossed gold filigree border */}
          <div className="absolute inset-3 border-2 border-[#d4af37]/50 rounded-r-xl pointer-events-none shadow-[inset_0_0_12px_rgba(212,175,55,0.1)]" />
          <div className="absolute inset-4 border border-dashed border-[#b38728]/40 rounded-r-lg pointer-events-none" />

          {/* Right Corner flourishes */}
          <CornerFlourish position="top-right" size={48} />
          <CornerFlourish position="bottom-right" size={48} />

          {/* Right Door Content */}
          <div className="h-full flex flex-col justify-between pt-14 pb-10 px-3 text-left">
            {/* Top Zone: Bride Name (Bold, Shining & Prominent) */}
            <div className="flex flex-col items-start pl-2 sm:pl-4">
              <div className="flex items-center gap-1 mb-1 opacity-90">
                <span className="font-cinzel text-[8.5px] sm:text-[9.5px] tracking-[0.24em] text-[#8a5200] uppercase font-bold">
                  In Divine Grace
                </span>
                <div className="w-1 h-1 rotate-45 bg-[#b87a00]" />
              </div>

              <h2 className="font-cormorant font-black text-3.5xl sm:text-4xl text-gold-shining tracking-tight leading-tight mt-1 whitespace-nowrap">
                Nikita
              </h2>

              <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.22em] text-[#6b3d00] font-black uppercase mt-1">
                Martin
              </p>

              <div className="w-16 h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-transparent mt-2.5" />
            </div>

            {/* Middle Zone: Clean ornamental relief framing the center brooch */}
            <div className="w-full flex items-center justify-start pl-3 opacity-20 pointer-events-none" aria-hidden="true">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#b87a00]" />
            </div>

            {/* Bottom Zone: Church & City */}
            <div className="flex flex-col items-start pl-2 sm:pl-4">
              <div className="w-12 h-[1.5px] bg-gradient-to-r from-[#d4af37] to-transparent mb-1.5" />
              <p className="font-cinzel text-[10px] tracking-[0.24em] text-[#8a5200] uppercase font-black">
                JABALPUR · INDIA
              </p>
              <p className="font-cormorant italic text-xs text-[#523d1d] font-bold mt-0.5">
                Disciples Church of Christ
              </p>
            </div>
          </div>
        </div>

        {/* ================= ROYAL PEARL BROOCH MEDALLION (CENTER LOCK) ================= */}
        <div
          onClick={handleTap}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-35 flex flex-col items-center cursor-pointer transition-all duration-700 ${
            isOpen || isAnimating ? 'scale-75 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          }`}
          title="Click to unfold the royal invitation"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTap();
            }
          }}
          aria-label="Royal wedding brooch - tap to unfold invitation"
        >
          {/* Opulent Pearl Brooch with Sunburst Backing */}
          <div className="relative w-28 h-28 rounded-full flex items-center justify-center p-2 animate-float">
            {/* Golden Sunburst Glow Behind Brooch */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/30 via-[#ffd700]/40 to-[#d4af37]/30 blur-md pointer-events-none" />

            {/* Outer Concentric Pearl Wreath (18 Large Lustrous Pearls) */}
            <div className="absolute inset-0 rounded-full border border-[#d4af37]/70 shadow-[0_8px_25px_rgba(0,0,0,0.35)] flex items-center justify-center">
              {[...Array(18)].map((_, i) => {
                const angle = (i * 360) / 18;
                const rad = (angle * Math.PI) / 180;
                const r = 46; // radius
                const x = Math.round(r * Math.cos(rad));
                const y = Math.round(r * Math.sin(rad));
                return (
                  <div
                    key={i}
                    className="pearl-bead w-3.5 h-3.5 rounded-full absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  />
                );
              })}
            </div>

            {/* Inner Antique Champagne Gold Medallion with Cross and Monogram */}
            <div className="pearl-brooch-core w-18 h-18 rounded-full border-2 border-[#b87a00] flex flex-col items-center justify-center text-center shadow-inner relative z-10 p-1">
              <RoyalCross size={20} className="mb-0.5 opacity-95 text-[#6b3d00]" />
              <div className="font-cinzel font-black text-[11px] text-[#4d2c00] tracking-widest leading-none">
                S ❦ N
              </div>
            </div>
          </div>

          {/* Delicate Royal Whisper Indicator */}
          <div className="mt-4 flex flex-col items-center pointer-events-none">
            <div className="px-4 py-1 rounded-full bg-[#2a1d0d]/80 border border-[#d4af37]/60 shadow-lg backdrop-blur-xs flex items-center gap-1.5 animate-pulse-glow">
              <span className="text-[#ffd700] text-xs">✦</span>
              <span className="font-cinzel text-[9.5px] font-bold text-[#fff2a8] tracking-[0.25em] uppercase">
                Tap to Unfold
              </span>
              <span className="text-[#ffd700] text-xs">✦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

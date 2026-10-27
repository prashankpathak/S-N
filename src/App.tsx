import { useState } from 'react';
import { GateCover } from './components/GateCover';
import { AudioControls } from './components/AudioControls';
import { HolyScriptureSection } from './components/HolyScriptureSection';
import { ScratchToRevealDate } from './components/ScratchToRevealDate';
import { AnnouncementSection } from './components/AnnouncementSection';
import { CountdownSection } from './components/CountdownSection';
import { EventsTimeline } from './components/EventsTimeline';
import { FamilyBlessingsSection } from './components/FamilyBlessingsSection';
import { CornerFlourish, GoldDivider, MonogramBadge } from './components/OrnateFrame';
import { Calendar, Heart, Sparkles, MapPin, Phone } from 'lucide-react';

export default function App() {
  const [isGateOpen, setIsGateOpen] = useState(false);

  const handleOpenGate = () => {
    setIsGateOpen(true);
  };

  const handleReopenGate = () => {
    setIsGateOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#2e261f] flex flex-col items-center justify-start antialiased relative selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      {/* Background ambient gold dust pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 3D Gate Cover / Doors Overlay */}
      <GateCover
        isOpen={isGateOpen}
        onOpen={handleOpenGate}
        onClose={handleReopenGate}
      />

      {/* Main Mobile-First Wrapper Container (max 480px on desktop, fluid on mobile) */}
      <div className="w-full max-w-[480px] min-h-screen bg-[#fffdfa] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-[#c5a059]/20 flex flex-col relative z-10 transition-all">
        {/* Floating Top Audio & Gate Navigation */}
        <AudioControls onReopenGate={handleReopenGate} isGateOpen={isGateOpen} />

        {/* ================= HERO INVITATION CARD (DECKLE EDGE) ================= */}
        <main className="flex-1 pb-24">
          <div className="p-3 sm:p-5 relative">
            {/* Outer deckle paper border with gold rim */}
            <div className="deckle-paper relative p-4 sm:p-6 rounded-3xl border-2 border-[#c5a059]/40 shadow-xl overflow-hidden">
              {/* Corner Victorian flourishes on main card */}
              <CornerFlourish position="top-left" size={48} />
              <CornerFlourish position="top-right" size={48} />
              <CornerFlourish position="bottom-left" size={48} />
              <CornerFlourish position="bottom-right" size={48} />

              {/* Monogram Crest */}
              <div className="text-center pt-3 pb-1">
                <MonogramBadge />
              </div>

              {/* ================= 1. HOLY SCRIPTURE ================= */}
              <HolyScriptureSection />

              <GoldDivider className="my-6 opacity-70" />

              {/* ================= 2. SCRATCH TO REVEAL THE DATE ================= */}
              <ScratchToRevealDate />

              <GoldDivider className="my-6 opacity-70" />

              {/* ================= 3. INVITATION ("WITH A HEART FULL OF GRATITUDE") ================= */}
              <AnnouncementSection />

              <GoldDivider className="my-6 opacity-70" />

              {/* ================= 4. COUNTDOWN ================= */}
              <CountdownSection />

              <GoldDivider className="my-6 opacity-70" />

              {/* ================= 5. EVENTS TIMELINE (NO DRESS CODE) ================= */}
              <EventsTimeline />

              <GoldDivider className="my-6 opacity-70" />

              {/* ================= 6. FAMILY BLESSINGS & CONTACT ================= */}
              <FamilyBlessingsSection />

              {/* Footer Note */}
              <footer className="mt-10 pt-6 border-t border-[#e8dcbe] text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-gold-shining font-cinzel text-base sm:text-lg font-black tracking-widest">
                  <span>SAMARTHYA</span>
                  <span className="text-[#d4af37]">❦</span>
                  <span>NIKITA</span>
                </div>
                <p className="font-cormorant italic text-xs text-[#705a3c]">
                  November 13, 2026 · Jabalpur, Madhya Pradesh
                </p>
                <p className="font-cinzel text-[9px] tracking-widest text-[#a89371] uppercase">
                  Solemnization of Holy Matrimony
                </p>
              </footer>
            </div>
          </div>
        </main>

        {/* ================= FIXED BOTTOM QUICK NAV BAR (MOBILE THUMB ZONE) ================= */}
        {isGateOpen && (
          <nav
            aria-label="Quick wedding navigation"
            className="fixed bottom-0 left-0 right-0 z-40 max-w-[480px] mx-auto bg-[#fffdfa]/95 backdrop-blur-md border-t border-[#c5a059]/40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-3 py-2 flex items-center justify-around"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 text-[#8c6b2b] hover:text-[#423218] active:scale-95 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold">
                Home
              </span>
            </button>

            <button
              onClick={() => scrollToSection('scratch-date')}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 text-[#8c6b2b] hover:text-[#423218] active:scale-95 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold">
                Date
              </span>
            </button>

            <button
              onClick={() => scrollToSection('itinerary')}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 text-[#8c6b2b] hover:text-[#423218] active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4" />
              <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold">
                Schedule
              </span>
            </button>

            <button
              onClick={() => scrollToSection('blessings')}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 text-[#8c6b2b] hover:text-[#423218] active:scale-95 transition-transform"
            >
              <Heart className="w-4 h-4" />
              <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold">
                Blessings
              </span>
            </button>

            <button
              onClick={() => scrollToSection('blessings')}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 text-[#8c6b2b] hover:text-[#423218] active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4" />
              <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold">
                Contact
              </span>
            </button>

            <a
              href="https://maps.google.com/?q=Disciples+Church+of+Christ+Nagrath+Chowk+Jabalpur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 text-[#8c6b2b] hover:text-[#423218] active:scale-95 transition-transform"
            >
              <MapPin className="w-4 h-4" />
              <span className="font-cinzel text-[9px] tracking-wider uppercase font-semibold">
                Church
              </span>
            </a>
          </nav>
        )}
      </div>
    </div>
  );
}

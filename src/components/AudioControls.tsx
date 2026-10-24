import React, { useState, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';
import { Volume2, VolumeX, DoorOpen } from 'lucide-react';

interface AudioControlsProps {
  onReopenGate: () => void;
  isGateOpen: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ onReopenGate, isGateOpen }) => {
  const [isPlaying, setIsPlaying] = useState(() => weddingAudio.isPlaying());

  const toggleMusic = () => {
    weddingAudio.toggleAmbientMusic((state) => {
      setIsPlaying(state);
    });
  };

  useEffect(() => {
    setIsPlaying(weddingAudio.isPlaying());
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isGateOpen) return null;

  return (
    <header className="sticky top-0 z-40 w-full max-w-[480px] mx-auto px-4 py-2 bg-[#0d0c0a]/85 backdrop-blur-md border-b border-[#c5a059]/30 flex items-center justify-between text-xs transition-all">
      {/* Brand Monogram */}
      <div className="flex items-center gap-2">
        <span className="font-cinzel text-xs font-black text-gold-shining tracking-widest">
          S ❦ N
        </span>
        <span className="text-[10px] text-[#a89371] font-cormorant italic hidden sm:inline">
          13 Nov 2026
        </span>
      </div>

      {/* Floating Action Controls */}
      <div className="flex items-center gap-2">
        {/* Door Re-view button */}
        <button
          onClick={onReopenGate}
          className="min-h-[36px] px-2.5 py-1 rounded-full border border-[#c5a059]/40 bg-[#1e1810] hover:bg-[#2c2214] text-[#d4af37] font-cinzel text-[10px] font-medium tracking-wider flex items-center gap-1.5 active:scale-95 transition-all"
          title="Re-close doors to experience opening animation again"
        >
          <DoorOpen className="w-3.5 h-3.5" />
          <span>Cover</span>
        </button>

        {/* Ambient Royal Music Toggle */}
        <button
          onClick={toggleMusic}
          className={`min-h-[36px] px-3 py-1 rounded-full border font-cinzel text-[10px] font-semibold tracking-wider flex items-center gap-1.5 active:scale-95 transition-all shadow-sm ${
            isPlaying
              ? 'border-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-[#241906] shadow-[#d4af37]/20 animate-pulse-glow'
              : 'border-[#c5a059]/40 bg-[#1e1810] text-[#d4af37] hover:bg-[#2c2214]'
          }`}
          aria-label={isPlaying ? 'Mute royal harp music' : 'Play royal wedding harp music'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              <span>Music On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-70" />
              <span>Play Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

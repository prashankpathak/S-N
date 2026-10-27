import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { CornerFlourish } from './OrnateFrame';

export const ScratchToRevealDate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  // Play a soft sweet celebration chime on reveal using Web Audio API
  const playRevealChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.65);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Initialize canvas with luxurious gold foil coating
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 340;
    const height = 210;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Reset composite mode
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#b8860b');
    grad.addColorStop(0.2, '#ffd700');
    grad.addColorStop(0.4, '#d4af37');
    grad.addColorStop(0.65, '#fef08a');
    grad.addColorStop(0.85, '#aa771c');
    grad.addColorStop(1, '#8a5200');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add subtle gold foil shimmer noise & border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.strokeStyle = 'rgba(110, 68, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Decorative sparkles on foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 28; i++) {
      const rx = (i * 47) % (width - 30) + 15;
      const ry = (i * 31) % (height - 30) + 15;
      ctx.beginPath();
      ctx.arc(rx, ry, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Calligraphic instruction text on the scratch surface
    ctx.textAlign = 'center';
    ctx.fillStyle = '#2b1b04';
    ctx.font = 'bold 11px Cinzel, serif';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, 60);

    ctx.fillStyle = '#422a08';
    ctx.font = 'bold 20px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('The Auspicious Date', width / 2, 92);

    // Scratch icon emblem circle
    ctx.strokeStyle = '#63400a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(width / 2, 132, 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '16px serif';
    ctx.fillText('✨', width / 2, 138);

    ctx.fillStyle = '#4a300a';
    ctx.font = 'italic 12px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Rub with your finger or cursor here', width / 2, 175);

    setIsRevealed(false);
    setScratchProgress(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Scratch drawing logic
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, 26 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Check progress periodically (random sample)
    if (Math.random() < 0.25) {
      checkProgress();
    }
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = Math.floor(canvas.width);
    const h = Math.floor(canvas.height);

    // Sample pixels across a grid
    const sampleStep = 18 * Math.floor(dpr);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let transparentPixels = 0;
    let totalSamples = 0;

    for (let y = 0; y < h; y += sampleStep) {
      for (let x = 0; x < w; x += sampleStep) {
        const index = (y * w + x) * 4 + 3; // Alpha channel
        totalSamples++;
        if (data[index] < 128) {
          transparentPixels++;
        }
      }
    }

    const ratio = Math.round((transparentPixels / (totalSamples || 1)) * 100);
    setScratchProgress(ratio);

    // When 35% or more is scratched, reveal completely
    if (ratio >= 35) {
      revealFullDate();
    }
  };

  const revealFullDate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setIsRevealed(true);
    setScratchProgress(100);
    playRevealChime();
  };

  // Touch event handlers (with preventDefault so scratching doesn't scroll page)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const touch = e.touches[0];
    if (touch) scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    checkProgress();
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    checkProgress();
  };

  return (
    <section className="relative my-7 px-2 text-center" id="scratch-date">
      {/* Section Header */}
      <div className="max-w-sm mx-auto mb-3">
        <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#b87a00]" />
          <span>Interactive Reveal</span>
          <Sparkles className="w-3.5 h-3.5 text-[#b87a00]" />
        </span>
        <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-gold-foil mt-0.5">
          Scratch to Reveal the Date
        </h3>
        <p className="font-cormorant italic text-xs sm:text-sm text-[#5c4930] mt-0.5">
          Unveil the auspicious moment chosen under Heaven’s grace
        </p>
      </div>

      {/* Main Scratch Card Container */}
      <div
        ref={containerRef}
        className="relative max-w-sm mx-auto h-[210px] rounded-2xl overflow-hidden border-2 border-[#b87a00] shadow-[0_8px_25px_rgba(184,122,0,0.22)] select-none"
      >
        {/* ================= CARD CONTENT BENEATH (THE REVEAL) ================= */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fbf6ec] to-[#f4e8d3] p-4 flex flex-col items-center justify-center text-center">
          <CornerFlourish position="top-left" size={26} />
          <CornerFlourish position="top-right" size={26} />
          <CornerFlourish position="bottom-left" size={26} />
          <CornerFlourish position="bottom-right" size={26} />

          <span className="font-cinzel text-[9px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold block mb-1">
            ✦ Save The Auspicious Date ✦
          </span>

          <div className="my-1">
            <span className="font-cormorant font-black text-2xl sm:text-3xl text-gold-shining tracking-wide block leading-tight">
              Friday, 13 November 2026
            </span>
            <span className="font-cinzel text-xs font-bold text-[#8a5b17] tracking-widest block mt-0.5">
              As the clock strikes 4:00 PM IST
            </span>
          </div>


          <p className="font-cormorant text-xs sm:text-sm text-[#382b18] font-medium leading-tight">
            Disciples Church of Christ, CNI
            <br />
            <span className="text-[11px] text-[#6b5539]">Nagrath Chowk, Jabalpur (M.P.)</span>
          </p>

          <span className="font-vibes text-xl text-gold-shining mt-1">
            Samarthya &amp; Nikita
          </span>
        </div>

        {/* ================= CANVAS OVERLAY (THE SCRATCH FOIL) ================= */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none z-10 transition-opacity duration-300"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label="Interactive scratch card to reveal wedding date"
          />
        )}
      </div>

      {/* Action Controls & Hint */}
      <div className="max-w-sm mx-auto mt-2.5 flex items-center justify-between gap-2 px-1">
        {!isRevealed ? (
          <>
            <span className="text-[11px] font-cormorant italic text-[#6f5637] flex items-center gap-1">
              <span>Rub gold foil to reveal</span>
              {scratchProgress > 0 && (
                <span className="font-mono text-[10px] text-[#8c6b2b]">
                  ({scratchProgress}%)
                </span>
              )}
            </span>
            <button
              onClick={revealFullDate}
              className="py-1.5 px-3 rounded-lg border border-[#c5a059] bg-[#fffdf9] hover:bg-[#f6ebd7] text-[#4d391d] font-cinzel text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
            >
              <Sparkles className="w-3 h-3 text-[#b87a00]" />
              <span>Tap to Reveal</span>
            </button>
          </>
        ) : (
          <div className="w-full flex items-center justify-between bg-[#fbf7ee] py-1.5 px-3 rounded-xl border border-[#c5a059]/40">
            <span className="text-xs font-cinzel text-emerald-800 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Date Revealed!</span>
            </span>
            <button
              onClick={initCanvas}
              className="py-1 px-2.5 rounded-lg border border-[#c5a059]/50 bg-white hover:bg-[#fff9ed] text-[#4d391d] font-cinzel text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs active:scale-95 transition-transform"
              title="Scratch again"
            >
              <RefreshCw className="w-3 h-3 text-[#8c6b2b]" />
              <span>Scratch Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CornerFlourish } from './OrnateFrame';

export const ScratchToRevealDate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const isScratchingRef = useRef(false);
  const lastCheckTimeRef = useRef<number>(0);
  const checkRafRef = useRef<number | null>(null);

  const [isRevealed, setIsRevealed] = useState(() => {
    try {
      return sessionStorage.getItem('wedding_date_revealed') === 'true';
    } catch {
      return false;
    }
  });
  const isRevealedRef = useRef(isRevealed);
  isRevealedRef.current = isRevealed;

  const [isFading, setIsFading] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(isRevealed ? 100 : 0);

  // Sweet celebratory chime on reveal using Web Audio API
  const playRevealChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
  const initCanvas = useCallback((force = false) => {
    if (isRevealedRef.current && !force) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 340;
    const height = 210;

    // Use device pixel ratio for crystal clear rendering, capped at 2 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear entire buffer cleanly
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // apply DPR scaling cleanly

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

    // Add subtle gold foil shimmer borders
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

    // Prepare tiny offscreen canvas for superfast 0.1ms progress calculation
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = 40;
      offscreenCanvasRef.current.height = 25;
    }

    if (force) {
      setIsRevealed(false);
      setIsFading(false);
      setScratchProgress(0);
      lastPointRef.current = null;
      isScratchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isRevealedRef.current) {
      initCanvas();
    }
    const handleResize = () => {
      if (!isRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (checkRafRef.current) {
        cancelAnimationFrame(checkRafRef.current);
      }
    };
  }, [initCanvas]);

  // Ultra-fast progress checker using a downsampled 40x25 offscreen buffer (1,000 samples vs 250,000)
  const checkProgressFast = useCallback(() => {
    if (isRevealedRef.current || isFading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const offscreen = offscreenCanvasRef.current;
    if (!offscreen) return;

    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    // Draw main canvas scaled down to 40x25
    offCtx.clearRect(0, 0, 40, 25);
    offCtx.drawImage(canvas, 0, 0, 40, 25);

    // Extract alpha from tiny 1,000-pixel buffer (takes < 0.05ms, completely imperceptible, zero lag)
    const imgData = offCtx.getImageData(0, 0, 40, 25);
    const data = imgData.data;
    let transparentCount = 0;
    const totalPixels = 40 * 25;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 64) {
        transparentCount++;
      }
    }

    const ratio = Math.round((transparentCount / totalPixels) * 100);
    setScratchProgress(ratio);

    // When 35% or more is scratched, smoothly trigger reveal
    if (ratio >= 35) {
      triggerSmoothReveal();
    }
  }, [isFading]);

  // Smooth fade-out reveal animation
  const triggerSmoothReveal = useCallback(() => {
    if (isFading || isRevealedRef.current) return;
    setIsFading(true);
    playRevealChime();
    setScratchProgress(100);

    setTimeout(() => {
      isRevealedRef.current = true;
      setIsRevealed(true);
      setIsFading(false);
      try {
        sessionStorage.setItem('wedding_date_revealed', 'true');
      } catch {
        // ignore
      }
    }, 380);
  }, [isFading, playRevealChime]);

  // Continuous stroke interpolation for buttery smooth 60fps / 120fps scratching
  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed || isFading) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // IMPORTANT: Context already has ctx.setTransform(dpr, 0, 0, dpr, 0, 0) active.
    // Coordinates and lineWidth must be in standard CSS pixels so they accurately track the touch/cursor.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 44;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };

    // Responsive progress check (120ms throttle for instant reaction)
    const now = performance.now();
    if (now - lastCheckTimeRef.current > 120) {
      lastCheckTimeRef.current = now;
      if (checkRafRef.current) cancelAnimationFrame(checkRafRef.current);
      checkRafRef.current = requestAnimationFrame(checkProgressFast);
    }
  };

  // Unified Pointer Events (works flawlessly on mobile touch, stylus, and desktop mouse)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed || isFading) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isScratchingRef.current = true;
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || isRevealed || isFading) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    isScratchingRef.current = false;
    lastPointRef.current = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    checkProgressFast();
  };

  // Window global release listener so pointer never gets stuck if dragged outside
  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isScratchingRef.current) {
        isScratchingRef.current = false;
        lastPointRef.current = null;
        checkProgressFast();
      }
    };
    window.addEventListener('pointerup', handleGlobalRelease);
    window.addEventListener('pointercancel', handleGlobalRelease);
    return () => {
      window.removeEventListener('pointerup', handleGlobalRelease);
      window.removeEventListener('pointercancel', handleGlobalRelease);
    };
  }, [checkProgressFast]);

  // Reset scratch card to pristine condition for Scratch Again
  const handleScratchAgain = useCallback(() => {
    if (checkRafRef.current) {
      cancelAnimationFrame(checkRafRef.current);
      checkRafRef.current = null;
    }
    try {
      sessionStorage.removeItem('wedding_date_revealed');
    } catch {
      // ignore
    }
    isRevealedRef.current = false;
    setIsFading(false);
    setIsRevealed(false);
    setScratchProgress(0);
    lastPointRef.current = null;
    isScratchingRef.current = false;

    // Use requestAnimationFrame to ensure the canvas is re-rendered and ready
    requestAnimationFrame(() => {
      initCanvas(true);
    });
  }, [initCanvas]);

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

      {/* Main Scratch Card Container with GPU Acceleration */}
      <div
        ref={containerRef}
        className="relative max-w-sm mx-auto h-[210px] rounded-2xl overflow-hidden border-2 border-[#b87a00] shadow-[0_8px_25px_rgba(184,122,0,0.22)] select-none transform-gpu"
        style={{ touchAction: 'none' }}
      >
        {/* ================= CARD CONTENT BENEATH (THE REVEAL) ================= */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fbf6ec] to-[#f4e8d3] p-4 flex flex-col items-center justify-center text-center">
          <CornerFlourish position="top-left" size={26} />
          <CornerFlourish position="top-right" size={26} />
          <CornerFlourish position="bottom-left" size={26} />
          <CornerFlourish position="bottom-right" size={26} />

          <span className="font-cinzel text-[10px] tracking-[0.28em] text-[#8c6b2b] uppercase font-bold block mb-1">
            ✦ Save The Auspicious Date ✦
          </span>

          <div className="my-2">
            <span className="font-cormorant font-black text-3xl sm:text-4xl text-gold-shining tracking-wide block leading-tight">
              Friday, 13 November 2026
            </span>
          </div>

          <p className="font-cormorant text-xs sm:text-sm text-[#382b18] font-medium leading-tight mt-1">
            Disciples Church of Christ, CNI
            <br />
            <span className="text-[11px] text-[#6b5539]">Nagrath Chowk, Jabalpur (M.P.)</span>
          </p>
        </div>

        {/* ================= CANVAS OVERLAY (THE SCRATCH FOIL) - ALWAYS MOUNTED FOR INSTANT SCRATCH AGAIN ================= */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 cursor-pointer touch-none z-10 transition-opacity duration-350 ease-out ${
            isRevealed || isFading
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 pointer-events-auto'
          }`}
          style={{ willChange: 'opacity, transform', touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Interactive scratch card to reveal wedding date"
        />
      </div>

      {/* Action Controls & Hint */}
      <div className="max-w-sm mx-auto mt-2.5 flex items-center justify-between gap-2 px-1">
        {!isRevealed ? (
          <>
            <span className="text-[11px] font-cormorant italic text-[#6f5637] flex items-center gap-1">
              <span>Rub gold foil to reveal</span>
              {scratchProgress > 0 && (
                <span className="font-mono text-[10px] text-[#8c6b2b] font-bold">
                  ({scratchProgress}%)
                </span>
              )}
            </span>
            <button
              onClick={triggerSmoothReveal}
              className="py-1.5 px-3 rounded-lg border border-[#c5a059] bg-[#fffdf9] hover:bg-[#f6ebd7] text-[#4d391d] font-cinzel text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
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
              onClick={handleScratchAgain}
              className="py-1 px-2.5 rounded-lg border border-[#c5a059]/50 bg-white hover:bg-[#fff9ed] text-[#4d391d] font-cinzel text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
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


import confetti from 'canvas-confetti';

// Strictly gold and cream wedding celebration color palette
export const GOLD_AND_CREAM_PALETTE = [
  '#D4AF37', // Royal Gold
  '#FFD700', // Bright Shimmering Gold
  '#F5D77F', // Champagne Gold
  '#C5A059', // Metallic Antique Gold
  '#E6C200', // Rich Gold
  '#FFFDD0', // Classic Cream
  '#FAF6EE', // Warm Ivory
  '#F5EEDB', // Soft Pearl Cream
  '#FBF7F0', // Vanilla Silk
];

/**
 * Triggers an opulent gold and cream confetti shower to celebrate
 * the opening of the royal wedding gates.
 */
export function triggerGateOpenConfetti(): void {
  try {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const baseCount = isMobile ? 35 : 55;

    // 1. Initial burst from the center as the brooch unlocks (t = 0)
    confetti({
      particleCount: Math.round(baseCount * 0.7),
      spread: 70,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.48 },
      colors: GOLD_AND_CREAM_PALETTE,
      shapes: ['circle', 'square'],
      scalar: 1.1,
      ticks: 180,
      gravity: 0.85,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    // 2. Left and right celebratory golden cannons as the doors swing open (t = 380ms)
    setTimeout(() => {
      // Left cannon firing upwards towards center
      confetti({
        particleCount: baseCount,
        angle: 60,
        spread: 65,
        startVelocity: isMobile ? 42 : 52,
        origin: { x: isMobile ? 0.05 : 0.15, y: 0.7 },
        colors: GOLD_AND_CREAM_PALETTE,
        shapes: ['circle', 'square'],
        scalar: 1.15,
        ticks: 240,
        gravity: 0.9,
        zIndex: 9999,
        disableForReducedMotion: true,
      });

      // Right cannon firing upwards towards center
      confetti({
        particleCount: baseCount,
        angle: 120,
        spread: 65,
        startVelocity: isMobile ? 42 : 52,
        origin: { x: isMobile ? 0.95 : 0.85, y: 0.7 },
        colors: GOLD_AND_CREAM_PALETTE,
        shapes: ['circle', 'square'],
        scalar: 1.15,
        ticks: 240,
        gravity: 0.9,
        zIndex: 9999,
        disableForReducedMotion: true,
      });
    }, 380);

    // 3. Grand shower of soft golden flakes and cream petals descending gracefully as gates fully part (t = 850ms)
    setTimeout(() => {
      confetti({
        particleCount: Math.round(baseCount * 0.9),
        spread: 110,
        startVelocity: 25,
        origin: { x: 0.5, y: 0.2 },
        colors: GOLD_AND_CREAM_PALETTE,
        shapes: ['circle', 'square'],
        scalar: 1.25,
        ticks: 280,
        gravity: 0.65,
        drift: 0.1,
        zIndex: 9999,
        disableForReducedMotion: true,
      });
    }, 850);
  } catch (err) {
    console.warn('Confetti effect could not be triggered:', err);
  }
}

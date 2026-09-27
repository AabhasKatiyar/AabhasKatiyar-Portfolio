import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true, // Smooth mobile touch synchronization
      syncTouchLerp: 0.12,
      touchMultiplier: 1.0, // 1:1 natural touch tracking
      infinite: false,
    });

    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

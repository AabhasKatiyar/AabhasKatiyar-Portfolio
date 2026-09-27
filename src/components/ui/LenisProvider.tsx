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
      duration: isTouch ? 0.8 : 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Prevents mobile touch jitter and lets hardware momentum drive smooth scrolling
      touchMultiplier: 1.0,
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

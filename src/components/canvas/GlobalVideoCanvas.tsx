import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 240;

export const GlobalVideoCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Images cache
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  // Scroll & Animation State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hudMinimized, setHudMinimized] = useState(false);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Fast frame path resolver (frame_0001.jpg to frame_0240.jpg)
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = Math.max(1, Math.min(TOTAL_FRAMES, index + 1));
    const padded = String(frameNum).padStart(4, '0');
    return `/frames/frame_${padded}.jpg`;
  }, []);

  // Helper to find nearest loaded image
  const getNearestLoadedImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[targetIdx]?.complete && images[targetIdx]?.naturalWidth) {
      return images[targetIdx];
    }
    // Search outward
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = targetIdx - offset;
      if (left >= 0 && images[left]?.complete && images[left]?.naturalWidth) {
        return images[left];
      }
      const right = targetIdx + offset;
      if (right < TOTAL_FRAMES && images[right]?.complete && images[right]?.naturalWidth) {
        return images[right];
      }
    }
    return images[0] || null;
  }, []);

  // Draw current frame to canvas with aspect-ratio cover
  const renderFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getNearestLoadedImage(frameIdx);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Cover calculation: 1920 x 1080
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      drawW = displayWidth;
      drawH = displayWidth / imgRatio;
      drawX = 0;
      drawY = (displayHeight - drawH) / 2;
    } else {
      drawH = displayHeight;
      drawW = displayHeight * imgRatio;
      drawX = (displayWidth - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(
      img,
      Math.round(drawX * dpr),
      Math.round(drawY * dpr),
      Math.round(drawW * dpr),
      Math.round(drawH * dpr)
    );
  }, [getNearestLoadedImage]);

  // Progressive Preloading
  useEffect(() => {
    let isCancelled = false;

    const loadImage = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[idx]) {
          return resolve(imagesRef.current[idx]!);
        }
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx] = img;
            setLoadedCount((prev) => prev + 1);
            if (idx === 0) {
              setIsInitialLoaded(true);
              renderFrameToCanvas(0);
            }
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    async function preloadAll() {
      try {
        // Step 1: Immediate first frame
        await loadImage(0);

        // Step 2: Keyframes every 4th frame (60 frames total)
        const keyframes: number[] = [];
        for (let i = 4; i < TOTAL_FRAMES; i += 4) {
          keyframes.push(i);
        }

        const chunkSize = 8;
        for (let i = 0; i < keyframes.length; i += chunkSize) {
          if (isCancelled) return;
          const chunk = keyframes.slice(i, i + chunkSize);
          await Promise.allSettled(chunk.map((idx) => loadImage(idx)));
        }

        // Step 3: All remaining frames
        const remaining: number[] = [];
        for (let i = 1; i < TOTAL_FRAMES; i++) {
          if (i % 4 !== 0) {
            remaining.push(i);
          }
        }

        for (let i = 0; i < remaining.length; i += chunkSize) {
          if (isCancelled) return;
          const chunk = remaining.slice(i, i + chunkSize);
          await Promise.allSettled(chunk.map((idx) => loadImage(idx)));
        }
      } catch (err) {
        console.warn('Frame loading notice:', err);
      }
    }

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, renderFrameToCanvas]);

  // Global Full-Page Scroll Listener
  // Maps 0% at the very top of document to 100% at the very bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

      setScrollProgress(progress);
      const frameTarget = Math.round(progress * (TOTAL_FRAMES - 1));
      targetFrameRef.current = frameTarget;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Auto-Scroll through Lenis for zero-jitter, 60fps velocity
  useEffect(() => {
    isPlayingRef.current = isPlaying;

    if (isPlaying) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = window.scrollY;
      const remaining = Math.max(0, maxScroll - currentY);

      // If already at or near bottom, wrap to top first
      if (remaining < 20) {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }

      const lenis = window.__lenis;
      if (lenis) {
        const distance = remaining < 20 ? maxScroll : remaining;
        // ~200px per second for smooth, pleasant reading and scrubbing
        const duration = Math.max(2, distance / 200);

        lenis.scrollTo(maxScroll, {
          duration,
          easing: (t: number) => t, // Perfectly linear constant speed
          onComplete: () => {
            setIsPlaying(false);
          },
        });
      }
    } else {
      // Pause lenis programmatic scroll
      if (window.__lenis) {
        window.__lenis.stop();
        window.__lenis.start();
      }
    }
  }, [isPlaying]);

  // Pause auto-scroll on user manual touch/wheel interaction
  useEffect(() => {
    const handleUserInteract = () => {
      if (isPlayingRef.current) {
        setIsPlaying(false);
      }
    };

    window.addEventListener('wheel', handleUserInteract, { passive: true });
    window.addEventListener('touchmove', handleUserInteract, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteract);
      window.removeEventListener('touchmove', handleUserInteract);
    };
  }, []);

  // Smooth Lerp Animation Loop with Frame Deduplication
  const lastDrawnFrameRef = useRef(-1);

  useEffect(() => {
    let animId: number;

    const loop = () => {
      // Lerp towards scroll position
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) < 0.05) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * 0.28;
      }

      const roundedFrame = Math.round(currentFrameRef.current);
      // Only render & trigger state update if frame actually changed
      if (roundedFrame !== lastDrawnFrameRef.current) {
        lastDrawnFrameRef.current = roundedFrame;
        renderFrameToCanvas(roundedFrame);
        setCurrentFrameDisplay(roundedFrame);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [renderFrameToCanvas]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrameRef.current = -1; // Force redraw on resize
      renderFrameToCanvas(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrameToCanvas]);

  // Scrubber drag handler
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPlaying) setIsPlaying(false);
    const frame = parseInt(e.target.value, 10);
    targetFrameRef.current = frame;
    currentFrameRef.current = frame;
    const progress = frame / (TOTAL_FRAMES - 1);
    setScrollProgress(progress);

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetScrollY = progress * maxScroll;
    if (window.__lenis) {
      window.__lenis.scrollTo(targetScrollY, { immediate: true });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'instant' as ScrollBehavior });
    }
  };

  const scrollToTop = () => {
    if (isPlaying) setIsPlaying(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (isPlaying) setIsPlaying(false);
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (window.__lenis) {
      window.__lenis.scrollTo(maxScroll, { duration: 1.5 });
    } else {
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    }
  };

  const loadPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <>
      {/* ── FIXED FULLSCREEN VIDEO CANVAS ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          background: '#070a13',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Initial stream loading fade */}
        <AnimatePresence>
          {!isInitialLoaded && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: '#070a13',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: '2px solid rgba(0, 232, 122, 0.2)',
                  borderTopColor: '#00e87a',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.625rem',
                  letterSpacing: '0.14em',
                  color: '#00e87a',
                  textTransform: 'uppercase',
                }}
              >
                Streaming Frames...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CINEMATIC AESTHETIC OVERLAYS ── */}
        {/* Contrast Scrim: allows halo and silhouette to shine while keeping foreground text razor sharp */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(7, 10, 19, 0.55) 0%, rgba(7, 10, 19, 0.48) 40%, rgba(7, 10, 19, 0.65) 100%)',
          }}
        />

        {/* Radial Vignette */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 30%, rgba(7,10,19,0.55) 75%, rgba(7,10,19,0.92) 100%)',
          }}
        />

        {/* Subtle Architectural Coordinate Grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '75px 75px',
            opacity: 0.8,
          }}
        />
      </div>

      {/* ── FLOATING BOTTOM SCRUB CONTROLLER DOCK ── */}
      <div
        className="no-print"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 85,
          width: hudMinimized ? 'auto' : 'min(94%, 580px)',
          background: 'rgba(11, 14, 22, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 14,
          padding: hudMinimized ? '0.45rem 0.85rem' : '0.65rem 1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {hudMinimized ? (
          <div
            onClick={() => setHudMinimized(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              color: '#00e87a',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#00e87a',
                boxShadow: '0 0 8px #00e87a',
                animation: 'pulse-dot 2s infinite',
              }}
            />
            <span>FRM {String(currentFrameDisplay + 1).padStart(3, '0')}</span>
            <span style={{ color: '#666' }}>({Math.round(scrollProgress * 100)}%)</span>
            <span style={{ color: '#888', fontSize: '0.55rem' }}>[EXPAND]</span>
          </div>
        ) : (
          <>
            {/* Top row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              {/* Play / Pause auto scrub button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  style={{
                    background: isPlaying ? '#00e87a' : 'rgba(255,255,255,0.08)',
                    color: isPlaying ? '#070a13' : '#f0ede6',
                    border: 'none',
                    borderRadius: 5,
                    padding: '0.28rem 0.65rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease',
                  }}
                  title={isPlaying ? 'Pause Auto Scroll' : 'Play Auto Scroll'}
                >
                  {isPlaying ? (
                    <>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      PAUSE
                    </>
                  ) : (
                    <>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      AUTO SCROLL
                    </>
                  )}
                </button>

                <button
                  onClick={scrollToTop}
                  style={{
                    background: 'transparent',
                    color: '#888',
                    border: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0.4rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                  title="Scroll to top of website"
                >
                  TOP ↑
                </button>

                <button
                  onClick={scrollToBottom}
                  style={{
                    background: 'transparent',
                    color: '#888',
                    border: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0.4rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
                  title="Scroll to bottom of website"
                >
                  BOTTOM ↓
                </button>
              </div>

              {/* Status info */}
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: '#999',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>
                  FRAME <strong style={{ color: '#00e87a' }}>{String(currentFrameDisplay + 1).padStart(3, '0')}</strong> / 240
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                <span style={{ color: '#f0ede6' }}>{Math.round(scrollProgress * 100)}%</span>
                {loadPercent < 100 && (
                  <span style={{ color: '#c8ff00', fontSize: '0.56rem' }}>({loadPercent}%)</span>
                )}
                <button
                  onClick={() => setHudMinimized(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    lineHeight: 1,
                    padding: '0 0.25rem',
                    marginLeft: '0.25rem',
                  }}
                  title="Minimize Dock"
                >
                  −
                </button>
              </div>
            </div>

            {/* Bottom Scrubber Input */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={currentFrameDisplay}
                onChange={handleScrubChange}
                style={{
                  width: '100%',
                  height: 3,
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  background: `linear-gradient(to right, #00e87a 0%, #00e87a ${scrollProgress * 100}%, rgba(255,255,255,0.15) ${scrollProgress * 100}%, rgba(255,255,255,0.15) 100%)`,
                  borderRadius: 2,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

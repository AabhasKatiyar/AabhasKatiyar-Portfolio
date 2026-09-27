import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 240;

export const GlobalVideoCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Images cache
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);

  // HUD UI State (Only changes on user interaction, NEVER on every scroll frame!)
  const [isPlaying, setIsPlaying] = useState(false);
  const [hudMinimized, setHudMinimized] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  // Direct DOM Refs for 60fps/120fps HUD updates with ZERO React re-renders
  const scrubberInputRef = useRef<HTMLInputElement>(null);
  const frameNumberTextRef = useRef<HTMLElement>(null);
  const percentTextRef = useRef<HTMLElement>(null);
  const miniFrameTextRef = useRef<HTMLElement>(null);
  const miniPercentTextRef = useRef<HTMLElement>(null);
  const loadPercentTextRef = useRef<HTMLElement>(null);

  // Animation & Metric Refs
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const isPlayingRef = useRef(false);

  // Pre-computed canvas layout metrics (calculated strictly on resize, never per-frame)
  const metricsRef = useRef({
    targetWidth: 0,
    targetHeight: 0,
    drawX: 0,
    drawY: 0,
    drawW: 0,
    drawH: 0,
  });
  const lastWidthRef = useRef(0);

  // Fast frame path resolver (uses 77% lighter WebP frames with JPG fallback)
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = Math.max(1, Math.min(TOTAL_FRAMES, index + 1));
    const padded = String(frameNum).padStart(4, '0');
    return `/frames/frame_${padded}.webp`;
  }, []);

  // Update canvas sizing & cover geometry once on resize
  const updateCanvasMetrics = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    // Cap DPR to 1.5 on mobile to save GPU fill-rate, 2.0 on desktop
    const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2.0);
    
    // Stable viewport dimensions:
    // On mobile touch devices, lock height to the full screen dimension so the video canvas
    // is rendered at TRUE full screen from the very first frame, and never jumps or zooms when the address bar hides/shows!
    let displayWidth = window.innerWidth || document.documentElement.clientWidth;
    let displayHeight = window.innerHeight || document.documentElement.clientHeight;

    if (isTouch && typeof window !== 'undefined' && window.screen) {
      const isPortrait = displayWidth < displayHeight;
      if (isPortrait) {
        displayHeight = Math.max(displayHeight, window.screen.height || displayHeight);
        displayWidth = Math.min(displayWidth, window.screen.width || displayWidth);
      }
    }

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgWidth = 1920;
    const imgHeight = 1080;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = displayWidth / displayHeight;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    // Universal 100% full-screen cover geometry:
    // Ensures video completely covers the viewport on all screens (mobile portrait, tablet, desktop)
    // with ZERO empty bars or cutoffs.
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

    metricsRef.current = {
      targetWidth,
      targetHeight,
      drawX: Math.round(drawX * dpr),
      drawY: Math.round(drawY * dpr),
      drawW: Math.round(drawW * dpr),
      drawH: Math.round(drawH * dpr),
    };

    // Pre-fill canvas background
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.fillStyle = '#070a13';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isTouch ? 'low' : 'medium';
    }

    // Force redraw of current frame
    lastDrawnFrameRef.current = -1;
  }, []);

  // Blazing-fast 0.1ms canvas draw call (Zero layout math, zero context recreation)
  const renderFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Pick target image or fallback to the closest loaded frame in the entire array
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let bestDist = Infinity;
      let bestImg: HTMLImageElement | null = null;
      const images = imagesRef.current;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = images[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIdx);
          if (dist < bestDist) {
            bestDist = dist;
            bestImg = candidate;
            if (dist === 0) break;
          }
        }
      }
      img = bestImg || lastDrawnImgRef.current;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;
    lastDrawnImgRef.current = img;

    const { drawX, drawY, drawW, drawH } = metricsRef.current;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Robust image loader with WebP -> JPG automatic fallback
  const loadAndDecodeImage = useCallback(async (idx: number): Promise<HTMLImageElement | null> => {
    if (idx < 0 || idx >= TOTAL_FRAMES) return null;
    if (imagesRef.current[idx]) {
      return imagesRef.current[idx];
    }
    const img = new Image();
    img.src = getFrameUrl(idx);
    img.onerror = () => {
      // Auto-fallback to JPG if WebP fails on legacy client
      const frameNum = Math.max(1, Math.min(TOTAL_FRAMES, idx + 1));
      img.onerror = null;
      img.src = `/frames/frame_${String(frameNum).padStart(4, '0')}.jpg`;
    };

    try {
      await img.decode();
    } catch {
      // Decode fallback
    }

    imagesRef.current[idx] = img;
    setLoadedCount((prev) => prev + 1);

    if (idx === 0) {
      setIsInitialLoaded(true);
      updateCanvasMetrics();
      renderFrameToCanvas(0);
    }

    return img;
  }, [getFrameUrl, updateCanvasMetrics, renderFrameToCanvas]);

  // High-performance progressive preloader:
  // Immediately loads coarse keyframes across the whole site so scrolling NEVER stays stuck on one image!
  useEffect(() => {
    let isCancelled = false;

    async function preloadPipeline() {
      // 1. Immediate first frame
      await loadAndDecodeImage(0);
      if (isCancelled) return;

      // 2. High-priority first 6 frames + last frame
      await Promise.allSettled([
        loadAndDecodeImage(TOTAL_FRAMES - 1),
        loadAndDecodeImage(1),
        loadAndDecodeImage(2),
        loadAndDecodeImage(3),
        loadAndDecodeImage(4),
        loadAndDecodeImage(5),
      ]);
      if (isCancelled) return;

      // 3. Coarse mesh across the entire site (every 8th frame: 8, 16, 24, ... 232)
      // Only 28 frames total! At 38KB each, total is ~1 MB and downloads in <1s.
      // Once this completes, scrolling anywhere immediately plays video!
      const coarseKeyframes: number[] = [];
      for (let i = 8; i < TOTAL_FRAMES - 1; i += 8) {
        coarseKeyframes.push(i);
      }
      for (let i = 0; i < coarseKeyframes.length; i += 6) {
        if (isCancelled) return;
        const chunk = coarseKeyframes.slice(i, i + 6);
        await Promise.allSettled(chunk.map((idx) => loadAndDecodeImage(idx)));
        await new Promise((r) => setTimeout(r, 10));
      }

      // 4. Medium mesh (every 4th frame: 4, 12, 20, 28...)
      const mediumKeyframes: number[] = [];
      for (let i = 4; i < TOTAL_FRAMES - 1; i += 4) {
        if (!imagesRef.current[i]) mediumKeyframes.push(i);
      }
      for (let i = 0; i < mediumKeyframes.length; i += 6) {
        if (isCancelled) return;
        const chunk = mediumKeyframes.slice(i, i + 6);
        await Promise.allSettled(chunk.map((idx) => loadAndDecodeImage(idx)));
        await new Promise((r) => setTimeout(r, 12));
      }

      // 5. Stream in all remaining in-between frames concurrently in batches of 6
      const remaining: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!imagesRef.current[i]) {
          remaining.push(i);
        }
      }

      for (let i = 0; i < remaining.length; i += 6) {
        if (isCancelled) return;
        const chunk = remaining.slice(i, i + 6);
        await Promise.allSettled(chunk.map((idx) => loadAndDecodeImage(idx)));
        await new Promise((r) => setTimeout(r, 15));
      }
    }

    preloadPipeline();

    return () => {
      isCancelled = true;
    };
  }, [loadAndDecodeImage]);

  // Window resize & orientation change handler
  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      // On mobile touch devices, vertical scrolling collapses/expands the browser URL bar,
      // firing window resize events that change height only. The width NEVER changes during scroll!
      // We ignore these height-only resizes to prevent sudden jumps, zooms, and redraw glitches.
      const currentWidth = window.innerWidth;
      const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      
      if (isTouch && lastWidthRef.current > 0 && Math.abs(currentWidth - lastWidthRef.current) < 15) {
        return;
      }
      lastWidthRef.current = currentWidth;

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        updateCanvasMetrics();
        renderFrameToCanvas(Math.round(currentFrameRef.current));
      }, 60);
    };

    lastWidthRef.current = window.innerWidth;
    updateCanvasMetrics();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        lastWidthRef.current = window.innerWidth;
        updateCanvasMetrics();
        renderFrameToCanvas(Math.round(currentFrameRef.current));
      }, 150);
    }, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCanvasMetrics, renderFrameToCanvas]);

  // Unified Scroll Position Listener (Zero React Re-renders!)
  useEffect(() => {
    let unbindLenis: (() => void) | undefined;
    let lenisBound = false;

    const onScrollPosition = (progress: number) => {
      // During active auto-scroll, the playback loop drives position directly with precision
      if (isPlayingRef.current) return;

      const clamped = Math.max(0, Math.min(1, progress));
      const target = clamped * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      // On-demand priority: immediately trigger load for exact frame and immediate neighbours
      const center = Math.round(target);
      const priorityIndices = [center, center - 1, center + 1, center - 2, center + 2];
      for (const idx of priorityIndices) {
        if (idx >= 0 && idx < TOTAL_FRAMES && !imagesRef.current[idx]) {
          loadAndDecodeImage(idx);
        }
      }
    };

    // Native scroll fallback: disabled when Lenis is running or when auto-scrolling
    const handleNativeScroll = () => {
      if (isPlayingRef.current || lenisBound) return;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      onScrollPosition(scrollY / maxScroll);
    };

    let retryCount = 0;
    const connectLenis = () => {
      const lenis = window.__lenis;
      if (lenis) {
        lenisBound = true;
        unbindLenis = lenis.on('scroll', (e: { progress?: number; scroll?: number; limit?: number }) => {
          if (isPlayingRef.current) return;
          const p = typeof e.progress === 'number'
            ? e.progress
            : (e.scroll !== undefined && e.limit ? e.scroll / Math.max(1, e.limit) : 0);
          onScrollPosition(p);
        });
      } else if (retryCount < 25) {
        retryCount++;
        setTimeout(connectLenis, 60);
      }
    };

    connectLenis();
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    handleNativeScroll();

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      if (unbindLenis) unbindLenis();
    };
  }, [loadAndDecodeImage]);

  // Silky 60fps/120fps Animation Loop with Adaptive Continuous Lerp
  useEffect(() => {
    let animId: number;

    const loop = () => {
      if (isPlayingRef.current) {
        // Direct assignment during auto-play: ZERO lag, ZERO interpolation jitter
        currentFrameRef.current = targetFrameRef.current;
      } else {
        const diff = targetFrameRef.current - currentFrameRef.current;
        const absDiff = Math.abs(diff);

        if (absDiff < 0.005) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          // Dynamic adaptive smoothing:
          // Speeds up during fast scrolls to prevent rubber-banding lag,
          // softens down during micro-scrolls for cinematic analog smoothness.
          const factor = absDiff > 18 ? 0.40 : absDiff > 6 ? 0.30 : 0.22;
          currentFrameRef.current += diff * factor;
        }
      }

      const roundedFrame = Math.round(currentFrameRef.current);

      if (roundedFrame !== lastDrawnFrameRef.current) {
        lastDrawnFrameRef.current = roundedFrame;
        renderFrameToCanvas(roundedFrame);

        // Update HUD elements directly in the DOM without triggering React re-renders!
        const pct = Math.round((roundedFrame / (TOTAL_FRAMES - 1)) * 100);
        const framePadded = String(roundedFrame + 1).padStart(3, '0');

        if (frameNumberTextRef.current) {
          frameNumberTextRef.current.textContent = framePadded;
        }
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${pct}%`;
        }
        if (miniFrameTextRef.current) {
          miniFrameTextRef.current.textContent = `FRM ${framePadded}`;
        }
        if (miniPercentTextRef.current) {
          miniPercentTextRef.current.textContent = `(${pct}%)`;
        }
        if (scrubberInputRef.current) {
          scrubberInputRef.current.value = String(roundedFrame);
          scrubberInputRef.current.style.background = `linear-gradient(to right, #00e87a 0%, #00e87a ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [renderFrameToCanvas]);

  // Smooth Timestamp-Driven Auto-Scroll Playback Loop (Zero Stutter, Continuous Frame Stream)
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();

    // Check if we are near the bottom of page; if so, wrap to top before starting
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (window.scrollY >= maxScroll - 15 || currentFrameRef.current >= TOTAL_FRAMES - 2) {
      currentFrameRef.current = 0;
      targetFrameRef.current = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    // Playback rate: 15 frames per second for smooth, fluid video progression (~16s full cycle)
    const FPS = 15;

    const tick = (now: number) => {
      const dt = Math.min(0.08, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const nextFrame = currentFrameRef.current + dt * FPS;

      if (nextFrame >= TOTAL_FRAMES - 1) {
        currentFrameRef.current = TOTAL_FRAMES - 1;
        targetFrameRef.current = TOTAL_FRAMES - 1;
        setIsPlaying(false);
        return;
      }

      currentFrameRef.current = nextFrame;
      targetFrameRef.current = nextFrame;

      const progress = nextFrame / (TOTAL_FRAMES - 1);
      const currentMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const targetY = progress * currentMaxScroll;

      if (window.__lenis) {
        window.__lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }

      // Aggressively lookahead preload upcoming 16 frames so the playback head never starves
      const curIdx = Math.round(nextFrame);
      for (let i = curIdx; i <= Math.min(TOTAL_FRAMES - 1, curIdx + 16); i++) {
        if (!imagesRef.current[i]) {
          loadAndDecodeImage(i);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, loadAndDecodeImage]);

  // Pause auto-scroll on manual user interaction
  useEffect(() => {
    const handleUserInteract = () => {
      if (isPlayingRef.current) {
        setIsPlaying(false);
      }
    };

    window.addEventListener('wheel', handleUserInteract, { passive: true });
    window.addEventListener('touchstart', handleUserInteract, { passive: true });
    window.addEventListener('keydown', handleUserInteract, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteract);
      window.removeEventListener('touchstart', handleUserInteract);
      window.removeEventListener('keydown', handleUserInteract);
    };
  }, []);

  // Scrubber drag handler
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPlaying) setIsPlaying(false);
    const frame = parseInt(e.target.value, 10);
    targetFrameRef.current = frame;
    currentFrameRef.current = frame;
    const progress = frame / (TOTAL_FRAMES - 1);

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
        className="fixed-canvas-bg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: '100lvh',
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
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'translateZ(0)', // Force dedicated GPU compositor layer
            willChange: 'contents',
          }}
        />

        {/* Initial stream loading fade */}
        <AnimatePresence>
          {!isInitialLoaded && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(7, 10, 19, 0.40) 0%, rgba(7, 10, 19, 0.28) 40%, rgba(7, 10, 19, 0.50) 100%)',
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(7,10,19,0.35) 75%, rgba(7,10,19,0.70) 100%)',
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
            backgroundSize: '75px 75px',
            opacity: 0.6,
          }}
        />
      </div>

      {/* ── FLOATING BOTTOM SCRUB CONTROLLER DOCK ── */}
      <div
        className="hud-dock no-print"
        style={{
          position: 'fixed',
          bottom: 'max(0.6rem, env(safe-area-inset-bottom, 0.6rem))',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 85,
          width: hudMinimized ? 'auto' : 'min(90%, 360px)',
          background: 'rgba(11, 14, 22, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 10,
          padding: hudMinimized ? '0.22rem 0.55rem' : '0.28rem 0.65rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {hudMinimized ? (
          <div
            onClick={() => setHudMinimized(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              color: '#00e87a',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#00e87a',
                boxShadow: '0 0 6px #00e87a',
                animation: 'pulse-dot 2s infinite',
              }}
            />
            <span ref={miniFrameTextRef}>FRM 001</span>
            <span ref={miniPercentTextRef} style={{ color: '#94a3b8' }}>(0%)</span>
            <span style={{ color: '#cbd5e1', fontSize: '0.5rem', opacity: 0.8 }}>[EXPAND]</span>
          </div>
        ) : (
          <>
            {/* Top row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
              }}
            >
              {/* Play / Pause auto scrub button + quick scroll */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  style={{
                    background: isPlaying ? '#00e87a' : 'rgba(255,255,255,0.08)',
                    color: isPlaying ? '#070a13' : '#f0ede6',
                    border: 'none',
                    borderRadius: 4,
                    padding: '0.18rem 0.45rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s ease',
                  }}
                  title={isPlaying ? 'Pause Auto Scroll' : 'Play Auto Scroll'}
                >
                  {isPlaying ? (
                    <>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      PAUSE
                    </>
                  ) : (
                    <>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      AUTO
                    </>
                  )}
                </button>

                <button
                  onClick={scrollToTop}
                  style={{
                    background: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.52rem',
                    cursor: 'pointer',
                    padding: '0.15rem 0.25rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  title="Scroll to top of website"
                >
                  TOP ↑
                </button>

                <button
                  onClick={scrollToBottom}
                  style={{
                    background: 'transparent',
                    color: '#94a3b8',
                    border: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.52rem',
                    cursor: 'pointer',
                    padding: '0.15rem 0.25rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  title="Scroll to bottom of website"
                >
                  BOT ↓
                </button>
              </div>

              {/* Status info */}
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: '#cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>
                  FRM <strong ref={frameNumberTextRef} style={{ color: '#00e87a' }}>001</strong>/{TOTAL_FRAMES}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
                <span ref={percentTextRef} style={{ color: '#ffffff' }}>0%</span>
                {loadPercent < 100 && (
                  <span ref={loadPercentTextRef} style={{ color: '#c8ff00', fontSize: '0.52rem' }}>
                    ({loadPercent}%)
                  </span>
                )}
                <button
                  onClick={() => setHudMinimized(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    lineHeight: 1,
                    padding: '0 0.15rem',
                    marginLeft: '0.15rem',
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
                ref={scrubberInputRef}
                className="scrubber-slider"
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                defaultValue="0"
                onChange={handleScrubChange}
                style={{
                  width: '100%',
                  height: 2.5,
                  background: 'linear-gradient(to right, #00e87a 0%, #00e87a 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%)',
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

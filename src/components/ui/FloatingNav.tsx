import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const WORLDS = [
  { id: 'hero-landing', label: 'Home',     color: '#00e87a' },
  { id: 'about',        label: 'About',    color: '#9b6dff' },
  { id: 'skills',       label: 'Skills',   color: '#ff3d6e' },
  { id: 'experience',   label: 'Timeline', color: '#00e87a' },
  { id: 'gymlane',      label: 'GymLane',  color: '#00e87a' },
  { id: 'yappr',        label: 'Yappr',    color: '#ff3d6e' },
  { id: 'archive',      label: 'Lab',      color: '#f59e0b' },
  { id: 'contact',      label: 'Contact',  color: '#c8ff00' },
];

export const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeWorld, setActiveWorld] = useState('hero-landing');
  const [hovered, setHovered] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [tabCenters, setTabCenters] = useState<number[]>([]);

  // Track scroll position to adjust glassmorphism depth
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for highlighting the active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    WORLDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveWorld(id); },
        { threshold: 0.15, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Update tab center coordinates for desktop tension thread
  const updateCenters = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centers = tabRefs.current.map((tab) => {
      if (!tab) return 0;
      const rect = tab.getBoundingClientRect();
      return (rect.left + rect.width / 2) - containerRect.left;
    });
    setTabCenters(centers);
  };

  useEffect(() => {
    const timer = setTimeout(updateCenters, 100);
    window.addEventListener('resize', updateCenters);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCenters);
    };
  }, [activeWorld]);

  // Smoothly scroll active tab into view in mobile scrollable container
  useEffect(() => {
    const activeIdx = WORLDS.findIndex((w) => w.id === activeWorld);
    if (activeIdx !== -1 && tabRefs.current[activeIdx] && tabsScrollRef.current) {
      const tabEl = tabRefs.current[activeIdx];
      const scrollEl = tabsScrollRef.current;
      const tabLeft = tabEl.offsetLeft;
      const tabWidth = tabEl.offsetWidth;
      const scrollWidth = scrollEl.offsetWidth;
      scrollEl.scrollTo({
        left: tabLeft - scrollWidth / 2 + tabWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeWorld]);

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#c8ff00';

  const getTabY = (worldId: string) => {
    const isActive = activeWorld === worldId;
    const isHovered = hovered === worldId;
    if (isActive) return 24;
    if (isHovered) return 21;
    return 18;
  };

  const generatePath = () => {
    if (tabCenters.length === 0) return '';
    let d = `M ${tabCenters[0]} ${getTabY(WORLDS[0].id)}`;
    for (let i = 0; i < tabCenters.length - 1; i++) {
      const x0 = tabCenters[i];
      const y0 = getTabY(WORLDS[i].id);
      const x1 = tabCenters[i + 1];
      const y1 = getTabY(WORLDS[i + 1].id);
      const xc = (x0 + x1) / 2;
      
      const isTense = activeWorld === WORLDS[i].id || activeWorld === WORLDS[i+1].id || hovered === WORLDS[i].id || hovered === WORLDS[i+1].id;
      const sag = isTense ? 1 : 3;
      const yc = (y0 + y1) / 2 + sag;
      
      d += ` Q ${xc} ${yc}, ${x1} ${y1}`;
    }
    return d;
  };

  const pathD = generatePath();
  const activeIndex = WORLDS.findIndex((w) => w.id === activeWorld);
  const activeCenterX = tabCenters[activeIndex] ?? 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 'clamp(0.4rem, 1.2vw, 0.85rem)',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100,
        pointerEvents: 'none',
        padding: '0 0.5rem',
      }}
      className="no-print"
    >
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 960,
          background: scrolled
            ? 'rgba(9, 13, 24, 0.75)'
            : 'rgba(9, 13, 24, 0.58)',
          backdropFilter: 'blur(20px) saturate(190%)',
          WebkitBackdropFilter: 'blur(20px) saturate(190%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 9999,
          boxShadow: scrolled
            ? '0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 0 24px rgba(200, 255, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            : '0 8px 24px -6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          padding: '0.35rem clamp(0.5rem, 1.5vw, 1.1rem)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        className="floating-nav-bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem', width: '100%' }}>
          
          {/* Brand */}
          <a
            href="#hero-landing"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '-0.02em',
              color: activeColor,
              transition: 'color 0.4s ease, text-shadow 0.4s ease',
              textShadow: `0 0 16px ${activeColor}66`,
              textDecoration: 'none',
              flexShrink: 0,
              padding: '0.2rem 0.4rem',
            }}
          >
            AK
          </a>

          {/* Scrollable Nav Tabs Container */}
          <div
            ref={tabsScrollRef}
            className="floating-nav-tabs-scroll"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.12rem, 0.6vw, 0.3rem)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              padding: '0.1rem 0.2rem',
              position: 'relative',
              flex: 1,
              minWidth: 0,
              justifyContent: 'center',
            }}
          >
            <div
              ref={containerRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.12rem, 0.6vw, 0.3rem)',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Desktop Dynamic Tension-Thread SVG background */}
              {tabCenters.length > 0 && (
                <svg
                  className="hidden md:block"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    overflow: 'visible',
                    zIndex: 0,
                  }}
                >
                  <defs>
                    <motion.linearGradient
                      id="nav-thread-glow"
                      gradientUnits="userSpaceOnUse"
                      animate={{
                        x1: activeCenterX - 45,
                        x2: activeCenterX + 45,
                      }}
                      transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                    >
                      <stop offset="0%" stopColor={`${activeColor}00`} />
                      <stop offset="50%" stopColor={activeColor} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={`${activeColor}00`} />
                    </motion.linearGradient>
                  </defs>

                  {/* Dark base relaxed string */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth="1"
                    transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                  />

                  {/* Glowing active stretch string */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="url(#nav-thread-glow)"
                    strokeWidth="2"
                    transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                    style={{
                      filter: `drop-shadow(0 0 5px ${activeColor}bb)`,
                    }}
                  />

                  {/* Travelling charge pulse */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={activeColor}
                    strokeWidth="2"
                    strokeDasharray="8 45"
                    animate={{
                      strokeDashoffset: [0, -106],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      opacity: 0.65,
                      filter: `drop-shadow(0 0 4px ${activeColor})`,
                    }}
                  />
                </svg>
              )}

              {WORLDS.map((world, idx) => {
                const isActive = activeWorld === world.id;
                const isHovered = hovered === world.id;
                return (
                  <a
                    key={world.id}
                    href={`#${world.id}`}
                    ref={(el) => { tabRefs.current[idx] = el; }}
                    onMouseEnter={() => setHovered(world.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.15rem',
                      padding: 'clamp(0.2rem, 0.6vw, 0.32rem) clamp(0.35rem, 1vw, 0.6rem)',
                      borderRadius: 9999,
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                      background: isActive ? `${world.color}18` : isHovered ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: `1px solid ${isActive ? `${world.color}40` : 'transparent'}`,
                      zIndex: 1,
                      flexShrink: 0,
                    }}
                  >
                    {/* Label */}
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 'clamp(0.58rem, 1.2vw, 0.6875rem)',
                        fontWeight: isActive ? 700 : 600,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: isActive ? world.color : isHovered ? '#ffffff' : '#94a3b8',
                        transition: 'color 0.25s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {world.label}
                    </span>

                    {/* Subtle active indicator bar */}
                    <motion.span
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'block',
                        height: 2,
                        width: '60%',
                        borderRadius: 999,
                        background: world.color,
                        boxShadow: `0 0 6px ${world.color}`,
                        transformOrigin: 'center',
                        position: 'absolute',
                        bottom: 2,
                        left: '20%',
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right side: live ping dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0, paddingRight: '0.2rem' }}>
            <span
              style={{
                display: 'block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: activeColor,
                boxShadow: `0 0 8px ${activeColor}`,
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.5625rem',
                color: '#94a3b8',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              LIVE
            </span>
          </div>

        </div>
      </motion.nav>
    </div>
  );
};

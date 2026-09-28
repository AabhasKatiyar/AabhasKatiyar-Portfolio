import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#c8ff00';

  const getTabY = (worldId: string) => {
    const isActive = activeWorld === worldId;
    const isHovered = hovered === worldId;
    if (isActive) return 21;
    if (isHovered) return 19;
    return 16;
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
      const sag = isTense ? 1 : 2.5;
      const yc = (y0 + y1) / 2 + sag;
      
      d += ` Q ${xc} ${yc}, ${x1} ${y1}`;
    }
    return d;
  };

  const pathD = generatePath();
  const activeIndex = WORLDS.findIndex((w) => w.id === activeWorld);
  const activeCenterX = tabCenters[activeIndex] ?? 0;

  return (
    <>
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
            width: 'fit-content',
            maxWidth: 'calc(100% - 1rem)',
            background: scrolled
              ? 'rgba(9, 13, 24, 0.82)'
              : 'rgba(9, 13, 24, 0.65)',
            backdropFilter: 'blur(20px) saturate(190%)',
            WebkitBackdropFilter: 'blur(20px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 9999,
            boxShadow: scrolled
              ? '0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 0 20px rgba(200, 255, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
              : '0 8px 24px -6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            padding: '0.24rem 0.55rem',
            transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          }}
          className="floating-nav-bar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', width: 'auto' }}>
            
            {/* Brand */}
            <a
              href="#hero-landing"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                textDecoration: 'none',
                flexShrink: 0,
                padding: '0.12rem 0.25rem',
              }}
              title="Aabhas Katiyar — Home"
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 5,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 10px ${activeColor}55`,
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <img src="/favicon.svg" alt="AK" width="20" height="20" style={{ display: 'block' }} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '-0.02em',
                  color: activeColor,
                  transition: 'color 0.4s ease, text-shadow 0.4s ease',
                  textShadow: `0 0 14px ${activeColor}66`,
                }}
              >
                AK
              </span>
            </a>

            {/* Micro divider */}
            <div style={{ width: 1, height: 12, background: 'rgba(255, 255, 255, 0.12)', flexShrink: 0 }} />

            {/* Desktop Only: Nav Tabs with tension-thread */}
            <div
              className="nav-desktop-tabs"
              style={{
                alignItems: 'center',
                position: 'relative',
                flex: '1 1 auto',
                minWidth: 0,
              }}
            >
              <div
                ref={containerRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.08rem, 0.4vw, 0.2rem)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                {/* Desktop Dynamic Tension-Thread SVG background */}
                {tabCenters.length > 0 && (
                  <svg
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
                          x1: activeCenterX - 40,
                          x2: activeCenterX + 40,
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
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1"
                      transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                    />

                    {/* Glowing active stretch string */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#nav-thread-glow)"
                      strokeWidth="1.75"
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
                      strokeWidth="1.75"
                      strokeDasharray="6 40"
                      animate={{
                        strokeDashoffset: [0, -92],
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
                        gap: '0.1rem',
                        padding: '0.18rem clamp(0.3rem, 0.8vw, 0.45rem)',
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
                          fontSize: 'clamp(0.58rem, 1.1vw, 0.64rem)',
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
                          bottom: 1.5,
                          left: '20%',
                        }}
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Desktop divider */}
            <div className="hidden md:block" style={{ width: 1, height: 12, background: 'rgba(255, 255, 255, 0.12)', flexShrink: 0 }} />

            {/* Live ping dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, padding: '0 0.25rem' }}>
              <span
                style={{
                  display: 'block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: activeColor,
                  boxShadow: `0 0 8px ${activeColor}`,
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.52rem',
                  color: '#94a3b8',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                LIVE
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: mobileMenuOpen ? 'rgba(0, 232, 122, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${mobileMenuOpen ? 'rgba(0, 232, 122, 0.4)' : 'rgba(255, 255, 255, 0.12)'}`,
                padding: '0.22rem 0.4rem',
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '3.5px',
                width: 28,
                height: 26,
                borderRadius: 6,
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 1.5,
                  background: mobileMenuOpen ? '#00e87a' : '#ffffff',
                  borderRadius: 1,
                  transition: 'all 0.25s ease',
                  transform: mobileMenuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 1.5,
                  background: '#00e87a',
                  borderRadius: 1,
                  transition: 'all 0.25s ease',
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: 14,
                  height: 1.5,
                  background: mobileMenuOpen ? '#00e87a' : '#ffffff',
                  borderRadius: 1,
                  transition: 'all 0.25s ease',
                  transform: mobileMenuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
                }}
              />
            </button>

          </div>
        </motion.nav>
      </div>

      {/* Mobile Glassmorphic Full Navigation Modal Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '3.4rem',
              left: '0.85rem',
              right: '0.85rem',
              background: 'rgba(7, 11, 20, 0.94)',
              backdropFilter: 'blur(26px) saturate(200%)',
              WebkitBackdropFilter: 'blur(26px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 18,
              padding: '1rem',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 232, 122, 0.1)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
            className="md:hidden no-print"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                paddingBottom: '0.45rem',
                marginBottom: '0.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00e87a',
                    boxShadow: '0 0 8px #00e87a',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.58rem',
                    color: '#00e87a',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  SECTOR SELECTOR
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  color: '#94a3b8',
                }}
              >
                8 WORLDS
              </span>
            </div>

            {WORLDS.map((world, idx) => {
              const isActive = activeWorld === world.id;
              return (
                <a
                  key={world.id}
                  href={`#${world.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 9,
                    textDecoration: 'none',
                    background: isActive ? `${world.color}18` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? `${world.color}50` : 'transparent'}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        color: isActive ? world.color : '#64748b',
                        fontWeight: 700,
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: isActive ? '#ffffff' : '#cbd5e1',
                      }}
                    >
                      {world.label}
                    </span>
                  </div>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: isActive ? world.color : 'transparent',
                      boxShadow: isActive ? `0 0 8px ${world.color}` : 'none',
                    }}
                  />
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


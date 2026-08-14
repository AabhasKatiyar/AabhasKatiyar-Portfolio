import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORLDS = [
  { id: 'hero-landing', label: 'Home',     color: '#00e87a' },
  { id: 'about',        label: 'About',    color: '#9b6dff' },
  { id: 'skills',       label: 'Skills',   color: '#ff3d6e' },
  { id: 'experience',   label: 'Timeline', color: '#00e87a' },
  { id: 'gymlane',      label: 'Products', color: '#ff3d6e' },
  { id: 'archive',      label: 'Lab',      color: '#f59e0b' },
  { id: 'contact',      label: 'Contact',  color: '#c8ff00' },
];

export const FloatingNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeWorld, setActiveWorld] = useState('hero-landing');
  const [hovered, setHovered] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [tabCenters, setTabCenters] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    WORLDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveWorld(id); },
        { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Custom observer for yappr to highlight products too
    const yapprEl = document.getElementById('yappr');
    if (yapprEl) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveWorld('gymlane'); },
        { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(yapprEl);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [visible]);

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
    if (visible) {
      const timer = setTimeout(updateCenters, 100);
      window.addEventListener('resize', updateCenters);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateCenters);
      };
    }
  }, [visible, activeWorld]);

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#c8ff00';

  const getTabY = (worldId: string) => {
    const isActive = activeWorld === worldId;
    const isHovered = hovered === worldId;
    if (isActive) return 26;
    if (isHovered) return 23;
    return 19;
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
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -56, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'rgba(8, 8, 8, 0.85)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            boxShadow: `0 0 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04)`,
          }}
          className="no-print"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 2rem' }}>
            {/* Brand */}
            <a
              href="#hero-landing"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
                color: activeColor,
                transition: 'color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                textShadow: `0 0 20px ${activeColor}55`,
              }}
            >
              AK
            </a>

            {/* World navigation links with glowing underline */}
            <div
              ref={containerRef}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'relative' }}
            >
              {/* Dynamic Tension-Thread SVG background */}
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
                      gap: '0.3rem',
                      padding: '0.4rem 0.65rem',
                      borderRadius: 6,
                      textDecoration: 'none',
                      transition: 'background 0.3s ease',
                      background: isActive ? `${world.color}08` : 'transparent',
                      zIndex: 1,
                    }}
                  >
                    {/* Label */}
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: isActive ? world.color : isHovered ? '#aaa' : '#444',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {world.label}
                    </span>

                    {/* Glowing active underline */}
                    <motion.span
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'block',
                        height: 2,
                        width: '100%',
                        borderRadius: 999,
                        background: world.color,
                        boxShadow: `0 0 8px ${world.color}`,
                        transformOrigin: 'center',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right side: live ping dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#333', letterSpacing: '0.1em' }}>
                LIVE
              </span>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const WORLDS = [
  { id: 'hero-landing', label: 'Home',     color: '#00e87a', shortLabel: '00' },
  { id: 'about',        label: 'About',    color: '#9b6dff', shortLabel: '01' },
  { id: 'skills',       label: 'Skills',   color: '#ff3d6e', shortLabel: '02' },
  { id: 'experience',   label: 'Timeline', color: '#00e87a', shortLabel: '03' },
  { id: 'gymlane',      label: 'GymLane',  color: '#00e87a', shortLabel: '04' },
  { id: 'yappr',        label: 'Yappr',    color: '#ff3d6e', shortLabel: '05' },
  { id: 'archive',      label: 'Lab',      color: '#f59e0b', shortLabel: '06' },
  { id: 'contact',      label: 'Contact',  color: '#c8ff00', shortLabel: '07' },
];

const START_Y = 16;
const STEP = 32;

export const VerticalThread = () => {
  const { scrollYProgress } = useScroll();
  const [activeWorld, setActiveWorld] = useState('hero-landing');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    WORLDS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveWorld(id);
          }
        },
        { threshold: 0.15, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear quickly once user starts scrolling
      setVisible(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#c8ff00';

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Compact wavy SVG path tailored for 8 items within 260px
  const pathD = "M 20 0 Q 14 16, 20 32 Q 26 48, 20 64 Q 14 80, 20 96 Q 26 112, 20 128 Q 14 144, 20 160 Q 26 176, 20 192 Q 14 208, 20 224 Q 26 240, 20 256";

  return (
    <motion.div
      className="hidden lg:flex no-print vertical-thread"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        left: 'clamp(1rem, 2vw, 2rem)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg
        width="150"
        height="265"
        viewBox="0 0 150 265"
        style={{ overflow: 'visible' }}
      >
        {/* Background thread path (relaxed and dark) */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Active glowing thread path reflecting scroll progress */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={activeColor}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
            filter: `drop-shadow(0 0 4px ${activeColor}99)`,
            transition: 'stroke 0.4s ease',
          }}
        />

        {/* Dynamic moving signal pulse */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={activeColor}
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            pathLength: 0.12,
            filter: `drop-shadow(0 0 6px ${activeColor})`,
            transition: 'stroke 0.4s ease',
          }}
          animate={{
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Render Interactive Nodes */}
        {WORLDS.map((world, idx) => {
          const y = START_Y + idx * STEP;
          const isActive = activeWorld === world.id;
          const isHovered = hovered === world.id;

          return (
            <g
              key={world.id}
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              onClick={() => handleClick(world.id)}
              onMouseEnter={() => setHovered(world.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer glowing halo on hover/active */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.circle
                    cx="20"
                    cy={y}
                    r="8"
                    fill="none"
                    stroke={world.color}
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.45, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      filter: `drop-shadow(0 0 4px ${world.color})`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Inner core node dot */}
              <motion.circle
                cx="20"
                cy={y}
                r={isActive ? 4.5 : 3}
                fill={isActive ? world.color : "#1c1c1e"}
                stroke={isActive ? world.color : "rgba(255, 255, 255, 0.25)"}
                strokeWidth="1.5"
                animate={{
                  r: isActive ? 4.5 : isHovered ? 4 : 3,
                  fill: isActive ? world.color : isHovered ? "rgba(255, 255, 255, 0.5)" : "#121214",
                  stroke: isActive ? world.color : isHovered ? world.color : "rgba(255, 255, 255, 0.25)",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  filter: isActive ? `drop-shadow(0 0 6px ${world.color})` : 'none',
                  transition: 'filter 0.3s ease',
                }}
              />

              {/* Glowing signal ring expansion animation (ping) */}
              {isActive && (
                <motion.circle
                  cx="20"
                  cy={y}
                  r="12"
                  fill="none"
                  stroke={world.color}
                  strokeWidth="1"
                  animate={{
                    scale: [1, 1.8],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}

              {/* Tooltip & Text details */}
              <foreignObject
                x="36"
                y={y - 11}
                width="114"
                height="24"
                style={{ overflow: 'visible', pointerEvents: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    opacity: isActive || isHovered ? 1 : 0.75,
                    transform: `translateX(${isHovered ? '3px' : '0px'})`,
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      fontWeight: 600,
                      color: isActive || isHovered ? world.color : '#94a3b8',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {world.shortLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: isActive || isHovered ? '#ffffff' : '#94a3b8',
                      letterSpacing: '0.01em',
                      textShadow: isActive || isHovered ? '0 0 10px rgba(255, 255, 255, 0.25)' : 'none',
                    }}
                  >
                    {world.label}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
};

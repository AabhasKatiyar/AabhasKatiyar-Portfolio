import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const WORLDS = [
  { id: 'hero-landing', label: 'Home',     color: '#00e87a', shortLabel: '00' },
  { id: 'about',        label: 'About',    color: '#9b6dff', shortLabel: '01' },
  { id: 'skills',       label: 'Skills',   color: '#ff3d6e', shortLabel: '02' },
  { id: 'experience',   label: 'Timeline', color: '#00e87a', shortLabel: '03' },
  { id: 'gymlane',      label: 'Products', color: '#ff3d6e', shortLabel: '04' },
  { id: 'archive',      label: 'Lab',      color: '#f59e0b', shortLabel: '05' },
  { id: 'contact',      label: 'Contact',  color: '#c8ff00', shortLabel: '06' },
];

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

    // Custom observer for yappr to highlight products too
    const yapprEl = document.getElementById('yappr');
    if (yapprEl) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveWorld('gymlane'); },
        { threshold: 0.15, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(yapprEl);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#c8ff00';

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SVG wave path representation (updated for 7 sections, height 360)
  const pathD = "M 20 0 Q 12 15, 20 30 Q 28 55, 20 80 Q 12 105, 20 130 Q 28 155, 20 180 Q 12 205, 20 230 Q 28 255, 20 280 Q 12 305, 20 330 Q 28 345, 20 360";

  return (
    <div
      className="hidden lg:flex no-print"
      style={{
        position: 'fixed',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="160"
        height="380"
        viewBox="0 0 160 380"
        style={{ overflow: 'visible' }}
      >
        {/* Background thread path (relaxed and dark) */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
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
          const y = 30 + idx * 50;
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
                    r="9"
                    fill="none"
                    stroke={world.color}
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.4, scale: 1 }}
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
                r={isActive ? 5 : 3.5}
                fill={isActive ? world.color : "#1c1c1e"}
                stroke={isActive ? world.color : "rgba(255, 255, 255, 0.2)"}
                strokeWidth="1.5"
                animate={{
                  r: isActive ? 5 : isHovered ? 4.5 : 3.5,
                  fill: isActive ? world.color : isHovered ? "rgba(255, 255, 255, 0.4)" : "#121214",
                  stroke: isActive ? world.color : isHovered ? world.color : "rgba(255, 255, 255, 0.2)",
                }}
                transition={{ duration: 0.25 }}
                style={{
                  filter: isActive ? `drop-shadow(0 0 8px ${world.color})` : 'none',
                }}
              />

              {/* Glowing signal ring expansion animation (ping) */}
              {isActive && (
                <motion.circle
                  cx="20"
                  cy={y}
                  r="15"
                  fill="none"
                  stroke={world.color}
                  strokeWidth="1"
                  animate={{
                    scale: [1, 2],
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
                x="40"
                y={y - 12}
                width="120"
                height="30"
                style={{ overflow: 'visible', pointerEvents: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    opacity: isActive || isHovered ? 1 : 0.35,
                    transform: `translateX(${isHovered ? '4px' : '0px'})`,
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.52rem',
                      fontWeight: 600,
                      color: isActive || isHovered ? world.color : '#888',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {world.shortLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: isActive || isHovered ? '#f0ede6' : '#666',
                      letterSpacing: '0.02em',
                      textShadow: isActive || isHovered ? '0 0 10px rgba(255, 255, 255, 0.15)' : 'none',
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
    </div>
  );
};

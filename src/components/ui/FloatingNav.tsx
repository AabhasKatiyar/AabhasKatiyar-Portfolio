import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORLDS = [
  { id: 'gymlane', label: 'GymLane', color: '#00e87a' },
  { id: 'yappr',   label: 'Yappr',   color: '#ff3d6e' },
  { id: 'journey', label: 'Journey', color: '#9b6dff' },
  { id: 'archive', label: 'Lab',     color: '#f59e0b' },
  { id: 'contact', label: 'Contact', color: '#c8ff00' },
];

export const FloatingNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeWorld, setActiveWorld] = useState('gymlane');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
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
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [visible]);

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#c8ff00';

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
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 2rem' }}>
            {/* Brand */}
            <a
              href="#hero"
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {WORLDS.map((world) => {
                const isActive = activeWorld === world.id;
                const isHovered = hovered === world.id;
                return (
                  <a
                    key={world.id}
                    href={`#${world.id}`}
                    onMouseEnter={() => setHovered(world.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.4rem 0.75rem',
                      borderRadius: 6,
                      textDecoration: 'none',
                      transition: 'background 0.3s ease',
                      background: isActive ? `${world.color}10` : 'transparent',
                    }}
                  >
                    {/* Label */}
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.5625rem',
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

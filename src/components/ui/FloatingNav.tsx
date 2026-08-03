import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORLDS = [
  { id: 'hero',    label: 'Landing',  color: '#c8ff00' },
  { id: 'gymlane', label: 'GymLane', color: '#00e87a' },
  { id: 'yappr',   label: 'Yappr',   color: '#ff3d6e' },
  { id: 'journey', label: 'Journey', color: '#9b6dff' },
  { id: 'archive', label: 'Archive', color: '#f0ede6' },
  { id: 'contact', label: 'Contact', color: '#f0ede6' },
];

export const FloatingNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeWorld, setActiveWorld] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
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
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [visible]);

  const activeColor = WORLDS.find((w) => w.id === activeWorld)?.color ?? '#f0ede6';

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'rgba(10,10,10,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 2rem' }}>
            {/* Brand */}
            <a
              href="#hero"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '-0.02em',
                color: activeColor,
                transition: 'color 0.4s',
              }}
            >
              AK
            </a>

            {/* World dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {WORLDS.map((world) => (
                <a
                  key={world.id}
                  href={`#${world.id}`}
                  onMouseEnter={() => setHovered(world.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {/* Label on hover */}
                  <AnimatePresence>
                    {hovered === world.id && (
                      <motion.span
                        initial={{ opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.5625rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: world.color,
                          position: 'absolute',
                          right: '100%',
                          marginRight: '0.5rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {world.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Dot */}
                  <motion.span
                    animate={{
                      width: activeWorld === world.id ? 20 : 5,
                      background: activeWorld === world.id ? world.color : 'rgba(255,255,255,0.18)',
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                    style={{
                      display: 'block',
                      height: 5,
                      borderRadius: 999,
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

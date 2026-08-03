import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextScramble } from '../ui/TextScramble';

const ROLES = [
  'Full Stack Developer',
  'SaaS Founder',
  'Product Engineer',
  'Startup Builder',
];

const STACK = [
  'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vite',
  'Tailwind CSS', 'Framer Motion', 'C/C++', 'Arduino', 'ESP32',
  'Row Level Security', 'Cloudflare Pages', 'Node.js', 'Git',
];

export const Hero = () => {
  const [phase, setPhase] = useState<'problem1' | 'problem2' | 'reveal'>('problem1');
  const [roleIdx, setRoleIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic Intro Phase timing
    const t1 = setTimeout(() => setPhase('problem2'), 2500);
    const t2 = setTimeout(() => setPhase('reveal'), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, [phase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || phase !== 'reveal') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100svh',
        background: '#0c0c0c',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        perspective: 1200,
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 'problem1' && (
          <motion.div
            key="p1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#888' }}
          >
            <span>Every product starts with one problem.</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ background: '#fff', width: 2, height: 16 }}
            />
          </motion.div>
        )}

        {phase === 'problem2' && (
          <motion.div
            key="p2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: '#888' }}
          >
            <span>Mine started in college.</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ background: '#fff', width: 2, height: 16 }}
            />
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(1.5rem, 4vw, 3.5rem)',
              paddingTop: 'clamp(4rem, 8vw, 7rem)',
              rotateY: tilt.x,
              rotateX: tilt.y,
            }}
          >
            {/* Top Row Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#c8ff00', boxShadow: '0 0 10px #c8ff00' }} />
                <span className="label-overline" style={{ color: '#c8ff00' }}>WebGL SHADER ACTIVE</span>
              </div>
              <span className="label-overline">B.Tech IT · KIET Group of Institutions</span>
            </div>

            {/* Headline */}
            <div style={{ paddingLeft: 'clamp(0rem, 2vw, 1.5rem)' }}>
              <h1 className="display-2xl" style={{ lineHeight: 0.92, textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
                <TextScramble text="AABHAS" delay={100} speed={32} />
                <br />
                <TextScramble text="KATIYAR" delay={300} speed={32} />
              </h1>

              {/* Dynamic role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.75rem' }}>
                <div style={{ width: 28, height: 1, background: '#c8ff00' }} />
                <div style={{ height: '1.25rem', overflow: 'hidden', position: 'relative', minWidth: 240 }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIdx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                      style={{ position: 'absolute', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', color: '#888', letterSpacing: '0.04em' }}
                    >
                      {ROLES[roleIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <p style={{ maxWidth: '40ch', fontSize: '1rem', color: '#888', lineHeight: 1.75, marginTop: '2rem' }}>
                I build real SaaS products that solve operational friction. GymLane and Yappr are live. My stack starts at PostgreSQL and goes all the way down to C++ firmware on Arduino.
              </p>
            </div>

            {/* Bottom Row links */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', gap: '2.5rem' }}>
                <a href="#gymlane" className="world-link">
                  GymLane
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#yappr" className="world-link">
                  Yappr 3D
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#journey" className="world-link">
                  Engineering Lab
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <motion.div
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, #c8ff00, transparent)', transformOrigin: 'top' }}
                />
                <span className="label-overline" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>scroll</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech marquee footer strip */}
      {phase === 'reveal' && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', padding: '0.75rem 0', position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="marquee-track">
            {STACK.concat(STACK).map((tech, i) => (
              <span key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', flexShrink: 0 }}>
                {tech}
                <span style={{ marginLeft: '3rem', color: '#222' }}>·</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

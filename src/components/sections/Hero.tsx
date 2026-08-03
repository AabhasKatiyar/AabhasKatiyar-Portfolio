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
  'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vite',
  'Tailwind CSS', 'Framer Motion', 'C/C++', 'Arduino', 'ESP32',
  'Row Level Security', 'Cloudflare Pages', 'Node.js', 'Git',
  'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vite',
  'Tailwind CSS', 'Framer Motion', 'C/C++', 'Arduino', 'ESP32',
  'Row Level Security', 'Cloudflare Pages', 'Node.js', 'Git',
];

export const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [mouse, setMouse]     = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        minHeight: '100svh',
        background: '#0c0c0c',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mouse-reactive lime spotlight */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px, rgba(200,255,0,0.045), transparent 75%)`,
          transition: 'background 0.08s',
        }}
      />

      {/* Content wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
          paddingTop: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="label-overline"
          >
            B.Tech IT · KIET Group of Institutions, UP
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="label-overline"
          >
            Portfolio 2026
          </motion.span>
        </div>

        {/* Centre: Name + role */}
        <div style={{ paddingLeft: 'clamp(0rem, 2vw, 1.5rem)' }}>
          <h1
            className="display-2xl"
            style={{ lineHeight: 0.92 }}
            aria-label="Aabhas Katiyar"
          >
            <TextScramble text="AABHAS" delay={180} speed={32} />
            <br />
            <TextScramble text="KATIYAR" delay={480} speed={32} />
          </h1>

          {/* Cycling role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.75rem' }}>
            <div style={{ width: 28, height: 1, background: '#c8ff00', flexShrink: 0 }} />
            <div style={{ height: '1.25rem', overflow: 'hidden', position: 'relative', minWidth: 220 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  style={{
                    position: 'absolute',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.04em',
                    color: '#888',
                  }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              maxWidth: '38ch',
              fontSize: '1rem',
              color: '#555',
              lineHeight: 1.7,
              marginTop: '2rem',
            }}
          >
            I build real SaaS products — not side projects that never ship.
            GymLane and Yappr are live. My stack starts at PostgreSQL and
            goes all the way down to C++ firmware on Arduino.
          </motion.p>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            <a href="#gymlane" className="world-link">
              GymLane
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#yappr" className="world-link">
              Yappr
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="world-link">
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <motion.div
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{
                width: 1,
                height: 48,
                background: 'linear-gradient(to bottom, transparent, #c8ff00, transparent)',
                transformOrigin: 'top',
              }}
            />
            <span className="label-overline" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              scroll
            </span>
          </div>
        </motion.div>
      </div>

      {/* Tech stack marquee strip */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          padding: '0.75rem 0',
        }}
      >
        <div className="marquee-track">
          {STACK.map((tech, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#333',
                flexShrink: 0,
              }}
            >
              {tech}
              <span style={{ marginLeft: '3rem', color: '#222' }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

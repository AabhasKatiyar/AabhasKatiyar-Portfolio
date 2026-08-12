import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stage {
  num: string;
  period: string;
  heading: string;
  body: string;
  tech: string[];
  accent: string;
  bgTint: string;
}

const STAGES: Stage[] = [
  {
    num: '01',
    period: '2023 — Early 2024',
    heading: 'Arduino, C++, and making physical things move.',
    body: 'My first line of code controlled a servo motor, not a webpage. Learning C++ on an Arduino Uno — reading sensors, blinking LEDs, writing firmware — gave me an understanding of what happens below software abstraction layers.',
    tech: ['C/C++', 'Arduino IDE', 'PWM', 'GPIO', 'Sensors', 'Servos'],
    accent: '#f59e0b',
    bgTint: '#0f0b04',
  },
  {
    num: '02',
    period: 'Mid 2024',
    heading: 'ESP32, SoftAP, and a car driven from a browser.',
    body: 'The ESP32 WiFi car project was the first complete system I built: a microcontroller serving an HTTP endpoint, controlling DC motors through an L298N driver via PWM. My phone was the client. The car was the server response.',
    tech: ['ESP32', 'SoftAP', 'HTTP Server', 'L298N', 'DC Motors', 'PWM Control'],
    accent: '#fb923c',
    bgTint: '#0f0903',
  },
  {
    num: '03',
    period: 'Late 2024 — Early 2025',
    heading: 'HTML, CSS, and JavaScript. From the ground up.',
    body: 'Before jumping into frameworks, I went deep on how browsers actually render web pages — the CSS cascade, the JavaScript event loop, and DOM node construction. This foundation made React intuitive and predictable.',
    tech: ['HTML5', 'CSS Grid', 'Flexbox', 'Vanilla JS', 'DOM APIs', 'Async/Await'],
    accent: '#2dd4bf',
    bgTint: '#030f0d',
  },
  {
    num: '04',
    period: 'Mid 2025',
    heading: 'React, TypeScript, and modern component architecture.',
    body: 'React clicked when I started thinking in declarative state instead of imperative DOM updates. TypeScript added strict type safety for data schemas. Vite replaced slow bundlers with instant hot module replacement.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'ESLint'],
    accent: '#60a5fa',
    bgTint: '#03060f',
  },
  {
    num: '05',
    period: 'Late 2025 — Now',
    heading: 'Supabase, PostgreSQL RLS, and two live SaaS products.',
    body: 'GymLane and Yappr are live applications built from zero — relational database schemas, Row Level Security multi-tenant isolation, real-time WebSocket streams, and production deployment on Cloudflare Pages.',
    tech: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Supabase Auth', 'Cloudflare Pages', 'Git'],
    accent: '#c8ff00',
    bgTint: '#070f03',
  },
];

export const Journey = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const stage = STAGES[activeIdx];

  const handleNext = () => setActiveIdx((i) => (i + 1) % STAGES.length);
  const handlePrev = () => setActiveIdx((i) => (i - 1 + STAGES.length) % STAGES.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="journey"
      style={{
        minHeight: '100svh',
        background: stage.bgTint,
        transition: 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow that follows accent color */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${stage.accent}08, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'background 0.8s ease',
        }}
      />
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: stage.accent, transition: 'color 0.4s' }}>
            03 — Journey Timeline
          </span>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#666', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
            Use controls or arrow keys to navigate stages [ {activeIdx + 1} / {STAGES.length} ]
          </div>
        </div>

        {/* Timeline Node Selector Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {STAGES.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => setActiveIdx(idx)}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.5rem',
                padding: '0.35rem 0.8rem',
                borderRadius: 999,
                border: idx === activeIdx ? `1px solid ${s.accent}` : '1px solid rgba(255,255,255,0.07)',
                background: idx === activeIdx ? `${s.accent}18` : 'rgba(255,255,255,0.02)',
                color: idx === activeIdx ? s.accent : '#555',
                cursor: 'pointer',
                transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: idx === activeIdx ? `0 0 12px ${s.accent}30` : 'none',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                if (idx !== activeIdx) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                  e.currentTarget.style.color = '#aaa';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (idx !== activeIdx) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = '#555';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {s.num} · {s.period.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Active Stage Deck */}
      <div style={{ position: 'relative', minHeight: 380, display: 'flex', alignItems: 'center' }}>
        {/* Giant Background Number */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            bottom: -20,
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(10rem, 24vw, 24rem)',
            color: 'rgba(255,255,255,0.03)',
            letterSpacing: '-0.06em',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {stage.num}
        </div>

        {/* Stage Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 720,
              background: 'rgba(15, 15, 15, 0.55)',
              border: `1px solid ${stage.accent}20`,
              borderRadius: 16,
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: `0 8px 48px rgba(0,0,0,0.5), 0 0 40px ${stage.accent}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6875rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: stage.accent,
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              {stage.period}
            </span>

            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.85rem, 4vw, 3.75rem)',
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
                color: '#f0ede6',
                marginBottom: '1.5rem',
              }}
            >
              {stage.heading}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                color: '#888',
                lineHeight: 1.75,
                marginBottom: '2rem',
                maxWidth: '54ch',
              }}
            >
              {stage.body}
            </p>

            {/* Tech Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '2rem' }}>
              {stage.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.625rem',
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 4,
                    border: `1px solid ${stage.accent}35`,
                    color: stage.accent,
                    background: `${stage.accent}0d`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handlePrev}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
              color: '#f0ede6',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ← Previous Era
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              border: `1px solid ${stage.accent}`,
              background: `${stage.accent}15`,
              color: stage.accent,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              cursor: 'pointer',
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: `0 0 0 ${stage.accent}00`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = stage.accent;
              e.currentTarget.style.color = '#070707';
              e.currentTarget.style.boxShadow = `0 0 20px ${stage.accent}50`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${stage.accent}15`;
              e.currentTarget.style.color = stage.accent;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Next Era →
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ flex: 1, maxWidth: 200, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden', marginLeft: '2rem' }}>
          <motion.div
            animate={{ width: `${((activeIdx + 1) / STAGES.length) * 100}%`, background: stage.accent }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </section>
  );
};

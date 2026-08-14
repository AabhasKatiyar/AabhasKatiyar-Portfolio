import { motion } from 'framer-motion';
import { Code2, Cpu, Rocket, Database } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const TRAITS = [
  {
    icon: <Code2 size={18} />,
    title: 'Full-Stack Builder',
    desc: 'Production SaaS from database schema to deployed UI — not just tutorials.',
    color: '#00e87a',
  },
  {
    icon: <Cpu size={18} />,
    title: 'Hardware + Software',
    desc: 'C++ firmware on ESP32/Arduino alongside React frontends — both layers.',
    color: '#f59e0b',
  },
  {
    icon: <Database size={18} />,
    title: 'Security First',
    desc: 'PostgreSQL Row Level Security for true multi-tenant data isolation.',
    color: '#9b6dff',
  },
  {
    icon: <Rocket size={18} />,
    title: 'Ships Real Products',
    desc: 'GymLane and Yappr are live, working SaaS products — not demos.',
    color: '#ff3d6e',
  },
];

export const About = () => {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        background: '#0c0c0c',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,109,255,0.04), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1050, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Section label + heading */}
        <motion.div {...fadeUp(0)}>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#9b6dff',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            01 — About
          </span>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#f0ede6',
              margin: 0,
              maxWidth: '14ch',
            }}
          >
            Who I am &amp;{' '}
            <span style={{ color: '#9b6dff', textShadow: '0 0 30px rgba(155,109,255,0.25)' }}>
              how I build.
            </span>
          </h2>
        </motion.div>

        {/* Two-column: bio + traits */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div {...fadeUp(0.08)}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: '#888',
                  margin: 0,
                }}
              >
                I'm a first-year B.Tech IT student at KIET, Ghaziabad, who builds real software — not projects for a portfolio grade. I started with microcontrollers, writing C++ firmware to control motors and read sensors, and transitioned to full-stack web development because I wanted to ship complete systems.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.12)}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: '#888',
                  margin: 0,
                }}
              >
                I've built <strong style={{ color: '#f0ede6', fontWeight: 600 }}>GymLane</strong> — a multi-tenant gym management SaaS with real-time check-ins and PostgreSQL Row Level Security — and <strong style={{ color: '#f0ede6', fontWeight: 600 }}>Yappr</strong> — a real-time social feed with WebSocket pub/sub and optimistic UI. Both are functional, deployed products.
              </p>
            </motion.div>

            {/* Identity card */}
            <motion.div
              {...fadeUp(0.16)}
              style={{
                background: 'rgba(15,15,15,0.6)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                backdropFilter: 'blur(16px)',
              }}
            >
              {[
                { label: 'Degree', value: 'B.Tech Information Technology' },
                { label: 'College', value: 'KIET Group of Institutions' },
                { label: 'Year', value: '2025 – 2029 (1st year)' },
                { label: 'Contact', value: 'aabhas.katiyar.dev@gmail.com', mono: true },
              ].map(({ label, value, mono }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.5rem',
                      color: '#333',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      minWidth: '60px',
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: '#888',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Trait cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {TRAITS.map((trait, i) => (
              <motion.div
                key={trait.title}
                {...fadeUp(0.1 + i * 0.07)}
                style={{
                  background: 'rgba(15,15,15,0.55)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '1.125rem 1.25rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                  cursor: 'default',
                }}
                whileHover={{
                  borderColor: `${trait.color}30`,
                  backgroundColor: 'rgba(18,18,18,0.7)',
                  y: -3,
                }}
              >
                <div
                  style={{
                    color: trait.color,
                    padding: '0.4rem',
                    borderRadius: 8,
                    background: `${trait.color}10`,
                    border: `1px solid ${trait.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {trait.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: '#f0ede6',
                      margin: '0 0 0.25rem 0',
                    }}
                  >
                    {trait.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: '#555',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {trait.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

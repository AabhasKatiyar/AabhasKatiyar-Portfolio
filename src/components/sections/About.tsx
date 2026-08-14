import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Lightbulb, GraduationCap, Eye } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const TRAITS = [
  {
    label: 'BUILDER MINDSET // EXECUTION',
    desc: 'GymLane and Yappr are fully functional SaaS environments, proving execution beyond source scripts.',
    icon: <ShieldCheck size={18} />,
    color: '#00e87a',
  },
  {
    label: 'HARDWARE LOGIC // DIRECT CONTROL',
    desc: 'Arduino and ESP32 nodes taught me registry management, pin configurations, and low-level data buses.',
    icon: <Cpu size={18} />,
    color: '#f59e0b',
  },
  {
    label: 'PRODUCT INTUITION // UTILITY',
    desc: 'I resolve structural needs: who uses the system, why, and how to minimize execution latency.',
    icon: <Lightbulb size={18} />,
    color: '#ff3d6e',
  },
  {
    label: 'LEARNING SPEED // PARALLEL COMPILATION',
    desc: 'Pivoting from microcontroller registers to full-stack websocket tables and database-level multi-tenancy.',
    icon: <GraduationCap size={18} />,
    color: '#9b6dff',
  },
];

export const About = () => {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        background: '#040508',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      {/* HUD scan grids */}
      <div
        style={{
          position: 'absolute',
          left: '5%',
          top: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,109,255,0.015), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1080px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Section title */}
        <motion.div {...fadeUp(0)}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9b6dff', display: 'block', marginBottom: '0.75rem' }}>
            01 — BIOMETRIC DOSSIER
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4.1rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
            Core builder profile{' '}
            <span style={{ color: '#9b6dff', textShadow: '0 0 30px rgba(155,109,255,0.2)' }}>
              details
            </span>
            .
          </h2>
        </motion.div>

        {/* Console layout grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4.5rem', alignItems: 'start' }}>
          
          {/* Left Column: dossier layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Holographic identity scan card */}
            <motion.div
              {...fadeUp(0.08)}
              style={{
                background: 'rgba(10, 11, 20, 0.6)',
                border: '1px solid rgba(155, 109, 255, 0.15)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Scan sweep line */}
              <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'rgba(155, 109, 255, 0.4)', animation: 'scan 4s linear infinite', pointerEvents: 'none' }} />

              {/* Scanning visual box */}
              <div style={{ width: '80px', height: '80px', background: 'rgba(155,109,255,0.05)', border: '1px dashed rgba(155,109,255,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#9b6dff', position: 'relative' }}>
                <Eye size={30} style={{ opacity: 0.6 }} />
                {/* Visual corners */}
                <div style={{ position: 'absolute', top: -1, left: -1, width: 6, height: 6, borderTop: '2px solid #9b6dff', borderLeft: '2px solid #9b6dff' }} />
                <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderTop: '2px solid #9b6dff', borderRight: '2px solid #9b6dff' }} />
                <div style={{ position: 'absolute', bottom: -1, left: -1, width: 6, height: 6, borderBottom: '2px solid #9b6dff', borderLeft: '2px solid #9b6dff' }} />
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 6, height: 6, borderBottom: '2px solid #9b6dff', borderRight: '2px solid #9b6dff' }} />
              </div>

              {/* Identity fields */}
              <div style={{ flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#888', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div>NAME: <span style={{ color: '#fff', fontWeight: 600 }}>AABHAS KATIYAR</span></div>
                <div>DEGREE: <span style={{ color: '#fff', fontWeight: 600 }}>B.TECH (IT) 2025-2029</span></div>
                <div>CLASS_REG: <span style={{ color: '#9b6dff' }}>KIET_GZBD</span></div>
                <div>STATUS: <span style={{ color: '#00e87a', textShadow: '0 0 6px #00e87a' }}>READY_FOR_DEPLOY</span></div>
              </div>
            </motion.div>

            {/* Biography details text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.65, color: '#888' }}>
              <motion.p {...fadeUp(0.12)} style={{ color: '#fff', fontWeight: 500, fontSize: '0.95rem' }}>
                Developing software architectures with a builder's approach.
              </motion.p>
              
              <motion.p {...fadeUp(0.16)}>
                I began programming at the hardware level, compiling firmware in C++ for microcontrollers. This low-level experience gave me an understanding of registers, pin arrays, and serial communications.
              </motion.p>

              <motion.p {...fadeUp(0.2)}>
                I transitioned to web architectures to design full-stack systems. Building GymLane (multi-tenant dashboard) and Yappr (real-time chat) allowed me to implement Supabase authentication, real-time WebSocket tables, and secure PostgreSQL Row Level Security (RLS) configurations.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Holographic WORK_PILLARS dossier */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <motion.h3
              {...fadeUp(0.1)}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.02em',
              }}
            >
              Holographic System Metrics
            </motion.h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {TRAITS.map((trait, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.14 + i * 0.08)}
                  style={{
                    background: 'rgba(10, 11, 16, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{
                    borderColor: `${trait.color}44`,
                    background: 'rgba(14, 16, 26, 0.6)',
                    y: -4,
                  }}
                >
                  <div
                    style={{
                      background: `${trait.color}0a`,
                      border: `1px solid ${trait.color}25`,
                      borderRadius: '8px',
                      padding: '0.45rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: trait.color,
                    }}
                  >
                    {trait.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', fontWeight: 700, color: '#fff', margin: '0 0 0.25rem 0', letterSpacing: '0.04em' }}>
                      {trait.label}
                    </h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', lineHeight: 1.5, color: '#666', margin: 0 }}>
                      {trait.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

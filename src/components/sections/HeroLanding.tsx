import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Compass, Activity, Terminal } from 'lucide-react';

interface HeroLandingProps {
  onViewResume: () => void;
}

export const HeroLanding = ({ onViewResume }: HeroLandingProps) => {
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState(0);

  // Digital clock loop
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // System uptime counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToNext = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const formattedUptime = () => {
    const min = Math.floor(uptime / 60);
    const sec = uptime % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')} SYS_UP`;
  };

  return (
    <section
      id="hero-landing"
      style={{
        minHeight: '100vh',
        background: '#040508',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      {/* Holographic matrix grid lines backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 232, 122, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 232, 122, 0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      />

      {/* Futuristic scanner line scrolling down the screen */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent, rgba(0,232,122,0.15), transparent)',
          animation: 'scan 8s linear infinite',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Floating neon ambient highlights */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,109,255,0.03), transparent 60%)',
          pointerEvents: 'none',
          filter: 'blur(30px)',
        }}
      />

      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Holographic Telemetry System Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(0,232,122,0.15)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#00e87a', boxShadow: '0 0 8px #00e87a', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#00e87a', letterSpacing: '0.12em', textShadow: '0 0 4px rgba(0,232,122,0.4)' }}>
              CONSOLE ONLINE // LINK_SECURE
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#444' }}>
            <span>CLOCK: <span style={{ color: '#00e87a' }}>{time}</span></span>
            <span>UPTIME: <span style={{ color: '#9b6dff' }}>{formattedUptime()}</span></span>
          </div>
        </div>

        {/* Dashboard Panels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Left Panel: Big branding + scans */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: '#fff',
                  margin: 0,
                }}
              >
                Aabhas
                <br />
                Katiyar
              </motion.h1>
              {/* Local scanline running over the name */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '2px', background: '#00e87a', opacity: 0.35, animation: 'pulse-dot 1.5s infinite' }} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#888',
                maxWidth: '450px',
                margin: 0,
              }}
            >
              Full-Stack Software Developer &amp; IoT Engineer bridging microcontroller firmware logic with relational multi-tenant web SaaS.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                borderRadius: '8px',
                padding: '0.75rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.55rem',
                color: '#555',
              }}
            >
              <div>MODULE_01: <span style={{ color: '#00e87a' }}>SYS_ACTIVE</span></div>
              <div>LOC: <span style={{ color: '#9b6dff' }}>IN_REG_29</span></div>
              <div>PORT: <span style={{ color: '#f59e0b' }}>LOCAL_5173</span></div>
              <div>AUTH: <span style={{ color: '#ff3d6e' }}>RLS_ENFORCED</span></div>
            </motion.div>
          </div>

          {/* Right Panel: Holographic HUD console card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(12, 14, 22, 0.55)',
              border: '1px solid rgba(0, 232, 122, 0.12)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(0,232,122,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Spinning orbital HUD badge */}
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'rgba(0, 232, 122, 0.15)', animation: 'spin 18s linear infinite' }}>
              <Compass size={40} strokeWidth={1} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.50rem' }}>
              <Cpu size={16} className="text-[#00e87a]" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#00e87a', letterSpacing: '0.08em', fontWeight: 600 }}>
                HOLOGRAPHIC DIAGNOSTIC
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: '0 0 0.25rem 0', letterSpacing: '-0.01em' }}>
                  Multi-Tenant Security
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', lineHeight: 1.5, color: '#888', margin: 0 }}>
                  Securing application architectures at the database layer using custom PostgreSQL Row Level Security (RLS) configurations.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: '0 0 0.25rem 0', letterSpacing: '-0.01em' }}>
                  Microcontroller Logic
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', lineHeight: 1.5, color: '#888', margin: 0 }}>
                  Compiling efficient C++ instructions on ESP32 boards for hardware operations and browser-based PWM telemetry steering.
                </p>
              </div>
            </div>

            {/* Micro grid indicators */}
            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#666' }}>
                <Activity size={10} className="text-[#9b6dff]" /> 60FPS STABLE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#666' }}>
                <Terminal size={10} className="text-[#ff3d6e]" /> SUPABASE 19.2
              </div>
            </div>
          </motion.div>

        </div>

        {/* Console control triggers */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1.5rem',
            borderTop: '1px solid rgba(0,232,122,0.15)',
            paddingTop: '2rem',
          }}
        >
          <button
            onClick={onViewResume}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#00e87a',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.6rem',
              color: '#040508',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.25s, box-shadow 0.25s',
              boxShadow: '0 4px 20px rgba(0, 232, 122, 0.25)',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 232, 122, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 232, 122, 0.25)';
            }}
          >
            <FileText size={14} /> LAUNCH CV DOSSIER
          </button>
          
          <button
            onClick={handleScrollToNext}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(0, 232, 122, 0.25)',
              borderRadius: '8px',
              padding: '0.8rem 1.6rem',
              color: '#00e87a',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 232, 122, 0.05)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            GRID CONDUIT LINK ↓
          </button>
        </motion.div>

      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { ArrowDown, FileText, Mail } from 'lucide-react';

interface HeroLandingProps {
  onViewResume: () => void;
}

// Inline custom SVG for Github (since older Lucide versions lack brand icons)
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Inline custom SVG for LinkedIn
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const HeroLanding = ({ onViewResume }: HeroLandingProps) => {
  const handleScrollToProjects = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-landing"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#0c0c0c',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      {/* Visual coordinates backdrop grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.8,
          pointerEvents: 'none',
        }}
      />

      {/* Floating subtle ambient glows */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,232,122,0.03), transparent 65%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.02), transparent 65%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1050px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '2.5rem',
        }}
      >
        {/* Overline category badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '999px',
            padding: '0.4rem 1.1rem',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              display: 'block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00e87a',
              boxShadow: '0 0 8px #00e87a',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              color: '#888',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Silicon &amp; Syntax — IoT &amp; Web Engineer
          </span>
        </motion.div>

        {/* Big Typographic Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#fff',
              margin: 0,
            }}
          >
            Aabhas Katiyar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(1rem, 3.2vw, 2.25rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#888',
              margin: 0,
              maxWidth: '850px',
            }}
          >
            I build high-performance web systems and firmware that bridge the gap between{' '}
            <span style={{ color: '#00e87a', textShadow: '0 0 30px rgba(0,232,122,0.15)' }}>hardware telemetry</span> and{' '}
            <span style={{ color: '#c8ff00', textShadow: '0 0 30px rgba(200,255,0,0.15)' }}>full-stack SaaS</span>.
          </motion.p>
        </div>

        {/* HR Profile Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(12, 13, 20, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            maxWidth: '680px',
            width: '100%',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>Role</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0ede6' }}>Software / IoT Engineer</span>
          </div>
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>Education</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0ede6' }}>B.Tech IT (KIET '29)</span>
          </div>
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>Key Stack</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0ede6' }}>React, TS, Postgres, C++</span>
          </div>
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>Live SaaS</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#00e87a' }}>GymLane &amp; Yappr</span>
          </div>
        </motion.div>

        {/* Call to actions & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {/* Main buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={onViewResume}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#c8ff00',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                color: '#000',
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 20px rgba(200, 255, 0, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(200, 255, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(200, 255, 0, 0.25)';
              }}
            >
              <FileText size={16} /> VIEW CV / RESUME
            </button>
            
            <button
              onClick={handleScrollToProjects}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                color: '#fff',
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              EXPLORE PORTFOLIO <ArrowDown size={14} />
            </button>
          </div>

          {/* Social icons row */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
            <a
              href="https://github.com/AabhasKatiyar"
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#444',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c8ff00';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#444';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <GithubIcon size={18} />
            </a>
            
            <a
              href="https://linkedin.com/in/aabhaskatiyar"
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#444',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c8ff00';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#444';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href="mailto:aabhas.katiyar.dev@gmail.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#444',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c8ff00';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#444';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Mail size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

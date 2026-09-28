import { motion } from 'framer-motion';
import pfpImage from '../../assets/pfp.png';

interface HeroLandingProps {
  onViewResume: () => void;
}

// Inline SVG icons to avoid lucide version issues
const GithubSVG = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinSVG = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailSVG = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const FileSVG = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ArrowDownSVG = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const TECH_STACK = ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Node.js', 'Next.js'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const HeroLanding = ({ onViewResume }: HeroLandingProps) => {
  const handleExplore = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-landing"
      style={{
        minHeight: '100vh',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(4rem, 6vh, 5.5rem) clamp(1.75rem, 5vw, 4.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Emerald glow - top left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,232,122,0.04), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="hero-grid-container"
        style={{
          maxWidth: 1440,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          className="hero-left-cluster"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: 480,
            width: '100%',
          }}
        >
          {/* ── LEFT COLUMN: Main identity + Wave Card ── */}
          <div
            className="hero-identity-col"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              maxWidth: 460,
              width: '100%',
            }}
          >
            {/* Status badge */}
            <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className="hero-status-badge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(0, 232, 122, 0.12)',
                  border: '1px solid rgba(0, 232, 122, 0.35)',
                  padding: '0.28rem 0.75rem',
                  borderRadius: 999,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 0 20px rgba(0, 232, 122, 0.15)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00e87a',
                    boxShadow: '0 0 10px #00e87a',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#00e87a',
                  }}
                >
                  Available for internships &amp; collaborations
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <div>
              <motion.h1
                className="hero-name-title"
                {...fadeUp(0.05)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.3rem, 3.8vw, 3.6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.05,
                  color: '#ffffff',
                  margin: 0,
                  textShadow: '0 4px 24px rgba(0,0,0,0.85)',
                }}
              >
                Aabhas
                <br />
                <span style={{ color: '#00e87a', textShadow: '0 0 40px rgba(0,232,122,0.45)' }}>
                  Katiyar
                </span>
              </motion.h1>
            </div>

            {/* Role + tagline */}
            <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.25,
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                Full-Stack Software Developer
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.82rem, 1.3vw, 0.9rem)',
                  color: '#cbd5e1',
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: '44ch',
                  textShadow: '0 2px 12px rgba(0,0,0,0.95)',
                }}
              >
                I build production web systems — from multi-tenant Supabase SaaS architectures to real-time interactive web applications.
              </p>
            </motion.div>

            {/* ── CREATIVE WAVE-CUT QUICK PROFILE CARD (ON THE LEFT SIDE) ── */}
            <motion.div
              className="hero-profile-card hero-wave-card"
              {...fadeUp(0.15)}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 450,
                background: 'rgba(9, 14, 24, 0.52)',
                border: '1px solid rgba(0, 232, 122, 0.28)',
                borderRight: 'none',
                borderRadius: '14px 26px 14px 14px',
                padding: '0.85rem 1.15rem',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 35px rgba(0, 232, 122, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                overflow: 'visible',
              }}
            >
              {/* ── Animated Laser Wave-Cut SVG along the right edge ── */}
              <svg
                className="wave-cut-laser"
                viewBox="0 0 24 200"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -12,
                  height: 'calc(100% + 4px)',
                  width: 24,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              >
                <defs>
                  <linearGradient id="waveCutGlowLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00ffa3" stopOpacity="0.95" />
                    <stop offset="30%" stopColor="#00e87a" stopOpacity="1" />
                    <stop offset="70%" stopColor="#c8ff00" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="waveCutBlurLeft" x="-50%" y="-20%" width="200%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 2 0 C 18 35, -2 70, 14 105 C 24 140, 2 170, 12 200"
                  stroke="url(#waveCutGlowLeft)"
                  strokeWidth="2.5"
                  filter="url(#waveCutBlurLeft)"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="105" r="3.2" fill="#c8ff00">
                  <animate attributeName="r" values="2.6;4.4;2.6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="12" cy="195" r="2.2" fill="#00e87a" />
              </svg>

              {/* Wave Protocol Header Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  paddingBottom: '0.45rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <svg width="18" height="9" viewBox="0 0 20 10" fill="none">
                    <path d="M 1 5 C 4 1, 7 9, 10 5 C 13 1, 16 9, 19 5" stroke="#00e87a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      color: '#00e87a',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    WAVE PROTOCOL // QUICK PROFILE
                  </span>
                </div>
                {/* Audio Equalizer Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 9 }}>
                  <span style={{ width: 2, height: '45%', background: '#00e87a', borderRadius: 1, animation: 'pulse-dot 1.2s infinite' }} />
                  <span style={{ width: 2, height: '100%', background: '#00e87a', borderRadius: 1, animation: 'pulse-dot 0.8s infinite 0.2s' }} />
                  <span style={{ width: 2, height: '70%', background: '#00e87a', borderRadius: 1, animation: 'pulse-dot 1.5s infinite 0.4s' }} />
                  <span style={{ width: 2, height: '55%', background: '#00e87a', borderRadius: 1, animation: 'pulse-dot 1.0s infinite 0.1s' }} />
                </div>
              </div>

              {/* Profile Avatar + Identity + Status */}
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(0, 232, 122, 0.5)',
                      boxShadow: '0 0 14px rgba(0, 232, 122, 0.3)',
                      background: '#111',
                      flexShrink: 0,
                    }}
                  >
                    <img src={pfpImage} alt="Aabhas Katiyar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.96rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}
                    >
                      Aabhas K.
                    </h3>
                    <p
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.58rem',
                        color: '#00e87a',
                        letterSpacing: '0.03em',
                        margin: '0.08rem 0 0 0',
                        fontWeight: 600,
                      }}
                    >
                      Full-Stack Software Developer
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'rgba(0, 232, 122, 0.12)',
                    border: '1px solid rgba(0, 232, 122, 0.3)',
                    padding: '0.22rem 0.55rem',
                    borderRadius: 999,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#00e87a',
                      boxShadow: '0 0 8px #00e87a',
                      animation: 'pulse-dot 2s infinite',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: '#00e87a',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Open to opportunities
                  </span>
                </div>
              </div>

              {/* Education & Location Specs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.45rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: 7,
                  padding: '0.45rem 0.65rem',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: '#94a3b8', letterSpacing: '0.08em', display: 'block', fontWeight: 700 }}>
                    EDUCATION
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#f1f5f9', fontWeight: 500 }}>
                    B.Tech IT — KIET (2024–28)
                  </span>
                </div>
                <div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', color: '#94a3b8', letterSpacing: '0.08em', display: 'block', fontWeight: 700 }}>
                    LOCATION
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#f1f5f9', fontWeight: 500 }}>
                    Ghaziabad, India
                  </span>
                </div>
              </div>

              {/* Live Systems row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.52rem',
                    color: '#94a3b8',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  LIVE SYSTEMS //
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                  {[
                    { name: 'GymLane', desc: 'Gym SaaS', color: '#00e87a', href: '#gymlane' },
                    { name: 'Yappr', desc: 'WebSocket Feed', color: '#ff3d6e', href: '#yappr' },
                  ].map(({ name, desc, color, href }) => (
                    <a
                      key={name}
                      href={href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.3rem 0.5rem',
                        borderRadius: 6,
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.03)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${color}70`;
                        e.currentTarget.style.background = `${color}18`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: color,
                          boxShadow: `0 0 8px ${color}`,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, color: '#ffffff' }}>
                        {name}
                      </span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', color: '#94a3b8', marginLeft: 'auto' }}>
                        {desc}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tech stack tags */}
            <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '0.22rem 0.55rem',
                    borderRadius: 5,
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    letterSpacing: '0.03em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00e87a';
                    e.currentTarget.style.borderColor = 'rgba(0,232,122,0.5)';
                    e.currentTarget.style.background = 'rgba(0,232,122,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#f8fafc';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons & Social Links */}
            <motion.div
              className="hero-cta-group"
              {...fadeUp(0.25)}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginTop: '0.15rem' }}
            >
              <button
                className="hero-btn-primary"
                onClick={onViewResume}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  background: '#00e87a',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.65rem 1.3rem',
                  color: '#060d08',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  boxShadow: '0 4px 20px rgba(0,232,122,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,232,122,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,232,122,0.3)';
                }}
              >
                <FileSVG /> View Resume
              </button>
              <button
                className="hero-btn-secondary"
                onClick={handleExplore}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  background: 'rgba(20, 27, 45, 0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 8,
                  padding: '0.65rem 1.3rem',
                  color: '#f8fafc',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.color = '#00e87a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.color = '#f8fafc';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore Work <ArrowDownSVG />
              </button>

              {/* Social icons */}
              <div
                className="hero-social-links"
                style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginLeft: '0.4rem' }}
              >
                {[
                  { href: 'https://github.com/AabhasKatiyar', icon: <GithubSVG />, label: 'GitHub' },
                  { href: 'https://linkedin.com/in/aabhaskatiyar', icon: <LinkedinSVG />, label: 'LinkedIn' },
                  { href: 'mailto:aabhas.katiyar.dev@gmail.com', icon: <MailSVG />, label: 'Email' },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    style={{
                      color: '#94a3b8',
                      transition: 'color 0.25s ease, transform 0.25s ease',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#00e87a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


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
        padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 6vw, 5rem)',
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
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── LEFT: Main identity ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Status badge */}
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className="hero-status-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(0, 232, 122, 0.12)',
                border: '1px solid rgba(0, 232, 122, 0.35)',
                padding: '0.35rem 0.85rem',
                borderRadius: 999,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 0 20px rgba(0, 232, 122, 0.15)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#00e87a',
                  boxShadow: '0 0 10px #00e87a',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
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
                fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.08,
                color: '#ffffff',
                margin: 0,
                textShadow: '0 4px 24px rgba(0,0,0,0.8)',
              }}
            >
              Aabhas
              <br />
              <span style={{ color: '#00e87a', textShadow: '0 0 40px rgba(0,232,122,0.35)' }}>
                Katiyar
              </span>
            </motion.h1>
          </div>

          {/* Role + tagline */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.35,
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}
            >
              Full-Stack Software Developer
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.95rem, 1.9vw, 1.05rem)',
                color: '#e2e8f0',
                margin: 0,
                lineHeight: 1.7,
                maxWidth: '44ch',
                textShadow: '0 2px 12px rgba(0,0,0,0.95)',
              }}
            >
              I build production web systems — from multi-tenant Supabase SaaS architectures to real-time interactive web applications.
            </p>
          </motion.div>

          {/* Tech stack tags */}
          <motion.div {...fadeUp(0.15)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.22)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 6,
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00e87a';
                  e.currentTarget.style.borderColor = 'rgba(0,232,122,0.5)';
                  e.currentTarget.style.background = 'rgba(0,232,122,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#f8fafc';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.85)';
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-group"
            {...fadeUp(0.2)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}
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
                padding: '0.75rem 1.5rem',
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
                padding: '0.75rem 1.5rem',
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
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-social-links"
            {...fadeUp(0.25)}
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}
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
          </motion.div>
        </div>

        {/* ── RIGHT: Identity card ── */}
        <motion.div
          className="hero-profile-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(13, 17, 28, 0.88)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 16,
            padding: '2rem',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div 
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(0, 232, 122, 0.35)',
                  boxShadow: '0 0 18px rgba(0, 232, 122, 0.25)',
                  background: '#111',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00e87a';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 232, 122, 0.45)';
                  e.currentTarget.style.transform = 'scale(1.08) rotate(3deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 232, 122, 0.35)';
                  e.currentTarget.style.boxShadow = '0 0 18px rgba(0, 232, 122, 0.25)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <img 
                  src={pfpImage} 
                  alt="Aabhas Katiyar" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }} 
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.625rem',
                    color: '#94a3b8',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  quick profile
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.015em',
                    margin: '0.15rem 0 0 0',
                  }}
                >
                  Aabhas K.
                </h3>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Role', value: 'Full-Stack Software Developer' },
                { label: 'Education', value: 'B.Tech IT — KIET (2024–2028, 2nd Year)' },
                { label: 'Location', value: 'Ghaziabad, India' },
                { label: 'Status', value: 'Open to opportunities', accent: '#00e87a' },
              ].map(({ label, value, accent }) => (
                <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.625rem',
                      color: '#94a3b8',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      minWidth: '75px',
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: accent || '#f8fafc',
                      fontWeight: accent ? 600 : 500,
                      textShadow: accent ? `0 0 12px ${accent}44` : 'none',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live projects */}
          <div>
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.625rem',
                color: '#94a3b8',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
              live projects
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { name: 'GymLane', desc: 'Multi-tenant gym management SaaS', color: '#00e87a', href: '#gymlane' },
                { name: 'Yappr', desc: 'Real-time social feed with WebSockets', color: '#ff3d6e', href: '#yappr' },
              ].map(({ name, desc, color, href }) => (
                <a
                  key={name}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}60`;
                    e.currentTarget.style.background = `${color}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 10px ${color}`,
                      flexShrink: 0,
                      animation: 'pulse-dot 2s ease-in-out infinite',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        color: '#cbd5e1',
                        marginTop: 2,
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.625rem',
                color: '#94a3b8',
                letterSpacing: '0.1em',
                fontWeight: 500,
              }}
            >
              Scroll to explore full portfolio ↓
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';

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

const TECH_STACK = ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'C++', 'ESP32'];

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
        background: '#0c0c0c',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
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
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#00e87a',
              }}
            >
              Available for internships &amp; collaborations
            </span>
          </motion.div>

          {/* Name */}
          <div>
            <motion.h1
              {...fadeUp(0.05)}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#f0ede6',
                margin: 0,
              }}
            >
              Aabhas
              <br />
              <span style={{ color: '#00e87a', textShadow: '0 0 40px rgba(0,232,122,0.2)' }}>
                Katiyar
              </span>
            </motion.h1>
          </div>

          {/* Role + tagline */}
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                fontWeight: 500,
                color: '#f0ede6',
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              Full-Stack Developer &amp; IoT Engineer
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                color: '#666',
                margin: 0,
                lineHeight: 1.7,
                maxWidth: '42ch',
              }}
            >
              I build production web systems and embedded firmware — from multi-tenant Supabase SaaS to ESP32 microcontrollers.
            </p>
          </motion.div>

          {/* Tech stack tags */}
          <motion.div {...fadeUp(0.15)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.625rem',
                  color: '#555',
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.02)',
                  letterSpacing: '0.04em',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00e87a';
                  e.currentTarget.style.borderColor = 'rgba(0,232,122,0.3)';
                  e.currentTarget.style.background = 'rgba(0,232,122,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#555';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div {...fadeUp(0.2)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={onViewResume}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#00e87a',
                border: 'none',
                borderRadius: 7,
                padding: '0.75rem 1.5rem',
                color: '#060d08',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: '0 4px 20px rgba(0,232,122,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,232,122,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,232,122,0.2)';
              }}
            >
              <FileSVG /> View Resume
            </button>

            <button
              onClick={handleExplore}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 7,
                padding: '0.75rem 1.5rem',
                color: '#888',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = '#f0ede6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = '#888';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore Work <ArrowDownSVG />
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.25)} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
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
                  color: '#3a3a3a',
                  transition: 'color 0.25s ease, transform 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00e87a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#3a3a3a';
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(15,15,15,0.65)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: '2rem',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.25rem' }}>
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.5625rem',
                color: '#333',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              quick profile
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Role', value: 'Software & IoT Engineer' },
                { label: 'Education', value: 'B.Tech IT — KIET (2025–2029)' },
                { label: 'Location', value: 'Ghaziabad, India' },
                { label: 'Status', value: 'Open to opportunities', accent: '#00e87a' },
              ].map(({ label, value, accent }) => (
                <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.5625rem',
                      color: '#333',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      minWidth: '70px',
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: accent || '#888',
                      fontWeight: accent ? 600 : 400,
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
                fontSize: '0.5625rem',
                color: '#333',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
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
                    padding: '0.6rem 0.75rem',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.04)',
                    background: 'rgba(255,255,255,0.02)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}30`;
                    e.currentTarget.style.background = `${color}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                      flexShrink: 0,
                      animation: 'pulse-dot 2s ease-in-out infinite',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: '#f0ede6',
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.6875rem',
                        color: '#555',
                        marginTop: 1,
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
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.5625rem',
                color: '#2a2a2a',
                letterSpacing: '0.1em',
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

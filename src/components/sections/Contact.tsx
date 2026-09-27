import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMAIL = 'aabhas.katiyar.dev@gmail.com';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="contact"
      style={{
        minHeight: '100svh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 3.5rem)',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,0,0.04), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Centered container — Aligns section title and terminal card perfectly */}
      <div
        style={{
          maxWidth: 740,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#c8ff00',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            07 — Contact
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
            }}
          >
            Let's build something real.
          </h2>
        </motion.div>

        {/* Terminal wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(11, 16, 26, 0.40)',
            border: '1px solid rgba(200,255,0,0.22)',
            borderRadius: 16,
            padding: 'clamp(1.5rem, 4vw, 2.75rem)',
            backdropFilter: 'blur(12px) saturate(160%)',
            WebkitBackdropFilter: 'blur(12px) saturate(160%)',
            boxShadow: '0 0 60px rgba(200,255,0,0.06), 0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            alignItems: 'center',
          }}
        >
          {/* Terminal bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '0.75rem',
              marginBottom: '0.25rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff3d6e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00e87a' }} />
            </div>
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.625rem',
                color: '#94a3b8',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              aabhas@portfolio:~$ contact --open-inbox
            </span>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8125rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#cbd5e1',
              fontWeight: 500,
              margin: 0,
            }}
          >
            Internships · collaborations · projects — inbox is open
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: '100%' }}
          >
            <button
              onClick={handleCopy}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 3.2vw, 2.5rem)',
                letterSpacing: '-0.015em',
                color: hovered ? '#c8ff00' : '#ffffff',
                transition: 'color 0.4s ease, text-shadow 0.4s ease',
                lineHeight: 1.15,
                padding: '0.5rem 0',
                position: 'relative',
                textShadow: hovered ? '0 0 40px rgba(200,255,0,0.5)' : 'none',
                wordBreak: 'break-all',
                maxWidth: '100%',
              }}
            >
              {EMAIL}
              {/* Underline sweep */}
              <motion.div
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: 2,
                  background: 'linear-gradient(90deg, #c8ff00, transparent)',
                  transformOrigin: 'left',
                  marginTop: '0.25rem',
                }}
              />
            </button>

            {/* Click-to-copy tooltip badge */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '-2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#c8ff00',
                    color: '#07070f',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 9999,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 0 20px rgba(200,255,0,0.4)',
                  }}
                >
                  ✓ Copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subtext info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              color: '#94a3b8',
              letterSpacing: '0.04em',
              margin: 0,
            }}
          >
            Click to copy · or{' '}
            <a
              href={`mailto:${EMAIL}`}
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 600,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c8ff00'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            >
              open mail client
            </a>
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          >
            {[
              { label: 'GitHub', href: 'https://github.com/AabhasKatiyar' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/aabhaskatiyar' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#cbd5e1',
                  fontWeight: 600,
                  transition: 'color 0.3s ease, text-shadow 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#c8ff00';
                  e.currentTarget.style.textShadow = '0 0 12px rgba(200,255,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#cbd5e1';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {label} ↗
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6875rem',
            letterSpacing: '0.12em',
            color: '#94a3b8',
            fontWeight: 500,
            marginTop: '1rem',
          }}
        >
          Aabhas Katiyar · B.Tech IT (2nd Year) · KIET Group of Institutions · 2024–2028
        </motion.div>
      </div>
    </section>
  );
};

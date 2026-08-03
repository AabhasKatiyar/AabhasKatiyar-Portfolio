import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMAIL = 'abhas.katiyar.dev@gmail.com';

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
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)',
        position: 'relative',
        textAlign: 'center',
        gap: '3rem',
      }}
    >
      {/* Subtle section label — top */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ position: 'absolute', top: 'clamp(2rem, 4vw, 3.5rem)', left: 'clamp(1.5rem, 4vw, 3.5rem)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#222' }}
      >
        05 — Contact
      </motion.span>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333' }}
        >
          Internships, collaborations, projects — inbox is open
        </motion.p>

        {/* Email — the main event */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ position: 'relative' }}
        >
          <button
            onClick={handleCopy}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.25rem, 3.5vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: hovered ? '#c8ff00' : '#f0ede6',
              transition: 'color 0.25s',
              lineHeight: 1,
              padding: 0,
              position: 'relative',
            }}
          >
            {EMAIL}
            {/* Underline sweep */}
            <motion.div
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                position: 'absolute',
                bottom: -4,
                left: 0,
                right: 0,
                height: 2,
                background: '#c8ff00',
                transformOrigin: 'left',
              }}
            />
          </button>

          {/* "Copied" badge */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em',
                  color: '#c8ff00',
                  background: 'rgba(200,255,0,0.08)',
                  border: '1px solid rgba(200,255,0,0.2)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                  marginTop: '0.5rem',
                }}
              >
                Copied ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#2a2a2a', letterSpacing: '0.04em' }}
        >
          Click to copy · or <a href={`mailto:${EMAIL}`} style={{ color: '#333', textDecoration: 'underline' }}>open mail client</a>
        </motion.p>
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.6 }}
        style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
      >
        {[
          { label: 'GitHub', href: 'https://github.com/AabhasKatiyar' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/aabhas-katiyar' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#333',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f0ede6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
          >
            {label} ↗
          </a>
        ))}
      </motion.div>

      {/* Footer line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ position: 'absolute', bottom: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.1em', color: '#1e1e1e' }}
      >
        Aabhas Katiyar · B.Tech IT · KIET Group of Institutions · 2025–2029
      </motion.div>
    </section>
  );
};

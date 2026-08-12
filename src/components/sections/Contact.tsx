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

      {/* Section label — top */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 4vw, 3.5rem)',
          left: 'clamp(1.5rem, 4vw, 3.5rem)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.625rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#1e1e1e',
        }}
      >
        05 — Contact
      </motion.span>

      {/* Terminal wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(10, 10, 10, 0.75)',
          border: '1px solid rgba(200,255,0,0.1)',
          borderRadius: 16,
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 0 60px rgba(200,255,0,0.05), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
          maxWidth: 700,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {/* Terminal bar */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff3d6e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00e87a' }} />
          </div>
          <span style={{ flex: 1, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#333', letterSpacing: '0.1em' }}>
            aabhas@portfolio:~$ contact --open-inbox
          </span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333' }}
        >
          Internships · collaborations · projects — inbox is open
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
              fontSize: 'clamp(1.1rem, 3vw, 3rem)',
              letterSpacing: '-0.03em',
              color: hovered ? '#c8ff00' : '#f0ede6',
              transition: 'color 0.4s ease, text-shadow 0.4s ease',
              lineHeight: 1,
              padding: '0.5rem 0',
              position: 'relative',
              textShadow: hovered ? '0 0 40px rgba(200,255,0,0.5)' : 'none',
            }}
          >
            {EMAIL}
            {/* Underline sweep */}
            <motion.div
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: '#c8ff00',
                boxShadow: '0 0 12px rgba(200,255,0,0.6)',
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
                  border: '1px solid rgba(200,255,0,0.25)',
                  boxShadow: '0 0 16px rgba(200,255,0,0.15)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: 5,
                  whiteSpace: 'nowrap',
                  marginTop: '0.5rem',
                }}
              >
                ✓ Copied to clipboard
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6125rem', color: '#2a2a2a', letterSpacing: '0.04em' }}
        >
          Click to copy · or{' '}
          <a
            href={`mailto:${EMAIL}`}
            style={{ color: '#444', textDecoration: 'underline', transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8ff00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
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
                color: '#444',
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
                e.currentTarget.style.color = '#444';
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
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.5rem',
          letterSpacing: '0.12em',
          color: '#1a1a1a',
        }}
      >
        Aabhas Katiyar · B.Tech IT · KIET Group of Institutions · 2025–2029
      </motion.div>
    </section>
  );
};

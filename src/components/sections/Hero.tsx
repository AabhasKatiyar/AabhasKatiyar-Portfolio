import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: '#0c0c0c',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(2rem, 6vw, 6rem) clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 840, position: 'relative', zIndex: 2 }}>
        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}
        >
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#c8ff00' }} />
          <span className="label-overline" style={{ color: '#c8ff00' }}>PRODUCT ENGINEERING DOCUMENTARY</span>
        </motion.div>

        {/* Philosophy statements */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#f0ede6',
            marginBottom: '1.5rem',
          }}
        >
          Not every project deserves to exist.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(1.5rem, 3.2vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#666',
            marginBottom: '2.5rem',
          }}
        >
          I build systems that solve real operational problems.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.0625rem',
            color: '#888',
            lineHeight: 1.75,
            maxWidth: '52ch',
            marginBottom: '3rem',
          }}
        >
          I am Aabhas Katiyar. I design software architecture starting from the customer problem, down to database security rules and microcontroller firmware.
        </motion.p>

        {/* Call to Case Studies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
        >
          <a href="#gymlane" className="world-link">
            GymLane: Revenue Leakage
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#yappr" className="world-link">
            Yappr: Real-time PubSub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Decorative vertical guide */}
      <div style={{ position: 'absolute', right: 'clamp(2rem, 6vw, 6rem)', bottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, #c8ff00, transparent)', transformOrigin: 'top' }}
        />
        <span className="label-overline" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: '#333' }}>scroll</span>
      </div>
    </section>
  );
};

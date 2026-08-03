import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Stage {
  num: string;
  period: string;
  heading: string;
  body: string;
  tech: string[];
  accent: string;
  bgTint: string;
}

const STAGES: Stage[] = [
  {
    num: '01',
    period: '2023 — Early 2024',
    heading: 'Arduino, C++, and making things move.',
    body: 'My first line of code controlled a servo motor, not a webpage. Learning C++ on an Arduino Uno — reading sensors, blinking LEDs, writing firmware — gave me something most web developers don\'t have: an understanding of what happens below the abstraction layers.',
    tech: ['C/C++', 'Arduino IDE', 'PWM', 'GPIO', 'Sensors', 'Servos'],
    accent: '#f59e0b',
    bgTint: '#0f0b04',
  },
  {
    num: '02',
    period: 'Mid 2024',
    heading: 'ESP32, SoftAP, and a car I drove from my phone.',
    body: 'The ESP32 WiFi car project was the first time I built a complete system: a microcontroller serving an HTTP endpoint, controlling DC motors through an L298N driver via PWM. My phone was the client. The car was the server response. It taught me client–server architecture before I knew what that meant.',
    tech: ['ESP32', 'SoftAP', 'HTTP Server', 'L298N', 'DC Motors', 'PWM Control'],
    accent: '#fb923c',
    bgTint: '#0f0903',
  },
  {
    num: '03',
    period: 'Late 2024 — Early 2025',
    heading: 'HTML, CSS, and JavaScript. Properly. Not quickly.',
    body: 'Before React, I went deep on how browsers actually work. What the cascade in CSS means. How the event loop works. How the DOM is constructed and updated. This foundation made everything that came after faster and less confusing — I wasn\'t fighting the browser, I understood it.',
    tech: ['HTML5', 'CSS Grid', 'Flexbox', 'Vanilla JS', 'DOM APIs', 'Async/Await'],
    accent: '#2dd4bf',
    bgTint: '#030f0d',
  },
  {
    num: '04',
    period: 'Mid 2025',
    heading: 'React, TypeScript, and learning to think in components.',
    body: 'React clicked when I stopped thinking about pages and started thinking about state. TypeScript made me a more careful engineer — having to name your data shapes forces you to think about them before you write the code. Vite replaced webpack confusion with actual speed.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'ESLint'],
    accent: '#60a5fa',
    bgTint: '#03060f',
  },
  {
    num: '05',
    period: 'Late 2025 — Now',
    heading: 'Supabase, PostgreSQL, and two live products.',
    body: 'GymLane and Yappr are real products I built from zero — backend, auth, database schema, Row Level Security, and deployment. I learned more from shipping these two apps than from any tutorial. The hard parts were real: multi-tenant isolation, realtime subscriptions, optimistic UI. This is where I am now.',
    tech: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Supabase Auth', 'Cloudflare Pages', 'Git'],
    accent: '#c8ff00',
    bgTint: '#070f03',
  },
];

export const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate 5 stages horizontally: 0% → -80% of the 500vw strip
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} id="journey" style={{ height: '400vh', position: 'relative' }}>
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', background: '#07070f' }}>

        {/* Progress bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.04)', zIndex: 10 }}>
          <motion.div
            style={{ height: '100%', background: '#9b6dff', width: progressWidth }}
          />
        </div>

        {/* Section label — fixed upper-left */}
        <div style={{ position: 'absolute', top: 'clamp(2rem, 4vw, 3.5rem)', left: 'clamp(1.5rem, 4vw, 3.5rem)', zIndex: 10 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b6dff' }}>
            03 — Journey
          </span>
          <div style={{ marginTop: '0.25rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#333', letterSpacing: '0.1em' }}>
            Scroll to walk the timeline →
          </div>
        </div>

        {/* Horizontal strip */}
        <motion.div
          style={{
            display: 'flex',
            width: `${STAGES.length * 100}vw`,
            height: '100%',
            x,
          }}
        >
          {STAGES.map((stage, i) => (
            <div
              key={i}
              style={{
                width: '100vw',
                height: '100%',
                flexShrink: 0,
                background: stage.bgTint,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(2rem, 6vw, 6rem) clamp(1.5rem, 6vw, 7rem)',
                position: 'relative',
                borderRight: i < STAGES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              {/* Stage number — giant, decorative */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  right: 'clamp(1rem, 4vw, 4rem)',
                  bottom: '2rem',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(8rem, 20vw, 22rem)',
                  color: 'rgba(255,255,255,0.02)',
                  letterSpacing: '-0.06em',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {stage.num}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.625rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: stage.accent,
                    display: 'block',
                    marginBottom: '0.75rem',
                  }}
                >
                  {stage.period}
                </span>

                <h2
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.1,
                    color: '#f0ede6',
                    marginBottom: '1.5rem',
                  }}
                >
                  {stage.heading}
                </h2>

                <p
                  style={{
                    fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                    color: '#666',
                    lineHeight: 1.75,
                    marginBottom: '2rem',
                    maxWidth: '52ch',
                  }}
                >
                  {stage.body}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {stage.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.5625rem',
                        letterSpacing: '0.08em',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 3,
                        border: `1px solid ${stage.accent}30`,
                        color: stage.accent,
                        background: `${stage.accent}0a`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stage indicator dots */}
                <div style={{ display: 'flex', gap: '0.375rem', marginTop: '2.5rem' }}>
                  {STAGES.map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: idx === i ? 20 : 5,
                        height: 5,
                        borderRadius: 999,
                        background: idx === i ? stage.accent : 'rgba(255,255,255,0.08)',
                        transition: 'width 0.3s, background 0.3s',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

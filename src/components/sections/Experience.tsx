import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface TimelineItem {
  period: string;
  role: string;
  org: string;
  desc: string;
  tags: string[];
  color: string;
}

const TIMELINE: TimelineItem[] = [
  {
    period: '2024 – 2028',
    role: 'B.Tech — Information Technology',
    org: 'KIET Group of Institutions, Ghaziabad',
    desc: 'Core courses: Data Structures & Algorithms, Computer Networks, DBMS, Operating Systems, Web Technologies. Currently in 2nd year.',
    tags: ['DSA', 'Networking', 'DBMS', 'OS', 'Web Eng'],
    color: '#00e87a',
  },
  {
    period: '2025 (ongoing)',
    role: 'Independent Builder — GymLane',
    org: 'Self-initiated SaaS project',
    desc: 'Designed and built a multi-tenant gym management platform. Implemented PostgreSQL RLS for tenant isolation, Supabase Auth JWT, real-time check-in logs, and MRR tracking dashboard.',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS'],
    color: '#00e87a',
  },
  {
    period: '2025 (ongoing)',
    role: 'Independent Builder — Yappr',
    org: 'Self-initiated SaaS project',
    desc: 'Built a real-time social microblogging platform with Supabase Realtime WebSocket subscriptions, optimistic UI state updates, and interactive liking mechanics.',
    tags: ['React', 'TypeScript', 'WebSockets', 'Supabase', 'Optimistic UI'],
    color: '#ff3d6e',
  },
  {
    period: '2025',
    role: 'Full-Stack Web Systems & Performance',
    org: 'Independent engineering',
    desc: 'Engineered high-performance web systems featuring scroll-synchronized GPU canvas pipelines, responsive design architectures, and edge deployment automation via Cloudflare.',
    tags: ['React', 'Vite', 'Cloudflare Pages', 'Web Performance', 'Edge'],
    color: '#c8ff00',
  },
];

export const Experience = () => {
  return (
    <section
      id="experience"
      style={{
        minHeight: '100vh',
        background: 'transparent',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 850, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Header */}
        <motion.div {...fadeUp(0)}>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#00e87a',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            03 — Experience
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#ffffff',
              margin: 0,
            }}
          >
            What I've{' '}
            <span style={{ color: '#00e87a', textShadow: '0 0 30px rgba(0,232,122,0.25)' }}>
              built &amp; learned.
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            paddingLeft: '2rem',
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 8,
              width: 2,
              background: 'rgba(255,255,255,0.15)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 + i * 0.09)}
                style={{ position: 'relative' }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: 'calc(-2rem - 4.5px)',
                    top: 6,
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 0 12px ${item.color}`,
                    border: '2px solid #0c0c0c',
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    background: 'rgba(13, 17, 28, 0.88)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14,
                    padding: '1.5rem 1.65rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                >
                  {/* Top row */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.0625rem',
                          fontWeight: 700,
                          letterSpacing: '-0.01em',
                          color: '#ffffff',
                          margin: '0 0 0.25rem 0',
                        }}
                      >
                        {item.role}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.8125rem',
                          color: '#94a3b8',
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        {item.org}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: item.color,
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}40`,
                        padding: '0.25rem 0.75rem',
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      color: '#cbd5e1',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          color: '#f8fafc',
                          border: '1px solid rgba(255,255,255,0.16)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: 5,
                          background: 'rgba(255,255,255,0.06)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

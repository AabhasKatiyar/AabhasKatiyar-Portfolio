import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface SkillGroup {
  category: string;
  color: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    color: '#00e87a',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'C / C++', 'SQL', 'HTML & CSS'],
  },
  {
    category: 'Frontend',
    color: '#ff3d6e',
    skills: ['React 19', 'Vite', 'Tailwind CSS v4', 'Framer Motion'],
  },
  {
    category: 'Backend & Data',
    color: '#f59e0b',
    skills: ['Supabase', 'PostgreSQL', 'Row Level Security (RLS)', 'Supabase Auth', 'Realtime Subscriptions'],
  },
  {
    category: 'Cloud & Tooling',
    color: '#9b6dff',
    skills: ['Git & GitHub', 'Cloudflare Pages', 'Node.js', 'REST APIs', 'Postman', 'Vercel'],
  },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        minHeight: '100vh',
        background: 'transparent',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Amber glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.04), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1050, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

        {/* Header */}
        <motion.div {...fadeUp(0)}>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#ff3d6e',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            02 — Skills
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              color: '#f0ede6',
              margin: 0,
            }}
          >
            Tools I build{' '}
            <span style={{ color: '#ff3d6e', textShadow: '0 0 30px rgba(255,61,110,0.25)' }}>
              with.
            </span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: '#cbd5e1',
              lineHeight: 1.7,
              marginTop: '1rem',
              maxWidth: '50ch',
            }}
          >
            Every tool I've used in a real project. No percentages — I either know it well enough to ship with it, or I don't.
          </p>
        </motion.div>

        {/* Skill groups */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              {...fadeUp(0.08 + gi * 0.07)}
              style={{
                background: 'rgba(11, 16, 26, 0.38)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 14,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.125rem',
                backdropFilter: 'blur(12px) saturate(160%)',
                WebkitBackdropFilter: 'blur(12px) saturate(160%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
                transition: 'border-color 0.3s ease',
              }}
              whileHover={{ borderColor: `${group.color}60`, y: -4 }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: group.color,
                    boxShadow: `0 0 10px ${group.color}`,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      letterSpacing: '0.03em',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: '#f8fafc',
                      background: 'rgba(255,255,255,0.07)',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = group.color;
                      e.currentTarget.style.borderColor = `${group.color}60`;
                      e.currentTarget.style.background = `${group.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#f8fafc';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Honest footer note */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6875rem',
            color: '#94a3b8',
            letterSpacing: '0.08em',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          All skills above have been applied in real shipped projects — GymLane, Yappr, and modern web platforms.
        </motion.p>
      </div>
    </section>
  );
};

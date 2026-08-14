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
    category: 'Hardware & Tools',
    color: '#9b6dff',
    skills: ['Arduino IDE', 'ESP32', 'C++ Firmware', 'WASD Motor Control', 'Git & GitHub', 'Cloudflare Pages'],
  },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        minHeight: '100vh',
        background: '#0e0e0e',
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
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
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
              fontSize: '0.9375rem',
              color: '#555',
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
                background: 'rgba(15,15,15,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.125rem',
                backdropFilter: 'blur(16px)',
                transition: 'border-color 0.3s ease',
              }}
              whileHover={{ borderColor: `${group.color}30`, y: -4 }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: group.color,
                    boxShadow: `0 0 8px ${group.color}99`,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: '#f0ede6',
                    margin: 0,
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.625rem',
                      letterSpacing: '0.03em',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 5,
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#666',
                      background: 'rgba(255,255,255,0.025)',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = group.color;
                      e.currentTarget.style.borderColor = `${group.color}40`;
                      e.currentTarget.style.background = `${group.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
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
            fontSize: '0.5625rem',
            color: '#2a2a2a',
            letterSpacing: '0.08em',
            textAlign: 'center',
          }}
        >
          All skills above have been applied in real shipped projects — GymLane, Yappr, or ESP32 firmware builds.
        </motion.p>
      </div>
    </section>
  );
};

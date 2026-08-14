import { motion } from 'framer-motion';
import { Terminal, Database, Globe, Wrench } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
});

interface TechGroup {
  category: string;
  icon: React.ReactNode;
  items: { name: string; rationale: string }[];
  color: string;
  busLabel: string;
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: "Languages",
    icon: <Terminal size={18} />,
    color: '#00e87a',
    busLabel: 'BUS_01: INSTRUCTION_SETS',
    items: [
      { name: "JavaScript (ES6+)", rationale: "Asynchronous loops, client integrations, and dynamic DOM manipulation." },
      { name: "TypeScript", rationale: "Strict structural typings for multi-tenant data structures and interfaces." },
      { name: "C / C++", rationale: "Low-level microcontrollers firmware, memory boundaries, and physical GPIO controls." },
      { name: "SQL", rationale: "Relational queries, index trees, and multi-tenant join optimization." },
      { name: "HTML & CSS", rationale: "Semantic layout rendering and browser cascade calculations." }
    ]
  },
  {
    category: "Frontend Stack",
    icon: <Globe size={18} />,
    color: '#ff3d6e',
    busLabel: 'BUS_02: RENDERING_LIFECYCLES',
    items: [
      { name: "React 19", rationale: "Declarative component structures and hardware-accelerated DOM reconciliations." },
      { name: "Vite", rationale: "Instant HMR development loop and fast bundle compilation." },
      { name: "Tailwind CSS v4", rationale: "Utility styling systems with minimal CSS payload bounds." },
      { name: "Framer Motion", rationale: "Spring physics physics engines and layout transition states." }
    ]
  },
  {
    category: "Backend & Data",
    icon: <Database size={18} />,
    color: '#f59e0b',
    busLabel: 'BUS_03: PERSISTENCE_LAYERS',
    items: [
      { name: "Supabase", rationale: "Serverless authentication client, cloud storage, and real-time websocket tables." },
      { name: "PostgreSQL", rationale: "Relational modeling, join constraints, and Row Level Security schemas." },
      { name: "Row Level Security (RLS)", rationale: "Enforcing strict multi-tenant tenant isolation directly at the database engine." },
      { name: "Node.js", rationale: "Server runtime environments and automation script hooks." }
    ]
  },
  {
    category: "Tools & Infrastructure",
    icon: <Wrench size={18} />,
    color: '#9b6dff',
    busLabel: 'BUS_04: RELEASES_INTEGRATIONS',
    items: [
      { name: "Git & GitHub", rationale: "Version branches controls, conflict merges, and deployment hook logs." },
      { name: "Cloudflare Pages", rationale: "Global edge CDN distributions for low-latency static hosting." },
      { name: "VS Code", rationale: "Development workspace integrated with compiler engines and checks." },
      { name: "npm Ecosystem", rationale: "Handles node package distributions and dependency trees." }
    ]
  }
];

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        minHeight: '100vh',
        background: '#040508',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative SVG Circuit Traces in the background */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        <path d="M 0 100 H 200 L 250 150 V 300 L 300 350 H 600" fill="none" stroke="rgba(255, 61, 110, 0.4)" strokeWidth="1.5" />
        <path d="M 1200 400 H 1000 L 950 450 V 600 L 900 650 H 500" fill="none" stroke="rgba(0, 232, 122, 0.4)" strokeWidth="1.5" />
        <circle cx="250" cy="150" r="3" fill="#ff3d6e" />
        <circle cx="300" cy="350" r="3" fill="#ff3d6e" />
        <circle cx="950" cy="450" r="3" fill="#00e87a" />
        <circle cx="900" cy="650" r="3" fill="#00e87a" />
      </svg>

      <div style={{ maxWidth: '1080px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Section Title */}
        <motion.div {...fadeUp(0)}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff3d6e', display: 'block', marginBottom: '0.75rem' }}>
            02 — HARDWARE ROUTING ARRAY
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4.1rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
            Why I choose my{' '}
            <span style={{ color: '#ff3d6e', textShadow: '0 0 30px rgba(255,61,110,0.2)' }}>
              frameworks
            </span>
            .
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.6, color: '#888', marginTop: '1rem', maxWidth: '650px' }}>
            Every tool in my development matrix serves a specific architectural or performance objective.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {TECH_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              {...fadeUp(0.1 + groupIdx * 0.1)}
              style={{
                background: 'rgba(10, 11, 20, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)',
              }}
              whileHover={{
                borderColor: `${group.color}44`,
                background: 'rgba(14, 16, 26, 0.65)',
                y: -6,
              }}
            >
              {/* Scanline line overlay inside the card on hover */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: `linear-gradient(to bottom, transparent 95%, ${group.color}15 95%)`, backgroundSize: '100% 20px', animation: 'scan 12s linear infinite', pointerEvents: 'none' }} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  paddingBottom: '0.75rem',
                  color: group.color,
                }}
              >
                {group.icon}
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff', margin: 0 }}>
                  {group.category}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: 'rgba(5, 6, 12, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${group.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>
                      {item.name}
                    </span>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', lineHeight: 1.45, color: '#555', margin: 0 }}>
                      {item.rationale}
                    </p>
                  </div>
                ))}
              </div>

              {/* Hardware Bus Label */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#333', letterSpacing: '0.05em' }}>
                {group.busLabel}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

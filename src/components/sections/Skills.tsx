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
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: "Languages",
    icon: <Terminal size={18} />,
    color: '#00e87a',
    items: [
      { name: "JavaScript (ES6+)", rationale: "Core language for interactive web layers, asynchronous tasks, and DOM interfaces." },
      { name: "TypeScript", rationale: "Adds strict typings to ensure multi-tenant contracts are secure and clean." },
      { name: "C / C++", rationale: "Used for microcontroller firmware development, low-level GPIO register control, and sensor reading." },
      { name: "SQL", rationale: "Essential for transactional database layouts, indexing, and optimizing multi-tenant joins." },
      { name: "HTML & CSS", rationale: "Semantic tag structure, responsive grid alignments, and browser layout mechanics." }
    ]
  },
  {
    category: "Frontend Stack",
    icon: <Globe size={18} />,
    color: '#ff3d6e',
    items: [
      { name: "React 19", rationale: "Declarative UI rendering, modern component lifecycle hooks, and efficient DOM reconciliations." },
      { name: "Vite", rationale: "Instant hot module replacement (HMR) speeds up development iterations." },
      { name: "Tailwind CSS v4", rationale: "Responsive styling, clean styling structures, and minimal styling bundle size." },
      { name: "Framer Motion", rationale: "Handles 60fps spring-based motion dynamics and page layout transitions." }
    ]
  },
  {
    category: "Backend & Data",
    icon: <Database size={18} />,
    color: '#f59e0b',
    items: [
      { name: "Supabase", rationale: "Provides cloud-hosted authentication, storage networks, and real-time websocket tables." },
      { name: "PostgreSQL", rationale: "ACID compliant storage engine used for relational schemas and row-level operations." },
      { name: "Row Level Security (RLS)", rationale: "Enforces tenant-level data isolation directly at the database engine level." },
      { name: "Node.js", rationale: "Local script execution, packages operations, and local mock testing." }
    ]
  },
  {
    category: "Tools & Infrastructure",
    icon: <Wrench size={18} />,
    color: '#9b6dff',
    items: [
      { name: "Git & GitHub", rationale: "Enables secure versioning, branch management, and automatic build hooks." },
      { name: "Cloudflare Pages", rationale: "Static asset hosting with edge deployments for low-latency delivery." },
      { name: "VS Code", rationale: "Development workspace integrated with linting scripts and TypeScript engines." },
      { name: "npm Ecosystem", rationale: "Handles node package distributions and client-side builds." }
    ]
  }
];

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        minHeight: '100vh',
        background: '#06070a',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1050px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        
        {/* Section Title */}
        <motion.div {...fadeUp(0)}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff3d6e', display: 'block', marginBottom: '0.75rem' }}>
            02 — TECH STACK &amp; RATIONALE
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6' }}>
            Why I choose my{' '}
            <span style={{ color: '#ff3d6e', textShadow: '0 0 30px rgba(255,61,110,0.2)' }}>
              technologies
            </span>
            .
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.6, color: '#888', marginTop: '1rem', maxWidth: '650px' }}>
            I do not build things based on hype. Every library, framework, or database tool in my engineering stack serves a specific architectural purpose.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {TECH_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={groupIdx}
              {...fadeUp(0.1 + groupIdx * 0.1)}
              style={{
                background: 'rgba(10, 11, 16, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                borderColor: `${group.color}33`,
                background: 'rgba(15, 17, 24, 0.55)',
                y: -6,
              }}
            >
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
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', margin: 0 }}>
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
                      background: 'rgba(5, 5, 5, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}
                  >
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>
                      {item.name}
                    </span>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', lineHeight: 1.45, color: '#666', margin: 0 }}>
                      {item.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

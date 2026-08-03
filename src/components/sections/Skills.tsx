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
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: "Languages",
    icon: <Terminal size={18} className="text-[var(--color-amber)]" />,
    items: [
      { name: "JavaScript (ES6+)", rationale: "Core language for web interfaces, async loops, DOM manipulation." },
      { name: "TypeScript", rationale: "Strict type safety for multi-tenant SaaS schemas and predictable component contracts." },
      { name: "C / C++", rationale: "Low-level firmware control, register allocations, and microcontrollers." },
      { name: "SQL", rationale: "Relational modeling, join optimizations, and database indexing." },
      { name: "HTML & CSS", rationale: "Semantic accessibility, grid alignments, and DOM hierarchy." }
    ]
  },
  {
    category: "Frontend Stack",
    icon: <Globe size={18} className="text-[var(--color-blue)]" />,
    items: [
      { name: "React 19", rationale: "Declarative component lifecycle management and efficient DOM reconciliations." },
      { name: "Vite", rationale: "Instant HMR development loop and fast ESbuild production bundling." },
      { name: "Tailwind CSS v4", rationale: "Utility-first design system with minimal final CSS payload sizes." },
      { name: "Framer Motion", rationale: "60 FPS spring physics and accessible layout transitions." }
    ]
  },
  {
    category: "Backend & Storage",
    icon: <Database size={18} className="text-[var(--color-amber)]" />,
    items: [
      { name: "Supabase", rationale: "Instant backend infrastructure providing Auth, Storage, and Realtime listeners." },
      { name: "PostgreSQL", rationale: "ACID compliance, relational queries, and Row Level Security policies." },
      { name: "Row Level Security (RLS)", rationale: "Enforces multi-tenant data isolation directly at the database level." },
      { name: "Node.js", rationale: "Server runtime for scripts and backend integrations." }
    ]
  },
  {
    category: "Tools & Infrastructure",
    icon: <Wrench size={18} className="text-[var(--color-blue)]" />,
    items: [
      { name: "Git & GitHub", rationale: "Version control, branching strategies, and automated deployments." },
      { name: "Cloudflare Pages", rationale: "Global CDN edge deployment for fast, zero-downtime static hosting." },
      { name: "VS Code", rationale: "Configured workspace with TypeScript checking and linter extensions." },
      { name: "npm / Node ecosystem", rationale: "Package dependency management and script automation." }
    ]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="section-padding section-divider">
      <div className="container-lg">
        
        {/* Section Title */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="section-eyebrow mb-3">Tech Stack & Rationale</span>
          <h2 className="heading-lg text-white max-w-xl">
            Why I choose my tools.
          </h2>
          <p className="body-lg mt-4 max-w-2xl">
            I don't choose technologies based on hype. Every library, framework, or database in my stack serves a specific engineering purpose.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECH_GROUPS.map((group, groupIdx) => (
            <motion.div key={groupIdx} {...fadeUp(0.1 + groupIdx * 0.1)} className="card space-y-4">
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
                {group.icon}
                <h3 className="font-display font-semibold text-white text-base">{group.category}</h3>
              </div>

              <div className="space-y-3">
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-3 rounded-lg bg-black/20 border border-[var(--color-border)] space-y-1">
                    <span className="font-mono text-xs font-bold text-white block">{item.name}</span>
                    <p className="body-sm text-xs leading-normal text-slate-400">{item.rationale}</p>
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

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Lightbulb, GraduationCap } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const TRAITS = [
  {
    label: 'Builder Mindset',
    desc: 'I believe in finishing. GymLane and Yappr are fully deployed, operational SaaS systems, not just simple GitHub repositories.',
    icon: <ShieldCheck size={20} className="text-[#00e87a]" />,
    color: '#00e87a',
  },
  {
    label: 'Engineering Depth',
    desc: 'I go below abstraction layers. Starting with Arduino and ESP32 C++ code taught me memory constraints, serial registers, and logic flows.',
    icon: <Cpu size={20} className="text-[#f59e0b]" />,
    color: '#f59e0b',
  },
  {
    label: 'Product Intuition',
    desc: 'I ask product questions first: Who has this problem, why does it matter, and what is the cleanest, lowest-latency path to solve it?',
    icon: <Lightbulb size={20} className="text-[#ff3d6e]" />,
    color: '#ff3d6e',
  },
  {
    label: 'Continuous Pace',
    desc: 'I learn by building. Evolving from IoT microcontrollers to full-stack WebSockets, Supabase multi-tenancy, and Postgres RLS optimization.',
    icon: <GraduationCap size={20} className="text-[#9b6dff]" />,
    color: '#9b6dff',
  },
];

export const About = () => {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        background: '#08090f',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1050px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        
        {/* Section title */}
        <motion.div {...fadeUp(0)}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9b6dff', display: 'block', marginBottom: '0.75rem' }}>
            01 — BACKGROUND
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6' }}>
            Engineering solutions,{' '}
            <span style={{ color: '#9b6dff', textShadow: '0 0 30px rgba(155,109,255,0.2)' }}>
              not just code
            </span>
            .
          </h2>
        </motion.div>

        {/* Two column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Left: biography and details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.p {...fadeUp(0.08)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.7, color: '#f0ede6', fontWeight: 500 }}>
              Hi, I'm Aabhas Katiyar. I am currently in my third year of B.Tech in Information Technology at KIET Group of Institutions, Ghaziabad (2025–2029).
            </motion.p>
            
            <motion.p {...fadeUp(0.12)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.7, color: '#888' }}>
              My software journey began with hardware. Writing low-level C++ firmware on Arduino Uno and ESP32 nodes taught me about resource management, physical telemetry loops, and register communications. This hands-on hardware foundation completely changed my perspective on high-level web engineering.
            </motion.p>

            <motion.p {...fadeUp(0.16)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.7, color: '#888' }}>
              When I transitioned to full-stack web architectures, I immediately focused on systems and security. I built <strong style={{ color: '#fff' }}>GymLane</strong> (a multi-tenant operations hub) and <strong style={{ color: '#fff' }}>Yappr</strong> (a live messaging system) to implement secure relational database designs, WebSocket telemetry feeds, and production deployments.
            </motion.p>

            {/* Quick specifications grid */}
            <motion.div
              {...fadeUp(0.2)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                paddingTop: '2rem',
                marginTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>Location</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0ede6' }}>Uttar Pradesh, India</span>
              </div>
              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>College</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f0ede6' }}>KIET Group of Institutions</span>
              </div>
              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>Open to</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#00e87a' }}>Internships / Roles</span>
              </div>
              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>SaaS Projects</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c8ff00' }}>2 Live Systems</span>
              </div>
            </motion.div>
          </div>

          {/* Right: traits grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <motion.h3
              {...fadeUp(0.1)}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.02em',
              }}
            >
              Four Pillars of My Work
            </motion.h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {TRAITS.map((trait, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.14 + i * 0.08)}
                  style={{
                    background: 'rgba(15, 17, 28, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{
                    borderColor: `${trait.color}44`,
                    background: 'rgba(25, 28, 48, 0.55)',
                    y: -4,
                  }}
                >
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {trait.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#fff', margin: '0 0 0.3rem 0' }}>
                      {trait.label}
                    </h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', lineHeight: 1.5, color: '#888', margin: 0 }}>
                      {trait.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

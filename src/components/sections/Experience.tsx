import { motion } from 'framer-motion';
import { GraduationCap, BrainCircuit, Rocket } from 'lucide-react';

interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
  sectorLabel: string;
}

export const Experience = () => {
  const events: TimelineEvent[] = [
    {
      year: "2025 — 2029",
      role: "B.Tech in Information Technology",
      organization: "KIET Group of Institutions, Ghaziabad",
      description: "Focusing on software structures, DSA complexities, network packages, and Internet of Things (IoT) hardware-software configurations.",
      icon: <GraduationCap size={18} />,
      tags: ["Data Structures", "Relational Databases", "IoT Firmware", "Networking"],
      color: '#00e87a',
      sectorLabel: 'SECTOR_03 // ACADEMIC_LOGIC_NODE',
    },
    {
      year: "2025 (Autumn)",
      role: "Embedded Logic Researcher",
      organization: "C++ Embedded Labs",
      description: "Constructing physical circuitry configurations, serial analog telemetry channels, and programming SPI/I2C microcontrollers.",
      icon: <BrainCircuit size={18} />,
      tags: ["Microcontrollers C++", "ADC Circuits", "Serial Telemetry", "PWM registers"],
      color: '#f59e0b',
      sectorLabel: 'SECTOR_02 // HARDWARE_RESEARCH_GATE',
    },
    {
      year: "2025 (Summer)",
      role: "Independent Web Builder",
      organization: "Self-Initiated Projects",
      description: "Compiling HTML layouts and CSS grid vectors to establish core understandings of browser layout engines before using libraries.",
      icon: <Rocket size={18} />,
      tags: ["Semantic DOM", "CSS Cascading", "Vanilla JS APIs"],
      color: '#ff3d6e',
      sectorLabel: 'SECTOR_01 // COMPILED_WEB_FOUNDATION',
    }
  ];

  return (
    <section
      id="experience"
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
      {/* HUD diagnostic coordinate overlays */}
      <div style={{ position: 'absolute', right: '5%', top: '15%', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#1a201b', pointerEvents: 'none', textAlign: 'right' }}>
        <div>LATENCY: 0.15ms</div>
        <div>STABLE_CONDUIT: OK</div>
      </div>

      <div style={{ maxWidth: '1080px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00e87a', display: 'block', marginBottom: '0.75rem' }}>
            03 — LOGIC SEQUENCE BUS
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4.1rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
            System milestones timeline{' '}
            <span style={{ color: '#00e87a', textShadow: '0 0 30px rgba(0,232,122,0.2)' }}>
              history
            </span>
            .
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem', borderLeft: '1px solid rgba(0, 232, 122, 0.15)', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
          {/* Animated data packet traveling down the timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '-1px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, #00e87a, transparent)',
              animation: 'scan 5s linear infinite',
              pointerEvents: 'none',
            }}
          />

          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{
                position: 'relative',
                marginBottom: index === events.length - 1 ? 0 : '3.5rem',
              }}
            >
              {/* Timeline Indicator Ring Node */}
              <span
                style={{
                  position: 'absolute',
                  left: 'calc(-2.5rem - 6px)',
                  top: '8px',
                  display: 'flex',
                  height: '11px',
                  width: '11px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: '#040508',
                  border: `2px solid ${event.color}`,
                  boxShadow: `0 0 10px ${event.color}ee`,
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    height: '3px',
                    width: '3px',
                    borderRadius: '50%',
                    background: '#fff',
                  }}
                />
              </span>

              {/* Event Content holographic Card */}
              <div
                style={{
                  background: 'rgba(12, 13, 20, 0.55)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${event.color}33`;
                  e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.5), 0 0 20px ${event.color}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Visual grid details */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.01) 1px, transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />

                {/* Card Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: `${event.color}08`,
                        border: `1px solid ${event.color}25`,
                        color: event.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {event.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', margin: 0 }}>
                        {event.role}
                      </h4>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#555', letterSpacing: '0.05em' }}>
                        {event.organization}
                      </span>
                    </div>
                  </div>
                  
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: event.color,
                      background: `${event.color}0c`,
                      border: `1px solid ${event.color}20`,
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                    }}
                  >
                    {event.year}
                  </span>
                </div>

                {/* Event Description */}
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', lineHeight: 1.6, color: '#888', margin: 0, position: 'relative', zIndex: 1 }}>
                  {event.description}
                </p>

                {/* Tags pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem', position: 'relative', zIndex: 1 }}>
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        color: '#666',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        transition: 'all 0.25s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = event.color;
                        e.currentTarget.style.borderColor = `${event.color}35`;
                        e.currentTarget.style.background = `${event.color}05`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Logic gate address tag */}
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#333', letterSpacing: '0.04em', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', marginTop: '0.25rem', position: 'relative', zIndex: 1 }}>
                  {event.sectorLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

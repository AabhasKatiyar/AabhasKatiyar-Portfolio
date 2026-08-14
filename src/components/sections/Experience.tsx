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
}

export const Experience = () => {
  const events: TimelineEvent[] = [
    {
      year: "2025 — 2029",
      role: "B.Tech in Information Technology",
      organization: "KIET Group of Institutions, Ghaziabad",
      description: "Focusing on software development structures, data algorithms, computer networks, and advanced Internet of Things (IoT) hardware-software configurations.",
      icon: <GraduationCap size={18} />,
      tags: ["Algorithms", "Database Systems", "IoT Engineering", "Computer Architecture"],
      color: '#00e87a',
    },
    {
      year: "2025 (Autumn)",
      role: "Embedded Logic Researcher",
      organization: "C++ Embedded Labs",
      description: "Experimented with microcontroller capabilities, constructing autonomous circuitry configurations, analog telemetry loops, and SPI/I2C communication channels.",
      icon: <BrainCircuit size={18} />,
      tags: ["ESP32", "Arduino Uno", "Serial Bus", "PWM Systems"],
      color: '#f59e0b',
    },
    {
      year: "2025 (Summer)",
      role: "Independent Web Builder",
      organization: "Self-Initiated Projects",
      description: "Crafted raw-compiled CSS/HTML structures to master browser rendering engine behaviors, semantic structures, and grid alignment mathematics.",
      icon: <Rocket size={18} />,
      tags: ["Semantic HTML", "CSS Grid Layouts", "DOM APIs"],
      color: '#ff3d6e',
    }
  ];

  return (
    <section
      id="experience"
      style={{
        minHeight: '100vh',
        background: '#08080c',
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00e87a', display: 'block', marginBottom: '0.75rem' }}>
            03 — MILESTONE TIMELINE
          </span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6' }}>
            Education &amp;{' '}
            <span style={{ color: '#00e87a', textShadow: '0 0 30px rgba(0,232,122,0.2)' }}>
              experience
            </span>
            .
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid rgba(255, 255, 255, 0.05)', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{
                position: 'relative',
                marginBottom: index === events.length - 1 ? 0 : '3.5rem',
              }}
            >
              {/* Timeline Indicator Ring */}
              <span
                style={{
                  position: 'absolute',
                  left: 'calc(-2rem - 6px)',
                  top: '6px',
                  display: 'flex',
                  height: '11px',
                  width: '11px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: '#08080c',
                  border: `2px solid ${event.color}`,
                  boxShadow: `0 0 10px ${event.color}aa`,
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

              {/* Event Content Card */}
              <div
                style={{
                  background: 'rgba(12, 13, 20, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        color: event.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {event.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff', margin: 0 }}>
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
                      background: `${event.color}0a`,
                      border: `1px solid ${event.color}18`,
                      padding: '0.3rem 0.7rem',
                      borderRadius: '6px',
                    }}
                  >
                    {event.year}
                  </span>
                </div>

                {/* Event Description */}
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', lineHeight: 1.6, color: '#888', margin: 0 }}>
                  {event.description}
                </p>

                {/* Tags pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {event.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        color: '#666',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        transition: 'color 0.2s, border-color 0.2s',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
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
    </section>
  );
};

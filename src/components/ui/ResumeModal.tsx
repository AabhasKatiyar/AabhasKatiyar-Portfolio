import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, GraduationCap, Code2, Briefcase, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Inline custom SVG for Github (since older Lucide versions lack brand icons)
const GithubIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Inline custom SVG for LinkedIn
const LinkedinIcon = ({ size = 18, className }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
          }}
        >
          {/* Print specific CSS stylesheet injection */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-resume-area, #printable-resume-area * {
                visibility: visible;
              }
              #printable-resume-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 0;
                background: white !important;
                color: black !important;
                box-shadow: none !important;
                border: none !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}} />

          {/* Backdrop glassmorphic overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5, 5, 5, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            className="no-print"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              height: '90vh',
              background: '#0a0b10',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header controls bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10, 12, 20, 0.5)',
              }}
              className="no-print"
            >
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Interactive Curriculum Vitae
              </h3>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handlePrint}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    padding: '0.45rem 1rem',
                    color: '#c8ff00',
                    fontSize: '0.75rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200,255,0,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(200,255,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Printer size={14} /> Print / Save PDF
                </button>
                <button
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '4px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Resume Sheet */}
            <div
              id="printable-resume-area"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2.5rem',
                background: '#0a0b10',
                color: '#f0ede6',
              }}
            >
              {/* Header Info */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#fff', letterSpacing: '-0.02em' }}>
                    Aabhas Katiyar
                  </h1>
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#c8ff00', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
                    Full-Stack Software Developer & IoT Engineer
                  </p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#888' }}>
                  <a href="mailto:aabhas.katiyar.dev@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f0ede6' }}>
                    <Mail size={12} className="text-[#c8ff00]" /> aabhas.katiyar.dev@gmail.com
                  </a>
                  <a href="https://linkedin.com/in/aabhaskatiyar" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f0ede6' }}>
                    <LinkedinIcon size={12} className="text-[#c8ff00]" /> linkedin.com/in/aabhaskatiyar
                  </a>
                  <a href="https://github.com/AabhasKatiyar" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f0ede6' }}>
                    <GithubIcon size={12} className="text-[#c8ff00]" /> github.com/AabhasKatiyar
                  </a>
                </div>
              </div>

              {/* Grid content */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  
                  {/* Education */}
                  <div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <GraduationCap size={16} className="text-[#c8ff00]" /> Education
                    </h2>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede6', margin: '0 0 0.15rem 0' }}>B.Tech in Information Technology</h4>
                      <p style={{ fontSize: '0.75rem', color: '#888', margin: '0 0 0.35rem 0' }}>KIET Group of Institutions, Ghaziabad | 2025 – 2029</p>
                      <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, lineHeight: 1.4 }}>
                        Focusing on core software algorithms, computer networking, relational database systems, and embedded computing logic.
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Code2 size={16} className="text-[#c8ff00]" /> Professional Skills
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {[
                        { cat: 'Languages', items: 'JavaScript, TypeScript, C/C++, SQL, HTML/CSS' },
                        { cat: 'Frontend', items: 'React, Vite, Tailwind CSS v4, Framer Motion' },
                        { cat: 'Backend & Data', items: 'Supabase, PostgreSQL, RLS Policies, Node.js' },
                        { cat: 'Infrastructure', items: 'Git & GitHub, Cloudflare Pages, npm, Arduino IDE' },
                      ].map((item) => (
                        <div key={item.cat}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#c8ff00', textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>{item.cat}</span>
                          <p style={{ fontSize: '0.8rem', color: '#f0ede6', margin: 0 }}>{item.items}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={16} className="text-[#c8ff00]" /> Milestones & Focus
                    </h2>
                    <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.75rem', color: '#aaa', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.45 }}>
                      <li><strong>Multi-Tenant Architectures</strong>: Deep familiarity with Postgres Row Level Security (RLS) configurations to secure user datasets natively.</li>
                      <li><strong>Embedded Microcontrollers</strong>: Experience programming C++ scripts on Arduino Uno and ESP32 with wireless integration.</li>
                      <li><strong>Independent SaaS Builder</strong>: Demonstrated capability to launch, debug, and support live database-backed applications.</li>
                    </ul>
                  </div>

                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  
                  {/* Experience */}
                  <div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase size={16} className="text-[#c8ff00]" /> Professional Background
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 0 0.15rem 0' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede6', margin: 0 }}>Embedded Logic Researcher</h4>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#c8ff00' }}>2025</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#888', margin: '0 0 0.35rem 0' }}>C++ Embedded Labs</p>
                        <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, lineHeight: 1.4 }}>
                          Experimented with microcontrollers, constructing hardware circuitry configurations, telemetry data streams, and SPI/I2C communication setups.
                        </p>
                      </div>
                      
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 0 0.15rem 0' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede6', margin: 0 }}>Independent Web Builder</h4>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#c8ff00' }}>2025</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#888', margin: '0 0 0.35rem 0' }}>Self-Initiated Projects</p>
                        <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, lineHeight: 1.4 }}>
                          Created raw CSS/HTML websites to establish a foundational understanding of DOM mechanics and layout math before moving to frameworks.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Core Projects */}
                  <div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Code2 size={16} className="text-[#c8ff00]" /> Featured Projects
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede6', margin: '0 0 0.15rem 0' }}>GymLane (Live SaaS Product)</h4>
                        <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, lineHeight: 1.4 }}>
                          Multi-tenant gym operations platform. Provides real-time websocket check-in logs, Postgres database isolation (Row Level Security), and operational dashboard.
                        </p>
                      </div>
                      
                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede6', margin: '0 0 0.15rem 0' }}>Yappr (Social Feed Network)</h4>
                        <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, lineHeight: 1.4 }}>
                          Microblogging social community. Features instant websocket text-post updates, multi-user auth, and real-time interactive liking mechanics.
                        </p>
                      </div>

                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f0ede6', margin: '0 0 0.15rem 0' }}>ESP32 WiFi Smart-Car</h4>
                        <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0, lineHeight: 1.4 }}>
                          Firmware-driven autonomous car serving a local HTTP browser steering app. Driven using PWM over DC motors and ESP32 SoftAP networks.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

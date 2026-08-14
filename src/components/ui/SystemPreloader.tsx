import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemPreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'SYS_INIT: Booting Mainframe Kernel v4.11.2...',
  'SYS_CHECK: Mapping local memory sectors (OK)',
  'SYS_NET: Resolving Supabase endpoint routes...',
  'SYS_NET: Handshaking WebSocket channels...',
  'SYS_SEC: Securing PostgreSQL multi-tenant isolation layers...',
  'SYS_SEC: Verifying Row Level Security (RLS) tokens...',
  'SYS_HW: Binding ESP32 serial communication gates (Baud: 115200)...',
  'SYS_HW: Mapping ADC pins and analog telemetry buffers...',
  'SYS_UI: Initializing React 19 core state managers...',
  'SYS_UI: Calibrating 60fps spring tension physics...',
  'SYS_COMP: Compiling assets and static modules...',
  'SYS_BOOT: SYSTEM READY. LAUNCHING MISSION CONTROL CONSOLE...',
];

export const SystemPreloader = ({ onComplete }: SystemPreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Auto skip if seen before in session
  useEffect(() => {
    if (sessionStorage.getItem('portfolio-intro-seen') === 'true') {
      setIsDone(true);
      onComplete();
    }
  }, []);

  // Diagnostics logs listing
  useEffect(() => {
    if (isDone) return;
    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIdx]].slice(-7)); // show last 7 lines
        logIdx++;
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [isDone]);

  // Main progress bar counter
  useEffect(() => {
    if (isDone) return;
    const duration = 3200; // 3.2 seconds loading
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(timer);
        // Trigger de-rez glitch flash, then slide out
        setTimeout(() => setGlitchActive(true), 200);
        setTimeout(() => {
          setGlitchActive(false);
          setIsDone(true);
          sessionStorage.setItem('portfolio-intro-seen', 'true');
          setTimeout(onComplete, 800); // allow slide animation to finish
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isDone]);

  if (sessionStorage.getItem('portfolio-intro-seen') === 'true') {
    return null;
  }

  return (
    <AnimatePresence>
      {!isDone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
            pointerEvents: 'auto',
          }}
        >
          {/* Glitch CRT static overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 4px, 6px 100%',
              pointerEvents: 'none',
            }}
          />

          {/* Glitch visual aberration overlay */}
          {glitchActive && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 232, 122, 0.15)',
                mixBlendMode: 'overlay',
                zIndex: 20,
                animation: 'blink-cursor 0.15s infinite',
              }}
            />
          )}

          {/* Sliding Left Door Panel */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '50vw',
              background: '#07080c',
              borderRight: '1px solid rgba(0, 232, 122, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'hidden',
              paddingRight: '2rem',
            }}
          >
            {/* Diagnostic Logs Screen */}
            <div style={{ width: '400px', textAlign: 'left', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#00e87a', opacity: 0.75, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {logs.map((log, idx) => (
                <div key={idx} style={{ textShadow: '0 0 6px rgba(0,232,122,0.4)', whiteSpace: 'nowrap' }}>
                  {log}
                </div>
              ))}
              {logs.length < BOOT_LOGS.length && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '10px',
                    background: '#00e87a',
                    animation: 'blink-cursor 0.8s steps(2, start) infinite',
                    textShadow: '0 0 6px rgba(0,232,122,0.4)',
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* Sliding Right Door Panel */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '50vw',
              background: '#07080c',
              borderLeft: '1px solid rgba(0, 232, 122, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              overflow: 'hidden',
              paddingLeft: '2rem',
            }}
          >
            {/* Dial and Percentage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {/* Spinning circular progress bar */}
              <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="#00e87a"
                    strokeWidth="3"
                    strokeDasharray="157"
                    animate={{
                      strokeDashoffset: 157 - (157 * progress) / 100,
                    }}
                    transition={{ ease: 'easeOut', duration: 0.1 }}
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: '50% 50%',
                      filter: 'drop-shadow(0 0 4px #00e87a)',
                    }}
                  />
                </svg>
                {/* Micro dial details */}
                <div style={{ position: 'absolute', inset: '6px', borderRadius: '50%', border: '1px dashed rgba(0,232,122,0.2)', animation: 'spin 12s linear infinite' }} />
              </div>

              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.75rem', fontWeight: 700, color: '#fff', display: 'block', lineHeight: 1, textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                  {progress}%
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem', display: 'block' }}>
                  Mainframe Loading
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

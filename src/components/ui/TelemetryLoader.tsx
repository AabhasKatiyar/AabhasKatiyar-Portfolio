import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TelemetryLoaderProps {
  onComplete: () => void;
}

export const TelemetryLoader: React.FC<TelemetryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const telemetryLogs = [
    "📟 SYSTEM: INITIALIZING BOOT STRAPPER...",
    "🔋 HARDWARE: CONNECTING TO ESP32 CORES...",
    "🔌 PERIPHERALS: BLINK-LED NODE VERIFIED",
    "📡 CONNECTIVITY: WIFI TRANSCEIVER STABLE",
    "📦 RUNTIME: REACT 19.0.0 & TAILWIND 4.0.0 LOADED",
    "⚙️ LOGIC: ASSEMBLING INTERACTIVE CANVAS ENVIRONMENT...",
    "💡 COMPILING: HARDWARE-SOFTWARE BRIDGE CONTROLLER",
    "🛡️ ACCESS: AUTH COMPLETED (SESSION INITIATED)",
    "🚀 READY: SYSTEM PORTAL DISPATCHED."
  ];

  useEffect(() => {
    // Progress interval
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setIsReady(true);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4; // increment random 4-12%
        return Math.min(prev + step, 100);
      });
    }, 180);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    // Match log items to progress
    const threshold = 100 / telemetryLogs.length;
    const currentLogIndex = Math.min(Math.floor(progress / threshold), telemetryLogs.length - 1);
    setLogIndex(currentLogIndex);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a13] px-6 font-mono"
    >
      {/* Hexagonal Pattern / Subtle Circuit Glow */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cobalt/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-xl border border-white/10 rounded-xl bg-slate-950/60 backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] text-slate-500 tracking-widest uppercase">AabhasDev // Core Bootloader</span>
        </div>

        {/* Telemetry Output Log */}
        <div className="h-44 flex flex-col justify-end gap-2 text-left mb-6 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {telemetryLogs.slice(0, logIndex + 1).map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-[11px] md:text-[13px] leading-relaxed ${
                  index === logIndex 
                    ? 'text-brand-gold font-bold' 
                    : 'text-slate-400'
                }`}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress System */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>MODULE_LOAD_STATUS</span>
            <span className="text-brand-cobalt text-glow-cobalt font-bold">{progress}%</span>
          </div>
          <div className="w-full h-[6px] bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-cobalt to-brand-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Interface Unlock Action */}
        <div className="h-12 flex items-center justify-center mt-6">
          <AnimatePresence>
            {isReady && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full py-2.5 rounded-lg border border-brand-gold text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 font-display font-medium text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              >
                Initialize System Console
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, ArrowDown } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates relative to card centers for 3D tilt
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const [tilt1, setTilt1] = useState({ x: 0, y: 0 });
  const [tilt2, setTilt2] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent, cardNum: number, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert mouse position to coordinates from -1 to 1 relative to center
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;

    // Scale up rotation to max 15 degrees
    if (cardNum === 1) {
      setTilt1({ x: xPct * 20, y: -yPct * 20 });
    } else {
      setTilt2({ x: xPct * 20, y: -yPct * 20 });
    }
  };

  const handleCardMouseLeave = (cardNum: number) => {
    if (cardNum === 1) {
      setTilt1({ x: 0, y: 0 });
    } else {
      setTilt2({ x: 0, y: 0 });
    }
  };

  // Split titles for letter-reveal
  const title1 = "BRIDGING THE GAP BETWEEN";
  const title2 = "SILICON & SYNTAX";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-grid"
      id="hero"
    >
      {/* Dynamic ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-cobalt/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Main Core Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-6 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[10px] md:text-xs font-mono tracking-[0.25em] text-brand-gold uppercase shadow-[0_0_15px_rgba(245,158,11,0.05)]"
      >
        🛰️ SYSTEM LAUNCH // v2026.08
      </motion.div>

      {/* Headline Title */}
      <div className="text-center max-w-5xl space-y-4 select-none">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-none">
          <span className="block text-slate-400 font-display font-medium text-2xl md:text-4xl tracking-wider mb-2">
            {title1.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block bg-gradient-to-r from-brand-cobalt via-white to-brand-gold bg-clip-text text-transparent py-2">
            {title2.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.8, type: "spring" }}
                className="inline-block mr-4 text-glow-cobalt"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-sm md:text-lg text-slate-400 max-w-2xl mx-auto font-sans font-light leading-relaxed"
        >
          A B.Tech IT scholar at KIET University crafting premium software interfaces and interactive hardware integrations with microcontrollers.
        </motion.p>
      </div>

      {/* Hero CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10 flex gap-4 z-10"
      >
        <MagneticButton>
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-lg font-display text-xs font-semibold uppercase tracking-widest text-[#070a13] bg-gradient-to-r from-brand-cobalt to-brand-gold hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] cursor-pointer"
          >
            Access Projects
          </a>
        </MagneticButton>
      </motion.div>

      {/* Dual 3D Tilt Graphics Cards */}
      <div className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 z-10">
        {/* Hardware Core Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="w-full"
        >
          <motion.div
            ref={card1Ref}
            onMouseMove={(e) => handleCardMouseMove(e, 1, card1Ref)}
            onMouseLeave={() => handleCardMouseLeave(1)}
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: tilt1.y,
              rotateY: tilt1.x,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative group border border-white/5 bg-slate-950/40 backdrop-blur-md rounded-2xl p-6 h-64 overflow-hidden shadow-2xl cursor-pointer"
          >
            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div style={{ transform: 'translateZ(50px)' }} className="transition-transform duration-300 flex flex-col justify-between h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Silicon Module</h3>
                  <span className="text-[9px] font-mono text-slate-500">MCU EMBEDDED CONSOLE</span>
                </div>
              </div>
              
              {/* Embedded Microcontroller Vector Graphic representation */}
              <div className="my-4 border border-brand-gold/10 rounded-lg p-3 bg-black/30 font-mono text-[10px] text-brand-gold/75 space-y-1.5">
                <div>#include &lt;WiFi.h&gt;</div>
                <div>ESP32WebServer server(80);</div>
                <div>void setup() &#123;</div>
                <div className="pl-4 text-slate-400">pinMode(MOTOR_PIN, OUTPUT);</div>
                <div className="pl-4 text-slate-400">WiFi.softAP("ESP32_CAR");</div>
                <div>&#125;</div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-white/5 pt-3">
                <span>BOARD: ESP32-WROOM-32D</span>
                <span className="text-brand-gold text-glow-amber animate-pulse">● PIN_G23 (TX)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Software Syntax Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="w-full"
        >
          <motion.div
            ref={card2Ref}
            onMouseMove={(e) => handleCardMouseMove(e, 2, card2Ref)}
            onMouseLeave={() => handleCardMouseLeave(2)}
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: tilt2.y,
              rotateY: tilt2.x,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative group border border-white/5 bg-slate-950/40 backdrop-blur-md rounded-2xl p-6 h-64 overflow-hidden shadow-2xl cursor-pointer"
          >
            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cobalt/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div style={{ transform: 'translateZ(50px)' }} className="transition-transform duration-300 flex flex-col justify-between h-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-cobalt/10 border border-brand-cobalt/20 text-brand-cobalt shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Syntax Router</h3>
                  <span className="text-[9px] font-mono text-slate-500">REACT ARCHITECTURE</span>
                </div>
              </div>

              {/* Web Component representation */}
              <div className="my-4 border border-brand-cobalt/10 rounded-lg p-3 bg-black/30 font-mono text-[10px] text-brand-cobalt/75 space-y-1.5">
                <div>const ProjectCard = (&#123; name &#125;) =&gt; &#123;</div>
                <div className="pl-4">const [hover, setHover] = useState(false);</div>
                <div className="pl-4 text-slate-400">return (</div>
                <div className="pl-8 text-slate-400">&lt;motion.div whileHover=&#123;&#123; scale: 1.05 &#125;&#125; /&gt;</div>
                <div className="pl-4 text-slate-400">);</div>
                <div>&#125;</div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-t border-white/5 pt-3">
                <span>STACK: REACT 19 / TS / TAILWIND 4</span>
                <span className="text-brand-cobalt text-glow-cobalt animate-pulse">● PORT: 5173 (UP)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 flex flex-col items-center text-[10px] font-mono tracking-widest text-slate-500 hover:text-white cursor-pointer"
      >
        <span className="mb-2">SYSTEM_ENTRY</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-brand-cobalt" />
        </motion.div>
      </motion.a>
    </section>
  );
};

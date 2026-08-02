import { useState } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Cpu, Terminal, Info } from 'lucide-react';

export const About = () => {
  const [activePart, setActivePart] = useState<'none' | 'wifi' | 'mcu' | 'gpio'>('none');

  const getTelemetryMessage = () => {
    switch (activePart) {
      case 'wifi':
        return {
          title: "📡 WIRELESS TRANSCEIVER (2.4 GHz)",
          status: "ONLINE // AccessPoint Mode",
          spec: "802.11 b/g/n, Bluetooth v4.2 BR/EDR",
          purpose: "Deploys a local web server (softAP) allowing zero-latency socket controls over mechanical rigs (e.g. WiFi Car)."
        };
      case 'mcu':
        return {
          title: "🧠 ESP32 DUAL-CORE PROCESSOR",
          status: "BUSY // Executing C++ Loop",
          spec: "Tensilica Xtensa 32-bit LX6 @ 240MHz",
          purpose: "Processes synchronous serial streams and drives real-time motor driver PWM calculations."
        };
      case 'gpio':
        return {
          title: "🔌 GPIO EXPANSION SHIELD",
          status: "ARMED // Waiting for Command",
          spec: "36 Digital Pins, ADC/DAC Channels",
          purpose: "Channels outputs like I2C, SPI, and PWM to actuate motor drivers and read analog sensors."
        };
      default:
        return {
          title: "📟 DEVICE DIAGNOSTIC CONSOLE",
          status: "STANDBY // System Idle",
          spec: "ESP32-WROOM-32D Development Board",
          purpose: "Hover over the hardware core modules (Wi-Fi, SoC Chip, or Pins) to map silicon channels."
        };
    }
  };

  const telemetry = getTelemetryMessage();

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto border-t border-white/5" id="about">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-16">
        <span className="font-mono text-xs text-brand-cobalt tracking-wider">// 01.</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-display">
          Narrative Console
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Biography Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 font-sans text-slate-300 font-light leading-relaxed text-sm md:text-base"
        >
          <p>
            Hello! I'm <strong className="text-white font-medium">Aabhas Katiyar</strong>, a final year B.Tech Information Technology student at KIET University. 
            My engineering journey began with the clicking relays and blinking LEDs of Arduino boards, learning C++ to control microcontrollers.
          </p>
          <p>
            That curiosity with physical computing quickly expanded into full-stack software development. Today, I build web controllers that bridge the digital screen with tangible, mechanical systems. 
            I enjoy orchestrating modern web frameworks like <strong className="text-brand-cobalt">React</strong> and <strong className="text-brand-cobalt">Node.js</strong> while maintaining a solid grip on computer architectures and algorithms.
          </p>
          <p>
            Whether implementing interactive 3D dashboards or debugging firmware on an <strong className="text-brand-gold">ESP32 chip</strong>, I strive to write highly performant, accessible, and structured code. Let's make hardware move and software feel alive.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 font-mono">
            <div>
              <span className="block text-[10px] text-slate-500 uppercase">Current Location</span>
              <span className="text-white text-xs">Uttar Pradesh, India</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 uppercase">B.Tech Cohort</span>
              <span className="text-white text-xs">KIET (2025 - 2029)</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Interactive Hardware Module */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <SpotlightCard glowColor={activePart === 'wifi' ? 'cobalt' : activePart === 'mcu' ? 'amber' : 'silver'} className="w-full">
            {/* Diagram Container */}
            <div className="relative flex justify-center bg-black/40 rounded-xl p-6 border border-white/5 mb-4">
              <svg 
                viewBox="0 0 280 200" 
                className="w-full max-w-[280px] h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* PCB Board */}
                <rect x="20" y="20" width="240" height="160" rx="10" fill="#0D1117" stroke="#1F2937" strokeWidth="2" />
                
                {/* Board Circuit Tracks */}
                <path d="M40,50 L90,50 M40,65 L80,65 M40,135 L120,135 M40,150 L120,150" stroke="#1F2937" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M240,50 L200,50 M240,65 L200,65 M240,135 L160,135 M240,150 L160,150" stroke="#1F2937" strokeWidth="1" strokeDasharray="3,3" />

                {/* Left Header Pins (GPIO) */}
                <g 
                  className="cursor-pointer group"
                  onMouseEnter={() => setActivePart('gpio')}
                  onMouseLeave={() => setActivePart('none')}
                >
                  <rect x="25" y="30" width="10" height="140" rx="2" fill={activePart === 'gpio' ? '#f59e0b' : '#374151'} className="transition-all duration-300" />
                  {Array.from({ length: 9 }).map((_, i) => (
                    <circle key={i} cx="30" cy={40 + i * 15} r="2" fill={activePart === 'gpio' ? '#fff' : '#9CA3AF'} />
                  ))}
                </g>

                {/* Right Header Pins (GPIO) */}
                <g 
                  className="cursor-pointer group"
                  onMouseEnter={() => setActivePart('gpio')}
                  onMouseLeave={() => setActivePart('none')}
                >
                  <rect x="245" y="30" width="10" height="140" rx="2" fill={activePart === 'gpio' ? '#f59e0b' : '#374151'} className="transition-all duration-300" />
                  {Array.from({ length: 9 }).map((_, i) => (
                    <circle key={i} cx="250" cy={40 + i * 15} r="2" fill={activePart === 'gpio' ? '#fff' : '#9CA3AF'} />
                  ))}
                </g>

                {/* ESP32 Shield SoC Case */}
                <rect x="70" y="40" width="140" height="120" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

                {/* Wi-Fi Antenna Module */}
                <g 
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePart('wifi')}
                  onMouseLeave={() => setActivePart('none')}
                >
                  <rect 
                    x="85" 
                    y="50" 
                    width="110" 
                    height="45" 
                    rx="4" 
                    fill={activePart === 'wifi' ? '#1E3A8A' : '#334155'} 
                    stroke={activePart === 'wifi' ? '#3B82F6' : '#475569'} 
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />
                  {/* Antenna Pattern */}
                  <path d="M95,60 L185,60 M95,65 L185,65 M95,70 L115,70 M130,70 L185,70" stroke={activePart === 'wifi' ? '#3B82F6' : '#94A3B8'} strokeWidth="1.5" />
                  <text x="140" y="85" fill={activePart === 'wifi' ? '#60A5FA' : '#94A3B8'} fontSize="8" fontFamily="monospace" fontWeight="bold">ESP-WROOM-32D</text>
                </g>

                {/* Main CPU (Xtensa SoC) */}
                <g 
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePart('mcu')}
                  onMouseLeave={() => setActivePart('none')}
                >
                  <rect 
                    x="110" 
                    y="110" 
                    width="60" 
                    height="40" 
                    rx="3" 
                    fill={activePart === 'mcu' ? '#451a03' : '#0F172A'} 
                    stroke={activePart === 'mcu' ? '#D97706' : '#334155'} 
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />
                  <Cpu size={12} x="120" y="118" className={`transition-all duration-300 ${activePart === 'mcu' ? 'text-brand-gold' : 'text-slate-600'}`} />
                  <text x="118" y="142" fill={activePart === 'mcu' ? '#F59E0B' : '#475569'} fontSize="7" fontFamily="monospace">Tensilica</text>
                </g>

                {/* Status LED */}
                <circle cx="215" cy="50" r="3" fill={activePart === 'mcu' ? '#F59E0B' : activePart === 'wifi' ? '#3B82F6' : '#10B981'} className="animate-pulse" />
              </svg>

              {/* Hover tags overlays */}
              <div className="absolute top-2 right-2 flex gap-1 items-center bg-black/60 px-2 py-0.5 rounded border border-white/5 text-[9px] font-mono text-slate-500">
                <Info size={10} />
                <span>Hover Modules</span>
              </div>
            </div>

            {/* Diagnostic Telemetry Feed Display */}
            <div className="border border-white/5 rounded-lg bg-black/40 p-4 font-mono space-y-2 h-[120px] select-none">
              <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-white/5 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Terminal size={10} className="text-brand-cobalt" />
                  <span>{telemetry.title}</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.25 rounded text-[10px] ${
                  activePart === 'wifi' ? 'text-brand-cobalt bg-brand-cobalt/10' : activePart === 'mcu' ? 'text-brand-gold bg-brand-gold/10' : 'text-slate-500 bg-slate-500/10'
                }`}>
                  {telemetry.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="text-slate-600">SPEC:</span> {telemetry.spec}
              </div>
              <div className="text-[11px] text-slate-300 leading-snug">
                <span className="text-slate-600">DESC:</span> {telemetry.purpose}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};

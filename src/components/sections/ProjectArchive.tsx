import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sliders, Laptop, Key, Radio } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
});

export const ProjectArchive = () => {
  const [activeTab, setActiveTab] = useState<'car' | 'calculator' | 'rccar' | 'portfolio'>('car');

  // --- ESP32 WiFi Car Simulator Logic ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carState, setCarState] = useState({
    x: 140,
    y: 100,
    angle: 0,
    speed: 0,
    heading: 0,
    command: 'STANDBY',
    rssi: -56,
    activeKeys: { w: false, a: false, s: false, d: false }
  });

  const requestRef = useRef<number | null>(null);

  // Keyboard Control Listeners for Car Simulator
  useEffect(() => {
    if (activeTab !== 'car') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setCarState(prev => {
          const keys = { ...prev.activeKeys, [key]: true };
          let cmd = prev.command;
          if (keys.w) cmd = 'FORWARD_PWM_255';
          else if (keys.s) cmd = 'REVERSE_PWM_200';
          else if (keys.a) cmd = 'STEER_LEFT';
          else if (keys.d) cmd = 'STEER_RIGHT';
          
          return { ...prev, activeKeys: keys, command: cmd };
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setCarState(prev => {
          const keys = { ...prev.activeKeys, [key]: false };
          let cmd = 'STANDBY';
          if (keys.w) cmd = 'FORWARD_PWM_255';
          else if (keys.s) cmd = 'REVERSE_PWM_200';

          return { ...prev, activeKeys: keys, command: cmd };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeTab]);

  // Frame Physics Engine
  useEffect(() => {
    if (activeTab !== 'car') return;

    const updatePhysics = () => {
      setCarState(prev => {
        let { x, y, angle, speed, activeKeys } = prev;
        
        if (activeKeys.w) {
          speed = Math.min(speed + 0.15, 3.2);
        } else if (activeKeys.s) {
          speed = Math.max(speed - 0.15, -1.8);
        } else {
          speed *= 0.94;
          if (Math.abs(speed) < 0.05) speed = 0;
        }

        if (speed !== 0) {
          const turnDir = speed > 0 ? 1 : -1;
          if (activeKeys.a) angle -= 3.5 * turnDir;
          if (activeKeys.d) angle += 3.5 * turnDir;
        }

        angle = (angle + 360) % 360;
        const rad = (angle * Math.PI) / 180;
        x += Math.cos(rad) * speed;
        y += Math.sin(rad) * speed;

        if (x < 15) x = 15;
        if (x > 265) x = 265;
        if (y < 15) y = 15;
        if (y > 185) y = 185;

        return { ...prev, x, y, angle, speed, heading: Math.round(angle) };
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeTab]);

  // Canvas Renderer
  useEffect(() => {
    if (activeTab !== 'car' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Car Vector Render
    const { x, y, angle } = carState;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);

    // Chassis Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(-12, -7, 24, 14);

    // Wheels
    ctx.fillStyle = '#334155';
    ctx.fillRect(-10, -9, 6, 2);
    ctx.fillRect(4, -9, 6, 2);
    ctx.fillRect(-10, 7, 6, 2);
    ctx.fillRect(4, 7, 6, 2);

    // Body
    ctx.fillStyle = '#2563eb';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-10, -6, 20, 12, 3);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }, [carState, activeTab]);

  // --- Calculator Logic ---
  const [calc, setCalc] = useState({ price: 120, qty: 3, discount: 15, tax: 8 });

  const subtotal = calc.price * calc.qty;
  const discountAmount = (subtotal * calc.discount) / 100;
  const preTax = subtotal - discountAmount;
  const taxAmount = (preTax * calc.tax) / 100;
  const total = preTax + taxAmount;

  return (
    <section id="archive" className="section-padding section-divider">
      <div className="container-lg">
        
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="section-eyebrow mb-3">Project Archive & Engineering Hardware</span>
          <h2 className="heading-lg text-white max-w-xl">
            Simulations, Tools, & Hardware Prototypes
          </h2>
          <p className="body-lg mt-4 max-w-2xl">
            A breakdown of my foundational projects — from physical microcontroller programming (ESP32 / Arduino) to reactive utility tools.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            <button
              onClick={() => setActiveTab('car')}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeTab === 'car' 
                  ? 'bg-[var(--color-surface)] border-[var(--color-blue)]' 
                  : 'border-[var(--color-border)] hover:bg-white/2'
              }`}
            >
              <div className="flex items-center gap-2 label-mono text-slate-500 mb-1">
                <Cpu size={14} className={activeTab === 'car' ? 'text-[var(--color-blue)]' : ''} />
                <span>HARDWARE / IOT</span>
              </div>
              <h4 className="font-display font-semibold text-white text-sm">ESP32 WiFi Car Controller</h4>
              <p className="body-sm text-xs mt-1">SoftAP socket server driving L298N motor shields.</p>
            </button>

            <button
              onClick={() => setActiveTab('rccar')}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeTab === 'rccar' 
                  ? 'bg-[var(--color-surface)] border-[var(--color-amber)]' 
                  : 'border-[var(--color-border)] hover:bg-white/2'
              }`}
            >
              <div className="flex items-center gap-2 label-mono text-slate-500 mb-1">
                <Radio size={14} className={activeTab === 'rccar' ? 'text-[var(--color-amber)]' : ''} />
                <span>MICROCONTROLLER</span>
              </div>
              <h4 className="font-display font-semibold text-white text-sm">Bluetooth RC Car</h4>
              <p className="body-sm text-xs mt-1">HC-05 serial module communication with Arduino.</p>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeTab === 'calculator' 
                  ? 'bg-[var(--color-surface)] border-[var(--color-blue)]' 
                  : 'border-[var(--color-border)] hover:bg-white/2'
              }`}
            >
              <div className="flex items-center gap-2 label-mono text-slate-500 mb-1">
                <Sliders size={14} className={activeTab === 'calculator' ? 'text-[var(--color-blue)]' : ''} />
                <span>JS UTILITY</span>
              </div>
              <h4 className="font-display font-semibold text-white text-sm">Discount Price Calculator</h4>
              <p className="body-sm text-xs mt-1">Reactive DOM state calculation engine.</p>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activeTab === 'portfolio' 
                  ? 'bg-[var(--color-surface)] border-white/40' 
                  : 'border-[var(--color-border)] hover:bg-white/2'
              }`}
            >
              <div className="flex items-center gap-2 label-mono text-slate-500 mb-1">
                <Laptop size={14} />
                <span>META ARCHITECTURE</span>
              </div>
              <h4 className="font-display font-semibold text-white text-sm">Personal Portfolio</h4>
              <p className="body-sm text-xs mt-1">Built with React 19, Vite, & Tailwind v4.</p>
            </button>
          </div>

          {/* Active Content Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'car' && (
                <motion.div key="car" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card space-y-6">
                  <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                    <span className="label-mono text-[var(--color-blue)]">Live WASD Simulator</span>
                    <span className="pill font-mono text-[10px]">C++ / SoftAP WebSockets</span>
                  </div>

                  <div className="relative border border-[var(--color-border)] rounded-xl overflow-hidden bg-black/60 p-2 flex flex-col items-center">
                    <canvas ref={canvasRef} width={280} height={200} className="w-full max-w-[380px] h-[220px] block cursor-crosshair bg-slate-950 rounded-lg" />
                    
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <Key size={14} className="text-[var(--color-blue)]" />
                      <span>Controls: Use keyboard <b className="text-white bg-white/10 px-1 rounded">W</b> <b className="text-white bg-white/10 px-1 rounded">A</b> <b className="text-white bg-white/10 px-1 rounded">S</b> <b className="text-white bg-white/10 px-1 rounded">D</b> to steer vector car</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 font-mono text-[11px] bg-black/30 p-3 rounded-lg border border-[var(--color-border)]">
                    <div>
                      <span className="text-slate-500 block">SPEED</span>
                      <span className="text-white font-bold">{carState.speed.toFixed(1)} m/s</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">HEADING</span>
                      <span className="text-white font-bold">{carState.heading}°</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">COMMAND</span>
                      <span className="text-[var(--color-amber)] font-bold">{carState.command}</span>
                    </div>
                  </div>

                  <p className="body-sm text-xs">
                    <strong>Real Implementation Details:</strong> The actual hardware project uses an ESP32 microcontroller broadcasting a SoftAP Wi-Fi signal. An HTTP web server accepts incoming socket calls to set PWM duty cycles across GPIO pins connected to an L298N dual H-bridge motor driver.
                  </p>
                </motion.div>
              )}

              {activeTab === 'rccar' && (
                <motion.div key="rccar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card space-y-6">
                  <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                    <span className="label-mono text-[var(--color-amber)]">Microcontroller Hardware</span>
                    <span className="pill font-mono text-[10px]">Arduino + HC-05 Bluetooth</span>
                  </div>

                  <h4 className="heading-md text-white">Bluetooth RC Car Prototype</h4>
                  <p className="body-sm">
                    My foundational hardware project that kicked off my programming journey. Built using an Arduino Uno microcontroller, an HC-05 Bluetooth transceiver module, and custom C++ serial packet parsing logic.
                  </p>

                  <div className="p-4 rounded-lg bg-black/40 border border-[var(--color-border)] font-mono text-xs space-y-2 text-slate-300">
                    <div className="text-[var(--color-amber)] font-bold">// C++ Serial Packet Parsing Snippet</div>
                    <div>if (Serial.available() &gt; 0) &#123;</div>
                    <div className="pl-4 text-slate-400">char command = Serial.read();</div>
                    <div className="pl-4 text-slate-400">if (command == 'F') moveForward();</div>
                    <div className="pl-4 text-slate-400">else if (command == 'B') moveBackward();</div>
                    <div>&#125;</div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'calculator' && (
                <motion.div key="calculator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card space-y-6">
                  <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                    <span className="label-mono text-[var(--color-blue)]">Interactive Utility</span>
                    <span className="pill font-mono text-[10px]">Reactive State Calculation</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">PRICE ($)</label>
                      <input type="range" min="10" max="500" value={calc.price} onChange={e => setCalc({...calc, price: Number(e.target.value)})} className="w-full accent-[var(--color-blue)]" />
                      <span className="text-xs font-mono text-white">${calc.price}</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">QUANTITY</label>
                      <input type="range" min="1" max="50" value={calc.qty} onChange={e => setCalc({...calc, qty: Number(e.target.value)})} className="w-full accent-[var(--color-blue)]" />
                      <span className="text-xs font-mono text-white">{calc.qty} units</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">DISCOUNT (%)</label>
                      <input type="range" min="0" max="50" value={calc.discount} onChange={e => setCalc({...calc, discount: Number(e.target.value)})} className="w-full accent-[var(--color-amber)]" />
                      <span className="text-xs font-mono text-white">{calc.discount}%</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400">TAX RATE (%)</label>
                      <input type="range" min="0" max="20" value={calc.tax} onChange={e => setCalc({...calc, tax: Number(e.target.value)})} className="w-full accent-[var(--color-blue)]" />
                      <span className="text-xs font-mono text-white">{calc.tax}%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-black/40 border border-[var(--color-border)] font-mono text-xs space-y-2">
                    <div className="flex justify-between text-slate-400"><span>Gross Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-red-400"><span>Discount ({calc.discount}%):</span><span>-${discountAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-slate-400"><span>Sales Tax ({calc.tax}%):</span><span>+${taxAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm"><span>FINAL TOTAL:</span><span className="text-[var(--color-amber)]">${total.toFixed(2)}</span></div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'portfolio' && (
                <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card space-y-6">
                  <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                    <span className="label-mono text-slate-400">Meta Architecture</span>
                    <span className="pill font-mono text-[10px]">React 19 / Vite / Tailwind v4</span>
                  </div>

                  <h4 className="heading-md text-white">Portfolio System Specs</h4>
                  <p className="body-sm">
                    Rebuilt completely from scratch to reflect my transition into full-stack product engineering. Built without heavy bloated libraries, prioritizing 60 FPS performance, clean accessibility, and genuine project storytelling.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Cpu, Sliders, Laptop, ArrowRight, Key } from 'lucide-react';

export const Projects = () => {
  const [activeProject, setActiveProject] = useState<'car' | 'calculator' | 'portfolio'>('car');

  // --- ESP32 WiFi Car Simulator Logic ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carState, setCarState] = useState({
    x: 100,
    y: 100,
    angle: 0,
    speed: 0,
    heading: 0,
    command: 'STANDBY',
    rssi: -58,
    activeKeys: { w: false, a: false, s: false, d: false }
  });

  const requestRef = useRef<number | null>(null);

  // WASD control listeners
  useEffect(() => {
    if (activeProject !== 'car') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setCarState(prev => {
          const keys = { ...prev.activeKeys, [key]: true };
          let cmd = prev.command;
          if (keys.w) cmd = 'FORWARD_PWM_255';
          else if (keys.s) cmd = 'REVERSE_PWM_200';
          else if (keys.a) cmd = 'STEER_LEFT_90';
          else if (keys.d) cmd = 'STEER_RIGHT_90';
          
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
          else if (keys.a) cmd = 'STEER_LEFT_90';
          else if (keys.d) cmd = 'STEER_RIGHT_90';

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
  }, [activeProject]);

  // Game/Simulation Frame Loop
  useEffect(() => {
    if (activeProject !== 'car') return;

    const updatePhysics = () => {
      setCarState(prev => {
        let { x, y, angle, speed, activeKeys } = prev;
        
        // Acceleration / Deceleration
        if (activeKeys.w) {
          speed = Math.min(speed + 0.15, 3.5);
        } else if (activeKeys.s) {
          speed = Math.max(speed - 0.15, -2.0);
        } else {
          // Friction drag
          speed *= 0.95;
          if (Math.abs(speed) < 0.05) speed = 0;
        }

        // Steer angle updates relative to speed
        if (speed !== 0) {
          const turnDir = speed > 0 ? 1 : -1;
          if (activeKeys.a) {
            angle -= 3 * turnDir;
          }
          if (activeKeys.d) {
            angle += 3 * turnDir;
          }
        }

        // Normalize angle between 0-360
        angle = (angle + 360) % 360;

        // Vector direction mapping
        const rad = (angle * Math.PI) / 180;
        x += Math.cos(rad) * speed;
        y += Math.sin(rad) * speed;

        // Boundary safety check on canvas wrapper (280x200)
        if (x < 10) x = 10;
        if (x > 270) x = 270;
        if (y < 10) y = 10;
        if (y > 190) y = 190;

        // RSSI fluctuations
        const rssiDrift = Math.floor(Math.random() * 3) - 1;
        const rssi = Math.max(-85, Math.min(-45, prev.rssi + rssiDrift));

        return {
          ...prev,
          x,
          y,
          angle,
          speed,
          heading: angle,
          rssi
        };
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeProject]);

  // Canvas drawing loop
  useEffect(() => {
    if (activeProject !== 'car' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid Lines (Microchip wafer style)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let i = 0; i < canvas.width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw track boundaries
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Draw Wifi signal source node at center
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 35, 0, Math.PI * 2);
    ctx.stroke();

    // Draw the Vector Car
    const { x, y, angle } = carState;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);

    // Car base shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(-12, -7, 24, 14);

    // Wheels
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-10, -9, 6, 2); // Top left
    ctx.fillRect(4, -9, 6, 2);  // Top right
    ctx.fillRect(-10, 7, 6, 2);  // Bottom left
    ctx.fillRect(4, 7, 6, 2);   // Bottom right

    // ESP32 Car body (metallic blue and gold outline)
    ctx.fillStyle = '#1e3a8a';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-10, -6, 20, 12, 3);
    ctx.fill();
    ctx.stroke();

    // Onboard blinking amber LED representer
    if (Date.now() % 400 < 200 && carState.speed !== 0) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(6, 0, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Direction line
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(16, 0);
    ctx.stroke();

    ctx.restore();
  }, [carState, activeProject]);

  // --- Price Calculator Logic ---
  const [calcInputs, setCalcInputs] = useState({
    price: 99,
    qty: 5,
    discount: 15,
    tax: 8
  });

  const getCalculations = () => {
    const subtotal = calcInputs.price * calcInputs.qty;
    const discountVal = (subtotal * calcInputs.discount) / 100;
    const preTaxTotal = subtotal - discountVal;
    const taxVal = (preTaxTotal * calcInputs.tax) / 100;
    const total = preTaxTotal + taxVal;

    return {
      subtotal: subtotal.toFixed(2),
      discountVal: discountVal.toFixed(2),
      taxVal: taxVal.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const calcResults = getCalculations();

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto border-t border-white/5" id="projects">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-16">
        <span className="font-mono text-xs text-brand-cobalt tracking-wider">// 03.</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-display">
          Active Simulations
        </h2>
      </div>

      {/* Grid: Selector Links on Left, Simulation Console on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Navigation Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
          
          {/* Project 1 Tabs Selector */}
          <button 
            onClick={() => setActiveProject('car')}
            className={`text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeProject === 'car' 
                ? 'bg-brand-cobalt/5 border-brand-cobalt/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]' 
                : 'border-white/5 bg-transparent hover:bg-white/2'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1.5">
              <Cpu size={12} className={activeProject === 'car' ? 'text-brand-cobalt' : ''} />
              <span>PROJECT // 01</span>
            </div>
            <h4 className="text-base font-display font-bold text-white mb-1">ESP32 WiFi Car Controller</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Steer a hardware vector car on local socket simulation bounds.
            </p>
          </button>

          {/* Project 2 Tabs Selector */}
          <button 
            onClick={() => setActiveProject('calculator')}
            className={`text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeProject === 'calculator' 
                ? 'bg-brand-gold/5 border-brand-gold/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                : 'border-white/5 bg-transparent hover:bg-white/2'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1.5">
              <Sliders size={12} className={activeProject === 'calculator' ? 'text-brand-gold' : ''} />
              <span>PROJECT // 02</span>
            </div>
            <h4 className="text-base font-display font-bold text-white mb-1">Discount Price Calculator</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Reactive checkout discount engine built with modern glass interfaces.
            </p>
          </button>

          {/* Project 3 Tabs Selector */}
          <button 
            onClick={() => setActiveProject('portfolio')}
            className={`text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
              activeProject === 'portfolio' 
                ? 'bg-slate-200/5 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                : 'border-white/5 bg-transparent hover:bg-white/2'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1.5">
              <Laptop size={12} />
              <span>PROJECT // 03</span>
            </div>
            <h4 className="text-base font-display font-bold text-white mb-1">Silicon &amp; Syntax Portfolio</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              This portfolio itself! Explores the migration from static raw markup.
            </p>
          </button>
        </div>

        {/* Right Side: Active Console Interface Screen */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            
            {/* CAR SIMULATOR BOX */}
            {activeProject === 'car' && (
              <motion.div
                key="car"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col justify-between"
              >
                <SpotlightCard glowColor="cobalt" className="h-full flex flex-col gap-6">
                  
                  {/* Canvas Visual Simulator */}
                  <div className="relative border border-white/5 rounded-xl overflow-hidden bg-slate-950/70 p-1 flex justify-center">
                    <canvas 
                      ref={canvasRef} 
                      width={280} 
                      height={200} 
                      className="w-full max-w-[400px] h-[240px] block cursor-crosshair bg-slate-950" 
                    />
                    
                    {/* On-screen Direction Key Hints */}
                    <div className="absolute bottom-4 left-4 flex gap-1 items-center bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 text-[10px] font-mono">
                      <Key size={12} className="text-brand-cobalt" />
                      <span>Steer with keyboard keys <b className="text-white bg-slate-800 px-1 rounded">W</b><b className="text-white bg-slate-800 px-1 rounded ml-0.5">A</b><b className="text-white bg-slate-800 px-1 rounded ml-0.5">S</b><b className="text-white bg-slate-800 px-1 rounded ml-0.5">D</b></span>
                    </div>

                    {/* virtual joysticks for mobile hover */}
                    <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 scale-90 md:hidden">
                      <button 
                        onMouseDown={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, w: true } }))}
                        onMouseUp={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, w: false } }))}
                        className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/10 active:bg-brand-cobalt"
                      >
                        ▲
                      </button>
                      <div className="flex gap-1">
                        <button 
                          onMouseDown={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, a: true } }))}
                          onMouseUp={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, a: false } }))}
                          className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/10 active:bg-brand-cobalt"
                        >
                          ◀
                        </button>
                        <button 
                          onMouseDown={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, s: true } }))}
                          onMouseUp={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, s: false } }))}
                          className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/10 active:bg-brand-cobalt"
                        >
                          ▼
                        </button>
                        <button 
                          onMouseDown={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, d: true } }))}
                          onMouseUp={() => setCarState(p => ({ ...p, activeKeys: { ...p.activeKeys, d: false } }))}
                          className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center border border-white/10 active:bg-brand-cobalt"
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Overlay console */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-white/5 rounded-xl bg-black/35 font-mono text-[10px] select-none">
                    <div className="space-y-1">
                      <span className="text-slate-500 uppercase">Velocity</span>
                      <div className="text-white text-xs font-bold">{(carState.speed * 0.8).toFixed(2)} m/s</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 uppercase">Heading</span>
                      <div className="text-white text-xs font-bold">{carState.heading}°</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 uppercase">Wifi (AP RSSI)</span>
                      <div className="text-brand-cobalt text-xs font-bold">{carState.rssi} dBm</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 uppercase">Core Command</span>
                      <div className="text-brand-gold text-xs font-bold truncate">{carState.command}</div>
                    </div>
                  </div>

                  {/* Description footer */}
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-brand-cobalt/10 text-brand-cobalt border border-brand-cobalt/20 uppercase tracking-widest inline-block">ESP32 &amp; C++ FIRMWARE</span>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      Custom softAP web socket remote controller code running on the ESP32. In the real project, this drives two DC gear motors connected via an L298N motor driver shield, powered by Li-ion battery arrays.
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {/* CALCULATOR SIMULATOR BOX */}
            {activeProject === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col justify-between"
              >
                <SpotlightCard glowColor="amber" className="h-full flex flex-col gap-6">
                  
                  {/* Checkout Config Sliders Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border border-white/5 rounded-xl bg-black/40">
                    
                    {/* Slider Item 1: Unit Price */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span>UNIT_PRICE</span>
                        <span className="text-brand-gold font-bold">${calcInputs.price}</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="500" 
                        value={calcInputs.price}
                        onChange={(e) => setCalcInputs(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                        className="w-full accent-brand-gold bg-slate-800 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>

                    {/* Slider Item 2: Quantity */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span>QUANTITY</span>
                        <span className="text-brand-gold font-bold">{calcInputs.qty} units</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={calcInputs.qty}
                        onChange={(e) => setCalcInputs(prev => ({ ...prev, qty: parseInt(e.target.value) }))}
                        className="w-full accent-brand-gold bg-slate-800 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>

                    {/* Slider Item 3: Discount Rate */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span>DISCOUNT_RATE</span>
                        <span className="text-brand-gold font-bold">{calcInputs.discount}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="70" 
                        value={calcInputs.discount}
                        onChange={(e) => setCalcInputs(prev => ({ ...prev, discount: parseInt(e.target.value) }))}
                        className="w-full accent-brand-gold bg-slate-800 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>

                    {/* Slider Item 4: Tax Rate */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                        <span>TAX_RATE</span>
                        <span className="text-brand-gold font-bold">{calcInputs.tax}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="25" 
                        value={calcInputs.tax}
                        onChange={(e) => setCalcInputs(prev => ({ ...prev, tax: parseInt(e.target.value) }))}
                        className="w-full accent-brand-gold bg-slate-800 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>
                  </div>

                  {/* checkout receipt */}
                  <div className="border border-white/5 rounded-xl bg-slate-950/60 p-5 font-mono space-y-3 relative overflow-hidden select-none">
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand-gold/5 rounded-full blur-[40px] pointer-events-none" />
                    
                    <div className="flex justify-between text-xs text-slate-500 border-b border-white/5 pb-2 uppercase tracking-widest">
                      <span>Receipt Telemetry</span>
                      <span>CalcEngine // Active</span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Gross Subtotal:</span>
                      <span>${calcResults.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-red-400/80">
                      <span>Bulk Discount Applied:</span>
                      <span>-${calcResults.discountVal} ({calcInputs.discount}%)</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Sales Tax:</span>
                      <span>+${calcResults.taxVal} ({calcInputs.tax}%)</span>
                    </div>
                    <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                      <span className="text-xs font-bold text-white">NET_TOTAL_PAYLOAD:</span>
                      <span className="text-lg text-brand-gold text-glow-amber font-black">${calcResults.total}</span>
                    </div>
                  </div>

                  {/* Description footer */}
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-brand-gold/10 text-brand-gold border border-brand-gold/20 uppercase tracking-widest inline-block">DOM MANIPULATION // UTILITY</span>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      Originally engineered for a local store layout to calculate bulk discounts and dynamic tax tiers automatically. Updated to use high-precision JS decimal calculations, visual layout counters, and responsive UI controls.
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}

            {/* PORTFOLIO SIMULATOR BOX */}
            {activeProject === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col justify-between"
              >
                <SpotlightCard glowColor="silver" className="h-full flex flex-col gap-6">
                  
                  {/* Architecture comparison map representation */}
                  <div className="border border-white/5 rounded-xl bg-black/40 p-5 space-y-4 font-mono select-none">
                    <div className="flex justify-between items-center text-xs text-slate-500 border-b border-white/5 pb-2">
                      <span>PORTFOLIO FRAMEWORK TRANSITION</span>
                      <span className="text-emerald-500 text-glow-emerald">STABLE</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center text-xs">
                      {/* Old layout */}
                      <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-red-400">
                        <div className="font-bold">Old Build</div>
                        <div className="text-[10px] mt-1 text-slate-500">Static HTML/CSS</div>
                        <div className="text-[10px] text-slate-500">Multi-page Reloads</div>
                      </div>

                      {/* arrow */}
                      <div className="flex justify-center md:col-span-1 text-slate-600">
                        <ArrowRight className="rotate-90 md:rotate-0" size={18} />
                      </div>

                      {/* New layout */}
                      <div className="md:col-span-3 p-3 bg-brand-cobalt/10 border border-brand-cobalt/35 rounded-lg text-brand-cobalt">
                        <div className="font-bold text-white">Silicon &amp; Syntax Engine</div>
                        <div className="text-[10px] mt-1 text-slate-400">React 19 SPA + TypeScript</div>
                        <div className="text-[10px] text-slate-400">Framer Motion + Tailwind CSS V4</div>
                      </div>
                    </div>

                    {/* Stats table */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-slate-400">
                      <div className="bg-white/2 rounded p-2 border border-white/5">
                        <div className="text-slate-600">FPS RATE</div>
                        <div className="text-white font-bold mt-0.5">60 FPS (Stable)</div>
                      </div>
                      <div className="bg-white/2 rounded p-2 border border-white/5">
                        <div className="text-slate-600">ROUTING</div>
                        <div className="text-white font-bold mt-0.5">Animated Hooks</div>
                      </div>
                      <div className="bg-white/2 rounded p-2 border border-white/5">
                        <div className="text-slate-600">LOUSE CORE</div>
                        <div className="text-brand-gold font-bold mt-0.5">100 / 100</div>
                      </div>
                    </div>
                  </div>

                  {/* Description footer */}
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-white/10 text-white border border-white/20 uppercase tracking-widest inline-block">META ARCHITECTURE // SPA</span>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      Completely rebuilt from the ground up to replace basic multi-page static HTML paths. Utilizing React’s component lifecycles for unified transitions, type-safe structures with TypeScript, and `@tailwindcss/vite` for streamlined style compilation.
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── ESP32 Canvas Simulator with Dust Physics ─────────────────────────────── */
interface CarState { x: number; y: number; angle: number; speed: number; cmd: string }
interface Particle { x: number; y: number; alpha: number; radius: number }

const CarSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const carRef = useRef<CarState>({ x: 140, y: 100, angle: 0, speed: 0, cmd: 'STANDBY' });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const [readout, setReadout] = useState({ speed: '0.0', heading: 0, cmd: 'STANDBY', pwm: 0 });
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => { const k = e.key.toLowerCase(); if (k in keys.current) { (keys.current as Record<string, boolean>)[k] = true; e.preventDefault(); } };
    const ku = (e: KeyboardEvent) => { const k = e.key.toLowerCase(); if (k in keys.current) { (keys.current as Record<string, boolean>)[k] = false; } };
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const loop = () => {
      const c = carRef.current;
      const k = keys.current;
      let pwm = 0;

      if (k.w) { c.speed = Math.min(c.speed + 0.14, 3.4); c.cmd = 'FWD_PWM_255'; pwm = 255; }
      else if (k.s) { c.speed = Math.max(c.speed - 0.14, -1.8); c.cmd = 'REV_PWM_180'; pwm = 180; }
      else { c.speed *= 0.92; if (Math.abs(c.speed) < 0.05) { c.speed = 0; c.cmd = 'STANDBY'; pwm = 0; } }

      if (Math.abs(c.speed) > 0.05) {
        const dir = c.speed > 0 ? 1 : -1;
        if (k.a) c.angle -= 3.5 * dir;
        if (k.d) c.angle += 3.5 * dir;

        if (Math.random() > 0.4) {
          particlesRef.current.push({
            x: c.x - Math.cos((c.angle * Math.PI) / 180) * 10,
            y: c.y - Math.sin((c.angle * Math.PI) / 180) * 10,
            alpha: 0.6,
            radius: Math.random() * 2 + 1,
          });
        }
      }

      c.angle = (c.angle + 360) % 360;
      const rad = (c.angle * Math.PI) / 180;
      c.x = Math.max(12, Math.min(268, c.x + Math.cos(rad) * c.speed));
      c.y = Math.max(12, Math.min(188, c.y + Math.sin(rad) * c.speed));

      setReadout({ speed: Math.abs(c.speed).toFixed(1), heading: Math.round(c.angle), cmd: c.cmd, pwm });

      ctx.fillStyle = '#060d06';
      ctx.fillRect(0, 0, 280, 200);

      ctx.strokeStyle = 'rgba(0,232,122,0.05)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < 280; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, 200); ctx.stroke(); }
      for (let gy = 0; gy < 200; gy += 20) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(280, gy); ctx.stroke(); }

      particlesRef.current.forEach((p, idx) => {
        p.alpha -= 0.02;
        ctx.fillStyle = `rgba(200, 255, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        if (p.alpha <= 0) particlesRef.current.splice(idx, 1);
      });

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(rad);
      ctx.fillStyle = '#1a3020';
      ctx.fillRect(-11, -8, 22, 16);
      ctx.fillStyle = '#555';
      [[-9,-10,5,2],[5,-10,5,2],[-9,8,5,2],[5,8,5,2]].forEach(([x,y,w,h]) => { ctx.fillRect(x, y, w, h); });
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#c8ff00';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(-9, -6, 18, 12, 2);
      ctx.fill(); ctx.stroke();
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={280}
        height={200}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: '100%', maxWidth: 320, borderRadius: 6, border: `1px solid ${focused ? 'rgba(0,232,122,0.4)' : 'rgba(255,255,255,0.05)'}`, display: 'block', cursor: 'crosshair', outline: 'none' }}
      />
      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.625rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.08em' }}>
        <span style={{ color: '#444' }}>SPD <span style={{ color: '#f59e0b' }}>{readout.speed}</span></span>
        <span style={{ color: '#444' }}>HDG <span style={{ color: '#f59e0b' }}>{readout.heading}°</span></span>
        <span style={{ color: '#444' }}>PWM <span style={{ color: '#00e87a' }}>{readout.pwm}</span></span>
        <span style={{ color: '#444' }}>CMD <span style={{ color: '#00e87a' }}>{readout.cmd}</span></span>
      </div>
      <div style={{ marginTop: '0.375rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444', letterSpacing: '0.06em' }}>
        Click canvas then steer car with WASD
      </div>
    </div>
  );
};

/* ─── Calculator ─────────────────────────────────────────── */
const Calculator = () => {
  const [price, setPrice] = useState(120);
  const [qty, setQty] = useState(3);
  const [discount, setDiscount] = useState(15);
  const [tax, setTax] = useState(8);

  const subtotal = price * qty;
  const discountAmt = (subtotal * discount) / 100;
  const taxAmt = ((subtotal - discountAmt) * tax) / 100;
  const total = subtotal - discountAmt + taxAmt;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {[
        { label: 'PRICE', value: price, set: setPrice, min: 10, max: 500, unit: `$${price}` },
        { label: 'QUANTITY', value: qty, set: setQty, min: 1, max: 50, unit: `${qty} units` },
        { label: 'DISCOUNT', value: discount, set: setDiscount, min: 0, max: 60, unit: `${discount}%` },
        { label: 'TAX RATE', value: tax, set: setTax, min: 0, max: 25, unit: `${tax}%` },
      ].map((s) => (
        <div key={s.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', color: '#444' }}>{s.label}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#888' }}>{s.unit}</span>
          </div>
          <input type="range" min={s.min} max={s.max} value={s.value} onChange={(e) => s.set(Number(e.target.value))} style={{ width: '100%', accentColor: '#f59e0b' }} />
        </div>
      ))}
      <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 6, padding: '0.625rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.25rem' }}>
        {[
          { l: 'Subtotal', v: `$${subtotal.toFixed(2)}`, dim: true },
          { l: `Discount (${discount}%)`, v: `-$${discountAmt.toFixed(2)}`, dim: true },
          { l: `Tax (${tax}%)`, v: `+$${taxAmt.toFixed(2)}`, dim: true },
          { l: 'TOTAL', v: `$${total.toFixed(2)}`, dim: false },
        ].map((row) => (
          <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem' }}>
            <span style={{ color: row.dim ? '#444' : '#f0ede6' }}>{row.l}</span>
            <span style={{ color: row.dim ? '#555' : '#f59e0b', fontWeight: row.dim ? 400 : 700 }}>{row.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Sandbox Layout ────────────────────────────────── */
export const EngineeringLab = () => {
  const [mistakeTab, setMistakeTab] = useState<'gym' | 'yappr'>('gym');

  return (
    <section
      id="archive"
      style={{ background: '#0c0c0c', padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)', minHeight: '100svh' }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ marginBottom: '4rem' }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f59e0b' }}>
          06 — Engineering Lab
        </span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6', marginTop: '0.75rem' }}>
          Tactile prototypes & retrospectives.
        </h2>
      </motion.div>

      {/* Grid of Sandboxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: 1100, margin: '0 auto' }}>
        
        {/* ESP32 WASD Sandbox */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          style={{
            background: 'rgba(10, 16, 11, 0.75)',
            border: '1px solid rgba(0,232,122,0.14)',
            borderRadius: 14,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,232,122,0.15), 0 24px 64px rgba(0,0,0,0.55)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
        >
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#00e87a', letterSpacing: '0.12em' }}>SANDBOX 01 // HARDWARE DRIVER</span>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>ESP32 Vector Simulation</h3>
          </div>
          <CarSimulator />
        </motion.div>

        {/* Dynamic Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          style={{
            background: 'rgba(10, 9, 3, 0.75)',
            border: '1px solid rgba(245,158,11,0.1)',
            borderRadius: 14,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(245,158,11,0.12), 0 24px 64px rgba(0,0,0,0.55)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
        >
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#f59e0b', letterSpacing: '0.12em' }}>SANDBOX 02 // REACTIVE STATE</span>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>Discount Price Calculator</h3>
          </div>
          <Calculator />
        </motion.div>

        {/* Retrospectives & Failures */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          style={{
            background: 'rgba(13, 13, 15, 0.75)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(200,255,0,0.08), 0 24px 64px rgba(0,0,0,0.55)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#888', letterSpacing: '0.12em' }}>RETROSPECTIVE // FAILURES</span>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button onClick={() => setMistakeTab('gym')} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', background: mistakeTab === 'gym' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#fff', border: 'none', padding: '0.15rem 0.35rem', borderRadius: 3, cursor: 'pointer' }}>Gym</button>
                <button onClick={() => setMistakeTab('yappr')} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', background: mistakeTab === 'yappr' ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#fff', border: 'none', padding: '0.15rem 0.35rem', borderRadius: 3, cursor: 'pointer' }}>Yappr</button>
              </div>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginTop: '0.375rem', marginBottom: '0.5rem' }}>Mistakes I Made</h3>
            
            <AnimatePresence mode="wait">
              {mistakeTab === 'gym' ? (
                <motion.div key="gym" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.6 }}>
                  <div style={{ color: '#ff3d6e', marginBottom: '0.25rem' }}>❌ Error: Client-side subscription checks</div>
                  <p>Initially verified active plan status solely in client-side widgets. Exposed gym revenue data to local DOM script manipulation.</p>
                  <div style={{ color: '#00e87a', marginTop: '0.5rem', marginBottom: '0.25rem' }}>✓ Rebuilt: Strict Postgres RLS policy</div>
                  <p>Shifted security filters directly into Postgres using Supabase Auth JWT matches. Safe, tamper-proof isolation.</p>
                </motion.div>
              ) : (
                <motion.div key="yappr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.6 }}>
                  <div style={{ color: '#ff3d6e', marginBottom: '0.25rem' }}>❌ Error: Heavy network updates on post updates</div>
                  <p>Initially re-fetched the entire timeline feed on every new post mutation. Created massive network lag on mobile browsers.</p>
                  <div style={{ color: '#00e87a', marginTop: '0.5rem', marginBottom: '0.25rem' }}>✓ Rebuilt: Local optimistic state array insertion</div>
                  <p>Prepended draft data to timeline state memory, executing DB mutations asynchronously in the background. Lag feels zero.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* AI Collaboration Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6, scale: 1.01 }}
          style={{
            background: 'rgba(12, 12, 12, 0.75)',
            border: '1px solid rgba(200,255,0,0.08)',
            borderRadius: 14,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(200,255,0,0.12), 0 24px 64px rgba(0,0,0,0.55)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
        >
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#c8ff00', letterSpacing: '0.12em' }}>COLLEAGUE STATEMENT // AI COLLAB</span>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem', marginBottom: '0.5rem' }}>Honest AI Engineering</h3>
            <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.6 }}>
              AI accelerated implementation, boilerplate setup, and component layout iterations. Architectural decisions, system design patterns, firmware interfaces, and security validation rules were directed and verified by me.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── ESP32 Canvas Simulator ─────────────────────────────── */
interface CarState { x: number; y: number; angle: number; speed: number; cmd: string }

const CarSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const carRef = useRef<CarState>({ x: 140, y: 100, angle: 0, speed: 0, cmd: 'STANDBY' });
  const rafRef = useRef<number | null>(null);
  const [readout, setReadout] = useState({ speed: '0.0', heading: 0, cmd: 'STANDBY' });
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

      if (k.w) { c.speed = Math.min(c.speed + 0.12, 3); c.cmd = 'FWD_PWM_255'; }
      else if (k.s) { c.speed = Math.max(c.speed - 0.12, -1.5); c.cmd = 'REV_PWM_180'; }
      else { c.speed *= 0.93; if (Math.abs(c.speed) < 0.05) { c.speed = 0; c.cmd = 'STANDBY'; } }

      if (Math.abs(c.speed) > 0.05) {
        const dir = c.speed > 0 ? 1 : -1;
        if (k.a) c.angle -= 3.2 * dir;
        if (k.d) c.angle += 3.2 * dir;
      }

      c.angle = (c.angle + 360) % 360;
      const rad = (c.angle * Math.PI) / 180;
      c.x = Math.max(12, Math.min(268, c.x + Math.cos(rad) * c.speed));
      c.y = Math.max(12, Math.min(188, c.y + Math.sin(rad) * c.speed));

      setReadout({ speed: Math.abs(c.speed).toFixed(1), heading: Math.round(c.angle), cmd: c.cmd });

      // Render
      ctx.fillStyle = '#060d06';
      ctx.fillRect(0, 0, 280, 200);

      ctx.strokeStyle = 'rgba(0,232,122,0.06)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < 280; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, 200); ctx.stroke(); }
      for (let gy = 0; gy < 200; gy += 20) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(280, gy); ctx.stroke(); }

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
        style={{ width: '100%', maxWidth: 320, borderRadius: 6, border: `1px solid ${focused ? 'rgba(0,232,122,0.3)' : 'rgba(255,255,255,0.05)'}`, display: 'block', cursor: 'crosshair', outline: 'none' }}
      />
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.625rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.08em' }}>
        <span style={{ color: '#333' }}>SPD <span style={{ color: '#f59e0b' }}>{readout.speed}</span></span>
        <span style={{ color: '#333' }}>HDG <span style={{ color: '#f59e0b' }}>{readout.heading}°</span></span>
        <span style={{ color: '#333' }}>CMD <span style={{ color: '#00e87a' }}>{readout.cmd}</span></span>
      </div>
      <div style={{ marginTop: '0.375rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#2a2a2a', letterSpacing: '0.06em' }}>
        Click canvas then use WASD to steer
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

/* ─── Main Archive Section ───────────────────────────────── */
export const ProjectArchive = () => {


  return (
    <section
      id="archive"
      style={{ background: '#0c0c0c', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)', minHeight: '100svh' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ marginBottom: '3.5rem' }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444' }}>
          04 — Archive
        </span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6', marginTop: '0.75rem' }}>
          Everything else<br />I built.
        </h2>
        <p style={{ marginTop: '1rem', color: '#444', fontSize: '0.9375rem', maxWidth: '44ch', lineHeight: 1.7 }}>
          The projects that came before GymLane and Yappr. Each one taught me something specific.
        </p>
      </motion.div>

      {/* Bento layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', maxWidth: 1000 }}>

        {/* ESP32 car — large card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ gridColumn: 'span 2', background: '#0a120b', border: '1px solid rgba(0,232,122,0.1)', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00e87a' }}>Hardware · ESP32 · WiFi</span>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0ede6', marginTop: '0.375rem', letterSpacing: '-0.02em' }}>WiFi-Controlled RC Car</h3>
            <p style={{ fontSize: '0.8125rem', color: '#444', lineHeight: 1.65, marginTop: '0.375rem' }}>
              ESP32 broadcasts a SoftAP WiFi network. Browser connects, sends HTTP requests.
              ESP32 parses endpoints and drives DC motors via L298N PWM control.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
            <CarSimulator />
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2a4a2e', marginBottom: '0.5rem' }}>HTTP Endpoint Logic</div>
              <div style={{ background: '#060d06', borderRadius: 6, padding: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', lineHeight: 1.7, color: '#3a6040' }}>
                <div><span style={{ color: '#555' }}>// C++ ESP32 firmware</span></div>
                <div>server.on(<span style={{ color: '#f59e0b' }}>"/fwd"</span>, []() {'{'}</div>
                <div style={{ paddingLeft: '1rem' }}>setMotorPWM(<span style={{ color: '#00e87a' }}>255</span>);</div>
                <div>{'}'});</div>
                <div style={{ marginTop: '0.5rem' }}>server.on(<span style={{ color: '#f59e0b' }}>"/stop"</span>, []() {'{'}</div>
                <div style={{ paddingLeft: '1rem' }}>setMotorPWM(<span style={{ color: '#00e87a' }}>0</span>);</div>
                <div>{'}'});</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RC Car — medium card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ background: '#0c0a04', border: '1px solid rgba(245,158,11,0.1)', borderRadius: 12, padding: '1.5rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f59e0b' }}>Hardware · Arduino · Bluetooth</span>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0ede6', marginTop: '0.375rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Bluetooth RC Car</h3>
          <p style={{ fontSize: '0.8125rem', color: '#555', lineHeight: 1.65, marginBottom: '1rem' }}>
            Arduino Uno + HC-05 Bluetooth module. A phone app sends single-char commands over serial.
            The Arduino parses them and drives the motors. This is where C++ clicked.
          </p>
          <div style={{ background: '#0a0804', borderRadius: 6, padding: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', lineHeight: 1.75, color: '#555' }}>
            <div><span style={{ color: '#333' }}>// Serial packet parser</span></div>
            <div>if (Serial.available()) {'{'}</div>
            <div style={{ paddingLeft: '1rem' }}>char c = Serial.read();</div>
            <div style={{ paddingLeft: '1rem' }}>if (c == <span style={{ color: '#f59e0b' }}>'F'</span>) forward();</div>
            <div style={{ paddingLeft: '1rem' }}>if (c == <span style={{ color: '#f59e0b' }}>'B'</span>) reverse();</div>
            <div>{'}'}</div>
          </div>
        </motion.div>

        {/* Calculator — medium card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ background: '#0a0903', border: '1px solid rgba(245,158,11,0.08)', borderRadius: 12, padding: '1.5rem' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f59e0b' }}>Utility · Vanilla JS</span>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0ede6', marginTop: '0.375rem', marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>Discount Calculator</h3>
          <Calculator />
        </motion.div>

        {/* This portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}
        >
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333' }}>Meta · This site</span>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0ede6', marginTop: '0.375rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>This Portfolio</h3>
            <p style={{ fontSize: '0.8125rem', color: '#444', lineHeight: 1.65 }}>
              Rebuilt from scratch to tell a story, not list credentials. Framer Motion for cinematic motion. Supabase-style engineering precision.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {['React 19', 'TypeScript', 'Vite', 'Tailwind v4', 'Framer Motion'].map((t) => (
              <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', padding: '0.15rem 0.5rem', borderRadius: 3, border: '1px solid rgba(255,255,255,0.07)', color: '#333' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

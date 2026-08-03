import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Member {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'expiring' | 'expired';
  daysLeft: number;
  checkin: string;
}

const INITIAL_MEMBERS: Member[] = [
  { id: 'GYM-001', name: 'Vikram S.', plan: 'Quarterly', status: 'active', daysLeft: 67, checkin: '07:30 AM' },
  { id: 'GYM-002', name: 'Priya M.', plan: 'Monthly', status: 'expiring', daysLeft: 2, checkin: 'Yesterday' },
  { id: 'GYM-003', name: 'Rohit K.', plan: 'Annual', status: 'active', daysLeft: 234, checkin: '06:45 AM' },
  { id: 'GYM-004', name: 'Ananya V.', plan: 'Monthly', status: 'expired', daysLeft: 0, checkin: '5 days ago' },
];

const PLANS = ['Monthly', 'Quarterly', 'Annual'];

const statusStyle: Record<Member['status'], React.CSSProperties> = {
  active: { color: '#00e87a', background: 'rgba(0,232,122,0.1)', border: '1px solid rgba(0,232,122,0.2)' },
  expiring: { color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' },
  expired: { color: '#ff3d6e', background: 'rgba(255,61,110,0.1)', border: '1px solid rgba(255,61,110,0.2)' },
};

const AnalyticsChart = ({ members }: { members: Member[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = [12, 18, 15, 24, 28, 32, members.length * 8];
    const max = 40;

    ctx.beginPath();
    ctx.strokeStyle = '#00e87a';
    ctx.lineWidth = 2;

    const step = canvas.width / (data.length - 1);
    data.forEach((val, i) => {
      const x = i * step;
      const y = canvas.height - (val / max) * canvas.height * 0.8 - 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, 'rgba(0,232,122,0.15)');
    grad.addColorStop(1, 'rgba(0,232,122,0.0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }, [members]);

  return <canvas ref={canvasRef} width={280} height={50} style={{ width: '100%', height: 50, display: 'block' }} />;
};

export const GymLane = () => {
  const [viewState, setViewState] = useState<'problem' | 'solution'>('problem');
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [form, setForm] = useState({ name: '', plan: 'Monthly' });
  const [showForm, setShowForm] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'ui' | 'jwt' | 'postgres'>('ui');
  const [pulseText, setPulseText] = useState('Standby');

  const totalMRR = members
    .filter((m) => m.status !== 'expired')
    .reduce((sum, m) => {
      if (m.plan === 'Monthly') return sum + 800;
      if (m.plan === 'Quarterly') return sum + 2000;
      return sum + 7000;
    }, 0);

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setPulseText('INSERT INTO members...');

    const newMember: Member = {
      id: `GYM-00${members.length + 1}`,
      name: form.name.trim(),
      plan: form.plan,
      status: 'active',
      daysLeft: form.plan === 'Monthly' ? 30 : form.plan === 'Quarterly' ? 90 : 365,
      checkin: 'Just enrolled',
    };

    setTimeout(() => {
      setMembers([newMember, ...members]);
      setForm({ name: '', plan: 'Monthly' });
      setShowForm(false);
      setPulseText('Ready');
    }, 600);
  };

  const simulateScan = () => {
    const activeMembers = members.filter((m) => m.status !== 'expired');
    if (!activeMembers.length) return;
    const target = activeMembers[Math.floor(Math.random() * activeMembers.length)];

    setPulseText(`Scan trigger for ${target.id}`);

    setTimeout(() => {
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMembers((prev) =>
        prev.map((m) => (m.id === target.id ? { ...m, checkin: `Just now (${timeNow})` } : m))
      );
      setPulseText('Ready');
    }, 600);
  };

  return (
    <section
      id="gymlane"
      style={{
        minHeight: '110svh',
        background: '#060d08',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,232,122,0.04), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Context */}
      <div style={{ maxWidth: 800, marginBottom: '3.5rem' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00e87a', display: 'block', marginBottom: '0.75rem' }}>
          01 — GymLane: Operational Case Study
        </span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6' }}>
          Visualizing data security and <span style={{ color: '#00e87a' }}>real-time operations</span>.
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {viewState === 'problem' ? (
          /* Operational Problem Cascading Screen */
          <motion.div
            key="problem-screen"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{ borderLeft: '2px solid #ff3d6e', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', color: '#ff3d6e', fontWeight: 700 }}>The Traditional Friction</h3>
              <p style={{ fontSize: '0.9375rem', color: '#888', lineHeight: 1.7 }}>
                Gym owners lose revenue when members access facilities on expired plans because checking registers manually is error-prone. Keeping track of hundreds of renewals via spreadsheets leads to leakages.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem' }}>
              <div style={{ background: 'rgba(255,61,110,0.04)', border: '1px solid rgba(255,61,110,0.15)', borderRadius: 8, padding: '1rem', color: '#ff3d6e' }}>
                <div>❌ Expired plan unnoticed</div>
                <div style={{ color: '#555', marginTop: '0.25rem' }}>Members continue workout entries without billing detection.</div>
              </div>
              <div style={{ background: 'rgba(255,61,110,0.04)', border: '1px solid rgba(255,61,110,0.15)', borderRadius: 8, padding: '1rem', color: '#ff3d6e' }}>
                <div>❌ Manual Spreadsheet Logs</div>
                <div style={{ color: '#555', marginTop: '0.25rem' }}>TEDIOUS call lists and timing checks.</div>
              </div>
            </div>

            <button
              onClick={() => setViewState('solution')}
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6875rem',
                padding: '0.5rem 1rem',
                borderRadius: 6,
                border: '1px solid #00e87a',
                background: 'rgba(0,232,122,0.08)',
                color: '#00e87a',
                cursor: 'pointer',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              Assemble GymLane Solution →
            </button>
          </motion.div>
        ) : (
          /* Reassembled Product Architecture Screen */
          <motion.div
            key="solution-screen"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}
          >
            {/* Left Graphic Exploded Layers Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Layer 1 */}
              <div
                onClick={() => setActiveLayer('ui')}
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  border: activeLayer === 'ui' ? '1px solid #00e87a' : '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1rem 1.25rem',
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#00e87a' }}>LAYER 01 // INTERACTIVE DASHBOARD</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444' }}>React 19</span>
                </div>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.875rem', color: '#fff', fontWeight: 700 }}>Client Dashboard View</h4>
              </div>

              {/* Layer 2 */}
              <div
                onClick={() => setActiveLayer('jwt')}
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  border: activeLayer === 'jwt' ? '1px solid #00e87a' : '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1rem 1.25rem',
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#00e87a' }}>LAYER 02 // SECURITY JWT CHECK</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444' }}>Supabase Auth</span>
                </div>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.875rem', color: '#fff', fontWeight: 700 }}>Middleware Validation</h4>
              </div>

              {/* Layer 3 */}
              <div
                onClick={() => setActiveLayer('postgres')}
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  border: activeLayer === 'postgres' ? '1px solid #00e87a' : '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1rem 1.25rem',
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#00e87a' }}>LAYER 03 // DATA ISOLATION</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444' }}>PostgreSQL</span>
                </div>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.875rem', color: '#fff', fontWeight: 700 }}>Row Level Security (RLS)</h4>
              </div>

              <button
                onClick={() => setViewState('problem')}
                style={{
                  alignSelf: 'flex-start',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.5625rem',
                  color: '#444',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ← View Problem Statement
              </button>
            </div>

            {/* Right Sandbox Screen */}
            <div style={{ background: '#0a100b', borderRadius: 12, border: '1px solid rgba(0,232,122,0.12)', padding: '1.5rem', minHeight: 380, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <AnimatePresence mode="wait">
                {activeLayer === 'ui' && (
                  <motion.div key="ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#888' }}>Live Dashboard Preview</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#00e87a' }}>MRR: ₹{totalMRR.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => setShowForm(!showForm)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', padding: '0.3rem 0.6rem', borderRadius: 4, border: '1px solid rgba(0,232,122,0.3)', background: 'rgba(0,232,122,0.06)', color: '#00e87a', cursor: 'pointer' }}>+ Enroll Member</button>
                      <button onClick={simulateScan} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', padding: '0.3rem 0.6rem', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#666', cursor: 'pointer' }}>Simulate QR Check-in</button>
                    </div>

                    {showForm && (
                      <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '0.5rem', borderRadius: 6 }}>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', padding: '0.25rem 0.5rem', borderRadius: 4, color: '#fff', fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace', outline: 'none' }} />
                        <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} style={{ background: '#0a100b', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace', outline: 'none' }}>
                          {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <button onClick={addMember} style={{ background: '#00e87a', color: '#060d08', border: 'none', padding: '0.25rem 0.5rem', borderRadius: 4, fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', fontWeight: 600 }}>Enroll</button>
                      </div>
                    )}

                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace' }}>
                        <thead>
                          <tr style={{ color: '#444', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <th style={{ padding: '0.25rem' }}>ID</th>
                            <th style={{ padding: '0.25rem' }}>NAME</th>
                            <th style={{ padding: '0.25rem' }}>PLAN</th>
                            <th style={{ padding: '0.25rem' }}>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((m) => (
                            <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                              <td style={{ padding: '0.25rem', color: '#2a4a2e' }}>{m.id}</td>
                              <td style={{ padding: '0.25rem', color: '#fff' }}>{m.name}</td>
                              <td style={{ padding: '0.25rem', color: '#555' }}>{m.plan}</td>
                              <td style={{ padding: '0.25rem' }}>
                                <span style={{ ...statusStyle[m.status], padding: '0.1rem 0.35rem', borderRadius: 2, fontSize: '0.5rem' }}>{m.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ marginTop: '0.5rem' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444' }}>REVENUE GAIN INSIGHT TREND</span>
                      <AnalyticsChart members={members} />
                    </div>
                  </motion.div>
                )}

                {activeLayer === 'jwt' && (
                  <motion.div key="jwt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>JWT Token Decode</span>
                    <div style={{ background: '#070c08', border: '1px solid rgba(0,232,122,0.1)', padding: '0.75rem', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', lineHeight: 1.6, color: '#a0c0a0' }}>
                      <div>{'{'}</div>
                      <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#555' }}>"iss"</span>: <span style={{ color: '#00e87a' }}>"supabase_auth"</span>,</div>
                      <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#555' }}>"role"</span>: <span style={{ color: '#00e87a' }}>"authenticated"</span>,</div>
                      <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#555' }}>"gym_id"</span>: <span style={{ color: '#f59e0b' }}>"gym_81bf28ac"</span></div>
                      <div>{'}'}</div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#555', lineHeight: 1.6 }}>
                      JWT keys verify who is calling the endpoints. This isolates data parameters seamlessly.
                    </p>
                  </motion.div>
                )}

                {activeLayer === 'postgres' && (
                  <motion.div key="postgres" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>Postgres RLS Policy SQL</span>
                    <div style={{ background: '#050a06', border: '1px solid rgba(0,232,122,0.1)', padding: '0.75rem', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', lineHeight: 1.6, color: '#00e87a' }}>
                      <span style={{ color: '#ff3d6e' }}>CREATE POLICY</span> tenant_isolation<br />
                      <span style={{ color: '#ff3d6e' }}>ON</span> public.members<br />
                      <span style={{ color: '#ff3d6e' }}>FOR SELECT USING</span> (<br />
                      &nbsp;&nbsp;gym_id = auth.jwt() -&gt;&gt; <span style={{ color: '#f59e0b' }}>'gym_id'</span><br />
                      );
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#555', lineHeight: 1.6 }}>
                      Enforces multi-tenant separation right at the database layer. Gym owner A cannot read Gym owner B's records under any circumstance.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status bar */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#333' }}>
                <span>SQL PIPE TRANSACTIONS</span>
                <span style={{ color: '#00e87a' }}>{pulseText}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

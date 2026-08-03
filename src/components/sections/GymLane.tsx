import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Member {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'expiring' | 'expired';
  daysLeft: number;
  checkin: string;
  isNew?: boolean;
  scanning?: boolean;
}

const SEED: Member[] = [
  { id: 'GYM-001', name: 'Vikram S.',  plan: 'Quarterly', status: 'active',   daysLeft: 67,  checkin: 'Today, 07:30' },
  { id: 'GYM-002', name: 'Priya M.',   plan: 'Monthly',   status: 'expiring', daysLeft: 2,   checkin: 'Yesterday' },
  { id: 'GYM-003', name: 'Rohit K.',   plan: 'Annual',    status: 'active',   daysLeft: 234, checkin: 'Today, 06:45' },
  { id: 'GYM-004', name: 'Ananya V.',  plan: 'Monthly',   status: 'expired',  daysLeft: 0,   checkin: '5 days ago' },
];

const PLANS = ['Monthly', 'Quarterly', 'Annual'];

const statusStyle: Record<Member['status'], React.CSSProperties> = {
  active:   { color: '#00e87a', background: 'rgba(0,232,122,0.1)',  border: '1px solid rgba(0,232,122,0.2)' },
  expiring: { color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' },
  expired:  { color: '#ff3d6e', background: 'rgba(255,61,110,0.1)',  border: '1px solid rgba(255,61,110,0.2)' },
};

export const GymLane = () => {
  const [members, setMembers] = useState<Member[]>(SEED);
  const [form, setForm] = useState({ name: '', plan: 'Monthly' });
  const [showForm, setShowForm] = useState(false);
  const [scanMsg, setScanMsg] = useState<string | null>(null);

  const totalRevenue = members
    .filter((m) => m.status !== 'expired')
    .reduce((sum, m) => {
      if (m.plan === 'Monthly')   return sum + 800;
      if (m.plan === 'Quarterly') return sum + 2000;
      return sum + 7000;
    }, 0);

  const addMember = () => {
    if (!form.name.trim()) return;
    const newId = `GYM-${String(members.length + 1).padStart(3, '0')}`;
    const newMember: Member = {
      id: newId,
      name: form.name.trim(),
      plan: form.plan,
      status: 'active',
      daysLeft: form.plan === 'Monthly' ? 30 : form.plan === 'Quarterly' ? 90 : 365,
      checkin: 'Just enrolled',
      isNew: true,
    };
    setMembers((prev) => [newMember, ...prev]);
    setForm({ name: '', plan: 'Monthly' });
    setShowForm(false);
    setTimeout(() => setMembers((prev) => prev.map((m) => m.id === newId ? { ...m, isNew: false } : m)), 1500);
  };

  const simulateScan = () => {
    const eligible = members.filter((m) => m.status !== 'expired');
    if (!eligible.length) return;
    const target = eligible[Math.floor(Math.random() * eligible.length)];
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMembers((prev) =>
      prev.map((m) => m.id === target.id ? { ...m, checkin: `Just now (${t})`, scanning: true } : m)
    );
    setScanMsg(`✓ ${target.name} checked in — ${target.status === 'expiring' ? '⚠ Expiring soon' : 'Access granted'}`);
    setTimeout(() => {
      setMembers((prev) => prev.map((m) => m.id === target.id ? { ...m, scanning: false } : m));
      setScanMsg(null);
    }, 3000);
  };

  return (
    <section
      id="gymlane"
      style={{ minHeight: '100svh', background: '#060d08', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle green ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,232,122,0.04), transparent 70%)', pointerEvents: 'none' }} />

      {/* Section label */}
      <div style={{ marginBottom: '3rem' }}>
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00e87a' }}
        >
          01 — GymLane
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6', marginTop: '0.75rem', maxWidth: '14ch' }}
        >
          Gym management,{' '}
          <span style={{ color: '#00e87a' }}>rebuilt.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ marginTop: '1.25rem', maxWidth: '42ch', color: '#555', fontSize: '0.9375rem', lineHeight: 1.75 }}
        >
          Gym owners lose revenue when members use expired plans. GymLane solves
          that with real-time membership tracking, automated expiry logic, and QR
          check-in verification — all secured by PostgreSQL Row Level Security.
        </motion.p>
      </div>

      {/* Browser window */}
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(0,232,122,0.15)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.6)',
          maxWidth: 920,
        }}
      >
        {/* Browser chrome */}
        <div style={{ background: '#0f1a11', borderBottom: '1px solid rgba(0,232,122,0.1)', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {['#ff5f57','#febc2e','#28c840'].map((c) => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 5, padding: '0.25rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: 320, margin: '0 auto' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e87a' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#445', letterSpacing: '0.04em' }}>gymlane.app/dashboard</span>
          </div>
        </div>

        {/* Dashboard */}
        <div style={{ background: '#080f09', padding: '1.5rem' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'Total Members', value: members.length },
              { label: 'Active Today', value: members.filter((m) => m.status === 'active').length },
              { label: 'Monthly Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
            ].map((stat) => (
              <div key={stat.label} style={{ background: 'rgba(0,232,122,0.04)', border: '1px solid rgba(0,232,122,0.1)', borderRadius: 8, padding: '0.875rem 1rem' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.375rem', color: '#00e87a', letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3a5a3e', marginTop: '0.2rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowForm((v) => !v)}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.375rem 0.875rem', borderRadius: 6, border: '1px solid rgba(0,232,122,0.3)', background: 'rgba(0,232,122,0.08)', color: '#00e87a', cursor: 'pointer' }}
            >
              + Add Member
            </button>
            <button
              onClick={simulateScan}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.375rem 0.875rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#555', cursor: 'pointer' }}
            >
              ⬡ QR Desk Scan
            </button>
          </div>

          {/* Add form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginBottom: '0.75rem' }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: 'rgba(0,232,122,0.04)', border: '1px solid rgba(0,232,122,0.1)', borderRadius: 8, flexWrap: 'wrap' }}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Member name"
                    style={{ flex: 1, minWidth: 140, padding: '0.35rem 0.6rem', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#f0ede6', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', outline: 'none' }}
                  />
                  <select
                    value={form.plan}
                    onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
                    style={{ padding: '0.35rem 0.5rem', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: '#0a120b', color: '#888', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', outline: 'none' }}
                  >
                    {PLANS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <button onClick={addMember} style={{ padding: '0.35rem 0.875rem', borderRadius: 5, border: 'none', background: '#00e87a', color: '#060d08', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                    Enroll →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan notification */}
          <AnimatePresence>
            {scanMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ padding: '0.5rem 0.875rem', background: 'rgba(0,232,122,0.08)', border: '1px solid rgba(0,232,122,0.2)', borderRadius: 6, marginBottom: '0.75rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#00e87a', letterSpacing: '0.04em' }}
              >
                {scanMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Members table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6875rem', fontFamily: 'JetBrains Mono, monospace' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['ID', 'Name', 'Plan', 'Status', 'Days Left', 'Last Check-in'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.375rem 0.5rem', color: '#2a4a2e', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.5625rem', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {members.map((m) => (
                    <motion.tr
                      key={m.id}
                      initial={m.isNew ? { opacity: 0, x: -12 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', background: m.scanning ? 'rgba(0,232,122,0.06)' : 'transparent', transition: 'background 0.3s' }}
                    >
                      <td style={{ padding: '0.5rem', color: '#2a4a2e' }}>{m.id}</td>
                      <td style={{ padding: '0.5rem', color: '#f0ede6', fontWeight: 500 }}>{m.name}</td>
                      <td style={{ padding: '0.5rem', color: '#555' }}>{m.plan}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{ ...statusStyle[m.status], padding: '0.125rem 0.5rem', borderRadius: 3, fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          {m.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', color: '#555' }}>{m.daysLeft > 0 ? `${m.daysLeft}d` : '—'}</td>
                      <td style={{ padding: '0.5rem', color: m.scanning ? '#00e87a' : '#3a5a3e' }}>{m.checkin}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Engineering note */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ marginTop: '3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap', maxWidth: 720 }}
      >
        {[
          { title: 'Why RLS?', body: 'PostgreSQL Row Level Security guarantees that one gym owner can never query or mutate another gym\'s data — enforced at the database level, not the application layer.' },
          { title: 'Auth model', body: 'Supabase Auth issues JWTs containing the gym owner\'s account ID. Every query is automatically scoped through RLS policies — no manual filtering in application code.' },
        ].map((note) => (
          <div key={note.title} style={{ flex: '1 1 280px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.875rem', color: '#00e87a', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{note.title}</div>
            <p style={{ fontSize: '0.875rem', color: '#445', lineHeight: 1.65 }}>{note.body}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

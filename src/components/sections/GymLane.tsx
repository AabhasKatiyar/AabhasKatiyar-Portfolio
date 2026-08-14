import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GYMLANE_TECH = ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'Supabase Auth'];

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

const DOT_COLOR: Record<Member['status'], string> = {
  active:   '#00e87a',
  expiring: '#f59e0b',
  expired:  '#ff3d6e',
};

const STATUS_CLASS: Record<Member['status'], string> = {
  active:   'status-badge-active',
  expiring: 'status-badge-expiring',
  expired:  'status-badge-expired',
};

export const GymLane = () => {
  const [sandboxOpen, setSandboxOpen] = useState(false);
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
        background: '#060d08',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '20%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,232,122,0.05), transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1050, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* ── Case Study Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(15,15,15,0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Top: label + title */}
          <div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00e87a', display: 'block', marginBottom: '0.5rem' }}>
              04 — Projects · GymLane
            </span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#f0ede6', margin: 0 }}>
              Multi-tenant Gym Management SaaS
            </h2>
          </div>

          {/* Case study grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff3d6e' }}>Problem</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Gym owners lose revenue when members access facilities on expired plans — manual registers are error-prone and don't scale.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00e87a' }}>Solution</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#666', lineHeight: 1.6, margin: 0 }}>
                Real-time dashboard with QR check-in simulation, live MRR tracking, and PostgreSQL Row Level Security enforcing true multi-tenant data isolation at the database layer.
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.25rem' }}>Stack</span>
            {GYMLANE_TECH.map((t) => (
              <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#555', border: '1px solid rgba(0,232,122,0.15)', background: 'rgba(0,232,122,0.04)', padding: '0.2rem 0.6rem', borderRadius: 4 }}>{t}</span>
            ))}
          </div>

          {/* Launch sandbox button */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSandboxOpen((v) => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', fontWeight: 700,
                padding: '0.65rem 1.4rem', borderRadius: 7, cursor: 'pointer',
                border: sandboxOpen ? '1px solid rgba(0,232,122,0.5)' : '1px solid rgba(0,232,122,0.4)',
                background: sandboxOpen ? '#00e87a' : 'rgba(0,232,122,0.08)',
                color: sandboxOpen ? '#060d08' : '#00e87a',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: sandboxOpen ? '0 4px 20px rgba(0,232,122,0.3)' : 'none',
              }}
              onMouseEnter={(e) => { if (!sandboxOpen) { e.currentTarget.style.background = 'rgba(0,232,122,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
              onMouseLeave={(e) => { if (!sandboxOpen) { e.currentTarget.style.background = 'rgba(0,232,122,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
            >
              {sandboxOpen ? '↑ Close Sandbox' : '⚡ Launch Sandbox'}
            </button>
            {!sandboxOpen && (
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#2a2a2a', letterSpacing: '0.08em' }}>
                Interactive member management demo
              </span>
            )}
          </div>
        </motion.div>

        {/* ── Collapsible Sandbox (existing code) ── */}
        <AnimatePresence>
          {sandboxOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
        <div style={{ paddingTop: '0.5rem' }}>
      <AnimatePresence mode="wait">
        {viewState === 'problem' ? (
          <motion.div
            key="problem-screen"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div
              style={{
                background: 'rgba(255,61,110,0.04)',
                border: '1px solid rgba(255,61,110,0.15)',
                borderRadius: 12,
                padding: '1.5rem',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem', color: '#ff3d6e', fontWeight: 700, marginBottom: '0.75rem' }}>
                The Traditional Friction
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#888', lineHeight: 1.7 }}>
                Gym owners lose revenue when members access facilities on expired plans because checking registers manually is error-prone. Keeping track of hundreds of renewals via spreadsheets leads to leakages.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: '❌', title: 'Expired plan unnoticed', desc: 'Members continue workout entries without billing detection.' },
                { icon: '❌', title: 'Manual Spreadsheet Logs', desc: 'Tedious call lists and timing checks.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'rgba(255,61,110,0.04)',
                    border: '1px solid rgba(255,61,110,0.15)',
                    borderRadius: 10,
                    padding: '1rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6875rem',
                    backdropFilter: 'blur(12px)',
                    cursor: 'default',
                    transition: 'box-shadow 0.4s ease',
                  }}
                >
                  <div style={{ color: '#ff3d6e', marginBottom: '0.3rem' }}>{item.icon} {item.title}</div>
                  <div style={{ color: '#555', lineHeight: 1.5 }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setViewState('solution')}
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6875rem',
                padding: '0.55rem 1.2rem',
                borderRadius: 6,
                border: '1px solid rgba(0,232,122,0.5)',
                background: 'rgba(0,232,122,0.08)',
                color: '#00e87a',
                cursor: 'pointer',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00e87a';
                e.currentTarget.style.color = '#060d08';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(0,232,122,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,232,122,0.08)';
                e.currentTarget.style.color = '#00e87a';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Assemble GymLane Solution →
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="solution-screen"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}
          >
            {/* Left: Layer Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { key: 'ui' as const, label: 'LAYER 01 // INTERACTIVE DASHBOARD', tech: 'React 19', title: 'Client Dashboard View' },
                { key: 'jwt' as const, label: 'LAYER 02 // SECURITY JWT CHECK', tech: 'Supabase Auth', title: 'Middleware Validation' },
                { key: 'postgres' as const, label: 'LAYER 03 // DATA ISOLATION', tech: 'PostgreSQL', title: 'Row Level Security (RLS)' },
              ].map((layer) => (
                <motion.div
                  key={layer.key}
                  onClick={() => setActiveLayer(layer.key)}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: 10,
                    border: activeLayer === layer.key ? '1px solid #00e87a' : '1px solid rgba(255,255,255,0.07)',
                    background: activeLayer === layer.key ? 'rgba(0,232,122,0.06)' : 'rgba(15,15,15,0.65)',
                    padding: '1rem 1.25rem',
                    backdropFilter: 'blur(16px)',
                    boxShadow: activeLayer === layer.key ? '0 0 20px rgba(0,232,122,0.12), inset 0 0 30px rgba(0,232,122,0.03)' : 'none',
                    transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#00e87a', letterSpacing: '0.1em' }}>{layer.label}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', color: '#444' }}>{layer.tech}</span>
                  </div>
                  <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.875rem', color: '#fff', fontWeight: 700 }}>{layer.title}</h4>
                </motion.div>
              ))}

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
                  transition: 'color 0.3s ease',
                  marginTop: '0.5rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#888')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
              >
                ← View Problem Statement
              </button>
            </div>

            {/* Right: Sandbox Screen */}
            <div
              style={{
                background: 'rgba(10, 16, 11, 0.8)',
                borderRadius: 14,
                border: '1px solid rgba(0,232,122,0.14)',
                padding: '1.5rem',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <AnimatePresence mode="wait">
                {activeLayer === 'ui' && (
                  <motion.div key="ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.6rem' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#888' }}>Live Dashboard Preview</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: '#00e87a', boxShadow: '0 0 6px #00e87a', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#00e87a' }}>MRR: ₹{totalMRR.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.5625rem',
                          padding: '0.3rem 0.7rem',
                          borderRadius: 5,
                          border: '1px solid rgba(0,232,122,0.4)',
                          background: 'rgba(0,232,122,0.07)',
                          color: '#00e87a',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#00e87a';
                          e.currentTarget.style.color = '#060d08';
                          e.currentTarget.style.boxShadow = '0 0 16px rgba(0,232,122,0.35)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0,232,122,0.07)';
                          e.currentTarget.style.color = '#00e87a';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        + Enroll Member
                      </button>
                      <button
                        onClick={simulateScan}
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.5625rem',
                          padding: '0.3rem 0.7rem',
                          borderRadius: 5,
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'transparent',
                          color: '#666',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                          e.currentTarget.style.color = '#f0ede6';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.color = '#666';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        Simulate QR Check-in
                      </button>
                    </div>

                    <AnimatePresence>
                      {showForm && (
                        <motion.form
                          onSubmit={addMember}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ display: 'flex', gap: '0.4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: 7, overflow: 'hidden' }}
                        >
                          <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Name"
                            style={{
                              flex: 1,
                              background: 'rgba(10,10,10,0.6)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              padding: '0.25rem 0.5rem',
                              borderRadius: 4,
                              color: '#fff',
                              fontSize: '0.625rem',
                              fontFamily: 'JetBrains Mono, monospace',
                              outline: 'none',
                              transition: 'border-color 0.3s ease',
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(0,232,122,0.5)';
                              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,232,122,0.12)';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          />
                          <select
                            value={form.plan}
                            onChange={(e) => setForm({ ...form, plan: e.target.value })}
                            style={{ background: '#0a100b', border: '1px solid rgba(255,255,255,0.08)', color: '#888', fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace', outline: 'none', borderRadius: 4, padding: '0.25rem 0.3rem' }}
                          >
                            {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                          </select>
                          <button
                            type="submit"
                            style={{ background: '#00e87a', color: '#060d08', border: 'none', padding: '0.25rem 0.6rem', borderRadius: 4, fontSize: '0.625rem', fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', fontWeight: 700, transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 12px rgba(0,232,122,0.4)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                          >
                            Enroll
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>

                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', fontSize: '0.5625rem', fontFamily: 'JetBrains Mono, monospace', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ color: '#444', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            {['ID', 'NAME', 'PLAN', 'STATUS'].map((h) => (
                              <th key={h} style={{ padding: '0.3rem 0.4rem', letterSpacing: '0.08em' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence>
                            {members.map((m) => (
                              <motion.tr
                                key={m.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 8 }}
                                transition={{ duration: 0.3 }}
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}
                              >
                                <td style={{ padding: '0.3rem 0.4rem', color: '#2a4a2e' }}>{m.id}</td>
                                <td style={{ padding: '0.3rem 0.4rem', color: '#f0ede6' }}>{m.name}</td>
                                <td style={{ padding: '0.3rem 0.4rem', color: '#555' }}>{m.plan}</td>
                                <td style={{ padding: '0.3rem 0.4rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    {/* Pulsing status dot */}
                                    <span
                                      style={{
                                        display: 'inline-block',
                                        width: 5,
                                        height: 5,
                                        borderRadius: '50%',
                                        background: DOT_COLOR[m.status],
                                        boxShadow: `0 0 6px ${DOT_COLOR[m.status]}`,
                                        animation: m.status === 'active' ? 'pulse-dot 2s ease-in-out infinite' : 'none',
                                        flexShrink: 0,
                                      }}
                                    />
                                    <span className={STATUS_CLASS[m.status]}>{m.status}</span>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activeLayer === 'jwt' && (
                  <motion.div key="jwt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', display: 'block' }}>JWT Token Decode</span>
                    <div
                      style={{
                        background: 'rgba(7, 12, 8, 0.9)',
                        border: '1px solid rgba(0,232,122,0.12)',
                        padding: '1rem',
                        borderRadius: 8,
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.625rem',
                        lineHeight: 1.7,
                        color: '#a0c0a0',
                        boxShadow: 'inset 0 0 20px rgba(0,232,122,0.03)',
                      }}
                    >
                      <div>{'{'}</div>
                      <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#555' }}>"iss"</span>: <span style={{ color: '#00e87a' }}>"supabase_auth"</span>,</div>
                      <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#555' }}>"role"</span>: <span style={{ color: '#00e87a' }}>"authenticated"</span>,</div>
                      <div style={{ paddingLeft: '1rem' }}><span style={{ color: '#555' }}>"gym_id"</span>: <span style={{ color: '#f59e0b' }}>"gym_81bf28ac"</span></div>
                      <div>{'}'}</div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#555', lineHeight: 1.65 }}>
                      JWT keys verify who is calling the endpoints. This isolates data parameters seamlessly.
                    </p>
                  </motion.div>
                )}

                {activeLayer === 'postgres' && (
                  <motion.div key="postgres" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', display: 'block' }}>Postgres RLS Policy SQL</span>
                    <div
                      style={{
                        background: 'rgba(5, 10, 6, 0.95)',
                        border: '1px solid rgba(0,232,122,0.12)',
                        padding: '1rem',
                        borderRadius: 8,
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.625rem',
                        lineHeight: 1.8,
                        color: '#00e87a',
                        boxShadow: 'inset 0 0 20px rgba(0,232,122,0.03)',
                      }}
                    >
                      <span style={{ color: '#ff3d6e' }}>CREATE POLICY</span> tenant_isolation<br />
                      <span style={{ color: '#ff3d6e' }}>ON</span> public.members<br />
                      <span style={{ color: '#ff3d6e' }}>FOR SELECT USING</span> (<br />
                      &nbsp;&nbsp;gym_id = auth.jwt() -&gt;&gt; <span style={{ color: '#f59e0b' }}>'gym_id'</span><br />
                      );
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#555', lineHeight: 1.65 }}>
                      Enforces multi-tenant separation right at the database layer. Gym owner A cannot read Gym owner B's records under any circumstance.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status bar */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#333' }}>
                <span>SQL PIPE TRANSACTIONS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#00e87a',
                      animation: 'pulse-dot 2s ease-in-out infinite',
                    }}
                  />
                  <span style={{ color: '#00e87a' }}>{pulseText}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

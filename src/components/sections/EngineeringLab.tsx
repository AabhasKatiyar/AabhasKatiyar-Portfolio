import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Sandbox 01: Postgres RLS Multi-Tenant Engine (GymLane Arch) ─── */
const RlsSimulator = () => {
  const [selectedTenant, setSelectedTenant] = useState<'iron' | 'fit'>('iron');

  const members = [
    { id: 'm-1', name: 'Marcus Vance', gym: 'iron', plan: 'Pro Elite', status: 'ACTIVE' },
    { id: 'm-2', name: 'Elena Rostova', gym: 'iron', plan: 'Strength 30', status: 'ACTIVE' },
    { id: 'm-3', name: 'Devon Hayes', gym: 'fit', plan: 'CrossFit Core', status: 'ACTIVE' },
    { id: 'm-4', name: 'Chloe Kim', gym: 'fit', plan: 'Monthly Pass', status: 'EXPIRED' },
  ];

  const visibleMembers = members.filter((m) => m.gym === selectedTenant);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Tenant Context Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#94a3b8', letterSpacing: '0.08em' }}>
          SESSION JWT AUTH CONTEXT:
        </span>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            onClick={() => setSelectedTenant('iron')}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '0.25rem 0.55rem',
              borderRadius: 4,
              border: `1px solid ${selectedTenant === 'iron' ? '#00e87a' : 'rgba(255,255,255,0.12)'}`,
              background: selectedTenant === 'iron' ? 'rgba(0,232,122,0.15)' : 'transparent',
              color: selectedTenant === 'iron' ? '#00e87a' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            IronGym
          </button>
          <button
            onClick={() => setSelectedTenant('fit')}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '0.25rem 0.55rem',
              borderRadius: 4,
              border: `1px solid ${selectedTenant === 'fit' ? '#00e87a' : 'rgba(255,255,255,0.12)'}`,
              background: selectedTenant === 'fit' ? 'rgba(0,232,122,0.15)' : 'transparent',
              color: selectedTenant === 'fit' ? '#00e87a' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            FitZone
          </button>
        </div>
      </div>

      {/* SQL Policy Snippet */}
      <div
        style={{
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(0,232,122,0.2)',
          borderRadius: 6,
          padding: '0.6rem 0.75rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.625rem',
          color: '#cbd5e1',
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: '#00e87a' }}>CREATE POLICY</span> tenant_isolation <span style={{ color: '#00e87a' }}>ON</span> members{'\n'}
        <span style={{ color: '#00e87a' }}>USING</span> (tenant_id = auth.jwt() -&gt;&gt; '{selectedTenant === 'iron' ? 'iron_gym_id' : 'fit_zone_id'}');
      </div>

      {/* Database Filtered Table Output */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#94a3b8', letterSpacing: '0.08em', padding: '0 0.25rem' }}>
          <span>ISOLATED POSTGRES RESULT ({visibleMembers.length} ROWS)</span>
          <span style={{ color: '#00e87a', fontWeight: 600 }}>0% CROSS-LEAKAGE</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
          {visibleMembers.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.45rem 0.65rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6875rem',
              }}
            >
              <div>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{m.name}</span>
                <span style={{ color: '#64748b', marginLeft: '0.5rem', fontSize: '0.5625rem' }}>{m.plan}</span>
              </div>
              <span style={{ color: m.status === 'ACTIVE' ? '#00e87a' : '#ff3d6e', fontSize: '0.5625rem', fontWeight: 700 }}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Sandbox 02: Optimistic Feed State Engine (Yappr Arch) ───────── */
const OptimisticStateDemo = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'resolved'>('idle');
  const [postCount, setPostCount] = useState(148);

  const runMutation = () => {
    if (pipelineState === 'running') return;
    setPipelineState('running');
    setPostCount((p) => p + 1);

    setTimeout(() => {
      setPipelineState('resolved');
      setTimeout(() => setPipelineState('idle'), 2200);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Metric Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#94a3b8', letterSpacing: '0.08em' }}>
          FEED MUTATION PIPELINE:
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#f59e0b', fontWeight: 600 }}>
          {postCount} POSTS SYNCED
        </span>
      </div>

      {/* Live State Machine Pipeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${pipelineState !== 'idle' ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 6,
            padding: '0.5rem 0.65rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.625rem',
          }}
        >
          <span style={{ color: '#cbd5e1' }}>1. Local State Prepend</span>
          <span style={{ color: pipelineState !== 'idle' ? '#00e87a' : '#64748b', fontWeight: 600 }}>
            {pipelineState !== 'idle' ? '0ms (INSTANT)' : 'IDLE'}
          </span>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${pipelineState === 'running' || pipelineState === 'resolved' ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 6,
            padding: '0.5rem 0.65rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.625rem',
          }}
        >
          <span style={{ color: '#cbd5e1' }}>2. Supabase WebSocket Broadcast</span>
          <span style={{ color: pipelineState === 'running' ? '#f59e0b' : pipelineState === 'resolved' ? '#00e87a' : '#64748b', fontWeight: 600 }}>
            {pipelineState === 'running' ? '32ms (PUB/SUB)' : pipelineState === 'resolved' ? 'DELIVERED' : 'IDLE'}
          </span>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${pipelineState === 'resolved' ? 'rgba(0,232,122,0.4)' : 'rgba(255,255,255,0.06)'}`,
            borderRadius: 6,
            padding: '0.5rem 0.65rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.625rem',
          }}
        >
          <span style={{ color: '#cbd5e1' }}>3. Postgres Write &amp; WAL ACK</span>
          <span style={{ color: pipelineState === 'resolved' ? '#00e87a' : '#64748b', fontWeight: 600 }}>
            {pipelineState === 'resolved' ? '48ms (PERSISTED)' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={runMutation}
        disabled={pipelineState === 'running'}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          padding: '0.55rem',
          borderRadius: 6,
          border: '1px solid rgba(245,158,11,0.3)',
          background: pipelineState === 'running' ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.18)',
          color: '#f59e0b',
          cursor: pipelineState === 'running' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {pipelineState === 'running' ? 'DISPATCHING LIVE MUTATION...' : '+ SIMULATE ZERO-LATENCY POST'}
      </button>
    </div>
  );
};

/* ─── Main Section 06 Layout ─────────────────────────────── */
export const EngineeringLab = () => {
  const [mistakeTab, setMistakeTab] = useState<'gym' | 'yappr'>('gym');

  return (
    <section
      id="archive"
      style={{
        background: 'transparent',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        minHeight: '100svh',
      }}
    >
      {/* Constrained Container — Ensures Title and Cards are 100% Horizontally Aligned */}
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c8ff00', display: 'block', marginBottom: '0.5rem' }}>
            06 — Engineering Lab
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.75rem)', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#ffffff', margin: 0 }}>
            Architectural prototypes &amp; retrospectives.
          </h2>
        </motion.div>

        {/* Grid of Real Architecture Deep Dives */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%' }}>
          
          {/* Real Card 1: Postgres Row Level Security */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            style={{
              background: 'rgba(5, 14, 8, 0.40)',
              border: '1px solid rgba(0,232,122,0.20)',
              borderRadius: 14,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backdropFilter: 'blur(12px) saturate(160%)',
              WebkitBackdropFilter: 'blur(12px) saturate(160%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,232,122,0.15), 0 24px 64px rgba(0,0,0,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
          >
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#00e87a', letterSpacing: '0.12em', fontWeight: 600 }}>
                ARCH 01 // MULTI-TENANT ISOLATION
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginTop: '0.25rem' }}>
                Postgres Row Level Security (RLS)
              </h3>
            </div>
            <RlsSimulator />
          </motion.div>

          {/* Real Card 2: Optimistic State Machine */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            style={{
              background: 'rgba(15, 12, 4, 0.40)',
              border: '1px solid rgba(245,158,11,0.20)',
              borderRadius: 14,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backdropFilter: 'blur(12px) saturate(160%)',
              WebkitBackdropFilter: 'blur(12px) saturate(160%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(245,158,11,0.15), 0 24px 64px rgba(0,0,0,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
          >
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#f59e0b', letterSpacing: '0.12em', fontWeight: 600 }}>
                ENGINE 02 // REAL-TIME OPTIMISTIC UI
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginTop: '0.25rem' }}>
                Zero-Latency State Machine
              </h3>
            </div>
            <OptimisticStateDemo />
          </motion.div>

          {/* Card 3: Retrospectives & Production Mistakes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            style={{
              background: 'rgba(11, 16, 26, 0.40)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 14,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              backdropFilter: 'blur(12px) saturate(160%)',
              WebkitBackdropFilter: 'blur(12px) saturate(160%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(200,255,0,0.15), 0 24px 64px rgba(0,0,0,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'; }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#cbd5e1', fontWeight: 600, letterSpacing: '0.12em' }}>
                  RETROSPECTIVE // FAILURES
                </span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button onClick={() => setMistakeTab('gym')} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', background: mistakeTab === 'gym' ? 'rgba(255,255,255,0.16)' : 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '0.2rem 0.5rem', borderRadius: 4, cursor: 'pointer' }}>GymLane</button>
                  <button onClick={() => setMistakeTab('yappr')} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', background: mistakeTab === 'yappr' ? 'rgba(255,255,255,0.16)' : 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '0.2rem 0.5rem', borderRadius: 4, cursor: 'pointer' }}>Yappr</button>
                </div>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginTop: '0.375rem', marginBottom: '0.5rem' }}>
                Mistakes I Made &amp; Solved
              </h3>
              
              <AnimatePresence mode="wait">
                {mistakeTab === 'gym' ? (
                  <motion.div key="gym" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    <div style={{ color: '#ff3d6e', marginBottom: '0.25rem', fontWeight: 600 }}>❌ Error: Client-side subscription checks</div>
                    <p style={{ margin: '0 0 0.5rem 0' }}>Initially verified active plan status solely in client-side widgets. Exposed gym revenue data to local DOM script manipulation.</p>
                    <div style={{ color: '#00e87a', marginTop: '0.5rem', marginBottom: '0.25rem', fontWeight: 600 }}>✓ Rebuilt: Strict Postgres RLS policy</div>
                    <p style={{ margin: 0 }}>Shifted security filters directly into Postgres using Supabase Auth JWT matches. Safe, tamper-proof isolation.</p>
                  </motion.div>
                ) : (
                  <motion.div key="yappr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.65 }}>
                    <div style={{ color: '#ff3d6e', marginBottom: '0.25rem', fontWeight: 600 }}>❌ Error: Heavy network refetches on mutation</div>
                    <p style={{ margin: '0 0 0.5rem 0' }}>Initially re-fetched the entire timeline feed on every new post mutation. Created massive network lag on mobile browsers.</p>
                    <div style={{ color: '#00e87a', marginTop: '0.5rem', marginBottom: '0.25rem', fontWeight: 600 }}>✓ Rebuilt: Local optimistic state array insertion</div>
                    <p style={{ margin: 0 }}>Prepended draft data to timeline state memory, executing DB mutations asynchronously in the background. Lag feels zero.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 4: AI Collaboration Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.01 }}
            style={{
              background: 'rgba(11, 16, 26, 0.40)',
              border: '1px solid rgba(200,255,0,0.20)',
              borderRadius: 14,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              backdropFilter: 'blur(12px) saturate(160%)',
              WebkitBackdropFilter: 'blur(12px) saturate(160%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
              transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(200,255,0,0.18), 0 24px 64px rgba(0,0,0,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'; }}
          >
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#c8ff00', letterSpacing: '0.12em', fontWeight: 600 }}>
                COLLEAGUE STATEMENT // AI COLLAB
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em', color: '#fff', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Honest AI Engineering
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                AI accelerated implementation speed, boilerplate setup, and component layout iterations. System architecture decisions, relational database schemas, Row Level Security policies, and optimistic state synchronization patterns were directed, designed, and verified by me.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

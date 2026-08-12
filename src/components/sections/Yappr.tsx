import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Yap {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  body: string;
  likes: number;
  liked: boolean;
}

const INITIAL_YAPS: Yap[] = [
  { id: 'y-1', author: 'Aabhas Katiyar', handle: '@aabhas', avatar: '⚡', body: 'Just enabled Row Level Security on the GymLane prod database. Every gym owner is now isolated at the Postgres layer — no filtering in application code.', likes: 24, liked: false },
  { id: 'y-2', author: 'Dev Corner', handle: '@buildinpublic', avatar: '🔧', body: 'Hot take: understanding how the browser renders the DOM before touching React will make you a 10x better frontend developer.', likes: 61, liked: true },
];

export const Yappr = () => {
  const [yaps, setYaps] = useState<Yap[]>(INITIAL_YAPS);
  const [draft, setDraft] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [packetStream, setPacketStream] = useState<string[]>([
    'WS_CONN: established',
    'WS_SUB: channel_yaps',
  ]);

  const phoneRef = useRef<HTMLDivElement>(null);
  const MAX_CHARS = 280;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handlePublishYap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const packetId = `TX_${Date.now().toString().slice(-6)}`;
    logPacket(`${packetId} -> TX_POST: "${draft.slice(0, 16)}..."`);
    const newYap: Yap = {
      id: `y-${Date.now()}`,
      author: 'You',
      handle: '@visitor',
      avatar: '👤',
      body: draft.trim(),
      likes: 0,
      liked: false,
    };
    setYaps([newYap, ...yaps]);
    setDraft('');
    setTimeout(() => {
      logPacket(`RX_ACK: packet ${packetId} committed to postgres`);
    }, 800);
  };

  const toggleLike = (id: string) => {
    setYaps((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newLiked = !p.liked;
          const newLikes = newLiked ? p.likes + 1 : p.likes - 1;
          logPacket(`TX_LIKE: post ${id} -> ${newLiked ? 'Liked' : 'Unliked'}`);
          return { ...p, liked: newLiked, likes: newLikes };
        }
        return p;
      })
    );
  };

  const logPacket = (msg: string) => {
    setPacketStream((prev) => [msg, ...prev].slice(0, 8));
  };

  const draftPct = (draft.length / MAX_CHARS) * 100;
  const draftColor = draftPct > 90 ? '#ff3d6e' : draftPct > 70 ? '#f59e0b' : '#00e87a';

  return (
    <section
      id="yappr"
      style={{
        minHeight: '100svh',
        background: '#0d0609',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          right: '-8%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,61,110,0.06), transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,109,255,0.04), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 800, marginBottom: '4rem' }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff3d6e', display: 'block', marginBottom: '0.75rem' }}>
          02 — Yappr: Real-time PubSub & WebSocket Pipeline
        </span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6' }}>
          Social streaming,{' '}
          <span style={{ color: '#ff3d6e', textShadow: '0 0 30px rgba(255,61,110,0.4)' }}>without latency</span>.
        </h2>
        <p style={{ marginTop: '1.25rem', color: '#888', fontSize: '0.9375rem', lineHeight: 1.75, maxWidth: '58ch' }}>
          Yappr delivers instant updates. Optimistic UI renders changes immediately in local memory before database mutations resolve, making interactions feel completely lag-free.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

        {/* Left: 3D Phone */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          ref={phoneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'flex', justifyContent: 'center', perspective: 1200 }}
        >
          <motion.div
            animate={{ rotateY: tilt.x, rotateX: tilt.y }}
            transition={{ type: 'spring', damping: 22, stiffness: 160 }}
            style={{
              width: 310,
              borderRadius: 36,
              border: '1px solid rgba(255,61,110,0.2)',
              background: '#0a0507',
              boxShadow: '0 32px 80px rgba(0,0,0,0.85), 0 0 60px rgba(255,61,110,0.07), inset 0 1px 0 rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Phone Top Bar */}
            <div style={{ background: '#12070a', padding: '0.8rem 1.25rem 0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#555' }}>9:41</span>
              <div style={{ width: 70, height: 8, borderRadius: 999, background: '#1a0810' }} />
              <div style={{ width: 10, height: 6, borderRadius: 1, border: '1px solid #555' }} />
            </div>

            {/* App Header */}
            <div style={{ background: '#0e0508', borderBottom: '1px solid rgba(255,61,110,0.1)', padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#ff3d6e', letterSpacing: '-0.02em', textShadow: '0 0 16px rgba(255,61,110,0.4)' }}>Yappr</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: '#ff3d6e', boxShadow: '0 0 6px #ff3d6e', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', color: '#ff3d6e' }}>WS LIVE</span>
              </div>
            </div>

            {/* Composer */}
            <form onSubmit={handlePublishYap} style={{ background: '#080305', borderBottom: '1px solid rgba(255,255,255,0.03)', padding: '0.75rem 1rem' }}>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, MAX_CHARS))}
                placeholder="What's on your mind?"
                rows={2}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', resize: 'none', outline: 'none', marginBottom: '0.375rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Character progress ring indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    <circle
                      cx="8" cy="8" r="6"
                      fill="none"
                      stroke={draftColor}
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 6}`}
                      strokeDashoffset={`${2 * Math.PI * 6 * (1 - draftPct / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 8 8)"
                      style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' }}
                    />
                  </svg>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.45rem', color: '#555' }}>{MAX_CHARS - draft.length}</span>
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  style={{
                    padding: '0.22rem 0.7rem',
                    borderRadius: 999,
                    border: 'none',
                    background: draft.trim() ? '#ff3d6e' : '#230a13',
                    color: draft.trim() ? '#fff' : '#441425',
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    cursor: draft.trim() ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    boxShadow: draft.trim() ? '0 0 12px rgba(255,61,110,0.35)' : 'none',
                  }}
                >
                  Yap
                </button>
              </div>
            </form>

            {/* Live feed */}
            <div style={{ maxHeight: 220, overflowY: 'auto' }}>
              <AnimatePresence>
                {yaps.map((yap) => (
                  <motion.div
                    key={yap.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.025)', display: 'flex', gap: '0.5rem' }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,61,110,0.12)', border: '1px solid rgba(255,61,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', flexShrink: 0 }}>
                      {yap.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.125rem' }}>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.6875rem', color: '#fff', fontWeight: 600 }}>{yap.author}</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.4rem', color: '#444' }}>{yap.handle}</span>
                      </div>
                      <p style={{ fontSize: '0.625rem', color: '#888', lineHeight: 1.5, wordBreak: 'break-word' }}>{yap.body}</p>
                      <button
                        onClick={() => toggleLike(yap.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.5rem',
                          color: yap.liked ? '#ff3d6e' : '#444',
                          marginTop: '0.3rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          transition: 'color 0.25s ease, transform 0.25s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      >
                        <span style={{ fontSize: '0.625rem' }}>{yap.liked ? '♥' : '♡'}</span>
                        <span>{yap.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: WebSocket Console */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(10, 5, 7, 0.85)',
            border: '1px solid rgba(255,61,110,0.14)',
            borderRadius: 16,
            padding: '1.5rem',
            minHeight: 340,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <div>
            {/* Console Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#555' }}>Real-time WebSocket Packet Feed</span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff3d6e' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e87a' }} />
              </div>
            </div>

            {/* Packet stream — slides in from bottom */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem' }}>
              <AnimatePresence>
                {packetStream.map((packet, idx) => (
                  <motion.div
                    key={`${packet}-${idx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: idx === 0 ? 1 : 0.5 - idx * 0.06, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      color: packet.includes('TX_') ? '#ff3d6e' : packet.includes('RX_') ? '#00e87a' : '#555',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.2rem 0.4rem',
                      borderRadius: 4,
                      background: idx === 0 ? (packet.includes('TX_') ? 'rgba(255,61,110,0.06)' : packet.includes('RX_') ? 'rgba(0,232,122,0.06)' : 'rgba(255,255,255,0.02)') : 'transparent',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <span style={{ opacity: 0.4 }}>&gt;</span>
                    <span>{packet}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '1.5rem' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: '#ff3d6e', marginBottom: '0.4rem', textShadow: '0 0 12px rgba(255,61,110,0.3)' }}>Optimistic State Rendering</div>
            <p style={{ fontSize: '0.75rem', color: '#555', lineHeight: 1.65 }}>
              Likes and post updates render locally immediately, bypassing database network trip delays to maintain a responsive interface.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  body: string;
  likes: number;
  liked: boolean;
  replies: number;
}

const SEED_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Aabhas Katiyar',
    handle: '@aabhas',
    avatar: '⚡',
    time: '2h',
    body: 'Just enabled Row Level Security on the GymLane prod database. Every gym owner is now completely isolated at the Postgres layer — no filtering needed in application code.',
    likes: 24,
    liked: false,
    replies: 3,
  },
  {
    id: 'p2',
    author: 'Dev Corner',
    handle: '@buildinpublic',
    avatar: '🔧',
    time: '5h',
    body: 'Hot take: understanding how the browser renders the DOM before touching React will make you a 10x better frontend developer. Don\'t skip the foundations.',
    likes: 61,
    liked: true,
    replies: 18,
  },
  {
    id: 'p3',
    author: 'Startup Loop',
    handle: '@startuploop',
    avatar: '🚀',
    time: '8h',
    body: 'Shipping > planning. A live product with rough edges teaches you more than a perfect design that never goes out.',
    likes: 112,
    liked: false,
    replies: 27,
  },
];

export const Yappr = () => {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [draft, setDraft] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value.slice(0, MAX_CHARS);
    setDraft(val);
    setCharCount(val.length);
  };

  const handleYap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: 'You',
      handle: '@visitor',
      avatar: '👤',
      time: 'now',
      body: draft,
      likes: 1,
      liked: true,
      replies: 0,
    };
    setPosts([newPost, ...posts]);
    setDraft('');
    setCharCount(0);
  };

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
    <section
      id="yappr"
      style={{
        minHeight: '100svh',
        background: '#0d0609',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      {/* Rose ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,61,110,0.05), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        {/* Left: context */}
        <div style={{ flex: '1 1 280px' }}>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ff3d6e' }}
          >
            02 — Yappr 3D Experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#f0ede6', marginTop: '0.75rem' }}
          >
            A social platform{' '}
            <span style={{ color: '#ff3d6e' }}>for real-time community.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p style={{ maxWidth: '38ch', color: '#666', fontSize: '0.9375rem', lineHeight: 1.75 }}>
              Yappr is built for high-velocity community interaction — instant
              post publishing, real-time WebSocket feed updates, optimistic UI
              like toggles, and threaded discussion replies.
            </p>

            {[
              { title: 'Real-time layer', body: 'Supabase WebSocket subscriptions push new posts to all connected clients without polling.' },
              { title: 'Optimistic UI', body: 'Like toggles update the local state immediately — the Postgres mutation happens asynchronously, making interactions feel instant.' },
            ].map((note) => (
              <div key={note.title}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8125rem', color: '#ff3d6e', marginBottom: '0.375rem' }}>{note.title}</div>
                <p style={{ fontSize: '0.8125rem', color: '#555', lineHeight: 1.65 }}>{note.body}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Phone shell with 3D Tilt perspective */}
        <motion.div
          ref={phoneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ flex: '0 0 320px', perspective: 1000 }}
        >
          <motion.div
            animate={{ rotateY: tilt.x, rotateX: tilt.y }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            style={{
              width: 320,
              borderRadius: 40,
              border: '1px solid rgba(255,61,110,0.2)',
              background: '#0f0609',
              boxShadow: '0 0 0 6px rgba(255,255,255,0.03), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(255,61,110,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Phone Top Notch */}
            <div style={{ background: '#130a0b', padding: '0.875rem 1.25rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.625rem', color: '#444' }}>9:41</span>
              <div style={{ width: 80, height: 10, borderRadius: 999, background: '#1a0d0f' }} />
              <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                {[6, 4, 2].map((h) => (
                  <div key={h} style={{ width: 2.5, height: h, borderRadius: 1, background: '#444' }} />
                ))}
                <div style={{ width: 12, height: 6, borderRadius: 1.5, border: '1px solid #444', marginLeft: 3, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: '#ff3d6e' }} />
                </div>
              </div>
            </div>

            {/* App header */}
            <div style={{ background: '#100810', borderBottom: '1px solid rgba(255,61,110,0.1)', padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.125rem', color: '#ff3d6e', letterSpacing: '-0.02em' }}>Yappr</span>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: '#ff3d6e' }} />
              </div>
            </div>

            {/* Composer */}
            <form onSubmit={handleYap} style={{ background: '#0e090f', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '0.75rem 1rem' }}>
              <textarea
                value={draft}
                onChange={handleDraftChange}
                placeholder="What are you building today?"
                rows={2}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#f0ede6', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', lineHeight: 1.55, resize: 'none', outline: 'none', marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: charCount > MAX_CHARS * 0.85 ? '#ff3d6e' : '#444' }}>
                  {charCount}/{MAX_CHARS}
                </span>
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  style={{ padding: '0.25rem 0.75rem', borderRadius: 999, border: 'none', background: draft.trim() ? '#ff3d6e' : '#2a1520', color: draft.trim() ? '#fff' : '#3a2030', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.6875rem', cursor: draft.trim() ? 'pointer' : 'default', transition: 'background 0.2s, color 0.2s' }}
                >
                  Yap
                </button>
              </div>
            </form>

            {/* Feed */}
            <div style={{ maxHeight: 340, overflowY: 'auto', background: '#0c0810' }}>
              <AnimatePresence initial={false}>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                    style={{ padding: '0.875rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div style={{ display: 'flex', gap: '0.625rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,61,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                        {post.avatar}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#f0ede6' }}>{post.author}</span>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#444' }}>{post.time}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.55, marginBottom: '0.5rem' }}>{post.body}</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <button
                            onClick={() => toggleLike(post.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: post.liked ? '#ff3d6e' : '#444', transition: 'color 0.15s' }}
                          >
                            <motion.span
                              animate={{ scale: post.liked ? [1, 1.5, 1] : 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {post.liked ? '♥' : '♡'}
                            </motion.span>
                            {post.likes}
                          </button>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5625rem', color: '#444' }}>
                            ↩ {post.replies}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

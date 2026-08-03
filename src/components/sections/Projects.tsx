import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  QrCode, 
  Layers, 
  UserCheck, 
  MessageSquare, 
  Heart, 
  Sparkles
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
});

// Mock Data for GymLane Interactive Sandbox
interface GymMember {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'expiring' | 'expired';
  daysLeft: number;
  lastCheckin: string;
}

const INITIAL_MEMBERS: GymMember[] = [
  { id: 'MEM-101', name: 'Vikram Sharma', plan: 'Quarterly VIP', status: 'active', daysLeft: 42, lastCheckin: 'Today, 08:30 AM' },
  { id: 'MEM-102', name: 'Ananya Verma', plan: 'Monthly Standard', status: 'expiring', daysLeft: 2, lastCheckin: 'Yesterday' },
  { id: 'MEM-103', name: 'Rahul Gupta', plan: 'Annual Gold', status: 'active', daysLeft: 210, lastCheckin: 'Today, 07:15 AM' },
  { id: 'MEM-104', name: 'Priya Singh', plan: 'Monthly Standard', status: 'expired', daysLeft: 0, lastCheckin: '4 days ago' },
];

// Mock Data for Yappr Interactive Feed
interface YapprPost {
  id: string;
  author: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
}

const INITIAL_POSTS: YapprPost[] = [
  {
    id: 'post-1',
    author: 'Aabhas Katiyar',
    username: '@aabhas',
    avatar: '⚡',
    time: '2h ago',
    content: 'Just deployed the new Row Level Security rules on Supabase for GymLane! Zero leakage across multi-tenant gym accounts. Data isolation done right.',
    likes: 24,
    replies: 5,
    isLiked: false
  },
  {
    id: 'post-2',
    author: 'Dev Community',
    username: '@buildinpublic',
    avatar: '🚀',
    time: '5h ago',
    content: 'What backend stack do you prefer for real-time web applications in 2026? PostgreSQL + Supabase Realtime seems to hit the sweet spot.',
    likes: 42,
    replies: 12,
    isLiked: true
  }
];

export const Projects = () => {
  // GymLane Interactive Sandbox State
  const [gymMembers, setGymMembers] = useState<GymMember[]>(INITIAL_MEMBERS);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Yappr Interactive Sandbox State
  const [posts, setPosts] = useState<YapprPost[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');

  // Handle GymLane Simulated QR Scan
  const handleSimulatedScan = () => {
    const randomMember = gymMembers[Math.floor(Math.random() * gymMembers.length)];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setGymMembers(prev => prev.map(m => {
      if (m.id === randomMember.id) {
        return { ...m, lastCheckin: `Just now (${timeNow})` };
      }
      return m;
    }));

    setScanMessage(`Scanned ${randomMember.name} (${randomMember.id}) — Access ${randomMember.status === 'expired' ? 'DENIED (Membership Expired)' : 'GRANTED'}`);
    setTimeout(() => setScanMessage(null), 4000);
  };

  // Handle Yappr Post Creation
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newEntry: YapprPost = {
      id: `post-${Date.now()}`,
      author: 'You (Visitor)',
      username: '@guest',
      avatar: '👤',
      time: 'Just now',
      content: newPostText,
      likes: 1,
      replies: 0,
      isLiked: true
    };

    setPosts([newEntry, ...posts]);
    setNewPostText('');
  };

  // Handle Yappr Like Toggle
  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  return (
    <section id="projects" className="section-padding section-divider">
      <div className="container-lg">
        
        {/* Section Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <span className="section-eyebrow mb-3">Featured Case Studies</span>
          <h2 className="heading-lg text-white max-w-xl">
            Real products built for real users.
          </h2>
          <p className="body-lg mt-4 max-w-2xl">
            These are not tutorial clones or UI mockups. GymLane and Yappr are full-stack applications engineered to solve specific operational and community problems.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* FEATURED PROJECT #1: GYMLANE */}
        {/* ========================================================================= */}
        <div className="mb-28 space-y-12">
          {/* Main Hero Header for GymLane */}
          <motion.div 
            {...fadeUp(0.1)}
            className="p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[var(--color-blue)]" />
                <span className="label-mono text-[var(--color-blue)]">Hero SaaS Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pill border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                  ● Live Product
                </span>
                <span className="pill">SaaS Management</span>
              </div>
            </div>

            <h3 className="heading-xl text-white mb-4">GymLane</h3>
            <p className="body-lg max-w-3xl mb-8">
              A comprehensive SaaS management platform for gym owners to track member lifecycles, automate membership renewal notifications, streamline daily QR check-ins, and inspect operational revenue insights.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[var(--color-border)]">
              <div>
                <span className="label-mono block mb-1">Target Users</span>
                <span className="text-white font-medium text-sm">Gym Owners & Staff</span>
              </div>
              <div>
                <span className="label-mono block mb-1">Core Tech</span>
                <span className="text-white font-medium text-sm">React + Supabase RLS</span>
              </div>
              <div>
                <span className="label-mono block mb-1">Database</span>
                <span className="text-white font-medium text-sm">PostgreSQL (Relational)</span>
              </div>
              <div>
                <span className="label-mono block mb-1">Key Feature</span>
                <span className="text-white font-medium text-sm">QR Check-in & Expiry Engine</span>
              </div>
            </div>
          </motion.div>

          {/* Detailed Problem & Idea Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeUp(0.15)} className="card space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-amber)] font-mono text-xs uppercase tracking-wider">
                <Clock size={16} />
                <span>The Problem</span>
              </div>
              <h4 className="heading-md text-white">Manual Gym Operations Cause Revenue Leakage</h4>
              <p className="body-sm">
                Local fitness centers traditionally rely on paper registers or scattered spreadsheets. Members often continue using gym facilities weeks after their plans expire simply because staff miss manual check dates.
              </p>
              <ul className="space-y-2 body-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Unchecked member entries lead to unpaid equipment usage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Manual WhatsApp or phone call expiry reminders are tedious and easily forgotten.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>No consolidated business analytics to track monthly churn or growth.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="card space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-blue)] font-mono text-xs uppercase tracking-wider">
                <Sparkles size={16} />
                <span>The Solution & Idea</span>
              </div>
              <h4 className="heading-md text-white">Automated Member Lifecycles & QR Verification</h4>
              <p className="body-sm">
                GymLane introduces an intuitive dashboard where gym admins manage memberships with automatic date calculations, instant member status indicators, and self-serve QR check-in gates.
              </p>
              <ul className="space-y-2 body-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <span>Real-time status flags (Active, Expiring in 3 Days, Expired).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <span>QR code registration for sub-second check-in verification at the front desk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <span>Role-based access powered by PostgreSQL Row Level Security (RLS).</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Interactive GymLane Dashboard Simulation */}
          <motion.div {...fadeUp(0.25)} className="card p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
              <div>
                <span className="label-mono text-[var(--color-blue)]">Interactive Sandbox</span>
                <h4 className="font-display font-bold text-white text-lg mt-0.5">GymLane Live Management Dashboard</h4>
              </div>
              <button 
                onClick={handleSimulatedScan}
                className="btn-primary text-xs py-2 px-3"
              >
                <QrCode size={14} />
                Simulate Desk QR Scan
              </button>
            </div>

            {/* Scan Notification Banner */}
            <AnimatePresence>
              {scanMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-lg font-mono text-xs border flex items-center gap-2 ${
                    scanMessage.includes('DENIED') 
                      ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}
                >
                  <UserCheck size={16} />
                  <span>{scanMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-slate-500 font-mono text-[10px] uppercase">
                    <th className="pb-3 font-medium">Member ID</th>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Membership Plan</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Days Left</th>
                    <th className="pb-3 font-medium">Last Desk Check-in</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {gymMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-3 font-mono text-slate-400">{member.id}</td>
                      <td className="py-3 font-medium text-white">{member.name}</td>
                      <td className="py-3 text-slate-300">{member.plan}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider ${
                          member.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : member.status === 'expiring' 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-300">
                        {member.daysLeft > 0 ? `${member.daysLeft} days` : '0 days (Expired)'}
                      </td>
                      <td className="py-3 font-mono text-slate-400">{member.lastCheckin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] font-mono text-slate-500 border-t border-[var(--color-border)] pt-4">
              💡 Click "Simulate Desk QR Scan" to trigger the check-in queue logic. In production, this updates PostgreSQL in real-time via Supabase webhooks.
            </p>
          </motion.div>

          {/* GymLane Architecture Diagram */}
          <motion.div {...fadeUp(0.3)} className="card p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[var(--color-blue)]" />
              <h4 className="heading-md text-white">System Architecture & Data Flow</h4>
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-[var(--color-border)] font-mono text-xs space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
                <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                  <span className="text-[10px] text-slate-500 block">CLIENT</span>
                  <span className="font-bold text-white block">React + Vite</span>
                  <span className="text-[9px] text-slate-400 block">Tailwind CSS UI</span>
                </div>

                <div className="flex items-center justify-center text-slate-600 font-bold">➔</div>

                <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-500/30 space-y-1">
                  <span className="text-[10px] text-blue-400 block">AUTH & GATEWAY</span>
                  <span className="font-bold text-white block">Supabase Auth</span>
                  <span className="text-[9px] text-slate-400 block">JWT + Session Tokens</span>
                </div>

                <div className="flex items-center justify-center text-slate-600 font-bold">➔</div>

                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] text-emerald-400 block">DATABASE LAYER</span>
                  <span className="font-bold text-white block">PostgreSQL</span>
                  <span className="text-[9px] text-slate-400 block">Row Level Security (RLS)</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/2 border border-[var(--color-border)] space-y-2 text-slate-300 font-sans text-xs">
                <p className="font-mono font-bold text-white text-xs">Why this stack?</p>
                <p>
                  <strong>Why PostgreSQL + Supabase:</strong> Instead of building a complex custom backend server from scratch, Supabase allows defining data relationships directly in PostgreSQL while providing built-in Row Level Security policies. This guarantees that one gym owner can never query or mutate another gym's member dataset.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* FEATURED PROJECT #2: YAPPR */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          {/* Main Hero Header for Yappr */}
          <motion.div 
            {...fadeUp(0.1)}
            className="p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[var(--color-amber)]" />
                <span className="label-mono text-[var(--color-amber)]">Social Platform Startup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="pill border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                  ● Live Application
                </span>
                <span className="pill">Real-time Community</span>
              </div>
            </div>

            <h3 className="heading-xl text-white mb-4">Yappr</h3>
            <p className="body-lg max-w-3xl mb-8">
              A modern, high-velocity social web app engineered for instant post dispatches, threaded discussion replies, real-time activity streams, and dynamic user profile management.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[var(--color-border)]">
              <div>
                <span className="label-mono block mb-1">Platform Focus</span>
                <span className="text-white font-medium text-sm">Community Discussions</span>
              </div>
              <div>
                <span className="label-mono block mb-1">Frontend Engine</span>
                <span className="text-white font-medium text-sm">React + Framer Motion</span>
              </div>
              <div>
                <span className="label-mono block mb-1">Real-time Layer</span>
                <span className="text-white font-medium text-sm">Supabase WebSockets</span>
              </div>
              <div>
                <span className="label-mono block mb-1">Database</span>
                <span className="text-white font-medium text-sm">PostgreSQL + Realtime PubSub</span>
              </div>
            </div>
          </motion.div>

          {/* Problem & Idea Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeUp(0.15)} className="card space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-amber)] font-mono text-xs uppercase tracking-wider">
                <Clock size={16} />
                <span>The Problem</span>
              </div>
              <h4 className="heading-md text-white">Laggy Social Feeds & Over-Engineered UI</h4>
              <p className="body-sm">
                Many modern social networks have become bloated with slow rendering cycles, intrusive ads, and high latency when loading post updates or reply threads.
              </p>
              <ul className="space-y-2 body-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Full page refreshes required to see new comments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Heavy JavaScript bundles slowing down mobile web browsers.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="card space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-blue)] font-mono text-xs uppercase tracking-wider">
                <Sparkles size={16} />
                <span>The Solution & Idea</span>
              </div>
              <h4 className="heading-md text-white">Instant Post Streaming & Minimalist UI</h4>
              <p className="body-sm">
                Yappr focuses on clean typography, instant feedback micro-interactions, and real-time updates via Supabase WebSocket listeners.
              </p>
              <ul className="space-y-2 body-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <span>Real-time post insertions without pulling down to refresh.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                  <span>Optimistic UI updates for likes and replies for zero perceived lag.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Interactive Yappr Social Feed Sandbox */}
          <motion.div {...fadeUp(0.25)} className="card p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
              <div>
                <span className="label-mono text-[var(--color-amber)]">Interactive Sandbox</span>
                <h4 className="font-display font-bold text-white text-lg mt-0.5">Yappr Live Community Feed</h4>
              </div>
              <span className="pill text-amber-400 border-amber-500/20 bg-amber-500/10">
                ● Real-time Local State
              </span>
            </div>

            {/* Post Composer Form */}
            <form onSubmit={handleAddPost} className="flex gap-3">
              <input 
                type="text" 
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="What are you building today? Write a post..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-black/30 text-white text-xs font-sans focus:outline-none focus:border-[var(--color-amber)] transition-colors"
              />
              <button type="submit" className="btn-primary text-xs py-2.5 px-4 bg-[var(--color-amber)] hover:opacity-90">
                Post to Yappr
              </button>
            </form>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-4 rounded-xl border border-[var(--color-border)] bg-black/20 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">{post.avatar}</span>
                      <div>
                        <span className="font-bold text-white block leading-tight">{post.author}</span>
                        <span className="text-[10px] font-mono text-slate-500">{post.username}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{post.time}</span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans">{post.content}</p>

                  <div className="flex items-center gap-4 text-xs font-mono pt-2 border-t border-[var(--color-border)]">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${post.isLiked ? 'text-red-400' : 'text-slate-500 hover:text-white'}`}
                    >
                      <Heart size={14} className={post.isLiked ? 'fill-red-400' : ''} />
                      <span>{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MessageSquare size={14} />
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Yappr Architecture */}
          <motion.div {...fadeUp(0.3)} className="card p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[var(--color-amber)]" />
              <h4 className="heading-md text-white">Yappr Realtime Architecture</h4>
            </div>

            <div className="p-6 rounded-xl bg-black/40 border border-[var(--color-border)] font-mono text-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-center">
                <span className="p-3 rounded bg-white/5 border border-white/10 text-white flex-1 min-w-[120px]">React App</span>
                <span className="text-slate-600">➔</span>
                <span className="p-3 rounded bg-amber-950/30 border border-amber-500/30 text-amber-400 flex-1 min-w-[140px]">WebSocket Stream</span>
                <span className="text-slate-600">➔</span>
                <span className="p-3 rounded bg-blue-950/30 border border-blue-500/30 text-blue-400 flex-1 min-w-[140px]">Postgres PubSub</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-relaxed pt-2">
                <strong>Engineering Decision:</strong> By combining Supabase Realtime WebSocket subscriptions with optimistic UI updates in React, Yappr delivers instantaneous response times when users publish posts or interact with threads.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

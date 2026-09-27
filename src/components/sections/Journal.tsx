import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Calendar, FileText, X, ArrowRight } from 'lucide-react';

interface JournalPost {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tag: string;
}

export const Journal: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);

  const posts: JournalPost[] = [
    {
      title: "Mastering Vanilla JavaScript",
      date: "Oct 12, 2025",
      excerpt: "Deep dive into browser internals and the JavaScript event loop...",
      content: "Dedicated time to master vanilla JavaScript fundamentals: DOM manipulation, asynchronous promises, event loops, closures, and custom event dispatching before jumping into framework abstractions.",
      tag: "JavaScript"
    },
    {
      title: "Deep Dive into Postgres RLS",
      date: "Sept 28, 2025",
      excerpt: "Moving security filters from frontend code into Postgres policies...",
      content: "Configured Postgres Row Level Security (RLS) policies on the GymLane database. Instead of verifying membership status in frontend widgets, shifted authorization directly into Postgres using Supabase Auth JWT matches. Safe, tamper-proof multi-tenant isolation.",
      tag: "Database & Security"
    },
    {
      title: "Portfolio Architecture Design",
      date: "Aug 15, 2025",
      excerpt: "Building layouts from scratch to understand grid alignments...",
      content: "Drafted grid math layouts without any external UI libraries. Reconstructed absolute structures, relative floats, and responsive flexboxes to deeply master HTML5/CSS3 alignment paradigms before switching to React ecosystems.",
      tag: "CSS Grid"
    }
  ];

  // Repeat items for seamless marquee loop
  const marqueePosts = [...posts, ...posts, ...posts];

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto border-t border-white/5 overflow-hidden" id="journal">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-16">
        <span className="font-mono text-xs text-brand-cobalt tracking-wider">// 05.</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-display">
          Engineering Journals
        </h2>
      </div>

      {/* Infinite Marquee Track Wrapper */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left/Right Fading Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 whitespace-nowrap py-4 cursor-pointer"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear"
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {marqueePosts.map((post, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedPost(post)}
              className="inline-block w-80 shrink-0"
            >
              <SpotlightCard 
                glowColor={index % 2 === 0 ? 'cobalt' : 'amber'}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="space-y-4 font-sans select-none">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-brand-cobalt" />
                      {post.date}
                    </span>
                    <span className="text-brand-gold bg-brand-gold/5 px-2 py-0.25 rounded border border-brand-gold/10 uppercase tracking-widest text-[9px]">
                      {post.tag}
                    </span>
                  </div>

                  <h4 className="text-sm font-display font-bold text-white whitespace-normal tracking-wide">
                    {post.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 font-light leading-relaxed whitespace-normal line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-brand-cobalt hover:text-white transition-colors duration-200 pt-2 border-t border-white/5 w-fit">
                    <span>EXPLORE_LOG</span>
                    <ArrowRight size={10} />
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal Detail overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-full max-w-xl border border-white/10 rounded-2xl bg-slate-950/90 p-6 md:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-full bg-white/5 border border-white/5 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                <div className="flex gap-3 items-center text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-brand-cobalt" />
                    {selectedPost.date}
                  </span>
                  <span>|</span>
                  <span className="text-brand-gold bg-brand-gold/5 px-2 py-0.5 rounded border border-brand-gold/10 uppercase tracking-widest text-[9px]">
                    {selectedPost.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">
                  {selectedPost.title}
                </h3>

                <div className="p-4 rounded-xl border border-white/5 bg-white/2 font-mono text-[10px] text-slate-500 flex gap-2 items-center">
                  <FileText size={14} className="text-brand-cobalt" />
                  <span>TRANSMISSION_PAYLOAD_READY</span>
                </div>

                <p className="text-sm md:text-base text-slate-300 font-sans font-light leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

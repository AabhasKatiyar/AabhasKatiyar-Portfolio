import { motion } from 'framer-motion';
import { Rocket, Sparkles, BookOpen } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
});

const GYMLANE_ROADMAP = [
  { feature: "WhatsApp Expiry Automation", desc: "Automated direct WhatsApp API reminders when a membership has 3 days remaining.", status: "In Progress" },
  { feature: "AI Attendance Insights", desc: "Predictive peak hour analytics helping gym owners optimize staff shifts.", status: "Planned" },
  { feature: "Multi-branch Business Analytics", desc: "Consolidated dashboard metrics for gym owners operating multiple locations.", status: "Planned" }
];

const YAPPR_ROADMAP = [
  { feature: "Direct Messaging Threads", desc: "Encrypted 1-on-1 private messaging channels between community members.", status: "In Progress" },
  { feature: "Push Notifications Engine", desc: "Real-time browser notifications for replies, mentions, and post likes.", status: "Planned" },
  { feature: "AI Content Summarization", desc: "Smart thread summaries for fast catch-up on long community discussions.", status: "Planned" }
];

const LEARNING_ROADMAP = [
  { topic: "Next.js (App Router)", area: "SSR, Server Actions, & Edge Functions", status: "Active Learning" },
  { topic: "System Design", area: "Caching layers, Rate limiting, Load balancing", status: "Active Learning" },
  { topic: "AI Integration", area: "LLM APIs, OpenAI/Claude SDKs, Vector Embeddings", status: "Exploring" },
  { topic: "Mobile Development", area: "Kotlin & React Native for cross-platform apps", status: "Upcoming" }
];

export const Roadmap = () => {
  return (
    <section id="roadmap" className="section-padding section-divider">
      <div className="container-lg">
        
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="section-eyebrow mb-3">Active Momentum</span>
          <h2 className="heading-lg text-white max-w-xl">
            Currently Building & Learning
          </h2>
          <p className="body-lg mt-4 max-w-2xl">
            Building software requires continuous momentum. Here is what is actively being added to my SaaS platforms and what I am studying next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GymLane Feature Roadmap */}
          <motion.div {...fadeUp(0.1)} className="card space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Rocket size={18} className="text-[var(--color-blue)]" />
              <h3 className="font-display font-semibold text-white text-base">GymLane Roadmap</h3>
            </div>

            <div className="space-y-3">
              {GYMLANE_ROADMAP.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/20 border border-[var(--color-border)] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-sans">{item.feature}</span>
                    <span className="pill text-[9px] font-mono text-blue-400 border-blue-500/20 bg-blue-500/10">{item.status}</span>
                  </div>
                  <p className="body-sm text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Yappr Feature Roadmap */}
          <motion.div {...fadeUp(0.2)} className="card space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Sparkles size={18} className="text-[var(--color-amber)]" />
              <h3 className="font-display font-semibold text-white text-base">Yappr Roadmap</h3>
            </div>

            <div className="space-y-3">
              {YAPPR_ROADMAP.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/20 border border-[var(--color-border)] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-sans">{item.feature}</span>
                    <span className="pill text-[9px] font-mono text-amber-400 border-amber-500/20 bg-amber-500/10">{item.status}</span>
                  </div>
                  <p className="body-sm text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Learning Roadmap */}
          <motion.div {...fadeUp(0.3)} className="card space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <BookOpen size={18} className="text-emerald-400" />
              <h3 className="font-display font-semibold text-white text-base">Study & Skill Tracks</h3>
            </div>

            <div className="space-y-3">
              {LEARNING_ROADMAP.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/20 border border-[var(--color-border)] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white font-sans">{item.topic}</span>
                    <span className="pill text-[9px] font-mono text-emerald-400 border-emerald-500/20 bg-emerald-500/10">{item.status}</span>
                  </div>
                  <p className="body-sm text-xs text-slate-400 leading-normal">{item.area}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

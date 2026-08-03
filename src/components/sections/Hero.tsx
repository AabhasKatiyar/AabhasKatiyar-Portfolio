import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const ROLES = [
  'Full Stack Developer',
  'SaaS Founder',
  'Product Engineer',
  'Startup Builder',
];

const STATS = [
  { value: '2', label: 'SaaS platforms launched' },
  { value: '4+', label: 'Real projects shipped' },
  { value: '3rd yr', label: 'B.Tech IT, KIET' },
  { value: '∞', label: 'Problems left to solve' },
];

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 bg-grid-subtle overflow-hidden"
    >
      {/* Ambient light — one, subtle, centered */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,123,252,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-md relative z-10">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span className="section-eyebrow">Aabhas Katiyar</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.1)} className="heading-xl mb-6 max-w-3xl">
          Building products from{' '}
          <span className="text-white">idea to deployment.</span>
        </motion.h1>

        {/* Description — specific, honest */}
        <motion.p {...fadeUp(0.2)} className="body-lg max-w-xl mb-8">
          B.Tech Information Technology student at KIET Group of Institutions.
          I build real SaaS platforms — GymLane and Yappr are live.
          My stack spans React, TypeScript, Supabase, and PostgreSQL. I care
          about how systems work, not just how they look.
        </motion.p>

        {/* Roles — inline, clean */}
        <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-2 mb-10">
          {ROLES.map((role) => (
            <span key={role} className="pill">{role}</span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.35)} className="flex flex-wrap items-center gap-3 mb-16">
          <MagneticButton>
            <a href="#projects" className="btn-primary">
              See what I've built
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </MagneticButton>

          {/* Social links */}
          <div className="flex items-center gap-1 ml-2">
            <a
              href="https://github.com/abhas-katiyar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/abhas-katiyar"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="mailto:abhas.katiyar.dev@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              <Mail size={18} />
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.42)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[var(--color-border)] rounded-xl overflow-hidden"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-[var(--color-surface)] px-5 py-4 flex flex-col gap-1"
            >
              <span
                className="font-display font-bold text-2xl text-white"
                style={{ letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </span>
              <span className="label-mono">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors duration-200"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

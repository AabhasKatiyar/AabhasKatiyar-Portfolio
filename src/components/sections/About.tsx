import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const TRAITS = [
  {
    label: 'Builder mindset',
    desc: 'I finish things. GymLane and Yappr are deployed, used, and actively developed — not just README files.',
  },
  {
    label: 'Product thinking',
    desc: 'Before I write code I ask: who has this problem, why does it matter, and what is the simplest right solution?',
  },
  {
    label: 'Engineering depth',
    desc: 'I want to understand why things work, not just how to use them. I read docs, break things, and rebuild them.',
  },
  {
    label: 'Continuous learner',
    desc: 'Started with Arduino C++ and am now building full-stack SaaS. Currently learning Next.js, System Design, and AI integration.',
  },
];

export const About = () => {
  return (
    <section
      id="about"
      className="section-padding section-divider"
    >
      <div className="container-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Story */}
          <div>
            <motion.p {...fadeUp(0)} className="section-eyebrow mb-4">
              Who I am
            </motion.p>

            <motion.h2 {...fadeUp(0.08)} className="heading-lg mb-8 text-white">
              I build software that solves real problems.
            </motion.h2>

            <div className="space-y-5">
              <motion.p {...fadeUp(0.15)} className="body-lg">
                My name is Aabhas Katiyar. I'm in my third year of B.Tech
                Information Technology at KIET Group of Institutions, Ghaziabad.
              </motion.p>

              <motion.p {...fadeUp(0.2)} className="body-lg">
                I got into programming through Arduino — wiring motors, reading
                sensors, writing C++ firmware that made physical things move. That
                hands-on foundation changed how I think about software. I understand
                what happens below the abstraction layers.
              </motion.p>

              <motion.p {...fadeUp(0.25)} className="body-lg">
                I shifted to web development in 2025 and immediately went deeper
                than I planned — from HTML and CSS to React, TypeScript, and then
                Supabase and PostgreSQL. Within months I was building a complete
                gym management SaaS called{' '}
                <span className="text-white font-medium">GymLane</span> and a
                social platform called{' '}
                <span className="text-white font-medium">Yappr</span>.
              </motion.p>

              <motion.p {...fadeUp(0.3)} className="body-lg">
                I'm still in college. I don't have years of corporate experience.
                What I do have is a track record of starting real things and
                finishing them — and the discipline to keep learning.
              </motion.p>
            </div>

            {/* Key info */}
            <motion.div
              {...fadeUp(0.38)}
              className="mt-10 grid grid-cols-2 gap-4 pt-6 border-t border-[var(--color-border)]"
            >
              <div>
                <p className="label-mono mb-1">Location</p>
                <p className="text-sm font-medium text-white">Uttar Pradesh, India</p>
              </div>
              <div>
                <p className="label-mono mb-1">Education</p>
                <p className="text-sm font-medium text-white">KIET Group of Institutions</p>
                <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>B.Tech IT — 2025 to 2029</p>
              </div>
              <div>
                <p className="label-mono mb-1">Open to</p>
                <p className="text-sm font-medium text-white">Internships, Collaboration, Projects</p>
              </div>
              <div>
                <p className="label-mono mb-1">Currently building</p>
                <p className="text-sm font-medium text-white">GymLane & Yappr</p>
              </div>
            </motion.div>
          </div>

          {/* Right: How I think */}
          <div>
            <motion.p {...fadeUp(0.1)} className="section-eyebrow mb-4">
              How I think
            </motion.p>
            <motion.h3
              {...fadeUp(0.18)}
              className="heading-md mb-8 text-white"
            >
              Four things that shape how I work
            </motion.h3>

            <div className="space-y-4">
              {TRAITS.map((trait, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.2 + i * 0.08)}
                  className="card card-hover"
                >
                  <p className="text-sm font-semibold text-white mb-2"
                     style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                    {trait.label}
                  </p>
                  <p className="body-sm">{trait.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

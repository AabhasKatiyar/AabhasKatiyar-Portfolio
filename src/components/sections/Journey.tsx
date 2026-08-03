import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Stage {
  period: string;
  title: string;
  description: string;
  tech: string[];
  status: 'past' | 'present' | 'future';
}

const STAGES: Stage[] = [
  {
    period: '2023 – 2024',
    title: 'Embedded Systems & Microcontrollers',
    description:
      'Started with Arduino Uno. Learned C/C++ to control physical things: motors, sensors, LEDs. Built a Bluetooth RC car and then an ESP32 WiFi car with a local web server controlling DC gear motors through an L298N motor driver.',
    tech: ['C/C++', 'Arduino', 'ESP32', 'SoftAP', 'PWM', 'L298N'],
    status: 'past',
  },
  {
    period: 'Early 2025',
    title: 'HTML, CSS & JavaScript Fundamentals',
    description:
      'Moved to web development by going deep on fundamentals — not skipping them. Built static pages from scratch to understand exactly how the browser renders things. Wrote JavaScript for DOM manipulation before ever touching a framework.',
    tech: ['HTML5', 'CSS Grid', 'Flexbox', 'Vanilla JS', 'DOM APIs'],
    status: 'past',
  },
  {
    period: 'Mid 2025',
    title: 'React, TypeScript & Modern Frontend',
    description:
      'Learned React properly — hooks, component architecture, state management, performance. Added TypeScript because type safety matters at scale. Built the foundations that made GymLane and Yappr possible.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    status: 'past',
  },
  {
    period: 'Late 2025 – Now',
    title: 'Full Stack & SaaS Founder',
    description:
      'Integrated Supabase and PostgreSQL to build real backends. Learned Row Level Security for bulletproof multi-tenant data access. Shipped GymLane (gym management SaaS) and Yappr (social platform) — both live, both real.',
    tech: ['Supabase', 'PostgreSQL', 'RLS', 'Supabase Auth', 'Realtime DB', 'Cloudflare Pages'],
    status: 'present',
  },
  {
    period: 'Currently Learning',
    title: 'Next.js, System Design & Mobile',
    description:
      'Studying server-side rendering, API routes, and edge functions with Next.js. Learning System Design to think about scale and architecture before building. Picking up Kotlin and React Native to extend my products to mobile.',
    tech: ['Next.js', 'System Design', 'Kotlin', 'React Native', 'AI APIs', 'Node.js'],
    status: 'future',
  },
];

const statusColor: Record<Stage['status'], string> = {
  past: 'var(--color-text-tertiary)',
  present: 'var(--color-blue)',
  future: 'var(--color-amber)',
};

const TimelineNode = ({ status }: { status: Stage['status'] }) => (
  <div className="relative flex-shrink-0 w-8 flex flex-col items-center">
    <div
      className="w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0"
      style={{
        borderColor: statusColor[status],
        background: status === 'present' ? 'var(--color-blue)' : 'var(--color-ink)',
        boxShadow: status === 'present' ? '0 0 12px rgba(59,123,252,0.5)' : 'none',
      }}
    />
  </div>
);

const StageCard = ({ stage, index }: { stage: Stage; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex gap-4"
    >
      <TimelineNode status={stage.status} />

      <div className="pb-10 flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <span
            className="label-mono"
            style={{ color: statusColor[stage.status] }}
          >
            {stage.period}
          </span>
          {stage.status === 'present' && (
            <span
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-medium tracking-wider"
              style={{ color: 'var(--color-blue)' }}
            >
              <span
                className="status-dot"
                style={{ background: 'var(--color-blue)' }}
              />
              Active
            </span>
          )}
        </div>

        <h3
          className="font-display font-semibold text-white mb-3"
          style={{ fontSize: '1.0625rem', letterSpacing: '-0.015em' }}
        >
          {stage.title}
        </h3>

        <p className="body-sm mb-4">{stage.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {stage.tech.map((t) => (
            <span
              key={t}
              className="pill"
              style={stage.status === 'present' ? { borderColor: 'rgba(59,123,252,0.25)', color: 'rgba(59,123,252,0.9)' } : {}}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Journey = () => {
  return (
    <section id="journey" className="section-padding section-divider">
      <div className="container-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14"
        >
          <p className="section-eyebrow mb-3">How I got here</p>
          <h2 className="heading-lg text-white max-w-xl">
            From soldering wires to shipping SaaS
          </h2>
          <p className="body-lg mt-4 max-w-lg">
            A real account of how I learned — what I built at each stage,
            what clicked, and what I'm working on next.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] top-0 bottom-0 w-px"
            style={{ background: 'var(--color-border)' }}
          />

          <div>
            {STAGES.map((stage, i) => (
              <StageCard key={i} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

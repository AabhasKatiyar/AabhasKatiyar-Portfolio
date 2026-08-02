import { motion } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { GraduationCap, BrainCircuit, Rocket } from 'lucide-react';

interface TimelineEvent {
  year: string;
  role: string;
  organization: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export const Experience = () => {
  const events: TimelineEvent[] = [
    {
      year: "2025 - 2029",
      role: "B.Tech in Information Technology",
      organization: "KIET UNIVERSITY",
      description: "Focusing on software development foundations, data structures & algorithms, and advanced Internet of Things (IoT) hardware-software architectures.",
      icon: <GraduationCap size={18} />,
      tags: ["Algorithms", "Database Systems", "IoT Engineering", "Computer Architecture"]
    },
    {
      year: "2025 (Autumn)",
      role: "Embedded Logic Researcher",
      organization: "C++ EMBEDDED LABS",
      description: "Experimented with microcontroller capabilities, constructing autonomous circuitry configurations, analog telemetry loops, and SPI/I2C communication channels.",
      icon: <BrainCircuit size={18} />,
      tags: ["ESP32", "Arduino Uno", "Serial Bus", "PWM Systems"]
    },
    {
      year: "2025 (Summer)",
      role: "Independent Web Builder",
      organization: "SELF-INITIATED LABS",
      description: "Crafted raw-compiled CSS/HTML structures to master browser rendering engine behaviors, semantic structures, and grid alignment mathematics.",
      icon: <Rocket size={18} />,
      tags: ["Semantic HTML", "CSS Grid Layouts", "DOM APIs"]
    }
  ];

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto border-t border-white/5" id="experience">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-16">
        <span className="font-mono text-xs text-brand-cobalt tracking-wider">// 04.</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-display">
          Milestone Timelines
        </h2>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 md:pl-10 border-l border-white/5 space-y-12 max-w-3xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Timeline Node Point Ring */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full bg-[#070a13] border-2 border-brand-cobalt shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-brand-gold animate-pulse" />
            </span>

            {/* Event Content Spotlight Card */}
            <SpotlightCard glowColor={index % 2 === 0 ? 'cobalt' : 'amber'} className="!p-5 space-y-4">
              
              {/* Card Header details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-brand-cobalt">
                    {event.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm md:text-base text-white">{event.role}</h4>
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">{event.organization}</span>
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-mono font-bold text-brand-gold text-glow-amber bg-brand-gold/5 px-2.5 py-1 rounded-md border border-brand-gold/10 self-start md:self-center">
                  {event.year}
                </span>
              </div>

              {/* Event Description */}
              <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                {event.description}
              </p>

              {/* Tags pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {event.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-[9px] font-mono text-slate-500 bg-white/2 border border-white/5 px-2 py-0.75 rounded-md hover:text-white transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

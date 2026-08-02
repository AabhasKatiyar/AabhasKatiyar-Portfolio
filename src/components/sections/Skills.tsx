import { motion } from 'framer-motion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Cpu, Terminal, Globe } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // percentage
  status: 'ONLINE' | 'ACTIVE' | 'SYSTEM_OK';
  details: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: 'cobalt' | 'amber' | 'silver';
}

export const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Core Languages",
      icon: <Terminal size={18} />,
      color: "amber",
      skills: [
        { name: "C++", level: 90, status: "ONLINE", details: "Embedded firmware, registers, pointer structures" },
        { name: "JavaScript", level: 85, status: "ACTIVE", details: "DOM, Async, ES6+ architecture, Event Loops" },
        { name: "Python", level: 75, status: "SYSTEM_OK", details: "Automation scripts, data manipulation" },
        { name: "SQL", level: 70, status: "ONLINE", details: "Relational modeling, query optimization" }
      ]
    },
    {
      title: "Embedded & Hardware",
      icon: <Cpu size={18} />,
      color: "cobalt",
      skills: [
        { name: "ESP32 SoC", level: 85, status: "ACTIVE", details: "softAP setup, motor drivers, WiFi sockets" },
        { name: "Arduino Uno", level: 90, status: "ONLINE", details: "Sensors interfacing (I2C, SPI), analog polling" },
        { name: "Circuitry & Schematics", level: 75, status: "SYSTEM_OK", details: "Breadboarding, voltage dividers, PWM loops" }
      ]
    },
    {
      title: "Web & Systems",
      icon: <Globe size={18} />,
      color: "silver",
      skills: [
        { name: "React.js", level: 85, status: "ACTIVE", details: "Hooks lifecycle, modular states, performance tuning" },
        { name: "Node.js & Express", level: 80, status: "ONLINE", details: "REST API routes, JSON parsing, server environments" },
        { name: "Tailwind CSS", level: 90, status: "SYSTEM_OK", details: "V4 configuration, responsive design systems" },
        { name: "HTML5 / CSS3", level: 95, status: "ONLINE", details: "Semantic layouts, CSS grids, animations" }
      ]
    }
  ];

  const categoryGlowColors = {
    cobalt: 'border-brand-cobalt/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]',
    amber: 'border-brand-gold/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]',
    silver: 'border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
  };

  const textGlowColors = {
    cobalt: 'text-brand-cobalt text-glow-cobalt',
    amber: 'text-brand-gold text-glow-amber',
    silver: 'text-slate-200'
  };

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto border-t border-white/5" id="skills">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-16">
        <span className="font-mono text-xs text-brand-cobalt tracking-wider">// 02.</span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-display">
          Silicon Wafer Nodes
        </h2>
      </div>

      {/* Wafer Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="space-y-6">
            {/* Category Title bar */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className={`p-2 rounded-lg bg-black/40 border ${
                category.color === 'amber' ? 'text-brand-gold border-brand-gold/20' : category.color === 'cobalt' ? 'text-brand-cobalt border-brand-cobalt/20' : 'text-slate-400 border-white/10'
              }`}>
                {category.icon}
              </div>
              <h3 className="font-display font-bold text-base text-white tracking-wider uppercase">
                {category.title}
              </h3>
            </div>

            {/* Skills items list */}
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIndex * 0.1, duration: 0.5 }}
                >
                  <SpotlightCard 
                    glowColor={category.color}
                    className={`border ${categoryGlowColors[category.color]} !p-4`}
                  >
                    <div className="space-y-3 font-mono">
                      {/* Name & Health Status */}
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-bold ${textGlowColors[category.color]}`}>{skill.name}</span>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            category.color === 'amber' ? 'bg-brand-gold' : category.color === 'cobalt' ? 'bg-brand-cobalt' : 'bg-slate-400'
                          } animate-pulse`} />
                          <span>{skill.status}</span>
                        </div>
                      </div>

                      {/* Detail string */}
                      <div className="text-[10px] text-slate-400 leading-normal font-sans">
                        {skill.details}
                      </div>

                      {/* Progress Bar telemetry */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[9px] text-slate-600">
                          <span>NODE_STABILITY</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className={`h-full rounded-full ${
                              category.color === 'amber' 
                                ? 'bg-brand-gold' 
                                : category.color === 'cobalt' 
                                  ? 'bg-brand-cobalt' 
                                  : 'bg-slate-400'
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + skillIndex * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

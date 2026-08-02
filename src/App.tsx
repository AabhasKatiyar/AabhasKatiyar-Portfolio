import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TelemetryLoader } from './components/ui/TelemetryLoader';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Journal } from './components/sections/Journal';
import { Contact } from './components/sections/Contact';
import { MagneticButton } from './components/ui/MagneticButton';

function App() {
  const [isBootLoaded, setIsBootLoaded] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Milestones", href: "#experience" },
    { name: "Journal", href: "#journal" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {!isBootLoaded ? (
          <TelemetryLoader key="loader" onComplete={() => setIsBootLoaded(true)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative min-h-screen bg-[#070a13] text-slate-100 overflow-x-hidden selection:bg-brand-cobalt/30 selection:text-white"
          >
            {/* Global Interactive Custom Cursor */}
            <CustomCursor />

            {/* Static Grid Background */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0" />

            {/* Sticky Floating Premium Navigation */}
            <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-center">
              <nav className="w-full max-w-5xl px-6 py-3.5 rounded-full border border-white/5 bg-slate-950/40 backdrop-blur-md flex items-center justify-between shadow-2xl relative">
                {/* Glowing Border effect */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cobalt/25 to-transparent" />
                
                {/* Logo */}
                <a href="#hero" className="font-display font-black text-sm tracking-wider text-white hover:text-brand-gold transition-colors duration-300">
                  AABHAS<span className="text-brand-cobalt">.</span>DEV
                </a>

                {/* Desktop Menu links */}
                <div className="hidden md:flex gap-6 items-center text-xs font-mono">
                  {navLinks.map((link) => (
                    <MagneticButton key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-slate-400 hover:text-white tracking-widest uppercase transition-colors duration-300 px-2.5 py-1 inline-block"
                      >
                        {link.name}
                      </a>
                    </MagneticButton>
                  ))}
                </div>

                {/* Mobile Direct Contact button */}
                <MagneticButton>
                  <a 
                    href="#contact" 
                    className="px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold hover:bg-brand-gold/15 text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  >
                    Uplink
                  </a>
                </MagneticButton>
              </nav>
            </header>

            {/* Content sections wrapper */}
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Journal />
              <Contact />
            </main>

            {/* Elegant Background Light Sources */}
            <div className="absolute top-[1200px] left-[-200px] w-[500px] h-[500px] bg-brand-cobalt/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-[2800px] right-[-200px] w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[150px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

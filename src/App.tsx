import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Journey } from './components/sections/Journey';
import { Projects } from './components/sections/Projects';
import { ProjectArchive } from './components/sections/ProjectArchive';
import { Skills } from './components/sections/Skills';
import { Roadmap } from './components/sections/Roadmap';
import { Contact } from './components/sections/Contact';
import { MagneticButton } from './components/ui/MagneticButton';

function App() {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" },
    { name: "Projects", href: "#projects" },
    { name: "Archive", href: "#archive" },
    { name: "Skills", href: "#skills" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <div className="relative min-h-screen bg-[#05050a] text-slate-100 overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      {/* Global Interactive Custom Cursor */}
      <CustomCursor />

      {/* Persistent Sticky Floating Navigation Dock */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 flex justify-center">
        <nav className="w-full max-w-4xl px-5 py-3 rounded-full border border-white/10 bg-[#0c0c14]/80 backdrop-blur-md flex items-center justify-between shadow-2xl relative">
          
          {/* Brand Logo */}
          <a 
            href="#hero" 
            className="font-display font-black text-sm tracking-wider text-white hover:text-[var(--color-blue)] transition-colors duration-200"
          >
            AABHAS<span className="text-[var(--color-blue)]">.</span>DEV
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 font-mono text-[11px]">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-slate-400 hover:text-white transition-colors duration-200 px-3 py-1 rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Direct Contact Button */}
          <MagneticButton>
            <a 
              href="#contact" 
              className="px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-mono transition-all duration-200"
            >
              Contact
            </a>
          </MagneticButton>
        </nav>
      </header>

      {/* Main Content Sections Flow */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <ProjectArchive />
        <Skills />
        <Roadmap />
        <Contact />
      </main>

      {/* Clean Footer */}
      <footer className="py-8 text-center font-mono text-xs text-slate-600 border-t border-[var(--color-border)] relative z-10">
        © {new Date().getFullYear()} Aabhas Katiyar. Engineered with React 19, TypeScript, & Tailwind CSS v4.
      </footer>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { LenisProvider } from './components/ui/LenisProvider';
import { HeroCanvas } from './components/canvas/HeroCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingNav } from './components/ui/FloatingNav';
import { VerticalThread } from './components/ui/VerticalThread';
import { ResumeModal } from './components/ui/ResumeModal';
import { Hero } from './components/sections/Hero';

import { HeroLanding } from './components/sections/HeroLanding';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { GymLane } from './components/sections/GymLane';
import { Yappr } from './components/sections/Yappr';
import { EngineeringLab } from './components/sections/EngineeringLab';
import { Contact } from './components/sections/Contact';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <LenisProvider>
      <div style={{ background: '#0c0c0c', overflowX: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {/* Canvas background — only after intro */}
        {introDone && <HeroCanvas />}

        {/* Global cursor & navigation */}
        <CustomCursor />
        {introDone && <FloatingNav />}
        {introDone && <VerticalThread />}

        {/* Resume Modal */}
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* Typewriter intro — original Hero with skip */}
        <Hero onIntroComplete={() => setIntroDone(true)} />

        {/* Main content — shown after intro */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          {introDone && (
            <div style={{ animation: 'pop-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <HeroLanding onViewResume={() => setResumeOpen(true)} />
              <About />
              <Skills />
              <Experience />
              <GymLane />
              <Yappr />
              <EngineeringLab />
              <Contact />
            </div>
          )}
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;

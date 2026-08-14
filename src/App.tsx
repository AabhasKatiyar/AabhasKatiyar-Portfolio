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
        {/* Subtle coordinate grid backdrop */}
        {introDone && <HeroCanvas />}

        {/* Global Magnet Cursor & Navigation Dock */}
        <CustomCursor />
        {introDone && <FloatingNav />}
        {introDone && <VerticalThread />}

        {/* Resume Modal overlay */}
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* Main page content sections */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          {!introDone && <Hero onIntroComplete={() => setIntroDone(true)} />}

          {introDone && (
            <div style={{ animation: 'pop-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
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

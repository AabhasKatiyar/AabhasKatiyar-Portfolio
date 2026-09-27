import { useState } from 'react';
import { LenisProvider } from './components/ui/LenisProvider';
import { GlobalVideoCanvas } from './components/canvas/GlobalVideoCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingNav } from './components/ui/FloatingNav';
import { VerticalThread } from './components/ui/VerticalThread';
import { ResumeModal } from './components/ui/ResumeModal';

import { HeroLanding } from './components/sections/HeroLanding';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { GymLane } from './components/sections/GymLane';
import { Yappr } from './components/sections/Yappr';
import { EngineeringLab } from './components/sections/EngineeringLab';
import { Contact } from './components/sections/Contact';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <LenisProvider>
      {/* ── FULL-PAGE 240-FRAME SCROLL-DRIVEN VIDEO BACKGROUND CANVAS ── */}
      {/* Mounted directly at root so it is strictly anchored to the viewport on mobile */}
      <GlobalVideoCanvas />

      <div style={{ background: 'transparent', overflowX: 'clip', minHeight: '100vh', position: 'relative' }}>
        {/* Global cursor & navigation */}
        <CustomCursor />
        <FloatingNav />
        <VerticalThread />

        {/* Resume Modal */}
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* ── ALL PORTFOLIO SECTIONS FLOATING ON TOP OF VIDEO ── */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          <HeroLanding onViewResume={() => setResumeOpen(true)} />
          <About />
          <Skills />
          <Experience />
          <GymLane />
          <Yappr />
          <EngineeringLab />
          <Contact />
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;

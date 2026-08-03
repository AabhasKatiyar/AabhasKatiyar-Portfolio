import { useState } from 'react';
import { LenisProvider } from './components/ui/LenisProvider';
import { HeroCanvas } from './components/canvas/HeroCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingNav } from './components/ui/FloatingNav';
import { Hero } from './components/sections/Hero';
import { GymLane } from './components/sections/GymLane';
import { Yappr } from './components/sections/Yappr';
import { Journey } from './components/sections/Journey';
import { EngineeringLab } from './components/sections/EngineeringLab';
import { Contact } from './components/sections/Contact';

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <LenisProvider>
      <div style={{ background: '#0c0c0c', overflowX: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {/* Subtle coordinate grid backdrop */}
        {introDone && <HeroCanvas />}

        {/* Global Magnet Cursor & Navigation Dock */}
        <CustomCursor />
        {introDone && <FloatingNav />}

        {/* 6 Story-driven Worlds */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          {!introDone && <Hero onIntroComplete={() => setIntroDone(true)} />}

          {introDone && (
            <div style={{ animation: 'pop-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <GymLane />
              <Yappr />
              <Journey />
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

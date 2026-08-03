import { useState, useCallback } from 'react';
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

type IntroPhase = 'idle' | 'type1' | 'pause1' | 'type2' | 'type3' | 'accelerate' | 'assemble' | 'complete';
type CanvasPhase = 'idle' | 'dust' | 'pulse' | 'accelerate' | 'assemble';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>('idle');

  const handlePhaseChange = useCallback((newPhase: IntroPhase) => {
    setPhase(newPhase);
  }, []);

  const getCanvasPhase = (): CanvasPhase => {
    if (phase === 'type2') return 'dust';
    if (phase === 'type3') return 'pulse';
    if (phase === 'accelerate') return 'accelerate';
    if (phase === 'assemble' || phase === 'complete') return 'assemble';
    return 'idle';
  };

  return (
    <LenisProvider>
      <div style={{ background: '#0c0c0c', overflowX: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {/* Three.js Interactive WebGL Background Canvas */}
        <HeroCanvas phase={getCanvasPhase()} />

        {/* Global Magnet Cursor & Navigation Indicator */}
        <CustomCursor />
        {introDone && <FloatingNav />}

        {/* Storytelling Worlds */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          {!introDone && (
            <Hero
              onIntroComplete={() => setIntroDone(true)}
              onPhaseChange={handlePhaseChange}
            />
          )}

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

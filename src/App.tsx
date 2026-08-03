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
  return (
    <LenisProvider>
      <div style={{ background: '#0c0c0c', overflowX: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {/* Three.js Interactive WebGL Background Canvas */}
        <HeroCanvas />

        {/* Global Magnet Cursor & World Navigation Dock */}
        <CustomCursor />
        <FloatingNav />

        {/* 6 Interactive Experience Worlds */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <GymLane />
          <Yappr />
          <Journey />
          <EngineeringLab />
          <Contact />
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;

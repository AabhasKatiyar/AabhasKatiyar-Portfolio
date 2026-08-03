import { CustomCursor } from './components/ui/CustomCursor';
import { FloatingNav } from './components/ui/FloatingNav';
import { Hero } from './components/sections/Hero';
import { GymLane } from './components/sections/GymLane';
import { Yappr } from './components/sections/Yappr';
import { Journey } from './components/sections/Journey';
import { ProjectArchive } from './components/sections/ProjectArchive';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div style={{ background: '#0c0c0c', overflowX: 'hidden' }}>
      <CustomCursor />
      <FloatingNav />

      <main>
        <Hero />
        <GymLane />
        <Yappr />
        <Journey />
        <ProjectArchive />
        <Contact />
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Types for network assembly simulation
interface Node {
  x: number;
  y: number;
  tx: number; // Target X for morphing
  ty: number; // Target Y for morphing
  label?: string;
  size: number;
}

interface Connection {
  fromIdx: number;
  toIdx: number;
  progress: number;
}

export const Hero = ({
  onIntroComplete,
  onPhaseChange,
}: {
  onIntroComplete: () => void;
  onPhaseChange?: (phase: 'idle' | 'type1' | 'pause1' | 'type2' | 'type3' | 'accelerate' | 'assemble' | 'complete') => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'idle' | 'type1' | 'pause1' | 'type2' | 'type3' | 'accelerate' | 'assemble' | 'complete'>('idle');
  const [typedText, setTypedText] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  // Animation timeline ticks
  useEffect(() => {
    // 1. Initial black screen pause
    const t0 = setTimeout(() => setPhase('type1'), 500);
    return () => clearTimeout(t0);
  }, []);

  // Realistic typewriter implementation
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const typeSentence = (sentence: string, onFinish: () => void, delay = 60) => {
      let currentLength = 0;
      const tick = () => {
        if (!active) return;
        if (currentLength < sentence.length) {
          currentLength++;
          setTypedText(sentence.slice(0, currentLength));
          timer = setTimeout(tick, delay + Math.random() * 40);
        } else {
          onFinish();
        }
      };
      tick();
    };

    if (phase === 'type1') {
      typeSentence('Not every project deserves to exist.', () => {
        setTimeout(() => {
          setPhase('pause1');
        }, 800);
      });
    } else if (phase === 'pause1') {
      let blinks = 0;
      const interval = setInterval(() => {
        setCursorBlink((b) => !b);
        blinks++;
        if (blinks >= 4) {
          clearInterval(interval);
          setPhase('type2');
        }
      }, 200);
      return () => clearInterval(interval);
    } else if (phase === 'type2') {
      typeSentence('Every product starts with one problem.', () => {
        setTimeout(() => {
          setPhase('type3');
        }, 800);
      });
    } else if (phase === 'type3') {
      typeSentence('I build products that solve them.', () => {
        setTimeout(() => {
          setPhase('accelerate');
        }, 1000);
      });
    } else if (phase === 'accelerate') {
      const t = setTimeout(() => {
        setPhase('assemble');
      }, 2000);
      return () => clearTimeout(t);
    } else if (phase === 'assemble') {
      const t = setTimeout(() => {
        setPhase('complete');
        onIntroComplete();
      }, 2500);
      return () => clearTimeout(t);
    }

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [phase]);

  // Cursor blink loop during typing phases
  useEffect(() => {
    if (phase === 'idle' || phase === 'complete') return;
    const interval = setInterval(() => setCursorBlink((b) => !b), 400);
    return () => clearInterval(interval);
  }, [phase]);

  // Canvas WebGL Particle Network Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialise organic floating dust particles
    const dustParticles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        alpha: 0,
      });
    }

    // Build database network graph structure
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    let centralNodePulse = 0;

    const setupNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      // Central database controller node
      nodes.push({ x: width / 2, y: height / 2, tx: width / 2 - 200, ty: height / 2 - 100, label: 'PostgreSQL DB', size: 6 });

      // Surrounding API / Client nodes
      const numNodes = 8;
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        const radius = 140 + Math.random() * 60;
        nodes.push({
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          tx: width / 2 + (i % 2 === 0 ? 100 : -100),
          ty: height / 2 + (i > 4 ? 80 : -80),
          label: i % 2 === 0 ? 'API Gate' : 'Client UI',
          size: 4,
        });

        connections.push({ fromIdx: 0, toIdx: i + 1, progress: 0 });
      }
    };

    setupNetwork();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setupNetwork();
    };
    window.addEventListener('resize', handleResize);

    // Frame update loop
    let speedMult = 1.0;
    let cameraZ = 1.0;

    const render = () => {
      ctx.fillStyle = '#0c0c0c';
      ctx.fillRect(0, 0, width, height);

      // 1. Dust Particles flow simulation
      if (phase === 'type2' || phase === 'type3' || phase === 'accelerate' || phase === 'assemble') {
        dustParticles.forEach((p) => {
          if (p.alpha < 0.5) p.alpha += 0.005;
          p.x += p.vx * speedMult;
          p.y += p.vy * speedMult;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.fillStyle = `rgba(200, 255, 0, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 2. Growing active database nodes network
      if (phase === 'type2' || phase === 'type3' || phase === 'accelerate' || phase === 'assemble') {
        // Draw Central database pulse
        centralNodePulse += 0.08 * speedMult;
        const pulseSize = 10 + Math.sin(centralNodePulse) * 4;
        ctx.strokeStyle = 'rgba(0, 232, 122, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        // Animate connection lines
        connections.forEach((conn) => {
          if (conn.progress < 1) conn.progress += 0.02 * speedMult;
          const from = nodes[conn.fromIdx];
          const to = nodes[conn.toIdx];

          const dx = to.x - from.x;
          const dy = to.y - from.y;

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(from.x + dx * conn.progress, from.y + dy * conn.progress);
          ctx.stroke();
        });

        // Draw nodes
        nodes.forEach((node) => {
          ctx.fillStyle = '#00e87a';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 3. Acceleration and morphing stage checks
      if (phase === 'accelerate') {
        speedMult = 3.5;
        cameraZ += 0.008;
      }

      if (phase === 'assemble') {
        speedMult = 1.0;
        // Interpolate database nodes into UI outline coordinates
        nodes.forEach((node) => {
          node.x += (node.tx - node.x) * 0.1;
          node.y += (node.ty - node.y) * 0.1;
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: '#0c0c0c',
        display: phase === 'complete' ? 'none' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Typewriter message overlays */}
      {phase !== 'complete' && (
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 600 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.25rem)',
              color: '#f0ede6',
              letterSpacing: '-0.02em',
              lineHeight: 1.6,
            }}
          >
            {typedText}
            {cursorBlink && (
              <span style={{ display: 'inline-block', width: 2, height: 16, background: '#fff', marginLeft: 4 }} />
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

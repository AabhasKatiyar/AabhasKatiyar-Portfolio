import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  tx: number; // Target X coordinate for morphing
  ty: number; // Target Y coordinate for morphing
  size: number;
}

export const Hero = ({ onIntroComplete }: { onIntroComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'idle' | 'type1' | 'pause1' | 'type2' | 'pause2' | 'type3' | 'morph' | 'done'>('idle');
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);

  // Fast skip if previously seen in this session (Recruiter-friendly)
  useEffect(() => {
    if (sessionStorage.getItem('portfolio-intro-seen') === 'true') {
      setPhase('done');
      onIntroComplete();
    }
  }, []);

  // Typewriter sequence coordination (sped up for better UX)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const runTypewriter = (sentence: string, delayBefore: number, onFinish: () => void) => {
      let len = 0;
      const tick = () => {
        if (len < sentence.length) {
          len++;
          setText(sentence.slice(0, len));
          timer = setTimeout(tick, 20 + Math.random() * 20); // Faster speed (was 45 + random)
        } else {
          onFinish();
        }
      };
      timer = setTimeout(tick, delayBefore);
    };

    if (phase === 'idle') {
      timer = setTimeout(() => setPhase('type1'), 200); // Shorter pause (was 500)
    } else if (phase === 'type1') {
      runTypewriter('Not every project deserves to exist.', 0, () => {
        timer = setTimeout(() => setPhase('pause1'), 400); // Shorter pause (was 800)
      });
    } else if (phase === 'pause1') {
      timer = setTimeout(() => {
        setText('');
        setPhase('type2');
      }, 300); // Shorter pause (was 600)
    } else if (phase === 'type2') {
      runTypewriter('Every product starts with one problem.', 0, () => {
        timer = setTimeout(() => setPhase('pause2'), 400); // Shorter pause (was 800)
      });
    } else if (phase === 'pause2') {
      timer = setTimeout(() => {
        setText('');
        setPhase('type3');
      }, 300); // Shorter pause (was 600)
    } else if (phase === 'type3') {
      runTypewriter('I build products that solve them.', 0, () => {
        timer = setTimeout(() => setPhase('morph'), 600); // Shorter pause (was 1200)
      });
    } else if (phase === 'morph') {
      sessionStorage.setItem('portfolio-intro-seen', 'true');
      timer = setTimeout(() => {
        setPhase('done');
        onIntroComplete();
      }, 1200); // Shorter morph (was 2000)
    }

    return () => clearTimeout(timer);
  }, [phase]);

  // Cursor blink interval
  useEffect(() => {
    if (phase === 'done') return;
    const interval = setInterval(() => setCursor((c) => !c), 400);
    return () => clearInterval(interval);
  }, [phase]);

  // Canvas Architectural Network rendering loop
  useEffect(() => {
    if (phase === 'done') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes: Node[] = [];
    const gridSpacing = 85;

    const setupNodes = () => {
      nodes.length = 0;
      const cols = Math.ceil(width / gridSpacing);
      const rows = Math.ceil(height / gridSpacing);

      // Central seed database node
      nodes.push({
        x: width / 2,
        y: height / 2,
        tx: width / 2,
        ty: height / 2,
        size: 5,
      });

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const nx = c * gridSpacing;
          const ny = r * gridSpacing;
          if (Math.abs(nx - width / 2) < 20 && Math.abs(ny - height / 2) < 20) continue;

          nodes.push({
            x: nx,
            y: ny,
            tx: nx + (Math.random() - 0.5) * 40,
            ty: ny + (Math.random() - 0.5) * 40,
            size: 2,
          });
        }
      }
    };

    setupNodes();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setupNodes();
    };
    window.addEventListener('resize', handleResize);

    let progress = 0;
    let pulseAngle = 0;

    const tick = () => {
      ctx.fillStyle = '#0c0c0c';
      ctx.fillRect(0, 0, width, height);

      // Scene 2: Faint grid lines become visible
      if (phase === 'type2' || phase === 'pause2' || phase === 'type3' || phase === 'morph') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 1;

        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        for (let x = 0; x < width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
      }

      // Single green database node appears & pulses
      if (phase === 'type2' || phase === 'pause2' || phase === 'type3' || phase === 'morph') {
        pulseAngle += 0.08;
        const pulseRadius = 8 + Math.sin(pulseAngle) * 3;

        ctx.strokeStyle = 'rgba(0, 232, 122, 0.2)';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#00e87a';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Network lines grow outward
      if (phase === 'type3' || phase === 'morph') {
        if (progress < 1) progress += 0.02; // Faster connection line growth (was 0.01)

        ctx.strokeStyle = 'rgba(0, 232, 122, 0.08)';
        ctx.lineWidth = 1;

        nodes.forEach((node, i) => {
          if (i === 0) return;
          const dist = Math.hypot(node.x - width / 2, node.y - height / 2);
          if (dist < 260) {
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.lineTo(
              width / 2 + (node.x - width / 2) * progress,
              height / 2 + (node.y - height / 2) * progress
            );
            ctx.stroke();

            ctx.fillStyle = 'rgba(0, 232, 122, 0.4)';
            ctx.beginPath();
            ctx.arc(
              width / 2 + (node.x - width / 2) * progress,
              height / 2 + (node.y - height / 2) * progress,
              1.5,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        });
      }

      // Accelerate camera & morph elements
      if (phase === 'morph') {
        nodes.forEach((node) => {
          node.x += (node.tx - node.x) * 0.12; // Faster morph (was 0.08)
          node.y += (node.ty - node.y) * 0.12;
        });

        ctx.strokeStyle = 'rgba(0, 232, 122, 0.12)';
        ctx.lineWidth = 1.2;
        const boxW = 320 * progress;
        const boxH = 220 * progress;
        ctx.strokeRect(width / 2 - boxW / 2, height / 2 - boxH / 2, boxW, boxH);
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase]);

  const handleSkip = () => {
    sessionStorage.setItem('portfolio-intro-seen', 'true');
    setPhase('done');
    onIntroComplete();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: '#0c0c0c',
        display: phase === 'done' ? 'none' : 'flex',
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

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '1rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(0.9375rem, 1.6vw, 1.35rem)',
              color: '#f0ede6',
              letterSpacing: '-0.02em',
            }}
          >
            {text}
            {cursor && (
              <span style={{ display: 'inline-block', width: 2, height: 16, background: '#fff', marginLeft: 4 }} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Instant Skip Intro Button for Recruiters */}
      {phase !== 'done' && (
        <button
          onClick={handleSkip}
          style={{
            position: 'absolute',
            bottom: '3rem',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            padding: '0.65rem 1.45rem',
            color: '#888',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        >
          SKIP INTRO ↗
        </button>
      )}
    </div>
  );
};

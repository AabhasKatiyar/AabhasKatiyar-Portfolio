import { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: 'amber' | 'cobalt' | 'silver';
}

export const SpotlightCard = ({ 
  children, 
  glowColor = 'cobalt', 
  className = '', 
  ...props 
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md p-6 ${className}`}
      {...props}
    >
      {/* Background radial glow */}
      <div
        className={`absolute -inset-px transition-opacity duration-300 pointer-events-none rounded-xl bg-radial`}
        style={{
          opacity,
          backgroundImage: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, var(--color-brand-cobalt, #3b82f6) 10%, transparent 60%)`,
          mixBlendMode: 'overlay',
          zIndex: 0
        }}
      />
      
      {/* Border glow layer */}
      <div
        className="absolute -inset-px transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          opacity,
          backgroundImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${
            glowColor === 'amber' ? 'rgba(245, 158, 11, 0.4)' : glowColor === 'cobalt' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.2)'
          }, transparent 100%)`,
          zIndex: 1
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  range?: number;
  strength?: number;
}

export const MagneticButton = ({
  children,
  range = 60,
  strength = 0.35,
  className = '',
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Middle center of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from cursor to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Pull element towards cursor
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

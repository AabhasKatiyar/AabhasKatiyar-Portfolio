import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Coordinate values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer spring settings (lag effect)
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-hover-glow]') ||
        target.closest('.interactive-element');

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide mouse outside window
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          borderColor: isHovered ? '#f59e0b' : '#3b82f6',
          boxShadow: isHovered 
            ? '0 0 15px rgba(245, 158, 11, 0.4)' 
            : '0 0 10px rgba(59, 130, 246, 0.2)',
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: useMotionValue(0),
          y: useMotionValue(0),
          left: cursorX.get() + 12,
          top: cursorY.get() + 12,
          backgroundColor: isHovered ? '#f59e0b' : '#3b82f6',
        }}
      />
    </>
  );
};

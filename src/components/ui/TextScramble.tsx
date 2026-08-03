import { useEffect, useState, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#@ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TextScramble: React.FC<Props> = ({
  text,
  className = '',
  delay = 0,
  speed = 35,
}) => {
  const [display, setDisplay] = useState(() =>
    text.split('').map((c) => (c === ' ' ? ' ' : '_')).join('')
  );
  const iterRef  = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    iterRef.current = 0;

    startRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        const iter = iterRef.current;

        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < Math.floor(iter)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );

        iterRef.current += 0.32;

        if (iter >= text.length) {
          clearInterval(timerRef.current!);
          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startRef.current!);
      clearInterval(timerRef.current!);
    };
  }, [text, delay, speed]);

  return <span className={className}>{display}</span>;
};

import { useEffect, useState } from 'react';

interface TypedCommandProps {
  command: string;
  onDone?: () => void;
}

export function TypedCommand({ command, onDone }: TypedCommandProps) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setChars(command.length);
      onDone?.();
      return;
    }
    if (chars >= command.length) {
      const t = setTimeout(() => onDone?.(), 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setChars((c) => c + 1), 45 + Math.random() * 60);
    return () => clearTimeout(t);
  }, [chars, command, onDone]);

  return <span className="cmd">{command.slice(0, chars)}</span>;
}

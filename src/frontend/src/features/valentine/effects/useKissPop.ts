import { useState, useEffect, useRef } from 'react';

interface Kiss {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export function useKissPop() {
  const [kisses, setKisses] = useState<Kiss[]>([]);
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerKissPop = () => {
    if (isActive) return; // Already running
    
    setIsActive(true);
    
    // Spawn kisses over 3 seconds
    let kissId = 0;
    intervalRef.current = setInterval(() => {
      const newKisses: Kiss[] = [];
      // Spawn 3-5 kisses at a time
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        newKisses.push({
          id: kissId++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 200,
        });
      }
      setKisses((prev) => [...prev, ...newKisses]);
    }, 300);

    // Stop spawning after 3 seconds
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Clear all kisses after animation completes
      setTimeout(() => {
        setKisses([]);
        setIsActive(false);
      }, 2000);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { kisses, triggerKissPop };
}

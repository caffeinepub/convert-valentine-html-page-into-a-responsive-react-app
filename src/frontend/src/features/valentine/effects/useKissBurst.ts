import { useState, useEffect, useRef } from 'react';

interface Kiss {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export function useKissBurst() {
  const [kisses, setKisses] = useState<Kiss[]>([]);
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerKissBurst = () => {
    if (isActive) return;
    
    setIsActive(true);
    
    // Spawn kisses in bursts near center (40-60% range for clustering near heart)
    let kissId = 0;
    intervalRef.current = setInterval(() => {
      const newKisses: Kiss[] = [];
      const count = Math.floor(Math.random() * 4) + 4; // 4-7 kisses per burst
      for (let i = 0; i < count; i++) {
        newKisses.push({
          id: kissId++,
          x: 40 + Math.random() * 20, // Center cluster 40-60%
          y: 40 + Math.random() * 20, // Center cluster 40-60%
          delay: Math.random() * 300,
        });
      }
      setKisses((prev) => [...prev, ...newKisses]);
    }, 400);

    // Stop spawning after 4 seconds
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Clear all kisses after animation completes
      setTimeout(() => {
        setKisses([]);
        setIsActive(false);
      }, 2500);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { kisses, triggerKissBurst };
}

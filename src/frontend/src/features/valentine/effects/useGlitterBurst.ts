import { useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function useGlitterBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerBurst = useCallback(() => {
    const newParticles: Particle[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: centerX + (Math.random() * 200 - 100),
        y: centerY + (Math.random() * 120 - 60),
      });
    }

    setParticles(newParticles);

    // Clean up particles after animation completes
    setTimeout(() => {
      setParticles([]);
    }, 1000);
  }, []);

  return { particles, triggerBurst };
}

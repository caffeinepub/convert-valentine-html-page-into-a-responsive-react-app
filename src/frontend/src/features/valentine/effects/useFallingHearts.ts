import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  duration: number;
}

const MAX_HEARTS = 30;
const SPAWN_INTERVAL = 400;

export function useFallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const spawnHeart = () => {
      const newHeart: Heart = {
        id: nextId,
        x: Math.random() * 100,
        duration: Math.random() * 3 + 3, // 3-6 seconds
      };

      setHearts((prev) => {
        // Limit concurrent hearts
        const updated = [...prev, newHeart];
        return updated.length > MAX_HEARTS ? updated.slice(1) : updated;
      });

      setNextId((id) => id + 1);

      // Remove heart after animation completes
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, newHeart.duration * 1000);
    };

    const interval = setInterval(spawnHeart, SPAWN_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [nextId]);

  return hearts;
}

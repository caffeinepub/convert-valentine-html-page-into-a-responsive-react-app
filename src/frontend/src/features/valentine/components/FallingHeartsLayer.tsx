import { useFallingHearts } from '../effects/useFallingHearts';

export function FallingHeartsLayer() {
  const hearts = useFallingHearts();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-fall absolute text-2xl opacity-80"
          style={{
            left: `${heart.x}%`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}

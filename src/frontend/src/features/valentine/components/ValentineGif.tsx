import { useState } from 'react';
import { STRINGS } from '../content/strings';

interface ValentineGifProps {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
}

export function ValentineGif({ src, alt, fallbackText, className = 'h-auto w-64 rounded-2xl' }: ValentineGifProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50 dark:border-pink-700 dark:bg-pink-900/30 ${className}`}>
        <p className="text-pink-500 dark:text-pink-400">
          {fallbackText || STRINGS.gifFallback}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

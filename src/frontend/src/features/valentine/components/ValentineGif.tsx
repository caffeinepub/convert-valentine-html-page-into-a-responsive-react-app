import { useState } from 'react';
import { STRINGS } from '../content/strings';

interface ValentineGifProps {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  onClick?: () => void;
}

export function ValentineGif({ 
  src, 
  alt, 
  fallbackText, 
  className = 'h-auto w-64 rounded-2xl',
  onClick 
}: ValentineGifProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50 dark:border-pink-700 dark:bg-pink-900/30 ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
      >
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
      className={`${className} ${onClick ? 'cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95' : ''}`}
      onError={handleError}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    />
  );
}

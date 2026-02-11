import { useState } from 'react';

interface EnvelopeLetterProps {
  onOpened: () => void;
}

export function EnvelopeLetter({ onOpened }: EnvelopeLetterProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Wait for animation to complete before notifying parent
    setTimeout(() => {
      onOpened();
    }, 800);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-lg font-semibold text-pink-600 dark:text-pink-400">
        Click to Unfold 💌
      </p>
      <button
        onClick={handleClick}
        className={`envelope-container ${isOpening ? 'opening' : ''}`}
        disabled={isOpening}
        aria-label="Open envelope"
      >
        <div className="envelope">
          <div className="envelope-flap"></div>
          <div className="envelope-body"></div>
          <div className="envelope-letter">💌</div>
        </div>
      </button>
    </div>
  );
}

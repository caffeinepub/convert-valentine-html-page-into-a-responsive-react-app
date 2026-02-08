import { useState } from 'react';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import { useGlitterBurst } from '../effects/useGlitterBurst';
import type { Screen } from '../ValentineFlow';

interface FinalSurpriseScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function FinalSurpriseScreen({ onNavigate }: FinalSurpriseScreenProps) {
  const [showMessage, setShowMessage] = useState(false);
  const { particles, triggerBurst } = useGlitterBurst();

  const handleSurpriseBoxClick = () => {
    setShowMessage(true);
    triggerBurst();
  };

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl md:text-6xl">
          {STRINGS.finalSurpriseTitle}
        </h1>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.finalSurpriseGif}
            alt="Final Surprise GIF"
            fallbackText={STRINGS.gifFallback}
          />
        </div>
        
        <h2 className="text-2xl font-semibold text-pink-700 dark:text-pink-300">
          {STRINGS.finalSurprisePrompt}
        </h2>
        
        <div className="relative my-6">
          <img
            src={ASSETS.surpriseBoxImage}
            alt="Surprise Box"
            className="h-auto w-44 cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
            onClick={handleSurpriseBoxClick}
          />
        </div>
        
        {showMessage && (
          <div className="pop-out-animation love-box mx-auto max-w-2xl space-y-4 text-lg leading-relaxed sm:text-xl">
            {STRINGS.finalSurpriseMessage.split('\n').map((line, index) => (
              <p key={index} className="font-semibold text-pink-700 dark:text-pink-300">
                {line}
              </p>
            ))}
          </div>
        )}
        
        <ValentineBackNextControls
          currentScreen="finalSurprise"
          onNavigate={onNavigate}
        />
      </div>
      
      {/* Render glitter particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="sparkle-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
        />
      ))}
    </ValentineLayout>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { EnvelopeLetter } from '../components/EnvelopeLetter';
import { useTypewriter } from '../effects/useTypewriter';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface Gift2MessageScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Gift2MessageScreen({ onNavigate }: Gift2MessageScreenProps) {
  const [isOpened, setIsOpened] = useState(false);
  
  const letterLines = [
    STRINGS.myLove,
    STRINGS.gift2Line1,
    STRINGS.gift2Line2,
    STRINGS.gift2Line3,
    STRINGS.gift2Line4,
    STRINGS.gift2Line5,
    STRINGS.gift2Line6,
    STRINGS.gift2Line7,
    STRINGS.gift2Line8,
  ];
  
  const { displayedLines, isComplete } = useTypewriter(letterLines, isOpened);

  const handleEnvelopeOpened = () => {
    setIsOpened(true);
  };

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-3xl font-bold text-pink-600 dark:text-pink-400 sm:text-4xl md:text-5xl">
          {STRINGS.gift2} 💌
        </h1>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.gift2MessageGif}
            alt="Kiss GIF"
            fallbackText={STRINGS.kissGifFallback}
          />
        </div>
        
        {!isOpened ? (
          <EnvelopeLetter onOpened={handleEnvelopeOpened} />
        ) : (
          <div className="love-box mx-auto max-w-2xl space-y-4 text-left text-base leading-relaxed sm:text-lg">
            {displayedLines.map((line, index) => {
              const isFirstLine = index === 0;
              const isLastLine = index === letterLines.length - 1;
              const isCentered = isFirstLine || isLastLine;
              const isBold = isFirstLine || isLastLine;
              const showCursor = !isComplete && index === displayedLines.length - 1;
              
              return (
                <p
                  key={index}
                  className={`text-pink-700 dark:text-pink-300 ${
                    isCentered ? 'text-center' : ''
                  } ${isBold ? 'text-xl font-bold' : ''}`}
                >
                  {line}
                  {showCursor && <span className="typewriter-cursor">|</span>}
                </p>
              );
            })}
          </div>
        )}
        
        <Button
          onClick={() => onNavigate('gifts')}
          size="lg"
          variant="outline"
          className="valentine-button-outline"
        >
          {STRINGS.backToGifts}
        </Button>
        
        <ValentineBackNextControls
          currentScreen="gift2"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

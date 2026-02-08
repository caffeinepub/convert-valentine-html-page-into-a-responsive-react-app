import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface WelcomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl md:text-6xl">
          {STRINGS.welcomeTitle}
        </h1>
        
        <p className="text-xl text-pink-700 dark:text-pink-300 sm:text-2xl">
          {STRINGS.welcomeMessage}
        </p>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.roseGif}
            alt="Rose GIF"
            fallbackText={STRINGS.roseGifFallback}
          />
        </div>
        
        <Button
          onClick={() => onNavigate('valentine')}
          size="lg"
          className="valentine-button text-xl"
        >
          {STRINGS.continueButton} ➡️
        </Button>
        
        <ValentineBackNextControls
          currentScreen="welcome"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

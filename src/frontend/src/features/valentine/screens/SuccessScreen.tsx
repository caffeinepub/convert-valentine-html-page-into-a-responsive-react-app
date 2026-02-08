import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface SuccessScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SuccessScreen({ onNavigate }: SuccessScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl md:text-6xl">
          {STRINGS.successTitle}
        </h1>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.hugGif}
            alt="Celebration GIF"
            fallbackText={STRINGS.celebrationGifFallback}
          />
        </div>
        
        <p className="text-2xl text-pink-700 dark:text-pink-300 sm:text-3xl">
          {STRINGS.successMessage}
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={() => onNavigate('welcome')}
            size="lg"
            className="valentine-button text-xl"
          >
            {STRINGS.startOver}
          </Button>
          <Button
            onClick={() => onNavigate('gifts')}
            size="lg"
            variant="outline"
            className="valentine-button-outline text-xl"
          >
            {STRINGS.backToGifts}
          </Button>
        </div>
        
        <ValentineBackNextControls
          currentScreen="success"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface CongratulationsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function CongratulationsScreen({ onNavigate }: CongratulationsScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl md:text-6xl">
          {STRINGS.congratulationsTitle}
        </h1>
        
        <h2 className="text-2xl font-semibold text-pink-700 dark:text-pink-300 sm:text-3xl">
          {STRINGS.congratulationsSubtitle}
        </h2>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.congratulationsGif}
            alt="Congratulations GIF"
            fallbackText={STRINGS.celebrationGifFallback}
          />
        </div>
        
        <Button
          onClick={() => onNavigate('gifts')}
          size="lg"
          className="valentine-button text-xl"
        >
          {STRINGS.openGifts}
        </Button>
        
        <ValentineBackNextControls
          currentScreen="congratulations"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

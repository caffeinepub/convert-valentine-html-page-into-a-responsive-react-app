import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface CuddleHugScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function CuddleHugScreen({ onNavigate }: CuddleHugScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-8 text-center">
        <div className="my-4">
          <ValentineGif
            src={ASSETS.cuddleHugGif}
            alt="Apoorva and Shiva"
            fallbackText={STRINGS.cuddleHugFallback}
          />
        </div>
        
        <h1 className="animate-float-in text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl md:text-6xl">
          {STRINGS.cuddleHugText}
        </h1>
        
        <ValentineBackNextControls
          currentScreen="cuddleHug"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

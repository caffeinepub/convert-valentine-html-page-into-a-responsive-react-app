import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface Gift3ImagesScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Gift3ImagesScreen({ onNavigate }: Gift3ImagesScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h2 className="valentine-title text-3xl font-bold text-pink-600 drop-shadow-lg dark:text-pink-400 sm:text-4xl md:text-5xl">
          {STRINGS.gift3Title}
        </h2>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.bubuDudu}
            alt="Memories GIF"
            fallbackText={STRINGS.memoriesGifFallback}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <img
            src={ASSETS.yourPic1}
            alt="Our memory 1"
            className="h-auto w-full rounded-2xl shadow-lg"
          />
          <img
            src={ASSETS.yourPic2}
            alt="Our memory 2"
            className="h-auto w-full rounded-2xl shadow-lg"
          />
        </div>
        
        <Button
          onClick={() => onNavigate('gifts')}
          size="lg"
          className="valentine-button mt-4"
        >
          {STRINGS.backToGifts}
        </Button>
        
        <ValentineBackNextControls
          currentScreen="gift3"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

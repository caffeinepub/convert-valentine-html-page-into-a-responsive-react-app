import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface ChooseYourGiftScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function ChooseYourGiftScreen({ onNavigate }: ChooseYourGiftScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-8 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl">
          {STRINGS.chooseYourGift}
        </h1>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.giftsGif}
            alt="Choose Your Gift GIF"
            fallbackText={STRINGS.giftsGifFallback}
          />
        </div>
        
        <div className="flex w-full flex-col gap-4">
          <Button
            onClick={() => onNavigate('gift1')}
            size="lg"
            className="valentine-button h-16 text-2xl"
          >
            {STRINGS.gift1}
          </Button>
          <Button
            onClick={() => onNavigate('gift2')}
            size="lg"
            className="valentine-button h-16 text-2xl"
          >
            {STRINGS.gift2}
          </Button>
          <Button
            onClick={() => onNavigate('gift3')}
            size="lg"
            className="valentine-button h-16 text-2xl"
          >
            {STRINGS.gift3}
          </Button>
          <Button
            onClick={() => onNavigate('gift4')}
            size="lg"
            className="valentine-button h-16 text-2xl"
          >
            {STRINGS.gift4}
          </Button>
        </div>
        
        <ValentineBackNextControls
          currentScreen="gifts"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}

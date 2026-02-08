import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineGif } from '../components/ValentineGif';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { STRINGS } from '../content/strings';
import { ASSETS } from '../content/assets';
import type { Screen } from '../ValentineFlow';

interface Gift2MessageScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Gift2MessageScreen({ onNavigate }: Gift2MessageScreenProps) {
  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-3xl font-bold text-pink-600 dark:text-pink-400 sm:text-4xl md:text-5xl">
          {STRINGS.gift2} 💌
        </h1>
        
        <div className="my-4">
          <ValentineGif
            src={ASSETS.kissGif}
            alt="Kiss GIF"
            fallbackText={STRINGS.kissGifFallback}
          />
        </div>
        
        <div className="love-box mx-auto max-w-2xl space-y-4 text-left text-base leading-relaxed sm:text-lg">
          <p className="text-center text-xl font-bold text-pink-700 dark:text-pink-300">
            {STRINGS.myLove}
          </p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line1}</p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line2}</p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line3}</p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line4}</p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line5}</p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line6}</p>
          <p className="text-pink-700 dark:text-pink-300">{STRINGS.gift2Line7}</p>
          <p className="text-center text-xl font-bold text-pink-700 dark:text-pink-300">
            {STRINGS.gift2Line8}
          </p>
        </div>
        
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

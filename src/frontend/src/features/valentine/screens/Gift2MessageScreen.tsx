import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
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
        <h2 className="glow-text valentine-title text-3xl font-bold text-pink-600 dark:text-pink-400 sm:text-4xl">
          {STRINGS.myLove}
        </h2>
        
        <div className="my-4">
          <img
            src={ASSETS.kissGif}
            alt="Kiss GIF"
            className="h-auto w-64 rounded-2xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.style.display = 'flex';
              }
            }}
          />
          <div 
            className="hidden h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50 dark:border-pink-700 dark:bg-pink-900/30"
          >
            <p className="text-pink-500 dark:text-pink-400">
              {STRINGS.kissGifFallback}
            </p>
          </div>
        </div>
        
        <div className="glow-text space-y-3 text-lg leading-relaxed text-pink-700 dark:text-pink-300 sm:text-xl">
          <p>{STRINGS.gift2Line1}</p>
          <p>{STRINGS.gift2Line2}</p>
          <p>{STRINGS.gift2Line3}</p>
          <p>{STRINGS.gift2Line4}</p>
          <p>{STRINGS.gift2Line5}</p>
          <p>{STRINGS.gift2Line6}</p>
          <p>{STRINGS.gift2Line7}</p>
          <p className="font-bold">{STRINGS.gift2Line8}</p>
        </div>
        
        <Button
          onClick={() => onNavigate('gifts')}
          size="lg"
          className="valentine-button mt-4"
        >
          {STRINGS.backToGifts}
        </Button>
      </div>
    </ValentineLayout>
  );
}

import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
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
          <img
            src={ASSETS.roseGif}
            alt="Rose GIF"
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
              {STRINGS.roseGifFallback}
            </p>
          </div>
        </div>
        
        <Button
          onClick={() => onNavigate('valentine')}
          size="lg"
          className="valentine-button text-xl"
        >
          {STRINGS.continueButton} ➡️
        </Button>
      </div>
    </ValentineLayout>
  );
}

import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import { ScratchHeart } from '../components/ScratchHeart';
import { useKissBurst } from '../effects/useKissBurst';
import { STRINGS } from '../content/strings';
import type { Screen } from '../ValentineFlow';

interface Gift4ScratchHeartScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Gift4ScratchHeartScreen({ onNavigate }: Gift4ScratchHeartScreenProps) {
  const { kisses, triggerKissBurst } = useKissBurst();

  const handleScratchComplete = () => {
    triggerKissBurst();
  };

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="valentine-title text-3xl font-bold text-pink-600 dark:text-pink-400 sm:text-4xl md:text-5xl">
          {STRINGS.gift4} 💝
        </h1>
        
        <p className="text-lg font-semibold text-pink-600 dark:text-pink-400">
          Scratch the heart to reveal your surprise! 💖
        </p>
        
        <div className="relative my-8">
          <ScratchHeart onComplete={handleScratchComplete} />
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
          currentScreen="gift4"
          onNavigate={onNavigate}
        />
      </div>
      
      {/* Kiss particles overlay */}
      {kisses.map((kiss) => (
        <div
          key={kiss.id}
          className="kiss-burst-particle"
          style={{
            left: `${kiss.x}%`,
            top: `${kiss.y}%`,
            animationDelay: `${kiss.delay}ms`,
          }}
        >
          💋
        </div>
      ))}
    </ValentineLayout>
  );
}

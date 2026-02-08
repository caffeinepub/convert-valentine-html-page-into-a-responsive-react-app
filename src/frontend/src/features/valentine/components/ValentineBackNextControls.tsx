import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { STRINGS } from '../content/strings';
import { getPreviousScreen, getNextScreen } from '../content/flowOrder';
import type { Screen } from '../ValentineFlow';

interface ValentineBackNextControlsProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function ValentineBackNextControls({ currentScreen, onNavigate }: ValentineBackNextControlsProps) {
  const previousScreen = getPreviousScreen(currentScreen);
  const nextScreen = getNextScreen(currentScreen);

  return (
    <div className="mt-8 flex w-full items-center justify-between gap-4">
      <Button
        onClick={() => previousScreen && onNavigate(previousScreen)}
        disabled={!previousScreen}
        variant="outline"
        size="lg"
        className="valentine-button-outline flex-1 sm:flex-none"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        {STRINGS.backButton}
      </Button>
      
      <Button
        onClick={() => nextScreen && onNavigate(nextScreen)}
        disabled={!nextScreen}
        size="lg"
        className="valentine-button flex-1 sm:flex-none"
      >
        {STRINGS.nextButton}
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}

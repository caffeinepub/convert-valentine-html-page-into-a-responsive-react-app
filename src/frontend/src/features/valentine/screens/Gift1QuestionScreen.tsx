import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { STRINGS } from '../content/strings';
import type { Screen } from '../ValentineFlow';

interface Gift1QuestionScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function Gift1QuestionScreen({ onNavigate }: Gift1QuestionScreenProps) {
  const handleYes = () => {
    onNavigate('success');
  };

  const handleNo = () => {
    alert(STRINGS.dontSayThat);
  };

  const handleNever = () => {
    alert(STRINGS.neverImpossible);
  };

  const handleAlways = () => {
    onNavigate('success');
  };

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h2 className="valentine-title text-2xl font-bold text-pink-600 dark:text-pink-400 sm:text-3xl md:text-4xl">
          {STRINGS.gift1Question}
        </h2>
        
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            onClick={handleYes}
            size="lg"
            className="valentine-button text-lg"
          >
            {STRINGS.option1Yes}
          </Button>
          <Button
            onClick={handleNo}
            size="lg"
            variant="outline"
            className="valentine-button-outline text-lg"
          >
            {STRINGS.option2No}
          </Button>
          <Button
            onClick={handleNever}
            size="lg"
            variant="outline"
            className="valentine-button-outline text-lg"
          >
            {STRINGS.option3Never}
          </Button>
          <Button
            onClick={handleAlways}
            size="lg"
            className="valentine-button text-lg"
          >
            {STRINGS.option4Always}
          </Button>
        </div>
      </div>
    </ValentineLayout>
  );
}

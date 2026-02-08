import { useState } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { WillYouBeMyValentineScreen } from './screens/WillYouBeMyValentineScreen';
import { ChooseYourGiftScreen } from './screens/ChooseYourGiftScreen';
import { Gift1QuestionScreen } from './screens/Gift1QuestionScreen';
import { Gift2MessageScreen } from './screens/Gift2MessageScreen';
import { Gift3ImagesScreen } from './screens/Gift3ImagesScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { FallingHeartsLayer } from './components/FallingHeartsLayer';
import { BackgroundMusicControl } from './components/BackgroundMusicControl';

export type Screen = 'welcome' | 'valentine' | 'gifts' | 'gift1' | 'gift2' | 'gift3' | 'success';

export function ValentineFlow() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FallingHeartsLayer />
      <BackgroundMusicControl />
      
      {currentScreen === 'welcome' && <WelcomeScreen onNavigate={navigateTo} />}
      {currentScreen === 'valentine' && <WillYouBeMyValentineScreen onNavigate={navigateTo} />}
      {currentScreen === 'gifts' && <ChooseYourGiftScreen onNavigate={navigateTo} />}
      {currentScreen === 'gift1' && <Gift1QuestionScreen onNavigate={navigateTo} />}
      {currentScreen === 'gift2' && <Gift2MessageScreen onNavigate={navigateTo} />}
      {currentScreen === 'gift3' && <Gift3ImagesScreen onNavigate={navigateTo} />}
      {currentScreen === 'success' && <SuccessScreen onNavigate={navigateTo} />}
    </div>
  );
}

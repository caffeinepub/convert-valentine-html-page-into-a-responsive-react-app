import type { Screen } from '../ValentineFlow';

// Define the sequential flow order
export const FLOW_ORDER: Screen[] = [
  'welcome',
  'valentine',
  'congratulations',
  'gifts',
  'gift1',
  'gift2',
  'gift3',
  'finalSurprise',
];

// Helper to get the previous screen in the flow
export function getPreviousScreen(currentScreen: Screen): Screen | null {
  const currentIndex = FLOW_ORDER.indexOf(currentScreen);
  if (currentIndex <= 0) return null;
  return FLOW_ORDER[currentIndex - 1];
}

// Helper to get the next screen in the flow
export function getNextScreen(currentScreen: Screen): Screen | null {
  const currentIndex = FLOW_ORDER.indexOf(currentScreen);
  if (currentIndex === -1 || currentIndex >= FLOW_ORDER.length - 1) return null;
  return FLOW_ORDER[currentIndex + 1];
}

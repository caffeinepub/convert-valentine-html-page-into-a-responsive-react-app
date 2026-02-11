import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ValentineLayout } from '../components/ValentineLayout';
import { ValentineBackNextControls } from '../components/ValentineBackNextControls';
import type { Screen } from '../ValentineFlow';

interface SpinTheWheelOfLoveScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Reward {
  label: string;
  emoji: string;
  message: string;
}

const REWARDS: Reward[] = [
  { label: 'Kiss Attack', emoji: '💋', message: 'Get ready for my unstoppable kiss attack 😚💋' },
  { label: 'Super Hug', emoji: '🤗', message: 'I\'m giving you the BIGGEST hug ever 😁❤️' },
  { label: 'Your Favourite Food', emoji: '🥰', message: 'I\'ll get you your FAVORITE food, babyy 😍🍽️' },
  { label: 'Song For You', emoji: '🎶', message: 'I\'ll sing or send you a cute romantic song 🎶💗' },
  { label: 'Cute Roses', emoji: '🌹', message: 'Beautiful roses coming your way, my love 🌹💕' },
  { label: 'Chocolate Treat', emoji: '🍫', message: 'Your sweet chocolate treat is on the way 😘🍫' },
  { label: 'Love Note', emoji: '💞', message: 'I\'ll write you the cutest love note ever 💌💞' },
  { label: 'Romance 😚', emoji: '🫦', message: 'Get ready for some cute romance time with me 😚❤️‍🔥' },
  { label: 'Cute Love Letter 💌', emoji: '💛', message: 'I\'ll give you a handwritten cute love letter 💛💌' },
  { label: 'Mystery Surprise', emoji: '🎁', message: 'You can ask me for ANY mystery gift you want babyyy 🎁✨' },
  { label: 'Forever Card', emoji: '❤️', message: 'I\'ll make you a \'Forever with You\' card ❤️✨' },
];

export function SpinTheWheelOfLoveScreen({ onNavigate }: SpinTheWheelOfLoveScreenProps) {
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [wonRewards, setWonRewards] = useState<Reward[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (isSpinning || attemptsLeft <= 0) return;

    setIsSpinning(true);
    setCurrentReward(null);

    // Random reward selection
    const randomIndex = Math.floor(Math.random() * REWARDS.length);
    const selectedReward = REWARDS[randomIndex];

    // Calculate rotation (multiple full spins + landing position)
    const segmentAngle = 360 / REWARDS.length;
    const targetAngle = randomIndex * segmentAngle;
    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const totalRotation = rotation + (spins * 360) + (360 - targetAngle);

    setRotation(totalRotation);

    // After spin animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentReward(selectedReward);
      setWonRewards(prev => [...prev, selectedReward]);
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);

      // Show summary after 5th spin
      if (newAttemptsLeft === 0) {
        setTimeout(() => {
          setShowSummary(true);
        }, 2000);
      }
    }, 4000);
  };

  if (showSummary) {
    return (
      <ValentineLayout>
        <div className="spin-wheel-summary flex flex-col items-center space-y-8 text-center">
          <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl">
            Your Rewards 🎉
          </h1>

          <div className="spin-wheel-rewards-list grid grid-cols-1 gap-6 w-full max-w-2xl">
            {wonRewards.map((reward, index) => (
              <div
                key={index}
                className="spin-wheel-reward-item flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border-2 border-pink-300 dark:border-pink-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-6xl">{reward.emoji}</span>
                <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                  {reward.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-800/40 dark:to-rose-800/40 border-2 border-pink-400 dark:border-pink-600">
            <p className="text-xl font-semibold text-pink-800 dark:text-pink-200 leading-relaxed whitespace-pre-line">
              {'Hey these are your rewards CUTIEPIE 💞\nTake a screenshot and send me…\nI will give you ALL 😘😘😘'}
            </p>
          </div>

          <Button
            onClick={() => onNavigate('gifts')}
            size="lg"
            className="valentine-button mt-6"
          >
            Back to Gifts
          </Button>

          <ValentineBackNextControls
            currentScreen="spinWheel"
            onNavigate={onNavigate}
          />
        </div>
      </ValentineLayout>
    );
  }

  return (
    <ValentineLayout>
      <div className="flex flex-col items-center space-y-8 text-center">
        <h1 className="valentine-title text-4xl font-bold text-pink-600 dark:text-pink-400 sm:text-5xl">
          Spin the Wheel of Love 💗
        </h1>

        {/* Pre-spin Note */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border-2 border-pink-300 dark:border-pink-700 max-w-lg">
          <p className="text-lg font-semibold text-pink-800 dark:text-pink-200 leading-relaxed">
            You will get 5 attempts! Whatever you win from the spins… I will give you ALL of them in real 😩💕
          </p>
        </div>

        {/* Attempts Counter */}
        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
          Attempts left: {attemptsLeft}
        </div>

        {/* Wheel Container */}
        <div className="relative w-full max-w-md aspect-square">
          <div
            ref={wheelRef}
            className="spin-wheel"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
          >
            {REWARDS.map((reward, index) => {
              const angle = (360 / REWARDS.length) * index;
              const colors = [
                'linear-gradient(135deg, #fce7f3, #fbcfe8)',
                'linear-gradient(135deg, #fbcfe8, #f9a8d4)',
                'linear-gradient(135deg, #f9a8d4, #f472b6)',
                'linear-gradient(135deg, #f472b6, #ec4899)',
                'linear-gradient(135deg, #ec4899, #db2777)',
                'linear-gradient(135deg, #db2777, #be185d)',
                'linear-gradient(135deg, #be185d, #9f1239)',
                'linear-gradient(135deg, #9f1239, #881337)',
                'linear-gradient(135deg, #881337, #fce7f3)',
                'linear-gradient(135deg, #fce7f3, #fbcfe8)',
                'linear-gradient(135deg, #fbcfe8, #f9a8d4)',
              ];
              
              return (
                <div
                  key={index}
                  className="spin-wheel-segment"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    background: colors[index % colors.length],
                  }}
                >
                  <div className="spin-wheel-segment-content">
                    <span className="text-3xl mb-1">{reward.emoji}</span>
                    <span className="text-xs font-bold text-pink-900 dark:text-pink-100">
                      {reward.label}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="spin-wheel-center">
              <span className="text-2xl font-bold text-white">SPIN</span>
            </div>
          </div>
          <div className="spin-wheel-pointer">▼</div>
        </div>

        {/* Spin Button */}
        <Button
          onClick={handleSpin}
          disabled={isSpinning || attemptsLeft <= 0}
          size="lg"
          className="valentine-button text-xl px-12 py-6"
        >
          {isSpinning ? 'Spinning...' : attemptsLeft > 0 ? 'Spin the Wheel! 🎡' : 'No Attempts Left'}
        </Button>

        {/* Current Reward Display */}
        {currentReward && (
          <div className={`mt-8 p-8 rounded-2xl bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-800/40 dark:to-rose-800/40 border-4 border-pink-400 dark:border-pink-600 animate-pop-out ${
            currentReward.label === 'Mystery Surprise' ? 'spin-wheel-mystery-glow' : ''
          }`}>
            <div className="text-7xl mb-4">{currentReward.emoji}</div>
            <h2 className="text-3xl font-bold text-pink-700 dark:text-pink-300 mb-4">
              {currentReward.label}
            </h2>
            <p className="text-xl text-pink-800 dark:text-pink-200 leading-relaxed">
              {currentReward.message}
            </p>
          </div>
        )}

        <Button
          onClick={() => onNavigate('gifts')}
          size="lg"
          variant="outline"
          className="valentine-button-outline mt-6"
        >
          Back to Gifts
        </Button>

        <ValentineBackNextControls
          currentScreen="spinWheel"
          onNavigate={onNavigate}
        />
      </div>
    </ValentineLayout>
  );
}
